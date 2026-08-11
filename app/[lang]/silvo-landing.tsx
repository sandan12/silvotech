'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n/config'

const copy = {
  pl: {
    nav: ['Produkty', 'Rozmiary', 'Dokumenty', 'Kontakt'],
    chip: '[ Węże silikonowe ]',
    title: 'SILVOTECH',
    tagline: 'Węże silikonowe dla przemysłu i produkcji żywności.',
    email: 'E-mail służbowy',
    primary: 'Poproś o ofertę',
    secondary: 'Sprawdź rozmiary',
    invite: 'Kontakt bez formularza',
    legal: 'Wysłanie zapytania oznacza zgodę na kontakt w sprawie oferty handlowej SilvoTech.',
  },
  en: {
    nav: ['Products', 'Sizes', 'Documents', 'Contact'],
    chip: '[ Silicone hoses ]',
    title: 'SILVOTECH',
    tagline: 'Silicone hoses for industry and food production.',
    email: 'Business email',
    primary: 'Request a quote',
    secondary: 'Check sizes',
    invite: 'Contact without form',
    legal: 'Submitting an enquiry means you agree to be contacted about a SilvoTech commercial offer.',
  },
  de: {
    nav: ['Produkte', 'Größen', 'Dokumente', 'Kontakt'],
    chip: '[ Silikonschläuche ]',
    title: 'SILVOTECH',
    tagline: 'Silikonschläuche für Industrie und Lebensmittelproduktion.',
    email: 'Geschäftliche E-Mail',
    primary: 'Angebot anfordern',
    secondary: 'Größen prüfen',
    invite: 'Kontakt ohne Formular',
    legal: 'Mit dem Absenden stimmen Sie einer Kontaktaufnahme zum SilvoTech-Angebot zu.',
  },
} satisfies Record<Locale, Record<string, string | string[]>>

const hrefs = ['#products', '#sizes', '#documents', '#contact']

export function SilvoLanding({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    function onResize() {
      if (window.innerWidth >= 901) setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.href = 'mailto:sales@silvotech.eu?subject=RFQ%20SilvoTech'
  }

  const nav = t.nav as string[]

  return (
    <section className="hero" aria-label="SilvoTech landing page">
      <div className="hero__media" aria-hidden="true">
        <Image src="/black-hose-hero.png" alt="" fill priority sizes="100vw" className="hero__image" />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <nav className="hero__nav" aria-label="Main navigation">
        <a className="hero__logo" href={`/${locale}`}>SILVOTECH</a>
        <div className="hero__navCluster">
          <div className="hero__links">
            {nav.map((item, index) => <a key={item} href={hrefs[index]}>{item}</a>)}
          </div>
          <a className="hero__cta" href="#contact">{locale === 'pl' ? 'Oferta' : locale === 'de' ? 'Anfrage' : 'Quote'}</a>
          <button ref={toggleRef} className="menuToggle" type="button" aria-expanded={open} aria-controls="mobileMenu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div id="mobileMenu" className={`mobileMenu ${open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} onClick={() => setOpen(false)}>
        <div className="mobileMenu__inner" onClick={(event) => event.stopPropagation()}>
          {nav.map((item, index) => <a key={item} style={{ '--i': index } as CSSProperties} href={hrefs[index]} onClick={() => setOpen(false)}>{item}</a>)}
          <a className="mobileMenu__cta" style={{ '--i': 4 } as CSSProperties} href="#contact" onClick={() => setOpen(false)}>{locale === 'pl' ? 'Oferta' : locale === 'de' ? 'Anfrage' : 'Quote'}</a>
        </div>
      </div>

      <div className="hero__body">
        <div className="panel">
          <span className="panel__chip">{t.chip}</span>
          <h1>{t.title}</h1>
          <p className="panel__tagline">{t.tagline}</p>
          <form className="panel__form" action="#" method="post" noValidate onSubmit={submit}>
            <label className="srOnly" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder={t.email as string} />
            <button className="btn btn--ghost" type="submit">{t.primary}</button>
            <a className="btn btn--solid" href="tel:+48573569216">{t.secondary}</a>
          </form>
          <a className="panel__referral" href="mailto:sales@silvotech.eu">{t.invite}</a>
        </div>
      </div>

      <footer className="hero__legal">
        <p>{t.legal} <a href="mailto:sales@silvotech.eu">sales@silvotech.eu</a> · <a href="tel:+48573569216">+48 573 569 216</a></p>
      </footer>
    </section>
  )
}
