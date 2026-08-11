import { Info } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { products } from '@/lib/products'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function SpecTable({ dict }: { dict: Dictionary }) {
  const columns = dict.specs.columns

  return (
    <section
      id="specification"
      className="scroll-mt-28 border-t border-border bg-secondary py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeading eyebrow={dict.specs.eyebrow} title={dict.specs.title} lead={dict.specs.lead} />

        <div className="mt-12 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">{dict.specs.title}</caption>
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th scope="col" className="px-4 py-3.5 font-mono text-[0.7rem] tracking-wider uppercase">
                  {columns.product}
                </th>
                <th scope="col" className="px-4 py-3.5 font-mono text-[0.7rem] tracking-wider uppercase">
                  {columns.sizes}
                </th>
                <th scope="col" className="px-4 py-3.5 font-mono text-[0.7rem] tracking-wider uppercase">
                  {columns.temperature}
                </th>
                <th scope="col" className="px-4 py-3.5 font-mono text-[0.7rem] tracking-wider uppercase">
                  {columns.pressure}
                </th>
                <th scope="col" className="px-4 py-3.5 font-mono text-[0.7rem] tracking-wider uppercase">
                  {columns.packaging}
                </th>
                <th scope="col" className="px-4 py-3.5 font-mono text-[0.7rem] tracking-wider uppercase">
                  {columns.standards}
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const copy = dict.products.items[product.id]
                return (
                  <tr key={product.id} className="border-t border-border align-top">
                    <th scope="row" className="px-4 py-4 font-semibold text-primary">
                      {copy.name}
                      <span className="mt-1 block font-mono text-[0.7rem] font-normal tracking-wide text-muted-foreground">
                        {product.code}
                      </span>
                    </th>
                    <td className="px-4 py-4 text-foreground/80">{product.sizes.length ? product.sizes.join(' · ') : dict.products.items.technical.features[0]}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-foreground/80">{product.temperature}</td>
                    <td className="px-4 py-4 text-foreground/80">{product.pressure}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-foreground/80">{product.packaging}</td>
                    <td className="px-4 py-4 text-foreground/80">{product.standards.join(', ')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-5 flex max-w-3xl gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          {dict.specs.note}
        </p>
      </div>
    </section>
  )
}
