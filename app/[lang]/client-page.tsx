import type { Dictionary, Locale } from '@/lib/i18n';
import Header from '@/components/sections/header';
import CatalogHome from '@/components/sections/catalog';
import Footer from '@/components/sections/footer';

export default function ClientPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return <>
    <a href="#main" className="skip-link">{dict.skipToContent}</a>
    <Header dict={dict} lang={lang} />
    <main id="main"><CatalogHome dict={dict} lang={lang} /></main>
    <Footer dict={dict} lang={lang} />
  </>;
}
