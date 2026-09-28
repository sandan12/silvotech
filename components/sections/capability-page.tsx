import Link from 'next/link';
import { ArrowRight, ClipboardList, FileImage, Ruler } from 'lucide-react';
import ProtectedImage from '@/components/protected-image';
import { getCapabilities, getCapabilityCopy } from '@/lib/capabilities';
import type { Locale } from '@/lib/i18n';
import PageHero from './page-hero';

export default function CapabilityPage({ lang }: { lang: Locale }) {
  const ui = getCapabilityCopy(lang);
  const categories = getCapabilities(lang);

  return <>
    <PageHero label={ui.heading} title={ui.heading} lead={ui.introduction}>
      <Link href={`/${lang}/kontakt`} className="button button-primary page-hero-cta">{ui.enquiry}<ArrowRight size={17} aria-hidden/></Link>
    </PageHero>
    <section className="section section-soft capability-section">
      <div className="shell">
        <nav className="capability-index" aria-label={ui.heading}>
          {categories.map((item) => <a key={item.id} href={`#${item.id}`}>{item.title}</a>)}
        </nav>
        <div className="capability-list">
          {categories.map((item, index) => <article className="capability-detail" id={item.id} key={item.id}>
            <div className="capability-photo"><ProtectedImage src={item.photo} alt={item.title} fill sizes="(max-width: 800px) 100vw, 42vw" className={index===6?'contain-image':'cover-image'}/></div>
            <div className="capability-body">
              <div className="capability-counter"><ClipboardList size={18} aria-hidden/>{String(index + 1).padStart(2, '0')}</div>
              <h2>{item.title}</h2><p>{item.description}</p>
              <h3><Ruler size={17} aria-hidden/>{ui.parametersHeading}</h3>
              <ul className="parameter-list">{item.parameters.map((parameter) => <li key={parameter}>{parameter}</li>)}</ul>
              <Link className="button button-dark" href={`/${lang}/kontakt?produkt=${item.id}`}>{ui.enquiry}<ArrowRight size={16} aria-hidden/></Link>
            </div>
          </article>)}
        </div>
        <p className="capability-notice">{ui.notice}</p>
      </div>
    </section>
    <section className="section capability-brief"><div className="shell capability-brief-inner"><FileImage size={46} strokeWidth={1.6} aria-hidden/><div><h2>{ui.briefHeading}</h2><p>{ui.briefText}</p></div><Link href={`/${lang}/kontakt`} className="button button-primary">{ui.enquiry}<ArrowRight size={16} aria-hidden/></Link></div></section>
  </>;
}
