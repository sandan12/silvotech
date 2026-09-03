'use client';

import Link from 'next/link';
import { FileCheck2, FlaskConical, ClipboardList, Gauge, Check } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';

const ICONS = [FileCheck2, FlaskConical, ClipboardList, Gauge];

/**
 * Compliance and documentation. Icons here describe the actual thing — a
 * regulation, a laboratory test, a document set, an application check.
 */
export default function WhyUs({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const items = [1, 2, 3, 4].map((i) => ({
    title: dict[`qualityItem${i}Title`],
    text: dict[`qualityItem${i}Text`],
  }));

  const docs = [1, 2, 3, 4].map((i) => dict[`qualityDoc${i}`]);

  return (
    <section className="band section-padding">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <h2 className="section-title">{dict.qualityTitle}</h2>
            <p className="section-lead">{dict.qualityLead}</p>

            <dl className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {items.map((item, i) => {
                const Icon = ICONS[i];
                return (
                  <div key={item.title}>
                    <Icon size={20} className="text-navy" aria-hidden />
                    <dt className="mt-3 text-[0.95rem] font-semibold leading-snug text-ink">
                      {item.title}
                    </dt>
                    <dd className="mt-1.5 text-[0.85rem] leading-relaxed text-body">{item.text}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="card self-start p-7">
            <h3 className="font-display text-[1.1rem] font-semibold leading-snug text-ink">
              {dict.qualityDocsTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {docs.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-ink">
                  <Check size={14} strokeWidth={3} className="mt-1 shrink-0 text-orange" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
            <Link href={`/${lang}/dokumenty`} className="btn btn-outline mt-7 w-full">
              {dict.aboutGuaranteeCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
