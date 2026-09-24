import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getSiteCopy } from '@/lib/site-content';
import { pageMetadata } from '@/lib/metadata';
import PageFrame from '@/components/sections/page-frame';
import { AboutPage } from '@/components/sections/content-pages';
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{const {lang:raw}=await params;const lang=(isLocale(raw)?raw:'pl') as Locale;const copy=getSiteCopy(lang);return pageMetadata(lang,'o-nas',copy.nav.about);}
export default async function Page({params}:{params:Promise<{lang:string}>}){const {lang:raw}=await params;const lang=(isLocale(raw)?raw:'pl') as Locale;const copy=getSiteCopy(lang);return <PageFrame copy={copy} lang={lang} path="/o-nas"><AboutPage copy={copy} lang={lang}/></PageFrame>;}
