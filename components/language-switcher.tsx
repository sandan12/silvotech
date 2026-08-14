'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, ChevronDown, Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { locales,localeNames,type Locale } from '@/lib/i18n/config'
export function LanguageSwitcher({current,label,className,tone='light'}:{current:Locale;label:string;className?:string;tone?:'light'|'dark'}){
 const pathname=usePathname(),[open,setOpen]=useState(false)
 const hrefFor=(locale:Locale)=>{const parts=(pathname??`/${current}`).split('/');parts[1]=locale;return parts.join('/')||`/${locale}`}
 return <div className={cn('language-switcher',tone==='dark'&&'language-switcher--dark',className)}><button type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-haspopup="menu"><Languages className="size-4"/><span>{localeNames[current].label}</span><ChevronDown className={cn('size-3.5 transition-transform',open&&'rotate-180')}/><span className="sr-only">{label}</span></button>{open&&<div role="menu" className="language-switcher__menu">{locales.map(locale=><Link key={locale} href={hrefFor(locale)} hrefLang={locale} role="menuitem" onClick={()=>setOpen(false)}><span>{localeNames[locale].native}</span>{locale===current&&<Check className="size-4"/>}</Link>)}</div>}</div>
}
