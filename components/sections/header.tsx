import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/lib/i18n';
import type { SiteCopy } from '@/lib/site-content';

function LanguageMark() {
  return <svg className="language-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 12c0-4.2 3.3-7.5 7.5-7.5s7.5 3.3 7.5 7.5-3.3 7.5-7.5 7.5S4.5 16.2 4.5 12Z"/><path d="M8.4 6.1c2.2 3.7 2.2 8.1 0 11.8M15.6 6.1c-2.2 3.7-2.2 8.1 0 11.8M5 12h14"/></svg>;
}

export default function Header({ copy, lang, path = '' }: { copy: SiteCopy; lang: Locale; path?: string }) {
  const nav = [
    [copy.nav.production, `/${lang}/produkcja`],
    [copy.nav.about, `/${lang}/o-nas`],
    [copy.nav.cooperation, `/${lang}/wspolpraca`],
    [copy.nav.documents, `/${lang}/dokumenty`],
    [copy.nav.contact, `/${lang}/kontakt`],
  ];
  return <header className="site-header compact-header">
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
            <summary aria-label={copy.nav.language}><LanguageMark/><span>{localeNames[lang].label}</span></summary>
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
  </header>;
}
