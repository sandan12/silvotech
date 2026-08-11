'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, ChevronDown, Languages } from 'lucide-react'

import { cn } from '@/lib/utils'
import { locales, localeNames, type Locale } from '@/lib/i18n/config'

export function LanguageSwitcher({ current, label, className }: { current: Locale; label: string; className?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  function hrefFor(locale: Locale) {
    const segments = (pathname ?? `/${current}`).split('/')
    segments[1] = locale
    return segments.join('/') || `/${locale}`
  }

  return (
    <div className={cn('relative', className)}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="menu" className="flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-2">
        <Languages className="size-4 text-accent" aria-hidden="true" />
        <span>{localeNames[current].label}</span>
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full mt-2 min-w-40 rounded-md border border-border bg-popover p-1 shadow-lg">
          {locales.map((locale) => (
            <Link key={locale} href={hrefFor(locale)} hrefLang={locale} role="menuitem" onClick={() => setOpen(false)} className="flex items-center justify-between gap-4 rounded-sm px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary focus:bg-secondary">
              <span>{localeNames[locale].native}</span>
              {locale === current && <Check className="size-4 text-accent" aria-hidden="true" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
