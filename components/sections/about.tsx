'use client';

import Image from 'next/image';
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
  FileCheck,
  FlaskConical,
  Ruler,
  PackageCheck,
  Play,
} from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';

const stepIcons = [Handshake, PenTool, Factory, Rocket, Headphones];
const valueIcons = [ShieldCheck, Scale, Flame, MessagesSquare];
const pillarIcons = [ShieldCheck, Factory, Headphones];
const appIcons = [Stethoscope, UtensilsCrossed, Cpu, Cog, Wind, Home];
const docIcons = [FileCheck, FlaskConical, Ruler, PackageCheck];
const appImages = [
  '/apps/app-medical.jpg',
  '/apps/app-food.jpg',
  '/apps/app-hightech.jpg',
  '/apps/app-transport.jpg',
  '/apps/app-hvac.jpg',
  '/apps/app-consumer.jpg',
];

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

  const docs = [
    { title: dict.qualityDoc1, icon: docIcons[0] },
    { title: dict.qualityDoc2, icon: docIcons[1] },
    { title: dict.qualityDoc3, icon: docIcons[2] },
    { title: dict.qualityDoc4, icon: docIcons[3] },
  ];

  return (
    <>
      {/* Intro — adapted from itekcorp "Подробнее о нас": text + media */}
      <section ref={ref} className="section-padding">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="space-y-5">
                <p className="leading-relaxed text-body">{dict.aboutP1}</p>
                <p className="leading-relaxed text-body">{dict.aboutP2}</p>
                <p className="leading-relaxed text-body">{dict.aboutP3}</p>
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href={`/${lang}/kontakt`} className="btn btn-cta">
                  {dict.aboutCtaQuote}
                </Link>
                <Link href={`/${lang}/oferta`} className="btn btn-outline">
                  {dict.aboutCtaOffer}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
              className="relative overflow-hidden rounded-2xl border border-line bg-band"
            >
              <Image
                src="/production-drum.jpg"
                alt={dict.productionImage1Alt || 'SilvoTech production line'}
                width={960}
                height={640}
                className="h-[320px] w-full object-cover lg:h-[420px]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" aria-hidden />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white">
                  <Play size={16} className="ml-0.5" />
                </span>
                <span className="text-sm font-semibold text-ink">SilvoTech — EU production</span>
              </div>
            </motion.div>
          </div>

          <div className="mt-16">
            <div className="section-heading--center">
              <span className="eyebrow">{dict.aboutPillarsEyebrow}</span>
              <h2 className="section-title">{dict.aboutPillarsTitle}</h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
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
                    <span className="icon-tile icon-tile--solid">
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
                      <span className="icon-tile icon-tile--solid">
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
                <Link
                  href={`/${lang}/kontakt`}
                  className="group flex h-full flex-col justify-between rounded-2xl bg-orange p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-dark hover:shadow-lg"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{dict.aboutCtaQuote}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{dict.contactLead}</p>
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

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                    <span className="icon-tile">
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

      {/* Team — adapted from itekcorp "Команда, которая делает результат" */}
      <section className="section-padding bg-band">
        <div className="container-page">
          <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <span className="eyebrow">{dict.aboutTeamEyebrow}</span>
              <h2 className="section-title">{dict.aboutTeamTitle}</h2>
              <p className="section-lead">{dict.aboutTeamText}</p>
              <p className="section-lead mt-4">{dict.aboutApproachText}</p>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl border border-line bg-white shadow-sm lg:order-2">
              <Image
                src="/winding-machine.webp"
                alt={dict.aboutTeamImageAlt}
                width={960}
                height={640}
                className="h-[340px] w-full object-cover lg:h-[440px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Guarantees + documents gallery — adapted from itekcorp certificates */}
      <section className="band band-navy section-padding">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow eyebrow--light">{dict.aboutGuaranteeEyebrow}</span>
            <h2 className="section-title text-white">{dict.aboutGuaranteeTitle}</h2>
            <p className="section-lead mx-auto text-white/70">{dict.aboutGuaranteeText}</p>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {docs.map((doc, i) => {
              const Icon = doc.icon;
              return (
                <Reveal key={doc.title} className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <span className="icon-tile">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-white">{doc.title}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10 text-center">
            <Link href={`/${lang}/dokumenty`} className="btn btn-outline-light">
              {dict.aboutGuaranteeCta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Geo + stats — adapted from itekcorp "Работаем с вами — в любом городе" */}
      <section className="section-padding">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="eyebrow">{dict.aboutGeoEyebrow}</span>
              <h2 className="section-title">{dict.aboutGeoTitle}</h2>
              <p className="section-lead">{dict.aboutGeoText}</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="card p-6 text-center">
                    <div className="text-2xl font-bold text-navy">{stat.value}</div>
                    <div className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="overflow-hidden rounded-2xl border border-line bg-band">
              <Image
                src="/extrusion-head.webp"
                alt={dict.aboutGeoTitle}
                width={960}
                height={720}
                className="h-[360px] w-full object-cover lg:h-[460px]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Applications — adapted from itekcorp "Где применяются" with real product images */}
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
                <Reveal key={app.title} className="card hover-lift overflow-hidden p-0">
                  <div className="relative h-48 overflow-hidden bg-band-deep">
                    <Image
                      src={appImages[i]}
                      alt={app.title}
                      width={640}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                    <span className="icon-tile icon-tile--overlay absolute left-4 top-4">
                      <Icon size={20} />
                    </span>
                  </div>
                  <div className="p-7">
                    <h3 className="text-base font-semibold text-ink">{app.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-body">{app.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach — itekcorp "Наша команда и подход к работе" */}
      <section className="section-padding">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">{dict.aboutApproachEyebrow}</span>
            <h2 className="section-title">{dict.aboutApproachTitle}</h2>
            <p className="section-lead mx-auto">{dict.aboutApproachText}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href={`/${lang}/kontakt`} className="btn btn-cta">
                {dict.aboutCtaQuote}
              </Link>
              <Link href={`/${lang}/oferta`} className="btn btn-outline">
                {dict.aboutCtaOffer}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
