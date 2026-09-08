import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company';
import styles from './catalog.module.css';
export default function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const nav = [[dict.navAbout,'o-nas'],[dict.navOffer,'oferta'],[dict.navCoop,'wspolpraca'],[dict.navDocs,'dokumenty'],[dict.navContact,'kontakt']];
  const products = [[dict.homeProd1Title,'hoses'],[dict.homeProd2Title,'technical'],[dict.offerCat2Title,'plates'],[dict.offerCat3Title,'gaskets'],[dict.offerCat4Title,'custom']];
  return <footer className={styles.footer}><div className={`${styles.container} ${styles.footerGrid}`}>
    <div><Link href={`/${lang}`} className={styles.footerLogo}><Image src="/silvotech-logo.png" alt="SilvoTech" width={190} height={63} /></Link><p>{dict.footerTagline}</p></div>
    <nav aria-label={dict.footerCompany}><h2>{dict.footerCompany}</h2>{nav.map(([label,route])=><Link key={route} href={`/${lang}/${route}`}>{label}</Link>)}</nav>
    <nav aria-label={dict.footerProductsTitle}><h2>{dict.footerProductsTitle}</h2>{products.map(([label,id])=><Link key={id} href={`/${lang}/oferta#${id}`}>{label}</Link>)}</nav>
    <div><h2>{dict.footerContactTitle}</h2><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><a href={COMPANY.phoneHref}>{COMPANY.phone}</a><address>{COMPANY.address}</address><p>{dict.footerNip}: {COMPANY.nip}</p></div>
  </div><div className={`${styles.container} ${styles.footerBottom}`}>© {new Date().getFullYear()} {COMPANY.name}. {dict.footerRights}</div></footer>;
}
