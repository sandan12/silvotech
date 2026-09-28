'use client';

import { useActionState, useEffect, useRef, type Ref } from 'react';
import Link from 'next/link';
import { Paperclip, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { submitLead } from '@/app/actions/submit-lead';
import { initialLeadState, type LeadState, type MissingLeadField } from '@/lib/lead';
import type { SiteCopy } from '@/lib/site-content';
import type { Locale } from '@/lib/i18n';
import { capabilityIds } from '@/lib/capabilities';

function message(copy: SiteCopy, state: LeadState) {
  if (state.status !== 'error') return null;
  return state.error === 'required'
    ? copy.form.errorRequired
    : state.error === 'email'
      ? copy.form.errorEmail
      : state.error === 'file'
        ? copy.form.errorFile
        : copy.form.errorSend;
}

const consentNames: Record<Locale,string> = {
  pl: 'zgoda na przetwarzanie danych',
  en: 'data-processing consent',
  de: 'Einwilligung zur Datenverarbeitung',
  cz: 'souhlas se zpracováním údajů',
  sk: 'súhlas so spracovaním údajov',
};

const formUi: Record<Locale, { materials: string[]; consent: string; policy: string }> = {
  pl: { materials: ['Silikon', 'Guma', 'EPDM', 'NBR', 'Tworzywa sztuczne', 'Proszę o dobór materiału'], consent: 'Zapoznałem się z', policy: 'polityką prywatności' },
  en: { materials: ['Silicone', 'Rubber', 'EPDM', 'NBR', 'Plastics', 'Please advise on material'], consent: 'I have read the', policy: 'privacy policy' },
  de: { materials: ['Silikon', 'Gummi', 'EPDM', 'NBR', 'Kunststoffe', 'Bitte Material empfehlen'], consent: 'Ich habe die', policy: 'Datenschutzerklärung gelesen' },
  cz: { materials: ['Silikon', 'Pryž', 'EPDM', 'NBR', 'Plasty', 'Prosím o doporučení materiálu'], consent: 'Seznámil(a) jsem se s', policy: 'ochranou osobních údajů' },
  sk: { materials: ['Silikón', 'Guma', 'EPDM', 'NBR', 'Plasty', 'Prosím o odporúčanie materiálu'], consent: 'Oboznámil(a) som sa so', policy: 'zásadami ochrany osobných údajov' },
};

export default function InquiryForm({ copy, lang }: { copy: SiteCopy; lang: Locale }) {
  const [state, action, pending] = useActionState(submitLead, initialLeadState);
  const productInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('produkt');
    const index = capabilityIds.findIndex((item) => item === id);
    if (index >= 0 && productInput.current && !productInput.current.value) productInput.current.value = copy.products.items[index].title;
  }, [copy.products.items]);
  const error = message(copy, state);
  const prior = state.values ?? {};
  const missing = new Set<MissingLeadField>(state.missing ?? []);
  const missingLabels = (state.missing ?? []).map((field) => field === 'consent' ? consentNames[lang] : copy.form[field]);

  if (state.status === 'success') return <div className="form-success" role="status"><CheckCircle2 size={30}/><h3>{copy.form.successTitle}</h3><p>{copy.form.successText}</p></div>;

  return <form action={action} className="inquiry-form">
    <input type="hidden" name="locale" value={lang}/>
    <div className="honeypot" aria-hidden><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    {error && <div className="form-error" role="alert"><AlertTriangle size={18}/><div><strong>{error}</strong>{missingLabels.length > 0 && <p>{missingLabels.join(', ')}</p>}</div></div>}
    <Field label={copy.form.company} name="company" required defaultValue={prior.company} invalid={missing.has('company')} />
    <Field label={copy.form.name} name="name" required defaultValue={prior.name} invalid={missing.has('name')} />
    <Field label={copy.form.email} name="email" type="email" required defaultValue={prior.email} invalid={missing.has('email')} />
    <Field label={copy.form.phone} name="phone" defaultValue={prior.phone} />
    <Field label={copy.form.product} name="product" defaultValue={prior.product} inputRef={productInput} />
    <label className="field">{copy.form.material}<select name="material" defaultValue={prior.material ?? ''}><option value="">—</option>{formUi[lang].materials.map((x)=><option key={x}>{x}</option>)}</select></label>
    <Field label={copy.form.dimensions} name="dimensions" defaultValue={prior.dimensions} />
    <Field label={copy.form.quantity} name="quantity" defaultValue={prior.quantity} />
    <label className="field field-wide">{copy.form.message}<textarea name="message" rows={5} defaultValue={prior.message}/></label>
    <FileField label={copy.form.photo} name="photo" />
    <FileField label={copy.form.drawing} name="drawing" />
    <p className="file-hint field-wide">{copy.form.privacy}</p>
    <div className={`consent-field field-wide ${missing.has('consent') ? 'field-invalid' : ''}`}><input id={`privacy-${lang}`} type="checkbox" name="consent" value="on" required defaultChecked={prior.consent === 'on'}/><label htmlFor={`privacy-${lang}`}>{formUi[lang].consent} <Link href={`/${lang}/polityka-prywatnosci`}>{formUi[lang].policy}</Link>.</label></div>
    <div className="form-submit field-wide"><p></p><button className="button button-primary" disabled={pending} aria-busy={pending}><Send size={16}/>{pending ? copy.form.sending : copy.form.submit}</button></div>
  </form>;
}

function Field({ label, name, type='text', required=false, defaultValue='', invalid=false, inputRef }: { label: string; name: string; type?: string; required?: boolean; defaultValue?: string; invalid?: boolean; inputRef?: Ref<HTMLInputElement> }) {
  return <label className={`field ${invalid ? 'field-invalid' : ''}`}>{label}{required && ' *'}<input ref={inputRef} name={name} type={type} required={required} defaultValue={defaultValue} aria-invalid={invalid || undefined}/></label>;
}

function FileField({ label, name }: { label: string; name: string }) {
  return <label className="file-field"><Paperclip size={17}/>{label}<input name={name} type="file" accept="image/jpeg,image/png,image/webp,application/pdf"/></label>;
}
