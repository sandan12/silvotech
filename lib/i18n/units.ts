// Форматирование технических значений по локали.
// Держим отдельно от больших словарей, чтобы не трогать pl/en/de целиком.

import type { Locale } from '@/lib/i18n/config'
import type { PressureKey, Product, StandardKey } from '@/lib/products'

type UnitCopy = {
  pressure: Record<PressureKey, string>
  standards: Record<StandardKey, string>
  /** Стандартная фасовка. */
  coil: (meters: number) => string
  /** Значение в колонке «Размеры», когда номенклатуры нет. */
  sizesOnRequest: string
  /** Единица измерения длины в подписях. */
  lengthUnit: string
}

const copy: Record<Locale, UnitCopy> = {
  pl: {
    pressure: { individual: 'Dobór indywidualny' },
    standards: {
      ec1935: 'Rozporządzenie (WE) 1935/2004',
      lfgb: 'Niemiecka ustawa LFGB',
      technicalUse: 'Zastosowania techniczne',
    },
    coil: (m) => `${m} mb`,
    sizesOnRequest: 'Wymiary ustalane indywidualnie',
    lengthUnit: 'mb',
  },
  en: {
    pressure: { individual: 'Specified per application' },
    standards: {
      ec1935: 'Regulation (EC) 1935/2004',
      lfgb: 'German LFGB',
      technicalUse: 'Technical applications',
    },
    coil: (m) => `${m} m coil`,
    sizesOnRequest: 'Dimensions on request',
    lengthUnit: 'm',
  },
  de: {
    pressure: { individual: 'Anwendungsbezogene Auslegung' },
    standards: {
      ec1935: 'Verordnung (EG) 1935/2004',
      lfgb: 'Deutsches LFGB',
      technicalUse: 'Technische Anwendungen',
    },
    coil: (m) => `${m}-m-Rolle`,
    sizesOnRequest: 'Abmessungen auf Anfrage',
    lengthUnit: 'm',
  },
}

export function formatTemperature(product: Product): string {
  const { min, max } = product.temperatureC
  const sign = (value: number) => (value > 0 ? `+${value}` : `${value}`)
  return `${sign(min)} °C … ${sign(max)} °C`
}

export function formatPressure(locale: Locale, key: PressureKey): string {
  return copy[locale].pressure[key]
}

export function formatPackaging(locale: Locale, meters: number): string {
  return copy[locale].coil(meters)
}

export function formatStandards(locale: Locale, keys: readonly StandardKey[]): string {
  return keys.map((key) => copy[locale].standards[key]).join(', ')
}

export function formatSizes(locale: Locale, sizes: readonly string[]): string {
  return sizes.length ? sizes.join(' · ') : copy[locale].sizesOnRequest
}

export function lengthUnit(locale: Locale): string {
  return copy[locale].lengthUnit
}
