# SilvoTech redesign review — v2

Updated 2026-09-08. This supersedes the first-iteration review. Preview only; PR #15 remains a draft and main/production has not been merged or promoted.

## Implementation

- Homepage reduced to five main sections: production-video hero, product categories, manufacturing, standard-size selector, enquiry CTA.
- Original private Blob hero-video source integration restored with six-day signed sources and hourly page revalidation. Muted inline looping video has a pause/play control and respects reduced-motion/data-saving preferences. An existing manufacturing photograph is the fallback when signed sources are unavailable.
- Consistent typography, restrained navy/neutral palette, shared spacing, four-pixel corners and equal-size CTA pairs.
- Shared presentation across home, offer, company, cooperation, documents and contact. Product and size selection continue into the enquiry form using an explicit allowlist.
- Existing company identity, actual company data imports, production photograph and mail backend preserved. No invented customers, factory scale, team photographs, certificates or download links added.
- New reference-based AI illustrations for clear hose and silicone sheets. Hose is cool-neutral white, translucent and slightly matte without a yellow cast. Sheets are flat stacked samples rather than folded rubber. These are illustrations, not verified product photography; the page includes a qualification.
- Original black-hose and gasket assets retained. Rejected earlier generated imagery is not referenced.
- Both selected AVIF images are stored durably in assets/generated/visuals.json and served by the versioned static /api/visuals endpoints. Total image payload: 7,397 bytes. No expiring conversation attachment URLs are used. Remote manifest blob hash matched the tested local manifest exactly.
- New copy exists in pl/en/de/cz/sk. Existing routes, metadata and backend configuration retained.

## Verification completed

- Vercel deployment reported success for application commit a4218e2f61c2f729f58eececad94c606c5933557.
- Source parsing, CSS parsing and six-route component bundling passed in an offline harness.
- Product/size allowlist tests passed, including invalid product keys, repeated parameters and unsupported sizes.
- Image-route tests passed for both AVIF bodies, content types and unknown-name rejection.
- Local browser checks passed for all six Polish page layouts at widths 390, 768 and 1400: one H1 and no horizontal overflow.
- Local interactive checks passed: mobile-menu open/Escape close; 6/10 selection creates the expected quote link; contact size is prefilled; mocked send failure displays an alert and retains entered company data. No real email was sent.
- Screenshots visually inspected: home desktop/mobile, offer desktop, cooperation desktop, company mobile, documents mobile and contact mobile. Captures checked showed no clipped content or horizontal overflow.

## Scope and release gates

The offline harness substitutes Next navigation/image handling, Polish copy fixtures, company-address/VAT fixtures, original-image crops and the mail action. Those fixtures are NOT committed as site content. Local screenshots use fallback typography and are not authenticated screenshots of the deployed app. Image screenshot review used the 850-pixel variants; the committed 640-pixel variants additionally passed asset integrity and route checks.

The deployment preview redirects unauthenticated access to Vercel login. Consequently these checks remain open before production publication:

- Authenticated live visual review, including actual fonts, original assets and all five locales.
- Actual Blob video playback and pause/play behavior in deployed desktop/mobile browsers, including reduced-motion and unavailable-video cases.
- Controlled end-to-end enquiry submission and confirmation of delivery to the configured mailbox.
- Final review of technical claims and product appearance by the company.

The eight-page printable presentation at /prezentacja was intentionally left unchanged and is not included in this redesign's visual QA. This is not a full accessibility, performance, legal or all-locale certification.

## Review links

- PR: https://github.com/sandan12/silvotech/pull/15
- Preview: https://silvotech-git-redesign-product-led-catalog-sandan12s-projects.vercel.app/pl
- Verified application deployment: https://vercel.com/sandan12s-projects/silvotech/9z68mAKMhzYq1QXi2gx1RVPix85G

Main and the public production domain remain unchanged until explicit approval to merge/publish.
