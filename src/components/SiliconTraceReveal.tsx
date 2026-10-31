/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type SiliconTraceVariant =
  | 'hero-to-cand'
  | 'cand-to-skills'
  | 'skills-to-cva6'
  | 'cva6-to-evidence'
  | 'evidence-to-aes'
  | 'aes-to-contact';

interface SiliconTraceRevealProps {
  variant: SiliconTraceVariant;
  label?: string;
  className?: string;
  id?: string;
}

export const SiliconTraceReveal: React.FC<SiliconTraceRevealProps> = ({
  variant,
  label,
  className = '',
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Animation timing configuration for precision technical sequencing
  const easeCurve = [0.16, 1, 0.3, 1] as const;

  if (variant === 'skills-to-cva6') {
    // ELABORATE FEATURED TRANSITION: Multi-tier M1/M2/M3 interconnect routing
    const displayLabel = label || 'STR-03 // PRIMARY SILICON INTERCONNECT // CVA6-CORE-BOUNDARY [M1/M2/M3] // PITCH: 0.14µm';

    return (
      <div
        id={id}
        className={`w-full py-2 my-2 select-none overflow-hidden relative ${className}`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between pb-1.5 text-[10px] font-technical uppercase text-[#757872] tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#536600]" />
            <span className="text-[#1b1c18] font-bold">{displayLabel}</span>
          </div>
          <span className="text-[#536600] font-bold hidden sm:inline-block">INNOVUS-GRID-ALIGNED</span>
        </div>

        <div className="w-full h-12 md:h-14 relative bg-[#f5f3ed]/60 border-y border-[#e2e0d7]">
          <svg
            viewBox="0 0 1200 56"
            className="w-full h-full block"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="cva6-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#cef053" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Substrate guide lines */}
            <path
              d="M 0,16 L 380,16 L 410,28 L 820,28 L 850,16 L 1200,16"
              stroke="#dedcd4"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 60,40 L 460,40 L 490,28 L 740,28 L 770,40 L 1140,40"
              stroke="#dedcd4"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 220,16 L 220,40 M 580,28 L 580,48 L 640,48 L 640,28 M 980,16 L 980,40 M 610,28 L 610,8 L 690,8"
              stroke="#dedcd4"
              strokeWidth="1"
              fill="none"
            />

            {/* M3 Primary Bus Path */}
            <motion.path
              d="M 0,16 L 380,16 L 410,28 L 820,28 L 850,16 L 1200,16"
              stroke="#536600"
              strokeWidth="1.5"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: easeCurve }}
            />

            {/* M2 Secondary Bus Path */}
            <motion.path
              d="M 60,40 L 460,40 L 490,28 L 740,28 L 770,40 L 1140,40"
              stroke="#8ea604"
              strokeWidth="1.25"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.0, delay: 0.2, ease: easeCurve }}
            />

            {/* Vertical Interconnect Vias & Doglegs */}
            <motion.path
              d="M 220,16 L 220,40 M 580,28 L 580,48 L 640,48 L 640,28 M 980,16 L 980,40 M 610,28 L 610,8 L 690,8"
              stroke="#536600"
              strokeWidth="1.2"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.45, ease: easeCurve }}
            />

            {/* Sequentially Illuminating Connection Nodes (Vias) */}
            {[
              { cx: 220, cy: 16, delay: 0.35 },
              { cx: 220, cy: 40, delay: 0.5 },
              { cx: 410, cy: 28, delay: 0.6 },
              { cx: 580, cy: 28, delay: 0.7 },
              { cx: 610, cy: 28, delay: 0.75, heroGlow: true },
              { cx: 640, cy: 48, delay: 0.8 },
              { cx: 690, cy: 8, delay: 0.85 },
              { cx: 740, cy: 28, delay: 0.9 },
              { cx: 850, cy: 16, delay: 0.95 },
              { cx: 980, cy: 16, delay: 1.0 },
              { cx: 980, cy: 40, delay: 1.05 },
            ].map((node, i) => (
              <g key={`cva6-node-${i}`}>
                {/* Outer via pad */}
                <motion.rect
                  x={node.cx - 3.5}
                  y={node.cy - 3.5}
                  width={7}
                  height={7}
                  stroke="#536600"
                  strokeWidth="1"
                  fill="#ffffff"
                  initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.25, delay: node.delay }}
                />
                {/* Inner illuminated core with subtle lime glow */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={2}
                  fill="#cef053"
                  filter={node.heroGlow ? 'url(#cva6-glow)' : undefined}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0.85] }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: node.delay + 0.1 }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'hero-to-cand') {
    const displayLabel = label || 'STR-01 // M1-CANDIDATE-TRUNK // CLK-GATE-PAD // 0.28µm PITCH';

    return (
      <div
        id={id}
        className={`w-full py-1.5 my-1.5 select-none overflow-hidden relative ${className}`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between pb-1 text-[9px] font-technical uppercase text-[#757872]">
          <span className="font-bold text-[#1b1c18]">{displayLabel}</span>
          <span className="text-[#536600]">CONNECT: HERO → CANDIDATE</span>
        </div>

        <div className="w-full h-8 relative bg-[#f5f3ed]/40 border-y border-[#e6e4dc]">
          <svg
            viewBox="0 0 1000 32"
            className="w-full h-full block"
            preserveAspectRatio="none"
          >
            {/* Guide line */}
            <path
              d="M 0,16 L 1000,16 M 320,16 L 320,6 L 460,6 M 680,16 L 680,26 L 860,26"
              stroke="#dedcd4"
              strokeWidth="1"
              fill="none"
            />

            {/* Active Trace */}
            <motion.path
              d="M 0,16 L 1000,16"
              stroke="#536600"
              strokeWidth="1.25"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: easeCurve }}
            />
            <motion.path
              d="M 320,16 L 320,6 L 460,6 M 680,16 L 680,26 L 860,26"
              stroke="#8ea604"
              strokeWidth="1"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.3, ease: easeCurve }}
            />

            {/* Connection Nodes */}
            {[
              { cx: 320, cy: 16, delay: 0.3 },
              { cx: 460, cy: 6, delay: 0.5 },
              { cx: 680, cy: 16, delay: 0.6 },
              { cx: 860, cy: 26, delay: 0.75 },
            ].map((node, i) => (
              <g key={`h-cand-${i}`}>
                <motion.rect
                  x={node.cx - 3}
                  y={node.cy - 3}
                  width={6}
                  height={6}
                  stroke="#536600"
                  strokeWidth="1"
                  fill="#ffffff"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.2, delay: node.delay }}
                />
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={1.75}
                  fill="#cef053"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.25, delay: node.delay + 0.1 }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'cand-to-skills') {
    const displayLabel = label || 'STR-02 // M2-DISTRIBUTION-BUS // 4-WAY QUAD-TAP // SKILL-TELEMETRY';

    return (
      <div
        id={id}
        className={`w-full py-1.5 my-1.5 select-none overflow-hidden relative ${className}`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between pb-1 text-[9px] font-technical uppercase text-[#757872]">
          <span className="font-bold text-[#1b1c18]">{displayLabel}</span>
          <span className="text-[#536600]">TAP: CANDIDATE → SKILLS</span>
        </div>

        <div className="w-full h-8 relative bg-[#f5f3ed]/40 border-y border-[#e6e4dc]">
          <svg
            viewBox="0 0 1000 32"
            className="w-full h-full block"
            preserveAspectRatio="none"
          >
            {/* Guide line */}
            <path
              d="M 0,14 L 1000,14 M 125,14 L 125,28 M 375,14 L 375,28 M 625,14 L 625,28 M 875,14 L 875,28"
              stroke="#dedcd4"
              strokeWidth="1"
              fill="none"
            />

            {/* Main horizontal bus */}
            <motion.path
              d="M 0,14 L 1000,14"
              stroke="#536600"
              strokeWidth="1.25"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: easeCurve }}
            />

            {/* 4 Quadrant Taps */}
            <motion.path
              d="M 125,14 L 125,28 M 375,14 L 375,28 M 625,14 L 625,28 M 875,14 L 875,28"
              stroke="#8ea604"
              strokeWidth="1.2"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.35, ease: easeCurve }}
            />

            {/* Nodes at each junction and tap terminal */}
            {[
              { cx: 125, cy: 14, delay: 0.25 },
              { cx: 125, cy: 28, delay: 0.45 },
              { cx: 375, cy: 14, delay: 0.4 },
              { cx: 375, cy: 28, delay: 0.6 },
              { cx: 625, cy: 14, delay: 0.55 },
              { cx: 625, cy: 28, delay: 0.75 },
              { cx: 875, cy: 14, delay: 0.7 },
              { cx: 875, cy: 28, delay: 0.9 },
            ].map((node, i) => (
              <g key={`cand-skills-${i}`}>
                <motion.rect
                  x={node.cx - 3}
                  y={node.cy - 3}
                  width={6}
                  height={6}
                  stroke="#536600"
                  strokeWidth="1"
                  fill="#ffffff"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.2, delay: node.delay }}
                />
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={1.75}
                  fill="#cef053"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.2, delay: node.delay + 0.1 }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'cva6-to-evidence') {
    const displayLabel = label || 'STR-04 // EDA-TELEMETRY-TAP // DENSITY-MAP + NETLIST-VIS + GENUS-QOR // 3 CHANNELS';

    return (
      <div
        id={id}
        className={`w-full py-1.5 my-1.5 select-none overflow-hidden relative ${className}`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between pb-1 text-[9px] font-technical uppercase text-[#757872]">
          <span className="font-bold text-[#1b1c18]">{displayLabel}</span>
          <span className="text-[#536600]">TOPOGRAPHY → EVIDENCE</span>
        </div>

        <div className="w-full h-8 relative bg-[#f5f3ed]/40 border-y border-[#e6e4dc]">
          <svg
            viewBox="0 0 1000 32"
            className="w-full h-full block"
            preserveAspectRatio="none"
          >
            {/* Guide line */}
            <path
              d="M 0,16 L 300,16 L 330,8 L 670,8 L 700,16 L 1000,16 M 180,16 L 180,28 M 500,8 L 500,28 M 820,16 L 820,28"
              stroke="#dedcd4"
              strokeWidth="1"
              fill="none"
            />

            {/* Stepped trace */}
            <motion.path
              d="M 0,16 L 300,16 L 330,8 L 670,8 L 700,16 L 1000,16"
              stroke="#536600"
              strokeWidth="1.25"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: easeCurve }}
            />

            {/* 3 Evidence Drops */}
            <motion.path
              d="M 180,16 L 180,28 M 500,8 L 500,28 M 820,16 L 820,28"
              stroke="#8ea604"
              strokeWidth="1.2"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.35, ease: easeCurve }}
            />

            {/* Nodes */}
            {[
              { cx: 180, cy: 16, delay: 0.3 },
              { cx: 180, cy: 28, delay: 0.5 },
              { cx: 330, cy: 8, delay: 0.4 },
              { cx: 500, cy: 8, delay: 0.55 },
              { cx: 500, cy: 28, delay: 0.7 },
              { cx: 700, cy: 16, delay: 0.65 },
              { cx: 820, cy: 16, delay: 0.75 },
              { cx: 820, cy: 28, delay: 0.9 },
            ].map((node, i) => (
              <g key={`cva6-ev-${i}`}>
                <motion.rect
                  x={node.cx - 3}
                  y={node.cy - 3}
                  width={6}
                  height={6}
                  stroke="#536600"
                  strokeWidth="1"
                  fill="#ffffff"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.2, delay: node.delay }}
                />
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={1.75}
                  fill="#cef053"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.2, delay: node.delay + 0.1 }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'evidence-to-aes') {
    const displayLabel = label || 'STR-05 // AES-CORE-SYNTH-BUS // 1.0ns SDC CLK // RTL_HALFCYCLE_CROSSPATHS';

    return (
      <div
        id={id}
        className={`w-full py-1.5 my-1.5 select-none overflow-hidden relative ${className}`}
        aria-hidden="true"
      >
        <div className="flex items-center justify-between pb-1 text-[9px] font-technical uppercase text-[#757872]">
          <span className="font-bold text-[#1b1c18]">{displayLabel}</span>
          <span className="text-[#536600]">EVIDENCE → AES SYNTHESIS</span>
        </div>

        <div className="w-full h-8 relative bg-[#f5f3ed]/40 border-y border-[#e6e4dc]">
          <svg
            viewBox="0 0 1000 32"
            className="w-full h-full block"
            preserveAspectRatio="none"
          >
            {/* Guide line */}
            <path
              d="M 0,16 L 420,16 L 450,26 L 720,26 L 750,16 L 1000,16 M 420,16 L 420,6 L 560,6 L 560,16"
              stroke="#dedcd4"
              strokeWidth="1"
              fill="none"
            />

            {/* Active Trace */}
            <motion.path
              d="M 0,16 L 420,16 L 450,26 L 720,26 L 750,16 L 1000,16"
              stroke="#536600"
              strokeWidth="1.25"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.85, ease: easeCurve }}
            />
            <motion.path
              d="M 420,16 L 420,6 L 560,6 L 560,16"
              stroke="#8ea604"
              strokeWidth="1"
              fill="none"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.35, ease: easeCurve }}
            />

            {/* Nodes */}
            {[
              { cx: 420, cy: 16, delay: 0.3 },
              { cx: 450, cy: 26, delay: 0.45 },
              { cx: 560, cy: 6, delay: 0.55 },
              { cx: 720, cy: 26, delay: 0.7 },
              { cx: 750, cy: 16, delay: 0.85 },
            ].map((node, i) => (
              <g key={`ev-aes-${i}`}>
                <motion.rect
                  x={node.cx - 3}
                  y={node.cy - 3}
                  width={6}
                  height={6}
                  stroke="#536600"
                  strokeWidth="1"
                  fill="#ffffff"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.2, delay: node.delay }}
                />
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={1.75}
                  fill="#cef053"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.2, delay: node.delay + 0.1 }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    );
  }

  // Variant 6: aes-to-contact
  const displayLabel = label || 'STR-06 // I/O-PAD-RING // CONTACT-CHANNELS // VERIFIED-ENGINEERING-DOSSIER';

  return (
    <div
      id={id}
      className={`w-full py-1.5 my-1.5 select-none overflow-hidden relative ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between pb-1 text-[9px] font-technical uppercase text-[#757872]">
        <span className="font-bold text-[#1b1c18]">{displayLabel}</span>
        <span className="text-[#536600]">DIE BOUNDARY → I/O RING</span>
      </div>

      <div className="w-full h-8 relative bg-[#f5f3ed]/40 border-y border-[#e6e4dc]">
        <svg
          viewBox="0 0 1000 32"
          className="w-full h-full block"
          preserveAspectRatio="none"
        >
          {/* Guide line */}
          <path
            d="M 0,16 L 260,16 L 290,8 L 710,8 L 740,16 L 1000,16 M 290,8 L 290,26 M 500,8 L 500,26 M 710,8 L 710,26"
            stroke="#dedcd4"
            strokeWidth="1"
            fill="none"
          />

          {/* Active Trace */}
          <motion.path
            d="M 0,16 L 260,16 L 290,8 L 710,8 L 740,16 L 1000,16"
            stroke="#536600"
            strokeWidth="1.25"
            fill="none"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: easeCurve }}
          />

          {/* Drops to IO Bond Pads */}
          <motion.path
            d="M 290,8 L 290,26 M 500,8 L 500,26 M 710,8 L 710,26"
            stroke="#8ea604"
            strokeWidth="1"
            fill="none"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.35, ease: easeCurve }}
          />

          {/* Nodes & IO Pads */}
          {[
            { cx: 260, cy: 16, delay: 0.25 },
            { cx: 290, cy: 8, delay: 0.35 },
            { cx: 290, cy: 26, delay: 0.5 },
            { cx: 500, cy: 8, delay: 0.55 },
            { cx: 500, cy: 26, delay: 0.7 },
            { cx: 710, cy: 8, delay: 0.7 },
            { cx: 710, cy: 26, delay: 0.85 },
            { cx: 740, cy: 16, delay: 0.9 },
          ].map((node, i) => (
            <g key={`aes-contact-${i}`}>
              <motion.rect
                x={node.cx - 3.5}
                y={node.cy - 3.5}
                width={7}
                height={7}
                stroke="#536600"
                strokeWidth="1"
                fill="#ffffff"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.2, delay: node.delay }}
              />
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={1.75}
                fill="#cef053"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.2, delay: node.delay + 0.1 }}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
