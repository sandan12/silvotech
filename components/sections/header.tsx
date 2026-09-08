'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { COMPANY } from '@/lib/company';
import { locales, type Dictionary, type Locale } from '@/lib/i18n';
import { catalogCopy } from '@/lib/catalog-copy';
import styles from './catalog.module.css';

const languageNames = { pl: 'Polski', en: 'English', de: 'Deutsch', cz: 'Čeština', sk: 'Slovenčina' };
const languageTags = { pl: 'pl', en: 'en', de: 'de', cz: 'cs', sk: 'sk' };

export default function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const language = useRef<HTMLDetailsElement>(null);
  const copy = catalogCopy[lang];
  const nav = [
    [dict.navOffer, `/${lang}/oferta`],
    [dict.navDocs, `/${lang}/dokumenty`],
    [dict.navCoop, `/${lang}/wspolpraca`],
    [dict.navAbout, `/${lang}/o-nas`],
    [dict.navContact, `/${lang}/kontakt`],
  ];
  useEffect(() => {
    setMobileOpen(false);
    if (language.current) language.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (language.current?.open) {
        language.current.open = false;
        language.current.querySelector('summary')?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (language.current && !language.current.contains(event.target as Node)) language.current.open = false;
      if (header.current && !header.current.contains(event.target as Node)) setMobileOpen(false);
    };
    document.addEventListener('keydown', escape);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('keydown', escape);
      document.removeEventListener('pointerdown', outside);
    };
  }, [mobileOpen]);
  const switchTo = (locale: Locale) => {
    const suffix = pathname.replace(/^\/(pl|en|de|cz|sk)(?=\/|$)/, '');
    return `/${locale}${suffix}`;
  };
  const closeLanguage = () => { if (language.current) language.current.open = false; };
  return <header ref={header} className={styles.header}>
    <div className={styles.utility}>
      <div className={`${styles.container} ${styles.utilityInner}`}>
        <div className={styles.contactLinks}>
          <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
          <a className={styles.email} href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>
        <details ref={language} className={styles.language}>
          <summary aria-label={`${copy.language}: ${languageNames[lang]}`}>{lang.toUpperCase()}</summary>
          <nav className={styles.languageList} aria-label={copy.language}>
            {locales.map(locale => <Link key={locale} href={switchTo(locale)} hrefLang={languageTags[locale]} lang={languageTags[locale]} aria-current={locale === lang ? 'true' : undefined} onClick={closeLanguage}>{languageNames[locale]}</Link>)}
          </nav>
        </details>
      </div>
    </div>
    <div className={`${styles.container} ${styles.navbar}`}>
      <Link href={`/${lang}`} className={styles.logo}><Image src="/silvotech-logo.png" alt="SilvoTech" width={380} height={126} priority /></Link>
      <nav className={styles.desktopNav} aria-label={copy.menu}>{nav.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}</nav>
      <div className={styles.navActions}>
        <Link className={`${styles.button} ${styles.quote}`} href={`/${lang}/kontakt`}>{dict.cta}</Link>
        <button ref={menuButton} type="button" className={styles.menuButton} onClick={() => setMobileOpen(v => !v)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? copy.close : copy.open}>
          {mobileOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>
    </div>
    {mobileOpen && <nav id="mobile-navigation" className={`${styles.container} ${styles.mobileNav}`} aria-label={copy.menu}>
      {nav.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setMobileOpen(false)}>{label}</Link>)}
    </nav>}
  </header>;
}
