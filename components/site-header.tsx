'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Menu, Phone, X } from 'lucide-react'

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

  useEffect(() => {
    document.body.classList.toggle('navigation-open', open)
    return () => document.body.classList.remove('navigation-open')
  }, [open])

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    addEventListener('keydown', close)
    return () => removeEventListener('keydown', close)
  }, [])

  return (
    <header className="site-header">
      <div className="container-page site-header__bar">
        <Link href={`/${locale}`} className="site-header__brand" aria-label={company.name}>
          <Image
            src="/silvotech-logo-user.png"
            alt={`${company.name} — logo`}
            width={1360}
            height={456}
            priority
            className="site-header__logo"
          />
        </Link>

        <nav aria-label={dict.nav.menu} className="site-header__nav">
          <ul>
            {links.slice(0, 5).map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a className="site-header__phone" href={`tel:${company.phoneHref}`}>
            <Phone className="size-4" />
            {company.phone}
          </a>
          <LanguageSwitcher current={locale} label={dict.nav.language} />
          <a href="#contact" className="site-header__cta">
            {dict.nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="site-header__toggle"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? dict.nav.close : dict.nav.menu}</span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`site-mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label={dict.nav.menu}>
          <ul>
            {links.map((link, index) => (
              <li key={link.href} style={{ '--nav-index': index } as CSSProperties}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="site-mobile-nav__contact">
            <a href={`mailto:${company.email}`}>
              <Mail className="size-4" />
              {company.email}
            </a>
            <a href={`tel:${company.phoneHref}`}>
              <Phone className="size-4" />
              {company.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
