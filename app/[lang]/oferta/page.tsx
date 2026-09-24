import { redirect } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';

export default async function OfferRedirect({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLocale(raw) ? raw : 'pl') as Locale;
  redirect(`/${lang}#produkty`);
}
