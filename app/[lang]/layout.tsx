import type { Metadata } from 'next';
import { Manrope, Sora, IBM_Plex_Mono } from 'next/font/google';
import { locales } from '@/lib/i18n';
import '../globals.css';

/** Body and UI. Soft humanist sans, rounded and approachable, not technical-grotesque. */
const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

/** Headings. Geometric but soft, sentence case, no uppercase shouting. */
const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

/** Eyebrows, measurements, part codes. */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SilvoTech — Producent wyrobów silikonowych w Europie',
  description: 'Producent wyrobów silikonowych: węże, arkusze, uszczelki i produkty na zamówienie. Produkcja i dystrybucja w Europie. Oferty B2B.',
};

/**
 * Declared once here so every page under /[lang] is prerendered for all five
 * locales instead of being rendered by a function on each request.
 */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/**
 * Anything outside the five locales is a 404 rather than a page silently
 * served with the Polish dictionary under a wrong URL.
 */
export const dynamicParams = false;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      className={`${manrope.variable} ${sora.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
