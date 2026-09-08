import { getDictionary, type Locale } from '@/lib/i18n';
import { getHeroVideoSources } from '@/lib/hero-video';
import ClientPage from './client-page';

export const revalidate = 3600;
export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  return <ClientPage dict={getDictionary(locale)} lang={locale} heroVideoSrc={await getHeroVideoSources()} />;
}
