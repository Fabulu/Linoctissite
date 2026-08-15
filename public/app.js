import { createProgram, metadata } from "./noctis_probe.js";

const root = document.querySelector("#lino-window");
const canvas = document.querySelector("#game");
const context = canvas.getContext("2d", { alpha: false });
const fullscreenButton = document.querySelector("#fullscreen");
const exitFullscreenButton = document.querySelector("#exit-fullscreen");
const menuButton = document.querySelector("#game-menu");
const menuPanel = document.querySelector("#menu-panel");
const resetStateButton = document.querySelector("#reset-state");
const status = document.querySelector("#status");
const coordinates = document.querySelector("#coordinates");
const keys = new Set();
const image = context.createImageData(canvas.width, canvas.height);
const pixels = new Uint32Array(image.data.buffer);
const snapshotKey = "linoctis.machine.v1";

const program = createProgram({ isocall: () => true });
let restored = false;
try {
  const saved = localStorage.getItem(snapshotKey);
  if (saved) {
    program.restore(JSON.parse(saved));
    restored = true;
  }
} catch {
  localStorage.removeItem(snapshotKey);
}

function pressed(...names) {
  return names.some((name) => keys.has(name));
}

function drawPixel(x, y, red, green, blue) {
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
  pixels[y * canvas.width + x] = (255 << 24) | (blue << 16) | (green << 8) | red;
}

function render() {
  const frame = program.get("frame");
  const playerX = program.get("player_x");
  const playerY = program.get("player_y");

  for (let y = 0; y < canvas.height; y += 1) {
    const sky = Math.max(2, 15 - Math.floor(y / 15));
    const colour = (255 << 24) | ((sky + 9) << 16) | ((sky + 4) << 8) | sky;
    pixels.fill(colour, y * canvas.width, (y + 1) * canvas.width);
  }

  for (let star = 0; star < 150; star += 1) {
    const x = (star * 137 + 29) % 320;
    const y = (star * 61 + 17) % 135;
    const pulse = ((frame >> 3) + star) & 3;
    const light = 95 + pulse * 45;
    drawPixel(x, y, light, light + 4, Math.min(255, light + 16));
  }

  for (let x = 0; x < 320; x += 1) {
    const ridge = 151 + Math.floor(8 * Math.sin((x + frame * 0.08) / 27));
    for (let y = ridge; y < 200; y += 1) {
      const shade = Math.min(46, 15 + Math.floor((y - ridge) * 0.7));
      drawPixel(x, y, shade - 4, shade, shade + 3);
    }
  }

  for (let offset = -5; offset <= 5; offset += 1) {
    drawPixel(playerX + offset, playerY, 223, 239, 248);
    drawPixel(playerX, playerY + offset, 223, 239, 248);
  }
  drawPixel(playerX, playerY, 255, 191, 69);
  context.putImageData(image, 0, 0);
  coordinates.textContent = `X ${playerX} / Y ${playerY}`;
}

function tick() {
  const speed = pressed("ShiftLeft", "ShiftRight") ? 3 : 2;
  program.set("input_x", (pressed("KeyD", "ArrowRight") ? speed : 0) - (pressed("KeyA", "ArrowLeft") ? speed : 0));
  program.set("input_y", (pressed("KeyS", "ArrowDown") ? speed : 0) - (pressed("KeyW", "ArrowUp") ? speed : 0));
  const result = program.step();
  render();
  const frame = program.get("frame");
  if ((frame % 300) === 0) localStorage.setItem(snapshotKey, JSON.stringify(program.snapshot()));
  status.textContent = `${restored ? "State restored / " : ""}Running ${metadata.backend} / ${metadata.blocks} blocks / ${result.status}`;
  restored = false;
  requestAnimationFrame(tick);
}

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
    event.preventDefault();
  }
  keys.add(event.code);
});

window.addEventListener("keyup", (event) => keys.delete(event.code));
window.addEventListener("blur", () => keys.clear());
window.addEventListener("beforeunload", () => {
  localStorage.setItem(snapshotKey, JSON.stringify(program.snapshot()));
});

fullscreenButton.addEventListener("click", async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await root.requestFullscreen();
  }
});

exitFullscreenButton.addEventListener("click", () => document.exitFullscreen());
document.addEventListener("fullscreenchange", () => {
  const active = document.fullscreenElement === root;
  exitFullscreenButton.hidden = !active;
  fullscreenButton.setAttribute("aria-label", active ? "Exit full screen" : "Enter full screen");
  fullscreenButton.title = active ? "Exit full screen" : "Full screen, Escape exits";
});

menuButton.addEventListener("click", () => {
  const open = menuPanel.hidden;
  menuPanel.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
});

resetStateButton.addEventListener("click", () => {
  localStorage.removeItem(snapshotKey);
  location.reload();
});

tick();
