import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { chromium, firefox } from "playwright";

const PUBLIC_ROOT = fileURLToPath(new URL("../public/", import.meta.url));
const CHECKPOINT = await readFile(new URL("./fixtures/stardrifter-panel-v18.bin", import.meta.url));
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
      if (pathname === "/__seed__") {
        response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        response.end("<!doctype html><title>seed</title>");
        return;
      }
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

async function seedCheckpoint(page, baseUrl) {
  await page.goto(`${baseUrl}/__seed__`, { waitUntil: "domcontentloaded" });
  await page.evaluate(async (payload) => {
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
      const bytes = Uint8Array.from(payload);
      transaction.objectStore("files").put(bytes, "current.lin");
      transaction.objectStore("files").put(bytes, "current.bak");
      transaction.oncomplete = resolveWrite;
      transaction.onerror = () => rejectWrite(transaction.error);
    });
    database.close();
  }, Array.from(CHECKPOINT));
}

for (const [name, browserType] of [["Chromium", chromium], ["Firefox", firefox]]) {
  test(`${name} bounds held-pointer motion and preserves keyboard ownership`, {
    timeout: 600_000,
  }, async (context) => {
    const server = createStaticServer();
    const baseUrl = await listen(server);
    context.after(() => close(server));
    const browser = await browserType.launch({ headless: true });
    context.after(() => browser.close());
    const browserContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await browserContext.newPage();
    const failures = { consoleErrors: [], failedRequests: [], pageErrors: [] };
    page.on("console", (message) => {
      if (message.type() === "error") failures.consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => failures.pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      failures.failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
    });

    await seedCheckpoint(page, baseUrl);
    await page.goto(`${baseUrl}/?clock=1344638527&profile=1&presentation=60`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForFunction(() => !document.querySelector("#crash-panel")?.hidden
      || globalThis.__linoSnapshot?.()?.simulationTicks > 0, null, { timeout: 240_000 });
    assert.equal(await page.locator("#crash-panel").getAttribute("hidden"), "");
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
      await page.waitForFunction(() => globalThis.__linoWorkerSnapshot?.values, null, {
        timeout: 20_000,
      });
      return page.evaluate(() => globalThis.__linoWorkerSnapshot);
    }

    async function waitRuntime(predicate, label, timeout = 5_000) {
      const deadline = Date.now() + timeout;
      let state;
      while (Date.now() < deadline) {
        state = await runtimeSnapshot();
        if (predicate(state)) return state;
        await page.waitForTimeout(25);
      }
      assert.fail(`${label}: ${JSON.stringify(state)}`);
    }

    async function canvasMetrics() {
      const bounds = await page.locator("#game").boundingBox();
      assert.ok(bounds);
      const size = await page.locator("#game").evaluate((canvas) => ({
        width: canvas.width,
        height: canvas.height,
      }));
      return { bounds, size };
    }

    async function canvasPoint(x, y) {
      const { bounds, size } = await canvasMetrics();
      const clientX = bounds.x + x * bounds.width / size.width;
      const clientY = bounds.y + y * bounds.height / size.height;
      return {
        clientX,
        clientY,
        pointerX: Math.floor((clientX - bounds.x) * size.width / bounds.width),
        pointerY: Math.floor((clientY - bounds.y) * size.height / bounds.height),
      };
    }

    const ownershipPoint = await canvasPoint(240, 180);
    await page.mouse.move(ownershipPoint.clientX, ownershipPoint.clientY);
    await page.mouse.down({ button: "left" });
    await page.evaluate(() => {
      const target = document.querySelector("#game");
      target.blur();
      target.dispatchEvent(new PointerEvent("pointercancel", { bubbles: true, pointerId: 1 }));
      globalThis.__linoTestInput.length = 0;
    });
    await page.mouse.up({ button: "left" });
    assert.equal(await page.evaluate(() => document.activeElement?.id), "game");
    await page.evaluate(() => {
      const target = document.querySelector("#game");
      target.focus = () => {};
      target.blur();
    });
    assert.notEqual(await page.evaluate(() => document.activeElement?.id), "game");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.type("x");
    const ownershipInput = await page.evaluate(() => globalThis.__linoTestInput);
    assert.deepEqual(
      ownershipInput.filter((message) => message.type === "key" && message.name === "keyup")
        .map((message) => message.down),
      [true, false, true, false],
    );
    assert.ok(ownershipInput.some((message) => message.type === "ascii" && message.value === 120));
    await page.evaluate(() => {
      const target = document.querySelector("#game");
      delete target.focus;
      const button = document.createElement("button");
      button.id = "focus-probe";
      document.body.append(button);
      button.focus();
      globalThis.__linoTestInput.length = 0;
    });
    await page.keyboard.press("ArrowUp");
    assert.deepEqual(
      await page.evaluate(() => globalThis.__linoTestInput
        .filter((message) => message.type === "key")),
      [],
    );
    await page.evaluate(() => document.querySelector("#focus-probe").remove());
    await waitRuntime((state) => state.values.pointerstatus === 3
      && state.pointerTransitions === 0 && state.activePointerTransition === null,
    "recover from pointer-capture cancellation");

    const start = await canvasPoint(260, 220);
    const end = await canvasPoint(420, 260);
    await page.mouse.move(start.clientX, start.clientY);
    await page.mouse.down({ button: "left" });
    await page.mouse.move(end.clientX, end.clientY, { steps: 256 });
    const held = await runtimeSnapshot();
    assert.ok(held.pointerTransitions <= 2, `held queue grew to ${held.pointerTransitions}`);
    await page.mouse.up({ button: "left" });
    const releasedAt = performance.now();
    const drained = await waitRuntime((state) => state.values.pointerstatus === 3
      && state.pointerTransitions === 0 && state.activePointerTransition === null,
    "drain coalesced held motion");
    assert.ok(performance.now() - releasedAt < 5_000);
    assert.ok(Math.abs(drained.values.pointerxcoordinate - end.pointerX) <= 1,
      `final pointer x was ${drained.values.pointerxcoordinate}, expected ${end.pointerX}`);
    assert.ok(Math.abs(drained.values.pointerycoordinate - end.pointerY) <= 1,
      `final pointer y was ${drained.values.pointerycoordinate}, expected ${end.pointerY}`);

    const menu = await canvasPoint(565, 12);
    const menuStartedAt = performance.now();
    await page.mouse.click(menu.clientX, menu.clientY);
    await waitRuntime((state) => state.values.menuon === 1, "open GAME after held motion");
    assert.ok(performance.now() - menuStartedAt < 5_000);
    const outside = await canvasPoint(200, 300);
    await page.mouse.click(outside.clientX, outside.clientY);
    await waitRuntime((state) => state.values.menuon === 0 && !state.guiMenuActive
      && state.pointerTransitions === 0 && state.activePointerTransition === null,
    "dismiss GAME after held motion");

    assert.equal(await page.evaluate(() => document.activeElement?.id), "game");
    assert.deepEqual(failures, { consoleErrors: [], failedRequests: [], pageErrors: [] });
  });
}
