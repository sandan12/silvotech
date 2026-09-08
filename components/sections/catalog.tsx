'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { standardSizes } from '@/lib/products';
import { catalogCopy } from '@/lib/catalog-copy';
import VideoHero from './video-hero';
import { Manufacturing } from './site-sections';
import CTABand from './cta-band';
import { siteCopy } from '@/lib/site-copy';
import type { HeroVideoSources } from '@/lib/hero-video';
import styles from './catalog.module.css';

type Props = { dict: Dictionary; lang: Locale };
const categories = [
  { id: 'hoses', number: 1, image: '/api/visuals/clear-v3.avif', product: 'clear' },
  { id: 'technical', number: 1, image: '/hose-black-industrial.png', product: 'technical' },
  { id: 'plates', number: 2, image: '/api/visuals/plates-v3.avif', product: 'plates' },
  { id: 'gaskets', number: 3, image: '/product-gaskets.webp', product: 'gaskets' },
] as const;

export function ProductCategories({ dict, lang, detailed = false }: Props & { detailed?: boolean }) {
  const copy = catalogCopy[lang];
  return <section className={styles.section} id="products" aria-labelledby="products-title"><div className={styles.container}>
    <div className={styles.sectionHead}><div><h2 id="products-title">{dict.offerCatsTitle}</h2></div>{!detailed && <Link className={styles.textLink} href={`/${lang}/oferta`}>{dict.aboutCtaOffer} <span aria-hidden>↗</span></Link>}</div>
    <div className={styles.products}>{categories.map(({ id, number, image, product }) => {
      const title = product === 'clear' ? dict.homeProd1Title : product === 'technical' ? dict.homeProd2Title : dict[`offerCat${number}Title`];
      const description = product === 'clear' ? dict.homeProd1Desc : product === 'technical' ? dict.homeProd2Desc : dict[`offerCat${number}Desc`];
      const href = detailed ? `/${lang}/kontakt?product=${product}` : `/${lang}/oferta#${id}`;
      return <article key={id} id={id} className={styles.product}>
        <Link className={styles.productImage} href={href} aria-label={title}><Image src={image} alt={title} fill unoptimized sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 25vw" className={styles.contain} /></Link>
        <div className={styles.productBody}><h3>{title}</h3><p>{description}</p>
          {detailed && <ul className={styles.points}>{[1, 2, 3].map(n => <li key={n}>{product === 'clear' ? dict[`homeProd1Spec${n}`] : product === 'technical' ? dict[`homeProd2Spec${n}`] : dict[`offerCat${number}P${n}`]}</li>)}</ul>}
          <Link className={styles.textLink} href={href}>{detailed ? dict.cta : copy.view} <span aria-hidden>→</span></Link>
        </div>
      </article>;
    })}</div>
    <p className={styles.imageCaption}>{siteCopy[lang].illustration}</p>
    <div className={styles.custom} id="custom"><div><h3>{dict.offerCat4Title}</h3><p>{copy.customText}</p></div><Link className={styles.outlineButton} href={`/${lang}/kontakt?product=custom`}>{dict.cta} <span aria-hidden>→</span></Link></div>
  </div></section>;
}

export function SizeChooser({ dict, lang }: Props) {
  const [selected, setSelected] = useState('');
  const copy = catalogCopy[lang];
  const href = selected ? `/${lang}/kontakt?product=clear&size=${encodeURIComponent(selected)}` : `/${lang}/kontakt?product=clear`;
  return <section id="sizes" className={`${styles.section} ${styles.soft}`} aria-labelledby="sizes-title"><div className={`${styles.container} ${styles.split}`}>
    <div><p className={styles.eyebrow}>{dict.specsEyebrow}</p><h2 id="sizes-title">{dict.specsTitle}</h2><p className={styles.lead}>{copy.sizeHint}</p><p className={styles.note}>{dict.specsNote}</p></div>
    <div><fieldset className={styles.sizeField}><legend>{copy.clear} · mm</legend><div className={styles.sizes}>{standardSizes.map(size => <label key={size} className={styles.sizeOption}><input type="radio" name="hose-size" value={size} checked={selected === size} onChange={() => setSelected(size)} /><span>{size}</span></label>)}</div></fieldset>
      <div className={styles.sizeAction}><p role="status">{selected ? `${copy.selected}: ${selected} mm` : copy.choose}</p><Link className={styles.button} href={href}>{dict.cta} <span aria-hidden>→</span></Link></div>
      <Link className={styles.textLink} href={`/${lang}/kontakt?product=custom`}>{copy.custom} <span aria-hidden>→</span></Link>
    </div>
  </div></section>;
}

export function ApplicationNote({ dict, lang }: Props) {
  const copy = catalogCopy[lang];
  return <section className={styles.section} aria-labelledby="application-title"><div className={`${styles.container} ${styles.split}`}>
    <div><p className={styles.eyebrow}>{dict.qualityEyebrow}</p><h2 id="application-title">{copy.application}</h2><p className={styles.lead}>{copy.applicationText}</p></div>
    <div className={styles.documents}><h3>{dict.qualityDocsTitle}</h3><ul>{[dict.qualityDoc1, dict.qualityDoc2, dict.qualityDoc3].map(item => <li key={item}>{item}</li>)}</ul><Link className={styles.textLink} href={`/${lang}/dokumenty`}>{dict.aboutGuaranteeCta} <span aria-hidden>→</span></Link></div>
  </div></section>;
}

export default function CatalogHome({ dict, lang, heroVideoSrc }: Props & { heroVideoSrc: HeroVideoSources | null }) {
  return <div className={styles.root}><VideoHero dict={dict} lang={lang} videoSrc={heroVideoSrc} /><ProductCategories dict={dict} lang={lang} /><Manufacturing dict={dict} lang={lang} /><SizeChooser dict={dict} lang={lang} /><CTABand dict={dict} lang={lang} /></div>;
}
