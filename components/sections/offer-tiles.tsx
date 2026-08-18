'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Package, Layers, CircleDot, Puzzle } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';

const icons = [Package, Layers, CircleDot, Puzzle];

export default function OfferTiles({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cats = Array.from({ length: 4 }, (_, i) => ({
    title: dict[`offerCat${i + 1}Title`],
    desc: dict[`offerCat${i + 1}Desc`],
  }));

  return (
    <section ref={ref} className="section-padding">
      <div className="container-page">
        <div className="section-heading--center">
          <span className="eyebrow">{dict.offerEyebrow}</span>
          <h2 className="section-title">{dict.offerCatsTitle}</h2>
          <p className="section-lead mx-auto">{dict.offerLead}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link
                  href={`/${lang}/oferta`}
                  className="card hover-lift group block h-full p-7"
                >
                  <span className="flex h-13 w-13 items-center justify-center rounded-lg bg-navy text-white">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 text-base font-semibold text-ink">{cat.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{cat.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition group-hover:gap-3">
                    {dict.cta} <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}