import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
const routes = ['', '/produkcja', '/o-nas', '/wspolpraca', '/dokumenty', '/kontakt', '/polityka-prywatnosci'];
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((lang) => routes.map((route) => ({
    url: 'https://silvotech.eu/' + lang + route,
    lastModified: new Date(),
    changeFrequency: route ? 'monthly' : 'weekly',
    priority: route ? 0.8 : 1,
  })));
}
