import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships the real linked iGUI and visible fullscreen exits", async () => {
  const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
  const app = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  assert.match(html, /id="fullscreen"/);
  assert.match(html, /id="exit-fullscreen"/);
  assert.match(html, /rel="icon" href="\.\/favicon\.svg"/);
  assert.match(html, /width="400" height="300"/);
  assert.match(html, /Lino-rendered integrated GUI/);
  assert.match(app, /compileProject/);
  assert.match(app, /examples\/iGUIcli\.txt/);
  assert.match(app, /putImageData/);
  assert.match(app, /requestFullscreen\(\)/);
  assert.match(app, /exitFullscreen\(\)/);
  assert.match(app, /pointerdown/);
  assert.match(app, /pointer\(\)/);
  assert.match(app, /keys: heldKeys/);
  assert.match(app, /consoleInput/);
  assert.match(app, /keydown/);
  assert.match(app, /sleepMilliseconds/);
});
