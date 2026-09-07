import type { Dictionary } from './i18n';
import { standardSizes } from './products';

const productKeys = {
  clear: 'formProductClear', technical: 'formProductBlack', plates: 'formProductSheet',
  gaskets: 'formProductGasket', custom: 'formProductCustom',
} as const;
export type QuoteSelection = { product?: string; size?: string };

// Query values are untrusted. Only known product IDs and standard clear-hose sizes are accepted.
export function getQuoteSelection(params: Record<string, string | string[] | undefined>, dict: Dictionary): QuoteSelection {
  const id = typeof params.product === 'string' ? params.product : '';
  const key = Object.prototype.hasOwnProperty.call(productKeys, id) ? productKeys[id as keyof typeof productKeys] : undefined;
  const size = typeof params.size === 'string' && id === 'clear' && standardSizes.some(s => s === params.size) ? `Ø ${params.size} mm` : undefined;
  return { product: key ? dict[key] : undefined, size };
}
