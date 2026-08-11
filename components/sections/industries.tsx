import { Factory, FlaskConical, Truck } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

const icons = [Factory, Truck, FlaskConical]

export function Industries({ dict }: { dict: Dictionary }) {
  return (
    <section id="industries" className="scroll-mt-28 border-t border-border bg-secondary py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow={dict.industries.eyebrow} title={dict.industries.title} />

        <ul className="mt-12 grid gap-px bg-border lg:grid-cols-3">
          {dict.industries.items.map((item, index) => {
            const Icon = icons[index] ?? Factory
            return (
              <li key={item.title} className="flex flex-col gap-4 bg-card p-7">
                <Icon className="size-6 text-accent" aria-hidden="true" />
                <h3 className="font-display text-xl font-bold tracking-tight text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                <ul className="mt-auto flex flex-col border-t border-border pt-4">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="border-b border-border py-2.5 text-sm text-foreground/85 last:border-b-0 last:pb-0"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
