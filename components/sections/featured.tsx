'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Thermometer, Ruler, Package, Wrench } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Featured({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const products = [
    {
      image: '/hose-clear-coil-a.png',
      tag: dict.homeProd1Tag,
      title: dict.homeProd1Title,
      desc: dict.homeProd1Desc,
      rows: [
        { icon: Ruler, label: dict.specsSizes, value: dict.homeProd1Spec1 },
        { icon: Thermometer, label: dict.specsRange, value: dict.homeProd1Spec2 },
        { icon: Package, label: dict.specsPackaging, value: dict.specsPackagingValue },
        { icon: Wrench, label: dict.specsDocs, value: dict.specsDocsValue },
      ],
    },
    {
      image: '/hose-black-industrial.png',
      tag: dict.homeProd2Tag,
      title: dict.homeProd2Title,
      desc: dict.homeProd2Desc,
      rows: [
        { icon: Ruler, label: dict.specsSizes, value: dict.homeProd2Spec1 },
        { icon: Thermometer, label: dict.specsRange, value: dict.homeProd2Spec2 },
        { icon: Package, label: dict.specsPackaging, value: dict.specsPackagingValue },
        { icon: Wrench, label: dict.formProduct, value: dict.homeProd2Spec3 },
      ],
    },
  ];

  return (
    <section className="band section-padding">
      <div className="container-page">
        <div className="max-w-[46rem]">
          <h2 className="section-title">{dict.homeProdTitle}</h2>
          <p className="section-lead">{dict.homeProdLead}</p>
        </div>

        <div className="mt-10 space-y-5">
          {products.map((p, i) => (
            <article
              key={p.title}
              className="card grid items-stretch overflow-hidden lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            >
              {/* Photo side alternates so the two rows do not read as copies. */}
              <div
                className={`relative min-h-[15rem] bg-white ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="scale-[1.22] object-contain"
                />
                <span className="absolute left-4 top-4 rounded-md bg-navy px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white">
                  {p.tag}
                </span>
              </div>

              <div className="flex flex-col justify-center p-6 md:p-10">
                <h3 className="font-display text-[1.35rem] font-semibold leading-snug text-ink md:text-[1.55rem]">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[54ch] text-[0.92rem] leading-relaxed text-body">{p.desc}</p>

                <dl className="mt-6 border-t border-line">
                  {p.rows.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div
                        key={r.label}
                        className="flex items-baseline gap-3 border-b border-line py-2.5"
                      >
                        <Icon size={15} className="shrink-0 translate-y-[3px] text-blue" aria-hidden />
                        <dt className="w-[9rem] shrink-0 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-muted">
                          {r.label}
                        </dt>
                        <dd className="text-[0.9rem] font-medium text-ink">{r.value}</dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-7">
                  <Link href={`/${lang}/kontakt`} className="btn btn-cta">
                    {dict.homeProdCta1}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
