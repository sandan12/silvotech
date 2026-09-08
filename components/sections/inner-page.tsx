import type { ReactNode } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';
import Header from './header';
import PageHero from './page-hero';
import CTABand from './cta-band';
import Footer from './footer';
export default function InnerPage({ dict, lang, title, eyebrow, lead, children }: { dict: Dictionary; lang: Locale; title: string; eyebrow?: string; lead?: string; children: ReactNode }) {
  return <><a href="#main" className="skip-link">{dict.skipToContent}</a><Header dict={dict} lang={lang} /><main id="main"><PageHero eyebrow={eyebrow} title={title} lead={lead} />{children}<CTABand dict={dict} lang={lang} /></main><Footer dict={dict} lang={lang} /></>;
}
