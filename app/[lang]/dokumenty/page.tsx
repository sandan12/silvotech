import type { Metadata } from 'next';
import { getDictionary, type Locale } from '@/lib/i18n';
import ClientPage from './client-page';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang as Locale);
  return { title: `${dict.navDocs} — SilvoTech` };
}

export default async function DocsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return <ClientPage dict={dict} lang={locale} />;
}