import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company';
import styles from './catalog.module.css';
export default function CTABand({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return <section className={`${styles.section} ${styles.ctaBand}`}><div className={`${styles.container} ${styles.ctaGrid}`}><div><h2>{dict.ctaBandTitle}</h2><p>{dict.ctaBandText}</p></div><div className={styles.buttonPair}><Link className={styles.button} href={`/${lang}/kontakt`}>{dict.cta} →</Link><a className={styles.outlineButton} href={COMPANY.phoneHref}>{COMPANY.phone}</a></div></div></section>;
}
