'use client';

import type { Dictionary, Locale } from '@/lib/i18n';
import Header from '@/components/sections/header';
import PageHero from '@/components/sections/page-hero';
import About from '@/components/sections/about';
import CTABand from '@/components/sections/cta-band';
import Footer from '@/components/sections/footer';

export default function AboutPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero eyebrow={dict.aboutEyebrow} title={dict.aboutTagline} />
        <About dict={dict} lang={lang} />
        <CTABand dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}