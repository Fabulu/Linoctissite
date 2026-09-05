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
const WORKER_BUDGET_LITERALS = new Map([
  [10_000, "10_000"],
  [50_000, "50_000"],
  [100_000, "100_000"],
  [250_000, "250_000"],
]);
const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
]);

function usage(message) {
  if (message) console.error(message);
  console.error("Usage: node tools/profile-browser.mjs --checkpoint FILE [--duration SECONDS] [--presentation 18|60] [--worker-budget 10000|50000|100000|250000] [--linoleum-revision SHA] [--linojava-revision SHA] [--site-revision SHA] [--output FILE] [--instruction-profile] [--force] [--headed]");
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
    instructionProfile: false,
    linoJavaRoot: resolve(SITE_ROOT, "../linojava"),
    linoRoot: resolve(SITE_ROOT, "../linoleum"),
    output: resolve(SITE_ROOT, "build/browser-profile/surface/report.json"),
    presentationHz: 18,
    readinessSeconds: 240,
    revisionOverrides: {
      linoctissite: null,
      linojava: null,
      linoleum: null,
    },
    workerBudget: 10_000,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--force") options.force = true;
    else if (argument === "--headed") options.headed = true;
    else if (argument === "--instruction-profile") options.instructionProfile = true;
    else {
      const value = argv[index + 1];
      if (value === undefined) return usage(`Missing value for ${argument}`);
      index += 1;
      if (argument === "--checkpoint") options.checkpoint = resolve(value);
      else if (argument === "--clock") options.clockSeconds = Number(value);
      else if (argument === "--duration") options.durationSeconds = Number(value);
      else if (argument === "--linojava-root") options.linoJavaRoot = resolve(value);
      else if (argument === "--linoleum-root") options.linoRoot = resolve(value);
      else if (argument === "--linojava-revision") options.revisionOverrides.linojava = value;
      else if (argument === "--linoleum-revision") options.revisionOverrides.linoleum = value;
      else if (argument === "--site-revision") options.revisionOverrides.linoctissite = value;
      else if (argument === "--output") options.output = resolve(value);
      else if (argument === "--presentation") options.presentationHz = Number(value);
      else if (argument === "--readiness-timeout") options.readinessSeconds = Number(value);
      else if (argument === "--worker-budget") options.workerBudget = Number(value);
      else return usage(`Unknown argument: ${argument}`);
    }
  }
  if (!options.checkpoint) return usage("--checkpoint is required");
  if (!(options.durationSeconds >= 5 && options.durationSeconds <= 120)) {
    return usage("--duration must be between 5 and 120 seconds");
  }
  if (![18, 60].includes(options.presentationHz)) {
    return usage("--presentation must be 18 or 60");
  }
  if (![10_000, 50_000, 100_000, 250_000].includes(options.workerBudget)) {
    return usage("--worker-budget must be 10000, 50000, 100000, or 250000");
  }
  for (const [name, flag] of [
    ["linoctissite", "site"],
    ["linojava", "linojava"],
    ["linoleum", "linoleum"],
  ]) {
    const revision = options.revisionOverrides[name];
    if (revision === null) continue;
    if (!/^[0-9a-f]{40}$/i.test(revision)) {
      return usage(`--${flag}-revision must be a full 40-character commit SHA`);
    }
    options.revisionOverrides[name] = revision.toLowerCase();
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

function workerSourceForBudget(source, budget) {
  const marker = "const runInstructionBudget = 10_000;";
  const parts = source.split(marker);
  if (parts.length !== 2) {
    throw new Error(`expected one worker-budget marker, found ${parts.length - 1}`);
  }
  return parts.join(
    `const runInstructionBudget = ${WORKER_BUDGET_LITERALS.get(budget)};`,
  );
}

function createStaticServer(workerSource) {
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
      let data = await readFile(filename);
      if (filename === resolve(PUBLIC_ROOT, "game-worker.js")) data = workerSource;
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
  const runnerSource = await readFile(resolve(PUBLIC_ROOT, "noctis-runners.js"));
  const canonicalWorkerSource = await readFile(resolve(PUBLIC_ROOT, "game-worker.js"), "utf8");
  const workerSource = workerSourceForBudget(canonicalWorkerSource, options.workerBudget);
  const server = createStaticServer(workerSource);
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
    const instructionProfileQuery = options.instructionProfile ? "&instructionProfile=1" : "";
    const presentationQuery = options.presentationHz === 60 ? "&presentation=60" : "";
    await page.goto(`${baseUrl}/?clock=${options.clockSeconds}&profile=1${presentationQuery}${instructionProfileQuery}`, { waitUntil: "domcontentloaded" });
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
    if (readyState.worker?.runInstructionBudget !== options.workerBudget) {
      throw new Error(
        `profile requested worker budget ${options.workerBudget} but runtime used `
        + `${readyState.worker?.runInstructionBudget ?? "missing"}`,
      );
    }
    if (Boolean(readyState.worker?.instructionProfile) !== options.instructionProfile) {
      throw new Error("instruction profiling mode did not match the request");
    }
    const expectedFastPresentation = options.presentationHz === 60 ? 1 : 0;
    if (readyState.worker?.values?.vhgfast !== expectedFastPresentation) {
      throw new Error(
        `profile requested ${options.presentationHz}-Hz presentation but VHGfast is ${readyState.worker?.values?.vhgfast ?? "missing"}`,
      );
    }

    async function runtimeSnapshot() {
      await page.evaluate(() => {
        globalThis.__linoWorkerSnapshot = null;
        globalThis.__linoRuntime.postMessage({ type: "runtimeSnapshot" });
      });
      await page.waitForFunction(() => globalThis.__linoWorkerSnapshot?.values, null, {
        timeout: 10_000,
      });
      return page.evaluate(() => globalThis.__linoWorkerSnapshot);
    }

    async function waitRuntimeState(predicate, label) {
      const deadline = performance.now() + 10_000;
      let snapshot;
      while (performance.now() < deadline) {
        snapshot = await runtimeSnapshot();
        if (predicate(snapshot)) return snapshot;
        await new Promise((resolveWait) => setTimeout(resolveWait, 10));
      }
      throw new Error(`${label}: ${JSON.stringify(snapshot)}`);
    }

    await page.locator("#game").focus();
    let instructionProfileReset = null;
    if (options.instructionProfile) {
      await page.evaluate(() => {
        globalThis.__linoInstructionProfileReset = null;
        globalThis.__linoRuntime.postMessage({ type: "instructionProfileReset" });
      });
      await page.waitForFunction(() => globalThis.__linoInstructionProfileReset !== null, null, {
        timeout: 10_000,
      });
      instructionProfileReset = await page.evaluate(
        () => globalThis.__linoInstructionProfileReset,
      );
    }
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
    let instructionProfile = null;
    if (options.instructionProfile) {
      await page.evaluate(() => {
        globalThis.__linoInstructionProfile = null;
        globalThis.__linoRuntime.postMessage({ type: "instructionProfileSnapshot" });
      });
      await page.waitForFunction(() => globalThis.__linoInstructionProfile !== null, null, {
        timeout: 30_000,
      });
      instructionProfile = await page.evaluate(() => globalThis.__linoInstructionProfile);
      const profileStarted = instructionProfileReset?.sample;
      const profileEnded = instructionProfile.sample;
      if (!profileStarted || !profileEnded) {
        throw new Error("instruction profile did not retain exact worker samples");
      }
      const accountedInstructions = difference(
        profileEnded, profileStarted, "cumulativeInstructions",
      );
      const countedInstructions = instructionProfile.profile?.totalInstructions;
      const counterDifference = countedInstructions - accountedInstructions;
      if (!Number.isSafeInteger(countedInstructions)
          || Math.abs(counterDifference) > 100_000) {
        throw new Error(
          `instruction counters retained ${countedInstructions} `
          + `against ${accountedInstructions} runner-accounted instructions`,
        );
      }
      instructionProfile.interval = {
        started: profileStarted,
        ended: profileEnded,
        elapsedMilliseconds:
          profileEnded.sampledAtMilliseconds - profileStarted.sampledAtMilliseconds,
        runnerMilliseconds: difference(
          profileEnded, profileStarted, "cumulativeRunnerMilliseconds",
        ),
        instructions: countedInstructions,
        runnerAccountedInstructions: accountedInstructions,
        counterDifference,
        counterDifferenceRatio: counterDifference / countedInstructions,
      };
    }
    const ended = await page.evaluate(() => globalThis.__linoSnapshot());
    const elapsedMilliseconds = ended.sampledAtMilliseconds - started.sampledAtMilliseconds;
    const presentations = difference(ended, started, "presentedFrames");
    const producedPresentations = difference(ended, started, "producedPresentationFrames");
    const simulationTicks = difference(ended, started, "simulationTicks");
    const runnerMilliseconds = difference(ended, started, "cumulativeRunnerMilliseconds");
    const displayMilliseconds = difference(ended, started, "cumulativeDisplayMilliseconds");
    const instructions = difference(ended, started, "cumulativeInstructions");
    const runCalls = difference(ended, started, "cumulativeRunCalls");
    if (!(elapsedMilliseconds > 0) || presentations === 0 || producedPresentations === 0) {
      throw new Error("browser profile did not retain a positive presentation interval");
    }

    const canvasBounds = await page.locator("#game").boundingBox();
    if (!canvasBounds || canvasBounds.width < 600 || canvasBounds.height < 350) {
      throw new Error(`unexpected game canvas bounds: ${JSON.stringify(canvasBounds)}`);
    }
    const menuStartedAt = performance.now();
    await page.mouse.click(canvasBounds.x + 565, canvasBounds.y + 12);
    const menuOpened = await waitRuntimeState(
      (snapshot) => snapshot.values.menuon === 1,
      "open GAME menu",
    );
    const menuOpenMilliseconds = performance.now() - menuStartedAt;
    const dismissStartedAt = performance.now();
    await page.mouse.click(canvasBounds.x + 200, canvasBounds.y + 300);
    const menuDismissed = await waitRuntimeState(
      (snapshot) => snapshot.values.menuon === 0 && !snapshot.guiMenuActive
        && snapshot.pointerTransitions === 0 && !snapshot.activePointerTransition,
      "dismiss GAME menu with pointer",
    );
    const menuDismissMilliseconds = performance.now() - dismissStartedAt;
    const activeElement = await page.evaluate(() => document.activeElement?.id ?? "");
    if (activeElement !== "game") throw new Error(`game canvas lost focus to ${activeElement}`);
    const interaction = {
      canvasBounds,
      menuOpenMilliseconds,
      menuDismissMilliseconds,
      activeElement,
      openedAtPresentation: menuOpened.presentationFrames,
      dismissedAtPresentation: menuDismissed.presentationFrames,
    };

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
      scenario: checkpointRecord.scene.mode === 0 ? "stardrifter" : "surface",
      command: [process.execPath, ...process.argv.slice(1)],
      generatedAt: new Date().toISOString(),
      requestedMeasurementSeconds: options.durationSeconds,
      measuredMilliseconds: elapsedMilliseconds,
      startupSeconds,
      input: { warmupSeconds, key: "W", holdSeconds },
      interaction,
      provenance: {
        browser: { version: browserVersion, headless: !options.headed, ...browserIdentity },
        clockSeconds: options.clockSeconds,
        presentationHz: options.presentationHz,
        defaultModuleWorker: true,
        fastBootstrapEndedBeforeMeasurement: true,
        budgetYieldStrategy: readyState.worker.budgetYieldStrategy,
        workerBudget: options.workerBudget,
        workerSource: {
          canonicalSha256: sha256(canonicalWorkerSource),
          servedSha256: sha256(workerSource),
        },
        instructionProfile: options.instructionProfile,
        runtimeId: String(manifest.runtimeId ?? "unversioned"),
        staticRunner: {
          bytes: runnerSource.length,
          sha256: sha256(runnerSource),
        },
        checkpointPath: options.checkpoint,
        checkpoint: checkpointRecord,
        revisionOverrides: Object.fromEntries(
          Object.entries(options.revisionOverrides).map(([name, revision]) => [
            name, revision !== null,
          ]),
        ),
        revisions: {
          linoleum: options.revisionOverrides.linoleum ?? gitHead(options.linoRoot),
          linojava: options.revisionOverrides.linojava ?? gitHead(options.linoJavaRoot),
          linoctissite: options.revisionOverrides.linoctissite ?? gitHead(SITE_ROOT),
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
        runCalls,
      },
      metrics: {
        presentationHz: presentations * 1000 / elapsedMilliseconds,
        producedPresentationHz: producedPresentations * 1000 / elapsedMilliseconds,
        simulationHz: simulationTicks * 1000 / elapsedMilliseconds,
        droppedPresentations: producedPresentations - presentations,
        averageRunnerMillisecondsPerPresentedFrame: runnerMilliseconds / presentations,
        averageRunnerMillisecondsPerProducedFrame: runnerMilliseconds / producedPresentations,
        averageDisplayMillisecondsPerPresentedFrame: displayMilliseconds / presentations,
        nonRunnerMillisecondsPerProducedFrame:
          (elapsedMilliseconds - runnerMilliseconds) / producedPresentations,
        runnerDutyCycle: runnerMilliseconds / elapsedMilliseconds,
        instructionsPerPresentedFrame: instructions / presentations,
        instructionsPerProducedFrame: instructions / producedPresentations,
        runCallsPerProducedFrame: runCalls / producedPresentations,
        instructionsPerRunCall: instructions / runCalls,
      },
      instructionProfile,
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
    console.log(`PROFILE browser ${report.scenario}: ${report.interval.presentations} presentations, ${report.metrics.presentationHz.toFixed(2)} Hz, ${report.metrics.simulationHz.toFixed(3)} simulation Hz -> ${options.output}`);
  } catch (error) {
    console.error(error?.stack ?? String(error));
    process.exitCode = 1;
  }
}
