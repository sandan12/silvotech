'use client';

import { Printer } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';
import { COMPANY } from '@/lib/company';
import { standardSizes } from '@/lib/products';

const IMG = {
  production: '/extrusion-head.webp',
  caliper: '/hose-caliper.webp',
  coil: '/hose-clear-coil-a.png',
  winding: '/winding-machine.webp',
  black: '/hose-black-industrial.png',
  drum: '/production-drum.jpg',
};

const UI = {
  pl: { print: 'Drukuj / Zapisz jako PDF', hint: 'W oknie druku wybierz „Zapisz jako PDF”, format A4, marginesy: brak, grafika tła: włączona.', page: 'Strona', of: 'z', deckTitle: 'Prezentacja firmowa', year: 'Prezentacja handlowa' },
  en: { print: 'Print / Save as PDF', hint: 'In the print dialog choose “Save as PDF”, A4, margins: none, background graphics: on.', page: 'Page', of: 'of', deckTitle: 'Company presentation', year: 'Sales presentation' },
  de: { print: 'Drucken / Als PDF speichern', hint: 'Im Druckdialog „Als PDF speichern“, A4, Ränder: keine, Hintergrundgrafiken: ein.', page: 'Seite', of: 'von', deckTitle: 'Unternehmenspräsentation', year: 'Verkaufspräsentation' },
  cz: { print: 'Tisk / Uložit jako PDF', hint: 'V dialogu tisku zvolte „Uložit jako PDF“, A4, okraje: žádné, grafika na pozadí: zapnuto.', page: 'Strana', of: 'z', deckTitle: 'Firemní prezentace', year: 'Obchodní prezentace' },
  sk: { print: 'Tlač / Uložiť ako PDF', hint: 'V dialógu tlače zvoľte „Uložiť ako PDF“, A4, okraje: žiadne, grafika na pozadí: zapnuté.', page: 'Strana', of: 'z', deckTitle: 'Firemná prezentácia', year: 'Obchodná prezentácia' },
} as const;

const TOTAL = 8;

export default function DeckClient({ dict, lang }: { dict: Dictionary; lang: keyof typeof UI }) {
  const ui = UI[lang] ?? UI.pl;

  const Foot = ({ n, label }: { n: number; label: string }) => (
    <div className="deck-foot">
      <span className="uppercase tracking-[0.14em]">{label}</span>
      <span>
        silvotech.eu · {ui.page} {n} {ui.of} {TOTAL}
      </span>
    </div>
  );

  return (
    <main className="deck">
      {/* ---------- Toolbar (screen only) ---------- */}
      <div className="deck-toolbar no-print">
        <div>
          <p className="text-[13px] font-semibold text-ink">
            SilvoTech — {ui.deckTitle} (A4, {TOTAL} {lang === 'pl' ? 'stron' : ui.of === 'of' ? 'pages' : 'str.'})
          </p>
          <p className="text-[11.5px] leading-snug text-muted">{ui.hint}</p>
        </div>
        <button type="button" onClick={() => window.print()} className="btn btn-cta">
          <Printer size={16} />
          {ui.print}
        </button>
      </div>

      {/* ================= 1 · COVER ================= */}
      <section className="a4 a4-cover">
        <div className="flex h-[150mm] flex-col justify-between bg-navy-deep p-[14mm] text-white" style={{ background: 'linear-gradient(160deg, #03235b 0%, #052d74 55%, #0a3f92 100%)' }}>
          <div className="flex items-start justify-between">
            <img src="/silvotech-logo.png" alt="SilvoTech" className="h-[11mm] w-auto brightness-0 invert" />
            <div className="border border-white/35 px-3 py-1 text-[7.6pt] font-semibold uppercase tracking-[0.18em]">
              {dict.euBadgeTitle}
            </div>
          </div>
          <div>
            <p className="text-[8pt] font-bold uppercase tracking-[0.22em] text-orange">{dict.heroEyebrow}</p>
            <h1 className="mt-[5mm] max-w-[150mm] text-[26pt] font-extrabold leading-[1.1] text-white text-balance">
              {dict.heroTitle}
            </h1>
            <div className="deck-rule mt-[6mm]" />
            <p className="mt-[5mm] max-w-[135mm] text-[10.5pt] leading-relaxed text-white/80">{dict.heroLead}</p>
          </div>
        </div>

        <div className="relative h-[70mm] w-full overflow-hidden">
          <img src={IMG.production} alt={dict.aboutTeamImageAlt} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col justify-between p-[14mm] pt-[8mm]">
          <div className="grid grid-cols-4 gap-[4mm]">
            {[
              [dict.heroFact1Value, dict.heroFact1Label],
              [dict.heroFact2Value, dict.heroFact2Label],
              [dict.heroFact3Value, dict.heroFact3Label],
              [dict.heroFact4Value, dict.heroFact4Label],
            ].map(([v, l]) => (
              <div key={l} className="border-t-2 border-navy pt-[3mm]">
                <p className="text-[13pt] font-extrabold leading-none text-navy">{v}</p>
                <p className="mt-[2mm] text-[8pt] leading-snug text-body">{l}</p>
              </div>
            ))}
          </div>

          <div className="mt-[8mm] flex items-end justify-between border-t border-line pt-[4mm] text-[8.4pt]">
            <div>
              <p className="font-semibold text-ink">{COMPANY.name}</p>
              <p className="text-muted">{COMPANY.address}, {COMPANY.country}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-ink">{COMPANY.phone}</p>
              <p className="text-muted">{COMPANY.email} · silvotech.eu</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2 · O NAS ================= */}
      <section className="a4">
        <p className="deck-eyebrow">{dict.aboutEyebrow}</p>
        <h2 className="deck-h2 mt-[3mm]">{dict.aboutTagline}</h2>
        <div className="deck-rule mt-[4mm]" />

        <div className="mt-[6mm] grid grid-cols-[1fr_62mm] gap-[6mm]">
          <div className="space-y-[3mm] text-[9.4pt] leading-relaxed">
            <p>{dict.aboutP1}</p>
            <p>{dict.aboutP2}</p>
            <p>{dict.aboutP3}</p>
          </div>
          <div className="overflow-hidden rounded-[0.3rem]">
            <img src={IMG.caliper} alt={dict.productionImage1Alt} className="h-[52mm] w-full object-cover" />
          </div>
        </div>

        <div className="mt-[7mm] grid grid-cols-4 gap-[3mm]">
          {[
            [dict.aboutStat1Value, dict.aboutStat1Label],
            [dict.aboutStat2Value, dict.aboutStat2Label],
            [dict.aboutStat3Value, dict.aboutStat3Label],
            [dict.aboutStat4Value, dict.aboutStat4Label],
          ].map(([v, l]) => (
            <div key={l} className="deck-card deck-card-band">
              <p className="text-[12pt] font-extrabold leading-none text-navy">{v}</p>
              <p className="mt-[2mm] text-[8pt] leading-snug">{l}</p>
            </div>
          ))}
        </div>

        <h3 className="deck-h3 mt-[8mm] text-[12pt]">{dict.aboutValuesTitle}</h3>
        <div className="mt-[4mm] grid grid-cols-2 gap-[4mm]">
          {[
            [dict.aboutValue1Title, dict.aboutValue1Text],
            [dict.aboutValue2Title, dict.aboutValue2Text],
            [dict.aboutValue3Title, dict.aboutValue3Text],
            [dict.aboutValue4Title, dict.aboutValue4Text],
          ].map(([t, x]) => (
            <div key={t} className="deck-card">
              <p className="deck-h3">{t}</p>
              <p className="mt-[2mm] text-[8.4pt] leading-snug">{x}</p>
            </div>
          ))}
        </div>

        <Foot n={2} label={dict.aboutEyebrow} />
      </section>

      {/* ================= 3 · OFERTA ================= */}
      <section className="a4">
        <p className="deck-eyebrow">{dict.offerEyebrow}</p>
        <h2 className="deck-h2 mt-[3mm]">{dict.offerTitle}</h2>
        <div className="deck-rule mt-[4mm]" />
        <p className="mt-[4mm] text-[9.2pt] leading-relaxed">{dict.offerLead}</p>

        <div className="mt-[6mm] grid grid-cols-2 gap-[4mm]">
          {[
            [dict.offerCat1Title, dict.offerCat1Desc, dict.offerCat1P1, dict.offerCat1P2, dict.offerCat1P3],
            [dict.offerCat2Title, dict.offerCat2Desc, dict.offerCat2P1, dict.offerCat2P2, dict.offerCat2P3],
            [dict.offerCat3Title, dict.offerCat3Desc, dict.offerCat3P1, dict.offerCat3P2, dict.offerCat3P3],
            [dict.offerCat4Title, dict.offerCat4Desc, dict.offerCat4P1, dict.offerCat4P2, dict.offerCat4P3],
          ].map(([t, d, p1, p2, p3], i) => (
            <div key={t} className="deck-card flex flex-col">
              <div className="flex items-center gap-[3mm]">
                <span className="deck-num">{i + 1}</span>
                <p className="deck-h3">{t}</p>
              </div>
              <p className="mt-[3mm] text-[8.4pt] leading-snug">{d}</p>
              <ul className="mt-[3mm] space-y-[1.4mm] text-[8.2pt] text-ink">
                {[p1, p2, p3].map((p) => (
                  <li key={p} className="flex gap-[2mm]">
                    <span className="mt-[1.6mm] h-[1.4mm] w-[1.4mm] flex-none rounded-full bg-orange" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-[6mm] grid grid-cols-3 gap-[3mm]">
          <img src={IMG.coil} alt={dict.productionImage2Alt} className="h-[36mm] w-full rounded-[0.3rem] border border-line object-cover" />
          <img src={IMG.black} alt={dict.homeProd2Title} className="h-[36mm] w-full rounded-[0.3rem] border border-line object-cover" />
          <img src={IMG.winding} alt={dict.productionImage1Alt} className="h-[36mm] w-full rounded-[0.3rem] border border-line object-cover" />
        </div>

        <Foot n={3} label={dict.offerEyebrow} />
      </section>

      {/* ================= 4 · ROZMIARY ================= */}
      <section className="a4">
        <p className="deck-eyebrow">{dict.specsEyebrow}</p>
        <h2 className="deck-h2 mt-[3mm]">{dict.specsTitle}</h2>
        <div className="deck-rule mt-[4mm]" />
        <p className="mt-[4mm] text-[9.2pt] leading-relaxed">{dict.specsLead}</p>

        <div className="mt-[6mm] grid grid-cols-7 gap-[2mm]">
          {standardSizes.map((s) => (
            <div key={s} className="deck-size">{s}</div>
          ))}
        </div>

        <table className="deck-table mt-[7mm]">
          <thead>
            <tr>
              <th>{dict.specsProduct}</th>
              <th>{dict.specsRange}</th>
              <th>{dict.specsPackaging}</th>
              <th>{dict.specsDocs}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold">{dict.specsClear}</td>
              <td>{dict.aboutStat2Value}</td>
              <td>{dict.specsPackagingValue}</td>
              <td>{dict.specsDocsValue}</td>
            </tr>
            <tr>
              <td className="font-semibold">{dict.specsBlack}</td>
              <td>{dict.aboutStat2Value}</td>
              <td>{dict.specsPackagingValue}</td>
              <td>{dict.specsCustom}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-[3mm] text-[7.8pt] italic leading-snug text-muted">{dict.specsNote}</p>

        <div className="mt-[7mm] grid grid-cols-2 gap-[4mm]">
          {[
            [dict.homeProd1Tag, dict.homeProd1Title, dict.homeProd1Desc, dict.homeProd1Spec1, dict.homeProd1Spec2, dict.homeProd1Spec3],
            [dict.homeProd2Tag, dict.homeProd2Title, dict.homeProd2Desc, dict.homeProd2Spec1, dict.homeProd2Spec2, dict.homeProd2Spec3],
          ].map(([tag, t, d, s1, s2, s3]) => (
            <div key={t} className="deck-card">
              <span className="inline-block bg-navy px-[2.5mm] py-[1mm] text-[7.2pt] font-semibold uppercase tracking-[0.12em] text-white">{tag}</span>
              <p className="deck-h3 mt-[3mm]">{t}</p>
              <p className="mt-[2mm] text-[8.4pt] leading-snug">{d}</p>
              <div className="mt-[3mm] space-y-[1.2mm] border-t border-line pt-[3mm] text-[8.2pt] text-ink">
                <p>{s1}</p>
                <p>{s2}</p>
                <p>{s3}</p>
              </div>
            </div>
          ))}
        </div>

        <Foot n={4} label={dict.specsEyebrow} />
      </section>

      {/* ================= 5 · MATERIAŁ + ZASTOSOWANIA ================= */}
      <section className="a4">
        <p className="deck-eyebrow">{dict.offerTechEyebrow}</p>
        <h2 className="deck-h2 mt-[3mm]">{dict.offerTechTitle}</h2>
        <div className="deck-rule mt-[4mm]" />

        <div className="mt-[5mm] grid grid-cols-[1fr_58mm] gap-[6mm]">
          <div className="space-y-[3mm] text-[9.2pt] leading-relaxed">
            <p>{dict.offerTechText1}</p>
            <p>{dict.offerTechText2}</p>
          </div>
          <img src={IMG.drum} alt={dict.productionImage1Alt} className="h-[42mm] w-full rounded-[0.3rem] object-cover" />
        </div>

        <h3 className="deck-h3 mt-[7mm] text-[12pt]">{dict.aboutAppsTitle}</h3>
        <div className="mt-[4mm] grid grid-cols-2 gap-[3.5mm]">
          {[
            [dict.aboutApp1Title, dict.aboutApp1Text],
            [dict.aboutApp2Title, dict.aboutApp2Text],
            [dict.aboutApp3Title, dict.aboutApp3Text],
            [dict.aboutApp4Title, dict.aboutApp4Text],
            [dict.aboutApp5Title, dict.aboutApp5Text],
            [dict.aboutApp6Title, dict.aboutApp6Text],
          ].map(([t, x]) => (
            <div key={t} className="border-l-2 border-orange pl-[3.5mm]">
              <p className="deck-h3">{t}</p>
              <p className="mt-[1.5mm] text-[8.2pt] leading-snug">{x}</p>
            </div>
          ))}
        </div>

        <Foot n={5} label={dict.aboutAppsEyebrow} />
      </section>

      {/* ================= 6 · JAKOŚĆ I DOKUMENTY ================= */}
      <section className="a4">
        <p className="deck-eyebrow">{dict.qualityEyebrow}</p>
        <h2 className="deck-h2 mt-[3mm]">{dict.qualityTitle}</h2>
        <div className="deck-rule mt-[4mm]" />
        <p className="mt-[4mm] text-[9.2pt] leading-relaxed">{dict.qualityLead}</p>

        <div className="mt-[6mm] grid grid-cols-2 gap-[4mm]">
          {[
            [dict.qualityItem1Title, dict.qualityItem1Text],
            [dict.qualityItem2Title, dict.qualityItem2Text],
            [dict.qualityItem3Title, dict.qualityItem3Text],
            [dict.qualityItem4Title, dict.qualityItem4Text],
          ].map(([t, x]) => (
            <div key={t} className="deck-card deck-card-band">
              <p className="deck-h3">{t}</p>
              <p className="mt-[2mm] text-[8.4pt] leading-snug">{x}</p>
            </div>
          ))}
        </div>

        <div className="mt-[6mm] grid grid-cols-[1fr_62mm] gap-[6mm]">
          <div>
            <h3 className="deck-h3 text-[11pt]">{dict.qualityDocsTitle}</h3>
            <ul className="mt-[3mm] space-y-[2mm] text-[8.8pt] text-ink">
              {[dict.qualityDoc1, dict.qualityDoc2, dict.qualityDoc3, dict.qualityDoc4].map((d) => (
                <li key={d} className="flex gap-[2.5mm] border-b border-line pb-[2mm]">
                  <span className="mt-[1.8mm] h-[1.6mm] w-[1.6mm] flex-none rounded-full bg-navy" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <img src={IMG.winding} alt={dict.aboutTeamImageAlt} className="h-[48mm] w-full rounded-[0.3rem] object-cover" />
        </div>

        <div className="mt-[6mm] deck-card border-l-[3px] border-l-navy">
          <p className="deck-eyebrow">{dict.aboutGuaranteeEyebrow}</p>
          <p className="deck-h3 mt-[2mm]">{dict.aboutGuaranteeTitle}</p>
          <p className="mt-[2mm] text-[8.6pt] leading-snug">{dict.aboutGuaranteeText}</p>
        </div>

        <Foot n={6} label={dict.qualityEyebrow} />
      </section>

      {/* ================= 7 · WSPÓŁPRACA ================= */}
      <section className="a4">
        <p className="deck-eyebrow">{dict.industriesEyebrow}</p>
        <h2 className="deck-h2 mt-[3mm]">{dict.industriesTitle}</h2>
        <div className="deck-rule mt-[4mm]" />

        <div className="mt-[5mm] grid grid-cols-3 gap-[3.5mm]">
          {[
            [dict.industry1Title, dict.industry1Text, dict.industry1P1, dict.industry1P2, dict.industry1P3],
            [dict.industry2Title, dict.industry2Text, dict.industry2P1, dict.industry2P2, dict.industry2P3],
            [dict.industry3Title, dict.industry3Text, dict.industry3P1, dict.industry3P2, dict.industry3P3],
          ].map(([t, d, p1, p2, p3]) => (
            <div key={t} className="deck-card">
              <p className="deck-h3">{t}</p>
              <p className="mt-[2mm] text-[8.2pt] leading-snug">{d}</p>
              <ul className="mt-[3mm] space-y-[1.2mm] border-t border-line pt-[2.5mm] text-[8pt] text-ink">
                {[p1, p2, p3].map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="deck-h3 mt-[7mm] text-[12pt]">{dict.aboutHowTitle}</h3>
        <div className="mt-[4mm] space-y-[2.5mm]">
          {[
            [dict.aboutStep1Title, dict.aboutStep1P1],
            [dict.aboutStep2Title, dict.aboutStep2P1],
            [dict.aboutStep3Title, dict.aboutStep3P1],
            [dict.aboutStep4Title, dict.aboutStep4P1],
            [dict.aboutStep5Title, dict.aboutStep5P1],
          ].map(([t, x], i) => (
            <div key={t} className="flex gap-[3.5mm] border-b border-line pb-[2.5mm]">
              <span className="deck-num">{i + 1}</span>
              <div>
                <p className="deck-h3">{t}</p>
                <p className="mt-[1mm] text-[8.2pt] leading-snug">{x}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[5mm] deck-card deck-card-band">
          <p className="deck-h3">{dict.offerWhy4Title}</p>
          <p className="mt-[2mm] text-[8.4pt] leading-snug">{dict.offerWhy4Text}</p>
        </div>

        <Foot n={7} label={dict.industriesEyebrow} />
      </section>

      {/* ================= 8 · KONTAKT ================= */}
      <section className="a4">
        <p className="deck-eyebrow">{dict.contactEyebrow}</p>
        <h2 className="deck-h2 mt-[3mm]">{dict.contactTitle}</h2>
        <div className="deck-rule mt-[4mm]" />
        <p className="mt-[4mm] text-[9.2pt] leading-relaxed">{dict.contactLead}</p>

        <div className="mt-[6mm] grid grid-cols-2 gap-[4mm]">
          {[
            [dict.offerWhy1Title, dict.offerWhy1Text],
            [dict.offerWhy2Title, dict.offerWhy2Text],
            [dict.offerWhy3Title, dict.offerWhy3Text],
            [dict.aboutPillar3Title, dict.aboutPillar3Text],
          ].map(([t, x]) => (
            <div key={t} className="deck-card">
              <p className="deck-h3">{t}</p>
              <p className="mt-[2mm] text-[8.4pt] leading-snug">{x}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-[7mm] p-[7mm] text-white"
          style={{ background: 'linear-gradient(120deg, #03235b 0%, #052d74 60%, #0a3f92 100%)' }}
        >
          <img src="/silvotech-logo.png" alt="SilvoTech" className="h-[9mm] w-auto brightness-0 invert" />
          <p className="mt-[5mm] text-[13pt] font-extrabold leading-tight text-white">{dict.ctaBandTitle}</p>
          <p className="mt-[2mm] max-w-[130mm] text-[9pt] leading-snug text-white/80">{dict.ctaBandText}</p>

          <div className="mt-[6mm] grid grid-cols-3 gap-[4mm] border-t border-white/25 pt-[5mm] text-[9pt]">
            <div>
              <p className="text-[7.4pt] uppercase tracking-[0.16em] text-orange">Tel.</p>
              <p className="mt-[1.5mm] font-semibold text-white">{COMPANY.phone}</p>
            </div>
            <div>
              <p className="text-[7.4pt] uppercase tracking-[0.16em] text-orange">E-mail</p>
              <p className="mt-[1.5mm] font-semibold text-white">{COMPANY.email}</p>
            </div>
            <div>
              <p className="text-[7.4pt] uppercase tracking-[0.16em] text-orange">Web</p>
              <p className="mt-[1.5mm] font-semibold text-white">silvotech.eu</p>
            </div>
          </div>
        </div>

        <div className="mt-[6mm] grid grid-cols-2 gap-[4mm] text-[8.6pt]">
          <div className="deck-card">
            <p className="deck-eyebrow">{dict.contactAsideAddress}</p>
            <p className="mt-[2mm] font-semibold text-ink">{COMPANY.name}</p>
            <p>{COMPANY.address}</p>
            <p>{COMPANY.country}</p>
            <p className="mt-[2mm] text-muted">{dict.footerNip}: {COMPANY.nip}</p>
          </div>
          <div className="deck-card deck-card-band">
            <p className="deck-eyebrow">{dict.aboutGeoTitle}</p>
            <p className="mt-[2mm] leading-snug">{dict.aboutGeoText}</p>
          </div>
        </div>

        <Foot n={8} label={dict.navContact} />
      </section>
    </main>
  );
}
