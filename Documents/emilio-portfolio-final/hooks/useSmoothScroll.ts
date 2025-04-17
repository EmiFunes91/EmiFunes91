'use client';

import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName !== 'A') return;
      const anchor = target.closest('a') as HTMLAnchorElement;
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        event.preventDefault();
        const id = anchor.getAttribute('href')!.substring(1);
        const section = document.getElementById(id);
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};

