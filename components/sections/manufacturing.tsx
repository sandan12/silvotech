import Image from 'next/image'

import { SectionHeading } from '@/components/section-heading'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Manufacturing({ dict }: { dict: Dictionary }) {
  return (
    <section id="production" className="scroll-mt-28 bg-primary section-device">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.production.eyebrow}
          title={dict.production.title}
          lead={dict.production.lead}
          tone="dark"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/clear-hose-coil-new.png"
                alt={dict.production.warehouseImageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative hidden aspect-[16/7] overflow-hidden lg:block">
              <Image
                src="/production-line-new.png"
                alt={dict.production.lineImageAlt}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>

          <ol className="grid gap-px bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-1">
            {dict.production.blocks.map((block) => (
              <li key={block.title} className="flex flex-col gap-2 bg-primary p-6">
                <h3 className="font-display text-lg font-bold tracking-tight text-primary-foreground">
                  {block.title}
                </h3>
                <p className="text-sm leading-relaxed text-primary-foreground/65">{block.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
