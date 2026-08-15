import { access, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const compilerRoot = resolve(process.env.LINOJAVA_DIR ?? "../linojava");
const compilerPath = resolve(compilerRoot, "src/compiler.js");
await access(compilerPath);
const { compile, inspect } = await import(pathToFileURL(compilerPath));

const inputPath = resolve("src/noctis_probe.lino");
const outputPath = resolve("public/noctis_probe.js");
const source = await readFile(inputPath, "utf8");
await writeFile(outputPath, compile(source), "utf8");

const report = inspect(source);
console.log(`Built browser programme: ${report.blocks} blocks, ${report.memoryUnits} Lino units`);
