import { compileProject, createNoctisIntrinsics } from "./linojava/compiler.js";

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
let frameCredit = true;
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
let pcmState = { frames: 0, rate: 44100, offset: 0, startedAt: 0, loop: false, paused: false };

const canonical = (value) => String(value).replace(/[\x00-\x20]+/g, "").replaceAll("\\", "/").toLowerCase();

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
    postMessage({
      type: "pcm", command, samples, channels: 2, bitsPerSample: 16,
      samplesPerSecond: pcmState.rate, offset: pcmState.offset,
    }, [samples.buffer]);
    return { success: true, offset: 0, status: 1 };
  }
  if (command === 7) {
    pcmState.offset = currentPcmOffset();
    pcmState.paused = true;
    postMessage({ type: "pcm", command });
    return { success: pcmState.frames > 0, offset: pcmState.offset, status: 2 };
  }
  if (command === 8) {
    const success = pcmState.frames > 0 && pcmState.paused;
    if (success) {
      pcmState.startedAt = performance.now();
      pcmState.paused = false;
      postMessage({ type: "pcm", command });
    }
    return { success, offset: pcmState.offset, status: 1 };
  }
  if (command === 9) {
    pcmState = { frames: 0, rate: 44100, offset: 0, startedAt: 0, loop: false, paused: false };
    postMessage({ type: "pcm", command });
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

const runChannel = new MessageChannel();
runChannel.port1.addEventListener("message", () => {
  runQueued = false;
  runMachine();
});
runChannel.port1.start();

function queueRun(delay = 0) {
  if (!running || runQueued) return;
  runQueued = true;
  if (delay > 0) {
    delayedRun = setTimeout(() => {
      delayedRun = 0;
      runQueued = false;
      runMachine();
    }, delay);
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
  postMessage(frame, [frame.pixels.buffer]);
}

function runMachine() {
  if (!running || !program || program.machine.halted) return;
  try {
    const started = performance.now();
    const result = program.run(250_000);
    const runnerMilliseconds = performance.now() - started;
    const producedFrame = completedFrame;
    completedFrame = false;
    publishFrame(result, runnerMilliseconds, producedFrame);
    if (program.machine.halted) {
      running = false;
      postMessage({ type: "stopped", status: result.status });
      return;
    }
    queueRun(result.sleepMilliseconds > 0 ? result.sleepMilliseconds : 0);
  } catch (error) {
    running = false;
    postMessage({ type: "error", message: error?.stack || error?.message || String(error) });
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
      postMessage({ type: "fileChanged", name, bytes: copy }, copy ? [copy.buffer] : []);
    },
    globalKChanged(name, units) {
      const copy = units === null ? null : new Int32Array(units);
      postMessage({ type: "globalKChanged", name, units: copy }, copy ? [copy.buffer] : []);
    },
    keys: heldKeys,
    consoleInput,
    pointer({ mode }) {
      if (pointerMode !== (mode | 0)) {
        pointerMode = mode | 0;
        postMessage({ type: "pointerMode", mode: pointerMode });
      }
      const transition = pointerTransitions.shift();
      const deltaX = transition?.deltaX ?? pointerDeltaX;
      const deltaY = transition?.deltaY ?? pointerDeltaY;
      if (!transition) pointerDeltaX = pointerDeltaY = 0;
      return {
        status: 3 | (transition?.buttons ?? pointerButtons),
        x: transition?.x ?? pointerX,
        y: transition?.y ?? pointerY,
        deltaX,
        deltaY,
      };
    },
    syncDisplay({ width, height, x, y }) {
      postMessage({ type: "display", width, height, x, y });
    },
    monotonicMilliseconds: () => performance.now(),
    retrace(origin, width, height, memory) {
      completedFrame = true;
      if (frameCredit) {
        frameCredit = false;
        const count = width * height;
        let pixels = frameBuffers.pop();
        if (!pixels || pixels.length !== count) pixels = new Int32Array(count);
        pixels.set(memory.subarray(origin, origin + count));
        pendingFrame = {
          type: "frame", width, height,
          pixels,
        };
      }
      return true;
    },
    pcm: pcmCommand,
  };
  program = await compileProject(entry, resolvers, {
    host,
    intrinsics: isolatedNoctisIntrinsics(),
    regionSize: 1024,
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
  postMessage({ type: "ready" });
  queueRun();
}

addEventListener("message", (event) => {
  const message = event.data ?? {};
  if (message.type === "init") {
    initialize(message).catch((error) => postMessage({ type: "error", message: error?.stack || String(error) }));
  } else if (message.type === "key") {
    if (message.down) heldKeys[message.name] = 1;
    else delete heldKeys[message.name];
  } else if (message.type === "clearKeys") {
    for (const name of Object.keys(heldKeys)) delete heldKeys[name];
  } else if (message.type === "frameCredit") {
    if (message.buffer instanceof ArrayBuffer) frameBuffers.push(new Int32Array(message.buffer));
    frameCredit = true;
  } else if (message.type === "ascii") consoleInput.push(message.value | 0);
  else if (message.type === "pointer") {
    pointerX = message.x | 0;
    pointerY = message.y | 0;
    pointerButtons = message.buttons | 0;
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
});
