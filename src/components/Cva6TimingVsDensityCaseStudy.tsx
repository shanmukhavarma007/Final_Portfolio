import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  GitCommit,
  Split,
  Eye,
  FileCheck,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CaseStudyEvidence {
  id: string;
  tag: string;
  badge: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  aspectDesc: string;
  notes: string;
}

const EVIDENCE_A: CaseStudyEvidence = {
  id: 'cva6-density-map',
  tag: 'EVIDENCE A // SPATIAL CAD ARTIFACT',
  badge: 'CADENCE INNOVUS DENSITY MAP',
  title: 'Placement Density Distribution',
  caption: 'Placement Density Distribution — Visualizing the spatial distribution of standard cells across the macro-dominated CVA6 floorplan.',
  src: '/assets/aistudio/image_0120688a.png',
  alt: 'Cadence Innovus placement density visualization of the CVA6 floorplan showing standard cell clustering between SRAM macros',
  aspectDesc: 'Spatial standard-cell placement density topography across core channels and macro peripheries',
  notes: 'Authentic Innovus GUI density heat map. Colors provide qualitative spatial clustering indicators without fictitious numerical percentages.'
};

const EVIDENCE_B: CaseStudyEvidence = {
  id: 'cva6-timing-drv-report',
  tag: 'EVIDENCE B // TELEMETRY TERMINAL REPORT',
  badge: 'INNOVUS TIMING & DRV REPORT',
  title: 'Placement-Stage Timing & DRV Report',
  caption: 'Placement-Stage Timing & Design Rule Summary — Capturing setup timing and electrical design-rule conditions.',
  src: '/assets/aistudio/image_23509f50.png',
  alt: 'Cadence Innovus terminal report showing setup timing slack, path group breakdown, electrical DRVs, and clock checks',
  aspectDesc: 'Direct terminal log output showing setup timing WNS/TNS, DRVs, and clock checks at standard-cell placement stage',
  notes: 'Authentic Cadence Innovus terminal dump. All slack numbers reflect pre-CTS standard-cell placement state.'
};

export const Cva6TimingVsDensityCaseStudy: React.FC = () => {
  const [activeModalItem, setActiveModalItem] = useState<CaseStudyEvidence | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'all' | 'setup' | 'drv' | 'clock'>('all');

  // Handle escape key to dismiss lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
        setZoomScale(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openLightbox = (item: CaseStudyEvidence) => {
    setActiveModalItem(item);
    setZoomScale(1);
  };

  const closeLightbox = () => {
    setActiveModalItem(null);
    setZoomScale(1);
  };

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff] divide-y divide-[#d8d7ce] font-sans">
      {/* 1. Case Study Identity Header */}
      <div className="p-6 md:p-8 bg-[#fbf9f3] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-technical uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#b7d83d] inline-block" />
            <span className="font-bold text-[#1b1c18]">
              ENGINEERING DECISIONS // CVA6-01
            </span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#536600] font-bold">
              CADENCE INNOVUS IMPLEMENTATION
            </span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-[#ffffff] border border-[#d8d7ce] text-[11px] font-bold text-[#1b1c18]">
            <Scale className="w-3.5 h-3.5 text-[#536600]" />
            <span>TRADE-OFF CASE STUDY</span>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1b1c18] font-normal tracking-tight">
            Timing vs. Cell Density
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#454843] max-w-3xl leading-relaxed">
            Balancing timing-driven placement priorities against local cell density and physical routing resources.
          </p>
        </div>

        {/* Telemetry pill metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-[#d8d7ce] text-xs font-technical">
          <div className="p-2.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="text-[#757872] block text-[10px] uppercase">PROJECT</span>
            <span className="font-bold text-[#1b1c18]">CVA6 RISC-V CORE</span>
          </div>
          <div className="p-2.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="text-[#536600] block text-[10px] uppercase font-bold">PROCESS TECHNOLOGY</span>
            <span className="font-bold text-[#1b1c18] text-sm">28 nm</span>
          </div>
          <div className="p-2.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="text-[#757872] block text-[10px] uppercase">EDA TOOL</span>
            <span className="font-bold text-[#536600]">Cadence Innovus</span>
          </div>
          <div className="p-2.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="text-[#757872] block text-[10px] uppercase">IMPLEMENTATION STAGE</span>
            <span className="font-bold text-[#1b1c18]">Std-Cell Placement</span>
          </div>
          <div className="p-2.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="text-[#757872] block text-[10px] uppercase">STATUS</span>
            <span className="font-bold text-[#536600]">Pre-CTS Completed</span>
          </div>
        </div>
      </div>

      {/* 2. Engineering Challenge: The Competing Objectives */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
          <div className="flex items-center gap-2 font-technical text-xs">
            <span className="text-[#757872] font-bold">01 // THE PROBLEM</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#1b1c18] font-bold uppercase">Competing Objectives in Standard-Cell Placement</span>
          </div>
          <span className="font-technical text-[11px] text-[#757872] uppercase hidden sm:inline">
            PHYSICAL VS. ELECTRICAL FORCES
          </span>
        </div>

        {/* Prominent Technology Context 28 nm Callout */}
        <div className="p-3.5 bg-[#f5f3ed] border-l-4 border-l-[#536600] border-y border-r border-[#d8d7ce] flex flex-wrap items-center justify-between gap-3 text-xs font-technical">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold text-[11px] uppercase tracking-wider">
              TECHNOLOGY CONTEXT: 28 nm
            </span>
            <span className="text-[#1b1c18] font-semibold">
              Balancing standard-cell placement density and interconnect wire delay within 28 nm design rules.
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#757872]">
            <span>TOOL: Cadence Innovus</span>
            <span>·</span>
            <span>CLOCK: 1.5 ns (~666.67 MHz)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Objective 1: Timing */}
          <div className="p-5 border border-[#d8d7ce] bg-[#fbf9f3] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
              <span className="font-technical text-xs font-bold uppercase text-[#1b1c18] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#536600]" />
                Timing Objective
              </span>
              <span className="font-technical text-[10px] text-[#536600] font-bold px-1.5 py-0.5 bg-[#ffffff] border border-[#d8d7ce]">
                ELECTRICAL PRIORITY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#454843] leading-relaxed">
              Pull timing-critical cells close together to reduce interconnect wire length and minimize resistive-capacitive wire delay along high-slack-impact critical paths.
            </p>
            <ul className="text-xs text-[#454843] space-y-1.5 pt-1">
              <li className="flex items-start gap-1.5">
                <span className="font-technical text-[#536600] font-bold select-none">&bull;</span>
                <span>Directly targets Worst Negative Slack (WNS) and Total Negative Slack (TNS) reduction.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-technical text-[#536600] font-bold select-none">&bull;</span>
                <span>Optimizes high-frequency synchronous communication across execution units.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-technical text-[#536600] font-bold select-none">&bull;</span>
                <span>Tightens register-to-register (r2r) and macro interface (m2r/r2m) paths.</span>
              </li>
            </ul>
          </div>

          {/* Objective 2: Cell Density */}
          <div className="p-5 border border-[#d8d7ce] bg-[#fbf9f3] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
              <span className="font-technical text-xs font-bold uppercase text-[#1b1c18] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#1b1c18]" />
                Cell Density Objective
              </span>
              <span className="font-technical text-[10px] text-[#757872] font-bold px-1.5 py-0.5 bg-[#ffffff] border border-[#d8d7ce]">
                ROUTABILITY PRIORITY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#454843] leading-relaxed">
              Distribute standard cells evenly across the available core area to avoid localized congestion hotspots, preserve routing tracks, and ensure clean pin access.
            </p>
            <ul className="text-xs text-[#454843] space-y-1.5 pt-1">
              <li className="flex items-start gap-1.5">
                <span className="font-technical text-[#1b1c18] font-bold select-none">&bull;</span>
                <span>Guarantees sufficient routing tracks remain open for downstream metal layers.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-technical text-[#1b1c18] font-bold select-none">&bull;</span>
                <span>Prevents pin access blockage and short circuits around macro boundaries.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-technical text-[#1b1c18] font-bold select-none">&bull;</span>
                <span>Maintains uniform thermal and power dissipation across the die.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The Fundamental Conflict & Crucial Distinction */}
        <div className="p-4 bg-[#1b1c18] text-[#fbf9f3] border border-[#1b1c18] space-y-3">
          <div className="flex items-center gap-2 text-xs font-technical text-[#cef053] font-bold uppercase">
            <Split className="w-4 h-4" />
            <span>The Engineering Conflict: Local Hotspots vs. Overall Core Utilization</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
            <p className="md:col-span-8 text-[#d8d7ce] leading-relaxed">
              Improving timing inevitably induces local cell density spikes as the placer draws critical logic gates into tight clusters. Conversely, aggressively spreading cells to relieve congestion extends net lengths, sharply increasing wire delays and degrading setup slacks.
            </p>
            <div className="md:col-span-4 p-3 bg-[#252a26] border border-[#3b423c] font-technical text-[11px] text-[#cef053]">
              <span className="font-bold block uppercase text-[#fbf9f3] mb-1">CRITICAL DISTINCTION</span>
              An acceptable overall core utilization metric (e.g. ~65%) does not prevent severe localized congestion between or around SRAM macros.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Actual Engineering Decision (Verbatim & Honest) */}
      <div className="p-6 md:p-8 bg-[#f5f3ed] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
          <div className="flex items-center gap-2 font-technical text-xs">
            <span className="text-[#757872] font-bold">02 // DECISION STATEMENT</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#536600] font-bold uppercase">Engineering Stance & Boundary</span>
          </div>
          <span className="font-technical text-[10px] text-[#536600] font-bold px-2 py-0.5 bg-[#ffffff] border border-[#d8d7ce]">
            STRICT FACTUAL INTEGRITY
          </span>
        </div>

        <div className="p-5 bg-[#ffffff] border-l-4 border-l-[#536600] border-y border-r border-[#d8d7ce] shadow-sm">
          <div className="font-serif italic text-base sm:text-lg text-[#1b1c18] leading-relaxed">
            &ldquo;During CVA6 placement, I prioritized timing-oriented implementation while considering the corresponding impact on standard-cell density distribution. This involved balancing critical-cell proximity and timing optimization against the available placement and routing resources.&rdquo;
          </div>
          <div className="mt-3 flex items-center gap-2 font-technical text-xs text-[#757872]">
            <span className="text-[#536600] font-bold">— Shanmukha Varma Penmetsa</span>
            <span>/</span>
            <span>Cadence Innovus Placement Logbook</span>
          </div>
        </div>

        {/* Explicit Honest Guardrails */}
        <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] text-xs">
          <div className="font-technical font-bold text-[#1b1c18] uppercase text-[11px] flex items-center gap-1.5 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#536600]" />
            Strict Factual Boundaries of this Case Study
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[#454843]">
            <div className="p-2 bg-[#ffffff] border border-[#e0dfd6]">
              <span className="font-technical text-[#757872] block font-bold text-[10px]">[NO CLAIM]</span>
              Complete timing closure is not claimed; placement is pre-CTS.
            </div>
            <div className="p-2 bg-[#ffffff] border border-[#e0dfd6]">
              <span className="font-technical text-[#757872] block font-bold text-[10px]">[NO CLAIM]</span>
              Total congestion elimination is not claimed prior to routing.
            </div>
            <div className="p-2 bg-[#ffffff] border border-[#e0dfd6]">
              <span className="font-technical text-[#757872] block font-bold text-[10px]">[NO CLAIM]</span>
              No unmeasured percentage improvements (e.g. no "reduced WNS by 15%").
            </div>
            <div className="p-2 bg-[#ffffff] border border-[#e0dfd6]">
              <span className="font-technical text-[#757872] block font-bold text-[10px]">[NO CLAIM]</span>
              Tapeout readiness is not claimed; post-route sign-off not reached.
            </div>
          </div>
        </div>
      </div>

      {/* 4. Original Engineering Evidence (The 2 Uploaded Screenshots) */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#d8d7ce]">
          <div className="flex items-center gap-2 font-technical text-xs">
            <span className="text-[#757872] font-bold">03 // ENGINEERING EVIDENCE</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#1b1c18] font-bold uppercase">Original Cadence Innovus Artifacts</span>
          </div>
          <span className="font-technical text-[11px] text-[#536600] font-bold">
            2 AUTHENTIC SCREENSHOTS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* EVIDENCE A: Placement Density Visualization */}
          <div className="border border-[#d8d7ce] bg-[#fbf9f3] flex flex-col">
            <div className="p-3.5 bg-[#ffffff] border-b border-[#d8d7ce] flex items-center justify-between">
              <div>
                <span className="font-technical text-[10px] text-[#536600] font-bold uppercase block">
                  {EVIDENCE_A.tag}
                </span>
                <span className="font-serif text-base font-normal text-[#1b1c18]">
                  {EVIDENCE_A.title}
                </span>
              </div>
              <button
                onClick={() => openLightbox(EVIDENCE_A)}
                className="px-2.5 py-1 bg-[#1b1c18] hover:bg-[#333833] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase flex items-center gap-1 cursor-pointer transition-colors"
                title="Inspect Full-Resolution Density Map"
              >
                <Maximize2 className="w-3 h-3 text-[#cef053]" />
                <span className="hidden sm:inline">EXPAND</span>
              </button>
            </div>

            {/* Clickable Image Preview */}
            <div 
              onClick={() => openLightbox(EVIDENCE_A)}
              className="bg-[#0b0d0c] relative group cursor-pointer overflow-hidden flex items-center justify-center p-2 min-h-[360px] md:min-h-[420px]"
            >
              <img
                src={EVIDENCE_A.src}
                alt={EVIDENCE_A.alt}
                className="max-h-[380px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[#000000]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-3 py-1.5 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-xs font-bold uppercase flex items-center gap-1.5 shadow-lg">
                  <Eye className="w-3.5 h-3.5" />
                  <span>CLICK TO INSPECT FULL RESOLUTION (643 × 616)</span>
                </span>
              </div>
            </div>

            {/* Caption & Spatial Observations */}
            <div className="p-4 space-y-3 text-xs">
              <p className="font-serif italic text-sm text-[#1b1c18] border-b border-[#d8d7ce] pb-2">
                &ldquo;{EVIDENCE_A.caption}&rdquo;
              </p>

              <div>
                <span className="font-technical font-bold text-[#1b1c18] uppercase text-[11px] block mb-1.5">
                  Spatial Observations from Innovus Heat Map:
                </span>
                <ul className="space-y-1.5 text-[#454843]">
                  <li className="flex items-start gap-1.5">
                    <span className="w-2 h-2 mt-1 rounded-full bg-[#ffffff] border border-[#1b1c18] shrink-0" />
                    <span>
                      <strong className="text-[#1b1c18]">High Concentration (White / Pink):</strong> High local cell density clustered in the central vertical channel between macro arrays.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-2 h-2 mt-1 rounded-full bg-[#facc15] shrink-0" />
                    <span>
                      <strong className="text-[#1b1c18]">Moderate Density (Yellow / Green):</strong> Balanced cell distribution across logic channels and boundary perimeters.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-2 h-2 mt-1 rounded-full bg-[#3b82f6] shrink-0" />
                    <span>
                      <strong className="text-[#1b1c18]">Sparse Regions (Blue):</strong> Low standard-cell utilization along outer chip perimeters and macro halos.
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="font-technical text-[#536600] font-bold select-none">&bull;</span>
                    <span>
                      <strong className="text-[#1b1c18]">Macro Boundary Density:</strong> Standard cells pack tightly against SRAM macro edges to access memory interface pins.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-2.5 bg-[#ffffff] border border-[#d8d7ce] font-technical text-[11px] text-[#757872]">
                <strong className="text-[#536600]">Technical Note:</strong> The density map is evaluated as a qualitative spatial indicator. No arbitrary percentage ranges are fabricated beyond what Cadence Innovus displays.
              </div>
            </div>
          </div>

          {/* EVIDENCE B: Placement-Stage Timing and DRV Report */}
          <div className="border border-[#d8d7ce] bg-[#fbf9f3] flex flex-col">
            <div className="p-3.5 bg-[#ffffff] border-b border-[#d8d7ce] flex items-center justify-between">
              <div>
                <span className="font-technical text-[10px] text-[#536600] font-bold uppercase block">
                  {EVIDENCE_B.tag}
                </span>
                <span className="font-serif text-base font-normal text-[#1b1c18]">
                  {EVIDENCE_B.title}
                </span>
              </div>
              <button
                onClick={() => openLightbox(EVIDENCE_B)}
                className="px-2.5 py-1 bg-[#1b1c18] hover:bg-[#333833] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase flex items-center gap-1 cursor-pointer transition-colors"
                title="Inspect Full-Resolution Timing Report"
              >
                <Maximize2 className="w-3 h-3 text-[#cef053]" />
                <span className="hidden sm:inline">EXPAND</span>
              </button>
            </div>

            {/* Clickable Terminal Preview */}
            <div 
              onClick={() => openLightbox(EVIDENCE_B)}
              className="bg-[#0b0d0c] relative group cursor-pointer overflow-hidden flex items-center justify-center p-2 min-h-[360px] md:min-h-[420px]"
            >
              <img
                src={EVIDENCE_B.src}
                alt={EVIDENCE_B.alt}
                className="max-h-[380px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[#000000]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-3 py-1.5 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-xs font-bold uppercase flex items-center gap-1.5 shadow-lg">
                  <Eye className="w-3.5 h-3.5" />
                  <span>CLICK TO INSPECT FULL RESOLUTION (909 × 835)</span>
                </span>
              </div>
            </div>

            {/* Caption & Exact Verifiable Data Extract */}
            <div className="p-4 space-y-3 text-xs">
              <p className="font-serif italic text-sm text-[#1b1c18] border-b border-[#d8d7ce] pb-2">
                &ldquo;{EVIDENCE_B.caption}&rdquo;
              </p>

              {/* Exact Report Tab Navigation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-technical font-bold text-[#1b1c18] uppercase text-[11px]">
                    Exact Measured Telemetry from Innovus:
                  </span>
                  <div className="flex gap-1 font-technical text-[10px]">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-1.5 py-0.5 border cursor-pointer ${
                        activeTab === 'all'
                          ? 'bg-[#1b1c18] text-[#cef053] border-[#1b1c18]'
                          : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce]'
                      }`}
                    >
                      ALL
                    </button>
                    <button
                      onClick={() => setActiveTab('setup')}
                      className={`px-1.5 py-0.5 border cursor-pointer ${
                        activeTab === 'setup'
                          ? 'bg-[#1b1c18] text-[#cef053] border-[#1b1c18]'
                          : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce]'
                      }`}
                    >
                      SETUP
                    </button>
                    <button
                      onClick={() => setActiveTab('drv')}
                      className={`px-1.5 py-0.5 border cursor-pointer ${
                        activeTab === 'drv'
                          ? 'bg-[#1b1c18] text-[#cef053] border-[#1b1c18]'
                          : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce]'
                      }`}
                    >
                      DRV
                    </button>
                    <button
                      onClick={() => setActiveTab('clock')}
                      className={`px-1.5 py-0.5 border cursor-pointer ${
                        activeTab === 'clock'
                          ? 'bg-[#1b1c18] text-[#cef053] border-[#1b1c18]'
                          : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce]'
                      }`}
                    >
                      CLOCK
                    </button>
                  </div>
                </div>

                {/* Tabbed Report Table */}
                <div className="bg-[#121413] text-[#fbf9f3] p-3 font-technical text-[11px] border border-[#1b1c18] overflow-x-auto">
                  {(activeTab === 'all' || activeTab === 'setup') && (
                    <div className="space-y-1 mb-2">
                      <div className="text-[#cef053] font-bold border-b border-[#333833] pb-0.5 flex justify-between">
                        <span># SETUP SUMMARY</span>
                        <span>WNS / TNS / FEP</span>
                      </div>
                      <div className="flex justify-between font-bold text-[#ffffff]">
                        <span>View : ALL (Overall)</span>
                        <span className="text-[#ef4444]">-0.483 ns / -2035.472 ns / 24,869</span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 text-[10px] text-[#c5c7c1] pt-1">
                        <div>Group i2o: -0.251 / -55.398 (260)</div>
                        <div>Group i2r: -0.275 / -494.520 (6,169)</div>
                        <div>Group m2r: -0.223 / -55.185 (651)</div>
                        <div>Group r2m: -0.203 / -10.958 (144)</div>
                        <div>Group r2o: -0.259 / -97.556 (869)</div>
                        <div>Group r2r: -0.283 / -505.953 (4,447)</div>
                        <div className="col-span-2 text-[#cef053]">Group Default: -0.483 / -871.087 (12,980)</div>
                      </div>
                    </div>
                  )}

                  {(activeTab === 'all' || activeTab === 'drv') && (
                    <div className="space-y-1 mb-2 pt-2 border-t border-[#252a26]">
                      <div className="text-[#cef053] font-bold border-b border-[#333833] pb-0.5 flex justify-between">
                        <span># DRV ELECTRICAL CHECKS</span>
                        <span>WNS / TNS / FEP</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span>Check : max_transition</span>
                        <span className="text-[#facc15]">-0.026 ns / -0.223 ns / 9</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span>Check : max_fanout</span>
                        <span className="text-[#ef4444]">-1640.000 ns / -24293.000 ns / 1,083</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-[#757872]">
                        <span>Check : max_capacitance</span>
                        <span>N/A / N/A / 0 (No Violations)</span>
                      </div>
                    </div>
                  )}

                  {(activeTab === 'all' || activeTab === 'clock') && (
                    <div className="space-y-1 pt-2 border-t border-[#252a26]">
                      <div className="text-[#cef053] font-bold border-b border-[#333833] pb-0.5 flex justify-between">
                        <span># CLOCK CHECKS</span>
                        <span>WNS / TNS / FEP</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span>min_pulse_width (endpoints)</span>
                        <span className="text-[#ef4444]">-0.131 ns / -0.232 ns / 9</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span>min_period (period constraint)</span>
                        <span className="text-[#cef053]">+0.566 ns / 0.000 ns / 0</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Crucial Timing Note */}
              <div className="p-2.5 bg-[#ffffff] border border-[#d8d7ce] font-technical text-[11px] text-[#757872] space-y-1">
                <span className="font-bold text-[#1b1c18] block uppercase">
                  CRITICAL TIMING INTERPRETATION NOTE:
                </span>
                <p>
                  A <strong className="text-[#536600]">min_period WNS of +0.566 ns</strong> indicates the clock period constraint itself is met at the cell library level. It does <em>not</em> mean setup timing closure has been achieved, as the actual overall setup WNS is <strong className="text-[#b91c1c]">-0.483 ns</strong> with 24,869 failing endpoints at this pre-CTS placement stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Engineering Interpretation: What the Evidence Tells Us */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
          <div className="flex items-center gap-2 font-technical text-xs">
            <span className="text-[#757872] font-bold">04 // INTERPRETATION</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#1b1c18] font-bold uppercase">What the Evidence Tells Us (5 Discussion Points)</span>
          </div>
          <span className="font-technical text-[11px] text-[#757872] uppercase hidden sm:inline">
            MEASURED VALUES VS. PHYSICAL DEDUCTION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Point 1 */}
          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-2">
            <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center gap-1.5 pb-1 border-b border-[#d8d7ce]">
              <span className="text-[#536600]">01.</span>
              <span>Timing-Driven Cell Clustering</span>
            </div>
            <p className="text-[#454843] leading-relaxed">
              The density map reveals concentrated cell clustering (white and pink zones) along the central corridor between macro arrays. This corresponds to the Innovus placement engine pulling connected cells closer to minimize wire delay along register-to-register (r2r) and macro-to-register (m2r/r2m) paths.
            </p>
          </div>

          {/* Point 2 */}
          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-2">
            <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center gap-1.5 pb-1 border-b border-[#d8d7ce]">
              <span className="text-[#536600]">02.</span>
              <span>Placement-Stage Timing State</span>
            </div>
            <p className="text-[#454843] leading-relaxed">
              The report captures pre-CTS, pre-route conditions. Overall setup WNS is <strong className="text-[#1b1c18]">-0.483 ns</strong> with a TNS of <strong className="text-[#1b1c18]">-2035.472 ns</strong> across 24,869 endpoints. In physical design, these are expected preliminary placement metrics before clock buffer insertion, not a post-route sign-off closure.
            </p>
          </div>

          {/* Point 3 */}
          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-2">
            <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center gap-1.5 pb-1 border-b border-[#d8d7ce]">
              <span className="text-[#536600]">03.</span>
              <span>Path Group Slack Distribution</span>
            </div>
            <p className="text-[#454843] leading-relaxed">
              Slack violations are distributed across all synchronous interfaces: r2r (WNS -0.283 ns, 4,447 FEP), i2r (-0.275 ns, 6,169 FEP), and memory interfaces m2r/r2m (-0.223 / -0.203 ns). The default group accounts for the most negative slack (-0.483 ns, 12,980 FEP).
            </p>
          </div>

          {/* Point 4 */}
          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-2">
            <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center gap-1.5 pb-1 border-b border-[#d8d7ce]">
              <span className="text-[#536600]">04.</span>
              <span>Electrical Design Rules (DRV)</span>
            </div>
            <p className="text-[#454843] leading-relaxed">
              Signal transition times are tightly controlled, with only 9 max_transition violations (WNS -0.026 ns). However, extensive max_fanout violations exist (1,083 FEP), which represent high-fanout nets scheduled to be resolved during downstream buffer insertion and clock tree synthesis.
            </p>
          </div>

          {/* Point 5 */}
          <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] space-y-2 md:col-span-2 lg:col-span-2">
            <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center gap-1.5 pb-1 border-b border-[#d8d7ce]">
              <span className="text-[#536600]">05.</span>
              <span>Downstream Routability Implications</span>
            </div>
            <p className="text-[#454843] leading-relaxed">
              High local cell density in the narrow channels between SRAM macro arrays creates potential routing congestion risks during subsequent detailed routing. If routing congestion or pin-access shorts emerge downstream, standard cells will need to be spread or cell padding applied—which directly alters wire lengths and impacts timing. This feedback loop is the central engineering trade-off in ASIC physical design.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Engineering Decision Breakdown: Visual Comparison */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
          <div className="flex items-center gap-2 font-technical text-xs">
            <span className="text-[#757872] font-bold">05 // DECISION BREAKDOWN</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#1b1c18] font-bold uppercase">3-Way Trade-Off Matrix</span>
          </div>
          <span className="font-technical text-[11px] text-[#757872] uppercase hidden sm:inline">
            TIMING VS. DENSITY VS. ROUTING
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          {/* Column 1: Timing Priority */}
          <div className="border border-[#d8d7ce] bg-[#ffffff] divide-y divide-[#d8d7ce]">
            <div className="p-3 bg-[#f5f3ed] font-technical font-bold text-[#1b1c18] uppercase flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-[#536600]" />
              <span>1. Timing Priority</span>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Goal</span>
              <p className="text-[#1b1c18]">Minimize interconnect delays on critical paths.</p>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Action</span>
              <p className="text-[#454843]">Allow cells to cluster closely where timing optimization requires proximity.</p>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Observed Result</span>
              <p className="font-technical font-bold text-[#1b1c18]">Setup WNS: -0.483 ns, TNS: -2035.472 ns at placement.</p>
            </div>
            <div className="p-3 space-y-1 bg-[#fbf9f3]">
              <span className="font-technical text-[10px] text-[#b91c1c] uppercase block font-bold">Identified Risk</span>
              <p className="text-[#454843]">Localized density hotspots in narrow macro corridors.</p>
            </div>
          </div>

          {/* Column 2: Physical Density Consideration */}
          <div className="border border-[#d8d7ce] bg-[#ffffff] divide-y divide-[#d8d7ce]">
            <div className="p-3 bg-[#f5f3ed] font-technical font-bold text-[#1b1c18] uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#1b1c18]" />
              <span>2. Physical Density Consideration</span>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Goal</span>
              <p className="text-[#1b1c18]">Prevent unroutable congestion and macro pin access blockage.</p>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Action</span>
              <p className="text-[#454843]">Monitor high-density regions (white/pink areas) between SRAM macros.</p>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Observed Result</span>
              <p className="font-technical font-bold text-[#1b1c18]">Concentrated clustering in central channel, moderate/sparse elsewhere.</p>
            </div>
            <div className="p-3 space-y-1 bg-[#fbf9f3]">
              <span className="font-technical text-[10px] text-[#b91c1c] uppercase block font-bold">Identified Risk</span>
              <p className="text-[#454843]">Aggressively spreading cells to drop density extends wires and degrades timing.</p>
            </div>
          </div>

          {/* Column 3: Routing Consideration (Downstream) */}
          <div className="border border-[#d8d7ce] bg-[#ffffff] divide-y divide-[#d8d7ce]">
            <div className="p-3 bg-[#f5f3ed] font-technical font-bold text-[#1b1c18] uppercase flex items-center gap-1.5">
              <GitCommit className="w-4 h-4 text-[#757872]" />
              <span>3. Routing Consideration (Downstream)</span>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Goal</span>
              <p className="text-[#1b1c18]">Ensure routability across all metal layers during detailed routing.</p>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Reality</span>
              <p className="text-[#454843]">Final routing has not been performed; routability can only be verified post-route.</p>
            </div>
            <div className="p-3 space-y-1">
              <span className="font-technical text-[10px] text-[#757872] uppercase block">Observed Status</span>
              <p className="font-technical font-bold text-[#757872]">CTS and Detailed Routing: NOT STARTED.</p>
            </div>
            <div className="p-3 space-y-1 bg-[#fbf9f3]">
              <span className="font-technical text-[10px] text-[#536600] uppercase block font-bold">Next Technical Step</span>
              <p className="text-[#454843]">Address fanout DRVs and evaluate congestion during CTS handoff.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Evidence Classification Matrix (4-Tier Rubric) */}
      <div className="p-6 md:p-8 bg-[#fbf9f3] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
          <div className="flex items-center gap-2 font-technical text-xs">
            <span className="text-[#757872] font-bold">06 // INTEGRITY CLASSIFICATION</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#1b1c18] font-bold uppercase">Evidence Classification Matrix</span>
          </div>
          <span className="font-technical text-[10px] text-[#536600] font-bold px-2 py-0.5 bg-[#ffffff] border border-[#d8d7ce]">
            VERIFIED AUDIT RUBRIC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* APPLIED */}
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce] space-y-1.5">
            <div className="font-technical text-xs font-bold text-[#536600] uppercase flex items-center justify-between">
              <span>[ APPLIED ]</span>
              <span className="w-2 h-2 bg-[#b7d83d]" />
            </div>
            <div className="text-[11px] font-bold text-[#1b1c18] font-technical">
              Timing-Driven Placement Mode
            </div>
            <p className="text-[#454843] text-[11px] leading-relaxed">
              Executed timing-oriented standard-cell placement in Cadence Innovus using SDC clock constraints derived from synthesis.
            </p>
          </div>

          {/* OBSERVED */}
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce] space-y-1.5">
            <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center justify-between">
              <span>[ OBSERVED ]</span>
              <span className="w-2 h-2 bg-[#1b1c18]" />
            </div>
            <div className="text-[11px] font-bold text-[#1b1c18] font-technical">
              Heat Map & Terminal Reports
            </div>
            <p className="text-[#454843] text-[11px] leading-relaxed">
              Spatial clustering in central corridor; measured setup WNS of -0.483 ns, TNS -2035.472 ns across 24,869 FEP, and DRV log output.
            </p>
          </div>

          {/* INTERPRETED */}
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce] space-y-1.5">
            <div className="font-technical text-xs font-bold text-[#757872] uppercase flex items-center justify-between">
              <span>[ INTERPRETED ]</span>
              <span className="w-2 h-2 bg-[#757872]" />
            </div>
            <div className="text-[11px] font-bold text-[#1b1c18] font-technical">
              Placement Dynamics
            </div>
            <p className="text-[#454843] text-[11px] leading-relaxed">
              Clustering correlates with timing engine efforts to meet critical paths; high local density creates potential downstream routing risk.
            </p>
          </div>

          {/* NOT ESTABLISHED */}
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce] space-y-1.5">
            <div className="font-technical text-xs font-bold text-[#b91c1c] uppercase flex items-center justify-between">
              <span>[ NOT ESTABLISHED ]</span>
              <span className="w-2 h-2 bg-[#b91c1c]" />
            </div>
            <div className="text-[11px] font-bold text-[#1b1c18] font-technical">
              Uncompleted Downstream
            </div>
            <p className="text-[#454843] text-[11px] leading-relaxed">
              Post-route timing closure, full detailed routing completion, final DRC/LVS clean status, or tapeout fabrication readiness.
            </p>
          </div>
        </div>
      </div>

      {/* 8. Interactive Lightbox Modal for Full Resolution Pan & Zoom */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#171916]/95 backdrop-blur-md flex flex-col p-4 md:p-6 overflow-hidden"
          >
            {/* Top Modal Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-[#333833] text-xs font-technical text-[#fbf9f3]">
              <div className="flex items-center gap-2">
                <span className="text-[#cef053] font-bold">[{activeModalItem.tag}]</span>
                <span className="font-serif text-base text-[#ffffff]">{activeModalItem.title}</span>
                <span className="hidden md:inline text-[#757872]">·</span>
                <span className="hidden md:inline text-[#757872]">{activeModalItem.badge}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <button
                  onClick={() => setZoomScale(prev => Math.max(0.6, prev - 0.2))}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 tabular-nums text-xs text-[#cef053]">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={() => setZoomScale(prev => Math.min(2.5, prev + 0.2))}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer mr-2 transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="px-3 py-1.5 bg-[#1b1c18] hover:bg-[#2c3029] text-[#fbf9f3] hover:text-[#cef053] border border-[#cef053] flex items-center gap-1.5 cursor-pointer font-bold uppercase transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>[ CLOSE ]</span>
                </button>
              </div>
            </div>

            {/* Modal Image Pan / Zoom Stage */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-auto flex items-center justify-center p-2 md:p-6 cursor-grab active:cursor-grabbing"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              <img
                src={activeModalItem.src}
                alt={activeModalItem.alt}
                style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
                className="max-h-[82vh] max-w-full object-contain transition-transform duration-150 select-none shadow-2xl"
              />
            </motion.div>

            {/* Modal Bottom Metadata Bar */}
            <div className="pt-3 border-t border-[#333833] flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs font-technical text-[#757872]">
              <div>
                <span className="text-[#fbf9f3] font-bold">{activeModalItem.caption}</span>
              </div>
              <div className="text-[11px] text-[#cef053]">
                {activeModalItem.notes}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
