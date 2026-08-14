# SilvoTech redesign

## What changed

- Rebuilt the homepage hero as a full-screen dark industrial composition.
- Replaced the former flat animation with a local WebGL liquid-silicone scene; no external Mux/HLS footage is used.
- Added a glass navigation system and responsive mobile menu.
- Integrated the supplied transparent and black silicone-hose photos without cropping (`object-fit: contain`).
- Redesigned product, production, quality, specification, contact, and footer styling as one visual system.
- Added the supplied Polish positioning statement and faithful English/German translations.
- Kept the existing product facts, dimensions, contact details, compliance information, and RFQ flow.
- Added reduced-motion handling and a non-WebGL visual fallback.

## Run locally

```bash
pnpm install
pnpm dev
```

Production check:

```bash
pnpm build
```
