import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Menu, ChevronDown } from 'lucide-react';
import { COMPANY } from '@/lib/company';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import type { SiteCopy } from '@/lib/site-content';

export default function Header({ copy, lang, path = '' }: { copy: SiteCopy; lang: Locale; path?: string }) {
  const nav = [
    [copy.nav.products, `/${lang}/oferta`],
    [copy.nav.production, `/${lang}/produkcja`],
    [copy.nav.about, `/${lang}/o-nas`],
    [copy.nav.cooperation, `/${lang}/wspolpraca`],
    [copy.nav.documents, `/${lang}/dokumenty`],
    [copy.nav.contact, `/${lang}/kontakt`],
  ];
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="shell topbar-inner">
          <p>{copy.topbar}</p>
          <div className="topbar-contact">
            <a href={COMPANY.phoneHref}><Phone size={13} aria-hidden />{COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}`}><Mail size={13} aria-hidden />{COMPANY.email}</a>
          </div>
        </div>
      </div>
      <div className="nav-bar">
        <div className="shell nav-inner">
          <Link href={`/${lang}`} className="brand" aria-label="SilvoTech">
            <Image src="/silvotech-logo.webp" alt="SilvoTech" width={380} height={126} priority />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <div className="nav-actions">
            <details className="language-picker">
              <summary aria-label={copy.nav.language}>{localeNames[lang].label}<ChevronDown size={13} aria-hidden /></summary>
              <div className="language-menu">
                {locales.map((locale) => <Link key={locale} href={`/${locale}${path}`}>{localeNames[locale].name}</Link>)}
              </div>
            </details>
            <Link href={`/${lang}/kontakt`} className="button button-primary desktop-cta">{copy.nav.cta}</Link>
            <details className="mobile-menu">
              <summary aria-label={copy.nav.menu}><Menu size={22} aria-hidden /></summary>
              <nav aria-label="Mobile navigation">
                {nav.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
                <Link href={`/${lang}/kontakt`} className="button button-primary">{copy.nav.cta}</Link>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
