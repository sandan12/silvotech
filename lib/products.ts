export const standardSizes = [
  '2/4', '3/6', '4/6', '4/7', '4/8', '5/8', '5/9', '6/8', '6/9', '6/10',
  '7/9', '7/10', '7/11', '8/10', '8/11', '8/12', '9/13', '10/12', '10/13',
  '10/14', '12/14', '12/15', '13/16', '14/18', '15/19', '16/20', '18/22', '20/24',
] as const;

export const products = [
  {
    id: 'clear',
    code: 'SVT-SIL-CL',
    image: '/hose-clear-coil-a.png',
    imageAlt: '/hose-clear-coil-b.png',
    sizes: [...standardSizes],
    temperatureMin: -50,
    temperatureMax: 230,
    packagingMeters: 20,
  },
  {
    id: 'technical',
    code: 'SVT-SIL-BK',
    image: '/hose-black-industrial.png',
    sizes: [],
    temperatureMin: -50,
    temperatureMax: 230,
    packagingMeters: 20,
  },
] as const;