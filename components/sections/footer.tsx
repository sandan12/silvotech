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

  const productLinks = [1, 2, 3, 4].map((i) => dict[`offerCat${i}Title`]);

  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/silvotech-logo.png"
            alt="SilvoTech"
            width={380}
            height={126}
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-[0.85rem] leading-relaxed text-white/55">
            {dict.footerTagline}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 border border-white/20 px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/70">
            <EUFlag className="h-3.5 w-auto" />
            {dict.euBadgeTitle}
          </span>
        </div>

        <div>
          <h3 className="font-mono text-[0.63rem] uppercase tracking-[0.16em] text-orange">
            {dict.footerCompany}
          </h3>
          <ul className="mt-5 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.86rem] text-white/60 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[0.63rem] uppercase tracking-[0.16em] text-orange">
            {dict.footerProductsTitle}
          </h3>
          <ul className="mt-5 space-y-2.5">
            {productLinks.map((label) => (
              <li key={label}>
                <Link
                  href={`/${lang}/oferta`}
                  className="text-[0.86rem] text-white/60 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[0.63rem] uppercase tracking-[0.16em] text-orange">
            {dict.footerContactTitle}
          </h3>
          <ul className="mt-5 space-y-3 text-[0.86rem] text-white/60">
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="mt-1 shrink-0 text-white/35" aria-hidden />
              <span>
                <span className="block text-[0.78rem] text-white/45">{dict.footerAddressLabel}</span>
                <span className="mt-0.5 block font-medium text-white/85">{COMPANY.address}</span>
              </span>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail size={14} className="shrink-0 text-white/35" aria-hidden />
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone size={14} className="shrink-0 text-white/35" aria-hidden />
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Building2 size={14} className="shrink-0 text-white/35" aria-hidden />
              {dict.footerNip}: {COMPANY.nip}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-white/35">
            © {new Date().getFullYear()} {COMPANY.name}. {dict.footerRights}
          </p>
        </div>
      </div>
    </footer>
  );
}
