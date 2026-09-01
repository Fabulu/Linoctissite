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

test("current shared-Lino project boots and paints in a real browser worker", {
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
});
