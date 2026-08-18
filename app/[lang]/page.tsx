import { notFound } from 'next/navigation'

import { Contact } from '@/components/sections/contact'
import { Hero } from '@/components/sections/hero'
import { Industries } from '@/components/sections/industries'
import { Manufacturing } from '@/components/sections/manufacturing'
import { OfferGrid } from '@/components/sections/offer-grid'
import { ProductGrid } from '@/components/sections/product-grid'
import { Quality } from '@/components/sections/quality'
import { SpecTable } from '@/components/sections/spec-table'
import { company, companyAddress, isLocale, siteUrl, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { formatPackaging, formatTemperature } from '@/lib/i18n/units'
import { products } from '@/lib/products'

function StructuredData({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const address = companyAddress[locale]

  const organization = {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/silvotech-logo-user.png`,
    image: `${siteUrl}/silicone-hose-clear-loop.jpg`,
    email: company.email,
    telephone: company.phone,
    vatID: `PL${company.nip}`,
    taxID: company.nip,
    description: dict.meta.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: address.countryCode,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: company.email,
        telephone: company.phone,
        availableLanguage: ['pl', 'en', 'de'],
        areaServed: 'EU',
      },
    ],
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: company.name,
    inLanguage: locale,
    publisher: { '@id': `${siteUrl}/#organization` },
  }

  const productNodes = products.map((product) => ({
    '@type': 'Product',
    name: dict.products.items[product.id].name,
    sku: product.code,
    description: dict.products.items[product.id].description,
    image: `${siteUrl}${product.image}`,
    brand: { '@type': 'Brand', name: company.name },
    manufacturer: { '@id': `${siteUrl}/#organization` },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: dict.specs.columns.temperature,
        value: formatTemperature(product),
      },
      {
        '@type': 'PropertyValue',
        name: dict.specs.columns.packaging,
        value: formatPackaging(locale, product.packagingMeters),
      },
    ],
  }))

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [organization, website, ...productNodes],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = getDictionary(locale)

  return (
    <>
      <StructuredData locale={locale} />
      <Hero dict={dict} />
      <OfferGrid locale={locale} dict={dict} />
      <ProductGrid locale={locale} dict={dict} />
      <SpecTable locale={locale} dict={dict} />
      <Manufacturing dict={dict} />
      <Quality dict={dict} />
      <Industries dict={dict} />
      <Contact locale={locale} dict={dict} />
    </>
  )
}
