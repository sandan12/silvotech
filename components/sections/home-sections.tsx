import Link from 'next/link';
import { ArrowRight, Factory, Layers3, Ruler, Warehouse, ClipboardCheck, PackageCheck, FlaskConical, Cog, Truck, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { SiteCopy } from '@/lib/site-content';
import ProtectedImage from '@/components/protected-image';
import InquiryForm from './inquiry-form';

const capabilityIcons = [Factory, Cog, Ruler, ShieldCheck, PackageCheck, Truck];
const productPhotos: Array<string | null> = [
  '/media-new/silicone-hose.webp',
  '/media-new/finished-products.webp',
  '/media-new/silicone-profile-line.webp',
  '/media-new/sheets-products.webp',
  '/media-new/products-assortment.webp',
  null,
  '/media-new/hose-winding-machine.webp',
];
const materialPhotos = [
  '/media-new/material-silicone.webp',
  '/media-new/material-rubber.webp',
  '/media-new/material-epdm.webp',
  '/media-new/material-nbr.webp',
  '/media-new/material-plastics.webp',
];

export default function HomeSections({ copy, lang }: { copy: SiteCopy; lang: Locale }) {
  return <>
    <section className="hero hero-video">
      <video className="hero-video-media" autoPlay muted loop playsInline preload="metadata" poster="/media-new/silvotech-hero-poster.jpg" aria-hidden="true" tabIndex={-1}>
        <source src="/media-new/silvotech-hero.mp4" type="video/mp4" />
      </video>
      <div className="media-shield hero-media-shield" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="shell hero-content hero-content-centred">
        <h1>{copy.hero.title}</h1>
      </div>
    </section>

    <section className="section factory-intro"><div className="shell split-intro"><div><p className="kicker">{copy.factory.label}</p><h2>{copy.factory.title}</h2></div><div><p className="large-copy">{copy.factory.text}</p><div className="fact-row">{copy.factory.facts.map((x,i)=><span key={x}><b>0{i+1}</b>{x}</span>)}</div></div></div></section>

    <section className="section section-soft" id="produkty"><div className="shell"><SectionHeading label={copy.products.label} title={copy.products.title} lead={copy.products.lead}/><div className="product-grid">{copy.products.items.map((item,i)=>{const photo=productPhotos[i];return <article className={`product-card ${i===6?'product-card-featured':''}`} key={item.title}><div className="product-media">{photo?<ProtectedImage src={photo} alt={item.title} fill sizes="(max-width: 760px) 100vw, 40vw" className="cover-image"/>:<div className="soft-product-visual" aria-hidden="true"><i/><i/><i/></div>}</div><div className="product-copy"><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>})}</div><div className="other-product"><div><p className="kicker">{copy.products.otherTitle}</p><h3>{copy.products.otherText}</h3></div><Link href={`/${lang}/kontakt`} className="button button-dark">{copy.products.otherCta}<ArrowRight size={17}/></Link></div></div></section>

    <section className="section" id="materialy"><div className="shell"><SectionHeading label={copy.materials.label} title={copy.materials.title} lead={copy.materials.lead}/><div className="materials-grid">{copy.materials.items.map((item,i)=><article className="material-card" key={item.title}><div className="material-photo"><ProtectedImage src={materialPhotos[i]} alt={item.title} fill sizes="(max-width: 700px) 100vw, 20vw" className="cover-image"/></div><div><h3>{item.title}</h3><p>{item.text}</p><Link href={`/${lang}/oferta`}>{copy.products.otherCta}<ArrowRight size={14}/></Link></div></article>)}</div></div></section>

    <section className="section production-showcase"><div className="shell production-grid"><div className="production-pair"><div><ProtectedImage src="/media-new/production-machine.webp" alt="SilvoTech production machine" fill sizes="(max-width: 800px) 100vw, 38vw" className="cover-image"/></div><div><ProtectedImage src="/media-new/silicone-sheets-line.webp" alt="Production of silicone sheets" fill sizes="(max-width: 800px) 100vw, 24vw" className="cover-image"/></div></div><div className="production-copy"><p className="kicker kicker-light">{copy.capabilities.label}</p><h2>{copy.capabilities.title}</h2><p>{copy.capabilities.text}</p><ul>{copy.capabilities.bullets.map((x,i)=>{const Icon=capabilityIcons[i] ?? Factory;return <li key={x}><Icon size={18}/>{x}</li>})}</ul><Link href={`/${lang}/produkcja`} className="button button-primary">{copy.capabilities.cta}<ArrowRight size={17}/></Link></div></div></section>

    <section className="section custom-section"><div className="shell custom-soft-grid"><div><p className="kicker">{copy.custom.label}</p><h2>{copy.custom.title}</h2><p className="large-copy">{copy.custom.lead}</p><div className="input-tags">{copy.custom.inputs.map(x=><span key={x}>{x}</span>)}</div><Link href={`/${lang}/kontakt`} className="button button-dark">{copy.custom.cta}<ArrowRight size={17}/></Link></div><div className="soft-material-art" aria-hidden="true"><i/><i/><i/><i/></div></div></section>

    <section className="section partner-section"><div className="shell europe-grid"><div><p className="kicker kicker-light">{copy.partner.label}</p><h2>{copy.partner.title}</h2><p>{copy.partner.text}</p><div className="partner-list">{copy.partner.materials.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}</div></div><div className="europe-map"><ProtectedImage src="/map-europe-eu27.webp" alt="SilvoTech deliveries across Europe" fill sizes="(max-width: 800px) 90vw, 44vw" className="europe-map-image"/></div></div></section>

    <section className="section"><div className="shell warehouse-grid"><div className="warehouse-photo"><ProtectedImage src="/media-new/warehouse-wide.webp" alt="SilvoTech warehouse in Warsaw" fill sizes="(max-width: 800px) 100vw, 55vw" className="cover-image"/></div><div><p className="kicker">{copy.warehouse.label}</p><h2>{copy.warehouse.title}</h2><p className="large-copy">{copy.warehouse.text1}</p><p>{copy.warehouse.text2}</p><p className="fine-note">{copy.warehouse.note}</p><Link href={`/${lang}/kontakt`} className="button button-dark"><Warehouse size={17}/>{copy.warehouse.cta}</Link></div></div></section>

    <section className="section section-soft"><div className="shell"><SectionHeading label={copy.process.label} title={copy.process.title}/><ol className="process-grid">{copy.process.steps.map((step,i)=><li key={step.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

    <section className="section"><div className="shell"><SectionHeading label={copy.benefits.label} title={copy.benefits.title}/><div className="benefits-grid">{copy.benefits.items.map((item,i)=>{const icons=[Factory,Layers3,FlaskConical,ClipboardCheck,Cog,Warehouse];const Icon=icons[i] ?? Factory;return <article key={item.title}><Icon size={21}/><h3>{item.title}</h3><p>{item.text}</p></article>})}</div></div></section>

    <section className="section inquiry-section" id="zapytanie"><div className="shell inquiry-grid"><div><p className="kicker kicker-light">{copy.form.label}</p><h2>{copy.form.title}</h2><p>{copy.form.lead}</p><div className="inquiry-photo"><ProtectedImage src="/media-new/warehouse-logistics.webp" alt="SilvoTech warehouse and logistics" fill sizes="(max-width: 800px) 100vw, 40vw" className="cover-image"/></div></div><InquiryForm copy={copy} lang={lang}/></div></section>
  </>;
}

function SectionHeading({ label, title, lead }: { label: string; title: string; lead?: string }) { return <div className="section-heading"><p className="kicker">{label}</p><h2>{title}</h2>{lead&&<p>{lead}</p>}</div>; }
