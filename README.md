# SilvoTech website

Multilingual Next.js website for SilvoTech, positioned as a direct B2B manufacturer of silicone, rubber, EPDM, NBR and plastic products.

## Replace the repository on GitHub

1. Download the delivered ZIP and extract it.
2. Open your SilvoTech repository on GitHub.
3. Replace the old project files with the contents of this folder. Do not upload the outer ZIP folder as an extra nested directory.
4. Commit the changes to the branch connected to Vercel.
5. Vercel will start a new deployment automatically.

## Required Vercel environment variables

Configure these in Vercel → Project → Settings → Environment Variables:

- `SMTP_HOST`
- `SMTP_PORT` (usually `465`)
- `SMTP_USER`
- `SMTP_PASSWORD`
- `LEAD_INBOX`

The contact form will not deliver messages without valid SMTP settings.

## Local verification

```bash
npm ci
npm run build
npm run dev
```

## Media

Only optimized WebP website versions are stored under `public/media`. Keep original high-resolution photos outside the public repository. Browser-side measures discourage ordinary saving and dragging, but no website can make displayed media impossible to capture.

## Form attachments

The form accepts JPG, PNG, WEBP and PDF files, up to 4 MB each. Attachments are sent to the configured inbox and are not stored in a public folder.
