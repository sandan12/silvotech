import Image from 'next/image'

import { company, type Locale } from '@/lib/i18n/config'
import { products } from '@/lib/products'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <Image
            src="/silvotech-logo-user.png"
            alt={`${company.name} — logo`}
            width={1360}
            height={456}
            className="h-10 w-auto max-w-56 object-contain brightness-0 invert"
          />
          <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/65">{dict.footer.tagline}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-mono text-xs tracking-[0.15em] uppercase text-accent">{dict.footer.productsTitle}</h2>
          <ul className="flex flex-col gap-2">
            {products.map((product) => (
              <li key={product.id}>
                <a
                  href="#products"
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                  {dict.products.items[product.id].name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-mono text-xs tracking-[0.15em] uppercase text-accent">{dict.footer.contactTitle}</h2>
          <address className="flex flex-col gap-2 text-sm leading-relaxed not-italic text-primary-foreground/70">
            <span className="text-xs text-primary-foreground/45">{dict.footer.addressLabel}</span>
            <span>
              {company.street}
              <br />
              {company.postalCode} {company.city}, {company.country}
            </span>
            <a href={`tel:${company.phoneHref}`} className="transition-colors hover:text-primary-foreground">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="transition-colors hover:text-primary-foreground">
              {company.email}
            </a>
            <span className="font-mono">
              {dict.footer.nip}: {company.nip}
            </span>
          </address>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. {dict.footer.rights}
          </p>
          <p className="font-mono tracking-wider uppercase">{locale}</p>
        </div>
      </div>
    </footer>
  )
}
