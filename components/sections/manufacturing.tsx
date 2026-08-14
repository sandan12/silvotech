import Image from 'next/image'

import { SectionHeading } from '@/components/section-heading'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Manufacturing({ dict }: { dict: Dictionary }) {
  return (
    <section id="production" className="production-studio scroll-mt-28 section-device">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.production.eyebrow}
          title={dict.production.title}
          lead={dict.production.lead}
          tone="dark"
        />

        <div className="production-studio__layout">
          <div className="production-gallery">
            <figure>
              <div className="production-gallery__image">
                <Image
                  src="/silicone-hose-clear-loop.jpg"
                  alt={dict.production.warehouseImageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain"
                />
              </div>
              <figcaption><strong>{dict.products.items.clear.name}</strong></figcaption>
            </figure>
            <figure>
              <div className="production-gallery__image">
                <Image
                  src="/silicone-hose-black.png"
                  alt={dict.products.items.technical.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain"
                />
              </div>
              <figcaption><strong>{dict.products.items.technical.name}</strong></figcaption>
            </figure>
          </div>

          <ol className="production-steps">
            {dict.production.blocks.map((block, index) => (
              <li key={block.title}>
                <span>0{index + 1}</span>
                <div><h3>{block.title}</h3><p>{block.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
