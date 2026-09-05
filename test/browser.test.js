import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const PUBLIC_ROOT = fileURLToPath(new URL("../public/", import.meta.url));
const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
]);

function createStaticServer() {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
      const filename = resolve(PUBLIC_ROOT, `.${pathname}`);
      const localPath = relative(PUBLIC_ROOT, filename);
      if (localPath.startsWith("..") || isAbsolute(localPath)) {
        response.writeHead(403).end();
        return;
      }
      const data = await readFile(filename);
      response.writeHead(200, {
        "cache-control": "no-store",
        "content-type": MIME_TYPES.get(extname(filename)) ?? "application/octet-stream",
      });
      response.end(request.method === "HEAD" ? undefined : data);
    } catch {
      response.writeHead(404).end();
    }
  });
}

async function listen(server) {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  return `http://127.0.0.1:${address.port}`;
}

async function close(server) {
  await new Promise((resolveClose, reject) => {
    server.close((error) => error ? reject(error) : resolveClose());
  });
}

const PHYSICAL_PANEL_CHECKPOINT_WORDS = [
  1447580502, 18, 0, 3, 2800, 0, -2100, 0, -90, 0, 0, -300,
  628034590, 1094079838, -2147483648, -1051588217, 1734663254, -1055212624,
  30000, 1, 0, 0, 1, 300, 1463568, -4728350, -437812, 1, 0, 0, 0, 3,
  0, 0, 0, 1344638527, 642, 426, 1, 12, 0, 60, 131072, 0, 131072, 0, 0,
  5, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 0, 4227135,
];

async function seedCheckpoint(page, baseUrl, words) {
  await page.goto(`${baseUrl}/__seed__`, { waitUntil: "domcontentloaded" });
  await page.evaluate(async (payload) => {
    const bytes = new Uint8Array(payload.length * 4);
    const view = new DataView(bytes.buffer);
    payload.forEach((value, index) => view.setInt32(index * 4, value, true));
    const database = await new Promise((resolveOpen, rejectOpen) => {
      const request = indexedDB.open("linoctis", 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains("files")) {
          request.result.createObjectStore("files");
        }
        if (!request.result.objectStoreNames.contains("globalK")) {
          request.result.createObjectStore("globalK");
        }
      };
      request.onsuccess = () => resolveOpen(request.result);
      request.onerror = () => rejectOpen(request.error);
    });
    await new Promise((resolveWrite, rejectWrite) => {
      const transaction = database.transaction("files", "readwrite");
      transaction.objectStore("files").put(bytes, "current.lin");
      transaction.objectStore("files").put(bytes, "current.bak");
      transaction.oncomplete = resolveWrite;
      transaction.onerror = () => rejectWrite(transaction.error);
    });
    database.close();
  }, words);
}

test("physical Stardrifter panels render mapped text at meaningful throughput", {
  timeout: 600_000,
}, async (context) => {
  const server = createStaticServer();
  const baseUrl = await listen(server);
  context.after(() => close(server));

  const browser = await chromium.launch({ headless: true });
  context.after(() => browser.close());
  const browserContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await browserContext.newPage();
  await seedCheckpoint(page, baseUrl, PHYSICAL_PANEL_CHECKPOINT_WORDS);
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
  });

  await page.goto(`${baseUrl}/?clock=1344638527&presentation=18`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(() => globalThis.__linoMetrics?.simulationTicks >= 80
    || !document.querySelector("#crash-panel")?.hidden, null, { timeout: 540_000 });

  const state = await page.evaluate(() => {
    const canvas = document.querySelector("#game");
    const context2d = canvas.getContext("2d");
    const crop = (x, y, width, height) => {
      const pixels = context2d.getImageData(x, y, width, height).data;
      const colors = new Map();
      for (let index = 0; index < pixels.length; index += 4) {
        const key = `${pixels[index]},${pixels[index + 1]},${pixels[index + 2]},${pixels[index + 3]}`;
        colors.set(key, (colors.get(key) ?? 0) + 1);
      }
      const [background, backgroundPixels] = [...colors]
        .sort((left, right) => right[1] - left[1])[0];
      return {
        background: background.split(",").map(Number),
        distinctColors: colors.size,
        foregroundPixels: width * height - backgroundPixels,
      };
    };
    return {
      crash: document.querySelector("#crash-report")?.textContent,
      crashHidden: document.querySelector("#crash-panel")?.hidden,
      leftPanel: crop(30, 60, 370, 75),
      metrics: globalThis.__linoMetrics,
      rightPanel: crop(480, 60, 135, 120),
    };
  });

  assert.equal(state.crashHidden, true, state.crash);
  assert.deepEqual(state.leftPanel.background, [40, 36, 28, 255]);
  assert.deepEqual(state.rightPanel.background, [40, 36, 28, 255]);
  assert.ok(state.leftPanel.distinctColors >= 10);
  assert.ok(state.leftPanel.foregroundPixels > 4000);
  assert.ok(state.rightPanel.distinctColors >= 10);
  assert.ok(state.rightPanel.foregroundPixels > 6000);
  assert.ok(state.metrics.producedPresentationFps >= 0.5);
  assert.ok(state.metrics.simulationFps >= 0.5);
  assert.deepEqual(consoleErrors, []);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(failedRequests, []);
});

test("current shared-Lino project boots, paints, and survives fullscreen GOES focus", {
  timeout: 600_000,
}, async (context) => {
  const server = createStaticServer();
  const baseUrl = await listen(server);
  context.after(() => close(server));

  const browser = await chromium.launch({ headless: true });
  context.after(() => browser.close());
  const browserContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await browserContext.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
  });

  await page.goto(`${baseUrl}/?clock=1344638527`, { waitUntil: "domcontentloaded" });
  try {
    await page.waitForFunction(() => {
      const match = document.querySelector("#status")?.textContent
        ?.match(/^Noctis \/ (\d+) presentations/);
      const crashed = !document.querySelector("#crash-panel")?.hidden;
      return crashed || (match && Number(match[1]) > 0
        && globalThis.__linoMetrics?.simulationTicks > 0
        && globalThis.__linoMetrics?.simulationFps > 0);
    }, null, { timeout: 240_000 });
  } catch (error) {
    const diagnostic = await page.evaluate(() => ({
      crash: document.querySelector("#crash-report")?.textContent,
      crashHidden: document.querySelector("#crash-panel")?.hidden,
      runtime: globalThis.__linoRuntime?.constructor?.name,
      status: document.querySelector("#status")?.textContent,
    }));
    assert.fail(`${error.message}\n${JSON.stringify({
      consoleErrors, diagnostic, failedRequests, pageErrors,
    }, null, 2)}`);
  }

  await page.evaluate(() => {
    globalThis.__linoWorkerSnapshot = null;
    globalThis.__linoRuntime.postMessage({ type: "runtimeSnapshot" });
  });
  await page.waitForFunction(() => globalThis.__linoWorkerSnapshot?.budgetYieldStrategy);

  const state = await page.evaluate(() => {
    const canvas = document.querySelector("#game");
    const pixels = canvas.getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height).data;
    let nonUniform = false;
    for (let index = 4; index < pixels.length; index += 4) {
      if (
        pixels[index] !== pixels[0]
        || pixels[index + 1] !== pixels[1]
        || pixels[index + 2] !== pixels[2]
      ) {
        nonUniform = true;
        break;
      }
    }
    return {
      crash: document.querySelector("#crash-report").textContent,
      crashHidden: document.querySelector("#crash-panel").hidden,
      height: canvas.height,
      metrics: globalThis.__linoMetrics,
      nonUniform,
      realWorker: globalThis.__linoRuntime instanceof Worker,
      stageVisible: !document.querySelector("#game-stage").hidden,
      status: document.querySelector("#status").textContent,
      width: canvas.width,
      worker: globalThis.__linoWorkerSnapshot,
    };
  });

  assert.deepEqual(consoleErrors, []);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(failedRequests, []);
  assert.equal(state.realWorker, true);
  assert.equal(state.stageVisible, true);
  assert.equal(state.crashHidden, true, state.crash);
  assert.ok(state.width >= 320 && state.height >= 200);
  assert.equal(state.nonUniform, true);
  assert.match(state.status, /^Noctis \/ [1-9]\d* presentations/);
  assert.equal(state.metrics?.schema, 1);
  assert.ok(state.metrics.presentedFrames > 0);
  assert.ok(state.metrics.producedPresentationFrames > 0);
  assert.ok(state.metrics.simulationTicks > 0);
  assert.ok(state.metrics.presentedFps > 0);
  assert.ok(state.metrics.producedPresentationFps > 0);
  assert.ok(state.metrics.simulationFps > 0);
  assert.ok(state.metrics.cumulativeRunnerMilliseconds > 0);
  assert.ok(state.metrics.cumulativeInstructions > 0);
  assert.ok(state.metrics.runnerMillisecondsPerPresentation >= 0);
  assert.ok(state.metrics.instructionsPerPresentation > 0);
  assert.equal(state.worker.budgetYieldStrategy, "scheduler-yield");
  assert.equal(state.worker.fastBootstrap, false);
  assert.equal(state.worker.values.vhgfast, 0);

  const initialFrames = Number(state.status.match(/^Noctis \/ (\d+) presentations/)[1]);
  await page.evaluate(() => {
    const runtime = globalThis.__linoRuntime;
    const postMessage = runtime.postMessage.bind(runtime);
    globalThis.__linoTestInput = [];
    runtime.postMessage = (...args) => {
      const message = args[0];
      if (["ascii", "clearKeys", "key", "pointer"].includes(message?.type)) {
        globalThis.__linoTestInput.push({ ...message });
      }
      return postMessage(...args);
    };
  });

  async function runtimeSnapshot() {
    await page.evaluate(() => {
      globalThis.__linoWorkerSnapshot = null;
      globalThis.__linoRuntime.postMessage({ type: "runtimeSnapshot" });
    });
    await page.waitForFunction(() => globalThis.__linoWorkerSnapshot?.values);
    return page.evaluate(() => globalThis.__linoWorkerSnapshot);
  }

  async function waitState(predicate, label, timeout = 20_000, interval = 50) {
    const deadline = Date.now() + timeout;
    let current;
    while (Date.now() < deadline) {
      current = await runtimeSnapshot();
      if (predicate(current)) return current;
      await page.waitForTimeout(interval);
    }
    assert.fail(`${label}: ${JSON.stringify(current)}`);
  }

  async function localPoint(x, y, click = false) {
    const bounds = await page.locator("#game").boundingBox();
    assert.ok(bounds);
    if (click) await page.mouse.click(bounds.x + x, bounds.y + y);
    else await page.mouse.move(bounds.x + x, bounds.y + y);
  }

  async function openGameMenu() {
    await localPoint(565, 12, true);
    return waitState((current) => current.values.menuon === 1, "open GAME menu");
  }

  async function chooseGame(index, predicate, label) {
    await openGameMenu();
    await localPoint(550, 36 + 19 * index, true);
    return waitState((current) => current.values.menuon === 0 && predicate(current), label);
  }

  await chooseGame(5, (current) => current.values.vhgfast === 1,
    "enable 60-Hz presentation after proving the authentic browser default");
  await page.evaluate(() => { globalThis.__linoTestInput.length = 0; });

  async function clickLogical(y, predicate, label) {
    const current = await runtimeSnapshot();
    const values = current.values;
    const x = values.vhguileft + Math.round(75 * values.vhguidw / 320);
    const physicalY = values.vhguitop + Math.round(y * values.vhguidh / 200);
    await localPoint(x, physicalY, true);
    return waitState(predicate, label);
  }

  async function freshPresentation(current, label) {
    return waitState((candidate) => candidate.presentationFrames > current.presentationFrames, label);
  }

  async function settleMenu() {
    await localPoint(630, 420);
    const settled = await waitState((current) => current.values.vhgmenuhover === 0
      && current.values.vhgnoticeframes === 0, "settle menu presentation");
    return freshPresentation(settled, "present settled menu");
  }

  async function canvasSignature(crop, color, includeFull = false) {
    const result = await page.evaluate(({ crop: area, color: wanted, includeFull: full }) => {
      const canvas = document.querySelector("#game");
      const image = canvas.getContext("2d")
        .getImageData(area.x, area.y, area.width, area.height).data;
      const positions = [];
      const occupiedRows = new Set();
      for (let index = 0, pixel = 0; index < image.length; index += 4, pixel += 1) {
        if (image[index] !== wanted[0] || image[index + 1] !== wanted[1]
          || image[index + 2] !== wanted[2] || image[index + 3] !== 255) continue;
        positions.push(pixel & 255, (pixel >>> 8) & 255,
          (pixel >>> 16) & 255, (pixel >>> 24) & 255);
        occupiedRows.add(area.y + Math.floor(pixel / area.width));
      }
      const bands = [];
      for (const row of [...occupiedRows].sort((left, right) => left - right)) {
        const last = bands.at(-1);
        if (last && row === last[1] + 1) last[1] = row;
        else bands.push([row, row]);
      }
      return {
        bands,
        full: full ? Array.from(image) : null,
        positions,
      };
    }, { crop, color, includeFull });
    return {
      bands: result.bands,
      count: result.positions.length / 4,
      full: result.full
        ? createHash("sha256").update(Uint8Array.from(result.full)).digest("hex") : null,
      hash: createHash("sha256").update(Uint8Array.from(result.positions)).digest("hex"),
    };
  }

  async function assertMask(name, crop, color, expected, includeFull = false) {
    const wanted = { ...expected, full: expected.full ?? null };
    const deadline = Date.now() + 20_000;
    let actual;
    while (Date.now() < deadline) {
      actual = await canvasSignature(crop, color, includeFull);
      if (actual.count === wanted.count && actual.hash === wanted.hash
        && actual.full === wanted.full
        && JSON.stringify(actual.bands) === JSON.stringify(wanted.bands)) return;
      await page.waitForTimeout(50);
    }
    assert.deepEqual(actual, wanted, `${name} glyph mask`);
  }

  const pageCrop = { x: 20, y: 45, width: 480, height: 360 };
  const overlayCrop = { x: 1, y: 25, width: 640, height: 400 };
  const regularBands = [[55, 76], [99, 120], [143, 164], [187, 208],
    [231, 252], [379, 400]];
  const cyan = [128, 255, 255];
  const white = [255, 255, 255];
  const green = [128, 255, 128];
  const menuMasks = {
    fcs: [9464, "e5da447de510e21bdbbd926b3901a459e03e58300b38e27bd4eb302886606a8a", regularBands],
    root: [10160, "a65ee82f2c4785a51883e7bed4a30e2225255c8dfc8fdf8bc47f7fb3b01af633", regularBands],
    navigation: [8972, "c56a1e9195299fba9c45743bdf5207d6969a25515679c04ada426d039480e58d", regularBands],
    miscellaneous: [9556, "a83e84ddcc7ded23cbde395e5b4e5753c34244699646524cae0929913b4184f0", regularBands],
    cartography: [10444, "e3ee15644a12320261ca805cd8f8af664e57a2be671bbe82ef517f76599e8d43", regularBands],
    browser: [9976, "458048d00a412aadd48bdc00aef62bdfeea9704459d42229346b8bcb9767d9c7",
      [[55, 76], [99, 120], [143, 164], [187, 208], [231, 252], [275, 296],
        [319, 340], [363, 384]]],
    emergency: [10620, "3c9e34a7e65e98687e19f7f0c18eaca4632fb2cfb26d5f6dc13d2d3be0d582d5", regularBands],
    preferences: [9968, "2c8a29e4b4abe2f1ca73430ae7f1a501111f8f816259ef46522484069419ea7e", regularBands],
  };

  await openGameMenu();
  await assertMask("GAME menu", { x: 487, y: 27, width: 152, height: 234 }, white, {
    count: 10559,
    hash: "7381c756d3c0b41921591735d71cb9b3e4ae26067f9ca8377eef5e3998663588",
    bands: [[27, 94], [106, 115], [127, 136], [148, 157]],
    full: "57f59acdce39bc7fada43613b3dd6627a3f217ea979610c3ce6fd6333f77a4ab",
  }, true);
  await localPoint(200, 300, true);
  await waitState((current) => current.values.menuon === 0 && !current.guiMenuActive,
    "dismiss GAME menu with mouse");

  let opened = await chooseGame(0, (current) => current.values.vhghelpshow === 1,
    "open Controls");
  await freshPresentation(opened, "present Controls");
  await assertMask("Controls", overlayCrop, white, {
    count: 32505,
    hash: "ac7aac5d3818f2b07dc2ea77f4ef54eda6a10b19bb798d478974fb8f24d418e9",
    bands: [[37, 37], [47, 68], [75, 96], [103, 124], [131, 152], [159, 180],
      [187, 208], [215, 236], [243, 264], [271, 292], [297, 322], [327, 350],
      [355, 376], [383, 404], [411, 424]],
  });
  await page.keyboard.press("Escape");
  await waitState((current) => current.values.vhghelpshow === 0, "close Controls");

  opened = await chooseGame(1, (current) => current.values.vhgconsole === 1, "open GOES");
  await freshPresentation(opened, "present GOES");
  await assertMask("GOES", overlayCrop, green, {
    count: 2408,
    hash: "ccc68aa1c8c1674e11202bc2e8650197e89a02e924c9bdb2880c5986bb6d086a",
    bands: [[55, 76], [279, 300], [307, 308]],
  });
  await page.keyboard.press("Escape");
  await waitState((current) => current.values.vhgconsole === 0, "close GOES");

  opened = await chooseGame(7, (current) => current.values.vhggraphics === 1,
    "open Visual effects");
  await freshPresentation(opened, "present Visual effects");
  await assertMask("Visual effects", overlayCrop, cyan, {
    count: 6856,
    hash: "f318355c075a34d6e3b647af081dce9ddd7e2393578558959dc36cbd10c49781",
    bands: [[291, 360]],
  });
  await page.keyboard.press("Escape");
  await waitState((current) => current.values.vhggraphics === 0, "close Visual effects");

  await chooseGame(8, (current) => current.values.vhgfcsopen === 1, "open FCS");
  await settleMenu();
  for (const [name, statePredicate, open, rows] of [
    ["fcs", (current) => current.values.vhgfcsopen === 1, null, null],
    ["root", (current) => current.values.vhgdev === 1, async () => {
      await clickLogical(176, (current) => current.values.vhgfcsopen === 0, "close FCS");
      return chooseGame(9, (current) => current.values.vhgdev === 1, "open devices");
    }, null],
    ["navigation", (current) => current.values.vhgdev === 2,
      () => clickLogical(41, (current) => current.values.vhgdev === 2, "open navigation"), null],
    ["miscellaneous", (current) => current.values.vhgdev === 3, async () => {
      await clickLogical(176, (current) => current.values.vhgdev === 1, "back from navigation");
      return clickLogical(63, (current) => current.values.vhgdev === 3, "open miscellaneous");
    }, null],
    ["cartography", (current) => current.values.vhgdev === 4, async () => {
      await clickLogical(176, (current) => current.values.vhgdev === 1, "back from miscellaneous");
      return clickLogical(85, (current) => current.values.vhgdev === 4, "open cartography");
    }, null],
    ["browser", (current) => current.values.vhgdev === 6,
      () => clickLogical(85, (current) => current.values.vhgdev === 6, "open Target Browser"), null],
    ["emergency", (current) => current.values.vhgdev === 5, async () => {
      await clickLogical(173, (current) => current.values.vhgdev === 4, "back from Target Browser");
      await clickLogical(176, (current) => current.values.vhgdev === 1, "back from cartography");
      return clickLogical(107, (current) => current.values.vhgdev === 5, "open emergency");
    }, null],
  ]) {
    if (open) await open();
    await waitState(statePredicate, `show ${name}`);
    await settleMenu();
    const [count, hash, bands] = menuMasks[name];
    await assertMask(name, pageCrop, cyan, { count, hash, bands });
  }
  await clickLogical(176, (current) => current.values.vhgdev === 1, "back from emergency");
  await clickLogical(176, (current) => current.values.vhgdev === 0, "close devices");

  await chooseGame(10, (current) => current.values.vhgprefs === 1, "open Preferences");
  await settleMenu();
  {
    const [count, hash, bands] = menuMasks.preferences;
    await assertMask("preferences", pageCrop, cyan, { count, hash, bands });
  }
  await clickLogical(176, (current) => current.values.vhgprefs === 0, "close Preferences");

  const focusRouteStart = await runtimeSnapshot();
  await chooseGame(8, (current) => current.values.vhgfcsopen === 1,
    "open Flight control for quick-click route");
  await clickLogical(63, (current) => current.values.vhgnoticeframes > 0,
    "quick-click START VIMANA FLIGHT");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "game");
  const focusRouteAction = await waitState((current) => current.values.pointerstatus === 3
    && current.pointerTransitions === 0 && current.activePointerTransition === null,
  "retire quick-click transitions");
  assert.equal(focusRouteAction.values.pointerstatus, 3);
  assert.equal(focusRouteAction.values.vhgmenuheld, 0);
  assert.ok(focusRouteAction.values.vhgnoticeframes > 0);
  const noticeCyan = await canvasSignature(pageCrop, cyan);
  const noticeGreen = await canvasSignature(pageCrop, green);
  assert.equal(noticeCyan.bands.some(([top, bottom]) => top <= 400 && bottom >= 379), false);
  assert.ok(noticeGreen.count > 0);
  assert.ok(noticeGreen.bands.some(([top, bottom]) => top <= 400 && bottom >= 379));
  await waitState((current) => current.presentationFrames > focusRouteAction.presentationFrames
    && current.simulationTicks > focusRouteAction.simulationTicks,
  "continue after START VIMANA FLIGHT");
  assert.ok(focusRouteAction.presentationFrames >= focusRouteStart.presentationFrames);

  await waitState((current) => current.values.mgstspeed === 0, "finish initial flight calibration");
  const fcsBeforeRemote = await runtimeSnapshot();
  await clickLogical(41, (current) => current.values.vhgdev === 6
    && current.values.vhgbrowseorigin !== 0, "FCS remote target browser");
  const browserBefore = await runtimeSnapshot();
  await clickLogical(107, (current) => current.values.vhgbrowsecursor !== browserBefore.values.vhgbrowsecursor,
    "Target Browser previous");
  const browserPrevious = await runtimeSnapshot();
  await clickLogical(129, (current) => current.values.vhgbrowsecursor !== browserPrevious.values.vhgbrowsecursor,
    "Target Browser next");
  const browserSelected = await runtimeSnapshot();
  await clickLogical(151, (current) => current.values.vhgdev === 0
    && current.values.vhgbrowseorigin === 0, "Target Browser select");
  const selectedTarget = await runtimeSnapshot();
  assert.deepEqual(
    [selectedTarget.values.vhttx, selectedTarget.values.vhtty, selectedTarget.values.vhttz],
    [browserSelected.values.vhgbrowsex, browserSelected.values.vhgbrowsey,
      browserSelected.values.vhgbrowsez],
  );
  assert.equal(fcsBeforeRemote.values.vhgfcsopen, 1);

  await chooseGame(8, (current) => current.values.vhgfcsopen === 1, "reopen FCS");
  if ((await runtimeSnapshot()).values.mgstspeed !== 0) {
    await clickLogical(63, (current) => current.values.mgstspeed === 0, "STOP VIMANA FLIGHT");
  }
  await clickLogical(41, (current) => current.values.vhgdev === 6, "reopen FCS browser");
  await clickLogical(173, (current) => current.values.vhgdev === 0
    && current.values.vhgfcsopen === 1, "Target Browser Back restores FCS");
  const localBefore = await runtimeSnapshot();
  await clickLogical(85, (current) => current.values.vhglocalactive !== localBefore.values.vhglocalactive
    || current.values.vhgnoticeframes > 0, "FCS local target action");
  const row9Before = await runtimeSnapshot();
  await clickLogical(107, (current) => current.values.vhgnoticeptr !== row9Before.values.vhgnoticeptr
    || current.values.vhgnoticeframes > row9Before.values.vhgnoticeframes
    || current.values.vhgfcsopen === 0 || current.values.vhglocalactive !== row9Before.values.vhglocalactive,
  "FCS state-dependent row 9");
  await page.keyboard.press("Escape");
  await waitState((current) => current.values.vhgfcsopen === 0
    && current.values.vhglandingselect === 0, "close FCS state");

  async function openDevicePage(rootY, expected, label) {
    await chooseGame(9, (current) => current.values.vhgdev === 1, `open devices for ${label}`);
    return clickLogical(rootY, (current) => current.values.vhgdev === expected, label);
  }

  await openDevicePage(41, 2, "navigation actions");
  for (const [y, symbol, label] of [
    [41, "vhgamp", "toggle field amplifier"],
    [63, "vhgfinder", "toggle finder"],
    [85, "vhgsync", "cycle tracking mode"],
    [107, "vhgantirad", "toggle radiation shield"],
  ]) {
    const before = await runtimeSnapshot();
    await clickLogical(y, (current) => current.values[symbol] !== before.values[symbol], label);
  }
  await clickLogical(176, (current) => current.values.vhgdev === 1, "Navigation Back");
  await clickLogical(176, (current) => current.values.vhgdev === 0, "device root Back");

  await openDevicePage(63, 3, "miscellaneous light");
  const lightBefore = await runtimeSnapshot();
  await clickLogical(41, (current) => current.values.vhgilight !== lightBefore.values.vhgilight,
    "toggle internal light");
  for (const [y, info, label] of [
    [63, 1, "open remote data"], [85, 2, "open local data"], [107, 3, "open environment data"],
  ]) {
    if ((await runtimeSnapshot()).values.vhgdev !== 3) {
      await openDevicePage(63, 3, label);
    }
    await clickLogical(y, (current) => current.values.vhgdev === 0
      && current.values.vhginfo === info, label);
    await page.keyboard.press("Escape");
    await waitState((current) => current.values.vhginfo === 0, `close ${label}`);
  }

  await openDevicePage(85, 4, "cartography actions");
  await clickLogical(41, (current) => current.values.vhglabelstar !== 0
    || current.values.vhgnoticeframes > 0, "star label action");
  await page.keyboard.press("Escape");
  await waitState((current) => current.values.vhglabelstar === 0, "cancel star label editor");
  await clickLogical(63, (current) => current.values.vhglabelbody !== 0
    || current.values.vhgnoticeframes > 0, "planet label action");
  await page.keyboard.press("Escape");
  await waitState((current) => current.values.vhglabelbody === 0, "cancel planet label editor");
  await clickLogical(85, (current) => current.values.vhgdev === 6, "cartography Target Browser");
  await clickLogical(173, (current) => current.values.vhgdev === 4,
    "Target Browser Back restores Cartography");
  await clickLogical(107, (current) => current.values.vhgconsole === 1,
    "manual Parsis target opens GOES");
  await page.keyboard.press("Escape");
  await waitState((current) => current.values.vhgconsole === 0 && current.values.vhgdev === 0,
    "close manual target GOES");

  await openDevicePage(107, 5, "emergency reset");
  await clickLogical(41, (current) => current.values.vhgresetcount > 0, "emergency systems reset");
  await waitState((current) => current.values.vhgresetcount < 100,
    "advance emergency reset beyond modal and preference stages", 30_000, 500);
  await openDevicePage(107, 5, "emergency help");
  await clickLogical(63, (current) => current.values.vhgdev === 0
    && current.values.vhgnoticeframes > 0, "emergency help request");
  await openDevicePage(107, 5, "emergency collector");
  await clickLogical(85, (current) => current.values.vhgdev === 0
    && current.values.vhgnoticeframes > 0, "emergency lithium collector");
  await openDevicePage(107, 5, "emergency status clear");
  await clickLogical(107, (current) => current.values.vhgdev === 0
    && current.values.vhggburst === 0, "emergency status clear");

  await chooseGame(10, (current) => current.values.vhgprefs === 1,
    "open Preferences actions");
  for (const [y, symbol, label] of [
    [107, "vhgdepolarize", "toggle depolarized hull"],
    [63, "vhgrevcontrols", "toggle reversed controls"],
    [41, "vhgautoscreenoff", "toggle automatic screen"],
    [85, "vhgmenusalwayson", "toggle menu sleep"],
  ]) {
    if ((await runtimeSnapshot()).values.vhgprefs !== 1) {
      await chooseGame(10, (current) => current.values.vhgprefs === 1,
        `reopen Preferences for ${label}`);
    }
    const before = await runtimeSnapshot();
    await clickLogical(y, (current) => current.values[symbol] !== before.values[symbol], label);
  }
  if ((await runtimeSnapshot()).values.vhgprefs === 1) {
    await clickLogical(176, (current) => current.values.vhgprefs === 0, "Preferences Back");
  }

  const savedPreferences = await runtimeSnapshot();
  await chooseGame(2, (current) => current.values.vhsvok === 1
    && current.values.vhgnoticeframes > 0, "Save checkpoint");
  await chooseGame(5, (current) => current.values.vhgfast !== savedPreferences.values.vhgfast,
    "mutate saved 60 Hz state");
  await chooseGame(3, (current) => current.values.vhsvok === 1
    && current.values.vhgfast === savedPreferences.values.vhgfast
    && current.values.vhgautoscreenoff === savedPreferences.values.vhgautoscreenoff
    && current.values.vhgrevcontrols === savedPreferences.values.vhgrevcontrols
    && current.values.vhgmenusalwayson === savedPreferences.values.vhgmenusalwayson
    && current.values.vhgdepolarize === savedPreferences.values.vhgdepolarize
    && current.values.vhgnoticeframes > 0, "Load checkpoint restores state");

  for (const [index, symbol, label] of [
    [4, "vhgfpsshow", "Toggle FPS counter"],
    [5, "vhgfast", "Toggle 60 Hz"],
    [6, "vhaplaying", "Toggle music"],
  ]) {
    const before = await runtimeSnapshot();
    await chooseGame(index, (current) => current.values[symbol] !== before.values[symbol], label);
    await chooseGame(index, (current) => current.values[symbol] === before.values[symbol],
      `${label} restores`);
  }


  await page.evaluate(() => { globalThis.__linoTestInput.length = 0; });
  await page.locator("#game").focus();
  await page.keyboard.press("Control+Shift+F");
  await page.waitForFunction(() => document.fullscreenElement?.id === "game-stage"
    && document.activeElement?.id === "fullscreen-game");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "fullscreen-game");
  await page.keyboard.press("g");
  await page.keyboard.type("oes");

  const fullscreen = page.locator("#fullscreen-game");
  const bounds = await fullscreen.boundingBox();
  assert.ok(bounds);
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down({ button: "right" });
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await page.mouse.up({ button: "right" });

  await page.locator("#exit-fullscreen").click();
  await page.waitForFunction(() => document.fullscreenElement === null
    && document.activeElement?.id === "game");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "game");
  await page.keyboard.type("x");
  await page.waitForFunction((minimum) => {
    const match = document.querySelector("#status")?.textContent
      ?.match(/^Noctis \/ (\d+) presentations/);
    return match && Number(match[1]) > minimum;
  }, initialFrames, { timeout: 30_000 });

  const input = await page.evaluate(() => globalThis.__linoTestInput);
  assert.deepEqual(
    input.filter((message) => message.type === "ascii").map((message) => message.value),
    [103, 111, 101, 115, 120],
  );
  assert.ok(input.some((message) => message.type === "pointer" && message.buttons === 8));
  assert.ok(input.some((message) => message.type === "pointer" && message.buttons === 0));
  assert.ok(input.some((message) => message.type === "clearKeys"));

  const keyboardInput = await page.evaluate(() => {
    globalThis.__linoTestInput.length = 0;
    const target = document.querySelector("#game");
    const send = (type, code, key, modifiers = {}) => target.dispatchEvent(new KeyboardEvent(type, {
      bubbles: true, cancelable: true, code, key, ...modifiers,
    }));
    send("keydown", "ControlLeft", "Control", { ctrlKey: true });
    send("keydown", "ControlRight", "Control", { ctrlKey: true });
    send("keyup", "ControlLeft", "Control", { ctrlKey: true });
    send("keyup", "ControlRight", "Control");
    send("keydown", "NumpadEnter", "Enter");
    send("keyup", "NumpadEnter", "Enter");
    send("keydown", "KeyW", "w", { ctrlKey: true });
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
    delete document.hidden;
    send("keyup", "KeyW", "w");
    return globalThis.__linoTestInput;
  });
  assert.deepEqual(
    keyboardInput.filter((message) => message.type === "key"),
    [
      { type: "key", name: "keycontrol", down: true },
      { type: "key", name: "keycontrol", down: false },
      { type: "key", name: "keyreturn", down: true },
      { type: "key", name: "keyreturn", down: false },
      { type: "key", name: "keyw", down: true },
    ],
  );
  assert.deepEqual(
    keyboardInput.filter((message) => message.type === "ascii"),
    [{ type: "ascii", value: 13 }],
  );
  assert.equal(keyboardInput.at(-1)?.type, "clearKeys");

  await page.locator("#game").focus();
  const beforeEscape = await runtimeSnapshot();
  if (beforeEscape.values.vhgconsole === 1) {
    await page.keyboard.press("Escape");
    await waitState(
      (current) => current.values.vhgconsole === 0
        && current.values.vhgloopcalls > beforeEscape.values.vhgloopcalls,
      "close GOES before terminal action",
    );
  }
  await chooseGame(11, (current) => current.values.vhgesc === 1, "Save and quit");
  const stopped = await waitState((current) => !current.running || current.halted,
    "terminal Save and quit", 30_000);
  assert.equal(stopped.running, false);
  assert.equal(stopped.halted, true);
  assert.equal(stopped.values.vhsvok, 1);
  assert.deepEqual(consoleErrors, []);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(failedRequests, []);
});

test("main-thread fallback keeps the real FCS click route responsive", {
  timeout: 600_000,
}, async (context) => {
  const server = createStaticServer();
  const baseUrl = await listen(server);
  context.after(() => close(server));

  const browser = await chromium.launch({ headless: true });
  context.after(() => browser.close());
  const browserContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await browserContext.newPage();
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
  });
  await page.addInitScript(() => {
    globalThis.Worker = class ForbiddenWorker {
      constructor() { throw new Error("mainThread fallback constructed a Worker"); }
    };
  });

  await page.goto(`${baseUrl}/?mainThread&presentation=60`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    const match = document.querySelector("#status")?.textContent
      ?.match(/^Noctis \/ (\d+) presentations/);
    return match && Number(match[1]) > 0;
  }, null, { timeout: 240_000 });
  assert.equal(await page.evaluate(() => globalThis.__linoFastPresentation?.()), 1);
  assert.match(
    await page.locator("#presentation-mode").textContent(),
    /sustained 60 FPS is not guaranteed/,
  );

  async function localPoint(x, y) {
    const bounds = await page.locator("#game").boundingBox();
    assert.ok(bounds);
    await page.mouse.click(bounds.x + x, bounds.y + y);
  }
  async function waitColor(crop, color, minimum) {
    await page.waitForFunction(({ crop: area, color: wanted, minimum: count }) => {
      const canvas = document.querySelector("#game");
      const data = canvas.getContext("2d")
        .getImageData(area.x, area.y, area.width, area.height).data;
      let matches = 0;
      for (let index = 0; index < data.length; index += 4) {
        if (data[index] === wanted[0] && data[index + 1] === wanted[1]
            && data[index + 2] === wanted[2] && data[index + 3] === 255) matches += 1;
      }
      return matches >= count;
    }, { crop, color, minimum }, { timeout: 30_000 });
  }
  async function presentationCount() {
    return page.locator("#status").evaluate((node) => Number(
      node.textContent?.match(/^Noctis \/ (\d+) presentations/)?.[1] ?? 0,
    ));
  }
  async function waitPresentation(after) {
    await page.waitForFunction((minimum) => {
      const match = document.querySelector("#status")?.textContent
        ?.match(/^Noctis \/ (\d+) presentations/);
      return match && Number(match[1]) > minimum;
    }, after, { timeout: 30_000 });
  }

  await localPoint(565, 12);
  await waitColor({ x: 487, y: 27, width: 152, height: 234 }, [255, 255, 255], 10_000);
  await localPoint(550, 188);
  await waitColor({ x: 20, y: 45, width: 480, height: 360 }, [128, 255, 255], 9_000);

  const beforeStart = await presentationCount();
  await localPoint(151, 151);
  await waitPresentation(beforeStart);
  await waitColor({ x: 20, y: 379, width: 480, height: 22 }, [128, 255, 128], 1);
  assert.equal(await page.evaluate(() => document.activeElement?.id), "game");

  const beforeStop = await presentationCount();
  await localPoint(151, 151);
  await waitPresentation(beforeStop);
  assert.equal(await page.evaluate(() => document.activeElement?.id), "game");
  assert.deepEqual(consoleErrors, []);
  assert.deepEqual(pageErrors, []);
  assert.deepEqual(failedRequests, []);
});
