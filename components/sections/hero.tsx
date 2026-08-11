import { ArrowRight } from 'lucide-react'

import { SiliconeFlow } from '@/components/sections/silicone-flow'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero-device relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_68%_42%,rgba(232,243,249,.95),rgba(255,255,255,.35)_32%,transparent_58%),linear-gradient(120deg,#ffffff_0%,#f7fafc_42%,#edf4f7_100%)]" />
      <SiliconeFlow />
      <div className="container-page relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center py-14 md:py-18 lg:min-h-[calc(100svh-6rem)]">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-accent">{dict.hero.eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.04] font-bold tracking-tight text-balance text-primary sm:text-5xl lg:text-[4.6rem]">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {dict.hero.lead}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/85">
              {dict.hero.primaryCta}<ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#products" className="inline-flex items-center gap-2 border border-primary/25 bg-white/55 px-6 py-3.5 text-sm font-semibold text-primary backdrop-blur transition-colors hover:border-primary/60 hover:bg-white/80">
              {dict.hero.secondaryCta}
            </a>
          </div>
        </div>
        <dl className="mt-12 grid grid-cols-2 border-t border-primary/12 lg:grid-cols-4">
          {dict.hero.facts.map((fact, index) => (
            <div key={fact.label} className={`flex flex-col gap-1.5 py-5 lg:py-6 ${index === 0 ? 'lg:pr-8' : 'lg:px-8'} ${index % 2 === 1 ? 'border-l border-primary/12 pl-5' : 'pr-5'} ${index > 1 ? 'border-t border-primary/12 lg:border-t-0' : ''} lg:border-l lg:first:border-l-0 lg:first:pl-0`}>
              <dt className="order-2 text-xs leading-relaxed text-primary/60">{fact.label}</dt>
              <dd className="order-1 font-display text-xl font-bold tracking-tight text-primary md:text-2xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
