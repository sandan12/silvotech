# SilvoTech — B2B manufacturer website

Next.js 15 project with Polish, English, German, Czech and Slovak pages. The offer is presented as manufacturing capabilities with parameters to agree, not a stock catalogue or an unverified list of fixed specifications.

## Upload to GitHub

1. Extract this ZIP. Upload **the files inside it** to the root of your existing repository (or push them using Git). Do not put the entire project in an extra nested directory.
2. Commit to the branch connected to your hosting provider, then confirm that the production build succeeds.
3. Connect `silvotech.eu` and `www.silvotech.eu` to that deployment in your hosting and DNS settings. Merely uploading to GitHub does not replace the page served by another host. At the time this archive was prepared, the public domain showed a different site and `/pl` returned 404.
4. Check `/pl`, `/de`, `/cz`, `/sk`, `/pl/oferta`, `/robots.txt` and `/sitemap.xml` directly in a fresh browser session after deployment.

## Contact form

Set these environment variables on the deployment (for example Vercel → Project → Settings → Environment Variables):

- `SMTP_HOST`
- `SMTP_PORT` (typically `465`, depending on your mail provider)
- `SMTP_USER`
- `SMTP_PASSWORD`
- `LEAD_INBOX`

Without working SMTP settings, enquiries will not arrive. Send a real test enquiry with an attachment after deployment and confirm it in the recipient mailbox. The form accepts JPG, PNG, WEBP and PDF, up to 4 MB per file. Attachments are emailed to the configured inbox; they are not written to a public folder.

## Local run

```bash
npm ci
npm run build
npm run dev
```

## Content checks before publication

- Verify the business identity and NIP, warehouse and 24-hour dispatch conditions against your current operations.
- Check translations with native speakers and have the privacy text reviewed for your legal entity and data handling.
- Only publish numerical specifications, food-contact claims and certifications when they are supported for the specific product.

## Media

All images, the hero poster and the hero video under `public/` are byte-for-byte unchanged from v7.1. The same Nunito font settings are used. Do not assume that browser restrictions can prevent visitors from capturing images displayed on the site.
