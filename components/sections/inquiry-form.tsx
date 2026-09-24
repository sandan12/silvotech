'use client';
import { useActionState } from 'react';
import { Paperclip, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { submitLead } from '@/app/actions/submit-lead';
import { initialLeadState, type LeadState } from '@/lib/lead';
import type { SiteCopy } from '@/lib/site-content';
import type { Locale } from '@/lib/i18n';

function message(copy: SiteCopy, state: LeadState) {
  if (state.status !== 'error') return null;
  return state.error === 'required' ? copy.form.errorRequired : state.error === 'email' ? copy.form.errorEmail : state.error === 'file' ? copy.form.errorFile : copy.form.errorSend;
}

export default function InquiryForm({ copy, lang }: { copy: SiteCopy; lang: Locale }) {
  const [state, action, pending] = useActionState(submitLead, initialLeadState);
  const error = message(copy, state);
  if (state.status === 'success') return <div className="form-success" role="status"><CheckCircle2 size={30}/><h3>{copy.form.successTitle}</h3><p>{copy.form.successText}</p></div>;
  return <form action={action} className="inquiry-form" noValidate>
    <input type="hidden" name="locale" value={lang}/>
    <div className="honeypot" aria-hidden><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
    {error && <div className="form-error" role="alert"><AlertTriangle size={18}/>{error}</div>}
    <Field label={copy.form.company} name="company" required />
    <Field label={copy.form.name} name="name" required />
    <Field label={copy.form.email} name="email" type="email" required />
    <Field label={copy.form.phone} name="phone" />
    <Field label={copy.form.product} name="product" />
    <label className="field"><span>{copy.form.material}</span><select name="material" defaultValue=""><option value="">—</option>{['Silikon','Guma','EPDM','NBR','Tworzywa sztuczne','Nie wiem / dobór materiału'].map(x=><option key={x}>{x}</option>)}</select></label>
    <Field label={copy.form.dimensions} name="dimensions" />
    <Field label={copy.form.quantity} name="quantity" />
    <label className="field field-wide"><span>{copy.form.message}</span><textarea name="message" rows={5}/></label>
    <FileField label={copy.form.photo} name="photo" />
    <FileField label={copy.form.drawing} name="drawing" />
    <label className="consent-field field-wide"><input type="checkbox" name="consent" required/><span>{copy.form.privacy}</span></label><div className="form-submit field-wide"><p></p><button className="button button-primary" disabled={pending} aria-busy={pending}><Send size={16}/>{pending ? copy.form.sending : copy.form.submit}</button></div>
  </form>;
}
function Field({ label, name, type='text', required=false }: { label: string; name: string; type?: string; required?: boolean }) { return <label className="field"><span>{label}{required && ' *'}</span><input name={name} type={type} required={required}/></label>; }
function FileField({ label, name }: { label: string; name: string }) { return <label className="file-field"><Paperclip size={17}/><span>{label}</span><input name={name} type="file" accept="image/jpeg,image/png,image/webp,application/pdf"/></label>; }
