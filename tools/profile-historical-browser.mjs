import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  if (index < 0 || index + 1 >= args.length) throw new Error(`Missing ${name}`);
  return args[index + 1];
};
const root = resolve(option("--root"));
const output = resolve(option("--output"));
const commit = option("--commit");
const variant = option("--variant");
if (!["checked-in-overlay", "pinned-build"].includes(variant)) throw new Error("invalid variant");
const sourceCounterInstrumentation = args.includes("--source-counters");
const durationSeconds = Number(option("--duration"));
if (!(durationSeconds >= 5 && durationSeconds <= 60)) throw new Error("invalid duration");
const dependencyPins = new Map([
  ["58ecd8c", {
    linojava: "f9bf364c39be19aa0d0019133a704a7ff50ac535",
    linoleum: "f35fb8317fd4f5e5c1c2876bae56978a81548bbe",
  }],
  ["1a2fa7f", {
    linojava: "32d18b85da5621990dc38a98f1fdb7af3985e043",
    linoleum: "f35fb8317fd4f5e5c1c2876bae56978a81548bbe",
  }],
  ["3492857", {
    linojava: "32d18b85da5621990dc38a98f1fdb7af3985e043",
    linoleum: "f35fb8317fd4f5e5c1c2876bae56978a81548bbe",
  }],
  ["a4c2167", {
    linojava: "32d18b85da5621990dc38a98f1fdb7af3985e043",
    linoleum: "f35fb8317fd4f5e5c1c2876bae56978a81548bbe",
  }],
  ["4f9734b", {
    linojava: "32d18b85da5621990dc38a98f1fdb7af3985e043",
    linoleum: "f35fb8317fd4f5e5c1c2876bae56978a81548bbe",
  }],
  ["2f9f64c", {
    linojava: "722fd5047061783adbdfce9b7ba25338ac4ee86e",
    linoleum: "b90737d337dbeed10a0ff810c4bdeb7ce754bbd2",
  }],
]);
const revisions = [...dependencyPins]
  .find(([prefix]) => commit.startsWith(prefix))?.[1];
if (!revisions) throw new Error(`unknown historical dependency pins for ${commit}`);

const artifacts = {};
for (const name of [
  "app.js", "game-worker.js", "worker-host.js", "noctis-runners.js",
  "lino-src/manifest.json", "linojava/intrinsics/noctis.js",
]) {
  try {
    const bytes = await readFile(resolve(root, name));
    artifacts[name] = {
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    };
  } catch { /* Artifact did not exist at this historical commit. */ }
}

const sourceOverrides = new Map();
function replaceOnce(source, marker, replacement, name) {
  const parts = source.split(marker);
  if (parts.length !== 2) {
    throw new Error(`${name} expected one marker, found ${parts.length - 1}`);
  }
  return parts.join(replacement);
}
if (sourceCounterInstrumentation) {
  try {
    const workerSource = await readFile(resolve(root, "game-worker.js"), "utf8");
    sourceOverrides.set("game-worker.js", replaceOnce(
      workerSource,
      '    ["vhguileft", "vhguitop",',
      '    ["vhgloopcalls", "vhgtimingcalls", "vhguileft", "vhguitop",',
      "game-worker counters",
    ));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  const appSource = await readFile(resolve(root, "app.js"), "utf8");
  if (!sourceOverrides.has("game-worker.js")) {
    sourceOverrides.set("app.js", replaceOnce(
      appSource,
      "  frameCount += 1;",
      `  globalThis.__historicalSourceCounters = Object.fromEntries(
    ["vhgloopcalls", "vhgtimingcalls"].map((name) => {
      const symbol = program.linked.symbols.get(name);
      return [name, symbol ? memory[symbol.value] | 0 : null];
    }),
  );
  frameCount += 1;`,
      "main-thread counters",
    ));
  }
}

const servedSourceOverrides = Object.fromEntries(
  [...sourceOverrides].map(([name, source]) => [name, {
    bytes: Buffer.byteLength(source),
    sha256: createHash("sha256").update(source).digest("hex"),
  }]),
);

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
]);
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
    const filename = resolve(root, `.${pathname}`);
    const local = relative(root, filename);
    if (local.startsWith("..") || isAbsolute(local)) {
      response.writeHead(403).end();
      return;
    }
    const data = sourceOverrides.get(pathname.slice(1)) ?? await readFile(filename);
    response.writeHead(200, {
      "cache-control": "no-store",
      "content-type": mimeTypes.get(extname(filename)) ?? "application/octet-stream",
    });
    response.end(data);
  } catch {
    response.writeHead(404).end();
  }
});
await new Promise((resolveListen, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolveListen);
});
const address = server.address();
if (!address || typeof address !== "object") throw new Error("server has no address");
const baseUrl = `http://127.0.0.1:${address.port}`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
const page = await context.newPage();
const failures = { console: [], page: [], requests: [], runtime: [] };
page.on("console", (message) => {
  if (message.type() === "error") failures.console.push(message.text());
});
page.on("pageerror", (error) => failures.page.push(error.message));
page.on("requestfailed", (request) => failures.requests.push(
  `${request.method()} ${request.url()}: ${request.failure()?.errorText}`,
));
await page.addInitScript(() => {
  globalThis.__historicalProbe = {
    animationCallbacks: 0,
    displayRefreshCallbacks: 0,
    canvasWrites: 0,
    frameMessages: 0,
    firstMetrics: null,
    lastMetrics: null,
    lastUi: null,
  };
  const originalAnimationFrame = globalThis.requestAnimationFrame.bind(globalThis);
  const sampleDisplayRefresh = () => {
    globalThis.__historicalProbe.displayRefreshCallbacks += 1;
    originalAnimationFrame(sampleDisplayRefresh);
  };
  originalAnimationFrame(sampleDisplayRefresh);
  globalThis.requestAnimationFrame = (callback) => originalAnimationFrame((timestamp) => {
    globalThis.__historicalProbe.animationCallbacks += 1;
    callback(timestamp);
  });
  const originalPutImageData = CanvasRenderingContext2D.prototype.putImageData;
  CanvasRenderingContext2D.prototype.putImageData = function putImageData(...values) {
    globalThis.__historicalProbe.canvasWrites += 1;
    return originalPutImageData.apply(this, values);
  };
  const OriginalWorker = globalThis.Worker;
  globalThis.Worker = class ProbeWorker extends OriginalWorker {
    constructor(...values) {
      super(...values);
      globalThis.__historicalWorker = this;
      this.addEventListener("message", (event) => {
        if (event.data?.type !== "frame") return;
        const probe = globalThis.__historicalProbe;
        probe.frameMessages += 1;
        if (probe.firstMetrics === null) probe.firstMetrics = { ...event.data.metrics };
        probe.lastMetrics = { ...event.data.metrics };
        probe.lastUi = { ...event.data.ui };
      });
    }
  };
});

try {
  const startedAt = performance.now();
  await page.goto(`${baseUrl}/?presentation=60&historical=${commit.slice(0, 8)}`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForFunction(() => globalThis.__historicalProbe?.canvasWrites > 0
    || /stopped/i.test(document.querySelector("#status")?.textContent ?? ""), null, {
    timeout: 600_000,
  });
  if (sourceCounterInstrumentation) {
    await page.waitForFunction(() => {
      const counters = globalThis.__historicalSourceCounters
        ?? globalThis.__historicalProbe?.lastUi;
      return Number(counters?.vhgloopcalls) > 0
        || /stopped/i.test(document.querySelector("#status")?.textContent ?? "");
    }, null, { timeout: 600_000 });
  }
  const startupSeconds = (performance.now() - startedAt) / 1000;
  await page.locator("#game").focus();
  const started = await page.evaluate(() => ({
    now: performance.now(),
    probe: structuredClone(globalThis.__historicalProbe),
    counters: structuredClone(
      globalThis.__historicalSourceCounters ?? globalThis.__historicalProbe.lastUi,
    ),
    status: document.querySelector("#status")?.textContent ?? "",
  }));
  const measurementStartedAt = performance.now();
  await page.waitForTimeout(1_000);
  await page.keyboard.down("w");
  await page.waitForTimeout(Math.min(5_000, durationSeconds * 1000 / 3));
  await page.keyboard.up("w");
  const remaining = durationSeconds * 1000 - (performance.now() - measurementStartedAt);
  if (remaining > 0) await page.waitForTimeout(remaining);
  const ended = await page.evaluate(() => ({
    now: performance.now(),
    probe: structuredClone(globalThis.__historicalProbe),
    counters: structuredClone(
      globalThis.__historicalSourceCounters ?? globalThis.__historicalProbe.lastUi,
    ),
    status: document.querySelector("#status")?.textContent ?? "",
  }));
  for (const status of new Set([started.status, ended.status])) {
    if (/stopped/i.test(status)) failures.runtime.push(status);
  }
  const elapsedMilliseconds = ended.now - started.now;
  const delta = (name) => ended.probe[name] - started.probe[name];
  const metricDelta = (name) => {
    const before = Number(started.probe.lastMetrics?.[name]);
    const after = Number(ended.probe.lastMetrics?.[name]);
    return Number.isFinite(before) && Number.isFinite(after) ? after - before : null;
  };
  const counterDelta = (name) => {
    const before = Number(started.counters?.[name]);
    const after = Number(ended.counters?.[name]);
    return Number.isFinite(before) && Number.isFinite(after) ? after - before : null;
  };
  const ratio = (numerator, denominator) => Number.isFinite(numerator)
    && Number.isFinite(denominator) && denominator > 0
    ? numerator / denominator : null;
  const report = {
    schema: 1,
    scenario: "fresh-stardrifter",
    commit,
    variant,
    sourceCounterInstrumentation,
    revisions,
    root,
    baseUrl,
    artifacts,
    servedSourceOverrides,
    browser: { version: await browser.version(), headless: true },
    startupSeconds,
    requestedSeconds: durationSeconds,
    elapsedMilliseconds,
    started,
    ended,
    interval: {
      animationCallbacks: delta("animationCallbacks"),
      displayRefreshCallbacks: delta("displayRefreshCallbacks"),
      canvasWrites: delta("canvasWrites"),
      frameMessages: delta("frameMessages"),
      legacyRenderedFrames: metricDelta("renderedFrames"),
      currentPresentationFrames: metricDelta("presentationFrames"),
      currentSimulationTicks: metricDelta("simulationTicks"),
      sourceLoopCalls: counterDelta("vhgloopcalls"),
      sourceTimingCalls: counterDelta("vhgtimingcalls"),
    },
    rates: {
      animationHz: delta("animationCallbacks") * 1000 / elapsedMilliseconds,
      displayRefreshHz: delta("displayRefreshCallbacks") * 1000 / elapsedMilliseconds,
      canvasWriteHz: delta("canvasWrites") * 1000 / elapsedMilliseconds,
      frameMessageHz: delta("frameMessages") * 1000 / elapsedMilliseconds,
      legacyRenderedHz: metricDelta("renderedFrames") === null ? null
        : metricDelta("renderedFrames") * 1000 / elapsedMilliseconds,
      sourceLoopHz: counterDelta("vhgloopcalls") === null ? null
        : counterDelta("vhgloopcalls") * 1000 / elapsedMilliseconds,
      sourceTimingHz: counterDelta("vhgtimingcalls") === null ? null
        : counterDelta("vhgtimingcalls") * 1000 / elapsedMilliseconds,
    },
    ratios: {
      legacyRetracesPerSourceLoop: ratio(
        metricDelta("renderedFrames"), counterDelta("vhgloopcalls"),
      ),
      canvasWritesPerSourceLoop: ratio(
        delta("canvasWrites"), counterDelta("vhgloopcalls"),
      ),
    },
    failures,
  };
  await page.locator("#game").screenshot({ path: output.replace(/\.json$/i, ".png") });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
  console.log(JSON.stringify(report.rates));
} finally {
  await browser.close();
  await new Promise((resolveClose, reject) => server.close(
    (error) => error ? reject(error) : resolveClose(),
  ));
}
