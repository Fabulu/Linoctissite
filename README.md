# Linoctis

Linoctis 1.0.0 is the browser home of the L.in.oleum Noctis port. The reusable
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

A visible corner control, double-click, or Ctrl+Shift+F returns to windowed
mode without consuming Noctis's Escape key.

This stable browser package tracks the same shared Lino source as desktop
`v1.0.0`. Unsupported native paths still stop with an explicit error. Browser
sustained 60 FPS and browser/native FPS parity are not claimed.

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
