'use server';

import { sendLeadEmail } from '@/lib/mailer';
import { EMAIL_PATTERN, LEAD_LIMITS, type Lead, type LeadState } from '@/lib/lead';

function read(formData: FormData, field: keyof Lead): string {
  const raw = formData.get(field);
  return typeof raw === 'string' ? raw.trim().slice(0, LEAD_LIMITS[field]) : '';
}

export async function submitLead(
  _previous: LeadState,
  formData: FormData
): Promise<LeadState> {
  // Hidden field that real people never see. Bots fill it in, so accept and drop.
  const honeypot = formData.get('website');
  if (typeof honeypot === 'string' && honeypot !== '') {
    return { status: 'success' };
  }

  const lead: Lead = {
    company: read(formData, 'company'),
    name: read(formData, 'name'),
    email: read(formData, 'email'),
    phone: read(formData, 'phone'),
    country: read(formData, 'country'),
    product: read(formData, 'product'),
    size: read(formData, 'size'),
    quantity: read(formData, 'quantity'),
    message: read(formData, 'message'),
    locale: read(formData, 'locale') || 'pl',
  };

  if (!lead.company || !lead.name || !lead.email || !lead.country) {
    return { status: 'error', error: 'required', values: lead };
  }

  if (!EMAIL_PATTERN.test(lead.email)) {
    return { status: 'error', error: 'email', values: lead };
  }

  try {
    await sendLeadEmail(lead);
    return { status: 'success' };
  } catch (error) {
    console.error('[submit-lead] failed to deliver lead', error);
    return { status: 'error', error: 'send', values: lead };
  }
}
