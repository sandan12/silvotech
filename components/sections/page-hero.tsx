'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="band-navy pb-16 pt-44 text-center">
      <div className="container-page relative">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="eyebrow eyebrow--light"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-5 max-w-[20ch] text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.12] text-white"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}