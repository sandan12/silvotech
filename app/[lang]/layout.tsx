import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
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