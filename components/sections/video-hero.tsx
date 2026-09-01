'use client';

import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { HeroVideoSources } from '@/lib/hero-video';

export default function VideoHero({
  dict,
  lang,
  videoSrc,
}: {
  dict: Dictionary;
  lang: Locale;
  videoSrc: HeroVideoSources | null;
}) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.75;
  }, [videoSrc]);

  return (
    <section ref={ref} className="relative flex min-h-[94vh] items-center overflow-hidden bg-navy pt-[7.5rem]">
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

      <div className="hero-overlay absolute inset-0" aria-hidden />

      <div className="container-page relative z-10 py-24 text-center md:py-28">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="eyebrow eyebrow--light"
        >
          {dict.heroEyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-5 max-w-[20ch] text-[clamp(2rem,4.8vw,3.4rem)] font-bold leading-[1.12] text-white"
        >
          {dict.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
        >
          {dict.heroLead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={`/${lang}/kontakt`} className="btn btn-cta">
            {dict.heroPrimaryCta}
          </Link>
          <Link href={`/${lang}/oferta`} className="btn btn-outline-light">
            {dict.heroSecondaryCta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}