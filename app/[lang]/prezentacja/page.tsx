import type { Metadata } from 'next';
import { getDictionary, locales, type Locale } from '@/lib/i18n';
import DeckClient from './client-page';

export const metadata: Metadata = {
  title: 'SilvoTech — prezentacja A4 (PDF)',
  description: 'Prezentacja handlowa SilvoTech w formacie A4 — do druku i zapisu jako PDF.',
  robots: { index: false, follow: false },
};

export default async function PresentationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (locales.includes(lang as Locale) ? lang : 'pl') as Locale;

  return <DeckClient dict={getDictionary(locale)} lang={locale} />;
}
