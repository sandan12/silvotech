'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Handshake, PenTool, Factory, Rocket, Headphones, ShieldCheck, Scale, Flame, MessagesSquare } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';

const stepIcons = [Handshake, PenTool, Factory, Rocket, Headphones];
const valueIcons = [ShieldCheck, Scale, Flame, MessagesSquare];

export default function About({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const steps = Array.from({ length: 5 }, (_, i) => ({
    title: dict[`aboutStep${i + 1}Title`],
    p1: dict[`aboutStep${i + 1}P1`],
    p2: dict[`aboutStep${i + 1}P2`],
  }));

  const values = Array.from({ length: 4 }, (_, i) => ({
    title: dict[`aboutValue${i + 1}Title`],
    text: dict[`aboutValue${i + 1}Text`],
  }));

  return (
    <section ref={ref} className="section-padding">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mt-7 space-y-5">
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

        <div className="mt-24">
          <div className="section-heading--center">
            <h2 className="section-title">{dict.aboutHowTitle}</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.4, 0, 0.2, 1] }}
                  className="card hover-lift p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                      <Icon size={20} />
                    </span>
                    <span className="text-3xl font-bold text-line">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{step.p1}</p>
                  <p className="mt-3 text-sm leading-relaxed text-body">{step.p2}</p>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link href={`/${lang}/kontakt`} className="group flex h-full flex-col justify-between rounded-lg bg-orange p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-dark hover:shadow-lg">
                <div>
                  <h3 className="text-lg font-semibold text-white">{dict.aboutCtaQuote}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{dict.contactLead}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:gap-3">
                  {dict.cta} <span aria-hidden>→</span>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-24">
          <div className="section-heading--center">
            <h2 className="section-title">{dict.aboutValuesTitle}</h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.4, 0, 0.2, 1] }}
                  className="card hover-lift p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-band-deep text-navy">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-ink">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{value.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}