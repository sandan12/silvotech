// Данные о продукции: только языконезависимые факты.
// Любой текст, который видит клиент, формируется в lib/i18n/units.ts —
// иначе польские строки утекают на /en и /de (текущий баг на проде).

export type ProductId = 'clear' | 'technical'
export type PressureKey = 'individual'
export type StandardKey = 'ec1935' | 'lfgb' | 'technicalUse'

export type Product = {
  id: ProductId
  code: string
  image: string
  /** Внутренний / внешний диаметр в мм. Пустой массив = только под заказ. */
  sizes: string[]
  temperatureC: { min: number; max: number }
  pressureKey: PressureKey
  packagingMeters: number
  standardKeys: StandardKey[]
}

export const standardSizes = [
  '2/4', '3/6', '4/6', '4/7', '4/8', '5/8', '5/9', '6/8', '6/9', '6/10',
  '7/9', '7/10', '7/11', '8/10', '8/11', '8/12', '9/13', '10/12', '10/13',
  '10/14', '12/14', '12/15', '13/16', '14/18', '15/19', '16/20', '18/22', '20/24',
] as const

export const products: Product[] = [
  {
    id: 'clear',
    code: 'SVT-SIL-CL',
    image: '/silicone-hose-clear-coil.jpg',
    sizes: [...standardSizes],
    temperatureC: { min: -50, max: 230 },
    pressureKey: 'individual',
    packagingMeters: 20,
    standardKeys: ['ec1935', 'lfgb'],
  },
  {
    id: 'technical',
    code: 'SVT-SIL-BK',
    image: '/silicone-hose-black.png',
    sizes: [],
    temperatureC: { min: -50, max: 230 },
    pressureKey: 'individual',
    packagingMeters: 20,
    standardKeys: ['technicalUse'],
  },
]
