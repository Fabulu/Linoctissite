import { access, copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const compilerRoot = resolve(process.env.LINOJAVA_DIR ?? "../linojava");
const linoRoot = resolve(process.env.LINO_SOURCE_DIR ?? "../linoleum");
const compilerPath = resolve(compilerRoot, "src/compiler.js");
const entryPath = resolve(linoRoot, "work/vhgame.txt");
const namedFilePaths = new Map([
  ["digimap2.bin", resolve(linoRoot, "work/digimap2.bin")],
  ["globes.map", resolve(linoRoot, "work/globes.map")],
  ["offsets.map", resolve(linoRoot, "work/offsets.map")],
  ["vehicle.ncc", resolve(linoRoot, "work/vehicle.ncc")],
  ["mammal.ncc", resolve(linoRoot, "work/mammal.ncc")],
  ["birdy.ncc", resolve(linoRoot, "work/birdy.ncc")],
  ["noctis_music.pcm", resolve(linoRoot, "work/noctis_music.pcm")],
]);
await access(compilerPath);
await access(entryPath);

const { loadProject } = await import(pathToFileURL(resolve(compilerRoot, "src/compiler/project-loader.js")));
const {
  createNoctisIntrinsics, emitStaticRunnerModule, linkProject,
} = await import(pathToFileURL(compilerPath));

async function firstFile(candidates, suffixes) {
  for (const candidate of candidates) {
    for (const suffix of suffixes) {
      const filename = `${candidate}${suffix}`;
      try { return { filename, data: await readFile(filename) }; } catch { /* try next */ }
    }
  }
  throw new Error(`Cannot resolve ${candidates.join(", ")}`);
}

function candidates(specifier, importer) {
  const name = specifier.replaceAll("\\", "/");
  if (importer === null || importer === undefined) return [resolve(specifier)];
  if (name.startsWith("/")) return [resolve(linoRoot, "main/lib", name.slice(1))];
  const names = name.toLowerCase() === name ? [name] : [name, name.toLowerCase()];
  return names.flatMap((candidate) => [
    resolve(dirname(importer ?? entryPath), candidate),
    resolve(linoRoot, "main/lib", candidate),
  ]);
}

const project = await loadProject(entryPath, {
  async resolveSource(specifier, importer) {
    const result = await firstFile(candidates(specifier, importer), ["", ".txt"]);
    return { id: result.filename, source: result.data.toString("utf8") };
  },
  async resolveStockfile(specifier, importer) {
    const result = await firstFile(candidates(specifier, importer), ["", ".tga"]);
    return { id: result.filename, data: new Uint8Array(result.data) };
  },
});

const runtimePath = resolve("public/linojava");
await rm(runtimePath, { recursive: true, force: true });
await mkdir(runtimePath, { recursive: true });
await copyFile(compilerPath, resolve(runtimePath, "compiler.js"));
await cp(resolve(compilerRoot, "src/compiler"), resolve(runtimePath, "compiler"), { recursive: true });
await cp(resolve(compilerRoot, "src/intrinsics"), resolve(runtimePath, "intrinsics"), { recursive: true });

const sourcePath = resolve("public/lino-src");
await rm(sourcePath, { recursive: true, force: true });
for (const record of [...project.modules, ...project.stockfiles]) {
  const output = resolve(sourcePath, relative(linoRoot, record.id));
  await mkdir(dirname(output), { recursive: true });
  await copyFile(record.id, output);
}

const sourceManifest = {};
const stockfileManifest = {};
const namedFileManifest = {};
const canonical = (value) => value.replace(/[\x00-\x20]+/g, "").replaceAll("\\", "/").toLowerCase();
for (const [name, filename] of namedFilePaths) {
  await access(filename);
  const output = resolve(sourcePath, "files", name);
  await mkdir(dirname(output), { recursive: true });
  await copyFile(filename, output);
  namedFileManifest[canonical(name)] = relative(sourcePath, output).replaceAll("\\", "/");
}
for (const module of project.modules) {
  const librarySpecs = module.periods
    .filter((period) => period.name === "libraries")
    .flatMap((period) => period.items.filter((item) => item.type === "statement").map((item) => item.text.trim()));
  librarySpecs.forEach((specifier, index) => {
    sourceManifest[canonical(specifier)] = relative(linoRoot, module.libraries[index]).replaceAll("\\", "/");
  });
  const stockfileSpecs = module.periods
    .filter((period) => period.name === "stockfile")
    .flatMap((period) => period.items.filter((item) => item.type === "statement").map((item) => item.text.trim()));
  stockfileSpecs.forEach((specifier, index) => {
    stockfileManifest[canonical(specifier)] = relative(linoRoot, module.stockfiles[index]).replaceAll("\\", "/");
  });
}
await writeFile(
  resolve(sourcePath, "manifest.json"),
  JSON.stringify({ sources: sourceManifest, stockfiles: stockfileManifest, files: namedFileManifest }),
);

const linked = linkProject(project);
const runnerSource = emitStaticRunnerModule(linked, createNoctisIntrinsics(), { regionSize: 1024 });
await writeFile(resolve("public/noctis-runners.js"), runnerSource);

console.log(`Prepared real Noctis project: ${project.modules.length} modules, ${project.stockfiles.length} stockfiles, ${Math.ceil(runnerSource.length / 1024)} KiB static runners`);
