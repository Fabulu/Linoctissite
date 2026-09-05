# Linoctis

Linoctis 1.0.2 is the browser home of the L.in.oleum Noctis port. The reusable
JavaScript compiler and machine live in
[Fabulu/linojava](https://github.com/Fabulu/linojava).

The site now loads the current `work/vhgame.txt` project, its 74 Lino modules,
and 23 stockfile assets. LinoJava links and compiles that source in the browser,
runs the real IsoKernel startup sequence, and presents the 400 by 300 Noctis
framebuffer drawn by Lino itself. HTML provides only the page shell, loading
status, input bridge, and an easy reversible fullscreen control.

The default runtime is pure JavaScript. It compiles and executes the linked
Lino machine in a module worker, while the browser thread presents completed
frames and handles the DOM. Fresh browser sessions use Noctis's authentic
18.206-Hz presentation cadence. Add `?presentation=60` to request experimental
60-Hz presentation; this does not imply sustained 60 FPS. Add `?mainThread` to
the URL to use the original single-threaded fallback for debugging. Both
runtime paths use the same presentation option, while desktop Noctis continues
to default to 60-Hz presentation.

Current browser integration includes:

- Pointer state, queued ASCII input, and the complete held-key table.
- WASD, arrows, modifiers, function keys, and keypad controls.
- Browser persistence for Lino files and GlobalK records.
- Stereo PCM playback bridged from the worker to Web Audio.
- Separate, honest rendered-FPS and display-refresh measurements.
- Fullscreen presentation of the live `VHGUI` game rectangle.
- Legible physical Stardrifter panel labels, click-to-focus control, and tested
  GAME-menu open/dismiss behavior.
- Bounded held-pointer input: obsolete adjacent motion is coalesced while every
  button edge, final coordinate, and accumulated drag/resize delta is retained;
  the worker path is regression-tested in Chromium and Firefox.
- Optional exact host services for bounded shared-Lino routines, including the
  packed in-place Stardrifter star-page smoother; the same linked Lino
  implementations remain executable fallbacks.

A controlled clean-host, eight-run, 20-second interleaved Stardrifter comparison
measured 39.414 produced presentations/s with the linked-Lino smoothing fallback
and 59.453/s with the exact service. Runner cost fell from 13.835 to 4.583
ms/presentation. This is same-host relative evidence, not a sustained one-minute
60-FPS claim. The released generated runner has runtime ID
`70492b9919353c4c0e88740b` and SHA-256
`70492b9919353c4c0e88740b3af4d40c43a708b15d3bf8ddf5d44514103d6b41`.

A visible corner control, double-click, or Ctrl+Shift+F returns to windowed
mode without consuming Noctis's Escape key.

This stable browser package compiles the same tracked shared-Lino closure as the
desktop targets. The published Linoleum `v1.0.0` tag remains an immutable
reference; current forward releases pin later shared-source commits explicitly.
Unsupported native paths still stop with an explicit error. Browser sustained
60 FPS and browser/native FPS parity are not claimed.

## Local build

Place the `linojava` and `linoleum` repositories beside this one, then run:

```powershell
npm run build
npm test
npx serve public
```

Set `LINOJAVA_DIR` or `LINO_SOURCE_DIR` to use different checkouts. The build
copies only the transitive Noctis source and stockfile closure into `public`.
Cloudflare Pages checks out pinned revisions of both repositories before it
builds and deploys. CI also rebuilds the checked-in runtime and rejects any
diff, so stale pins cannot silently replace a newer tested browser image.

When the repository has no Cloudflare secrets, CI performs that complete build
and consistency check but does not publish. An authenticated maintainer can
publish the same pinned image with `npm run deploy`.
