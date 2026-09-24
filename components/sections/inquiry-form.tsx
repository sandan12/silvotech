'use client';

import { useActionState } from 'react';
import { Paperclip, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { submitLead } from '@/app/actions/submit-lead';
import { initialLeadState, type LeadState, type MissingLeadField } from '@/lib/lead';
import type { SiteCopy } from '@/lib/site-content';
import type { Locale } from '@/lib/i18n';

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

export default function InquiryForm({ copy, lang }: { copy: SiteCopy; lang: Locale }) {
  const [state, action, pending] = useActionState(submitLead, initialLeadState);
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
    <Field label={copy.form.product} name="product" defaultValue={prior.product} />
    <label className="field">{copy.form.material}<select name="material" defaultValue={prior.material ?? ''}><option value="">—</option>{['Silikon','Guma','EPDM','NBR','Tworzywa sztuczne','Nie wiem / dobór materiału'].map((x)=><option key={x}>{x}</option>)}</select></label>
    <Field label={copy.form.dimensions} name="dimensions" defaultValue={prior.dimensions} />
    <Field label={copy.form.quantity} name="quantity" defaultValue={prior.quantity} />
    <label className="field field-wide">{copy.form.message}<textarea name="message" rows={5} defaultValue={prior.message}/></label>
    <FileField label={copy.form.photo} name="photo" />
    <FileField label={copy.form.drawing} name="drawing" />
    <label className={`consent-field field-wide ${missing.has('consent') ? 'field-invalid' : ''}`}><input type="checkbox" name="consent" value="on" required defaultChecked={prior.consent === 'on'}/>{copy.form.privacy}</label>
    <div className="form-submit field-wide"><p></p><button className="button button-primary" disabled={pending} aria-busy={pending}><Send size={16}/>{pending ? copy.form.sending : copy.form.submit}</button></div>
  </form>;
}

function Field({ label, name, type='text', required=false, defaultValue='', invalid=false }: { label: string; name: string; type?: string; required?: boolean; defaultValue?: string; invalid?: boolean }) {
  return <label className={`field ${invalid ? 'field-invalid' : ''}`}>{label}{required && ' *'}<input name={name} type={type} required={required} defaultValue={defaultValue} aria-invalid={invalid || undefined}/></label>;
}

function FileField({ label, name }: { label: string; name: string }) {
  return <label className="file-field"><Paperclip size={17}/>{label}<input name={name} type="file" accept="image/jpeg,image/png,image/webp,application/pdf"/></label>;
}
