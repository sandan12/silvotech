import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function MaterialsStrip({ dict }: { dict: Dictionary }) {
  return (
    <section aria-label={dict.logos.title} className="border-b border-border bg-secondary">
      <div className="container-page flex flex-col items-start gap-4 py-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">{dict.logos.title}</p>
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {dict.logos.items.map((item) => (
            <li key={item} className="font-display text-sm font-semibold tracking-wide text-primary/70">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
