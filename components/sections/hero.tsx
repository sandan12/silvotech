import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'

import { company } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero-banner" aria-labelledby="hero-title">
      <div className="hero-banner__media" aria-hidden="true">
        <Image
          src="/silvotech-factory-line.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-banner__image"
        />
        <div className="hero-banner__scrim" />
      </div>

      <div className="container-page hero-banner__content">
        <p className="hero-banner__eyebrow">{dict.hero.eyebrow}</p>
        <h1 id="hero-title">{dict.hero.title}</h1>
        <p className="hero-banner__lead">{dict.hero.lead}</p>

        <div className="hero-banner__actions">
          <a href="#contact" className="btn btn--primary">
            {dict.hero.primaryCta}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a href="#products" className="btn btn--outline-light">
            {dict.hero.secondaryCta}
          </a>
        </div>

        <a href={`mailto:${company.email}`} className="hero-banner__direct">
          <Mail className="size-4" aria-hidden="true" />
          {company.email}
        </a>
      </div>

      <dl className="facts-bar container-page">
        {dict.hero.facts.map((fact) => (
          <div key={fact.label} className="facts-bar__item">
            <dd>{fact.value}</dd>
            <dt>{fact.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
