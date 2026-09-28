import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getCapabilityCopy } from '@/lib/capabilities';
import { getSiteCopy } from '@/lib/site-content';
import { pageMetadata } from '@/lib/metadata';
import PageFrame from '@/components/sections/page-frame';
import CapabilityPage from '@/components/sections/capability-page';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLocale(raw) ? raw : 'pl') as Locale;
  const ui = getCapabilityCopy(lang);
  return pageMetadata(lang, 'oferta', ui.heading, ui.introduction);
}

export default async function OfferPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLocale(raw) ? raw : 'pl') as Locale;
  return <PageFrame copy={getSiteCopy(lang)} lang={lang} path="/oferta"><CapabilityPage lang={lang}/></PageFrame>;
}
