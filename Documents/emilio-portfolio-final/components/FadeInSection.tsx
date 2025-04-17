'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FadeInSection({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
