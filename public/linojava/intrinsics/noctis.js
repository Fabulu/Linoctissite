import { canonicalName } from "../compiler/lexer.js";

const IDS = Object.freeze({
  copyRegion: "native:igui.txt:6ce302b9",
  expandIndexed: "native:vhgui.txt:b4c87005",
  scale2x: "native:vhgui.txt:ed1d5dbf",
  scaleNearest: "native:vhgui.txt:3f79795d",
  pageStore: "native:pgmem.txt:bfbf99a3",
  pageLoad: "native:pgmem.txt:adabc499",
  multiplyUnsigned: "native:mul64frag.txt:258c1fb1",
  multiplySigned: "native:mul64frag.txt:30589b54",
  foldMultiplySigned: "native:vhspace.txt:298e521b",
  maskStarPage: "native:vhstar.txt:e2a24844",
  cycleStarTexture: "native:vhstar.txt:0f6a8ebb",
  smoothStarPage: "native:vhstar.txt:e09c521e",
  copyPlanetView: "native:spncc.txt:07d4565b",
  scanNotEqual: "native:pgrast.txt:3fe9c069",
  scanEqual: "native:pgrast.txt:8bbecaca",
  fillBytes: "native:pgrast.txt:381a0272",
  traceVertical: "native:pgrast.txt:9d0db75a",
  traceSegment: "native:pgrast.txt:64cf2ec7",
  fillFlare: "native:pgrast.txt:f43d628e",
  fillHalo: "native:pgrast.txt:1211c607",
  fillHaloFallback: "native:pgrast.txt:a9310ad7",
  initializePolygonRows: "native:pgtex.txt:3f5cd065",
  terrainPixelBlock: "native:pgtex.txt:48d8d8f7",
  terrainCullPixelBlock: "native:pgtex.txt:97457ef3",
  transparentPixel: "native:pgtex.txt:7cf9c5ad",
  transparentCullPixel: "native:pgtex.txt:d7cb2f13",
  duplicateHalfScan: "native:pgtex.txt:e4dc90b9",
  resetFloatingPoint: "native:vhgame.txt:9c6ea36c",
  invertGroundSky: "native:vhground.txt:7200dd4e",
  clearGroundPage: "native:vhground.txt:73ab03f2",
  copyGroundBackground: "native:vhground.txt:f3ec1118",
  drawGroundBackground: "native:vhground.txt:fbf23f03",
  groundCachedBounds: "native:vhground.txt:0968b869",
  groundRandomSquare: "native:vhground.txt:9cb919a1",
  groundTileShade: "native:vhground.txt:eb31ac58",
  loadProjectedVertices: "native:pgproj.txt:d786e423",
  duplicateMappedInput: "native:pgproj.txt:7debfd43",
  duplicateMappedRotation: "native:pgproj.txt:9cca6521",
  enterFloatingPoint: "native:fpctl.txt:702d65f0",
  leaveFloatingPoint: "native:fpctl.txt:5c4bf558",
  loadFloatingPointControl: "native:fpctl.txt:e3c3b332",
  readFloatingPointControl: "native:fpctl.txt:4cf1786d",
  readFloatingPointStatus: "native:fpctl.txt:4457bfde",
  saveChopControl: "native:fpconv.txt:723ba62b",
  convertFloatToIntChop: "native:fpconv.txt:89dd8688",
  convertFloatToIntNear: "native:fpconv.txt:50fd8e24",
  convertIntToFloat: "native:fpconv.txt:13199376",
  narrowFloat32: "native:fpconv.txt:5835de7d",
  storeFloat32: "native:fpconv.txt:a0a7129a",
  loadFloat32: "native:fpconv.txt:518837c4",
  addFloat64: "native:fpx87.txt:60a68e23",
  subtractFloat64: "native:fpx87.txt:49d5def3",
  multiplyFloat64: "native:fpx87.txt:a83af22d",
  divideFloat64: "native:fpx87.txt:40b1a29b",
  squareRootFloat64: "native:fpx87.txt:6dccac55",
  negateFloat64: "native:fpx87.txt:8ab37b39",
  absoluteFloat64: "native:fpx87.txt:9272e6ee",
  sineFloat64: "native:fpx87.txt:990f933f",
  cosineFloat64: "native:fpx87.txt:6030b1a7",
  atan2Float64: "native:fpx87.txt:75bee0ee",
  compareFloat64: "native:fpx87.txt:8a4b2806",
  nearStarIdentity: "native:fpchains.txt:8412f865",
  nearStarIdentityPermuted: "native:fpchains.txt:a6f34a77",
  nearStarIdentitySpill1: "native:fpchains.txt:f8ee8e19",
  nearStarIdentitySpill2: "native:fpchains.txt:c1a6a36c",
  nearStarIdentitySpill3: "native:fpchains.txt:8d7a8fb7",
  nearStarIdentitySpill4: "native:fpchains.txt:351b2030",
  nearStarIdentitySpillAll: "native:fpchains.txt:4e0d282c",
  isThereIdentity: "native:fpchains.txt:8c6b5253",
  product4: "native:fpchains.txt:ebfc76f9",
  product4Spilled: "native:fpchains.txt:c457fe77",
  saveNearStarChopControl: "native:nsident.txt:55a8f3b7",
  nearStarIdentityChop16: "native:nsident.txt:98321a92",
  enterGeometryChop: "native:geoconv.txt:208b7b51",
  geometryKMulChop: "native:geoconv.txt:ef7a3d09",
  geometryKMulChopSpilled: "native:geoconv.txt:c9ce38be",
  geometryTwoMulKChop: "native:geoconv.txt:27dad376",
  geometrySeedTiltChop: "native:geoconv.txt:533bcfd2",
  geometrySeedTiltChopSpilled: "native:geoconv.txt:6b987557",
  geometryPlainChop: "native:geoconv.txt:9759da1e",
  geometryPlainChop32: "native:geoconv.txt:4b17cbfa",
  geometryQuoMulChop: "native:geoconv.txt:db2c8edc",
  geometryQuoMulChopSpill1: "native:geoconv.txt:21d6704d",
  geometryQuoMulChopSpill2: "native:geoconv.txt:6cc67b59",
  geometrySeedStore100: "native:geoconv.txt:7aa480fb",
  geometryRatioStore50: "native:geoconv.txt:a72b917d",
  geometryRatioStore500: "native:geoconv.txt:4560767d",
  geometryRatioStore5000: "native:geoconv.txt:2452bee5",
  geometryEccentricityStore: "native:geoconv.txt:15cdf8c2",
  geometryPlanetRayStore: "native:geoconv.txt:36918bb0",
  geometryMoonRayStore: "native:geoconv.txt:dffdf352",
  geometrySurfaceSeedChop: "native:geoconv.txt:6dececbb",
  geometryAdd4112Chop: "native:geoconv.txt:5c90016f",
  missionWidenFloat32: "native:mgloop.txt:518837c4",
  spaceRelativeCoordinates: "native:vhspace.txt:0abeba20",
  spaceRotateDepth: "native:vhspace.txt:d05e1b23",
  spaceProject: "native:vhspace.txt:3c924fe2",
});

const SERVICE_IDS = Object.freeze({
  pgfA: "service:pgfa",
  pgfB: "service:pgfb",
  pgfStoreA: "service:pgfsa",
  pgfMove: "service:pgfmov",
  pgfLoadFloat32: "service:pgfldf32",
  pgfLoadFloat64: "service:pgfldf64",
  pgfStoreFloat32: "service:pgfstf32",
  pgfSetFloat32: "service:pgfsetf32",
  pgfNarrow: "service:pgfnarrow",
  pgfAdd: "service:pgfadd",
  pgfSubtract: "service:pgfsub",
  pgfMultiply: "service:pgfmul",
  pgfDivide: "service:pgfquo",
  pgfReverseSubtract: "service:pgfrsub",
  pgfReverseDivide: "service:pgfrquo",
  pgfInteger: "service:pgfint",
  pgfFromInteger: "service:pgffromint",
});

const symbolCaches = new WeakMap();
const dataViewCaches = new WeakMap();
const float32Scratch = new DataView(new ArrayBuffer(4));

function address(linked, name) {
  let cache = symbolCaches.get(linked);
  if (!cache) {
    cache = new Map();
    symbolCaches.set(linked, cache);
  }
  let symbol = cache.get(name);
  if (!symbol) {
    symbol = linked.symbols.get(canonicalName(name));
    if (symbol) cache.set(name, symbol);
  }
  if (!symbol) throw new ReferenceError(`Missing Noctis Lino symbol ${name}`);
  return symbol.value >>> 0;
}

function floatingPoint(machine) {
  if (!machine.fpu) machine.fpu = { control: 0x037f, status: 0, stack: [] };
  return machine.fpu;
}

function dataView(memory) {
  let view = dataViewCaches.get(memory);
  if (!view) {
    view = new DataView(memory.buffer, memory.byteOffset, memory.byteLength);
    dataViewCaches.set(memory, view);
  }
  return view;
}

function readFloat64(memory, unit) {
  return dataView(memory).getFloat64(unit * 4, true);
}

function writeFloat64(memory, unit, number) {
  dataView(memory).setFloat64(unit * 4, number, true);
}

function float32Bits(number) {
  float32Scratch.setFloat32(0, number, true);
  return float32Scratch.getInt32(0, true);
}

function float32FromBits(bits) {
  float32Scratch.setInt32(0, bits, true);
  return float32Scratch.getFloat32(0, true);
}

function adjacentFloat32(number, upward) {
  if (Number.isNaN(number) || number === (upward ? Infinity : -Infinity)) return number;
  if (number === 0) return float32FromBits(upward ? 1 : 0x80000001);
  let bits = float32Bits(number);
  bits = number > 0 ? bits + (upward ? 1 : -1) : bits + (upward ? -1 : 1);
  return float32FromBits(bits);
}

function roundFloat32(number, control) {
  const nearest = Math.fround(number);
  if ((control & 0x0c00) === 0 || nearest === number || !Number.isFinite(number)) return nearest;
  const mode = (control >>> 10) & 3;
  if (mode === 1 && nearest > number) return adjacentFloat32(nearest, false);
  if (mode === 2 && nearest < number) return adjacentFloat32(nearest, true);
  if (mode === 3) {
    if (number > 0 && nearest > number) return adjacentFloat32(nearest, false);
    if (number < 0 && nearest < number) return adjacentFloat32(nearest, true);
  }
  return nearest;
}

function nearestEven(number) {
  const floor = Math.floor(number);
  const fraction = number - floor;
  if (fraction < 0.5) return floor;
  if (fraction > 0.5) return floor + 1;
  return (floor & 1) === 0 ? floor : floor + 1;
}

function convertToInt32(number, control) {
  if (!Number.isFinite(number)) return -2147483648;
  const mode = (control >>> 10) & 3;
  const rounded = mode === 0 ? nearestEven(number)
    : mode === 1 ? Math.floor(number)
      : mode === 2 ? Math.ceil(number)
        : Math.trunc(number);
  if (rounded < -2147483648 || rounded > 2147483647) return -2147483648;
  return rounded | 0;
}

function bitLength(number) {
  return number === 0n ? 0 : (number < 0n ? -number : number).toString(2).length;
}

function roundBinary(integer, exponent, precision, control, sticky = false) {
  if (integer === 0n) return { integer: 0n, exponent: 0 };
  const negative = integer < 0n;
  let magnitude = negative ? -integer : integer;
  const shift = bitLength(magnitude) - precision;
  if (shift <= 0) return { integer, exponent };
  const divisor = 1n << BigInt(shift);
  let rounded = magnitude >> BigInt(shift);
  const discarded = magnitude & (divisor - 1n);
  const mode = (control >>> 10) & 3;
  let increment = false;
  if (mode === 0) {
    const half = divisor >> 1n;
    increment = discarded > half
      || (discarded === half && (sticky || (rounded & 1n) !== 0n));
  } else if (mode === 1) {
    increment = negative && (discarded !== 0n || sticky);
  } else if (mode === 2) {
    increment = !negative && (discarded !== 0n || sticky);
  }
  if (increment) rounded += 1n;
  let outputExponent = exponent + shift;
  if (bitLength(rounded) > precision) {
    rounded >>= 1n;
    outputExponent += 1;
  }
  return { integer: negative ? -rounded : rounded, exponent: outputExponent };
}

function extendedFromInteger(number) {
  return { integer: BigInt(number | 0), exponent: 0, special: null };
}

function extendedFromNumber(number) {
  if (!Number.isFinite(number)) return { integer: 0n, exponent: 0, special: number };
  if (number === 0) return { integer: 0n, exponent: 0, special: Object.is(number, -0) ? -0 : null };
  const scratch = new ArrayBuffer(8);
  const view = new DataView(scratch);
  view.setFloat64(0, number, true);
  const bits = view.getBigUint64(0, true);
  const negative = (bits >> 63n) !== 0n;
  const encodedExponent = Number((bits >> 52n) & 0x7ffn);
  const fraction = bits & 0xfffffffffffffn;
  const significand = encodedExponent === 0 ? fraction : (1n << 52n) | fraction;
  const exponent = encodedExponent === 0 ? -1074 : encodedExponent - 1023 - 52;
  return { integer: negative ? -significand : significand, exponent, special: null };
}

function extendedToNumber(value, control) {
  if (value.special !== null) return value.special;
  if (value.integer === 0n) return 0;
  const rounded = roundBinary(value.integer, value.exponent, 53, control);
  return Number(rounded.integer) * 2 ** rounded.exponent;
}

function extendedMultiply(left, right, control) {
  if (left.special !== null || right.special !== null) {
    return extendedFromNumber(extendedToNumber(left, control) * extendedToNumber(right, control));
  }
  const rounded = roundBinary(
    left.integer * right.integer,
    left.exponent + right.exponent,
    64,
    control,
  );
  return { ...rounded, special: null };
}

function extendedAdd(left, right, control) {
  if (left.special !== null || right.special !== null) {
    return extendedFromNumber(extendedToNumber(left, control) + extendedToNumber(right, control));
  }
  const exponent = Math.min(left.exponent, right.exponent);
  const leftInteger = left.integer << BigInt(left.exponent - exponent);
  const rightInteger = right.integer << BigInt(right.exponent - exponent);
  const rounded = roundBinary(leftInteger + rightInteger, exponent, 64, control);
  return { ...rounded, special: null };
}

function extendedSubtract(left, right, control) {
  return extendedAdd(left, { ...right, integer: -right.integer, special: right.special === null ? null : -right.special }, control);
}

function extendedDivide(left, right, control) {
  if (left.special !== null || right.special !== null || right.integer === 0n) {
    return extendedFromNumber(extendedToNumber(left, control) / extendedToNumber(right, control));
  }
  const negative = (left.integer < 0n) !== (right.integer < 0n);
  const numerator = left.integer < 0n ? -left.integer : left.integer;
  const denominator = right.integer < 0n ? -right.integer : right.integer;
  const shift = Math.max(0, 68 + bitLength(denominator) - bitLength(numerator));
  const scaled = numerator << BigInt(shift);
  const quotient = scaled / denominator;
  const remainder = scaled % denominator;
  const rounded = roundBinary(
    negative ? -quotient : quotient,
    left.exponent - right.exponent - shift,
    64,
    control,
    remainder !== 0n,
  );
  return { ...rounded, special: null };
}

function extendedToBigInt(value, control) {
  if (value.special !== null) return -(1n << 63n);
  if (value.exponent >= 0) return value.integer << BigInt(value.exponent);
  const negative = value.integer < 0n;
  const magnitude = negative ? -value.integer : value.integer;
  const shift = -value.exponent;
  const divisor = 1n << BigInt(shift);
  let quotient = magnitude >> BigInt(shift);
  const remainder = magnitude & (divisor - 1n);
  const mode = (control >>> 10) & 3;
  if (remainder !== 0n) {
    if (mode === 0) {
      const half = divisor >> 1n;
      if (remainder > half || (remainder === half && (quotient & 1n) !== 0n)) quotient += 1n;
    } else if (mode === 1 && negative) quotient += 1n;
    else if (mode === 2 && !negative) quotient += 1n;
  }
  return negative ? -quotient : quotient;
}

function spillExtended(memory, linked, slotName, value, control) {
  const stored = extendedToNumber(value, control);
  writeFloat64(memory, address(linked, slotName), stored);
  return extendedFromNumber(stored);
}

function value(memory, linked, name) {
  return memory[address(linked, name)] | 0;
}

function copyQword(memory, source, destination) {
  memory[destination] = memory[source];
  memory[destination + 1] = memory[source + 1];
}

function pgfSlot(memory, linked, indexName) {
  return (address(linked, "fw") + 2 * value(memory, linked, indexName)) >>> 0;
}

function pgfLoadA(machine, linked) {
  const source = pgfSlot(machine.memory, linked, "PGFi");
  copyQword(machine.memory, source, address(linked, "FA0"));
  machine.A = source | 0;
}

function pgfLoadB(machine, linked) {
  const source = pgfSlot(machine.memory, linked, "PGFi");
  copyQword(machine.memory, source, address(linked, "FB0"));
  machine.A = source | 0;
}

function pgfStoreA(machine, linked) {
  const destination = pgfSlot(machine.memory, linked, "PGFi");
  copyQword(machine.memory, address(linked, "FA0"), destination);
  machine.A = destination | 0;
}

function pgfMove(machine, linked) {
  const source = pgfSlot(machine.memory, linked, "PGFi");
  const destination = pgfSlot(machine.memory, linked, "PGFj");
  copyQword(machine.memory, source, destination);
  machine.A = source | 0;
  machine.C = destination | 0;
}

function pgfLoadFloat32(machine, linked) {
  machine.memory[address(linked, "FS0")] = value(machine.memory, linked, "PGFt");
  loadFloat32(machine, linked);
}

function pgfLoadFloat64(machine, linked) {
  const memory = machine.memory;
  memory[address(linked, "FA0")] = value(memory, linked, "PGFt");
  memory[address(linked, "FA0") + 1] = value(memory, linked, "PGFu");
}

function pgfStoreFloat32(machine, linked) {
  storeFloat32(machine, linked);
  machine.memory[address(linked, "PGFt")] = value(machine.memory, linked, "FS0");
}

function pgfSetFloat32(machine, linked) {
  pgfLoadFloat32(machine, linked);
  pgfStoreA(machine, linked);
}

function pgfNarrow(machine, linked) {
  pgfLoadA(machine, linked);
  narrowFloat32(machine, linked);
  pgfStoreA(machine, linked);
}

function pgfBinary(machine, linked, operation) {
  pgfLoadB(machine, linked);
  operation(machine, linked);
}

function pgfReverseBinary(machine, linked, operation) {
  const memory = machine.memory;
  copyQword(memory, address(linked, "FA0"), address(linked, "FT0"));
  pgfLoadA(machine, linked);
  copyQword(memory, address(linked, "FT0"), address(linked, "FB0"));
  operation(machine, linked);
}

function pgfInteger(machine, linked) {
  convertFloatToIntNear(machine, linked);
}

function pgfFromInteger(machine, linked) {
  convertIntToFloat(machine, linked);
}

function noctisBuffer(linked, offsetName) {
  return (address(linked, "nw") + address(linked, offsetName)) >>> 0;
}

function polygonBuffer(memory, linked, offsetName) {
  return (value(memory, linked, "PGnwbase") + address(linked, offsetName)) >>> 0;
}

function copyRegion(machine, linked) {
  const memory = machine.memory;
  let source = value(memory, linked, "UAFsrc") >>> 0;
  let destination = value(memory, linked, "UAFdst") >>> 0;
  const width = value(memory, linked, "UAFwidth") >>> 0;
  const height = value(memory, linked, "UAFheight") >>> 0;
  const gap = value(memory, linked, "UAFgap") >> 2;

  for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
      memory[destination + column] = memory[source + column];
    }
    source = (source + width + gap) >>> 0;
    destination = (destination + width + gap) >>> 0;
  }
}

function expandIndexed(machine, linked) {
  const memory = machine.memory;
  const source = value(memory, linked, "VHGUIsrc") >>> 0;
  const palette = value(memory, linked, "VHGUIpal") >>> 0;
  const destination = value(memory, linked, "VHGUIdst") >>> 0;
  for (let pixel = 0; pixel < 64000; pixel += 1) {
    memory[destination + pixel] = memory[palette + (memory[source + pixel] & 255)];
  }
}

function scale2x(machine, linked) {
  const memory = machine.memory;
  let source = value(memory, linked, "VHGUIsrc") >>> 0;
  let backdrop0 = value(memory, linked, "VHGUIdst") >>> 0;
  let backdrop1 = value(memory, linked, "VHGUIrow2") >>> 0;
  let primary0 = value(memory, linked, "VHGUIdstp") >>> 0;
  let primary1 = value(memory, linked, "VHGUIrow2p") >>> 0;
  const rowGap = value(memory, linked, "VHGUIgap") >> 2;

  for (let row = 0; row < 200; row += 1) {
    for (let column = 0; column < 320; column += 1) {
      const pixel = memory[source++];
      const offset = column << 1;
      memory[backdrop0 + offset] = pixel;
      memory[backdrop0 + offset + 1] = pixel;
      memory[backdrop1 + offset] = pixel;
      memory[backdrop1 + offset + 1] = pixel;
      memory[primary0 + offset] = pixel;
      memory[primary0 + offset + 1] = pixel;
      memory[primary1 + offset] = pixel;
      memory[primary1 + offset + 1] = pixel;
    }
    backdrop0 = (backdrop0 + 640 + rowGap) >>> 0;
    backdrop1 = (backdrop1 + 640 + rowGap) >>> 0;
    primary0 = (primary0 + 640 + rowGap) >>> 0;
    primary1 = (primary1 + 640 + rowGap) >>> 0;
  }
}

function scaleNearest(machine, linked) {
  const memory = machine.memory;
  const width = value(memory, linked, "VHGUIdw") | 0;
  const height = value(memory, linked, "VHGUIdh") | 0;
  const source = value(memory, linked, "VHGUIsrc") >>> 0;
  let destination = value(memory, linked, "VHGUIdst") >>> 0;
  const rowGap = value(memory, linked, "VHGUIgap") >> 2;
  const syAddress = address(linked, "VHGUIsy");
  const yaccAddress = address(linked, "VHGUIyacc");
  const yAddress = address(linked, "VHGUIy");
  let sourceY = memory[syAddress] | 0;
  let yAccumulator = memory[yaccAddress] | 0;
  let y = memory[yAddress] | 0;

  while (y < height) {
    let sourcePixel = (source + Math.imul(sourceY, 320)) >>> 0;
    let xAccumulator = 0;
    for (let x = 0; x < width; x += 1) {
      memory[destination++] = memory[sourcePixel];
      xAccumulator = (xAccumulator + 320) | 0;
      while (xAccumulator >= width) {
        xAccumulator = (xAccumulator - width) | 0;
        sourcePixel = (sourcePixel + 1) >>> 0;
      }
    }
    destination = (destination + rowGap) >>> 0;
    yAccumulator = (yAccumulator + 200) | 0;
    if (yAccumulator >= height) {
      yAccumulator = (yAccumulator - height) | 0;
      sourceY = (sourceY + 1) | 0;
    }
    memory[yaccAddress] = yAccumulator;
    y = (y + 1) | 0;
    memory[yAddress] = y;
  }
  memory[syAddress] = sourceY;
}

function pageStore(machine, linked) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  const offset = value(memory, linked, "PGdi") & 0xffff;
  memory[page + offset] = value(memory, linked, "PGval") & 0xff;
}

function pageLoad(machine, linked) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  const offset = value(memory, linked, "PGdi") & 0xffff;
  memory[address(linked, "PGval")] = memory[page + offset] & 0xff;
}

function multiplyUnsigned(machine) {
  const product = BigInt(machine.A >>> 0) * BigInt(machine.B >>> 0);
  machine.A = Number(product & 0xffffffffn) | 0;
  machine.D = Number((product >> 32n) & 0xffffffffn) | 0;
}

function multiplySigned(machine) {
  const product = BigInt.asUintN(64, BigInt(machine.A | 0) * BigInt(machine.B | 0));
  machine.A = Number(product & 0xffffffffn) | 0;
  machine.D = Number((product >> 32n) & 0xffffffffn) | 0;
}

function maskStarPage(machine, linked) {
  const memory = machine.memory;
  const base = value(memory, linked, "VHTmaskbase") >>> 0;
  for (let index = 0; index < 58240; index += 1) {
    memory[base + index] = (memory[base + index] & 0x3f) + 0x40;
  }
}

function cycleStarTexture(machine, linked) {
  const memory = machine.memory;
  const base = value(memory, linked, "VHTcyclebase") >>> 0;
  for (let index = 0; index < 64800; index += 1) {
    const pixel = memory[base + index] & 0xff;
    memory[base + index] = (pixel & 0xc0) | ((pixel + 1) & 0x3f);
  }
}

function smoothStarPage(machine, linked) {
  const memory = machine.memory;
  const base = value(memory, linked, "VHTsmoothbase") >>> 0;
  let accumulator = 0;
  for (let index = 0; index < 56960; index += 1) {
    const destination = base + 320 + index;
    for (let column = 0; column < 4; column += 1) {
      const pointer = destination + column;
      const sum = (memory[pointer - 320] & 0xff)
        + (memory[pointer] & 0xff)
        + (memory[pointer + 320] & 0xff)
        + (memory[pointer + 640] & 0xff);
      accumulator = (accumulator + ((sum & 0xfc) >>> 2)) & 0xff;
    }
    accumulator >>>= 2;
    memory[destination] = accumulator;
  }
}

function copyPlanetView(machine, linked) {
  const memory = machine.memory;
  const source = value(memory, linked, "SPcpfrom") >>> 0;
  const destination = value(memory, linked, "SPcpto") >>> 0;
  const count = value(memory, linked, "PVj") >>> 0;
  for (let index = 0; index < count; index += 1) {
    memory[destination + index] = memory[source + index];
  }
}

function scanPage(machine, linked, repeatEqual) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  let count = value(memory, linked, "SCcx") >>> 0;
  let offset = value(memory, linked, "SCdi") & 0xffff;
  const expected = value(memory, linked, "SCal") | 0;
  let sample = 0;
  let equal = false;
  do {
    sample = memory[page + offset] & 0xff;
    count = (count - 1) >>> 0;
    offset = (offset + 1) & 0xffff;
    equal = sample === expected;
  } while (count !== 0 && equal === repeatEqual);
  memory[address(linked, "PGdi")] = (offset - 1) & 0xffff;
  memory[address(linked, "PGval")] = sample;
  memory[address(linked, "SCzf")] = equal ? 1 : 0;
  memory[address(linked, "SCdi")] = offset;
  memory[address(linked, "SCcx")] = count | 0;
}

function scanNotEqual(machine, linked) {
  scanPage(machine, linked, false);
}

function scanEqual(machine, linked) {
  scanPage(machine, linked, true);
}

function fillBytes(machine, linked) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  let offset = value(memory, linked, "SCdi") & 0xffff;
  const count = value(memory, linked, "SCcx") >>> 0;
  const byte = value(memory, linked, "DBal") & 0xff;
  const census = address(linked, "CSbyte");
  memory[census] = (memory[census] + count) | 0;
  for (let index = 0; index < count; index += 1) {
    memory[page + offset] = byte;
    offset = (offset + 1) & 0xffff;
  }
  memory[address(linked, "SCdi")] = offset;
  memory[address(linked, "SCcx")] = 0;
  memory[address(linked, "PGdi")] = (offset - 1) & 0xffff;
  memory[address(linked, "PGval")] = byte;
}

function traceVertical(machine, linked) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  let offset = value(memory, linked, "SGpi") & 0xffff;
  const limit = value(memory, linked, "SGpf") >>> 0;
  do {
    memory[page + offset] = 0xff;
    offset = (offset + 320) & 0xffff;
  } while ((offset >>> 0) < limit);
  memory[address(linked, "SGpi")] = offset;
  memory[address(linked, "PGdi")] = (offset - 320) & 0xffff;
  memory[address(linked, "PGval")] = 0xff;
}

function traceSegment(machine, linked) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  let globalX = value(memory, linked, "SGgx") | 0;
  let globalY = value(memory, linked, "SGgy") | 0;
  const xStep = value(memory, linked, "SGa") | 0;
  const yStep = value(memory, linked, "SGb") | 0;
  const limit = value(memory, linked, "SGt") >>> 0;
  let offset = 0;
  do {
    const row = Math.imul(globalY >> 16, 320) & 0xffff;
    const column = (globalX >> 16) & 0xffff;
    offset = (row + column + 4) & 0xffff;
    memory[page + offset] = 0xff;
    globalX = (globalX + xStep) | 0;
    globalY = (globalY + yStep) | 0;
  } while ((globalX >>> 0) < limit);
  memory[address(linked, "SGgx")] = globalX;
  memory[address(linked, "SGgy")] = globalY;
  memory[address(linked, "PGdi")] = offset;
  memory[address(linked, "PGval")] = 0xff;
}

function finishRasterFill(memory, linked, offset, byte) {
  memory[address(linked, "DBdi")] = offset;
  memory[address(linked, "DBcx")] = 0;
  memory[address(linked, "PGdi")] = (offset - 1) & 0xffff;
  memory[address(linked, "PGval")] = byte;
}

function addRasterCensus(memory, linked, count) {
  const census = address(linked, "CSbyte");
  memory[census] = (memory[census] + count) | 0;
}

function fillFlare(machine, linked) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  let offset = value(memory, linked, "DBdi") & 0xffff;
  const count = value(memory, linked, "DBcx") >>> 0;
  const delta = value(memory, linked, "DBdl") & 0xff;
  addRasterCensus(memory, linked, count);
  let byte = 0;
  for (let index = 0; index < count; index += 1) {
    byte = (((memory[page + ((offset - 1) & 0xffff)] & 0x3f) + delta) & 0xff);
    if (byte >= 62) byte = 62;
    memory[page + offset] = byte;
    offset = (offset + 1) & 0xffff;
  }
  finishRasterFill(memory, linked, offset, byte);
}

function fillHalo(machine, linked) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  let offset = value(memory, linked, "DBdi") & 0xffff;
  let count = value(memory, linked, "DBcx") >>> 0;
  addRasterCensus(memory, linked, count);
  let byte = 0;
  while (count !== 0) {
    byte = memory[page + offset] & 0xff;
    if (byte === 0xff) {
      byte = (memory[page + ((offset - 321) & 0xffff)] & 0x3f) | 0x40;
    } else {
      byte = ((((byte & 0x3f) | 0x40) + count) & 0xff);
      if (byte >= 0x80) byte = 0x7f;
    }
    memory[page + offset] = byte;
    offset = (offset + 1) & 0xffff;
    count = (count - 1) >>> 0;
  }
  finishRasterFill(memory, linked, offset, byte);
}

function fillHaloFallback(machine, linked) {
  const memory = machine.memory;
  const page = noctisBuffer(linked, "SADPT");
  let offset = value(memory, linked, "DBdi") & 0xffff;
  let count = value(memory, linked, "DBcx") >>> 0;
  addRasterCensus(memory, linked, count);
  let byte = 0;
  while (count !== 0) {
    byte = memory[page + ((offset - 321) & 0xffff)] & 0xff;
    if (byte === 0xff) byte = (memory[page + ((offset - 642) & 0xffff)] & 0x3f) | 0x40;
    memory[page + offset] = byte;
    offset = (offset + 1) & 0xffff;
    count = (count - 1) >>> 0;
  }
  finishRasterFill(memory, linked, offset, byte);
}

function initializePolygonRows(machine, linked) {
  const memory = machine.memory;
  let row = value(memory, linked, "EWminy") | 0;
  const maximum = value(memory, linked, "EWmaxy") | 0;
  const fractions = value(memory, linked, "PGfpartbase") >>> 0;
  const integers = value(memory, linked, "PGipartbase") >>> 0;
  do {
    memory[fractions + row] = 5;
    memory[integers + row] = 311;
    row = (row + 1) | 0;
  } while (row <= maximum);
  memory[address(linked, "PGi")] = row;
}

function texturePixel(memory, texture, textureOffset, u, v) {
  const index = (((v & 0xff00) | ((u >>> 8) & 0xff)) + textureOffset) >>> 0;
  return memory[texture + index] & 0xff;
}

function terrainPixelBlock(machine, linked) {
  const memory = machine.memory;
  const texture = polygonBuffer(memory, linked, "RPBG");
  const page = polygonBuffer(memory, linked, "SADPT");
  const diAddress = address(linked, "SPdi");
  const uAddress = address(linked, "SPax");
  const vAddress = address(linked, "SPdx");
  const countAddress = address(linked, "SPcl");
  let offset = memory[diAddress] & 0xffff;
  let u = memory[uAddress] & 0xffff;
  let v = memory[vAddress] & 0xffff;
  let count = memory[countAddress] >>> 0;
  const du = value(memory, linked, "SPbp") | 0;
  const dv = value(memory, linked, "SPsi") | 0;
  const textureOffset = value(memory, linked, "PGtexoff") | 0;
  const tint = value(memory, linked, "SPtinta") | 0;
  while (count !== 0) {
    offset = (offset + 1) & 0xffff;
    const pixel = (texturePixel(memory, texture, textureOffset, u, v) + tint) & 0xff;
    u = (u + du) & 0xffff;
    memory[page + ((offset + 3) & 0xffff)] = pixel;
    v = (v + dv) & 0xffff;
    count = (count - 1) >>> 0;
  }
  memory[diAddress] = offset;
  memory[uAddress] = u;
  memory[vAddress] = v;
  memory[countAddress] = 0;
}

function terrainCullPixelBlock(machine, linked) {
  const memory = machine.memory;
  const texture = polygonBuffer(memory, linked, "RPBG");
  const page = polygonBuffer(memory, linked, "SADPT");
  const diAddress = address(linked, "SPdi");
  const uAddress = address(linked, "SPax");
  const vAddress = address(linked, "SPdx");
  const countAddress = address(linked, "SPcl");
  let offset = memory[diAddress] & 0xffff;
  let u = memory[uAddress] & 0xffff;
  let v = memory[vAddress] & 0xffff;
  let count = memory[countAddress] >>> 0;
  const du = value(memory, linked, "SPbp") | 0;
  const dv = value(memory, linked, "SPsi") | 0;
  const textureOffset = value(memory, linked, "PGtexoff") | 0;
  const tint = value(memory, linked, "SPtinta") | 0;
  while (count !== 0) {
    offset = (offset + 2) & 0xffff;
    const pixel = (texturePixel(memory, texture, textureOffset, u, v) + tint) & 0xff;
    u = (u + du) & 0xffff;
    memory[page + ((offset + 2) & 0xffff)] = pixel;
    memory[page + ((offset + 3) & 0xffff)] = pixel;
    v = (v + dv) & 0xffff;
    count = (count - 1) >>> 0;
  }
  memory[diAddress] = offset;
  memory[uAddress] = u;
  memory[vAddress] = v;
  memory[countAddress] = 0;
}

function transparentPixel(machine, linked) {
  const memory = machine.memory;
  const texture = polygonBuffer(memory, linked, "RPBG");
  const page = polygonBuffer(memory, linked, "SADPT");
  const diAddress = address(linked, "SPdi");
  const uAddress = address(linked, "SPax");
  const vAddress = address(linked, "SPdx");
  const offset = ((memory[diAddress] & 0xffff) + 1) & 0xffff;
  let u = memory[uAddress] & 0xffff;
  let v = memory[vAddress] & 0xffff;
  const destination = (offset + 3) & 0xffff;
  const pixel = ((memory[page + destination] & 0xff)
    + texturePixel(memory, texture, value(memory, linked, "PGtexoff") | 0, u, v)) & 0xff;
  u = (u + value(memory, linked, "SPbp")) & 0xffff;
  v = (v + value(memory, linked, "SPsi")) & 0xffff;
  memory[page + destination] = pixel;
  memory[diAddress] = offset;
  memory[uAddress] = u;
  memory[vAddress] = v;
}

function transparentCullPixel(machine, linked) {
  const memory = machine.memory;
  const texture = polygonBuffer(memory, linked, "RPBG");
  const page = polygonBuffer(memory, linked, "SADPT");
  const diAddress = address(linked, "SPdi");
  const uAddress = address(linked, "SPax");
  const vAddress = address(linked, "SPdx");
  const offset = ((memory[diAddress] & 0xffff) + 2) & 0xffff;
  let u = memory[uAddress] & 0xffff;
  let v = memory[vAddress] & 0xffff;
  const right = (offset + 3) & 0xffff;
  const pixel = ((memory[page + right] & 0xff)
    + texturePixel(memory, texture, value(memory, linked, "PGtexoff") | 0, u, v)) & 0xff;
  u = (u + value(memory, linked, "SPbp")) & 0xffff;
  v = (v + value(memory, linked, "SPsi")) & 0xffff;
  memory[page + ((offset + 2) & 0xffff)] = pixel;
  memory[page + right] = pixel;
  memory[diAddress] = offset;
  memory[uAddress] = u;
  memory[vAddress] = v;
}

function duplicateHalfScan(machine, linked) {
  const memory = machine.memory;
  const page = polygonBuffer(memory, linked, "SADPT");
  const diAddress = address(linked, "SPdi");
  const countAddress = address(linked, "SPn");
  let offset = memory[diAddress] & 0xffff;
  let count = memory[countAddress] >>> 0;
  while (count !== 0) {
    const pixel = memory[page + ((offset - 316) & 0xffff)] & 0xff;
    memory[page + ((offset + 4) & 0xffff)] = pixel;
    memory[page + ((offset + 324) & 0xffff)] = pixel;
    offset = (offset + 1) & 0xffff;
    count = (count - 1) >>> 0;
  }
  memory[diAddress] = offset;
  memory[countAddress] = 0;
}

function resetFloatingPoint(machine, linked) {
  machine.fpu = {
    control: value(machine.memory, linked, "FCW") & 0xffff,
    status: 0,
    stack: [],
  };
}

function invertGroundSky(machine, linked) {
  const memory = machine.memory;
  const source = value(memory, linked, "VHGNDbgsourcenative") >>> 0;
  for (let index = 40000; index !== 0; index -= 1) {
    memory[source + index] = (63 - memory[source + index]) | 0;
  }
}

function clearGroundPage(machine, linked) {
  const memory = machine.memory;
  const page = value(memory, linked, "VHGNDpageclearptr") >>> 0;
  memory.fill(0, page, page + 64000);
}

function copyGroundBackground(machine, linked) {
  const memory = machine.memory;
  const source = value(memory, linked, "VHGNDbgcachefrom") >>> 0;
  const destination = value(memory, linked, "VHGNDbgcacheto") >>> 0;
  const count = value(memory, linked, "VHGNDbgcachecount") >>> 0;
  for (let index = 0; index < count; index += 1) {
    memory[destination + index] = memory[source + index];
  }
}

function drawGroundBackground(machine, linked) {
  const memory = machine.memory;
  let offsets = value(memory, linked, "VHGNDbgoffnative") >>> 0;
  const source = value(memory, linked, "VHGNDbgsourcenative") >>> 0;
  const destination = value(memory, linked, "VHGNDbgdestinationnative") >>> 0;
  let sourceCursor = value(memory, linked, "BGbp") & 0xffff;
  let records = value(memory, linked, "BGcxr") >>> 0;
  const shift = value(memory, linked, "BGdx") | 0;
  const widthAddress = address(linked, "BGw");
  const destinationAddress = address(linked, "BGdi");
  const pixelAddress = address(linked, "BGpx");
  const rowAddress = address(linked, "BGi");
  const rowBaseAddress = address(linked, "VHGNDbgrowbase");

  while (records !== 0) {
    const width = (memory[offsets] & 0xff) | ((memory[offsets + 1] & 0xff) << 8);
    memory[widthAddress] = width;
    if (width < 64000) {
      let output = (width + shift) & 0xffff;
      memory[destinationAddress] = output;
      const pixel = memory[source + sourceCursor] & 0xff;
      memory[pixelAddress] = pixel;
      for (let row = 0; row < 5; row += 1) {
        output = (Math.imul(row, 320) + (width + shift)) & 0xffff;
        memory[rowAddress] = row;
        memory[rowBaseAddress] = output;
        for (let column = 0; column < 5; column += 1) {
          memory[destination + output] = pixel;
          output = (output + 1) & 0xffff;
        }
      }
      memory[rowAddress] = 5;
      sourceCursor = (sourceCursor + 1) & 0xffff;
    } else {
      sourceCursor = (sourceCursor + width - 64000) & 0xffff;
    }
    offsets += 2;
    records = (records - 1) >>> 0;
  }
  memory[address(linked, "BGbp")] = sourceCursor;
  memory[address(linked, "BGcxr")] = 0;
}

function groundCachedBounds(machine, linked) {
  const memory = machine.memory;
  const points = value(memory, linked, "VHGNDmpbase") >>> 0;
  const minX = address(linked, "PJminx");
  const maxX = address(linked, "PJmaxx");
  const minY = address(linked, "BXminy");
  const maxY = address(linked, "BXmaxy");
  memory[minX] = 311;
  memory[maxX] = 5;
  memory[minY] = 190;
  memory[maxY] = 10;
  for (let vertex = 0; vertex < 4; vertex += 1) {
    const x = memory[points + vertex * 2] | 0;
    const y = memory[points + vertex * 2 + 1] | 0;
    if (x < memory[minX]) memory[minX] = x;
    if (x > memory[maxX]) memory[maxX] = x;
    if (y < memory[minY]) memory[minY] = y;
    if (y > memory[maxY]) memory[maxY] = y;
  }
}

function groundRandomSquare(machine) {
  const product = BigInt(machine.A >>> 0) * BigInt(machine.A >>> 0);
  machine.A = Number(product & 0xffffffffn) | 0;
  machine.D = Number((product >> 32n) & 0xffffffffn) | 0;
}

function groundTileShade(machine, linked) {
  const memory = machine.memory;
  let seed = ((value(memory, linked, "VHGNDh1") + value(memory, linked, "VHGNDseed")) | 3) | 0;
  memory[address(linked, "SUfseed")] = seed;
  const product = BigInt(seed >>> 0) * BigInt(seed >>> 0);
  const low = Number(product & 0xffffffffn) | 0;
  const high = Number((product >> 32n) & 0xffffffffn) | 0;
  const folded = (low & 0xffffff00) | (((low & 0xff) + (high & 0xff)) & 0xff);
  memory[address(linked, "SUfeax")] = folded;
  seed = (seed + folded) | 0;
  memory[address(linked, "SUfseed")] = seed;
  memory[address(linked, "SUfmask")] = 7;
  const result = folded & 7;
  memory[address(linked, "SUfval")] = result;
  machine.A = result;
  machine.B = seed;
  machine.C = result;
  machine.D = high;
}

function loadProjectedVertices(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const vertices = value(memory, linked, "PJnrv") | 0;
  for (let unit = 0; unit < vertices * 2; unit += 1) {
    memory[floats + 96 + unit] = memory[floats + 64 + unit];
    memory[floats + 112 + unit] = memory[floats + 72 + unit];
    memory[floats + 128 + unit] = memory[floats + 80 + unit];
  }
  memory[address(linked, "PJvr")] = vertices;
  memory[address(linked, "PJvr2")] = vertices;
  memory[address(linked, "PJvr22")] = vertices * 2;
}

function duplicateMappedInput(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  for (const source of [508, 516, 524]) {
    memory[floats + source + 2] = memory[floats + source];
    memory[floats + source + 3] = memory[floats + source + 1];
  }
}

function duplicateMappedRotation(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  for (const source of [68, 76, 84]) {
    memory[floats + source + 2] = memory[floats + source];
    memory[floats + source + 3] = memory[floats + source + 1];
  }
  const visibility = value(memory, linked, "PJrwfbase") >>> 0;
  const flag = memory[visibility + 2] | 0;
  memory[visibility + 3] = flag;
  const doFlag = address(linked, "PJdoflag");
  memory[doFlag] = (memory[doFlag] + flag) | 0;
}

function enterFloatingPoint(machine, linked) {
  const fpu = floatingPoint(machine);
  machine.memory[address(linked, "FCWSAV")] = (fpu.control | 0x40) & 0xffff;
  fpu.control = value(machine.memory, linked, "FCW") & 0xffff;
}

function leaveFloatingPoint(machine, linked) {
  floatingPoint(machine).control = value(machine.memory, linked, "FCWSAV") & 0xffff;
}

function loadFloatingPointControl(machine, linked) {
  floatingPoint(machine).control = value(machine.memory, linked, "FCW") & 0xffff;
}

function readFloatingPointControl(machine, linked) {
  const fpu = floatingPoint(machine);
  machine.memory[address(linked, "FCWTMP")] = (fpu.control | 0x40) & 0xffff;
}

function readFloatingPointStatus(machine, linked) {
  const fpu = floatingPoint(machine);
  machine.memory[address(linked, "FSW")] = fpu.status & 0xffff;
}

function saveChopControl(machine, linked) {
  const control = floatingPoint(machine).control;
  machine.memory[address(linked, "FCWCSAV")] = (control | 0x40) & 0xffff;
}

function convertFloatToIntChop(machine, linked) {
  const memory = machine.memory;
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "FCWCHOP") & 0xffff;
  memory[address(linked, "FI")] = convertToInt32(readFloat64(memory, address(linked, "FA0")), fpu.control);
  fpu.control = value(memory, linked, "FCWCSAV") & 0xffff;
}

function convertFloatToIntNear(machine, linked) {
  const memory = machine.memory;
  memory[address(linked, "FI")] = convertToInt32(
    readFloat64(memory, address(linked, "FA0")),
    floatingPoint(machine).control,
  );
}

function convertIntToFloat(machine, linked) {
  const memory = machine.memory;
  writeFloat64(memory, address(linked, "FA0"), value(memory, linked, "FI"));
}

function narrowFloat32(machine, linked) {
  const memory = machine.memory;
  const narrowed = roundFloat32(
    readFloat64(memory, address(linked, "FA0")),
    floatingPoint(machine).control,
  );
  memory[address(linked, "FS0")] = float32Bits(narrowed);
  writeFloat64(memory, address(linked, "FA0"), narrowed);
}

function storeFloat32(machine, linked) {
  const memory = machine.memory;
  const narrowed = roundFloat32(
    readFloat64(memory, address(linked, "FA0")),
    floatingPoint(machine).control,
  );
  memory[address(linked, "FS0")] = float32Bits(narrowed);
}

function loadFloat32(machine, linked) {
  const memory = machine.memory;
  writeFloat64(memory, address(linked, "FA0"), float32FromBits(value(memory, linked, "FS0")));
}

function binaryFloat64(machine, linked, operation) {
  const memory = machine.memory;
  const a = readFloat64(memory, address(linked, "FA0"));
  const b = readFloat64(memory, address(linked, "FB0"));
  writeFloat64(memory, address(linked, "FA0"), operation(a, b));
}

function addFloat64(machine, linked) {
  binaryFloat64(machine, linked, (a, b) => a + b);
}

function subtractFloat64(machine, linked) {
  binaryFloat64(machine, linked, (a, b) => a - b);
}

function multiplyFloat64(machine, linked) {
  binaryFloat64(machine, linked, (a, b) => a * b);
}

function divideFloat64(machine, linked) {
  binaryFloat64(machine, linked, (a, b) => a / b);
}

function squareRootFloat64(machine, linked) {
  const memory = machine.memory;
  const fa = address(linked, "FA0");
  writeFloat64(memory, fa, Math.sqrt(readFloat64(memory, fa)));
}

function negateFloat64(machine, linked) {
  const high = address(linked, "FA0") + 1;
  machine.memory[high] ^= 0x80000000;
}

function absoluteFloat64(machine, linked) {
  const high = address(linked, "FA0") + 1;
  machine.memory[high] &= 0x7fffffff;
}

function sineFloat64(machine, linked) {
  const memory = machine.memory;
  const fa = address(linked, "FA0");
  writeFloat64(memory, fa, Math.sin(readFloat64(memory, fa)));
}

function cosineFloat64(machine, linked) {
  const memory = machine.memory;
  const fa = address(linked, "FA0");
  writeFloat64(memory, fa, Math.cos(readFloat64(memory, fa)));
}

function atan2Float64(machine, linked) {
  const memory = machine.memory;
  const fa = address(linked, "FA0");
  writeFloat64(memory, fa, Math.atan2(
    readFloat64(memory, fa),
    readFloat64(memory, address(linked, "FB0")),
  ));
}

function compareFloat64(machine, linked) {
  const memory = machine.memory;
  const a = readFloat64(memory, address(linked, "FA0"));
  const b = readFloat64(memory, address(linked, "FB0"));
  const status = Number.isNaN(a) || Number.isNaN(b) ? 0x4500
    : a < b ? 0x0100
      : a === b ? 0x4000
        : 0;
  memory[address(linked, "FSW")] = status;
  floatingPoint(machine).status = status;
}

function nearStarIdentityValue(machine, linked, order, spillOperations = [], spillName = null) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const inputs = order.map((name) => value(memory, linked, name));
  const constant = extendedFromInteger(100000);
  let accumulator = extendedDivide(extendedFromInteger(inputs[0]), constant, control);
  if (spillOperations.includes(1)) accumulator = spillExtended(memory, linked, spillName, accumulator, control);
  accumulator = extendedMultiply(accumulator, extendedFromInteger(inputs[1]), control);
  if (spillOperations.includes(2)) accumulator = spillExtended(memory, linked, spillName, accumulator, control);
  accumulator = extendedDivide(accumulator, constant, control);
  if (spillOperations.includes(3)) accumulator = spillExtended(memory, linked, spillName, accumulator, control);
  accumulator = extendedMultiply(accumulator, extendedFromInteger(inputs[2]), control);
  if (spillOperations.includes(4)) accumulator = spillExtended(memory, linked, spillName, accumulator, control);
  accumulator = extendedDivide(accumulator, constant, control);
  if (spillOperations.includes(5)) accumulator = spillExtended(memory, linked, spillName, accumulator, control);
  return accumulator;
}

function runNearStarIdentity(machine, linked, order, spillOperations = [], spillName = null) {
  const result = nearStarIdentityValue(machine, linked, order, spillOperations, spillName);
  writeFloat64(
    machine.memory,
    address(linked, "FA0"),
    extendedToNumber(result, floatingPoint(machine).control),
  );
}

function nearStarIdentity(machine, linked) {
  runNearStarIdentity(machine, linked, ["FJ0", "FJ1", "FJ2"]);
}

function nearStarIdentityPermuted(machine, linked) {
  runNearStarIdentity(machine, linked, ["FJ2", "FJ1", "FJ0"]);
}

function nearStarIdentitySpill1(machine, linked) {
  runNearStarIdentity(machine, linked, ["FJ0", "FJ1", "FJ2"], [1], "FKNsIdentitySpill1t0");
}

function nearStarIdentitySpill2(machine, linked) {
  runNearStarIdentity(machine, linked, ["FJ0", "FJ1", "FJ2"], [2], "FKNsIdentitySpill2t0");
}

function nearStarIdentitySpill3(machine, linked) {
  runNearStarIdentity(machine, linked, ["FJ0", "FJ1", "FJ2"], [3], "FKNsIdentitySpill3t0");
}

function nearStarIdentitySpill4(machine, linked) {
  runNearStarIdentity(machine, linked, ["FJ0", "FJ1", "FJ2"], [4], "FKNsIdentitySpill4t0");
}

function nearStarIdentitySpillAll(machine, linked) {
  runNearStarIdentity(machine, linked, ["FJ0", "FJ1", "FJ2"], [1, 2, 3, 4], "FKNsIdentitySpillAllt0");
}

function isThereIdentity(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const scale = extendedFromNumber(readFloat64(memory, address(linked, "FKIsThereIdentityK1EM50")));
  const x = extendedMultiply(extendedFromInteger(value(memory, linked, "FJ0")), scale, control);
  const y = extendedMultiply(extendedFromInteger(value(memory, linked, "FJ1")), scale, control);
  const z = extendedMultiply(extendedFromInteger(value(memory, linked, "FJ2")), scale, control);
  const yz = extendedMultiply(y, z, control);
  const result = extendedMultiply(x, yz, control);
  writeFloat64(memory, address(linked, "FA0"), extendedToNumber(result, control));
}

function product4(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = extendedFromNumber(readFloat64(memory, address(linked, "FA0")));
  for (const name of ["FB0", "FC0", "FD0"]) {
    result = extendedMultiply(result, extendedFromNumber(readFloat64(memory, address(linked, name))), control);
  }
  writeFloat64(memory, address(linked, "FA0"), extendedToNumber(result, control));
}

function product4Spilled(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = extendedMultiply(
    extendedFromNumber(readFloat64(memory, address(linked, "FA0"))),
    extendedFromNumber(readFloat64(memory, address(linked, "FB0"))),
    control,
  );
  result = spillExtended(memory, linked, "FKProd4Spilledt0", result, control);
  result = extendedMultiply(result, extendedFromNumber(readFloat64(memory, address(linked, "FC0"))), control);
  result = spillExtended(memory, linked, "FKProd4Spilledt0", result, control);
  result = extendedMultiply(result, extendedFromNumber(readFloat64(memory, address(linked, "FD0"))), control);
  writeFloat64(memory, address(linked, "FA0"), extendedToNumber(result, control));
}

function saveNearStarChopControl(machine, linked) {
  machine.memory[address(linked, "nsicsav")] = (floatingPoint(machine).control | 0x40) & 0xffff;
}

function nearStarIdentityChop16(machine, linked) {
  const memory = machine.memory;
  const fpu = floatingPoint(machine);
  const saved = fpu.control;
  const result = nearStarIdentityValue(machine, linked, ["FJ0", "FJ1", "FJ2"]);
  fpu.control = value(memory, linked, "nsicchop") & 0xffff;
  let integer = extendedToBigInt(result, fpu.control);
  if (integer < -(1n << 63n) || integer > (1n << 63n) - 1n) integer = -(1n << 63n);
  const bits = BigInt.asUintN(64, integer);
  memory[address(linked, "nsicq0")] = Number(bits & 0xffffffffn) | 0;
  memory[address(linked, "nsicq0") + 1] = Number((bits >> 32n) & 0xffffffffn) | 0;
  fpu.control = value(memory, linked, "nsicsav") & 0xffff;
  if (fpu.control === 0) fpu.control = saved;
}

function writeInt64(memory, unit, integer) {
  const bits = BigInt.asUintN(64, integer);
  memory[unit] = Number(bits & 0xffffffffn) | 0;
  memory[unit + 1] = Number((bits >> 32n) & 0xffffffffn) | 0;
}

function enterGeometryChop(machine, linked) {
  machine.memory[address(linked, "gcsav")] = (floatingPoint(machine).control | 0x40) & 0xffff;
}

function geometryConstant(memory, linked, name) {
  return extendedFromNumber(readFloat64(memory, address(linked, name)));
}

function geometryInput(memory, linked, name) {
  return extendedFromNumber(readFloat64(memory, address(linked, name)));
}

function geometrySpill(machine, linked, result) {
  const control = floatingPoint(machine).control;
  return spillExtended(machine.memory, linked, "gcT0", result, control);
}

function geometryChop(machine, linked, result) {
  const memory = machine.memory;
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "gcchop") & 0xffff;
  let integer = extendedToBigInt(result, fpu.control);
  if (integer < -(1n << 63n) || integer > (1n << 63n) - 1n) integer = -(1n << 63n);
  writeInt64(memory, address(linked, "gcQ0"), integer);
  fpu.control = value(memory, linked, "gcsav") & 0xffff;
}

function geometryKMulValue(machine, linked) {
  const memory = machine.memory;
  return extendedMultiply(
    geometryInput(memory, linked, "FB0"),
    geometryConstant(memory, linked, "gcK0"),
    floatingPoint(machine).control,
  );
}

function geometryKMulChop(machine, linked) {
  geometryChop(machine, linked, geometryKMulValue(machine, linked));
}

function geometryKMulChopSpilled(machine, linked) {
  geometryChop(machine, linked, geometrySpill(machine, linked, geometryKMulValue(machine, linked)));
}

function geometryTwoMulKChop(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = extendedMultiply(geometryInput(memory, linked, "FB0"), geometryInput(memory, linked, "FC0"), control);
  result = extendedMultiply(result, geometryConstant(memory, linked, "gcK0"), control);
  geometryChop(machine, linked, result);
}

function geometrySeedTiltValue(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const tilt = geometryInput(memory, linked, "FC0");
  tilt.integer = tilt.integer < 0n ? -tilt.integer : tilt.integer;
  const scaled = extendedMultiply(tilt, geometryConstant(memory, linked, "gcTen0"), control);
  return extendedAdd(geometryInput(memory, linked, "FB0"), scaled, control);
}

function geometrySeedTiltChop(machine, linked) {
  geometryChop(machine, linked, geometrySeedTiltValue(machine, linked));
}

function geometrySeedTiltChopSpilled(machine, linked) {
  geometryChop(machine, linked, geometrySpill(machine, linked, geometrySeedTiltValue(machine, linked)));
}

function geometryPlainChop(machine, linked) {
  geometryChop(machine, linked, geometryInput(machine.memory, linked, "FB0"));
}

function geometryPlainChop32(machine, linked) {
  const memory = machine.memory;
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "gcchop") & 0xffff;
  memory[address(linked, "FI")] = convertToInt32(readFloat64(memory, address(linked, "FB0")), fpu.control);
  fpu.control = value(memory, linked, "gcsav") & 0xffff;
}

function geometryQuoMulValue(machine, linked, spillQuotient = false, spillProduct = false) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const divisor = geometryInput(memory, linked, "FC0");
  let result = extendedDivide(geometryInput(memory, linked, "FB0"), divisor, control);
  if (spillQuotient) result = geometrySpill(machine, linked, result);
  result = extendedMultiply(result, divisor, control);
  if (spillProduct) result = geometrySpill(machine, linked, result);
  return result;
}

function geometryQuoMulChop(machine, linked) {
  geometryChop(machine, linked, geometryQuoMulValue(machine, linked));
}

function geometryQuoMulChopSpill1(machine, linked) {
  geometryChop(machine, linked, geometryQuoMulValue(machine, linked, true, false));
}

function geometryQuoMulChopSpill2(machine, linked) {
  geometryChop(machine, linked, geometryQuoMulValue(machine, linked, false, true));
}

function storeExtendedResult(machine, linked, result) {
  writeFloat64(
    machine.memory,
    address(linked, "FA0"),
    extendedToNumber(result, floatingPoint(machine).control),
  );
}

function geometrySeedStore100(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const product = extendedMultiply(geometryInput(memory, linked, "FC0"), geometryInput(memory, linked, "FB0"), control);
  const ratio = extendedDivide(extendedFromInteger(value(memory, linked, "FI")), geometryConstant(memory, linked, "gcHun0"), control);
  storeExtendedResult(machine, linked, extendedAdd(product, ratio, control));
}

function geometryRatioStore(machine, linked, divisorName) {
  storeExtendedResult(machine, linked, extendedDivide(
    extendedFromInteger(value(machine.memory, linked, "FI")),
    geometryConstant(machine.memory, linked, divisorName),
    floatingPoint(machine).control,
  ));
}

function geometryRatioStore50(machine, linked) { geometryRatioStore(machine, linked, "gcFif0"); }
function geometryRatioStore500(machine, linked) { geometryRatioStore(machine, linked, "gcFiv0"); }
function geometryRatioStore5000(machine, linked) { geometryRatioStore(machine, linked, "gcFvt0"); }

function geometryEccentricityStore(machine, linked) {
  const ratio = extendedDivide(
    extendedFromInteger(value(machine.memory, linked, "FI")),
    geometryConstant(machine.memory, linked, "gcTwo0"),
    floatingPoint(machine).control,
  );
  storeExtendedResult(machine, linked, extendedSubtract(extendedFromInteger(1), ratio, floatingPoint(machine).control));
}

function geometryLinearStore(machine, linked, multiplierName, addendName) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const scaled = extendedMultiply(
    extendedFromInteger(value(memory, linked, "FI")),
    geometryConstant(memory, linked, multiplierName),
    control,
  );
  storeExtendedResult(machine, linked, extendedAdd(scaled, geometryConstant(memory, linked, addendName), control));
}

function geometryPlanetRayStore(machine, linked) { geometryLinearStore(machine, linked, "gcMil0", "gcCen0"); }
function geometryMoonRayStore(machine, linked) { geometryLinearStore(machine, linked, "gcFivp0", "gcTent0"); }

function geometrySurfaceSeedChop(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = extendedAdd(geometryInput(memory, linked, "FB0"), geometryInput(memory, linked, "FC0"), control);
  result = extendedAdd(result, geometryInput(memory, linked, "FA0"), control);
  result = extendedMultiply(result, geometryConstant(memory, linked, "gc41120"), control);
  geometryChop(machine, linked, result);
}

function geometryAdd4112Chop(machine, linked) {
  geometryChop(machine, linked, extendedAdd(
    geometryInput(machine.memory, linked, "FB0"),
    geometryConstant(machine.memory, linked, "gc41120"),
    floatingPoint(machine).control,
  ));
}

function scalarBinaryNumber(left, right, control, operation) {
  const a = extendedFromNumber(left);
  const b = extendedFromNumber(right);
  const result = operation === "multiply" ? extendedMultiply(a, b, control)
    : operation === "divide" ? extendedDivide(a, b, control)
      : operation === "subtract" ? extendedSubtract(a, b, control)
        : extendedAdd(a, b, control);
  return extendedToNumber(result, control);
}

function writeScalarScratch(machine, linked, number) {
  writeFloat64(machine.memory, address(linked, "FA0"), number);
}

function narrowScalar(machine, linked, number) {
  const narrowed = roundFloat32(number, floatingPoint(machine).control);
  machine.memory[address(linked, "FS0")] = float32Bits(narrowed);
  return narrowed;
}

function spaceRelativeCoordinates(machine, linked) {
  const memory = machine.memory;
  const star = value(memory, linked, "VHSstarptr") >>> 0;
  const floats = value(memory, linked, "VHSfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const axes = [
    [0, "VHSdx0", 504],
    [1, "VHSdy0", 512],
    [2, "VHSdz0", 520],
  ];
  for (const [sourceOffset, cameraName, destinationOffset] of axes) {
    const integer = memory[star + sourceOffset] | 0;
    writeScalarScratch(machine, linked, integer);
    const difference = scalarBinaryNumber(
      integer,
      readFloat64(memory, address(linked, cameraName)),
      control,
      "subtract",
    );
    writeScalarScratch(machine, linked, difference);
    const narrowed = narrowScalar(machine, linked, difference);
    writeFloat64(memory, floats + destinationOffset, narrowed);
  }
}

function spaceRotateDepth(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "VHSfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const x = readFloat64(memory, floats + 504);
  const y = readFloat64(memory, floats + 512);
  const z = readFloat64(memory, floats + 520);
  const cosBeta = readFloat64(memory, floats + 428);
  const sinBeta = readFloat64(memory, floats + 430);
  const cosAlpha = readFloat64(memory, floats + 436);
  const sinAlpha = readFloat64(memory, floats + 438);

  let first = scalarBinaryNumber(z, sinBeta, control, "multiply");
  writeFloat64(memory, floats + 496, first);
  let second = scalarBinaryNumber(x, cosBeta, control, "multiply");
  let result = scalarBinaryNumber(second, first, control, "add");
  writeScalarScratch(machine, linked, result);
  writeFloat64(memory, floats + 64, narrowScalar(machine, linked, result));

  first = scalarBinaryNumber(z, cosBeta, control, "multiply");
  writeFloat64(memory, floats + 496, first);
  second = scalarBinaryNumber(x, sinBeta, control, "multiply");
  result = scalarBinaryNumber(first, second, control, "subtract");
  writeScalarScratch(machine, linked, result);
  const z2 = narrowScalar(machine, linked, result);
  writeFloat64(memory, floats + 482, z2);

  first = scalarBinaryNumber(z2, cosAlpha, control, "multiply");
  writeFloat64(memory, floats + 496, first);
  second = scalarBinaryNumber(y, sinAlpha, control, "multiply");
  result = scalarBinaryNumber(second, first, control, "add");
  writeScalarScratch(machine, linked, result);
  writeFloat64(memory, floats + 498, result);
  const rotatedZ = narrowScalar(machine, linked, result);
  writeFloat64(memory, floats + 80, rotatedZ);

  first = scalarBinaryNumber(y, cosAlpha, control, "multiply");
  writeFloat64(memory, floats + 496, first);
  second = scalarBinaryNumber(z2, sinAlpha, control, "multiply");
  result = scalarBinaryNumber(first, second, control, "subtract");
  writeScalarScratch(machine, linked, result);
  writeFloat64(memory, floats + 72, narrowScalar(machine, linked, result));
  memory[address(linked, "VHSdepth")] = convertToInt32(rotatedZ, control);
}

function spaceProject(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "VHSfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const factor = scalarBinaryNumber(
    readFloat64(memory, floats + 50),
    readFloat64(memory, floats + 80),
    control,
    "divide",
  );
  writeScalarScratch(machine, linked, factor);
  writeFloat64(memory, floats + 502, factor);
  let result = scalarBinaryNumber(factor, readFloat64(memory, floats + 64), control, "multiply");
  result = scalarBinaryNumber(result, readFloat64(memory, floats + 38), control, "add");
  writeScalarScratch(machine, linked, result);
  memory[address(linked, "GCx")] = convertToInt32(result, control);
  result = scalarBinaryNumber(factor, readFloat64(memory, floats + 72), control, "multiply");
  result = scalarBinaryNumber(result, readFloat64(memory, floats + 40), control, "add");
  writeScalarScratch(machine, linked, result);
  memory[address(linked, "GCy")] = convertToInt32(result, control);
}

export const NOCTIS_INTRINSIC_IDS = IDS;
export const NOCTIS_SERVICE_INTRINSIC_IDS = SERVICE_IDS;

export function createNoctisIntrinsics(overrides = {}) {
  return {
    [SERVICE_IDS.pgfA]: pgfLoadA,
    [SERVICE_IDS.pgfB]: pgfLoadB,
    [SERVICE_IDS.pgfStoreA]: pgfStoreA,
    [SERVICE_IDS.pgfMove]: pgfMove,
    [SERVICE_IDS.pgfLoadFloat32]: pgfLoadFloat32,
    [SERVICE_IDS.pgfLoadFloat64]: pgfLoadFloat64,
    [SERVICE_IDS.pgfStoreFloat32]: pgfStoreFloat32,
    [SERVICE_IDS.pgfSetFloat32]: pgfSetFloat32,
    [SERVICE_IDS.pgfNarrow]: pgfNarrow,
    [SERVICE_IDS.pgfAdd]: (machine, linked) => pgfBinary(machine, linked, addFloat64),
    [SERVICE_IDS.pgfSubtract]: (machine, linked) => pgfBinary(machine, linked, subtractFloat64),
    [SERVICE_IDS.pgfMultiply]: (machine, linked) => pgfBinary(machine, linked, multiplyFloat64),
    [SERVICE_IDS.pgfDivide]: (machine, linked) => pgfBinary(machine, linked, divideFloat64),
    [SERVICE_IDS.pgfReverseSubtract]: (machine, linked) => pgfReverseBinary(machine, linked, subtractFloat64),
    [SERVICE_IDS.pgfReverseDivide]: (machine, linked) => pgfReverseBinary(machine, linked, divideFloat64),
    [SERVICE_IDS.pgfInteger]: pgfInteger,
    [SERVICE_IDS.pgfFromInteger]: pgfFromInteger,
    [IDS.copyRegion]: copyRegion,
    [IDS.expandIndexed]: expandIndexed,
    [IDS.scale2x]: scale2x,
    [IDS.scaleNearest]: scaleNearest,
    [IDS.pageStore]: pageStore,
    [IDS.pageLoad]: pageLoad,
    [IDS.multiplyUnsigned]: multiplyUnsigned,
    [IDS.multiplySigned]: multiplySigned,
    [IDS.foldMultiplySigned]: multiplySigned,
    [IDS.maskStarPage]: maskStarPage,
    [IDS.cycleStarTexture]: cycleStarTexture,
    [IDS.smoothStarPage]: smoothStarPage,
    [IDS.copyPlanetView]: copyPlanetView,
    [IDS.scanNotEqual]: scanNotEqual,
    [IDS.scanEqual]: scanEqual,
    [IDS.fillBytes]: fillBytes,
    [IDS.traceVertical]: traceVertical,
    [IDS.traceSegment]: traceSegment,
    [IDS.fillFlare]: fillFlare,
    [IDS.fillHalo]: fillHalo,
    [IDS.fillHaloFallback]: fillHaloFallback,
    [IDS.initializePolygonRows]: initializePolygonRows,
    [IDS.terrainPixelBlock]: terrainPixelBlock,
    [IDS.terrainCullPixelBlock]: terrainCullPixelBlock,
    [IDS.transparentPixel]: transparentPixel,
    [IDS.transparentCullPixel]: transparentCullPixel,
    [IDS.duplicateHalfScan]: duplicateHalfScan,
    [IDS.resetFloatingPoint]: resetFloatingPoint,
    [IDS.invertGroundSky]: invertGroundSky,
    [IDS.clearGroundPage]: clearGroundPage,
    [IDS.copyGroundBackground]: copyGroundBackground,
    [IDS.drawGroundBackground]: drawGroundBackground,
    [IDS.groundCachedBounds]: groundCachedBounds,
    [IDS.groundRandomSquare]: groundRandomSquare,
    [IDS.groundTileShade]: groundTileShade,
    [IDS.loadProjectedVertices]: loadProjectedVertices,
    [IDS.duplicateMappedInput]: duplicateMappedInput,
    [IDS.duplicateMappedRotation]: duplicateMappedRotation,
    [IDS.enterFloatingPoint]: enterFloatingPoint,
    [IDS.leaveFloatingPoint]: leaveFloatingPoint,
    [IDS.loadFloatingPointControl]: loadFloatingPointControl,
    [IDS.readFloatingPointControl]: readFloatingPointControl,
    [IDS.readFloatingPointStatus]: readFloatingPointStatus,
    [IDS.saveChopControl]: saveChopControl,
    [IDS.convertFloatToIntChop]: convertFloatToIntChop,
    [IDS.convertFloatToIntNear]: convertFloatToIntNear,
    [IDS.convertIntToFloat]: convertIntToFloat,
    [IDS.narrowFloat32]: narrowFloat32,
    [IDS.storeFloat32]: storeFloat32,
    [IDS.loadFloat32]: loadFloat32,
    [IDS.addFloat64]: addFloat64,
    [IDS.subtractFloat64]: subtractFloat64,
    [IDS.multiplyFloat64]: multiplyFloat64,
    [IDS.divideFloat64]: divideFloat64,
    [IDS.squareRootFloat64]: squareRootFloat64,
    [IDS.negateFloat64]: negateFloat64,
    [IDS.absoluteFloat64]: absoluteFloat64,
    [IDS.sineFloat64]: sineFloat64,
    [IDS.cosineFloat64]: cosineFloat64,
    [IDS.atan2Float64]: atan2Float64,
    [IDS.compareFloat64]: compareFloat64,
    [IDS.nearStarIdentity]: nearStarIdentity,
    [IDS.nearStarIdentityPermuted]: nearStarIdentityPermuted,
    [IDS.nearStarIdentitySpill1]: nearStarIdentitySpill1,
    [IDS.nearStarIdentitySpill2]: nearStarIdentitySpill2,
    [IDS.nearStarIdentitySpill3]: nearStarIdentitySpill3,
    [IDS.nearStarIdentitySpill4]: nearStarIdentitySpill4,
    [IDS.nearStarIdentitySpillAll]: nearStarIdentitySpillAll,
    [IDS.isThereIdentity]: isThereIdentity,
    [IDS.product4]: product4,
    [IDS.product4Spilled]: product4Spilled,
    [IDS.saveNearStarChopControl]: saveNearStarChopControl,
    [IDS.nearStarIdentityChop16]: nearStarIdentityChop16,
    [IDS.enterGeometryChop]: enterGeometryChop,
    [IDS.geometryKMulChop]: geometryKMulChop,
    [IDS.geometryKMulChopSpilled]: geometryKMulChopSpilled,
    [IDS.geometryTwoMulKChop]: geometryTwoMulKChop,
    [IDS.geometrySeedTiltChop]: geometrySeedTiltChop,
    [IDS.geometrySeedTiltChopSpilled]: geometrySeedTiltChopSpilled,
    [IDS.geometryPlainChop]: geometryPlainChop,
    [IDS.geometryPlainChop32]: geometryPlainChop32,
    [IDS.geometryQuoMulChop]: geometryQuoMulChop,
    [IDS.geometryQuoMulChopSpill1]: geometryQuoMulChopSpill1,
    [IDS.geometryQuoMulChopSpill2]: geometryQuoMulChopSpill2,
    [IDS.geometrySeedStore100]: geometrySeedStore100,
    [IDS.geometryRatioStore50]: geometryRatioStore50,
    [IDS.geometryRatioStore500]: geometryRatioStore500,
    [IDS.geometryRatioStore5000]: geometryRatioStore5000,
    [IDS.geometryEccentricityStore]: geometryEccentricityStore,
    [IDS.geometryPlanetRayStore]: geometryPlanetRayStore,
    [IDS.geometryMoonRayStore]: geometryMoonRayStore,
    [IDS.geometrySurfaceSeedChop]: geometrySurfaceSeedChop,
    [IDS.geometryAdd4112Chop]: geometryAdd4112Chop,
    [IDS.missionWidenFloat32]: loadFloat32,
    [IDS.spaceRelativeCoordinates]: spaceRelativeCoordinates,
    [IDS.spaceRotateDepth]: spaceRotateDepth,
    [IDS.spaceProject]: spaceProject,
    ...overrides,
  };
}
