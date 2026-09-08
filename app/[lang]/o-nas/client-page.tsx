import type { Dictionary, Locale } from '@/lib/i18n';
import { siteCopy } from '@/lib/site-copy';
import InnerPage from '@/components/sections/inner-page';
import { AboutContent } from '@/components/sections/site-sections';
export default function Page({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return <InnerPage dict={dict} lang={lang} title={siteCopy[lang].aboutTitle} eyebrow={dict.navAbout}><AboutContent dict={dict} lang={lang} /></InnerPage>;
}
