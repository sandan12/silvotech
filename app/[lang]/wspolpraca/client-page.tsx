'use client';

import type { Dictionary, Locale } from '@/lib/i18n';
import Header from '@/components/sections/header';
import PageHero from '@/components/sections/page-hero';
import Cooperation from '@/components/sections/cooperation';
import CTABand from '@/components/sections/cta-band';
import Footer from '@/components/sections/footer';

export default function CoopPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero eyebrow={dict.industriesEyebrow} title={dict.industriesTitle} lead={dict.productionLead} />
        <Cooperation dict={dict} />
        <CTABand dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}