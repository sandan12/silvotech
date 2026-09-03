'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';
import { standardSizes } from '@/lib/products';

/**
 * The 28 standard bores, on the homepage. This is the single most useful thing a
 * procurement engineer wants to see, and it used to be buried on /oferta.
 */
export default function Sizes({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <h2 className="section-title">{dict.specsTitle}</h2>
            <p className="section-lead">{dict.specsLead}</p>

            <div className="mt-7 flex items-start gap-3 border-l-2 border-orange bg-band py-3 pl-4 pr-4">
              <Info size={16} className="mt-0.5 shrink-0 text-orange" aria-hidden />
              <p className="text-[0.84rem] leading-relaxed text-body">{dict.specsNote}</p>
            </div>

            <Link href={`/${lang}/kontakt`} className="btn btn-navy mt-7">
              {dict.formSizeCustom}
            </Link>
          </div>

          <div>
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted">
              {dict.specsSizes}
            </p>
            <div className="mt-3 grid grid-cols-4 gap-px bg-line sm:grid-cols-6 lg:grid-cols-7">
              {standardSizes.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
