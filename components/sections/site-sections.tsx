import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { siteCopy } from '@/lib/site-copy';
import { catalogCopy } from '@/lib/catalog-copy';
import styles from './catalog.module.css';

type Props = { dict: Dictionary; lang: Locale };
export function Manufacturing({ dict, lang }: Props) {
  return <section className={`${styles.section} ${styles.manufacturing}`}><div className={`${styles.container} ${styles.storyGrid}`}>
    <div><p className={styles.eyebrow}>{dict.productionEyebrow}</p><h2>{siteCopy[lang].production}</h2><p className={styles.lead}>{dict.productionLead}</p>
      <dl className={styles.capabilities}>{[1,2,4].map(n=><div key={n}><dt>{dict[`productionBlock${n}Title`]}</dt><dd>{dict[`productionBlock${n}Text`]}</dd></div>)}</dl>
      <Link href={`/${lang}/o-nas`} className={styles.textLink}>{dict.navAbout} →</Link>
    </div><Image src="/extrusion-head.webp" alt={siteCopy[lang].production} width={800} height={620} className={styles.productionImage} />
  </div></section>;
}
export function AboutContent({ dict, lang }: Props) {
  const copy = siteCopy[lang];
  const process = catalogCopy[lang];
  return <div className={styles.root}>
    <section className={styles.section}><div className={`${styles.container} ${styles.storyGrid}`}>
      <div><h2>{copy.production}</h2><p className={styles.lead}>{copy.aboutIntro}</p><p className={styles.lead}>{copy.aboutBody}</p></div>
      <Image src="/extrusion-head.webp" alt={copy.production} width={800} height={620} className={styles.productionImage} />
    </div></section>
    <section className={`${styles.section} ${styles.soft}`}><div className={styles.container}><h2>{process.steps}</h2><ol className={styles.steps}>{[[process.step1,process.step1Text],[process.step2,process.step2Text],[process.step3,process.step3Text]].map(([title,text],i)=><li key={title}><span className={styles.stepNumber}>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
  </div>;
}
export function CooperationContent({ dict, lang }: Props) {
  return <div className={styles.root}><section className={styles.section}><div className={styles.container}>
    <div className={styles.industryRows}>{[1,2,3].map(n=><article key={n}><span className={styles.stepNumber}>0{n}</span><h2>{dict[`industry${n}Title`]}</h2><div><p>{dict[`industry${n}Text`]}</p><ul className={styles.points}>{[1,2,3].map(i=><li key={i}>{dict[`industry${n}P${i}`]}</li>)}</ul></div></article>)}</div>
    <p className={styles.note}>{catalogCopy[lang].applicationText}</p>
  </div></section></div>;
}
export function DocumentsContent({ dict, lang }: Props) {
  const copy = siteCopy[lang];
  return <div className={styles.root}><section className={styles.section}><div className={`${styles.container} ${styles.split}`}>
    <div><h2>{dict.qualityDocsTitle}</h2><p className={styles.lead}>{copy.docsIntro}</p><p className={styles.note}>{dict.qualityLead}</p><Link href={`/${lang}/kontakt`} className={styles.textLink}>{copy.docsCta} →</Link></div>
    <ol className={styles.documentList}>{[dict.qualityDoc1,dict.qualityDoc2,dict.qualityDoc3,dict.qualityDoc4].map((title,i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3></li>)}</ol>
  </div></section></div>;
}
