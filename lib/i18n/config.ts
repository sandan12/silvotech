export const locales = ['pl', 'en', 'de'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'pl'
export const localeNames: Record<Locale, { label: string; native: string; htmlLang: string }> = { pl: { label: 'PL', native: 'Polski', htmlLang: 'pl-PL' }, en: { label: 'EN', native: 'English', htmlLang: 'en' }, de: { label: 'DE', native: 'Deutsch', htmlLang: 'de-DE' } }
export function isLocale(value: string): value is Locale { return (locales as readonly string[]).includes(value) }
export const siteUrl = 'https://www.silvotech.eu'
export const company = { name: 'SilvoTech', legalName: 'SilvoTech', street: 'ul. Nastrojowa 25', postalCode: '02-441', city: 'Warszawa', countryCode: 'PL', country: 'Polska', nip: '5214027648', email: 'sales@silvotech.eu', phone: '+48 573 569 216', phoneHref: '+48573569216' } as const
