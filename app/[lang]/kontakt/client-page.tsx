'use client';

import type { Dictionary, Locale } from '@/lib/i18n';
import type { QuoteSelection } from '@/lib/quote-selection';
import Header from '@/components/sections/header';
import PageHero from '@/components/sections/page-hero';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';

export default function ContactPage({ dict, lang, selection }: { dict: Dictionary; lang: Locale; selection?: QuoteSelection }) {
  return <>
    <a href="#main" className="skip-link">{dict.skipToContent}</a>
    <Header dict={dict} lang={lang} />
    <main id="main">
      <PageHero eyebrow={dict.contactEyebrow} title={dict.contactTitle} lead={dict.contactLead} />
      <Contact key={`${selection?.product ?? ''}:${selection?.size ?? ''}`} dict={dict} lang={lang} selection={selection} />
    </main>
    <Footer dict={dict} lang={lang} />
  </>;
}
