import Image from 'next/image'
import { FileText, ShieldCheck } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Quality({ dict }: { dict: Dictionary }) {
  return (
    <section id="quality" className="scroll-mt-28 border-t border-border bg-background py-20 md:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={dict.quality.eyebrow}
              title={dict.quality.title}
              lead={dict.quality.lead}
              className="max-w-none"
            />

            <ul className="grid gap-px bg-border sm:grid-cols-2">
              {dict.quality.items.map((item) => (
                <li key={item.title} className="flex flex-col gap-2 bg-card p-5">
                  <ShieldCheck className="size-5 text-accent" aria-hidden="true" />
                  <h3 className="font-display text-base font-bold tracking-tight text-primary">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/silicone-detail.png"
                alt={dict.quality.imageAlt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="border border-border bg-secondary p-6">
              <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {dict.quality.docsTitle}
              </h3>
              <ul className="mt-4 flex flex-col">
                {dict.quality.docs.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-3 border-b border-border py-3 text-sm leading-relaxed text-foreground/85 last:border-b-0 last:pb-0"
                  >
                    <FileText className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
