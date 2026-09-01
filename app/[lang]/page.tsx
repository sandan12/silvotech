import { getDictionary, type Locale } from '@/lib/i18n';
import { getHeroVideoSources } from '@/lib/hero-video';
import ClientPage from './client-page';

/**
 * The only page here that is not fully static: it is regenerated hourly so the
 * signed hero video URLs are refreshed long before their six-day lifetime ends.
 * Locale params come from the layout's generateStaticParams.
 */
export const revalidate = 3600;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const heroVideoSrc = await getHeroVideoSources();

  return <ClientPage dict={dict} lang={locale} heroVideoSrc={heroVideoSrc} />;
}
