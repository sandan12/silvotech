import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getSiteCopy } from '@/lib/site-content';
import { pageMetadata } from '@/lib/metadata';
import PageFrame from '@/components/sections/page-frame';
import { ContactPage } from '@/components/sections/content-pages';
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{const {lang:raw}=await params;const lang=(isLocale(raw)?raw:'pl') as Locale;const copy=getSiteCopy(lang);return pageMetadata(lang,'kontakt',copy.nav.contact);}
export default async function Page({params}:{params:Promise<{lang:string}>}){const {lang:raw}=await params;const lang=(isLocale(raw)?raw:'pl') as Locale;const copy=getSiteCopy(lang);return <PageFrame copy={copy} lang={lang} path="/kontakt"><ContactPage copy={copy} lang={lang}/></PageFrame>;}
