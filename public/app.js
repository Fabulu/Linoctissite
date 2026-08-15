import { compileProject } from "./linojava/compiler.js";

const root = document.querySelector("#lino-window");
const canvas = document.querySelector("#game");
const context = canvas.getContext("2d", { alpha: false });
const fullscreenButton = document.querySelector("#fullscreen");
const exitFullscreenButton = document.querySelector("#exit-fullscreen");
const status = document.querySelector("#status");
const sourceRoot = new URL("./lino-src/", location.href);
const entry = new URL("examples/iGUIcli.txt", sourceRoot).href;
const manifest = await fetch(new URL("manifest.json", sourceRoot)).then((response) => response.json());
let pointerX = 0;
let pointerY = 0;
let pointerButtons = 0;
const heldKeys = Object.create(null);
const consoleInput = [];
let frameCount = 0;
let image = context.createImageData(canvas.width, canvas.height);
let pixels = new Uint32Array(image.data.buffer);

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
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    image = context.createImageData(width, height);
    pixels = new Uint32Array(image.data.buffer);
  }
  const frame = new Uint32Array(memory.buffer, memory.byteOffset + origin * 4, width * height);
  for (let index = 0; index < frame.length; index += 1) {
    const colour = frame[index];
    pixels[index] = 0xff000000 | ((colour & 0xff) << 16) | (colour & 0xff00) | ((colour >>> 16) & 0xff);
  }
  context.putImageData(image, 0, 0);
  frameCount += 1;
}

status.textContent = "Compiling 14 Lino modules in this browser...";
const host = {
  directory: ".",
  keys: heldKeys,
  consoleInput,
  pointer() {
    return { status: 3 | pointerButtons, x: pointerX, y: pointerY };
  },
  monotonicMilliseconds() {
    return performance.now();
  },
  retrace(origin, width, height, memory) {
    present(origin, width, height, memory);
    return true;
  },
};

const program = await compileProject(entry, resolvers, { host });
status.textContent = "Starting the Lino-rendered iGUI...";

function runFrame() {
  try {
    const result = program.run(2_000_000);
    status.textContent = `Real iGUI / ${frameCount} frame${frameCount === 1 ? "" : "s"} / ${result.status}`;
    if (!program.machine.halted) {
      if (result.sleepMilliseconds > 0) setTimeout(runFrame, result.sleepMilliseconds);
      else requestAnimationFrame(runFrame);
    }
  } catch (error) {
    status.textContent = `Lino stopped: ${error.message}`;
    throw error;
  }
}

function pointerPosition(event) {
  const bounds = canvas.getBoundingClientRect();
  pointerX = Math.max(0, Math.min(canvas.width - 1, Math.floor((event.clientX - bounds.left) * canvas.width / bounds.width)));
  pointerY = Math.max(0, Math.min(canvas.height - 1, Math.floor((event.clientY - bounds.top) * canvas.height / bounds.height)));
}

canvas.addEventListener("pointermove", pointerPosition);
canvas.addEventListener("pointerdown", (event) => {
  pointerPosition(event);
  pointerButtons |= event.button === 0 ? 4 : event.button === 2 ? 8 : 16;
  canvas.focus();
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener("pointerup", (event) => {
  pointerPosition(event);
  pointerButtons &= ~(event.button === 0 ? 4 : event.button === 2 ? 8 : 16);
});
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

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

canvas.addEventListener("keydown", (event) => {
  const key = linoKey(event.code);
  if (key) heldKeys[key] = 1;
  const ascii = asciiInput(event);
  if (ascii !== null) consoleInput.push(ascii);
  if (key || ascii !== null) event.preventDefault();
});
canvas.addEventListener("keyup", (event) => {
  const key = linoKey(event.code);
  if (key) delete heldKeys[key];
  if (key) event.preventDefault();
});
window.addEventListener("blur", () => {
  for (const key of Object.keys(heldKeys)) delete heldKeys[key];
});

fullscreenButton.addEventListener("click", async () => {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await root.requestFullscreen();
  canvas.focus();
});
exitFullscreenButton.addEventListener("click", () => document.exitFullscreen());
document.addEventListener("fullscreenchange", () => {
  const active = document.fullscreenElement === root;
  exitFullscreenButton.hidden = !active;
  fullscreenButton.setAttribute("aria-label", active ? "Exit full screen" : "Enter full screen");
});

runFrame();
