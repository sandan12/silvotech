# SilvoTech redesign — B2B refinement

## Updated visual system

- Restored the original SilvoTech palette: navy `#17365d`, orange `#e2762e`, cool off-white `#f8fafb`, and steel-grey support colours.
- Replaced the editorial serif with the rounder, lighter Manrope hierarchy used across headings and body copy.
- Removed decorative lines before section labels and the dot before the hero label.
- Removed the product card from the hero so the liquid silicone motion graphic has a cleaner B2B presentation.
- Refined the local WebGL animation into a thinner, finite, translucent silicone tube with restrained flow highlights and pointer parallax.
- Added subtle scroll-reveal transitions, staggered card entrances, and restrained hover movement.
- Added reduced-motion handling and a non-WebGL fallback.

## Product presentation

- Removed visible `SVT-SIL-CL` / `SVT-SIL-BK` labels from product cards, specifications, production cards, and the RFQ selector.
- Kept internal SKU values only where needed for structured data and form processing.
- Matched image surfaces to the white source-image backgrounds so the hoses blend into their cards.
- Continued to use `object-fit: contain`, so supplied product photos are not cropped.

## Run locally

```bash
pnpm install
pnpm dev
```

Production check:

```bash
pnpm build
```
