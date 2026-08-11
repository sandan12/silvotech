'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Menu, MapPin, Phone, X } from 'lucide-react'

import { LanguageSwitcher } from '@/components/language-switcher'
import { company, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#products', label: dict.nav.products },
    { href: '#specification', label: dict.nav.specification },
    { href: '#production', label: dict.nav.production },
    { href: '#quality', label: dict.nav.quality },
    { href: '#industries', label: dict.nav.industries },
    { href: '#contact', label: dict.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-primary text-primary-foreground/80 md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
            <span>
              {company.street}, {company.postalCode} {company.city}, {company.country}
            </span>
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:${company.phoneHref}`} className="flex items-center gap-2 transition-colors hover:text-primary-foreground">
              <Phone className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 transition-colors hover:text-primary-foreground">
              <Mail className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
              {company.email}
            </a>
            <span className="font-mono tracking-wider">NIP {company.nip}</span>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
          <Link href={`/${locale}`} className="flex shrink-0 items-center" aria-label={company.name}>
            <Image
              src="/silvotech-logo-user.png"
              alt={`${company.name} — logo`}
              width={1360}
              height={456}
              priority
              className="h-9 w-auto max-w-44 object-contain lg:h-10 lg:max-w-48"
            />
          </Link>

          <nav aria-label={dict.nav.menu} className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-foreground/75 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher
              current={locale}
              label={dict.nav.language}
              className="border-l border-border pl-3"
            />
            <a
              href="#contact"
              className="hidden bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-primary sm:inline-flex"
            >
              {dict.nav.cta}
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex size-10 items-center justify-center border border-border text-foreground lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              <span className="sr-only">{open ? dict.nav.close : dict.nav.menu}</span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-b border-border bg-background lg:hidden">
          <nav aria-label={dict.nav.menu} className="container-page py-4">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-3 text-base font-medium text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground"
            >
              {dict.nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
