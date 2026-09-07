'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { standardSizes } from '@/lib/products';
import { catalogCopy } from '@/lib/catalog-copy';
import styles from './catalog.module.css';

type Props = { dict: Dictionary; lang: Locale };
const categories = [
  { id: 'hoses', number: 1, image: '/hose-clear-coil-a.png', product: 'clear' },
  { id: 'plates', number: 2, image: '/product-plates.webp', product: 'plates' },
  { id: 'gaskets', number: 3, image: '/product-gaskets.webp', product: 'gaskets' },
] as const;

export function ProductCategories({ dict, lang, detailed = false }: Props & { detailed?: boolean }) {
  const copy = catalogCopy[lang];
  return (
    <section className={styles.section} id="products" aria-labelledby="products-title">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div><p className={styles.eyebrow}>SilvoTech / {dict.navOffer}</p><h2 id="products-title">{dict.offerCatsTitle}</h2></div>
          {!detailed && <Link className={styles.textLink} href={`/${lang}/oferta`}>{dict.aboutCtaOffer} <span aria-hidden>↗</span></Link>}
        </div>
        <div className={styles.products}>
          {categories.map(({ id, number, image, product }) => (
            <article key={id} id={id} className={styles.product}>
              <Link className={styles.productImage} href={detailed ? `/${lang}/kontakt?product=${product}` : `/${lang}/oferta#${id}`} aria-label={dict[`offerCat${number}Title`]}>
                <Image src={image} alt={dict[`offerCat${number}Title`]} fill sizes="(max-width: 720px) 100vw, 33vw" className={styles.contain} />
              </Link>
              <div className={styles.productBody}>
                <h3>{dict[`offerCat${number}Title`]}</h3>
                <p>{dict[`offerCat${number}Desc`]}</p>
                {detailed && <ul className={styles.points}>{[1, 2, 3].map(n => <li key={n}>{dict[`offerCat${number}P${n}`]}</li>)}</ul>}
                <Link className={styles.textLink} href={detailed ? `/${lang}/kontakt?product=${product}` : `/${lang}/oferta#${id}`}>
                  {detailed ? dict.cta : copy.view} <span aria-hidden>→</span>
                </Link>
                {detailed && id === 'hoses' && <Link className={styles.textLink} href={`/${lang}/kontakt?product=technical`}>{dict.homeProd2Title} <span aria-hidden>→</span></Link>}
              </div>
            </article>
          ))}
        </div>
        <div className={styles.custom} id="custom">
          <div><h3>{dict.offerCat4Title}</h3><p>{copy.customText}</p></div>
          <Link className={styles.outlineButton} href={`/${lang}/kontakt?product=custom`}>{dict.cta} <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  );
}

export function SizeChooser({ dict, lang }: Props) {
  const [selected, setSelected] = useState('');
  const copy = catalogCopy[lang];
  const href = selected ? `/${lang}/kontakt?product=clear&size=${encodeURIComponent(selected)}` : `/${lang}/kontakt?product=clear`;
  return (
    <section id="sizes" className={`${styles.section} ${styles.soft}`} aria-labelledby="sizes-title">
      <div className={`${styles.container} ${styles.split}`}>
        <div>
          <p className={styles.eyebrow}>{dict.specsEyebrow}</p>
          <h2 id="sizes-title">{dict.specsTitle}</h2>
          <p className={styles.lead}>{copy.sizeHint}</p>
          <p className={styles.note}>{dict.specsNote}</p>
        </div>
        <div>
          <fieldset className={styles.sizeField}>
            <legend>{copy.clear} · mm</legend>
            <div className={styles.sizes}>
              {standardSizes.map(size => (
                <label key={size} className={styles.sizeOption}>
                  <input type="radio" name="hose-size" value={size} checked={selected === size} onChange={() => setSelected(size)} />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className={styles.sizeAction}>
            <p role="status">{selected ? `${copy.selected}: ${selected} mm` : copy.choose}</p>
            <Link className={styles.button} href={href}>{dict.cta} <span aria-hidden>→</span></Link>
          </div>
          <Link className={styles.textLink} href={`/${lang}/kontakt?product=custom`}>{copy.custom} <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  );
}

export function ApplicationNote({ dict, lang }: Props) {
  const copy = catalogCopy[lang];
  return (
    <section className={styles.section} aria-labelledby="application-title">
      <div className={`${styles.container} ${styles.split}`}>
        <div><p className={styles.eyebrow}>{dict.qualityEyebrow}</p><h2 id="application-title">{copy.application}</h2><p className={styles.lead}>{copy.applicationText}</p></div>
        <div className={styles.documents}>
          <h3>{dict.qualityDocsTitle}</h3>
          <ul>{[dict.qualityDoc1, dict.qualityDoc2, dict.qualityDoc3].map(item => <li key={item}>{item}</li>)}</ul>
          <Link className={styles.textLink} href={`/${lang}/dokumenty`}>{dict.aboutGuaranteeCta} <span aria-hidden>→</span></Link>
        </div>
      </div>
    </section>
  );
}

export default function CatalogHome({ dict, lang }: Props) {
  const copy = catalogCopy[lang];
  return (
    <div className={styles.root}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>SilvoTech / {copy.range}</p>
            <h1 id="home-title">{dict.heroTitle}</h1>
            <p className={styles.lead}>{copy.intro}</p>
            <div className={styles.actions}>
              <Link href={`/${lang}/oferta`} className={styles.button}>{dict.aboutCtaOffer} <span aria-hidden>→</span></Link>
              <a href="#sizes" className={styles.outlineButton}>{dict.heroSecondaryCta}</a>
            </div>
            <Link className={styles.textLink} href={`/${lang}/kontakt`}>{dict.heroPrimaryCta} <span aria-hidden>↗</span></Link>
          </div>
          <figure className={styles.heroFigure}>
            <div className={styles.heroImage}><Image src="/hose-clear-coil-a.png" alt={dict.homeProd1Title} fill priority sizes="(max-width: 900px) 100vw, 50vw" className={styles.contain} /></div>
            <figcaption><span>{dict.homeProd1Title}</span><Link href={`/${lang}/oferta#hoses`} aria-label={`${copy.view}: ${dict.homeProd1Title}`}>↗</Link></figcaption>
          </figure>
        </div>
      </section>
      <ProductCategories dict={dict} lang={lang} />
      <SizeChooser dict={dict} lang={lang} />
      <ApplicationNote dict={dict} lang={lang} />
      <section className={`${styles.section} ${styles.process}`} aria-labelledby="process-title">
        <div className={styles.container}>
          <div className={styles.sectionHead}><h2 id="process-title">{copy.steps}</h2><Link className={styles.outlineButton} href={`/${lang}/kontakt`}>{dict.cta} <span aria-hidden>→</span></Link></div>
          <ol className={styles.steps}>{[
            [copy.step1, copy.step1Text], [copy.step2, copy.step2Text], [copy.step3, copy.step3Text],
          ].map(([title, text], i) => <li key={title}><span className={styles.stepNumber}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
        </div>
      </section>
    </div>
  );
}
