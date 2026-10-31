import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface CountUpNumberProps {
  target: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  fallbackString?: string;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  target,
  decimals = 0,
  duration = 800,
  prefix = '',
  suffix = '',
  className = '',
  fallbackString,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(shouldReduceMotion ? target : 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrent(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const startVal = 0;

          const updateCounter = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic: 1 - pow(1 - progress, 3)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const nextVal = startVal + (target - startVal) * easeProgress;

            setCurrent(nextVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              setCurrent(target);
            }
          };

          requestAnimationFrame(updateCounter);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated, shouldReduceMotion]);

  if (fallbackString && shouldReduceMotion) {
    return <span className={className}>{prefix}{fallbackString}{suffix}</span>;
  }

  const formatted = decimals > 0
    ? current.toFixed(decimals)
    : Math.round(current).toLocaleString();

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
