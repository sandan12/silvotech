import type { Dictionary, Locale } from '@/lib/i18n';
import type { HeroVideoSources } from '@/lib/hero-video';
import Header from '@/components/sections/header';
import CatalogHome from '@/components/sections/catalog';
import Footer from '@/components/sections/footer';

export default function ClientPage({ dict, lang, heroVideoSrc }: { dict: Dictionary; lang: Locale; heroVideoSrc: HeroVideoSources | null }) {
  return <><a href="#main" className="skip-link">{dict.skipToContent}</a><Header dict={dict} lang={lang} /><main id="main"><CatalogHome dict={dict} lang={lang} heroVideoSrc={heroVideoSrc} /></main><Footer dict={dict} lang={lang} /></>;
}
