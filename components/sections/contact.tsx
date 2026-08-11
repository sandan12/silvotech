import { Building2, Mail, MapPin, Phone } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { RfqForm } from '@/components/sections/rfq-form'
import { company, companyAddress, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const address = companyAddress[locale]

  return (
    <section id="contact" className="scroll-mt-28 border-t border-border bg-background section-device">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-14">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={dict.rfq.eyebrow}
              title={dict.rfq.title}
              lead={dict.rfq.lead}
              className="max-w-none"
            />
            <RfqForm dict={dict} />
          </div>

          <aside className="flex flex-col gap-6 lg:pt-4">
            <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
              {dict.rfq.asideTitle}
            </h3>

            <a
              href={`mailto:${company.email}`}
              className="flex items-start gap-3 border border-border bg-secondary p-5 transition-colors hover:border-accent"
            >
              <Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-primary">{company.email}</span>
                <span className="text-xs text-muted-foreground">{dict.nav.cta}</span>
              </span>
            </a>

            <a href={`tel:${company.phoneHref}`} className="flex items-start gap-3 rounded-md border border-border bg-secondary p-5 transition-colors hover:border-accent">
              <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
              <span className="flex flex-col gap-0.5"><span className="text-sm font-semibold text-primary">{company.phone}</span><span className="text-xs text-muted-foreground">{dict.rfq.asideTitle}</span></span>
            </a>

            <div className="flex flex-col gap-3 rounded-md border border-border p-5">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="flex flex-col gap-1 text-sm leading-relaxed">
                  <span className="font-mono text-[0.7rem] tracking-wider uppercase text-muted-foreground">
                    {dict.rfq.asideAddress}
                  </span>
                  <span className="text-foreground/85">
                    {address.street}
                    <br />
                    {address.postalCode} {address.city}
                    <br />
                    {address.country}
                  </span>
                </span>
              </p>
              <p className="flex items-start gap-3 border-t border-border pt-3">
                <Building2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="flex flex-col gap-1 text-sm">
                  <span className="font-mono text-[0.7rem] tracking-wider uppercase text-muted-foreground">
                    {dict.footer.nip}
                  </span>
                  <span className="font-mono text-foreground/85">{company.nip}</span>
                </span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
