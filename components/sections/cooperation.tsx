'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { UtensilsCrossed, Factory, Truck, Ruler, Truck as Truck2, Package, Globe2 } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

const industryIcons = [UtensilsCrossed, Factory, Truck];
const blockIcons = [Ruler, Truck2, Package, Globe2];

export default function Cooperation({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const industries = [
    { title: dict.industry1Title, text: dict.industry1Text, points: [dict.industry1P1, dict.industry1P2, dict.industry1P3] },
    { title: dict.industry2Title, text: dict.industry2Text, points: [dict.industry2P1, dict.industry2P2, dict.industry2P3] },
    { title: dict.industry3Title, text: dict.industry3Text, points: [dict.industry3P1, dict.industry3P2, dict.industry3P3] },
  ];

  const blocks = [
    { title: dict.productionBlock1Title, text: dict.productionBlock1Text },
    { title: dict.productionBlock2Title, text: dict.productionBlock2Text },
    { title: dict.productionBlock3Title, text: dict.productionBlock3Text },
    { title: dict.productionBlock4Title, text: dict.productionBlock4Text },
  ];

  return (
    <section ref={ref} className="section-padding">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-3">
          {industries.map((item, i) => {
            const Icon = industryIcons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.4, 0, 0.2, 1] }}
                className="card hover-lift p-8"
              >
                <span className="icon-tile icon-tile--solid">
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.text}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24">
          <div className="section-heading">
            <h2 className="section-title">{dict.productionEyebrow}</h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {blocks.map((block, i) => {
              const Icon = blockIcons[i];
              return (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 22 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.4, 0, 0.2, 1] }}
                  className="card hover-lift p-7"
                >
                  <span className="icon-tile">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-ink">{block.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{block.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}