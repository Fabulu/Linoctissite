# Linoctis

Linoctis is the browser home of the L.in.oleum Noctis port. The reusable
JavaScript compiler and machine live in
[Fabulu/linojava](https://github.com/Fabulu/linojava).

The site now loads the unmodified `examples/iGUIcli.txt` project, its 14 Lino
modules, and 23 stockfile assets. LinoJava links and compiles that source in the
browser, runs the real IsoKernel startup sequence, and presents the 400 by 300
iGUI framebuffer drawn by Lino itself. HTML provides only the page shell,
loading status, and an easy reversible fullscreen control.

This is the real-GUI bring-up, not yet the complete Noctis game. Pointer state
is mapped into the Lino communication area and the machine continues across
browser animation frames. Keyboard, audio, persistence, the remaining host
services, and the complete Noctis source/intrinsic set follow in later waves.

## Local build

Place the `linojava` and `linoleum` repositories beside this one, then run:

```powershell
npm run build
npm test
npx serve public
```

Set `LINOJAVA_DIR` or `LINO_SOURCE_DIR` to use different checkouts. The build
copies only the transitive iGUI source and stockfile closure into `public`.
Cloudflare Pages checks out pinned revisions of both repositories before it
builds and deploys.
