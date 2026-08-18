'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function VideoHero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative flex min-h-[84vh] items-center justify-center overflow-hidden bg-navy-deep">
      <video autoPlay muted loop playsInline poster="/silvotech-transform-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
        <source src="/silvotech-transform.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      <div className="container-page relative z-10 py-32 text-center">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
        >
          {dict.heroEyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-6 max-w-[16ch] text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.12] text-white"
        >
          {dict.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
        >
          {dict.heroLead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={`/${lang}/kontakt`} className="btn btn-cta">
            {dict.heroPrimaryCta}
          </Link>
          <Link href={`/${lang}/oferta`} className="btn btn-outline-light">
            {dict.heroSecondaryCta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}