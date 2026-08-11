'use client'

import { useActionState } from 'react'
import { AlertTriangle, CheckCircle2, Send } from 'lucide-react'

import { submitRfq, type RfqState } from '@/app/actions/rfq'
import { products, standardSizes } from '@/lib/products'
import type { Dictionary } from '@/lib/i18n/get-dictionary'

const initialState: RfqState = { status: 'idle' }
const inputClass = 'w-full border border-input bg-white px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 [color-scheme:light]'
const labelClass = 'font-mono text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground'

export function RfqForm({ dict }: { dict: Dictionary }) {
  const [state, formAction, pending] = useActionState(submitRfq, initialState)
  const f = dict.rfq.fields
  if (state.status === 'success') return <div className="flex flex-col items-start gap-3 border border-accent/40 bg-card p-7"><CheckCircle2 className="size-7 text-accent" aria-hidden="true" /><h3 className="font-display text-xl font-bold tracking-tight text-primary">{dict.rfq.successTitle}</h3><p className="text-sm leading-relaxed text-muted-foreground">{dict.rfq.successText}</p></div>
  return (
    <form action={formAction} className="liquid-card flex flex-col gap-5 border border-border bg-card p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5"><label htmlFor="rfq-company" className={labelClass}>{f.company} *</label><input id="rfq-company" name="company" required maxLength={160} className={inputClass} /></div>
        <div className="flex flex-col gap-1.5"><label htmlFor="rfq-name" className={labelClass}>{f.name} *</label><input id="rfq-name" name="name" required maxLength={160} className={inputClass} /></div>
        <div className="flex flex-col gap-1.5"><label htmlFor="rfq-email" className={labelClass}>{f.email} *</label><input id="rfq-email" name="email" type="email" required autoComplete="email" maxLength={200} className={inputClass} /></div>
        <div className="flex flex-col gap-1.5"><label htmlFor="rfq-phone" className={labelClass}>{f.phone} <span className="normal-case">({f.optional})</span></label><input id="rfq-phone" name="phone" type="tel" autoComplete="tel" maxLength={60} className={inputClass} /></div>
        <div className="flex flex-col gap-1.5"><label htmlFor="rfq-country" className={labelClass}>{f.country} <span className="normal-case">({f.optional})</span></label><input id="rfq-country" name="country" maxLength={80} className={inputClass} /></div>
        <div className="flex flex-col gap-1.5"><label htmlFor="rfq-quantity" className={labelClass}>{f.quantity} <span className="normal-case">({f.optional})</span></label><input id="rfq-quantity" name="quantity" maxLength={80} className={inputClass} /></div>
        <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="rfq-product" className={labelClass}>{f.product}</label><select id="rfq-product" name="product" defaultValue="" className={inputClass}><option value="" disabled>{f.productPlaceholder}</option>{products.map((product) => <option key={product.id} value={product.code}>{dict.products.items[product.id].name} ({product.code})</option>)}<option value="other">{f.productOther}</option></select></div>
        <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="rfq-size" className={labelClass}>{f.size}</label><select id="rfq-size" name="size" defaultValue="" className={inputClass}><option value="" disabled>{f.sizePlaceholder}</option>{standardSizes.map((size) => <option key={size} value={`${size} mm`}>{size} mm</option>)}<option value="custom">{f.sizeCustom}</option></select></div>
        <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="rfq-message" className={labelClass}>{f.message}</label><textarea id="rfq-message" name="message" rows={4} maxLength={4000} placeholder={f.messagePlaceholder} className={`${inputClass} resize-y leading-relaxed`} /></div>
      </div>
      <div className="sr-only" aria-hidden="true"><label htmlFor="rfq-website">Website</label><input id="rfq-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      {state.status !== 'idle' && <p role="alert" className="flex items-start gap-2.5 border border-destructive/30 bg-destructive/5 p-3.5 text-sm leading-relaxed text-destructive"><AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{state.status === 'invalid' ? dict.rfq.required : dict.rfq.errorText}</p>}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3"><button type="submit" disabled={pending} className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/85 disabled:cursor-not-allowed disabled:opacity-60"><Send className="size-4" aria-hidden="true" />{pending ? dict.rfq.submitting : dict.rfq.submit}</button><p className="text-xs leading-relaxed text-muted-foreground">{dict.rfq.privacy}</p></div>
    </form>
  )
}
