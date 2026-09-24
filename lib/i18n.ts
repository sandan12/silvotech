export const locales = ['pl', 'en', 'de', 'cz', 'sk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pl';

export const localeNames: Record<Locale, { label: string; htmlLang: string; name: string }> = {
  pl: { label: 'PL', htmlLang: 'pl-PL', name: 'Polski' },
  en: { label: 'EN', htmlLang: 'en', name: 'English' },
  de: { label: 'DE', htmlLang: 'de-DE', name: 'Deutsch' },
  cz: { label: 'CZ', htmlLang: 'cs-CZ', name: 'Čeština' },
  sk: { label: 'SK', htmlLang: 'sk-SK', name: 'Slovenčina' },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
