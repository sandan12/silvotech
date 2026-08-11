export type ProductId = 'clear' | 'technical'

export type Product = {
  id: ProductId
  code: string
  image: string
  sizes: string[]
  temperature: string
  pressure: string
  packaging: string
  standards: string[]
}

export const standardSizes = [
  '2/4', '3/6', '4/6', '4/7', '4/8', '5/8', '5/9', '6/8', '6/9', '6/10',
  '7/9', '7/10', '7/11', '8/10', '8/11', '8/12', '9/13', '10/12', '10/13',
  '10/14', '12/14', '12/15', '13/16', '14/18', '15/19', '16/20', '18/22', '20/24',
]

export const products: Product[] = [
  {
    id: 'clear',
    code: 'SVT-SIL-CL',
    image: '/silicone-coil.png',
    sizes: standardSizes,
    temperature: '-50 °C … +230 °C',
    pressure: 'Dobór indywidualny',
    packaging: '20 mb',
    standards: ['(WE) 1935/2004', 'LFGB'],
  },
  {
    id: 'technical',
    code: 'SVT-SIL-BK',
    image: '/black-hose-product.png',
    sizes: [],
    temperature: '-50 °C … +230 °C',
    pressure: 'Dobór indywidualny',
    packaging: '20 mb',
    standards: ['Zastosowania techniczne'],
  },
]
