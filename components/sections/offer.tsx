import type { Dictionary, Locale } from '@/lib/i18n';
import { ProductCategories, SizeChooser, ApplicationNote } from './catalog';
import styles from './catalog.module.css';

export default function Offer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return <div className={styles.root}>
    <ProductCategories dict={dict} lang={lang} detailed />
    <SizeChooser dict={dict} lang={lang} />
    <ApplicationNote dict={dict} lang={lang} />
  </div>;
}
