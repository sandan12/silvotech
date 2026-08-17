'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react'
import { track } from '@vercel/analytics'

import { submitRfq, type RfqField, type RfqState } from '@/app/actions/rfq'
import type { Locale } from '@/lib/i18n/config'
import { formCopy } from '@/lib/i18n/consent'
import type { Dictionary } from '@/lib/i18n/get-dictionary'
import { products, standardSizes } from '@/lib/products'

const initialState: RfqState = { status: 'idle' }

const inputClass =
  'w-full border border-input bg-white px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 [color-scheme:light]'
const invalidInputClass = 'border-destructive focus:border-destructive focus:ring-destructive/20'
const labelClass = 'font-mono text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground'

function errorMessage(state: RfqState, locale: Locale, dict: Dictionary): string | null {
  const copy = formCopy[locale]
  switch (state.status) {
    case 'invalid':
      return dict.rfq.required || copy.invalid
    case 'consent':
      return copy.consentRequired
    case 'rate-limited':
      return copy.rateLimited
    case 'error':
      return dict.rfq.errorText || copy.genericError
    default:
      return null
  }
}

export function RfqForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, formAction, pending] = useActionState(submitRfq, initialState)
  const [formKey, setFormKey] = useState(0)
  const renderedAt = useRef(Date.now())
  const errorRef = useRef<HTMLParagraphElement>(null)

  const f = dict.rfq.fields
  const copy = formCopy[locale]
  const message = errorMessage(state, locale, dict)
  const invalidFields = new Set<RfqField>(state.fieldErrors ?? [])

  useEffect(() => {
    if (state.status === 'success') {
      track('rfq_submitted', { locale })
      return
    }
    if (state.status !== 'idle') {
      // Переводим фокус на сообщение об ошибке — иначе пользователь не понимает, что произошло.
      errorRef.current?.focus()
    }
  }, [state.status, locale])

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-3 border border-accent/40 bg-card p-7">
        <CheckCircle2 className="size-7 text-accent" aria-hidden="true" />
        <h3 className="font-display text-xl font-bold tracking-tight text-primary">{dict.rfq.successTitle}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{dict.rfq.successText}</p>
        <button
          type="button"
          onClick={() => {
            renderedAt.current = Date.now()
            setFormKey((value) => value + 1)
          }}
          className="mt-2 text-sm font-semibold text-accent underline underline-offset-4 hover:no-underline"
        >
          {dict.rfq.submit}
        </button>
      </div>
    )
  }

  return (
    <form
      key={formKey}
      action={formAction}
      noValidate
      className="liquid-card flex flex-col gap-5 border border-border bg-card p-5 md:p-7"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="rendered_at" value={renderedAt.current} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rfq-company" className={labelClass}>
            {f.company} *
          </label>
          <input
            id="rfq-company"
            name="company"
            required
            maxLength={160}
            autoComplete="organization"
            aria-invalid={invalidFields.has('company') || undefined}
            className={`${inputClass} ${invalidFields.has('company') ? invalidInputClass : ''}`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="rfq-name" className={labelClass}>
            {f.name} *
          </label>
          <input
            id="rfq-name"
            name="name"
            required
            maxLength={160}
            autoComplete="name"
            aria-invalid={invalidFields.has('name') || undefined}
            className={`${inputClass} ${invalidFields.has('name') ? invalidInputClass : ''}`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="rfq-email" className={labelClass}>
            {f.email} *
          </label>
          <input
            id="rfq-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            aria-invalid={invalidFields.has('email') || undefined}
            className={`${inputClass} ${invalidFields.has('email') ? invalidInputClass : ''}`}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="rfq-phone" className={labelClass}>
            {f.phone} <span className="normal-case">({f.optional})</span>
          </label>
          <input id="rfq-phone" name="phone" type="tel" autoComplete="tel" maxLength={60} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="rfq-country" className={labelClass}>
            {f.country} <span className="normal-case">({f.optional})</span>
          </label>
          <input id="rfq-country" name="country" autoComplete="country-name" maxLength={80} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="rfq-quantity" className={labelClass}>
            {f.quantity} <span className="normal-case">({f.optional})</span>
          </label>
          <input id="rfq-quantity" name="quantity" maxLength={80} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="rfq-product" className={labelClass}>
            {f.product}
          </label>
          <select id="rfq-product" name="product" defaultValue="" className={inputClass}>
            <option value="" disabled>
              {f.productPlaceholder}
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.code}>
                {dict.products.items[product.id].name}
              </option>
            ))}
            <option value="other">{f.productOther}</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="rfq-size" className={labelClass}>
            {f.size}
          </label>
          <select id="rfq-size" name="size" defaultValue="" className={inputClass}>
            <option value="" disabled>
              {f.sizePlaceholder}
            </option>
            {standardSizes.map((size) => (
              <option key={size} value={`${size} mm`}>
                {size} mm
              </option>
            ))}
            <option value="custom">{f.sizeCustom}</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="rfq-message" className={labelClass}>
            {f.message}
          </label>
          <textarea
            id="rfq-message"
            name="message"
            rows={4}
            maxLength={4000}
            placeholder={f.messagePlaceholder}
            className={`${inputClass} resize-y leading-relaxed`}
          />
        </div>
      </div>

      {/* Honeypot: остаётся пустым у людей. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="rfq-website">Website</label>
        <input id="rfq-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3 border-t border-border pt-4">
        <input
          id="rfq-consent"
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 size-4 shrink-0 accent-[var(--accent)]"
        />
        <label htmlFor="rfq-consent" className="text-xs leading-relaxed text-muted-foreground">
          {copy.consentLabel}
        </label>
      </div>

      {message && (
        <p
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-2.5 border border-destructive/30 bg-destructive/5 p-3.5 text-sm leading-relaxed text-destructive outline-none"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="size-4" aria-hidden="true" />
          {pending ? dict.rfq.submitting : dict.rfq.submit}
        </button>
        <p className="text-xs leading-relaxed text-muted-foreground">{dict.rfq.privacy}</p>
      </div>
    </form>
  )
}
