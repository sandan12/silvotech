'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Phone } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company';

export default function CTABand({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-orange section-padding">
      <div className="container-page text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className="mx-auto max-w-[22ch] text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-white">{dict.ctaBandTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/85">{dict.ctaBandText}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${lang}/kontakt`} className="btn btn-navy">
              {dict.cta}
            </Link>
            <a href={COMPANY.phoneHref} className="btn btn-outline-light">
              <Phone size={16} />
              {COMPANY.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}