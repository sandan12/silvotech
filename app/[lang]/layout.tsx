import type { Metadata, Viewport } from 'next'
import { Manrope, IBM_Plex_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'

import { MotionOrchestrator } from '@/components/motion-orchestrator'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { company, isLocale, locales, localeNames, siteUrl, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

import '../globals.css'

const manrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-manrope', weight: ['400', '500', '600', '700'], display: 'swap' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin', 'latin-ext'], variable: '--font-plex-mono', weight: ['400', '500'], display: 'swap' })

export function generateStaticParams() { return locales.map((lang) => ({ lang })) }
export const viewport: Viewport = { themeColor: '#070b0d', width: 'device-width', initialScale: 1 }

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const dict = getDictionary(lang)
  const languages = Object.fromEntries(locales.map((locale) => [locale, `/${locale}`]))
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: company.name,
    authors: [{ name: company.name, url: siteUrl }],
    creator: company.name,
    publisher: company.name,
    category: 'industrial silicone hoses',
    icons: { icon: '/silvotech-mark.png', apple: '/apple-icon.png' },
    other: { 'geo.region': 'PL-MZ', 'geo.placename': 'Warszawa', ICBM: '52.2297,21.0122' },
    alternates: { canonical: `/${lang}`, languages: { ...languages, 'x-default': '/pl' } },
    openGraph: { type: 'website', siteName: company.name, title: dict.meta.title, description: dict.meta.description, url: `${siteUrl}/${lang}`, locale: localeNames[lang].htmlLang.replace('-', '_'), images: [{ url: '/silicone-hose-clear-loop.jpg', width: 2048, height: 2048, alt: dict.meta.ogAlt }] },
    twitter: { card: 'summary_large_image', title: dict.meta.title, description: dict.meta.description, images: ['/silicone-hose-clear-loop.jpg'] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = getDictionary(locale)
  return (
    <html lang={localeNames[locale].htmlLang} className={`${manrope.variable} ${plexMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <MotionOrchestrator />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">{dict.nav.menu}</a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
        <Analytics />
      </body>
    </html>
  )
}
