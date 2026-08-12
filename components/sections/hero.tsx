import { ArrowRight } from 'lucide-react'

import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero-device hero-soft relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="hero-soft__glow" />
      <div aria-hidden="true" className="hero-soft__grain" />

      <div className="container-page relative z-10 flex min-h-[calc(100svh-5.5rem)] flex-col justify-center py-10 md:py-14 lg:min-h-[calc(100svh-6rem)]">
        <div className="hero-soft__grid">
          <div className="hero-soft__copy">
            <h1 className="font-display text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-primary sm:text-[3.25rem] lg:text-[3.6rem]">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
              {dict.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="hero-soft__button hero-soft__button--primary">
                {dict.hero.primaryCta}<ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#products" className="hero-soft__button hero-soft__button--secondary">
                {dict.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="hero-soft__visual" aria-label="Silicone hose transformation animation">
            <div className="hero-soft__videoShell">
              <video
                className="hero-soft__video"
                autoPlay
                muted
                playsInline
                preload="auto"
                poster="/silvotech-transform-poster.jpg"
                aria-label="A soft silicone tube transforms into the SilvoTech wordmark"
              >
                <source src="/silvotech-transform.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <dl className="hero-soft__facts">
          {dict.hero.facts.map((fact) => (
            <div key={fact.label} className="hero-soft__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
