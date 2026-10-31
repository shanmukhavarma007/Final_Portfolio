import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export { motion, AnimatePresence, useReducedMotion };

// Standard ease curve and durations matching Silicon Observatory engineering aesthetic
export const transitionStandard = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const transitionQuick = {
  duration: 0.2,
  ease: 'easeOut' as const,
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionStandard,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionStandard,
  },
};

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  id,
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.section>
  );
};
