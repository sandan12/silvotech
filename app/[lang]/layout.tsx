import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { locales } from '@/lib/i18n';
import '../globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
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
    <html lang={lang} className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
