import { Info } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { products } from '@/lib/products'
import type { Locale } from '@/lib/i18n/config'
import {
  formatPackaging,
  formatPressure,
  formatSizes,
  formatStandards,
  formatTemperature,
} from '@/lib/i18n/units'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

const headerCellClass = 'px-4 py-3.5 font-mono text-[0.7rem] tracking-wider uppercase'
const bodyCellClass = 'px-4 py-4 text-foreground/80'

export function SpecTable({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const columns = dict.specs.columns

  return (
    <section id="specification" className="scroll-mt-28 border-t border-border bg-secondary section-device">
      <div className="container-page">
        <SectionHeading eyebrow={dict.specs.eyebrow} title={dict.specs.title} lead={dict.specs.lead} />

        <div className="mt-12 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <caption className="sr-only">{dict.specs.title}</caption>
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th scope="col" className={headerCellClass}>
                  {columns.product}
                </th>
                <th scope="col" className={headerCellClass}>
                  {columns.sizes}
                </th>
                <th scope="col" className={headerCellClass}>
                  {columns.temperature}
                </th>
                <th scope="col" className={headerCellClass}>
                  {columns.pressure}
                </th>
                <th scope="col" className={headerCellClass}>
                  {columns.packaging}
                </th>
                <th scope="col" className={headerCellClass}>
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
                    </th>
                    <td className={bodyCellClass}>{formatSizes(locale, product.sizes)}</td>
                    <td className={`${bodyCellClass} whitespace-nowrap`}>{formatTemperature(product)}</td>
                    <td className={bodyCellClass}>{formatPressure(locale, product.pressureKey)}</td>
                    <td className={`${bodyCellClass} whitespace-nowrap`}>
                      {formatPackaging(locale, product.packagingMeters)}
                    </td>
                    <td className={bodyCellClass}>{formatStandards(locale, product.standardKeys)}</td>
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
