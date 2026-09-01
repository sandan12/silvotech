/**
 * Shared shapes for the quote-request form.
 *
 * Kept out of the `'use server'` action file on purpose: a server-action module
 * may only export async functions, so constants and types live here instead.
 */

export type Lead = {
  company: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  size: string;
  quantity: string;
  message: string;
  locale: string;
};

export type LeadErrorCode = 'required' | 'email' | 'send';

export type LeadState = {
  status: 'idle' | 'success' | 'error';
  error?: LeadErrorCode;
  /** Echoed back so a visitor never loses a filled-in form on a failed submit. */
  values?: Partial<Record<keyof Lead, string>>;
};

export const initialLeadState: LeadState = { status: 'idle' };

export const LEAD_LIMITS: Record<keyof Lead, number> = {
  company: 200,
  name: 200,
  email: 320,
  phone: 60,
  country: 120,
  product: 200,
  size: 120,
  quantity: 200,
  message: 4000,
  locale: 5,
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
