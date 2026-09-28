import type { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import type { Locale } from '@/lib/i18n';
import type { SiteCopy } from '@/lib/site-content';
const skip: Record<Locale,string> = {pl:'Przejdź do treści',en:'Skip to content',de:'Zum Inhalt springen',cz:'Přejít na obsah',sk:'Prejsť na obsah'};
export default function PageFrame({ copy, lang, path = '', children }: { copy: SiteCopy; lang: Locale; path?: string; children: ReactNode }) { return <><a className="skip-link" href="#main">{skip[lang]}</a><Header copy={copy} lang={lang} path={path}/><main id="main">{children}</main><Footer copy={copy} lang={lang}/></>; }
