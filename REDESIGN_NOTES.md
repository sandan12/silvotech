# SilvoTech redesign — flat B2B corporate layout

Rebuilt to match the reference sites the client picked (purityflow.pl,
solmatic.pl): plain-spoken industrial B2B look, not an "AI generated" one.

## What changed

- **Removed all glassmorphism / blur / glow.** No `backdrop-filter`, no
  floating "liquid glass" cards or pill-shaped nav, no radial-gradient glow
  decoration, no film grain textures.
- **Removed the animated SVG hero** (the hose that "wrote" the word
  SilvoTech) and the floating multi-photo hero composition. Replaced with a
  single static full-bleed factory photo + dark scrim + plain text, the same
  pattern both reference sites use for their hero.
- **Header** is now a solid white bar with a thin bottom border instead of a
  sticky glass pill.
- **New "offer" tile grid** (`components/sections/offer-grid.tsx`) right
  under the hero — four photo tiles linking to Products / Sizes / Quality,
  the same pattern as Solmatic's "Nasza oferta" and Purity Flow's category
  tiles.
- **Production section** switched from an inverted dark panel back to the
  same light background as the rest of the page, matching the consistently
  light layout of both references.
- **Motion** simplified to one restrained opacity/translateY fade on scroll
  (no blur, no scale, no bounce).
- Deleted dead/unused files left over from earlier iterations:
  `silicone-scene.tsx`, `silicone-flow.tsx`, `hero-video.tsx`,
  `materials-strip.tsx`, `app/[lang]/silvo-landing.tsx` and its private
  stylesheet, plus a large block of duplicate/minified legacy CSS that had
  accumulated in `globals.css` (including a reference to an unloaded
  `--font-editorial` font).
- `app/globals.css` now only holds design tokens + base reset.
  `app/visual-redesign.css` is the single source of truth for every
  component's look.

## Visual system retained

- SilvoTech navy `#17365d`, orange `#e2762e`, off-white background, steel
  grey — same 5-colour palette as before.
- Manrope for text, IBM Plex Mono for small labels.
- Product photography stays uncropped where it's shown as a detail shot
  (`object-fit: contain`); new tile/hero imagery uses `cover` since it's
  meant as a photographic backdrop, matching the reference sites.

## Run locally

```bash
pnpm install
pnpm dev
```

Production check:

```bash
pnpm build
```
