import { compile } from "./compiler.js";

const CACHE_DATABASE = "linojava-compiled-programs";
const CACHE_STORE = "modules";
const CACHE_VERSION = 1;
const EMITTER_REVISION = "javascript-aot-regions-v2";

function fallbackHash(text) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

async function sourceKey(source, options) {
  const payload = `${EMITTER_REVISION}\0${JSON.stringify(options ?? {})}\0${source}`;
  if (globalThis.crypto?.subtle && typeof TextEncoder !== "undefined") {
    const bytes = new TextEncoder().encode(payload);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    const key = [...new Uint8Array(digest)]
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("");
    return { key, payload };
  }
  return { key: fallbackHash(payload), payload };
}

function openCache() {
  if (!globalThis.indexedDB) return Promise.resolve(null);
  return new Promise((resolve) => {
    const request = globalThis.indexedDB.open(CACHE_DATABASE, CACHE_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(CACHE_STORE)) {
        request.result.createObjectStore(CACHE_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
}

async function cacheRead(key, payload) {
  const database = await openCache();
  if (!database) return null;
  return new Promise((resolve) => {
    const request = database.transaction(CACHE_STORE, "readonly").objectStore(CACHE_STORE).get(key);
    request.onsuccess = () => {
      const saved = request.result;
      resolve(saved?.payload === payload && typeof saved.generated === "string" ? saved.generated : null);
    };
    request.onerror = () => resolve(null);
  }).finally(() => database.close());
}

async function cacheWrite(key, payload, generated) {
  const database = await openCache();
  if (!database) return;
  await new Promise((resolve) => {
    const transaction = database.transaction(CACHE_STORE, "readwrite");
    transaction.objectStore(CACHE_STORE).put({ payload, generated }, key);
    transaction.oncomplete = resolve;
    transaction.onerror = resolve;
    transaction.onabort = resolve;
  });
  database.close();
}

async function importGeneratedModule(generated) {
  const url = URL.createObjectURL(new Blob([generated], { type: "text/javascript" }));
  try {
    return await import(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function compileInBrowser(source, options = {}) {
  const compilerOptions = options.compiler ?? {};
  const { key, payload } = await sourceKey(source, compilerOptions);
  let generated = options.cache === false ? null : await cacheRead(key, payload);
  const cached = generated !== null;
  if (!generated) {
    generated = compile(source, compilerOptions);
    if (options.cache !== false) await cacheWrite(key, payload, generated);
  }
  const module = await importGeneratedModule(generated);
  return { module, key, cached, generated };
}

export async function createProgramFromSource(source, host = {}, options = {}) {
  const compiled = await compileInBrowser(source, options);
  return {
    ...compiled,
    program: compiled.module.createProgram(host),
  };
}

export async function createProgramFromElement(element, host = {}, options = {}) {
  if (!element) throw new TypeError("A Lino script element is required");
  const sourceUrl = element.getAttribute("src");
  let source = element.textContent ?? "";
  if (sourceUrl) {
    const response = await fetch(new URL(sourceUrl, document.baseURI));
    if (!response.ok) throw new Error(`Unable to load Lino source: ${response.status} ${response.statusText}`);
    source = await response.text();
  }
  return createProgramFromSource(source, host, {
    ...options,
    compiler: {
      ...(options.compiler ?? {}),
      entry: element.dataset.entry ?? options.compiler?.entry,
    },
  });
}

export async function bootLinoScripts(options = {}) {
  const root = options.root ?? document;
  const elements = [...root.querySelectorAll('script[type="text/lino"]')];
  return Promise.all(elements.map(async (element) => {
    const host = await options.hostFactory?.(element) ?? {};
    const instance = await createProgramFromElement(element, host, options);
    element.dispatchEvent(new CustomEvent("lino-ready", { detail: instance }));
    return { element, ...instance };
  }));
}
