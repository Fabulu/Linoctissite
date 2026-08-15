import { compileProject } from "./linojava/compiler.js";
import { dispatchIsoKernel, OFFSETS } from "./linojava/compiler/isokernel-abi.js";

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
  retrace(origin, width, height, memory) {
    present(origin, width, height, memory);
    return true;
  },
  isocall(machine, linked) {
    const memory = machine.memory;
    const base = linked.memoryLayout.kernelBase;
    const pointerCommand = memory[base + OFFSETS.PointerCommand];
    const timerCommand = memory[base + OFFSETS.SYStimeCommand];
    const processCommand = memory[base + OFFSETS.ProcessCommand];
    if (pointerCommand === 12) {
      memory[base + OFFSETS.PointerXCoordinate] = pointerX;
      memory[base + OFFSETS.PointerYCoordinate] = pointerY;
      memory[base + OFFSETS.PointerStatus] = 3 | pointerButtons;
    }
    if (timerCommand === 29) {
      memory[base + OFFSETS.SYStimeCounts] = Math.floor(performance.now() * 1000) | 0;
      memory[base + OFFSETS.CountsPerMillisecond] = 1000;
    }
    const result = dispatchIsoKernel(memory, { ...host, stockfile: linked.stockfile }, { kernelBase: base });
    if (processCommand === 35) result.yielded = true;
    return result;
  },
};

const program = await compileProject(entry, resolvers, { host });
status.textContent = "Starting the Lino-rendered iGUI...";

function runFrame() {
  try {
    const result = program.run(2_000_000);
    status.textContent = `Real iGUI / ${frameCount} frame${frameCount === 1 ? "" : "s"} / ${result.status}`;
    if (!program.machine.halted) requestAnimationFrame(runFrame);
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
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener("pointerup", (event) => {
  pointerPosition(event);
  pointerButtons &= ~(event.button === 0 ? 4 : event.button === 2 ? 8 : 16);
});
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

fullscreenButton.addEventListener("click", async () => {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await root.requestFullscreen();
});
exitFullscreenButton.addEventListener("click", () => document.exitFullscreen());
document.addEventListener("fullscreenchange", () => {
  const active = document.fullscreenElement === root;
  exitFullscreenButton.hidden = !active;
  fullscreenButton.setAttribute("aria-label", active ? "Exit full screen" : "Enter full screen");
});

runFrame();
