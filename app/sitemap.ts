import type { MetadataRoute } from 'next'

import { locales, siteUrl } from '@/lib/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-08-11')
  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: locale === 'pl' ? 1 : 0.85,
    alternates: { languages: { ...Object.fromEntries(locales.map((alt) => [alt, `${siteUrl}/${alt}`])), 'x-default': `${siteUrl}/pl` } },
  }))
}
