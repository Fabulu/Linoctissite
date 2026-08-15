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
  scanNotEqual: "service:pgrepne",
  scanEqual: "service:pgrepe",
  databaseScan: "service:pgdbscan",
  copyCupolaPanel: "service:vhccopycachedpanel",
  drawStickLine: "service:vhsdrawline",
  rotateVertices: "service:pjrotate",
  rotateSelectedVertices: "service:pjrotateselected",
  projectMapGeneric: "service:pjprojectmapgenericservice",
  project3d: "service:pjproject3dservice",
  drawPolygon: "service:pgdrawb",
  poly3d: "service:pgpoly3d",
  polymap: "service:pgpolymap",
});

const symbolCaches = new WeakMap();
const dataViewCaches = new WeakMap();
const rasterAddressCaches = new WeakMap();
const poly3dAddressCaches = new WeakMap();
const polymapAddressCaches = new WeakMap();
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

function alphaDimInline(destination, source) {
  return `{
    const alphaDestination=(${destination})>>>0,alphaSource=(${source})|0,current=m[alphaDestination]|0;
    let blue=(current&255)-(alphaSource&255),green=(current&65280)-(alphaSource&65280),red=(current&16711680)-(alphaSource&16711680);
    if(blue<0)blue=0;if(green<0)green=0;if(red<0)red=0;
    C=(blue|green|red)|0;m[alphaDestination]=C;A=alphaDestination|0;B=alphaSource&16711680;D=green|0;E=red|0;
  }`;
}

function antialiasingDimInline(linked) {
  const width = address(linked, "Display Width");
  return `{
    const origin=A|0,source=B|0,width=m[${width}]|0,neighbour=((source&15790320)>>>4)|0;
    ${alphaDimInline("origin", "source")}
    ${alphaDimInline("origin-1", "neighbour")}
    ${alphaDimInline("origin+1", "neighbour")}
    ${alphaDimInline("origin-width", "neighbour")}
    ${alphaDimInline("origin+width", "neighbour")}
    A=origin;
  }`;
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

function compareFloat64Inline(linked) {
  const fa = address(linked, "FA0");
  const fb = address(linked, "FB0");
  const fsw = address(linked, "FSW");
  const flags = address(linked, "FFLG");
  const integer = address(linked, "FI");
  return `{
    const left=f64r(${fa}),right=f64r(${fb});
    q=Number.isNaN(left)||Number.isNaN(right)?17664:left<right?256:left===right?16384:0;
    m[${fsw}]=q;
    if(!machine.fpu)machine.fpu={control:895,status:0,stack:[]};
    machine.fpu.status=q;
    if((q&1024)!==0){m[${flags}]=(m[${flags}]|1);m[${integer}]=2;A=m[${flags}]|0;}
    else if((q&16384)!==0){m[${integer}]=0;A=q&16384;}
    else if((q&256)!==0){m[${integer}]=-1;A=-1;}
    else{m[${integer}]=1;A=0;}
  }`;
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

function scanService(machine, linked, repeatEqual) {
  if ((value(machine.memory, linked, "SCcx") >>> 0) === 0) return;
  machine.A = address(linked, "nw") | 0;
  scanPage(machine, linked, repeatEqual);
}

function scanInline(linked, repeatEqual) {
  const scCount = address(linked, "SCcx");
  const scOffset = address(linked, "SCdi");
  const expected = address(linked, "SCal");
  const zeroFlag = address(linked, "SCzf");
  const pgOffset = address(linked, "PGdi");
  const pgValue = address(linked, "PGval");
  const page = noctisBuffer(linked, "SADPT");
  const nw = address(linked, "nw");
  return `if((m[${scCount}]>>>0)!==0){A=${nw}|0;let count=m[${scCount}]>>>0,offset=m[${scOffset}]&65535,sample=0,equal=false,expected=m[${expected}]|0;do{sample=m[${page}+offset]&255;count=(count-1)>>>0;offset=(offset+1)&65535;equal=sample===expected;}while(count!==0&&equal===${repeatEqual});m[${pgOffset}]=(offset-1)&65535;m[${pgValue}]=sample;m[${zeroFlag}]=equal?1:0;m[${scOffset}]=offset;m[${scCount}]=count|0;}`;
}

function databaseScan(machine, linked) {
  const memory = machine.memory;
  const scOffset = address(linked, "SCdi");
  const zeroFlag = address(linked, "SCzf");
  const mode = address(linked, "DBmode");
  let accumulator = value(memory, linked, "DBdi");
  memory[scOffset] = accumulator;
  memory[address(linked, "SCcx")] = value(memory, linked, "DBbytes");
  memory[address(linked, "SCal")] = 255;
  memory[zeroFlag] = 0;
  memory[mode] = 0;
  scanService(machine, linked, false);
  accumulator = memory[zeroFlag] | 0;
  machine.A = accumulator;
  if (accumulator === 0) return;
  accumulator = memory[scOffset] | 0;
  machine.A = accumulator;
  memory[address(linked, "DBsi")] = accumulator;
  scanService(machine, linked, true);
  accumulator = memory[scOffset] | 0;
  machine.A = accumulator;
  memory[address(linked, "DBbx")] = accumulator;
  scanService(machine, linked, false);
  accumulator = memory[zeroFlag] | 0;
  machine.A = accumulator;
  if (accumulator === 0) {
    memory[mode] = 2;
    return;
  }
  scanService(machine, linked, true);
  accumulator = memory[scOffset] | 0;
  machine.A = accumulator;
  memory[address(linked, "DBdi")] = accumulator;
  memory[mode] = 1;
}

function databaseScanInline(linked) {
  const scOffset = address(linked, "SCdi");
  const scCount = address(linked, "SCcx");
  const zeroFlag = address(linked, "SCzf");
  const mode = address(linked, "DBmode");
  const dbOffset = address(linked, "DBdi");
  const dbBytes = address(linked, "DBbytes");
  const dbStart = address(linked, "DBsi");
  const dbEnd = address(linked, "DBbx");
  const expected = address(linked, "SCal");
  return `dbscan:{A=m[${dbOffset}]|0;m[${scOffset}]=A;m[${scCount}]=m[${dbBytes}];m[${expected}]=255;m[${zeroFlag}]=0;m[${mode}]=0;${scanInline(linked, false)}A=m[${zeroFlag}]|0;if(A===0)break dbscan;A=m[${scOffset}]|0;m[${dbStart}]=A;${scanInline(linked, true)}A=m[${scOffset}]|0;m[${dbEnd}]=A;${scanInline(linked, false)}A=m[${zeroFlag}]|0;if(A===0){m[${mode}]=2;break dbscan;}${scanInline(linked, true)}A=m[${scOffset}]|0;m[${dbOffset}]=A;m[${mode}]=1;}`;
}

function copyCupolaPanel(machine, linked) {
  const memory = machine.memory;
  const source = value(memory, linked, "VHCcachep") >>> 0;
  const destination = address(linked, "vhcpoly");
  memory.set(memory.subarray(source, source + 12), destination);
  memory[address(linked, "VHCcopy")] = 12;
  machine.A = 12;
  machine.C = memory[source + 11] | 0;
}

function copyCupolaPanelInline(linked) {
  const source = address(linked, "VHCcachep");
  const destination = address(linked, "vhcpoly");
  const copy = address(linked, "VHCcopy");
  return `q=m[${source}]>>>0;m.set(m.subarray(q,q+12),${destination});m[${copy}]=12;A=12;C=m[q+11]|0;`;
}

function drawStickLine(machine, linked) {
  const memory = machine.memory;
  const xAddress = address(linked, "VHSpx0");
  const yAddress = address(linked, "VHSpy0");
  const phaseAddress = address(linked, "VHSphase");
  const drawnAddress = address(linked, "VHSdrawn");
  const errorAddress = address(linked, "VHSerr");
  const e2Address = address(linked, "VHSe2");
  const page = noctisBuffer(linked, "RADPT");
  const xEnd = value(memory, linked, "VHSpx1");
  const yEnd = value(memory, linked, "VHSpy1");
  const dx = value(memory, linked, "VHSdx");
  const dy = value(memory, linked, "VHSdy");
  const xStep = value(memory, linked, "VHSsx");
  const yStep = value(memory, linked, "VHSsy");
  const flare = value(memory, linked, "VHSflare");
  const colour = value(memory, linked, "VHScolor") & 255;
  let x = memory[xAddress] | 0;
  let y = memory[yAddress] | 0;
  let error = memory[errorAddress] | 0;
  let phase = memory[phaseAddress] | 0;
  let drawn = memory[drawnAddress] | 0;
  let c = machine.C | 0;
  let destination = 0;
  while (true) {
    destination = (page + Math.imul(y, 320) + x) | 0;
    if (flare === 1) {
      if ((phase & 1) === 0) {
        const current = memory[destination] & 255;
        c = (current & 63) + 8;
        if (c > 62) c = 62;
        c |= current & 192;
        memory[destination] = c;
      }
    } else {
      memory[destination] = 0;
      c = colour;
      memory[destination + 1] = c;
    }
    phase = (phase + 1) | 0;
    drawn = (drawn + 1) | 0;
    if (x === xEnd && y === yEnd) break;
    const e2 = (error + error) | 0;
    memory[e2Address] = e2;
    if (e2 >= dy) {
      error = (error + dy) | 0;
      x = (x + xStep) | 0;
    }
    if (e2 <= dx) {
      error = (error + dx) | 0;
      y = (y + yStep) | 0;
    }
  }
  memory[xAddress] = x;
  memory[yAddress] = y;
  memory[errorAddress] = error;
  memory[phaseAddress] = phase;
  memory[drawnAddress] = drawn;
  machine.A = y;
  machine.C = c;
  machine.D = destination;
}

function drawStickLineInline(linked) {
  const x = address(linked, "VHSpx0");
  const y = address(linked, "VHSpy0");
  const xEnd = address(linked, "VHSpx1");
  const yEnd = address(linked, "VHSpy1");
  const dx = address(linked, "VHSdx");
  const dy = address(linked, "VHSdy");
  const xStep = address(linked, "VHSsx");
  const yStep = address(linked, "VHSsy");
  const error = address(linked, "VHSerr");
  const e2 = address(linked, "VHSe2");
  const phase = address(linked, "VHSphase");
  const drawn = address(linked, "VHSdrawn");
  const flare = address(linked, "VHSflare");
  const colour = address(linked, "VHScolor");
  const page = noctisBuffer(linked, "RADPT");
  return `{
    let x=m[${x}]|0,y=m[${y}]|0,error=m[${error}]|0,phase=m[${phase}]|0,drawn=m[${drawn}]|0;
    const xEnd=m[${xEnd}]|0,yEnd=m[${yEnd}]|0,dx=m[${dx}]|0,dy=m[${dy}]|0,xStep=m[${xStep}]|0,yStep=m[${yStep}]|0,flare=m[${flare}]|0,colour=m[${colour}]&255;
    while(true){D=(${page}+Math.imul(y,320)+x)|0;if(flare===1){if((phase&1)===0){A=m[D]&255;C=(A&63)+8;if(C>62)C=62;A&=192;C|=A;m[D]=C;}}else{m[D]=0;C=colour;m[D+1]=C;}phase=(phase+1)|0;drawn=(drawn+1)|0;if(x===xEnd&&y===yEnd)break;A=(error+error)|0;m[${e2}]=A;if(A>=dy){error=(error+dy)|0;x=(x+xStep)|0;}if(A<=dx){error=(error+dx)|0;y=(y+yStep)|0;}}
    m[${x}]=x;m[${y}]=y;m[${error}]=error;m[${phase}]=phase;m[${drawn}]=drawn;A=y;
  }`;
}

function rotateVertices(machine, linked, resetVertex) {
  const memory = machine.memory;
  const pgfi = address(linked, "PGFi");
  const vertexAddress = address(linked, "PJvr");
  const vertexCount = value(memory, linked, "PJnrv") >>> 0;
  const mode = value(memory, linked, "PJmode");
  const doFlag = address(linked, "PJdoflag");
  const visibility = address(linked, "rwf");
  const slot = (name) => address(linked, name);
  const load = (index) => { memory[pgfi] = index; pgfLoadA(machine, linked); };
  const binary = (index, operation) => {
    memory[pgfi] = index;
    pgfBinary(machine, linked, operation);
  };
  const reverse = (index, operation) => {
    memory[pgfi] = index;
    pgfReverseBinary(machine, linked, operation);
  };
  const store = (index) => { memory[pgfi] = index; pgfStoreA(machine, linked); };
  const storeNarrow = (index) => { store(index); pgfNarrow(machine, linked); };
  let vertex = resetVertex ? 0 : memory[vertexAddress] >>> 0;
  if (resetVertex) memory[vertexAddress] = 0;
  memory[doFlag] = 0;
  for (; vertex < vertexCount; vertex += 1) {
    load(slot("FSINZ") + vertex);
    binary(slot("FSCAMZ"), subtractFloat64);
    storeNarrow(slot("FSZZ"));
    load(slot("FSINX") + vertex);
    binary(slot("FSCAMX"), subtractFloat64);
    storeNarrow(slot("FSXX"));
    load(slot("FSINY") + vertex);
    binary(slot("FSCAMY"), subtractFloat64);
    storeNarrow(slot("FSYY"));

    load(slot("FSZZ"));
    binary(mode === 0 ? slot("FSPSB") : slot("FSTSB"), multiplyFloat64);
    store(slot("FSW0"));
    load(slot("FSXX"));
    binary(mode === 0 ? slot("FSPCB") : slot("FSTCB"), multiplyFloat64);
    binary(slot("FSW0"), addFloat64);
    storeNarrow(slot("FSRXF") + vertex);

    load(slot("FSZZ"));
    binary(slot("FSTCB"), multiplyFloat64);
    store(slot("FSW0"));
    load(slot("FSXX"));
    binary(slot("FSTSB"), multiplyFloat64);
    reverse(slot("FSW0"), subtractFloat64);
    storeNarrow(slot("FSZ2"));

    load(slot("FSZ2"));
    binary(slot("FSTCA"), multiplyFloat64);
    store(slot("FSW0"));
    load(slot("FSYY"));
    binary(slot("FSTSA"), multiplyFloat64);
    binary(slot("FSW0"), addFloat64);
    store(slot("FSW1"));
    storeNarrow(slot("FSRZF") + vertex);
    load(slot("FSW1"));
    memory[pgfi] = slot("FSUNEG");
    pgfLoadB(machine, linked);
    compareFloat64Service(machine, linked);
    const comparison = value(memory, linked, "FI");
    const visible = comparison !== 2 && comparison >= 0 ? 1 : 0;
    memory[visibility + vertex] = visible;
    if (visible) memory[doFlag] = (memory[doFlag] + 1) | 0;

    load(slot("FSYY"));
    binary(mode === 0 ? slot("FSPCA") : slot("FSTCA"), multiplyFloat64);
    store(slot("FSW0"));
    load(slot("FSZ2"));
    binary(mode === 0 ? slot("FSPSA") : slot("FSTSA"), multiplyFloat64);
    reverse(slot("FSW0"), subtractFloat64);
    storeNarrow(slot("FSRYF") + vertex);
    memory[vertexAddress] = vertex + 1;
  }
  machine.A = vertex | 0;
  machine.C = mode;
}

function projectMapGeneric(machine, linked) {
  const memory = machine.memory;
  const pgfi = address(linked, "PGFi");
  const fi = address(linked, "FI");
  const vertexAddress = address(linked, "PJvr");
  const countAddress = address(linked, "PJvr2");
  const minXAddress = address(linked, "PJminx");
  const maxXAddress = address(linked, "PJmaxx");
  const minYAddress = address(linked, "BXminy");
  const maxYAddress = address(linked, "BXmaxy");
  const points = address(linked, "mp");
  const slot = (name) => address(linked, name);
  const load = (index) => { memory[pgfi] = index; pgfLoadA(machine, linked); };
  const binary = (index, operation) => {
    memory[pgfi] = index;
    pgfBinary(machine, linked, operation);
  };
  const store = (index) => { memory[pgfi] = index; pgfStoreA(machine, linked); };

  memory[vertexAddress] = 0;
  memory[minXAddress] = 311;
  memory[maxXAddress] = 5;
  memory[minYAddress] = 190;
  memory[maxYAddress] = 10;
  const count = memory[countAddress] >>> 0;
  let vertex = 0;
  while (vertex < count) {
    load(slot("FSDPP"));
    binary(slot("FSUZ") + vertex, divideFloat64);
    store(slot("FSW3"));

    binary(slot("FSUX") + vertex, multiplyFloat64);
    binary(slot("FSXC"), addFloat64);
    pgfInteger(machine, linked);
    machine.A = vertex;
    machine.A = (machine.A + machine.A) | 0;
    machine.C = points;
    machine.C = (machine.C + machine.A) | 0;
    memory[machine.C >>> 0] = memory[fi];
    machine.A = memory[fi] | 0;
    if (machine.A < (memory[minXAddress] | 0)) memory[minXAddress] = machine.A;
    machine.A = memory[fi] | 0;
    if (machine.A > (memory[maxXAddress] | 0)) memory[maxXAddress] = machine.A;

    load(slot("FSW3"));
    binary(slot("FSUY") + vertex, multiplyFloat64);
    binary(slot("FSYC"), addFloat64);
    pgfInteger(machine, linked);
    machine.A = vertex;
    machine.A = (machine.A + machine.A) | 0;
    machine.C = points;
    machine.C = (machine.C + machine.A) | 0;
    memory[(machine.C + 1) >>> 0] = memory[fi];
    machine.A = memory[fi] | 0;
    if (machine.A < (memory[minYAddress] | 0)) memory[minYAddress] = machine.A;
    if (machine.A > (memory[maxYAddress] | 0)) memory[maxYAddress] = machine.A;

    vertex = (vertex + 1) | 0;
    memory[vertexAddress] = vertex;
    machine.A = vertex;
  }
}

function projectMapGenericInline(linked) {
  const p = pgfInlineLayout(linked);
  const vertex = address(linked, "PJvr");
  const count = address(linked, "PJvr2");
  const minX = address(linked, "PJminx");
  const maxX = address(linked, "PJmaxx");
  const minY = address(linked, "BXminy");
  const maxY = address(linked, "BXmaxy");
  const points = address(linked, "mp");
  const slot = (name) => address(linked, name);
  const load = (index) => `m[${p.pgfi}]=${index};q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[${p.fa}]=m[q];m[${p.fa + 1}]=m[q+1];A=q|0;`;
  const binary = (index, operator) => `m[${p.pgfi}]=(${index})|0;q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[${p.fb}]=m[q];m[${p.fb + 1}]=m[q+1];A=q|0;f64w(${p.fa},f64r(${p.fa})${operator}f64r(${p.fb}));`;
  const store = (index) => `m[${p.pgfi}]=${index};q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[q]=m[${p.fa}];m[q+1]=m[${p.fa + 1}];A=q|0;`;
  const integer = `{
    const projectNumber=f64r(${p.fa});let projectInteger;
    if(!Number.isFinite(projectNumber))projectInteger=-2147483648;
    else{const projectMode=(((machine.fpu&&machine.fpu.control)||895)>>>10)&3;let projectRounded;
      if(projectMode===0){const projectFloor=Math.floor(projectNumber),projectFraction=projectNumber-projectFloor;projectRounded=projectFraction<0.5?projectFloor:projectFraction>0.5?projectFloor+1:(projectFloor&1)===0?projectFloor:projectFloor+1;}
      else if(projectMode===1)projectRounded=Math.floor(projectNumber);else if(projectMode===2)projectRounded=Math.ceil(projectNumber);else projectRounded=Math.trunc(projectNumber);
      projectInteger=projectRounded < -2147483648 || projectRounded > 2147483647 ? -2147483648 : projectRounded|0;}
    m[${p.fi}]=projectInteger;
  }`;
  return `{
    let projectVertex=0;m[${vertex}]=0;m[${minX}]=311;m[${maxX}]=5;m[${minY}]=190;m[${maxY}]=10;const projectCount=m[${count}]>>>0;
    while(projectVertex<projectCount){
      ${load(slot("FSDPP"))}${binary(`${slot("FSUZ")}+projectVertex`, "/")}${store(slot("FSW3"))}
      ${binary(`${slot("FSUX")}+projectVertex`, "*")}${binary(slot("FSXC"), "+")}${integer}
      A=projectVertex;A=(A+A)|0;C=${points};C=(C+A)|0;m[C>>>0]=m[${p.fi}];A=m[${p.fi}]|0;if(A<(m[${minX}]|0))m[${minX}]=A;A=m[${p.fi}]|0;if(A>(m[${maxX}]|0))m[${maxX}]=A;
      ${load(slot("FSW3"))}${binary(`${slot("FSUY")}+projectVertex`, "*")}${binary(slot("FSYC"), "+")}${integer}
      A=projectVertex;A=(A+A)|0;C=${points};C=(C+A)|0;m[(C+1)>>>0]=m[${p.fi}];A=m[${p.fi}]|0;if(A<(m[${minY}]|0))m[${minY}]=A;if(A>(m[${maxY}]|0))m[${maxY}]=A;
      projectVertex=(projectVertex+1)|0;m[${vertex}]=projectVertex;A=projectVertex;
    }
  }`;
}

function project3d(machine, linked) {
  const memory = machine.memory;
  const pgfi = address(linked, "PGFi");
  const fi = address(linked, "FI");
  const vertexAddress = address(linked, "PJvr");
  const count = value(memory, linked, "PJvr2") >>> 0;
  const points = address(linked, "mp");
  const slot = (name) => address(linked, name);
  const load = (index) => { memory[pgfi] = index; pgfLoadA(machine, linked); };
  const binary = (index, operation) => {
    memory[pgfi] = index;
    pgfBinary(machine, linked, operation);
  };
  const store = (index) => { memory[pgfi] = index; pgfStoreA(machine, linked); };
  const storeNarrow = (index) => { store(index); pgfNarrow(machine, linked); };

  memory[vertexAddress] = 0;
  let vertex = 0;
  while (vertex < count) {
    load(slot("FSUNO"));
    binary(slot("FSUZ") + vertex, divideFloat64);
    store(slot("FSW3"));
    binary(slot("FSUX") + vertex, multiplyFloat64);
    binary(slot("FSXC"), addFloat64);
    store(slot("FSW0"));
    storeNarrow(slot("FSVX0") + vertex);
    load(slot("FSW0"));
    pgfInteger(machine, linked);
    machine.A = vertex;
    machine.A = (machine.A + machine.A) | 0;
    machine.C = points;
    machine.C = (machine.C + machine.A) | 0;
    memory[machine.C >>> 0] = memory[fi];

    load(slot("FSW3"));
    binary(slot("FSUY") + vertex, multiplyFloat64);
    binary(slot("FSYC"), addFloat64);
    store(slot("FSW0"));
    storeNarrow(slot("FSVY0") + vertex);
    load(slot("FSW0"));
    pgfInteger(machine, linked);
    machine.A = vertex;
    machine.A = (machine.A + machine.A) | 0;
    machine.C = points;
    machine.C = (machine.C + machine.A) | 0;
    memory[(machine.C + 1) >>> 0] = memory[fi];

    vertex = (vertex + 1) | 0;
    memory[vertexAddress] = vertex;
    machine.A = vertex;
  }
}

function project3dInline(linked) {
  const p = pgfInlineLayout(linked);
  const vertex = address(linked, "PJvr");
  const count = address(linked, "PJvr2");
  const points = address(linked, "mp");
  const slot = (name) => address(linked, name);
  const load = (index) => `m[${p.pgfi}]=${index};q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[${p.fa}]=m[q];m[${p.fa + 1}]=m[q+1];A=q|0;`;
  const binary = (index, operator) => `m[${p.pgfi}]=(${index})|0;q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[${p.fb}]=m[q];m[${p.fb + 1}]=m[q+1];A=q|0;f64w(${p.fa},f64r(${p.fa})${operator}f64r(${p.fb}));`;
  const store = (index) => `m[${p.pgfi}]=${index};q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[q]=m[${p.fa}];m[q+1]=m[${p.fa + 1}];A=q|0;`;
  const narrow = (index) => `${store(index)}q=(${p.fw}+2*(m[${p.pgfi}]|0))>>>0;m[${p.fa}]=m[q];m[${p.fa + 1}]=m[q+1];A=q|0;{
    const projectNarrowInput=f64r(${p.fa}),projectControl=((machine.fpu&&machine.fpu.control)||895)&65535;let projectNarrow=Math.fround(projectNarrowInput);
    if((projectControl&3072)!==0&&projectNarrow!==projectNarrowInput&&Number.isFinite(projectNarrowInput)){const projectMode=(projectControl>>>10)&3;let projectUp=null;if(projectMode===1&&projectNarrow>projectNarrowInput)projectUp=false;else if(projectMode===2&&projectNarrow<projectNarrowInput)projectUp=true;else if(projectMode===3){if(projectNarrowInput>0&&projectNarrow>projectNarrowInput)projectUp=false;else if(projectNarrowInput<0&&projectNarrow<projectNarrowInput)projectUp=true;}if(projectUp!==null){if(projectNarrow===0){fi[0]=projectUp?1:-2147483647;projectNarrow=ff[0];}else if(!(Number.isNaN(projectNarrow)||projectNarrow===(projectUp?Infinity:-Infinity))){ff[0]=projectNarrow;let projectBits=fi[0]|0;projectBits=projectNarrow>0?(projectBits+(projectUp?1:-1))|0:(projectBits+(projectUp?-1:1))|0;fi[0]=projectBits;projectNarrow=ff[0];}}}
    ff[0]=projectNarrow;m[${p.fs}]=fi[0];f64w(${p.fa},fread(m[${p.fs}]|0));m[q]=m[${p.fa}];m[q+1]=m[${p.fa + 1}];A=q|0;
  }`;
  const integer = `{
    const projectNumber=f64r(${p.fa});let projectInteger;
    if(!Number.isFinite(projectNumber))projectInteger=-2147483648;
    else{const projectMode=(((machine.fpu&&machine.fpu.control)||895)>>>10)&3;let projectRounded;if(projectMode===0){const projectFloor=Math.floor(projectNumber),projectFraction=projectNumber-projectFloor;projectRounded=projectFraction<0.5?projectFloor:projectFraction>0.5?projectFloor+1:(projectFloor&1)===0?projectFloor:projectFloor+1;}else if(projectMode===1)projectRounded=Math.floor(projectNumber);else if(projectMode===2)projectRounded=Math.ceil(projectNumber);else projectRounded=Math.trunc(projectNumber);projectInteger=projectRounded < -2147483648 || projectRounded > 2147483647 ? -2147483648 : projectRounded|0;}m[${p.fi}]=projectInteger;
  }`;
  return `{
    let projectVertex=0;m[${vertex}]=0;const projectCount=m[${count}]>>>0;
    while(projectVertex<projectCount){
      ${load(slot("FSUNO"))}${binary(`${slot("FSUZ")}+projectVertex`, "/")}${store(slot("FSW3"))}
      ${binary(`${slot("FSUX")}+projectVertex`, "*")}${binary(slot("FSXC"), "+")}${store(slot("FSW0"))}${narrow(`${slot("FSVX0")}+projectVertex`)}${load(slot("FSW0"))}${integer}
      A=projectVertex;A=(A+A)|0;C=${points};C=(C+A)|0;m[C>>>0]=m[${p.fi}];
      ${load(slot("FSW3"))}${binary(`${slot("FSUY")}+projectVertex`, "*")}${binary(slot("FSYC"), "+")}${store(slot("FSW0"))}${narrow(`${slot("FSVY0")}+projectVertex`)}${load(slot("FSW0"))}${integer}
      A=projectVertex;A=(A+A)|0;C=${points};C=(C+A)|0;m[(C+1)>>>0]=m[${p.fi}];projectVertex=(projectVertex+1)|0;m[${vertex}]=projectVertex;A=projectVertex;
    }
  }`;
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

function rasterAddresses(linked) {
  let cached = rasterAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "mp", "SADPT", "DBn", "DB8n", "DBflar", "DBcol", "DBent", "DBseg",
    "DBlimy", "DBlimx", "DBbytes", "DBdi", "DBdi0", "DBsi", "DBbx",
    "DBdx", "DBcx", "DBal", "DBah", "DBdl", "DBtmp", "DBmode", "BXminx",
    "BXmaxx", "BXminy", "BXmaxy", "PGj", "PGdi", "PGval", "SCdi", "SCcx",
    "CSbyte", "CSrows", "CSfb1", "CSseg", "SGxp", "SGyp", "SGxa", "SGya",
    "SGpi", "SGpf", "SGa", "SGb", "SGL", "SGch", "SGgx", "SGgy", "SGt",
  ];
  cached = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
  cached.page = noctisBuffer(linked, "SADPT");
  rasterAddressCaches.set(linked, cached);
  return cached;
}

function drawPolygonSegment(machine, linked, p) {
  const memory = machine.memory;
  memory[p.CSseg] = (memory[p.CSseg] + 1) | 0;
  let xp = memory[p.SGxp] | 0;
  let yp = memory[p.SGyp] | 0;
  let xa = memory[p.SGxa] | 0;
  let ya = memory[p.SGya] | 0;
  if (xp === xa) {
    const low = (ya >>> 0) < (yp >>> 0) ? ya : yp;
    const high = (ya >>> 0) < (yp >>> 0) ? yp : ya;
    let offset = (Math.imul(low, 320) + xp + 4) & 0xffff;
    const limit = (Math.imul((high + 1) | 0, 320) + 4) & 0xffff;
    memory[p.SGpi] = offset;
    memory[p.SGpf] = limit;
    do {
      memory[p.page + offset] = 0xff;
      offset = (offset + 320) & 0xffff;
    } while ((offset >>> 0) < (limit >>> 0));
    memory[p.SGpi] = offset;
    memory[p.PGdi] = (offset - 320) & 0xffff;
    memory[p.PGval] = 0xff;
    return;
  }
  if ((xa >>> 0) < (xp >>> 0)) {
    [xp, xa] = [xa, xp];
    [yp, ya] = [ya, yp];
    memory[p.SGxp] = xp;
    memory[p.SGxa] = xa;
    memory[p.SGyp] = yp;
    memory[p.SGya] = ya;
  }
  let xDelta = (xa - xp) | 0;
  memory[p.SGa] = xDelta;
  let length = xDelta;
  memory[p.SGL] = length;
  memory[p.SGch] = 0;
  let yDelta = (ya - yp) | 0;
  if ((ya >>> 0) < (yp >>> 0)) {
    memory[p.SGch] = 255;
    yDelta = (-yDelta) | 0;
  }
  memory[p.SGb] = yDelta;
  if ((yDelta >>> 0) >= (length >>> 0)) length = yDelta;
  length = (length + 1) | 0;
  memory[p.SGL] = length;
  let globalX = xp << 16;
  let globalY = yp << 16;
  memory[p.SGgx] = globalX;
  memory[p.SGgy] = globalY;
  const divisor = length & 0xffff;
  xDelta = (Math.trunc((xDelta << 16 >>> 0) / divisor) & 0xffff) | 0;
  yDelta = (Math.trunc((yDelta << 16 >>> 0) / divisor) & 0xffff) | 0;
  memory[p.SGa] = xDelta;
  memory[p.SGb] = yDelta;
  if (memory[p.SGch] !== 0) {
    yDelta = (-yDelta) | 0;
    memory[p.SGb] = yDelta;
  }
  const limit = xa << 16;
  memory[p.SGt] = limit;
  let offset = 0;
  do {
    offset = ((Math.imul(globalY >> 16, 320) & 0xffff) + ((globalX >> 16) & 0xffff) + 4) & 0xffff;
    memory[p.page + offset] = 0xff;
    globalX = (globalX + xDelta) | 0;
    globalY = (globalY + yDelta) | 0;
  } while ((globalX >>> 0) < (limit >>> 0));
  memory[p.SGgx] = globalX;
  memory[p.SGgy] = globalY;
  memory[p.PGdi] = offset;
  memory[p.PGval] = 0xff;
}

function drawPolygon(machine, linked) {
  const memory = machine.memory;
  const p = rasterAddresses(linked);
  const count = memory[p.DBn] | 0;
  memory[p.DB8n] = Math.imul((count - 1) | 0, 8) | 0;
  let minimumX = memory[p.BXminx] | 0;
  let maximumX = memory[p.BXmaxx] | 0;
  const minimumY = memory[p.BXminy] | 0;
  const maximumY = memory[p.BXmaxy] | 0;
  let colour = memory[p.DBcol] | 0;
  const flare = memory[p.DBflar] | 0;

  if (flare === 0 && minimumY === maximumY) {
    if (minimumX === maximumX) {
      const rawOffset = ((Math.imul(minimumY, 320) + minimumX) & 0xffff) + 4;
      memory[p.PGdi] = rawOffset;
      memory[p.PGval] = colour;
      memory[p.page + (rawOffset & 0xffff)] = colour & 0xff;
      memory[p.CSbyte] = (memory[p.CSbyte] + 1) | 0;
      return;
    }
    let offset = (Math.imul(minimumY, 320) + maximumX) & 0xffff;
    memory[p.DBtmp] = offset;
    while ((maximumX >>> 0) >= (minimumX >>> 0)) {
      const destination = (offset + 4) & 0xffff;
      memory[p.PGdi] = destination;
      memory[p.PGval] = colour;
      memory[p.page + destination] = colour & 0xff;
      memory[p.CSbyte] = (memory[p.CSbyte] + 1) | 0;
      maximumX = (maximumX - 1) & 0xffff;
      memory[p.BXmaxx] = maximumX;
      offset = (offset - 1) & 0xffff;
      memory[p.DBtmp] = offset;
    }
    return;
  }

  memory[p.PGj] = 0;
  for (let edge = 0; edge < count - 1; edge += 1) {
    const point = p.mp + edge * 2;
    memory[p.SGxp] = memory[point];
    memory[p.SGyp] = memory[point + 1];
    memory[p.SGxa] = memory[point + 2];
    memory[p.SGya] = memory[point + 3];
    drawPolygonSegment(machine, linked, p);
    memory[p.PGj] = edge + 1;
  }
  const last = p.mp + (count - 1) * 2;
  memory[p.SGxp] = memory[last];
  memory[p.SGyp] = memory[last + 1];
  memory[p.SGxa] = memory[p.mp];
  memory[p.SGya] = memory[p.mp + 1];
  drawPolygonSegment(machine, linked, p);

  let segment = (Math.imul(minimumY, 320) + minimumX) & 0xffff;
  let lastRow = (Math.imul(maximumY, 320) + minimumX) & 0xffff;
  const lastColumn = (segment + maximumX - minimumX) & 0xffff;
  const bytes = (lastColumn - segment + 2) & 0xffff;
  memory[p.DBseg] = segment;
  memory[p.DBlimy] = lastRow;
  memory[p.DBlimx] = lastColumn;
  memory[p.DBbytes] = bytes;
  if (![0, 1, 2, 4].includes(flare)) return;
  lastRow = (lastRow + 4) & 0xffff;
  let rowOffset = (segment + 4) & 0xffff;
  memory[p.DBlimy] = lastRow;
  memory[p.DBdi] = rowOffset;
  if (flare === 1) {
    colour &= 63;
    memory[p.DBcol] = colour;
  }

  do {
    memory[p.CSrows] = (memory[p.CSrows] + 1) | 0;
    memory[p.DBdi0] = rowOffset;
    memory[p.DBdi] = rowOffset;
    databaseScan(machine, linked);
    const mode = memory[p.DBmode] | 0;
    if (mode !== 0) {
      let start;
      let fillCount;
      if (mode === 2) {
        memory[p.CSfb1] = (memory[p.CSfb1] + 1) | 0;
        const scanStart = ((memory[p.DBsi] | 0) - 1) & 0xffff;
        const scanEnd = ((memory[p.DBbx] | 0) - 1) & 0xffff;
        memory[p.DBsi] = scanStart;
        memory[p.DBbx] = scanEnd;
        start = scanStart;
        fillCount = (scanEnd - scanStart) & 0xffff;
      } else {
        const scanEnd = ((memory[p.DBdi] | 0) - 1) & 0xffff;
        const scanStart = ((memory[p.DBsi] | 0) - 1) & 0xffff;
        memory[p.DBdi] = scanEnd;
        memory[p.DBsi] = scanStart;
        start = scanStart;
        fillCount = (scanEnd - scanStart) & 0xffff;
      }
      if (flare === 0 || flare === 4) {
        if (mode !== 2) memory[p.DBdx] = fillCount;
        memory[p.SCcx] = fillCount;
        memory[p.SCdi] = start;
        memory[p.DBal] = memory[p.DBcol];
        fillBytes(machine, linked);
      } else {
        memory[p.DBcx] = fillCount;
        memory[p.DBdi] = start;
        if (flare === 1) {
          memory[p.DBdl] = mode === 2 ? ((memory[p.DBcol] & 0xff) >>> 1) : memory[p.DBcol];
          fillFlare(machine, linked);
        } else if (mode === 2) fillHaloFallback(machine, linked);
        else fillHalo(machine, linked);
      }
    }
    if (flare === 4) {
      let low = memory[p.DBcol] & 63;
      const high = memory[p.DBcol] & 192;
      low = (low + memory[p.DBent]) & 0xff;
      if ((low >>> 0) > 63) low = (memory[p.DBent] & 128) !== 0 ? 0 : 63;
      colour = (low | high) & 0xff;
      memory[p.DBal] = low;
      memory[p.DBah] = high;
      memory[p.DBcol] = colour;
    }
    rowOffset = (memory[p.DBdi0] + 320) & 0xffff;
    memory[p.DBdi] = rowOffset;
  } while ((rowOffset >>> 0) <= (lastRow >>> 0));
}

function poly3dAddresses(linked) {
  let cached = poly3dAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "PGFi", "PGFj", "PGi", "FI", "PJnrv", "PJmode", "PJdoflag", "PJgate",
    "PJvr", "PJdi", "PJdx", "PJbx", "PJvv", "PJpv", "PJnv", "PJvr2", "PJvr22",
    "PJvr3", "PJvr4", "PJvr5", "PJvr6", "BXsi", "BXn", "DBn", "CLxi", "CLyi",
    "CLxo", "CLyo", "CLn", "CLbnd", "CLdir", "CLint", "CLo", "CLi", "CLt",
    "CLout", "rwf", "mp", "FSRXF", "FSRYF", "FSRZF", "FSUX", "FSUY", "FSUZ",
    "FSUNEG", "FSW0", "FSW1", "FSW2", "FSW3", "FSZK", "FSVX0", "FSVY0", "FSVX1",
    "FSVY1", "FSVX2", "FSVY2", "FSVX3", "FSVY3", "FSLBYF", "FSUBYF", "FSLBXF",
    "FSUBXF", "FSUNO", "FSXC", "FSYC", "PGLBX", "PGLBY", "PGUBX", "PGUBY", "fw", "FA0", "FB0", "FT0",
    "FS0", "FSW", "FFLG", "FSINX", "FSINY", "FSINZ", "FSCAMX", "FSCAMY", "FSCAMZ",
    "FSZZ", "FSXX", "FSYY", "FSPSB", "FSTSB", "FSPCB", "FSTCB", "FSTCA", "FSTSA",
    "FSZ2", "FSPCA", "FSPSA",
  ];
  cached = {
    ...Object.fromEntries(names.map((name) => [name, address(linked, name)])),
    ...rasterAddresses(linked),
  };
  poly3dAddressCaches.set(linked, cached);
  return cached;
}

function polyLoad(machine, linked, p, slot) {
  const memory = machine.memory;
  const source = p.fw + slot * 2;
  memory[p.PGFi] = slot;
  memory[p.FA0] = memory[source];
  memory[p.FA0 + 1] = memory[source + 1];
  machine.A = source | 0;
}

function polyBinary(machine, linked, p, slot, operation) {
  const memory = machine.memory;
  const source = p.fw + slot * 2;
  memory[p.PGFi] = slot;
  memory[p.FB0] = memory[source];
  memory[p.FB0 + 1] = memory[source + 1];
  machine.A = source | 0;
  const left = readFloat64(memory, p.FA0);
  const right = readFloat64(memory, p.FB0);
  const result = operation === addFloat64 ? left + right
    : operation === subtractFloat64 ? left - right
      : operation === multiplyFloat64 ? left * right : left / right;
  writeFloat64(memory, p.FA0, result);
}

function polyReverse(machine, linked, p, slot, operation) {
  const memory = machine.memory;
  memory[p.FT0] = memory[p.FA0];
  memory[p.FT0 + 1] = memory[p.FA0 + 1];
  polyLoad(machine, linked, p, slot);
  memory[p.FB0] = memory[p.FT0];
  memory[p.FB0 + 1] = memory[p.FT0 + 1];
  const left = readFloat64(memory, p.FA0);
  const right = readFloat64(memory, p.FB0);
  writeFloat64(memory, p.FA0, operation === subtractFloat64 ? left - right : left / right);
}

function polyStore(machine, linked, p, slot, narrow = false) {
  const memory = machine.memory;
  const destination = p.fw + slot * 2;
  memory[p.PGFi] = slot;
  memory[destination] = memory[p.FA0];
  memory[destination + 1] = memory[p.FA0 + 1];
  machine.A = destination | 0;
  if (narrow) {
    const narrowed = roundFloat32(
      readFloat64(memory, p.FA0), floatingPoint(machine).control,
    );
    memory[p.FS0] = float32Bits(narrowed);
    writeFloat64(memory, p.FA0, narrowed);
    memory[destination] = memory[p.FA0];
    memory[destination + 1] = memory[p.FA0 + 1];
  }
}

function polyMove(machine, linked, p, source, destination) {
  const memory = machine.memory;
  const sourceAddress = p.fw + source * 2;
  const destinationAddress = p.fw + destination * 2;
  memory[p.PGFi] = source;
  memory[p.PGFj] = destination;
  memory[destinationAddress] = memory[sourceAddress];
  memory[destinationAddress + 1] = memory[sourceAddress + 1];
  machine.A = sourceAddress | 0;
  machine.C = destinationAddress | 0;
}

function polyInteger(machine, linked, p) {
  machine.memory[p.FI] = convertToInt32(
    readFloat64(machine.memory, p.FA0), floatingPoint(machine).control,
  );
}

function polyCompare(machine, linked, p, left, right) {
  const memory = machine.memory;
  polyLoad(machine, linked, p, left);
  const rightAddress = p.fw + right * 2;
  memory[p.PGFi] = right;
  memory[p.FB0] = memory[rightAddress];
  memory[p.FB0 + 1] = memory[rightAddress + 1];
  machine.A = rightAddress | 0;
  const leftValue = readFloat64(memory, p.FA0);
  const rightValue = readFloat64(memory, p.FB0);
  const status = Number.isNaN(leftValue) || Number.isNaN(rightValue)
    ? 17664 : leftValue < rightValue ? 256 : leftValue === rightValue ? 16384 : 0;
  memory[p.FSW] = status;
  floatingPoint(machine).status = status;
  if ((status & 1024) !== 0) {
    memory[p.FFLG] |= 1;
    memory[p.FI] = 2;
    machine.A = memory[p.FFLG] | 0;
  } else if ((status & 16384) !== 0) {
    memory[p.FI] = 0;
    machine.A = status & 16384;
  } else if ((status & 256) !== 0) {
    memory[p.FI] = -1;
    machine.A = -1;
  } else {
    memory[p.FI] = 1;
    machine.A = 0;
  }
  return memory[p.FI] | 0;
}

function polyZemit(machine, linked, p) {
  const memory = machine.memory;
  const outside = memory[p.PJbx] | 0;
  const visible = memory[p.PJvv] | 0;
  const output = memory[p.PJdi] | 0;
  const comparison = polyCompare(
    machine, linked, p, p.FSRZF + outside, p.FSRZF + visible,
  );
  if (comparison === 0) {
    polyMove(machine, linked, p, p.FSRXF + outside, p.FSUX + output);
    polyMove(machine, linked, p, p.FSRYF + outside, p.FSUY + output);
  } else {
    polyLoad(machine, linked, p, p.FSUNEG);
    polyBinary(machine, linked, p, p.FSRZF + visible, subtractFloat64);
    polyStore(machine, linked, p, p.FSW0);
    polyLoad(machine, linked, p, p.FSRZF + visible);
    polyReverse(machine, linked, p, p.FSRZF + outside, subtractFloat64);
    polyStore(machine, linked, p, p.FSW1);
    polyLoad(machine, linked, p, p.FSW0);
    polyBinary(machine, linked, p, p.FSW1, divideFloat64);
    polyStore(machine, linked, p, p.FSZK, true);

    polyLoad(machine, linked, p, p.FSW0);
    polyBinary(machine, linked, p, p.FSW1, divideFloat64);
    polyStore(machine, linked, p, p.FSW2);
    polyLoad(machine, linked, p, p.FSRXF + outside);
    polyBinary(machine, linked, p, p.FSRXF + visible, subtractFloat64);
    polyBinary(machine, linked, p, p.FSW2, multiplyFloat64);
    polyBinary(machine, linked, p, p.FSRXF + visible, addFloat64);
    polyStore(machine, linked, p, p.FSUX + output, true);

    polyLoad(machine, linked, p, p.FSZK);
    polyStore(machine, linked, p, p.FSW2);
    polyLoad(machine, linked, p, p.FSRYF + outside);
    polyBinary(machine, linked, p, p.FSRYF + visible, subtractFloat64);
    polyBinary(machine, linked, p, p.FSW2, multiplyFloat64);
    polyBinary(machine, linked, p, p.FSRYF + visible, addFloat64);
    polyStore(machine, linked, p, p.FSUY + output, true);
  }
  polyMove(machine, linked, p, p.FSUNEG, p.FSUZ + output);
}

function polyRotate(machine, linked, p) {
  const memory = machine.memory;
  const count = memory[p.PJnrv] | 0;
  const mode = memory[p.PJmode] | 0;
  memory[p.PJvr] = 0;
  memory[p.PJdoflag] = 0;
  for (let vertex = 0; vertex < count; vertex += 1) {
    polyLoad(machine, linked, p, p.FSINZ + vertex);
    polyBinary(machine, linked, p, p.FSCAMZ, subtractFloat64);
    polyStore(machine, linked, p, p.FSZZ, true);
    polyLoad(machine, linked, p, p.FSINX + vertex);
    polyBinary(machine, linked, p, p.FSCAMX, subtractFloat64);
    polyStore(machine, linked, p, p.FSXX, true);
    polyLoad(machine, linked, p, p.FSINY + vertex);
    polyBinary(machine, linked, p, p.FSCAMY, subtractFloat64);
    polyStore(machine, linked, p, p.FSYY, true);

    polyLoad(machine, linked, p, p.FSZZ);
    polyBinary(machine, linked, p, mode === 0 ? p.FSPSB : p.FSTSB, multiplyFloat64);
    polyStore(machine, linked, p, p.FSW0);
    polyLoad(machine, linked, p, p.FSXX);
    polyBinary(machine, linked, p, mode === 0 ? p.FSPCB : p.FSTCB, multiplyFloat64);
    polyBinary(machine, linked, p, p.FSW0, addFloat64);
    polyStore(machine, linked, p, p.FSRXF + vertex, true);

    polyLoad(machine, linked, p, p.FSZZ);
    polyBinary(machine, linked, p, p.FSTCB, multiplyFloat64);
    polyStore(machine, linked, p, p.FSW0);
    polyLoad(machine, linked, p, p.FSXX);
    polyBinary(machine, linked, p, p.FSTSB, multiplyFloat64);
    polyReverse(machine, linked, p, p.FSW0, subtractFloat64);
    polyStore(machine, linked, p, p.FSZ2, true);

    polyLoad(machine, linked, p, p.FSZ2);
    polyBinary(machine, linked, p, p.FSTCA, multiplyFloat64);
    polyStore(machine, linked, p, p.FSW0);
    polyLoad(machine, linked, p, p.FSYY);
    polyBinary(machine, linked, p, p.FSTSA, multiplyFloat64);
    polyBinary(machine, linked, p, p.FSW0, addFloat64);
    polyStore(machine, linked, p, p.FSW1);
    polyStore(machine, linked, p, p.FSRZF + vertex, true);
    const comparison = polyCompare(machine, linked, p, p.FSW1, p.FSUNEG);
    const visible = comparison !== 2 && comparison >= 0 ? 1 : 0;
    memory[p.rwf + vertex] = visible;
    if (visible !== 0) memory[p.PJdoflag] = (memory[p.PJdoflag] + 1) | 0;

    polyLoad(machine, linked, p, p.FSYY);
    polyBinary(machine, linked, p, mode === 0 ? p.FSPCA : p.FSTCA, multiplyFloat64);
    polyStore(machine, linked, p, p.FSW0);
    polyLoad(machine, linked, p, p.FSZ2);
    polyBinary(machine, linked, p, mode === 0 ? p.FSPSA : p.FSTSA, multiplyFloat64);
    polyReverse(machine, linked, p, p.FSW0, subtractFloat64);
    polyStore(machine, linked, p, p.FSRYF + vertex, true);
    memory[p.PJvr] = vertex + 1;
  }
  machine.A = count;
  machine.C = mode;
}

function polyZclip(machine, linked, p) {
  const memory = machine.memory;
  const count = memory[p.PJnrv] | 0;
  memory[p.PJvr] = 0;
  memory[p.PJdi] = 0;
  memory[p.PJdx] = count - 1;
  let output = 0;
  for (let vertex = 0; vertex < count; vertex += 1) {
    memory[p.PJvr] = vertex;
    if ((memory[p.rwf + vertex] | 0) !== 0) {
      polyMove(machine, linked, p, p.FSRXF + vertex, p.FSUX + output);
      polyMove(machine, linked, p, p.FSRYF + vertex, p.FSUY + output);
      polyMove(machine, linked, p, p.FSRZF + vertex, p.FSUZ + output);
      output += 1;
      memory[p.PJdi] = output;
      continue;
    }
    const previous = vertex > 0 ? vertex - 1 : count - 1;
    const next = vertex < count - 1 ? vertex + 1 : 0;
    memory[p.PJpv] = previous;
    memory[p.PJnv] = next;
    const previousVisible = memory[p.rwf + previous] | 0;
    const nextVisible = memory[p.rwf + next] | 0;
    if (previousVisible === 0 && nextVisible === 0) continue;
    memory[p.PJbx] = vertex;
    if (previousVisible !== 0 && nextVisible !== 0) {
      memory[p.PJvv] = previous;
      polyZemit(machine, linked, p);
      output += 1;
      memory[p.PJdi] = output;
      memory[p.PJvv] = next;
      polyZemit(machine, linked, p);
      output += 1;
      memory[p.PJdi] = output;
    } else {
      memory[p.PJvv] = previousVisible !== 0 ? previous : next;
      polyZemit(machine, linked, p);
      output += 1;
      memory[p.PJdi] = output;
    }
  }
  memory[p.PJvr] = count;
  memory[p.PJvr2] = output;
  memory[p.PJvr22] = output + output;
}

function polyZload(machine, linked, p) {
  const memory = machine.memory;
  const count = memory[p.PJnrv] | 0;
  memory[p.PJvr] = 0;
  for (let vertex = 0; vertex < count; vertex += 1) {
    polyMove(machine, linked, p, p.FSRXF + vertex, p.FSUX + vertex);
    polyMove(machine, linked, p, p.FSRYF + vertex, p.FSUY + vertex);
    polyMove(machine, linked, p, p.FSRZF + vertex, p.FSUZ + vertex);
    memory[p.PJvr] = vertex + 1;
  }
  memory[p.PJvr2] = count;
  memory[p.PJvr22] = count + count;
}

function polyProject3d(machine, linked, p) {
  const memory = machine.memory;
  const count = memory[p.PJvr2] | 0;
  memory[p.PJvr] = 0;
  for (let vertex = 0; vertex < count; vertex += 1) {
    polyLoad(machine, linked, p, p.FSUNO);
    polyBinary(machine, linked, p, p.FSUZ + vertex, divideFloat64);
    polyStore(machine, linked, p, p.FSW3);
    polyBinary(machine, linked, p, p.FSUX + vertex, multiplyFloat64);
    polyBinary(machine, linked, p, p.FSXC, addFloat64);
    polyStore(machine, linked, p, p.FSW0);
    polyStore(machine, linked, p, p.FSVX0 + vertex, true);
    polyLoad(machine, linked, p, p.FSW0);
    polyInteger(machine, linked, p);
    memory[p.mp + vertex * 2] = memory[p.FI];

    polyLoad(machine, linked, p, p.FSW3);
    polyBinary(machine, linked, p, p.FSUY + vertex, multiplyFloat64);
    polyBinary(machine, linked, p, p.FSYC, addFloat64);
    polyStore(machine, linked, p, p.FSW0);
    polyStore(machine, linked, p, p.FSVY0 + vertex, true);
    polyLoad(machine, linked, p, p.FSW0);
    polyInteger(machine, linked, p);
    memory[p.mp + vertex * 2 + 1] = memory[p.FI];
    memory[p.PJvr] = vertex + 1;
  }
}

function polyBounds(memory, p) {
  let maximumX = p.PGLBX;
  let maximumY = p.PGLBY;
  let minimumX = p.PGUBX;
  let minimumY = p.PGUBY;
  const count = memory[p.BXn] | 0;
  memory[p.BXmaxx] = maximumX;
  memory[p.BXmaxy] = maximumY;
  memory[p.BXminx] = minimumX;
  memory[p.BXminy] = minimumY;
  for (let vertex = count - 1; vertex >= 0; vertex -= 1) {
    memory[p.PGi] = vertex;
    const point = p.mp + vertex * 2;
    const x = memory[point] | 0;
    const y = memory[point + 1] | 0;
    if (x < minimumX) minimumX = x;
    if (x > maximumX) maximumX = x;
    if (y < minimumY) minimumY = y;
    if (y > maximumY) maximumY = y;
    memory[p.BXminx] = minimumX;
    memory[p.BXmaxx] = maximumX;
    memory[p.BXminy] = minimumY;
    memory[p.BXmaxy] = maximumY;
  }
  memory[p.PGi] = -1;
  let gates = 0;
  if (maximumX >= p.PGUBX) { gates += 1; maximumX = p.PGUBX; }
  if (maximumY >= p.PGUBY) { gates += 1; maximumY = p.PGUBY; }
  if (minimumX < p.PGLBX) { gates += 1; minimumX = p.PGLBX; }
  if (minimumY < p.PGLBY) { gates += 1; minimumY = p.PGLBY; }
  memory[p.BXsi] = gates;
  memory[p.BXmaxx] = maximumX & 0xffff;
  memory[p.BXmaxy] = maximumY & 0xffff;
  memory[p.BXminx] = minimumX & 0xffff;
  memory[p.BXminy] = minimumY & 0xffff;
}

function polyOutside(machine, linked, p, slot) {
  const memory = machine.memory;
  const comparison = polyCompare(machine, linked, p, slot, memory[p.CLbnd] | 0);
  memory[p.PGFj] = 0;
  const outside = (memory[p.CLdir] | 0) === 0
    ? comparison === 2 || comparison < 0
    : comparison !== 2 && comparison > 0;
  if (outside) memory[p.PGFj] = 1;
  return outside;
}

function polyEmit1(machine, linked, p) {
  const memory = machine.memory;
  const outside = memory[p.PJbx] | 0;
  const visible = memory[p.PJvv] | 0;
  const inputP = memory[p.CLxi] | 0;
  const inputQ = memory[p.CLyi] | 0;
  const outputP = memory[p.CLxo] | 0;
  const outputQ = memory[p.CLyo] | 0;
  const output = memory[p.CLo] | 0;
  const comparison = polyCompare(
    machine, linked, p, inputP + outside, inputP + visible,
  );
  if (comparison !== 0) {
    polyLoad(machine, linked, p, memory[p.CLbnd] | 0);
    polyBinary(machine, linked, p, inputP + visible, subtractFloat64);
    polyStore(machine, linked, p, p.FSW0);
    polyLoad(machine, linked, p, inputP + visible);
    polyReverse(machine, linked, p, inputP + outside, subtractFloat64);
    polyStore(machine, linked, p, p.FSW1);
    polyLoad(machine, linked, p, p.FSW0);
    polyBinary(machine, linked, p, p.FSW1, divideFloat64);
    polyStore(machine, linked, p, p.FSW2);
    polyLoad(machine, linked, p, inputQ + outside);
    polyBinary(machine, linked, p, inputQ + visible, subtractFloat64);
    polyBinary(machine, linked, p, p.FSW2, multiplyFloat64);
    polyBinary(machine, linked, p, inputQ + visible, addFloat64);
  } else polyLoad(machine, linked, p, inputQ + outside);

  if ((memory[p.CLint] | 0) !== 0) {
    polyInteger(machine, linked, p);
    memory[p.mp + output * 2 + 1] = memory[p.FI];
    memory[p.mp + output * 2] = p.PGUBX;
  } else {
    polyStore(machine, linked, p, outputQ + output);
    polyMove(machine, linked, p, memory[p.CLbnd] | 0, outputP + output);
  }
}

function polyClip(machine, linked, p) {
  const memory = machine.memory;
  const count = memory[p.CLn] | 0;
  memory[p.CLo] = 0;
  memory[p.CLi] = 0;
  memory[p.PJdx] = count - 1;
  let output = 0;
  for (let input = 0; input < count; input += 1) {
    memory[p.CLi] = input;
    if (polyOutside(machine, linked, p, (memory[p.CLxi] | 0) + input)) {
      const previous = input > 0 ? input - 1 : count - 1;
      const next = input < count - 1 ? input + 1 : 0;
      memory[p.PJbx] = input;
      memory[p.PJpv] = previous;
      memory[p.PJnv] = next;
      const previousOutside = polyOutside(
        machine, linked, p, (memory[p.CLxi] | 0) + previous,
      );
      memory[p.CLt] = previousOutside ? 1 : 0;
      const nextOutside = polyOutside(
        machine, linked, p, (memory[p.CLxi] | 0) + next,
      );
      if (previousOutside && nextOutside) continue;
      if (!previousOutside && !nextOutside) {
        memory[p.PJvv] = previous;
        polyEmit1(machine, linked, p);
        output += 1;
        memory[p.CLo] = output;
        memory[p.PJvv] = next;
        polyEmit1(machine, linked, p);
        output += 1;
        memory[p.CLo] = output;
      } else {
        memory[p.PJvv] = previousOutside ? next : previous;
        polyEmit1(machine, linked, p);
        output += 1;
        memory[p.CLo] = output;
      }
    } else if ((memory[p.CLint] | 0) === 0) {
      polyMove(machine, linked, p, (memory[p.CLxi] | 0) + input, (memory[p.CLxo] | 0) + output);
      polyMove(machine, linked, p, (memory[p.CLyi] | 0) + input, (memory[p.CLyo] | 0) + output);
      output += 1;
      memory[p.CLo] = output;
    } else {
      polyLoad(machine, linked, p, (memory[p.CLxi] | 0) + input);
      polyInteger(machine, linked, p);
      memory[p.mp + output * 2] = memory[p.FI];
      polyLoad(machine, linked, p, (memory[p.CLyi] | 0) + input);
      polyInteger(machine, linked, p);
      memory[p.mp + output * 2 + 1] = memory[p.FI];
      output += 1;
      memory[p.CLo] = output;
    }
  }
  memory[p.CLi] = count;
  memory[p.CLout] = output;
}

function poly3d(machine, linked) {
  const memory = machine.memory;
  const p = poly3dAddresses(linked);
  memory[p.PJmode] = 0;
  polyRotate(machine, linked, p);
  memory[p.PJgate] = 1;
  if ((memory[p.PJdoflag] | 0) === 0) return;
  if ((memory[p.PJdoflag] | 0) === (memory[p.PJnrv] | 0)) polyZload(machine, linked, p);
  else {
    polyZclip(machine, linked, p);
    memory[p.PJgate] = 2;
    if ((memory[p.PJvr2] | 0) < 3) return;
  }

  polyProject3d(machine, linked, p);
  memory[p.BXn] = memory[p.PJvr2];
  polyBounds(memory, p);
  memory[p.PJgate] = 0;
  if ((memory[p.BXsi] | 0) !== 0) {
    const stages = [
      [p.FSVY0, p.FSVX0, p.FSVY1, p.FSVX1, p.FSLBYF, 0, 0, p.PJvr3, 3],
      [p.FSVY1, p.FSVX1, p.FSVY2, p.FSVX2, p.FSUBYF, 1, 0, p.PJvr4, 4],
      [p.FSVX2, p.FSVY2, p.FSVX3, p.FSVY3, p.FSLBXF, 0, 0, p.PJvr5, 5],
      [p.FSVX3, p.FSVY3, 0, 0, p.FSUBXF, 1, 1, p.PJvr6, 6],
    ];
    let count = memory[p.PJvr2] | 0;
    for (const [xi, yi, xo, yo, bound, direction, integer, result, gate] of stages) {
      memory[p.CLxi] = xi;
      memory[p.CLyi] = yi;
      memory[p.CLxo] = xo;
      memory[p.CLyo] = yo;
      memory[p.CLn] = count;
      memory[p.CLbnd] = bound;
      memory[p.CLdir] = direction;
      memory[p.CLint] = integer;
      polyClip(machine, linked, p);
      count = memory[p.CLout] | 0;
      memory[result] = count;
      memory[p.PJgate] = gate;
      if (count < 3) return;
    }
    memory[p.PJvr2] = memory[p.PJvr6];
    memory[p.PJgate] = 0;
  }
  memory[p.DBn] = memory[p.PJvr2];
  drawPolygon(machine, linked);
}

function polymapAddresses(linked) {
  let cached = polymapAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "PJpreproject", "PJminx", "PJmaxx", "SPterrain", "SPmapfast", "SPpixfast",
    "SPtrifast", "SPcull", "SPhalf", "SPflar", "SPtinta", "SPescr", "SPsrc",
    "SPi", "SPsec", "SPdi", "SPcl", "SPu", "SPv", "SPun", "SPvn", "SPax",
    "SPdx", "SPbp", "SPsi", "SPch", "SPbx", "SPt", "SPn", "SPsave",
    "PGfwbase", "PGnwbase", "PGfpartbase", "PGipartbase", "PGtexf", "PGtexoff",
    "PGtexi", "PGtexv", "PGtmp", "PGdi", "PGval", "PGi", "PGj", "CSpix",
    "EWvr22", "EWminy", "EWmaxy", "EWsi", "EWx1", "EWy1", "EWx2", "EWy2",
    "EWity", "EWjty", "EWax", "EWcx", "EWh", "FS16", "FSVX", "FSVY",
    "FSVZ", "FSK1", "FSK2", "FSK3", "D64THLO", "D64THHI", "D64QLO",
    "D64QHI", "PJthird0", "PJthird1", "ipart", "fpart", "nw", "SADPT",
    "RPSM", "RPBG", "RNGLB", "PGSCRT", "PGSCRE", "PGDOFF",
  ];
  cached = {
    ...poly3dAddresses(linked),
    ...Object.fromEntries(names.map((name) => [name, address(linked, name)])),
  };
  cached.page = (cached.nw + cached.SADPT) >>> 0;
  polymapAddressCaches.set(linked, cached);
  return cached;
}

const POLYGON_GRADIENTS = Object.freeze([
  [0xeb, 0xe7, 0xed, 0xe5, 0xf6, 0],
  [0xeb, 0xea, 0xed, 0xe8, 0xf6, 1],
  [0xe8, 0xe7, 0xea, 0xe5, 0x1a, 2],
  [0xed, 0xe6, 0xec, 0xe7, 0xf5, 3],
  [0xed, 0xe9, 0xec, 0xea, 0xf5, 4],
  [0xea, 0xe6, 0xe9, 0xe7, 0x1a, 5],
  [0xec, 0xe5, 0xeb, 0xe6, 0xf4, 6],
  [0xec, 0xe8, 0xeb, 0xe9, 0xf4, 7],
  [0xe9, 0xe5, 0xe8, 0xe6, 0x12, 8],
]);

function prepareMappedVectors(machine, linked, p, vertices, fast) {
  const memory = machine.memory;
  memory[p.PJdx] = vertices;
  if (vertices === 3) {
    memory[p.PJthird0] = p.D64THLO;
    memory[p.PJthird1] = p.D64THHI;
  } else {
    memory[p.PJthird0] = p.D64QLO;
    memory[p.PJthird1] = p.D64QHI;
  }
  polygonMidpoint(machine, linked, vertices);
  memory[p.PJvr] = 0;
  transformMappedVertices(machine, linked);
  memory[p.PJvv] = vertices - 1;
  preparePolygonVectors(machine, linked, vertices - 1);
  if (fast) polygonGradients(machine, linked);
  else {
    for (const record of POLYGON_GRADIENTS) {
      [memory[p.CLxi], memory[p.CLyi], memory[p.CLxo], memory[p.CLyo],
        memory[p.CLbnd], memory[p.CLt]] = record;
      polygonGradient(machine, linked, ...record);
    }
  }
}

function prepareMappedBlockSteps(machine, linked, p) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  for (const [source, destination] of [
    [p.FSVX, p.FSK1], [p.FSVY, p.FSK2], [p.FSVZ, p.FSK3],
  ]) {
    let result = scalarBinaryNumber(
      readFloat64(memory, p.fw + source * 2),
      readFloat64(memory, p.fw + p.FS16 * 2),
      control,
      "multiply",
    );
    writeScalarScratch(machine, linked, result);
    result = narrowScalar(machine, linked, result);
    writeFloat64(memory, p.fw + destination * 2, result);
  }
  if ((memory[p.SPcull] | 0) !== 0) {
    for (const slot of [p.FSK1, p.FSK2, p.FSK3]) {
      const input = readFloat64(memory, p.fw + slot * 2);
      let result = scalarBinaryNumber(input, input, control, "add");
      writeScalarScratch(machine, linked, result);
      result = narrowScalar(machine, linked, result);
      writeFloat64(memory, p.fw + slot * 2, result);
    }
  }
}

function drawConstantMergerPolygon(machine, linked, p) {
  const memory = machine.memory;
  memory[p.EWvr22] = memory[p.PJvr22];
  memory[p.EWminy] = memory[p.BXminy];
  memory[p.EWmaxy] = memory[p.BXmaxy];
  memory[p.PGfwbase] = p.fw;
  memory[p.PGfpartbase] = p.fpart;
  memory[p.PGipartbase] = p.ipart;
  initializePolygonRows(machine, linked);
  polygonEdges(machine, linked);
  memory[p.SPsrc] = 1;
  mappedPageStore(memory, p, (p.PGSCRT + p.PGDOFF) & 0xffff, memory[p.SPtinta]);
  mappedPageStore(memory, p, (p.PGSCRE + p.PGDOFF) & 0xffff, memory[p.SPescr]);
  const maximum = memory[p.BXmaxy] | 0;
  let row = memory[p.BXminy] | 0;
  for (; row <= maximum; row += 1) {
    memory[p.SPi] = row;
    const first = memory[p.ipart + row] | 0;
    const count = ((memory[p.fpart + row] | 0) - first) | 0;
    memory[p.SPsec] = count > 0 ? count % 16 === 0 ? 0 : (count % 16) - 16 : count;
    let di = (Math.imul(row, 320) + first) & 0xffff;
    memory[p.SPdi] = di;
    for (let pixel = 0; pixel < count; pixel += 1) {
      const destination = (di + 4) & 0xffff;
      const old = memory[p.page + destination] & 0xff;
      const output = (old & 192) | ((old & 63) >>> 1);
      di = (di + 1) & 0xffff;
      memory[p.SPdi] = di;
      memory[p.SPch] = output;
      mappedPageStore(memory, p, (di + 3) & 0xffff, output);
    }
    if (count > 0) memory[p.CSpix] = (memory[p.CSpix] + count) | 0;
  }
  memory[p.SPi] = row;
}

function polymap(machine, linked) {
  const memory = machine.memory;
  const p = polymapAddresses(linked);
  memory[p.PJgate] = 0;
  let originalVertices = memory[p.PJnrv] | 0;
  if (originalVertices === 3) {
    polyMove(machine, linked, p, p.FSINX + 2, p.FSINX + 3);
    polyMove(machine, linked, p, p.FSINY + 2, p.FSINY + 3);
    polyMove(machine, linked, p, p.FSINZ + 2, p.FSINZ + 3);
  }
  memory[p.PJmode] = 1;
  memory[p.PJdx] = originalVertices;
  if ((memory[p.PJpreproject] | 0) === 0) {
    if (originalVertices === 3) {
      memory[p.PJnrv] = 3;
      polyRotate(machine, linked, p);
      polyMove(machine, linked, p, p.FSRXF + 2, p.FSRXF + 3);
      polyMove(machine, linked, p, p.FSRYF + 2, p.FSRYF + 3);
      polyMove(machine, linked, p, p.FSRZF + 2, p.FSRZF + 3);
      const flag = memory[p.rwf + 2] | 0;
      memory[p.rwf + 3] = flag;
      memory[p.PJdoflag] = (memory[p.PJdoflag] + flag) | 0;
    } else {
      memory[p.PJnrv] = 4;
      polyRotate(machine, linked, p);
    }
  }
  memory[p.PJvr] = 4;
  memory[p.PJnrv] = 4;
  memory[p.PJgate] = 1;
  if ((memory[p.PJdoflag] | 0) === 0) return;
  if ((memory[p.PJdoflag] | 0) === 4) polyZload(machine, linked, p);
  else {
    polyZclip(machine, linked, p);
    memory[p.PJgate] = 2;
    if ((memory[p.PJvr2] | 0) < 3) return;
  }
  if ((memory[p.PJpreproject] | 0) === 0) projectMappedPolygon(machine, linked);
  memory[p.PJpreproject] = 0;
  memory[p.PJgate] = 7;
  if ((memory[p.PJminx] | 0) > p.PGUBX || (memory[p.PJmaxx] | 0) < p.PGLBX
    || (memory[p.BXminy] | 0) > p.PGUBY || (memory[p.BXmaxy] | 0) < p.PGLBY) return;
  if ((memory[p.BXminy] | 0) < p.PGLBY) memory[p.BXminy] = p.PGLBY;
  if ((memory[p.BXmaxy] | 0) > p.PGUBY) memory[p.BXmaxy] = p.PGUBY;
  memory[p.PJgate] = 8;
  if ((memory[p.BXminy] | 0) > (memory[p.BXmaxy] | 0)) return;

  if ((memory[p.PGtexf] | 0) === 7 && (memory[p.SPflar] & 15) === 4
    && (memory[p.SPtinta] | 0) === 0 && (memory[p.SPcull] | 0) === 0
    && (memory[p.SPhalf] | 0) === 0) {
    drawConstantMergerPolygon(machine, linked, p);
    memory[p.PJgate] = 0;
    return;
  }

  originalVertices = memory[p.PJdx] | 0;
  memory[p.PJnrv] = originalVertices;
  const fastVectors = (memory[p.SPterrain] | memory[p.SPtrifast] | memory[p.SPmapfast]) !== 0;
  prepareMappedVectors(machine, linked, p, originalVertices, fastVectors);
  memory[p.PJnrv] = 4;
  prepareMappedBlockSteps(machine, linked, p);

  memory[p.EWvr22] = memory[p.PJvr22];
  memory[p.EWminy] = memory[p.BXminy];
  memory[p.EWmaxy] = memory[p.BXmaxy];
  memory[p.PGfwbase] = p.fw;
  memory[p.PGfpartbase] = p.fpart;
  memory[p.PGipartbase] = p.ipart;
  initializePolygonRows(machine, linked);
  polygonEdges(machine, linked);
  memory[p.SPsrc] = 1;
  mappedTrace(machine, linked, p);
  memory[p.PJgate] = 0;
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

function mappedTextureByte(machine, linked, p, u, v, publish = true) {
  const memory = machine.memory;
  const index = ((v & 0xff00) | ((u >>> 8) & 0xff)) & 0xffff;
  const formula = memory[p.PGtexf] | 0;
  let pixel;
  switch (formula) {
    case 1: pixel = ((index >>> 8) ^ (index & 0xff)) & 0xff; break;
    case 2: pixel = 1; break;
    case 3: pixel = index === 0 || index === 32768 || index === 65535 ? 255 : 0; break;
    case 4:
      pixel = memory[p.nw + p.RPSM + (memory[p.PGtexoff] | 0) + index] & 0xff;
      break;
    case 5:
      pixel = memory[p.nw + p.RPBG + (memory[p.PGtexoff] | 0) + index] & 0xff;
      break;
    case 6: pixel = memory[p.nw + p.RNGLB + index] & 0xff; break;
    case 7: pixel = 0; break;
    default: pixel = (Math.imul(index, 37) + 11) & 0xff; break;
  }
  if (publish) {
    memory[p.PGtexi] = index;
    memory[p.PGtmp] = index;
    memory[p.PGtexv] = pixel;
  }
  return pixel;
}

function mappedPageLoad(memory, p, offset) {
  offset &= 0xffff;
  memory[p.PGdi] = offset;
  const pixel = memory[p.page + offset] & 0xff;
  memory[p.PGval] = pixel;
  return pixel;
}

function mappedPageStore(memory, p, offset, pixel) {
  offset &= 0xffff;
  pixel &= 0xff;
  memory[p.PGdi] = offset;
  memory[p.PGval] = pixel;
  memory[p.page + offset] = pixel;
}

function mappedPixelLoop(machine, linked, p, count, culling, fast) {
  const memory = machine.memory;
  let di = memory[p.SPdi] & 0xffff;
  let u = memory[p.SPax] & 0xffff;
  let v = memory[p.SPdx] & 0xffff;
  const du = memory[p.SPbp] | 0;
  const dv = memory[p.SPsi] | 0;
  const flare = memory[p.SPflar] & 15;
  const mode = flare === 0 ? 0 : (flare & 1) !== 0 ? 1
    : (flare & 2) !== 0 ? 2 : (flare & 4) !== 0 ? 4 : 8;
  const step = culling ? 2 : 1;
  const scratchTint = (p.PGSCRT + p.PGDOFF) & 0xffff;
  const scratchEsc = (p.PGSCRE + p.PGDOFF) & 0xffff;
  const censusPerPixel = culling ? 2 : 1;
  for (let pixelIndex = 0; pixelIndex < count; pixelIndex += 1) {
    if (fast) {
      di = (di + step) & 0xffff;
      const destination = (di + (culling ? 2 : 3)) & 0xffff;
      const texture = mappedTextureByte(machine, linked, p, u, v, false);
      const pixel = mode === 1
        ? ((memory[p.page + ((di + 3) & 0xffff)] & 0xff) + texture) & 0xff
        : (texture + (memory[p.SPtinta] | 0)) & 0xff;
      u = (u + du) & 0xffff;
      memory[p.page + destination] = pixel;
      if (culling) memory[p.page + ((di + 3) & 0xffff)] = pixel;
      v = (v + dv) & 0xffff;
      continue;
    }

    let output;
    let texture;
    let destination;
    if (mode === 2 || mode === 4) {
      output = mappedPageLoad(memory, p, (di + 4) & 0xffff) & 63;
      memory[p.SPch] = output;
    }
    di = (di + step) & 0xffff;
    memory[p.SPdi] = di;
    if (mode === 0) {
      output = mappedPageLoad(memory, p, scratchTint);
      memory[p.SPch] = output;
    } else if (mode === 1) {
      output = mappedPageLoad(memory, p, (di + 3) & 0xffff);
      memory[p.SPch] = output;
    }
    texture = mappedTextureByte(machine, linked, p, u, v, true);
    if (mode === 8) memory[p.SPbx] = texture;
    output = ((memory[p.SPch] | 0) + texture) & 0xff;
    memory[p.SPch] = output;

    u = (u + du) & 0xffff;
    memory[p.SPax] = u;
    if (mode !== 8) {
      v = (v + dv) & 0xffff;
      memory[p.SPdx] = v;
    }
    if (mode === 2) {
      if ((output >>> 0) > 62) output = 62;
      memory[p.SPch] = output;
      destination = (di + (culling ? 2 : 3)) & 0xffff;
      memory[p.SPt] = destination;
      output = (mappedPageLoad(memory, p, destination) & 192) | output;
      output &= 0xff;
      memory[p.SPch] = output;
      mappedPageStore(memory, p, destination, output);
      memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
      if (culling) {
        mappedPageStore(memory, p, (di + 3) & 0xffff, output);
        memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
      }
    } else if (mode === 4) {
      output = (output + mappedPageLoad(memory, p, scratchTint)) & 0xff;
      memory[p.SPch] = output;
      output >>>= 1;
      memory[p.SPch] = output;
      destination = (di + (culling ? 2 : 3)) & 0xffff;
      memory[p.SPt] = destination;
      output = ((mappedPageLoad(memory, p, destination) & 192) | output) & 0xff;
      memory[p.SPch] = output;
      mappedPageStore(memory, p, destination, output);
      memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
      if (culling) {
        mappedPageStore(memory, p, (di + 3) & 0xffff, output);
        memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
      }
    } else {
      destination = (di + (culling ? 2 : 3)) & 0xffff;
      mappedPageStore(memory, p, destination, output);
      memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
      if (culling) {
        mappedPageStore(memory, p, (di + 3) & 0xffff, output);
        memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
      }
      if (mode === 8) {
        memory[p.SPsave] = di;
        let bump = output & 7;
        memory[p.SPn] = culling ? bump + 1 : bump;
        memory[p.SPt] = bump + 1;
        for (let index = 0; index < bump + 1; index += 1) di = (di - 320) & 0xffff;
        memory[p.SPdi] = di;
        output = ((memory[p.SPch] | 0) - mappedPageLoad(memory, p, scratchTint)) & 0xff;
        output = (output + mappedPageLoad(memory, p, scratchEsc)) & 0xff;
        output = (output + (memory[p.SPbx] | 0)) & 0xff;
        memory[p.SPch] = output;
        if (culling) {
          mappedPageStore(memory, p, (di + 642) & 0xffff, output);
          memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
          mappedPageStore(memory, p, (di + 643) & 0xffff, output);
          memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
        } else {
          mappedPageStore(memory, p, (di + 643) & 0xffff, output);
          memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
        }
        di = memory[p.SPsave] & 0xffff;
        memory[p.SPdi] = di;
        v = (v + dv) & 0xffff;
        memory[p.SPdx] = v;
      }
    }
    memory[p.SPcl] = (count - pixelIndex - 1) | 0;
  }
  memory[p.SPdi] = di;
  memory[p.SPax] = u;
  memory[p.SPdx] = v;
  memory[p.SPcl] = 0;
  if (!fast && count !== 0 && mode !== 8) {
    memory[p.CSpix] = memory[p.CSpix] | 0;
  }
}

function mappedScanline(machine, linked, p) {
  const memory = machine.memory;
  let remaining = memory[p.SPsec] | 0;
  const culling = (memory[p.SPcull] & 1) !== 0;
  const fast = (memory[p.SPterrain] | memory[p.SPpixfast]) !== 0;
  const blockSize = culling ? 32 : 16;
  while (remaining > 0) {
    let count = remaining > blockSize ? blockSize
      : culling ? (remaining + 2) & 0xff : remaining & 0xff;
    remaining = (remaining - blockSize) | 0;
    memory[p.SPsec] = remaining;
    if (culling) {
      if (count < 2) continue;
      count >>>= 1;
    } else if (count === 0) continue;
    memory[p.SPcl] = count;
    terrainUvNext(machine, linked);
    memory[p.SPsi] = ((memory[p.SPvn] - memory[p.SPv]) >> 4) & 0xffff;
    memory[p.SPbp] = ((memory[p.SPun] - memory[p.SPu]) >> 4) & 0xffff;
    memory[p.SPax] = memory[p.SPu] & 0xffff;
    memory[p.SPdx] = memory[p.SPv] & 0xffff;
    memory[p.SPu] = memory[p.SPun];
    memory[p.SPv] = memory[p.SPvn];
    const start = memory[p.SPdi] & 0xffff;
    if (culling) memory[p.SPsave] = start;
    mappedPixelLoop(machine, linked, p, count, culling, fast);
    if (culling) memory[p.SPdi] = (start + 32) & 0xffff;
  }
}

function mappedHalfScan(machine, linked, p, fast) {
  const memory = machine.memory;
  const row = (memory[p.SPi] | 0) - 1;
  const first = memory[p.ipart + row] | 0;
  const last = memory[p.fpart + row] | 0;
  memory[p.SPt] = first;
  let count = (last - first) | 0;
  if (count <= 0) return;
  memory[p.SPn] = count;
  let di = (Math.imul(memory[p.SPi] | 0, 320) + first) & 0xffff;
  memory[p.SPdi] = di;
  while (count !== 0) {
    let pixel;
    if (fast) pixel = memory[p.page + ((di - 316) & 0xffff)] & 0xff;
    else {
      pixel = mappedPageLoad(memory, p, (di - 316) & 0xffff);
      memory[p.SPch] = pixel;
    }
    if (fast) {
      memory[p.page + ((di + 4) & 0xffff)] = pixel;
      memory[p.page + ((di + 324) & 0xffff)] = pixel;
    } else {
      mappedPageStore(memory, p, (di + 4) & 0xffff, pixel);
      memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
      mappedPageStore(memory, p, (di + 324) & 0xffff, pixel);
      memory[p.CSpix] = (memory[p.CSpix] + 1) | 0;
    }
    di = (di + 1) & 0xffff;
    count -= 1;
    memory[p.SPn] = count;
  }
  memory[p.SPdi] = di;
}

function mappedTrace(machine, linked, p) {
  const memory = machine.memory;
  mappedPageStore(memory, p, (p.PGSCRT + p.PGDOFF) & 0xffff, memory[p.SPtinta]);
  mappedPageStore(memory, p, (p.PGSCRE + p.PGDOFF) & 0xffff, memory[p.SPescr]);
  memory[p.PJfwbase] = p.fw;
  memory[p.PJipartbase] = p.ipart;
  memory[p.PGfwbase] = p.fw;
  memory[p.PGnwbase] = p.nw;
  let row = memory[p.BXminy] | 0;
  const maximum = memory[p.BXmaxy] | 0;
  const fastHalfScan = (memory[p.SPterrain] | memory[p.SPpixfast]) !== 0;
  memory[p.SPi] = row;
  while (row <= maximum) {
    terrainTraceRow(machine, linked);
    const first = memory[p.ipart + row] | 0;
    const last = memory[p.fpart + row] | 0;
    memory[p.SPsec] = (last - first) | 0;
    memory[p.SPdi] = (Math.imul(row, 320) + first) & 0xffff;
    mappedScanline(machine, linked, p);
    if ((memory[p.SPhalf] & 1) !== 0) {
      row += 1;
      memory[p.SPi] = row;
      if (row > maximum) break;
      mappedHalfScan(machine, linked, p, fastHalfScan);
    }
    row += 1;
    memory[p.SPi] = row;
  }
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
    [SERVICE_IDS.scanNotEqual]: (machine, linked) => scanService(machine, linked, false),
    [SERVICE_IDS.scanEqual]: (machine, linked) => scanService(machine, linked, true),
    [SERVICE_IDS.databaseScan]: databaseScan,
    [SERVICE_IDS.copyCupolaPanel]: copyCupolaPanel,
    [SERVICE_IDS.drawStickLine]: drawStickLine,
    [SERVICE_IDS.rotateVertices]: (machine, linked) => rotateVertices(machine, linked, true),
    [SERVICE_IDS.rotateSelectedVertices]: (machine, linked) => rotateVertices(machine, linked, false),
    [SERVICE_IDS.projectMapGeneric]: projectMapGeneric,
    [SERVICE_IDS.project3d]: project3d,
    [SERVICE_IDS.drawPolygon]: drawPolygon,
    [SERVICE_IDS.poly3d]: poly3d,
    [SERVICE_IDS.polymap]: polymap,
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
  if (!Object.hasOwn(overrides, SERVICE_IDS.scanNotEqual)) {
    implementations[SERVICE_IDS.scanNotEqual].inline = (linked) => scanInline(linked, false);
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.scanEqual)) {
    implementations[SERVICE_IDS.scanEqual].inline = (linked) => scanInline(linked, true);
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.databaseScan)) {
    implementations[SERVICE_IDS.databaseScan].inline = databaseScanInline;
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.copyCupolaPanel)) {
    implementations[SERVICE_IDS.copyCupolaPanel].inline = copyCupolaPanelInline;
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.drawStickLine)) {
    implementations[SERVICE_IDS.drawStickLine].inline = drawStickLineInline;
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.compareFloat64)) {
    implementations[SERVICE_IDS.compareFloat64].inline = compareFloat64Inline;
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.alphaDim)) {
    implementations[SERVICE_IDS.alphaDim].inline = () => alphaDimInline("A", "B");
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.antialiasingDim)) {
    implementations[SERVICE_IDS.antialiasingDim].inline = antialiasingDimInline;
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.projectMapGeneric)) {
    implementations[SERVICE_IDS.projectMapGeneric].inline = projectMapGenericInline;
  }
  if (!Object.hasOwn(overrides, SERVICE_IDS.project3d)) {
    implementations[SERVICE_IDS.project3d].inline = project3dInline;
  }
  return implementations;
}
