import type { Metadata } from 'next';
import { locales, type Locale } from './i18n';
import { getSiteCopy } from './site-content';

const base = 'https://silvotech.eu';
export function pageMetadata(lang: Locale, path = '', title?: string, description?: string): Metadata {
  const copy = getSiteCopy(lang);
  const suffix = path ? `/${path}` : '';
  return {
    metadataBase: new URL(base),
    title: title ? `${title} | SilvoTech` : copy.meta.title,
    description: description ?? copy.meta.description,
    alternates: {
      canonical: `/${lang}${suffix}`,
      languages: Object.fromEntries(locales.map((l) => [l === 'cz' ? 'cs-CZ' : l, `/${l}${suffix}`])),
    },
    openGraph: { type: 'website', locale: lang === 'cz' ? 'cs_CZ' : lang, siteName: 'SilvoTech', title: title ?? copy.meta.title, description: description ?? copy.meta.description, images: [{ url: '/media/hero-production-line.webp', width: 1672, height: 941, alt: 'SilvoTech production line' }] },
    twitter: { card: 'summary_large_image', title: title ?? copy.meta.title, description: description ?? copy.meta.description, images: ['/media/hero-production-line.webp'] },
  };
}
