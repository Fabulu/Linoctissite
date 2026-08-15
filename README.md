# Linoctis

Linoctis is the browser home of the L.in.oleum Noctis port. The reusable
JavaScript compiler and machine live in
[Fabulu/linojava](https://github.com/Fabulu/linojava).

The site now loads the current `work/vhgame.txt` project, its 73 Lino modules,
and 23 stockfile assets. LinoJava links and compiles that source in the browser,
runs the real IsoKernel startup sequence, and presents the 400 by 300 Noctis
framebuffer drawn by Lino itself. HTML provides only the page shell, loading
status, input bridge, and an easy reversible fullscreen control.

The current build reaches real cupola game frames and accepts pointer state,
queued ASCII input, and the complete held-key table through the Lino
communication area. WASD, arrows, modifiers, function keys, and keypad controls
therefore reach the running game directly. The machine honors Lino's
millisecond sleep requests and continues across browser animation frames.
Fullscreen presents Lino's live `VHGUI` game rectangle rather than enlarging
the surrounding desktop title bar. A visible corner control, double-click, or
Ctrl+Shift+F returns to windowed mode without consuming Noctis's Escape key.

This is an early compatibility build. Unsupported native paths still stop with
an explicit error, and the renderer has not yet passed the native visual oracle.
Audio, persistence, remaining host services, speed, renderer fidelity, and
complete game-mode coverage remain active work.

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
builds and deploys.
