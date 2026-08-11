import type { Metadata, Viewport } from 'next'
import { Sora, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import { isLocale, locales, localeNames, siteUrl } from '@/lib/i18n/config'
import './silvotech.css'

const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  weight: ['200', '300', '400'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}

  const titles = {
    pl: 'SilvoTech — węże silikonowe dla przemysłu',
    en: 'SilvoTech — Silicone hoses for industry',
    de: 'SilvoTech — Silikonschläuche für die Industrie',
  }

  const descriptions = {
    pl: 'Ciemna, techniczna strona SilvoTech: przezroczyste i czarne węże silikonowe, rolki 20 m, dostawy B2B w Europie.',
    en: 'A technical SilvoTech landing page: transparent and black silicone hoses, 20 m coils, B2B supply across Europe.',
    de: 'Technische SilvoTech-Landingpage: transparente und schwarze Silikonschläuche, 20-m-Rollen, B2B-Lieferung in Europa.',
  }

  const languages = Object.fromEntries(locales.map((locale) => [locale, `/${locale}`]))

  return {
    metadataBase: new URL(siteUrl),
    title: titles[lang],
    description: descriptions[lang],
    alternates: { canonical: `/${lang}`, languages: { ...languages, 'x-default': '/pl' } },
    openGraph: {
      type: 'website',
      siteName: 'SilvoTech',
      title: titles[lang],
      description: descriptions[lang],
      url: `${siteUrl}/${lang}`,
      locale: localeNames[lang].htmlLang.replace('-', '_'),
      images: [{ url: '/black-hose-hero.png', width: 1024, height: 1024, alt: 'Black silicone hose coil' }],
    },
    twitter: { card: 'summary_large_image', title: titles[lang], description: descriptions[lang], images: ['/black-hose-hero.png'] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={localeNames[lang].htmlLang} className={`${sora.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  )
}
