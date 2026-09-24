/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob: https://*.public.blob.vercel-storage.com; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
];
const nextConfig = { poweredByHeader:false, images:{formats:['image/avif','image/webp']}, experimental:{serverActions:{bodySizeLimit:'10mb'}}, async headers(){return [{source:'/:path*',headers:securityHeaders}];} };
export default nextConfig;
