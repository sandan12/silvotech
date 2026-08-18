import { getDictionary, type Locale } from '@/lib/i18n';
import ClientPage from './client-page';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return <ClientPage dict={dict} lang={locale} />;
}