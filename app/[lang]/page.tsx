import { getDictionary, locales, type Locale } from '@/lib/i18n';
import { getHeroVideoSources } from '@/lib/hero-video';
import ClientPage from './client-page';

/**
 * Cached for an hour, then regenerated. Keeps the page on the CDN instead of
 * running a function per visit, and refreshes the signed hero URLs long before
 * their six-day lifetime runs out.
 *
 * `revalidate` only takes effect on a dynamic segment once its params are
 * enumerated, hence generateStaticParams below.
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const heroVideoSrc = await getHeroVideoSources();

  return <ClientPage dict={dict} lang={locale} heroVideoSrc={heroVideoSrc} />;
}
