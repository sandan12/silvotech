import type { ReactNode } from 'react';
export default function PageHero({ label, title, lead, children }: { label: string; title: string; lead: string; children?: ReactNode }) {
  return <section className="page-hero"><div className="shell"><p className="kicker kicker-light">{label}</p><h1>{title}</h1><p className="page-hero-lead">{lead}</p>{children}</div></section>;
}
