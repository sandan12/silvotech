'use client';

import type { Dictionary, Locale } from '@/lib/i18n';
import type { HeroVideoSources } from '@/lib/hero-video';
import Header from '@/components/sections/header';
import VideoHero from '@/components/sections/video-hero';
import OfferTiles from '@/components/sections/offer-tiles';
import Featured from '@/components/sections/featured';
import Sizes from '@/components/sections/sizes';
import Intro from '@/components/sections/intro';
import CoopStrip from '@/components/sections/coop-strip';
import WhyUs from '@/components/sections/why-us';
import CTABand from '@/components/sections/cta-band';
import Footer from '@/components/sections/footer';

/**
 * Section order is a narrative, and each block has exactly one job:
 * what we make -> the two flagship hoses -> the sizes you can order ->
 * how and where we make it -> where it is used -> what paperwork comes with it.
 */
export default function ClientPage({
  dict,
  lang,
  heroVideoSrc,
}: {
  dict: Dictionary;
  lang: Locale;
  heroVideoSrc: HeroVideoSources | null;
}) {
  return (
    <>
      <a href="#main" className="skip-link">
        {dict.skipToContent}
      </a>
      <Header dict={dict} lang={lang} />
      <main id="main">
        <VideoHero dict={dict} lang={lang} videoSrc={heroVideoSrc} />
        <OfferTiles dict={dict} lang={lang} />
        <Featured dict={dict} lang={lang} />
        <Sizes dict={dict} lang={lang} />
        <Intro dict={dict} lang={lang} />
        <CoopStrip dict={dict} lang={lang} />
        <WhyUs dict={dict} lang={lang} />
        <CTABand dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
