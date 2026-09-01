#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

import { chromium } from "playwright";

const SITE_ROOT = fileURLToPath(new URL("../", import.meta.url));
const PUBLIC_ROOT = resolve(SITE_ROOT, "public");
const DEFAULT_CLOCK_SECONDS = 1344638527;
const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
]);

function usage(message) {
  if (message) console.error(message);
  console.error("Usage: node tools/profile-browser.mjs --checkpoint FILE [--duration SECONDS] [--output FILE] [--force] [--headed]");
  process.exitCode = 2;
  return null;
}

function parseArguments(argv) {
  const options = {
    checkpoint: null,
    clockSeconds: DEFAULT_CLOCK_SECONDS,
    durationSeconds: 20,
    force: false,
    headed: false,
    linoJavaRoot: resolve(SITE_ROOT, "../linojava"),
    linoRoot: resolve(SITE_ROOT, "../linoleum"),
    output: resolve(SITE_ROOT, "build/browser-profile/surface/report.json"),
    readinessSeconds: 240,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--force") options.force = true;
    else if (argument === "--headed") options.headed = true;
    else {
      const value = argv[index + 1];
      if (value === undefined) return usage(`Missing value for ${argument}`);
      index += 1;
      if (argument === "--checkpoint") options.checkpoint = resolve(value);
      else if (argument === "--clock") options.clockSeconds = Number(value);
      else if (argument === "--duration") options.durationSeconds = Number(value);
      else if (argument === "--linojava-root") options.linoJavaRoot = resolve(value);
      else if (argument === "--linoleum-root") options.linoRoot = resolve(value);
      else if (argument === "--output") options.output = resolve(value);
      else if (argument === "--readiness-timeout") options.readinessSeconds = Number(value);
      else return usage(`Unknown argument: ${argument}`);
    }
  }
  if (!options.checkpoint) return usage("--checkpoint is required");
  if (!(options.durationSeconds >= 5 && options.durationSeconds <= 120)) {
    return usage("--duration must be between 5 and 120 seconds");
  }
  if (!(options.readinessSeconds >= 5 && options.readinessSeconds <= 900)) {
    return usage("--readiness-timeout must be between 5 and 900 seconds");
  }
  if (!Number.isSafeInteger(options.clockSeconds) || options.clockSeconds < 0) {
    return usage("--clock must be a nonnegative integer");
  }
  return options;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function gitHead(directory) {
  return execFileSync("git", ["-C", directory, "rev-parse", "HEAD"], {
    encoding: "utf8",
    windowsHide: true,
  }).trim();
}

function checkpointProvenance(bytes) {
  if (bytes.length !== 264 && bytes.length !== 268) {
    throw new Error(`checkpoint is ${bytes.length} bytes, expected 264 or 268`);
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const word = (index) => view.getInt32(index * 4, true);
  if (word(0) !== 0x56485356) throw new Error("checkpoint magic is invalid");
  return {
    bytes: bytes.length,
    sha256: sha256(bytes),
    version: word(1),
    scene: {
      mode: word(2),
      body: word(3),
      player: [word(4), word(5), word(6)],
      pitch: word(7),
      beta: word(8),
      star: [word(24), word(25), word(26)],
      fast: word(27),
      storedClockSeconds: word(35),
      longitude: word(40),
      latitude: word(41),
      capsule: [word(42), word(43), word(44)],
    },
  };
}

function createStaticServer() {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", "http://127.0.0.1");
      if (url.pathname === "/profile-seed.html") {
        response.writeHead(200, {
          "cache-control": "no-store",
          "content-type": "text/html; charset=utf-8",
        });
        response.end("<!doctype html><meta charset=utf-8><title>Profile seed</title>");
        return;
      }
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
  if (!address || typeof address !== "object") throw new Error("profile server has no address");
  return `http://127.0.0.1:${address.port}`;
}

async function close(server) {
  await new Promise((resolveClose, reject) => {
    server.close((error) => error ? reject(error) : resolveClose());
  });
}

async function seedCheckpoint(page, baseUrl, checkpoint) {
  await page.goto(`${baseUrl}/profile-seed.html`, { waitUntil: "domcontentloaded" });
  await page.evaluate(async (units) => {
    const database = await new Promise((resolveDatabase, reject) => {
      const request = indexedDB.open("linoctis", 1);
      request.onupgradeneeded = () => {
        const result = request.result;
        if (!result.objectStoreNames.contains("files")) result.createObjectStore("files");
        if (!result.objectStoreNames.contains("globalK")) result.createObjectStore("globalK");
      };
      request.onsuccess = () => resolveDatabase(request.result);
      request.onerror = () => reject(request.error);
    });
    await new Promise((resolveWrite, reject) => {
      const transaction = database.transaction("files", "readwrite");
      const store = transaction.objectStore("files");
      store.put(Uint8Array.from(units), "current.lin");
      store.put(Uint8Array.from(units), "current.bak");
      transaction.oncomplete = resolveWrite;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
    database.close();
  }, Array.from(checkpoint));
}

function difference(end, start, name) {
  const value = end[name] - start[name];
  if (!Number.isFinite(value) || value < 0) throw new Error(`invalid ${name} interval: ${value}`);
  return value;
}

async function runProfile(options) {
  const checkpoint = new Uint8Array(await readFile(options.checkpoint));
  const checkpointRecord = checkpointProvenance(checkpoint);
  const manifest = JSON.parse(await readFile(resolve(PUBLIC_ROOT, "lino-src/manifest.json"), "utf8"));
  const server = createStaticServer();
  const baseUrl = await listen(server);
  const browser = await chromium.launch({ headless: !options.headed });
  try {
    const browserContext = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await browserContext.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`);
    });

    await seedCheckpoint(page, baseUrl, checkpoint);
    const startupStartedAt = performance.now();
    await page.goto(`${baseUrl}/?clock=${options.clockSeconds}&profile=1`, { waitUntil: "domcontentloaded" });
    try {
      await page.waitForFunction(() => {
        const crashed = !document.querySelector("#crash-panel")?.hidden;
        const metrics = globalThis.__linoSnapshot?.();
        return crashed || (metrics?.presentedFrames > 0 && metrics?.simulationTicks > 0);
      }, null, { timeout: options.readinessSeconds * 1000 });
    } catch (error) {
      await page.evaluate(() => globalThis.__linoRuntime?.postMessage({ type: "runtimeSnapshot" }));
      await new Promise((resolveWait) => setTimeout(resolveWait, 50));
      const diagnostic = await page.evaluate(() => ({
        crash: document.querySelector("#crash-report")?.textContent,
        crashHidden: document.querySelector("#crash-panel")?.hidden,
        metrics: globalThis.__linoSnapshot?.(),
        realWorker: globalThis.__linoRuntime instanceof Worker,
        status: document.querySelector("#status")?.textContent,
        worker: globalThis.__linoWorkerSnapshot,
      }));
      throw new Error(`${error.message}\n${JSON.stringify({
        consoleErrors, diagnostic, failedRequests, pageErrors,
      }, null, 2)}`);
    }
    const startupSeconds = (performance.now() - startupStartedAt) / 1000;
    await page.evaluate(() => {
      globalThis.__linoWorkerSnapshot = null;
      globalThis.__linoRuntime.postMessage({ type: "runtimeSnapshot" });
    });
    await page.waitForFunction(() => globalThis.__linoWorkerSnapshot !== null, null, { timeout: 10_000 });
    const readyState = await page.evaluate(() => ({
      crash: document.querySelector("#crash-report")?.textContent,
      crashHidden: document.querySelector("#crash-panel")?.hidden,
      realWorker: globalThis.__linoRuntime instanceof Worker,
      metrics: globalThis.__linoSnapshot?.(),
      status: document.querySelector("#status")?.textContent,
      worker: globalThis.__linoWorkerSnapshot,
    }));
    if (!readyState.crashHidden) throw new Error(`Lino crashed during startup: ${readyState.crash}`);
    if (!readyState.realWorker) throw new Error("profile did not use the default module worker");
    if (readyState.worker?.fastBootstrap !== false) {
      throw new Error("profile bootstrap scheduler remained active at the measurement boundary");
    }
    if (readyState.worker?.budgetYieldStrategy !== "scheduler-yield") {
      throw new Error(`profile used ${readyState.worker?.budgetYieldStrategy ?? "unknown"} budget yielding`);
    }

    await page.locator("#game").focus();
    const started = await page.evaluate(() => globalThis.__linoSnapshot());
    const measurementStartedAt = performance.now();
    const warmupSeconds = 1;
    const holdSeconds = Math.min(5, options.durationSeconds / 3);
    await new Promise((resolveWait) => setTimeout(resolveWait, warmupSeconds * 1000));
    await page.keyboard.down("w");
    try {
      await new Promise((resolveWait) => setTimeout(resolveWait, holdSeconds * 1000));
    } finally {
      await page.keyboard.up("w");
    }
    const remainingMilliseconds = options.durationSeconds * 1000
      - (performance.now() - measurementStartedAt);
    if (remainingMilliseconds > 0) {
      await new Promise((resolveWait) => setTimeout(resolveWait, remainingMilliseconds));
    }
    const ended = await page.evaluate(() => globalThis.__linoSnapshot());
    const elapsedMilliseconds = ended.sampledAtMilliseconds - started.sampledAtMilliseconds;
    const presentations = difference(ended, started, "presentedFrames");
    const producedPresentations = difference(ended, started, "producedPresentationFrames");
    const simulationTicks = difference(ended, started, "simulationTicks");
    const runnerMilliseconds = difference(ended, started, "cumulativeRunnerMilliseconds");
    const displayMilliseconds = difference(ended, started, "cumulativeDisplayMilliseconds");
    const instructions = difference(ended, started, "cumulativeInstructions");
    if (!(elapsedMilliseconds > 0) || presentations === 0 || producedPresentations === 0) {
      throw new Error("browser profile did not retain a positive presentation interval");
    }
    if (consoleErrors.length || pageErrors.length || failedRequests.length) {
      throw new Error(JSON.stringify({ consoleErrors, failedRequests, pageErrors }, null, 2));
    }

    const browserVersion = await browser.version();
    const browserIdentity = await page.evaluate(() => ({
      platform: navigator.platform,
      userAgent: navigator.userAgent,
    }));
    return {
      schema: 1,
      scenario: "surface",
      command: [process.execPath, ...process.argv.slice(1)],
      generatedAt: new Date().toISOString(),
      requestedMeasurementSeconds: options.durationSeconds,
      measuredMilliseconds: elapsedMilliseconds,
      startupSeconds,
      input: { warmupSeconds, key: "W", holdSeconds },
      provenance: {
        browser: { version: browserVersion, headless: !options.headed, ...browserIdentity },
        clockSeconds: options.clockSeconds,
        defaultModuleWorker: true,
        fastBootstrapEndedBeforeMeasurement: true,
        budgetYieldStrategy: readyState.worker.budgetYieldStrategy,
        runtimeId: String(manifest.runtimeId ?? "unversioned"),
        checkpointPath: options.checkpoint,
        checkpoint: checkpointRecord,
        revisions: {
          linoleum: gitHead(options.linoRoot),
          linojava: gitHead(options.linoJavaRoot),
          linoctissite: gitHead(SITE_ROOT),
        },
      },
      interval: {
        started,
        ended,
        presentations,
        producedPresentations,
        simulationTicks,
        runnerMilliseconds,
        displayMilliseconds,
        instructions,
      },
      metrics: {
        presentationHz: presentations * 1000 / elapsedMilliseconds,
        producedPresentationHz: producedPresentations * 1000 / elapsedMilliseconds,
        simulationHz: simulationTicks * 1000 / elapsedMilliseconds,
        droppedPresentations: producedPresentations - presentations,
        averageRunnerMillisecondsPerPresentedFrame: runnerMilliseconds / presentations,
        averageRunnerMillisecondsPerProducedFrame: runnerMilliseconds / producedPresentations,
        averageDisplayMillisecondsPerPresentedFrame: displayMilliseconds / presentations,
        instructionsPerPresentedFrame: instructions / presentations,
        instructionsPerProducedFrame: instructions / producedPresentations,
      },
      failures: { consoleErrors, failedRequests, pageErrors },
    };
  } finally {
    await browser.close();
    await close(server);
  }
}

const options = parseArguments(process.argv.slice(2));
if (options) {
  try {
    if (!options.force) {
      try {
        await readFile(options.output);
        throw new Error(`output already exists: ${options.output} (pass --force to replace it)`);
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
    }
    const report = await runProfile(options);
    await mkdir(resolve(options.output, ".."), { recursive: true });
    await writeFile(options.output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    console.log(`PROFILE browser surface: ${report.interval.presentations} presentations, ${report.metrics.presentationHz.toFixed(2)} Hz, ${report.metrics.simulationHz.toFixed(3)} simulation Hz -> ${options.output}`);
  } catch (error) {
    console.error(error?.stack ?? String(error));
    process.exitCode = 1;
  }
}
