'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { HeroVideoSources } from '@/lib/hero-video';

const EASE = [0.4, 0, 0.2, 1] as const;

export default function VideoHero({
  dict,
  lang,
  videoSrc,
}: {
  dict: Dictionary;
  lang: Locale;
  videoSrc: HeroVideoSources | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-navy-deep">
      {videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={videoSrc.poster}
          aria-hidden
        >
          <source src={videoSrc.webm} type="video/webm" />
          <source src={videoSrc.mp4} type="video/mp4" />
        </video>
      ) : null}

      <div className="hero-overlay" aria-hidden />

      {/* The headline and lead sit on the vertical centre of the viewport. The
          orange rule, the eyebrow and the two CTAs are gone: the header already
          carries the quote button, and the eyebrow repeated the headline. */}
      <div className="container-page relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="max-w-[46rem]"
        >
          <h1 className="text-white">{dict.heroTitle}</h1>

          <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/75">
            {dict.heroLead}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
