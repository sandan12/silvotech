'use server'

import { headers } from 'next/headers'
import { after } from 'next/server'

import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config'
import { deliverLead, sendAutoReply, type Lead } from '@/lib/leads'
import { checkRateLimit, clientIp } from '@/lib/rate-limit'

export type RfqStatus = 'idle' | 'success' | 'invalid' | 'consent' | 'rate-limited' | 'error'

export type RfqField = 'company' | 'name' | 'email'

export type RfqState = {
  status: RfqStatus
  /** Поля, которые нужно подсветить в форме. */
  fieldErrors?: RfqField[]
}

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
} as const

/** Минимальное время заполнения. Боты отправляют форму мгновенно. */
const MIN_FILL_MS = 2500
const MAX_FORM_AGE_MS = 12 * 60 * 60 * 1000

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

function field(data: FormData, key: keyof typeof MAX): string {
  const raw = data.get(key)
  if (typeof raw !== 'string') return ''
  return raw.trim().slice(0, MAX[key])
}

function readLocale(data: FormData): Locale {
  const raw = data.get('locale')
  return typeof raw === 'string' && isLocale(raw) ? raw : defaultLocale
}

function looksAutomated(data: FormData): boolean {
  // 1. Honeypot: скрытое поле, которое заполняют только боты.
  const honeypot = data.get('website')
  if (typeof honeypot === 'string' && honeypot.length > 0) return true

  // 2. Время заполнения формы.
  const renderedAt = Number(data.get('rendered_at'))
  if (!Number.isFinite(renderedAt)) return false

  const elapsed = Date.now() - renderedAt
  return elapsed < MIN_FILL_MS || elapsed > MAX_FORM_AGE_MS
}

export async function submitRfq(_prev: RfqState, data: FormData): Promise<RfqState> {
  const locale = readLocale(data)

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

  const fieldErrors: RfqField[] = []
  if (!payload.company) fieldErrors.push('company')
  if (!payload.name) fieldErrors.push('name')
  if (!emailPattern.test(payload.email)) fieldErrors.push('email')

  if (fieldErrors.length > 0) {
    return { status: 'invalid', fieldErrors }
  }

  if (data.get('consent') !== 'on') {
    return { status: 'consent' }
  }

  // Ботам показываем успех, чтобы они не подбирали обход проверок.
  if (looksAutomated(data)) {
    return { status: 'success' }
  }

  const requestHeaders = await headers()
  const ip = clientIp(requestHeaders)

  if (!checkRateLimit(`rfq:${ip}`).allowed) {
    return { status: 'rate-limited' }
  }

  const lead: Lead = {
    ...payload,
    locale,
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: requestHeaders.get('user-agent') ?? '',
  }

  const result = await deliverLead(lead)

  if (!result.delivered) {
    return { status: 'error' }
  }

  // Автоответ отправляем после ответа пользователю: он не должен замедлять форму.
  after(async () => {
    await sendAutoReply(lead)
  })

  return { status: 'success' }
}
