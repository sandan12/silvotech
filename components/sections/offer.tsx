'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';
import { standardSizes, products } from '@/lib/products';

/** Real product photography per category, so the offer shows the full range. */
const catImages = [
  '/hose-clear-coil-a.png',
  '/product-plates.webp',
  '/product-gaskets.webp',
  '/product-custom.webp',
];

export default function Offer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cats = Array.from({ length: 4 }, (_, i) => ({
    title: dict[`offerCat${i + 1}Title`],
    desc: dict[`offerCat${i + 1}Desc`],
    points: [dict[`offerCat${i + 1}P1`], dict[`offerCat${i + 1}P2`], dict[`offerCat${i + 1}P3`]],
  }));

  const rows = [
    {
      name: dict.specsClear,
      sizes: [...standardSizes],
      range: '-50…+230 °C',
      packaging: dict.specsPackagingValue,
      docs: dict.specsDocsValue,
    },
    {
      name: dict.specsBlack,
      sizes: [],
      range: '-50…+230 °C',
      packaging: dict.specsPackagingValue,
      docs: '—',
    },
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-80 overflow-hidden rounded-lg shadow-md">
              <Image
                src="/hose-clear-coil-a.png"
                alt={dict.productionImage1Alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain bg-white p-4"
              />
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-lg bg-white px-5 py-3.5 shadow-md">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-band-deep text-navy">
                <Check size={16} strokeWidth={3} />
              </span>
              <div>
                <p className="text-xs font-semibold text-ink">{dict.heroBadge}</p>
                <p className="text-xs text-muted">-50…+230 °C</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="eyebrow">{dict.offerTechEyebrow}</span>
            <h2 className="mt-4 max-w-[22ch] text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-ink">{dict.offerTechTitle}</h2>
            <p className="mt-5 leading-relaxed text-body">{dict.offerTechText1}</p>
            <p className="mt-4 leading-relaxed text-body">{dict.offerTechText2}</p>
          </motion.div>
        </div>

        <div className="mt-24">
          <div className="section-heading--center">
            <h2 className="section-title">{dict.offerCatsTitle}</h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cats.map((cat, i) => {
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.4, 0, 0.2, 1] }}
                  className="card hover-lift flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-band">
                    <Image
                      src={catImages[i]}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-semibold text-ink">{cat.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-body">{cat.desc}</p>
                    <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                      {cat.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-band-deep text-navy">
                            <Check size={12} strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/${lang}/kontakt`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition hover:gap-3">
                      {dict.cta} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-24">
          <div className="section-heading--center">
            <span className="eyebrow">{dict.specsEyebrow}</span>
            <h2 className="section-title">{dict.specsTitle}</h2>
            <p className="section-lead mx-auto">{dict.specsLead}</p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="spec-table min-w-[720px]">
              <thead>
                <tr>
                  <th>{dict.specsProduct}</th>
                  <th>{dict.specsSizes}</th>
                  <th>{dict.specsRange}</th>
                  <th>{dict.specsPackaging}</th>
                  <th>{dict.specsDocs}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td className="font-semibold text-navy">{row.name}</td>
                    <td>
                      {row.sizes.length > 0 ? (
                        <div className="flex max-w-md flex-wrap gap-1.5">
                          {row.sizes.map((s) => (
                            <span key={s} className="rounded border border-line bg-white px-2 py-0.5 text-xs font-medium text-ink">
                              Ø {s} mm
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-body">{dict.specsCustom}</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap font-medium">{row.range}</td>
                    <td className="whitespace-nowrap font-medium">{row.packaging}</td>
                    <td className="whitespace-nowrap font-medium text-navy">{row.docs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-center text-sm text-muted">{dict.specsNote}</p>
        </div>

        <div className="mt-24">
          <div className="section-heading--center">
            <h2 className="section-title">{dict.offerWhyTitle}</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <motion.div
                key={dict[`offerWhy${i + 1}Title`]}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.4, 0, 0.2, 1] }}
                className="card hover-lift p-7"
              >
                <h3 className="text-base font-semibold text-ink">{dict[`offerWhy${i + 1}Title`]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{dict[`offerWhy${i + 1}Text`]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}