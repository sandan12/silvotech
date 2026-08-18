'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Phone, Menu, X, ChevronDown } from 'lucide-react';
import { COMPANY } from '@/lib/company';
import { locales, type Dictionary, type Locale } from '@/lib/i18n';
import EUFlag from './eu-flag';
import LangFlag from './lang-flag';

export default function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'navAbout', href: `/${lang}/o-nas` },
    { key: 'navOffer', href: `/${lang}/oferta` },
    { key: 'navCoop', href: `/${lang}/wspolpraca` },
    { key: 'navDocs', href: `/${lang}/dokumenty` },
    { key: 'navContact', href: `/${lang}/kontakt` },
  ];

  const switchTo = (l: Locale) => {
    const path = pathname.replace(/^\/(pl|en|de|cs|sk)/, '');
    return `/${l}${path || ''}`;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-navy text-white">
        <div className="container-page flex h-10 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-white/70 md:block">{dict.topbarTagline}</p>
            <img
              src="/silvotech-unia.webp"
              alt="Unia Europejska"
              title={dict.euBadgeTitle}
              className="hidden h-7 w-auto rounded-[2px] shadow-sm sm:block"
            />
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href={COMPANY.phoneHref} className="flex items-center gap-1.5 font-medium text-white/90 transition hover:text-white">
              <Phone size={12} /> {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="hidden items-center gap-1.5 font-medium text-white/90 transition hover:text-white sm:flex">
              <Mail size={12} /> {COMPANY.email}
            </a>
            <span
              title={dict.euBadgeTitle}
              className="hidden items-center gap-1.5 rounded border border-white/25 bg-white/10 px-2 py-1 font-semibold uppercase tracking-wide sm:flex"
            >
              <EUFlag className="h-3.5 w-auto rounded-[1px] shadow-sm" />
              {dict.euBadge}
            </span>
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                title={dict.topbarLang}
                aria-label={dict.topbarLang}
                className="flex items-center gap-1.5 rounded border border-white/25 px-2 py-1 transition hover:bg-white/10"
              >
                <LangFlag lang={lang} className="h-4 w-auto" />
                <ChevronDown size={12} className={`text-white/80 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 overflow-hidden rounded-lg border border-line bg-white shadow-lg">
                  {locales.map((l) => (
                    <Link
                      key={l}
                      href={switchTo(l)}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-2.5 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:bg-band ${l === lang ? 'text-blue' : 'text-ink'}`}
                    >
                      <LangFlag lang={l} className="h-4 w-auto" />
                      {l}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`border-b border-line transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
        <div className="container-page flex min-h-[4.5rem] items-center justify-between gap-6 py-3.5">
          <a href={`/${lang}`} className="flex shrink-0 items-center">
            <Image src="/silvotech-logo.png" alt="SilvoTech" width={180} height={60} priority className="h-9 w-auto" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium transition ${active ? 'text-navy' : 'text-body hover:text-navy'}`}
                  style={active ? { boxShadow: 'inset 0 -2px 0 var(--navy)' } : undefined}
                >
                  {dict[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href={`/${lang}/kontakt`} className="btn btn-cta hidden !px-5 !py-2.5 text-sm md:inline-flex">
              {dict.cta}
            </Link>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-line bg-white lg:hidden">
            <nav className="container-page flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-line py-3.5 text-sm font-medium text-ink"
                >
                  {dict[item.key]}
                </Link>
              ))}
              <Link href={`/${lang}/kontakt`} onClick={() => setMobileOpen(false)} className="btn btn-cta mt-4 text-sm">
                {dict.cta}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}