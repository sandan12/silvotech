'use client';

import Link from 'next/link';
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
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.75;
  }, [videoSrc]);

  const facts = [1, 2, 3, 4].map((i) => ({
    value: dict[`heroFact${i}Value`],
    label: dict[`heroFact${i}Label`],
  }));

  return (
    <>
      <section className="relative flex min-h-[38rem] items-end overflow-hidden bg-navy-deep pt-[7.5rem] lg:min-h-[78vh]">
        {videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={videoSrc.poster}
            disablePictureInPicture
            controlsList="nodownload noremoteplayback noplaybackrate"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={videoSrc.webm} type="video/webm" />
            <source src={videoSrc.mp4} type="video/mp4" />
          </video>
        )}

        <div className="hero-overlay" aria-hidden />

        <div className="container-page relative z-10 w-full pb-14 pt-10 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="max-w-[46rem]"
          >
            <span className="eyebrow eyebrow--light">{dict.heroEyebrow}</span>

            <h1 className="mt-4 text-white">{dict.heroTitle}</h1>

            <span className="mt-6 block h-[3px] w-14 rounded-full bg-orange" aria-hidden />

            <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/75">
              {dict.heroLead}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={`/${lang}/kontakt`} className="btn btn-cta">
                {dict.heroPrimaryCta}
              </Link>
              <Link href={`/${lang}/oferta`} className="btn btn-outline-light">
                {dict.heroSecondaryCta}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key numbers, pulled out of the hero so the video keeps its full frame. */}
      <section className="border-b border-white/10 bg-navy-deep">
        <div className="container-page grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className={`px-4 py-6 md:px-6 ${i > 1 ? 'border-t border-white/10 md:border-t-0' : ''}`}>
              <p className="font-display text-[1.6rem] font-bold leading-none text-white md:text-[1.9rem]">
                {f.value}
              </p>
              <p className="mt-2 font-mono text-[0.64rem] uppercase leading-tight tracking-[0.12em] text-white/45">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
