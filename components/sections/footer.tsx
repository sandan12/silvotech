import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company';
import EUFlag from './eu-flag';

export default function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const nav = [
    { label: dict.navAbout, href: `/${lang}/o-nas` },
    { label: dict.navOffer, href: `/${lang}/oferta` },
    { label: dict.navCoop, href: `/${lang}/wspolpraca` },
    { label: dict.navDocs, href: `/${lang}/dokumenty` },
    { label: dict.navContact, href: `/${lang}/kontakt` },
  ];

  const productLinks = [
    { label: dict.offerCat1Title, href: `/${lang}/oferta` },
    { label: dict.offerCat2Title, href: `/${lang}/oferta` },
    { label: dict.offerCat3Title, href: `/${lang}/oferta` },
    { label: dict.offerCat4Title, href: `/${lang}/oferta` },
  ];

  return (
    <footer className="band-navy text-white">
      <div className="container-page grid gap-12 py-24 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/silvotech-logo.png" alt="SilvoTech" width={170} height={56} className="h-9 w-auto brightness-0 invert" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{dict.footerTagline}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
            <EUFlag className="h-3.5 w-auto rounded-[1px]" />
            {dict.euBadgeTitle}
          </span>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{dict.footerCompany}</h3>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href + item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{dict.footerProductsTitle}</h3>
          <ul className="mt-5 space-y-3">
            {productLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-white/60 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">{dict.footerContactTitle}</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            <li>
              <span className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-1 shrink-0 text-white/40" />
                <span>
                  <span className="block">{dict.footerAddressLabel}</span>
                  <span className="mt-0.5 block font-medium text-white/80">{COMPANY.address}</span>
                </span>
              </span>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 transition hover:text-white">
                <Mail size={14} className="shrink-0 text-white/40" />
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={COMPANY.phoneHref} className="flex items-center gap-2.5 transition hover:text-white">
                <Phone size={14} className="shrink-0 text-white/40" />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <span className="flex items-center gap-2.5">
                <Building2 size={14} className="shrink-0 text-white/40" />
                {dict.footerNip}: {COMPANY.nip}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. {dict.footerRights}
          </p>
          <p>{COMPANY.address}</p>
        </div>
      </div>
    </footer>
  );
}