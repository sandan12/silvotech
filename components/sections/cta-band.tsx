'use client';

import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company';

export default function CTABand({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="border-y-2 border-orange bg-band-deep">
      <div className="container-page grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:py-14">
        <div>
          <h2 className="max-w-[24ch] text-[clamp(1.4rem,2.4vw,2rem)]">{dict.ctaBandTitle}</h2>
          <p className="mt-3 max-w-[56ch] text-[0.94rem] leading-relaxed text-body">
            {dict.ctaBandText}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <Link href={`/${lang}/kontakt`} className="btn btn-cta">
            {dict.cta}
          </Link>
          <a href={COMPANY.phoneHref} className="btn btn-outline">
            <Phone size={15} aria-hidden />
            {COMPANY.phone}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="btn btn-outline">
            <Mail size={15} aria-hidden />
            {COMPANY.email}
          </a>
        </div>
      </div>
    </section>
  );
}
