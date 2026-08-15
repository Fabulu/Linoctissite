import { access, copyFile, mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const compilerRoot = resolve(process.env.LINOJAVA_DIR ?? "../linojava");
const compilerPath = resolve(compilerRoot, "src/compiler.js");
await access(compilerPath);
const { inspect } = await import(pathToFileURL(compilerPath));

const inputPath = resolve("src/noctis_probe.lino");
const source = await readFile(inputPath, "utf8");
const runtimePath = resolve("public/linojava");
await mkdir(runtimePath, { recursive: true });
await copyFile(compilerPath, resolve(runtimePath, "compiler.js"));
await copyFile(resolve(compilerRoot, "src/browser.js"), resolve(runtimePath, "browser.js"));
await copyFile(inputPath, resolve("public/noctis_probe.lino"));

const report = inspect(source);
console.log(`Prepared ad hoc browser programme: ${report.blocks} blocks, ${report.memoryUnits} Lino units`);
