'use client';

import { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { FileDown, CheckCircle2 } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n';

export default function DocsBand({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <section ref={ref} className="band-navy py-20">
      <div className="container-page text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="eyebrow eyebrow--light">{dict.docsEyebrow}</span>
          <h2 className="mx-auto mt-5 max-w-[22ch] text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-white">{dict.docsTitle}</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/70">{dict.docsLead}</p>

          <div className="mx-auto mt-9 max-w-xl">
            {sent ? (
              <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/5 px-8 py-5 text-white">
                <CheckCircle2 size={20} className="shrink-0 text-white" />
                <p className="text-sm font-medium">{dict.docsSuccess}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.docsPlaceholder}
                  className="h-13 flex-1 rounded-[0.5rem] border border-white/25 bg-white/10 px-5 text-sm font-medium text-white placeholder:text-white/50 outline-none transition focus:border-white"
                />
                <button type="submit" className="btn btn-cta shrink-0">
                  <FileDown size={16} />
                  {dict.docsSubmit}
                </button>
              </form>
            )}
            <p className="mt-4 text-xs text-white/50">{dict.docsConsent}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}