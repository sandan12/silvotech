'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Dictionary, Locale } from '@/lib/i18n';

/** Real product photography per category - shows the full range, not just hose. */
const TILES = [
  { img: '/hose-clear-coil-a.png', fit: 'contain' as const, zoom: true },
  { img: '/product-plates.webp', fit: 'cover' as const, zoom: false },
  { img: '/product-gaskets.webp', fit: 'cover' as const, zoom: false },
  { img: '/product-custom.webp', fit: 'cover' as const, zoom: false },
];

export default function OfferTiles({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const cats = TILES.map((t, i) => ({
    ...t,
    title: dict[`offerCat${i + 1}Title`],
    desc: dict[`offerCat${i + 1}Desc`],
  }));

  return (
    <section className="section-padding">
      <div className="container-page">
        <div className="max-w-[46rem]">
          <span className="eyebrow">{dict.offerEyebrow}</span>
          <h2 className="section-title">{dict.offerCatsTitle}</h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((cat) => (
            <div key={cat.title}>
              <Link
                href={`/${lang}/oferta`}
                className="card hover-lift group flex h-full flex-col overflow-hidden"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    cat.fit === 'contain' ? 'bg-white' : 'bg-band'
                  }`}
                >
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`transition-transform duration-500 ${
                      cat.fit === 'contain' ? 'object-contain' : 'object-cover'
                    } ${cat.zoom ? 'scale-[1.34] group-hover:scale-[1.38]' : 'group-hover:scale-[1.04]'}`}
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[1.05rem] font-semibold leading-snug text-ink">
                    {cat.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.86rem] leading-relaxed text-body">{cat.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
