// Единый источник правды по домену, реквизитам и локалям.
// ВАЖНО: домен больше не зашит в код — он приходит из окружения,
// поэтому переезд с silvotech.vercel.app на silvotech.eu не требует правок кода.

export const locales = ['pl', 'en', 'de'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'pl'

export const localeNames: Record<Locale, { label: string; native: string; htmlLang: string }> = {
  pl: { label: 'PL', native: 'Polski', htmlLang: 'pl-PL' },
  en: { label: 'EN', native: 'English', htmlLang: 'en' },
  de: { label: 'DE', native: 'Deutsch', htmlLang: 'de-DE' },
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Канонический адрес сайта. Порядок: явная переменная → домен превью Vercel → локальная разработка. */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit.replace(/\/+$/, '')

  const vercelHost = process.env.NEXT_PUBLIC_VERCEL_URL?.trim()
  if (vercelHost) return `https://${vercelHost.replace(/\/+$/, '')}`

  return 'http://localhost:3000'
}

export const siteUrl = resolveSiteUrl()

/** true только на боевом домене. Превью и dev должны быть закрыты от индексации. */
export const isProductionSite =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && !siteUrl.includes('vercel.app')

export const company = {
  name: 'SilvoTech',
  legalName: 'SilvoTech',
  street: 'ul. Nastrojowa 25',
  postalCode: '02-441',
  city: 'Warszawa',
  countryCode: 'PL',
  country: 'Polska',
  nip: '5214027648',
  // TODO(SilvoTech): заполнить реальными данными из CEIDG/KRS.
  // Для B2B-доверия и для немецкого Impressum этих полей не хватает:
  regon: '',            // например '389123456'
  krs: '',              // если sp. z o.o.; для JDG оставить пустым
  legalForm: '',        // 'Jednoosobowa działalność gospodarcza' | 'Sp. z o.o.'
  representative: '',   // имя и фамилия владельца/представителя — обязательно для Impressum (§5 DDG)
  foundedYear: 0,       // год начала деятельности, используется в блоке доверия
  email: 'sales@silvotech.eu',
  phone: '+48 573 569 216',
  phoneHref: '+48573569216',
} as const

export const companyAddress: Record<
  Locale,
  { street: string; postalCode: string; city: string; country: string; countryCode: string }
> = {
  pl: { street: 'ul. Nastrojowa 25', postalCode: '02-441', city: 'Warszawa', country: 'Polska', countryCode: 'PL' },
  en: { street: '25 Nastrojowa Street', postalCode: '02-441', city: 'Warsaw', country: 'Poland', countryCode: 'PL' },
  de: { street: 'Nastrojowa-Strasse 25', postalCode: '02-441', city: 'Warschau', country: 'Polen', countryCode: 'PL' },
} as const
