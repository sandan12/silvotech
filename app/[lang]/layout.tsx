import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { company, isLocale, locales, localeNames, siteUrl, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'

import '../globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' })
const archivo = Archivo({ subsets: ['latin', 'latin-ext'], variable: '--font-archivo', weight: ['600', '700', '800'], display: 'swap' })

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = { themeColor: '#1b2a4a', width: 'device-width', initialScale: 1 }

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
    alternates: { canonical: `/${lang}`, languages: { ...languages, 'x-default': '/pl' } },
    openGraph: {
      type: 'website', siteName: company.name, title: dict.meta.title, description: dict.meta.description, url: `${siteUrl}/${lang}`,
      locale: localeNames[lang].htmlLang.replace('-', '_'),
      images: [{ url: '/production-line-new.png', width: 1024, height: 390, alt: dict.meta.ogAlt }],
    },
    twitter: { card: 'summary_large_image', title: dict.meta.title, description: dict.meta.description, images: ['/production-line-new.png'] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = getDictionary(locale)

  return (
    <html lang={localeNames[locale].htmlLang} className={`${inter.variable} ${archivo.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">{dict.nav.menu}</a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
        <Analytics />
      </body>
    </html>
  )
}
