import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { getSiteCopy } from '@/lib/site-content';
import { pageMetadata } from '@/lib/metadata';
import PageFrame from '@/components/sections/page-frame';
import HomeSections from '@/components/sections/home-sections';
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{const {lang}=await params;return pageMetadata((isLocale(lang)?lang:'pl') as Locale);}
export default async function Home({params}:{params:Promise<{lang:string}>}){const {lang:raw}=await params;const lang=(isLocale(raw)?raw:'pl') as Locale;const copy=getSiteCopy(lang);const schema={"@context":"https://schema.org","@type":"Organization",name:"SilvoTech",url:"https://silvotech.eu",email:"sales@silvotech.eu",description:copy.meta.description,address:{"@type":"PostalAddress",addressLocality:"Warszawa",addressCountry:"PL"},knowsAbout:["silicone products","rubber products","EPDM profiles","NBR components","plastic components","custom manufacturing"]};return <PageFrame copy={copy} lang={lang}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><HomeSections copy={copy} lang={lang}/></PageFrame>;}
