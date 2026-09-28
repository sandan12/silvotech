'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideoMedia() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      if (!video.current) return;
      if (preference.matches) video.current.pause();
      else video.current.play().catch(() => { /* The poster remains visible if playback is blocked. */ });
    };
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  return <video ref={video} className="hero-video-media" muted loop playsInline preload="metadata" poster="/media-new/silvotech-hero-poster.jpg" aria-hidden="true" tabIndex={-1}>
    <source src="/media-new/silvotech-hero.mp4" type="video/mp4" />
  </video>;
}
