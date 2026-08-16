import { createForegroundRuntime } from "./game-worker.js";

const linoWindow = document.querySelector("#lino-window");
const gameStage = document.querySelector("#game-stage");
const canvas = document.querySelector("#game");
const context = canvas.getContext("2d", { alpha: false });
const fullscreenCanvas = document.querySelector("#fullscreen-game");
const fullscreenContext = fullscreenCanvas.getContext("2d", { alpha: false });
const exitFullscreenButton = document.querySelector("#exit-fullscreen");
const status = document.querySelector("#status");
const sourceRoot = new URL("./lino-src/", location.href);

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
  } catch { /* storage is optional */ }
}

function createPcmHost() {
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  let audioContext = null;
  let source = null;
  let buffer = null;
  let sampleRate = 44100;
  let frames = 0;
  let offset = 0;
  let loop = false;
  let paused = false;
  const stop = () => {
    if (!source) return;
    source.onended = null;
    try { source.stop(); } catch { /* already stopped */ }
    source.disconnect();
    source = null;
  };
  const start = () => {
    if (!audioContext || !buffer || frames <= 0) return false;
    stop();
    source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(audioContext.destination);
    source.start(0, (loop ? offset % frames : Math.min(offset, frames - 1)) / sampleRate);
    source.onended = () => { if (!loop) source = null; };
    paused = false;
    return true;
  };
  return {
    supported: Boolean(AudioContextClass),
    unlock: () => audioContext?.resume(),
    command(message) {
      if (message.command === 5 || message.command === 6) {
        const samples = message.samples;
        sampleRate = message.samplesPerSecond | 0;
        frames = samples.length;
        offset = message.offset | 0;
        loop = message.command === 6;
        audioContext ??= new AudioContextClass({ sampleRate });
        buffer = audioContext.createBuffer(2, frames, sampleRate);
        const left = buffer.getChannelData(0);
        const right = buffer.getChannelData(1);
        for (let index = 0; index < frames; index += 1) {
          const packed = samples[index] | 0;
          left[index] = ((packed << 16) >> 16) / 32768;
          right[index] = (packed >> 16) / 32768;
        }
        start();
      } else if (message.command === 7) {
        paused = true;
        stop();
      } else if (message.command === 8 && paused) start();
      else if (message.command === 9) {
        stop();
        buffer = null;
        frames = 0;
        offset = 0;
        paused = false;
      }
    },
  };
}

const persistence = await openPersistence();
const savedFiles = (await readPersistenceStore(persistence, "files"))
  .map(([name, bytes]) => [String(name), new Uint8Array(bytes)]);
const savedGlobalK = (await readPersistenceStore(persistence, "globalK"))
  .map(([name, units]) => [String(name), units instanceof Int32Array ? units : new Int32Array(units)])
  .filter(([, units]) => units.length === 255);
const pcmHost = createPcmHost();
const worker = new URLSearchParams(location.search).get("runtime") === "foreground"
  ? createForegroundRuntime()
  : new Worker(new URL("./game-worker.js", import.meta.url), { type: "module" });
globalThis.__linoRuntime = worker;

let pointerX = 0;
let pointerY = 0;
let pointerButtons = 0;
let pointerMode = 0;
let gameLeft = 0;
let gameTop = 0;
let gameWidth = 320;
let gameHeight = 200;
let linoFullscreenPress = false;
let linoWindowDrag = null;
let linoWindowResize = null;
let activePointerTarget = null;
let ui = Object.create(null);
let pendingFrame = null;
let image = context.createImageData(canvas.width, canvas.height);
let imagePixels = new Uint32Array(image.data.buffer);
let displayTicks = 0;
let displayRate = 0;
let displayStartedAt = performance.now();
let displayMilliseconds = 0;
let lastMetrics = null;

function releaseFrame(frame) {
  if (!frame) return;
  if (frame.borrowed) worker.postMessage({ type: "frameCredit" });
  else worker.postMessage({ type: "frameCredit", buffer: frame.pixels.buffer }, [frame.pixels.buffer]);
}

function configureDisplay(width, height) {
  const visible = width > 0 && height > 0;
  gameStage.hidden = !visible;
  if (!visible) return false;
  if (pointerButtons !== 0 && pointerMode === 1
      && (canvas.width !== width || canvas.height !== height)) return false;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    image = context.createImageData(width, height);
    imagePixels = new Uint32Array(image.data.buffer);
  }
  const dormant = width === 126 && height === 25;
  linoWindow.classList.toggle("is-dormant", dormant);
  const availableWidth = Math.max(1, Math.floor(window.innerWidth * 0.96));
  linoWindow.style.width = dormant ? "146px" : `${Math.min(availableWidth, width + 20)}px`;
  return true;
}

function positionBrowserWindow(x, y) {
  if (x === 1048577 || y === 1048577) return;
  linoWindow.style.position = "fixed";
  linoWindow.style.left = `${x | 0}px`;
  linoWindow.style.top = `${y | 0}px`;
}

function present(frame) {
  const started = performance.now();
  if (!configureDisplay(frame.width, frame.height)) return;
  const source = frame.pixels;
  for (let index = 0; index < source.length; index += 1) {
    const colour = source[index];
    imagePixels[index] = 0xff000000 | ((colour & 0xff) << 16) | (colour & 0xff00) | ((colour >>> 16) & 0xff);
  }
  context.putImageData(image, 0, 0);
  ui = frame.ui ?? ui;
  gameLeft = ui.vhguileft ?? gameLeft;
  gameTop = ui.vhguitop ?? gameTop;
  gameWidth = ui.vhguidw ?? gameWidth;
  gameHeight = ui.vhguidh ?? gameHeight;
  if (gameWidth > 0 && gameHeight > 0) {
    if (fullscreenCanvas.width !== gameWidth || fullscreenCanvas.height !== gameHeight) {
      fullscreenCanvas.width = gameWidth;
      fullscreenCanvas.height = gameHeight;
    }
    fullscreenContext.drawImage(canvas, gameLeft, gameTop, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight);
  }
  lastMetrics = frame.metrics;
  displayMilliseconds += performance.now() - started;
}

function animationFrame(now) {
  displayTicks += 1;
  worker.tick?.();
  if (pendingFrame) {
    const frame = pendingFrame;
    pendingFrame = null;
    present(frame);
    releaseFrame(frame);
  }
  const elapsed = now - displayStartedAt;
  if (elapsed >= 1000) {
    displayRate = displayTicks * 1000 / elapsed;
    const displayPerTick = displayMilliseconds / Math.max(1, displayTicks);
    if (lastMetrics) {
      status.textContent = `Noctis / ${lastMetrics.renderedFrames} presentations / ${lastMetrics.renderedFps.toFixed(1)} FPS rendered / ${displayRate.toFixed(1)} Hz display / render ${lastMetrics.runnerMillisecondsPerFrame.toFixed(1)} ms + display ${displayPerTick.toFixed(1)} ms / ${(lastMetrics.instructionsPerFrame / 1_000_000).toFixed(2)}M ops / ${lastMetrics.status}`;
    }
    displayTicks = 0;
    displayMilliseconds = 0;
    displayStartedAt = now;
  }
  requestAnimationFrame(animationFrame);
}

function insideLinoBounds(name, x, y) {
  const bounds = ui[name];
  return Array.isArray(bounds) && bounds.length >= 4
    && x >= bounds[0] && y >= bounds[1] && x <= bounds[2] && y <= bounds[3];
}

function sendPointer(deltaX, deltaY, transition) {
  worker.postMessage({
    type: "pointer", x: pointerX, y: pointerY, buttons: pointerButtons,
    deltaX, deltaY, transition,
  });
}

function pointerPosition(event, target = event.currentTarget) {
  const bounds = target.getBoundingClientRect();
  const localX = Math.max(0, Math.min(target.width - 1, Math.floor((event.clientX - bounds.left) * target.width / bounds.width)));
  const localY = Math.max(0, Math.min(target.height - 1, Math.floor((event.clientY - bounds.top) * target.height / bounds.height)));
  const nextX = target === fullscreenCanvas ? localX + gameLeft : localX;
  const nextY = target === fullscreenCanvas ? localY + gameTop : localY;
  const deltaX = pointerMode === 1
    ? Math.round(event.movementX * target.width / bounds.width) : nextX - pointerX;
  const deltaY = pointerMode === 1
    ? Math.round(event.movementY * target.height / bounds.height) : nextY - pointerY;
  pointerX = nextX;
  pointerY = nextY;
  return { deltaX, deltaY };
}

function movePointer(event, target) {
  const movement = pointerPosition(event, target);
  sendPointer(movement.deltaX, movement.deltaY, pointerButtons !== 0);
  if (linoWindowDrag && target === canvas) {
    const left = linoWindowDrag.left + event.clientX - linoWindowDrag.clientX;
    const top = linoWindowDrag.top + event.clientY - linoWindowDrag.clientY;
    positionBrowserWindow(left, top);
    worker.postMessage({ type: "displayPosition", x: Math.round(left), y: Math.round(top) });
  }
  if (linoWindowResize) {
    linoWindowResize.queuedX += movement.deltaX;
    linoWindowResize.queuedY += movement.deltaY;
  }
}

async function requestGameFullscreen() {
  if (!document.fullscreenElement) await gameStage.requestFullscreen();
}

function releasePointer(event, target) {
  pointerPosition(event, target);
  if (linoWindowResize) {
    const desiredX = Math.round((event.clientX - linoWindowResize.clientX) * linoWindowResize.width / linoWindowResize.cssWidth);
    const desiredY = Math.round((event.clientY - linoWindowResize.clientY) * linoWindowResize.height / linoWindowResize.cssHeight);
    const deltaX = desiredX - linoWindowResize.queuedX;
    const deltaY = desiredY - linoWindowResize.queuedY;
    if (deltaX !== 0 || deltaY !== 0) sendPointer(deltaX, deltaY, true);
  }
  pointerButtons &= ~(event.button === 0 ? 4 : event.button === 2 ? 8 : 16);
  sendPointer(0, 0, true);
  if (linoFullscreenPress && event.button === 0 && target === canvas
      && insideLinoBounds("fullbuttonhotspot", pointerX, pointerY)) {
    requestGameFullscreen().catch((error) => { status.textContent = `Full screen unavailable: ${error.message}`; });
  }
  linoFullscreenPress = false;
  linoWindowDrag = null;
  linoWindowResize = null;
  activePointerTarget = null;
}

for (const target of [canvas, fullscreenCanvas]) {
  target.addEventListener("pointermove", (event) => movePointer(event, target));
  target.addEventListener("pointerdown", (event) => {
    pointerPosition(event);
    linoFullscreenPress = event.button === 0 && target === canvas
      && insideLinoBounds("fullbuttonhotspot", pointerX, pointerY);
    pointerButtons |= event.button === 0 ? 4 : event.button === 2 ? 8 : 16;
    sendPointer(0, 0, true);
    activePointerTarget = target;
    if (event.button === 0 && target === canvas && insideLinoBounds("titlebarbounds", pointerX, pointerY)) {
      const bounds = linoWindow.getBoundingClientRect();
      linoWindowDrag = { clientX: event.clientX, clientY: event.clientY, left: bounds.left, top: bounds.top };
    }
    if (event.button === 0 && target === canvas && insideLinoBounds("sizebuttonhotspot", pointerX, pointerY)) {
      const bounds = canvas.getBoundingClientRect();
      linoWindowResize = {
        clientX: event.clientX, clientY: event.clientY, width: canvas.width, height: canvas.height,
        cssWidth: bounds.width, cssHeight: bounds.height, queuedX: 0, queuedY: 0,
      };
    }
    target.focus();
    target.setPointerCapture(event.pointerId);
  });
  target.addEventListener("pointerup", (event) => releasePointer(event, target));
  target.addEventListener("contextmenu", (event) => event.preventDefault());
}

window.addEventListener("pointermove", (event) => {
  if (pointerButtons === 0 || !activePointerTarget || event.target === canvas || event.target === fullscreenCanvas) return;
  movePointer(event, activePointerTarget);
});
window.addEventListener("pointerup", (event) => {
  if (!activePointerTarget || event.target === canvas || event.target === fullscreenCanvas) return;
  releasePointer(event, activePointerTarget);
});

function linoKey(code) {
  if (/^Key[A-Z]$/.test(code)) return `key${code.slice(3).toLowerCase()}`;
  if (/^Digit[0-9]$/.test(code)) return `key${code.slice(5)}`;
  if (/^F(?:[1-9]|1[0-9]|2[0-4])$/.test(code)) return `key${code.toLowerCase()}`;
  if (/^Numpad[0-9]$/.test(code)) return `key${code.slice(6)}n`;
  return ({
    Backspace: "keybackspace", Tab: "keytab", Enter: "keyreturn", Escape: "keyescape",
    Space: "keyspacebar", Insert: "keyinsert", Delete: "keydelete", Home: "keyhome", End: "keyend",
    PageUp: "keypgup", PageDown: "keypgdn", ArrowUp: "keyup", ArrowDown: "keydown",
    ArrowLeft: "keyleft", ArrowRight: "keyright", NumpadDivide: "keyslash",
    NumpadMultiply: "keyasterisk", NumpadSubtract: "keyhyphen", NumpadAdd: "keycross",
    NumpadDecimal: "keydot", ShiftLeft: "keyshift", ShiftRight: "keyshift",
    ControlLeft: "keycontrol", ControlRight: "keycontrol", AltLeft: "keyalternate",
    AltRight: "keyalternate", Pause: "keypause", NumLock: "keynumlock",
    CapsLock: "keycapslock", ScrollLock: "keyscrolllock",
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
    if (key) worker.postMessage({ type: "key", name: key, down: true });
    const ascii = asciiInput(event);
    if (ascii !== null) worker.postMessage({ type: "ascii", value: ascii });
    if (key || ascii !== null) event.preventDefault();
  });
  target.addEventListener("keyup", (event) => {
    const key = linoKey(event.code);
    if (key) worker.postMessage({ type: "key", name: key, down: false });
    if (key) event.preventDefault();
  });
}

window.addEventListener("blur", () => worker.postMessage({ type: "clearKeys" }));
window.addEventListener("resize", () => worker.postMessage({
  type: "physical", width: Math.max(1, window.innerWidth), height: Math.max(1, window.innerHeight),
}));
document.addEventListener("pointerdown", () => { void pcmHost.unlock(); }, { passive: true });
document.addEventListener("keydown", () => { void pcmHost.unlock(); });
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

worker.addEventListener("message", (event) => {
  const message = event.data ?? {};
  if (message.type === "ready") status.textContent = "Starting Noctis...";
  else if (message.type === "frame") {
    releaseFrame(pendingFrame);
    pendingFrame = message;
  }
  else if (message.type === "display") {
    configureDisplay(message.width | 0, message.height | 0);
    positionBrowserWindow(message.x | 0, message.y | 0);
  } else if (message.type === "pointerMode") pointerMode = message.mode | 0;
  else if (message.type === "fileChanged") {
    const key = String(message.name).replaceAll("\\", "/").toLowerCase();
    writePersistence(persistence, "files", key, message.bytes === null ? null : new Uint8Array(message.bytes));
  } else if (message.type === "globalKChanged") {
    writePersistence(persistence, "globalK", String(message.name), message.units === null ? null : new Int32Array(message.units));
  } else if (message.type === "pcm") pcmHost.command(message);
  else if (message.type === "stopped") status.textContent = `Lino stopped: ${message.status}`;
  else if (message.type === "error") status.textContent = `Lino stopped: ${message.message}`;
});
worker.addEventListener("error", (event) => { status.textContent = `Lino worker failed: ${event.message}`; });

status.textContent = "Compiling the real 73-module Noctis project in JavaScript...";
const windowBounds = linoWindow.getBoundingClientRect();
worker.postMessage({
  type: "init", sourceRoot: sourceRoot.href, files: savedFiles, globalK: savedGlobalK,
  physicalWidth: Math.max(1, window.innerWidth), physicalHeight: Math.max(1, window.innerHeight),
  audioPlayback: pcmHost.supported, windowBounds: { x: windowBounds.left, y: windowBounds.top },
});
requestAnimationFrame(animationFrame);
