import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SilvoTech — Silicone Hoses for Industry',
  description: 'Premium silicone hoses manufactured in Slovakia, distributed from Warsaw. Food-grade transparent and technical black silicone hoses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
