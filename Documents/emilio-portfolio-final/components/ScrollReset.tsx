'use client';
import { useEffect } from 'react';

export default function ScrollReset() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0); // Al recargar, arranca siempre desde arriba
  }, []);

  return null;
}
