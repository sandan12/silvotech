import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { isLocale, localeNames, locales } from '@/lib/i18n';
export function generateStaticParams() { return locales.map((lang) => ({ lang })); }
export const dynamicParams = false;
export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{lang:string}> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <div lang={localeNames[lang].htmlLang}>{children}</div>;
}
