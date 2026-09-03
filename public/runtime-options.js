export function fastPresentationFromSearch(search = "") {
  return new URLSearchParams(search).get("presentation") === "60" ? 1 : 0;
}

export function presentationDescription(fastPresentation) {
  return fastPresentation === 1
    ? "Experimental 60-Hz browser presentation requested; sustained 60 FPS is not guaranteed."
    : "Browser presentation uses the authentic 18.206-Hz cadence by default.";
}
