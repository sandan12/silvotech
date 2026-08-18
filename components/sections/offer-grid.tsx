import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

const copy = {
  pl: { eyebrow: 'Nasza oferta', title: 'Czego szukasz?' },
  en: { eyebrow: 'Our offer', title: 'What are you looking for?' },
  de: { eyebrow: 'Unser Angebot', title: 'Was suchen Sie?' },
} satisfies Record<Locale, { eyebrow: string; title: string }>

export function OfferGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = copy[locale]

  const tiles = [
    {
      href: '#products',
      image: '/silicone-hose-clear-coil.jpg',
      title: dict.products.items.clear.name,
      text: dict.products.items.clear.tagline,
    },
    {
      href: '#products',
      image: '/silvotech-hose-black.jpg',
      title: dict.products.items.technical.name,
      text: dict.products.items.technical.tagline,
    },
    {
      href: '#specification',
      image: '/clear-hose-detail-new.png',
      title: dict.specs.title,
      text: dict.specs.eyebrow,
    },
    {
      href: '#quality',
      image: '/quality-lab.png',
      title: dict.quality.title,
      text: dict.quality.eyebrow,
    },
  ]

  return (
    <section aria-label={t.title} className="offer-grid-section scroll-mt-28">
      <div className="container-page">
        <div className="offer-grid-section__heading">
          <p className="section-heading__eyebrow">{t.eyebrow}</p>
          <h2>{t.title}</h2>
        </div>

        <ul className="offer-grid">
          {tiles.map((tile) => (
            <li key={tile.title}>
              <a href={tile.href} className="offer-tile">
                <span className="offer-tile__media">
                  <Image src={tile.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </span>
                <span className="offer-tile__body">
                  <span className="offer-tile__title">
                    {tile.title}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                  <span className="offer-tile__text">{tile.text}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
