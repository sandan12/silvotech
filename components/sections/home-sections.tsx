import Link from 'next/link';
import { ArrowRight, Warehouse } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { SiteCopy } from '@/lib/site-content';
import ProtectedImage from '@/components/protected-image';
import InquiryForm from './inquiry-form';
import SoftGlyph, { type GlyphKind } from '@/components/soft-glyph';
import { capabilityIds, capabilityPhotos, getCapabilityCopy } from '@/lib/capabilities';
import HeroVideoMedia from './hero-video-media';

const capabilityKinds: GlyphKind[] = ['factory', 'custom', 'product', 'quality', 'layers', 'logistics'];
export default function HomeSections({ copy, lang }: { copy: SiteCopy; lang: Locale }) {
  return <>
    <section className="hero hero-video">
      <HeroVideoMedia/>
      <div className="media-shield hero-media-shield" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="shell hero-content hero-content-centred"><div className="hero-message">
        <h1>{copy.hero.title}</h1>
      </div></div>
    </section>

    <section className="section section-soft" id="produkty">
      <div className="shell">
        <SectionHeading label={copy.products.label} title={copy.products.title} lead={copy.products.lead}/>
        <div className="product-grid">
          {copy.products.items.map((item,i)=><article className={`product-card ${i===6?'product-card-featured':''}`} key={item.title}>
            <div className="product-media"><ProtectedImage src={capabilityPhotos[i]} alt={item.title} fill sizes="(max-width: 760px) 100vw, 40vw" className={i===6?'contain-image':'cover-image'}/></div>
            <div className="product-copy"><span>{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.text}</p><Link className="product-detail-link" href={`/${lang}/oferta#${capabilityIds[i]}`}>{getCapabilityCopy(lang).overviewLink}<ArrowRight size={16} aria-hidden/></Link></div>
          </article>)}
        </div>
      </div>
    </section>

    <section className="section material-principle" id="materialy">
      <div className="shell"><SectionHeading label={copy.materials.label} title={copy.materials.title} lead={copy.materials.lead}/></div>
    </section>

    <section className="section production-showcase">
      <div className="shell production-grid">
        <div className="production-single"><ProtectedImage src="/media-new/production-machine.webp" alt="SilvoTech production machine" fill sizes="(max-width: 800px) 100vw, 58vw" className="cover-image"/></div>
        <div className="production-copy">
          <p className="kicker kicker-light">{copy.capabilities.label}</p><h2>{copy.capabilities.title}</h2><p>{copy.capabilities.text}</p>
          <ul>{copy.capabilities.bullets.map((x,i)=><li key={x}><SoftGlyph kind={capabilityKinds[i] ?? 'factory'} size={36}/><span>{x}</span></li>)}</ul>
          <Link href={`/${lang}/produkcja`} className="button button-primary">{copy.capabilities.cta}<ArrowRight size={17}/></Link>
        </div>
      </div>
    </section>

    <section className="section custom-section">
      <div className="shell custom-soft-grid">
        <div><p className="kicker">{copy.custom.label}</p><h2>{copy.custom.title}</h2><p className="large-copy">{copy.custom.lead}</p><div className="input-tags">{copy.custom.inputs.map(x=><span key={x}>{x}</span>)}</div><Link href={`/${lang}/kontakt`} className="button button-dark">{copy.custom.cta}<ArrowRight size={17}/></Link></div>
        <div className="soft-material-art" aria-hidden="true"><i/><i/><i/><i/></div>
      </div>
    </section>

    <section className="section partner-section europe-section">
      <div className="shell europe-grid">
        <div><p className="kicker kicker-light">{copy.partner.label}</p><h2>{copy.partner.title}</h2><p>{copy.partner.text}</p></div>
        <div className="europe-map"><ProtectedImage src="/map-europe-eu27.webp" alt="SilvoTech deliveries across Europe" fill sizes="(max-width: 800px) 90vw, 44vw" className="europe-map-image"/></div>
      </div>
    </section>

    <section className="section">
      <div className="shell warehouse-grid">
        <div className="warehouse-photo"><ProtectedImage src="/media-new/warehouse-current.webp" alt="SilvoTech warehouse in Warsaw" fill sizes="(max-width: 800px) 100vw, 55vw" className="cover-image"/></div>
        <div><p className="kicker">{copy.warehouse.label}</p><h2>{copy.warehouse.title}</h2><p className="large-copy">{copy.warehouse.text1}</p><p>{copy.warehouse.text2}</p><Link href={`/${lang}/kontakt`} className="button button-dark"><Warehouse size={17}/>{copy.warehouse.cta}</Link></div>
      </div>
    </section>

    <section className="section section-soft">
      <div className="shell"><SectionHeading label={copy.process.label} title={copy.process.title}/><ol className="process-grid">{copy.process.steps.map((step,i)=><li key={step.title}><span>{String(i+1).padStart(2,'0')}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div>
    </section>

    <section className="section inquiry-section" id="zapytanie">
      <div className="shell inquiry-grid"><div className="inquiry-intro"><p className="kicker kicker-light">{copy.form.label}</p><h2>{copy.form.title}</h2><p>{copy.form.lead}</p></div><InquiryForm copy={copy} lang={lang}/></div>
    </section>
  </>;
}

function SectionHeading({ title, lead }: { label: string; title: string; lead?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{lead&&<p>{lead}</p>}</div>;
}
