'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(selectors: string[]) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      for (const selector of selectors) {
        const section = document.querySelector(selector);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            current = selector;
            break;
          }
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectors]);

  return active;
}
