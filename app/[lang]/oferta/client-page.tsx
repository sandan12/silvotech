'use client';

import type { Dictionary, Locale } from '@/lib/i18n';
import Header from '@/components/sections/header';
import PageHero from '@/components/sections/page-hero';
import Offer from '@/components/sections/offer';
import DocsBand from '@/components/sections/docs-band';
import CTABand from '@/components/sections/cta-band';
import Footer from '@/components/sections/footer';

export default function OfferPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero eyebrow={dict.offerEyebrow} title={dict.offerTitle} lead={dict.offerLead} />
        <Offer dict={dict} lang={lang} />
        <DocsBand dict={dict} />
        <CTABand dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}