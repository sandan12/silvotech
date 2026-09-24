'use server';

import { headers } from 'next/headers';
import { sendLeadEmail } from '@/lib/mailer';
import {
  EMAIL_PATTERN,
  LEAD_LIMITS,
  type Lead,
  type LeadAttachment,
  type LeadState,
  type MissingLeadField,
} from '@/lib/lead';
import { locales } from '@/lib/i18n';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, number[]>();
const allowedTypes = new Set(['image/jpeg','image/png','image/webp','application/pdf']);
const MAX_FILE = 4 * 1024 * 1024;

function read(data: FormData, field: keyof Lead) {
  const value = data.get(field);
  return typeof value === 'string' ? value.trim().slice(0, LEAD_LIMITS[field]) : '';
}

function hasConsent(data: FormData) {
  const value = data.get('consent');
  if (typeof value !== 'string') return false;
  return ['on', 'true', '1', 'yes'].includes(value.toLowerCase());
}

function rememberedValues(lead: Lead, consent: boolean): Record<string,string> {
  return { ...lead, consent: consent ? 'on' : '' };
}

async function attachment(data: FormData, name: string): Promise<LeadAttachment|null> {
  const value = data.get(name);
  if (!(value instanceof File) || value.size === 0) return null;
  if (value.size > MAX_FILE || !allowedTypes.has(value.type)) throw new Error('INVALID_FILE');
  const safe = value.name.replace(/[^a-zA-Z0-9._-]/g,'_').slice(-120);
  const content = Buffer.from(await value.arrayBuffer());
  const valid = value.type === 'image/jpeg'
    ? content[0] === 0xff && content[1] === 0xd8
    : value.type === 'image/png'
      ? content.subarray(0,8).toString('hex') === '89504e470d0a1a0a'
      : value.type === 'image/webp'
        ? content.subarray(0,4).toString() === 'RIFF' && content.subarray(8,12).toString() === 'WEBP'
        : value.type === 'application/pdf'
          ? content.subarray(0,4).toString() === '%PDF'
          : false;
  if (!valid) throw new Error('INVALID_FILE');
  return { filename: safe || `${name}.bin`, content, contentType: value.type };
}

function limited(ip: string) {
  const now = Date.now();
  const active = (attempts.get(ip) || []).filter((x) => now - x < WINDOW_MS);
  if (active.length >= MAX_REQUESTS) return true;
  active.push(now);
  attempts.set(ip, active);
  return false;
}

export async function submitLead(_previous: LeadState, formData: FormData): Promise<LeadState> {
  if (String(formData.get('website') || '')) return { status:'success' };

  const locale = read(formData, 'locale');
  const lead: Lead = {
    company: read(formData, 'company'),
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    phone: read(formData, 'phone'),
    product: read(formData, 'product'),
    material: read(formData, 'material'),
    dimensions: read(formData, 'dimensions'),
    quantity: read(formData, 'quantity'),
    message: read(formData, 'message'),
    locale: locales.includes(locale as never) ? locale : 'pl',
  };
  const consent = hasConsent(formData);
  const values = rememberedValues(lead, consent);
  const missing: MissingLeadField[] = [];
  if (!lead.company) missing.push('company');
  if (!lead.name) missing.push('name');
  if (!lead.email) missing.push('email');
  if (!consent) missing.push('consent');
  if (missing.length) return { status:'error', error:'required', missing, values };
  if (!EMAIL_PATTERN.test(lead.email)) return { status:'error', error:'email', missing:['email'], values };

  const h = await headers();
  const ip = (h.get('x-forwarded-for') || h.get('x-real-ip') || 'unknown').split(',')[0].trim();
  if (limited(ip)) return { status:'error', error:'send', values };

  try {
    const files = (await Promise.all([
      attachment(formData, 'photo'),
      attachment(formData, 'drawing'),
    ])).filter(Boolean) as LeadAttachment[];
    await sendLeadEmail(lead, files);
    return { status:'success' };
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_FILE') return { status:'error', error:'file', values };
    console.error('[lead] delivery failed', error);
    return { status:'error', error:'send', values };
  }
}
