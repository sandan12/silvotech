import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { SiliconeFlow } from '@/components/sections/silicone-flow'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero-device relative isolate overflow-hidden bg-background">
      <Image
        src="/production-line-new.png"
        alt={dict.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover opacity-18"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/92 to-white/58"
      />
      <SiliconeFlow />
      <div className="container-page relative flex flex-col justify-end pt-16 pb-0 md:pt-24 lg:min-h-[36rem]">
        <div className="max-w-3xl pb-14 md:pb-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent">
            {dict.hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance text-primary sm:text-5xl lg:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
            {dict.hero.lead}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/85"
            >
              {dict.hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 border border-primary/25 px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary/60"
            >
              {dict.hero.secondaryCta}
            </a>
          </div>
        </div>

        <dl className="grid grid-cols-2 border-t border-primary-foreground/15 lg:grid-cols-4">
          {dict.hero.facts.map((fact, index) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-1.5 py-6 lg:py-7 ${
                index === 0 ? 'lg:pr-8' : 'lg:px-8'
              } ${index % 2 === 1 ? 'border-l border-primary-foreground/15 pl-5' : 'pr-5'} ${
                index > 1 ? 'border-t border-primary-foreground/15 lg:border-t-0' : ''
              } lg:border-l lg:first:border-l-0 lg:first:pl-0`}
            >
              <dt className="order-2 text-xs leading-relaxed text-primary/60">{fact.label}</dt>
              <dd className="order-1 font-display text-xl font-bold tracking-tight text-primary md:text-2xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
