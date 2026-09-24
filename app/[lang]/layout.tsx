import type { ReactNode } from 'react';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { isLocale, localeNames, locales } from '@/lib/i18n';
import MediaProtection from '@/components/media-protection';
import '../globals.css';

const manrope = Manrope({ subsets: ['latin','latin-ext'], variable: '--font-sans', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin','latin-ext'], weight: ['500','600'], variable: '--font-mono', display: 'swap' });
export function generateStaticParams() { return locales.map((lang) => ({ lang })); }
export const dynamicParams = false;

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{lang:string}> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={localeNames[lang].htmlLang} className={`${manrope.variable} ${mono.variable}`}><body><MediaProtection/>{children}</body></html>;
}
