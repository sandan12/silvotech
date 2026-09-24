import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import MediaProtection from '@/components/media-protection';
import './globals.css';
import './soft-redesign.css';

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pl" className={poppins.variable}><body><MediaProtection/>{children}</body></html>;
}
