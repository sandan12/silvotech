import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import { getQuoteSelection } from '@/lib/quote-selection';
import ClientPage from './client-page';

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: `${getDictionary(lang as Locale).navContact} — SilvoTech` };
}
export default async function ContactPage({ params, searchParams }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const selection = getQuoteSelection(await searchParams, dict);
  return <ClientPage dict={dict} lang={locale} selection={selection} />;
}
