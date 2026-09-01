'use client';

import type { Dictionary, Locale } from '@/lib/i18n';
import Header from '@/components/sections/header';
import PageHero from '@/components/sections/page-hero';
import Contact from '@/components/sections/contact';
import Footer from '@/components/sections/footer';

export default function ContactPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <PageHero eyebrow={dict.contactEyebrow} title={dict.contactTitle} lead={dict.contactLead} />
        <Contact dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}