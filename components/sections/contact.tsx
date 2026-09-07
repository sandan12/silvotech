'use client';

import { useActionState, useState } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { QuoteSelection } from '@/lib/quote-selection';
import { COMPANY } from '@/lib/company';
import { standardSizes } from '@/lib/products';
import { submitLead } from '@/app/actions/submit-lead';
import { initialLeadState } from '@/lib/lead';
import { catalogCopy } from '@/lib/catalog-copy';
import styles from './catalog.module.css';

export default function Contact({ dict, lang, selection }: { dict: Dictionary; lang: Locale; selection?: QuoteSelection }) {
  const [state, formAction, pending] = useActionState(submitLead, initialLeadState);
  const [product, setProduct] = useState(selection?.product ?? '');
  const prior = state.values ?? {};
  const copy = catalogCopy[lang];
  const error = state.status === 'error' ? (state.error === 'required' ? dict.formErrorRequired : state.error === 'email' ? dict.formErrorEmail : dict.formErrorSend) : null;
  const invalid = (field: 'company' | 'name' | 'email' | 'country') => state.status === 'error' && ((state.error === 'required' && !prior[field]) || (field === 'email' && state.error === 'email')) ? true : undefined;
  const initialSize = prior.size ?? selection?.size ?? '';
  const standardSize = standardSizes.some(size => `Ø ${size} mm` === initialSize);
  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.contactGrid}`}>
        <div className={styles.formPanel}>
          {state.status === 'success' ? <div role="status" className={styles.success}>
            <h2>{dict.formSuccessTitle}</h2><p>{dict.formSuccessText}</p>
          </div> : <form action={formAction} className={styles.form} noValidate aria-busy={pending}>
            <input type="hidden" name="locale" value={lang} />
            <div aria-hidden className={styles.honeypot}><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
            {error && <div id="form-error" role="alert" className={`${styles.full} ${styles.error}`}>{error}</div>}
            {([
              ['company', dict.formCompany, 'organization'], ['name', dict.formName, 'name'],
              ['email', dict.formEmail, 'email'], ['country', dict.formCountry, 'country-name'],
            ] as const).map(([name, label, autocomplete]) => <div className={styles.field} key={name}>
              <label htmlFor={name}>{label} *</label>
              <input id={name} name={name} type={name === 'email' ? 'email' : 'text'} autoComplete={autocomplete} required defaultValue={prior[name]} aria-invalid={invalid(name)} aria-describedby={invalid(name) ? 'form-error' : undefined} />
            </div>)}
            <div className={styles.field}><label htmlFor="phone">{dict.formPhone} ({dict.formOptional})</label><input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={prior.phone} /></div>
            <div className={styles.field}>
              <label htmlFor="product">{dict.formProduct}</label>
              <select id="product" name="product" value={product} onChange={event => setProduct(event.target.value)}>
                <option value="">{dict.formProductPlaceholder}</option>
                {[dict.formProductClear, dict.formProductBlack, dict.formProductSheet, dict.formProductGasket, dict.formProductCustom, dict.formProductHelp].map(label => <option key={label} value={label}>{label}</option>)}
              </select>
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label htmlFor="size">{dict.formSize}</label>
              {product === dict.formProductClear ? <select key={`standard-${product}`} id="size" name="size" defaultValue={standardSize || initialSize === dict.formSizeCustom ? initialSize : ''}>
                <option value="">{dict.formSizePlaceholder}</option>
                {standardSizes.map(size => <option key={size}>Ø {size} mm</option>)}
                <option>{dict.formSizeCustom}</option>
              </select> : <input key={`custom-${product}`} id="size" name="size" defaultValue={!standardSize ? initialSize : ''} maxLength={120} />}
            </div>
            <div className={`${styles.field} ${styles.full}`}><label htmlFor="quantity">{dict.formQuantity} ({dict.formOptional})</label><input id="quantity" name="quantity" defaultValue={prior.quantity} /></div>
            <div className={`${styles.field} ${styles.full}`}><label htmlFor="message">{dict.formMessage}</label><textarea id="message" name="message" defaultValue={prior.message} placeholder={dict.formMessagePlaceholder} rows={5} /></div>
            <div className={styles.full}><button type="submit" className={styles.button} disabled={pending}>{pending ? dict.formSending : dict.formSubmit}</button><p className={styles.note}>{dict.formPrivacy}</p></div>
          </form>}
        </div>
        <aside className={styles.contactAside}>
          <h2>{dict.contactAsideTitle}</h2>
          <a className={styles.textLink} href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <a className={styles.textLink} href={COMPANY.phoneHref}>{COMPANY.phone}</a>
          <p>{dict.contactAsideAddress}</p><address>{COMPANY.address}</address>
          <p>{dict.footerNip}: {COMPANY.nip}</p>
          <div className={styles.note}><h3>{copy.application}</h3><p>{copy.applicationText}</p></div>
        </aside>
      </div>
    </section>
  );
}
