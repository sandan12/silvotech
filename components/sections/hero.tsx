import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { company } from '@/lib/i18n/config'

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative isolate grid min-h-[100svh] grid-rows-[1fr_auto] overflow-hidden bg-black pt-24 md:pt-32">
      <Image src="/production-line-new.png" alt={dict.hero.imageAlt} fill priority sizes="100vw" className="absolute inset-0 -z-20 object-cover object-center opacity-80 motion-safe:animate-[hero-drift_18s_var(--ease-premium)_infinite_alternate]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,transparent_0%,transparent_38%,rgba(0,0,0,.48)_68%,rgba(0,0,0,.86)_100%),linear-gradient(to_bottom,rgba(0,0,0,.68)_0%,transparent_24%,transparent_74%,rgba(0,0,0,.78)_100%)] max-md:bg-[linear-gradient(to_bottom,rgba(0,0,0,.72)_0%,rgba(0,0,0,.32)_35%,rgba(0,0,0,.9)_100%)]" />

      <div className="container-page flex min-h-0 items-center justify-end py-12 max-md:items-end max-md:pb-10">
        <div className="w-[min(34vw,620px)] min-w-[380px] max-w-xl max-xl:w-[min(70vw,540px)] max-xl:min-w-0 max-md:w-full">
          <p className="inline-flex border-l border-accent/50 bg-white/10 px-5 py-3 font-mono text-[clamp(11px,.72vw,14px)] leading-none tracking-[.2em] text-white uppercase">{dict.rfq.eyebrow}</p>
          <h1 className="mt-[clamp(28px,3vw,52px)] font-display text-[clamp(44px,5.2vw,96px)] leading-[.98] font-normal tracking-[-.035em] text-balance text-white">{dict.hero.title}</h1>
          <p className="mt-[clamp(14px,1.4vw,24px)] max-w-2xl font-mono text-[clamp(11px,.94vw,17px)] leading-[1.55] font-light tracking-[.12em] text-white/65 uppercase">{dict.hero.lead}</p>
          <div className="mt-[clamp(38px,4.6vw,82px)] flex w-full flex-col gap-[clamp(14px,1.3vw,22px)]">
            <a href="#contact" className="inline-flex w-full items-center justify-center gap-3 bg-accent px-5 py-[clamp(17px,1.6vw,27px)] font-mono text-[clamp(11px,.78vw,14px)] font-medium tracking-[.18em] text-accent-foreground uppercase hover:bg-[#f08a44]">{dict.hero.primaryCta}<ArrowRight className="size-4" /></a>
            <a href="#specification" className="inline-flex w-full items-center justify-center bg-white/10 px-5 py-[clamp(17px,1.6vw,27px)] font-mono text-[clamp(11px,.78vw,14px)] tracking-[.18em] text-white uppercase hover:bg-white/15">{dict.hero.secondaryCta}</a>
          </div>
          <a href={`mailto:${company.email}`} className="mx-auto mt-[clamp(26px,2.6vw,46px)] block w-fit font-mono text-[clamp(11px,.74vw,14px)] tracking-[.18em] text-white uppercase hover:text-white/65 hover:underline hover:underline-offset-4">{company.email}</a>
        </div>
      </div>

      <div className="border-t border-white/14 px-[var(--gutter)] py-[clamp(18px,1.7vw,30px)] text-center font-display text-[clamp(12px,.82vw,16px)] font-light leading-6 text-white/62">
        SilvoTech przygotowuje indywidualne oferty B2B. Kontakt: <a className="text-white underline underline-offset-4 hover:text-white/65" href={`mailto:${company.email}`}>{company.email}</a> · <a className="text-white underline underline-offset-4 hover:text-white/65" href={`tel:${company.phoneHref}`}>{company.phone}</a>
      </div>
    </section>
  )
}
