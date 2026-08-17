// Тексты согласия на обработку данных (RODO/GDPR) и сообщений формы.
// Вынесено отдельно, чтобы не переписывать три больших словаря целиком.

import type { Locale } from '@/lib/i18n/config'

export const formCopy: Record<
  Locale,
  {
    consentLabel: string
    consentRequired: string
    privacyLinkLabel: string
    rateLimited: string
    genericError: string
    invalid: string
  }
> = {
  pl: {
    consentLabel:
      'Wyrażam zgodę na przetwarzanie moich danych kontaktowych w celu przygotowania i przedstawienia oferty handlowej.',
    consentRequired: 'Zgoda na przetwarzanie danych jest wymagana, aby wysłać zapytanie.',
    privacyLinkLabel: 'Polityka prywatności',
    rateLimited: 'Wysłano zbyt wiele zapytań z tego adresu. Prosimy spróbować później lub napisać na sales@silvotech.eu.',
    genericError: 'Nie udało się wysłać zapytania. Prosimy napisać bezpośrednio na sales@silvotech.eu.',
    invalid: 'Prosimy uzupełnić nazwę firmy, osobę kontaktową i poprawny adres e-mail.',
  },
  en: {
    consentLabel:
      'I agree to the processing of my contact details for the purpose of preparing and presenting a commercial offer.',
    consentRequired: 'Consent to data processing is required to submit the enquiry.',
    privacyLinkLabel: 'Privacy policy',
    rateLimited: 'Too many enquiries were sent from this address. Please try again later or write to sales@silvotech.eu.',
    genericError: 'The enquiry could not be sent. Please write directly to sales@silvotech.eu.',
    invalid: 'Please provide the company name, a contact person and a valid e-mail address.',
  },
  de: {
    consentLabel:
      'Ich stimme der Verarbeitung meiner Kontaktdaten zum Zweck der Erstellung und Übermittlung eines Angebots zu.',
    consentRequired: 'Ohne Einwilligung in die Datenverarbeitung kann die Anfrage nicht gesendet werden.',
    privacyLinkLabel: 'Datenschutzerklärung',
    rateLimited: 'Von dieser Adresse wurden zu viele Anfragen gesendet. Bitte später erneut versuchen oder an sales@silvotech.eu schreiben.',
    genericError: 'Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie direkt an sales@silvotech.eu.',
    invalid: 'Bitte Firmennamen, Ansprechpartner und eine gültige E-Mail-Adresse angeben.',
  },
}
