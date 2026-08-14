# SilvoTech redesign — single-line hose animation

## Latest hero update

- The hero now uses one continuous SVG path shaped as the word `SilvoTech`.
- A translucent silicone hose is progressively drawn from left to right along that path.
- An orange guide point follows the active end of the hose while the word is forming.
- After completion, a restrained highlight travels through the hose and the word has a very subtle breathing motion.
- Pointer movement adds limited parallax on desktop without making the B2B presentation playful or distracting.
- Mobile order was adjusted so the complete `SilvoTech` word appears between the introduction and the calls to action.
- `prefers-reduced-motion` displays the completed word immediately and disables all continuous movement.

## Visual system retained

- Original SilvoTech navy `#17365d`, orange `#e2762e`, off-white and steel-grey palette.
- Rounded Manrope typography.
- No decorative lines or dots before section labels.
- Supplied product imagery remains uncropped with `object-fit: contain`.
- Visible product SKU labels remain removed.

## Run locally

```bash
pnpm install
pnpm dev
```

Production check:

```bash
pnpm build
```
