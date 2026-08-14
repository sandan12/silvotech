import { ArrowRight, Mail } from 'lucide-react'

import { SiliconeScene } from '@/components/sections/silicone-scene'
import { company } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero-cinematic" aria-labelledby="hero-title">
      <div className="hero-cinematic__veil" aria-hidden="true" />
      <div className="hero-cinematic__grain" aria-hidden="true" />

      <div className="container-page hero-cinematic__layout">
        <div className="hero-cinematic__left">
          <div className="hero-cinematic__copy">
            <p className="hero-cinematic__eyebrow">{dict.hero.eyebrow}</p>
            <h1 id="hero-title">{dict.hero.title}</h1>
            <p className="hero-cinematic__lead">{dict.hero.lead}</p>
          </div>

          <div className="hero-cinematic__conversion">
            <div className="hero-cinematic__actions">
              <a href="#contact" className="hero-action hero-action--primary">
                {dict.hero.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#products" className="hero-action hero-action--secondary">
                {dict.hero.secondaryCta}
              </a>
            </div>

            <a href={`mailto:${company.email}`} className="hero-cinematic__direct">
              <Mail className="size-4" aria-hidden="true" />
              {company.email}
            </a>
          </div>
        </div>

        <SiliconeScene />

        <dl className="hero-cinematic__facts">
          {dict.hero.facts.map((fact) => (
            <div key={fact.label} className="hero-cinematic__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
