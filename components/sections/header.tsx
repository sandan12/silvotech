'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { COMPANY } from '@/lib/company';
import { locales, type Dictionary, type Locale } from '@/lib/i18n';
import LangFlag from './lang-flag';

export default function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close the language menu on Escape or a click outside it.
  useEffect(() => {
    if (!langOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLangOpen(false);
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [langOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [pathname]);

  const navItems = [
    { key: 'navAbout', href: `/${lang}/o-nas` },
    { key: 'navOffer', href: `/${lang}/oferta` },
    { key: 'navCoop', href: `/${lang}/wspolpraca` },
    { key: 'navDocs', href: `/${lang}/dokumenty` },
    { key: 'navContact', href: `/${lang}/kontakt` },
  ];

  const switchTo = (l: Locale) => `/${l}${pathname.replace(/^\/(pl|en|de|cz|sk)/, '') || ''}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="bg-navy-deep text-white">
        <div className="container-page flex h-10 items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <Image
              src="/silvotech-unia.webp"
              alt={dict.euBadgeTitle}
              title={dict.euBadgeTitle}
              width={109}
              height={39}
              className="hidden h-5 w-auto sm:block"
            />
            <p className="hidden text-[0.8rem] font-medium text-white/65 md:block">
              {dict.topbarTagline}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-1.5 text-[0.78rem] font-medium text-white/80 transition-colors hover:text-white"
            >
              <Phone size={12} aria-hidden /> {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="hidden items-center gap-1.5 text-[0.78rem] font-medium text-white/80 transition-colors hover:text-white sm:flex"
            >
              <Mail size={12} aria-hidden /> {COMPANY.email}
            </a>

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                aria-label={dict.topbarLang}
                aria-expanded={langOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1.5 border border-white/25 px-2 py-1 transition-colors hover:bg-white/10"
              >
                <LangFlag lang={lang} className="h-3.5 w-auto" />
                <ChevronDown
                  size={11}
                  aria-hidden
                  className={`text-white/70 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langOpen && (
                <div role="menu" className="absolute right-0 top-full mt-1 border border-line bg-white shadow-md">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      role="menuitem"
                      href={switchTo(l)}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] transition-colors hover:bg-band ${
                        l === lang ? 'text-orange' : 'text-ink'
                      }`}
                    >
                      <LangFlag lang={l} className="h-3.5 w-auto" />
                      {l}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-line bg-white">
        <div className="container-page flex min-h-[4.25rem] items-center justify-between gap-6">
          <Link href={`/${lang}`} className="flex shrink-0 items-center py-3">
            <Image
              src="/silvotech-logo.png"
              alt="SilvoTech"
              width={380}
              height={126}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`border-b-2 py-1.5 text-[0.9rem] font-medium tracking-[0.01em] transition-colors ${
                    active
                      ? 'border-orange text-navy'
                      : 'border-transparent text-body hover:border-line-strong hover:text-navy'
                  }`}
                >
                  {dict[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href={`/${lang}/kontakt`} className="btn btn-cta hidden !px-4 !py-2.5 !text-[0.74rem] md:inline-flex">
              {dict.cta}
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={dict.navContact}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-line bg-white lg:hidden">
            <nav aria-label="Main" className="container-page flex flex-col py-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-line py-3 text-[0.95rem] font-medium text-ink"
                >
                  {dict[item.key]}
                </Link>
              ))}
              <Link
                href={`/${lang}/kontakt`}
                onClick={() => setMobileOpen(false)}
                className="btn btn-cta mt-4"
              >
                {dict.cta}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
