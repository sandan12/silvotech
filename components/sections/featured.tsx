'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Featured({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cards = [
    {
      image: '/hose-clear-coil-a.png',
      tag: dict.homeProd1Tag,
      title: dict.homeProd1Title,
      desc: dict.homeProd1Desc,
      specs: [dict.homeProd1Spec1, dict.homeProd1Spec2, dict.homeProd1Spec3],
    },
    {
      image: '/hose-black-industrial.png',
      tag: dict.homeProd2Tag,
      title: dict.homeProd2Title,
      desc: dict.homeProd2Desc,
      specs: [dict.homeProd2Spec1, dict.homeProd2Spec2, dict.homeProd2Spec3],
    },
  ];

  return (
    <section ref={ref} className="band section-padding">
      <div className="container-page">
        <div className="section-heading--center">
          <span className="eyebrow">{dict.homeProdEyebrow}</span>
          <h2 className="section-title">{dict.homeProdTitle}</h2>
          <p className="section-lead mx-auto">{dict.homeProdLead}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.4, 0, 0.2, 1] }}
              className="card card-shadow hover-lift flex flex-col overflow-hidden"
            >
              <div className="relative h-72 overflow-hidden bg-white p-6">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
                <span className="absolute left-8 top-8 rounded bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy shadow-sm">
                  {card.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{card.desc}</p>
                <ul className="mt-5 space-y-2.5">
                  {card.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-band-deep text-navy">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-line pt-6">
                  <Link href={`/${lang}/kontakt`} className="btn btn-cta !px-5 !py-2.5 text-sm">
                    {dict.homeProdCta1}
                  </Link>
                  <Link href={`/${lang}/oferta`} className="btn btn-outline !px-5 !py-2.5 text-sm">
                    {dict.homeProdCta2}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}