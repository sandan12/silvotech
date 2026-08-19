'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import {
  Handshake,
  PenTool,
  Factory,
  Rocket,
  Headphones,
  ShieldCheck,
  Scale,
  Flame,
  MessagesSquare,
  Stethoscope,
  UtensilsCrossed,
  Cpu,
  Cog,
  Wind,
  Home,
} from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';

const stepIcons = [Handshake, PenTool, Factory, Rocket, Headphones];
const valueIcons = [ShieldCheck, Scale, Flame, MessagesSquare];
const pillarIcons = [ShieldCheck, Factory, Headphones];
const appIcons = [Stethoscope, UtensilsCrossed, Cpu, Cog, Wind, Home];

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

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

  const pillars = Array.from({ length: 3 }, (_, i) => ({
    title: dict[`aboutPillar${i + 1}Title`],
    text: dict[`aboutPillar${i + 1}Text`],
  }));

  const apps = Array.from({ length: 6 }, (_, i) => ({
    title: dict[`aboutApp${i + 1}Title`],
    text: dict[`aboutApp${i + 1}Text`],
  }));

  const stats = Array.from({ length: 4 }, (_, i) => ({
    value: dict[`aboutStat${i + 1}Value`],
    label: dict[`aboutStat${i + 1}Label`],
  }));

  return (
    <>
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
              <span className="eyebrow">{dict.aboutPillarsEyebrow}</span>
              <h2 className="section-title">{dict.aboutPillarsTitle}</h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 22 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.4, 0, 0.2, 1] }}
                    className="card hover-lift p-8"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold text-ink">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-body">{pillar.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

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

          <div className="mx-auto mt-24 max-w-3xl text-center">
            <span className="eyebrow">{dict.aboutApproachEyebrow}</span>
            <h2 className="section-title">{dict.aboutApproachTitle}</h2>
            <p className="section-lead mx-auto">{dict.aboutApproachText}</p>
          </div>
        </div>
      </section>

      <section className="band band-navy section-padding">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow eyebrow--light">{dict.aboutGuaranteeEyebrow}</span>
            <h2 className="section-title text-white">{dict.aboutGuaranteeTitle}</h2>
            <p className="section-lead mx-auto text-white/70">{dict.aboutGuaranteeText}</p>
            <Link href={`/${lang}/dokumenty`} className="btn btn-outline-light">
              {dict.aboutGuaranteeCta}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <Reveal className="section-heading--center">
            <span className="eyebrow">{dict.aboutGeoEyebrow}</span>
            <h2 className="section-title">{dict.aboutGeoTitle}</h2>
            <p className="section-lead mx-auto">{dict.aboutGeoText}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} className="card hover-lift p-8 text-center">
                <div className="text-3xl font-bold text-navy">{stat.value}</div>
                <div className="mt-2 text-sm leading-relaxed text-body">{stat.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band section-padding">
        <div className="container-page">
          <Reveal className="section-heading--center">
            <span className="eyebrow">{dict.aboutAppsEyebrow}</span>
            <h2 className="section-title">{dict.aboutAppsTitle}</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app, i) => {
              const Icon = appIcons[i];
              return (
                <Reveal key={app.title} className="card hover-lift p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-band-deep text-navy">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-ink">{app.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{app.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}