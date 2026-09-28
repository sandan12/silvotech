import type { Locale } from './i18n';

type PrivacyCopy = { lead: string; sections: { title: string; text: string }[] };

const privacy: Record<Locale, PrivacyCopy> = {
  pl: { lead: 'Informacje o danych przesyłanych w zapytaniach B2B.', sections: [
    { title: 'Administrator i kontakt', text: 'Dane otrzymuje SilvoTech, ul. Nastrojowa 25, 02-441 Warszawa. W sprawach dotyczących danych napisz na sales@silvotech.eu.' },
    { title: 'W jakim celu wykorzystujemy dane', text: 'Dane kontaktowe, opis zapytania i dobrowolnie przesłane załączniki wykorzystujemy do analizy zapytania, przygotowania odpowiedzi i prowadzenia związanej z nim korespondencji.' },
    { title: 'Przechowywanie', text: 'Dane przechowujemy przez czas potrzebny do obsługi zapytania i dalszej współpracy oraz przez okres wymagany przepisami, jeśli mają zastosowanie.' },
    { title: 'Załączniki', text: 'Przesyłaj wyłącznie materiały, które możesz nam udostępnić. Rysunki, zdjęcia i pliki służą technicznej ocenie możliwości wykonania.' },
    { title: 'Twoje dane', text: 'Jeśli chcesz zapytać o swoje dane, ich poprawienie lub usunięcie, skontaktuj się z nami pod wskazanym adresem e-mail.' },
  ] },
  en: { lead: 'How we handle information sent with B2B enquiries.', sections: [
    { title: 'Controller and contact', text: 'Enquiry data is received by SilvoTech, ul. Nastrojowa 25, 02-441 Warsaw, Poland. For questions about your data, email sales@silvotech.eu.' },
    { title: 'How we use the data', text: 'We use contact details, enquiry descriptions and voluntarily attached files to review your request, prepare a response and discuss the related project.' },
    { title: 'Retention', text: 'We keep the data for the time needed to handle the enquiry and any subsequent cooperation, and for any applicable statutory period.' },
    { title: 'Attachments', text: 'Only send materials you are allowed to share. Drawings, photographs and files are used to assess technical feasibility.' },
    { title: 'Your data', text: 'To ask about, correct or request deletion of your data, contact us at the email address above.' },
  ] },
  de: { lead: 'Informationen zur Verarbeitung von Daten aus B2B-Anfragen.', sections: [
    { title: 'Verantwortlicher und Kontakt', text: 'Ihre Anfragedaten erhält SilvoTech, ul. Nastrojowa 25, 02-441 Warschau, Polen. Fragen zu Ihren Daten senden Sie an sales@silvotech.eu.' },
    { title: 'Zweck der Verwendung', text: 'Wir verwenden Kontaktdaten, die Beschreibung Ihrer Anfrage und freiwillig übermittelte Anhänge zur Prüfung der Anfrage, zur Antwort und zur Kommunikation über das betreffende Projekt.' },
    { title: 'Aufbewahrung', text: 'Wir bewahren die Daten so lange auf, wie es für die Bearbeitung der Anfrage und eine anschließende Zusammenarbeit erforderlich ist, sowie für etwaige gesetzliche Fristen.' },
    { title: 'Anhänge', text: 'Bitte senden Sie nur Unterlagen, die Sie uns zur Verfügung stellen dürfen. Zeichnungen, Fotos und Dateien dienen der technischen Machbarkeitsprüfung.' },
    { title: 'Ihre Daten', text: 'Für Auskünfte, Berichtigungen oder Löschungsanfragen wenden Sie sich bitte an die oben genannte E-Mail-Adresse.' },
  ] },
  cz: { lead: 'Informace o údajích zasílaných v rámci B2B poptávek.', sections: [
    { title: 'Správce a kontakt', text: 'Údaje z poptávky obdrží SilvoTech, ul. Nastrojowa 25, 02-441 Varšava, Polsko. Dotazy k údajům zasílejte na sales@silvotech.eu.' },
    { title: 'Účel zpracování', text: 'Kontaktní údaje, popis poptávky a dobrovolně přiložené soubory používáme k posouzení požadavku, přípravě odpovědi a související komunikaci.' },
    { title: 'Uchovávání', text: 'Údaje uchováváme po dobu potřebnou k vyřízení poptávky a následné spolupráci a po případnou dobu stanovenou právními předpisy.' },
    { title: 'Přílohy', text: 'Zasílejte pouze podklady, které nám smíte poskytnout. Výkresy, fotografie a soubory slouží k technickému posouzení možnosti výroby.' },
    { title: 'Vaše údaje', text: 'S dotazy, žádostí o opravu či výmaz údajů se obraťte na výše uvedený e-mail.' },
  ] },
  sk: { lead: 'Informácie o údajoch zasielaných v rámci B2B dopytov.', sections: [
    { title: 'Prevádzkovateľ a kontakt', text: 'Údaje z dopytu dostáva SilvoTech, ul. Nastrojowa 25, 02-441 Varšava, Poľsko. Otázky k údajom posielajte na sales@silvotech.eu.' },
    { title: 'Účel spracúvania', text: 'Kontaktné údaje, opis dopytu a dobrovoľne priložené súbory používame na posúdenie požiadavky, prípravu odpovede a súvisiacu komunikáciu.' },
    { title: 'Uchovávanie', text: 'Údaje uchovávame počas času potrebného na vybavenie dopytu a následnú spoluprácu a počas prípadnej doby stanovenej právnymi predpismi.' },
    { title: 'Prílohy', text: 'Posielajte iba podklady, ktoré nám môžete poskytnúť. Výkresy, fotografie a súbory slúžia na technické posúdenie možnosti výroby.' },
    { title: 'Vaše údaje', text: 'S otázkami, žiadosťou o opravu alebo vymazanie údajov sa obráťte na vyššie uvedený e-mail.' },
  ] },
};

export function getPrivacyCopy(lang: Locale) { return privacy[lang]; }
