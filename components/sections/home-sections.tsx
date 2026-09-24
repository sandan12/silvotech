import Link from 'next/link';
import { ArrowRight, Factory, Layers3, Ruler, Warehouse, ClipboardCheck, PackageCheck, FlaskConical, Cog, Truck, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { SiteCopy } from '@/lib/site-content';
import ProtectedImage from '@/components/protected-image';
import InquiryForm from './inquiry-form';

const capabilityIcons = [Factory, Cog, Ruler, ShieldCheck, PackageCheck, Truck];

export default function HomeSections({ copy, lang }: { copy: SiteCopy; lang: Locale }) {
  return <>
    <section className="hero">
      <ProtectedImage src="/media/hero-production-line.webp" alt="SilvoTech production line" fill priority sizes="100vw" className="hero-image"/>
      <div className="hero-scrim" aria-hidden/>
      <div className="shell hero-content"><p className="kicker kicker-light">{copy.hero.eyebrow}</p><h1>{copy.hero.title}</h1><p className="hero-lead">{copy.hero.lead}</p><p className="hero-proof">{copy.hero.proof}</p><div className="button-row"><Link className="button button-primary" href={`/${lang}/kontakt`}>{copy.hero.primary}<ArrowRight size={17}/></Link><Link className="button button-ghost" href={`/${lang}/kontakt#zapytanie`}>{copy.hero.secondary}</Link></div></div>
    </section>

    <section className="section factory-intro"><div className="shell split-intro"><div><p className="kicker">{copy.factory.label}</p><h2>{copy.factory.title}</h2></div><div><p className="large-copy">{copy.factory.text}</p><div className="fact-row">{copy.factory.facts.map((x,i)=><span key={x}><b>0{i+1}</b>{x}</span>)}</div></div></div></section>

    <section className="section section-soft" id="produkty"><div className="shell"><SectionHeading label={copy.products.label} title={copy.products.title} lead={copy.products.lead}/><div className="product-grid">{copy.products.items.map((item,i)=><article className={`product-card ${i===6?'product-card-featured':''}`} key={item.title}><div className="product-media"><ProtectedImage src={item.image!} alt={item.title} fill sizes="(max-width: 760px) 100vw, 40vw" className="cover-image"/></div><div className="product-copy"><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div><div className="other-product"><div><p className="kicker">{copy.products.otherTitle}</p><h3>{copy.products.otherText}</h3></div><Link href={`/${lang}/kontakt`} className="button button-dark">{copy.products.otherCta}<ArrowRight size={17}/></Link></div></div></section>

    <section className="section" id="materialy"><div className="shell"><SectionHeading label={copy.materials.label} title={copy.materials.title} lead={copy.materials.lead}/><div className="materials-grid">{copy.materials.items.map((item)=><article className="material-card" key={item.title}><div className="material-photo"><ProtectedImage src={item.image!} alt={item.title} fill sizes="(max-width: 700px) 100vw, 20vw" className="cover-image"/></div><div><h3>{item.title}</h3><p>{item.text}</p><Link href={`/${lang}/oferta#materialy`}>{copy.products.otherCta}<ArrowRight size={14}/></Link></div></article>)}</div></div></section>

    <section className="section production-showcase"><div className="shell production-grid"><div className="production-collage"><div className="collage-large"><ProtectedImage src="/media/machine-detail.webp" alt="SilvoTech production machine" fill sizes="60vw" className="cover-image"/></div><div><ProtectedImage src="/media/machine-line.webp" alt="SilvoTech manufacturing line" fill sizes="30vw" className="cover-image"/></div><div><ProtectedImage src="/media/product-capabilities.webp" alt="SilvoTech product range" fill sizes="30vw" className="cover-image"/></div></div><div className="production-copy"><p className="kicker kicker-light">{copy.capabilities.label}</p><h2>{copy.capabilities.title}</h2><p>{copy.capabilities.text}</p><ul>{copy.capabilities.bullets.map((x,i)=>{const Icon=capabilityIcons[i];return <li key={x}><Icon size={18}/>{x}</li>})}</ul><Link href={`/${lang}/produkcja`} className="button button-primary">{copy.capabilities.cta}<ArrowRight size={17}/></Link></div></div></section>

    <section className="section custom-section"><div className="shell custom-grid"><div><p className="kicker">{copy.custom.label}</p><h2>{copy.custom.title}</h2><p className="large-copy">{copy.custom.lead}</p><div className="input-tags">{copy.custom.inputs.map(x=><span key={x}>{x}</span>)}</div><Link href={`/${lang}/kontakt`} className="button button-dark">{copy.custom.cta}<ArrowRight size={17}/></Link></div><div className="custom-photo"><ProtectedImage src="/media/product-range.webp" alt="Custom silicone rubber and plastic components" fill sizes="50vw" className="cover-image"/></div></div></section>

    <section className="section partner-section"><div className="shell partner-grid"><div><p className="kicker kicker-light">{copy.partner.label}</p><h2>{copy.partner.title}</h2><p>{copy.partner.text}</p></div><div className="partner-list">{copy.partner.materials.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}</div></div></section>

    <section className="section"><div className="shell warehouse-grid"><div className="warehouse-photo"><ProtectedImage src="/media/warehouse-racks.webp" alt="SilvoTech warehouse in Warsaw" fill sizes="55vw" className="cover-image"/></div><div><p className="kicker">{copy.warehouse.label}</p><h2>{copy.warehouse.title}</h2><p className="large-copy">{copy.warehouse.text1}</p><p>{copy.warehouse.text2}</p><p className="fine-note">{copy.warehouse.note}</p><Link href={`/${lang}/kontakt`} className="button button-dark"><Warehouse size={17}/>{copy.warehouse.cta}</Link></div></div></section>

    <section className="section section-soft"><div className="shell"><SectionHeading label={copy.process.label} title={copy.process.title}/><ol className="process-grid">{copy.process.steps.map((step,i)=><li key={step.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

    <section className="section"><div className="shell"><SectionHeading label={copy.benefits.label} title={copy.benefits.title}/><div className="benefits-grid">{copy.benefits.items.map((item,i)=>{const icons=[Factory,Layers3,FlaskConical,ClipboardCheck,Cog,Warehouse];const Icon=icons[i];return <article key={item.title}><Icon size={21}/><h3>{item.title}</h3><p>{item.text}</p></article>})}</div></div></section>

    <section className="section inquiry-section" id="zapytanie"><div className="shell inquiry-grid"><div><p className="kicker kicker-light">{copy.form.label}</p><h2>{copy.form.title}</h2><p>{copy.form.lead}</p><div className="inquiry-photo"><ProtectedImage src="/media/warehouse-floor.webp" alt="SilvoTech warehouse and logistics" fill sizes="40vw" className="cover-image"/></div></div><InquiryForm copy={copy} lang={lang}/></div></section>
  </>;
}

function SectionHeading({ label, title, lead }: { label: string; title: string; lead?: string }) { return <div className="section-heading"><p className="kicker">{label}</p><h2>{title}</h2>{lead&&<p>{lead}</p>}</div>; }
