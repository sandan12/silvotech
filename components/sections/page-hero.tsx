import type { ReactNode } from 'react';
export default function PageHero({ title, lead, children }: { label: string; title: string; lead: string; children?: ReactNode }) {
  return <section className="page-hero"><div className="shell page-hero-centred"><h1>{title}</h1><p className="page-hero-lead">{lead}</p>{children}</div></section>;
}
