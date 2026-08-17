# Linoctis

Linoctis is the browser home of the L.in.oleum Noctis port. The reusable
JavaScript compiler and machine live in
[Fabulu/linojava](https://github.com/Fabulu/linojava).

The site now loads the current `work/vhgame.txt` project, its 73 Lino modules,
and 23 stockfile assets. LinoJava links and compiles that source in the browser,
runs the real IsoKernel startup sequence, and presents the 400 by 300 Noctis
framebuffer drawn by Lino itself. HTML provides only the page shell, loading
status, input bridge, and an easy reversible fullscreen control.

The default runtime is pure JavaScript. It compiles and executes the linked
Lino machine in a module worker, while the browser thread presents completed
frames and handles the DOM. This keeps controls and the 60 Hz display loop
responsive during expensive game frames. Add `?mainThread` to the URL to use
the original single-threaded fallback for debugging.

Current browser integration includes:

- Pointer state, queued ASCII input, and the complete held-key table.
- WASD, arrows, modifiers, function keys, and keypad controls.
- Browser persistence for Lino files and GlobalK records.
- Stereo PCM playback bridged from the worker to Web Audio.
- Separate, honest rendered-FPS and display-refresh measurements.
- Fullscreen presentation of the live `VHGUI` game rectangle.

A visible corner control, double-click, or Ctrl+Shift+F returns to windowed
mode without consuming Noctis's Escape key.

This is an early compatibility build. Unsupported native paths still stop with
an explicit error, and the renderer has not yet passed the native visual oracle.
Renderer fidelity and complete game-mode coverage remain active work.

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
