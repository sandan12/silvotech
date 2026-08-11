import type { Locale } from './config'
import de from './dictionaries/de'
import en from './dictionaries/en'
import pl, { type Dictionary } from './dictionaries/pl'

const dictionaries: Record<Locale, Dictionary> = { pl, en, de }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
