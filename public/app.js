const useWorkerRuntime = typeof Worker === "function"
  && !new URLSearchParams(location.search).has("mainThread");

if (useWorkerRuntime) {
  await import("./worker-host.js");
} else {
const { compileProject, createNoctisIntrinsics } = await import("./linojava/compiler.js");
const {
  createRunners: createNoctisRunners,
  instructionCount: noctisInstructionCount,
  regionSize: noctisRegionSize,
} = await import("./noctis-runners.js");

const linoWindow = document.querySelector("#lino-window");
const gameStage = document.querySelector("#game-stage");
const canvas = document.querySelector("#game");
const context = canvas.getContext("2d", { alpha: false });
const fullscreenCanvas = document.querySelector("#fullscreen-game");
const fullscreenContext = fullscreenCanvas.getContext("2d", { alpha: false });
const exitFullscreenButton = document.querySelector("#exit-fullscreen");
const status = document.querySelector("#status");
const crashPanel = document.querySelector("#crash-panel");
const crashReport = document.querySelector("#crash-report");
const copyCrashButton = document.querySelector("#copy-crash");
const sourceRoot = new URL("./lino-src/", location.href);
const entry = new URL("work/vhgame.txt", sourceRoot).href;

function showCrash(error) {
  const pc = program?.machine?.pc ?? null;
  const packet = {
    version: 1,
    occurredAt: new Date().toISOString(),
    phase: "foreground-run",
    message: error?.stack || error?.message || String(error),
    pc,
    instruction: pc === null ? null : program.linked.instructions[pc] ?? null,
    labels: pc === null ? [] : program.linked.aliases
      .filter((item) => item.instruction === pc).map((item) => item.name),
    registers: program?.machine ? { A: program.machine.A | 0, B: program.machine.B | 0,
      C: program.machine.C | 0, D: program.machine.D | 0, E: program.machine.E | 0,
      X: program.machine.X | 0 } : null,
    depth: program?.machine?.depth ?? null,
    stackTop: program?.machine
      ? Array.from(program.machine.stack.slice(Math.max(0, program.machine.depth - 16), program.machine.depth)) : [],
  };
  const report = JSON.stringify(packet, null, 2);
  crashReport.textContent = report;
  crashPanel.hidden = false;
  try { sessionStorage.setItem("linoctis:last-crash", report); } catch { /* optional */ }
}

copyCrashButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(crashReport.textContent);
    copyCrashButton.textContent = "Copied";
  } catch {
    copyCrashButton.textContent = "Select report below";
  }
});

async function openPersistence() {
  if (!window.indexedDB) return null;
  return new Promise((resolve) => {
    const request = indexedDB.open("linoctis", 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("files")) database.createObjectStore("files");
      if (!database.objectStoreNames.contains("globalK")) database.createObjectStore("globalK");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

async function readPersistenceStore(database, name) {
  if (!database) return [];
  return new Promise((resolve) => {
    const transaction = database.transaction(name, "readonly");
    const store = transaction.objectStore(name);
    const keysRequest = store.getAllKeys();
    const valuesRequest = store.getAll();
    transaction.oncomplete = () => resolve(keysRequest.result.map((key, index) => [key, valuesRequest.result[index]]));
    transaction.onerror = () => resolve([]);
  });
}

function writePersistence(database, storeName, key, value) {
  if (!database) return;
  try {
    const store = database.transaction(storeName, "readwrite").objectStore(storeName);
    if (value === null) store.delete(key);
    else store.put(value, key);
  } catch { /* persistence remains optional when storage is unavailable */ }
}

const persistence = await openPersistence();
const manifest = await fetch(new URL("manifest.json", sourceRoot)).then((response) => response.json());
const namedFiles = new Map(await Promise.all(Object.entries(manifest.files ?? {}).map(async ([name, filename]) => {
  const response = await fetch(new URL(filename, sourceRoot));
  if (!response.ok) throw new Error(`Unable to load ${filename}`);
  return [name, new Uint8Array(await response.arrayBuffer())];
})));
for (const [name, bytes] of await readPersistenceStore(persistence, "files")) {
  namedFiles.set(String(name).replaceAll("\\", "/").toLowerCase(), new Uint8Array(bytes));
}
const globalK = new Map();
for (const [name, units] of await readPersistenceStore(persistence, "globalK")) {
  const saved = units instanceof Int32Array ? units : new Int32Array(units);
  if (saved.length === 255) globalK.set(String(name), saved);
}
let pointerX = 0;
let pointerY = 0;
let pointerButtons = 0;
let pointerMode = 0;
let pointerDeltaX = 0;
let pointerDeltaY = 0;
const pointerTransitions = [];
let gameLeft = 0;
let gameTop = 0;
let gameWidth = 320;
let gameHeight = 200;
const heldKeys = Object.create(null);
const consoleInput = [];
let frameCount = 0;
let frameRate = 0;
let rateStartedAt = performance.now();
let rateStartedFrame = 0;
let rateRunnerMilliseconds = 0;
let ratePresentMilliseconds = 0;
let rateInstructions = 0;
let rateRunCalls = 0;
let runnerMillisecondsPerFrame = 0;
let presentMillisecondsPerFrame = 0;
let instructionsPerFrame = 0;
let runCallsPerFrame = 0;
let statusStartedAt = 0;
let statusStartedFrame = -1;
let linoFullscreenPress = false;
let linoMenuPress = false;
let linoWindowDrag = null;
let linoWindowResize = null;
let activePointerTarget = null;
let image = context.createImageData(canvas.width, canvas.height);
let pixels = new Uint32Array(image.data.buffer);

function createPcmHost() {
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  let audioContext = null;
  let source = null;
  let buffer = null;
  let sampleRate = 44100;
  let frameCount = 0;
  let offsetAtStart = 0;
  let startedAt = 0;
  let continuous = false;
  let paused = false;

  const stopSource = () => {
    if (!source) return;
    source.onended = null;
    try { source.stop(); } catch { /* already stopped */ }
    source.disconnect();
    source = null;
  };
  const currentOffset = () => {
    if (!source || !audioContext || paused) return offsetAtStart | 0;
    const elapsed = Math.max(0, Math.floor((audioContext.currentTime - startedAt) * sampleRate));
    if (continuous && frameCount > 0) return (offsetAtStart + elapsed) % frameCount;
    return Math.min(offsetAtStart + elapsed, frameCount) | 0;
  };
  const startSource = () => {
    if (!audioContext || !buffer || frameCount <= 0) return false;
    stopSource();
    source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = continuous;
    source.connect(audioContext.destination);
    const startOffset = continuous ? offsetAtStart % frameCount : Math.min(offsetAtStart, frameCount - 1);
    startedAt = audioContext.currentTime;
    source.start(0, startOffset / sampleRate);
    source.onended = () => { if (!continuous) source = null; };
    paused = false;
    return true;
  };
  const play = (request, loop) => {
    if (!AudioContextClass || request.channels !== 2 || request.bitsPerSample !== 16
        || request.samplesPerSecond <= 0 || request.size <= 0
        || request.origin < 0 || request.origin + request.size > request.memory.length) return false;
    sampleRate = request.samplesPerSecond;
    frameCount = request.size;
    continuous = loop;
    offsetAtStart = Math.max(0, Math.min(request.offset | 0, frameCount - 1));
    audioContext ??= new AudioContextClass({ sampleRate });
    buffer = audioContext.createBuffer(2, frameCount, sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);
    const end = request.origin + frameCount;
    for (let at = request.origin, frame = 0; at < end; at += 1, frame += 1) {
      const packed = request.memory[at] | 0;
      left[frame] = ((packed << 16) >> 16) / 32768;
      right[frame] = (packed >> 16) / 32768;
    }
    return startSource();
  };
  return {
    supported: Boolean(AudioContextClass),
    unlock() { return audioContext?.resume(); },
    command(request) {
      switch (request.command) {
        case 4: return { success: true, offset: currentOffset(), status: paused ? 2 : 1 };
        case 5: return { success: play(request, false), offset: 0, status: 1 };
        case 6: return { success: play(request, true), offset: 0, status: 1 };
        case 7:
          if (!source) return { success: false, offset: offsetAtStart, status: 1 };
          offsetAtStart = currentOffset(); paused = true; stopSource();
          return { success: true, offset: offsetAtStart, status: 2 };
        case 8:
          return { success: paused && startSource(), offset: offsetAtStart, status: 1 };
        case 9:
          stopSource(); buffer = null; frameCount = 0; offsetAtStart = 0; paused = false;
          return { success: true, offset: 0, status: 1 };
        default: return { success: false };
      }
    },
  };
}

const pcmHost = createPcmHost();
document.addEventListener("pointerdown", () => { void pcmHost.unlock(); }, { passive: true });
document.addEventListener("keydown", () => { void pcmHost.unlock(); });

function configureDisplay(width, height) {
  const visible = width > 0 && height > 0;
  gameStage.hidden = !visible;
  if (!visible) return false;
  // Changing a canvas's backing dimensions can discard pointer capture.
  // Keep the old surface during the stock delta-mode resize loop and apply
  // the final Lino geometry as soon as the button is released.
  if (pointerButtons !== 0 && pointerMode === 1
      && (canvas.width !== width || canvas.height !== height)) return false;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    image = context.createImageData(width, height);
    pixels = new Uint32Array(image.data.buffer);
  }
  const dormant = width === 126 && height === 25;
  linoWindow.classList.toggle("is-dormant", dormant);
  const availableWidth = Math.max(1, Math.floor(window.innerWidth * 0.96));
  linoWindow.style.width = dormant ? "146px" : `${Math.min(availableWidth, width + 20)}px`;
  return true;
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

function projectCandidates(specifier, importer, suffixes) {
  const clean = specifier.replaceAll("\\", "/");
  const bases = clean.startsWith("/")
    ? [new URL(`main/lib/${clean.slice(1)}`, sourceRoot)]
    : [new URL(clean, importer), new URL(`main/lib/${clean}`, sourceRoot)];
  return bases.flatMap((base) => suffixes.map((suffix) => new URL(`${base.href}${suffix}`)));
}

const resolvers = {
  resolveSource(specifier, importer) {
    if (/^https?:/i.test(specifier)) return fetchFirst([new URL(specifier)], "source");
    const mapped = manifest.sources[specifier.replace(/[\x00-\x20]+/g, "").replaceAll("\\", "/").toLowerCase()];
    if (mapped) return fetchFirst([new URL(mapped, sourceRoot)], "source");
    return fetchFirst(projectCandidates(specifier, importer ?? entry, ["", ".txt"]), "source");
  },
  resolveStockfile(specifier, importer) {
    const mapped = manifest.stockfiles[specifier.replace(/[\x00-\x20]+/g, "").replaceAll("\\", "/").toLowerCase()];
    if (mapped) return fetchFirst([new URL(mapped, sourceRoot)], "stockfile");
    return fetchFirst(projectCandidates(specifier, importer, ["", ".tga"]), "stockfile");
  },
};

function present(origin, width, height, memory) {
  const presentStartedAt = performance.now();
  if (!configureDisplay(width, height)) return;
  const frame = new Uint32Array(memory.buffer, memory.byteOffset + origin * 4, width * height);
  for (let index = 0; index < frame.length; index += 1) {
    const colour = frame[index];
    pixels[index] = 0xff000000 | ((colour & 0xff) << 16) | (colour & 0xff00) | ((colour >>> 16) & 0xff);
  }
  context.putImageData(image, 0, 0);
  const symbols = program.linked.symbols;
  gameLeft = memory[symbols.get("vhguileft").value] | 0;
  gameTop = memory[symbols.get("vhguitop").value] | 0;
  gameWidth = memory[symbols.get("vhguidw").value] | 0;
  gameHeight = memory[symbols.get("vhguidh").value] | 0;
  if (gameWidth > 0 && gameHeight > 0) {
    if (fullscreenCanvas.width !== gameWidth || fullscreenCanvas.height !== gameHeight) {
      fullscreenCanvas.width = gameWidth;
      fullscreenCanvas.height = gameHeight;
    }
    fullscreenContext.drawImage(
      canvas, gameLeft, gameTop, gameWidth, gameHeight,
      0, 0, gameWidth, gameHeight,
    );
  }
  frameCount += 1;
  ratePresentMilliseconds += performance.now() - presentStartedAt;
}

status.textContent = "Compiling the real 73-module Noctis project in this browser...";
const host = {
  directory: ".",
  files: namedFiles,
  globalK,
  fileChanged(name, bytes) {
    const key = String(name).replaceAll("\\", "/").toLowerCase();
    writePersistence(persistence, "files", key, bytes === null ? null : new Uint8Array(bytes));
  },
  globalKChanged(name, units) {
    writePersistence(persistence, "globalK", String(name), units === null ? null : new Int32Array(units));
  },
  keys: heldKeys,
  consoleInput,
  pointer({ mode }) {
    pointerMode = mode | 0;
    const transition = pointerTransitions.shift();
    const deltaX = transition?.deltaX ?? pointerDeltaX;
    const deltaY = transition?.deltaY ?? pointerDeltaY;
    if (!transition) {
      pointerDeltaX = 0;
      pointerDeltaY = 0;
    }
    return {
      status: 3 | (transition?.buttons ?? pointerButtons),
      x: transition?.x ?? pointerX,
      y: transition?.y ?? pointerY,
      deltaX,
      deltaY,
    };
  },
  syncDisplay({ width, height, x, y }) {
    configureDisplay(width, height);
    const position = positionBrowserWindow(x, y);
    if (position) {
      const symbols = program.linked.symbols;
      program.machine.memory[symbols.get("displayxposition").value] = position.x;
      program.machine.memory[symbols.get("displayyposition").value] = position.y;
    }
  },
  monotonicMilliseconds() {
    return performance.now();
  },
  retrace(origin, width, height, memory) {
    present(origin, width, height, memory);
    return true;
  },
  pcm(request) {
    return pcmHost.command(request);
  },
};

const program = await compileProject(entry, resolvers, {
  host,
  intrinsics: createNoctisIntrinsics(),
  precompiledRunners: {
    create: createNoctisRunners,
    instructionCount: noctisInstructionCount,
    regionSize: noctisRegionSize,
  },
  physicalWidth: Math.max(1, window.innerWidth),
  physicalHeight: Math.max(1, window.innerHeight),
  audioPlayback: pcmHost.supported,
});
status.textContent = "Starting Noctis from its real Lino entry point...";

function positionBrowserWindow(x, y) {
  if (x === 1048577 || y === 1048577) return null;
  if (!linoWindow.classList.contains("is-dormant")) {
    const bounds = linoWindow.getBoundingClientRect();
    x = Math.max(0, Math.min(Math.max(0, window.innerWidth - bounds.width), x | 0));
    y = Math.max(0, Math.min(Math.max(0, window.innerHeight - bounds.height), y | 0));
  }
  linoWindow.style.position = "fixed";
  linoWindow.style.left = `${x | 0}px`;
  linoWindow.style.top = `${y | 0}px`;
  return { x: x | 0, y: y | 0 };
}

{
  const bounds = linoWindow.getBoundingClientRect();
  const symbols = program.linked.symbols;
  const memory = program.machine.memory;
  memory[symbols.get("displayxposition").value] = Math.round(bounds.left) | 0;
  memory[symbols.get("displayyposition").value] = Math.round(bounds.top) | 0;
}

function publishPhysicalDisplay() {
  const symbols = program.linked.symbols;
  const memory = program.machine.memory;
  memory[symbols.get("displayphysicalwidth").value] = Math.max(1, window.innerWidth) | 0;
  memory[symbols.get("displayphysicalheight").value] = Math.max(1, window.innerHeight) | 0;
  configureDisplay(canvas.width, canvas.height);
}

window.addEventListener("resize", publishPhysicalDisplay);

function insideLinoBounds(name, x, y) {
  const symbol = program.linked.symbols.get(name);
  if (!symbol) return false;
  const address = symbol.value | 0;
  const memory = program.machine.memory;
  return x >= memory[address] && y >= memory[address + 1]
    && x <= memory[address + 2] && y <= memory[address + 3];
}

async function requestGameFullscreen() {
  if (!document.fullscreenElement) await gameStage.requestFullscreen();
}

function scheduleLinoMenuAction() {
  const instruction = program.linked.labels.get("menubuttonaction");
  if (instruction === undefined) throw new ReferenceError("Missing Lino menu action");
  const machine = program.machine;
  if (machine.depth === machine.stack.length) {
    const grown = new Int32Array(machine.stack.length * 2);
    grown.set(machine.stack);
    machine.stack = grown;
  }
  machine.stack[machine.depth++] = (machine.pc | 0) + 1;
  machine.pc = instruction;
  queueAnimationFrame();
}

const budgetChannel = new MessageChannel();
let budgetContinuationQueued = false;
let animationFrameRequest = 0;
function queueAnimationFrame() {
  if (animationFrameRequest !== 0) return;
  animationFrameRequest = requestAnimationFrame(() => {
    animationFrameRequest = 0;
    runFrame();
  });
}
function cancelQueuedAnimationFrame() {
  if (animationFrameRequest === 0) return;
  cancelAnimationFrame(animationFrameRequest);
  animationFrameRequest = 0;
}
budgetChannel.port1.addEventListener("message", () => {
  budgetContinuationQueued = false;
  runFrame();
});
budgetChannel.port1.start();

function continueBudget() {
  if (budgetContinuationQueued) return;
  budgetContinuationQueued = true;
  budgetChannel.port2.postMessage(0);
}

function runFrame() {
  try {
    // Reserve the next refresh before doing the frame's work. Requesting it
    // near the end of a busy callback can make Chromium defer an otherwise
    // sub-16 ms frame to the following refresh interval.
    queueAnimationFrame();
    const previousFrameCount = frameCount;
    const runnerStartedAt = performance.now();
    const result = program.run(250_000);
    const now = performance.now();
    rateRunnerMilliseconds += now - runnerStartedAt;
    rateInstructions += result.instructions;
    rateRunCalls += 1;
    const rateElapsed = now - rateStartedAt;
    if (rateElapsed >= 1000) {
      const presentedFrames = frameCount - rateStartedFrame;
      if (presentedFrames > 0) {
        frameRate = presentedFrames * 1000 / rateElapsed;
        runnerMillisecondsPerFrame = Math.max(0, rateRunnerMilliseconds - ratePresentMilliseconds) / presentedFrames;
        presentMillisecondsPerFrame = ratePresentMilliseconds / presentedFrames;
        instructionsPerFrame = rateInstructions / presentedFrames;
        runCallsPerFrame = rateRunCalls / presentedFrames;
      }
      rateStartedFrame = frameCount;
      rateStartedAt = now;
      rateRunnerMilliseconds = 0;
      ratePresentMilliseconds = 0;
      rateInstructions = 0;
      rateRunCalls = 0;
    }
    if (frameCount !== statusStartedFrame || now - statusStartedAt >= 500) {
      const rate = frameRate > 0 ? ` / ${frameRate.toFixed(1)} FPS` : "";
      const diagnostic = frameRate > 0
        ? ` / JS ${runnerMillisecondsPerFrame.toFixed(1)} ms + display ${presentMillisecondsPerFrame.toFixed(1)} ms / ${(instructionsPerFrame / 1_000_000).toFixed(2)}M ops / ${runCallsPerFrame.toFixed(1)} slices`
        : "";
      status.textContent = `Noctis / ${frameCount} presentations${rate}${diagnostic} / ${result.status}`;
      statusStartedFrame = frameCount;
      statusStartedAt = now;
    }
    if (!program.machine.halted) {
      if (result.sleepMilliseconds > 0) {
        cancelQueuedAnimationFrame();
        setTimeout(runFrame, result.sleepMilliseconds);
      } else if (result.status === "budget" && frameCount === previousFrameCount) {
        cancelQueuedAnimationFrame();
        continueBudget();
      }
    } else cancelQueuedAnimationFrame();
  } catch (error) {
    cancelQueuedAnimationFrame();
    status.textContent = `Lino stopped: ${error.message}`;
    showCrash(error);
    throw error;
  }
}

function pointerPosition(event, target = event.currentTarget) {
  const bounds = target.getBoundingClientRect();
  const localX = Math.max(0, Math.min(target.width - 1, Math.floor((event.clientX - bounds.left) * target.width / bounds.width)));
  const localY = Math.max(0, Math.min(target.height - 1, Math.floor((event.clientY - bounds.top) * target.height / bounds.height)));
  const nextX = target === fullscreenCanvas ? localX + gameLeft : localX;
  const nextY = target === fullscreenCanvas ? localY + gameTop : localY;
  const deltaX = pointerMode === 1
    ? Math.round(event.movementX * target.width / bounds.width)
    : nextX - pointerX;
  const deltaY = pointerMode === 1
    ? Math.round(event.movementY * target.height / bounds.height)
    : nextY - pointerY;
  if (pointerButtons === 0) {
    pointerDeltaX += deltaX;
    pointerDeltaY += deltaY;
  }
  pointerX = nextX;
  pointerY = nextY;
  return { deltaX, deltaY };
}

function movePointer(event, target) {
  const movement = pointerPosition(event, target);
  if (pointerButtons !== 0) {
    pointerTransitions.push({
      buttons: pointerButtons,
      x: pointerX,
      y: pointerY,
      deltaX: movement.deltaX,
      deltaY: movement.deltaY,
    });
    if (linoWindowResize) {
      linoWindowResize.queuedX += movement.deltaX;
      linoWindowResize.queuedY += movement.deltaY;
    }
  }
  if (linoWindowDrag && target === canvas) {
    const left = linoWindowDrag.left + event.clientX - linoWindowDrag.clientX;
    const top = linoWindowDrag.top + event.clientY - linoWindowDrag.clientY;
    const position = positionBrowserWindow(left, top);
    const symbols = program.linked.symbols;
    const memory = program.machine.memory;
    if (position) {
      memory[symbols.get("displayxposition").value] = position.x;
      memory[symbols.get("displayyposition").value] = position.y;
    }
  }
}

function releasePointer(event, target) {
  pointerPosition(event, target);
  if (linoMenuPress) {
    if (event.button === 0 && target === canvas
        && insideLinoBounds("menubuttonhotspot", pointerX, pointerY)) {
      scheduleLinoMenuAction();
    }
    linoMenuPress = false;
    activePointerTarget = null;
    return;
  }
  if (linoWindowResize) {
    const desiredX = Math.round(
      (event.clientX - linoWindowResize.clientX)
      * linoWindowResize.width / linoWindowResize.cssWidth,
    );
    const desiredY = Math.round(
      (event.clientY - linoWindowResize.clientY)
      * linoWindowResize.height / linoWindowResize.cssHeight,
    );
    const deltaX = desiredX - linoWindowResize.queuedX;
    const deltaY = desiredY - linoWindowResize.queuedY;
    if (deltaX !== 0 || deltaY !== 0) {
      pointerTransitions.push({ buttons: pointerButtons, x: pointerX, y: pointerY, deltaX, deltaY });
    }
  }
  pointerButtons &= ~(event.button === 0 ? 4 : event.button === 2 ? 8 : 16);
  pointerDeltaX = 0;
  pointerDeltaY = 0;
  pointerTransitions.push({ buttons: pointerButtons, x: pointerX, y: pointerY, deltaX: 0, deltaY: 0 });
  if (linoFullscreenPress && event.button === 0 && target === canvas
      && insideLinoBounds("fullbuttonhotspot", pointerX, pointerY)) {
    requestGameFullscreen().catch((error) => {
      status.textContent = `Full screen unavailable: ${error.message}`;
    });
  }
  linoFullscreenPress = false;
  linoWindowDrag = null;
  linoWindowResize = null;
  activePointerTarget = null;
}

function cancelActivePointer() {
  if (pointerButtons === 0 && activePointerTarget === null && !linoMenuPress) return;
  // Match the button-up edge an OS host supplies when capture or focus is
  // interrupted. Without it, a legacy hotspot can remain pressed forever.
  pointerButtons = 0;
  pointerDeltaX = 0;
  pointerDeltaY = 0;
  pointerTransitions.push({
    buttons: 0, x: pointerX, y: pointerY, deltaX: 0, deltaY: 0,
  });
  linoFullscreenPress = false;
  linoMenuPress = false;
  linoWindowDrag = null;
  linoWindowResize = null;
  activePointerTarget = null;
}

for (const target of [canvas, fullscreenCanvas]) {
  target.addEventListener("pointermove", (event) => movePointer(event, target));
  target.addEventListener("pointerdown", (event) => {
    pointerPosition(event);
    if (event.button === 0 && target === canvas
        && insideLinoBounds("menubuttonhotspot", pointerX, pointerY)) {
      linoMenuPress = true;
      activePointerTarget = target;
      target.focus();
      target.setPointerCapture(event.pointerId);
      return;
    }
    linoFullscreenPress = event.button === 0 && target === canvas
      && insideLinoBounds("fullbuttonhotspot", pointerX, pointerY);
    pointerButtons |= event.button === 0 ? 4 : event.button === 2 ? 8 : 16;
    pointerDeltaX = 0;
    pointerDeltaY = 0;
    pointerTransitions.push({ buttons: pointerButtons, x: pointerX, y: pointerY, deltaX: 0, deltaY: 0 });
    activePointerTarget = target;
    if (event.button === 0 && target === canvas
        && insideLinoBounds("titlebarbounds", pointerX, pointerY)) {
      const bounds = linoWindow.getBoundingClientRect();
      linoWindowDrag = {
        clientX: event.clientX,
        clientY: event.clientY,
        left: bounds.left,
        top: bounds.top,
      };
    }
    if (event.button === 0 && target === canvas
        && insideLinoBounds("sizebuttonhotspot", pointerX, pointerY)) {
      const bounds = canvas.getBoundingClientRect();
      linoWindowResize = {
        clientX: event.clientX,
        clientY: event.clientY,
        width: canvas.width,
        height: canvas.height,
        cssWidth: bounds.width,
        cssHeight: bounds.height,
        queuedX: 0,
        queuedY: 0,
      };
    }
    target.focus();
    target.setPointerCapture(event.pointerId);
  });
  target.addEventListener("pointerup", (event) => releasePointer(event, target));
  target.addEventListener("pointercancel", cancelActivePointer);
  target.addEventListener("lostpointercapture", () => {
    if (activePointerTarget === target) cancelActivePointer();
  });
  target.addEventListener("contextmenu", (event) => event.preventDefault());
}

window.addEventListener("pointermove", (event) => {
  if (pointerButtons === 0 || !activePointerTarget
      || event.target === canvas || event.target === fullscreenCanvas) return;
  movePointer(event, activePointerTarget);
});
window.addEventListener("pointerup", (event) => {
  if (!activePointerTarget || event.target === canvas || event.target === fullscreenCanvas) return;
  releasePointer(event, activePointerTarget);
});
window.addEventListener("mouseup", (event) => {
  if ((pointerButtons === 0 && !linoMenuPress) || !activePointerTarget) return;
  releasePointer(event, activePointerTarget);
});

function linoKey(code) {
  if (/^Key[A-Z]$/.test(code)) return `key${code.slice(3).toLowerCase()}`;
  if (/^Digit[0-9]$/.test(code)) return `key${code.slice(5)}`;
  if (/^F(?:[1-9]|1[0-9]|2[0-4])$/.test(code)) return `key${code.toLowerCase()}`;
  if (/^Numpad[0-9]$/.test(code)) return `key${code.slice(6)}n`;
  return ({
    Backspace: "keybackspace", Tab: "keytab", Enter: "keyreturn",
    Escape: "keyescape", Space: "keyspacebar", Insert: "keyinsert",
    Delete: "keydelete", Home: "keyhome", End: "keyend",
    PageUp: "keypgup", PageDown: "keypgdn", ArrowUp: "keyup",
    ArrowDown: "keydown", ArrowLeft: "keyleft", ArrowRight: "keyright",
    NumpadDivide: "keyslash", NumpadMultiply: "keyasterisk",
    NumpadSubtract: "keyhyphen", NumpadAdd: "keycross",
    NumpadDecimal: "keydot", ShiftLeft: "keyshift", ShiftRight: "keyshift",
    ControlLeft: "keycontrol", ControlRight: "keycontrol",
    AltLeft: "keyalternate", AltRight: "keyalternate", Pause: "keypause",
    NumLock: "keynumlock", CapsLock: "keycapslock", ScrollLock: "keyscrolllock",
  })[code];
}

function asciiInput(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) return null;
  if (event.key.length === 1) return event.key.codePointAt(0);
  return ({ Enter: 13, Tab: 9, Backspace: 8, Escape: 27 })[event.key] ?? null;
}

for (const target of [canvas, fullscreenCanvas]) {
  target.addEventListener("keydown", (event) => {
    const key = linoKey(event.code);
    if (key) heldKeys[key] = 1;
    const ascii = asciiInput(event);
    if (ascii !== null) consoleInput.push(ascii);
    if (key || ascii !== null) event.preventDefault();
  });
  target.addEventListener("keyup", (event) => {
    const key = linoKey(event.code);
    if (key) delete heldKeys[key];
    if (key) event.preventDefault();
  });
}
window.addEventListener("blur", () => {
  cancelActivePointer();
  for (const key of Object.keys(heldKeys)) delete heldKeys[key];
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) cancelActivePointer();
});

exitFullscreenButton.addEventListener("click", () => document.exitFullscreen());
fullscreenCanvas.addEventListener("dblclick", () => document.exitFullscreen());
document.addEventListener("keydown", async (event) => {
  if (!(event.ctrlKey && event.shiftKey && event.code === "KeyF")) return;
  event.preventDefault();
  if (document.fullscreenElement) await document.exitFullscreen();
  else await gameStage.requestFullscreen();
});
document.addEventListener("fullscreenchange", () => {
  const active = document.fullscreenElement === gameStage;
  exitFullscreenButton.hidden = !active;
  fullscreenCanvas.hidden = !active;
  (active ? fullscreenCanvas : canvas).focus();
});

runFrame();
}
