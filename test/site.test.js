import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships the real linked Noctis project and visible fullscreen exits", async () => {
  const html = await readFile(new URL("../public/index.html", import.meta.url), "utf8");
  const build = await readFile(new URL("../build.mjs", import.meta.url), "utf8");
  const app = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  const workerHost = await readFile(new URL("../public/worker-host.js", import.meta.url), "utf8");
  const gameWorker = await readFile(new URL("../public/game-worker.js", import.meta.url), "utf8");
  assert.match(html, /id="exit-fullscreen"/);
  assert.match(html, /id="fullscreen-game"/);
  assert.doesNotMatch(html, /id="fullscreen"/);
  assert.match(html, /rel="icon" href="\.\/favicon\.svg"/);
  assert.match(html, /width="400" height="300"/);
  assert.match(html, /Lino-rendered Noctis/);
  assert.match(build, /\["STARMAP\.BIN", resolve\(linoRoot, "work\/STARMAP\.BIN"\)\]/);
  assert.match(build, /\["GUIDE\.BIN", resolve\(linoRoot, "work\/GUIDE\.BIN"\)\]/);
  assert.match(app, /compileProject/);
  assert.match(app, /work\/vhgame\.txt/);
  assert.match(app, /createNoctisIntrinsics/);
  assert.match(app, /precompiledRunners/);
  assert.match(app, /putImageData/);
  assert.match(app, /gameStage\.requestFullscreen\(\)/);
  assert.match(app, /insideLinoBounds\("fullbuttonhotspot"/);
  assert.match(app, /exitFullscreen\(\)/);
  assert.match(app, /symbols\.get\("vhguileft"\)/);
  assert.match(app, /symbols\.get\("vhguitop"\)/);
  assert.match(app, /canvas, gameLeft, gameTop, gameWidth, gameHeight/);
  assert.match(app, /event\.ctrlKey && event\.shiftKey && event\.code === "KeyF"/);
  assert.match(app, /pointerdown/);
  assert.match(app, /pointer\(\{ mode \}\)/);
  assert.match(app, /keys: heldKeys/);
  assert.match(app, /new URLSearchParams\(location\.search\).*mainThread/s);
  assert.match(workerHost, /new Worker\(new URL\("\.\/game-worker\.js"/);
  assert.match(gameWorker, /globalK,/);
  assert.match(gameWorker, /compileProject/);
  assert.match(gameWorker, /createNoctisIntrinsics/);
  assert.match(gameWorker, /precompiledRunners/);
  assert.match(gameWorker, /foregroundRuntime\) pixels = memory\.subarray\(origin, origin \+ count\)/);
  assert.match(gameWorker, /pixels\.set\(memory\.subarray\(origin, origin \+ count\)\)/);
  assert.match(workerHost, /if \(credit\) worker\.postMessage\(\{ type: "frameCredit" \}\)/);
  assert.match(workerHost, /credit \? "frameCredit" : "frameBuffer"/);
  assert.match(gameWorker, /waitingForFrameCredit/);
  assert.match(app, /syncDisplay\(\{ width, height, x, y \}\)/);
  assert.match(app, /pointerTransitions/);
  assert.match(gameWorker, /transition\?\.buttons \?\? pointerButtons/);
  assert.match(gameWorker, /transition\?\.x \?\? pointerX/);
  assert.match(gameWorker, /pointerTransitions\[0\]/);
  assert.match(gameWorker, /activePointerTransition = pointerTransitions\.shift\(\)/);
  assert.match(gameWorker, /program\.machine\.pc === guiIdle/);
  assert.match(gameWorker, /pendingGuiMenu && result\.status === "yield"/);
  assert.match(app, /pendingGuiMenu && result\.status === "yield"/);
  assert.match(app, /physicalWidth: Math\.max\(1, window\.innerWidth\)/);
  assert.match(app, /displayphysicalwidth/);
  assert.match(app, /insideLinoBounds\("titlebarbounds"/);
  assert.match(app, /consoleInput/);
  assert.match(app, /keydown/);
  assert.match(app, /sleepMilliseconds/);
  assert.match(app, /presentations/);
  assert.match(app, /toFixed\(1\).*FPS/);
  for (const host of [app, workerHost]) {
    assert.match(host, /NumpadEnter: "keyreturn"/);
    assert.match(host, /const pressedKeyCodes = new Set\(\)/);
    assert.match(host, /const linoKeyCounts = new Map\(\)/);
    assert.match(host, /visibilitychange[\s\S]*clearKeyboard\(\)/);
    assert.match(host, /typeof gameStage\.requestFullscreen !== "function"/);
    assert.match(host, /void exitGameFullscreen\(\)/);
  }
});

test("browser profiler uses the deterministic shared-Lino worker scene", async () => {
  const gameWorker = await readFile(new URL("../public/game-worker.js", import.meta.url), "utf8");
  const workerHost = await readFile(new URL("../public/worker-host.js", import.meta.url), "utf8");
  const profiler = await readFile(new URL("../tools/profile-browser.mjs", import.meta.url), "utf8");
  assert.match(gameWorker, /date: fixedDateMilliseconds === null \? undefined/);
  assert.match(gameWorker, /browserScheduler\.yield\(\)\.then/);
  assert.match(gameWorker, /budgetYieldStrategy/);
  assert.match(workerHost, /clockSeconds: fixedClockSeconds/);
  assert.match(workerHost, /globalThis\.__linoSnapshot = runtimeMetrics/);
  assert.match(profiler, /store\.put\(Uint8Array\.from\(units\), "current\.lin"\)/);
  assert.match(profiler, /globalThis\.__linoRuntime instanceof Worker/);
  assert.match(profiler, /await page\.keyboard\.down\("w"\)/);
  assert.match(profiler, /producedPresentationHz/);
  assert.match(profiler, /simulationHz/);
  assert.match(profiler, /cumulativeRunnerMilliseconds/);
});

test("deployment rejects stale pinned runtime artifacts", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8",
  );
  assert.match(workflow, /Verify the pinned build is the checked-in runtime/);
  assert.match(
    workflow,
    /git diff --exit-code -- public\/noctis-runners\.js public\/linojava/,
  );
});
