import Image from 'next/image'
import { ArrowRight, Mail } from 'lucide-react'
import { SiliconeScene } from '@/components/sections/silicone-scene'
import { company } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Hero({ dict }: { dict: Dictionary }) {
  const item = dict.products.items.clear
  return <section className="hero-cinematic" aria-labelledby="hero-title">
    <SiliconeScene /><div className="hero-cinematic__veil" aria-hidden="true" /><div className="hero-cinematic__grain" aria-hidden="true" />
    <div className="container-page hero-cinematic__layout">
      <div className="hero-cinematic__copy"><p className="hero-cinematic__eyebrow"><span />{dict.hero.eyebrow}</p><h1 id="hero-title">{dict.hero.title}</h1><p className="hero-cinematic__lead">{dict.hero.lead}</p><div className="hero-cinematic__actions"><a href="#contact" className="hero-action hero-action--primary">{dict.hero.primaryCta}<ArrowRight className="size-4" /></a><a href="#products" className="hero-action hero-action--secondary">{dict.hero.secondaryCta}</a></div><a href={`mailto:${company.email}`} className="hero-cinematic__direct"><Mail className="size-4" />{company.email}</a></div>
      <div className="hero-product" aria-label={item.name}><div className="hero-product__orbit" /><div className="hero-product__card"><div className="hero-product__topline"><span>SVT-SIL-CL</span><span>{item.tagline}</span></div><div className="hero-product__image"><Image src="/silicone-hose-clear-coil.jpg" alt={dict.hero.imageAlt} fill priority sizes="(min-width:1024px) 46vw,92vw" className="object-contain" /></div><div className="hero-product__caption"><strong>{item.name}</strong><span>{dict.hero.facts[1]?.value}</span></div></div></div>
      <dl className="hero-cinematic__facts">{dict.hero.facts.map(fact=><div key={fact.label} className="hero-cinematic__fact"><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
    </div>
  </section>
}
