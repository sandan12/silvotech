import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Nunito } from 'next/font/google';
import { isLocale, localeNames, locales } from '@/lib/i18n';
import MediaProtection from '@/components/media-protection';
import '../globals.css';
import '../soft-redesign.css';

const nunito = Nunito({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateStaticParams() { return locales.map((lang) => ({ lang })); }
export const dynamicParams = false;
export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{lang:string}> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={localeNames[lang].htmlLang} className={nunito.variable}><body><MediaProtection/>{children}</body></html>;
}
