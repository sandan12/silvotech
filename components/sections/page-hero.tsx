import styles from './catalog.module.css';
export default function PageHero({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return <section className={`${styles.root} ${styles.pageHero}`}><div className={styles.container}>
    {eyebrow && <p className={styles.eyebrow}>SilvoTech / {eyebrow}</p>}<h1>{title}</h1>{lead && <p className={styles.lead}>{lead}</p>}
  </div></section>;
}
