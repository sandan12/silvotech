import { getDictionary, type Locale } from '@/lib/i18n';
import ClientPage from './client-page';

// Product-led homepage has no remote video dependency.
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  return <ClientPage dict={getDictionary(locale)} lang={locale} />;
}
