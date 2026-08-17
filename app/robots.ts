import type { MetadataRoute } from 'next'

import { isProductionSite, siteUrl } from '@/lib/i18n/config'

export default function robots(): MetadataRoute.Robots {
  // Превью-деплои и локальная разработка не должны попадать в индекс:
  // иначе Google видит несколько копий сайта и выбирает адрес сам.
  if (!isProductionSite) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/_next/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
