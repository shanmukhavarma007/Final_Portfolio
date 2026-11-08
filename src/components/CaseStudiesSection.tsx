import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  BarChart3, 
  Sliders, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Clock, 
  Terminal, 
  Maximize2,
  FileText,
  TrendingDown,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Cva6PlacementOptimizationCaseStudy } from './Cva6PlacementOptimizationCaseStudy';
import { Cva6TimingVsDensityCaseStudy } from './Cva6TimingVsDensityCaseStudy';

interface CaseStudiesSectionProps {
  initialExpandedId?: string | null;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  initialExpandedId = 'cva6-placement-opt'
}) => {
  // State to track which case study is currently expanded for deep-dive exploration
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(initialExpandedId);

  const toggleCaseStudy = (id: string) => {
    setExpandedCaseStudy(prev => (prev === id ? null : id));
  };

  return (
    <section id="case-studies-section" className="space-y-8">
      {/* Section Header: 03 // CASE STUDIES */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#b7d83d] inline-block" />
          <h2 className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
            03 // CASE STUDIES
          </h2>
          <span className="text-[#c5c7c1]">·</span>
          <span className="font-technical text-xs text-[#536600] font-bold">
            [PHYSICAL DESIGN INVESTIGATIONS & EVIDENCE]
          </span>
          <span className="text-[#c5c7c1]">·</span>
          <span className="font-technical text-xs text-[#1b1c18] font-bold">
            CADENCE INNOVUS & GENUS
          </span>
        </div>
        <div className="flex items-center gap-2 font-technical text-xs text-[#757872]">
          <span className="bg-[#1b1c18] text-[#cef053] px-2 py-0.5 font-bold">
            28 nm PROCESS NODE
          </span>
          <span>EMPIRICAL EDA DATA</span>
        </div>
      </div>

      {/* Recruiter-First Executive Briefing Grid */}
      <div className="border border-[#d8d7ce] bg-[#ffffff] p-6 md:p-8">
        <div className="max-w-4xl space-y-3">
          <div className="flex items-center gap-2 font-technical text-xs text-[#536600] font-bold uppercase">
            <ShieldCheck className="w-4 h-4 text-[#536600]" />
            RECRUITER-FIRST EXECUTIVE SUMMARY // INVESTIGATION METHODOLOGY
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal leading-snug">
            Evidence-Backed Engineering Trade-Offs & Physical Design Decisions
          </h3>
          <p className="font-sans text-sm md:text-base text-[#454843] leading-relaxed">
            Direct access to quantitative experimental runs performed during CVA6 64-bit RISC-V implementation in Cadence Innovus on the 28 nm node. Rather than theoretical assumptions, each case study documents initial observations, measured EDA reports, iterative layout adjustments, and empirical decision criteria.
          </p>
        </div>

        {/* 6 Key Recruiter-First Questions At A Glance */}
        <div className="mt-6 pt-6 border-t border-[#d8d7ce] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-1.5">
            <div className="flex items-center gap-1.5 font-technical text-[11px] font-bold text-[#1b1c18] uppercase">
              <span className="w-1.5 h-1.5 bg-[#b7d83d]" />
              1. Problem Investigated
            </div>
            <p className="font-sans text-xs text-[#454843] leading-relaxed">
              Macro-channel routing congestion, vertical overflow hotspots (3059 overflow in baseline), and setup timing coupling prior to CTS.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-1.5">
            <div className="flex items-center gap-1.5 font-technical text-[11px] font-bold text-[#1b1c18] uppercase">
              <span className="w-1.5 h-1.5 bg-[#b7d83d]" />
              2. Design Decisions
            </div>
            <p className="font-sans text-xs text-[#454843] leading-relaxed">
              Resized core boundary to 950 × 916 µm, widened central macro corridor by +5 µm, and tuned placement optimization efforts.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-1.5">
            <div className="flex items-center gap-1.5 font-technical text-[11px] font-bold text-[#1b1c18] uppercase">
              <span className="w-1.5 h-1.5 bg-[#b7d83d]" />
              3. Experiments Run
            </div>
            <p className="font-sans text-xs text-[#454843] leading-relaxed">
              4 iterative CAD runs: Aspect ratio adjustment, effort tuning, macro-channel spacing expansion, and soft-blockage/clock repeater trial.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-1.5">
            <div className="flex items-center gap-1.5 font-technical text-[11px] font-bold text-[#1b1c18] uppercase">
              <span className="w-1.5 h-1.5 bg-[#b7d83d]" />
              4. Evidence & Reports
            </div>
            <p className="font-sans text-xs text-[#454843] leading-relaxed">
              Measured Cadence Innovus congestion tables (H & V overflow), setup WNS (-0.483 ns) & TNS reports, and Genus synthesis baselines.
            </p>
          </div>

          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-1.5">
            <div className="flex items-center gap-1.5 font-technical text-[11px] font-bold text-[#1b1c18] uppercase">
              <span className="w-1.5 h-1.5 bg-[#b7d83d]" />
              5. Key Engineering Learning
            </div>
            <p className="font-sans text-xs text-[#454843] leading-relaxed">
              Congestion cannot be isolated from timing: overly aggressive blockages (Run 4) forced cells into dense clusters, increasing overflow to 3332.
            </p>
          </div>

          <div className="p-4 bg-[#1b1c18] text-[#fbf9f3] border border-[#1b1c18] space-y-1.5">
            <div className="flex items-center gap-1.5 font-technical text-[11px] font-bold text-[#cef053] uppercase">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#cef053]" />
              6. Selected Implementation
            </div>
            <p className="font-sans text-xs text-[#c5c7be] leading-relaxed">
              <strong className="text-[#ffffff]">Run 3</strong> selected with lowest total overflow (2903) and lowest horizontal overflow (306, 0.11%), saved at <code className="text-[#cef053] font-technical">cva6_fp1.db</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Case Studies Presentation List */}
      <div className="space-y-6">
        {/* CASE STUDY 01: CVA6 Placement Optimization (Primary Feature) */}
        <div className="border border-[#1b1c18] bg-[#ffffff] transition-all">
          {/* Card Header & Teaser Strip */}
          <div className="p-6 md:p-8 bg-[#ffffff] border-b border-[#d8d7ce]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-2 font-technical text-xs">
                <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold">
                  CASE STUDY 01
                </span>
                <span className="text-[#757872] uppercase">
                  ENGINEERING CASE STUDY // CVA6-02
                </span>
                <span className="text-[#c5c7c1]">·</span>
                <span className="text-[#536600] font-bold uppercase">
                  SELECTED DATABASE: RUN 3
                </span>
              </div>
              <div className="flex items-center gap-2 font-technical text-xs text-[#757872]">
                <span>CADENCE INNOVUS</span>
                <span>·</span>
                <span>28 nm</span>
                <span>·</span>
                <span>1.5 ns CLOCK</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-2">
                <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal leading-tight">
                  CVA6 Placement Optimization: Congestion, Timing & Physical Design Trade-offs
                </h3>
                <p className="font-sans text-sm md:text-base text-[#454843] leading-relaxed">
                  An iterative investigation into floorplan geometry, macro-channel spacing, placement congestion, and clock-path optimization across four experimental runs.
                </p>

                {/* Key Metrics Quick Ribbon */}
                <div className="pt-2 flex flex-wrap items-center gap-3 font-technical text-xs">
                  <div className="px-2.5 py-1 bg-[#f5f3ed] border border-[#d8d7ce] flex items-center gap-1.5">
                    <span className="text-[#757872]">Lowest Total Overflow:</span>
                    <strong className="text-[#1b1c18]">2903 (Run 3)</strong>
                  </div>
                  <div className="px-2.5 py-1 bg-[#f5f3ed] border border-[#d8d7ce] flex items-center gap-1.5">
                    <span className="text-[#757872]">Horizontal Overflow:</span>
                    <strong className="text-[#536600]">306 (0.11%)</strong>
                  </div>
                  <div className="px-2.5 py-1 bg-[#f5f3ed] border border-[#d8d7ce] flex items-center gap-1.5">
                    <span className="text-[#757872]">Die Dimensions:</span>
                    <strong className="text-[#1b1c18]">950 × 916 µm</strong>
                  </div>
                  <div className="px-2.5 py-1 bg-[#f5f3ed] border border-[#d8d7ce] flex items-center gap-1.5">
                    <span className="text-[#757872]">Macro Channel Spacing:</span>
                    <strong className="text-[#1b1c18]">+5 µm Corridor</strong>
                  </div>
                </div>
              </div>

              {/* Action Button: Explore Case Study */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full space-y-3">
                <button
                  onClick={() => toggleCaseStudy('cva6-placement-opt')}
                  className="w-full sm:w-auto px-5 py-3 bg-[#1b1c18] hover:bg-[#2c3029] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#1b1c18]"
                >
                  <span>
                    {expandedCaseStudy === 'cva6-placement-opt'
                      ? '[ COLLAPSE CASE STUDY ▲ ]'
                      : '[ EXPLORE CASE STUDY → ]'}
                  </span>
                  {expandedCaseStudy === 'cva6-placement-opt' ? (
                    <ChevronUp className="w-4 h-4 text-[#cef053]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#cef053]" />
                  )}
                </button>
                <span className="font-technical text-[11px] text-[#757872]">
                  {expandedCaseStudy === 'cva6-placement-opt'
                    ? 'Interactive timeline, SVG charts & Tcl console open'
                    : 'Click to expand 7-section deep dive & live data'}
                </span>
              </div>
            </div>
          </div>

          {/* Expandable Technical Deep-Dive: Cva6PlacementOptimizationCaseStudy */}
          <AnimatePresence>
            {expandedCaseStudy === 'cva6-placement-opt' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden p-4 md:p-6 bg-[#fbf9f3]"
              >
                <Cva6PlacementOptimizationCaseStudy />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CASE STUDY 02: Timing vs. Cell Density */}
        <div className="border border-[#d8d7ce] bg-[#ffffff] transition-all">
          <div className="p-6 md:p-8 bg-[#ffffff] border-b border-[#d8d7ce]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-2 font-technical text-xs">
                <span className="px-2 py-0.5 bg-[#e9e7df] text-[#1b1c18] font-bold border border-[#d8d7ce]">
                  CASE STUDY 02
                </span>
                <span className="text-[#757872] uppercase">
                  ENGINEERING DECISIONS // CVA6-01
                </span>
                <span className="text-[#c5c7c1]">·</span>
                <span className="text-[#536600] font-bold uppercase">
                  TIMING-DRIVEN PLACEMENT PRIORITIES
                </span>
              </div>
              <div className="flex items-center gap-2 font-technical text-xs text-[#757872]">
                <span>CADENCE INNOVUS</span>
                <span>·</span>
                <span>STANDARD-CELL PLACEMENT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-2">
                <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal leading-tight">
                  Timing vs. Cell Density: Balancing Placement Slack & Physical Routing
                </h3>
                <p className="font-sans text-sm md:text-base text-[#454843] leading-relaxed">
                  Balancing timing-driven placement priorities against local cell density and physical routing resources. Investigates setup critical paths (-0.483 ns WNS) and congestion trade-offs.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3 font-technical text-xs">
                  <div className="px-2.5 py-1 bg-[#f5f3ed] border border-[#d8d7ce] flex items-center gap-1.5">
                    <span className="text-[#757872]">Setup WNS:</span>
                    <strong className="text-[#1b1c18]">-0.483 ns</strong>
                  </div>
                  <div className="px-2.5 py-1 bg-[#f5f3ed] border border-[#d8d7ce] flex items-center gap-1.5">
                    <span className="text-[#757872]">Setup TNS:</span>
                    <strong className="text-[#1b1c18]">-2035.472 ns</strong>
                  </div>
                  <div className="px-2.5 py-1 bg-[#f5f3ed] border border-[#d8d7ce] flex items-center gap-1.5">
                    <span className="text-[#757872]">Target Clock:</span>
                    <strong className="text-[#536600]">1.5 ns (~666.67 MHz)</strong>
                  </div>
                </div>
              </div>

              {/* Action Button: Explore Case Study */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full space-y-3">
                <button
                  onClick={() => toggleCaseStudy('cva6-timing-density')}
                  className="w-full sm:w-auto px-5 py-3 bg-[#1b1c18] hover:bg-[#2c3029] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#1b1c18]"
                >
                  <span>
                    {expandedCaseStudy === 'cva6-timing-density'
                      ? '[ COLLAPSE CASE STUDY ▲ ]'
                      : '[ EXPLORE CASE STUDY → ]'}
                  </span>
                  {expandedCaseStudy === 'cva6-timing-density' ? (
                    <ChevronUp className="w-4 h-4 text-[#cef053]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#cef053]" />
                  )}
                </button>
                <span className="font-technical text-[11px] text-[#757872]">
                  {expandedCaseStudy === 'cva6-timing-density'
                    ? 'Timing analysis & density topography open'
                    : 'Click to explore setup paths & DRV trade-offs'}
                </span>
              </div>
            </div>
          </div>

          {/* Expandable Technical Deep-Dive: Cva6TimingVsDensityCaseStudy */}
          <AnimatePresence>
            {expandedCaseStudy === 'cva6-timing-density' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden p-4 md:p-6 bg-[#fbf9f3]"
              >
                <Cva6TimingVsDensityCaseStudy />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
