import assert from "node:assert/strict";
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

test("current shared-Lino project boots, paints, and survives fullscreen GOES focus", {
  timeout: 300_000,
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

  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  try {
    await page.waitForFunction(() => {
      const match = document.querySelector("#status")?.textContent
        ?.match(/^Noctis \/ (\d+) game frames/);
      const crashed = !document.querySelector("#crash-panel")?.hidden;
      return crashed || (match && Number(match[1]) > 0);
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
      nonUniform,
      realWorker: globalThis.__linoRuntime instanceof Worker,
      stageVisible: !document.querySelector("#game-stage").hidden,
      status: document.querySelector("#status").textContent,
      width: canvas.width,
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
  assert.match(state.status, /^Noctis \/ [1-9]\d* game frames/);

  const initialFrames = Number(state.status.match(/^Noctis \/ (\d+) game frames/)[1]);
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

  await page.locator("#game").focus();
  await page.keyboard.press("Control+Shift+F");
  await page.waitForFunction(() => document.fullscreenElement?.id === "game-stage");
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
  await page.waitForFunction(() => document.fullscreenElement === null);
  assert.equal(await page.evaluate(() => document.activeElement?.id), "game");
  await page.keyboard.type("x");
  await page.waitForFunction((minimum) => {
    const match = document.querySelector("#status")?.textContent
      ?.match(/^Noctis \/ (\d+) game frames/);
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
});
