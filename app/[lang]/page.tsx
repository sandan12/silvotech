import { getDictionary, type Locale } from '@/lib/i18n';
import { signVideoToken } from '@/lib/video-token';
import ClientPage from './client-page';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  const token = signVideoToken();
  const heroVideoSrc = {
    mp4: `/api/hero-video?v=mp4&t=${token}`,
    webm: `/api/hero-video?v=webm&t=${token}`,
    poster: `/api/hero-video?v=poster&t=${token}`,
  };

  return <ClientPage dict={dict} lang={locale} heroVideoSrc={heroVideoSrc} />;
}