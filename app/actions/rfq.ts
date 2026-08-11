'use server'

import { company } from '@/lib/i18n/config'

export type RfqState = { status: 'idle' | 'success' | 'invalid' | 'error' }

const MAX = {
  company: 160,
  name: 160,
  email: 200,
  phone: 60,
  country: 80,
  product: 40,
  size: 40,
  quantity: 80,
  message: 4000,
}

function field(data: FormData, key: keyof typeof MAX) {
  const raw = data.get(key)
  if (typeof raw !== 'string') return ''
  return raw.trim().slice(0, MAX[key])
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export async function submitRfq(_prev: RfqState, data: FormData): Promise<RfqState> {
  const payload = {
    company: field(data, 'company'),
    name: field(data, 'name'),
    email: field(data, 'email'),
    phone: field(data, 'phone'),
    country: field(data, 'country'),
    product: field(data, 'product'),
    size: field(data, 'size'),
    quantity: field(data, 'quantity'),
    message: field(data, 'message'),
  }

  if (!payload.company || !payload.name || !emailPattern.test(payload.email)) {
    return { status: 'invalid' }
  }

  // Honeypot: real users never fill a hidden field.
  if (typeof data.get('website') === 'string' && (data.get('website') as string).length > 0) {
    return { status: 'success' }
  }

  const lines = [
    `Company: ${payload.company}`,
    `Contact: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Phone: ${payload.phone || '—'}`,
    `Country: ${payload.country || '—'}`,
    `Product category: ${payload.product || '—'}`,
    `Size: ${payload.size || '—'}`,
    `Quantity: ${payload.quantity || '—'}`,
    '',
    payload.message || '(no description provided)',
  ].join('\n')

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return { status: 'error' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RFQ_FROM_EMAIL ?? 'onboarding@resend.dev',
        to: [company.email],
        reply_to: payload.email,
        subject: `RFQ — ${payload.company}${payload.product ? ` — ${payload.product}` : ''}`,
        text: lines,
      }),
    })

    if (!response.ok) {
      console.log('[v0] Resend rejected the RFQ:', response.status, await response.text())
      return { status: 'error' }
    }

    return { status: 'success' }
  } catch (error) {
    console.log('[v0] RFQ delivery failed:', error)
    return { status: 'error' }
  }
}
