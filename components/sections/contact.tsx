'use client';

import { useActionState } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Mail, Phone, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Dictionary, Locale } from '@/lib/i18n';
import { COMPANY } from '@/lib/company';
import { standardSizes } from '@/lib/products';
import { submitLead } from '@/app/actions/submit-lead';
import { initialLeadState, type LeadState } from '@/lib/lead';

function errorMessage(dict: Dictionary, state: LeadState): string | null {
  if (state.status !== 'error') return null;
  if (state.error === 'required') return dict.formErrorRequired;
  if (state.error === 'email') return dict.formErrorEmail;
  return dict.formErrorSend;
}

export default function Contact({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [state, formAction, pending] = useActionState(submitLead, initialLeadState);

  const sent = state.status === 'success';
  const error = errorMessage(dict, state);
  const prior = state.values ?? {};
  const invalid = (field: 'company' | 'name' | 'email' | 'country') =>
    state.error === 'required' && !prior[field] ? true : undefined;

  return (
    <section ref={ref} className="section-padding">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="card p-8 md:p-10"
          >
            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center gap-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-band-deep text-navy">
                  <CheckCircle2 size={30} />
                </span>
                <h3 className="text-xl font-semibold text-ink">{dict.formSuccessTitle}</h3>
                <p className="max-w-md text-sm leading-relaxed text-body">{dict.formSuccessText}</p>
              </div>
            ) : (
              <form action={formAction} className="grid gap-5 sm:grid-cols-2" noValidate>
                <input type="hidden" name="locale" value={lang} />

                {/* Honeypot: hidden from people, irresistible to bots. */}
                <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-orange/40 bg-orange/5 p-4 text-sm text-ink sm:col-span-2"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-orange" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="field">
                  <label htmlFor="company">{dict.formCompany}</label>
                  <input
                    id="company"
                    name="company"
                    required
                    defaultValue={prior.company}
                    aria-invalid={invalid('company')}
                    placeholder="Company Sp. z o.o."
                  />
                </div>
                <div className="field">
                  <label htmlFor="name">{dict.formName}</label>
                  <input
                    id="name"
                    name="name"
                    required
                    defaultValue={prior.name}
                    aria-invalid={invalid('name')}
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">{dict.formEmail}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={prior.email}
                    aria-invalid={invalid('email')}
                    placeholder="jan@company.com"
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">
                    <span className="field-label-row">
                      {dict.formPhone} <span className="field-optional">{dict.formOptional}</span>
                    </span>
                  </label>
                  <input id="phone" name="phone" defaultValue={prior.phone} placeholder="+48 600 000 000" />
                </div>
                <div className="field">
                  <label htmlFor="country">{dict.formCountry}</label>
                  <input
                    id="country"
                    name="country"
                    required
                    defaultValue={prior.country}
                    aria-invalid={invalid('country')}
                    placeholder="Polska"
                  />
                </div>
                <div className="field">
                  <label htmlFor="product">{dict.formProduct}</label>
                  <select id="product" name="product" defaultValue={prior.product ?? ''}>
                    <option value="" disabled>
                      {dict.formProductPlaceholder}
                    </option>
                    <option>{dict.formProductClear}</option>
                    <option>{dict.formProductBlack}</option>
                    <option>{dict.formProductSheet}</option>
                    <option>{dict.formProductGasket}</option>
                    <option>{dict.formProductCustom}</option>
                    <option>{dict.formProductHelp}</option>
                  </select>
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="size">{dict.formSize}</label>
                  <select id="size" name="size" defaultValue={prior.size ?? ''}>
                    <option value="" disabled>
                      {dict.formSizePlaceholder}
                    </option>
                    {standardSizes.map((s) => (
                      <option key={s}>Ø {s} mm</option>
                    ))}
                    <option>{dict.formSizeCustom}</option>
                  </select>
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="quantity">
                    <span className="field-label-row">
                      {dict.formQuantity} <span className="field-optional">{dict.formOptional}</span>
                    </span>
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    defaultValue={prior.quantity}
                    placeholder="np. 100 mb / 5 rolek"
                  />
                </div>
                <div className="field sm:col-span-2">
                  <label htmlFor="message">{dict.formMessage}</label>
                  <textarea
                    id="message"
                    name="message"
                    defaultValue={prior.message}
                    placeholder={dict.formMessagePlaceholder}
                  />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn btn-cta" disabled={pending} aria-busy={pending}>
                    {pending ? dict.formSending : dict.formSubmit}
                  </button>
                  <p className="mt-3 text-xs text-muted">{dict.formPrivacy}</p>
                </div>
              </form>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="card card-shadow p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                <MapPin size={20} />
              </span>
              <h3 className="mt-5 text-base font-semibold text-ink">{dict.contactAsideTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{dict.contactAsideAddress}</p>
              <p className="mt-1 text-sm font-medium text-ink">{COMPANY.address}</p>

              <div className="mt-6 space-y-3 border-t border-line pt-5">
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-sm font-medium text-ink transition hover:text-navy"
                >
                  <Mail size={16} className="text-blue" />
                  {COMPANY.email}
                </a>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-3 text-sm font-medium text-ink transition hover:text-navy"
                >
                  <Phone size={16} className="text-blue" />
                  {COMPANY.phone}
                </a>
                <span className="flex items-center gap-3 text-sm font-medium text-ink">
                  <Building2 size={16} className="text-blue" />
                  {dict.footerNip}: {COMPANY.nip}
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
