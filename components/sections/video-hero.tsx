'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { HeroVideoSources } from '@/lib/hero-video';
import { siteCopy } from '@/lib/site-copy';
import styles from './catalog.module.css';

export default function VideoHero({ dict, lang, videoSrc }: { dict: Dictionary; lang: Locale; videoSrc: HeroVideoSources | null }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const copy = siteCopy[lang];
  useEffect(() => {
    setFailed(false);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const applyPreference = () => {
      if (preference.matches || connection?.saveData) video.current?.pause();
      else video.current?.play().catch(() => setPlaying(false));
    };
    applyPreference();
    preference.addEventListener('change', applyPreference);
    return () => preference.removeEventListener('change', applyPreference);
  }, [videoSrc?.mp4]);
  const toggle = () => {
    if (!video.current) return;
    if (video.current.paused) video.current.play().catch(() => setPlaying(false));
    else video.current.pause();
  };
  return <section className={styles.filmHero} aria-labelledby="home-title">
    <Image src={videoSrc?.poster || '/extrusion-head.webp'} alt="" fill priority unoptimized className={styles.filmFallback} />
    {videoSrc && !failed && <video ref={video} className={styles.film} muted loop playsInline preload="none" poster={videoSrc.poster} aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}>
      <source src={videoSrc.webm} type="video/webm" /><source src={videoSrc.mp4} type="video/mp4" />
    </video>}
    <div className={styles.filmShade} aria-hidden />
    <div className={`${styles.container} ${styles.filmContent}`}>
      <p className={styles.filmEyebrow}>{copy.production}</p>
      <h1 id="home-title">{dict.heroTitle}</h1>
      <p>{dict.productionLead}</p>
      <div className={styles.buttonPair}>
        <Link className={styles.button} href={`/${lang}/oferta`}>{dict.aboutCtaOffer} <span aria-hidden>→</span></Link>
        <Link className={styles.outlineButton} href={`/${lang}/kontakt`}>{dict.cta} <span aria-hidden>↗</span></Link>
      </div>
    </div>
    <div className={`${styles.container} ${styles.filmBottom}`}>
      <a href="#sizes">{dict.heroSecondaryCta} <span aria-hidden>↓</span></a>
      {videoSrc && !failed ? <button type="button" className={styles.videoControl} onClick={toggle} aria-label={playing ? copy.pause : copy.play}>{playing ? 'Ⅱ' : '▶'} <span>{playing ? copy.pause : copy.play}</span></button> : <Link className={styles.fallbackCaption} href={`/${lang}/o-nas`}>{dict.navAbout} →</Link>}
    </div>
  </section>;
}
