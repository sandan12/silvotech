# SilvoTech manufacturer redesign

The site was rebuilt around one message: SilvoTech is a direct B2B manufacturer and production partner, not a shop or a closed catalogue.

## Main changes

- Replaced the full-screen hero video with an optimized real production photo.
- Reframed the homepage around production, materials, custom manufacturing, Warsaw stock and recurring deliveries.
- Added product groups for hoses, gaskets, profiles, sheets, technical parts, plastics and custom production.
- Added a dedicated `/produkcja` page.
- Rebuilt the company, cooperation, quality and contact pages.
- Added product material groups: silicone, rubber, EPDM, NBR and plastics.
- Added image and technical-drawing attachments to the B2B form.
- Added attachment validation, honeypot and basic per-instance rate limiting.
- Added security headers, sitemap, robots, canonical/hreflang metadata, Open Graph and Organization structured data.
- Converted supplied photos to optimized WebP. Original high-resolution files are not public.
- Reduced the client boundary to the form and media-protection helper; the content is rendered on the server.

## Deployment

See `README.md`. Vercel needs SMTP environment variables for the form.
