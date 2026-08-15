const SECTION_NAMES = new Set([
  "directors",
  "constants",
  "variables",
  "workspace",
  "programme",
]);

function normaliseName(value) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function stripComments(source) {
  let result = "";
  let depth = 0;
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === '"' && depth === 0) {
      quoted = !quoted;
      result += char;
      continue;
    }
    if (!quoted && char === "(") {
      depth += 1;
      continue;
    }
    if (!quoted && char === ")" && depth > 0) {
      depth -= 1;
      continue;
    }
    if (depth === 0) {
      result += char;
    } else if (char === "\n") {
      result += "\n";
    }
  }

  if (depth !== 0 || quoted) {
    throw new SyntaxError("Unterminated comment or quoted label");
  }
  return result;
}

function scanItems(source) {
  const items = [];
  let buffer = "";

  const flushStatement = () => {
    const text = buffer.trim();
    if (text) items.push({ type: "statement", text });
    buffer = "";
  };

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === '"') {
      flushStatement();
      const end = source.indexOf('"', index + 1);
      if (end < 0) throw new SyntaxError("Unterminated quoted label");
      items.push({ type: "label", text: source.slice(index + 1, end).trim() });
      index = end;
    } else if (char === ";") {
      flushStatement();
    } else {
      buffer += char;
    }
  }
  flushStatement();
  return items;
}

function parseNumber(text) {
  const value = text.trim();
  if (/^(zero|null|no|off)$/i.test(value)) return 0;
  if (/^(yes|on|true)$/i.test(value)) return 1;
  const minus = /^minus\s+(.+)$/i.exec(value);
  if (minus) return (-parseNumber(minus[1])) | 0;
  const hex = /^([0-9a-f]+)h$/i.exec(value);
  if (hex) return Number.parseInt(hex[1], 16) | 0;
  if (/^[+-]?\d+$/.test(value)) return Number.parseInt(value, 10) | 0;
  return null;
}

function parseSymbols(items) {
  const symbols = new Map();
  const initial = [];
  let section = "";
  let cursor = 0;

  for (const item of items) {
    if (item.type === "label") {
      const candidate = normaliseName(item.text);
      section = SECTION_NAMES.has(candidate) ? candidate : section;
      continue;
    }
    if (!new Set(["constants", "variables", "workspace"]).has(section)) continue;

    const match = /^(?:shared\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/i.exec(item.text);
    if (!match) throw new SyntaxError(`Unsupported ${section} declaration: ${item.text}`);
    const name = normaliseName(match[1]);
    if (symbols.has(name)) throw new SyntaxError(`Duplicate symbol: ${match[1]}`);
    const value = parseNumber(match[2]);
    if (value === null) throw new SyntaxError(`Initial value must be an integer: ${item.text}`);

    if (section === "constants") {
      symbols.set(name, { name: match[1], kind: "constant", value });
    } else if (section === "variables") {
      symbols.set(name, { name: match[1], kind: "memory", address: cursor });
      initial[cursor] = value;
      cursor += 1;
    } else {
      if (value < 0) throw new SyntaxError(`Negative workspace size: ${item.text}`);
      symbols.set(name, { name: match[1], kind: "memory", address: cursor });
      cursor += value;
    }
  }

  return { symbols, initial, memoryUnits: Math.max(cursor, 1) };
}

function programItems(items) {
  const start = items.findIndex(
    (item) => item.type === "label" && normaliseName(item.text) === "programme",
  );
  if (start < 0) throw new SyntaxError('Missing "programme" section');
  return items.slice(start + 1);
}

function parseInstruction(text) {
  const trimmed = text.trim();
  if (!trimmed) return { type: "noop" };
  if (trimmed === "end") return { type: "halt" };
  if (trimmed === "leave") return { type: "return" };
  if (trimmed === "isocall") return { type: "isocall" };
  if (trimmed.includes("{") || trimmed.includes("}")) {
    throw new SyntaxError("Embedded native byte fragments need a portable intrinsic");
  }

  const condition = /^\?\s*(.+?)\s*(=|!=|<=|>=|<|>)\s*(.+?)\s*->\s*(.+)$/i.exec(trimmed);
  if (condition) {
    return {
      type: "condition",
      left: condition[1],
      operator: condition[2],
      right: condition[3],
      target: normaliseName(condition[4]),
    };
  }
  const call = /^=>\s*(.+)$/i.exec(trimmed);
  if (call) return { type: "call", target: normaliseName(call[1]) };
  const jump = /^->\s*(.+)$/i.exec(trimmed);
  if (jump) return { type: "jump", target: normaliseName(jump[1]) };

  const increment = /^(\[[^\]]+\]|[A-E])([+-])$/i.exec(trimmed);
  if (increment) {
    return { type: "update", left: increment[1], operator: increment[2], right: "1" };
  }
  const update = /^(\[[^\]]+\]|[A-E])\s*(=|\+|-|\*|\/|&|\|)\s*(.+)$/i.exec(trimmed);
  if (update) {
    return {
      type: "update",
      left: update[1],
      operator: update[2],
      right: update[3],
    };
  }
  throw new SyntaxError(`Unsupported programme instruction: ${text}`);
}

function buildBlocks(items) {
  const blocks = [];
  let current = { labels: [], instructions: [] };

  const finish = () => {
    if (current.labels.length || current.instructions.length) {
      blocks.push(current);
      current = { labels: [], instructions: [] };
    }
  };

  for (const item of items) {
    if (item.type === "label") {
      finish();
      current.labels.push(normaliseName(item.text));
      continue;
    }
    const instruction = parseInstruction(item.text);
    current.instructions.push(instruction);
    if (new Set(["jump", "call", "return", "halt", "isocall"]).has(instruction.type)) {
      finish();
    }
  }
  finish();
  if (blocks.length === 0) throw new SyntaxError("Programme section is empty");

  const labels = new Map();
  blocks.forEach((block, index) => {
    for (const label of block.labels) {
      if (labels.has(label)) throw new SyntaxError(`Duplicate programme label: ${label}`);
      labels.set(label, index);
    }
  });
  return { blocks, labels };
}

function symbolExpression(text, symbols) {
  const value = text.trim();
  if (/^[A-E]$/i.test(value)) return value.toUpperCase();
  const number = parseNumber(value);
  if (number !== null) return String(number | 0);

  const memory = /^\[\s*(.+?)\s*\]$/.exec(value);
  if (memory) {
    const address = symbolExpression(memory[1], symbols);
    return `mem[(${address}) >>> 0]`;
  }

  const symbol = symbols.get(normaliseName(value));
  if (!symbol) throw new SyntaxError(`Unknown operand: ${text}`);
  return String(symbol.kind === "constant" ? symbol.value : symbol.address);
}

function targetExpression(text, symbols) {
  const value = text.trim();
  if (/^[A-E]$/i.test(value)) return value.toUpperCase();
  const memory = /^\[\s*(.+?)\s*\]$/.exec(value);
  if (!memory) throw new SyntaxError(`Invalid assignment target: ${text}`);
  return `mem[(${symbolExpression(memory[1], symbols)}) >>> 0]`;
}

function resolveLabel(name, labels) {
  const target = labels.get(name);
  if (target === undefined) throw new SyntaxError(`Unknown programme label: ${name}`);
  return target;
}

function emitUpdate(instruction, symbols) {
  const left = targetExpression(instruction.left, symbols);
  const right = symbolExpression(instruction.right, symbols);
  switch (instruction.operator) {
    case "=": return `${left} = (${right}) | 0;`;
    case "+": return `${left} = (${left} + (${right})) | 0;`;
    case "-": return `${left} = (${left} - (${right})) | 0;`;
    case "*": return `${left} = Math.imul(${left}, (${right})) | 0;`;
    case "/": return `${left} = ((${left} / (${right})) | 0);`;
    case "&": return `${left} = (${left} & (${right})) | 0;`;
    case "|": return `${left} = (${left} | (${right})) | 0;`;
    default: throw new SyntaxError(`Unsupported operator: ${instruction.operator}`);
  }
}

function emitLocalRepeat(index) {
  return `if (executed >= maxBlocks) { pc = ${index}; return { status: "budget", blocks: executed }; } executed += 1; continue block${index};`;
}

function emitCondition(instruction, symbols, labels, index) {
  const left = symbolExpression(instruction.left, symbols);
  const right = symbolExpression(instruction.right, symbols);
  const operator = instruction.operator === "=" ? "===" : instruction.operator;
  const target = resolveLabel(instruction.target, labels);
  if (target === index) {
    return `if (((${left}) | 0) ${operator} ((${right}) | 0)) { ${emitLocalRepeat(index)} }`;
  }
  return `if (((${left}) | 0) ${operator} ((${right}) | 0)) { pc = ${target}; continue run; }`;
}

function emitBlock(block, index, blocks, labels, symbols) {
  const lines = [`case ${index}: {`];
  const hasLocalRepeat = block.instructions.some((instruction) => (
    (instruction.type === "condition" || instruction.type === "jump")
    && resolveLabel(instruction.target, labels) === index
  ));
  if (hasLocalRepeat) lines.push(`block${index}: while (true) {`);
  let terminal = false;
  for (const instruction of block.instructions) {
    if (instruction.type === "noop") continue;
    if (instruction.type === "update") lines.push(emitUpdate(instruction, symbols));
    if (instruction.type === "condition") lines.push(emitCondition(instruction, symbols, labels, index));
    if (instruction.type === "jump") {
      const target = resolveLabel(instruction.target, labels);
      if (target === index) {
        lines.push(emitLocalRepeat(index));
      } else if (target === index + 1) {
        lines.push(`pc = ${target};`);
        if (hasLocalRepeat) lines.push(`break block${index};`);
      } else {
        lines.push(`pc = ${target}; continue run;`);
      }
      terminal = true;
    }
    if (instruction.type === "call") {
      lines.push(`pushReturn(${index + 1}); pc = ${resolveLabel(instruction.target, labels)}; continue run;`);
      terminal = true;
    }
    if (instruction.type === "return") {
      lines.push('if (callDepth === 0) { halted = true; return { status: "halted", blocks: executed }; }');
      lines.push("callDepth -= 1; pc = callStack[callDepth]; continue run;");
      terminal = true;
    }
    if (instruction.type === "halt") {
      lines.push('halted = true; return { status: "halted", blocks: executed };');
      terminal = true;
    }
    if (instruction.type === "isocall") {
      lines.push(`pc = ${index + 1};`);
      lines.push('if (host.isocall?.(program) === true) return { status: "yield", blocks: executed };');
      lines.push("continue run;");
      terminal = true;
    }
    if (terminal) break;
  }
  if (!terminal) {
    if (index + 1 < blocks.length) {
      lines.push(`pc = ${index + 1};`);
      if (hasLocalRepeat) lines.push(`break block${index};`);
    }
    else lines.push('halted = true; return { status: "halted", blocks: executed };');
  }
  if (hasLocalRepeat) lines.push("}");
  lines.push("}");
  return lines.map((line) => `        ${line}`).join("\n");
}

export function compile(source, options = {}) {
  const clean = stripComments(source);
  const items = scanItems(clean);
  const { symbols, initial, memoryUnits } = parseSymbols(items);
  const { blocks, labels } = buildBlocks(programItems(items));
  const entryName = normaliseName(options.entry ?? "start");
  const entry = labels.get(entryName) ?? 0;
  const initialValues = Array.from({ length: memoryUnits }, (_, index) => initial[index] ?? 0);
  const publicSymbols = Object.fromEntries(
    [...symbols.entries()].map(([name, symbol]) => [name, symbol]),
  );
  const cases = blocks.map((block, index) => emitBlock(block, index, blocks, labels, symbols)).join("\n");

  return `// Generated by LinoJava. Do not edit.\n` +
`export const metadata = ${JSON.stringify({ backend: "javascript-aot-regions", memoryUnits, blocks: blocks.length })};\n` +
`const symbolTable = ${JSON.stringify(publicSymbols)};\n` +
`const initialMemory = ${JSON.stringify(initialValues)};\n` +
`export function createProgram(host = {}) {\n` +
`  const mem = new Int32Array(initialMemory);\n` +
`  let A = 0, B = 0, C = 0, D = 0, E = 0;\n` +
`  let pc = ${entry};\n` +
`  let halted = false;\n` +
`  let callStack = new Int32Array(256);\n` +
`  let callDepth = 0;\n` +
`  function pushReturn(value) {\n` +
`    if (callDepth === callStack.length) { const grown = new Int32Array(callStack.length * 2); grown.set(callStack); callStack = grown; }\n` +
`    callStack[callDepth] = value | 0; callDepth += 1;\n` +
`  }\n` +
`  function step(maxBlocks = 100000) {\n` +
`    if (halted) return { status: "halted", blocks: 0 };\n` +
`    let executed = 0;\n` +
`    run: while (executed < maxBlocks) {\n` +
`      executed += 1;\n` +
`      switch (pc) {\n${cases}\n` +
`        default: halted = true; return { status: "halted", blocks: executed };\n` +
`      }\n` +
`    }\n` +
`    return { status: "budget", blocks: executed };\n` +
`  }\n` +
`  const program = {\n` +
`    memory: mem,\n` +
`    symbols: symbolTable,\n` +
`    step,\n` +
`    get(name) { const symbol = symbolTable[String(name).toLowerCase()]; if (!symbol) throw new Error(\`Unknown Lino symbol: \${name}\`); return symbol.kind === "constant" ? symbol.value : mem[symbol.address]; },\n` +
`    set(name, value) { const symbol = symbolTable[String(name).toLowerCase()]; if (!symbol || symbol.kind !== "memory") throw new Error(\`Not a writable Lino symbol: \${name}\`); mem[symbol.address] = value | 0; },\n` +
`    snapshot() { return { version: 1, memory: Array.from(mem), registers: { A, B, C, D, E }, pc, halted, callStack: Array.from(callStack.subarray(0, callDepth)) }; },\n` +
`    restore(saved) {\n` +
`      if (!saved || saved.version !== 1 || !Array.isArray(saved.memory) || saved.memory.length !== mem.length) throw new Error("Incompatible LinoJava snapshot");\n` +
`      mem.set(saved.memory.map((value) => value | 0));\n` +
`      const registers = saved.registers ?? {};\n` +
`      A = registers.A | 0; B = registers.B | 0; C = registers.C | 0; D = registers.D | 0; E = registers.E | 0;\n` +
`      pc = saved.pc | 0; halted = Boolean(saved.halted);\n` +
`      callDepth = 0;\n` +
`      if (Array.isArray(saved.callStack)) {\n` +
`        while (callStack.length < saved.callStack.length) callStack = new Int32Array(callStack.length * 2);\n` +
`        for (const value of saved.callStack) { callStack[callDepth] = value | 0; callDepth += 1; }\n` +
`      }\n` +
`    },\n` +
`    get registers() { return { A, B, C, D, E }; },\n` +
`    get halted() { return halted; }\n` +
`  };\n` +
`  return program;\n` +
`}\n`;
}

export function inspect(source) {
  const clean = stripComments(source);
  const items = scanItems(clean);
  const { symbols, memoryUnits } = parseSymbols(items);
  const { blocks, labels } = buildBlocks(programItems(items));
  return {
    memoryUnits,
    blocks: blocks.length,
    labels: [...labels.keys()],
    symbols: [...symbols.keys()],
  };
}

export { compileLinkedProject, compileProject, emitRunner } from "./compiler/project-compiler.js";
export { linkProject } from "./compiler/linker.js";
