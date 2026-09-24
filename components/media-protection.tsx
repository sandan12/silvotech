'use client';
import { useEffect } from 'react';

export default function MediaProtection() {
  useEffect(() => {
    const isProtected = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest('[data-protected-media]'));
    const blockMenu = (event: MouseEvent) => { if (isProtected(event.target)) event.preventDefault(); };
    const blockDrag = (event: DragEvent) => { if (isProtected(event.target)) event.preventDefault(); };
    document.addEventListener('contextmenu', blockMenu);
    document.addEventListener('dragstart', blockDrag);
    return () => {
      document.removeEventListener('contextmenu', blockMenu);
      document.removeEventListener('dragstart', blockDrag);
    };
  }, []);
  return null;
}
