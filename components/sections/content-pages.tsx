import Link from 'next/link';
import { ArrowRight, CheckCircle2, Factory, Layers3, PackageCheck, Warehouse } from 'lucide-react';
import type { SiteCopy } from '@/lib/site-content';
import type { Locale } from '@/lib/i18n';
import InquiryForm from './inquiry-form';
import PageHero from './page-hero';

export function ProductsPage({copy,lang}:{copy:SiteCopy;lang:Locale}) {
  return <><PageHero label={copy.products.label} title={copy.products.title} lead={copy.products.lead}/><section className="section"><div className="shell text-card-grid">{copy.products.items.map((x,i)=><article className="soft-text-card" key={x.title}><span>{String(i+1).padStart(2,'0')}</span><PackageCheck size={24}/><h2>{x.title}</h2><p>{x.text}</p></article>)}</div></section><section className="section section-soft" id="materialy"><div className="shell"><div className="section-heading"><p className="kicker">{copy.materials.label}</p><h2>{copy.materials.title}</h2><p>{copy.materials.lead}</p></div><div className="material-text-grid">{copy.materials.items.map(x=><article className="soft-text-card" key={x.title}><Layers3 size={23}/><h3>{x.title}</h3><p>{x.text}</p></article>)}</div><div className="other-product"><div><h3>{copy.products.otherTitle}</h3><p>{copy.products.otherText}</p></div><Link className="button button-dark" href={`/${lang}/kontakt`}>{copy.products.otherCta}<ArrowRight size={16}/></Link></div></div></section></>;
}

export function ProductionPage({copy,lang}:{copy:SiteCopy;lang:Locale}) {
  return <><PageHero label={copy.capabilities.label} title={copy.productionPage.title} lead={copy.productionPage.lead}/><section className="section"><div className="shell production-step-grid">{copy.productionPage.stages.map((x,i)=><article className="soft-text-card" key={x.title}><span>{String(i+1).padStart(2,'0')}</span><Factory size={25}/><h2>{x.title}</h2><p>{x.text}</p></article>)}</div></section><section className="section custom-section"><div className="shell custom-soft-grid"><div><p className="kicker">{copy.custom.label}</p><h2>{copy.custom.title}</h2><p className="large-copy">{copy.custom.lead}</p><div className="input-tags">{copy.custom.inputs.map(x=><span key={x}>{x}</span>)}</div><Link href={`/${lang}/kontakt`} className="button button-dark">{copy.custom.cta}</Link></div><div className="soft-material-art" aria-hidden="true"><i/><i/><i/><i/></div></div></section></>;
}

export function AboutPage({copy}:{copy:SiteCopy;lang:Locale}) {
  return <><PageHero label={copy.nav.about} title={copy.about.title} lead={copy.about.lead}/><section className="section"><div className="shell about-text-grid">{copy.about.pillars.map((x,i)=><article className="soft-text-card" key={x.title}><span>{String(i+1).padStart(2,'0')}</span><h2>{x.title}</h2><p>{x.text}</p></article>)}</div></section><section className="section partner-section"><div className="shell partner-grid"><div><p className="kicker kicker-light">{copy.partner.label}</p><h2>{copy.partner.title}</h2><p>{copy.partner.text}</p></div><div className="partner-list">{copy.partner.materials.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}</div>)}</div></div></section></>;
}

export function CooperationPage({copy,lang}:{copy:SiteCopy;lang:Locale}) {
  return <><PageHero label={copy.process.label} title={copy.cooperationPage.title} lead={copy.cooperationPage.lead}/><section className="section section-soft"><div className="shell"><ol className="process-grid">{copy.process.steps.map((x,i)=><li key={x.title}><span>{String(i+1).padStart(2,'0')}</span><h2>{x.title}</h2><p>{x.text}</p></li>)}</ol></div></section><section className="section"><div className="shell warehouse-text-panel"><Warehouse size={30}/><div><p className="kicker">{copy.warehouse.label}</p><h2>{copy.warehouse.title}</h2><p className="large-copy">{copy.warehouse.text1}</p><p>{copy.warehouse.text2}</p><p className="fine-note">{copy.warehouse.note}</p><Link className="button button-dark" href={`/${lang}/kontakt`}>{copy.warehouse.cta}</Link></div></div></section></>;
}

export function DocumentsPage({copy}:{copy:SiteCopy;lang:Locale}) {
  return <><PageHero label={copy.nav.documents} title={copy.docs.title} lead={copy.docs.lead}/><section className="section"><div className="shell docs-grid">{copy.docs.items.map(x=><article key={x.title}><CheckCircle2 size={22}/><h2>{x.title}</h2><p>{x.text}</p></article>)}</div><div className="shell docs-note">{copy.docs.note}</div></section></>;
}

export function ContactPage({copy,lang}:{copy:SiteCopy;lang:Locale}) {
  return <><PageHero label={copy.form.label} title={copy.form.title} lead={copy.form.lead}/><section className="section" id="zapytanie"><div className="shell contact-layout"><div className="contact-soft-panel"><Factory size={30}/><h2>{copy.factory.title}</h2><p>{copy.factory.text}</p></div><InquiryForm copy={copy} lang={lang}/></div></section></>;
}
