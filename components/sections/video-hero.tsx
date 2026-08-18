'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function VideoHero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="overflow-hidden bg-white pt-[7.5rem]">
      <div className="relative w-full bg-white">
        <video
          autoPlay
          muted
          playsInline
          poster="/silvotech-transform-poster.jpg"
          className="h-[36vh] w-full object-cover md:h-[54vh]"
        >
          <source src="/silvotech-transform.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container-page pb-20 pt-14 text-center md:pt-20">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue"
        >
          {dict.heroEyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-5 max-w-[18ch] text-[clamp(2rem,4.8vw,3.4rem)] font-bold leading-[1.12] text-ink"
        >
          {dict.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-body md:text-lg"
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
          <Link href={`/${lang}/oferta`} className="btn btn-outline">
            {dict.heroSecondaryCta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}