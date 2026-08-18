'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { UtensilsCrossed, Factory, Truck } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';

const icons = [UtensilsCrossed, Factory, Truck];

export default function CoopStrip({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = [
    { title: dict.industry1Title, text: dict.industry1Text, points: [dict.industry1P1, dict.industry1P2, dict.industry1P3] },
    { title: dict.industry2Title, text: dict.industry2Text, points: [dict.industry2P1, dict.industry2P2, dict.industry2P3] },
    { title: dict.industry3Title, text: dict.industry3Text, points: [dict.industry3P1, dict.industry3P2, dict.industry3P3] },
  ];

  return (
    <section ref={ref} className="band section-padding">
      <div className="container-page">
        <div className="section-heading--center">
          <span className="eyebrow">{dict.industriesEyebrow}</span>
          <h2 className="section-title">{dict.industriesTitle}</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.4, 0, 0.2, 1] }}
                className="card hover-lift p-8"
              >
                <span className="flex h-13 w-13 items-center justify-center rounded-lg bg-navy text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.text}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={`/${lang}/wspolpraca`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition hover:gap-3">
                  {dict.navCoop} <span aria-hidden>→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}