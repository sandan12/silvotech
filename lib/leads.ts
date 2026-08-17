// Доставка заявки. Ключевой принцип: лид нельзя потерять.
// Цепочка: письмо в отдел продаж → резервный webhook → структурированный лог.
// Если сработало хотя бы одно звено, клиент видит успех.

import { company, siteUrl } from '@/lib/i18n/config'
import type { Locale } from '@/lib/i18n/config'

export type Lead = {
  company: string
  name: string
  email: string
  phone: string
  country: string
  product: string
  size: string
  quantity: string
  message: string
  locale: Locale
  receivedAt: string
  ip: string
  userAgent: string
}

export type DeliveryResult = {
  delivered: boolean
  channels: string[]
  failures: string[]
}

const REQUEST_TIMEOUT_MS = 8000

function plainText(lead: Lead): string {
  return [
    `Firma / Company:   ${lead.company}`,
    `Kontakt / Contact: ${lead.name}`,
    `E-mail:            ${lead.email}`,
    `Telefon / Phone:   ${lead.phone || '—'}`,
    `Kraj / Country:    ${lead.country || '—'}`,
    `Produkt:           ${lead.product || '—'}`,
    `Rozmiar / Size:    ${lead.size || '—'}`,
    `Ilość / Quantity:  ${lead.quantity || '—'}`,
    `Język strony:      ${lead.locale}`,
    `Otrzymano:         ${lead.receivedAt}`,
    '',
    lead.message || '(bez opisu / no description)',
  ].join('\n')
}

async function sendViaResend(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY is not configured')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({
      from: process.env.RFQ_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: [process.env.RFQ_TO_EMAIL ?? company.email],
      reply_to: lead.email,
      subject: `RFQ — ${lead.company}${lead.product ? ` — ${lead.product}` : ''}`,
      text: plainText(lead),
    }),
  })

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`)
  }
}

async function sendViaWebhook(lead: Lead): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) throw new Error('LEAD_WEBHOOK_URL is not configured')

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    body: JSON.stringify({ source: siteUrl, type: 'rfq', lead }),
  })

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`)
  }
}

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const channels: string[] = []
  const failures: string[] = []

  for (const [channel, send] of [
    ['email', sendViaResend],
    ['webhook', sendViaWebhook],
  ] as const) {
    try {
      await send(lead)
      channels.push(channel)
    } catch (error) {
      failures.push(`${channel}: ${error instanceof Error ? error.message : 'unknown error'}`)
    }
  }

  if (channels.length === 0) {
    // Последняя линия обороны: лид попадает в логи Vercel в машинночитаемом виде,
    // откуда его можно восстановить вручную.
    console.error('RFQ_DELIVERY_FAILED', JSON.stringify({ lead, failures }))
  }

  return { delivered: channels.length > 0, channels, failures }
}

const autoReply: Record<Locale, { subject: string; body: (lead: Lead) => string }> = {
  pl: {
    subject: 'Otrzymaliśmy Państwa zapytanie — SilvoTech',
    body: (lead) =>
      `Dzień dobry${lead.name ? ` ${lead.name}` : ''},\n\n` +
      `dziękujemy za zapytanie ofertowe. Potwierdzamy jego otrzymanie i wracamy z wyceną w ciągu jednego dnia roboczego.\n\n` +
      `Podsumowanie zapytania:\n${plainText(lead)}\n\n` +
      `${company.name}\n${company.phone}\n${company.email}`,
  },
  en: {
    subject: 'We have received your enquiry — SilvoTech',
    body: (lead) =>
      `Hello${lead.name ? ` ${lead.name}` : ''},\n\n` +
      `thank you for your request for quotation. We confirm receipt and will come back with pricing within one business day.\n\n` +
      `Summary of your enquiry:\n${plainText(lead)}\n\n` +
      `${company.name}\n${company.phone}\n${company.email}`,
  },
  de: {
    subject: 'Wir haben Ihre Anfrage erhalten — SilvoTech',
    body: (lead) =>
      `Guten Tag${lead.name ? ` ${lead.name}` : ''},\n\n` +
      `vielen Dank für Ihre Anfrage. Wir bestätigen den Eingang und melden uns innerhalb eines Werktages mit einem Angebot.\n\n` +
      `Zusammenfassung Ihrer Anfrage:\n${plainText(lead)}\n\n` +
      `${company.name}\n${company.phone}\n${company.email}`,
  },
}

/** Автоответ клиенту. Ошибка здесь не должна влиять на результат отправки заявки. */
export async function sendAutoReply(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RFQ_FROM_EMAIL
  if (!apiKey || !from) return

  const template = autoReply[lead.locale]

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      body: JSON.stringify({
        from,
        to: [lead.email],
        reply_to: company.email,
        subject: template.subject,
        text: template.body(lead),
      }),
    })
  } catch (error) {
    console.error('RFQ_AUTOREPLY_FAILED', error instanceof Error ? error.message : error)
  }
}
