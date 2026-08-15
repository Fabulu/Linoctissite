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
  surfaceChopInt64: "native:suseed.txt:d0beef23",
  surfaceNearInt64: "native:suseed.txt:57617b17",
  surfaceSeedAdd4112: "native:suseed.txt:1962fd75",
  surfaceSeedTimes10: "native:suseed.txt:ded4ff85",
  surfaceSecondsDivideInt: "native:suseed.txt:d82d6e3a",
  surfaceSecondsLoad: "native:suseed.txt:7d70b95c",
  surfaceSecondsTimes10: "native:suseed.txt:6e601cdf",
  surfaceSecondsTimes60: "native:suseed.txt:48952347",
  surfaceAngleAdd4: "native:suseed.txt:799db0e5",
  surfaceAngleAdd6: "native:suseed.txt:4cf00151",
  surfaceAngleFromInt: "native:suseed.txt:94a1d789",
  surfaceAngleAddInt: "native:suseed.txt:67bad25c",
  surfaceIntDivide30: "native:suseed.txt:9d6717e1",
  surfaceCosineRadius: "native:suseed.txt:4c67d4f7",
  surfaceSineRadius: "native:suseed.txt:9f07697f",
  surfaceStackAddInt: "native:suseed.txt:e7e623e4",
  surfaceAdvanceX: "native:suseed.txt:f1f10ad9",
  surfaceAdvanceY: "native:suseed.txt:58cb78e9",
  surfaceCenterFloats: "native:suseed.txt:991ddabf",
  surfaceLoadY: "native:suseed.txt:57234998",
  surfaceLoadX: "native:suseed.txt:60190c1a",
  surfaceKt: "native:suseed.txt:dc5af1ae",
  surfaceKq: "native:suseed.txt:bc929db2",
  surfaceThresholdFloat: "native:suseed.txt:2fea0686",
  surfaceAngleFloat: "native:suseed.txt:0466b5c6",
  surfaceLoadAngle: "native:suseed.txt:dacea7ee",
  surfaceWave: "native:supaint.txt:228a9fee",
  paletteIntToFloat: "native:supal.txt:f0dd0806",
  paletteQuarter: "native:supal.txt:55fd0c47",
  paletteThreeQuarters: "native:supal.txt:6c657fc9",
  paletteFiveQuarters: "native:supal.txt:f50c9c5d",
  paletteShadeScale: "native:supal.txt:b1efc1f8",
  paletteShadeDeltas: "native:supal.txt:7f32151a",
  paletteLoadShade: "native:supal.txt:68be862a",
  flareSaveControl: "native:vhflare.txt:ac3505ab",
  flareSpokeDelta: "native:vhflare.txt:d2478660",
  projectMappedPolygon: "native:pgproj.txt:88618553",
  projectMappedPoint: "native:pgproj.txt:29053a05",
  terrainFacingDot: "native:pgproj.txt:625fae20",
  triangleMidpoint: "native:pgproj.txt:2b597e10",
  quadMidpoint: "native:pgproj.txt:1a89cb14",
  transformMappedVertices: "native:pgproj.txt:4a0b8716",
  prepareTriangleVectors: "native:pgproj.txt:b24907e3",
  prepareQuadVectors: "native:pgproj.txt:e87d653f",
  scalePolygonBasis: "native:pgproj.txt:e133a5b8",
  doublePolygonBasis: "native:pgproj.txt:bfa7bd64",
  mappedFacing: "native:pgproj.txt:5673201c",
  polygonGradients: "native:pgproj.txt:5eb0a30d",
  polygonCrossGradient: "native:pgproj.txt:00fb6dee",
  terrainTraceRow: "native:pgproj.txt:75493f86",
  terrainEdgeRows: "native:pgtex.txt:90e8ae12",
  polygonEdges: "native:pgtex.txt:1f274c7a",
  terrainUvNext: "native:pgtex.txt:051b529b",
  groundTreePeakHigh: "native:grnd.txt:5aaca1fb",
  groundTreePeakLow: "native:grnd.txt:35ce6b89",
  groundTreeDrawAccumulator: "native:grnd.txt:5a0abe08",
  groundTreeScale: "native:grnd.txt:47838933",
  groundTreeSpreadAccumulator: "native:grnd.txt:d2eb8199",
  groundTreeSpread: "native:grnd.txt:2392016a",
  groundBranchWidth: "native:grnd.txt:0bc3d08f",
  groundRootHeight: "native:grnd.txt:13657160",
  groundTreeFlandom: "native:grnd.txt:be39244e",
  groundRoundHillRadius: "native:grnd.txt:a140e471",
  groundRoundHillDx: "native:grnd.txt:64b068c0",
  groundRoundHillProfile: "native:grnd.txt:282ae603",
  groundAddSurfaceValue: "native:grnd.txt:a5e0676d",
  groundSubtract127: "native:grnd.txt:abd5bafb",
  groundMirror254: "native:grnd.txt:72aa42a4",
  groundSubtractMaximum: "native:grnd.txt:4d14bab5",
  groundChopHeight: "native:grnd.txt:737ce8e6",
  groundCraterHeight: "native:grnd.txt:dce8a0d5",
  groundCraterRadius: "native:grnd.txt:eadc5a2e",
  groundCraterProfile: "native:grnd.txt:7538c474",
  groundCraterPower: "native:grnd.txt:f3a87253",
  groundSubtractLimit: "native:grnd.txt:d1359547",
  groundLimitFloat: "native:grnd.txt:df1c1afa",
  landedRotationSeed: "native:vhground.txt:c4919f1f",
  landedHeightLower: "native:vhground.txt:4d21b85f",
  landedHeightUpper: "native:vhground.txt:29bbf0b7",
  landedHeightChop: "native:vhground.txt:b9772476",
  landedDenseAverage: "native:vhground.txt:53e9c934",
  landedMushroomPixels: "native:vhground.txt:e9d6d62d",
  landedMushroomPoint: "native:vhground.txt:47b7d3b0",
  landedMushroomSetup: "native:vhground.txt:5c4c6d3b",
  landedTreePeakDouble: "native:vhground.txt:ef41325d",
  landedTreePeakHalf: "native:vhground.txt:9df2c41b",
  landedTreeScaleDouble: "native:vhground.txt:d7f16abe",
  landedTreeGiantWidths: "native:vhground.txt:cdc20999",
  landedTreeSeedSum: "native:vhground.txt:4e79aaea",
  landedTreeRootRange: "native:vhground.txt:1a457500",
  landedTreeChildRange: "native:vhground.txt:79db15c1",
  landedTreeEndpoint: "native:vhground.txt:ae9ab03a",
  landedTreeEndpointPi: "native:vhground.txt:2a4f9481",
  landedTreeRootHeight: "native:vhground.txt:aac8ca5c",
  landedTreeChildHeight: "native:vhground.txt:b52de3d2",
  landedTreeRadii: "native:vhground.txt:7bb56480",
  landedTreeTerminal: "native:vhground.txt:668a4145",
  landedTreeNodeLoad: "native:vhground.txt:a2786c62",
  landedTreeDirection: "native:vhground.txt:19798700",
  landedTreeLeafVertex: "native:vhground.txt:479c6766",
  landedTreePolarVertex: "native:vhground.txt:8c5daa7f",
  landedTileDistance: "native:vhground.txt:018fc2d6",
  landedTileAdmission: "native:vhground.txt:91bdffee",
  landedTerrainTriangle: "native:vhground.txt:64088193",
  landedVertexLoad: "native:vhground.txt:9bc55759",
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
  framebufferDigit: "service:fbdigitat",
  alphaDim: "service:fxalphadim",
  antialiasingDim: "service:fxantialiasingdim",
  clearLayer: "service:clearl2l",
  clearLayerRegion: "service:clearl2lregion",
  copyLayer: "service:copyl2l",
  copyLayerRegion: "service:copyl2lregion",
  compareFloat64: "service:fcmp",
  spaceClear: "service:vhgspaceclear",
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

function pgfInlineLayout(linked) {
  return {
    fw: address(linked, "fw"), pgfi: address(linked, "PGFi"), pgfj: address(linked, "PGFj"),
    fa: address(linked, "FA0"), fb: address(linked, "FB0"), ft: address(linked, "FT0"),
    fs: address(linked, "FS0"), pgft: address(linked, "PGFt"), pgfu: address(linked, "PGFu"),
    fi: address(linked, "FI"),
  };
}

function pgfLoadInline(linked, destination, register = "A") {
  const p = pgfInlineLayout(linked);
  return `q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[${p[destination]}]=m[q];m[${p[destination] + 1}]=m[q+1];${register}=q|0;`;
}

function pgfBinaryInline(linked, operator) {
  const p = pgfInlineLayout(linked);
  return `${pgfLoadInline(linked, "fb")}f64w(${p.fa},f64r(${p.fa})${operator}f64r(${p.fb}));`;
}

function pgfReverseBinaryInline(linked, operator) {
  const p = pgfInlineLayout(linked);
  return `m[${p.ft}]=m[${p.fa}];m[${p.ft + 1}]=m[${p.fa + 1}];${pgfLoadInline(linked, "fa")}m[${p.fb}]=m[${p.ft}];m[${p.fb + 1}]=m[${p.ft + 1}];f64w(${p.fa},f64r(${p.fa})${operator}f64r(${p.fb}));`;
}

const PGF_SERVICE_INLINES = Object.freeze({
  [SERVICE_IDS.pgfA]: (linked) => pgfLoadInline(linked, "fa"),
  [SERVICE_IDS.pgfB]: (linked) => pgfLoadInline(linked, "fb"),
  [SERVICE_IDS.pgfStoreA]: (linked) => {
    const p = pgfInlineLayout(linked);
    return `q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[q]=m[${p.fa}];m[q+1]=m[${p.fa + 1}];A=q|0;`;
  },
  [SERVICE_IDS.pgfMove]: (linked) => {
    const p = pgfInlineLayout(linked);
    return `q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;u=(${p.fw}+2*(m[${p.pgfj}]|0))>>>0;m[u]=m[q];m[u+1]=m[q+1];A=q|0;C=u|0;`;
  },
  [SERVICE_IDS.pgfLoadFloat32]: (linked) => {
    const p = pgfInlineLayout(linked);
    return `m[${p.fs}]=m[${p.pgft}];f64w(${p.fa},fread(m[${p.fs}]|0));`;
  },
  [SERVICE_IDS.pgfLoadFloat64]: (linked) => {
    const p = pgfInlineLayout(linked);
    return `m[${p.fa}]=m[${p.pgft}];m[${p.fa + 1}]=m[${p.pgfu}];`;
  },
  [SERVICE_IDS.pgfSetFloat32]: (linked) => {
    const p = pgfInlineLayout(linked);
    return `m[${p.fs}]=m[${p.pgft}];f64w(${p.fa},fread(m[${p.fs}]|0));q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[q]=m[${p.fa}];m[q+1]=m[${p.fa + 1}];A=q|0;`;
  },
  [SERVICE_IDS.pgfAdd]: (linked) => pgfBinaryInline(linked, "+"),
  [SERVICE_IDS.pgfSubtract]: (linked) => pgfBinaryInline(linked, "-"),
  [SERVICE_IDS.pgfMultiply]: (linked) => pgfBinaryInline(linked, "*"),
  [SERVICE_IDS.pgfDivide]: (linked) => pgfBinaryInline(linked, "/"),
  [SERVICE_IDS.pgfReverseSubtract]: (linked) => pgfReverseBinaryInline(linked, "-"),
  [SERVICE_IDS.pgfReverseDivide]: (linked) => pgfReverseBinaryInline(linked, "/"),
  [SERVICE_IDS.pgfFromInteger]: (linked) => {
    const p = pgfInlineLayout(linked);
    return `f64w(${p.fa},m[${p.fi}]|0);`;
  },
});

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

function framebufferDigit(machine, linked) {
  const memory = machine.memory;
  const digit = value(memory, linked, "DGdigit");
  machine.A = digit;
  if ((digit >>> 0) <= 32 || (digit >>> 0) > 96) return;

  const colour = value(memory, linked, "DGcolor") & 0xff;
  const shader = value(memory, linked, "DGshader");
  const pixelAddress = address(linked, "DGpix");
  const mapByteAddress = address(linked, "DGmapb");
  const dAddress = address(linked, "DGd");
  const nAddress = address(linked, "DGn");
  const iAddress = address(linked, "DGi");
  const valueAddress = address(linked, "DGval");
  const rowAddress = address(linked, "DGrow");
  const bitAddress = address(linked, "DGm");
  const memoryBytePointer = address(linked, "MBptr");
  const memoryByteValue = address(linked, "MBval");
  const mapAddress = address(linked, "digimap2");
  const page = noctisBuffer(linked, "RPSM");
  const d = Math.imul((digit - 32) | 0, 36) | 0;
  let pixel = colour % 64;
  memory[pixelAddress] = pixel;
  memory[mapByteAddress] = ((colour >>> 6) << 6) | 0;
  memory[dAddress] = d;
  memory[nAddress] = 0;

  let rowBits = 0;
  for (let row = 0; row < 36; row += 1) {
    let index = Math.imul(row, 256) - 5;
    memory[iAddress] = index;
    memory[valueAddress] = 0;
    memory[page + index - 1] = 0;
    rowBits = memory[mapAddress + row + d] | 0;
    memory[rowAddress] = rowBits;
    memory[bitAddress] = 0;
    for (let bit = 0; bit < 32; bit += 1) {
      const output = (rowBits & (1 << bit)) !== 0 ? pixel : 0;
      memory[valueAddress] = output;
      memory[page + index] = output & 0xff;
      index += 1;
      memory[iAddress] = index;
      memory[bitAddress] = bit + 1;
    }
    if (shader !== 0) {
      pixel = (pixel - 1) | 0;
      memory[pixelAddress] = pixel;
    }
    memory[nAddress] = row + 1;
  }
  memory[valueAddress] = 0;
  memory[page + 9210] = 0;
  memory[memoryBytePointer] = (address(linked, "RPSM") + 9210) | 0;
  memory[memoryByteValue] = 0;
  machine.A = (address(linked, "nw") + address(linked, "RPSM") + 9210) | 0;
  machine.B = 0x80000000 | 0;
  machine.C = 0;
  machine.D = 31;
}

function alphaDim(machine) {
  const memory = machine.memory;
  const destination = machine.A >>> 0;
  const source = machine.B | 0;
  const current = memory[destination] | 0;
  let blue = (current & 0xff) - (source & 0xff);
  let green = (current & 0xff00) - (source & 0xff00);
  let red = (current & 0xff0000) - (source & 0xff0000);
  if (blue < 0) blue = 0;
  if (green < 0) green = 0;
  if (red < 0) red = 0;
  const result = (blue | green | red) | 0;
  memory[destination] = result;
  machine.A = destination | 0;
  machine.B = source & 0xff0000;
  machine.C = result;
  machine.D = green | 0;
  machine.E = red | 0;
}

function antialiasingDim(machine, linked) {
  const origin = machine.A | 0;
  const source = machine.B | 0;
  const width = value(machine.memory, linked, "Display Width");
  const neighbour = ((source & 0xf0f0f0) >>> 4) | 0;
  machine.A = origin;
  machine.B = source;
  alphaDim(machine);
  for (const destination of [origin - 1, origin + 1, origin - width, origin + width]) {
    machine.A = destination | 0;
    machine.B = neighbour;
    alphaDim(machine);
  }
  machine.A = origin;
}

function normalizeRegion(memory, linked, pointer) {
  let left = memory[pointer] | 0;
  let top = memory[pointer + 1] | 0;
  let right = memory[pointer + 2] | 0;
  let bottom = memory[pointer + 3] | 0;
  if (right < left) [left, right] = [right, left];
  if (bottom < top) [top, bottom] = [bottom, top];
  const width = value(memory, linked, "Display Width");
  const height = value(memory, linked, "Display Height");
  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (right < 0) right = 0;
  if (bottom < 0) bottom = 0;
  if (left >= width) left = width - 1;
  if (top >= height) top = height - 1;
  if (right >= width) right = width - 1;
  if (bottom >= height) bottom = height - 1;
  memory[pointer] = left;
  memory[pointer + 1] = top;
  memory[pointer + 2] = right;
  memory[pointer + 3] = bottom;
  return { left, top, right, bottom, width };
}

function clearLayerRegion(machine, linked) {
  const memory = machine.memory;
  const pointer = value(memory, linked, "L2L Region");
  if (pointer === 0) return;
  memory[address(linked, "Region To Normalize")] = pointer;
  const region = normalizeRegion(memory, linked, pointer);
  const destination = value(memory, linked, "Destination Layer");
  const colour = value(memory, linked, "L2L Region Color");
  const rowWidth = (region.right - region.left + 1) | 0;
  const rows = (region.bottom - region.top + 1) | 0;
  let rowStart = (destination + Math.imul(region.top, region.width) + region.left) | 0;
  for (let row = 0; row < rows; row += 1) {
    memory.fill(colour, rowStart, rowStart + rowWidth);
    rowStart = (rowStart + region.width) | 0;
  }
  machine.A = rowStart;
  machine.B = rowWidth;
  machine.C = 0;
  machine.D = colour;
  machine.E = pointer;
}

function clearLayer(machine, linked) {
  const memory = machine.memory;
  const count = Math.imul(
    value(memory, linked, "Display Width"), value(memory, linked, "Display Height"),
  ) | 0;
  const destination = value(memory, linked, "Destination Layer");
  const colour = value(memory, linked, "L2L Region Color");
  memory.fill(colour, destination, destination + count);
  machine.A = 0;
  machine.B = (destination + count) | 0;
  machine.C = colour;
}

function copyLayer(machine, linked) {
  const memory = machine.memory;
  const count = Math.imul(
    value(memory, linked, "Display Width"), value(memory, linked, "Display Height"),
  ) | 0;
  let source = value(memory, linked, "Source Layer");
  let destination = value(memory, linked, "Destination Layer");
  for (let index = 0; index < count; index += 1) memory[destination++] = memory[source++];
  machine.A = 0;
  machine.B = source;
  machine.C = destination;
}

function copyLayerRegion(machine, linked) {
  const memory = machine.memory;
  const pointer = value(memory, linked, "L2L Region");
  if (pointer === 0) return;
  memory[address(linked, "Region To Normalize")] = pointer;
  const region = normalizeRegion(memory, linked, pointer);
  const rowWidth = (region.right - region.left + 1) | 0;
  const rows = (region.bottom - region.top + 1) | 0;
  const rowOffset = (Math.imul(region.top, region.width) + region.left) | 0;
  let source = (value(memory, linked, "Source Layer") + rowOffset) | 0;
  let destination = (value(memory, linked, "Destination Layer") + rowOffset) | 0;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < rowWidth; column += 1) {
      memory[destination + column] = memory[source + column];
    }
    source = (source + region.width) | 0;
    destination = (destination + region.width) | 0;
  }
  machine.A = source;
  machine.B = destination;
  machine.C = rowWidth;
  machine.D = 0;
  machine.E = pointer;
}

function spaceClear(machine, linked) {
  const memory = machine.memory;
  const start = noctisBuffer(linked, "RADPT") + 2880;
  memory.fill(0, start, start + 58240);
  machine.A = (start + 58240) | 0;
  machine.B = 0;
  machine.C = 0;
}

function compareFloat64Service(machine, linked) {
  const memory = machine.memory;
  compareFloat64(machine, linked);
  const status = value(memory, linked, "FSW");
  if ((status & 0x0400) !== 0) {
    const flags = value(memory, linked, "FFLG") | 1;
    memory[address(linked, "FFLG")] = flags;
    memory[address(linked, "FI")] = 2;
    machine.A = flags;
  } else if ((status & 0x4000) !== 0) {
    memory[address(linked, "FI")] = 0;
    machine.A = status & 0x4000;
  } else if ((status & 0x0100) !== 0) {
    memory[address(linked, "FI")] = -1;
    machine.A = -1;
  } else {
    memory[address(linked, "FI")] = 1;
    machine.A = 0;
  }
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

function projectMappedPolygon(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const points = value(memory, linked, "PJmpbase") >>> 0;
  const control = floatingPoint(machine).control;
  const count = value(memory, linked, "PJvr2") >>> 0;
  const minX = address(linked, "PJminx");
  const maxX = address(linked, "PJmaxx");
  const minY = address(linked, "BXminy");
  const maxY = address(linked, "BXmaxy");
  memory[minX] = 311;
  memory[maxX] = 5;
  memory[minY] = 190;
  memory[maxY] = 10;
  for (let vertex = 0; vertex < count; vertex += 1) {
    let factor = scalarBinaryNumber(
      readFloat64(memory, floats + 50),
      readFloat64(memory, floats + 128 + vertex * 2),
      control,
      "divide",
    );
    writeFloat64(memory, floats + 502, factor);
    let projected = scalarBinaryNumber(
      factor,
      readFloat64(memory, floats + 96 + vertex * 2),
      control,
      "multiply",
    );
    writeScalarScratch(machine, linked, projected);
    projected = scalarBinaryNumber(
      projected,
      readFloat64(memory, floats + 38),
      control,
      "add",
    );
    writeScalarScratch(machine, linked, projected);
    const x = convertToInt32(projected, control);
    memory[points + vertex * 2] = x;
    if (x < memory[minX]) memory[minX] = x;
    if (x > memory[maxX]) memory[maxX] = x;

    projected = scalarBinaryNumber(
      factor,
      readFloat64(memory, floats + 112 + vertex * 2),
      control,
      "multiply",
    );
    writeScalarScratch(machine, linked, projected);
    projected = scalarBinaryNumber(
      projected,
      readFloat64(memory, floats + 40),
      control,
      "add",
    );
    writeScalarScratch(machine, linked, projected);
    const y = convertToInt32(projected, control);
    memory[points + vertex * 2 + 1] = y;
    if (y < memory[minY]) memory[minY] = y;
    if (y > memory[maxY]) memory[maxY] = y;
  }
  memory[address(linked, "PJvr")] = count;
}

function projectMappedPoint(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const factor = scalarBinaryNumber(
    readFloat64(memory, floats + 50),
    readFloat64(memory, floats + 80),
    control,
    "divide",
  );
  writeFloat64(memory, floats + 502, factor);
  for (const [source, center, output] of [
    [64, 38, "GCx"],
    [72, 40, "GCy"],
  ]) {
    let projected = scalarBinaryNumber(
      factor,
      readFloat64(memory, floats + source),
      control,
      "multiply",
    );
    writeScalarScratch(machine, linked, projected);
    projected = scalarBinaryNumber(
      projected,
      readFloat64(memory, floats + center),
      control,
      "add",
    );
    writeScalarScratch(machine, linked, projected);
    memory[address(linked, output)] = convertToInt32(projected, control);
  }
}

function terrainFacingDot(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  let difference = scalarBinaryNumber(
    readFloat64(memory, floats + 448),
    readFloat64(memory, floats + 508),
    control,
    "subtract",
  );
  writeScalarScratch(machine, linked, difference);
  let sum = scalarBinaryNumber(
    difference,
    readFloat64(memory, floats + 470),
    control,
    "multiply",
  );
  writeFloat64(memory, floats + 496, sum);
  for (const [camera, vertex, normal, spillSum] of [
    [450, 516, 472, true],
    [452, 524, 474, false],
  ]) {
    difference = scalarBinaryNumber(
      readFloat64(memory, floats + camera),
      readFloat64(memory, floats + vertex),
      control,
      "subtract",
    );
    writeScalarScratch(machine, linked, difference);
    let product = scalarBinaryNumber(
      difference,
      readFloat64(memory, floats + normal),
      control,
      "multiply",
    );
    writeScalarScratch(machine, linked, product);
    sum = scalarBinaryNumber(product, sum, control, "add");
    if (spillSum) writeFloat64(memory, floats + 496, sum);
  }
  writeScalarScratch(machine, linked, sum);
}

function polygonMidpoint(machine, linked, vertices) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const factor = readFloat64(memory, address(linked, "PJthird0"));
  for (const [source, destination] of [[64, 408], [72, 410], [80, 412]]) {
    let sum = readFloat64(memory, floats + source);
    for (let vertex = 1; vertex < vertices; vertex += 1) {
      sum = scalarBinaryNumber(
        sum,
        readFloat64(memory, floats + source + vertex * 2),
        control,
        "add",
      );
      writeScalarScratch(machine, linked, sum);
    }
    sum = scalarBinaryNumber(sum, factor, control, "multiply");
    writeScalarScratch(machine, linked, sum);
    writeFloat64(memory, floats + destination, narrowScalar(machine, linked, sum));
  }
}

function transformMappedVertices(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const end = value(memory, linked, "PJdx") >>> 0;
  let vertex = value(memory, linked, "PJvr") >>> 0;
  for (; vertex < end; vertex += 1) {
    for (const [source, destination, midpoint, scale] of [
      [64, 384, 408, 416],
      [72, 392, 410, 418],
      [80, 400, 412, 420],
    ]) {
      let result = scalarBinaryNumber(
        readFloat64(memory, floats + source + vertex * 2),
        readFloat64(memory, floats + midpoint),
        control,
        "subtract",
      );
      writeScalarScratch(machine, linked, result);
      result = scalarBinaryNumber(
        result,
        readFloat64(memory, floats + scale),
        control,
        "multiply",
      );
      writeScalarScratch(machine, linked, result);
      result = scalarBinaryNumber(
        result,
        readFloat64(memory, floats + midpoint),
        control,
        "add",
      );
      writeScalarScratch(machine, linked, result);
      writeFloat64(
        memory,
        floats + destination + vertex * 2,
        narrowScalar(machine, linked, result),
      );
    }
  }
  memory[address(linked, "PJvr")] = vertex;
}

function preparePolygonVectors(machine, linked, lastVertex) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  for (const [source, origin, firstEdge, secondEdge] of [
    [384, 470, 458, 464],
    [392, 472, 460, 466],
    [400, 474, 462, 468],
  ]) {
    const first = narrowScalar(machine, linked, readFloat64(memory, floats + source));
    writeFloat64(memory, floats + origin, first);
    let result = scalarBinaryNumber(
      readFloat64(memory, floats + source + 2),
      first,
      control,
      "subtract",
    );
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + firstEdge, narrowScalar(machine, linked, result));
    result = scalarBinaryNumber(
      first,
      readFloat64(memory, floats + source + lastVertex * 2),
      control,
      "subtract",
    );
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + secondEdge, narrowScalar(machine, linked, result));
  }
}

function scalePolygonBasis(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const scale = readFloat64(memory, floats + 484);
  for (const [source, destination] of [[6, 18], [8, 20], [10, 22]]) {
    const result = scalarBinaryNumber(
      readFloat64(memory, floats + source),
      scale,
      control,
      "multiply",
    );
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + destination, narrowScalar(machine, linked, result));
  }
}

function doublePolygonBasis(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  for (const slot of [18, 20, 22]) {
    const input = readFloat64(memory, floats + slot);
    const result = scalarBinaryNumber(input, input, control, "add");
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + slot, narrowScalar(machine, linked, result));
  }
}

function mappedFacing(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const edge1 = [];
  const edge2 = [];
  for (const source of [504, 512, 520]) {
    let result = scalarBinaryNumber(
      readFloat64(memory, floats + source),
      readFloat64(memory, floats + source + 4),
      control,
      "subtract",
    );
    writeScalarScratch(machine, linked, result);
    result = narrowScalar(machine, linked, result);
    edge1.push(result);
    writeFloat64(memory, floats + 464 + edge1.length * 2 - 2, result);

    result = scalarBinaryNumber(
      readFloat64(memory, floats + source + 2),
      readFloat64(memory, floats + source + 4),
      control,
      "subtract",
    );
    writeScalarScratch(machine, linked, result);
    result = narrowScalar(machine, linked, result);
    edge2.push(result);
    writeFloat64(memory, floats + 458 + edge2.length * 2 - 2, result);
  }

  const crossTerms = [
    [1, 2, 2, 1],
    [2, 0, 0, 2],
    [0, 1, 1, 0],
  ];
  const normal = [];
  for (let axis = 0; axis < 3; axis += 1) {
    const [a1, a2, b1, b2] = crossTerms[axis];
    const first = scalarBinaryNumber(edge1[a1], edge2[a2], control, "multiply");
    writeFloat64(memory, floats + 496, first);
    let second = scalarBinaryNumber(edge1[b1], edge2[b2], control, "multiply");
    writeScalarScratch(machine, linked, second);
    second = scalarBinaryNumber(first, second, control, "subtract");
    writeScalarScratch(machine, linked, second);
    const component = narrowScalar(machine, linked, second);
    normal.push(component);
    writeFloat64(memory, floats + 470 + axis * 2, component);
  }

  let sum = 0;
  for (let axis = 0; axis < 3; axis += 1) {
    let difference = scalarBinaryNumber(
      readFloat64(memory, floats + 448 + axis * 2),
      readFloat64(memory, floats + 508 + axis * 8),
      control,
      "subtract",
    );
    writeScalarScratch(machine, linked, difference);
    let product = scalarBinaryNumber(difference, normal[axis], control, "multiply");
    if (axis === 0) {
      sum = product;
      writeFloat64(memory, floats + 496, sum);
    } else {
      writeScalarScratch(machine, linked, product);
      sum = scalarBinaryNumber(product, sum, control, "add");
      if (axis === 1) writeFloat64(memory, floats + 496, sum);
    }
  }
  writeScalarScratch(machine, linked, sum);
  memory[address(linked, "FCret")] = !Number.isNaN(sum) && sum >= 0 ? 1 : 0;
}

function polygonGradient(machine, linked, xi, yi, xo, yo, scale, destination) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const first = scalarBinaryNumber(
    readFloat64(memory, floats + xi * 2),
    readFloat64(memory, floats + yi * 2),
    control,
    "multiply",
  );
  writeFloat64(memory, floats + 502, first);
  let second = scalarBinaryNumber(
    readFloat64(memory, floats + xo * 2),
    readFloat64(memory, floats + yo * 2),
    control,
    "multiply",
  );
  writeScalarScratch(machine, linked, second);
  second = scalarBinaryNumber(first, second, control, "subtract");
  writeScalarScratch(machine, linked, second);
  second = scalarBinaryNumber(
    second,
    readFloat64(memory, floats + scale * 2),
    control,
    "multiply",
  );
  writeScalarScratch(machine, linked, second);
  const narrowed = narrowScalar(machine, linked, second);
  writeFloat64(memory, floats + destination * 2, narrowed);
  writeScalarScratch(machine, linked, narrowed);
}

function polygonGradients(machine, linked) {
  for (const record of [
    [0xeb, 0xe7, 0xed, 0xe5, 0xf6, 0],
    [0xeb, 0xea, 0xed, 0xe8, 0xf6, 1],
    [0xe8, 0xe7, 0xea, 0xe5, 0x1a, 2],
    [0xed, 0xe6, 0xec, 0xe7, 0xf5, 3],
    [0xed, 0xe9, 0xec, 0xea, 0xf5, 4],
    [0xea, 0xe6, 0xe9, 0xe7, 0x1a, 5],
    [0xec, 0xe5, 0xeb, 0xe6, 0xf4, 6],
    [0xec, 0xe8, 0xeb, 0xe9, 0xf4, 7],
    [0xe9, 0xe5, 0xe8, 0xe6, 0x12, 8],
  ]) polygonGradient(machine, linked, ...record);
}

function polygonCrossGradient(machine, linked) {
  const memory = machine.memory;
  polygonGradient(
    machine,
    linked,
    value(memory, linked, "CLxi"),
    value(memory, linked, "CLyi"),
    value(memory, linked, "CLxo"),
    value(memory, linked, "CLyo"),
    value(memory, linked, "CLbnd"),
    value(memory, linked, "CLt"),
  );
}

function terrainTraceRow(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const row = value(memory, linked, "SPi") | 0;
  const ipart = value(memory, linked, "PJipartbase") >>> 0;
  const spill = (number) => {
    writeScalarScratch(machine, linked, number);
    return number;
  };
  let factor = spill(memory[ipart + row] | 0);
  factor = spill(scalarBinaryNumber(
    factor,
    readFloat64(memory, floats + 38),
    control,
    "subtract",
  ));
  factor = scalarBinaryNumber(
    factor,
    readFloat64(memory, floats + 36),
    control,
    "add",
  );
  writeFloat64(memory, floats + 502, factor);

  let z = scalarBinaryNumber(
    factor,
    readFloat64(memory, floats + 10),
    control,
    "multiply",
  );
  writeFloat64(memory, floats + 496, z);
  let vertical = spill(row);
  vertical = spill(scalarBinaryNumber(
    vertical,
    readFloat64(memory, floats + 40),
    control,
    "subtract",
  ));
  vertical = spill(scalarBinaryNumber(
    vertical,
    readFloat64(memory, floats + 4),
    control,
    "multiply",
  ));
  z = spill(scalarBinaryNumber(vertical, z, control, "add"));
  z = scalarBinaryNumber(z, readFloat64(memory, floats + 16), control, "add");
  writeFloat64(memory, floats + 498, z);
  writeFloat64(memory, floats + 30, narrowScalar(machine, linked, z));

  let reciprocal = spill(scalarBinaryNumber(
    readFloat64(memory, floats + 36),
    z,
    control,
    "divide",
  ));
  reciprocal = narrowScalar(machine, linked, reciprocal);
  writeFloat64(memory, floats + 24, reciprocal);

  const coordinate = (axisVector, gradient, origin, destination) => {
    let result = scalarBinaryNumber(
      factor,
      readFloat64(memory, floats + axisVector),
      control,
      "multiply",
    );
    writeFloat64(memory, floats + 496, result);
    let rowPart = spill(row);
    rowPart = spill(scalarBinaryNumber(
      rowPart,
      readFloat64(memory, floats + 40),
      control,
      "subtract",
    ));
    rowPart = spill(scalarBinaryNumber(
      rowPart,
      readFloat64(memory, floats + gradient),
      control,
      "multiply",
    ));
    result = spill(scalarBinaryNumber(rowPart, result, control, "add"));
    result = spill(scalarBinaryNumber(
      result,
      readFloat64(memory, floats + origin),
      control,
      "add",
    ));
    result = narrowScalar(machine, linked, result);
    writeFloat64(memory, floats + destination, result);
    return result;
  };
  const x = coordinate(6, 0, 12, 26);
  const y = coordinate(8, 2, 14, 28);

  let texture = spill(scalarBinaryNumber(
    x,
    readFloat64(memory, floats + 32),
    control,
    "multiply",
  ));
  texture = spill(scalarBinaryNumber(texture, reciprocal, control, "multiply"));
  memory[address(linked, "SPu")] = convertToInt32(texture, control);
  texture = spill(scalarBinaryNumber(
    y,
    readFloat64(memory, floats + 34),
    control,
    "multiply",
  ));
  texture = spill(scalarBinaryNumber(texture, reciprocal, control, "multiply"));
  memory[address(linked, "SPv")] = convertToInt32(texture, control);
}

function runTerrainEdgeRows(machine, linked, bndx, slope, row, count) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const floats = value(memory, linked, "PGfwbase") >>> 0;
  const fpart = value(memory, linked, "PGfpartbase") >>> 0;
  const ipart = value(memory, linked, "PGipartbase") >>> 0;
  while (count !== 0) {
    let edge = convertToInt32(bndx, control);
    if (edge < -10000) edge = -10000;
    if (edge > 10000) edge = 10000;
    memory[address(linked, "EWax")] = edge;
    if (edge > (memory[fpart + row] | 0)) memory[fpart + row] = Math.min(edge, 311);
    if (edge < (memory[ipart + row] | 0)) memory[ipart + row] = Math.max(edge, 5);
    bndx = scalarBinaryNumber(bndx, slope, control, "add");
    writeFloat64(memory, floats + 44, bndx);
    row += 1;
    count -= 1;
  }
  memory[address(linked, "EWh")] = row;
  memory[address(linked, "EWcx")] = count;
  writeScalarScratch(machine, linked, bndx);
  return bndx;
}

function terrainEdgeRows(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PGfwbase") >>> 0;
  runTerrainEdgeRows(
    machine,
    linked,
    readFloat64(memory, floats + 44),
    readFloat64(memory, floats + 42),
    value(memory, linked, "EWh") | 0,
    value(memory, linked, "EWcx") >>> 0,
  );
}

function polygonEdges(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const floats = value(memory, linked, "PGfwbase") >>> 0;
  const points = address(linked, "mp");
  const vr22 = value(memory, linked, "EWvr22") >>> 0;
  memory[points + vr22] = memory[points];
  memory[points + vr22 + 1] = memory[points + 1];
  let edgeCount = vr22 >>> 1;
  let source = 0;
  memory[address(linked, "EWsi")] = source;
  memory[address(linked, "PGj")] = edgeCount;
  while (edgeCount !== 0) {
    let x1 = memory[points + source] | 0;
    let y1 = memory[points + source + 1] | 0;
    let x2 = memory[points + source + 2] | 0;
    let y2 = memory[points + source + 3] | 0;
    memory[address(linked, "SPt")] = x2;
    if (y2 < y1) {
      [x1, x2] = [x2, x1];
      [y1, y2] = [y2, y1];
    }
    memory[address(linked, "EWx1")] = x1;
    memory[address(linked, "EWy1")] = y1;
    memory[address(linked, "EWx2")] = x2;
    memory[address(linked, "EWy2")] = y2;
    if (y2 !== y1) {
      let slope = scalarBinaryNumber(x2 - x1, y2 - y1, control, "divide");
      writeScalarScratch(machine, linked, slope);
      slope = narrowScalar(machine, linked, slope);
      writeFloat64(memory, floats + 42, slope);
      memory[address(linked, "PGFi")] = 22;
      let firstRow = y1;
      if (y1 < 5) {
        firstRow = 5;
        let correction = scalarBinaryNumber(5 - y1, slope, control, "multiply");
        writeScalarScratch(machine, linked, correction);
        correction = scalarBinaryNumber(x1, correction, control, "add");
        writeScalarScratch(machine, linked, correction);
        x1 = convertToInt32(correction, control);
        memory[address(linked, "EWx1")] = x1;
      }
      const lastRow = Math.min(y2, 190);
      memory[address(linked, "EWity")] = firstRow;
      memory[address(linked, "EWjty")] = lastRow;
      let bndx = x1;
      writeFloat64(memory, floats + 44, bndx);
      writeScalarScratch(machine, linked, bndx);
      if (firstRow < lastRow) {
        const count = lastRow - firstRow + 1;
        memory[address(linked, "EWcx")] = count;
        memory[address(linked, "EWh")] = firstRow;
        bndx = runTerrainEdgeRows(machine, linked, bndx, slope, firstRow, count);
      }
    }
    source += 2;
    edgeCount -= 1;
    memory[address(linked, "EWsi")] = source;
    memory[address(linked, "PGj")] = edgeCount;
  }
}

function terrainUvNext(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PGfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const advance = (position, step, wide, narrowName) => {
    const result = scalarBinaryNumber(
      readFloat64(memory, floats + position),
      readFloat64(memory, floats + step),
      control,
      "add",
    );
    writeFloat64(memory, floats + wide, result);
    writeNamedFloat32(machine, linked, narrowName, result);
    const narrowed = readNamedFloat32(memory, linked, narrowName);
    writeFloat64(memory, floats + position, narrowed);
    return result;
  };
  const z = advance(30, 22, 48, "PGUVZ");
  const x = advance(26, 18, 50, "PGUVX");
  const y = advance(28, 20, 52, "PGUVY");
  let reciprocal = scalarBinaryNumber(
    readFloat64(memory, floats + 36),
    z,
    control,
    "divide",
  );
  writeFloat64(memory, floats + 54, reciprocal);
  writeNamedFloat32(machine, linked, "PGUVK4", reciprocal);
  reciprocal = readNamedFloat32(memory, linked, "PGUVK4");
  writeFloat64(memory, floats + 24, reciprocal);
  const project = (coordinate, scale, outputName) => {
    let result = scalarBinaryNumber(
      coordinate,
      readFloat64(memory, floats + scale),
      control,
      "multiply",
    );
    writeFloat64(memory, floats + 54, result);
    result = scalarBinaryNumber(result, reciprocal, control, "multiply");
    writeFloat64(memory, floats + 54, result);
    memory[address(linked, outputName)] = convertToInt32(result, control);
  };
  project(x, 32, "SPun");
  project(y, 34, "SPvn");
}

function groundStoreFloat(machine, linked, destination, number) {
  writeNamedFloat32(machine, linked, destination, number);
  return readNamedFloat32(machine.memory, linked, destination);
}

function groundTreeAffine(machine, linked, multiplier, addend, destination) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "GRtreefl"),
    readFloat64(memory, address(linked, multiplier)),
    control,
    "multiply",
  );
  if (addend) result = scalarBinaryNumber(
    result,
    readFloat64(memory, address(linked, addend)),
    control,
    "add",
  );
  groundStoreFloat(machine, linked, destination, result);
}

function groundTreeAdd(machine, linked, addend, destination) {
  const memory = machine.memory;
  const result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "GRtreefl"),
    readFloat64(memory, address(linked, addend)),
    floatingPoint(machine).control,
    "add",
  );
  groundStoreFloat(machine, linked, destination, result);
}

function groundTreeDrawAccumulator(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const integer = value(memory, linked, "GRtreeci");
  let result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "GRtreefl"),
    integer,
    control,
    "multiply",
  );
  result = scalarBinaryNumber(result, integer, control, "add");
  writeFloat64(memory, address(linked, "GRtreeacc0"), result);
}

function groundTreeDifference(machine, linked, multiplier, destination) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const product = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "GRtreefl"),
    multiplier,
    control,
    "multiply",
  );
  const result = scalarBinaryNumber(
    readFloat64(memory, address(linked, "GRtreeacc0")),
    product,
    control,
    "subtract",
  );
  groundStoreFloat(machine, linked, destination, result);
}

function groundTreeSpreadAccumulator(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "GRtreefl"),
    readFloat64(memory, address(linked, "GRK050L")),
    control,
    "multiply",
  );
  result = scalarBinaryNumber(
    result,
    readFloat64(memory, address(linked, "GRK075L")),
    control,
    "add",
  );
  writeFloat64(memory, address(linked, "GRtreeacc0"), result);
}

function groundTreeFlandom(machine, linked) {
  const memory = machine.memory;
  const result = scalarBinaryNumber(
    value(memory, linked, "GRtreeci"),
    readFloat64(memory, address(linked, "GRKFL0")),
    floatingPoint(machine).control,
    "multiply",
  );
  groundStoreFloat(machine, linked, "GRtreefl", result);
}

function groundRoundHillRadius(machine, linked) {
  const memory = machine.memory;
  const result = scalarBinaryNumber(
    value(memory, linked, "SUia"),
    readFloat64(memory, address(linked, "GRKPI2L")),
    floatingPoint(machine).control,
    "divide",
  );
  groundStoreFloat(machine, linked, "GRfv", result);
}

function groundRoundHillDx(machine, linked) {
  groundStoreFloat(machine, linked, "GRfdx", value(machine.memory, linked, "GRdxi"));
}

function groundRoundHillProfile(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const dz = groundStoreFloat(machine, linked, "GRfdz", value(memory, linked, "GRdzi"));
  const dx = readNamedFloat32(memory, linked, "GRfdx");
  const dx2 = scalarBinaryNumber(dx, dx, control, "multiply");
  const dz2 = scalarBinaryNumber(dz, dz, control, "multiply");
  const distanceSquared = scalarBinaryNumber(dx2, dz2, control, "add");
  writeFloat64(memory, address(linked, "GRfs0"), distanceSquared);
  const distance = groundStoreFloat(machine, linked, "GRfd", Math.sqrt(distanceSquared));
  let angle = scalarBinaryNumber(
    distance,
    readNamedFloat32(memory, linked, "GRfv"),
    control,
    "divide",
  );
  writeFloat64(memory, address(linked, "GRfs0"), angle);
  angle = Math.cos(angle);
  const height = scalarBinaryNumber(
    angle,
    readNamedFloat32(memory, linked, "GRfht"),
    control,
    "multiply",
  );
  groundStoreFloat(machine, linked, "GRfy", height);
}

function groundAddSurfaceValue(machine, linked) {
  const memory = machine.memory;
  const result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "GRfy"),
    value(memory, linked, "GRsval"),
    floatingPoint(machine).control,
    "add",
  );
  groundStoreFloat(machine, linked, "GRfy", result);
}

function groundSubtractToScratch(machine, linked, right, rightIsInteger = false) {
  const memory = machine.memory;
  const result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "GRfy"),
    rightIsInteger ? value(memory, linked, right) : readFloat64(memory, address(linked, right)),
    floatingPoint(machine).control,
    "subtract",
  );
  writeFloat64(memory, address(linked, "GRfs0"), result);
}

function groundMirror254(machine, linked) {
  const memory = machine.memory;
  const result = scalarBinaryNumber(
    readFloat64(memory, address(linked, "GRK254L")),
    readNamedFloat32(memory, linked, "GRfy"),
    floatingPoint(machine).control,
    "subtract",
  );
  groundStoreFloat(machine, linked, "GRfy", result);
}

function groundSubtractMaximum(machine, linked) {
  const memory = machine.memory;
  const result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "GRfy"),
    readNamedFloat32(memory, linked, "GRfhmt"),
    floatingPoint(machine).control,
    "subtract",
  );
  writeFloat64(memory, address(linked, "GRfs0"), result);
}

function groundChopHeight(machine, linked) {
  const memory = machine.memory;
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "GRcwc") & 0xffff;
  memory[address(linked, "GRfti")] = convertToInt32(
    readNamedFloat32(memory, linked, "GRfy"),
    fpu.control,
  );
  fpu.control = value(memory, linked, "GRcwn") & 0xffff;
}

function groundCraterHeight(machine, linked) {
  const memory = machine.memory;
  const result = scalarBinaryNumber(
    value(memory, linked, "SUia"),
    readNamedFloat32(memory, linked, "GRfht"),
    floatingPoint(machine).control,
    "multiply",
  );
  groundStoreFloat(machine, linked, "GRfsch", result);
}

function groundCraterRadius(machine, linked) {
  groundStoreFloat(machine, linked, "GRfscr", value(machine.memory, linked, "SUia"));
}

function groundCraterProfile(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const distance = groundStoreFloat(machine, linked, "GRfd", Math.sqrt(value(memory, linked, "GRfd2")));
  let ratio = scalarBinaryNumber(
    distance,
    readNamedFloat32(memory, linked, "GRfscr"),
    control,
    "divide",
  );
  ratio = scalarBinaryNumber(
    readFloat64(memory, address(linked, "GRKPIL")),
    ratio,
    control,
    "multiply",
  );
  ratio = Math.sin(ratio);
  ratio = scalarBinaryNumber(
    ratio,
    readNamedFloat32(memory, linked, "GRfsch"),
    control,
    "multiply",
  );
  groundStoreFloat(machine, linked, "GRfy", ratio);
}

function groundCraterPower(machine, linked) {
  const memory = machine.memory;
  const result = Math.pow(
    readNamedFloat32(memory, linked, "GRfy"),
    readNamedFloat32(memory, linked, "GRfhmt"),
  );
  groundStoreFloat(machine, linked, "GRfy", result);
}

function groundLimitFloat(machine, linked) {
  groundStoreFloat(machine, linked, "GRfy", value(machine.memory, linked, "GRfscl"));
}

function landedFastRandom(machine, linked, mask) {
  const memory = machine.memory;
  const seed = value(memory, linked, "SUfseed") >>> 0;
  const product = BigInt(seed) * BigInt(seed);
  const low = Number(product & 0xffffffffn) | 0;
  const high = Number((product >> 32n) & 0xffffffffn) | 0;
  const raw = (low & 0xffffff00) | (((low & 0xff) + (high & 0xff)) & 0xff);
  const nextSeed = (seed + (raw >>> 0)) | 0;
  const result = raw & mask;
  memory[address(linked, "SUfeax")] = raw;
  memory[address(linked, "SUfseed")] = nextSeed;
  memory[address(linked, "SUfval")] = result;
  machine.A = raw;
  machine.B = nextSeed;
  machine.C = result;
  machine.D = high;
  return result;
}

function landedRotationSeed(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = readFloat64(memory, address(linked, "VHGNDsf00"));
  for (const name of ["VHGNDsf10", "VHGNDsf20", "VHGNDsf30", "VHGNDsf40", "VHGNDsf50"]) {
    result = scalarBinaryNumber(
      result,
      readFloat64(memory, address(linked, name)),
      control,
      "multiply",
    );
  }
  writeFloat64(memory, address(linked, "VHGNDseedval0"), result);
}

function landedHeightTriangle(machine, linked, upper) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const inverse = readFloat64(memory, address(linked, "FB0"));
  const firstPosition = upper ? value(memory, linked, "VHGNDfx") : 16384 - value(memory, linked, "VHGNDfx");
  let factor = scalarBinaryNumber(firstPosition, inverse, control, "multiply");
  writeFloat64(memory, address(linked, "FT0"), factor);
  const firstBase = value(memory, linked, upper ? "VHGNDh1i" : "VHGNDh3i");
  let height = scalarBinaryNumber(
    value(memory, linked, upper ? "VHGNDh2i" : "VHGNDh4i") - firstBase,
    factor,
    control,
    "multiply",
  );
  height = scalarBinaryNumber(height, firstBase, control, "add");
  height = groundStoreFloat(machine, linked, "VHGNDpy", height);

  const secondPosition = upper ? value(memory, linked, "VHGNDfz") : 16384 - value(memory, linked, "VHGNDfz");
  factor = scalarBinaryNumber(secondPosition, inverse, control, "multiply");
  writeFloat64(memory, address(linked, "FT0"), factor);
  const secondBase = value(memory, linked, upper ? "VHGNDh1i" : "VHGNDh3i");
  let addition = scalarBinaryNumber(
    value(memory, linked, upper ? "VHGNDh4i" : "VHGNDh2i") - secondBase,
    factor,
    control,
    "multiply",
  );
  addition = scalarBinaryNumber(addition, height, control, "add");
  groundStoreFloat(machine, linked, "VHGNDpy", addition);
}

function landedHeightChop(machine, linked) {
  const memory = machine.memory;
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "GRcwc") & 0xffff;
  memory[address(linked, "FI")] = convertToInt32(
    readNamedFloat32(memory, linked, "VHGNDpy"),
    fpu.control,
  );
  fpu.control = value(memory, linked, "GRcwn") & 0xffff;
}

function landedDenseAverage(machine, linked) {
  const memory = machine.memory;
  const base = value(memory, linked, "VHGNDdensebase") >>> 0;
  const index = value(memory, linked, "SUsi") | 0;
  let total = 0;
  for (const row of [-320, 0, 320, 640]) {
    for (let column = 0; column < 4; column += 1) {
      total += memory[base + index + row + column] & 0xff;
    }
  }
  memory[base + index] = total >>> 4;
}

function landedMushroomPixels(machine, linked) {
  const memory = machine.memory;
  const page = address(linked, "RADPT");
  let remaining = value(memory, linked, "VHGNDmushinner") >>> 0;
  const colorMask = value(memory, linked, "VHGNDmushcolmask");
  while (remaining !== 0) {
    const y = value(memory, linked, "GCy") + landedFastRandom(machine, linked, 7);
    const x = value(memory, linked, "GCx") + landedFastRandom(machine, linked, 7);
    const offset = Math.imul(y, 320) + x;
    memory[address(linked, "VHGNDmushoff")] = offset;
    const color = landedFastRandom(machine, linked, colorMask) + value(memory, linked, "VHGNDmushbase");
    for (const displacement of [0, 1, -1, 320, -320, -640]) {
      memory[page + offset + displacement] = color;
    }
    remaining -= 1;
  }
  memory[address(linked, "VHGNDmushinner")] = 0;
  machine.A = 0;
}

function landedMushroomPoint(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const mask = value(memory, linked, "VHGNDmushscale");
  for (const [source, destination, slot] of [
    ["VHGNDmushzf", "VHGNDmushpzf", 520],
    ["VHGNDmushyf", "VHGNDmushpyf", 512],
    ["VHGNDmushxf", "VHGNDmushpxf", 504],
  ]) {
    const random = landedFastRandom(machine, linked, mask);
    writeFloat64(memory, address(linked, "FB0"), random);
    let result = scalarBinaryNumber(
      readNamedFloat32(memory, linked, source),
      random,
      control,
      "subtract",
    );
    writeScalarScratch(machine, linked, result);
    result = groundStoreFloat(machine, linked, destination, result);
    writeFloat64(memory, floats + slot, result);
  }
}

function landedMushroomSetup(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const addend = value(memory, linked, "VHGNDtmp");
  for (const name of ["VHGNDmushxf", "VHGNDmushyf", "VHGNDmushzf"]) {
    writeFloat64(memory, address(linked, "FB0"), readNamedFloat32(memory, linked, name));
    writeScalarScratch(machine, linked, addend);
    let result = scalarBinaryNumber(addend, readNamedFloat32(memory, linked, name), control, "add");
    writeScalarScratch(machine, linked, result);
    result = groundStoreFloat(machine, linked, name, result);
    writeScalarScratch(machine, linked, result);
  }
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "GRcwc") & 0xffff;
  for (const [source, destination] of [
    ["VHGNDmushxf", "VHGNDmushx"],
    ["VHGNDmushyf", "VHGNDmushy"],
    ["VHGNDmushzf", "VHGNDmushz"],
  ]) memory[address(linked, destination)] = convertToInt32(readNamedFloat32(memory, linked, source), fpu.control);
  memory[address(linked, "PGFt")] = value(memory, linked, "VHGNDmushzf");
  fpu.control = value(memory, linked, "GRcwn") & 0xffff;
  writeScalarScratch(machine, linked, readNamedFloat32(memory, linked, "VHGNDmushzf"));
}

function landedFloatMultiply(machine, linked, left, right, destination, extra = null) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, left),
    typeof right === "number" ? right : readNamedFloat32(memory, linked, right),
    control,
    "multiply",
  );
  if (extra) result = scalarBinaryNumber(
    result,
    readFloat64(memory, address(linked, extra)),
    control,
    "multiply",
  );
  groundStoreFloat(machine, linked, destination, result);
}

function landedTreeGiantWidths(machine, linked) {
  const multiplier = value(machine.memory, linked, "GRtreeci");
  const half = readFloat64(machine.memory, address(linked, "GRK050L"));
  for (const [source, destination] of [
    ["GRbranchwidthf", "VHTwidthf"],
    ["GRtreepeakf", "VHTpeakf"],
  ]) {
    const first = scalarBinaryNumber(
      readNamedFloat32(machine.memory, linked, source),
      multiplier,
      floatingPoint(machine).control,
      "multiply",
    );
    groundStoreFloat(machine, linked, destination, scalarBinaryNumber(
      first, half, floatingPoint(machine).control, "multiply",
    ));
  }
}

function landedTreeSeedSum(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHGNDtreebxf"),
    readNamedFloat32(memory, linked, "VHGNDtreebyf"),
    control,
    "add",
  );
  result = scalarBinaryNumber(result, readNamedFloat32(memory, linked, "VHGNDtreebzf"), control, "add");
  result = scalarBinaryNumber(result, value(memory, linked, "VHGNDh1"), control, "add");
  writeScalarScratch(machine, linked, result);
}

function landedTreeRange(machine, linked, factorName) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHGNDtreescalef"),
    readNamedFloat32(memory, linked, "VHTpeakf"),
    control,
    "multiply",
  );
  result = scalarBinaryNumber(
    result,
    readFloat64(memory, address(linked, factorName)),
    control,
    "multiply",
  );
  groundStoreFloat(machine, linked, "VHGNDtreerangef", result);
}

function landedTreeEndpoint(machine, linked) {
  const memory = machine.memory;
  const angle = readNamedFloat32(memory, linked, "VHGNDtreeangle");
  const range = readNamedFloat32(memory, linked, "VHGNDtreerangef");
  groundStoreFloat(machine, linked, "VHGNDtreeexf", scalarBinaryNumber(
    scalarBinaryNumber(Math.cos(angle), range, floatingPoint(machine).control, "multiply"),
    readNamedFloat32(memory, linked, "VHGNDtreebxf"),
    floatingPoint(machine).control,
    "add",
  ));
  groundStoreFloat(machine, linked, "VHGNDtreeezf", scalarBinaryNumber(
    scalarBinaryNumber(Math.sin(angle), range, floatingPoint(machine).control, "multiply"),
    readNamedFloat32(memory, linked, "VHGNDtreebzf"),
    floatingPoint(machine).control,
    "add",
  ));
}

function landedTreeEndpointPi(machine, linked) {
  const memory = machine.memory;
  groundStoreFloat(machine, linked, "VHGNDtreeexf", scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHGNDtreebxf"),
    readNamedFloat32(memory, linked, "VHGNDtreerangef"),
    floatingPoint(machine).control,
    "subtract",
  ));
}

function landedTreeHeight(machine, linked, root) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let offset;
  if (root) {
    offset = scalarBinaryNumber(
      readNamedFloat32(memory, linked, "GRtreefl"),
      readNamedFloat32(memory, linked, "GRrootheightf"),
      control,
      "multiply",
    );
    offset = scalarBinaryNumber(offset, readFloat64(memory, address(linked, "GRK010L")), control, "add");
    offset = scalarBinaryNumber(offset, readNamedFloat32(memory, linked, "VHGNDtreescalef"), control, "multiply");
  } else {
    offset = scalarBinaryNumber(
      readNamedFloat32(memory, linked, "GRtreefl"),
      readFloat64(memory, address(linked, "GRK025L")),
      control,
      "add",
    );
    offset = scalarBinaryNumber(offset, readNamedFloat32(memory, linked, "VHGNDtreescalef"), control, "multiply");
    offset = scalarBinaryNumber(offset, readFloat64(memory, address(linked, "GRK025L")), control, "multiply");
  }
  groundStoreFloat(machine, linked, "VHGNDtreeeyf", scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHGNDtreebyf"),
    offset,
    control,
    "subtract",
  ));
}

function landedTreeRadii(machine, linked) {
  landedFloatMultiply(machine, linked, "VHGNDtreescalef", "VHTreducf", "VHTnextscf");
  landedFloatMultiply(machine, linked, "VHGNDtreescalef", "VHTwidthf", "VHGNDtreebr");
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let result = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHTreducf"),
    readNamedFloat32(memory, linked, "VHGNDtreescalef"),
    control,
    "multiply",
  );
  result = scalarBinaryNumber(result, readNamedFloat32(memory, linked, "VHTwidthf"), control, "multiply");
  groundStoreFloat(machine, linked, "VHGNDtreeer", result);
}

function landedTreeTerminal(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const randomFloat = () => {
    const random = landedFastRandom(machine, linked, 32767);
    memory[address(linked, "GRtreeci")] = random;
    const result = scalarBinaryNumber(
      random,
      readFloat64(memory, address(linked, "GRKFL0")),
      control,
      "multiply",
    );
    groundStoreFloat(machine, linked, "GRtreefl", result);
    return result;
  };
  let delta = scalarBinaryNumber(
    randomFloat(), readNamedFloat32(memory, linked, "VHGNDtreerangef"), control, "multiply",
  );
  writeScalarScratch(machine, linked, delta);
  let accumulator = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHGNDtreebxf"), delta, control, "add",
  );
  writeFloat64(memory, address(linked, "GRtreeacc0"), accumulator);
  delta = scalarBinaryNumber(
    randomFloat(), readNamedFloat32(memory, linked, "VHGNDtreerangef"), control, "multiply",
  );
  writeScalarScratch(machine, linked, delta);
  groundStoreFloat(machine, linked, "VHGNDtreeleafx", scalarBinaryNumber(
    accumulator, delta, control, "subtract",
  ));

  delta = scalarBinaryNumber(
    randomFloat(), readNamedFloat32(memory, linked, "VHGNDtreerangef"), control, "multiply",
  );
  writeScalarScratch(machine, linked, delta);
  accumulator = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHGNDtreebzf"), delta, control, "add",
  );
  writeFloat64(memory, address(linked, "GRtreeacc0"), accumulator);
  delta = scalarBinaryNumber(
    randomFloat(), readNamedFloat32(memory, linked, "VHGNDtreerangef"), control, "multiply",
  );
  writeScalarScratch(machine, linked, delta);
  groundStoreFloat(machine, linked, "VHGNDtreeleafz", scalarBinaryNumber(
    accumulator, delta, control, "subtract",
  ));

  delta = scalarBinaryNumber(
    randomFloat(), readNamedFloat32(memory, linked, "VHGNDtreescalef"), control, "multiply",
  );
  writeScalarScratch(machine, linked, delta);
  groundStoreFloat(machine, linked, "VHGNDtreeleafdrop", scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHGNDtreebyf"), delta, control, "subtract",
  ));
  const radius = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHGNDtreescalef"),
    readNamedFloat32(memory, linked, "VHTwidthf"),
    control,
    "multiply",
  );
  writeScalarScratch(machine, linked, radius);
  groundStoreFloat(machine, linked, "VHGNDtreebr", radius);
  writeScalarScratch(machine, linked, readNamedFloat32(memory, linked, "VHGNDtreebr"));
  memory[address(linked, "FS0")] = value(memory, linked, "VHGNDtreebr");
}

function landedTreeNodeLoad(machine, linked) {
  const memory = machine.memory;
  const level = value(memory, linked, "VHGNDtreelevel") >>> 0;
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "GRcwc") & 0xffff;
  for (const [stackName, floatName, integerName] of [
    ["VHGNDtsx", "VHGNDtreebxf", "VHGNDtreebx"],
    ["VHGNDtsy", "VHGNDtreebyf", "VHGNDtreeby"],
    ["VHGNDtsz", "VHGNDtreebzf", "VHGNDtreebz"],
    ["VHGNDtsscale", "VHGNDtreescalef", "VHGNDtreescale"],
  ]) {
    const bits = memory[address(linked, stackName) + level] | 0;
    memory[address(linked, floatName)] = bits;
    memory[address(linked, integerName)] = convertToInt32(float32FromBits(bits), fpu.control);
    if (floatName === "VHGNDtreescalef") memory[address(linked, "PGFt")] = bits;
  }
  fpu.control = value(memory, linked, "GRcwn") & 0xffff;
  writeScalarScratch(machine, linked, readNamedFloat32(memory, linked, "VHGNDtreescalef"));
  for (const [stackName, destination] of [
    ["VHGNDtslayers", "VHGNDtreelayers"],
    ["VHGNDtsroot", "VHGNDtreeisroot"],
    ["VHGNDtsocc", "VHGNDtreeocc"],
  ]) memory[address(linked, destination)] = memory[address(linked, stackName) + level];
}

function landedTreeDirection(machine, linked) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  memory[address(linked, "PGFt")] = 0x40c90fdb;
  const circle = float32FromBits(0x40c90fdb);
  writeFloat64(memory, address(linked, "fw") + 496, circle);
  let step = scalarBinaryNumber(
    circle,
    value(memory, linked, "VHGNDtreebranches"),
    control,
    "divide",
  );
  writeScalarScratch(machine, linked, step);
  step = groundStoreFloat(machine, linked, "VHGNDtmp", step);
  memory[address(linked, "PGFt")] = value(memory, linked, "VHGNDtmp");
  let angle = scalarBinaryNumber(
    step,
    readFloat64(memory, address(linked, "GRK050L")),
    control,
    "multiply",
  );
  writeScalarScratch(machine, linked, angle);
  angle = groundStoreFloat(machine, linked, "VHGNDtreeangle", angle);
  let index = 0;
  const branch = value(memory, linked, "VHGNDtreebranch") >>> 0;
  while (index < branch) {
    writeFloat64(memory, address(linked, "fw") + 496, angle);
    writeFloat64(memory, address(linked, "fw") + 498, step);
    angle = scalarBinaryNumber(angle, step, control, "add");
    writeScalarScratch(machine, linked, angle);
    angle = groundStoreFloat(machine, linked, "VHGNDtreeangle", angle);
    index += 1;
  }
  memory[address(linked, "VHGNDvi")] = index;
}

function landedTreeVertex(machine, linked, leaf) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const index = value(memory, linked, "VHGNDvi") >>> 0;
  const range = readNamedFloat32(memory, linked, leaf ? "VHGNDtreerangef" : "VHGNDtreerad");
  const centerX = readNamedFloat32(memory, linked, leaf ? "VHGNDtreeleafx" : "VHGNDtreecx");
  const centerZ = readNamedFloat32(memory, linked, leaf ? "VHGNDtreeleafz" : "VHGNDtreecz");
  let x = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHVcos"), range, control, "multiply",
  );
  writeScalarScratch(machine, linked, x);
  x = scalarBinaryNumber(centerX, x, control, "add");
  writeScalarScratch(machine, linked, x);
  if (leaf) x = scalarBinaryNumber(
    x, readNamedFloat32(memory, linked, "VHGNDtreewindx"), control, "add",
  );
  writeScalarScratch(machine, linked, x);
  x = groundStoreFloat(machine, linked, "VHGNDtreepx", x);
  let z = scalarBinaryNumber(
    readNamedFloat32(memory, linked, "VHVsin"), range, control, "multiply",
  );
  writeScalarScratch(machine, linked, z);
  z = scalarBinaryNumber(centerZ, z, control, "add");
  writeScalarScratch(machine, linked, z);
  if (leaf) z = scalarBinaryNumber(
    z, readNamedFloat32(memory, linked, "VHGNDtreewindz"), control, "add",
  );
  writeScalarScratch(machine, linked, z);
  z = groundStoreFloat(machine, linked, "VHGNDtreepz", z);
  writeFloat64(memory, floats + 504 + index * 2, x);
  writeFloat64(memory, floats + 512 + index * 2, readNamedFloat32(
    memory, linked, leaf ? "VHGNDtreeleafdrop" : "VHGNDtreecy",
  ));
  writeFloat64(memory, floats + 520 + index * 2, z);
  memory[address(linked, "VHGNDvi")] = index + 1;
}

function landedDistance(machine, linked, dx, dz) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  writeScalarScratch(machine, linked, dx);
  const dx2 = scalarBinaryNumber(dx, dx, control, "multiply");
  writeFloat64(memory, address(linked, "FT0"), dx2);
  writeScalarScratch(machine, linked, dz);
  const dz2 = scalarBinaryNumber(dz, dz, control, "multiply");
  writeScalarScratch(machine, linked, dz2);
  const sum = scalarBinaryNumber(dz2, dx2, control, "add");
  writeScalarScratch(machine, linked, sum);
  const distance = Math.sqrt(sum);
  writeScalarScratch(machine, linked, distance);
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "GRcwc") & 0xffff;
  memory[address(linked, "FI")] = convertToInt32(distance, fpu.control);
  fpu.control = value(memory, linked, "GRcwn") & 0xffff;
  return memory[address(linked, "FI")] | 0;
}

function landedTileDistance(machine, linked) {
  landedDistance(
    machine,
    linked,
    value(machine.memory, linked, "VHGNDdx"),
    value(machine.memory, linked, "VHGNDdz"),
  );
}

function landedTileAdmission(machine, linked) {
  const memory = machine.memory;
  const x = value(memory, linked, "VHGNDx");
  const z = value(memory, linked, "VHGNDz");
  const manhattan = Math.abs(value(memory, linked, "VHGNDcamtx") - x)
    + Math.abs(value(memory, linked, "VHGNDcamtz") - z);
  memory[address(linked, "VHGNDmanhattan")] = manhattan;
  if (manhattan > 90) return;
  memory[address(linked, "VHGNDh1")] = Math.imul(z, 200) + x;
  const dx = value(memory, linked, "VHGNDcamx") - ((x << 14) + 8192);
  const dz = value(memory, linked, "VHGNDcamz") - ((z << 14) + 8192);
  memory[address(linked, "VHGNDdx")] = dx;
  memory[address(linked, "VHGNDdz")] = dz;
  const distance = landedDistance(machine, linked, dx, dz);
  const raw = distance >> 14;
  memory[address(linked, "VHGNDrawdepth")] = raw;
  memory[address(linked, "VHGNDdepth")] = Math.max(raw - 1, 0);
}

function landedTerrainTriangle(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const x0 = value(memory, linked, "VHGNDx") << 14;
  const z0 = value(memory, linked, "VHGNDz") << 14;
  const step = value(memory, linked, "VHGNDlodstep") << 14;
  const x1 = x0 + step;
  const z1 = z0 + step;
  const triangle = value(memory, linked, "VHGNDvctri");
  const vertices = triangle === 0
    ? [[x0, value(memory, linked, "VHGNDs1"), z0], [x1, value(memory, linked, "VHGNDs2"), z0], [x0, value(memory, linked, "VHGNDs4"), z1]]
    : [[x1, value(memory, linked, "VHGNDs2"), z0], [x1, value(memory, linked, "VHGNDs3"), z1], [x0, value(memory, linked, "VHGNDs4"), z1]];
  vertices.forEach(([x, height, z], index) => {
    writeFloat64(memory, floats + 504 + index * 2, x);
    writeFloat64(memory, floats + 512 + index * 2, -(height << 11));
    writeFloat64(memory, floats + 520 + index * 2, z);
  });
  const finalY = readFloat64(memory, floats + 516);
  writeScalarScratch(machine, linked, finalY);
  memory[address(linked, "VHGNDvv")] = memory[address(linked, "FA0")];
  memory[address(linked, "VHGNDvi")] = 2;
  memory[address(linked, "VHGNDvslot")] = 256;
  memory[address(linked, "PGFi")] = 258;
}

function landedVertexLoad(machine, linked) {
  const memory = machine.memory;
  const input = value(memory, linked, "FI");
  writeScalarScratch(machine, linked, input);
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const slot = value(memory, linked, "VHGNDvslot") + value(memory, linked, "VHGNDvi");
  memory[address(linked, "PGFi")] = slot;
  writeFloat64(memory, floats + slot * 2, input);
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

function readNamedFloat32(memory, linked, name) {
  return float32FromBits(value(memory, linked, name));
}

function writeNamedFloat32(machine, linked, name, number) {
  machine.memory[address(linked, name)] = float32Bits(roundFloat32(
    number,
    floatingPoint(machine).control,
  ));
}

function surfaceStack(machine) {
  return floatingPoint(machine).stack;
}

function surfacePushNumber(machine, number) {
  surfaceStack(machine).push(extendedFromNumber(number));
}

function surfacePushInteger(machine, number) {
  surfaceStack(machine).push(extendedFromInteger(number));
}

function surfacePop(machine) {
  const result = surfaceStack(machine).pop();
  if (!result) throw new Error("Noctis surface x87 stack underflow");
  return result;
}

function surfaceTop(machine) {
  const stack = surfaceStack(machine);
  if (!stack.length) throw new Error("Noctis surface x87 stack underflow");
  return stack[stack.length - 1];
}

function surfaceSetTop(machine, result) {
  const stack = surfaceStack(machine);
  if (!stack.length) throw new Error("Noctis surface x87 stack underflow");
  stack[stack.length - 1] = result;
}

function surfaceStoreFloat32(machine, linked, name, result = surfacePop(machine)) {
  writeNamedFloat32(
    machine,
    linked,
    name,
    extendedToNumber(result, floatingPoint(machine).control),
  );
}

function surfaceStoreInt64(machine, linked, control) {
  const memory = machine.memory;
  const result = BigInt.asIntN(64, extendedToBigInt(surfacePop(machine), control));
  const unsigned = BigInt.asUintN(64, result);
  const destination = address(linked, "SUq0");
  memory[destination] = Number(unsigned & 0xffffffffn) | 0;
  memory[destination + 1] = Number(unsigned >> 32n) | 0;
}

function surfaceChopInt64(machine, linked) {
  const fpu = floatingPoint(machine);
  fpu.control = value(machine.memory, linked, "SUcwc") & 0xffff;
  surfaceStoreInt64(machine, linked, fpu.control);
  fpu.control = value(machine.memory, linked, "SUcwn") & 0xffff;
}

function surfaceNearInt64(machine, linked) {
  surfaceStoreInt64(machine, linked, floatingPoint(machine).control);
}

function surfacePushDouble(machine, linked, name) {
  surfacePushNumber(machine, readFloat64(machine.memory, address(linked, name)));
}

function surfaceSeedAdd4112(machine, linked) {
  const control = floatingPoint(machine).control;
  surfacePushDouble(machine, linked, "SUsv0");
  surfaceSetTop(machine, extendedAdd(
    surfaceTop(machine),
    extendedFromNumber(readFloat64(machine.memory, address(linked, "K4112A"))),
    control,
  ));
}

function surfaceSeedTimes10(machine, linked) {
  const control = floatingPoint(machine).control;
  surfacePushDouble(machine, linked, "SUsv0");
  surfaceSetTop(machine, extendedMultiply(
    surfaceTop(machine),
    extendedFromNumber(readFloat64(machine.memory, address(linked, "K10A"))),
    control,
  ));
}

function surfaceSecondsDivideInt(machine, linked) {
  const control = floatingPoint(machine).control;
  const numerator = extendedFromNumber(readFloat64(machine.memory, address(linked, "SUsec0")));
  surfaceStack(machine).push(extendedDivide(
    numerator,
    extendedFromInteger(value(machine.memory, linked, "SUia")),
    control,
  ));
}

function surfaceSecondsLoad(machine, linked) {
  surfacePushDouble(machine, linked, "SUsec0");
}

function surfaceSecondsMultiply(machine, linked, constantName) {
  const control = floatingPoint(machine).control;
  const seconds = extendedFromNumber(readFloat64(machine.memory, address(linked, "SUsec0")));
  const factor = extendedFromNumber(readFloat64(machine.memory, address(linked, constantName)));
  surfaceStack(machine).push(extendedMultiply(seconds, factor, control));
}

function surfaceAngleAdd(machine, linked, constantName) {
  const control = floatingPoint(machine).control;
  const angle = extendedFromNumber(readNamedFloat32(machine.memory, linked, "SFa"));
  const addend = extendedFromNumber(readFloat64(machine.memory, address(linked, constantName)));
  surfaceStoreFloat32(machine, linked, "SFa", extendedAdd(angle, addend, control));
}

function surfaceAngleFromInt(machine, linked) {
  const control = floatingPoint(machine).control;
  const result = extendedMultiply(
    extendedFromInteger(value(machine.memory, linked, "SUia")),
    extendedFromNumber(readFloat64(machine.memory, address(linked, "KDEG0"))),
    control,
  );
  surfaceStoreFloat32(machine, linked, "SFa", result);
}

function surfaceAngleAddInt(machine, linked) {
  const control = floatingPoint(machine).control;
  let result = extendedMultiply(
    extendedFromInteger(value(machine.memory, linked, "SUia")),
    extendedFromNumber(readFloat64(machine.memory, address(linked, "KDEG0"))),
    control,
  );
  result = extendedAdd(
    result,
    extendedFromNumber(readNamedFloat32(machine.memory, linked, "SFa")),
    control,
  );
  surfaceStoreFloat32(machine, linked, "SFa", result);
}

function surfaceIntDivide30(machine, linked) {
  const control = floatingPoint(machine).control;
  surfaceStoreFloat32(machine, linked, "SFa", extendedDivide(
    extendedFromInteger(value(machine.memory, linked, "SUia")),
    extendedFromNumber(readFloat64(machine.memory, address(linked, "K30A"))),
    control,
  ));
}

function surfaceTrigRadius(machine, linked, operation) {
  const control = floatingPoint(machine).control;
  const angle = readNamedFloat32(machine.memory, linked, "SFa");
  const trig = operation === "cos" ? Math.cos(angle) : Math.sin(angle);
  surfaceStack(machine).push(extendedMultiply(
    extendedFromNumber(trig),
    extendedFromInteger(value(machine.memory, linked, "SUmi")),
    control,
  ));
}

function surfaceStackAddInt(machine, linked) {
  surfaceSetTop(machine, extendedAdd(
    surfaceTop(machine),
    extendedFromInteger(value(machine.memory, linked, "SUia")),
    floatingPoint(machine).control,
  ));
}

function surfaceAdvance(machine, linked, operation, destinationName) {
  const control = floatingPoint(machine).control;
  const angle = readNamedFloat32(machine.memory, linked, "SFa");
  const trig = operation === "cos" ? Math.cos(angle) : Math.sin(angle);
  let result = extendedMultiply(
    extendedFromNumber(trig),
    extendedFromNumber(readNamedFloat32(machine.memory, linked, "KFKF")),
    control,
  );
  result = extendedAdd(
    result,
    extendedFromNumber(readNamedFloat32(machine.memory, linked, destinationName)),
    control,
  );
  surfaceStoreFloat32(machine, linked, destinationName, result);
}

function surfaceCenterFloats(machine, linked) {
  writeNamedFloat32(machine, linked, "SFpx", value(machine.memory, linked, "SUcxi"));
  writeNamedFloat32(machine, linked, "SFpy", value(machine.memory, linked, "SUcyi"));
}

function surfaceLoadFloat(machine, linked, name) {
  surfacePushNumber(machine, readNamedFloat32(machine.memory, linked, name));
}

function surfaceLinearFloat(machine, linked, divisorName, addendName, destinationName) {
  const control = floatingPoint(machine).control;
  let result = extendedDivide(
    extendedFromInteger(value(machine.memory, linked, "SUia")),
    extendedFromNumber(readFloat64(machine.memory, address(linked, divisorName))),
    control,
  );
  result = extendedAdd(
    result,
    extendedFromNumber(readFloat64(machine.memory, address(linked, addendName))),
    control,
  );
  surfaceStoreFloat32(machine, linked, destinationName, result);
}

function surfaceIntToNamedFloat(machine, linked, destinationName) {
  writeNamedFloat32(machine, linked, destinationName, value(machine.memory, linked, "SUia"));
}

function surfaceWave(machine, linked) {
  const control = floatingPoint(machine).control;
  let result = extendedMultiply(
    extendedFromInteger(value(machine.memory, linked, "SUpx")),
    extendedFromNumber(readNamedFloat32(machine.memory, linked, "SFa")),
    control,
  );
  result = extendedFromNumber(Math.sin(extendedToNumber(result, control)));
  result = extendedMultiply(
    result,
    extendedFromInteger(value(machine.memory, linked, "SUcr")),
    control,
  );
  surfaceStack(machine).push(result);
}

function paletteScale(machine, linked, constantName) {
  const control = floatingPoint(machine).control;
  surfaceStoreFloat32(machine, linked, "SFtmp", extendedMultiply(
    extendedFromNumber(readNamedFloat32(machine.memory, linked, "SFtmp")),
    extendedFromNumber(readFloat64(machine.memory, address(linked, constantName))),
    control,
  ));
}

function paletteShadeScale(machine, linked) {
  const control = floatingPoint(machine).control;
  surfaceStoreFloat32(machine, linked, "SFk", extendedDivide(
    extendedFromNumber(readFloat64(machine.memory, address(linked, "K1A"))),
    extendedFromInteger(value(machine.memory, linked, "SUSHn")),
    control,
  ));
}

function paletteShadeDeltas(machine, linked) {
  const control = floatingPoint(machine).control;
  const scale = extendedFromNumber(readNamedFloat32(machine.memory, linked, "SFk"));
  for (const [finish, start, destination] of [
    ["SFfr", "SFsr", "SFdr"],
    ["SFfg", "SFsg", "SFdg"],
    ["SFfb", "SFsb", "SFdb"],
  ]) {
    const delta = extendedSubtract(
      extendedFromNumber(readNamedFloat32(machine.memory, linked, finish)),
      extendedFromNumber(readNamedFloat32(machine.memory, linked, start)),
      control,
    );
    surfaceStoreFloat32(machine, linked, destination, extendedMultiply(delta, scale, control));
  }
}

function flareSaveControl(machine, linked) {
  machine.memory[address(linked, "FCWCSAV")] = (floatingPoint(machine).control | 0x40) & 0xffff;
}

function flareSpokeDelta(machine, linked) {
  const memory = machine.memory;
  const fpu = floatingPoint(machine);
  fpu.control = value(memory, linked, "FCWCHOP") & 0xffff;
  const factor = extendedFromNumber(readFloat64(memory, address(linked, "VHFk0")));
  const length = extendedFromNumber(readFloat64(memory, address(linked, "VHFl0")));
  for (const [input, output] of [["VHVcos", "VHFdx"], ["VHVsin", "VHFdy"]]) {
    let result = extendedMultiply(
      extendedFromNumber(readNamedFloat32(memory, linked, input)),
      factor,
      fpu.control,
    );
    result = extendedMultiply(result, length, fpu.control);
    memory[address(linked, output)] = convertToInt32(extendedToNumber(result, fpu.control), fpu.control);
  }
  fpu.control = value(memory, linked, "FCWCSAV") & 0xffff;
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
  const implementations = {
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
    [SERVICE_IDS.framebufferDigit]: framebufferDigit,
    [SERVICE_IDS.alphaDim]: alphaDim,
    [SERVICE_IDS.antialiasingDim]: antialiasingDim,
    [SERVICE_IDS.clearLayer]: clearLayer,
    [SERVICE_IDS.clearLayerRegion]: clearLayerRegion,
    [SERVICE_IDS.copyLayer]: copyLayer,
    [SERVICE_IDS.copyLayerRegion]: copyLayerRegion,
    [SERVICE_IDS.compareFloat64]: compareFloat64Service,
    [SERVICE_IDS.spaceClear]: spaceClear,
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
    [IDS.surfaceChopInt64]: surfaceChopInt64,
    [IDS.surfaceNearInt64]: surfaceNearInt64,
    [IDS.surfaceSeedAdd4112]: surfaceSeedAdd4112,
    [IDS.surfaceSeedTimes10]: surfaceSeedTimes10,
    [IDS.surfaceSecondsDivideInt]: surfaceSecondsDivideInt,
    [IDS.surfaceSecondsLoad]: surfaceSecondsLoad,
    [IDS.surfaceSecondsTimes10]: (machine, linked) => surfaceSecondsMultiply(machine, linked, "K10A"),
    [IDS.surfaceSecondsTimes60]: (machine, linked) => surfaceSecondsMultiply(machine, linked, "K60A"),
    [IDS.surfaceAngleAdd4]: (machine, linked) => surfaceAngleAdd(machine, linked, "K4DEG0"),
    [IDS.surfaceAngleAdd6]: (machine, linked) => surfaceAngleAdd(machine, linked, "K6DEG0"),
    [IDS.surfaceAngleFromInt]: surfaceAngleFromInt,
    [IDS.surfaceAngleAddInt]: surfaceAngleAddInt,
    [IDS.surfaceIntDivide30]: surfaceIntDivide30,
    [IDS.surfaceCosineRadius]: (machine, linked) => surfaceTrigRadius(machine, linked, "cos"),
    [IDS.surfaceSineRadius]: (machine, linked) => surfaceTrigRadius(machine, linked, "sin"),
    [IDS.surfaceStackAddInt]: surfaceStackAddInt,
    [IDS.surfaceAdvanceX]: (machine, linked) => surfaceAdvance(machine, linked, "cos", "SFpx"),
    [IDS.surfaceAdvanceY]: (machine, linked) => surfaceAdvance(machine, linked, "sin", "SFpy"),
    [IDS.surfaceCenterFloats]: surfaceCenterFloats,
    [IDS.surfaceLoadY]: (machine, linked) => surfaceLoadFloat(machine, linked, "SFpy"),
    [IDS.surfaceLoadX]: (machine, linked) => surfaceLoadFloat(machine, linked, "SFpx"),
    [IDS.surfaceKt]: (machine, linked) => surfaceLinearFloat(machine, linked, "K900A", "K06A", "SFkt"),
    [IDS.surfaceKq]: (machine, linked) => surfaceLinearFloat(machine, linked, "K100A", "K40A", "SFkq"),
    [IDS.surfaceThresholdFloat]: (machine, linked) => surfaceIntToNamedFloat(machine, linked, "SFth"),
    [IDS.surfaceAngleFloat]: (machine, linked) => surfaceIntToNamedFloat(machine, linked, "SFa"),
    [IDS.surfaceLoadAngle]: (machine, linked) => surfaceLoadFloat(machine, linked, "SFa"),
    [IDS.surfaceWave]: surfaceWave,
    [IDS.paletteIntToFloat]: (machine, linked) => surfaceIntToNamedFloat(machine, linked, "SFtmp"),
    [IDS.paletteQuarter]: (machine, linked) => paletteScale(machine, linked, "K025A"),
    [IDS.paletteThreeQuarters]: (machine, linked) => paletteScale(machine, linked, "K075A"),
    [IDS.paletteFiveQuarters]: (machine, linked) => paletteScale(machine, linked, "K125A"),
    [IDS.paletteShadeScale]: paletteShadeScale,
    [IDS.paletteShadeDeltas]: paletteShadeDeltas,
    [IDS.paletteLoadShade]: (machine, linked) => surfaceLoadFloat(machine, linked, "SFtmp"),
    [IDS.flareSaveControl]: flareSaveControl,
    [IDS.flareSpokeDelta]: flareSpokeDelta,
    [IDS.projectMappedPolygon]: projectMappedPolygon,
    [IDS.projectMappedPoint]: projectMappedPoint,
    [IDS.terrainFacingDot]: terrainFacingDot,
    [IDS.triangleMidpoint]: (machine, linked) => polygonMidpoint(machine, linked, 3),
    [IDS.quadMidpoint]: (machine, linked) => polygonMidpoint(machine, linked, 4),
    [IDS.transformMappedVertices]: transformMappedVertices,
    [IDS.prepareTriangleVectors]: (machine, linked) => preparePolygonVectors(machine, linked, 2),
    [IDS.prepareQuadVectors]: (machine, linked) => preparePolygonVectors(machine, linked, 3),
    [IDS.scalePolygonBasis]: scalePolygonBasis,
    [IDS.doublePolygonBasis]: doublePolygonBasis,
    [IDS.mappedFacing]: mappedFacing,
    [IDS.polygonGradients]: polygonGradients,
    [IDS.polygonCrossGradient]: polygonCrossGradient,
    [IDS.terrainTraceRow]: terrainTraceRow,
    [IDS.terrainEdgeRows]: terrainEdgeRows,
    [IDS.polygonEdges]: polygonEdges,
    [IDS.terrainUvNext]: terrainUvNext,
    [IDS.groundTreePeakHigh]: (machine, linked) => groundTreeAffine(
      machine, linked, "GRK090L", "GRK010L", "GRtreepeakf",
    ),
    [IDS.groundTreePeakLow]: (machine, linked) => groundTreeAdd(
      machine, linked, "GRK075L", "GRtreepeakf",
    ),
    [IDS.groundTreeDrawAccumulator]: groundTreeDrawAccumulator,
    [IDS.groundTreeScale]: (machine, linked) => groundTreeDifference(
      machine, linked, value(machine.memory, linked, "GRtreeci"), "GRtreescalef",
    ),
    [IDS.groundTreeSpreadAccumulator]: groundTreeSpreadAccumulator,
    [IDS.groundTreeSpread]: (machine, linked) => groundTreeDifference(
      machine,
      linked,
      readFloat64(machine.memory, address(linked, "GRK050L")),
      "GRtreespreadf",
    ),
    [IDS.groundBranchWidth]: (machine, linked) => groundTreeAffine(
      machine, linked, "GRK015L", "GRK005L", "GRbranchwidthf",
    ),
    [IDS.groundRootHeight]: (machine, linked) => groundTreeAdd(
      machine, linked, "GRK005L", "GRrootheightf",
    ),
    [IDS.groundTreeFlandom]: groundTreeFlandom,
    [IDS.groundRoundHillRadius]: groundRoundHillRadius,
    [IDS.groundRoundHillDx]: groundRoundHillDx,
    [IDS.groundRoundHillProfile]: groundRoundHillProfile,
    [IDS.groundAddSurfaceValue]: groundAddSurfaceValue,
    [IDS.groundSubtract127]: (machine, linked) => groundSubtractToScratch(
      machine, linked, "GRK127L",
    ),
    [IDS.groundMirror254]: groundMirror254,
    [IDS.groundSubtractMaximum]: groundSubtractMaximum,
    [IDS.groundChopHeight]: groundChopHeight,
    [IDS.groundCraterHeight]: groundCraterHeight,
    [IDS.groundCraterRadius]: groundCraterRadius,
    [IDS.groundCraterProfile]: groundCraterProfile,
    [IDS.groundCraterPower]: groundCraterPower,
    [IDS.groundSubtractLimit]: (machine, linked) => groundSubtractToScratch(
      machine, linked, "GRfscl", true,
    ),
    [IDS.groundLimitFloat]: groundLimitFloat,
    [IDS.landedRotationSeed]: landedRotationSeed,
    [IDS.landedHeightLower]: (machine, linked) => landedHeightTriangle(machine, linked, false),
    [IDS.landedHeightUpper]: (machine, linked) => landedHeightTriangle(machine, linked, true),
    [IDS.landedHeightChop]: landedHeightChop,
    [IDS.landedDenseAverage]: landedDenseAverage,
    [IDS.landedMushroomPixels]: landedMushroomPixels,
    [IDS.landedMushroomPoint]: landedMushroomPoint,
    [IDS.landedMushroomSetup]: landedMushroomSetup,
    [IDS.landedTreePeakDouble]: (machine, linked) => landedFloatMultiply(
      machine, linked, "GRtreepeakf", value(machine.memory, linked, "GRtreeci"), "VHTpeakf",
    ),
    [IDS.landedTreePeakHalf]: (machine, linked) => landedFloatMultiply(
      machine, linked, "GRtreepeakf", 1, "VHTpeakf", "GRK050L",
    ),
    [IDS.landedTreeScaleDouble]: (machine, linked) => landedFloatMultiply(
      machine, linked, "GRtreescalef", value(machine.memory, linked, "GRtreeci"), "VHGNDtreescalef",
    ),
    [IDS.landedTreeGiantWidths]: landedTreeGiantWidths,
    [IDS.landedTreeSeedSum]: landedTreeSeedSum,
    [IDS.landedTreeRootRange]: (machine, linked) => landedTreeRange(machine, linked, "GRK020L"),
    [IDS.landedTreeChildRange]: (machine, linked) => landedTreeRange(machine, linked, "GRK050L"),
    [IDS.landedTreeEndpoint]: landedTreeEndpoint,
    [IDS.landedTreeEndpointPi]: landedTreeEndpointPi,
    [IDS.landedTreeRootHeight]: (machine, linked) => landedTreeHeight(machine, linked, true),
    [IDS.landedTreeChildHeight]: (machine, linked) => landedTreeHeight(machine, linked, false),
    [IDS.landedTreeRadii]: landedTreeRadii,
    [IDS.landedTreeTerminal]: landedTreeTerminal,
    [IDS.landedTreeNodeLoad]: landedTreeNodeLoad,
    [IDS.landedTreeDirection]: landedTreeDirection,
    [IDS.landedTreeLeafVertex]: (machine, linked) => landedTreeVertex(machine, linked, true),
    [IDS.landedTreePolarVertex]: (machine, linked) => landedTreeVertex(machine, linked, false),
    [IDS.landedTileDistance]: landedTileDistance,
    [IDS.landedTileAdmission]: landedTileAdmission,
    [IDS.landedTerrainTriangle]: landedTerrainTriangle,
    [IDS.landedVertexLoad]: landedVertexLoad,
    ...overrides,
  };
  for (const [id, inline] of Object.entries(PGF_SERVICE_INLINES)) {
    if (!Object.hasOwn(overrides, id)) implementations[id].inline = inline;
  }
  return implementations;
}
