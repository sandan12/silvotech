'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Intro({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="band section-padding">
      <div className="container-page text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="eyebrow">{dict.aboutEyebrow}</span>
          <h2 className="mx-auto mt-5 max-w-[24ch] text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-ink">{dict.aboutTagline}</h2>
          <div className="mx-auto mt-7 max-w-3xl space-y-5 text-left md:text-center">
            <p className="leading-relaxed text-body">{dict.aboutP1}</p>
            <p className="leading-relaxed text-body">{dict.aboutP2}</p>
            <p className="leading-relaxed text-body">{dict.aboutP3}</p>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${lang}/kontakt`} className="btn btn-cta">
              {dict.aboutCtaQuote}
            </Link>
            <Link href={`/${lang}/oferta`} className="btn btn-outline">
              {dict.aboutCtaOffer}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}