import type { MetadataRoute } from 'next'

import { locales, siteUrl } from '@/lib/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: locale === 'pl' ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(locales.map((alt) => [alt, `${siteUrl}/${alt}`])),
    },
  }))
}
