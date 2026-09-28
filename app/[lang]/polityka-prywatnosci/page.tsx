import type { Metadata } from 'next';
import PageFrame from '@/components/sections/page-frame';
import PageHero from '@/components/sections/page-hero';
import { isLocale, type Locale } from '@/lib/i18n';
import { getSiteCopy } from '@/lib/site-content';
import { getPrivacyCopy } from '@/lib/privacy-copy';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = (isLocale(raw) ? raw : 'pl') as Locale;
  const copy = getSiteCopy(lang);
  return pageMetadata(lang, 'polityka-prywatnosci', copy.footer.privacy, getPrivacyCopy(lang).lead);
}

export default async function Privacy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = (isLocale(raw) ? raw : 'pl') as Locale;
  const copy = getSiteCopy(lang);
  const privacy = getPrivacyCopy(lang);
  return <PageFrame copy={copy} lang={lang} path="/polityka-prywatnosci">
    <PageHero label="" title={copy.footer.privacy} lead={privacy.lead}/>
    <section className="section"><div className="shell legal-copy">
      {privacy.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    </div></section>
  </PageFrame>;
}
