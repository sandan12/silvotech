import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY } from '@/lib/company';
import type { Locale } from '@/lib/i18n';
import type { SiteCopy } from '@/lib/site-content';

export default function Footer({ copy, lang }: { copy: SiteCopy; lang: Locale }) {
  return <footer className="site-footer">
    <div className="shell footer-grid">
      <div className="footer-brand"><Image src="/silvotech-logo.webp" alt="SilvoTech" width={380} height={126}/><p>{copy.footer.summary}</p></div>
      <div><h2>{copy.footer.company}</h2><Link href={`/${lang}/o-nas`}>{copy.nav.about}</Link><Link href={`/${lang}/produkcja`}>{copy.nav.production}</Link><Link href={`/${lang}/wspolpraca`}>{copy.nav.cooperation}</Link></div>
      <div><h2>{copy.footer.offer}</h2><Link href={`/${lang}/oferta`}>{copy.nav.products}</Link><Link href={`/${lang}/dokumenty`}>{copy.nav.documents}</Link><Link href={`/${lang}/kontakt`}>{copy.nav.cta}</Link></div>
      <div><h2>{copy.footer.contact}</h2><a href={COMPANY.phoneHref}><Phone size={15}/>{COMPANY.phone}</a><a href={`mailto:${COMPANY.email}`}><Mail size={15}/>{COMPANY.email}</a><p><MapPin size={15}/>{COMPANY.address}</p></div>
    </div>
    <div className="footer-bottom"><div className="shell"><span>© {new Date().getFullYear()} {COMPANY.name}. {copy.footer.rights}</span><Link href={`/${lang}/polityka-prywatnosci`}>{copy.footer.privacy}</Link></div></div>
  </footer>;
}
