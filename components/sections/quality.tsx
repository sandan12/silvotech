'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ShieldCheck, FileCheck2, Files, FlaskConical, Check } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

const icons = [ShieldCheck, FileCheck2, Files, FlaskConical];

export default function Quality({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = [
    { title: dict.qualityItem1Title, text: dict.qualityItem1Text },
    { title: dict.qualityItem2Title, text: dict.qualityItem2Text },
    { title: dict.qualityItem3Title, text: dict.qualityItem3Text },
    { title: dict.qualityItem4Title, text: dict.qualityItem4Text },
  ];

  const docs = [dict.qualityDoc1, dict.qualityDoc2, dict.qualityDoc3, dict.qualityDoc4];

  return (
    <section ref={ref} className="section-padding">
      <div className="container-page">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.4, 0, 0.2, 1] }}
                className="card hover-lift p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 rounded-lg bg-band p-8 md:flex-row md:gap-10"
        >
          <div className="shrink-0 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">{dict.qualityDocsTitle}</p>
            <div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-lg bg-navy text-white">
              <Files size={26} />
            </div>
          </div>
          <ul className="grid w-full gap-2.5 sm:grid-cols-2">
            {docs.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-navy">
                  <Check size={12} strokeWidth={3} />
                </span>
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}