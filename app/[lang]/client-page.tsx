'use client';

import type { Dictionary, Locale } from '@/lib/i18n';
import Header from '@/components/sections/header';
import VideoHero from '@/components/sections/video-hero';
import Intro from '@/components/sections/intro';
import OfferTiles from '@/components/sections/offer-tiles';
import Featured from '@/components/sections/featured';
import WhyUs from '@/components/sections/why-us';
import CoopStrip from '@/components/sections/coop-strip';
import CTABand from '@/components/sections/cta-band';
import Footer from '@/components/sections/footer';

export default function ClientPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <VideoHero dict={dict} lang={lang} />
        <Intro dict={dict} lang={lang} />
        <OfferTiles dict={dict} lang={lang} />
        <Featured dict={dict} lang={lang} />
        <WhyUs dict={dict} />
        <CoopStrip dict={dict} lang={lang} />
        <CTABand dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}