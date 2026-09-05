import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  fastPresentationFromSearch,
  presentationDescription,
} from "../public/runtime-options.js";

test("browser cadence defaults to authentic timing with explicit 60-Hz opt-in", () => {
  assert.equal(fastPresentationFromSearch(""), 0);
  assert.equal(fastPresentationFromSearch("?mainThread"), 0);
  assert.equal(fastPresentationFromSearch("?presentation=18"), 0);
  assert.equal(fastPresentationFromSearch("?presentation=60"), 1);
  assert.equal(fastPresentationFromSearch("?mainThread&presentation=60"), 1);
  assert.match(presentationDescription(0), /authentic 18\.206-Hz/);
  assert.match(presentationDescription(1), /sustained 60 FPS is not guaranteed/);
});

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
  assert.match(app, /program\.machine\.memory\[fastPresentationSymbol\.value\] = fastPresentation/);
  assert.match(html, /authentic 18\.206-Hz cadence by default/);
  assert.match(workerHost, /clockSeconds: fixedClockSeconds, fastPresentation/);
  assert.match(workerHost, /new Worker\(new URL\("\.\/game-worker\.js"/);
  assert.match(gameWorker, /message\.fastPresentation === 1 \? 1 : 0/);
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
  for (const runtime of [app, gameWorker]) {
    assert.match(runtime, /activePointerLoop/);
    assert.match(runtime, /symbols\.get\("vhgloopcalls"\)/);
    assert.match(runtime, /const gameScanned = gameLoopAddress < 0/);
    assert.match(runtime, /guiMenuActive \|\| gameScanned/);
    assert.match(runtime, /guiPointerPressPendingRelease/);
    assert.match(runtime, /symbols\.get\("menuon"\)/);
    assert.match(runtime, /program\.machine\.memory\[menuOnAddress\]/);
    assert.match(runtime, /!activePointerTransition && pointerTransitions\.length === 0/);
  }
  assert.match(gameWorker, /pointerTransitions: pointerTransitions\.length/);
  assert.match(gameWorker, /activePointerTransition: activePointerTransition/);
  assert.match(gameWorker, /values: symbolValues\(runtimeSnapshotSymbols\)/);
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
  const checkpoint = await readFile(
    new URL("./fixtures/stardrifter-panel-v18.bin", import.meta.url),
  );
  assert.equal(checkpoint.length, 268);
  assert.equal(
    createHash("sha256").update(checkpoint).digest("hex"),
    "52eaf92f1038d69f64350d98e2e807d71dddc095e225114d2f18f96e63990098",
  );
  assert.match(gameWorker, /date: fixedDateMilliseconds === null \? undefined/);
  assert.match(gameWorker, /browserScheduler\.yield\(\)\.then/);
  assert.match(gameWorker, /budgetYieldStrategy/);
  assert.match(gameWorker, /profileInstructions/);
  assert.match(gameWorker, /cumulativeInstructions \+ pendingInstructions/);
  assert.match(workerHost, /clockSeconds: fixedClockSeconds/);
  assert.match(workerHost, /globalThis\.__linoSnapshot = runtimeMetrics/);
  assert.match(profiler, /store\.put\(Uint8Array\.from\(units\), "current\.lin"\)/);
  assert.match(profiler, /globalThis\.__linoRuntime instanceof Worker/);
  assert.match(profiler, /await page\.keyboard\.down\("w"\)/);
  assert.match(profiler, /producedPresentationHz/);
  assert.match(profiler, /simulationHz/);
  assert.match(gameWorker, /const runInstructionBudget = 10_000/);
  assert.match(gameWorker, /program\.run\(runInstructionBudget\)/);
  assert.match(gameWorker, /runInstructionBudget,/);
  assert.match(gameWorker, /cumulativeRunCalls \+= 1/);
  assert.match(workerHost, /cumulativeRunCalls: lastMetrics\.cumulativeRunCalls/);
  assert.match(profiler, /runCallsPerProducedFrame/);
  assert.match(profiler, /--worker-budget/);
  assert.match(profiler, /workerSourceForBudget/);
  assert.match(profiler, /workerBudget: options\.workerBudget/);
  assert.match(profiler, /--linoleum-revision/);
  assert.match(profiler, /--linojava-revision/);
  assert.match(profiler, /--site-revision/);
  assert.match(profiler, /revisionOverrides: Object\.fromEntries/);
  assert.match(profiler, /options\.revisionOverrides\.linoleum \?\? gitHead/);
  assert.match(profiler, /servedSha256: sha256\(workerSource\)/);
  assert.match(profiler, /sha256: sha256\(runnerSource\)/);
  assert.match(profiler, /menuOpenMilliseconds/);
  assert.match(profiler, /menuDismissMilliseconds/);
  assert.match(profiler, /pointerTransitions === 0/);
  assert.match(profiler, /activeElement !== "game"/);
  assert.match(profiler, /--presentation/);
  assert.match(profiler, /presentationHz: options\.presentationHz/);
  assert.match(profiler, /checkpointRecord\.scene\.mode === 0 \? "stardrifter" : "surface"/);
  assert.match(profiler, /&presentation=60/);
  assert.match(profiler, /values\?\.vhgfast/);
  assert.match(profiler, /cumulativeRunnerMilliseconds/);
  assert.match(profiler, /--instruction-profile/);
  assert.match(profiler, /--attribution-only requires --instruction-profile/);
  assert.match(profiler, /instruction attribution only; not functional or release evidence/);
  assert.match(profiler, /instructionProfileSnapshot/);
  assert.match(profiler, /instruction counters retained/);
});

test("deployment and exact-service screening reject stale pinned runtime artifacts", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8",
  );
  const screen = await readFile(
    new URL("../.github/workflows/browser-scheduler-screen.yml", import.meta.url),
    "utf8",
  );
  const deployedRevision = "fc3ff3292f57ae8477095c9edf2b91a44d905f5b";
  const fallbackRevision = deployedRevision;
  const serviceRevision = "5d16d444255a3787e7ad114c53e15b36b99cda2f";
  const sourceRevision = "92ddf9abe501c704bf2bb29858bda0f5444aa09b";
  assert.match(workflow, /Verify the pinned build is the checked-in runtime/);
  assert.match(
    workflow,
    /git diff --exit-code -- public\/noctis-runners\.js public\/linojava/,
  );
  assert.match(workflow, new RegExp(deployedRevision));
  assert.match(workflow, new RegExp(sourceRevision));
  assert.match(screen, /workflow_dispatch/);
  assert.match(screen, /- current-profile/);
  assert.match(screen, /--instruction-profile/);
  assert.match(screen, /--attribution-only/);
  assert.match(screen, /PROFILE_DURATION: \$\{\{ inputs\.duration \|\| '20' \}\}/);
  assert.match(
    screen,
    /variants=\(fallback service service fallback service fallback fallback service\)/,
  );
  assert.match(screen, new RegExp(`LINOJAVA_FALLBACK_REVISION: ${fallbackRevision}`));
  assert.match(screen, new RegExp(`LINOJAVA_SERVICE_REVISION: ${serviceRevision}`));
  assert.match(screen, new RegExp(`LINO_SOURCE_REVISION: ${sourceRevision}`));
  assert.match(screen, /stardrifter-panel-v18\.bin/);
  assert.match(screen, /git diff --exit-code -- public\/noctis-runners\.js public\/linojava/);
  assert.match(screen, /controlSpreadPercent <= 5/);
  assert.match(screen, /instructionsPerFrame <= \$fallback\.instructionsPerFrame - 5000000/);
  assert.match(screen, /producedPresentationHz > \$fallback\.producedPresentationHz/);
});
