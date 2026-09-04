'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Dictionary, Locale } from '@/lib/i18n';

/** Their own six application photos, matched to the six application texts. */
const PHOTOS = [
  '/apps/app-medical.jpg',
  '/apps/app-food.jpg',
  '/apps/app-hightech.jpg',
  '/apps/app-transport.jpg',
  '/apps/app-hvac.jpg',
  '/apps/app-consumer.jpg',
];

export default function CoopStrip({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const apps = PHOTOS.map((img, i) => ({
    img,
    title: dict[`aboutApp${i + 1}Title`],
    text: dict[`aboutApp${i + 1}Text`],
  }));

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="section-heading">
            <h2 className="section-title">{dict.aboutAppsTitle}</h2>
          </div>
          <Link
            href={`/${lang}/wspolpraca`}
            className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-navy underline decoration-line underline-offset-4 transition-colors hover:text-orange"
          >
            {dict.navCoop} →
          </Link>
        </div>

        <div className="mt-9 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((a) => (
            <article key={a.title} className="group relative overflow-hidden bg-ink">
              <div className="relative aspect-[3/2]">
                <Image
                  src={a.img}
                  alt={a.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-70 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-45"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent"
                  aria-hidden
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-white">
                  {a.title}
                </h3>
                <p className="mt-2 max-h-0 overflow-hidden text-[0.83rem] leading-relaxed text-white/0 transition-all duration-500 group-hover:max-h-32 group-hover:text-white/75">
                  {a.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
