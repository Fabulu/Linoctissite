import { canonicalName } from "../compiler/lexer.js";

const LINO_DONE = 0x646f6e65;
const LINO_FAIL = 0x6661696c;

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
  terrainMapped: "service:vhgndterrainmapped",
  terrainFacing: "service:vhgndterrainfacing",
  terrainTileFauna: "service:vhgndrendertilefauna",
  terrainRock: "service:vhgndrock",
  terrainTree: "service:vhgndtree",
  terrainGreenmush: "service:vhgndgreenmush",
  terrainTraverse: "service:vhgndtraversefaithful",
  waterBackdrop: "service:vhgndwaterbackdrop",
  denseAtmosphere: "service:vhgnddenseatmosphere",
  terrainRenderRandom: "service:vhgndrenderrandom",
  terrainVertexLoad: "service:vhgndvload",
  rectangle: "service:rectangle",
  surroundingBorder: "service:vhgndsurroundingborder",
  surroundingCompass: "service:vhgndcompass",
  surroundingHudString: "service:vhgndhuddrawstring",
  loadTgaPicture: "service:loadtgapicture",
  tileRegion: "service:tileregion",
  standardText: "service:stdwrite",
  searchEkeySession: "service:searchekeysessionslot",
  backupEkeySession: "service:backupekeysession",
  surfaceSsmooth: "service:sussmooth",
  surfaceLssmooth: "service:sulssmooth",
  surfacePsmooth: "service:supsmoothgrays",
  surfaceClear: "service:supclear",
  surfaceNegate: "service:sunegate",
  surfaceRandomPattern: "service:surndpat",
  surfaceSda: "service:susda",
  paletteShade: "service:palshade",
  paletteTavola: "service:paltavola",
  groundRoundHill: "service:grroundhill",
  groundStdCrater: "service:grstdcrater",
  groundTextureDarkline: "service:vhgndtexturedarklinecommon",
  groundPostSurface: "service:vhgndpostsurfacecommon",
  spaceFade: "service:vhsfade",
  flareSourceStick: "service:vhfsourcestick",
  glowRaster: "service:spglowraster",
  globeRaster: "service:spgloberaster",
  whiteRaster: "service:spwhite",
  drawMode2Cache: "service:vhdrawmode2cache",
  renderCupolaCache: "service:vhcrendercachecommon",
  drawCupolaPanel: "service:vhcdrawpanel",
  stick3d: "service:vhstick3d",
  flareSourceLine: "service:vhfsourcefline",
  flareDraw: "service:vhfdraw",
  panelOrbitProject: "service:vhporbitproject",
  panelMoonProject: "service:vhpmoonproject",
  panelIntegerStick: "service:vhpintegerstick",
  panelDigitPrepare: "service:vhpdigitprepare",
  panelMappedQuadLoad: "service:vhpmappedquadload",
  panelSystemOrbits: "service:vhpsystemorbits",
  panelMoonScoreBounds: "service:vhpmoonscorebounds",
  glassBubble: "service:spglassbubble",
  bodyVector: "service:vhgndbodyvector",
  starField: "service:vhsrebuilddrawcachecommon",
});

const symbolCaches = new WeakMap();
const codeHandleCaches = new WeakMap();
const dataViewCaches = new WeakMap();
const float64ViewCaches = new WeakMap();
const rasterAddressCaches = new WeakMap();
const poly3dAddressCaches = new WeakMap();
const polymapAddressCaches = new WeakMap();
const landedTerrainAddressCaches = new WeakMap();
const landedRockAddressCaches = new WeakMap();
const landedTreeRenderAddressCaches = new WeakMap();
const denseAtmosphereAddressCaches = new WeakMap();
const rectangleAddressCaches = new WeakMap();
const pixelEffectCaches = new WeakMap();
const tgaAddressCaches = new WeakMap();
const textAddressCaches = new WeakMap();
const ekeyAddressCaches = new WeakMap();
const surfaceBulkAddressCaches = new WeakMap();
const paletteShadeAddressCaches = new WeakMap();
const paletteTavolaAddressCaches = new WeakMap();
const groundRoundHillAddressCaches = new WeakMap();
const groundStdCraterAddressCaches = new WeakMap();
const groundTextureDarklineAddressCaches = new WeakMap();
const groundPostSurfaceAddressCaches = new WeakMap();
const spaceFadeAddressCaches = new WeakMap();
const flareSourceStickAddressCaches = new WeakMap();
const glowRasterAddressCaches = new WeakMap();
const globeRasterAddressCaches = new WeakMap();
const whiteRasterAddressCaches = new WeakMap();
const mode2CacheAddressCaches = new WeakMap();
const renderCupolaCacheAddressCaches = new WeakMap();
const drawCupolaPanelAddressCaches = new WeakMap();
const stick3dAddressCaches = new WeakMap();
const flareDrawAddressCaches = new WeakMap();
const panelRenderAddressCaches = new WeakMap();
const panelDigitAddressCaches = new WeakMap();
const panelMappedQuadAddressCaches = new WeakMap();
const glassBubbleAddressCaches = new WeakMap();
const bodyVectorAddressCaches = new WeakMap();
const bodyVectorValueCaches = new WeakMap();
const starFieldAddressCaches = new WeakMap();
const float32Scratch = new DataView(new ArrayBuffer(4));
const float64Scratch = new DataView(new ArrayBuffer(8));

const TERRAIN_HUD_GLYPHS = Object.freeze({
  38: 128, 40: 17556, 41: 5265, 42: 9664, 43: 1488, 44: 5120,
  45: 448, 46: 8192, 47: 672, 48: 31599, 49: 29843, 50: 29671,
  51: 31143, 52: 20340, 53: 31183, 54: 31695, 55: 18727, 56: 31727,
  57: 18927, 58: 1040, 63: 8615, 64: 16, 65: 23535, 66: 31471,
  67: 29263, 68: 15211, 69: 29391, 70: 4815, 71: 31567, 72: 23533,
  73: 9362, 74: 31524, 75: 23277, 76: 29257, 77: 23423, 78: 24573,
  79: 31599, 80: 5103, 81: 21359, 82: 23279, 83: 31183, 84: 9367,
  85: 31597, 86: 11117, 87: 24557, 88: 23213, 89: 9709, 90: 29351,
  92: 6105,
});

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

function float64View(memory) {
  let view = float64ViewCaches.get(memory);
  if (!view) {
    view = new Float64Array(memory.buffer, memory.byteOffset, memory.byteLength >>> 3);
    float64ViewCaches.set(memory, view);
  }
  return view;
}

function codeHandle(linked, name) {
  let cache = codeHandleCaches.get(linked);
  if (!cache) {
    cache = new Map();
    codeHandleCaches.set(linked, cache);
  }
  let handle = cache.get(name);
  if (handle === undefined) {
    const instruction = linked.labels.get(canonicalName(name.replace(/^service\s+/i, "")));
    handle = instruction === undefined ? -1 : instruction + 1;
    cache.set(name, handle);
  }
  return handle;
}

function readFloat64(memory, unit) {
  if ((unit & 1) === 0) return float64View(memory)[unit >>> 1];
  return dataView(memory).getFloat64(unit * 4, true);
}

function writeFloat64(memory, unit, number) {
  if ((unit & 1) === 0) {
    float64View(memory)[unit >>> 1] = number;
    return;
  }
  dataView(memory).setFloat64(unit * 4, number, true);
}

function readFloat64View(view, unit) {
  return view.getFloat64(unit * 4, true);
}

function writeFloat64View(view, unit, number) {
  view.setFloat64(unit * 4, number, true);
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
  float64Scratch.setFloat64(0, number, true);
  const bits = float64Scratch.getBigUint64(0, true);
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
  const quarter = (pointer) => (((memory[pointer - 320] & 0xff)
    + (memory[pointer] & 0xff) + (memory[pointer + 320] & 0xff)
    + (memory[pointer + 640] & 0xff)) & 0xfc) >>> 2;
  let destination = base + 320;
  let q0 = quarter(destination);
  let q1 = quarter(destination + 1);
  let q2 = quarter(destination + 2);
  let q3 = quarter(destination + 3);
  for (let index = 0; index < 56960; index += 1) {
    // The native back-edge lands on XOR EBP,EBP immediately before the four
    // packed-lane quarters. The accumulator is local to one destination.
    memory[destination] = ((q0 + q1 + q2 + q3) & 0xff) >>> 2;
    destination += 1;
    q0 = q1;
    q1 = q2;
    q2 = q3;
    q3 = quarter(destination + 3);
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
    if (machine.noctisSolidTouched) machine.noctisSolidTouched[offset] = 1;
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
    "BXmaxx", "BXminy", "BXmaxy", "PGj", "PGdi", "PGval", "SCdi", "SCcx", "SCal", "SCzf",
    "CSbyte", "CSrows", "CSfb1", "CSseg", "SGxp", "SGyp", "SGxa", "SGya",
    "SGpi", "SGpf", "SGa", "SGb", "SGL", "SGch", "SGgx", "SGgy", "SGt",
  ];
  cached = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
  cached.page = noctisBuffer(linked, "SADPT");
  rasterAddressCaches.set(linked, cached);
  return cached;
}

function scanRasterPage(memory, p, repeatEqual) {
  // The polygon row scanner invokes this byte loop several times per row. Keep
  // its VM-visible cursor, sample, and flag writes, including the zero-count
  // no-op, while avoiding repeated symbol lookup and generic service dispatch.
  let count = memory[p.SCcx] >>> 0;
  if (count === 0) return;
  let offset = memory[p.SCdi] & 0xffff;
  const expected = memory[p.SCal] | 0;
  let sample = 0;
  let equal = false;
  do {
    sample = memory[p.page + offset] & 0xff;
    count = (count - 1) >>> 0;
    offset = (offset + 1) & 0xffff;
    equal = sample === expected;
  } while (count !== 0 && equal === repeatEqual);
  memory[p.PGdi] = (offset - 1) & 0xffff;
  memory[p.PGval] = sample;
  memory[p.SCzf] = equal ? 1 : 0;
  memory[p.SCdi] = offset;
  memory[p.SCcx] = count | 0;
}

function scanPolygonRow(machine, p) {
  const memory = machine.memory;
  let accumulator = memory[p.DBdi] | 0;
  memory[p.SCdi] = accumulator;
  memory[p.SCcx] = memory[p.DBbytes];
  memory[p.SCal] = 255;
  memory[p.SCzf] = 0;
  memory[p.DBmode] = 0;
  scanRasterPage(memory, p, false);
  accumulator = memory[p.SCzf] | 0;
  machine.A = accumulator;
  if (accumulator === 0) return;
  accumulator = memory[p.SCdi] | 0;
  machine.A = accumulator;
  memory[p.DBsi] = accumulator;
  scanRasterPage(memory, p, true);
  accumulator = memory[p.SCdi] | 0;
  machine.A = accumulator;
  memory[p.DBbx] = accumulator;
  scanRasterPage(memory, p, false);
  accumulator = memory[p.SCzf] | 0;
  machine.A = accumulator;
  if (accumulator === 0) {
    memory[p.DBmode] = 2;
    return;
  }
  scanRasterPage(memory, p, true);
  accumulator = memory[p.SCdi] | 0;
  machine.A = accumulator;
  memory[p.DBdi] = accumulator;
  memory[p.DBmode] = 1;
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
      if (machine.noctisSolidTouched) machine.noctisSolidTouched[offset] = 1;
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
    if (machine.noctisSolidTouched) machine.noctisSolidTouched[offset] = 1;
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
      if (machine.noctisSolidTouched) machine.noctisSolidTouched[rawOffset & 0xffff] = 1;
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
      if (machine.noctisSolidTouched) machine.noctisSolidTouched[destination] = 1;
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
    scanPolygonRow(machine, p);
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

function drawSolidConvexFast(machine, p, xs, ys, count, colour, leftEdges, rightEdges) {
  const memory = machine.memory;
  let minimumX = xs[0];
  let maximumX = xs[0];
  let minimumY = ys[0];
  let maximumY = ys[0];
  for (let vertex = 1; vertex < count; vertex += 1) {
    if (xs[vertex] < minimumX) minimumX = xs[vertex];
    if (xs[vertex] > maximumX) maximumX = xs[vertex];
    if (ys[vertex] < minimumY) minimumY = ys[vertex];
    if (ys[vertex] > maximumY) maximumY = ys[vertex];
  }
  memory[p.BXminx] = minimumX;
  memory[p.BXmaxx] = maximumX;
  memory[p.BXminy] = minimumY;
  memory[p.BXmaxy] = maximumY;
  memory[p.DBn] = count;
  memory[p.DB8n] = Math.imul(count - 1, 8);
  if (minimumY === maximumY) {
    for (let x = minimumX; x <= maximumX; x += 1) {
      const offset = (Math.imul(minimumY, 320) + x + 4) & 0xffff;
      memory[p.page + offset] = colour & 255;
      if (machine.noctisSolidTouched) machine.noctisSolidTouched[offset] = 1;
    }
    memory[p.CSbyte] = (memory[p.CSbyte] + maximumX - minimumX + 1) | 0;
    return;
  }
  for (let y = minimumY; y <= maximumY; y += 1) {
    leftEdges[y] = 32767;
    rightEdges[y] = -32768;
  }
  const mark = (x, y) => {
    if (x < leftEdges[y]) leftEdges[y] = x;
    if (x > rightEdges[y]) rightEdges[y] = x;
    const offset = (Math.imul(y, 320) + x + 4) & 0xffff;
    memory[p.page + offset] = 255;
    if (machine.noctisSolidTouched) machine.noctisSolidTouched[offset] = 1;
  };
  for (let edge = 0; edge < count; edge += 1) {
    let xp = xs[edge] | 0;
    let yp = ys[edge] | 0;
    let xa = xs[(edge + 1) % count] | 0;
    let ya = ys[(edge + 1) % count] | 0;
    if (xp === xa) {
      const low = Math.min(yp, ya);
      const high = Math.max(yp, ya);
      for (let y = low; y <= high; y += 1) mark(xp, y);
      continue;
    }
    if (xa < xp) {
      [xp, xa] = [xa, xp];
      [yp, ya] = [ya, yp];
    }
    const rawXDelta = xa - xp;
    const rawYDelta = ya - yp;
    let length = Math.max(rawXDelta, Math.abs(rawYDelta)) + 1;
    const divisor = length & 0xffff;
    const xStep = Math.trunc(((rawXDelta << 16) >>> 0) / divisor) & 0xffff;
    let yStep = Math.trunc(((Math.abs(rawYDelta) << 16) >>> 0) / divisor) & 0xffff;
    if (rawYDelta < 0) yStep = -yStep;
    let globalX = xp << 16;
    let globalY = yp << 16;
    const limit = xa << 16;
    do {
      mark(globalX >> 16, globalY >> 16);
      globalX = (globalX + xStep) | 0;
      globalY = (globalY + yStep) | 0;
      length -= 1;
    } while ((globalX >>> 0) < (limit >>> 0));
  }
  let bytes = 0;
  for (let y = minimumY; y <= maximumY; y += 1) {
    const left = leftEdges[y];
    const right = rightEdges[y];
    if (left > right) continue;
    const countToFill = right - left;
    let offset = (Math.imul(y, 320) + left + 4) & 0xffff;
    for (let pixel = 0; pixel < countToFill; pixel += 1) {
      memory[p.page + offset] = colour & 255;
      if (machine.noctisSolidTouched) machine.noctisSolidTouched[offset] = 1;
      offset = (offset + 1) & 0xffff;
    }
    bytes += countToFill;
  }
  memory[p.CSbyte] = (memory[p.CSbyte] + bytes) | 0;
}

function clipSolidPolygonAndDraw(machine, p, topology, count, colour, control) {
  let inputX = topology.screenClipX0;
  let inputY = topology.screenClipY0;
  let outputX = topology.screenClipX1;
  let outputY = topology.screenClipY1;
  for (let stage = 0; stage < 4; stage += 1) {
    const axis = stage < 2 ? 1 : 0;
    const upper = (stage & 1) !== 0;
    const bound = stage === 0 ? p.PGLBY : stage === 1 ? p.PGUBY
      : stage === 2 ? p.PGLBX : p.PGUBX;
    let outputCount = 0;
    for (let vertex = 0; vertex < count; vertex += 1) {
      const previous = vertex === 0 ? count - 1 : vertex - 1;
      const currentP = axis === 0 ? inputX[vertex] : inputY[vertex];
      const previousP = axis === 0 ? inputX[previous] : inputY[previous];
      const currentInside = upper ? currentP <= bound : currentP >= bound;
      const previousInside = upper ? previousP <= bound : previousP >= bound;
      if (currentInside !== previousInside) {
        const currentQ = axis === 0 ? inputY[vertex] : inputX[vertex];
        const previousQ = axis === 0 ? inputY[previous] : inputX[previous];
        const ratio = (bound - previousP) / (currentP - previousP);
        const q = (currentQ - previousQ) * ratio + previousQ;
        if (axis === 0) {
          outputX[outputCount] = bound;
          outputY[outputCount] = q;
        } else {
          outputX[outputCount] = q;
          outputY[outputCount] = bound;
        }
        outputCount += 1;
      }
      if (currentInside) {
        outputX[outputCount] = inputX[vertex];
        outputY[outputCount] = inputY[vertex];
        outputCount += 1;
      }
    }
    count = outputCount;
    if (count < 3) return;
    [inputX, outputX] = [outputX, inputX];
    [inputY, outputY] = [outputY, inputY];
  }
  for (let vertex = 0; vertex < count; vertex += 1) {
    topology.xs[vertex] = convertToInt32(inputX[vertex], control);
    topology.ys[vertex] = convertToInt32(inputY[vertex], control);
  }
  drawSolidConvexFast(
    machine, p, topology.xs, topology.ys, count, colour,
    topology.leftEdges, topology.rightEdges,
  );
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
    "FSUBXF", "FSUNO", "FSDPP", "FSXC", "FSYC", "PGLBX", "PGLBY", "PGUBX", "PGUBY", "fw", "FA0", "FB0", "FT0",
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

function directPolySlot(memory, p, index) {
  return readFloat64(memory, p.fw + index * 2);
}

function directPolyStoreWide(memory, p, index, number) {
  writeFloat64(memory, p.fw + index * 2, number);
}

function directPolyStoreNarrow(memory, p, index, number, control) {
  const narrowed = roundFloat32(number, control);
  memory[p.FS0] = float32Bits(narrowed);
  writeFloat64(memory, p.fw + index * 2, narrowed);
  return narrowed;
}

function polyRotateDirect(machine, linked, p, startVertex = 0) {
  // This is the real-time mapper's existing binary64 calculation schedule
  // expressed directly in JavaScript. Stores still narrow at every original
  // binary32 spill and reproduce the floating-point workspace side effects.
  // Planet and surface generation continue to use the exact scalar emulator.
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const count = memory[p.PJnrv] | 0;
  const mode = memory[p.PJmode] | 0;
  memory[p.PJvr] = startVertex;
  memory[p.PJdoflag] = 0;
  const cameraX = directPolySlot(memory, p, p.FSCAMX);
  const cameraY = directPolySlot(memory, p, p.FSCAMY);
  const cameraZ = directPolySlot(memory, p, p.FSCAMZ);
  const betaSin = directPolySlot(memory, p, mode === 0 ? p.FSPSB : p.FSTSB);
  const betaCos = directPolySlot(memory, p, mode === 0 ? p.FSPCB : p.FSTCB);
  const turnBetaCos = directPolySlot(memory, p, p.FSTCB);
  const turnBetaSin = directPolySlot(memory, p, p.FSTSB);
  const alphaCos = directPolySlot(memory, p, mode === 0 ? p.FSPCA : p.FSTCA);
  const alphaSin = directPolySlot(memory, p, mode === 0 ? p.FSPSA : p.FSTSA);
  const turnAlphaCos = directPolySlot(memory, p, p.FSTCA);
  const turnAlphaSin = directPolySlot(memory, p, p.FSTSA);
  const near = directPolySlot(memory, p, p.FSUNEG);
  let finalSecond = 0;
  for (let vertex = startVertex; vertex < count; vertex += 1) {
    const z = directPolyStoreNarrow(memory, p, p.FSZZ, directPolySlot(memory, p, p.FSINZ + vertex) - cameraZ, control);
    const x = directPolyStoreNarrow(memory, p, p.FSXX, directPolySlot(memory, p, p.FSINX + vertex) - cameraX, control);
    const y = directPolyStoreNarrow(memory, p, p.FSYY, directPolySlot(memory, p, p.FSINY + vertex) - cameraY, control);

    let work = z * betaSin;
    directPolyStoreWide(memory, p, p.FSW0, work);
    directPolyStoreNarrow(
      memory, p,
      p.FSRXF + vertex,
      x * betaCos + work,
      control,
    );

    work = z * turnBetaCos;
    directPolyStoreWide(memory, p, p.FSW0, work);
    const zProduct = x * turnBetaSin;
    const z2 = directPolyStoreNarrow(memory, p, p.FSZ2, work - zProduct, control);

    work = z2 * turnAlphaCos;
    directPolyStoreWide(memory, p, p.FSW0, work);
    const rotatedZWide = y * turnAlphaSin + work;
    directPolyStoreWide(memory, p, p.FSW1, rotatedZWide);
    directPolyStoreNarrow(memory, p, p.FSRZF + vertex, rotatedZWide, control);
    const status = Number.isNaN(rotatedZWide) || Number.isNaN(near)
      ? 17664 : rotatedZWide < near ? 256 : rotatedZWide === near ? 16384 : 0;
    memory[p.FSW] = status;
    floatingPoint(machine).status = status;
    let comparison;
    if ((status & 1024) !== 0) {
      memory[p.FFLG] |= 1;
      memory[p.FI] = 2;
      comparison = 2;
    } else if ((status & 16384) !== 0) {
      memory[p.FI] = 0;
      comparison = 0;
    } else if ((status & 256) !== 0) {
      memory[p.FI] = -1;
      comparison = -1;
    } else {
      memory[p.FI] = 1;
      comparison = 1;
    }
    const visible = comparison !== 2 && comparison >= 0 ? 1 : 0;
    memory[p.rwf + vertex] = visible;
    if (visible !== 0) memory[p.PJdoflag] = (memory[p.PJdoflag] + 1) | 0;

    work = y * alphaCos;
    directPolyStoreWide(memory, p, p.FSW0, work);
    finalSecond = z2 * alphaSin;
    directPolyStoreNarrow(memory, p, p.FSRYF + vertex, work - finalSecond, control);
    memory[p.PJvr] = vertex + 1;
    machine.A = (p.fw + (p.FSRYF + vertex) * 2) | 0;
  }
  memory[p.PGFi] = p.FSRYF + count - 1;
  writeFloat64(memory, p.FA0, directPolySlot(memory, p, p.FSRYF + count - 1));
  writeFloat64(memory, p.FB0, finalSecond);
  writeFloat64(memory, p.FT0, finalSecond);
  machine.A = (p.fw + (p.FSRYF + count - 1) * 2) | 0;
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
  polyRotateDirect(machine, linked, p);
  memory[p.PJgate] = 1;
  if ((memory[p.PJdoflag] | 0) === 0) return;
  if ((memory[p.PJdoflag] | 0) === (memory[p.PJnrv] | 0)) polyZload(machine, linked, p);
  else {
    polyZclip(machine, linked, p);
    memory[p.PJgate] = 2;
    if ((memory[p.PJvr2] | 0) < 3) return;
  }

  polyProject3d(machine, linked, p);
  polyProjectedTail(machine, linked, p);
}

function polyClipStage(machine, linked, p, count, xi, yi, xo, yo,
  bound, direction, integer, result, gate) {
  const memory = machine.memory;
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
  return count;
}

function polyProjectedTail(machine, linked, p) {
  const memory = machine.memory;
  memory[p.BXn] = memory[p.PJvr2];
  polyBounds(memory, p);
  memory[p.PJgate] = 0;
  if ((memory[p.BXsi] | 0) !== 0) {
    let count = memory[p.PJvr2] | 0;
    count = polyClipStage(machine, linked, p, count,
      p.FSVY0, p.FSVX0, p.FSVY1, p.FSVX1, p.FSLBYF, 0, 0, p.PJvr3, 3);
    if (count < 3) return;
    count = polyClipStage(machine, linked, p, count,
      p.FSVY1, p.FSVX1, p.FSVY2, p.FSVX2, p.FSUBYF, 1, 0, p.PJvr4, 4);
    if (count < 3) return;
    count = polyClipStage(machine, linked, p, count,
      p.FSVX2, p.FSVY2, p.FSVX3, p.FSVY3, p.FSLBXF, 0, 0, p.PJvr5, 5);
    if (count < 3) return;
    count = polyClipStage(machine, linked, p, count,
      p.FSVX3, p.FSVY3, 0, 0, p.FSUBXF, 1, 1, p.PJvr6, 6);
    if (count < 3) return;
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
    "PJfwbase", "PJmpbase", "PJipartbase", "PGfwbase", "PGnwbase", "PGfpartbase", "PGipartbase", "PGtexf", "PGtexoff",
    "PGtexi", "PGtexv", "PGtmp", "PGdi", "PGval", "PGi", "PGj", "CSpix",
    "EWvr22", "EWminy", "EWmaxy", "EWsi", "EWx1", "EWy1", "EWx2", "EWy2",
    "EWity", "EWjty", "EWax", "EWcx", "EWh", "FS16", "FSVX", "FSVY",
    "FSVZ", "FSK1", "FSK2", "FSK3", "FSK4", "FSX", "FSY", "FSZ", "FSTX", "FSTY",
    "D64THLO", "D64THHI", "D64QLO",
    "D64QHI", "PJthird0", "PJthird1", "ipart", "fpart", "nw", "SADPT",
    "RPSM", "RPBG", "RNGLB", "PGSCRT", "PGSCRE", "PGDOFF",
    "PGUVZ", "PGUVX", "PGUVY", "PGUVK4",
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
  if (fast && (memory[p.SPterrain] | 0) !== 0) {
    prepareTerrainVectorsFast(machine, p, vertices);
    return;
  }
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

function prepareTerrainVectorsAligned(memory, p, qwords, base, factor) {
    const x0 = qwords[base + 32];
    const x1 = qwords[base + 33];
    const x2 = qwords[base + 34];
    const y0 = qwords[base + 36];
    const y1 = qwords[base + 37];
    const y2 = qwords[base + 38];
    const z0 = qwords[base + 40];
    const z1 = qwords[base + 41];
    const z2 = qwords[base + 42];
    const centerX = Math.fround(((x0 + x1) + x2) * factor);
    const centerY = Math.fround(((y0 + y1) + y2) * factor);
    const centerZ = Math.fround(((z0 + z1) + z2) * factor);
    qwords[base + 204] = centerX;
    qwords[base + 205] = centerY;
    qwords[base + 206] = centerZ;
    const scaleX = qwords[base + 208];
    const scaleY = qwords[base + 209];
    const scaleZ = qwords[base + 210];
    const tx0 = Math.fround((x0 - centerX) * scaleX + centerX);
    const tx1 = Math.fround((x1 - centerX) * scaleX + centerX);
    const tx2 = Math.fround((x2 - centerX) * scaleX + centerX);
    const ty0 = Math.fround((y0 - centerY) * scaleY + centerY);
    const ty1 = Math.fround((y1 - centerY) * scaleY + centerY);
    const ty2 = Math.fround((y2 - centerY) * scaleY + centerY);
    const tz0 = Math.fround((z0 - centerZ) * scaleZ + centerZ);
    const tz1 = Math.fround((z1 - centerZ) * scaleZ + centerZ);
    const tz2 = Math.fround((z2 - centerZ) * scaleZ + centerZ);
    qwords[base + 192] = tx0; qwords[base + 193] = tx1; qwords[base + 194] = tx2;
    qwords[base + 196] = ty0; qwords[base + 197] = ty1; qwords[base + 198] = ty2;
    qwords[base + 200] = tz0; qwords[base + 201] = tz1; qwords[base + 202] = tz2;
    memory[p.PJvr] = 3;
    memory[p.PJvv] = 2;

    const ex1 = Math.fround(tx1 - tx0);
    const ey1 = Math.fround(ty1 - ty0);
    const ez1 = Math.fround(tz1 - tz0);
    const ex2 = Math.fround(tx0 - tx2);
    const ey2 = Math.fround(ty0 - ty2);
    const ez2 = Math.fround(tz0 - tz2);
    qwords[base + 229] = ex1; qwords[base + 230] = ey1; qwords[base + 231] = ez1;
    qwords[base + 232] = ex2; qwords[base + 233] = ey2; qwords[base + 234] = ez2;
    qwords[base + 235] = tx0; qwords[base + 236] = ty0; qwords[base + 237] = tz0;

    const scale0 = qwords[base + 246];
    const scale3 = qwords[base + 245];
    const scale6 = qwords[base + 244];
    const g0 = Math.fround((tx0 * ez1 - tz0 * ex1) * scale0);
    const g1 = Math.fround((tx0 * ez2 - tz0 * ex2) * scale0);
    const g2 = Math.fround((ex2 * ez1 - ez2 * ex1) * qwords[base + 26]);
    const g3 = Math.fround((tz0 * ey1 - ty0 * ez1) * scale3);
    const g4 = Math.fround((tz0 * ey2 - ty0 * ez2) * scale3);
    const g5 = Math.fround((ez2 * ey1 - ey2 * ez1) * qwords[base + 26]);
    const g6 = Math.fround((ty0 * ex1 - tx0 * ey1) * scale6);
    const g7 = Math.fround((ty0 * ex2 - tx0 * ey2) * scale6);
    const g8 = Math.fround((ey2 * ex1 - ex2 * ey1) * qwords[base + 18]);
    qwords[base] = g0; qwords[base + 1] = g1; qwords[base + 2] = g2;
    qwords[base + 3] = g3; qwords[base + 4] = g4; qwords[base + 5] = g5;
    qwords[base + 6] = g6; qwords[base + 7] = g7; qwords[base + 8] = g8;
    memory[p.FS0] = float32Bits(g8);
    if ((p.FA0 & 1) === 0) qwords[p.FA0 >>> 1] = g8;
    else writeFloat64View(dataView(memory), p.FA0, g8);
}

function prepareTerrainVectorsFast(machine, p, vertices) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const view = dataView(memory);
  const floats = p.fw;
  memory[p.PJdx] = vertices;
  memory[p.PJthird0] = p.D64THLO;
  memory[p.PJthird1] = p.D64THHI;
  const factor = readFloat64View(view, p.PJthird0);
  let lastNarrowed = 0;
  const nearest = (control & 0x0c00) === 0;

  if (vertices === 3 && nearest && (floats & 1) === 0) {
    prepareTerrainVectorsAligned(memory, p, float64View(memory), floats >>> 1, factor);
    return;
  }

  for (let axis = 0; axis < 3; axis += 1) {
    const source = 64 + axis * 8;
    let sum = readFloat64View(view, floats + source);
    for (let vertex = 1; vertex < vertices; vertex += 1) {
      sum += readFloat64View(view, floats + source + vertex * 2);
    }
    lastNarrowed = nearest ? Math.fround(sum * factor) : roundFloat32(sum * factor, control);
    writeFloat64View(view, floats + 408 + axis * 2, lastNarrowed);
  }

  for (let vertex = 0; vertex < vertices; vertex += 1) {
    for (let axis = 0; axis < 3; axis += 1) {
      const source = 64 + axis * 8;
      const destination = 384 + axis * 8;
      const center = readFloat64View(view, floats + 408 + axis * 2);
      const transformed = (readFloat64View(view, floats + source + vertex * 2) - center)
        * readFloat64View(view, floats + 416 + axis * 2) + center;
      lastNarrowed = nearest ? Math.fround(transformed) : roundFloat32(transformed, control);
      writeFloat64View(view, floats + destination + vertex * 2, lastNarrowed);
    }
  }
  memory[p.PJvr] = vertices;
  memory[p.PJvv] = vertices - 1;

  for (let axis = 0; axis < 3; axis += 1) {
    const source = 384 + axis * 8;
    let first = readFloat64View(view, floats + source);
    first = nearest ? Math.fround(first) : roundFloat32(first, control);
    lastNarrowed = first;
    writeFloat64View(view, floats + 470 + axis * 2, first);
    let result = readFloat64View(view, floats + source + 2) - first;
    result = nearest ? Math.fround(result) : roundFloat32(result, control);
    lastNarrowed = result;
    writeFloat64View(view, floats + 458 + axis * 2, result);
    result = first - readFloat64View(view, floats + source + (vertices - 1) * 2);
    result = nearest ? Math.fround(result) : roundFloat32(result, control);
    lastNarrowed = result;
    writeFloat64View(view, floats + 464 + axis * 2, result);
  }

  for (let index = 0; index < POLYGON_GRADIENTS.length; index += 1) {
    const record = POLYGON_GRADIENTS[index];
    const first = readFloat64View(view, floats + record[0] * 2)
      * readFloat64View(view, floats + record[1] * 2);
    let result = first - readFloat64View(view, floats + record[2] * 2)
      * readFloat64View(view, floats + record[3] * 2);
    result *= readFloat64View(view, floats + record[4] * 2);
    lastNarrowed = nearest ? Math.fround(result) : roundFloat32(result, control);
    writeFloat64View(view, floats + record[5] * 2, lastNarrowed);
  }
  memory[p.FS0] = float32Bits(lastNarrowed);
  writeFloat64View(view, p.FA0, lastNarrowed);
}

function prepareMappedBlockSteps(machine, linked, p) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const view = dataView(memory);
  const nearest = (control & 0x0c00) === 0;
  if (nearest && (p.fw & 1) === 0) {
    const qwords = float64View(memory);
    const base = p.fw >>> 1;
    const scale = qwords[base + p.FS16];
    for (let axis = 0; axis < 3; axis += 1) {
      const source = axis === 0 ? p.FSVX : axis === 1 ? p.FSVY : p.FSVZ;
      const destination = axis === 0 ? p.FSK1 : axis === 1 ? p.FSK2 : p.FSK3;
      const wide = qwords[base + source] * scale;
      if ((p.FA0 & 1) === 0) qwords[p.FA0 >>> 1] = wide;
      else writeFloat64View(view, p.FA0, wide);
      const result = Math.fround(wide);
      memory[p.FS0] = float32Bits(result);
      qwords[base + destination] = result;
    }
    if ((memory[p.SPcull] | 0) !== 0) {
      for (const slot of [p.FSK1, p.FSK2, p.FSK3]) {
        const wide = qwords[base + slot] + qwords[base + slot];
        if ((p.FA0 & 1) === 0) qwords[p.FA0 >>> 1] = wide;
        else writeFloat64View(view, p.FA0, wide);
        const result = Math.fround(wide);
        memory[p.FS0] = float32Bits(result);
        qwords[base + slot] = result;
      }
    }
    return;
  }
  const scale = readFloat64View(view, p.fw + p.FS16 * 2);
  for (let axis = 0; axis < 3; axis += 1) {
    const source = axis === 0 ? p.FSVX : axis === 1 ? p.FSVY : p.FSVZ;
    const destination = axis === 0 ? p.FSK1 : axis === 1 ? p.FSK2 : p.FSK3;
    let result = readFloat64View(view, p.fw + source * 2) * scale;
    writeFloat64View(view, p.FA0, result);
    result = nearest ? Math.fround(result) : roundFloat32(result, control);
    memory[p.FS0] = float32Bits(result);
    writeFloat64View(view, p.fw + destination * 2, result);
  }
  if ((memory[p.SPcull] | 0) !== 0) {
    for (let axis = 0; axis < 3; axis += 1) {
      const slot = axis === 0 ? p.FSK1 : axis === 1 ? p.FSK2 : p.FSK3;
      const input = readFloat64View(view, p.fw + slot * 2);
      let result = input + input;
      writeFloat64View(view, p.FA0, result);
      result = nearest ? Math.fround(result) : roundFloat32(result, control);
      memory[p.FS0] = float32Bits(result);
      writeFloat64View(view, p.fw + slot * 2, result);
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
  initializePolygonRows(machine, linked, p);
  polygonEdges(machine, linked, p);
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

function polymap(machine, linked, preRotated = false) {
  const memory = machine.memory;
  const p = polymapAddresses(linked);
  const treeRecording = machine.noctisTreeRecording;
  if (treeRecording) {
    if (treeRecording.skipNextPolymap) treeRecording.skipNextPolymap = false;
    else treeRecording.commands.push(captureTreePolygon(machine, linked, false));
  }
  memory[p.PJgate] = 0;
  let originalVertices = memory[p.PJnrv] | 0;
  if (originalVertices === 3) {
    polyMove(machine, linked, p, p.FSINX + 2, p.FSINX + 3);
    polyMove(machine, linked, p, p.FSINY + 2, p.FSINY + 3);
    polyMove(machine, linked, p, p.FSINZ + 2, p.FSINZ + 3);
  }
  memory[p.PJmode] = 1;
  memory[p.PJdx] = originalVertices;
  if ((memory[p.PJpreproject] | 0) === 0 && !preRotated) {
    if (originalVertices === 3) {
      memory[p.PJnrv] = 3;
      polyRotateDirect(machine, linked, p);
      polyMove(machine, linked, p, p.FSRXF + 2, p.FSRXF + 3);
      polyMove(machine, linked, p, p.FSRYF + 2, p.FSRYF + 3);
      polyMove(machine, linked, p, p.FSRZF + 2, p.FSRZF + 3);
      const flag = memory[p.rwf + 2] | 0;
      memory[p.rwf + 3] = flag;
      memory[p.PJdoflag] = (memory[p.PJdoflag] + flag) | 0;
    } else {
      memory[p.PJnrv] = 4;
      polyRotateDirect(machine, linked, p);
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
  if ((memory[p.PJpreproject] | 0) === 0) {
    // The standalone mapped-projector intrinsic mirrors the native source
    // fragment, whose caller publishes these two bases immediately before
    // entering it.  PG polymap's fused path bypasses that source wrapper, so
    // preserve the same contract explicitly here.
    memory[p.PJfwbase] = p.fw;
    memory[p.PJmpbase] = p.mp;
    projectMappedPolygon(machine, linked);
  }
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
  initializePolygonRows(machine, linked, p);
  polygonEdges(machine, linked, p);
  memory[p.SPsrc] = 1;
  mappedTrace(machine, linked, p);
  memory[p.PJgate] = 0;
}

function rasterProjectedTerrain(machine, linked, p) {
  const memory = machine.memory;
  memory[p.PJgate] = 7;
  if ((memory[p.PJminx] | 0) > p.PGUBX || (memory[p.PJmaxx] | 0) < p.PGLBX
    || (memory[p.BXminy] | 0) > p.PGUBY || (memory[p.BXmaxy] | 0) < p.PGLBY) return;
  if ((memory[p.BXminy] | 0) < p.PGLBY) memory[p.BXminy] = p.PGLBY;
  if ((memory[p.BXmaxy] | 0) > p.PGUBY) memory[p.BXmaxy] = p.PGUBY;
  memory[p.PJgate] = 8;
  if ((memory[p.BXminy] | 0) > (memory[p.BXmaxy] | 0)) return;
  memory[p.PJdx] = 3;
  memory[p.PJnrv] = 3;
  prepareTerrainVectorsFast(machine, p, 3);
  memory[p.PJnrv] = 4;
  prepareMappedBlockSteps(machine, linked, p);
  memory[p.EWvr22] = 8;
  memory[p.EWminy] = memory[p.BXminy];
  memory[p.EWmaxy] = memory[p.BXmaxy];
  memory[p.PGfwbase] = p.fw;
  memory[p.PGfpartbase] = p.fpart;
  memory[p.PGipartbase] = p.ipart;
  initializePolygonRows(machine, linked, p);
  polygonEdges(machine, linked, p);
  memory[p.SPsrc] = 1;
  mappedTrace(machine, linked, p);
}

function initializePolygonRows(machine, linked, p = null) {
  const memory = machine.memory;
  const minimumAddress = p?.EWminy ?? address(linked, "EWminy");
  const maximumAddress = p?.EWmaxy ?? address(linked, "EWmaxy");
  const fractionBaseAddress = p?.PGfpartbase ?? address(linked, "PGfpartbase");
  const integerBaseAddress = p?.PGipartbase ?? address(linked, "PGipartbase");
  let row = memory[minimumAddress] | 0;
  const maximum = memory[maximumAddress] | 0;
  const fractions = memory[fractionBaseAddress] >>> 0;
  const integers = memory[integerBaseAddress] >>> 0;
  do {
    memory[fractions + row] = 5;
    memory[integers + row] = 311;
    row = (row + 1) | 0;
  } while (row <= maximum);
  memory[p?.PGi ?? address(linked, "PGi")] = row;
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
  const seedAddress = address(linked, "SUfseed");
  let seed = ((value(memory, linked, "VHGNDh1") + value(memory, linked, "VHGNDseed")) | 3) | 0;
  memory[seedAddress] = seed;
  const unsigned = seed >>> 0;
  const lowHalf = unsigned & 0xffff;
  const highHalf = unsigned >>> 16;
  const lowProduct = lowHalf * lowHalf;
  const middle = 2 * lowHalf * highHalf;
  const lowerWide = lowProduct + (middle & 0xffff) * 0x10000;
  const low = lowerWide | 0;
  const high = (highHalf * highHalf + Math.floor(middle / 0x10000)
    + Math.floor(lowerWide / 0x100000000)) | 0;
  const folded = (low & 0xffffff00) | (((low & 0xff) + (high & 0xff)) & 0xff);
  memory[address(linked, "SUfeax")] = folded;
  seed = (seed + folded) | 0;
  memory[seedAddress] = seed;
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
    let factor = ((readFloat64(memory, floats + 50)) / (readFloat64(memory, floats + 128 + vertex * 2)));
    writeFloat64(memory, floats + 502, factor);
    let projected = ((factor) * (readFloat64(memory, floats + 96 + vertex * 2)));
    writeScalarScratch(machine, linked, projected);
    projected = ((projected) + (readFloat64(memory, floats + 38)));
    writeScalarScratch(machine, linked, projected);
    const x = convertToInt32(projected, control);
    memory[points + vertex * 2] = x;
    if (x < memory[minX]) memory[minX] = x;
    if (x > memory[maxX]) memory[maxX] = x;

    projected = ((factor) * (readFloat64(memory, floats + 112 + vertex * 2)));
    writeScalarScratch(machine, linked, projected);
    projected = ((projected) + (readFloat64(memory, floats + 40)));
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
  const factor = ((readFloat64(memory, floats + 50)) / (readFloat64(memory, floats + 80)));
  writeFloat64(memory, floats + 502, factor);
  for (const [source, center, output] of [
    [64, 38, "GCx"],
    [72, 40, "GCy"],
  ]) {
    let projected = ((factor) * (readFloat64(memory, floats + source)));
    writeScalarScratch(machine, linked, projected);
    projected = ((projected) + (readFloat64(memory, floats + center)));
    writeScalarScratch(machine, linked, projected);
    memory[address(linked, output)] = convertToInt32(projected, control);
  }
}

function terrainFacingDot(machine, linked, p = null) {
  const memory = machine.memory;
  p ??= polymapAddresses(linked);
  const floats = memory[p.PJfwbase] >>> 0;
  const view = dataView(memory);
  let difference = readFloat64View(view, floats + 448) - readFloat64View(view, floats + 508);
  writeFloat64View(view, p.FA0, difference);
  let sum = difference * readFloat64View(view, floats + 470);
  writeFloat64View(view, floats + 496, sum);
  difference = readFloat64View(view, floats + 450) - readFloat64View(view, floats + 516);
  writeFloat64View(view, p.FA0, difference);
  let product = difference * readFloat64View(view, floats + 472);
  writeFloat64View(view, p.FA0, product);
  sum = product + sum;
  writeFloat64View(view, floats + 496, sum);
  difference = readFloat64View(view, floats + 452) - readFloat64View(view, floats + 524);
  writeFloat64View(view, p.FA0, difference);
  product = difference * readFloat64View(view, floats + 474);
  writeFloat64View(view, p.FA0, product);
  sum = product + sum;
  writeFloat64View(view, p.FA0, sum);
}

function polygonMidpoint(machine, linked, vertices) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const factor = readFloat64(memory, address(linked, "PJthird0"));
  for (const [source, destination] of [[64, 408], [72, 410], [80, 412]]) {
    let sum = readFloat64(memory, floats + source);
    for (let vertex = 1; vertex < vertices; vertex += 1) {
      sum = ((sum) + (readFloat64(memory, floats + source + vertex * 2)));
      writeScalarScratch(machine, linked, sum);
    }
    sum = ((sum) * (factor));
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
      let result = ((readFloat64(memory, floats + source + vertex * 2)) - (readFloat64(memory, floats + midpoint)));
      writeScalarScratch(machine, linked, result);
      result = ((result) * (readFloat64(memory, floats + scale)));
      writeScalarScratch(machine, linked, result);
      result = ((result) + (readFloat64(memory, floats + midpoint)));
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
    let result = ((readFloat64(memory, floats + source + 2)) - (first));
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + firstEdge, narrowScalar(machine, linked, result));
    result = ((first) - (readFloat64(memory, floats + source + lastVertex * 2)));
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
    const result = ((readFloat64(memory, floats + source)) * (scale));
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
    const result = ((input) + (input));
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + slot, narrowScalar(machine, linked, result));
  }
}

function mappedFacing(machine, linked) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  let edge1x = readFloat64(memory, floats + 504) - readFloat64(memory, floats + 508);
  writeScalarScratch(machine, linked, edge1x);
  edge1x = narrowScalar(machine, linked, edge1x);
  writeFloat64(memory, floats + 464, edge1x);
  let edge2x = readFloat64(memory, floats + 506) - readFloat64(memory, floats + 508);
  writeScalarScratch(machine, linked, edge2x);
  edge2x = narrowScalar(machine, linked, edge2x);
  writeFloat64(memory, floats + 458, edge2x);

  let edge1y = readFloat64(memory, floats + 512) - readFloat64(memory, floats + 516);
  writeScalarScratch(machine, linked, edge1y);
  edge1y = narrowScalar(machine, linked, edge1y);
  writeFloat64(memory, floats + 466, edge1y);
  let edge2y = readFloat64(memory, floats + 514) - readFloat64(memory, floats + 516);
  writeScalarScratch(machine, linked, edge2y);
  edge2y = narrowScalar(machine, linked, edge2y);
  writeFloat64(memory, floats + 460, edge2y);

  let edge1z = readFloat64(memory, floats + 520) - readFloat64(memory, floats + 524);
  writeScalarScratch(machine, linked, edge1z);
  edge1z = narrowScalar(machine, linked, edge1z);
  writeFloat64(memory, floats + 468, edge1z);
  let edge2z = readFloat64(memory, floats + 522) - readFloat64(memory, floats + 524);
  writeScalarScratch(machine, linked, edge2z);
  edge2z = narrowScalar(machine, linked, edge2z);
  writeFloat64(memory, floats + 462, edge2z);

  let first = edge1y * edge2z;
  writeFloat64(memory, floats + 496, first);
  let second = edge1z * edge2y;
  writeScalarScratch(machine, linked, second);
  second = first - second;
  writeScalarScratch(machine, linked, second);
  const normalX = narrowScalar(machine, linked, second);
  writeFloat64(memory, floats + 470, normalX);

  first = edge1z * edge2x;
  writeFloat64(memory, floats + 496, first);
  second = edge1x * edge2z;
  writeScalarScratch(machine, linked, second);
  second = first - second;
  writeScalarScratch(machine, linked, second);
  const normalY = narrowScalar(machine, linked, second);
  writeFloat64(memory, floats + 472, normalY);

  first = edge1x * edge2y;
  writeFloat64(memory, floats + 496, first);
  second = edge1y * edge2x;
  writeScalarScratch(machine, linked, second);
  second = first - second;
  writeScalarScratch(machine, linked, second);
  const normalZ = narrowScalar(machine, linked, second);
  writeFloat64(memory, floats + 474, normalZ);

  let difference = readFloat64(memory, floats + 448) - readFloat64(memory, floats + 508);
  writeScalarScratch(machine, linked, difference);
  let sum = difference * normalX;
  writeFloat64(memory, floats + 496, sum);

  difference = readFloat64(memory, floats + 450) - readFloat64(memory, floats + 516);
  writeScalarScratch(machine, linked, difference);
  let product = difference * normalY;
  writeScalarScratch(machine, linked, product);
  sum = product + sum;
  writeFloat64(memory, floats + 496, sum);

  difference = readFloat64(memory, floats + 452) - readFloat64(memory, floats + 524);
  writeScalarScratch(machine, linked, difference);
  product = difference * normalZ;
  writeScalarScratch(machine, linked, product);
  sum = product + sum;
  writeScalarScratch(machine, linked, sum);
  const visible = !Number.isNaN(sum) && sum >= 0 ? 1 : 0;
  memory[address(linked, "FCret")] = visible;
  const treeRecording = machine.noctisTreeRecording;
  if (treeRecording) {
    treeRecording.commands.push(captureTreePolygon(machine, linked, true, 4));
    treeRecording.skipNextPolymap = visible !== 0;
  }
}

function polygonGradient(machine, linked, xi, yi, xo, yo, scale, destination) {
  const memory = machine.memory;
  const floats = value(memory, linked, "PJfwbase") >>> 0;
  const control = floatingPoint(machine).control;
  const first = ((readFloat64(memory, floats + xi * 2)) * (readFloat64(memory, floats + yi * 2)));
  writeFloat64(memory, floats + 502, first);
  let second = ((readFloat64(memory, floats + xo * 2)) * (readFloat64(memory, floats + yo * 2)));
  writeScalarScratch(machine, linked, second);
  second = ((first) - (second));
  writeScalarScratch(machine, linked, second);
  second = ((second) * (readFloat64(memory, floats + scale * 2)));
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

function terrainTraceRowAligned(memory, p, qwords, base, row, ipart, control) {
  const fa = p.FA0 >>> 1;
    let factor = memory[ipart + row] | 0;
    qwords[fa] = factor;
    factor -= qwords[base + 19];
    qwords[fa] = factor;
    factor += qwords[base + 18];
    qwords[base + 251] = factor;

    let z = factor * qwords[base + 5];
    qwords[base + 248] = z;
    let vertical = row;
    qwords[fa] = vertical;
    vertical -= qwords[base + 20];
    qwords[fa] = vertical;
    vertical *= qwords[base + 2];
    qwords[fa] = vertical;
    z = vertical + z;
    qwords[fa] = z;
    z += qwords[base + 8];
    qwords[base + 249] = z;
    const narrowed = Math.fround(z);
    memory[p.FS0] = float32Bits(narrowed);
    qwords[base + 15] = narrowed;

    let reciprocal = qwords[base + 18] / z;
    qwords[fa] = reciprocal;
    reciprocal = Math.fround(reciprocal);
    memory[p.FS0] = float32Bits(reciprocal);
    qwords[base + 12] = reciprocal;

    let x = factor * qwords[base + 3];
    qwords[base + 248] = x;
    let rowPart = row;
    qwords[fa] = rowPart;
    rowPart -= qwords[base + 20];
    qwords[fa] = rowPart;
    rowPart *= qwords[base];
    qwords[fa] = rowPart;
    x = rowPart + x;
    qwords[fa] = x;
    x += qwords[base + 6];
    qwords[fa] = x;
    x = Math.fround(x);
    memory[p.FS0] = float32Bits(x);
    qwords[base + 13] = x;

    let y = factor * qwords[base + 4];
    qwords[base + 248] = y;
    rowPart = row;
    qwords[fa] = rowPart;
    rowPart -= qwords[base + 20];
    qwords[fa] = rowPart;
    rowPart *= qwords[base + 1];
    qwords[fa] = rowPart;
    y = rowPart + y;
    qwords[fa] = y;
    y += qwords[base + 7];
    qwords[fa] = y;
    y = Math.fround(y);
    memory[p.FS0] = float32Bits(y);
    qwords[base + 14] = y;

    let texture = x * qwords[base + 16];
    qwords[fa] = texture;
    texture *= reciprocal;
    qwords[fa] = texture;
    memory[p.SPu] = convertToInt32(texture, control);
    texture = y * qwords[base + 17];
    qwords[fa] = texture;
    texture *= reciprocal;
    qwords[fa] = texture;
    memory[p.SPv] = convertToInt32(texture, control);
}

function terrainTraceRow(machine, linked, p = null) {
  const memory = machine.memory;
  p ??= polymapAddresses(linked);
  const floats = memory[p.PJfwbase] >>> 0;
  const control = floatingPoint(machine).control;
  const nearest = (control & 0x0c00) === 0;
  const view = dataView(memory);
  const row = memory[p.SPi] | 0;
  const ipart = memory[p.PJipartbase] >>> 0;

  // Ordinary Noctis rendering uses the nearest x87 mode and an aligned
  // qword workspace. Keep every source-visible wide spill and float32
  // narrowing, but keep that hot path in its own JIT-sized function.
  if (nearest && (floats & 1) === 0 && (p.FA0 & 1) === 0) {
    terrainTraceRowAligned(memory, p, float64View(memory), floats >>> 1, row, ipart, control);
    return;
  }

  let factor = memory[ipart + row] | 0;
  writeFloat64View(view, p.FA0, factor);
  factor -= readFloat64View(view, floats + 38);
  writeFloat64View(view, p.FA0, factor);
  factor += readFloat64View(view, floats + 36);
  writeFloat64View(view, floats + 502, factor);

  let z = factor * readFloat64View(view, floats + 10);
  writeFloat64View(view, floats + 496, z);
  let vertical = row;
  writeFloat64View(view, p.FA0, vertical);
  vertical -= readFloat64View(view, floats + 40);
  writeFloat64View(view, p.FA0, vertical);
  vertical *= readFloat64View(view, floats + 4);
  writeFloat64View(view, p.FA0, vertical);
  z = vertical + z;
  writeFloat64View(view, p.FA0, z);
  z += readFloat64View(view, floats + 16);
  writeFloat64View(view, floats + 498, z);
  let narrowed = nearest ? Math.fround(z) : roundFloat32(z, control);
  memory[p.FS0] = float32Bits(narrowed);
  writeFloat64View(view, floats + 30, narrowed);

  let reciprocal = readFloat64View(view, floats + 36) / z;
  writeFloat64View(view, p.FA0, reciprocal);
  reciprocal = nearest ? Math.fround(reciprocal) : roundFloat32(reciprocal, control);
  memory[p.FS0] = float32Bits(reciprocal);
  writeFloat64View(view, floats + 24, reciprocal);

  let x = factor * readFloat64View(view, floats + 6);
  writeFloat64View(view, floats + 496, x);
  let rowPart = row;
  writeFloat64View(view, p.FA0, rowPart);
  rowPart -= readFloat64View(view, floats + 40);
  writeFloat64View(view, p.FA0, rowPart);
  rowPart *= readFloat64View(view, floats);
  writeFloat64View(view, p.FA0, rowPart);
  x = rowPart + x;
  writeFloat64View(view, p.FA0, x);
  x += readFloat64View(view, floats + 12);
  writeFloat64View(view, p.FA0, x);
  x = nearest ? Math.fround(x) : roundFloat32(x, control);
  memory[p.FS0] = float32Bits(x);
  writeFloat64View(view, floats + 26, x);

  let y = factor * readFloat64View(view, floats + 8);
  writeFloat64View(view, floats + 496, y);
  rowPart = row;
  writeFloat64View(view, p.FA0, rowPart);
  rowPart -= readFloat64View(view, floats + 40);
  writeFloat64View(view, p.FA0, rowPart);
  rowPart *= readFloat64View(view, floats + 2);
  writeFloat64View(view, p.FA0, rowPart);
  y = rowPart + y;
  writeFloat64View(view, p.FA0, y);
  y += readFloat64View(view, floats + 14);
  writeFloat64View(view, p.FA0, y);
  y = nearest ? Math.fround(y) : roundFloat32(y, control);
  memory[p.FS0] = float32Bits(y);
  writeFloat64View(view, floats + 28, y);

  let texture = x * readFloat64View(view, floats + 32);
  writeFloat64View(view, p.FA0, texture);
  texture *= reciprocal;
  writeFloat64View(view, p.FA0, texture);
  memory[p.SPu] = convertToInt32(texture, control);
  texture = y * readFloat64View(view, floats + 34);
  writeFloat64View(view, p.FA0, texture);
  texture *= reciprocal;
  writeFloat64View(view, p.FA0, texture);
  memory[p.SPv] = convertToInt32(texture, control);
}

function runTerrainEdgeRows(machine, linked, bndx, slope, row, count, p = null) {
  const memory = machine.memory;
  p ??= polymapAddresses(linked);
  const control = floatingPoint(machine).control;
  const floats = memory[p.PGfwbase] >>> 0;
  const fpart = memory[p.PGfpartbase] >>> 0;
  const ipart = memory[p.PGipartbase] >>> 0;
  while (count !== 0) {
    let edge = convertToInt32(bndx, control);
    if (edge < -10000) edge = -10000;
    if (edge > 10000) edge = 10000;
    memory[p.EWax] = edge;
    if (edge > (memory[fpart + row] | 0)) memory[fpart + row] = Math.min(edge, 311);
    if (edge < (memory[ipart + row] | 0)) memory[ipart + row] = Math.max(edge, 5);
    bndx = ((bndx) + (slope));
    writeFloat64(memory, floats + 44, bndx);
    row += 1;
    count -= 1;
  }
  memory[p.EWh] = row;
  memory[p.EWcx] = count;
  writeFloat64(memory, p.FA0, bndx);
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

function polygonEdges(machine, linked, p = null) {
  const memory = machine.memory;
  p ??= polymapAddresses(linked);
  const control = floatingPoint(machine).control;
  const floats = memory[p.PGfwbase] >>> 0;
  const points = p.mp;
  const vr22 = memory[p.EWvr22] >>> 0;
  memory[points + vr22] = memory[points];
  memory[points + vr22 + 1] = memory[points + 1];
  let edgeCount = vr22 >>> 1;
  let source = 0;
  memory[p.EWsi] = source;
  memory[p.PGj] = edgeCount;
  while (edgeCount !== 0) {
    let x1 = memory[points + source] | 0;
    let y1 = memory[points + source + 1] | 0;
    let x2 = memory[points + source + 2] | 0;
    let y2 = memory[points + source + 3] | 0;
    memory[p.SPt] = x2;
    if (y2 < y1) {
      const oldX1 = x1;
      const oldY1 = y1;
      x1 = x2;
      y1 = y2;
      x2 = oldX1;
      y2 = oldY1;
    }
    memory[p.EWx1] = x1;
    memory[p.EWy1] = y1;
    memory[p.EWx2] = x2;
    memory[p.EWy2] = y2;
    if (y2 !== y1) {
      let slope = ((x2 - x1) / (y2 - y1));
      writeFloat64(memory, p.FA0, slope);
      slope = narrowScalar(machine, linked, slope);
      writeFloat64(memory, floats + 42, slope);
      memory[p.PGFi] = 22;
      let firstRow = y1;
      if (y1 < 5) {
        firstRow = 5;
        let correction = ((5 - y1) * (slope));
        writeFloat64(memory, p.FA0, correction);
        correction = ((x1) + (correction));
        writeFloat64(memory, p.FA0, correction);
        x1 = convertToInt32(correction, control);
        memory[p.EWx1] = x1;
      }
      const lastRow = Math.min(y2, 190);
      memory[p.EWity] = firstRow;
      memory[p.EWjty] = lastRow;
      let bndx = x1;
      writeFloat64(memory, floats + 44, bndx);
      writeFloat64(memory, p.FA0, bndx);
      if (firstRow < lastRow) {
        const count = lastRow - firstRow + 1;
        memory[p.EWcx] = count;
        memory[p.EWh] = firstRow;
        bndx = runTerrainEdgeRows(machine, linked, bndx, slope, firstRow, count, p);
      }
    }
    source += 2;
    edgeCount -= 1;
    memory[p.EWsi] = source;
    memory[p.PGj] = edgeCount;
  }
}

function terrainUvNext(machine, linked, p = null) {
  const memory = machine.memory;
  p ??= polymapAddresses(linked);
  const floats = memory[p.PGfwbase] >>> 0;
  const control = floatingPoint(machine).control;
  const nearest = (control & 0x0c00) === 0;
  const view = dataView(memory);
  let z = readFloat64View(view, floats + p.FSZ * 2) + readFloat64View(view, floats + p.FSK3 * 2);
  writeFloat64View(view, floats + p.FSW0 * 2, z);
  let narrowed = nearest ? Math.fround(z) : roundFloat32(z, control);
  memory[p.PGUVZ] = float32Bits(narrowed);
  writeFloat64View(view, floats + p.FSZ * 2, narrowed);
  let x = readFloat64View(view, floats + p.FSX * 2) + readFloat64View(view, floats + p.FSK1 * 2);
  writeFloat64View(view, floats + p.FSW1 * 2, x);
  narrowed = nearest ? Math.fround(x) : roundFloat32(x, control);
  memory[p.PGUVX] = float32Bits(narrowed);
  writeFloat64View(view, floats + p.FSX * 2, narrowed);
  let y = readFloat64View(view, floats + p.FSY * 2) + readFloat64View(view, floats + p.FSK2 * 2);
  writeFloat64View(view, floats + p.FSW2 * 2, y);
  narrowed = nearest ? Math.fround(y) : roundFloat32(y, control);
  memory[p.PGUVY] = float32Bits(narrowed);
  writeFloat64View(view, floats + p.FSY * 2, narrowed);
  let reciprocal = readFloat64View(view, floats + p.FSUNO * 2) / z;
  writeFloat64View(view, floats + p.FSW3 * 2, reciprocal);
  reciprocal = nearest ? Math.fround(reciprocal) : roundFloat32(reciprocal, control);
  memory[p.PGUVK4] = float32Bits(reciprocal);
  writeFloat64View(view, floats + p.FSK4 * 2, reciprocal);
  let result = x * readFloat64View(view, floats + p.FSTX * 2);
  writeFloat64View(view, floats + p.FSW3 * 2, result);
  result *= reciprocal;
  writeFloat64View(view, floats + p.FSW3 * 2, result);
  memory[p.SPun] = convertToInt32(result, control);
  result = y * readFloat64View(view, floats + p.FSTY * 2);
  writeFloat64View(view, floats + p.FSW3 * 2, result);
  result *= reciprocal;
  writeFloat64View(view, floats + p.FSW3 * 2, result);
  memory[p.SPvn] = convertToInt32(result, control);
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
  if (fast && (memory[p.SPterrain] | 0) !== 0) {
    const texture = p.nw + p.RPBG + (memory[p.PGtexoff] | 0);
    const tint = memory[p.SPtinta] | 0;
    if (culling) {
      for (let pixelIndex = 0; pixelIndex < count; pixelIndex += 1) {
        di = (di + 2) & 0xffff;
        const index = ((v & 0xff00) | ((u >>> 8) & 0xff)) & 0xffff;
        const pixel = ((memory[texture + index] & 0xff) + tint) & 0xff;
        u = (u + du) & 0xffff;
        memory[p.page + ((di + 2) & 0xffff)] = pixel;
        memory[p.page + ((di + 3) & 0xffff)] = pixel;
        v = (v + dv) & 0xffff;
      }
    } else {
      for (let pixelIndex = 0; pixelIndex < count; pixelIndex += 1) {
        di = (di + 1) & 0xffff;
        const index = ((v & 0xff00) | ((u >>> 8) & 0xff)) & 0xffff;
        const pixel = ((memory[texture + index] & 0xff) + tint) & 0xff;
        u = (u + du) & 0xffff;
        memory[p.page + ((di + 3) & 0xffff)] = pixel;
        v = (v + dv) & 0xffff;
      }
    }
    memory[p.SPdi] = di;
    memory[p.SPax] = u;
    memory[p.SPdx] = v;
    memory[p.SPcl] = 0;
    return;
  }
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
    terrainUvNext(machine, linked, p);
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
    terrainTraceRow(machine, linked, p);
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

function groundRoundHill(machine, linked) {
  const memory = machine.memory;
  let p = groundRoundHillAddressCaches.get(linked);
  if (!p) {
    p = Object.fromEntries([
      "nw", "RPSM", "SUia", "SUcxi", "SUcyi", "GRfv", "GRfht", "GRfhmt", "GRfcanyon",
      "GRfrlo", "GRfrhi", "GRfrx", "GRfrz", "GRdxi", "GRdzi", "GRfdx", "GRfdz",
      "GRfd", "GRfy", "GRfs0", "GRfs1", "GRptr", "GRsval", "GRfti", "MBptr", "MBval",
    ].map((name) => [name, address(linked, name)]));
    groundRoundHillAddressCaches.set(linked, p);
  }

  groundRoundHillRadius(machine, linked);
  const radius = memory[p.SUia] & 0xffff;
  memory[p.SUia] = radius;
  const centerX = memory[p.SUcxi] | 0;
  const centerZ = memory[p.SUcyi] | 0;
  const firstX = (centerX - radius) & 0xffff;
  const lastX = (centerX + radius) & 0xffff;
  memory[p.GRfrlo] = firstX;
  memory[p.GRfrhi] = lastX;
  memory[p.GRfrx] = firstX;
  machine.A = firstX;
  machine.B = centerX;
  machine.C = lastX;

  const surface = p.nw + p.RPSM;
  const profileCache = machine.noctisRoundHillCache ??= {
    generation: 0,
    stamp: new Uint32Array(80001),
    distance: new Int32Array(80001),
    scratchLow: new Int32Array(80001),
    scratchHigh: new Int32Array(80001),
    height: new Int32Array(80001),
  };
  profileCache.generation = (profileCache.generation + 1) >>> 0;
  if (profileCache.generation === 0) {
    profileCache.stamp.fill(0);
    profileCache.generation = 1;
  }
  const profileGeneration = profileCache.generation;
  const control = floatingPoint(machine).control;
  const directProfile = (control & 0x0c00) === 0;
  const profileDivisor = float32FromBits(memory[p.GRfv]);
  const profileHeight = float32FromBits(memory[p.GRfht]);
  let x = firstX;
  for (; (x >>> 0) < (lastX >>> 0); x = (x + 1) | 0) {
    memory[p.GRfrx] = x;
    let z = (centerZ - radius) & 0xffff;
    memory[p.GRfrz] = z;
    machine.D = z;
    for (;;) {
      if (x >= 0 && x < 200 && z >= 0 && z < 200) {
        const dx = (x - centerX) | 0;
        const dz = (z - centerZ) | 0;
        memory[p.GRdxi] = dx;
        groundRoundHillDx(machine, linked);
        memory[p.GRdzi] = dz;
        const distanceSquared = Math.imul(dx, dx) + Math.imul(dz, dz);
        if (profileCache.stamp[distanceSquared] === profileGeneration) {
          memory[p.GRfdz] = float32Bits(dz);
          memory[p.GRfd] = profileCache.distance[distanceSquared];
          memory[p.GRfs0] = profileCache.scratchLow[distanceSquared];
          memory[p.GRfs1] = profileCache.scratchHigh[distanceSquared];
          memory[p.GRfy] = profileCache.height[distanceSquared];
        } else {
          if (directProfile) {
            memory[p.GRfdz] = float32Bits(dz);
            writeFloat64(memory, p.GRfs0, distanceSquared);
            const distance = Math.fround(Math.sqrt(distanceSquared));
            memory[p.GRfd] = float32Bits(distance);
            const angle = distance / profileDivisor;
            writeFloat64(memory, p.GRfs0, angle);
            memory[p.GRfy] = float32Bits(Math.fround(Math.cos(angle) * profileHeight));
          } else {
            groundRoundHillProfile(machine, linked);
          }
          profileCache.stamp[distanceSquared] = profileGeneration;
          profileCache.distance[distanceSquared] = memory[p.GRfd];
          profileCache.scratchLow[distanceSquared] = memory[p.GRfs0];
          profileCache.scratchHigh[distanceSquared] = memory[p.GRfs1];
          profileCache.height[distanceSquared] = memory[p.GRfy];
        }
        machine.B = dz;

        if ((memory[p.GRfy] & 0x80000000) === 0) {
          const pointer = (Math.imul(z, 200) + x) | 0;
          const byteAddress = surface + pointer;
          const oldValue = memory[byteAddress] & 0xff;
          memory[p.GRptr] = pointer;
          memory[p.MBptr] = p.RPSM + pointer;
          memory[p.MBval] = oldValue;
          memory[p.GRsval] = oldValue;
          if (directProfile) {
            let height = Math.fround(float32FromBits(memory[p.GRfy]) + oldValue);
            memory[p.GRfy] = float32Bits(height);
            if ((memory[p.GRfcanyon] | 0) !== 0) {
              writeFloat64(memory, p.GRfs0, height - 127);
              if ((memory[p.GRfs1] & 0x80000000) === 0) {
                height = Math.fround(254 - height);
                memory[p.GRfy] = float32Bits(height);
              }
            } else {
              const maximum = float32FromBits(memory[p.GRfhmt]);
              writeFloat64(memory, p.GRfs0, height - maximum);
              if ((memory[p.GRfs1] & 0x80000000) === 0) memory[p.GRfy] = memory[p.GRfhmt];
            }
          } else {
            groundAddSurfaceValue(machine, linked);
            if ((memory[p.GRfcanyon] | 0) !== 0) {
              groundSubtractToScratch(machine, linked, "GRK127L");
              if ((memory[p.GRfs1] & 0x80000000) === 0) groundMirror254(machine, linked);
            } else {
              groundSubtractMaximum(machine, linked);
              if ((memory[p.GRfs1] & 0x80000000) === 0) memory[p.GRfy] = memory[p.GRfhmt];
            }
          }

          groundChopHeight(machine, linked);
          const stored = memory[p.GRfti] & 0xff;
          memory[p.MBval] = stored;
          memory[byteAddress] = stored;
          machine.C = stored;
        }
      }

      z = (z + 1) | 0;
      memory[p.GRfrz] = z;
      machine.A = z;
      machine.B = (centerZ + radius) | 0;
      if ((z >>> 0) >= (machine.B >>> 0)) break;
    }
  }

  memory[p.GRfrx] = x;
  machine.A = x;
  machine.X = LINO_DONE;
}

function groundStdCrater(machine, linked) {
  const memory = machine.memory;
  let p = groundStdCraterAddressCaches.get(linked);
  if (!p) {
    p = Object.fromEntries([
      "nw", "SUia", "SUcxi", "SUcyi", "GRfht", "GRfhmt", "GRfscl", "GRfsca",
      "GRscmap", "GRcraterid", "GRfr2", "GRfscr", "GRfrlo", "GRfrhi",
      "GRsczlo", "GRsczhi", "GRfrx", "GRfrz", "GRdxi", "GRdzi", "GRfd2",
      "GRfd2delta", "GRscaddr", "GRfy", "GRscache", "GRsstamp", "GRsval",
      "GRfs0", "GRfs1", "GRfti",
    ].map((name) => [name, address(linked, name)]));
    groundStdCraterAddressCaches.set(linked, p);
  }

  const craterId = (memory[p.GRcraterid] + 1) | 0;
  memory[p.GRcraterid] = craterId;
  groundCraterHeight(machine, linked);
  let radius = memory[p.SUia] | 0;
  if (radius < 0) radius = (-radius) | 0;
  memory[p.SUia] = radius;
  const radiusSquared = Math.imul(radius, radius) | 0;
  memory[p.GRfr2] = radiusSquared;
  groundCraterRadius(machine, linked);

  const centerX = memory[p.SUcxi] | 0;
  const centerZ = memory[p.SUcyi] | 0;
  const alignment = memory[p.GRfsca] | 0;
  const rawFirstX = (centerX - radius) | 0;
  const rawLastX = (centerX + radius) | 0;
  const rawFirstZ = (centerZ - radius) | 0;
  const rawLastZ = (centerZ + radius) | 0;
  const firstX = rawFirstX >= 0 ? rawFirstX : 0;
  const lastX = (rawLastX >>> 0) <= (alignment >>> 0) ? rawLastX : alignment;
  const firstZ = rawFirstZ >= 0 ? rawFirstZ : 0;
  const lastZ = (rawLastZ >>> 0) <= (alignment >>> 0) ? rawLastZ : alignment;
  machine.B = centerZ;
  machine.C = rawLastZ;
  memory[p.GRfrlo] = firstX;
  memory[p.GRfrhi] = lastX;
  memory[p.GRsczlo] = firstZ;
  memory[p.GRsczhi] = lastZ;
  memory[p.GRfrx] = firstX;
  if (firstX >= lastX || firstZ >= lastZ) {
    machine.A = firstX >= lastX ? firstX : firstZ;
    machine.X = LINO_DONE;
    return;
  }

  const base = p.nw + (memory[p.GRscmap] | 0);
  let lastB = machine.B | 0;
  let lastC = machine.C | 0;
  let lastD = machine.D | 0;
  for (let x = firstX; x < lastX; x += 1) {
    memory[p.GRfrx] = x;
    const dx = (x - centerX) | 0;
    memory[p.GRdxi] = dx;
    let z = firstZ;
    let dz = (z - centerZ) | 0;
    let distanceSquared = (Math.imul(dx, dx) + Math.imul(dz, dz)) | 0;
    lastB = dx;
    lastC = dz;
    lastD = distanceSquared;
    let delta = (dz + dz + 1) | 0;
    let relativeAddress = (Math.imul(z, alignment) + x + (memory[p.GRscmap] | 0)) | 0;
    memory[p.GRfrz] = z;
    memory[p.GRdzi] = dz;
    memory[p.GRfd2] = distanceSquared;
    memory[p.GRfd2delta] = delta;
    memory[p.GRscaddr] = relativeAddress;
    for (; z < lastZ; z += 1) {
      if (distanceSquared <= radiusSquared) {
        if ((memory[p.GRsstamp + distanceSquared] | 0) === craterId) {
          memory[p.GRfy] = memory[p.GRscache + distanceSquared];
        } else {
          memory[p.GRfd2] = distanceSquared;
          groundCraterProfile(machine, linked);
          if ((memory[p.GRfhmt] >>> 0) !== 0x3f800000
              && (memory[p.GRfy] & 0x7fffffff) !== 0) groundCraterPower(machine, linked);
          memory[p.GRscache + distanceSquared] = memory[p.GRfy];
          memory[p.GRsstamp + distanceSquared] = craterId;
        }

        const byteAddress = base + Math.imul(z, alignment) + x;
        const oldValue = memory[byteAddress] & 0xff;
        memory[p.GRsval] = oldValue;
        groundAddSurfaceValue(machine, linked);
        if ((memory[p.GRfy] & 0x80000000) !== 0) memory[p.GRfy] = 0;
        groundSubtractToScratch(machine, linked, "GRfscl", true);
        if ((memory[p.GRfs1] & 0x80000000) === 0) groundLimitFloat(machine, linked);
        groundChopHeight(machine, linked);
        lastC = memory[p.GRfti] & 0xff;
        memory[byteAddress] = lastC;
      }

      distanceSquared = (distanceSquared + delta) | 0;
      delta = (delta + 2) | 0;
      relativeAddress = (relativeAddress + alignment) | 0;
      dz = (dz + 1) | 0;
      memory[p.GRfd2] = distanceSquared;
      memory[p.GRfd2delta] = delta;
      memory[p.GRscaddr] = relativeAddress;
      memory[p.GRdzi] = dz;
      memory[p.GRfrz] = z + 1;
    }
  }
  memory[p.GRfrx] = lastX;
  machine.A = lastX;
  machine.B = lastB;
  machine.C = lastC;
  machine.D = lastD;
  machine.X = LINO_DONE;
}

function groundLimitFloat(machine, linked) {
  groundStoreFloat(machine, linked, "GRfy", value(machine.memory, linked, "GRfscl"));
}

function groundTextureDarkline(machine, linked) {
  const memory = machine.memory;
  let p = groundTextureDarklineAddressCaches.get(linked);
  if (!p) {
    const names = [
      "nw", "brtlseed", "brtln", "SUbnc", "SUbh", "SUhx", "SUhv",
      "VHGNDtexbase", "VHGNDlinex", "VHGNDlinez", "VHGNDlinelen",
      "VHGNDlinetrendx", "VHGNDlinetrendz", "VHGNDptr",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    groundTextureDarklineAddressCaches.set(linked, p);
  }

  let seed = memory[p.brtlseed] >>> 0;
  let drawCount = memory[p.SUbnc] >>> 0;
  let hash = memory[p.SUbh] >>> 0;
  let lastRandom = 0;
  let lastBound = 0;
  let lastC = 0;
  const draw = (bound) => {
    lastBound = bound;
    seed = (Math.imul(seed, 0x015a4e35) + 1) >>> 0;
    const random = (seed >>> 16) & 0x7fff;
    lastRandom = Math.trunc((random * bound) / 0x8000) | 0;
    drawCount = (drawCount + 1) >>> 0;
    let word = lastRandom >>> 0;
    for (let byte = 0; byte < 4; byte += 1) {
      hash = Math.imul((hash ^ (word & 0xff)) >>> 0, 16777619) >>> 0;
      word >>>= 8;
    }
    return lastRandom;
  };

  let lineX = draw(256);
  let lineZ = draw(256);
  memory[p.VHGNDlinex] = lineX;
  memory[p.VHGNDlinez] = lineZ;
  let remaining = memory[p.VHGNDlinelen] | 0;
  const trendX = memory[p.VHGNDlinetrendx] | 0;
  const trendZ = memory[p.VHGNDlinetrendz] | 0;
  const textureBase = (p.nw + (memory[p.VHGNDtexbase] >>> 0)) >>> 0;
  let texturePointer = memory[p.VHGNDptr] | 0;
  lastC = lastRandom;

  while (remaining !== 0) {
    lineX = (lineX + draw(3) + trendX) | 0;
    memory[p.VHGNDlinex] = lineX;
    lineZ = (lineZ + draw(3) + trendZ) | 0;
    memory[p.VHGNDlinez] = lineZ;
    texturePointer = (Math.imul(lineZ, 256) + lineX) & 0xffff;
    memory[p.VHGNDptr] = texturePointer;
    lastC = lastRandom;
    if (texturePointer > 0) {
      const address = textureBase + texturePointer;
      lastC = (memory[address] & 0xff) >>> 1;
      memory[address] = lastC;
    }
    remaining = (remaining - 1) | 0;
  }

  memory[p.brtlseed] = seed;
  memory[p.brtln] = lastBound;
  memory[p.SUbnc] = drawCount;
  memory[p.SUhv] = lastRandom;
  memory[p.SUhx] = hash;
  memory[p.SUbh] = hash;
  memory[p.VHGNDlinelen] = 0;
  machine.A = 0;
  machine.B = 0;
  machine.C = lastC;
  machine.D = hash | 0;
  machine.X = LINO_DONE;
}

function groundPostSurface(machine, linked) {
  const memory = machine.memory;
  let p = groundPostSurfaceAddressCaches.get(linked);
  if (!p) {
    const names = [
      "nw", "RPSM", "ROBJ", "brtlseed", "brtln", "SUbnc", "SUbh",
      "SUhx", "SUhv", "VHGNDpostn", "VHGNDlinex", "VHGNDlinez",
      "VHGNDlinelen", "VHGNDdeviation", "VHGNDvariability", "VHGNDptr",
      "VHGNDtmp", "VHGNDs1", "VHGNDs2", "VHGNDincl", "VHGNDoval",
      "MBptr", "MBval",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    groundPostSurfaceAddressCaches.set(linked, p);
  }

  let seed = memory[p.brtlseed] >>> 0;
  let drawCount = memory[p.SUbnc] >>> 0;
  let hash = memory[p.SUbh] >>> 0;
  let lastRandom = 0;
  let lastBound = 0;
  const draw = (bound) => {
    lastBound = bound;
    seed = (Math.imul(seed, 0x015a4e35) + 1) >>> 0;
    const random = (seed >>> 16) & 0x7fff;
    lastRandom = Math.trunc((random * bound) / 0x8000) | 0;
    drawCount = (drawCount + 1) >>> 0;
    let word = lastRandom >>> 0;
    for (let byte = 0; byte < 4; byte += 1) {
      hash = Math.imul((hash ^ (word & 0xff)) >>> 0, 16777619) >>> 0;
      word >>>= 8;
    }
    return lastRandom;
  };

  const surfaceBase = p.nw + p.RPSM;
  const objectsBase = p.nw + p.ROBJ;
  let postCount = draw(5);
  memory[p.VHGNDpostn] = postCount;
  let pointer = memory[p.VHGNDptr] | 0;
  let temporary = memory[p.VHGNDtmp] | 0;

  if (postCount !== 0) {
    while (postCount !== 0) {
      let remaining = draw(500);
      memory[p.VHGNDlinelen] = remaining;
      let lineX = draw(200);
      let lineZ = draw(200);
      let deviation = (draw(25) - 50) | 0;
      const variability = (draw(10) + 2) | 0;

      while (remaining !== 0) {
        lineX = (lineX + draw(3) - 1) | 0;
        lineZ = (lineZ + draw(3) - 1) | 0;
        deviation = (deviation + draw(variability) - (variability >>> 1)) | 0;
        pointer = (Math.imul(lineZ, 200) + lineX) & 0xffff;
        if (pointer > 0 && pointer < 40000) {
          temporary = ((memory[surfaceBase + pointer] & 0xff) + deviation) | 0;
          if (temporary < 0) temporary = 0;
          else if (temporary > 127) temporary = 127;
          memory[surfaceBase + pointer] = temporary;
          memory[surfaceBase + pointer + 1] = temporary;
          memory[surfaceBase + pointer - 1] = temporary;
          memory[surfaceBase + pointer + 200] = temporary;
          memory[surfaceBase + pointer - 200] = temporary;
        }
        remaining = (remaining - 1) | 0;
      }

      memory[p.VHGNDlinex] = lineX;
      memory[p.VHGNDlinez] = lineZ;
      memory[p.VHGNDlinelen] = 0;
      memory[p.VHGNDdeviation] = deviation;
      memory[p.VHGNDvariability] = variability;
      postCount = (postCount - 1) | 0;
      memory[p.VHGNDpostn] = postCount;
    }

    for (pointer = 200; pointer < 38800; pointer += 1) {
      temporary = (
        (memory[surfaceBase + pointer] & 0xff)
        + (memory[surfaceBase + pointer - 1] & 0xff)
        + (memory[surfaceBase + pointer + 1] & 0xff)
        + (memory[surfaceBase + pointer - 200] & 0xff)
        + (memory[surfaceBase + pointer + 200] & 0xff)
      ) >>> 0;
      temporary = Math.trunc(temporary / 5) | 0;
      memory[surfaceBase + pointer] = temporary;
    }
  }

  let first = 0;
  let second = 0;
  let inclination = 0;
  let objectValue = 0;
  for (pointer = 0; pointer < 40000; pointer += 1) {
    first = memory[surfaceBase + pointer] & 0xff;
    second = memory[surfaceBase + pointer + 1] & 0xff;
    inclination = Math.abs(first - second);
    second = memory[surfaceBase + pointer + 200] & 0xff;
    inclination += Math.abs(first - second);
    objectValue = 0;
    if (inclination < 20) {
      objectValue = draw(2);
      if (inclination < 15) {
        objectValue = draw(3);
        if (inclination < 10) objectValue = draw(4);
      }
    }
    memory[objectsBase + pointer] = ((memory[objectsBase + pointer] & 0xfc) | objectValue) & 0xff;
  }

  memory[p.brtlseed] = seed;
  memory[p.brtln] = lastBound;
  memory[p.SUbnc] = drawCount;
  memory[p.SUhv] = lastRandom;
  memory[p.SUhx] = hash;
  memory[p.SUbh] = hash;
  memory[p.VHGNDpostn] = 0;
  memory[p.VHGNDptr] = 40000;
  memory[p.VHGNDtmp] = temporary;
  memory[p.VHGNDs1] = first;
  memory[p.VHGNDs2] = second;
  memory[p.VHGNDincl] = inclination;
  memory[p.VHGNDoval] = objectValue;
  memory[p.MBptr] = p.ROBJ + 39999;
  memory[p.MBval] = memory[objectsBase + 39999] & 0xff;
  machine.A = 40000;
  machine.B = 0;
  machine.C = lastRandom;
  machine.D = hash | 0;
  machine.X = LINO_DONE;
}

function landedFastRandom(machine, linked, mask) {
  const memory = machine.memory;
  const seed = value(memory, linked, "SUfseed") >>> 0;
  const lowHalf = seed & 0xffff;
  const highHalf = seed >>> 16;
  const lowProduct = lowHalf * lowHalf;
  const middle = 2 * lowHalf * highHalf;
  const lowerWide = lowProduct + (middle & 0xffff) * 0x10000;
  const low = lowerWide | 0;
  const high = (highHalf * highHalf + Math.floor(middle / 0x10000)
    + Math.floor(lowerWide / 0x100000000)) | 0;
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
  const page = noctisBuffer(linked, "RADPT");
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
  const p = landedTerrainAddresses(linked);
  const dx2 = dx * dx;
  writeFloat64(memory, p.FT0, dx2);
  writeFloat64(memory, p.FA0, dz);
  const dz2 = dz * dz;
  writeFloat64(memory, p.FA0, dz2);
  const sum = dz2 + dx2;
  writeFloat64(memory, p.FA0, sum);
  const distance = Math.sqrt(sum);
  writeFloat64(memory, p.FA0, distance);
  const fpu = floatingPoint(machine);
  fpu.control = memory[p.GRcwc] & 0xffff;
  memory[p.FI] = convertToInt32(distance, fpu.control);
  fpu.control = memory[p.GRcwn] & 0xffff;
  return memory[p.FI] | 0;
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
  const p = landedTerrainAddresses(linked);
  landedTileAdmissionAt(
    machine, linked, p,
    memory[p.VHGNDx] | 0, memory[p.VHGNDz] | 0,
    memory[p.VHGNDcamtx] | 0, memory[p.VHGNDcamtz] | 0,
  );
}

function landedTileAdmissionAt(machine, linked, p, x, z, camtx, camtz) {
  const memory = machine.memory;
  const manhattan = Math.abs(camtx - x) + Math.abs(camtz - z);
  memory[p.VHGNDmanhattan] = manhattan;
  if (manhattan > 90) {
    memory[p.VHGNDnativecomplete] = 2;
    return;
  }
  memory[p.VHGNDh1] = Math.imul(z, 200) + x;
  const dx = (memory[p.VHGNDcamx] - ((x << 14) + 8192)) | 0;
  const dz = (memory[p.VHGNDcamz] - ((z << 14) + 8192)) | 0;
  memory[p.VHGNDdx] = dx;
  memory[p.VHGNDdz] = dz;
  const distance = Math.sqrt(dx * dx + dz * dz);
  const fpu = floatingPoint(machine);
  fpu.control = memory[p.GRcwc] & 0xffff;
  const roundedDistance = convertToInt32(distance, fpu.control);
  memory[p.FI] = roundedDistance;
  fpu.control = memory[p.GRcwn] & 0xffff;
  const raw = roundedDistance >> 14;
  memory[p.VHGNDrawdepth] = raw;
  memory[p.VHGNDdepth] = Math.max(raw - 1, 0);
  if (!machine.noctisDisableTerrainTileCore) landedTerrainTileCore(machine, linked, manhattan, raw);
}

function landedTerrainAddresses(linked) {
  let cached = landedTerrainAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "VHGNDnativecomplete", "VHGNDmirror", "VHGNDruinpass", "VHGNDruinanchor",
    "VHGNDdepth", "VHGNDshade", "VHGNDh1", "VHGNDs1", "VHGNDs2", "VHGNDs3", "VHGNDs4",
    "GRiptype", "VHGNDsctype", "VHGNDruined", "VHGNDruindrawn", "VHGNDruins", "SPtinta", "DBcol", "SPescr", "DBflar", "DBent",
    "SPcull", "VHGNDtilepolys", "PJfwbase", "fw", "VHGNDvctri", "FCret", "PGtexf", "RPSM",
    "VHGNDnormindex", "VHGNDnormgen", "VHGNDnormstamp", "VHGNDnormx", "VHGNDnormy", "VHGNDnormz",
    "VHGNDvcgen", "VHGNDvcindex", "VHGNDvcstamp", "VHGNDvcvisible",
    "VHGNDvcrx0", "VHGNDvcrx1", "VHGNDvcry0", "VHGNDvcry1",
    "VHGNDvcrz0", "VHGNDvcrz1", "VHGNDvcpx", "VHGNDvcpy", "VHGNDmpbase",
    "FI", "VHGNDvslot", "VHGNDvi", "PGFi", "FA0",
    "VHGNDx", "VHGNDz", "VHGNDxlo", "VHGNDxhi", "VHGNDzlo", "VHGNDzhi",
    "VHGNDlodstep", "VHGNDlodradius", "VHGNDbackspan", "VHGNDmindepth", "VHGNDmaxdepth",
    "VHGNDcamtx", "VHGNDcamtz", "VHGNDcamx", "VHGNDcamz", "VHGlanded", "VHGNDbeta", "VHGNDtmp",
    "VHGNDdropx", "VHGNDdropz", "VHGNDanimals", "VHGNDbirds", "VHGNDanidata", "VHGNDbirddata",
    "VHGNDanisingle", "VHGNDanii", "VHGNDanip", "VHGNDanix", "VHGNDaniz", "VHGNDviewrz",
    "VHGNDmii", "VHGNDbii", "VHGNDfaunamid", "VHGNDfaunabid", "SPskipmid",
    "VHGNDalpha", "VHGNDwaterhorizon", "VHGNDwaterden", "VHGNDwatery",
    "GRSKnightzone", "VHGNDwaterbase", "VHGNDwaterptr", "VHGNDwatercount",
    "VHGNDmanhattan", "VHGNDrawdepth", "VHGNDvv",
    "VHGdrawhud", "VHGhudcount", "VHGNDsurlight", "VHGseamless",
    "VHGNDframei", "VHGNDframey", "VHGNDframecol", "VHGNDframeoff", "VHGNDframecount",
    "VHGmode", "VHGbeta", "VHGNDhudy", "VHGNDcompassrem", "VHGNDcompasspos",
    "VHGNDcompassx", "VHGNDcompassi", "VHGNDcompassdir", "VHGNDcompassrow",
    "VHGNDcompassmask", "VHGNDlampx", "VHGNDlampy", "VHGNDlampsize", "VHGNDlamprow",
    "VHGNDhudsource", "VHGNDhudi", "VHGNDhudchar", "VHGNDhudrow", "VHGNDhudx",
    "VHGNDhudpacked", "VHGNDhudshift",
    "FT0", "GRcwc", "GRcwn",
    "VHGNDseed", "SUfseed", "SUfeax", "SUfmask", "SUfval",
  ];
  cached = { ...Object.fromEntries(names.map((name) => [name, address(linked, name)])) };
  cached.surface = noctisBuffer(linked, "RPSM");
  landedTerrainAddressCaches.set(linked, cached);
  return cached;
}

function waterBackdrop(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  let horizon = 100 - Math.imul(memory[p.VHGNDalpha] | 0, 5);
  if (horizon < 10) horizon = 10;
  if (horizon > 190) horizon = 190;
  const denominator = 191 - horizon;
  const page = noctisBuffer(linked, "RADPT");
  const night = (memory[p.GRSKnightzone] | 0) !== 0;
  memory[p.VHGNDwaterhorizon] = horizon;
  memory[p.VHGNDwaterden] = denominator;
  for (let y = horizon; y < 191; y += 1) {
    let color = 128;
    if (!night) color = 144 + Math.min(Math.trunc(((y - horizon) * 16) / denominator), 15);
    const start = page + y * 320 + 5;
    memory.fill(color, start, start + 307);
    memory[p.VHGNDwatery] = y;
    memory[p.VHGNDwaterbase] = color;
    memory[p.VHGNDwaterptr] = start + 307;
    memory[p.VHGNDwatercount] = 0;
  }
  memory[p.VHGNDwatery] = 191;
  machine.A = 191;
  machine.C = memory[p.VHGNDwaterbase] | 0;
  machine.X = LINO_DONE;
}

function denseAtmosphere(machine, linked) {
  const memory = machine.memory;
  let p = denseAtmosphereAddressCaches.get(linked);
  if (!p) {
    const names = ["nw", "RADPT", "SUsp", "SUsi", "VHGNDdensebase"];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    denseAtmosphereAddressCaches.set(linked, p);
  }

  const base = p.nw + p.RADPT + 2880;
  let lastMasked = 0;
  for (let index = 0; index < 58240; index += 1) {
    lastMasked = memory[base + index] & 63;
    memory[base + index] = lastMasked;
  }
  memory[p.SUsp] = base;
  memory[p.VHGNDdensebase] = base;

  for (let index = 320; index < 57280; index += 1) {
    const pointer = base + index;
    const total = (memory[pointer - 320] & 0xff)
      + (memory[pointer - 319] & 0xff)
      + (memory[pointer - 318] & 0xff)
      + (memory[pointer - 317] & 0xff)
      + (memory[pointer] & 0xff)
      + (memory[pointer + 1] & 0xff)
      + (memory[pointer + 2] & 0xff)
      + (memory[pointer + 3] & 0xff)
      + (memory[pointer + 320] & 0xff)
      + (memory[pointer + 321] & 0xff)
      + (memory[pointer + 322] & 0xff)
      + (memory[pointer + 323] & 0xff)
      + (memory[pointer + 640] & 0xff)
      + (memory[pointer + 641] & 0xff)
      + (memory[pointer + 642] & 0xff)
      + (memory[pointer + 643] & 0xff);
    memory[base + index] = total >>> 4;
  }
  memory[p.SUsi] = 57280;
  machine.A = base;
  machine.B = 0;
  machine.C = lastMasked;
  machine.D = base + 58240;
  machine.X = LINO_DONE;
}

function terrainTileFauna(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  const animals = codeHandle(linked, "VHGND render animals");
  const birds = codeHandle(linked, "VHGND render birds");
  if (typeof machine.callCode !== "function" || animals < 1 || birds < 1) {
    throw new Error("Faithful terrain fauna requires nested Lino model dispatch");
  }
  const x = memory[p.VHGNDx] | 0;
  const z = memory[p.VHGNDz] | 0;
  const planetType = memory[p.GRiptype] | 0;
  if (planetType !== 3) {
    memory[p.VHGNDanisingle] = 0;
    memory[p.SPskipmid] = 0;
    machine.A = planetType;
    machine.X = LINO_DONE;
    return;
  }
  let mammal = 0;
  let bird = 0;
  const animalCount = memory[p.VHGNDanimals] >>> 0;
  const birdCount = memory[p.VHGNDbirds] >>> 0;
  memory[p.VHGNDmii] = 0;
  memory[p.VHGNDbii] = 0;
  memory[p.VHGNDanisingle] = 1;
  while (mammal < animalCount || bird < birdCount) {
    const mammalRecord = p.VHGNDanidata + mammal * 10;
    const birdRecord = p.VHGNDbirddata + bird * 12;
    const mammalId = mammal < animalCount ? memory[mammalRecord + 9] >>> 0 : 0x7fffffff;
    const birdId = bird < birdCount ? memory[birdRecord + 10] >>> 0 : 0x7fffffff;
    memory[p.VHGNDfaunamid] = mammalId;
    memory[p.VHGNDfaunabid] = birdId;
    const chooseMammal = mammalId < birdId;
    const record = chooseMammal ? mammalRecord : birdRecord;
    memory[p.VHGNDanip] = record;
    memory[p.VHGNDanix] = memory[record];
    memory[p.VHGNDaniz] = memory[record + 1];
    machine.C = record;
    const cellX = Math.max(0, Math.min(199, (memory[p.VHGNDanix] / 16384) | 0));
    const cellZ = Math.max(0, Math.min(199, (memory[p.VHGNDaniz] / 16384) | 0));
    const matches = cellX === x && cellZ === z;
    memory[p.VHGNDviewrz] = matches ? 1 : 0;
    if (matches) {
      memory[p.VHGNDanii] = chooseMammal ? mammal : bird;
      machine.callCode(chooseMammal ? animals : birds);
    }
    if (chooseMammal) {
      mammal += 1;
      memory[p.VHGNDmii] = mammal;
    } else {
      bird += 1;
      memory[p.VHGNDbii] = bird;
    }
  }
  memory[p.VHGNDfaunamid] = 0x7fffffff;
  memory[p.VHGNDfaunabid] = 0x7fffffff;
  memory[p.VHGNDanisingle] = 0;
  memory[p.SPskipmid] = 0;
  machine.A = 0x7fffffff;
  machine.X = LINO_DONE;
}

function landedRockAddresses(linked) {
  let cached = landedRockAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "VHGNDrocktile", "VHGNDrockdensity", "VHGNDcdown", "VHGNDrockworkscale",
    "VHGNDrockscale", "VHGNDrockpeak", "VHGNDquartz", "VHGNDoox", "VHGNDooy",
    "VHGNDooz", "VHGNDrx0", "VHGNDrx1", "VHGNDrx2", "VHGNDrz0", "VHGNDrz1",
    "VHGNDrz2", "VHGNDry0", "VHGNDry1", "VHGNDry2", "VHGNDrcolor",
    "VHGNDrcol0", "VHGNDrcol1", "VHGNDrcol2", "VHGNDrtop", "VHGNDrox",
    "VHGNDroz", "VHGNDroy", "VHGNDviewx", "VHGNDviewz", "VHGNDheight",
    "VHGNDtilex", "VHGNDtilez", "VHGNDfx", "VHGNDfz", "VHGNDh1i",
    "VHGNDh2i", "VHGNDh3i", "VHGNDh4i", "VHGNDpy", "GRcwc", "GRcwn",
  ];
  cached = {
    ...landedTerrainAddresses(linked),
    ...polymapAddresses(linked),
    ...Object.fromEntries(names.map((name) => [name, address(linked, name)])),
  };
  landedRockAddressCaches.set(linked, cached);
  return cached;
}

function landedEyeHeightAt(machine, linked, p, worldX, worldZ) {
  const memory = machine.memory;
  const tileX = Math.max(0, Math.min(198, worldX >> 14));
  const tileZ = Math.max(0, Math.min(198, worldZ >> 14));
  const fx = worldX & 16383;
  const fz = worldZ & 16383;
  const h1 = tileZ * 200 + tileX;
  const surface = p.surface;
  const s1 = memory[surface + h1] & 255;
  const s2 = memory[surface + h1 + 1] & 255;
  const s3 = memory[surface + h1 + 201] & 255;
  const s4 = memory[surface + h1 + 200] & 255;
  memory[p.VHGNDcamx] = worldX;
  memory[p.VHGNDcamz] = worldZ;
  memory[p.VHGNDtilex] = tileX;
  memory[p.VHGNDtilez] = tileZ;
  memory[p.VHGNDfx] = fx;
  memory[p.VHGNDfz] = fz;
  memory[p.VHGNDh1] = h1;
  memory[p.VHGNDs1] = s1;
  memory[p.VHGNDs2] = s2;
  memory[p.VHGNDs3] = s3;
  memory[p.VHGNDs4] = s4;
  memory[p.VHGNDh1i] = -(s1 << 11);
  memory[p.VHGNDh2i] = -(s2 << 11);
  memory[p.VHGNDh3i] = -(s3 << 11);
  memory[p.VHGNDh4i] = -(s4 << 11);
  writeFloat64(memory, p.FB0, 1 / 16384);
  landedHeightTriangle(machine, linked, fx + fz < 16384);
  memory[p.FS0] = memory[p.VHGNDpy];
  landedHeightChop(machine, linked);
  const height = ((memory[p.FI] | 0) - 600) | 0;
  memory[p.VHGNDheight] = height;
  return height;
}

function loadTriangleCoordinates(machine, p,
  x0, y0, z0, x1, y1, z1, x2, y2, z2, duplicateApex = false) {
  const memory = machine.memory;
  const floats = memory[p.PJfwbase] >>> 0;
  const view = dataView(memory);
  writeFloat64View(view, floats + 504, x0); writeFloat64View(view, floats + 506, x1); writeFloat64View(view, floats + 508, x2);
  writeFloat64View(view, floats + 512, y0); writeFloat64View(view, floats + 514, y1); writeFloat64View(view, floats + 516, y2);
  writeFloat64View(view, floats + 520, z0); writeFloat64View(view, floats + 522, z1); writeFloat64View(view, floats + 524, z2);
  if (duplicateApex) {
    writeFloat64View(view, floats + 510, x2);
    writeFloat64View(view, floats + 518, y2);
    writeFloat64View(view, floats + 526, z2);
  }
  const count = duplicateApex ? 4 : 3;
  memory[p.VHGNDvi] = count - 1;
  memory[p.VHGNDvv] = z2;
  memory[p.VHGNDvslot] = p.FSINZ;
  memory[p.PGFi] = p.FSINZ + count - 1;
}

function loadRockTriangle(machine, p, vertices, duplicateApex = false) {
  loadTriangleCoordinates(machine, p,
    vertices[0][0], vertices[0][1], vertices[0][2],
    vertices[1][0], vertices[1][1], vertices[1][2],
    vertices[2][0], vertices[2][1], vertices[2][2], duplicateApex);
}

function renderRockCommand(machine, linked, p, command) {
  loadTriangleCoordinates(machine, p,
    command[0], command[1], command[2], command[3], command[4], command[5],
    command[6], command[7], command[8], command[10] !== 0);
  mappedFacing(machine, linked);
  if ((machine.memory[p.FCret] | 0) === 0) return;
  machine.memory[p.DBcol] = command[9];
  machine.memory[p.SPtinta] = command[9];
  if (command[10] !== 0) {
    machine.memory[p.PJnrv] = 4;
    polymap(machine, linked);
  } else {
    machine.memory[p.PJnrv] = 3;
    poly3d(machine, linked);
  }
}

function rockCommandBounds(commands) {
  let minX = Infinity; let minY = Infinity; let minZ = Infinity;
  let maxX = -Infinity; let maxY = -Infinity; let maxZ = -Infinity;
  for (const command of commands) {
    for (let vertex = 0; vertex < 3; vertex += 1) {
      const offset = vertex * 3;
      const x = command[offset]; const y = command[offset + 1]; const z = command[offset + 2];
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
    }
  }
  return [minX, minY, minZ, maxX, maxY, maxZ];
}

function rockBoundsMayRender(machine, p, bounds, margin = 2) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const cameraX = directPolySlot(memory, p, p.FSCAMX);
  const cameraY = directPolySlot(memory, p, p.FSCAMY);
  const cameraZ = directPolySlot(memory, p, p.FSCAMZ);
  const betaSin = directPolySlot(memory, p, p.FSTSB);
  const betaCos = directPolySlot(memory, p, p.FSTCB);
  const alphaCos = directPolySlot(memory, p, p.FSTCA);
  const alphaSin = directPolySlot(memory, p, p.FSTSA);
  const near = directPolySlot(memory, p, p.FSUNEG);
  const distance = directPolySlot(memory, p, p.FSDPP);
  const centerX = directPolySlot(memory, p, p.FSXC);
  const centerY = directPolySlot(memory, p, p.FSYC);
  let visibleCorners = 0;
  let minScreenX = Infinity; let maxScreenX = -Infinity;
  let minScreenY = Infinity; let maxScreenY = -Infinity;
  for (let corner = 0; corner < 8; corner += 1) {
    const worldX = bounds[(corner & 1) !== 0 ? 3 : 0];
    const worldY = bounds[(corner & 2) !== 0 ? 4 : 1];
    const worldZ = bounds[(corner & 4) !== 0 ? 5 : 2];
    const z = roundFloat32(worldZ - cameraZ, control);
    const x = roundFloat32(worldX - cameraX, control);
    const y = roundFloat32(worldY - cameraY, control);
    const rx = roundFloat32(x * betaCos + z * betaSin, control);
    const z2 = roundFloat32(z * betaCos - x * betaSin, control);
    const rotatedZWide = y * alphaSin + z2 * alphaCos;
    if (Number.isNaN(rotatedZWide) || rotatedZWide < near) continue;
    const rz = roundFloat32(rotatedZWide, control);
    const ry = roundFloat32(y * alphaCos - z2 * alphaSin, control);
    const factor = distance / rz;
    const screenX = factor * rx + centerX;
    const screenY = factor * ry + centerY;
    if (screenX < minScreenX) minScreenX = screenX;
    if (screenX > maxScreenX) maxScreenX = screenX;
    if (screenY < minScreenY) minScreenY = screenY;
    if (screenY > maxScreenY) maxScreenY = screenY;
    visibleCorners += 1;
  }
  if (visibleCorners === 0) return false;
  if (visibleCorners !== 8) return true;
  return maxScreenX >= p.PGLBX - margin
    && minScreenX <= p.PGUBX + margin
    && maxScreenY >= p.PGLBY - margin
    && minScreenY <= p.PGUBY + margin;
}

const TREE_POLYGON_STATE_NAMES = Object.freeze([
  "PGtexf", "PGtexoff", "SPsrc", "SPflar", "SPtinta", "SPcull",
  "SPhalf", "SPescr", "SPmapfast", "SPpixfast", "SPtrifast", "SPterrain",
  "DBcol", "DBflar", "DBent",
]);
const TREE_MUSHROOM_STATE_NAMES = Object.freeze([
  "VHGNDmushx", "VHGNDmushy", "VHGNDmushz", "VHGNDmushmask1",
  "VHGNDmushmask2", "VHGNDmushscale", "VHGNDmushbase",
  "VHGNDmushcolmask", "VHGNDmushfloat", "VHGNDmushxf", "VHGNDmushyf",
  "VHGNDmushzf",
]);
const TREE_MODEL_KEY_NAMES = Object.freeze([
  "VHGNDoox", "VHGNDooy", "VHGNDooz", "VHGNDdepth", "SUfseed",
  "VHGNDseed", "GRiptype", "VHGNDsctype", "GRtreescale",
  "GRtreespread", "GRbranchwidth", "GRtreepeak", "GRrootshade",
  "GRmushscale", "GRtreeflares", "GRleafflares", "GRtreescalef",
  "GRtreespreadf", "GRbranchwidthf", "GRtreepeakf", "VHGNDtreewindx",
  "VHGNDtreewindz", "VHGNDtscale",
]);
const TREE_FINAL_STATE_NAMES = Object.freeze([
  ...TREE_POLYGON_STATE_NAMES,
  "SUfseed", "SUfeax", "SUfval", "SUfmask", "VHGNDmushfloat",
]);

function landedTreeRenderAddresses(linked) {
  let cached = landedTreeRenderAddressCaches.get(linked);
  if (cached) return cached;
  const p = polymapAddresses(linked);
  cached = {
    p,
    polygonState: TREE_POLYGON_STATE_NAMES.map((name) => address(linked, name)),
    mushroomState: TREE_MUSHROOM_STATE_NAMES.map((name) => address(linked, name)),
    modelKey: TREE_MODEL_KEY_NAMES.map((name) => address(linked, name)),
    finalState: TREE_FINAL_STATE_NAMES.map((name) => address(linked, name)),
    tree: codeHandle(linked, "VHGND tree"),
    greenmush: codeHandle(linked, "VHGND greenmush"),
    GCret: address(linked, "GCret"),
    GCx: address(linked, "GCx"),
    GCy: address(linked, "GCy"),
    mushouter: address(linked, "VHGNDmushouter"),
    mushinner: address(linked, "VHGNDmushinner"),
  };
  landedTreeRenderAddressCaches.set(linked, cached);
  return cached;
}

function captureAddressValues(memory, addresses) {
  const result = new Int32Array(addresses.length);
  for (let index = 0; index < addresses.length; index += 1) {
    result[index] = memory[addresses[index]];
  }
  return result;
}

function restoreAddressValues(memory, addresses, values) {
  for (let index = 0; index < addresses.length; index += 1) {
    memory[addresses[index]] = values[index];
  }
}

function mergeTreeCommandBounds(commands) {
  const bounds = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  for (const command of commands) {
    for (let axis = 0; axis < 3; axis += 1) {
      if (command.bounds[axis] < bounds[axis]) bounds[axis] = command.bounds[axis];
      if (command.bounds[axis + 3] > bounds[axis + 3]) bounds[axis + 3] = command.bounds[axis + 3];
    }
  }
  return bounds;
}

function indexTreeModelVertices(commands) {
  const unique = new Map();
  const vertices = [];
  for (const command of commands) {
    if (command.kind === "greenmush") continue;
    const indices = new Int32Array(command.vertices);
    const view = new DataView(command.coordinates.buffer,
      command.coordinates.byteOffset, command.coordinates.byteLength);
    for (let vertex = 0; vertex < command.vertices; vertex += 1) {
      const words = [];
      for (let axis = 0; axis < 3; axis += 1) {
        const offset = (axis * command.vertices + vertex) * 2;
        words.push(command.coordinates[offset] | 0, command.coordinates[offset + 1] | 0);
      }
      const key = words.join(":");
      let index = unique.get(key);
      if (index === undefined) {
        index = vertices.length / 3;
        unique.set(key, index);
        for (let axis = 0; axis < 3; axis += 1) {
          vertices.push(view.getFloat64((axis * command.vertices + vertex) * 8, true));
        }
      }
      indices[vertex] = index;
    }
    command.vertexIndices = indices;
  }
  return {
    vertices: Float64Array.from(vertices),
    projectionSignature: [],
    projection: null,
  };
}

function projectTreeModelVertices(machine, tree, model) {
  const memory = machine.memory;
  const p = tree.p;
  const control = floatingPoint(machine).control;
  const signature = [
    directPolySlot(memory, p, p.FSCAMX), directPolySlot(memory, p, p.FSCAMY),
    directPolySlot(memory, p, p.FSCAMZ), directPolySlot(memory, p, p.FSTSB),
    directPolySlot(memory, p, p.FSTCB), directPolySlot(memory, p, p.FSTSA),
    directPolySlot(memory, p, p.FSTCA), directPolySlot(memory, p, p.FSUNEG),
    directPolySlot(memory, p, p.FSDPP), directPolySlot(memory, p, p.FSXC),
    directPolySlot(memory, p, p.FSYC), control,
  ];
  let changed = signature.length !== model.projectionSignature.length;
  for (let index = 0; !changed && index < signature.length; index += 1) {
    if (!Object.is(signature[index], model.projectionSignature[index])) changed = true;
  }
  if (!changed && model.projection) return model.projection;

  const count = model.vertices.length / 3;
  const projection = {
    rx: new Float64Array(count), ry: new Float64Array(count),
    rz: new Float64Array(count), px: new Int32Array(count),
    py: new Int32Array(count), visible: new Uint8Array(count),
  };
  const cameraX = signature[0];
  const cameraY = signature[1];
  const cameraZ = signature[2];
  const betaSin = signature[3];
  const betaCos = signature[4];
  const alphaSin = signature[5];
  const alphaCos = signature[6];
  const near = signature[7];
  const distance = signature[8];
  const centerX = signature[9];
  const centerY = signature[10];
  for (let index = 0; index < count; index += 1) {
    const source = index * 3;
    const z = roundFloat32(model.vertices[source + 2] - cameraZ, control);
    const x = roundFloat32(model.vertices[source] - cameraX, control);
    const y = roundFloat32(model.vertices[source + 1] - cameraY, control);
    const rx = roundFloat32(x * betaCos + z * betaSin, control);
    const z2 = roundFloat32(z * betaCos - x * betaSin, control);
    const rotatedZWide = y * alphaSin + z2 * alphaCos;
    const rz = roundFloat32(rotatedZWide, control);
    const ry = roundFloat32(y * alphaCos - z2 * alphaSin, control);
    projection.rx[index] = rx;
    projection.ry[index] = ry;
    projection.rz[index] = rz;
    const visible = !Number.isNaN(rotatedZWide) && !Number.isNaN(near)
      && rotatedZWide >= near;
    projection.visible[index] = visible ? 1 : 0;
    if (visible) {
      const factor = distance / rz;
      projection.px[index] = convertToInt32(factor * rx + centerX, control);
      projection.py[index] = convertToInt32(factor * ry + centerY, control);
    }
  }
  model.projectionSignature = signature;
  model.projection = projection;
  return projection;
}

function captureTreePolygon(machine, linked, faced, forcedVertices = 0) {
  const memory = machine.memory;
  const tree = landedTreeRenderAddresses(linked);
  const p = tree.p;
  const vertices = forcedVertices || (memory[p.PJnrv] | 0);
  const coordinates = new Int32Array(vertices * 6);
  let output = 0;
  for (const slot of [p.FSINX, p.FSINY, p.FSINZ]) {
    for (let vertex = 0; vertex < vertices; vertex += 1) {
      const source = p.fw + (slot + vertex) * 2;
      coordinates[output++] = memory[source];
      coordinates[output++] = memory[source + 1];
    }
  }
  const basis = new Int32Array(4);
  for (let index = 0; index < 2; index += 1) {
    const x = p.fw + p.FSTX * 2 + index;
    const y = p.fw + p.FSTY * 2 + index;
    basis[index] = memory[x];
    basis[index + 2] = memory[y];
  }
  const bounds = [Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity];
  const coordinateView = new DataView(coordinates.buffer);
  for (let axis = 0; axis < 3; axis += 1) {
    for (let vertex = 0; vertex < vertices; vertex += 1) {
      const number = coordinateView.getFloat64((axis * vertices + vertex) * 8, true);
      if (number < bounds[axis]) bounds[axis] = number;
      if (number > bounds[axis + 3]) bounds[axis + 3] = number;
    }
  }
  return {
    kind: faced ? "faced-polygon" : "polygon",
    vertices,
    coordinates,
    basis,
    bounds,
    state: captureAddressValues(memory, tree.polygonState),
  };
}

function restoreTreePolygon(machine, linked, command, projection = null) {
  const memory = machine.memory;
  const tree = landedTreeRenderAddresses(linked);
  const p = tree.p;
  restoreAddressValues(memory, tree.polygonState, command.state);
  let input = 0;
  for (const slot of [p.FSINX, p.FSINY, p.FSINZ]) {
    for (let vertex = 0; vertex < command.vertices; vertex += 1) {
      const destination = p.fw + (slot + vertex) * 2;
      memory[destination] = command.coordinates[input++];
      memory[destination + 1] = command.coordinates[input++];
    }
  }
  memory[p.fw + p.FSTX * 2] = command.basis[0];
  memory[p.fw + p.FSTX * 2 + 1] = command.basis[1];
  memory[p.fw + p.FSTY * 2] = command.basis[2];
  memory[p.fw + p.FSTY * 2 + 1] = command.basis[3];
  memory[p.PJnrv] = command.vertices;
  if (command.kind === "faced-polygon") {
    mappedFacing(machine, linked);
    if ((memory[address(linked, "FCret")] | 0) === 0) return;
  }
  if (projection && command.vertexIndices) {
    let allVisible = true;
    for (const index of command.vertexIndices) {
      if (projection.visible[index] === 0) { allVisible = false; break; }
    }
    if (allVisible) {
      let minX = 311;
      let maxX = 5;
      let minY = 190;
      let maxY = 10;
      for (let vertex = 0; vertex < command.vertices; vertex += 1) {
        const index = command.vertexIndices[vertex];
        writeFloat64(memory, p.fw + (p.FSRXF + vertex) * 2, projection.rx[index]);
        writeFloat64(memory, p.fw + (p.FSRYF + vertex) * 2, projection.ry[index]);
        writeFloat64(memory, p.fw + (p.FSRZF + vertex) * 2, projection.rz[index]);
        memory[p.rwf + vertex] = 1;
        const x = projection.px[index] | 0;
        const y = projection.py[index] | 0;
        memory[p.mp + vertex * 2] = x;
        memory[p.mp + vertex * 2 + 1] = y;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
      if (command.vertices === 3) {
        copyQword(memory, p.fw + (p.FSRXF + 2) * 2, p.fw + (p.FSRXF + 3) * 2);
        copyQword(memory, p.fw + (p.FSRYF + 2) * 2, p.fw + (p.FSRYF + 3) * 2);
        copyQword(memory, p.fw + (p.FSRZF + 2) * 2, p.fw + (p.FSRZF + 3) * 2);
        memory[p.rwf + 3] = 1;
        memory[p.mp + 6] = memory[p.mp + 4];
        memory[p.mp + 7] = memory[p.mp + 5];
      }
      memory[p.PJdoflag] = 4;
      memory[p.PJminx] = minX;
      memory[p.PJmaxx] = maxX;
      memory[p.BXminy] = minY;
      memory[p.BXmaxy] = maxY;
      memory[p.PJpreproject] = 1;
      polymap(machine, linked, true);
      return;
    }
  }
  polymap(machine, linked);
}

function projectGreenmushPoint(machine, linked, tree) {
  const memory = machine.memory;
  const p = tree.p;
  memory[p.PJnrv] = 1;
  memory[p.PJmode] = 1;
  polyRotateDirect(machine, linked, p);
  memory[tree.GCret] = 0;
  if ((memory[p.rwf] | 0) === 0) return false;
  const control = floatingPoint(machine).control;
  let factor = readFloat64(memory, p.fw + p.FSDPP * 2)
    / readFloat64(memory, p.fw + p.FSRZF * 2);
  writeFloat64(memory, p.fw + p.FSW3 * 2, factor);
  let projected = factor * readFloat64(memory, p.fw + p.FSRXF * 2);
  writeScalarScratch(machine, linked, projected);
  projected += readFloat64(memory, p.fw + p.FSXC * 2);
  writeScalarScratch(machine, linked, projected);
  const x = convertToInt32(projected, control);
  memory[tree.GCx] = x;
  factor = readFloat64(memory, p.fw + p.FSW3 * 2);
  projected = factor * readFloat64(memory, p.fw + p.FSRYF * 2);
  writeScalarScratch(machine, linked, projected);
  projected += readFloat64(memory, p.fw + p.FSYC * 2);
  writeScalarScratch(machine, linked, projected);
  const y = convertToInt32(projected, control);
  memory[tree.GCy] = y;
  if (x <= p.PGLBX || x >= p.PGUBX || y <= p.PGLBY || y >= p.PGUBY) return false;
  memory[tree.GCret] = 1;
  return true;
}

function renderGreenmushDirect(machine, linked, tree) {
  const memory = machine.memory;
  const get = (name) => value(memory, linked, name);
  const set = (name, next) => { memory[address(linked, name)] = next; };
  const scale = get("VHGNDmushscale");
  const halfScale = scale >> 1;
  set("VHGNDtmp", halfScale);
  const floating = get("VHGNDmushfloat") !== 0;
  if (floating) landedMushroomSetup(machine, linked);
  else {
    set("VHGNDmushx", (get("VHGNDmushx") + halfScale) | 0);
    set("VHGNDmushy", (get("VHGNDmushy") + halfScale) | 0);
    set("VHGNDmushz", (get("VHGNDmushz") + halfScale) | 0);
  }
  const seed = ((get("VHGNDmushx") >> 14) + (get("VHGNDmushy") >> 14)
    + (get("VHGNDmushz") >> 14)) | 3;
  set("SUfseed", seed);
  let outer = landedFastRandom(machine, linked, get("VHGNDmushmask1")) + 1;
  memory[tree.mushouter] = outer;
  while (outer > 0) {
    if (floating) landedMushroomPoint(machine, linked);
    else {
      const z = (get("VHGNDmushz") - landedFastRandom(machine, linked, scale)) | 0;
      const y = (get("VHGNDmushy") - landedFastRandom(machine, linked, scale)) | 0;
      const x = (get("VHGNDmushx") - landedFastRandom(machine, linked, scale)) | 0;
      set("VHGNDmushpz", z); set("VHGNDmushpy", y); set("VHGNDmushpx", x);
      writeFloat64(memory, tree.p.fw + tree.p.FSINX * 2, Math.fround(x));
      writeFloat64(memory, tree.p.fw + tree.p.FSINY * 2, Math.fround(y));
      writeFloat64(memory, tree.p.fw + tree.p.FSINZ * 2, Math.fround(z));
    }
    if (projectGreenmushPoint(machine, linked, tree)) {
      const inner = landedFastRandom(machine, linked, get("VHGNDmushmask2")) + 1;
      memory[tree.mushinner] = inner;
      landedMushroomPixels(machine, linked);
    }
    outer -= 1;
    memory[tree.mushouter] = outer;
  }
  machine.X = LINO_DONE;
}

function terrainGreenmush(machine, linked) {
  const tree = landedTreeRenderAddresses(linked);
  const recording = machine.noctisTreeRecording;
  if (recording) {
    const state = captureAddressValues(machine.memory, tree.mushroomState);
    const floating = state[8] !== 0;
    const x = floating ? float32FromBits(state[9]) : state[0];
    const y = floating ? float32FromBits(state[10]) : state[1];
    const z = floating ? float32FromBits(state[11]) : state[2];
    const radius = Math.max(1, state[5] >>> 0);
    recording.commands.push({
      kind: "greenmush",
      state,
      bounds: [x - radius, y - radius, z - radius,
        x + radius, y + radius, z + radius],
    });
  }
  renderGreenmushDirect(machine, linked, tree);
}

function terrainTree(machine, linked) {
  const tree = landedTreeRenderAddresses(linked);
  if (typeof machine.callCode !== "function" || tree.tree < 1 || tree.greenmush < 1) {
    throw new Error("Source terrain tree path requires nested Lino dispatch");
  }
  machine.noctisTreeModels ??= new Map();
  const key = tree.modelKey.map((source) => machine.memory[source] | 0).join(":");
  const model = machine.noctisTreeModels.get(key);
  if (model) {
    if (rockBoundsMayRender(machine, tree.p, model.bounds, 10)) {
      const projection = machine.noctisDisableTreeProjectionCache
        ? null : projectTreeModelVertices(machine, tree, model);
      for (const command of model.commands) {
        if (command.kind === "greenmush") {
          restoreAddressValues(machine.memory, tree.mushroomState, command.state);
          renderGreenmushDirect(machine, linked, tree);
        } else restoreTreePolygon(machine, linked, command, projection);
      }
    }
    restoreAddressValues(machine.memory, tree.finalState, model.finalState);
    machine.X = LINO_DONE;
    return;
  }
  const recording = { commands: [], skipNextPolymap: false };
  machine.noctisTreeRecording = recording;
  try {
    machine.callCode(tree.tree);
  } finally {
    machine.noctisTreeRecording = null;
  }
  machine.noctisTreeModels.set(key, {
    commands: recording.commands,
    bounds: mergeTreeCommandBounds(recording.commands),
    finalState: captureAddressValues(machine.memory, tree.finalState),
    ...indexTreeModelVertices(recording.commands),
  });
  machine.X = LINO_DONE;
}

function terrainRock(machine, linked) {
  if (machine.noctisDisableTerrainRock) {
    const source = codeHandle(linked, "VHGND rock");
    if (typeof machine.callCode !== "function" || source < 1) {
      throw new Error("Source terrain rock path requires nested Lino dispatch");
    }
    machine.callCode(source);
    machine.X = LINO_DONE;
    return;
  }
  const memory = machine.memory;
  const p = landedRockAddresses(linked);
  const truncDiv = (left, right) => Math.trunc((left | 0) / (right | 0)) | 0;
  const random = (mask) => {
    memory[p.SUfmask] = mask;
    return landedFastRandom(machine, linked, mask) | 0;
  };
  const scaledRandom = (scale) => truncDiv(Math.imul(random(32767), scale), 32767);
  const rockTile = memory[p.VHGNDh1] | 0;
  const viewX = memory[p.VHGNDviewx] | 0;
  const viewZ = memory[p.VHGNDviewz] | 0;
  const depth = memory[p.VHGNDdepth] | 0;
  let objectX = memory[p.VHGNDoox] | 0;
  let objectY = memory[p.VHGNDooy] | 0;
  let objectZ = memory[p.VHGNDooz] | 0;
  machine.noctisRockModels ??= new Map();
  const modelKey = `${memory[p.VHGNDseed] | 0}:${memory[p.GRiptype] | 0}`
    + `:${memory[p.VHGNDsctype] | 0}:${rockTile}:${depth}:${objectX}:${objectY}:${objectZ}`
    + `:${memory[p.VHGNDrockdensity] | 0}:${memory[p.VHGNDrockscale] | 0}`
    + `:${memory[p.VHGNDrockpeak] | 0}:${memory[p.VHGNDquartz] | 0}`;
  const cachedModel = machine.noctisRockModels.get(modelKey);
  if (cachedModel) {
    memory[p.SPcull] = 0;
    memory[p.DBflar] = depth <= 2 ? memory[p.VHGNDquartz] : 0;
    memory[p.DBent] = 0;
    if (depth <= 2) {
      memory[p.SPflar] = memory[p.VHGNDquartz];
      memory[p.SPhalf] = 0;
      memory[p.SPescr] = 0;
      memory[p.PGtexf] = 5;
      memory[p.SPsrc] = 1;
    }
    if (rockBoundsMayRender(machine, p, cachedModel.bounds)) {
      for (const command of cachedModel.commands) renderRockCommand(machine, linked, p, command);
    }
    memory[p.VHGNDoox] = cachedModel.objectX;
    memory[p.VHGNDooy] = cachedModel.objectY;
    memory[p.VHGNDooz] = cachedModel.objectZ;
    memory[p.VHGNDrockworkscale] = cachedModel.workScale;
    memory[p.VHGNDcdown] = 0;
    memory[p.SUfseed] = cachedModel.seed;
    memory[p.SUfeax] = cachedModel.eax;
    memory[p.SUfval] = cachedModel.randomValue;
    memory[p.SUfmask] = cachedModel.randomMask;
    memory[p.SPflar] = depth <= 2 ? 0 : memory[p.SPflar];
    memory[p.DBflar] = 0;
    memory[p.SPhalf] = 0;
    machine.X = LINO_DONE;
    return;
  }
  const commands = [];
  memory[p.VHGNDrocktile] = rockTile;
  memory[p.SUfseed] = ((Math.imul(memory[p.VHGNDz] | 0, 200) + (memory[p.VHGNDx] | 0)) | 3) | 0;
  let remaining = random(memory[p.VHGNDrockdensity] | 0);
  memory[p.VHGNDcdown] = remaining;
  if (remaining === 0) {
    machine.X = LINO_DONE;
    return;
  }
  const rockHeight = (x, z) => {
    memory[p.VHGNDrox] = x;
    memory[p.VHGNDroz] = z;
    const y = (landedEyeHeightAt(machine, linked, p, x, z) + 600) | 0;
    memory[p.VHGNDroy] = y;
    memory[p.VHGNDcamx] = viewX;
    memory[p.VHGNDcamz] = viewZ;
    memory[p.VHGNDh1] = rockTile;
    return y;
  };
  const drawFace = (vertices, color) => {
    commands.push([
      vertices[0][0], vertices[0][1], vertices[0][2],
      vertices[1][0], vertices[1][1], vertices[1][2],
      vertices[2][0], vertices[2][1], vertices[2][2], color, depth < 2 ? 1 : 0,
    ]);
    loadRockTriangle(machine, p, vertices, depth < 2);
    mappedFacing(machine, linked);
    if ((memory[p.FCret] | 0) === 0) return;
    memory[p.DBcol] = color;
    memory[p.SPtinta] = color;
    if (depth < 2) {
      memory[p.PJnrv] = 4;
      polymap(machine, linked);
    } else {
      memory[p.PJnrv] = 3;
      poly3d(machine, linked);
    }
  };

  memory[p.SPcull] = 0;
  memory[p.DBflar] = 0;
  memory[p.DBent] = 0;
  if (depth > 2) {
    const scale = memory[p.VHGNDrockscale] | 0;
    const peak = memory[p.VHGNDrockpeak] | 0;
    const x0 = objectX;
    const z0 = objectZ;
    const x1 = objectX;
    const z1 = objectZ;
    const x2 = (objectX + scale - scaledRandom(scale)) | 0;
    const z2 = (objectZ + scale - scaledRandom(scale)) | 0;
    const y0 = (objectY - 100 - scaledRandom(peak)) | 0;
    const y1 = (objectY - 100 - scaledRandom(peak)) | 0;
    const y2 = (objectY - 100 - scaledRandom(peak)) | 0;
    const color = random(71);
    memory[p.VHGNDrx0] = x0; memory[p.VHGNDrz0] = z0;
    memory[p.VHGNDrx1] = x1; memory[p.VHGNDrz1] = z1;
    memory[p.VHGNDrx2] = x2; memory[p.VHGNDrz2] = z2;
    memory[p.VHGNDry0] = y0; memory[p.VHGNDry1] = y1; memory[p.VHGNDry2] = y2;
    memory[p.DBcol] = color;
    commands.push([x0, y0, z0, x1, y1, z1, x2, y2, z2, color, 0]);
    loadRockTriangle(machine, p, [[x0, y0, z0], [x1, y1, z1], [x2, y2, z2]]);
    mappedFacing(machine, linked);
    if ((memory[p.FCret] | 0) !== 0) {
      memory[p.PJnrv] = 3;
      poly3d(machine, linked);
    }
    machine.noctisRockModels.set(modelKey, {
      commands, bounds: rockCommandBounds(commands), objectX, objectY, objectZ,
      workScale: memory[p.VHGNDrockworkscale] | 0,
      seed: memory[p.SUfseed] | 0, eax: memory[p.SUfeax] | 0,
      randomValue: memory[p.SUfval] | 0, randomMask: memory[p.SUfmask] | 0,
    });
    machine.X = LINO_DONE;
    return;
  }

  let workScale = Math.imul(memory[p.VHGNDrockscale] | 0, 5);
  memory[p.VHGNDrockworkscale] = workScale;
  memory[p.SPflar] = memory[p.VHGNDquartz];
  memory[p.DBflar] = memory[p.VHGNDquartz];
  memory[p.SPhalf] = 0;
  memory[p.SPescr] = 0;
  memory[p.PGtexf] = 5;
  memory[p.SPsrc] = 1;
  while (remaining > 0) {
    const x0 = (objectX - scaledRandom(workScale)) | 0;
    const z0 = (objectZ - scaledRandom(workScale)) | 0;
    const x1 = objectX;
    const z1 = (objectZ + scaledRandom(workScale)) | 0;
    const x2 = (objectX + scaledRandom(workScale)) | 0;
    const z2 = (objectZ - scaledRandom(workScale)) | 0;
    const baseColor = random(63);
    const color0 = (baseColor + random(7)) | 0;
    const color1 = (baseColor + random(15)) | 0;
    const color2 = (baseColor + random(31)) | 0;
    const top = (objectY - 100 - scaledRandom(memory[p.VHGNDrockpeak] | 0)) | 0;
    const y0 = rockHeight(x0, z0);
    const y1 = rockHeight(x1, z1);
    const y2 = rockHeight(x2, z2);
    memory[p.VHGNDrx0] = x0; memory[p.VHGNDrz0] = z0; memory[p.VHGNDry0] = y0;
    memory[p.VHGNDrx1] = x1; memory[p.VHGNDrz1] = z1; memory[p.VHGNDry1] = y1;
    memory[p.VHGNDrx2] = x2; memory[p.VHGNDrz2] = z2; memory[p.VHGNDry2] = y2;
    memory[p.VHGNDrcolor] = baseColor;
    memory[p.VHGNDrcol0] = color0; memory[p.VHGNDrcol1] = color1; memory[p.VHGNDrcol2] = color2;
    memory[p.VHGNDrtop] = top;
    drawFace([[x0, y0, z0], [x1, y1, z1], [objectX, top, objectZ]], color0);
    drawFace([[x1, y1, z1], [x2, y2, z2], [objectX, top, objectZ]], color1);
    drawFace([[x2, y2, z2], [x0, y0, z0], [objectX, top, objectZ]], color2);

    const move = () => truncDiv(Math.imul(Math.imul(random(32767), 1000), remaining), 32767);
    objectX = (objectX + move() - move()) | 0;
    objectZ = (objectZ + move() - move()) | 0;
    objectY = rockHeight(objectX, objectZ);
    memory[p.VHGNDoox] = objectX;
    memory[p.VHGNDooy] = objectY;
    memory[p.VHGNDooz] = objectZ;
    workScale = truncDiv(workScale, 2);
    memory[p.VHGNDrockworkscale] = workScale;
    remaining -= 1;
    memory[p.VHGNDcdown] = remaining;
  }
  memory[p.SPflar] = 0;
  memory[p.DBflar] = 0;
  memory[p.SPcull] = 0;
  memory[p.SPhalf] = 0;
  machine.noctisRockModels.set(modelKey, {
    commands, bounds: rockCommandBounds(commands), objectX, objectY, objectZ, workScale,
    seed: memory[p.SUfseed] | 0, eax: memory[p.SUfeax] | 0,
    randomValue: memory[p.SUfval] | 0, randomMask: memory[p.SUfmask] | 0,
  });
  machine.X = LINO_DONE;
}

function renderTerrainTileDetails(machine, linked, p, handles, x, z) {
  const memory = machine.memory;
  if ((memory[p.VHGNDmirror] | 0) !== 0 || (memory[p.VHGNDruinpass] | 0) !== 0
      || (memory[p.VHGNDlodstep] | 0) !== 1) return;

  if (((memory[p.VHGNDdropx] / 16384) | 0) === x
      && ((memory[p.VHGNDdropz] / 16384) | 0) === z) machine.callCode(handles.capsule);

  const depth = memory[p.VHGNDdepth] | 0;
  if (depth > 40 || (depth > 8 && (memory[p.VHGNDtilepolys] | 0) === 0)) return;

  terrainTileFauna(machine, linked);

  const objectChart = noctisBuffer(linked, "ROBJ");
  if ((memory[objectChart + z * 200 + x] & 3) !== 0) machine.callCode(handles.objects);
}

function terrainTraverseFaithful(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  const fullTile = codeHandle(linked, "VHGND tile");
  const detailHandles = {
    capsule: codeHandle(linked, "VHGND capsule"),
    animals: codeHandle(linked, "VHGND render animals"),
    birds: codeHandle(linked, "VHGND render birds"),
    objects: codeHandle(linked, "VHGND tile objects"),
  };
  if (typeof machine.callCode !== "function" || fullTile < 1
      || Object.values(detailHandles).some((handle) => handle < 1)) {
    throw new Error("Faithful terrain traversal requires nested Lino tile dispatch");
  }
  machine.X = LINO_DONE;
  const camtx = memory[p.VHGNDcamtx] | 0;
  const camtz = memory[p.VHGNDcamtz] | 0;
  const backspan = (memory[p.VHGlanded] | 0) !== 0 ? 1 : 4;
  const xlo65 = Math.max(camtx - 65, 0);
  const xhi65 = Math.min(camtx + 65, 198);
  const zlo65 = Math.max(camtz - 65, 0);
  const zhi65 = Math.min(camtz + 65, 198);
  memory[p.VHGNDlodstep] = 1;
  memory[p.VHGNDlodradius] = 65;
  memory[p.VHGNDbackspan] = backspan;
  memory[p.VHGNDmindepth] = -1;
  memory[p.VHGNDmaxdepth] = 64;
  let beta = memory[p.VHGNDbeta] | 0;
  if (beta < 0) beta += 360;
  beta %= 360;
  memory[p.VHGNDtmp] = beta;

  const tile = (x, z) => {
    memory[p.VHGNDx] = x;
    memory[p.VHGNDz] = z;
    memory[p.VHGNDnativecomplete] = 0;
    landedTileAdmissionAt(machine, linked, p, x, z, camtx, camtz);
    const completed = memory[p.VHGNDnativecomplete] | 0;
    if (completed === 0) machine.callCode(fullTile);
    else if (completed === 1) renderTerrainTileDetails(machine, linked, p, detailHandles, x, z);
  };

  if (beta < 45 || beta >= 315) {
    const zlo = Math.max(camtz - backspan, 0);
    const zhi = Math.min(camtz + 65, 198);
    memory[p.VHGNDxlo] = xlo65; memory[p.VHGNDxhi] = xhi65;
    memory[p.VHGNDzlo] = zlo; memory[p.VHGNDzhi] = zhi;
    for (let z = zhi; z >= zlo; z -= 1) {
      for (let x = xlo65; x < camtx; x += 1) tile(x, z);
      for (let x = xhi65; x >= camtx; x -= 1) tile(x, z);
    }
    memory[p.VHGNDz] = zlo - 1;
    return;
  }
  if (beta < 135) {
    const xlo = Math.max(camtx - 65, 0);
    const xhi = Math.min(camtx + backspan, 198);
    memory[p.VHGNDxlo] = xlo; memory[p.VHGNDxhi] = xhi;
    memory[p.VHGNDzlo] = zlo65; memory[p.VHGNDzhi] = zhi65;
    for (let x = xlo; x <= xhi; x += 1) {
      for (let z = zhi65; z > camtz; z -= 1) tile(x, z);
      for (let z = zlo65; z <= camtz; z += 1) tile(x, z);
    }
    memory[p.VHGNDx] = xhi + 1;
    return;
  }
  if (beta < 225) {
    const zlo = Math.max(camtz - 65, 0);
    const zhi = Math.min(camtz + backspan, 198);
    memory[p.VHGNDxlo] = xlo65; memory[p.VHGNDxhi] = xhi65;
    memory[p.VHGNDzlo] = zlo; memory[p.VHGNDzhi] = zhi;
    for (let z = zlo; z <= zhi; z += 1) {
      for (let x = xlo65; x < camtx; x += 1) tile(x, z);
      for (let x = xhi65; x >= camtx; x -= 1) tile(x, z);
    }
    memory[p.VHGNDz] = zhi + 1;
    return;
  }
  const xlo = Math.max(camtx - backspan, 0);
  const xhi = Math.min(camtx + 65, 198);
  memory[p.VHGNDxlo] = xlo; memory[p.VHGNDxhi] = xhi;
  memory[p.VHGNDzlo] = zlo65; memory[p.VHGNDzhi] = zhi65;
  for (let x = xhi; x >= xlo; x -= 1) {
    for (let z = zhi65; z > camtz; z -= 1) tile(x, z);
    for (let z = zlo65; z <= camtz; z += 1) tile(x, z);
  }
  memory[p.VHGNDx] = xlo - 1;
}

function terrainRenderRandom(machine, linked) {
  landedFastRandom(machine, linked, value(machine.memory, linked, "SUfmask"));
}

function surroundingBorder(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  const page = noctisBuffer(linked, "RADPT");
  const light = memory[p.VHGNDsurlight] | 0;
  if ((memory[p.VHGdrawhud] | 0) !== 0) {
    for (let row = 0; row < 4; row += 1) {
      const y = (memory[p.VHGhudcount] + 9 - row) | 0;
      memory.fill((54 + light + row * 3) | 0, page + y * 320 + 10, page + y * 320 + 310);
    }
  }
  for (let inset = 0; inset < 10; inset += 1) {
    const color = (64 + light - inset) | 0;
    memory.fill(color, page + (9 - inset) * 320, page + (10 - inset) * 320);
    memory.fill(color, page + (190 + inset) * 320, page + (191 + inset) * 320);
  }
  if ((memory[p.VHGseamless] | 0) === 0) {
    for (let y = 10; y < 190; y += 1) {
      const row = page + y * 320;
      for (let inset = 0; inset < 10; inset += 1) {
        const color = (64 + light - inset) | 0;
        memory[row + 9 - inset] = color;
        memory[row + 310 + inset] = color;
      }
    }
    memory[p.VHGNDframey] = 190;
  } else {
    for (let inset = 0; inset < 10; inset += 1) {
      const color = (64 + light - inset) | 0;
      const firstY = 9 - inset;
      const count = 200 - firstY * 2;
      for (let offset = 0; offset < count; offset += 1) {
        const row = page + (firstY + offset) * 320;
        memory[row + 9 - inset] = color;
        memory[row + 310 + inset] = color;
      }
      memory[p.VHGNDframey] = firstY + count;
      memory[p.VHGNDframecount] = 0;
    }
  }
  memory[p.VHGNDframei] = 10;
  memory[p.VHGNDframecol] = (55 + light) | 0;
  machine.X = LINO_DONE;
}

function invertTerrainHudPixel(memory, p, page, x, y) {
  const destination = page + y * 320 + x;
  memory[destination] = (191 - memory[destination]) & 0xff;
  memory[p.VHGNDframeoff] = x;
}

function surroundingHudString(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  const page = noctisBuffer(linked, "RADPT");
  const source = memory[p.VHGNDhudsource] >>> 0;
  let x = memory[p.VHGNDhudx] | 0;
  const y = memory[p.VHGNDhudy] | 0;
  let index = 0;
  for (; index < 80; index += 1) {
    const character = memory[source + index] | 0;
    memory[p.VHGNDhudi] = index;
    memory[p.VHGNDhudchar] = character;
    if (character === 0) break;
    const packed = TERRAIN_HUD_GLYPHS[character] ?? 0;
    memory[p.VHGNDhudpacked] = packed;
    for (let row = 0; row < 5; row += 1) {
      const mask = (packed >>> (row * 3)) & 7;
      memory[p.VHGNDhudrow] = row;
      memory[p.VHGNDcompassrow] = row;
      memory[p.VHGNDhudshift] = 0;
      memory[p.VHGNDcompassmask] = mask;
      if ((mask & 1) !== 0) invertTerrainHudPixel(memory, p, page, x, y + row);
      if ((mask & 2) !== 0) invertTerrainHudPixel(memory, p, page, x + 1, y + row);
      if ((mask & 4) !== 0) invertTerrainHudPixel(memory, p, page, x + 2, y + row);
    }
    memory[p.VHGNDhudrow] = 5;
    x += 4;
    memory[p.VHGNDhudx] = x;
  }
  memory[p.VHGNDhudi] = index;
  machine.X = LINO_DONE;
}

function surroundingCompass(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  if ((memory[p.VHGdrawhud] | 0) === 0 || (memory[p.VHGmode] | 0) === 0) {
    machine.X = LINO_DONE;
    return;
  }
  const page = noctisBuffer(linked, "RADPT");
  memory[p.VHGNDhudy] = 2;
  let beta = (memory[p.VHGbeta] | 0) % 360;
  if (beta < 0) beta += 360;
  let heading = 360 - beta;
  if (heading > 359) heading -= 360;
  const position = Math.trunc(heading / 9);
  memory[p.VHGNDcompasspos] = position;
  let remainder = Math.trunc((heading * 4) / 9);
  memory[p.VHGNDcompassrem] = remainder;
  let x = 200 - (remainder % 4);
  memory[p.VHGNDcompassx] = x;

  memory[p.VHGNDlampx] = 254;
  memory[p.VHGNDlampy] = 1;
  memory[p.VHGNDlampsize] = 5;
  memory[p.VHGNDframecol] = 64;
  for (let row = 0; row < 7; row += 1) memory.fill(64, page + (row + 1) * 320 + 254, page + (row + 1) * 320 + 259);
  memory[p.VHGNDlamprow] = 7;
  memory[page + 8 * 320 + 256] = 127;

  for (let character = 0; character < 28; character += 1) {
    const compassValue = position + character;
    let direction = 4;
    if (compassValue % 10 === 0) direction = Math.trunc(compassValue / 10) % 4;
    memory[p.VHGNDcompassi] = character;
    memory[p.VHGNDcompassdir] = direction;
    for (let row = 0; row < 5; row += 1) {
      let mask = 0;
      if (direction === 0) mask = row === 1 || row === 2 ? 7 : 5;
      else if (direction === 1) mask = row === 1 || row === 3 ? 1 : row === 2 ? 3 : 7;
      else if (direction === 2) mask = row === 1 ? 1 : row === 3 ? 4 : 7;
      else if (direction === 3) mask = row === 2 || row === 3 ? 7 : 5;
      else if (row === 4) mask = 2;
      memory[p.VHGNDcompassrow] = row;
      memory[p.VHGNDcompassmask] = mask;
      if ((mask & 1) !== 0) invertTerrainHudPixel(memory, p, page, x, 2 + row);
      if ((mask & 2) !== 0) invertTerrainHudPixel(memory, p, page, x + 1, 2 + row);
      if ((mask & 4) !== 0) invertTerrainHudPixel(memory, p, page, x + 2, 2 + row);
    }
    memory[p.VHGNDcompassrow] = 5;
    x += 4;
    memory[p.VHGNDcompassx] = x;
  }
  memory[p.VHGNDcompassi] = 28;
  machine.X = LINO_DONE;
}

function ekeyAddresses(linked) {
  let cached = ekeyAddressCaches.get(linked);
  if (cached) return cached;
  cached = {
    sessions: address(linked, "ekey session memory"),
    keyServers: address(linked, "key f1 server"),
    slots: address(linked, "ekey session slots"),
  };
  ekeyAddressCaches.set(linked, cached);
  return cached;
}

function searchEkeySession(machine, linked) {
  const memory = machine.memory;
  const p = ekeyAddresses(linked);
  const wanted = machine.D | 0;
  let offset = 0;
  let free = -1;
  let remaining = p.slots | 0;
  while (remaining > 0) {
    const id = memory[p.sessions + offset + 82] | 0;
    if (id === wanted) {
      machine.A = offset;
      machine.B = free;
      machine.C = remaining;
      machine.X = LINO_DONE;
      return;
    }
    if (id === 0) free = offset;
    offset += 83;
    remaining -= 1;
  }
  machine.B = free;
  machine.C = 0;
  if (free === -1) {
    machine.A = offset;
    machine.X = LINO_FAIL;
    return;
  }
  memory[p.sessions + free + 82] = wanted;
  machine.A = free;
  machine.X = LINO_DONE;
}

function backupEkeySession(machine, linked) {
  const memory = machine.memory;
  const p = ekeyAddresses(linked);
  const session = p.sessions + (machine.A | 0);
  let destination = session;
  let source = p.keyServers;
  if ((machine.D | 0) !== 0) {
    machine.D = session;
    destination = p.keyServers;
    source = session;
  }
  memory.copyWithin(destination, source, source + 82);
  machine.A = destination + 82;
  machine.B = source + 82;
  machine.C = 0;
  machine.X = LINO_DONE;
}

function surfaceBulkAddresses(linked) {
  let cached = surfaceBulkAddressCaches.get(linked);
  if (cached) return cached;
  const names = ["nw", "SUpbase", "SUsp", "SUsi", "SUsn", "SUval", "SUg", "SUnax", "SUncx", "SUnbl"];
  cached = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
  surfaceBulkAddressCaches.set(linked, cached);
  return cached;
}

function surfaceDword(memory, pointer) {
  return ((memory[pointer] & 0xff) | ((memory[pointer + 1] & 0xff) << 8)
    | ((memory[pointer + 2] & 0xff) << 16) | ((memory[pointer + 3] & 0xff) << 24)) | 0;
}

function surfaceSmooth(machine, linked, stride) {
  const memory = machine.memory;
  const p = surfaceBulkAddresses(linked);
  const base = (p.nw + (memory[p.SUpbase] >>> 0)) >>> 0;
  const start = stride;
  const count = stride === 360 ? 63360 : 63520;
  memory[p.SUsp] = base;
  let last = 0;
  for (let index = start, remaining = count; remaining > 0; index += 1, remaining -= 1) {
    let packed = surfaceDword(memory, base + index - stride);
    packed = (packed + surfaceDword(memory, base + index)) | 0;
    packed = (packed + surfaceDword(memory, base + index + stride)) | 0;
    packed = (packed + surfaceDword(memory, base + index + stride * 2)) | 0;
    packed = (packed & 0xfcfcfcfc) >>> 2;
    let output = packed & 0xff;
    output = (output + ((packed >>> 8) & 0xff)) & 0xff;
    packed >>>= 16;
    output = (output + (packed & 0xff)) & 0xff;
    output = (output + ((packed >>> 8) & 0xff)) & 0xff;
    output >>>= 2;
    memory[base + index] = output;
    last = output;
  }
  memory[p.SUsi] = start + count;
  machine.A = last;
  machine.B = 0;
  machine.X = LINO_DONE;
}

function surfaceSsmooth(machine, linked) {
  surfaceSmooth(machine, linked, 360);
}

function surfacePsmooth(machine, linked) {
  surfaceSmooth(machine, linked, 320);
}

function surfaceLssmooth(machine, linked) {
  const memory = machine.memory;
  const p = surfaceBulkAddresses(linked);
  const base = (p.nw + (memory[p.SUpbase] >>> 0)) >>> 0;
  memory[p.SUsp] = base;
  let last = 0;
  for (let index = 0; index < 64480; index += 1) {
    const first = (memory[base + index] & 0xff) | ((memory[base + index + 1] & 0xff) << 8);
    memory[p.SUsn] = first & 0xff;
    const upper = (memory[base + index + 360] & 0xff) | ((memory[base + index + 361] & 0xff) << 8);
    const low = first & 0x3f3f;
    const high = upper & 0x3f3f;
    let output = low & 0xff;
    output = (output + ((low >>> 8) & 0xff)) & 0xff;
    output = (output + (high & 0xff)) & 0xff;
    output = (output + ((high >>> 8) & 0xff)) & 0xff;
    output = (output >>> 2) | (first & 0xc0);
    memory[base + index] = output;
    last = output;
  }
  memory[p.SUsi] = 64480;
  machine.A = last;
  machine.B = 0;
  machine.X = LINO_DONE;
}

function surfaceClear(machine, linked) {
  const memory = machine.memory;
  const p = surfaceBulkAddresses(linked);
  const base = (p.nw + (memory[p.SUpbase] >>> 0)) >>> 0;
  const output = memory[p.SUval] & 0xff;
  memory.fill(output, base, base + 64800);
  machine.A = base + 64800;
  machine.B = 0;
  machine.C = output;
  machine.X = LINO_DONE;
}

function surfaceNegate(machine, linked) {
  const memory = machine.memory;
  const p = surfaceBulkAddresses(linked);
  const base = (p.nw + (memory[p.SUpbase] >>> 0)) >>> 0;
  let last = 0;
  for (let index = 0; index < 64800; index += 1) {
    last = (62 - (memory[base + index] & 0xff)) & 0xff;
    memory[base + index] = last;
  }
  machine.A = base + 64800;
  machine.B = 0;
  machine.C = last;
  machine.X = LINO_DONE;
}

function surfaceNoiseStep(memory, p, counter) {
  let folded = ((memory[p.SUnax] | 0) + counter) & 0xffff;
  const signed = (folded & 0x8000) !== 0 ? folded - 0x10000 : folded;
  const product = Math.imul(signed, signed);
  folded = ((product & 0xffff) + ((product >>> 16) & 0xffff)) & 0xffff;
  memory[p.SUnax] = folded;
  const output = folded & 0x3e;
  memory[p.SUnbl] = output;
  return output;
}

function surfaceRandomPattern(machine, linked) {
  const memory = machine.memory;
  const p = surfaceBulkAddresses(linked);
  const base = (p.nw + (memory[p.SUpbase] >>> 0)) >>> 0;
  memory[p.SUsp] = base;
  for (let index = 0, counter = 64800; counter > 0; index += 1, counter -= 1) {
    memory[base + index] = surfaceNoiseStep(memory, p, counter);
  }
  memory[p.SUsi] = 64800;
  memory[p.SUncx] = 0;
  machine.X = LINO_DONE;
}

function surfaceSda(machine, linked) {
  const memory = machine.memory;
  const p = surfaceBulkAddresses(linked);
  const base = (p.nw + (memory[p.SUpbase] >>> 0)) >>> 0;
  const threshold = memory[p.SUg] & 0xff;
  memory[p.SUsp] = base;
  for (let index = 0, counter = 64000; counter > 0; index += 1, counter -= 1) {
    const current = memory[base + index] & 0xff;
    if (current < threshold) memory[base + index] = 16;
    else {
      const output = (current + surfaceNoiseStep(memory, p, counter)) & 0xff;
      memory[base + index] = output;
      if (output >= 62) {
        memory[base + index] = 62;
        memory[base + index + 1] = 0;
      }
    }
  }
  memory[p.SUsi] = 64000;
  memory[p.SUncx] = 0;
  machine.X = LINO_DONE;
}

function paletteTavola(machine, linked) {
  const memory = machine.memory;
  let p = paletteTavolaAddressCaches.get(linked);
  if (!p) {
    const names = [
      "PVsrc", "PVself", "PVfirst", "PVn", "PVfr", "PVfg", "PVfb", "PVrange",
      "PUn", "PLfirst", "PLn", "pal6", "curpal6", "pal",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    paletteTavolaAddressCaches.set(linked, p);
  }

  let range = memory[p.PVrange] | 0;
  const filterAddresses = [p.PVfr, p.PVfg, p.PVfb];
  const filters = new Int32Array(3);
  for (let component = 0; component < 3; component += 1) {
    const byte = memory[filterAddresses[component]] & 0xff;
    const signed = (byte & 0x80) !== 0 ? byte - 0x100 : byte;
    if (signed < 0 || signed > 127) range |= 1 << component;
    filters[component] = signed & 0xffff;
    memory[filterAddresses[component]] = filters[component];
  }
  memory[p.PVrange] = range;

  const first = memory[p.PVfirst] | 0;
  const count = memory[p.PVn] >>> 0;
  const firstComponent = Math.imul(first, 3);
  if ((memory[p.PVself] | 0) === 0) {
    let source = memory[p.PVsrc] | 0;
    for (let index = 0; index < count * 3; index += 1) {
      memory[p.pal6 + firstComponent + index] = memory[source + index] & 0xff;
    }
  }

  let filtered = 0;
  for (let colour = 0; colour < count; colour += 1) {
    const base = p.pal6 + firstComponent + colour * 3;
    for (let component = 0; component < 3; component += 1) {
      const product = Math.imul(memory[base + component] & 0xff, filters[component]);
      filtered = ((product & 0xffff) / 63) | 0;
      if ((filtered >>> 0) >= 64) filtered = 63;
      memory[base + component] = filtered;
    }
  }

  const uploadedColours = (first + count) | 0;
  memory[p.PUn] = uploadedColours;
  const uploadedComponents = Math.imul(uploadedColours, 3);
  for (let index = 0; index < uploadedComponents; index += 1) {
    memory[p.curpal6 + index] = memory[p.pal6 + index];
  }
  memory[p.PLfirst] = 0;
  memory[p.PLn] = uploadedColours;

  let packed = filtered;
  let blue = machine.A | 0;
  for (let colour = 0; colour < (uploadedColours >>> 0); colour += 1) {
    const component = p.curpal6 + colour * 3;
    packed = ((memory[component] & 63) * 4) << 16;
    packed = (packed + (((memory[component + 1] & 63) * 4) << 8)) | 0;
    blue = (memory[component + 2] & 63) * 4;
    packed = (packed + blue) | 0;
    memory[p.pal + colour] = packed;
  }

  machine.A = uploadedColours === 0 ? p.pal6 : blue;
  machine.B = 0;
  machine.C = uploadedColours === 0 ? filtered : packed;
  machine.D = p.curpal6 + uploadedComponents;
  if (uploadedColours !== 0) machine.E = p.pal + uploadedColours;
  machine.X = LINO_DONE;
}

function paletteShade(machine, linked) {
  const memory = machine.memory;
  let p = paletteShadeAddressCaches.get(linked);
  if (!p) {
    const names = [
      "FBSHfirst", "FBSHn", "SHsr", "SHsg", "SHsb", "SHer", "SHeg", "SHeb",
      "SHk", "SHdstb", "SHdst", "SHcurp", "SHdelp", "SHb", "SHz32", "SH6432",
      "PFbits", "PFsa0", "PFnum", "PFden", "shcur", "shdel", "FA0", "FB0", "FS0",
      "FI", "FSW", "FFLG", "FCWCSAV", "FCWCHOP",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    paletteShadeAddressCaches.set(linked, p);
  }
  const fpu = floatingPoint(machine);
  const control = fpu.control;
  const count = memory[p.FBSHn] >>> 0;
  const starts = [memory[p.SHsr] | 0, memory[p.SHsg] | 0, memory[p.SHsb] | 0];
  const finishes = [memory[p.SHer] | 0, memory[p.SHeg] | 0, memory[p.SHeb] | 0];

  memory[p.PFnum] = 1;
  memory[p.PFden] = count | 0;
  const k = roundFloat32(1 / count, control);
  const kBits = float32Bits(k);
  memory[p.SHk] = kBits;
  memory[p.PFbits] = kBits;
  memory[p.FS0] = kBits;
  writeFloat64(memory, p.FA0, 1 / count);
  writeFloat64(memory, p.FB0, count | 0);
  memory[p.FI] = 1;

  for (let component = 0; component < 3; component += 1) {
    const start = float32FromBits(starts[component]);
    const finish = float32FromBits(finishes[component]);
    const difference = finish - start;
    const delta = roundFloat32(difference * k, control);
    const deltaBits = float32Bits(delta);
    memory[p.shcur + component] = starts[component];
    memory[p.shdel + component] = deltaBits;
    memory[p.PFbits] = deltaBits;
    memory[p.FS0] = deltaBits;
    writeFloat64(memory, p.PFsa0, difference);
    writeFloat64(memory, p.FA0, delta);
    writeFloat64(memory, p.FB0, k);
  }

  let destination = (memory[p.SHdstb] + Math.imul(memory[p.FBSHfirst] | 0, 3)) | 0;
  memory[p.SHdst] = destination;
  machine.A = destination;
  machine.B = count | 0;
  if (count === 0) {
    machine.X = LINO_DONE;
    return;
  }

  const compare = (current, bound, boundBits) => {
    memory[p.PFbits] = boundBits;
    memory[p.FS0] = boundBits;
    writeFloat64(memory, p.PFsa0, current);
    writeFloat64(memory, p.FA0, current);
    writeFloat64(memory, p.FB0, bound);
    const status = Number.isNaN(current) || Number.isNaN(bound) ? 0x4500
      : current < bound ? 0x0100
        : current === bound ? 0x4000
          : 0;
    memory[p.FSW] = status;
    fpu.status = status;
    if ((status & 0x0400) !== 0) {
      memory[p.FFLG] |= 1;
      memory[p.FI] = 2;
    } else if ((status & 0x4000) !== 0) memory[p.FI] = 0;
    else if ((status & 0x0100) !== 0) memory[p.FI] = -1;
    else memory[p.FI] = 1;
    return memory[p.FI] | 0;
  };

  for (let colour = 0; colour < count; colour += 1) {
    for (let component = 0; component < 3; component += 1) {
      const currentBits = memory[p.shcur + component] | 0;
      const current = float32FromBits(currentBits);
      const deltaBits = memory[p.shdel + component] | 0;
      const delta = float32FromBits(deltaBits);
      memory[p.SHcurp] = p.shcur + component;
      memory[p.SHdelp] = p.shdel + component;

      let output;
      if (compare(current, 0, memory[p.SHz32] | 0) < 0) output = 0;
      else if (compare(current, 64, memory[p.SH6432] | 0) < 0) {
        output = Math.trunc(current) | 0;
        memory[p.FCWCSAV] = fpu.control & 0xffff;
        memory[p.FCWCHOP] = (memory[p.FCWCSAV] & 0x0f3ff) | 0x0c00;
        memory[p.FI] = output;
        fpu.control = memory[p.FCWCSAV] & 0xffff;
      } else output = 63;
      memory[p.SHb] = output;
      memory[destination] = output & 0xff;

      memory[p.PFbits] = deltaBits;
      memory[p.FS0] = deltaBits;
      writeFloat64(memory, p.PFsa0, current);
      writeFloat64(memory, p.FA0, current);
      writeFloat64(memory, p.FB0, delta);
      const next = roundFloat32(current + delta, fpu.control);
      const nextBits = float32Bits(next);
      memory[p.FS0] = nextBits;
      writeFloat64(memory, p.FA0, next);
      memory[p.shcur + component] = nextBits;
      destination += 1;
      memory[p.SHdst] = destination;
      machine.C = nextBits;
    }
  }
  machine.A = destination;
  machine.B = 0;
  machine.X = LINO_DONE;
}

function spaceFade(machine, linked) {
  const memory = machine.memory;
  let p = spaceFadeAddressCaches.get(linked);
  if (!p) {
    p = {
      nw: address(linked, "nw"), radpt: address(linked, "RADPT"),
      base: address(linked, "VHSfadebase"), index: address(linked, "VHSfadei"),
    };
    spaceFadeAddressCaches.set(linked, p);
  }
  const relative = p.radpt + 2876;
  const base = p.nw + relative;
  memory[p.base] = relative;
  // pfade is paired with one complete additive render pass. Applying extra
  // wall-clock decay steps without replaying those draws changes the source
  // image, punching holes into stars and white smear effects on slower hosts.
  // Keep the original one eight-level fade per rendered frame.
  const decrement = 8;
  let output = 0;
  for (let index = 0; index < 57920; index += 1) {
    output = memory[base + index] & 63;
    output = output >= decrement ? output - decrement : 0;
    memory[base + index] = output;
  }
  memory[p.index] = 57920;
  machine.A = base + 57919;
  machine.C = output;
  machine.X = LINO_DONE;
}

function flareSourceStick(machine, linked) {
  const memory = machine.memory;
  let p = flareSourceStickAddressCaches.get(linked);
  if (!p) {
    const names = [
      "nw", "RADPT", "VHFx0", "VHFx1", "VHFy0", "VHFy1", "VHFlinep",
      "VHFlinepf", "VHFlinea", "VHFlineb", "VHFlineL", "VHFlinegx",
      "VHFlinegy", "VHFlineend", "VHFlineax", "VHFlineay",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    flareSourceStickAddressCaches.set(linked, p);
  }

  const page = p.nw + p.RADPT;
  let x0 = memory[p.VHFx0] | 0;
  let x1 = memory[p.VHFx1] | 0;
  let y0 = memory[p.VHFy0] | 0;
  let y1 = memory[p.VHFy1] | 0;
  let pointer = 0;
  let output = 0;

  if (x0 === x1) {
    const first = y0 <= y1 ? y0 : y1;
    const final = (y0 <= y1 ? y1 : y0) + 1;
    pointer = page + Math.imul(first, 320) + x0;
    const pointerFinal = page + Math.imul(final, 320) + x0;
    memory[p.VHFlinep] = pointer;
    memory[p.VHFlinepf] = pointerFinal;
    while (pointer < pointerFinal) {
      const old = memory[pointer] & 0xff;
      const bright = Math.min((old & 63) + 8, 62);
      output = (old & 192) | bright;
      memory[pointer] = output;
      pointer += 320;
    }
    memory[p.VHFlinep] = pointer;
    machine.A = pointer;
    machine.C = output;
    machine.D = pointer - 320;
    machine.X = LINO_DONE;
    return;
  }

  if (x1 < x0) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
    memory[p.VHFx0] = x0;
    memory[p.VHFx1] = x1;
    memory[p.VHFy0] = y0;
    memory[p.VHFy1] = y1;
  }
  const a = x1 - x0;
  const signedB = y1 - y0;
  const b = Math.abs(signedB);
  const length = Math.max(a, b) + 1;
  let gx = Math.imul(x0, 65536) | 0;
  let gy = Math.imul(y0, 65536) | 0;
  const end = Math.imul(x1, 65536) | 0;
  const ax = (Math.trunc((a * 65536) / length) * 2) | 0;
  let ay = (Math.trunc((b * 65536) / length) * 2) | 0;
  if (signedB < 0) ay = -ay;
  memory[p.VHFlinea] = a;
  memory[p.VHFlineb] = b;
  memory[p.VHFlineL] = length;
  memory[p.VHFlinegx] = gx;
  memory[p.VHFlinegy] = gy;
  memory[p.VHFlineend] = end;
  memory[p.VHFlineax] = ax;
  memory[p.VHFlineay] = ay;

  while (gx < end) {
    pointer = page + Math.imul(gy >>> 16, 320) + (gx >>> 16);
    const old = memory[pointer] & 0xff;
    output = (old & 63) <= 55 ? (old + 8) & 0xff : (old & 192) | 62;
    memory[pointer] = output;
    gx = (gx + ax) | 0;
    gy = (gy + ay) | 0;
  }
  memory[p.VHFlinegx] = gx;
  memory[p.VHFlinegy] = gy;
  machine.A = gx;
  machine.C = output;
  machine.D = pointer;
  machine.X = LINO_DONE;
}

function scaleSignedByteExact(byte, magnitudeBits) {
  const dy = byte < 128 ? byte : byte - 256;
  const bits = magnitudeBits >>> 0;
  const exponent = (bits >>> 23) & 255;
  let mantissa = bits & 0x7fffff;
  if (exponent === 0 && mantissa === 0) return 0;
  if (exponent === 255) return -32768;
  let shift;
  if (exponent === 0) shift = 149;
  else {
    mantissa += 0x800000;
    shift = 150 - exponent;
  }
  const negative = ((bits >>> 31) ^ (dy < 0 ? 1 : 0)) !== 0;
  const product = Math.abs(dy) * mantissa;
  let rounded = 0;
  if (shift === 0) rounded = product;
  else if (shift > 0 && shift < 32) {
    const divisor = 2 ** shift;
    rounded = Math.floor(product / divisor);
    const remainder = product - rounded * divisor;
    const half = divisor / 2;
    if (remainder > half || (remainder === half && (rounded & 1) !== 0)) rounded += 1;
  }
  if (negative) rounded = -rounded;
  return rounded > 32767 || rounded < -32768 ? -32768 : rounded;
}

function whiteRaster(machine, linked) {
  const memory = machine.memory;
  let p = whiteRasterAddressCaches.get(linked);
  if (!p) {
    const names = [
      "nw", "RADPT", "fw", "FA0", "FI", "PGFi", "PGFt", "PGFu", "GBt",
      "WHmag", "WHfgm", "WHshape", "WHsun", "WHok", "WHxsunl", "WHxsunh",
      "WHcxl", "WHcxh", "WHcyl", "WHcyh", "WHiy", "WHix", "WHptr",
      "WHpix", "WHtex", "WHn", "WHclamp", "WHwrap", "WHrows", "WHcols",
      "SFXX", "SFYY", "SFZZ", "FSPCB", "FSPSB", "FSTCB", "FSTSB",
      "FSTCA", "FSTSA", "FSPCA", "FSPSA", "SFRX", "SFZ2", "SFRZ", "SFRY",
      "SFT1", "SFT2", "SFMAG", "SFCX", "SFCY", "SFMG", "SFFGM", "SFSHE", "SFISE",
      "SFMSQ", "SFFSQ", "SFYA", "SFYB", "SFYP", "SFXA", "SFXB", "SFXP",
      "SFZW", "SFV0", "SFV1", "F32XC", "F32YC", "D12H", "D24H",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    whiteRasterAddressCaches.set(linked, p);
  }

  memory[p.WHok] = 0;
  memory[p.WHn] = 0;
  memory[p.WHclamp] = 0;
  memory[p.WHwrap] = 0;
  memory[p.WHrows] = 0;
  memory[p.WHcols] = 0;
  memory[p.WHxsunl] = 0;
  memory[p.WHxsunh] = 0;

  const slotAddress = (slot) => p.fw + slot * 2;
  const load = (slot) => readFloat64(memory, slotAddress(slot));
  const store = (slot, number) => writeFloat64(memory, slotAddress(slot), number);
  const compare = (left, right) => Number.isNaN(left) || Number.isNaN(right) ? 2
    : left < right ? -1 : left === right ? 0 : 1;
  const signExtendByte = (number) => (number << 24) >> 24;
  const control = floatingPoint(machine).control;

  const xx = load(p.SFXX);
  const yy = load(p.SFYY);
  const zz = load(p.SFZZ);
  const rx = xx * load(p.FSPCB) + zz * load(p.FSPSB);
  const z2 = zz * load(p.FSTCB) - xx * load(p.FSTSB);
  const rz = z2 * load(p.FSTCA) + yy * load(p.FSTSA);
  const ry = yy * load(p.FSPCA) - z2 * load(p.FSPSA);
  store(p.SFRX, rx);
  store(p.SFZ2, z2);
  store(p.SFRZ, rz);
  store(p.SFRY, ry);

  if (compare(rz, 0.001) < 0) {
    machine.X = LINO_DONE;
    return;
  }

  let magnitude = roundFloat32(float32FromBits(memory[p.WHmag]) / rz, control);
  if (compare(magnitude, 2.99) === 1) magnitude = float32FromBits(0x403f5c29);
  if (compare(magnitude, 0.01) < 0) magnitude = float32FromBits(0x3c23d70a);
  store(p.SFMAG, magnitude);

  const projectedX = rx / rz;
  const projectedY = ry / rz;
  store(p.SFRX, projectedX);
  store(p.SFRY, projectedY);
  const centerOffsetX = float32FromBits(p.F32XC);
  const centerOffsetY = float32FromBits(p.F32YC);
  if ((memory[p.WHsun] | 0) !== 0) {
    writeFloat64(memory, p.WHxsunl, projectedX + centerOffsetX);
  }
  if (compare(Math.abs(projectedX), 460) === 1
      || compare(Math.abs(projectedY), 400) === 1) {
    machine.X = LINO_DONE;
    return;
  }

  const centerX = projectedX + centerOffsetX + 0.5;
  const centerY = projectedY + centerOffsetY + 0.5;
  // The source widens both float32 centre constants through SFT1 and keeps
  // the binary64 0.5 addend in SFT2.  Those slots are shared, observable
  // Lino state even when the body is wholly outside the viewport.
  store(p.SFT1, centerOffsetX);
  store(p.SFT2, 0.5);
  store(p.SFCX, centerX);
  store(p.SFT1, centerOffsetY);
  store(p.SFCY, centerY);
  const mag = magnitude * 100 + 1.5;
  const fgm = float32FromBits(memory[p.WHfgm]) * mag;
  let shadeExtent = mag - fgm;
  if (compare(shadeExtent, 1) < 0) shadeExtent = 1;
  const intensityScale = 63 / shadeExtent;
  const magSquared = mag * mag;
  const fgmSquared = fgm * fgm;
  store(p.SFMG, mag);
  store(p.SFFGM, fgm);
  store(p.SFSHE, shadeExtent);
  store(p.SFISE, intensityScale);
  store(p.SFMSQ, magSquared);
  store(p.SFFSQ, fgmSquared);

  let ya = -(mag * 1.2);
  const yEnd = centerY + mag;
  let sampleY = centerY - mag;
  const shape = memory[p.WHshape] | 0;
  const step = shape === 1 ? 1 : 2;
  const yStep = shape === 1 ? 1.2 : 2.4;
  store(p.SFYA, ya);
  store(p.SFYB, yEnd);
  store(p.SFYP, sampleY);
  store(p.SFV0, step);
  store(p.SFV1, yStep);
  memory[p.PGFu] = shape === 1 ? p.D12H : p.D24H;

  const page = p.nw + p.RADPT;
  let rows = 0;
  let columns = 0;
  let stored = 0;
  let clamps = 0;
  let wraps = 0;
  let ix = memory[p.WHix] | 0;
  let iy = memory[p.WHiy] | 0;
  let pointer = memory[p.WHptr] | 0;
  let pixel = memory[p.WHpix] | 0;
  let texture = memory[p.WHtex] | 0;
  let rawSum = memory[p.GBt] | 0;
  let xa = -mag;
  let xEnd = centerX + mag;
  let sampleX = centerX - mag;
  let radial = 0;

  while (compare(sampleY, yEnd) < 0) {
    rows += 1;
    xa = -mag;
    xEnd = centerX + mag;
    sampleX = centerX - mag;
    while (compare(sampleX, xEnd) < 0) {
      columns += 1;
      iy = convertToInt32(sampleY, 0x0c00);
      memory[p.WHiy] = iy;
      if (iy >= 10 && iy <= 189) {
        ix = convertToInt32(sampleX, 0x0c00);
        memory[p.WHix] = ix;
      }
      if (iy >= 10 && iy <= 189 && ix >= 10 && ix <= 312) {
        radial = xa * xa + ya * ya;
        if (compare(radial, magSquared) < 0) {
          if (compare(radial, fgmSquared) === 1) {
            const intensity = 63 - (Math.sqrt(radial) - fgm) * intensityScale;
            pixel = signExtendByte(convertToInt32(intensity, 0x0c00) & 255);
          } else pixel = 63;
          memory[p.WHpix] = pixel;
          pointer = (Math.imul(iy, 320) + ix) & 0xffff;
          memory[p.WHptr] = pointer;
          texture = memory[page + pointer] | 0;
          memory[p.WHtex] = texture;
          rawSum = (pixel + texture) | 0;
          memory[p.GBt] = rawSum;
          const wrapped = signExtendByte(rawSum & 255);
          if (rawSum !== wrapped) wraps += 1;
          pixel = wrapped;
          memory[p.WHpix] = pixel;
          if (pixel > 63) {
            pixel = 63;
            memory[p.WHpix] = pixel;
            clamps += 1;
          }
          const output = pixel & 255;
          const destination = page + pointer;
          memory[destination] = output;
          stored += 1;
          if (shape !== 1) {
            memory[destination + 1] = output;
            memory[destination + 320] = output;
            memory[destination + 321] = output;
            stored += 3;
          }
          machine.C = output;
          machine.D = destination;
        }
      }
      xa += step;
      sampleX += step;
    }
    ya += yStep;
    sampleY += step;
  }

  store(p.SFYA, ya);
  store(p.SFYP, sampleY);
  store(p.SFXA, xa);
  store(p.SFXB, xEnd);
  store(p.SFXP, sampleX);
  store(p.SFZW, radial);
  memory[p.WHrows] = rows;
  memory[p.WHcols] = columns;
  memory[p.WHn] = stored;
  memory[p.WHclamp] = clamps;
  memory[p.WHwrap] = wraps;
  writeFloat64(memory, p.WHcxl, centerX);
  writeFloat64(memory, p.WHcyl, centerY);
  writeFloat64(memory, p.FA0, centerY);
  memory[p.PGFi] = p.SFCY;
  memory[p.WHok] = 1;
  machine.A = slotAddress(p.SFCY) | 0;
  machine.X = LINO_DONE;
}

function glowRaster(machine, linked) {
  const memory = machine.memory;
  let p = glowRasterAddressCaches.get(linked);
  if (!p) {
    const names = [
      "nw", "rgt", "sprg", "GLmag", "GLcx", "GLcy", "GLstart", "GLarc",
      "GLcol", "GLtabreg", "GLdstreg", "GLnb", "GLbl", "GLbh", "GLsi",
      "GLdx", "GLcxr", "GLy", "GLx", "GLdi", "GLax", "GLdec", "GLylo",
      "GLyhi", "GLrx0", "GLrx1", "GLlit", "GLdark", "GLoobmn", "GLoobmx",
      "GLoobn", "GLwrap", "CSdraw", "CSskip", "CSoob", "CScur", "GBt",
      "SPMk", "SPreg", "SPoff", "SPval", "SCdy", "SCmag", "SCout",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    glowRasterAddressCaches.set(linked, p);
  }

  const nw = p.nw;
  const magnitude = memory[p.GLmag] | 0;
  const scale = new Int32Array(256);
  for (let byte = 0; byte < 256; byte += 1) scale[byte] = scaleSignedByteExact(byte, magnitude);
  const cx = memory[p.GLcx] | 0;
  const cy = memory[p.GLcy] | 0;
  const arc = memory[p.GLarc] >>> 0;
  const colour = memory[p.GLcol] | 0;
  const bl = colour & 255;
  const bh = ((colour & 63) >>> 2) | (colour & 192);
  const tableRegister = memory[p.GLtabreg] | 0;
  const destinationRegister = memory[p.GLdstreg] | 0;
  const table = nw + (memory[p.rgt + Math.imul(tableRegister, 4) + 1] >>> 0);
  const destination = nw + (memory[p.rgt + Math.imul(destinationRegister, 4) + 1] >>> 0);
  let si = 0;
  let dx = memory[p.GLstart] | 0;
  let remaining = memory[p.GLnb] >>> 1;
  let draw = 0;
  let skip = 0;
  let decimated = 0;
  let yLow = 0;
  let yHigh = 0;
  let xLow = 0;
  let xHigh = 0;
  let lit = 0;
  let dark = 0;
  let oob = 0;
  let oobMin = 0;
  let oobMax = 0;
  let wraps = 0;
  let yByte = 0;
  let xByte = 0;
  let di = 0;
  let ax = 0;

  while (remaining > 0) {
    yByte = memory[table + ((si + 4) & 0xffff)] & 255;
    xByte = memory[table + ((si + 5) & 0xffff)] & 255;
    if (yByte === 100) {
      skip += 1;
      dx = (dx + xByte) | 0;
      while ((dx >>> 0) >= 360) {
        dx = (dx - 360) | 0;
        wraps += 1;
      }
    } else {
      draw += 1;
      if ((dx & 3) !== 0) decimated += 1;
      else {
        di = (scale[yByte] + cy) & 0xffff;
        if ((di >>> 0) < 10) yLow += 1;
        else if ((di >>> 0) >= 190) yHigh += 1;
        const rowOffset = (di + di) & 0xffff;
        let rowBase = 0;
        if (di < 200) rowBase = memory[p.sprg + di] | 0;
        else {
          oob += 1;
          if (oob === 1) oobMin = oobMax = rowOffset;
          else {
            if ((rowOffset >>> 0) < (oobMin >>> 0)) oobMin = rowOffset;
            if ((rowOffset >>> 0) > (oobMax >>> 0)) oobMax = rowOffset;
          }
        }
        ax = (scale[xByte] + cx) & 0xffff;
        if ((ax >>> 0) < 9) xLow += 1;
        else if ((ax >>> 0) >= 310) xHigh += 1;
        else {
          di = (rowBase + ax) & 0xffff;
          const output = (dx >>> 0) < arc ? bh : bl;
          memory[destination + ((di + 4) & 0xffff)] = output;
          if ((dx >>> 0) < arc) dark += 1;
          else lit += 1;
        }
      }
      dx += 1;
      if ((dx >>> 0) >= 360) dx = 0;
    }
    si += 2;
    remaining -= 1;
  }

  memory[p.GLbl] = bl;
  memory[p.GLbh] = bh;
  memory[p.GLsi] = si;
  memory[p.GLdx] = dx;
  memory[p.GLcxr] = remaining;
  memory[p.GLy] = yByte;
  memory[p.GLx] = xByte;
  memory[p.GLdi] = di;
  memory[p.GLax] = ax;
  memory[p.GLdec] = decimated;
  memory[p.GLylo] = yLow;
  memory[p.GLyhi] = yHigh;
  memory[p.GLrx0] = xLow;
  memory[p.GLrx1] = xHigh;
  memory[p.GLlit] = lit;
  memory[p.GLdark] = dark;
  memory[p.GLoobn] = oob;
  memory[p.GLoobmn] = oobMin;
  memory[p.GLoobmx] = oobMax;
  memory[p.GLwrap] = wraps;
  memory[p.CSdraw] = draw;
  memory[p.CSskip] = skip;
  memory[p.CSoob] = oob;
  memory[p.CScur] = dx;
  memory[p.GBt] = (di + di) & 0xffff;
  memory[p.SPMk] = oob;
  memory[p.SPreg] = destinationRegister;
  memory[p.SPoff] = (di + 4) & 0xffff;
  memory[p.SPval] = (dx >>> 0) < arc ? bh : bl;
  memory[p.SCdy] = xByte < 128 ? xByte : xByte - 256;
  memory[p.SCmag] = magnitude;
  memory[p.SCout] = scale[xByte];
  machine.A = dx;
  machine.C = 0;
  machine.X = LINO_DONE;
}

function globeRaster(machine, linked) {
  const memory = machine.memory;
  let p = globeRasterAddressCaches.get(linked);
  if (!p) {
    const names = [
      "nw", "rgt", "sprg", "spgscale", "GBmag", "GBcx", "GBcy",
      "GBgman", "GBstart", "GBcmask", "GBsat", "GBtabreg", "GBtapreg",
      "GBdstreg", "GBbytes", "GBry0", "GBry1", "GBrx0", "GBrx1",
      "GBpaint", "GBcur", "GBg1", "GBg2", "GBg3", "GBg4", "GBsi",
      "GBbx", "GBcxr", "GBdi", "GBax", "GBdl", "GBy", "GBx", "GBt",
      "GBi", "GBj", "CSdraw", "CSskip", "CScur", "SPMk", "SPreg",
      "SPoff", "SPval", "SCdy", "SCmag", "SCout",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    globeRasterAddressCaches.set(linked, p);
  }

  const magnitude = memory[p.GBmag] | 0;
  const scale = new Int32Array(256);
  for (let byte = 0; byte < 256; byte += 1) {
    const scaled = scaleSignedByteExact(byte, magnitude);
    scale[byte] = scaled;
    memory[p.spgscale + byte] = scaled;
  }

  const nw = p.nw;
  const tableRegister = memory[p.GBtabreg] | 0;
  const tapestryRegister = memory[p.GBtapreg] | 0;
  const destinationRegister = memory[p.GBdstreg] | 0;
  const table = nw + (memory[p.rgt + Math.imul(tableRegister, 4) + 1] >>> 0);
  const tapestry = nw + (memory[p.rgt + Math.imul(tapestryRegister, 4) + 1] >>> 0);
  const destination = nw + (memory[p.rgt + Math.imul(destinationRegister, 4) + 1] >>> 0);
  const cx = memory[p.GBcx] | 0;
  const cy = memory[p.GBcy] | 0;
  const colourMask = memory[p.GBcmask] & 255;
  const saturation = memory[p.GBsat] & 255;
  const gman = memory[p.GBgman] | 0;
  const side = gman >= 1 && gman <= 4 ? gman : 4;

  let si = 0;
  let bx = ((memory[p.GBstart] | 0) + 4) & 0xffff;
  let remaining = memory[p.GBbytes] >>> 1;
  let draw = 0;
  let skip = 0;
  let yLow = 0;
  let yHigh = 0;
  let xLow = 0;
  let xHigh = 0;
  let paint = 0;
  let yByte = memory[p.GBy] | 0;
  let xByte = memory[p.GBx] | 0;
  let di = memory[p.GBdi] | 0;
  let ax = memory[p.GBax] | 0;
  let output = memory[p.GBdl] | 0;
  let scratch = memory[p.GBt] | 0;
  let lastOffset = memory[p.SPoff] | 0;
  let lastCount = memory[p.SPMk] | 0;
  let lastManagerOffset = 256;
  let lastSpRegister = memory[p.SPreg] | 0;
  let lastSpOffset = lastOffset;
  let lastSpValue = memory[p.SPval] | 0;

  while (remaining > 0) {
    yByte = memory[table + ((si + 4) & 0xffff)] & 255;
    xByte = memory[table + ((si + 5) & 0xffff)] & 255;
    lastSpRegister = tableRegister;
    lastSpOffset = (si + 5) & 0xffff;
    lastSpValue = xByte;

    if (yByte === 100) {
      skip += 1;
      bx = (bx + xByte) & 0xffff;
    } else {
      draw += 1;
      di = (scale[yByte] + cy) & 0xffff;
      if ((di >>> 0) < 6) yLow += 1;
      else if ((di >>> 0) >= 191) yHigh += 1;
      else {
        scratch = (di + di) & 0xffff;
        di = memory[p.sprg + di] | 0;
        ax = (scale[xByte] + cx) & 0xffff;
        if ((ax >>> 0) < 6) xLow += 1;
        else if ((ax >>> 0) >= 311) xHigh += 1;
        else {
          di = (di + ax) & 0xffff;
          output = memory[tapestry + (bx & 0xffff)] & 255;
          scratch = saturation;
          if ((output >>> 0) < (saturation >>> 0)) output = saturation;
          output = (output | colourMask) & 255;

          lastManagerOffset = side === 1 ? 0 : side === 2 ? 1 : side === 3 ? 5 : 14;
          lastCount = side * side;
          let count = 0;
          for (let row = 0; row < side; row += 1) {
            const rowOffset = Math.imul(row, 320);
            for (let column = 0; column < side; column += 1) {
              lastOffset = di + 4 + rowOffset + column;
              memory[destination + (lastOffset & 0xffff)] = output;
              count += 1;
            }
          }
          lastCount = count;
          lastSpRegister = destinationRegister;
          lastSpOffset = lastOffset;
          lastSpValue = output;
          paint += 1;
          memory[side === 1 ? p.GBg1 : side === 2 ? p.GBg2 : side === 3 ? p.GBg3 : p.GBg4] += 1;
        }
      }
      bx = (bx + 1) & 0xffff;
    }
    si += 2;
    remaining -= 1;
  }

  memory[p.GBry0] = yLow;
  memory[p.GBry1] = yHigh;
  memory[p.GBrx0] = xLow;
  memory[p.GBrx1] = xHigh;
  memory[p.GBpaint] = paint;
  memory[p.GBcur] = bx;
  memory[p.GBsi] = si;
  memory[p.GBbx] = bx;
  memory[p.GBcxr] = remaining;
  memory[p.GBdi] = di;
  memory[p.GBax] = ax;
  memory[p.GBdl] = output;
  memory[p.GBy] = yByte;
  memory[p.GBx] = xByte;
  memory[p.GBt] = scratch;
  memory[p.GBi] = lastManagerOffset;
  memory[p.GBj] = lastCount;
  memory[p.CSdraw] = draw;
  memory[p.CSskip] = skip;
  memory[p.CScur] = bx;
  memory[p.SPMk] = lastCount;
  memory[p.SPreg] = lastSpRegister;
  memory[p.SPoff] = lastSpOffset;
  memory[p.SPval] = lastSpValue;
  memory[p.SCdy] = -1;
  memory[p.SCmag] = magnitude;
  memory[p.SCout] = scale[255];
  machine.A = bx;
  machine.C = lastSpValue;
  machine.X = LINO_DONE;
}

function drawMode2Cache(machine, linked) {
  const memory = machine.memory;
  let p = mode2CacheAddressCaches.get(linked);
  if (!p) {
    p = {
      ...poly3dAddresses(linked),
      VHRcached: address(linked, "VHRcached"),
      VHRcachecount: address(linked, "VHRcachecount"),
      VHRcachep: address(linked, "VHRcachep"),
      VHRptr: address(linked, "VHRptr"),
      VHRi: address(linked, "VHRi"),
      VHRdrawn: address(linked, "VHRdrawn"),
      vhrcache: address(linked, "vhrcache"),
      DBcol: address(linked, "DBcol"),
      DBflar: address(linked, "DBflar"),
      DBent: address(linked, "DBent"),
      PGFt: address(linked, "PGFt"),
    };
    mode2CacheAddressCaches.set(linked, p);
  }
  memory[p.VHRdrawn] = 0;
  if ((memory[p.VHRcached] | 0) === 0) {
    machine.X = LINO_DONE;
    return;
  }
  const count = memory[p.VHRcachecount] >>> 0;
  const view = dataView(memory);
  if (!p.topology || p.topology.count !== count) {
    const keys = new Map();
    const vertexIds = new Int32Array(count * 3);
    const coordinates = [];
    for (let leaf = 0; leaf < count; leaf += 1) {
      const record = p.vhrcache + leaf * 10;
      for (let vertex = 0; vertex < 3; vertex += 1) {
        const source = record + vertex * 3;
        const x = memory[source] | 0;
        const y = memory[source + 1] | 0;
        const z = memory[source + 2] | 0;
        const key = `${x},${y},${z}`;
        let id = keys.get(key);
        if (id === undefined) {
          id = coordinates.length;
          keys.set(key, id);
          coordinates.push([x, y, z]);
        }
        vertexIds[leaf * 3 + vertex] = id;
      }
    }
    const size = coordinates.length;
    p.topology = {
      count, vertexIds, coordinates,
      rx: new Float64Array(size), ry: new Float64Array(size), rz: new Float64Array(size),
      screenX: new Float64Array(size), screenY: new Float64Array(size),
      ix: new Int32Array(size), iy: new Int32Array(size), visible: new Uint8Array(size),
      xs: new Int32Array(8), ys: new Int32Array(8),
      leftEdges: new Int16Array(200), rightEdges: new Int16Array(200),
      clipX: new Float64Array(8), clipY: new Float64Array(8), clipZ: new Float64Array(8),
      screenClipX0: new Float64Array(12), screenClipY0: new Float64Array(12),
      screenClipX1: new Float64Array(12), screenClipY1: new Float64Array(12),
    };
  }
  const control = floatingPoint(machine).control;
  const cameraX = directPolySlot(memory, p, p.FSCAMX);
  const cameraY = directPolySlot(memory, p, p.FSCAMY);
  const cameraZ = directPolySlot(memory, p, p.FSCAMZ);
  const betaSin = directPolySlot(memory, p, p.FSPSB);
  const betaCos = directPolySlot(memory, p, p.FSPCB);
  const turnBetaCos = directPolySlot(memory, p, p.FSTCB);
  const turnBetaSin = directPolySlot(memory, p, p.FSTSB);
  const alphaCos = directPolySlot(memory, p, p.FSPCA);
  const alphaSin = directPolySlot(memory, p, p.FSPSA);
  const turnAlphaCos = directPolySlot(memory, p, p.FSTCA);
  const turnAlphaSin = directPolySlot(memory, p, p.FSTSA);
  const near = directPolySlot(memory, p, p.FSUNEG);
  const numerator = directPolySlot(memory, p, p.FSUNO);
  const centerX = directPolySlot(memory, p, p.FSXC);
  const centerY = directPolySlot(memory, p, p.FSYC);
  for (let id = 0; id < p.topology.coordinates.length; id += 1) {
    const [xb, yb, zb] = p.topology.coordinates[id];
    const z = roundFloat32(float32FromBits(zb) - cameraZ, control);
    const x = roundFloat32(float32FromBits(xb) - cameraX, control);
    const y = roundFloat32(float32FromBits(yb) - cameraY, control);
    const rx = roundFloat32(x * betaCos + z * betaSin, control);
    const z2 = roundFloat32(z * turnBetaCos - x * turnBetaSin, control);
    const rzWide = y * turnAlphaSin + z2 * turnAlphaCos;
    const rz = roundFloat32(rzWide, control);
    const ry = roundFloat32(y * alphaCos - z2 * alphaSin, control);
    const visible = !Number.isNaN(rzWide) && !Number.isNaN(near) && rzWide >= near;
    p.topology.rx[id] = rx;
    p.topology.ry[id] = ry;
    p.topology.rz[id] = rz;
    p.topology.visible[id] = visible ? 1 : 0;
    if (visible) {
      const factor = numerator / rz;
      const screenXWide = factor * rx + centerX;
      const screenYWide = factor * ry + centerY;
      p.topology.screenX[id] = roundFloat32(screenXWide, control);
      p.topology.screenY[id] = roundFloat32(screenYWide, control);
      p.topology.ix[id] = convertToInt32(screenXWide, control);
      p.topology.iy[id] = convertToInt32(screenYWide, control);
    }
  }
  for (let leaf = 0; leaf < count; leaf += 1) {
    const record = p.vhrcache + leaf * 10;
    memory[p.VHRcachep] = leaf;
    memory[p.VHRptr] = record;
    for (let vertex = 0; vertex < 3; vertex += 1) {
      const source = record + vertex * 3;
      const slots = [p.FSINX + vertex, p.FSINY + vertex, p.FSINZ + vertex];
      for (let axis = 0; axis < 3; axis += 1) {
        const bits = memory[source + axis] | 0;
        const slot = slots[axis];
        memory[p.PGFi] = slot;
        memory[p.PGFt] = bits;
        memory[p.FS0] = bits;
        view.setFloat64((p.fw + slot * 2) * 4, float32FromBits(bits), true);
      }
      memory[p.VHRi] = vertex + 1;
    }
    memory[p.PJnrv] = 3;
    memory[p.DBcol] = memory[record + 9];
    memory[p.DBflar] = 0;
    memory[p.DBent] = 0;
    const id0 = p.topology.vertexIds[leaf * 3];
    const id1 = p.topology.vertexIds[leaf * 3 + 1];
    const id2 = p.topology.vertexIds[leaf * 3 + 2];
    const visibleCount = p.topology.visible[id0] + p.topology.visible[id1] + p.topology.visible[id2];
    memory[p.PJmode] = 0;
    memory[p.PJdoflag] = visibleCount;
    memory[p.PJgate] = 1;
    if (visibleCount === 3) {
      for (let vertex = 0; vertex < 3; vertex += 1) {
        const id = vertex === 0 ? id0 : vertex === 1 ? id1 : id2;
        writeFloat64(memory, p.fw + (p.FSRXF + vertex) * 2, p.topology.rx[id]);
        writeFloat64(memory, p.fw + (p.FSRYF + vertex) * 2, p.topology.ry[id]);
        writeFloat64(memory, p.fw + (p.FSRZF + vertex) * 2, p.topology.rz[id]);
        writeFloat64(memory, p.fw + (p.FSUX + vertex) * 2, p.topology.rx[id]);
        writeFloat64(memory, p.fw + (p.FSUY + vertex) * 2, p.topology.ry[id]);
        writeFloat64(memory, p.fw + (p.FSUZ + vertex) * 2, p.topology.rz[id]);
        writeFloat64(memory, p.fw + (p.FSVX0 + vertex) * 2, p.topology.screenX[id]);
        writeFloat64(memory, p.fw + (p.FSVY0 + vertex) * 2, p.topology.screenY[id]);
        memory[p.rwf + vertex] = 1;
        memory[p.mp + vertex * 2] = p.topology.ix[id];
        memory[p.mp + vertex * 2 + 1] = p.topology.iy[id];
      }
      memory[p.PJvr] = 3;
      memory[p.PJvr2] = 3;
      memory[p.PJvr22] = 6;
      polyProjectedTail(machine, linked, p);
    } else if (visibleCount !== 0) poly3d(machine, linked);
    memory[p.VHRdrawn] = (memory[p.VHRdrawn] + 1) | 0;
  }
  memory[p.VHRcachep] = count;
  machine.X = LINO_DONE;
}

function renderCupolaCache(machine, linked) {
  const memory = machine.memory;
  let p = renderCupolaCacheAddressCaches.get(linked);
  if (!p) {
    p = {
      ...poly3dAddresses(linked),
      VHCyor: address(linked, "VHCyor"),
      VHCgrid: address(linked, "VHCgrid"),
      VHCcamybase: address(linked, "VHCcamybase"),
      VHCvisible: address(linked, "VHCvisible"),
      VHCcachebase: address(linked, "VHCcachebase"),
      VHCpanels: address(linked, "VHCpanels"),
      VHCcachep: address(linked, "VHCcachep"),
      VHCcopy: address(linked, "VHCcopy"),
      VHCi: address(linked, "VHCi"),
      VHCvi: address(linked, "VHCvi"),
      VHVcamyi: address(linked, "VHVcamyi"),
      vhccache: address(linked, "vhccache"),
      vhcpoly: address(linked, "vhcpoly"),
      VHSflare: address(linked, "VHSflare"),
      VHSx0: address(linked, "VHSx0"),
      VHSy0: address(linked, "VHSy0"),
      VHSz0: address(linked, "VHSz0"),
      VHSx1: address(linked, "VHSx1"),
      VHSy1: address(linked, "VHSy1"),
      VHSz1: address(linked, "VHSz1"),
    };
    renderCupolaCacheAddressCaches.set(linked, p);
  }

  const cameraY = memory[p.VHVcamyi] | 0;
  const grid = (memory[p.VHCgrid] | 0) !== 0;
  const cacheBase = p.vhccache + ((memory[p.VHCyor] | 0) === 0 ? 0 : 1680);
  memory[p.VHCcamybase] = cameraY;
  memory[p.VHCvisible] = 1;
  memory[p.VHCcachebase] = cacheBase;
  memory[p.VHCpanels] = 0;

  if (!grid) {
    if (!p.topologies) p.topologies = new Map();
    let topology = p.topologies.get(cacheBase);
    if (!topology) {
      const keys = new Map();
      const vertexIds = new Int32Array(140 * 4);
      const coordinates = [];
      for (let panel = 0; panel < 140; panel += 1) {
        const record = cacheBase + panel * 12;
        for (let vertex = 0; vertex < 4; vertex += 1) {
          const source = record + vertex * 3;
          const x = memory[source] | 0;
          const y = memory[source + 1] | 0;
          const z = memory[source + 2] | 0;
          const key = `${x},${y},${z}`;
          let id = keys.get(key);
          if (id === undefined) {
            id = coordinates.length;
            keys.set(key, id);
            coordinates.push([x, y, z]);
          }
          vertexIds[panel * 4 + vertex] = id;
        }
      }
      const size = coordinates.length;
      topology = {
        vertexIds, coordinates,
        rx: new Float64Array(size), ry: new Float64Array(size), rz: new Float64Array(size),
        screenX: new Float64Array(size), screenY: new Float64Array(size),
        ix: new Int32Array(size), iy: new Int32Array(size), visible: new Uint8Array(size),
      };
      p.topologies.set(cacheBase, topology);
    }

    const control = floatingPoint(machine).control;
    const cameraX = directPolySlot(memory, p, p.FSCAMX);
    const cameraYFloat = directPolySlot(memory, p, p.FSCAMY);
    const cameraZ = directPolySlot(memory, p, p.FSCAMZ);
    const betaSin = directPolySlot(memory, p, p.FSPSB);
    const betaCos = directPolySlot(memory, p, p.FSPCB);
    const turnBetaCos = directPolySlot(memory, p, p.FSTCB);
    const turnBetaSin = directPolySlot(memory, p, p.FSTSB);
    const alphaCos = directPolySlot(memory, p, p.FSPCA);
    const alphaSin = directPolySlot(memory, p, p.FSPSA);
    const turnAlphaCos = directPolySlot(memory, p, p.FSTCA);
    const turnAlphaSin = directPolySlot(memory, p, p.FSTSA);
    const near = directPolySlot(memory, p, p.FSUNEG);
    const numerator = directPolySlot(memory, p, p.FSUNO);
    const centerX = directPolySlot(memory, p, p.FSXC);
    const centerY = directPolySlot(memory, p, p.FSYC);
    const projectionKey = [
      cameraX, cameraYFloat, cameraZ, betaSin, betaCos, turnBetaCos,
      turnBetaSin, alphaCos, alphaSin, turnAlphaCos, turnAlphaSin,
      near, numerator, centerX, centerY,
    ];
    for (let id = 0; id < topology.coordinates.length; id += 1) {
      const [xb, yb, zb] = topology.coordinates[id];
      const z = roundFloat32(float32FromBits(zb) - cameraZ, control);
      const x = roundFloat32(float32FromBits(xb) - cameraX, control);
      const y = roundFloat32(float32FromBits(yb) - cameraYFloat, control);
      const rx = roundFloat32(x * betaCos + z * betaSin, control);
      const z2 = roundFloat32(z * turnBetaCos - x * turnBetaSin, control);
      const rzWide = y * turnAlphaSin + z2 * turnAlphaCos;
      const rz = roundFloat32(rzWide, control);
      const ry = roundFloat32(y * alphaCos - z2 * alphaSin, control);
      const visible = !Number.isNaN(rzWide) && !Number.isNaN(near) && rzWide >= near;
      topology.rx[id] = rx;
      topology.ry[id] = ry;
      topology.rz[id] = rz;
      topology.visible[id] = visible ? 1 : 0;
      if (visible) {
        const factor = numerator / rz;
        const screenXWide = factor * rx + centerX;
        const screenYWide = factor * ry + centerY;
        topology.screenX[id] = roundFloat32(screenXWide, control);
        topology.screenY[id] = roundFloat32(screenYWide, control);
        topology.ix[id] = convertToInt32(screenXWide, control);
        topology.iy[id] = convertToInt32(screenYWide, control);
      }
    }
    topology.projectionKey = projectionKey;

    for (let panel = 0; panel < 140; panel += 1) {
      const record = cacheBase + panel * 12;
      memory[p.VHCcachep] = record;
      memory[p.VHCcopy] = 12;
      memory[p.PJnrv] = 4;
      memory[p.DBcol] = 64;
      memory[p.DBflar] = 2;
      memory[p.DBent] = 0;
      const ids = topology.vertexIds.subarray(panel * 4, panel * 4 + 4);
      const visibleCount = topology.visible[ids[0]] + topology.visible[ids[1]]
        + topology.visible[ids[2]] + topology.visible[ids[3]];
      memory[p.PJmode] = 0;
      memory[p.PJdoflag] = visibleCount;
      memory[p.PJgate] = 1;
      if (visibleCount === 4) {
        for (let vertex = 0; vertex < 4; vertex += 1) {
          const id = ids[vertex];
          writeFloat64(memory, p.fw + (p.FSVX0 + vertex) * 2, topology.screenX[id]);
          writeFloat64(memory, p.fw + (p.FSVY0 + vertex) * 2, topology.screenY[id]);
          memory[p.rwf + vertex] = 1;
          memory[p.mp + vertex * 2] = topology.ix[id];
          memory[p.mp + vertex * 2 + 1] = topology.iy[id];
        }
        memory[p.PJvr] = 4;
        memory[p.PJvr2] = 4;
        memory[p.PJvr22] = 8;
        polyProjectedTail(machine, linked, p);
      } else if (visibleCount !== 0) {
        for (let vertex = 0; vertex < 4; vertex += 1) {
          const source = record + vertex * 3;
          const slots = [p.FSINX + vertex, p.FSINY + vertex, p.FSINZ + vertex];
          for (let axis = 0; axis < 3; axis += 1) {
            const bits = memory[source + axis] | 0;
            memory[p.FS0] = bits;
            memory[p.PGFi] = slots[axis];
            writeFloat64(memory, p.fw + slots[axis] * 2, float32FromBits(bits));
          }
        }
        poly3d(machine, linked);
      }
      memory[p.VHCpanels] = panel + 1;
    }

    // VHC draw panel's four-vertex source loop leaves these public cursors
    // at the values from its final vertex.  The shared-topology path skips
    // that loop, so publish the same state before returning.
    memory[p.VHCi] = 4;
    memory[p.VHCvi] = 3;

    memory[p.FI] = cameraY;
    const narrowedCameraY = Math.fround(cameraY);
    memory[p.FS0] = float32Bits(narrowedCameraY);
    writeFloat64(memory, p.FA0, narrowedCameraY);
    memory[p.PGFi] = p.FSCAMY;
    writeFloat64(memory, p.fw + p.FSCAMY * 2, narrowedCameraY);
    machine.X = LINO_DONE;
    return;
  }

  const topology = p.topologies?.get(cacheBase);
  if (topology) {
    const control = floatingPoint(machine).control;
    const cameraX = directPolySlot(memory, p, p.FSCAMX);
    const cameraYFloat = directPolySlot(memory, p, p.FSCAMY);
    const cameraZ = directPolySlot(memory, p, p.FSCAMZ);
    const betaSin = directPolySlot(memory, p, p.FSPSB);
    const betaCos = directPolySlot(memory, p, p.FSPCB);
    const turnBetaCos = directPolySlot(memory, p, p.FSTCB);
    const turnBetaSin = directPolySlot(memory, p, p.FSTSB);
    const alphaCos = directPolySlot(memory, p, p.FSPCA);
    const alphaSin = directPolySlot(memory, p, p.FSPSA);
    const turnAlphaCos = directPolySlot(memory, p, p.FSTCA);
    const turnAlphaSin = directPolySlot(memory, p, p.FSTSA);
    const numerator = directPolySlot(memory, p, p.FSUNO);
    const centerX = directPolySlot(memory, p, p.FSXC);
    const centerY = directPolySlot(memory, p, p.FSYC);
    const projectionKey = [
      cameraX, cameraYFloat, cameraZ, betaSin, betaCos, turnBetaCos,
      turnBetaSin, alphaCos, alphaSin, turnAlphaCos, turnAlphaSin,
      200, numerator, centerX, centerY,
    ];
    const projected = topology.projectionKey;
    const reuseProjection = projected?.length === projectionKey.length
      && projected.every((value, index) => Object.is(value, projectionKey[index]));
    if (!reuseProjection) {
      for (let id = 0; id < topology.coordinates.length; id += 1) {
        const [xb, yb, zb] = topology.coordinates[id];
        const z = roundFloat32(float32FromBits(zb) - cameraZ, control);
        const x = roundFloat32(float32FromBits(xb) - cameraX, control);
        const y = roundFloat32(float32FromBits(yb) - cameraYFloat, control);
        const rx = roundFloat32(x * betaCos + z * betaSin, control);
        const z2 = roundFloat32(z * turnBetaCos - x * turnBetaSin, control);
        const rzWide = y * turnAlphaSin + z2 * turnAlphaCos;
        const rz = roundFloat32(rzWide, control);
        const ry = roundFloat32(y * alphaCos - z2 * alphaSin, control);
        const visible = !Number.isNaN(rzWide) && rzWide >= 200;
        topology.visible[id] = visible ? 1 : 0;
        if (visible) {
          const factor = numerator / rz;
          topology.ix[id] = convertToInt32(factor * rx + centerX, control);
          topology.iy[id] = convertToInt32(factor * ry + centerY, control);
        }
      }
      topology.projectionKey = projectionKey;
    }
    const lineP = stick3dAddresses(linked);
    memory[p.VHSflare] = 0;
    for (let panel = 0; panel < 140; panel += 1) {
      const record = cacheBase + panel * 12;
      memory[p.VHCcachep] = record;
      memory[p.VHCcopy] = 12;
      const ids = topology.vertexIds.subarray(panel * 4, panel * 4 + 4);
      for (const [first, second] of [[0, 3], [0, 1]]) {
        const firstId = ids[first];
        const secondId = ids[second];
        const visibility = topology.visible[firstId] + topology.visible[secondId];
        if (visibility === 2) {
          drawProjectedStick(
            machine, linked, lineP,
            topology.ix[firstId], topology.iy[firstId],
            topology.ix[secondId], topology.iy[secondId],
          );
        } else if (visibility === 1) {
          const firstSource = record + first * 3;
          const secondSource = record + second * 3;
          memory[p.VHSx0] = memory[firstSource];
          memory[p.VHSy0] = memory[firstSource + 1];
          memory[p.VHSz0] = memory[firstSource + 2];
          memory[p.VHSx1] = memory[secondSource];
          memory[p.VHSy1] = memory[secondSource + 1];
          memory[p.VHSz1] = memory[secondSource + 2];
          stick3d(machine, linked);
        }
      }
      memory[p.VHCpanels] = panel + 1;
    }
    memory[p.FI] = cameraY;
    const narrowedCameraY = Math.fround(cameraY);
    memory[p.FS0] = float32Bits(narrowedCameraY);
    writeFloat64(memory, p.FA0, narrowedCameraY);
    memory[p.PGFi] = p.FSCAMY;
    writeFloat64(memory, p.fw + p.FSCAMY * 2, narrowedCameraY);
    machine.X = LINO_DONE;
    return;
  }

  for (let panel = 0; panel < 140; panel += 1) {
    const source = cacheBase + panel * 12;
    memory[p.VHCcachep] = source;
    memory[p.VHCcopy] = 0;
    memory.set(memory.subarray(source, source + 12), p.vhcpoly);
    memory[p.VHCcopy] = 12;

    if (!grid) drawCupolaPanel(machine, linked);
    else {
      memory[p.VHSflare] = 0;
      memory[p.VHSx0] = memory[p.vhcpoly];
      memory[p.VHSy0] = memory[p.vhcpoly + 1];
      memory[p.VHSz0] = memory[p.vhcpoly + 2];
      memory[p.VHSx1] = memory[p.vhcpoly + 9];
      memory[p.VHSy1] = memory[p.vhcpoly + 10];
      memory[p.VHSz1] = memory[p.vhcpoly + 11];
      stick3d(machine, linked);
      memory[p.VHSx0] = memory[p.vhcpoly];
      memory[p.VHSy0] = memory[p.vhcpoly + 1];
      memory[p.VHSz0] = memory[p.vhcpoly + 2];
      memory[p.VHSx1] = memory[p.vhcpoly + 3];
      memory[p.VHSy1] = memory[p.vhcpoly + 4];
      memory[p.VHSz1] = memory[p.vhcpoly + 5];
      stick3d(machine, linked);
    }
    memory[p.VHCpanels] = panel + 1;
  }

  memory[p.FI] = cameraY;
  const narrowedCameraY = Math.fround(cameraY);
  memory[p.FS0] = float32Bits(narrowedCameraY);
  writeFloat64(memory, p.FA0, narrowedCameraY);
  memory[p.PGFi] = p.FSCAMY;
  writeFloat64(memory, p.fw + p.FSCAMY * 2, narrowedCameraY);
  machine.X = LINO_DONE;
}

function drawCupolaPanel(machine, linked) {
  const memory = machine.memory;
  let p = drawCupolaPanelAddressCaches.get(linked);
  if (!p) {
    p = {
      ...polymapAddresses(linked),
      VHCcapsule: address(linked, "VHCcapsule"),
      VHCi: address(linked, "VHCi"),
      VHCvi: address(linked, "VHCvi"),
      vhcpoly: address(linked, "vhcpoly"),
      PGFt: address(linked, "PGFt"),
    };
    drawCupolaPanelAddressCaches.set(linked, p);
  }
  const capsule = memory[p.VHCcapsule] | 0;
  for (let vertex = 0; vertex < 4; vertex += 1) {
    const sourceVertex = capsule !== 0 ? (vertex === 0 ? 3 : vertex - 1) : vertex;
    const source = p.vhcpoly + sourceVertex * 3;
    memory[p.VHCi] = vertex;
    memory[p.VHCvi] = sourceVertex;
    const slots = [p.FSINX + vertex, p.FSINY + vertex, p.FSINZ + vertex];
    for (let axis = 0; axis < 3; axis += 1) {
      const bits = memory[source + axis] | 0;
      memory[p.PGFi] = slots[axis];
      memory[p.PGFt] = bits;
      memory[p.FS0] = bits;
      writeFloat64(memory, p.fw + slots[axis] * 2, float32FromBits(bits));
    }
  }
  memory[p.VHCi] = 4;
  memory[p.PJnrv] = 4;
  if (capsule === 0) {
    memory[p.DBcol] = 64;
    memory[p.DBflar] = 2;
    memory[p.DBent] = 0;
    poly3d(machine, linked);
  } else {
    memory[p.PGtexf] = 7;
    memory[p.SPtinta] = 0;
    memory[p.SPescr] = 0;
    memory[p.SPflar] = 4;
    memory[p.SPcull] = 0;
    memory[p.SPhalf] = 0;
    polymap(machine, linked);
    memory[p.PGtexf] = 0;
    memory[p.SPflar] = 0;
  }
  machine.X = LINO_DONE;
}

function stick3dAddresses(linked) {
  let p = stick3dAddressCaches.get(linked);
  if (!p) {
    p = { ...poly3dAddresses(linked) };
    for (const name of [
      "VHSx0", "VHSy0", "VHSz0", "VHSx1", "VHSy1", "VHSz1",
      "VHSpx0", "VHSpy0", "VHSpx1", "VHSpy1", "VHSdx", "VHSdy",
      "VHSsx", "VHSsy", "VHSerr", "VHSe2", "VHSphase", "VHSnearbase",
      "VHSclipbound",
    ]) p[name] = address(linked, name);
    stick3dAddressCaches.set(linked, p);
  }
  return p;
}

function drawProjectedStick(machine, linked, p, inputX0, inputY0, inputX1, inputY1) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  let x0 = inputX0 | 0;
  let y0 = inputY0 | 0;
  let x1 = inputX1 | 0;
  let y1 = inputY1 | 0;
  memory[p.VHSpx0] = x0;
  memory[p.VHSpy0] = y0;
  memory[p.VHSpx1] = x1;
  memory[p.VHSpy1] = y1;
  const left = p.PGLBX;
  const top = p.PGLBY;
  const right = p.PGUBX;
  const bottom = p.PGUBY;
  const rejected = (x0 < left && x1 < left) || (x0 > right && x1 > right)
    || (y0 < top && y1 < top) || (y0 > bottom && y1 > bottom);
  if (rejected) return;
  const clipX0 = (bound) => {
    const diff = roundFloat32(x0 - x1, control);
    const k = roundFloat32((bound - x1) / diff, control);
    y0 = convertToInt32((y0 - y1) * k + y1, control);
    x0 = bound;
  };
  const clipX1 = (bound) => {
    const diff = roundFloat32(x1 - x0, control);
    const k = roundFloat32((bound - x0) / diff, control);
    y1 = convertToInt32((y1 - y0) * k + y0, control);
    x1 = bound;
  };
  const clipY0 = (bound) => {
    const diff = roundFloat32(y0 - y1, control);
    const k = roundFloat32((bound - y1) / diff, control);
    x0 = convertToInt32((x0 - x1) * k + x1, control);
    y0 = bound;
  };
  const clipY1 = (bound) => {
    const diff = roundFloat32(y1 - y0, control);
    const k = roundFloat32((bound - y0) / diff, control);
    x1 = convertToInt32((x1 - x0) * k + x0, control);
    y1 = bound;
  };
  if (x0 < left) clipX0(left);
  if (x1 < left) clipX1(left);
  if (y0 < top) clipY0(top);
  if (y1 < top) clipY1(top);
  if (x0 > right) clipX0(right);
  if (x1 > right) clipX1(right);
  if (y0 > bottom) clipY0(bottom);
  if (y1 > bottom) clipY1(bottom);
  memory[p.VHSpx0] = x0;
  memory[p.VHSpy0] = y0;
  memory[p.VHSpx1] = x1;
  memory[p.VHSpy1] = y1;
  if (x0 === x1 && y0 === y1) return;
  if (x1 < x0) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
    memory[p.VHSpx0] = x0;
    memory[p.VHSpy0] = y0;
    memory[p.VHSpx1] = x1;
    memory[p.VHSpy1] = y1;
  }
  const rawDx = x1 - x0;
  const rawDy = y1 - y0;
  memory[p.VHSsx] = rawDx >= 0 ? 1 : -1;
  memory[p.VHSsy] = rawDy >= 0 ? 1 : -1;
  memory[p.VHSdx] = Math.abs(rawDx);
  memory[p.VHSdy] = -Math.abs(rawDy);
  memory[p.VHSerr] = Math.abs(rawDx) - Math.abs(rawDy);
  memory[p.VHSphase] = 0;
  drawStickLine(machine, linked);
}

function stick3d(machine, linked) {
  const memory = machine.memory;
  const p = stick3dAddresses(linked);
  const control = floatingPoint(machine).control;
  const savedNear = float32Bits(roundFloat32(directPolySlot(memory, p, p.FSUNEG), control));
  memory[p.VHSnearbase] = savedNear;
  writeFloat64(memory, p.fw + p.FSUNEG * 2, 200);
  const endpoints = [
    [memory[p.VHSx0] | 0, memory[p.VHSy0] | 0, memory[p.VHSz0] | 0],
    [memory[p.VHSx1] | 0, memory[p.VHSy1] | 0, memory[p.VHSz1] | 0],
  ];
  for (let vertex = 0; vertex < 2; vertex += 1) {
    const slots = [p.FSINX + vertex, p.FSINY + vertex, p.FSINZ + vertex];
    for (let axis = 0; axis < 3; axis += 1) {
      const bits = endpoints[vertex][axis];
      memory[p.FS0] = bits;
      memory[p.PGFi] = slots[axis];
      writeFloat64(memory, p.fw + slots[axis] * 2, float32FromBits(bits));
    }
  }
  memory[p.PJnrv] = 2;
  memory[p.PJmode] = 0;
  polyRotateDirect(machine, linked, p);
  const visible = memory[p.PJdoflag] | 0;
  if (visible === 0) {
    writeFloat64(memory, p.fw + p.FSUNEG * 2, float32FromBits(savedNear));
    machine.X = LINO_DONE;
    return;
  }
  if (visible === 2) polyZload(machine, linked, p);
  else {
    const firstVisible = (memory[p.rwf] | 0) !== 0;
    memory[p.PJbx] = firstVisible ? 1 : 0;
    memory[p.PJvv] = firstVisible ? 0 : 1;
    memory[p.PJdi] = 0;
    polyZemit(machine, linked, p);
    const surviving = memory[p.PJvv] | 0;
    polyMove(machine, linked, p, p.FSRXF + surviving, p.FSUX + 1);
    polyMove(machine, linked, p, p.FSRYF + surviving, p.FSUY + 1);
    polyMove(machine, linked, p, p.FSRZF + surviving, p.FSUZ + 1);
    memory[p.PJvr2] = 2;
  }
  polyProject3d(machine, linked, p);
  let x0 = memory[p.mp] | 0;
  let y0 = memory[p.mp + 1] | 0;
  let x1 = memory[p.mp + 2] | 0;
  let y1 = memory[p.mp + 3] | 0;
  memory[p.VHSpx0] = x0;
  memory[p.VHSpy0] = y0;
  memory[p.VHSpx1] = x1;
  memory[p.VHSpy1] = y1;
  const left = p.PGLBX;
  const top = p.PGLBY;
  const right = p.PGUBX;
  const bottom = p.PGUBY;
  const rejected = (x0 < left && x1 < left) || (x0 > right && x1 > right)
    || (y0 < top && y1 < top) || (y0 > bottom && y1 > bottom);
  if (!rejected) {
    const clipX0 = (bound) => {
      const diff = roundFloat32(x0 - x1, control);
      const k = roundFloat32((bound - x1) / diff, control);
      y0 = convertToInt32((y0 - y1) * k + y1, control);
      x0 = bound;
    };
    const clipX1 = (bound) => {
      const diff = roundFloat32(x1 - x0, control);
      const k = roundFloat32((bound - x0) / diff, control);
      y1 = convertToInt32((y1 - y0) * k + y0, control);
      x1 = bound;
    };
    const clipY0 = (bound) => {
      const diff = roundFloat32(y0 - y1, control);
      const k = roundFloat32((bound - y1) / diff, control);
      x0 = convertToInt32((x0 - x1) * k + x1, control);
      y0 = bound;
    };
    const clipY1 = (bound) => {
      const diff = roundFloat32(y1 - y0, control);
      const k = roundFloat32((bound - y0) / diff, control);
      x1 = convertToInt32((x1 - x0) * k + x0, control);
      y1 = bound;
    };
    if (x0 < left) clipX0(left);
    if (x1 < left) clipX1(left);
    if (y0 < top) clipY0(top);
    if (y1 < top) clipY1(top);
    if (x0 > right) clipX0(right);
    if (x1 > right) clipX1(right);
    if (y0 > bottom) clipY0(bottom);
    if (y1 > bottom) clipY1(bottom);
    memory[p.VHSpx0] = x0;
    memory[p.VHSpy0] = y0;
    memory[p.VHSpx1] = x1;
    memory[p.VHSpy1] = y1;
    if (x0 !== x1 || y0 !== y1) {
      if (x1 < x0) {
        [x0, x1] = [x1, x0];
        [y0, y1] = [y1, y0];
        memory[p.VHSpx0] = x0;
        memory[p.VHSpy0] = y0;
        memory[p.VHSpx1] = x1;
        memory[p.VHSpy1] = y1;
      }
      const rawDx = x1 - x0;
      const rawDy = y1 - y0;
      const sx = rawDx >= 0 ? 1 : -1;
      const sy = rawDy >= 0 ? 1 : -1;
      const dx = Math.abs(rawDx);
      const dy = -Math.abs(rawDy);
      memory[p.VHSsx] = sx;
      memory[p.VHSsy] = sy;
      memory[p.VHSdx] = dx;
      memory[p.VHSdy] = dy;
      memory[p.VHSerr] = dx + dy;
      memory[p.VHSphase] = 0;
      drawStickLine(machine, linked);
    }
  }
  writeFloat64(memory, p.fw + p.FSUNEG * 2, float32FromBits(savedNear));
  memory[p.PGFi] = p.FSUNEG;
  machine.X = LINO_DONE;
}

function flareDrawAddresses(linked) {
  let p = flareDrawAddressCaches.get(linked);
  if (p) return p;
  const names = [
    "VHFcx", "VHFcy", "VHFang", "VHFk0", "VHFl0", "VHFu0", "VHFadd",
    "VHFghost", "VHFdx", "VHFdy", "VHFx0", "VHFy0", "VHFx1", "VHFy1",
    "VHFclipbound", "VHFlineleft", "VHFlinetop", "VHFgdx", "VHFgdy",
    "VHFgr", "VHFgfx", "VHFgfy", "VHFsintab", "VHFcostab", "VHVsin",
    "VHVcos", "VHFtrigready", "VHFtrigi", "VHFtriga0", "VHFtriga1",
    "fw", "FSW0", "FA0", "FB0", "FS0", "FI", "PGFi", "PGFt", "PGFu",
    "FCWCSAV", "FCWCHOP",
  ];
  p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
  flareDrawAddressCaches.set(linked, p);
  return p;
}

function flareSourceLine(machine, linked) {
  const memory = machine.memory;
  const p = flareDrawAddresses(linked);
  const control = floatingPoint(machine).control;
  let x0 = memory[p.VHFx0] | 0;
  let y0 = memory[p.VHFy0] | 0;
  let x1 = memory[p.VHFx1] | 0;
  let y1 = memory[p.VHFy1] | 0;
  const left = -150;
  const top = -90;
  const chop = (number) => Number.isFinite(number) && number >= -2147483648 && number <= 2147483647
    ? Math.trunc(number) | 0 : -2147483648;
  memory[p.VHFlineleft] = left;
  memory[p.VHFlinetop] = top;
  const clipX0 = (bound) => {
    memory[p.VHFclipbound] = bound;
    const diff = roundFloat32(x0 - x1, control);
    const k = roundFloat32((bound - x1) / diff, control);
    y0 = chop((y0 - y1) * k + y1);
    x0 = bound;
  };
  const clipX1 = (bound) => {
    memory[p.VHFclipbound] = bound;
    const diff = roundFloat32(x1 - x0, control);
    const k = roundFloat32((bound - x0) / diff, control);
    y1 = chop((y1 - y0) * k + y0);
    x1 = bound;
  };
  const clipY0 = (bound) => {
    memory[p.VHFclipbound] = bound;
    const diff = roundFloat32(y0 - y1, control);
    const k = roundFloat32((bound - y1) / diff, control);
    x0 = chop((x0 - x1) * k + x1);
    y0 = bound;
  };
  const clipY1 = (bound) => {
    memory[p.VHFclipbound] = bound;
    const diff = roundFloat32(y1 - y0, control);
    const k = roundFloat32((bound - y0) / diff, control);
    x1 = chop((x1 - x0) * k + x0);
    y1 = bound;
  };
  if (x0 < left && x0 !== x1) clipX0(left);
  if (x1 < left && x1 !== x0) clipX1(left);
  if (y0 < top && y0 !== y1) clipY0(top);
  if (y1 < top && y1 !== y0) clipY1(top);
  if (x0 > 160 && x0 !== x1) clipX0(160);
  if (x1 > 160 && x1 !== x0) clipX1(160);
  if (y0 > 90 && y0 !== y1) clipY0(90);
  if (y1 > 90 && y1 !== y0) clipY1(90);
  memory[p.VHFx0] = x0;
  memory[p.VHFy0] = y0;
  memory[p.VHFx1] = x1;
  memory[p.VHFy1] = y1;
  const point = x0 === x1 && y0 === y1;
  const outside = y0 < top || y0 > 90 || y1 < top || y1 > 90
    || x0 < left || x0 > 160 || x1 < left || x1 > 160;
  if (!point && !outside) {
    memory[p.VHFx0] = x0 + 158;
    memory[p.VHFx1] = x1 + 158;
    memory[p.VHFy0] = y0 + 100;
    memory[p.VHFy1] = y1 + 100;
    flareSourceStick(machine, linked);
  }
  machine.X = LINO_DONE;
}

function flareDraw(machine, linked) {
  const memory = machine.memory;
  const p = flareDrawAddresses(linked);
  const control = floatingPoint(machine).control;
  memory[p.FI] = 1;
  writeFloat64(memory, p.FA0, 1);
  writeFloat64(memory, p.VHFl0, 1);
  memory[p.PGFt] = 1069547520;
  memory[p.FS0] = 1069547520;
  writeFloat64(memory, p.FA0, 1.5);
  writeFloat64(memory, p.VHFu0, 1.5);
  memory[p.VHFang] = 0;
  if ((memory[p.VHFtrigready] | 0) === 0) {
    float64Scratch.setUint32(0, 2723323193, true);
    float64Scratch.setUint32(4, 1066524486, true);
    const degreeStep = float64Scratch.getFloat64(0, true);
    let radians = 0;
    memory[p.VHFtrigi] = 0;
    writeFloat64(memory, p.VHFtriga0, 0);
    for (let index = 0; index <= 360; index += 1) {
      memory[p.VHFtrigi] = index;
      memory[p.PGFt] = memory[p.VHFtriga0];
      memory[p.PGFu] = memory[p.VHFtriga1];
      writeFloat64(memory, p.FA0, radians);
      memory[p.PGFi] = p.FSW0;
      writeFloat64(memory, p.fw + p.FSW0 * 2, radians);

      let narrowed = roundFloat32(Math.cos(radians), control);
      const cosineBits = float32Bits(narrowed);
      memory[p.FS0] = cosineBits;
      memory[p.PGFt] = cosineBits;
      writeFloat64(memory, p.FA0, narrowed);
      memory[p.VHFcostab + index] = cosineBits;

      writeFloat64(memory, p.FA0, radians);
      narrowed = roundFloat32(Math.sin(radians), control);
      const sineBits = float32Bits(narrowed);
      memory[p.FS0] = sineBits;
      memory[p.PGFt] = sineBits;
      writeFloat64(memory, p.FA0, narrowed);
      memory[p.VHFsintab + index] = sineBits;

      writeFloat64(memory, p.FA0, radians);
      writeFloat64(memory, p.FB0, degreeStep);
      radians += degreeStep;
      writeFloat64(memory, p.FA0, radians);
      writeFloat64(memory, p.VHFtriga0, radians);
    }
    memory[p.VHFtrigready] = 1;
  }
  let length = 1;
  let scale = float32FromBits(1069547520);
  let angle = 0;
  const add = memory[p.VHFadd] | 0;
  const centerX = memory[p.VHFcx] | 0;
  const centerY = memory[p.VHFcy] | 0;
  const ghost = memory[p.VHFghost] | 0;
  const chop = (number) => Number.isFinite(number) && number >= -2147483648 && number <= 2147483647
    ? Math.trunc(number) | 0 : -2147483648;
  while (angle < 180) {
    const cosineBits = memory[p.VHFcostab + angle] | 0;
    const sineBits = memory[p.VHFsintab + angle] | 0;
    memory[p.VHVcos] = cosineBits;
    memory[p.VHVsin] = sineBits;
    flareSaveControl(machine, linked);
    memory[p.FCWCHOP] = (memory[p.FCWCSAV] & 0x0f3ff) | 0x0c00;
    flareSpokeDelta(machine, linked);
    const dx = memory[p.VHFdx] | 0;
    const dy = memory[p.VHFdy] | 0;
    memory[p.VHFx0] = centerX - 160 - dx;
    memory[p.VHFy0] = centerY - 100 - dy;
    memory[p.VHFx1] = centerX - 160 + dx;
    memory[p.VHFy1] = centerY - 100 + dy;
    flareSourceLine(machine, linked);
    if (ghost !== 0 && angle % 8 === 0) {
      let ghostDx = Math.trunc(dx / 10) | 0;
      let ghostDy = Math.trunc(dy / 10) | 0;
      let ghostX = Math.fround((centerX - 160) * -0.1);
      let ghostY = Math.fround((centerY - 100) * -0.1);
      memory[p.VHFgdx] = ghostDx;
      memory[p.VHFgdy] = ghostDy;
      memory[p.VHFgfx] = float32Bits(ghostX);
      memory[p.VHFgfy] = float32Bits(ghostY);
      for (let reflection = 0; reflection < 3; reflection += 1) {
        memory[p.VHFgr] = reflection;
        memory[p.VHFx0] = chop(ghostX - ghostDx);
        memory[p.VHFx1] = chop(ghostX + ghostDx);
        memory[p.VHFy0] = chop(ghostY - ghostDy);
        memory[p.VHFy1] = chop(ghostY + ghostDy);
        flareSourceLine(machine, linked);
        ghostDx = Math.imul(ghostDx, 4);
        ghostDy = Math.imul(ghostDy, 4);
        ghostX = Math.fround(ghostX * 3);
        ghostY = Math.fround(ghostY * 3);
        memory[p.VHFgdx] = ghostDx;
        memory[p.VHFgdy] = ghostDy;
        memory[p.VHFgfx] = float32Bits(ghostX);
        memory[p.VHFgfy] = float32Bits(ghostY);
      }
      memory[p.VHFgr] = 3;
    }
    length *= scale;
    writeFloat64(memory, p.VHFl0, length);
    if (length > 3 || length < 1) {
      scale = 1 / scale;
      writeFloat64(memory, p.VHFu0, scale);
    }
    angle += add;
    memory[p.VHFang] = angle;
  }
  writeFloat64(memory, p.VHFl0, length);
  writeFloat64(memory, p.VHFu0, scale);
  machine.X = LINO_DONE;
}

function panelRenderAddresses(linked) {
  let p = panelRenderAddressCaches.get(linked);
  if (p) return p;
  const names = [
    "VHPangle", "VHPradius", "VHPdoty", "VHPdotz", "VHPowner", "VHPbodyy",
    "VHPbodyz", "VHPsx0", "VHPsy0", "VHPsz0", "VHPsx1", "VHPsy1", "VHPsz1",
    "VHSx0", "VHSy0", "VHSz0", "VHSx1", "VHSy1", "VHSz1", "VHVangle",
    "VHVanglekey", "VHVsin", "VHVcos", "vhvsintab", "vhvcostab", "vhvtrigvalid",
    "VHPscan", "VHPowner", "VHPscoreindex", "VHPscore", "VHPminscore",
    "VHPmaxscore", "VHPscorespan", "VHPsysn", "VHPorbitn", "VHPorbitseg",
    "VHPprevy", "VHPprevz", "VHScolor", "nsnop", "nsnob", "nspowner",
    "nsporbray", "nsporideg",
  ];
  p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
  panelRenderAddressCaches.set(linked, p);
  return p;
}

function panelSincos(memory, p, angle) {
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  memory[p.VHVangle] = angle;
  memory[p.VHVanglekey] = normalized;
  if ((memory[p.vhvtrigvalid + normalized] | 0) === 0) {
    const radians = normalized * (Math.PI / 180);
    memory[p.vhvsintab + normalized] = float32Bits(Math.fround(Math.sin(radians)));
    memory[p.vhvcostab + normalized] = float32Bits(Math.fround(Math.cos(radians)));
    memory[p.vhvtrigvalid + normalized] = 1;
  }
  const sineBits = memory[p.vhvsintab + normalized] | 0;
  const cosineBits = memory[p.vhvcostab + normalized] | 0;
  memory[p.VHVsin] = sineBits;
  memory[p.VHVcos] = cosineBits;
  return [float32FromBits(sineBits), float32FromBits(cosineBits)];
}

function panelOrbitProject(machine, linked) {
  const memory = machine.memory;
  const p = panelRenderAddresses(linked);
  const [sine, cosine] = panelSincos(memory, p, memory[p.VHPangle] | 0);
  const radius = memory[p.VHPradius] | 0;
  memory[p.VHPdoty] = convertToInt32(sine * radius, floatingPoint(machine).control) - 45;
  memory[p.VHPdotz] = convertToInt32(cosine * radius, floatingPoint(machine).control) - 1935;
  machine.X = LINO_DONE;
}

function panelMoonProject(machine, linked) {
  const memory = machine.memory;
  const p = panelRenderAddresses(linked);
  const [sine, cosine] = panelSincos(memory, p, memory[p.VHPangle] | 0);
  const radius = memory[p.VHPradius] | 0;
  const owner = memory[p.VHPowner] | 0;
  memory[p.VHPdoty] = (memory[p.VHPbodyy + owner] | 0)
    + convertToInt32(sine * radius, floatingPoint(machine).control);
  memory[p.VHPdotz] = (memory[p.VHPbodyz + owner] | 0)
    + convertToInt32(cosine * radius, floatingPoint(machine).control);
  machine.X = LINO_DONE;
}

function panelIntegerStick(machine, linked) {
  const memory = machine.memory;
  const p = panelRenderAddresses(linked);
  const control = floatingPoint(machine).control;
  for (const [source, destination] of [
    [p.VHPsx0, p.VHSx0], [p.VHPsy0, p.VHSy0], [p.VHPsz0, p.VHSz0],
    [p.VHPsx1, p.VHSx1], [p.VHPsy1, p.VHSy1], [p.VHPsz1, p.VHSz1],
  ]) memory[destination] = float32Bits(roundFloat32(memory[source] | 0, control));
  stick3d(machine, linked);
  machine.X = LINO_DONE;
}

function panelDigitPrepare(machine, linked) {
  const memory = machine.memory;
  let p = panelDigitAddressCaches.get(linked);
  if (!p) {
    const names = [
      "VHPdigitskip", "VHPchar", "DGdigit", "DGcolor", "DGshader", "vhcpoly",
      "VHPcx4", "VHPGR", "VHPGL", "VHPQTR", "VHPTX", "VHPTY", "fw",
      "FSW0", "FSCAMX", "FSTX", "FSTY", "FI", "FA0", "FB0", "FS0", "PGFi", "PGFt",
      "PGtexf", "SPsrc", "SPtinta", "SPescr", "SPflar", "SPcull", "SPhalf",
      "VHPcol",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    panelDigitAddressCaches.set(linked, p);
  }
  const character = memory[p.VHPchar] | 0;
  memory[p.VHPdigitskip] = 1;
  machine.A = character;
  if ((character >>> 0) <= 32 || (character >>> 0) > 96) {
    machine.X = LINO_DONE;
    return;
  }
  memory[p.VHPdigitskip] = 0;
  memory[p.DGdigit] = character;
  memory[p.DGcolor] = 152;
  memory[p.DGshader] = 0;
  framebufferDigit(machine, linked);

  memory[p.vhcpoly] = p.VHPGR;
  memory[p.vhcpoly + 3] = p.VHPGR;
  memory[p.vhcpoly + 6] = p.VHPGL;
  memory[p.vhcpoly + 9] = p.VHPGL;
  memory[p.vhcpoly + 2] = 0;
  memory[p.vhcpoly + 5] = 0;
  memory[p.vhcpoly + 8] = 0;
  memory[p.vhcpoly + 11] = 0;

  const control = floatingPoint(machine).control;
  const cameraX = roundFloat32(
    (memory[p.VHPcx4] | 0) * float32FromBits(p.VHPQTR),
    control,
  );
  writeFloat64(memory, p.fw + p.FSW0 * 2, memory[p.VHPcx4] | 0);
  writeFloat64(memory, p.FB0, memory[p.VHPcx4] | 0);
  writeFloat64(memory, p.fw + p.FSCAMX * 2, cameraX);
  writeFloat64(memory, p.fw + p.FSTX * 2, p.VHPTX | 0);
  writeFloat64(memory, p.fw + p.FSTY * 2, p.VHPTY | 0);
  memory[p.FS0] = float32Bits(cameraX);
  memory[p.PGFt] = p.VHPQTR;
  memory[p.FI] = p.VHPTY | 0;
  writeFloat64(memory, p.FA0, p.VHPTY | 0);
  memory[p.PGFi] = p.FSTY;
  memory[p.PGtexf] = 4;
  memory[p.SPsrc] = 1;
  memory[p.SPtinta] = 128;
  memory[p.SPescr] = 0;
  memory[p.SPflar] = 2;
  memory[p.SPcull] = 0;
  memory[p.SPhalf] = 0;
  memory[p.VHPcol] = 128;
  machine.A = (p.fw + p.FSTY * 2) | 0;
  machine.X = LINO_DONE;
}

function panelMappedQuadLoad(machine, linked) {
  const memory = machine.memory;
  let p = panelMappedQuadAddressCaches.get(linked);
  if (!p) {
    p = {
      ...polymapAddresses(linked),
      VHPi: address(linked, "VHPi"),
      vhcpoly: address(linked, "vhcpoly"),
      PGFt: address(linked, "PGFt"),
    };
    panelMappedQuadAddressCaches.set(linked, p);
  }
  const slots = [p.FSINX, p.FSINY, p.FSINZ];
  for (let vertex = 0; vertex < 4; vertex += 1) {
    memory[p.VHPi] = vertex;
    const source = p.vhcpoly + vertex * 3;
    for (let axis = 0; axis < 3; axis += 1) {
      const slot = slots[axis] + vertex;
      const bits = memory[source + axis] | 0;
      memory[p.PGFi] = slot;
      memory[p.PGFt] = bits;
      memory[p.FS0] = bits;
      const converted = float32FromBits(bits);
      writeFloat64(memory, p.FA0, converted);
      writeFloat64(memory, p.fw + slot * 2, converted);
    }
  }
  memory[p.VHPi] = 4;
  machine.A = 4;
  machine.C = p.vhcpoly + 9;
  machine.X = LINO_DONE;
}

function panelSystemOrbits(machine, linked) {
  const memory = machine.memory;
  const p = panelRenderAddresses(linked);
  const bodyCount = memory[p.nsnop] | 0;
  const scoreAt = (index) => {
    const high = memory[p.nsporbray + index * 2 + 1] | 0;
    return ((((high >>> 20) & 0x7ff) - 1023) * 256) + ((high >>> 12) & 255);
  };
  memory[p.VHScolor] = 66;
  memory[p.VHPorbitn] = 0;
  for (let body = 0; body < bodyCount; body += 1) {
    memory[p.VHPsysn] = body;
    memory[p.VHPangle] = memory[p.nsporideg + body] | 0;
    let radius = 155;
    if (bodyCount !== 1) {
      const minimum = scoreAt(0);
      const maximum = scoreAt(bodyCount - 1);
      const current = scoreAt(body);
      const span = (maximum - minimum) | 0;
      memory[p.VHPscoreindex] = body;
      memory[p.VHPscore] = current;
      memory[p.VHPminscore] = minimum;
      memory[p.VHPmaxscore] = maximum;
      memory[p.VHPscorespan] = span;
      if (span > 0) radius = (Math.trunc(((current - minimum) * 205) / span) + 55) | 0;
    }
    memory[p.VHPradius] = radius;
    memory[p.VHPangle] = 0;
    panelOrbitProject(machine, linked);
    memory[p.VHPprevy] = memory[p.VHPdoty];
    memory[p.VHPprevz] = memory[p.VHPdotz];
    memory[p.VHPorbitseg] = 1;
    for (let segment = 1; segment <= 24; segment += 1) {
      memory[p.VHPangle] = segment * 15;
      panelOrbitProject(machine, linked);
      memory[p.VHPsx0] = 3520;
      memory[p.VHPsy0] = memory[p.VHPprevy];
      memory[p.VHPsz0] = memory[p.VHPprevz];
      memory[p.VHPsx1] = 3520;
      memory[p.VHPsy1] = memory[p.VHPdoty];
      memory[p.VHPsz1] = memory[p.VHPdotz];
      panelIntegerStick(machine, linked);
      memory[p.VHPprevy] = memory[p.VHPdoty];
      memory[p.VHPprevz] = memory[p.VHPdotz];
      memory[p.VHPorbitseg] = segment + 1;
    }
    memory[p.VHPorbitn] = body + 1;
  }
  machine.X = LINO_DONE;
}

function panelMoonScoreBounds(machine, linked) {
  const memory = machine.memory;
  const p = panelRenderAddresses(linked);
  const owner = memory[p.VHPowner] | 0;
  let minimum = memory[p.VHPminscore] | 0;
  let maximum = memory[p.VHPmaxscore] | 0;
  let scan = memory[p.VHPscan] | 0;
  const end = memory[p.nsnob] | 0;
  for (; scan < end; scan += 1) {
    if ((memory[p.nspowner + scan] | 0) !== owner) continue;
    const high = memory[p.nsporbray + scan * 2 + 1] | 0;
    const score = ((((high >>> 20) & 0x7ff) - 1023) * 256) + ((high >>> 12) & 255);
    memory[p.VHPscoreindex] = scan;
    memory[p.VHPscore] = score;
    if (score < minimum) minimum = score;
    if (score > maximum) maximum = score;
  }
  memory[p.VHPscan] = scan;
  memory[p.VHPminscore] = minimum;
  memory[p.VHPmaxscore] = maximum;
  machine.X = LINO_DONE;
}

function glassBubble(machine, linked) {
  const memory = machine.memory;
  let p = glassBubbleAddressCaches.get(linked);
  if (!p) {
    const names = [
      "nw", "rgt", "GBbubble", "GBmag", "GBcx", "GBcy", "GBdstreg", "SAr",
      "SArs", "SAtcx", "SAtcy", "SAdif", "SAx1", "SAy1", "SAx2", "SAy2",
      "SApx", "SApy", "SAcp", "SAp0", "SAp1", "SAp2", "SAp3", "SAavg",
      "GBt", "SFMAG", "SFRX", "SFRY", "SFRZ", "SFZ2",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    glassBubbleAddressCaches.set(linked, p);
  }
  if ((memory[p.GBbubble] | 0) === 0) {
    machine.X = LINO_DONE;
    return;
  }
  const magnitude = float32FromBits(memory[p.GBmag] | 0);
  let radius = Math.trunc(magnitude * 7.25) | 0;
  radius = (radius << 16) >> 16;
  memory[p.SAr] = radius;
  if (radius === 0) {
    machine.X = LINO_DONE;
    return;
  }
  const rx = magnitude * 110;
  const step = (1.2 * (Math.PI / 180)) / magnitude;
  let angle = 0.5 * step;
  const z2 = 0.833 * rx;
  writeFloat64(memory, address(linked, "fw") + p.SFMAG * 2, magnitude);
  writeFloat64(memory, address(linked, "fw") + p.SFRX * 2, rx);
  writeFloat64(memory, address(linked, "fw") + p.SFRY * 2, step);
  writeFloat64(memory, address(linked, "fw") + p.SFZ2 * 2, z2);
  const register = memory[p.GBdstreg] | 0;
  const page = p.nw + (memory[p.rgt + register * 4 + 1] >>> 0);
  const radiusSquared = Math.imul(radius, radius);
  memory[p.SArs] = radiusSquared;
  memory[p.SAdif] = 1;
  const smooth = (centerX, centerY) => {
    memory[p.SAtcx] = centerX;
    memory[p.SAtcy] = centerY;
    let x1 = centerX - radius;
    let y1 = centerY - radius;
    let x2 = centerX + radius;
    let y2 = centerY + radius;
    memory[p.SAx1] = x1;
    memory[p.SAy1] = y1;
    memory[p.SAx2] = x2;
    memory[p.SAy2] = y2;
    if (x1 > 318 || y1 > 198 || x2 < 0 || y2 < 0) return;
    if (y1 < 0) y1 = 0;
    if (x2 > 318) x2 = 318;
    if (y2 > 198) y2 = 198;
    memory[p.SAy1] = y1;
    memory[p.SAx2] = x2;
    memory[p.SAy2] = y2;
    let py = -radius;
    for (let y = y1; y <= y2; y += 1, py += 1) {
      let px = -radius;
      x1 = centerX - radius;
      if (x1 < 0) {
        px -= x1;
        x1 = 0;
      }
      let cp = (Math.imul(y, 320) + x1) & 0xffff;
      memory[p.SApx] = px;
      memory[p.SAx1] = x1;
      memory[p.SAcp] = cp;
      for (let x = x1; x <= x2; x += 1) {
        const pxSquared = Math.imul(px, px);
        memory[p.GBt] = pxSquared;
        if (pxSquared + Math.imul(py, py) < radiusSquared) {
          const a0 = page + ((cp + 4) & 0xffff);
          const a1 = page + ((cp + 5) & 0xffff);
          const a2 = page + ((cp + 324) & 0xffff);
          const a3 = page + ((cp + 325) & 0xffff);
          const v0 = memory[a0] & 255;
          const v1 = memory[a1] & 255;
          const v2 = memory[a2] & 255;
          const v3 = memory[a3] & 255;
          const average = ((v0 & 63) + (v1 & 63) + (v2 & 63) + (v3 & 63)) >>> 2;
          memory[a0] = (v0 & 192) | average;
          memory[a1] = (v1 & 192) | average;
          memory[a2] = (v2 & 192) | average;
          memory[a3] = (v3 & 192) | average;
          memory[p.SAcp] = cp;
          memory[p.SAp0] = v0;
          memory[p.SAp1] = v1;
          memory[p.SAp2] = v2;
          memory[p.SAp3] = v3;
          memory[p.SAavg] = average;
        }
        cp = (cp + 1) & 0xffff;
        px += 1;
        memory[p.SAcp] = cp;
        memory[p.SApx] = px;
        memory[p.SAx1] = x + 1;
      }
      memory[p.SApy] = py + 1;
      memory[p.SAy1] = y + 1;
    }
  };
  while (angle < Math.PI * 2) {
    // The original casts each trigonometric displacement to long before it
    // adds the integer centre.  Truncating the final sum is one pixel lower
    // whenever the displacement is a negative fraction.
    const centerX = (memory[p.GBcx] + Math.trunc(rx * Math.cos(angle))) | 0;
    const centerY = (memory[p.GBcy] + Math.trunc(z2 * Math.sin(angle))) | 0;
    smooth(centerX, centerY);
    angle += step;
  }
  writeFloat64(memory, address(linked, "fw") + p.SFRZ * 2, angle);
  machine.X = LINO_DONE;
}

function float64FromWords(low, high) {
  float64Scratch.setInt32(0, low | 0, true);
  float64Scratch.setInt32(4, high | 0, true);
  return float64Scratch.getFloat64(0, true);
}

function bodyVector(machine, linked) {
  const memory = machine.memory;
  let p = bodyVectorAddressCaches.get(linked);
  if (!p) {
    const names = [
      "VHGNDvecindex", "VHGNDvecowner", "VHGNDmass0", "VHGNDorbit0",
      "VHGNDangle0", "VHGNDsin0", "VHGNDcos0", "VHGNDct0", "VHGNDxx0",
      "VHGNDzz0", "VHGNDso0", "VHGNDco0", "VHGNDvecx0", "VHGNDvecy0",
      "VHGNDvecz0", "nsstarray", "nspowner", "nspray", "nsporbray",
      "nsporbtlt", "nsporbecc", "nspororient", "SUsec0",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    bodyVectorAddressCaches.set(linked, p);
  }
  const index = memory[p.VHGNDvecindex] | 0;
  const secondsLow = memory[p.SUsec0] | 0;
  const secondsHigh = memory[p.SUsec0 + 1] | 0;
  const owner = memory[p.nspowner + index] | 0;
  const massAddress = owner < 0 ? p.nsstarray : p.nspray + owner * 2;
  const orbitAddress = p.nsporbray + index * 2;
  const tiltAddress = p.nsporbtlt + index * 2;
  const eccentricityAddress = p.nsporbecc + index * 2;
  const orientationAddress = p.nspororient + index * 2;
  const signature = [
    secondsLow, secondsHigh, owner,
    memory[massAddress] | 0, owner < 0 ? 0 : memory[massAddress + 1] | 0,
    memory[orbitAddress] | 0, memory[orbitAddress + 1] | 0,
    memory[tiltAddress] | 0, memory[tiltAddress + 1] | 0,
    memory[eccentricityAddress] | 0, memory[eccentricityAddress + 1] | 0,
    memory[orientationAddress] | 0, memory[orientationAddress + 1] | 0,
  ];
  let cache = bodyVectorValueCaches.get(linked);
  if (!cache) {
    cache = new Map();
    bodyVectorValueCaches.set(linked, cache);
  }
  let result = cache.get(index);
  if (!result || signature.some((word, position) => word !== result.signature[position])) {
    const baseMass = owner < 0
      ? float32FromBits(memory[p.nsstarray] | 0)
      : readFloat64(memory, p.nspray + owner * 2);
    let mass = baseMass * baseMass;
    mass *= baseMass;
    mass *= owner < 0
      ? float64FromWords(0xa01627ee, 0x3e31fd9f)
      : float64FromWords(0x1735c01d, 0x3f28284f);
    const orbit = readFloat64(memory, orbitAddress);
    const seconds = float64FromWords(secondsLow, secondsHigh);
    let angle = Math.sqrt(mass / (orbit * orbit));
    angle *= seconds;
    angle *= Math.PI;
    angle /= 180;
    const sine = Math.sin(angle);
    const cosine = Math.cos(angle);
    const tiltRadians = readFloat64(memory, tiltAddress) * (Math.PI / 180);
    const tiltSine = Math.sin(tiltRadians);
    const y = tiltSine * orbit;
    const tiltCosine = Math.cos(tiltRadians);
    const xx = -(sine * orbit * tiltCosine);
    const eccentricity = readFloat64(memory, eccentricityAddress);
    const zz = cosine * orbit * tiltCosine * eccentricity;
    const orientation = readFloat64(memory, orientationAddress);
    const orientationSine = Math.sin(orientation);
    const orientationCosine = Math.cos(orientation);
    const x = xx * orientationCosine + zz * orientationSine;
    const z = zz * orientationCosine - xx * orientationSine;
    result = {
      signature,
      owner, mass, orbit, angle, sine, cosine, tiltCosine, xx, zz,
      orientationSine, orientationCosine, x, y, z,
    };
    cache.set(index, result);
  }
  memory[p.VHGNDvecowner] = result.owner;
  writeFloat64(memory, p.VHGNDmass0, result.mass);
  writeFloat64(memory, p.VHGNDorbit0, result.orbit);
  writeFloat64(memory, p.VHGNDangle0, result.angle);
  writeFloat64(memory, p.VHGNDsin0, result.sine);
  writeFloat64(memory, p.VHGNDcos0, result.cosine);
  writeFloat64(memory, p.VHGNDct0, result.tiltCosine);
  writeFloat64(memory, p.VHGNDxx0, result.xx);
  writeFloat64(memory, p.VHGNDzz0, result.zz);
  writeFloat64(memory, p.VHGNDso0, result.orientationSine);
  writeFloat64(memory, p.VHGNDco0, result.orientationCosine);
  writeFloat64(memory, p.VHGNDvecx0, result.x);
  writeFloat64(memory, p.VHGNDvecy0, result.y);
  writeFloat64(memory, p.VHGNDvecz0, result.z);
  machine.X = LINO_DONE;
}

function rectangleAddresses(linked) {
  let cached = rectangleAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "Rectangle Target Layer", "Rectangle Display Alignment", "Rectangle Bounds",
    "Rectangle Gradients", "Rectangle Effect", "RECT H Start Red", "RECT H Start Green",
    "RECT H Start Blue", "RECT H Delta Red", "RECT H Delta Green", "RECT H Delta Blue",
    "RECT V Start Red", "RECT V Start Green", "RECT V Start Blue", "RECT V Delta Red",
    "RECT V Delta Green", "RECT V Delta Blue", "RECT Pixels", "RECT Scanlines",
    "RECT Display Pointer", "FX Transparent Color", "FX Filter Color", "Display Width",
    "Shadow Layer Mask",
  ];
  cached = Object.fromEntries(names.map((name) => [canonicalName(name), address(linked, name)]));
  rectangleAddressCaches.set(linked, cached);
  return cached;
}

function pixelEffects(linked) {
  let cached = pixelEffectCaches.get(linked);
  if (cached) return cached;
  cached = new Map();
  const add = (kind, names, transparent = false) => {
    for (const name of names) {
      const handle = codeHandle(linked, name);
      if (handle >= 0) cached.set(handle, { kind, transparent });
    }
  };
  add("null", ["service FX Null"]);
  add("raw", ["service FX Raw"]);
  add("raw", ["service FX Superimpose"], true);
  add("negate", ["service FX Negate"]);
  add("negate", ["service FX Negate Superimpose"], true);
  add("semi", ["service FX Semi Transparent"]);
  add("semi", ["service FX Semi Transparent Superimpose"], true);
  add("light", ["service FX Alpha Light", "service FX Alpha Lit"]);
  add("light", ["service FX Alpha Light Superimpose", "service FX Alpha Lit Superimpose"], true);
  add("dim", ["service FX Alpha Dim"]);
  add("dim", ["service FX Alpha Dim Superimpose"], true);
  add("filter", ["service FX Filter"]);
  add("filter", ["service FX Filter Superimpose"], true);
  add("filterLight", ["service FX Filter Alpha Light", "service FX Filter Alpha Lit"]);
  add("filterLight", ["service FX Filter Alpha Light Superimpose", "service FX Filter Alpha Lit Superimpose"], true);
  add("filterDim", ["service FX Filter Alpha Dim"]);
  add("filterDim", ["service FX Filter Alpha Dim Superimpose"], true);
  add("glow", ["service FX Glow"]);
  add("glow", ["service FX Glow Superimpose"], true);
  add("smooth", ["service FX Smooth"]);
  add("smooth", ["service FX Smooth Superimpose"], true);
  add("doubleSmooth", ["service FX DoubleStrike Smooth"]);
  add("doubleSmooth", ["service FX DoubleStrike Smooth Superimpose"], true);
  add("aaLight", ["service FX Antialiasing Lit"]);
  add("aaLight", ["service FX Antialiasing Lit Superimpose"], true);
  add("aaDim", ["service FX Antialiasing Dim"]);
  add("aaDim", ["service FX Antialiasing Dim Superimpose"], true);
  add("doubleAaLight", ["service FX Doublestrike Antialiasing Lit"]);
  add("doubleAaLight", ["service FX Doublestrike Antialiasing Lit Superimpose"], true);
  add("doubleAaDim", ["service FX Doublestrike Antialiasing Dim"]);
  add("doubleAaDim", ["service FX Doublestrike Antialiasing Dim Superimpose"], true);
  add("shadow", ["service FX Shadow"]);
  pixelEffectCaches.set(linked, cached);
  return cached;
}

function pixelAlphaLight(background, foreground) {
  const blue = Math.min((background & 0xff) + (foreground & 0xff), 0xff);
  const green = Math.min((background & 0xff00) + (foreground & 0xff00), 0xff00);
  const red = Math.min((background & 0xff0000) + (foreground & 0xff0000), 0xff0000);
  return blue | green | red;
}

function pixelAlphaDim(background, foreground) {
  const blue = Math.max((background & 0xff) - (foreground & 0xff), 0);
  const green = Math.max((background & 0xff00) - (foreground & 0xff00), 0);
  const red = Math.max((background & 0xff0000) - (foreground & 0xff0000), 0);
  return blue | green | red;
}

function applyPixelEffect(memory, linked, p, handle, pointer, color) {
  if (handle === 0) return;
  const effect = pixelEffects(linked).get(handle);
  if (!effect) throw new RangeError(`Unsupported Rectangle pixel effect handle ${handle}`);
  if (effect.transparent && color === (memory[p.fxtransparentcolor] | 0)) return;
  const width = memory[p.displaywidth] | 0;
  const alpha = (at, amount, light) => {
    memory[at] = light
      ? pixelAlphaLight(memory[at] | 0, amount)
      : pixelAlphaDim(memory[at] | 0, amount);
  };
  const smooth = (at, amount) => {
    amount = ((amount & 0xfcfcfc) >>> 2) | 0;
    const above = (memory[at - width] & 0xfcfcfc) >>> 2;
    const upperLeft = (memory[at - width - 1] & 0xfcfcfc) >>> 2;
    const upperRight = (memory[at - width + 1] & 0xfcfcfc) >>> 2;
    memory[at] = (amount + above + upperLeft + upperRight) | 0;
  };
  const antialias = (at, amount, light) => {
    alpha(at, amount, light);
    amount = (amount & 0xf0f0f0) >>> 4;
    alpha(at - 1, amount, light); alpha(at + 1, amount, light);
    alpha(at - width, amount, light); alpha(at + width, amount, light);
  };
  switch (effect.kind) {
    case "null": break;
    case "raw": memory[pointer] = color; break;
    case "negate": memory[pointer] = ~memory[pointer]; break;
    case "semi": memory[pointer] = (((color & 0xfefefe) >>> 1)
      + ((memory[pointer] & 0xfefefe) >>> 1)) | 0; break;
    case "light": alpha(pointer, color, true); break;
    case "dim": alpha(pointer, color, false); break;
    case "filter": memory[pointer] = (((color & 0xfefefe) >>> 1)
      + ((memory[p.fxfiltercolor] & 0xfefefe) >>> 1)) | 0; break;
    case "filterLight": memory[pointer] = pixelAlphaLight(color, memory[p.fxfiltercolor] | 0); break;
    case "filterDim": memory[pointer] = pixelAlphaDim(color, memory[p.fxfiltercolor] | 0); break;
    case "glow": {
      memory[pointer] = color;
      const half = (color & 0xfefefe) >>> 1;
      for (const at of [pointer - 1, pointer + 1, pointer - width, pointer + width]) {
        memory[at] = (((memory[at] & 0xfefefe) >>> 1) + half) | 0;
      }
      break;
    }
    case "smooth": smooth(pointer, color); break;
    case "doubleSmooth":
      for (const at of [pointer + 1, pointer - 1, pointer + width, pointer - width, pointer]) smooth(at, color);
      break;
    case "aaLight": antialias(pointer, color, true); break;
    case "aaDim": antialias(pointer, color, false); break;
    case "doubleAaLight": {
      const quarter = (color & 0xfcfcfc) >>> 2;
      antialias(pointer, quarter, true);
      const half = (color & 0xfefefe) >>> 1;
      for (const at of [pointer - 1, pointer + 1, pointer - width, pointer + width]) antialias(at, half, true);
      break;
    }
    case "doubleAaDim": {
      const quarter = (color & 0xfcfcfc) >>> 2;
      antialias(pointer, quarter, false);
      const half = (color & 0xfefefe) >>> 1;
      for (const at of [pointer - 1, pointer + 1, pointer - width, pointer + width]) antialias(at, half, false);
      break;
    }
    case "shadow": {
      const background = memory[pointer] | 0;
      const layerMask = memory[p.shadowlayermask] | 0;
      if ((background & layerMask) !== 0) break;
      const blue = Math.max((background & 0xff) - (color & 0xff), 0);
      const green = Math.max((background & 0xff00) - (color & 0xff00), 0);
      const red = Math.max((background & 0xff0000) - (color & 0xff0000), 0);
      memory[pointer] = (blue | green | red | (background & 0xff000000) | layerMask) | 0;
      break;
    }
    default: throw new RangeError(`Unsupported Rectangle pixel effect ${effect.kind}`);
  }
}

function rectanglePixelWriter(memory, p, effect) {
  const width = memory[p.displaywidth] | 0;
  const alphaLight = (pointer, color) => {
    memory[pointer] = pixelAlphaLight(memory[pointer] | 0, color);
  };
  const alphaDim = (pointer, color) => {
    memory[pointer] = pixelAlphaDim(memory[pointer] | 0, color);
  };
  const smooth = (pointer, color) => {
    const amount = (color & 0xfcfcfc) >>> 2;
    const above = (memory[pointer - width] & 0xfcfcfc) >>> 2;
    const upperLeft = (memory[pointer - width - 1] & 0xfcfcfc) >>> 2;
    const upperRight = (memory[pointer - width + 1] & 0xfcfcfc) >>> 2;
    memory[pointer] = (amount + above + upperLeft + upperRight) | 0;
  };
  const antialiasLight = (pointer, color) => {
    alphaLight(pointer, color);
    const amount = (color & 0xf0f0f0) >>> 4;
    alphaLight(pointer - 1, amount); alphaLight(pointer + 1, amount);
    alphaLight(pointer - width, amount); alphaLight(pointer + width, amount);
  };
  const antialiasDim = (pointer, color) => {
    alphaDim(pointer, color);
    const amount = (color & 0xf0f0f0) >>> 4;
    alphaDim(pointer - 1, amount); alphaDim(pointer + 1, amount);
    alphaDim(pointer - width, amount); alphaDim(pointer + width, amount);
  };
  let write;
  switch (effect.kind) {
    case "null": write = () => {}; break;
    case "raw": write = (pointer, color) => { memory[pointer] = color; }; break;
    case "negate": write = (pointer) => { memory[pointer] = ~memory[pointer]; }; break;
    case "semi": write = (pointer, color) => {
      memory[pointer] = (((color & 0xfefefe) >>> 1)
        + ((memory[pointer] & 0xfefefe) >>> 1)) | 0;
    }; break;
    case "light": write = alphaLight; break;
    case "dim": write = alphaDim; break;
    case "filter": write = (pointer, color) => {
      memory[pointer] = (((color & 0xfefefe) >>> 1)
        + ((memory[p.fxfiltercolor] & 0xfefefe) >>> 1)) | 0;
    }; break;
    case "filterLight": write = (pointer, color) => {
      memory[pointer] = pixelAlphaLight(color, memory[p.fxfiltercolor] | 0);
    }; break;
    case "filterDim": write = (pointer, color) => {
      memory[pointer] = pixelAlphaDim(color, memory[p.fxfiltercolor] | 0);
    }; break;
    case "glow": write = (pointer, color) => {
      memory[pointer] = color;
      const half = (color & 0xfefefe) >>> 1;
      for (const at of [pointer - 1, pointer + 1, pointer - width, pointer + width]) {
        memory[at] = (((memory[at] & 0xfefefe) >>> 1) + half) | 0;
      }
    }; break;
    case "smooth": write = smooth; break;
    case "doubleSmooth": write = (pointer, color) => {
      smooth(pointer + 1, color); smooth(pointer - 1, color);
      smooth(pointer + width, color); smooth(pointer - width, color); smooth(pointer, color);
    }; break;
    case "aaLight": write = antialiasLight; break;
    case "aaDim": write = antialiasDim; break;
    case "doubleAaLight": write = (pointer, color) => {
      const quarter = (color & 0xfcfcfc) >>> 2;
      const half = (color & 0xfefefe) >>> 1;
      antialiasLight(pointer, quarter);
      antialiasLight(pointer - 1, half); antialiasLight(pointer + 1, half);
      antialiasLight(pointer - width, half); antialiasLight(pointer + width, half);
    }; break;
    case "doubleAaDim": write = (pointer, color) => {
      const quarter = (color & 0xfcfcfc) >>> 2;
      const half = (color & 0xfefefe) >>> 1;
      antialiasDim(pointer, quarter);
      antialiasDim(pointer - 1, half); antialiasDim(pointer + 1, half);
      antialiasDim(pointer - width, half); antialiasDim(pointer + width, half);
    }; break;
    default: throw new RangeError(`Unsupported Rectangle pixel effect ${effect.kind}`);
  }
  if (!effect.transparent) return write;
  return (pointer, color) => {
    if (color !== (memory[p.fxtransparentcolor] | 0)) write(pointer, color);
  };
}

function rectangle(machine, linked) {
  const memory = machine.memory;
  const p = rectangleAddresses(linked);
  const target = memory[p.rectangletargetlayer] >>> 0;
  const bounds = memory[p.rectanglebounds] >>> 0;
  if (target === 0 || bounds === 0) { machine.X = LINO_FAIL; return; }
  const gradients = memory[p.rectanglegradients] >>> 0;
  const alignment = memory[p.rectangledisplayalignment] | 0;
  const left = memory[bounds] | 0;
  const top = memory[bounds + 1] | 0;
  const pixels = ((memory[bounds + 2] | 0) - left + 1) | 0;
  const scanlines = ((memory[bounds + 3] | 0) - top + 1) | 0;
  const f32 = (at) => float32FromBits(memory[at]);
  const bits = (number) => float32Bits(Math.fround(number));
  const horizontalValues = [0, 1, 2].map((axis) => Math.fround(
    Math.fround(f32(gradients + 3 + axis) - f32(gradients + axis)) / Math.fround(pixels),
  ));
  const verticalValues = [0, 1, 2].map((axis) => Math.fround(
    Math.fround(f32(gradients + 6 + axis) - f32(gradients + axis)) / Math.fround(scanlines),
  ));
  const horizontal = horizontalValues.map(bits);
  const vertical = verticalValues.map(bits);
  const start = [f32(gradients), f32(gradients + 1), f32(gradients + 2)];
  const names = ["red", "green", "blue"];
  for (let axis = 0; axis < 3; axis += 1) {
    memory[p[`recthdelta${names[axis]}`]] = horizontal[axis];
    memory[p[`rectvdelta${names[axis]}`]] = vertical[axis];
    memory[p[`rectvstart${names[axis]}`]] = bits(start[axis]);
  }
  memory[p.rectpixels] = pixels;
  memory[p.rectscanlines] = scanlines;
  let pointer = (target + top * alignment + left) >>> 0;
  const verticalStart = start.slice();
  const effect = memory[p.rectangleeffect] | 0;
  const effectDescriptor = pixelEffects(linked).get(effect);
  if (!effectDescriptor) throw new RangeError(`Unsupported Rectangle pixel effect handle ${effect}`);
  const raw = effectDescriptor.kind === "raw" && !effectDescriptor.transparent;
  const writePixel = raw ? null : rectanglePixelWriter(memory, p, effectDescriptor);
  const constantRows = horizontalValues.every((channel) => channel === 0);
  const channelByte = (channel) => Math.max(0, Math.min(255,
    nearestEven(Math.fround(channel * 255)),
  ));
  for (let y = 0; y < scanlines; y += 1) {
    let red = verticalStart[0];
    let green = verticalStart[1];
    let blue = verticalStart[2];
    memory[p.rectdisplaypointer] = pointer;
    memory[p.recthstartred] = bits(red);
    memory[p.recthstartgreen] = bits(green);
    memory[p.recthstartblue] = bits(blue);
    if (raw && constantRows) {
      const color = (channelByte(red) << 16) | (channelByte(green) << 8) | channelByte(blue);
      memory.fill(color, pointer, pointer + pixels);
      pointer += pixels;
    } else {
      for (let x = 0; x < pixels; x += 1) {
        const color = (channelByte(red) << 16) | (channelByte(green) << 8) | channelByte(blue);
        if (raw) memory[pointer] = color;
        else writePixel(pointer, color);
        pointer += 1;
        red = Math.fround(red + horizontalValues[0]);
        green = Math.fround(green + horizontalValues[1]);
        blue = Math.fround(blue + horizontalValues[2]);
      }
    }
    pointer += alignment - pixels;
    for (let axis = 0; axis < 3; axis += 1) {
      verticalStart[axis] = Math.fround(verticalStart[axis] + verticalValues[axis]);
    }
  }
  memory[p.rectdisplaypointer] = pointer;
  memory[p.rectpixels] = pixels;
  memory[p.rectscanlines] = 0;
  machine.X = LINO_DONE;
}

function tgaAddresses(linked) {
  let cached = tgaAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "TGA Target Layer", "TGA Picture Data", "TGA Display Alignment", "TGA Display Width",
    "TGA Display Height", "TGA Picture Left", "TGA Picture Top", "TGA Effect",
    "Bit Stream Pointer", "Starting Bit Number", "Bit Field Size", "Bit Field Content",
    "LTP Pixels", "LTP Scanlines", "LTP Current Pixel", "LTP Current Scanline",
    "LTP Current Pixel Pointer", "LTP Reverse Horiz", "LTP Forward Vert",
    "LTP Bit Field Delta X", "LTP Bit Field Delta Y", "LTP ID Block Size",
    "LTP Header Data", "LTP Colormap Size", "LTP Colormap Data",
  ];
  cached = Object.fromEntries(names.map((name) => [canonicalName(name), address(linked, name)]));
  tgaAddressCaches.set(linked, cached);
  return cached;
}

function getPackedBits(memory, stream, bit, size) {
  const offset = bit & 31;
  const unit = bit >>> 5;
  let output = memory[stream + unit] >>> offset;
  if (offset + size > 32) output |= memory[stream + unit + 1] << (32 - offset);
  const trim = (32 - size) & 31;
  return (output << trim) >>> trim;
}

function loadTgaPicture(machine, linked) {
  const memory = machine.memory;
  const p = tgaAddresses(linked);
  const effects = rectangleAddresses(linked);
  const target = memory[p.tgatargetlayer] >>> 0;
  const data = memory[p.tgapicturedata] >>> 0;
  machine.X = LINO_FAIL;
  if (target === 0 || data === 0) return;
  const h0 = memory[data] >>> 0;
  const h1 = memory[data + 1] >>> 0;
  const h3 = memory[data + 3] >>> 0;
  const h4 = memory[data + 4] >>> 0;
  memory[p.ltpheaderdata] = h0;
  memory[p.ltpheaderdata + 1] = h1;
  memory[p.ltpheaderdata + 3] = h3;
  memory[p.ltpheaderdata + 4] = h4;
  const idBytes = h0 & 0xff;
  const type = (h0 >>> 16) & 0xff;
  if (type !== 1 && type !== 2) return;
  let paletteSize = 0;
  let bit = (idBytes + 18) * 8;
  const palette = p.ltpcolormapdata;
  if (type === 1) {
    if ((h0 & 0x100) === 0) return;
    paletteSize = (h1 >>> 8) & 0xffff;
    const first = h0 >>> 24;
    if (paletteSize > 256 || first + paletteSize > 256 || (h1 >>> 24) !== 24) return;
    for (let index = 0; index < paletteSize; index += 1) {
      const color = getPackedBits(memory, data, bit, 24);
      memory[p.bitfieldcontent] = color;
      memory[palette + first + index] = color;
      bit += 24;
    }
  } else if ((h0 & 0x100) !== 0) return;
  const pixels = h3 & 0xffff;
  const scanlines = h3 >>> 16;
  const depth = h4 & 0xff;
  if (depth !== 8 && depth !== 24 && depth !== 32) return;
  const reverse = (h4 >>> 12) & 1;
  const forward = (h4 >>> 13) & 1;
  let deltaX = depth;
  if (reverse) {
    bit += (pixels - 1) * depth;
    deltaX = -depth;
  }
  let deltaY = pixels * depth;
  if (!forward) {
    bit += (scanlines - 1) * pixels * depth;
    deltaY = -deltaY;
  }
  const left = memory[p.tgapictureleft] | 0;
  const top = memory[p.tgapicturetop] | 0;
  const alignment = memory[p.tgadisplayalignment] | 0;
  const displayWidth = memory[p.tgadisplaywidth] | 0;
  const displayHeight = memory[p.tgadisplayheight] | 0;
  const effect = memory[p.tgaeffect] | 0;
  let rowPointer = (target + top * alignment + left) >>> 0;
  let rowBit = bit;
  memory[p.bitstreampointer] = data;
  memory[p.startingbitnumber] = rowBit;
  memory[p.bitfieldsize] = depth;
  memory[p.ltppixels] = pixels;
  memory[p.ltpscanlines] = scanlines;
  memory[p.ltpcurrentpixelpointer] = rowPointer;
  memory[p.ltpcurrentpixel] = left;
  memory[p.ltpcurrentscanline] = top;
  for (let row = 0; row < scanlines; row += 1) {
    const y = top + row;
    if (y >= displayHeight) break;
    if (y >= 0 && y < displayHeight) {
      let pixelBit = rowBit;
      let pointer = rowPointer;
      let currentPixel = left;
      memory[p.ltpcurrentpixel] = currentPixel;
      for (let column = 0; column < pixels; column += 1) {
        const x = left + column;
        if (x >= displayWidth || x >= alignment) break;
        if (x >= 0) {
          let color = getPackedBits(memory, data, pixelBit, depth);
          memory[p.bitfieldcontent] = color;
          if (depth <= 8) color = memory[palette + color] | 0;
          applyPixelEffect(memory, linked, effects, effect, pointer, color);
        }
        pixelBit += deltaX;
        pointer += 1;
        currentPixel += 1;
        memory[p.ltpcurrentpixel] = currentPixel;
      }
    }
    rowBit += deltaY;
    rowPointer += alignment;
    memory[p.startingbitnumber] = rowBit;
    memory[p.ltpcurrentpixelpointer] = rowPointer;
    memory[p.ltpcurrentscanline] = y + 1;
  }
  memory[p.startingbitnumber] = rowBit;
  memory[p.ltpreversehoriz] = reverse;
  memory[p.ltpforwardvert] = forward;
  memory[p.ltpbitfielddeltax] = deltaX;
  memory[p.ltpbitfielddeltay] = deltaY;
  memory[p.ltpidblocksize] = idBytes;
  memory[p.ltpcolormapsize] = type === 1 ? paletteSize * 3 : 0;
  machine.X = LINO_DONE;
}

const tileRegionAddressCaches = new WeakMap();

function tileRegionAddresses(linked) {
  let cached = tileRegionAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "TR Bounds", "TR Picture Data", "TR Target Layer", "TR Display Alignment", "TR Effect",
    "TGA Effect", "TGA Target Layer", "TGA Display Alignment", "TGA Display Width",
    "TGA Display Height", "TGA Picture Data", "TGA Picture Left", "TGA Picture Top",
    "LTP Pixels", "LTP Scanlines",
  ];
  cached = Object.fromEntries(names.map((name) => [canonicalName(name), address(linked, name)]));
  tileRegionAddressCaches.set(linked, cached);
  return cached;
}

function tileRegion(machine, linked) {
  const memory = machine.memory;
  const p = tileRegionAddresses(linked);
  const bounds = memory[p.trbounds] >>> 0;
  if (bounds === 0 || bounds + 3 >= memory.length) {
    machine.X = LINO_DONE;
    return;
  }
  const saved = [
    p.tgaeffect, p.tgatargetlayer, p.tgadisplayalignment, p.tgadisplaywidth,
    p.tgadisplayheight, p.tgapicturedata, p.tgapictureleft, p.tgapicturetop,
  ].map((location) => memory[location] | 0);
  const left = memory[bounds] | 0;
  const top = memory[bounds + 1] | 0;
  const right = memory[bounds + 2] | 0;
  const bottom = memory[bounds + 3] | 0;
  memory[p.tgaeffect] = memory[p.treffect] | 0;
  memory[p.tgatargetlayer] = memory[p.trtargetlayer] | 0;
  memory[p.tgadisplayalignment] = memory[p.trdisplayalignment] | 0;
  memory[p.tgadisplaywidth] = (right + 1) | 0;
  memory[p.tgadisplayheight] = (bottom + 1) | 0;
  memory[p.tgapicturedata] = memory[p.trpicturedata] | 0;
  memory[p.tgapictureleft] = left;
  memory[p.tgapicturetop] = top;
  machine.A = bounds | 0;
  const effect = pixelEffects(linked).get(memory[p.tgaeffect] | 0);
  if (effect?.kind === "raw" && !effect.transparent && left >= 0 && top >= 0) {
    loadTgaPicture(machine, linked);
    const pixels = memory[p.ltppixels] | 0;
    const scanlines = memory[p.ltpscanlines] | 0;
    const alignment = memory[p.tgadisplayalignment] | 0;
    const displayWidth = memory[p.tgadisplaywidth] | 0;
    const displayHeight = memory[p.tgadisplayheight] | 0;
    if (machine.X === LINO_DONE && pixels > 0 && scanlines > 0
        && left + pixels <= displayWidth && left + pixels <= alignment
        && top + scanlines <= displayHeight) {
      const tile = new Int32Array(pixels * scanlines);
      for (let row = 0; row < scanlines; row += 1) {
        const source = (memory[p.tgatargetlayer] >>> 0) + (top + row) * alignment + left;
        tile.set(memory.subarray(source, source + pixels), row * pixels);
      }
      let lastLeft = left;
      let lastTop = top;
      for (let tileTop = top; tileTop <= bottom; tileTop += scanlines) {
        lastTop = tileTop;
        const rows = Math.min(scanlines, bottom + 1 - tileTop);
        for (let tileLeft = left; tileLeft <= right; tileLeft += pixels) {
          lastLeft = tileLeft;
          const columns = Math.min(pixels, right + 1 - tileLeft, alignment - tileLeft);
          if (columns <= 0) continue;
          for (let row = 0; row < rows; row += 1) {
            const destination = (memory[p.tgatargetlayer] >>> 0)
              + (tileTop + row) * alignment + tileLeft;
            memory.set(tile.subarray(row * pixels, row * pixels + columns), destination);
          }
        }
      }
      // Re-run only the final tile so the documented TGA/LTP scratch state is
      // identical to the source loop as well as the visible region.
      memory[p.tgapictureleft] = lastLeft;
      memory[p.tgapicturetop] = lastTop;
      loadTgaPicture(machine, linked);
      [
        p.tgaeffect, p.tgatargetlayer, p.tgadisplayalignment, p.tgadisplaywidth,
        p.tgadisplayheight, p.tgapicturedata, p.tgapictureleft, p.tgapicturetop,
      ].forEach((location, index) => { memory[location] = saved[index]; });
      machine.X = LINO_DONE;
      return;
    }
    memory[p.tgapictureleft] = left;
    memory[p.tgapicturetop] = top;
  }
  let stop = false;
  while (!stop) {
    memory[p.tgapictureleft] = left;
    while (true) {
      loadTgaPicture(machine, linked);
      const pixels = memory[p.ltppixels] | 0;
      const scanlines = memory[p.ltpscanlines] | 0;
      if (pixels <= 0 || scanlines <= 0) {
        stop = true;
        break;
      }
      const nextLeft = ((memory[p.tgapictureleft] | 0) + pixels) | 0;
      memory[p.tgapictureleft] = nextLeft;
      if (nextLeft > right) break;
    }
    if (stop) break;
    const nextTop = ((memory[p.tgapicturetop] | 0) + (memory[p.ltpscanlines] | 0)) | 0;
    memory[p.tgapicturetop] = nextTop;
    if (nextTop > bottom) break;
  }
  [
    p.tgaeffect, p.tgatargetlayer, p.tgadisplayalignment, p.tgadisplaywidth,
    p.tgadisplayheight, p.tgapicturedata, p.tgapictureleft, p.tgapicturetop,
  ].forEach((location, index) => { memory[location] = saved[index]; });
  machine.X = LINO_DONE;
}

function textAddresses(linked) {
  let cached = textAddressCaches.get(linked);
  if (cached) return cached;
  const names = [
    "String", "Ink", "Text X", "Text Y", "Text Effect", "Text Display Width",
    "Text Display Height", "Text Display Origin", "Text Region", "Text Window",
    "Text Word Wrap", "Text Ghost Mode", "Text TAB Size", "Text Intercharspacing",
    "Text Interlinespacing", "Text Highlight Start", "Text Highlight Stop",
    "STD Font Alignment", "STD Font Body", "STD Font Width", "STD Font Shape",
    "Width Of Latest Form", "Height Of Latest Form", "STD HL", "STD Current character X",
    "STD Current character Y", "STD Offset to current character in string", "STD Dot X",
    "STD Dot Y", "STD Stop X", "STD Stop Y", "STD Current shape unit", "STD Dot Mask",
    "STD Window Left", "STD Window Top", "STD Window Right", "STD Window Bottom",
    "STD Prescent X", "STD Prescent offset", "STD Width Correction", "STD Height Correction",
  ];
  cached = Object.fromEntries(names.map((name) => [canonicalName(name), address(linked, name)]));
  textAddressCaches.set(linked, cached);
  return cached;
}

function rotateLeft32(value, count) {
  count &= 31;
  return count === 0 ? value | 0 : ((value << count) | (value >>> (32 - count))) | 0;
}

function rotateRight32(value, count) {
  count &= 31;
  return count === 0 ? value | 0 : ((value >>> count) | (value << (32 - count))) | 0;
}

function standardText(machine, linked) {
  const memory = machine.memory;
  const p = textAddresses(linked);
  const effects = rectangleAddresses(linked);
  const string = memory[p.string] >>> 0;
  const origin = memory[p.textdisplayorigin] >>> 0;
  const displayWidth = memory[p.textdisplaywidth] | 0;
  const displayHeight = memory[p.textdisplayheight] | 0;
  memory[p.widthoflatestform] = 0;
  memory[p.heightoflatestform] = 0;
  if (string === 0 || origin === 0 || displayWidth <= 0 || displayHeight <= 0) {
    machine.X = LINO_FAIL;
    return;
  }
  const fontWidth = memory[p.stdfontwidth] | 0;
  const fontBody = memory[p.stdfontbody] | 0;
  const fontAlignment = memory[p.stdfontalignment] | 0;
  const fontShape = memory[p.stdfontshape] >>> 0;
  const interCharacter = memory[p.textintercharspacing] | 0;
  const interLine = memory[p.textinterlinespacing] | 0;
  const widthCorrection = Math.max(memory[p.textx] | 0, 0);
  const heightCorrection = Math.max(memory[p.texty] | 0, 0);
  let x = memory[p.textx] | 0;
  let y = memory[p.texty] | 0;
  let left = 0;
  let top = 0;
  let right = 0x7fffffff;
  let bottom = 0x7fffffff;
  const window = memory[p.textwindow] >>> 0;
  if (window !== 0) {
    left = memory[window] | 0; top = memory[window + 1] | 0;
    right = memory[window + 2] | 0; bottom = memory[window + 3] | 0;
    x += left; y += top;
  }
  const region = memory[p.textregion] >>> 0;
  const wrap = (memory[p.textwordwrap] | 0) !== 0;
  const ghost = (memory[p.textghostmode] | 0) !== 0;
  const highlightStart = memory[p.texthighlightstart] >>> 0;
  const highlightStop = memory[p.texthighlightstop] >>> 0;
  let effect = memory[p.texteffect] | 0;
  if (!pixelEffects(linked).has(effect) && effect === -2147483648) {
    effect = codeHandle(linked, "service FX Raw");
  }
  const ink = memory[p.ink] | 0;
  let offset = 0;
  let width = 0;
  let stop = false;

  const within = (px, py) => {
    if ((px >>> 0) >= (displayWidth >>> 0) || (py >>> 0) >= (displayHeight >>> 0)) return false;
    return region === 0 || (px >= (memory[region] | 0) && py >= (memory[region + 1] | 0)
      && px <= (memory[region + 2] | 0) && py <= (memory[region + 3] | 0));
  };
  const checkWordWrap = () => {
    if (!wrap) return;
    let futureX = x;
    let future = offset;
    for (;;) {
      future += 1;
      const character = memory[string + future] & 0xff;
      if (character === 0 || character === 9 || character === 13 || character === 32) break;
      futureX += fontWidth + interCharacter;
      if (futureX > right) {
        x = left;
        y += fontBody + interLine;
        if (y >= bottom) stop = true;
        break;
      }
    }
  };

  while (!stop) {
    let character = memory[string + offset] & 0xff;
    const highlighted = string + offset >= highlightStart && string + offset < highlightStop;
    if (character === 0) break;
    if (character === 9) {
      const tab = memory[p.texttabsize] | 0;
      if (tab > 0) {
        x = x - (x % tab) + tab;
        checkWordWrap();
      }
      offset += 1;
      continue;
    }
    if (character === 10) {
      x = left;
      y += fontBody + interLine;
      if (y >= bottom) break;
      offset += 1;
      continue;
    }
    if (character === 13) { offset += 1; continue; }
    if (character === 32) {
      x += fontWidth + interCharacter;
      checkWordWrap();
      width = Math.max(width, x - left - widthCorrection);
      offset += 1;
      continue;
    }
    if (character < 32) character = 32;
    else if ((character & 0x80) !== 0) character = 127;
    if (x > right - fontWidth - interCharacter) {
      if (!wrap) { offset += 1; continue; }
      x = left;
      y += fontBody + interLine;
      if (y >= bottom) break;
    }
    if (y >= top - fontBody - interLine) {
      width = Math.max(width, x + fontWidth + interCharacter - left - widthCorrection);
      if (!ghost) {
        const glyph = character - 32;
        let shape = fontShape + Math.trunc(glyph / fontAlignment) * fontAlignment * fontBody
          + (glyph % fontAlignment);
        let dotY = y;
        memory[p.stdcurrentshapeunit] = shape;
        memory[p.stddoty] = dotY;
        memory[p.stdstopy] = y + fontBody;
        for (let row = 0; row < fontBody; row += 1, dotY += 1, shape += fontAlignment) {
          memory[p.stddotx] = x;
          memory[p.stdstopx] = x + fontWidth;
          let mask = rotateLeft32(0x80000000, fontWidth);
          mask = rotateLeft32(mask, fontWidth);
          memory[p.stddotmask] = mask;
          for (let column = 0; column < fontWidth; column += 1) {
            const dotX = x + column;
            const inside = within(dotX, dotY);
            if (inside && ((memory[shape] & mask) !== 0)) {
              applyPixelEffect(memory, linked, effects, effect, origin + dotY * displayWidth + dotX, ink);
            }
            if (inside && highlighted) memory[origin + dotY * displayWidth + dotX] = ~memory[origin + dotY * displayWidth + dotX];
            mask = rotateRight32(mask, 2);
            memory[p.stddotmask] = mask;
            memory[p.stddotx] = dotX + 1;
          }
          memory[p.stdcurrentshapeunit] = shape + fontAlignment;
          memory[p.stddoty] = dotY + 1;
        }
      }
    }
    x += fontWidth + interCharacter;
    offset += 1;
  }
  memory[p.widthoflatestform] = width;
  memory[p.heightoflatestform] = y + fontBody - top - heightCorrection;
  memory[p.stdhl] = 0;
  memory[p.stdcurrentcharacterx] = x;
  memory[p.stdcurrentcharactery] = y;
  memory[p.stdoffsettocurrentcharacterinstring] = offset;
  memory[p.stdwidthcorrection] = widthCorrection;
  memory[p.stdheightcorrection] = heightCorrection;
  memory[p.stdwindowleft] = left; memory[p.stdwindowtop] = top;
  memory[p.stdwindowright] = right; memory[p.stdwindowbottom] = bottom;
  machine.X = LINO_DONE;
}

function terrainFacingDirect(machine, ground, triangle) {
  const memory = machine.memory;
  const h1 = memory[ground.VHGNDh1] | 0;
  const index = Math.imul(h1, 2) + triangle;
  memory[ground.VHGNDnormindex] = index;
  const generation = memory[ground.VHGNDnormgen] | 0;
  let normalX;
  let normalY;
  let normalZ;
  if ((memory[ground.VHGNDnormstamp + index] | 0) === generation) {
    normalX = float32FromBits(memory[ground.VHGNDnormx + index]);
    normalY = float32FromBits(memory[ground.VHGNDnormy + index]);
    normalZ = float32FromBits(memory[ground.VHGNDnormz + index]);
  } else {
    const control = floatingPoint(machine).control;
    const step = memory[ground.VHGNDlodstep] << 14;
    const x0 = memory[ground.VHGNDx] << 14;
    const z0 = memory[ground.VHGNDz] << 14;
    const x1 = x0 + step;
    const z1 = z0 + step;
    const y0 = -((triangle === 0 ? memory[ground.VHGNDs1] : memory[ground.VHGNDs2]) << 11);
    const y1 = -((triangle === 0 ? memory[ground.VHGNDs2] : memory[ground.VHGNDs3]) << 11);
    const y2 = -(memory[ground.VHGNDs4] << 11);
    const ax = triangle === 0 ? x0 : x1;
    const az = z0;
    const bx = x1;
    const bz = triangle === 0 ? z0 : z1;
    const cx = x0;
    const cz = z1;
    const edge1X = roundFloat32(ax - cx, control);
    const edge1Y = roundFloat32(y0 - y2, control);
    const edge1Z = roundFloat32(az - cz, control);
    const edge2X = roundFloat32(bx - cx, control);
    const edge2Y = roundFloat32(y1 - y2, control);
    const edge2Z = roundFloat32(bz - cz, control);
    normalX = roundFloat32(edge1Y * edge2Z - edge1Z * edge2Y, control);
    normalY = roundFloat32(edge1Z * edge2X - edge1X * edge2Z, control);
    normalZ = roundFloat32(edge1X * edge2Y - edge1Y * edge2X, control);
    memory[ground.VHGNDnormx + index] = float32Bits(normalX);
    memory[ground.VHGNDnormy + index] = float32Bits(normalY);
    memory[ground.VHGNDnormz + index] = float32Bits(normalZ);
    memory[ground.VHGNDnormstamp + index] = generation;
  }

  const floats = memory[ground.PJfwbase] >>> 0;
  const step = memory[ground.VHGNDlodstep] << 14;
  const vertexX = memory[ground.VHGNDx] << 14;
  const vertexY = -(memory[ground.VHGNDs4] << 11);
  const vertexZ = (memory[ground.VHGNDz] << 14) + step;
  const qwords = float64View(memory);
  const base = floats >>> 1;
  let dot = (qwords[base + 224] - vertexX) * normalX;
  dot = (qwords[base + 225] - vertexY) * normalY + dot;
  dot = (qwords[base + 226] - vertexZ) * normalZ + dot;
  const facing = !Number.isNaN(dot) && dot >= 0;
  memory[ground.FCret] = facing ? 1 : 0;
  return facing;
}

function terrainTileShadeDirect(machine, p) {
  const memory = machine.memory;
  let seed = ((memory[p.VHGNDh1] + memory[p.VHGNDseed]) | 3) | 0;
  memory[p.SUfseed] = seed;
  const unsigned = seed >>> 0;
  const lowHalf = unsigned & 0xffff;
  const highHalf = unsigned >>> 16;
  const lowProduct = lowHalf * lowHalf;
  const middle = 2 * lowHalf * highHalf;
  const lowerWide = lowProduct + (middle & 0xffff) * 0x10000;
  const low = lowerWide | 0;
  const high = (highHalf * highHalf + Math.floor(middle / 0x10000)
    + Math.floor(lowerWide / 0x100000000)) | 0;
  const folded = (low & 0xffffff00) | (((low & 0xff) + (high & 0xff)) & 0xff);
  memory[p.SUfeax] = folded;
  seed = (seed + folded) | 0;
  memory[p.SUfseed] = seed;
  memory[p.SUfmask] = 7;
  const result = folded & 7;
  memory[p.SUfval] = result;
  machine.A = result;
  machine.B = seed;
  machine.C = result;
  machine.D = high;
}

function landedTerrainTileOnScreen(machine, p, polygon, h1,
  height0, height1, height2, height3) {
  const memory = machine.memory;
  const x0 = memory[p.VHGNDx] << 14;
  const z0 = memory[p.VHGNDz] << 14;
  const step = memory[p.VHGNDlodstep] << 14;
  const x1 = x0 + step;
  const z1 = z0 + step;
  const generation = memory[p.VHGNDvcgen] | 0;
  const corner0 = h1;
  const corner1 = h1 + 1;
  const corner2 = h1 + 201;
  const corner3 = h1 + 200;
  const y0 = -(height0 << 11);
  const y1 = -(height1 << 11);
  const y2 = -(height2 << 11);
  const y3 = -(height3 << 11);
  const minimumY = Math.min(y0, y1, y2, y3);
  const maximumY = Math.max(y0, y1, y2, y3);
  const cameraX = directPolySlot(memory, polygon, polygon.FSCAMX);
  const cameraY = directPolySlot(memory, polygon, polygon.FSCAMY);
  const cameraZ = directPolySlot(memory, polygon, polygon.FSCAMZ);
  const centerX = (x0 + x1) * 0.5;
  const centerY = (minimumY + maximumY) * 0.5;
  const centerZ = (z0 + z1) * 0.5;
  const relativeX = centerX - cameraX;
  const relativeY = centerY - cameraY;
  const relativeZ = centerZ - cameraZ;
  const betaSin = directPolySlot(memory, polygon, polygon.FSTSB);
  const betaCos = directPolySlot(memory, polygon, polygon.FSTCB);
  const alphaCos = directPolySlot(memory, polygon, polygon.FSTCA);
  const alphaSin = directPolySlot(memory, polygon, polygon.FSTSA);
  const centerRx = relativeX * betaCos + relativeZ * betaSin;
  const centerZ2 = relativeZ * betaCos - relativeX * betaSin;
  const centerRz = relativeY * alphaSin + centerZ2 * alphaCos;
  const centerRy = relativeY * alphaCos - centerZ2 * alphaSin;
  const halfHeight = (maximumY - minimumY) * 0.5;
  const halfStep = step * 0.5;
  const radiusSquared = halfStep * halfStep * 2 + halfHeight * halfHeight + 1048576;
  const nearDistance = centerRz - directPolySlot(memory, polygon, polygon.FSUNEG);
  let tileOnScreen = true;
  if (nearDistance > 0 && nearDistance * nearDistance >= radiusSquared) {
    const dpp = directPolySlot(memory, polygon, polygon.FSDPP);
    const xc = directPolySlot(memory, polygon, polygon.FSXC);
    const yc = directPolySlot(memory, polygon, polygon.FSYC);
    const horizontal = dpp * centerRx;
    const vertical = dpp * centerRy;
    const left = horizontal + (xc - (polygon.PGLBX - 1)) * centerRz;
    const right = horizontal + (xc - (polygon.PGUBX + 1)) * centerRz;
    const top = vertical + (yc - (polygon.PGLBY - 1)) * centerRz;
    const bottom = vertical + (yc - (polygon.PGUBY + 1)) * centerRz;
    const leftNormSquared = dpp * dpp + (xc - (polygon.PGLBX - 1)) ** 2;
    const rightNormSquared = dpp * dpp + (xc - (polygon.PGUBX + 1)) ** 2;
    const topNormSquared = dpp * dpp + (yc - (polygon.PGLBY - 1)) ** 2;
    const bottomNormSquared = dpp * dpp + (yc - (polygon.PGUBY + 1)) ** 2;
    tileOnScreen = !(
      (left < 0 && left * left > radiusSquared * leftNormSquared)
      || (right > 0 && right * right > radiusSquared * rightNormSquared)
      || (top < 0 && top * top > radiusSquared * topNormSquared)
      || (bottom > 0 && bottom * bottom > radiusSquared * bottomNormSquared)
    );
  }
  if (!tileOnScreen) return false;

  if ((memory[p.VHGNDvcstamp + corner0] | 0) !== generation) {
    cacheTerrainWorldVertexDirect(machine, polygon, p, corner0, x0, y0, z0);
  }
  if ((memory[p.VHGNDvcstamp + corner1] | 0) !== generation) {
    cacheTerrainWorldVertexDirect(machine, polygon, p, corner1, x1, y1, z0);
  }
  if ((memory[p.VHGNDvcstamp + corner2] | 0) !== generation) {
    cacheTerrainWorldVertexDirect(machine, polygon, p, corner2, x1, y2, z1);
  }
  if ((memory[p.VHGNDvcstamp + corner3] | 0) !== generation) {
    cacheTerrainWorldVertexDirect(machine, polygon, p, corner3, x0, y3, z1);
  }
  if ((memory[p.VHGNDvcvisible + corner0] | 0) !== 0
      && (memory[p.VHGNDvcvisible + corner1] | 0) !== 0
      && (memory[p.VHGNDvcvisible + corner2] | 0) !== 0
      && (memory[p.VHGNDvcvisible + corner3] | 0) !== 0) {
    const minX = Math.min(memory[p.VHGNDvcpx + corner0], memory[p.VHGNDvcpx + corner1],
      memory[p.VHGNDvcpx + corner2], memory[p.VHGNDvcpx + corner3]);
    const maxX = Math.max(memory[p.VHGNDvcpx + corner0], memory[p.VHGNDvcpx + corner1],
      memory[p.VHGNDvcpx + corner2], memory[p.VHGNDvcpx + corner3]);
    const minY = Math.min(memory[p.VHGNDvcpy + corner0], memory[p.VHGNDvcpy + corner1],
      memory[p.VHGNDvcpy + corner2], memory[p.VHGNDvcpy + corner3]);
    const maxY = Math.max(memory[p.VHGNDvcpy + corner0], memory[p.VHGNDvcpy + corner1],
      memory[p.VHGNDvcpy + corner2], memory[p.VHGNDvcpy + corner3]);
    return minX <= polygon.PGUBX && maxX >= polygon.PGLBX
      && minY <= polygon.PGUBY && maxY >= polygon.PGLBY;
  }
  return true;
}

function landedTerrainTileCore(machine, linked, manhattan, rawDepth) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  const done = p.VHGNDnativecomplete;
  if ((memory[p.VHGNDmirror] | 0) !== 0
      || (memory[p.VHGNDruinpass] | 0) !== 0) return;
  if (manhattan > 90 || rawDepth > 64) {
    memory[done] = 2;
    return;
  }

  const depth = memory[p.VHGNDdepth] | 0;
  terrainTileShadeDirect(machine, p);
  let shade = (machine.C + 8 + (depth >> 1)) | 0;
  if ((shade >>> 0) > 32) shade = 32;
  memory[p.VHGNDshade] = shade;

  const h1 = memory[p.VHGNDh1] | 0;
  const surface = p.surface;
  const height0 = memory[surface + h1] & 0xff;
  const height1 = memory[surface + h1 + 1] & 0xff;
  const height2 = memory[surface + h1 + 201] & 0xff;
  const height3 = memory[surface + h1 + 200] & 0xff;
  memory[p.VHGNDs1] = height0; memory[p.VHGNDs2] = height1;
  memory[p.VHGNDs3] = height2; memory[p.VHGNDs4] = height3;
  if ((memory[p.GRiptype] | 0) === 3
      && (memory[p.VHGNDsctype] | 0) === 1
      && height0 + height1 + height2 + height3 === 0) {
    memory[done] = 2;
    return;
  }

  let ruined = 0;
  if ((memory[p.VHGNDruinanchor] | 0) !== 0
      && ((memory[p.VHGNDruins + h1] | 0) !== 0
        || (memory[p.VHGNDruins + h1 + 1] | 0) !== 0
        || (memory[p.VHGNDruins + h1 + 201] | 0) !== 0
        || (memory[p.VHGNDruins + h1 + 200] | 0) !== 0)) ruined = 1;
  memory[p.VHGNDruined] = ruined;
  const tint = ruined !== 0 ? ((shade & 63) + 64) : shade;
  memory[p.SPtinta] = tint;
  memory[p.DBcol] = tint;
  if (ruined !== 0) {
    const polygon = polymapAddresses(linked);
    directPolyStoreWide(memory, polygon, polygon.FSTX, 512);
    directPolyStoreWide(memory, polygon, polygon.FSTY, 512);
    memory[p.VHGNDruindrawn] = (memory[p.VHGNDruindrawn] + 1) | 0;
  }
  memory[p.SPescr] = 0;
  memory[p.DBflar] = 0;
  memory[p.DBent] = 0;
  const sctype = memory[p.VHGNDsctype] | 0;
  memory[p.SPcull] = sctype === 3 ? (depth < 4 ? 1 : 0) : (depth >= 4 ? 1 : 0);
  memory[p.VHGNDtilepolys] = 0;
  memory[p.PJfwbase] = p.fw;

  memory[p.VHGNDvctri] = 0;
  const facing0 = terrainFacingDirect(machine, p, 0);
  memory[p.VHGNDvctri] = 1;
  const facing1 = terrainFacingDirect(machine, p, 1);
  const facingCount = (facing0 ? 1 : 0) + (facing1 ? 1 : 0);
  memory[p.VHGNDtilepolys] = facingCount;
  if (facingCount === 0) {
    memory[done] = 1;
    return;
  }
  memory[p.PGtexf] = 5;

  for (let triangle = 0; triangle < 2; triangle += 1) {
    if (triangle === 0 ? !facing0 : !facing1) continue;
    memory[p.VHGNDvctri] = triangle;
    landedTerrainTriangle(machine, linked);
    terrainMapped(machine, linked);
  }
  memory[p.VHGNDvctri] = 1;
  memory[done] = 1;
}

function landedTerrainTriangle(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  const floats = memory[p.PJfwbase] >>> 0;
  const view = dataView(memory);
  const x0 = memory[p.VHGNDx] << 14;
  const z0 = memory[p.VHGNDz] << 14;
  const step = memory[p.VHGNDlodstep] << 14;
  const x1 = x0 + step;
  const z1 = z0 + step;
  const triangle = memory[p.VHGNDvctri] | 0;
  const ax = triangle === 0 ? x0 : x1;
  const ay = triangle === 0 ? memory[p.VHGNDs1] : memory[p.VHGNDs2];
  const az = z0;
  const bx = x1;
  const by = triangle === 0 ? memory[p.VHGNDs2] : memory[p.VHGNDs3];
  const bz = triangle === 0 ? z0 : z1;
  const cx = x0;
  const cy = memory[p.VHGNDs4];
  const cz = z1;
  writeFloat64View(view, floats + 504, ax); writeFloat64View(view, floats + 506, bx); writeFloat64View(view, floats + 508, cx);
  writeFloat64View(view, floats + 512, -(ay << 11)); writeFloat64View(view, floats + 514, -(by << 11)); writeFloat64View(view, floats + 516, -(cy << 11));
  writeFloat64View(view, floats + 520, az); writeFloat64View(view, floats + 522, bz); writeFloat64View(view, floats + 524, cz);
  const finalY = readFloat64View(view, floats + 516);
  writeFloat64View(view, p.FA0, finalY);
  memory[p.VHGNDvv] = memory[p.FA0];
  memory[p.VHGNDvi] = 2;
  memory[p.VHGNDvslot] = 256;
  memory[p.PGFi] = 258;
}

function landedVertexLoad(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  // VHGND vload's source prologue copies the caller-owned world coordinate
  // into FI and restores the fixed polygon workspace before its native body.
  // The earlier service replacement skipped both statements, so every caller
  // could project a stale conversion result through a stale PJfwbase.
  const input = memory[p.VHGNDvv] | 0;
  memory[p.FI] = input;
  memory[p.PJfwbase] = p.fw;
  writeFloat64(memory, p.FA0, input);
  const floats = p.fw;
  const slot = (memory[p.VHGNDvslot] + memory[p.VHGNDvi]) | 0;
  memory[p.PGFi] = slot;
  writeFloat64(memory, floats + slot * 2, input);
}

function genericTerrainMapped(machine, linked, p) {
  const memory = machine.memory;
  memory[p.PJpreproject] = 0;
  memory[p.PJnrv] = 3;
  polymap(machine, linked);
  memory[p.SPterrain] = 0;
}

function storeTerrainCachedFloat(memory, lowBase, highBase, index, number) {
  float64Scratch.setFloat64(0, number, true);
  memory[lowBase + index] = float64Scratch.getInt32(0, true);
  memory[highBase + index] = float64Scratch.getInt32(4, true);
}

function terrainCachedFloat(memory, lowBase, highBase, index) {
  float64Scratch.setInt32(0, memory[lowBase + index], true);
  float64Scratch.setInt32(4, memory[highBase + index], true);
  return float64Scratch.getFloat64(0, true);
}

function cacheTerrainWorldVertexDirect(machine, p, ground, index, xInput, yInput, zInput) {
  const memory = machine.memory;
  const control = floatingPoint(machine).control;
  const cameraX = directPolySlot(memory, p, p.FSCAMX);
  const cameraY = directPolySlot(memory, p, p.FSCAMY);
  const cameraZ = directPolySlot(memory, p, p.FSCAMZ);
  const betaSin = directPolySlot(memory, p, p.FSTSB);
  const betaCos = directPolySlot(memory, p, p.FSTCB);
  const alphaCos = directPolySlot(memory, p, p.FSTCA);
  const alphaSin = directPolySlot(memory, p, p.FSTSA);
  const near = directPolySlot(memory, p, p.FSUNEG);

  const z = roundFloat32(zInput - cameraZ, control);
  const x = roundFloat32(xInput - cameraX, control);
  const y = roundFloat32(yInput - cameraY, control);
  const rx = roundFloat32(x * betaCos + z * betaSin, control);
  const z2 = roundFloat32(z * betaCos - x * betaSin, control);
  const rotatedZWide = y * alphaSin + z2 * alphaCos;
  const rz = roundFloat32(rotatedZWide, control);
  const ry = roundFloat32(y * alphaCos - z2 * alphaSin, control);
  storeTerrainCachedFloat(memory, ground.VHGNDvcrx0, ground.VHGNDvcrx1, index, rx);
  storeTerrainCachedFloat(memory, ground.VHGNDvcry0, ground.VHGNDvcry1, index, ry);
  storeTerrainCachedFloat(memory, ground.VHGNDvcrz0, ground.VHGNDvcrz1, index, rz);
  const visible = !Number.isNaN(rotatedZWide) && !Number.isNaN(near) && rotatedZWide >= near ? 1 : 0;
  memory[ground.VHGNDvcvisible + index] = visible;
  if (visible !== 0) {
    const factor = directPolySlot(memory, p, p.FSDPP) / rz;
    memory[ground.VHGNDvcpx + index] = convertToInt32(
      factor * rx + directPolySlot(memory, p, p.FSXC), control,
    );
    memory[ground.VHGNDvcpy + index] = convertToInt32(
      factor * ry + directPolySlot(memory, p, p.FSYC), control,
    );
  }
  memory[ground.VHGNDvcstamp + index] = memory[ground.VHGNDvcgen];
}

function cacheTerrainMappedVertexDirect(machine, p, ground, index, vertex) {
  const memory = machine.memory;
  cacheTerrainWorldVertexDirect(
    machine, p, ground, index,
    directPolySlot(memory, p, p.FSINX + vertex),
    directPolySlot(memory, p, p.FSINY + vertex),
    directPolySlot(memory, p, p.FSINZ + vertex),
  );
}

function mirrorTerrainCache(machine, memory, p, ground) {
  const signature = [
    directPolySlot(memory, p, p.FSCAMX), directPolySlot(memory, p, p.FSCAMY),
    directPolySlot(memory, p, p.FSCAMZ), directPolySlot(memory, p, p.FSTSB),
    directPolySlot(memory, p, p.FSTCB), directPolySlot(memory, p, p.FSTSA),
    directPolySlot(memory, p, p.FSTCA), directPolySlot(memory, p, p.FSDPP),
    directPolySlot(memory, p, p.FSXC), directPolySlot(memory, p, p.FSYC),
    directPolySlot(memory, p, p.FSUNEG), floatingPoint(machine).control,
    memory[ground.VHGNDnormgen] | 0,
  ];
  let cache = machine.noctisMirrorTerrainCache;
  if (!cache) {
    cache = machine.noctisMirrorTerrainCache = {
      signature: [], generation: 0, stamp: new Uint32Array(40000),
      visible: new Uint8Array(40000), rx: new Float64Array(40000),
      ry: new Float64Array(40000), rz: new Float64Array(40000),
      px: new Int32Array(40000), py: new Int32Array(40000),
    };
  }
  let changed = signature.length !== cache.signature.length;
  for (let index = 0; !changed && index < signature.length; index += 1) {
    if (!Object.is(signature[index], cache.signature[index])) changed = true;
  }
  if (changed) {
    cache.signature = signature;
    cache.generation = (cache.generation + 1) >>> 0;
    if (cache.generation === 0) {
      cache.stamp.fill(0);
      cache.generation = 1;
    }
  }
  return cache;
}

function cacheMirrorTerrainVertex(machine, memory, p, cache, index, vertex) {
  const control = floatingPoint(machine).control;
  const xInput = directPolySlot(memory, p, p.FSINX + vertex);
  const yInput = directPolySlot(memory, p, p.FSINY + vertex);
  const zInput = directPolySlot(memory, p, p.FSINZ + vertex);
  const cameraX = directPolySlot(memory, p, p.FSCAMX);
  const cameraY = directPolySlot(memory, p, p.FSCAMY);
  const cameraZ = directPolySlot(memory, p, p.FSCAMZ);
  const betaSin = directPolySlot(memory, p, p.FSTSB);
  const betaCos = directPolySlot(memory, p, p.FSTCB);
  const alphaCos = directPolySlot(memory, p, p.FSTCA);
  const alphaSin = directPolySlot(memory, p, p.FSTSA);
  const near = directPolySlot(memory, p, p.FSUNEG);
  const z = roundFloat32(zInput - cameraZ, control);
  const x = roundFloat32(xInput - cameraX, control);
  const y = roundFloat32(yInput - cameraY, control);
  const rx = roundFloat32(x * betaCos + z * betaSin, control);
  const z2 = roundFloat32(z * betaCos - x * betaSin, control);
  const rotatedZWide = y * alphaSin + z2 * alphaCos;
  const rz = roundFloat32(rotatedZWide, control);
  const ry = roundFloat32(y * alphaCos - z2 * alphaSin, control);
  cache.rx[index] = rx;
  cache.ry[index] = ry;
  cache.rz[index] = rz;
  cache.visible[index] = !Number.isNaN(rotatedZWide) && !Number.isNaN(near)
    && rotatedZWide >= near ? 1 : 0;
  if (cache.visible[index] !== 0) {
    const factor = directPolySlot(memory, p, p.FSDPP) / rz;
    cache.px[index] = convertToInt32(factor * rx + directPolySlot(memory, p, p.FSXC), control);
    cache.py[index] = convertToInt32(factor * ry + directPolySlot(memory, p, p.FSYC), control);
  }
  cache.stamp[index] = cache.generation;
}

function mirrorTerrainMapped(machine, linked, p, ground) {
  const memory = machine.memory;
  const h1 = memory[ground.VHGNDh1] | 0;
  const triangle = memory[ground.VHGNDvctri] | 0;
  const indices = triangle === 0 ? [h1, h1 + 1, h1 + 200] : [h1 + 1, h1 + 201, h1 + 200];
  const cache = mirrorTerrainCache(machine, memory, p, ground);
  for (let vertex = 0; vertex < 3; vertex += 1) {
    const index = indices[vertex];
    memory[ground.VHGNDvi] = vertex;
    memory[ground.VHGNDvcindex] = index;
    if (cache.stamp[index] !== cache.generation) {
      cacheMirrorTerrainVertex(machine, memory, p, cache, index, vertex);
    }
    if (cache.visible[index] === 0) return false;
  }
  for (let vertex = 0; vertex < 3; vertex += 1) {
    const index = indices[vertex];
    writeFloat64(memory, p.fw + (p.FSUX + vertex) * 2, cache.rx[index]);
    writeFloat64(memory, p.fw + (p.FSUY + vertex) * 2, cache.ry[index]);
    writeFloat64(memory, p.fw + (p.FSUZ + vertex) * 2, cache.rz[index]);
    memory[p.mp + vertex * 2] = cache.px[index];
    memory[p.mp + vertex * 2 + 1] = cache.py[index];
  }
  memory[ground.VHGNDvi] = 3;
  memory[ground.VHGNDvcindex] = indices[2];
  memory[p.mp + 6] = memory[p.mp + 4];
  memory[p.mp + 7] = memory[p.mp + 5];
  memory[p.PJdoflag] = 4;
  memory[ground.VHGNDmpbase] = p.mp;
  let minX = memory[p.mp] | 0;
  let maxX = minX;
  let minY = memory[p.mp + 1] | 0;
  let maxY = minY;
  for (let vertex = 1; vertex < 3; vertex += 1) {
    const x = memory[p.mp + vertex * 2] | 0;
    const y = memory[p.mp + vertex * 2 + 1] | 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  memory[p.PJminx] = minX;
  memory[p.PJmaxx] = maxX;
  memory[p.BXminy] = minY;
  memory[p.BXmaxy] = maxY;
  memory[p.PJvr] = 4;
  memory[p.PJvr2] = 4;
  memory[p.PJvr22] = 8;
  memory[p.PJpreproject] = 0;
  rasterProjectedTerrain(machine, linked, p);
  memory[p.PJgate] = 0;
  return true;
}

function terrainMapped(machine, linked) {
  const memory = machine.memory;
  const p = polymapAddresses(linked);
  const ground = landedTerrainAddresses(linked);
  const spterrain = p.SPterrain;
  memory[spterrain] = 1;

  if ((memory[ground.VHGNDmirror] | 0) !== 0) {
    if (mirrorTerrainMapped(machine, linked, p, ground)) {
      memory[spterrain] = 0;
      return;
    }
    genericTerrainMapped(machine, linked, p);
    return;
  }

  const h1 = memory[ground.VHGNDh1] | 0;
  const triangle = memory[ground.VHGNDvctri] | 0;
  const index0 = triangle === 0 ? h1 : h1 + 1;
  const index1 = triangle === 0 ? h1 + 1 : h1 + 201;
  const index2 = h1 + 200;
  const generation = memory[ground.VHGNDvcgen] | 0;
  const viAddress = ground.VHGNDvi;
  const indexAddress = ground.VHGNDvcindex;

  for (let vertex = 0; vertex < 3; vertex += 1) {
    const index = vertex === 0 ? index0 : vertex === 1 ? index1 : index2;
    memory[viAddress] = vertex;
    memory[indexAddress] = index;
    if ((memory[ground.VHGNDvcstamp + index] | 0) === generation) continue;
    cacheTerrainMappedVertexDirect(machine, p, ground, index, vertex);
  }

  let visibleCount = 0;
  for (let vertex = 0; vertex < 3; vertex += 1) {
    const index = vertex === 0 ? index0 : vertex === 1 ? index1 : index2;
    const visible = memory[ground.VHGNDvcvisible + index] | 0;
    visibleCount += visible;
    memory[p.rwf + vertex] = visible;
    const x = p.fw + (p.FSRXF + vertex) * 2;
    const y = p.fw + (p.FSRYF + vertex) * 2;
    const z = p.fw + (p.FSRZF + vertex) * 2;
    memory[x] = memory[ground.VHGNDvcrx0 + index]; memory[x + 1] = memory[ground.VHGNDvcrx1 + index];
    memory[y] = memory[ground.VHGNDvcry0 + index]; memory[y + 1] = memory[ground.VHGNDvcry1 + index];
    memory[z] = memory[ground.VHGNDvcrz0 + index]; memory[z + 1] = memory[ground.VHGNDvcrz1 + index];
  }
  copyQword(memory, p.fw + (p.FSRXF + 2) * 2, p.fw + (p.FSRXF + 3) * 2);
  copyQword(memory, p.fw + (p.FSRYF + 2) * 2, p.fw + (p.FSRYF + 3) * 2);
  copyQword(memory, p.fw + (p.FSRZF + 2) * 2, p.fw + (p.FSRZF + 3) * 2);
  memory[p.rwf + 3] = memory[p.rwf + 2];
  memory[p.PJdoflag] = visibleCount + (memory[p.rwf + 2] | 0);
  if (visibleCount !== 3) {
    memory[p.PJnrv] = 3;
    memory[p.PJpreproject] = 0;
    polymap(machine, linked, true);
    memory[spterrain] = 0;
    return;
  }

  for (let vertex = 0; vertex < 3; vertex += 1) {
    const index = vertex === 0 ? index0 : vertex === 1 ? index1 : index2;
    const x = p.fw + (p.FSUX + vertex) * 2;
    const y = p.fw + (p.FSUY + vertex) * 2;
    const z = p.fw + (p.FSUZ + vertex) * 2;
    memory[x] = memory[ground.VHGNDvcrx0 + index]; memory[x + 1] = memory[ground.VHGNDvcrx1 + index];
    memory[y] = memory[ground.VHGNDvcry0 + index]; memory[y + 1] = memory[ground.VHGNDvcry1 + index];
    memory[z] = memory[ground.VHGNDvcrz0 + index]; memory[z + 1] = memory[ground.VHGNDvcrz1 + index];
    memory[p.mp + vertex * 2] = memory[ground.VHGNDvcpx + index];
    memory[p.mp + vertex * 2 + 1] = memory[ground.VHGNDvcpy + index];
  }
  memory[viAddress] = 3;
  memory[indexAddress] = index2;
  memory[p.mp + 6] = memory[p.mp + 4];
  memory[p.mp + 7] = memory[p.mp + 5];
  memory[p.PJdoflag] = 4;
  memory[ground.VHGNDmpbase] = p.mp;
  let minX = memory[p.mp] | 0;
  let maxX = minX;
  let minY = memory[p.mp + 1] | 0;
  let maxY = minY;
  for (let vertex = 1; vertex < 3; vertex += 1) {
    const x = memory[p.mp + vertex * 2] | 0;
    const y = memory[p.mp + vertex * 2 + 1] | 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  memory[p.PJminx] = minX;
  memory[p.PJmaxx] = maxX;
  memory[p.BXminy] = minY;
  memory[p.BXmaxy] = maxY;
  memory[p.PJvr] = 4;
  memory[p.PJvr2] = 4;
  memory[p.PJvr22] = 8;
  memory[p.PJpreproject] = 0;
  rasterProjectedTerrain(machine, linked, p);
  memory[p.PJgate] = 0;
  memory[spterrain] = 0;
}

function terrainFacing(machine, linked) {
  const memory = machine.memory;
  const p = landedTerrainAddresses(linked);
  if ((memory[p.VHGNDmirror] | 0) !== 0) {
    mappedFacing(machine, linked);
    return;
  }
  const floats = memory[p.PJfwbase] >>> 0;
  const view = dataView(memory);
  const index = Math.imul(memory[p.VHGNDh1] | 0, 2) + (memory[p.VHGNDvctri] | 0);
  memory[p.VHGNDnormindex] = index;
  const generation = memory[p.VHGNDnormgen] | 0;
  const stamp = p.VHGNDnormstamp;
  if ((memory[stamp + index] | 0) !== generation) {
    mappedFacing(machine, linked);
    memory[p.VHGNDnormx + index] = float32Bits(readFloat64View(view, floats + 470));
    memory[p.VHGNDnormy + index] = float32Bits(readFloat64View(view, floats + 472));
    memory[p.VHGNDnormz + index] = float32Bits(readFloat64View(view, floats + 474));
    memory[stamp + index] = generation;
    return;
  }
  const normalX = float32FromBits(memory[p.VHGNDnormx + index]);
  const normalY = float32FromBits(memory[p.VHGNDnormy + index]);
  const normalZ = float32FromBits(memory[p.VHGNDnormz + index]);
  let dot = (readFloat64View(view, floats + 448) - readFloat64View(view, floats + 508)) * normalX;
  dot = (readFloat64View(view, floats + 450) - readFloat64View(view, floats + 516)) * normalY + dot;
  dot = (readFloat64View(view, floats + 452) - readFloat64View(view, floats + 524)) * normalZ + dot;
  memory[p.FCret] = !Number.isNaN(dot) && dot >= 0 ? 1 : 0;
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
  // A binary32 add/subtract has at most 25 significant result bits and a
  // binary32 multiply at most 48. JavaScript's binary64 therefore represents
  // these results exactly, before the same later source spill/narrowing. Keep
  // division and any genuinely wider operand on the full 64-bit x87 model.
  if (operation !== "divide" && Math.fround(left) === left && Math.fround(right) === right) {
    if (operation === "multiply") return left * right;
    if (operation === "subtract") return left - right;
    return left + right;
  }
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
    const camera = readFloat64(memory, address(linked, cameraName));
    let difference = integer - camera;
    const error = Math.abs(difference) * Number.EPSILON + Number.MIN_VALUE;
    const lowBits = float32Bits(roundFloat32(difference - error, control));
    const highBits = float32Bits(roundFloat32(difference + error, control));
    if (!Number.isFinite(difference) || lowBits !== highBits) {
      difference = scalarBinaryNumber(integer, camera, control, "subtract");
    }
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

  if ((control & 0x0300) === 0x0300
      && Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)
      && Number.isFinite(cosBeta) && Number.isFinite(sinBeta)
      && Number.isFinite(cosAlpha) && Number.isFinite(sinAlpha)) {
    let first = z * sinBeta;
    writeFloat64(memory, floats + 496, first);
    let second = x * cosBeta;
    let result = second + first;
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + 64, narrowScalar(machine, linked, result));

    first = z * cosBeta;
    writeFloat64(memory, floats + 496, first);
    second = x * sinBeta;
    result = first - second;
    writeScalarScratch(machine, linked, result);
    const z2 = narrowScalar(machine, linked, result);
    writeFloat64(memory, floats + 482, z2);

    first = z2 * cosAlpha;
    writeFloat64(memory, floats + 496, first);
    second = y * sinAlpha;
    result = second + first;
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + 498, result);
    const rotatedZ = narrowScalar(machine, linked, result);
    writeFloat64(memory, floats + 80, rotatedZ);

    first = y * cosAlpha;
    writeFloat64(memory, floats + 496, first);
    second = z2 * sinAlpha;
    result = first - second;
    writeScalarScratch(machine, linked, result);
    writeFloat64(memory, floats + 72, narrowScalar(machine, linked, result));
    memory[address(linked, "VHSdepth")] = convertToInt32(rotatedZ, control);
    return;
  }

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

function starField(machine, linked) {
  const memory = machine.memory;
  let p = starFieldAddressCaches.get(linked);
  if (!p) {
    const names = [
      "VHSstar", "VHScount", "VHSstarptr", "VHSdepth", "VHSamp", "VHScolour",
      "GCx", "GCy", "VHSscreeny", "VHSdrawcount", "VHSdrawptr", "VHSsurface",
      "SPoff", "SPreg", "SPval", "RGADP", "vhsstarcache", "vhsscreencache", "SADPT",
      "VHSdrawready", "VHSfwbase", "VHSdx0", "VHSdy0", "VHSdz0",
    ];
    p = Object.fromEntries(names.map((name) => [name, address(linked, name)]));
    p.page = noctisBuffer(linked, "SADPT");
    starFieldAddressCaches.set(linked, p);
  }

  const count = memory[p.VHScount] >>> 0;
  const amplified = (memory[p.VHSamp] | 0) !== 0;
  const surface = (memory[p.VHSsurface] | 0) !== 0;
  const control = floatingPoint(machine).control;
  const fastNumbers = (control & 0x0f00) === 0x0300;
  const floats = memory[p.VHSfwbase] >>> 0;
  const cameraX = readFloat64(memory, p.VHSdx0);
  const cameraY = readFloat64(memory, p.VHSdy0);
  const cameraZ = readFloat64(memory, p.VHSdz0);
  const cosBeta = readFloat64(memory, floats + 428);
  const sinBeta = readFloat64(memory, floats + 430);
  const cosAlpha = readFloat64(memory, floats + 436);
  const sinAlpha = readFloat64(memory, floats + 438);
  const numerator = readFloat64(memory, floats + 50);
  const centerX = readFloat64(memory, floats + 38);
  const centerY = readFloat64(memory, floats + 40);
  const stableFloat32Difference = (integer, camera) => {
    const difference = integer - camera;
    const error = Math.abs(difference) * Number.EPSILON + Number.MIN_VALUE;
    const low = roundFloat32(difference - error, control);
    const high = roundFloat32(difference + error, control);
    return float32Bits(low) === float32Bits(high) ? low : null;
  };
  const safelyRoundedInteger = (number) => Number.isFinite(number)
    && Math.abs((number - Math.floor(number)) - 0.5) > 1e-7;
  let drawCount = 0;
  let star = 0;
  for (; star < count; star += 1) {
    const starPointer = p.vhsstarcache + star * 4;
    memory[p.VHSstar] = star;
    memory[p.VHSstarptr] = starPointer;
    if ((memory[starPointer + 3] | 0) === 0) continue;

    let screenX;
    let projectedY;
    let depth;
    let rotatedX;
    let rotatedY;
    let rotatedZ;
    let usedFastGeometry = false;
    if (fastNumbers) {
      const x = stableFloat32Difference(memory[starPointer] | 0, cameraX);
      const y = stableFloat32Difference(memory[starPointer + 1] | 0, cameraY);
      const z = stableFloat32Difference(memory[starPointer + 2] | 0, cameraZ);
      if (x !== null && y !== null && z !== null) {
        rotatedX = Math.fround(x * cosBeta + z * sinBeta);
        const z2 = Math.fround(z * cosBeta - x * sinBeta);
        rotatedZ = Math.fround(y * sinAlpha + z2 * cosAlpha);
        rotatedY = Math.fround(y * cosAlpha - z2 * sinAlpha);
        depth = nearestEven(rotatedZ) | 0;
        usedFastGeometry = true;
        memory[p.VHSdepth] = depth;
      }
    }
    if (!usedFastGeometry) {
      spaceRelativeCoordinates(machine, linked);
      spaceRotateDepth(machine, linked);
      depth = memory[p.VHSdepth] | 0;
    }
    if (depth < 10000) continue;
    depth = amplified ? depth >>> 14 : depth >>> 13;
    if ((depth >>> 0) > 63) continue;
    const colour = 63 - depth;
    memory[p.VHScolour] = colour;

    if (usedFastGeometry) {
      const factor = numerator / rotatedZ;
      const projectedX = factor * rotatedX + centerX;
      const projectedYFast = factor * rotatedY + centerY;
      if (safelyRoundedInteger(projectedX) && safelyRoundedInteger(projectedYFast)) {
        screenX = nearestEven(projectedX) | 0;
        projectedY = nearestEven(projectedYFast) | 0;
        memory[p.GCx] = screenX;
        memory[p.GCy] = projectedY;
      } else {
        spaceRelativeCoordinates(machine, linked);
        spaceRotateDepth(machine, linked);
        spaceProject(machine, linked);
        screenX = memory[p.GCx] | 0;
        projectedY = memory[p.GCy] | 0;
      }
    } else {
      spaceProject(machine, linked);
      screenX = memory[p.GCx] | 0;
      projectedY = memory[p.GCy] | 0;
    }
    if (screenX <= 10 || screenX >= 310) continue;
    const screenY = (projectedY - 2) | 0;
    memory[p.VHSscreeny] = screenY;
    if (screenY <= 10 || screenY >= 190) continue;

    const offset = (Math.imul(screenY, 320) + screenX + 4) | 0;
    memory[p.SPoff] = offset;
    const drawPointer = p.vhsscreencache + drawCount * 2;
    memory[p.VHSdrawptr] = drawPointer;
    memory[drawPointer] = offset;
    memory[drawPointer + 1] = colour;
    drawCount += 1;
    memory[p.VHSdrawcount] = drawCount;

    let current = memory[p.page + (offset & 0xffff)] & 255;
    memory[p.SPreg] = p.RGADP;
    memory[p.SPval] = current;
    if (surface ? current > 62 : current === 68 || current < 64 || current > 92) continue;
    const high = current & 192;
    current = (current & 63) + colour;
    if (current > 63) current = 63;
    current |= high;
    memory[p.SPval] = current;
    memory[p.page + (offset & 0xffff)] = current;
  }
  memory[p.VHSstar] = star;
  memory[p.VHSdrawcount] = drawCount;
  memory[p.VHSdrawready] = 1;
  machine.X = LINO_DONE;
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
    [SERVICE_IDS.rotateVertices]: (machine, linked) => polyRotateDirect(machine, linked, poly3dAddresses(linked)),
    [SERVICE_IDS.rotateSelectedVertices]: (machine, linked) => {
      const p = poly3dAddresses(linked);
      polyRotateDirect(machine, linked, p, machine.memory[p.PJvr] >>> 0);
    },
    [SERVICE_IDS.projectMapGeneric]: projectMapGeneric,
    [SERVICE_IDS.project3d]: project3d,
    [SERVICE_IDS.drawPolygon]: drawPolygon,
    [SERVICE_IDS.poly3d]: poly3d,
    [SERVICE_IDS.polymap]: polymap,
    [SERVICE_IDS.terrainMapped]: terrainMapped,
    [SERVICE_IDS.terrainFacing]: terrainFacing,
    [SERVICE_IDS.terrainTileFauna]: terrainTileFauna,
    [SERVICE_IDS.terrainRock]: terrainRock,
    [SERVICE_IDS.terrainTree]: terrainTree,
    [SERVICE_IDS.terrainGreenmush]: terrainGreenmush,
    [SERVICE_IDS.terrainTraverse]: terrainTraverseFaithful,
    [SERVICE_IDS.waterBackdrop]: waterBackdrop,
    [SERVICE_IDS.denseAtmosphere]: denseAtmosphere,
    [SERVICE_IDS.terrainRenderRandom]: terrainRenderRandom,
    [SERVICE_IDS.terrainVertexLoad]: landedVertexLoad,
    [SERVICE_IDS.rectangle]: rectangle,
    [SERVICE_IDS.surroundingBorder]: surroundingBorder,
    [SERVICE_IDS.surroundingCompass]: surroundingCompass,
    [SERVICE_IDS.surroundingHudString]: surroundingHudString,
    [SERVICE_IDS.loadTgaPicture]: loadTgaPicture,
    [SERVICE_IDS.tileRegion]: tileRegion,
    [SERVICE_IDS.standardText]: standardText,
    [SERVICE_IDS.searchEkeySession]: searchEkeySession,
    [SERVICE_IDS.backupEkeySession]: backupEkeySession,
    [SERVICE_IDS.surfaceSsmooth]: surfaceSsmooth,
    [SERVICE_IDS.surfaceLssmooth]: surfaceLssmooth,
    [SERVICE_IDS.surfacePsmooth]: surfacePsmooth,
    [SERVICE_IDS.surfaceClear]: surfaceClear,
    [SERVICE_IDS.surfaceNegate]: surfaceNegate,
    [SERVICE_IDS.surfaceRandomPattern]: surfaceRandomPattern,
    [SERVICE_IDS.surfaceSda]: surfaceSda,
    [SERVICE_IDS.paletteShade]: paletteShade,
    [SERVICE_IDS.paletteTavola]: paletteTavola,
    [SERVICE_IDS.groundRoundHill]: groundRoundHill,
    [SERVICE_IDS.groundStdCrater]: groundStdCrater,
    [SERVICE_IDS.groundTextureDarkline]: groundTextureDarkline,
    [SERVICE_IDS.groundPostSurface]: groundPostSurface,
    [SERVICE_IDS.spaceFade]: spaceFade,
    [SERVICE_IDS.flareSourceStick]: flareSourceStick,
    [SERVICE_IDS.glowRaster]: glowRaster,
    [SERVICE_IDS.globeRaster]: globeRaster,
    [SERVICE_IDS.whiteRaster]: whiteRaster,
    [SERVICE_IDS.drawMode2Cache]: drawMode2Cache,
    [SERVICE_IDS.renderCupolaCache]: renderCupolaCache,
    [SERVICE_IDS.drawCupolaPanel]: drawCupolaPanel,
    [SERVICE_IDS.stick3d]: stick3d,
    [SERVICE_IDS.flareSourceLine]: flareSourceLine,
    [SERVICE_IDS.flareDraw]: flareDraw,
    [SERVICE_IDS.panelOrbitProject]: panelOrbitProject,
    [SERVICE_IDS.panelMoonProject]: panelMoonProject,
    [SERVICE_IDS.panelIntegerStick]: panelIntegerStick,
    [SERVICE_IDS.panelDigitPrepare]: panelDigitPrepare,
    [SERVICE_IDS.panelMappedQuadLoad]: panelMappedQuadLoad,
    [SERVICE_IDS.panelSystemOrbits]: panelSystemOrbits,
    [SERVICE_IDS.panelMoonScoreBounds]: panelMoonScoreBounds,
    [SERVICE_IDS.glassBubble]: glassBubble,
    [SERVICE_IDS.bodyVector]: bodyVector,
    [SERVICE_IDS.starField]: starField,
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
