import { ArrowRight, Play } from 'lucide-react'

import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero-device hero-soft relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="hero-soft__glow" />
      <div aria-hidden="true" className="hero-soft__grain" />

      <div className="container-page relative z-10 flex min-h-[calc(100svh-5.5rem)] flex-col justify-center py-10 md:py-14 lg:min-h-[calc(100svh-6rem)]">
        <div className="hero-soft__grid">
          <div className="hero-soft__copy">
            <p className="hero-soft__eyebrow">{dict.hero.eyebrow}</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-primary sm:text-5xl lg:text-[4.8rem]">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
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
              <div className="hero-soft__videoGlow" aria-hidden="true" />
              <video
                className="hero-soft__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/silvotech-transform-poster.jpg"
                aria-label="A soft silicone tube transforms into the SilvoTech wordmark"
              >
                <source src="/silvotech-transform.mp4" type="video/mp4" />
              </video>
              <div className="hero-soft__videoMeta" aria-hidden="true">
                <span><Play className="size-3 fill-current" /> silicone in motion</span>
                <span>01 / 01</span>
              </div>
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
