'use client';

import Image from 'next/image';
import type { Dictionary, Locale } from '@/lib/i18n';

/**
 * Production and distribution: text on one side, real shop-floor photography on
 * the other. Deliberately a split, not another centred card grid.
 */
export default function Intro({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const blocks = [1, 2, 3, 4].map((i) => ({
    title: dict[`productionBlock${i}Title`],
    text: dict[`productionBlock${i}Text`],
  }));

  return (
    <section className="band-navy section-padding">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow eyebrow--light">{dict.productionEyebrow}</span>
            <h2 className="section-title text-white">{dict.productionTitle}</h2>
            <span className="mt-5 block h-[3px] w-14 bg-orange" aria-hidden />
            <p className="mt-6 max-w-[56ch] text-[0.97rem] leading-relaxed text-white/70">
              {dict.productionLead}
            </p>

            <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {blocks.map((b, i) => (
                <div key={b.title} className="border-t border-white/15 pt-4">
                  <span className="font-mono text-[0.64rem] tracking-[0.14em] text-orange">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <dt className="mt-1.5 font-display text-[1rem] font-semibold leading-snug text-white">
                    {b.title}
                  </dt>
                  <dd className="mt-1.5 text-[0.85rem] leading-relaxed text-white/60">{b.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden">
              <Image
                src="/extrusion-head.webp"
                alt={dict.productionImage1Alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/winding-machine.webp"
                alt={dict.productionImage2Alt}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/production-drum.jpg"
                alt={dict.productionImage2Alt}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
