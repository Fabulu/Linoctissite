import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships visible and keyboard fullscreen exits", async () => {
  const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
  const app = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  assert.match(html, /id="fullscreen"/);
  assert.match(html, /id="exit-fullscreen"/);
  assert.match(app, /requestFullscreen\(\)/);
  assert.match(app, /exitFullscreen\(\)/);
  assert.match(app, /event\.key !== "Escape"/);
  assert.match(app, /program\.snapshot\(\)/);
  assert.match(app, /program\.restore\(/);
});
