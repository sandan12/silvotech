'use client';

/**
 * Compact page header for the inner pages. No eyebrow: it only restated the
 * page title. No rule under the heading either, the type carries itself.
 */
export default function PageHero({
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="bg-navy-deep pb-12 pt-[9.5rem]">
      <div className="container-page">
        <h1 className="max-w-[30ch] text-white">{title}</h1>
        {lead && (
          <p className="mt-5 max-w-[62ch] text-[0.97rem] leading-relaxed text-white/70">{lead}</p>
        )}
      </div>
    </section>
  );
}
