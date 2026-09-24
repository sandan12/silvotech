import type { ReactNode } from 'react';
import { Manrope, IBM_Plex_Mono } from 'next/font/google';
import MediaProtection from '@/components/media-protection';
import './globals.css';
const manrope = Manrope({ subsets: ['latin','latin-ext'], variable: '--font-sans', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin','latin-ext'], weight: ['500','600'], variable: '--font-mono', display: 'swap' });
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pl" className={`${manrope.variable} ${mono.variable}`}><body><MediaProtection/>{children}</body></html>;
}
