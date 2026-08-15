# Linoctis

The browser home of the L.in.oleum Noctis port. This repository owns the
playable website, the Lino-inspired GUI host, browser input and fullscreen,
and Cloudflare Pages deployment. The reusable language compiler/runtime lives
in [Fabulu/linojava](https://github.com/Fabulu/linojava).

The current site is the first interactive runtime slice, not yet the complete
Noctis game. It compiles `src/noctis_probe.lino` with LinoJava, runs the result
inside the browser GUI, and lets the player move the probe with WASD or the
arrow keys. This gives the real compiler, execution, rendering, input, resize,
and fullscreen path a small end-to-end workload while the full Noctis language
surface is brought across.

## Local build

Place the LinoJava repository beside this one, then run:

```powershell
npm run build
npm test
npx serve public
```

Set `LINOJAVA_DIR` to use another checkout. The Cloudflare workflow checks out
the pinned compiler revision independently and deploys `public` to the
`linoctis` Pages project using the existing `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` repository-secret convention.
