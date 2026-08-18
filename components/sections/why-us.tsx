'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { UserCheck, BadgeCheck, Timer, Globe2 } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

const icons = [UserCheck, BadgeCheck, Timer, Globe2];

export default function WhyUs({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const items = Array.from({ length: 4 }, (_, i) => ({
    title: dict[`offerWhy${i + 1}Title`],
    text: dict[`offerWhy${i + 1}Text`],
  }));

  return (
    <section ref={ref} className="section-padding">
      <div className="container-page">
        <div className="section-heading--center">
          <h2 className="section-title">{dict.offerWhyTitle}</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.4, 0, 0.2, 1] }}
                className="card hover-lift p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}