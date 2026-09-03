'use client';

/** Compact page header for the inner pages — no giant empty navy block. */
export default function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="bg-navy-deep pb-11 pt-[9.5rem]">
      <div className="container-page">
        <h1 className="mt-3 max-w-[30ch] text-white">{title}</h1>
        <span className="mt-5 block h-[3px] w-14 bg-orange" aria-hidden />
        {lead && (
          <p className="mt-5 max-w-[62ch] text-[0.97rem] leading-relaxed text-white/70">{lead}</p>
        )}
      </div>
    </section>
  );
}
