import { compileProject, createNoctisIntrinsics } from "./linojava/compiler.js";
import {
  createRunners as createNoctisRunners,
  instructionCount as noctisInstructionCount,
  regionSize as noctisRegionSize,
} from "./noctis-runners.js";

const workerScope = typeof WorkerGlobalScope !== "undefined"
  && globalThis instanceof WorkerGlobalScope;
let foregroundRuntime = false;
let emitMessage = (message, transfer = []) => globalThis.postMessage(message, transfer);

let program = null;
let running = false;
let pointerX = 0;
let pointerY = 0;
let pointerButtons = 0;
let pointerDeltaX = 0;
let pointerDeltaY = 0;
let pointerMode = 0;
const pointerTransitions = [];
const heldKeys = Object.create(null);
const consoleInput = [];
let pendingFrame = null;
let completedFrame = false;
const maxFrameCredits = workerScope ? 3 : 1;
let frameCredits = maxFrameCredits;
const frameBuffers = [];
let runQueued = false;
let delayedRun = 0;
let renderedFrames = 0;
let rateStartedAt = performance.now();
let rateStartedFrame = 0;
let rateRunnerMilliseconds = 0;
let rateInstructions = 0;
let renderedFps = 0;
let runnerMillisecondsPerFrame = 0;
let instructionsPerFrame = 0;
let nextFrameAt = performance.now();
let pcmState = { frames: 0, rate: 44100, offset: 0, startedAt: 0, loop: false, paused: false };

const canonical = (value) => String(value).replace(/[\x00-\x20]+/g, "").replaceAll("\\", "/").toLowerCase();

function publishPointerWorkspace() {
  if (!program) return;
  const memory = program.machine.memory;
  const write = (name, value) => {
    const symbol = program.linked.symbols.get(canonical(name));
    if (symbol) memory[symbol.value] = value | 0;
  };
  // Pointer state is live OS state in Lino's native host. Publishing it when
  // an event arrives prevents a release from waiting behind a long game
  // control-loop slice with the menu button left permanently pressed.
  write("Pointer Status", 3 | pointerButtons);
  write("Pointer X Coordinate", pointerX);
  write("Pointer Y Coordinate", pointerY);
}

function isolatedNoctisIntrinsics() {
  // Keep Chromium from folding the complete renderer into one unstable
  // optimization unit. The cold branch also provides an on-demand profiler.
  const implementations = createNoctisIntrinsics();
  globalThis.__linoIntrinsicProfile = Object.create(null);
  globalThis.__linoProfileIntrinsics = false;
  for (const [id, original] of Object.entries(implementations)) {
    const wrapped = (...args) => {
      if (globalThis.__linoProfileIntrinsics) {
        const started = performance.now();
        try {
          return original(...args);
        } finally {
          const item = globalThis.__linoIntrinsicProfile[id]
            ??= { calls: 0, milliseconds: 0 };
          item.calls += 1;
          item.milliseconds += performance.now() - started;
        }
      }
      return original(...args);
    };
    Object.assign(wrapped, original);
    implementations[id] = wrapped;
  }
  return implementations;
}

function currentPcmOffset() {
  if (pcmState.frames <= 0 || pcmState.paused) return pcmState.offset | 0;
  const elapsed = Math.max(0, Math.floor((performance.now() - pcmState.startedAt) * pcmState.rate / 1000));
  if (pcmState.loop) return (pcmState.offset + elapsed) % pcmState.frames;
  return Math.min(pcmState.offset + elapsed, pcmState.frames) | 0;
}

function pcmCommand(request) {
  const command = request.command | 0;
  if (command === 4) return { success: true, offset: currentPcmOffset(), status: pcmState.paused ? 2 : 1 };
  if (command === 5 || command === 6) {
    if (request.channels !== 2 || request.bitsPerSample !== 16 || request.samplesPerSecond <= 0
        || request.size <= 0 || request.origin < 0 || request.origin + request.size > request.memory.length) {
      return { success: false, offset: 0, status: 1 };
    }
    const samples = request.memory.slice(request.origin, request.origin + request.size);
    pcmState = {
      frames: request.size | 0,
      rate: request.samplesPerSecond | 0,
      offset: Math.max(0, Math.min(request.offset | 0, request.size - 1)),
      startedAt: performance.now(),
      loop: command === 6,
      paused: false,
    };
    emitMessage({
      type: "pcm", command, samples, channels: 2, bitsPerSample: 16,
      samplesPerSecond: pcmState.rate, offset: pcmState.offset,
    }, [samples.buffer]);
    return { success: true, offset: 0, status: 1 };
  }
  if (command === 7) {
    pcmState.offset = currentPcmOffset();
    pcmState.paused = true;
    emitMessage({ type: "pcm", command });
    return { success: pcmState.frames > 0, offset: pcmState.offset, status: 2 };
  }
  if (command === 8) {
    const success = pcmState.frames > 0 && pcmState.paused;
    if (success) {
      pcmState.startedAt = performance.now();
      pcmState.paused = false;
      emitMessage({ type: "pcm", command });
    }
    return { success, offset: pcmState.offset, status: 1 };
  }
  if (command === 9) {
    pcmState = { frames: 0, rate: 44100, offset: 0, startedAt: 0, loop: false, paused: false };
    emitMessage({ type: "pcm", command });
    return { success: true, offset: 0, status: 1 };
  }
  return { success: false };
}

async function fetchFirst(urls, kind) {
  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) continue;
    return kind === "source"
      ? { id: response.url, source: await response.text() }
      : { id: response.url, data: new Uint8Array(await response.arrayBuffer()) };
  }
  throw new Error(`Unable to load ${urls[0]}`);
}

function projectCandidates(sourceRoot, specifier, importer, suffixes) {
  const clean = specifier.replaceAll("\\", "/");
  const bases = clean.startsWith("/")
    ? [new URL(`main/lib/${clean.slice(1)}`, sourceRoot)]
    : [new URL(clean, importer), new URL(`main/lib/${clean}`, sourceRoot)];
  return bases.flatMap((base) => suffixes.map((suffix) => new URL(`${base.href}${suffix}`)));
}

function symbolValues(names, lengths = {}) {
  const memory = program.machine.memory;
  const output = {};
  for (const name of names) {
    const symbol = program.linked.symbols.get(name);
    if (!symbol) continue;
    const length = lengths[name] ?? 1;
    output[name] = length === 1
      ? memory[symbol.value] | 0
      : Array.from(memory.subarray(symbol.value, symbol.value + length), (value) => value | 0);
  }
  return output;
}

const runChannel = workerScope ? new MessageChannel() : null;
if (runChannel) {
  runChannel.port1.addEventListener("message", () => {
    runQueued = false;
    runMachine();
  });
  runChannel.port1.start();
}

function queueRun(delay = 0, yieldToHost = false) {
  if (!running || runQueued) return;
  runQueued = true;
  if (foregroundRuntime) {
    if (delay > 0) delayedRun = setTimeout(() => { delayedRun = 0; }, delay);
    return;
  }
  if (delay > 0 || yieldToHost) {
    delayedRun = setTimeout(() => {
      delayedRun = 0;
      runQueued = false;
      runMachine();
    }, Math.max(0, delay));
  } else runChannel.port2.postMessage(0);
}

function publishFrame(result, runnerMilliseconds, producedFrame) {
  if (!producedFrame) return;
  renderedFrames += 1;
  rateRunnerMilliseconds += runnerMilliseconds;
  rateInstructions += result.instructions;
  const now = performance.now();
  const elapsed = now - rateStartedAt;
  if (elapsed >= 1000) {
    const frames = renderedFrames - rateStartedFrame;
    if (frames > 0) {
      renderedFps = frames * 1000 / elapsed;
      runnerMillisecondsPerFrame = rateRunnerMilliseconds / frames;
      instructionsPerFrame = rateInstructions / frames;
    }
    rateStartedAt = now;
    rateStartedFrame = renderedFrames;
    rateRunnerMilliseconds = 0;
    rateInstructions = 0;
  }
  if (!pendingFrame) return;
  const frame = pendingFrame;
  pendingFrame = null;
  frame.ui = symbolValues(
    ["vhguileft", "vhguitop", "vhguidw", "vhguidh", "displayxposition", "displayyposition",
      "fullbuttonhotspot", "titlebarbounds", "sizebuttonhotspot"],
    { fullbuttonhotspot: 4, titlebarbounds: 4, sizebuttonhotspot: 4 },
  );
  frame.metrics = {
    renderedFrames, renderedFps, runnerMillisecondsPerFrame, instructionsPerFrame,
    status: result.status,
  };
  emitMessage(frame, [frame.pixels.buffer]);
}

function runMachine() {
  if (!running || !program || program.machine.halted) return;
  try {
    const started = performance.now();
    // Keep host input responsive while source-level GUI redraws run. Normal
    // Noctis frames usually yield below this bound; complex iGUI transactions
    // are split so a pointer release cannot wait behind a giant Lino slice.
    const result = program.run(10_000);
    const runnerMilliseconds = performance.now() - started;
    const producedFrame = completedFrame;
    completedFrame = false;
    publishFrame(result, runnerMilliseconds, producedFrame);
    if (program.machine.halted) {
      running = false;
      emitMessage({ type: "stopped", status: result.status });
      return;
    }
    let delay = result.sleepMilliseconds > 0 ? result.sleepMilliseconds : 0;
    if (workerScope && producedFrame) {
      const now = performance.now();
      nextFrameAt = Math.max(nextFrameAt + 1000 / 60, now);
      delay = Math.max(delay, nextFrameAt - now);
    }
    // Long Lino redraws can consume several runner budgets without reaching a
    // presentation. Yield through the worker event loop between those slices
    // so pointer releases and other host messages cannot be starved by our
    // private MessageChannel queue.
    queueRun(delay, !producedFrame && result.status === "budget");
  } catch (error) {
    running = false;
    emitMessage({ type: "error", message: error?.stack || error?.message || String(error) });
  }
}

async function initialize(message) {
  const sourceRoot = new URL(message.sourceRoot);
  const entry = new URL("work/vhgame.txt", sourceRoot).href;
  const manifest = await fetch(new URL("manifest.json", sourceRoot)).then((response) => response.json());
  const namedFiles = new Map(await Promise.all(Object.entries(manifest.files ?? {}).map(async ([name, filename]) => {
    const response = await fetch(new URL(filename, sourceRoot));
    if (!response.ok) throw new Error(`Unable to load ${filename}`);
    return [name, new Uint8Array(await response.arrayBuffer())];
  })));
  for (const [name, bytes] of message.files ?? []) namedFiles.set(canonical(name), new Uint8Array(bytes));
  const globalK = new Map((message.globalK ?? []).map(([name, units]) => [String(name), new Int32Array(units)]));
  const resolvers = {
    resolveSource(specifier, importer) {
      if (/^https?:/i.test(specifier)) return fetchFirst([new URL(specifier)], "source");
      const mapped = manifest.sources[canonical(specifier)];
      if (mapped) return fetchFirst([new URL(mapped, sourceRoot)], "source");
      return fetchFirst(projectCandidates(sourceRoot, specifier, importer ?? entry, ["", ".txt"]), "source");
    },
    resolveStockfile(specifier, importer) {
      const mapped = manifest.stockfiles[canonical(specifier)];
      if (mapped) return fetchFirst([new URL(mapped, sourceRoot)], "stockfile");
      return fetchFirst(projectCandidates(sourceRoot, specifier, importer, ["", ".tga"]), "stockfile");
    },
  };
  const host = {
    directory: ".",
    files: namedFiles,
    globalK,
    fileChanged(name, bytes) {
      const copy = bytes === null ? null : new Uint8Array(bytes);
      emitMessage({ type: "fileChanged", name, bytes: copy }, copy ? [copy.buffer] : []);
    },
    globalKChanged(name, units) {
      const copy = units === null ? null : new Int32Array(units);
      emitMessage({ type: "globalKChanged", name, units: copy }, copy ? [copy.buffer] : []);
    },
    keys: heldKeys,
    consoleInput,
    pointer({ mode }) {
      if (pointerMode !== (mode | 0)) {
        pointerMode = mode | 0;
        emitMessage({ type: "pointerMode", mode: pointerMode });
      }
      const transition = pointerTransitions.shift();
      if (transition && pointerTransitions.length > 0) {
        queueMicrotask(publishPointerWorkspace);
      }
      const deltaX = transition?.deltaX ?? pointerDeltaX;
      const deltaY = transition?.deltaY ?? pointerDeltaY;
      if (!transition) pointerDeltaX = pointerDeltaY = 0;
      return {
        // Lino's host samples the device's current state. A delayed queued
        // movement must never resurrect an already released button while a
        // slow redraw is catching up.
        status: 3 | pointerButtons,
        x: pointerX,
        y: pointerY,
        deltaX,
        deltaY,
      };
    },
    syncDisplay({ width, height, x, y }) {
      emitMessage({ type: "display", width, height, x, y });
    },
    monotonicMilliseconds: () => performance.now(),
    retrace(origin, width, height, memory) {
      completedFrame = true;
      if (frameCredits > 0) {
        frameCredits -= 1;
        const count = width * height;
        let pixels;
        if (foregroundRuntime) pixels = memory.subarray(origin, origin + count);
        else {
          pixels = frameBuffers.pop();
          if (!pixels || pixels.length !== count) pixels = new Int32Array(count);
          pixels.set(memory.subarray(origin, origin + count));
        }
        pendingFrame = {
          type: "frame", width, height,
          pixels, borrowed: foregroundRuntime,
        };
      }
      return true;
    },
    pcm: pcmCommand,
  };
  program = await compileProject(entry, resolvers, {
    host,
    intrinsics: isolatedNoctisIntrinsics(),
    precompiledRunners: {
      create: createNoctisRunners,
      instructionCount: noctisInstructionCount,
      regionSize: noctisRegionSize,
    },
    physicalWidth: Math.max(1, message.physicalWidth | 0),
    physicalHeight: Math.max(1, message.physicalHeight | 0),
    audioPlayback: Boolean(message.audioPlayback),
  });
  const bounds = message.windowBounds;
  if (bounds) {
    const x = program.linked.symbols.get("displayxposition");
    const y = program.linked.symbols.get("displayyposition");
    if (x) program.machine.memory[x.value] = Math.round(bounds.x) | 0;
    if (y) program.machine.memory[y.value] = Math.round(bounds.y) | 0;
  }
  running = true;
  nextFrameAt = performance.now();
  emitMessage({ type: "ready" });
  queueRun();
}

function handleMessage(message) {
  message ??= {};
  if (message.type === "init") {
    initialize(message).catch((error) => emitMessage({ type: "error", message: error?.stack || String(error) }));
  } else if (message.type === "key") {
    if (message.down) heldKeys[message.name] = 1;
    else delete heldKeys[message.name];
  } else if (message.type === "clearKeys") {
    for (const name of Object.keys(heldKeys)) delete heldKeys[name];
  } else if (message.type === "frameCredit") {
    if (message.buffer instanceof ArrayBuffer) frameBuffers.push(new Int32Array(message.buffer));
    frameCredits = Math.min(maxFrameCredits, frameCredits + 1);
  } else if (message.type === "ascii") consoleInput.push(message.value | 0);
  else if (message.type === "pointer") {
    pointerX = message.x | 0;
    pointerY = message.y | 0;
    pointerButtons = message.buttons | 0;
    publishPointerWorkspace();
    if (message.transition) pointerTransitions.push({
      x: pointerX, y: pointerY, buttons: pointerButtons,
      deltaX: message.deltaX | 0, deltaY: message.deltaY | 0,
    });
    else {
      pointerDeltaX = (pointerDeltaX + (message.deltaX | 0)) | 0;
      pointerDeltaY = (pointerDeltaY + (message.deltaY | 0)) | 0;
    }
  } else if (message.type === "physical" && program) {
    const width = program.linked.symbols.get("displayphysicalwidth");
    const height = program.linked.symbols.get("displayphysicalheight");
    if (width) program.machine.memory[width.value] = Math.max(1, message.width | 0);
    if (height) program.machine.memory[height.value] = Math.max(1, message.height | 0);
  } else if (message.type === "displayPosition" && program) {
    const x = program.linked.symbols.get("displayxposition");
    const y = program.linked.symbols.get("displayyposition");
    if (x) program.machine.memory[x.value] = message.x | 0;
    if (y) program.machine.memory[y.value] = message.y | 0;
  }
}

if (workerScope) addEventListener("message", (event) => handleMessage(event.data));

export function createForegroundRuntime(onMessage) {
  foregroundRuntime = true;
  const target = new EventTarget();
  emitMessage = (data) => {
    const event = new MessageEvent("message", { data });
    onMessage?.(event);
    target.dispatchEvent(event);
  };
  return {
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
    postMessage: (message) => handleMessage(message),
    tick() {
      if (!runQueued || delayedRun || !running) return;
      runQueued = false;
      runMachine();
    },
  };
}
