import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { products } from '@/lib/products'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function ProductGrid({ dict }: { dict: Dictionary }) {
  const labels = dict.products.labels
  return (
    <section id="products" className="scroll-mt-28 border-t border-border bg-background py-16 md:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={dict.products.eyebrow} title={dict.products.title} lead={dict.products.lead} />
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {products.map((product) => {
            const copy = dict.products.items[product.id]
            return (
              <li key={product.id} className="group overflow-hidden rounded-lg border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                  <Image src={product.image} alt={`${copy.name} — ${copy.tagline}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="flex flex-col gap-5 p-6 md:p-8">
                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-xs tracking-wider text-muted-foreground">{product.code}</p>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-primary">{copy.name}</h3>
                    <p className="font-semibold text-accent">{copy.tagline}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {copy.features.map((feature) => <li key={feature} className="flex gap-2.5 text-sm text-foreground/80"><Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />{feature}</li>)}
                  </ul>
                  <dl className="grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
                    <div><dt className="text-xs text-muted-foreground">{labels.temperature}</dt><dd className="font-semibold text-primary">{product.temperature}</dd></div>
                    <div><dt className="text-xs text-muted-foreground">{labels.packaging}</dt><dd className="font-semibold text-primary">{product.packaging}</dd></div>
                  </dl>
                  <a href="#contact" className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-accent">{labels.cta}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
