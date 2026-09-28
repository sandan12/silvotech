import type { Locale } from './i18n';
import { getSiteCopy } from './site-content';

export const capabilityIds = ['weze', 'uszczelki', 'profile', 'arkusze', 'elementy-techniczne', 'tworzywa', 'na-zamowienie'] as const;
export type CapabilityId = (typeof capabilityIds)[number];

// These are the same photographs used by the homepage in v7.1.
export const capabilityPhotos = [
  '/media-new/catalog-hoses.webp',
  '/media-new/catalog-gaskets.webp',
  '/media-new/catalog-profiles.webp',
  '/media-new/catalog-silicone-sheets.webp',
  '/media-new/catalog-technical-parts.webp',
  '/media-new/catalog-plastic-parts.webp',
  '/media-new/catalog-custom-products.webp',
] as const;

type CapabilityText = {
  heading: string;
  introduction: string;
  parametersHeading: string;
  overviewLink: string;
  enquiry: string;
  briefHeading: string;
  briefText: string;
  notice: string;
  parameters: string[][];
};

const shared: Record<Locale, CapabilityText> = {
  pl: {
    heading: 'Możliwości produkcyjne',
    introduction: 'To przykłady grup wyrobów, a nie zamknięty katalog gotowych produktów. Każdy projekt ustalamy według zastosowania, próbki lub dokumentacji.',
    parametersHeading: 'Parametry do uzgodnienia',
    overviewLink: 'Zobacz możliwości',
    enquiry: 'Zapytaj o tę grupę wyrobów',
    briefHeading: 'Nie masz rysunku technicznego?',
    briefText: 'Prześlij zdjęcie lub próbkę, opisz zastosowanie i podaj dostępne wymiary. Pomożemy ustalić, jakich danych potrzeba do wyceny.',
    notice: 'Pokazane parametry są danymi potrzebnymi do ustalenia specyfikacji, a nie deklaracją dostępnych wariantów lub certyfikatów. Możliwość wykonania i dokumentację potwierdzamy dla konkretnego zapytania.',
    parameters: [
      ['średnica wewnętrzna', 'grubość ścianki', 'materiał', 'medium i temperatura pracy'],
      ['kształt i przekrój', 'wymiary i tolerancje', 'materiał i twardość', 'środowisko pracy'],
      ['rysunek przekroju', 'wymiary i tolerancje', 'materiał i twardość', 'kolor i długość'],
      ['grubość i format', 'materiał i twardość', 'powierzchnia', 'zastosowanie'],
      ['próbka lub rysunek', 'materiał', 'wymiary i tolerancje', 'planowany wolumen'],
      ['rysunek lub wzór', 'rodzaj tworzywa', 'wymiary i tolerancje', 'planowany wolumen'],
      ['zdjęcie, próbka lub rysunek', 'funkcja elementu', 'warunki pracy', 'wielkość zamówienia'],
    ],
  },
  en: {
    heading: 'Manufacturing capabilities',
    introduction: 'These are examples of product groups, not a closed catalogue of ready-made items. We define each project around its use, a sample or technical documentation.',
    parametersHeading: 'Parameters to agree', overviewLink: 'Explore capabilities', enquiry: 'Enquire about this product group',
    briefHeading: 'No technical drawing yet?', briefText: 'Send a photo or sample, describe the application and share the dimensions you have. We will help identify what is needed for a quotation.',
    notice: 'The parameters shown are inputs for defining a specification, not a claim that every variant or certification is available. Feasibility and documentation are confirmed for each enquiry.',
    parameters: [
      ['inner diameter', 'wall thickness', 'material', 'medium and operating temperature'],
      ['shape and cross-section', 'dimensions and tolerances', 'material and hardness', 'operating environment'],
      ['cross-section drawing', 'dimensions and tolerances', 'material and hardness', 'colour and length'],
      ['thickness and format', 'material and hardness', 'surface', 'application'],
      ['sample or drawing', 'material', 'dimensions and tolerances', 'expected volume'],
      ['drawing or sample', 'type of plastic', 'dimensions and tolerances', 'expected volume'],
      ['photo, sample or drawing', 'part function', 'operating conditions', 'order volume'],
    ],
  },
  de: {
    heading: 'Fertigungsmöglichkeiten',
    introduction: 'Dies sind Beispiele für Produktgruppen, kein geschlossener Katalog fertiger Artikel. Jedes Projekt legen wir anhand der Anwendung, eines Musters oder der technischen Unterlagen fest.',
    parametersHeading: 'Abzustimmende Parameter', overviewLink: 'Möglichkeiten ansehen', enquiry: 'Diese Produktgruppe anfragen',
    briefHeading: 'Noch keine technische Zeichnung?', briefText: 'Senden Sie ein Foto oder Muster, beschreiben Sie die Anwendung und nennen Sie die verfügbaren Maße. Wir helfen Ihnen, die Angaben für ein Angebot zusammenzustellen.',
    notice: 'Die genannten Parameter dienen zur Festlegung der Spezifikation. Sie sind keine Zusage für bestimmte Varianten oder Zertifikate. Machbarkeit und Dokumentation bestätigen wir für jede Anfrage.',
    parameters: [
      ['Innendurchmesser', 'Wandstärke', 'Material', 'Medium und Betriebstemperatur'],
      ['Form und Querschnitt', 'Maße und Toleranzen', 'Material und Härte', 'Einsatzumgebung'],
      ['Querschnittszeichnung', 'Maße und Toleranzen', 'Material und Härte', 'Farbe und Länge'],
      ['Dicke und Format', 'Material und Härte', 'Oberfläche', 'Anwendung'],
      ['Muster oder Zeichnung', 'Material', 'Maße und Toleranzen', 'geplante Stückzahl'],
      ['Zeichnung oder Muster', 'Kunststoffart', 'Maße und Toleranzen', 'geplante Stückzahl'],
      ['Foto, Muster oder Zeichnung', 'Funktion des Teils', 'Einsatzbedingungen', 'Bestellmenge'],
    ],
  },
  cz: {
    heading: 'Výrobní možnosti',
    introduction: 'Jde o příklady skupin výrobků, nikoli o uzavřený katalog hotových položek. Každý projekt upřesňujeme podle použití, vzorku nebo technické dokumentace.',
    parametersHeading: 'Parametry k upřesnění', overviewLink: 'Zobrazit možnosti', enquiry: 'Poptat tuto skupinu výrobků',
    briefHeading: 'Nemáte technický výkres?', briefText: 'Pošlete fotografii nebo vzorek, popište použití a uveďte dostupné rozměry. Pomůžeme určit údaje potřebné pro nabídku.',
    notice: 'Uvedené parametry slouží k upřesnění specifikace, nejsou příslibem dostupnosti všech variant ani certifikátů. Proveditelnost a dokumentaci potvrzujeme pro každou poptávku.',
    parameters: [
      ['vnitřní průměr', 'tloušťka stěny', 'materiál', 'médium a pracovní teplota'],
      ['tvar a průřez', 'rozměry a tolerance', 'materiál a tvrdost', 'pracovní prostředí'],
      ['výkres průřezu', 'rozměry a tolerance', 'materiál a tvrdost', 'barva a délka'],
      ['tloušťka a formát', 'materiál a tvrdost', 'povrch', 'použití'],
      ['vzorek nebo výkres', 'materiál', 'rozměry a tolerance', 'předpokládané množství'],
      ['výkres nebo vzorek', 'druh plastu', 'rozměry a tolerance', 'předpokládané množství'],
      ['fotografie, vzorek nebo výkres', 'funkce dílu', 'provozní podmínky', 'velikost objednávky'],
    ],
  },
  sk: {
    heading: 'Výrobné možnosti',
    introduction: 'Ide o príklady skupín výrobkov, nie o uzavretý katalóg hotových položiek. Každý projekt spresňujeme podľa použitia, vzorky alebo technickej dokumentácie.',
    parametersHeading: 'Parametre na spresnenie', overviewLink: 'Zobraziť možnosti', enquiry: 'Dopytovať túto skupinu výrobkov',
    briefHeading: 'Nemáte technický výkres?', briefText: 'Pošlite fotografiu alebo vzorku, opíšte použitie a uveďte dostupné rozmery. Pomôžeme určiť údaje potrebné na ponuku.',
    notice: 'Uvedené parametre slúžia na spresnenie špecifikácie, nie sú prísľubom dostupnosti všetkých variantov ani certifikátov. Realizovateľnosť a dokumentáciu potvrdzujeme pre každý dopyt.',
    parameters: [
      ['vnútorný priemer', 'hrúbka steny', 'materiál', 'médium a pracovná teplota'],
      ['tvar a prierez', 'rozmery a tolerancie', 'materiál a tvrdosť', 'pracovné prostredie'],
      ['výkres prierezu', 'rozmery a tolerancie', 'materiál a tvrdosť', 'farba a dĺžka'],
      ['hrúbka a formát', 'materiál a tvrdosť', 'povrch', 'použitie'],
      ['vzorka alebo výkres', 'materiál', 'rozmery a tolerancie', 'plánované množstvo'],
      ['výkres alebo vzorka', 'druh plastu', 'rozmery a tolerancie', 'plánované množstvo'],
      ['fotografia, vzorka alebo výkres', 'funkcia dielu', 'prevádzkové podmienky', 'veľkosť objednávky'],
    ],
  },
};

export function getCapabilities(lang: Locale) {
  const products = getSiteCopy(lang).products.items;
  return capabilityIds.map((id, index) => ({
    id, title: products[index].title, description: products[index].text,
    photo: capabilityPhotos[index], parameters: shared[lang].parameters[index],
  }));
}

export function getCapabilityCopy(lang: Locale) { return shared[lang]; }
