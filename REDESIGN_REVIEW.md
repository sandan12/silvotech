# Product-led redesign — draft for review

## Scope

This is a first implementation, not an approved release. The homepage, shared header, offer content and quote form have been redesigned. About, cooperation, documents, presentation, footer and global legacy styles have NOT received a full redesign or regression pass.

- Static product-led first screen replaces the full-viewport, remote-video-dependent homepage. No autoplay, decorative animation or gradient in the new components.
- Product categories link to specific offer anchors. Custom manufacturing is a specification request, not an invented product photograph.
- Standard clear-hose size selection uses native radios and transfers an allowlisted product ID and size into the contact page.
- Offer CTA links preselect the relevant product; non-clear products accept custom dimension text instead of the clear-hose size list.
- Product suitability is framed around medium, temperature and pressure, not blanket food/medical/chemical certification claims.
- New copy is provided for PL, EN, DE, CZ and SK. Existing localized content is reused elsewhere.
- Navigation is product-first, supports active routes, mobile disclosure, Escape, outside click, and named language links.
- Existing server action, SMTP implementation, anti-bot field and field names are retained. The contact route now reads searchParams and is rendered dynamically.

## Images

No binary image was added or replaced. The implementation references existing product assets: hose-clear-coil-a.png, product-plates.webp, product-gaskets.webp and the existing logo. They are shown with contain, without artificial zoom/cropping. This does NOT certify that the existing images are real, licensed or representative. Their provenance and visual quality still need review. No fake factory, staff photo, testimonial or generated product geometry was introduced.

Offline QA placeholders were used ONLY in a separate local test harness, not in committed site components. A final preview with actual images remains outstanding.

## Checks actually completed

- Babel TypeScript/JSX parsing and PostCSS parsing of 11 implementation files.
- Isolated quote-selection checks: valid size, all five product IDs, repeated query values, invalid sizes, prototype-like product ID, and size rejection for non-clear products.
- esbuild bundle of homepage/header using mocked Next Link/Image/navigation and repository-data fixtures. This is NOT a Next production build or a full TypeScript check.
- Offline homepage layout captured and inspected at 1400px and 390px. No horizontal overflow detected in that harness. Images/logo were placeholders and the legacy footer/global CSS were not part of this check.

## Required before merge

- [ ] Run npm ci, npx tsc --noEmit and npm run build using the real repository and environment.
- [ ] Inspect actual images and source originals; replace any generated, misleading or unlicensed assets with approved product photography.
- [ ] Inspect every affected route and language on desktop/mobile, including longest German labels, menu/language open states and keyboard focus.
- [ ] Confirm catalogue anchors land below the fixed header in the actual Next app.
- [ ] Test clear/technical/plates/gaskets/custom quote links and all 28 clear-hose sizes end to end.
- [ ] Test form required/email/send-error/pending/success states and value retention, and verify actual email receipt in a controlled test.
- [ ] Confirm all dimensions, temperature ranges, availability and conformity statements in the existing dictionaries with the business owner. Existing product metadata and marketing copy contain differing temperature ranges; this change does not resolve that technical source-of-truth issue.
- [ ] Review other pages for broad material-resistance/medical-use promises and unverified staff/production imagery.

The execution environment could read/write GitHub through the integration but could not resolve GitHub hosts for cloning or downloading dependencies/assets. Therefore this branch must remain a draft until a real build and visual/functional regression pass is complete.
