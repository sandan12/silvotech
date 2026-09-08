import type { Dictionary, Locale } from '@/lib/i18n';
import InnerPage from '@/components/sections/inner-page';
import { DocumentsContent } from '@/components/sections/site-sections';
export default function Page({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return <InnerPage dict={dict} lang={lang} title={dict.qualityTitle} eyebrow={dict.navDocs}><DocumentsContent dict={dict} lang={lang} /></InnerPage>;
}
