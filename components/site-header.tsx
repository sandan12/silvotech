'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/language-switcher'
import { company, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '#products', label: dict.nav.products },
    { href: '#specification', label: dict.nav.specification },
    { href: '#quality', label: dict.nav.quality },
    { href: '#contact', label: dict.nav.contact },
  ]
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('keydown', onKey); window.addEventListener('resize', onResize)
    return () => { document.body.classList.remove('menu-open'); window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize) }
  }, [open])
  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-8">
        <Link href={`/${locale}`} className="flex items-center" aria-label={company.name}>
          <Image src="/silvotech-logo-user.png" alt={`${company.name} — logo`} width={1360} height={456} priority className="h-9 w-auto max-w-44 object-contain brightness-0 invert" />
        </Link>
        <nav aria-label={dict.nav.menu} className="hidden lg:block"><ul className="flex items-center gap-[clamp(20px,2.8vw,56px)]">{links.map(l=><li key={l.href}><a href={l.href} className="font-mono text-[clamp(11px,.78vw,14px)] tracking-[.16em] text-white uppercase hover:text-white/60">{l.label}</a></li>)}</ul></nav>
        <div className="flex items-center gap-4"><LanguageSwitcher current={locale} label={dict.nav.language} /><a href="#contact" className="hidden border border-white/25 px-6 py-3 font-mono text-xs tracking-[.18em] text-white uppercase hover:border-white/50 hover:bg-white/5 sm:inline-flex">{dict.nav.cta}</a><button type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-controls="mobileMenu" aria-label={open ? dict.nav.close : dict.nav.menu} className="relative size-11 lg:hidden"><span className={`absolute left-1/2 top-4 h-px w-[22px] -translate-x-1/2 bg-white transition ${open?'top-[22px] rotate-45':''}`} /><span className={`absolute left-1/2 top-[22px] h-px w-[22px] -translate-x-1/2 bg-white transition ${open?'scale-x-0 opacity-0':''}`} /><span className={`absolute left-1/2 top-7 h-px w-[22px] -translate-x-1/2 bg-white transition ${open?'top-[22px] -rotate-45':''}`} /></button></div>
      </div>
      <div id="mobileMenu" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} className={`fixed inset-0 -z-10 bg-[#040406]/95 pt-28 backdrop-blur-2xl transition duration-700 lg:hidden ${open?'opacity-100':'pointer-events-none opacity-0'}`}><nav className="container-page flex flex-col items-center gap-8 py-16">{links.map(l=><a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="font-mono text-2xl tracking-[.14em] text-white uppercase">{l.label}</a>)}<a href="#contact" onClick={()=>setOpen(false)} className="border border-white/25 px-10 py-4 font-mono tracking-[.22em] text-white uppercase">{dict.nav.cta}</a></nav></div>
    </header>
  )
}
