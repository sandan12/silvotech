import { notFound } from 'next/navigation'

import { isLocale, type Locale } from '@/lib/i18n/config'
import { SilvoLanding } from './silvo-landing'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return <SilvoLanding locale={lang as Locale} />
}
