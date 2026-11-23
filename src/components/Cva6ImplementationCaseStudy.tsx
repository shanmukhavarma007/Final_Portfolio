import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Layers,
  Cpu,
  ShieldCheck,
  Terminal,
  Wrench,
  Activity,
  AlertTriangle,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowRight,
  GitCommit,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EvidenceArtifact {
  id: string;
  label: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  stage: string;
}

interface TimelineStage {
  id: string;
  num: string;
  title: string;
  phase: 'IMPLEMENTATION' | 'OPTIMIZATION_VERIFICATION';
  phaseLabel: string;
  tool: string;
  database?: string;
  summary: string;
  metrics: { label: string; value: string }[];
  notes: string;
}

const IMPLEMENTATION_STAGES: TimelineStage[] = [
  {
    id: 'rtl-synthesis',
    num: '01',
    title: 'RTL Synthesis',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Genus',
    summary:
      'Elaborated the 64-bit CVA6 RISC-V RTL into a 28 nm gate-level netlist constrained under a single 1.5 ns (~666 MHz) clock period.',
    metrics: [
      { label: 'Technology Node', value: '28 nm' },
      { label: 'Clock Period', value: '1.5 ns (~666 MHz)' },
      { label: 'Clock Architecture', value: 'Single-Clock' },
      { label: 'Leaf Instances', value: '178,799' }
    ],
    notes:
      'Generated the synthesized gate-level netlist and SDC timing constraints supplying the physical implementation flow in Cadence Innovus.'
  },
  {
    id: 'floorplanning',
    num: '02',
    title: 'Floorplanning',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Innovus',
    summary:
      'Defined core and die geometry at 950 × 916 µm (850,552 µm² floorplan area) to accommodate 16 SRAM cache macros and standard-cell execution logic.',
    metrics: [
      { label: 'Floorplan Dimensions', value: '950 × 916' },
      { label: 'Floorplan Area', value: '850,552 µm²' },
      { label: 'Core Aspect', value: 'Near-Square Die' },
      { label: 'Tool', value: 'Cadence Innovus' }
    ],
    notes:
      'Sized the core boundary to leave balanced routing tracks around memory blocks and central execution logic (ex_stage_i).'
  },
  {
    id: 'macro-placement',
    num: '03',
    title: 'Macro Placement',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Innovus',
    summary:
      'Arranged peripheral SRAM arrays with 20 µm macro channel spacing and 30% density partial placement blockages between macros to preserve pin-escape corridors.',
    metrics: [
      { label: 'Macro Channel Spacing', value: '20 µm' },
      { label: 'Partial Blockage', value: '30% density' },
      { label: 'Macro Topology', value: 'Peripheral Arrays' },
      { label: 'Pin Access', value: 'Inward-Facing' }
    ],
    notes:
      '20 µm inter-macro channels paired with 30% partial placement blockages prevented standard-cell overcrowding directly beside macro pins.'
  },
  {
    id: 'power-planning',
    num: '04',
    title: 'Power Planning',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Innovus',
    summary:
      'Constructed core power rings, orthogonal VDD/VSS power stripes, and follow-pin rails across standard-cell rows and macro boundaries.',
    metrics: [
      { label: 'Power Structure', value: 'Rings & Stripes' },
      { label: 'Rail Connectivity', value: 'Standard-Cell Follow Pins' },
      { label: 'Macro Power', value: 'Dedicated Ring Connections' },
      { label: 'Stage Order', value: 'Pre-Placement Grid' }
    ],
    notes:
      'Established power delivery before global standard-cell placement so routing track budgets reflected actual power-grid metal occupancy.'
  },
  {
    id: 'standard-cell-placement',
    num: '05',
    title: 'Standard-Cell Placement',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Innovus',
    database: 'cva6_fp1.db',
    summary:
      'Executed placement on the 950 × 916 floorplan with 20 µm macro channels and 30% partial blockages, achieving 0.20% congestion overflow and a 1.56 hotspot score.',
    metrics: [
      { label: 'Core Utilization', value: '82.6%' },
      { label: 'Congestion Overflow', value: '0.20%' },
      { label: 'Hotspot Score', value: '1.56' },
      { label: 'Database', value: 'cva6_fp1.db' }
    ],
    notes:
      'This placement database (cva6_fp1.db) achieved clean congestion characteristics and was considered suitable for Clock Tree Synthesis progression.'
  },
  {
    id: 'clock-tree-synthesis',
    num: '06',
    title: 'Clock Tree Synthesis (CTS)',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Innovus (CCOpt)',
    summary:
      'Iteration 1 synthesized the single-clock distribution tree with 83.2% core utilization, 0.47% congestion overflow (0.11% H / 0.36% V), and a 14.83 hotspot score.',
    metrics: [
      { label: 'Core Utilization', value: '83.2%' },
      { label: 'Congestion Overflow', value: '0.47%' },
      { label: 'H / V Overflow', value: '0.11% H / 0.36% V' },
      { label: 'Hotspot Score', value: '14.83' }
    ],
    notes:
      'Congestion improved relative to earlier placement runs, while maximum-transition violations required further attention during post-CTS analysis.'
  },
  {
    id: 'post-cts-analysis',
    num: '07',
    title: 'Post-CTS Analysis',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Innovus',
    database: 'cva6_cts.db',
    summary:
      'Iteration 1 evaluated setup, hold, transition, and congestion reports on the post-CTS clock tree at 83.6% core utilization and 0.53% congestion overflow.',
    metrics: [
      { label: 'Core Utilization', value: '83.6%' },
      { label: 'Congestion Overflow', value: '0.53%' },
      { label: 'H / V Overflow', value: '0.11% H / 0.42% V' },
      { label: 'Hotspot Score', value: '16.39' }
    ],
    notes:
      'Database checkpoint cva6_cts.db. Evaluated propagated-clock setup, multi-corner hold, electrical transition limits, and congestion distribution prior to routing.'
  },
  {
    id: 'routing',
    num: '08',
    title: 'Routing',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Innovus',
    database: 'cva6_pcts.db',
    summary:
      'Iteration 1 executed detailed signal routing from cva6_pcts.db, achieving 0 antenna violations, 0.51% congestion overflow, 18.12 hotspot score, and 40 initial DRCs.',
    metrics: [
      { label: 'Reported Run Utilization', value: '100%' },
      { label: 'Initial DRC Count', value: '40' },
      { label: 'Overflow (H / V)', value: '0.51% (0.20% H / 0.31% V)' },
      { label: 'Hotspot / Antenna', value: '18.12 / 0 Antenna' }
    ],
    notes:
      'Reported 100% run utilization reflects filler-populated route-stage reporting and is distinct from placement utilization (82.6%). Zero process antenna violations recorded.'
  },
  {
    id: 'post-route-analysis',
    num: '09',
    title: 'Post-Route Analysis',
    phase: 'IMPLEMENTATION',
    phaseLabel: 'Core Implementation',
    tool: 'Cadence Innovus',
    database: 'cva6_route.db',
    summary:
      'Iteration 1 post-route analysis on cva6_route.db brought initial post-route DRCs down to 10 while holding congestion overflow at 0.51% and hotspot score at 18.12.',
    metrics: [
      { label: 'Reported Run Utilization', value: '100%' },
      { label: 'Initial Post-Route DRCs', value: '10 (Before Route ECO)' },
      { label: 'Congestion Overflow', value: '0.51%' },
      { label: 'Hotspot Score', value: '18.12' }
    ],
    notes:
      'The initial post-route DRC count was 10 (not the final DRC count); these remaining violations became the direct target of Route ECO macro-pin via debugging.'
  },
  {
    id: 'route-eco-drc',
    num: '10',
    title: 'Route ECO & DRC Cleanup',
    phase: 'OPTIMIZATION_VERIFICATION',
    phaseLabel: 'Optimization & Verification',
    tool: 'Cadence Innovus ECO & Verify DRC',
    summary:
      'Investigated wide-metal-jog (WMJ) violations, replaced and rotated problematic vias over macro pins, and reran route ECO with route_via_with_block_pins_only true to reach 0 DRC violations.',
    metrics: [
      { label: 'Initial Post-Route DRCs', value: '10' },
      { label: 'Final Verified DRCs', value: '0 Violations' },
      { label: 'Key ECO Option', value: 'route_via_with_block_pins_only true' },
      { label: 'Verify DRC Sub-Area', value: '950.320 × 916.500' }
    ],
    notes:
      'Confirmed by Cadence Innovus Verify DRC terminal output ("Verification Complete : 0 Viols.") after manual via replacement, rotation, and constrained route ECO.'
  },
  {
    id: 'post-route-timing-opt',
    num: '11',
    title: 'Post-Route Timing Optimization',
    phase: 'OPTIMIZATION_VERIFICATION',
    phaseLabel: 'Optimization & Verification',
    tool: 'Cadence Innovus STA & Opt',
    summary:
      'Conducted LVT cell exploration, useful-skew analysis, and targeted constraint fixes closing the I2O group (+0.028 ns WNS) and Default group (+0.186 ns WNS).',
    metrics: [
      { label: 'I2O Group WNS', value: '+0.028 ns (Fixed)' },
      { label: 'Default Group WNS', value: '+0.186 ns (Fixed)' },
      { label: 'Experiments Run', value: 'LVT & Useful Skew' },
      { label: 'Scope Boundary', value: 'Per-Group WNS Only' }
    ],
    notes:
      'The +0.028 ns (I2O) and +0.186 ns (Default) figures apply strictly to their respective timing groups; overall full-design timing closure across all groups is not claimed.'
  }
];

const STAGE_METRICS_TABLE = [
  {
    stage: 'Floorplanning & Placement',
    database: 'cva6_fp1.db',
    util: '82.6%',
    overflow: '0.20%',
    hOverflow: '0.09%',
    vOverflow: '0.11%',
    hotspot: '1.56',
    drcAntenna: 'Pre-route (CTS-ready)'
  },
  {
    stage: 'Clock Tree Synthesis — Iter 1',
    database: 'Post-Placement CTS',
    util: '83.2%',
    overflow: '0.47%',
    hOverflow: '0.11%',
    vOverflow: '0.36%',
    hotspot: '14.83',
    drcAntenna: 'Max-tran flagged for Post-CTS'
  },
  {
    stage: 'Post-CTS Analysis — Iter 1',
    database: 'cva6_cts.db',
    util: '83.6%',
    overflow: '0.53%',
    hOverflow: '0.11%',
    vOverflow: '0.42%',
    hotspot: '16.39',
    drcAntenna: 'Setup/Hold/Tran/Cong evaluated'
  },
  {
    stage: 'Routing — Iter 1',
    database: 'cva6_pcts.db',
    util: '100%*',
    overflow: '0.51%',
    hOverflow: '0.20%',
    vOverflow: '0.31%',
    hotspot: '18.12',
    drcAntenna: 'Initial DRCs: 40 · Antenna: 0'
  },
  {
    stage: 'Post-Route Analysis — Iter 1',
    database: 'cva6_route.db',
    util: '100%*',
    overflow: '0.51%',
    hOverflow: '—',
    vOverflow: '—',
    hotspot: '18.12',
    drcAntenna: 'Initial Post-Route DRCs: 10'
  },
  {
    stage: 'Route ECO & DRC Verification',
    database: 'Post-ECO Verify DRC',
    util: '—',
    overflow: '—',
    hOverflow: '—',
    vOverflow: '—',
    hotspot: '—',
    drcAntenna: 'Final Verified DRCs: 0 Viols.'
  }
];

const EVIDENCE_ARTIFACTS: Record<string, EvidenceArtifact> = {
  amoeba: {
    id: 'amoeba',
    label: 'HIERARCHICAL DESIGN MODEL // AMOEBA VIEW',
    title: 'CVA6 Hierarchical Amoeba View (ex_stage_i & Macro Periphery)',
    caption:
      'Cadence Innovus Amoeba view illustrating the physical distribution of the execution hierarchy (ex_stage_i) around the 16 peripheral SRAM memory macros and top I/O pin ring.',
    src: '/assets/aistudio/image_f5437343.png',
    alt: 'Cadence Innovus hierarchical Amoeba view of CVA6 showing ex_stage_i standard-cell regions and peripheral SRAM macros',
    stage: 'Physical Hierarchy'
  },
  floorplan: {
    id: 'floorplan',
    label: 'FLOORPLAN VIEW // 950 × 916 µm',
    title: 'CVA6 28 nm Floorplan & Macro Channel Topology',
    caption:
      'Core boundary sized to 950 × 916 µm (850,552 µm²) with peripheral SRAM macros and dedicated routing channels.',
    src: '/assets/aistudio/image_405b6f5e.png',
    alt: 'Cadence Innovus floorplan view showing SRAM macros and core boundary',
    stage: 'Floorplanning'
  },
  placementCongestion: {
    id: 'placementCongestion',
    label: 'PLACEMENT CONGESTION MAP',
    title: 'Placement Congestion Heatmap & Macro Corridor Demand',
    caption:
      'Spatial congestion overlay identifying vertical track crowding along lower macro corridors, motivating 20 µm channel spacing and 30% partial placement blockages.',
    src: '/assets/aistudio/image_1fd9e88f.png',
    alt: 'Cadence Innovus placement congestion heatmap over macro floorplan',
    stage: 'Placement'
  },
  postCtsSetup: {
    id: 'postCtsSetup',
    label: 'POST-CTS SETUP & DRV REPORT',
    title: 'Post-CTS Setup Timing & Electrical Transition Evaluation',
    caption:
      'Cadence Innovus post-CTS setup report evaluating timing path groups and electrical design-rule violations (max_tran, max_fanout, max_cap).',
    src: '/assets/aistudio/image_3149f24a.png',
    alt: 'Cadence Innovus post-CTS setup timing and DRV terminal report',
    stage: 'Post-CTS'
  },
  postCtsHold: {
    id: 'postCtsHold',
    label: 'POST-CTS HOLD REPORT',
    title: 'Post-CTS Multi-Corner Hold Timing Evaluation',
    caption:
      'Cadence Innovus hold timing summary evaluated across func_hold_ff125c_rcb and func_hold_ffm40c_cb corners after clock tree propagation.',
    src: '/assets/aistudio/image_4f13f294.png',
    alt: 'Cadence Innovus post-CTS multi-corner hold timing report',
    stage: 'Post-CTS'
  },
  routeCongestionRpt: {
    id: 'routeCongestionRpt',
    label: 'ROUTING CONGESTION DISTRIBUTION',
    title: 'Routing Overflow (0.51%) & Hotspot Score (18.12)',
    caption:
      'Route-stage congestion report recording 0.20% horizontal overflow, 0.31% vertical overflow (0.51% total), and a normalized total hotspot score of 18.12.',
    src: '/assets/aistudio/cva6_route_congestion_rpt.png',
    alt: 'Cadence Innovus routing congestion report showing 0.51% overflow and 18.12 hotspot',
    stage: 'Routing'
  },
  routeAntenna: {
    id: 'routeAntenna',
    label: 'ROUTE HOLD & ANTENNA REPORT',
    title: 'Route Stage Antenna Check (0 Violations)',
    caption:
      'Cadence Innovus routing verification confirming 0 process antenna violations across the routed signal layers.',
    src: '/assets/aistudio/cva6_route_hold_antenna.png',
    alt: 'Cadence Innovus route hold and process antenna report confirming 0 antenna violations',
    stage: 'Routing'
  },
  routeDrc40: {
    id: 'routeDrc40',
    label: 'ROUTING ITERATION 1 // 40 INITIAL DRCs',
    title: 'Initial Routing DRC Summary (40 Violations)',
    caption:
      'Initial routing iteration logged 40 geometry DRCs across M2, M4, M5, VIA1, and VIA3 before post-route optimization.',
    src: '/assets/aistudio/cva6_route_drc_40.png',
    alt: 'Cadence Innovus initial route DRC summary showing 40 violations',
    stage: 'Routing'
  },
  postRouteDrc10: {
    id: 'postRouteDrc10',
    label: 'BEFORE ROUTE ECO // 10 INITIAL POST-ROUTE DRCs',
    title: 'Initial Post-Route DRC Summary (10 Violations — WMJ M4 Focus)',
    caption:
      'Initial post-route analysis (cva6_route.db) recorded 10 remaining DRCs, dominated by 7 wide-metal-jog (WMJ) violations on M4 over macro pins, 2 shorts, and 1 VIA3 enclosure violation.',
    src: '/assets/aistudio/cva6_postroute_drc_10.png',
    alt: 'Cadence Innovus initial post-route DRC summary showing 10 violations prior to Route ECO',
    stage: 'Post-Route (Initial)'
  },
  verifyDrcZero: {
    id: 'verifyDrcZero',
    label: 'AFTER ROUTE ECO // 0 DRC VIOLATIONS',
    title: 'Final Verify DRC Output — Verification Complete : 0 Viols.',
    caption:
      'Cadence Innovus Verify DRC terminal output across the full die ({0.000 0.000 950.320 916.500}) confirming 0 DRC violations after macro-pin via replacement, rotation, and route ECO.',
    src: '/assets/aistudio/image_fe25c52c.png',
    alt: 'Cadence Innovus Verify DRC output showing Verification Complete : 0 Viols.',
    stage: 'Route ECO Verified'
  },
  postRouteMap: {
    id: 'postRouteMap',
    label: 'POST-ROUTE PHYSICAL VIEW',
    title: 'Post-Route Congestion & Physical Layout View',
    caption:
      'Physical die canvas during post-route analysis showing routed density distribution around the 16 SRAM macro blocks.',
    src: '/assets/aistudio/cva6_postroute_congestion_map.png',
    alt: 'Cadence Innovus post-route physical layout view',
    stage: 'Post-Route'
  },
  beforeLvtSetup: {
    id: 'beforeLvtSetup',
    label: 'LVT EXPERIMENT // BEFORE ENABLING LVT',
    title: 'Post-Route Setup Timing Report (Before LVT)',
    caption:
      'Baseline post-route setup timing report captured immediately before enabling Low-Vt (LVT) cells for comparative setup/hold evaluation.',
    src: '/assets/aistudio/cva6_postroute_setup_before_lvt.png',
    alt: 'Cadence Innovus post-route setup report before enabling LVT cells',
    stage: 'Timing Opt'
  },
  afterLvtSetup: {
    id: 'afterLvtSetup',
    label: 'LVT EXPERIMENT // AFTER ENABLING LVT',
    title: 'Post-Route Setup Timing Report (After LVT)',
    caption:
      'Post-route setup timing report recorded after enabling LVT cells to evaluate setup and hold response as an optimization experiment.',
    src: '/assets/aistudio/cva6_postroute_setup_after_lvt.png',
    alt: 'Cadence Innovus post-route setup report after enabling LVT cells',
    stage: 'Timing Opt'
  },
  usefulSkewSetup: {
    id: 'usefulSkewSetup',
    label: 'USEFUL SKEW // SETUP REPORT',
    title: 'Post-Route Setup Timing Report (Useful Skew Analysis)',
    caption:
      'Setup timing report evaluated following useful-skew optimization across post-route path groups.',
    src: '/assets/aistudio/cva6_postroute_setup_useful_skew.png',
    alt: 'Cadence Innovus post-route setup report after useful skew analysis',
    stage: 'Timing Opt'
  },
  usefulSkewHold: {
    id: 'usefulSkewHold',
    label: 'USEFUL SKEW // HOLD REPORT',
    title: 'Post-Route Hold Timing Report (Useful Skew Analysis)',
    caption:
      'Multi-corner hold timing report evaluated after useful-skew analysis to verify hold margin behavior.',
    src: '/assets/aistudio/cva6_postroute_hold_useful_skew.png',
    alt: 'Cadence Innovus post-route hold report after useful skew analysis',
    stage: 'Timing Opt'
  }
};

const ENGINEERING_LEARNINGS = [
  {
    index: '01',
    topic: 'Physical-Design Trade-offs',
    summary:
      'Every physical intervention shifts pressure elsewhere: tightening placement to help setup timing spikes local routing demand, while enabling faster LVT cells or useful skew requires parallel inspection of hold margins rather than treating setup in isolation.'
  },
  {
    index: '02',
    topic: 'Congestion vs. Utilization',
    summary:
      'Macro channel geometry mattered more than raw utilization alone. Moving to 20 µm channels with 30% partial placement blockages kept placement overflow at 0.20% (1.56 hotspot) at 82.6% utilization—and route-stage 100% utilization reflects filler insertion, not a sudden jump in standard-cell crowding.'
  },
  {
    index: '03',
    topic: 'Macro Pin Accessibility',
    summary:
      'Most stubborn post-route DRCs were not random core routing failures—they were wide-metal-jog (WMJ) violations clustered directly over macro pins. Preserving pin access channels and managing via orientation over block pins directly determines DRC convergence.'
  },
  {
    index: '04',
    topic: 'Timing Constraint Interpretation',
    summary:
      'Inspecting path-group reports revealed structural constraint causes rather than pure datapath slowness: I2O paths lacked valid timing endpoints without max-delay constraints (+0.028 ns once constrained), while Default paths reflected reset-to-register CDN recovery/removal checks resolved by tuning the IO delay budget from 60% to 40% (+0.186 ns).'
  },
  {
    index: '05',
    topic: 'Route-Level DRC Debugging',
    summary:
      'Automated post-route passes cleared 40 initial routing DRCs down to 10, but the remaining WMJ errors required inspecting actual metal geometry and via alignment over macro pins instead of blindly re-running global route loops.'
  },
  {
    index: '06',
    topic: 'ECO-Based Problem Solving',
    summary:
      'Targeted surgical fixes—replacing problematic macro-pin vias, rotating vias to satisfy WMJ spacing rules, and re-running route ECO with route_via_with_block_pins_only true—resolved the final 10 DRCs cleanly to 0 violations without disturbing the surrounding routed netlist.'
  }
];

export const Cva6ImplementationCaseStudy: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('route-eco-drc');
  const [activeTimingSubtab, setActiveTimingSubtab] = useState<'lvt' | 'skew'>('lvt');
  const [modalArtifact, setModalArtifact] = useState<EvidenceArtifact | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalArtifact(null);
        setZoomScale(1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const openModal = (artifact: EvidenceArtifact) => {
    setModalArtifact(artifact);
    setZoomScale(1);
  };

  const activeStage =
    IMPLEMENTATION_STAGES.find((s) => s.id === selectedStageId) || IMPLEMENTATION_STAGES[9];

  const implementationPhaseStages = IMPLEMENTATION_STAGES.filter(
    (s) => s.phase === 'IMPLEMENTATION'
  );
  const optimizationPhaseStages = IMPLEMENTATION_STAGES.filter(
    (s) => s.phase === 'OPTIMIZATION_VERIFICATION'
  );

  return (
    <article
      id="cva6-flagship-case-study"
      className="border border-[#1b1c18] bg-[#ffffff] divide-y divide-[#d8d7ce] font-sans"
    >
      {/* 01 — PROJECT OVERVIEW (Dark Graphite Flagship Hero) */}
      <section id="cva6-cs-01" className="bg-[#171a18] text-[#fbf9f3] p-6 md:p-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#333833] font-technical text-xs">
          <div className="flex flex-wrap items-center gap-2 text-[#9ea099]">
            <span className="text-[#cef053] font-bold">01. PROJECT OVERVIEW</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#fbf9f3]">FLAGSHIP PHYSICAL DESIGN CASE STUDY</span>
            <span aria-hidden="true">·</span>
            <span>CADENCE GENUS &amp; INNOVUS</span>
          </div>
          <span className="text-[#cef053] font-bold">
            0 VERIFIED DRCs (POST-ECO) · GDSII &amp; TAPEOUT NOT CLAIMED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#ffffff] font-normal leading-[1.12] tracking-tight text-balance">
                CVA6 64-Bit RISC-V Physical Implementation, Route ECO &amp; Timing Optimization
              </h2>
              <p className="text-sm sm:text-base text-[#c5c7be] leading-relaxed max-w-2xl">
                An engineering journal documenting hands-on 28 nm physical implementation of the
                single-clock CVA6 RISC-V core from RTL synthesis through floorplanning, macro
                placement, placement, CTS, routing, Route ECO macro-pin via debugging (10 &rarr; 0
                DRC violations), and targeted post-route timing group fixes.
              </p>
            </div>

            {/* Specification Grid (Clean unboxed hairline cells) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 border border-[#333833] divide-x divide-y divide-[#333833] bg-[#1e221f] font-technical text-xs">
              <div className="p-3.5">
                <div className="text-[11px] text-[#9ea099]">Processor Core</div>
                <div className="text-sm font-bold text-[#ffffff] mt-1">CVA6 RISC-V</div>
              </div>
              <div className="p-3.5">
                <div className="text-[11px] text-[#9ea099]">Clocking</div>
                <div className="text-sm font-bold text-[#ffffff] mt-1">Single-Clock</div>
              </div>
              <div className="p-3.5">
                <div className="text-[11px] text-[#9ea099]">Technology</div>
                <div className="text-sm font-bold text-[#cef053] mt-1">28 nm</div>
              </div>
              <div className="p-3.5">
                <div className="text-[11px] text-[#9ea099]">Clock Period</div>
                <div className="text-sm font-bold text-[#ffffff] mt-1 tabular-nums">
                  1.5 ns (~666 MHz)
                </div>
              </div>
              <div className="p-3.5">
                <div className="text-[11px] text-[#9ea099]">EDA Toolchain</div>
                <div className="text-sm font-bold text-[#ffffff] mt-1">Genus &amp; Innovus</div>
              </div>
              <div className="p-3.5">
                <div className="text-[11px] text-[#9ea099]">Post-ECO DRC</div>
                <div className="text-sm font-bold text-[#cef053] mt-1 tabular-nums">
                  0 Violations
                </div>
              </div>
            </div>

            {/* Quick Section Jump Links */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 font-technical text-[11px] text-[#9ea099]">
              <span className="text-[#fbf9f3] font-bold">Sections:</span>
              {[
                { href: '#cva6-cs-02', label: '02. Journey' },
                { href: '#cva6-cs-03', label: '03. Physical Analysis' },
                { href: '#cva6-cs-04', label: '04. CTS & Timing' },
                { href: '#cva6-cs-05', label: '05. Route ECO (0 DRC)' },
                { href: '#cva6-cs-06', label: '06. Timing Opt' },
                { href: '#cva6-cs-07', label: '07. Learnings' }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#cef053] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Hierarchical Amoeba View (Artifact 2) */}
          <div className="lg:col-span-5 border border-[#333833] bg-[#121413] flex flex-col justify-between">
            <div className="px-4 py-2.5 border-b border-[#333833] flex items-center justify-between font-technical text-[11px]">
              <span className="text-[#cef053] font-bold">HIERARCHICAL AMOEBA VIEW</span>
              <button
                onClick={() => openModal(EVIDENCE_ARTIFACTS.amoeba)}
                className="text-[#c5c7be] hover:text-[#cef053] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </button>
            </div>
            <div
              onClick={() => openModal(EVIDENCE_ARTIFACTS.amoeba)}
              className="p-3 flex-1 flex items-center justify-center bg-[#0b0d0c] cursor-pointer group relative overflow-hidden"
            >
              <img
                src={EVIDENCE_ARTIFACTS.amoeba.src}
                alt={EVIDENCE_ARTIFACTS.amoeba.alt}
                referrerPolicy="no-referrer"
                className="max-h-[300px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[#000000]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-xs font-bold">
                  Inspect Hierarchical Amoeba View
                </span>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-[#333833] text-xs text-[#c5c7be] leading-relaxed">
              <span className="font-technical text-[11px] text-[#cef053] font-bold block mb-0.5">
                Design Hierarchy (ex_stage_i &amp; 16 SRAM Macros)
              </span>
              Genuine Cadence Innovus Amoeba view showing execution datapath clustering relative to
              the peripheral memory arrays and top I/O ring.
            </div>
          </div>
        </div>
      </section>

      {/* 02 — IMPLEMENTATION JOURNEY (11 Verified Stages) */}
      <section id="cva6-cs-02" className="p-6 md:p-8 bg-[#fbf9f3] space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
          <div>
            <div className="font-technical text-xs text-[#536600] font-bold">
              02. Implementation Journey
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-0.5">
              Eleven Verified Stages: Core Flow vs. Subsequent Optimization
            </h3>
          </div>
          <div className="font-technical text-xs text-[#757872]">
            Placement &rarr; CTS &rarr; Post-CTS &rarr; Routing &rarr; Post-Route &rarr; ECO &amp; Timing Opt
          </div>
        </div>

        {/* Two Distinct Tracks: Implementation (01-09) vs Optimization & Verification (10-11) */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between font-technical text-xs">
              <span className="font-bold text-[#1b1c18]">
                A. Core Physical Implementation Stages (01 – 09)
              </span>
              <span className="text-[#536600] font-bold">Completed</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
              {implementationPhaseStages.map((stage) => {
                const isSelected = stage.id === selectedStageId;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`p-3 text-left border transition-colors cursor-pointer flex flex-col justify-between min-h-[88px] ${
                      isSelected
                        ? 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18]'
                        : 'bg-[#ffffff] text-[#1b1c18] border-[#d8d7ce] hover:border-[#1b1c18]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-technical text-[11px]">
                      <span className={isSelected ? 'text-[#cef053] font-bold' : 'text-[#536600] font-bold'}>
                        {stage.num}
                      </span>
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${isSelected ? 'text-[#cef053]' : 'text-[#536600]'}`}
                      />
                    </div>
                    <div className="font-sans text-xs font-semibold leading-snug mt-2">
                      {stage.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Subsequent Optimization & Verification Activities (10-11) */}
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center justify-between font-technical text-xs">
                <span className="font-bold text-[#1b1c18]">
                  B. Subsequent Optimization &amp; Verification Activities (10 – 11)
                </span>
                <span className="text-[#536600] font-bold">Completed Post-Route</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {optimizationPhaseStages.map((stage) => {
                  const isSelected = stage.id === selectedStageId;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStageId(stage.id)}
                      className={`p-3.5 text-left border transition-colors cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#171a18] text-[#fbf9f3] border-[#171a18] ring-1 ring-[#cef053]'
                          : 'bg-[#ffffff] text-[#1b1c18] border-[#536600] hover:bg-[#f5f3ed]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-technical text-xs">
                        <span className={isSelected ? 'text-[#cef053] font-bold' : 'text-[#536600] font-bold'}>
                          Stage {stage.num} · {stage.phaseLabel}
                        </span>
                        <Wrench
                          className={`w-3.5 h-3.5 ${isSelected ? 'text-[#cef053]' : 'text-[#536600]'}`}
                        />
                      </div>
                      <div className="font-serif text-base font-medium mt-1.5">
                        {stage.title}
                      </div>
                      <div
                        className={`font-technical text-[11px] mt-1 ${
                          isSelected ? 'text-[#c5c7be]' : 'text-[#757872]'
                        }`}
                      >
                        {stage.id === 'route-eco-drc'
                          ? 'Initial 10 DRCs → 0 DRC Violations (Verified)'
                          : 'LVT · Useful Skew · I2O (+0.028 ns) · Default (+0.186 ns)'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Not Claimed / Upcoming Boundary */}
            <div className="lg:col-span-4 space-y-2 flex flex-col">
              <div className="font-technical text-xs font-bold text-[#757872]">
                C. Downstream Boundary (Not Claimed)
              </div>
              <div className="flex-1 p-3.5 border border-dashed border-[#757872] bg-[#f5f3ed] flex flex-col justify-between text-xs">
                <div className="flex items-center justify-between font-technical text-[#757872]">
                  <span className="font-bold text-[#1b1c18]">GDSII Delivery &amp; Tape-Out</span>
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <p className="text-[#454843] leading-relaxed mt-1.5">
                  This project is not represented as GDSII-delivered, LVS-signed-off, fully closed
                  across all timing groups, or taped out for fabrication.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Stage Inspector Panel */}
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border border-[#1b1c18] bg-[#ffffff] grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#d8d7ce]"
        >
          <div className="lg:col-span-7 p-5 space-y-3">
            <div className="flex flex-wrap items-center gap-2 font-technical text-xs text-[#757872]">
              <span className="font-bold text-[#1b1c18]">Stage {activeStage.num}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#536600] font-bold">{activeStage.phaseLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{activeStage.tool}</span>
              {activeStage.database && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#1b1c18] font-semibold">{activeStage.database}</span>
                </>
              )}
            </div>
            <h4 className="font-serif text-2xl text-[#1b1c18] font-normal">
              {activeStage.title}
            </h4>
            <p className="text-sm text-[#454843] leading-relaxed">{activeStage.summary}</p>
            <p className="text-xs text-[#757872] leading-relaxed pt-2 border-t border-[#d8d7ce]">
              {activeStage.notes}
            </p>
          </div>

          <div className="lg:col-span-5 p-5 bg-[#171a18] text-[#fbf9f3] space-y-3 font-technical text-xs">
            <div className="text-[#cef053] font-bold pb-2 border-b border-[#333833]">
              Verified Stage Data
            </div>
            <div className="divide-y divide-[#252a26]">
              {activeStage.metrics.map((m) => (
                <div key={m.label} className="py-2 flex items-center justify-between gap-4">
                  <span className="text-[#9ea099]">{m.label}</span>
                  <span className="text-[#ffffff] font-bold tabular-nums text-right">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 03 — PHYSICAL DESIGN ANALYSIS */}
      <section id="cva6-cs-03" className="p-6 md:p-8 bg-[#ffffff] space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
          <div>
            <div className="font-technical text-xs text-[#536600] font-bold">
              03. Physical Design Analysis
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-0.5">
              Floorplan Geometry, Macro Channels, Utilization &amp; Congestion Progression
            </h3>
          </div>
          <span className="font-technical text-xs text-[#757872]">
            950 × 916 · 850,552 µm² · 20 µm Channels · 30% Blockage
          </span>
        </div>

        {/* Floorplan & Placement Foundation Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 border border-[#d8d7ce] divide-x divide-y lg:divide-y-0 divide-[#d8d7ce] bg-[#fbf9f3] font-technical text-xs">
          <div className="p-3.5">
            <div className="text-[11px] text-[#757872]">Dimensions</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1 tabular-nums">950 × 916</div>
          </div>
          <div className="p-3.5">
            <div className="text-[11px] text-[#757872]">Floorplan Area</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1 tabular-nums">850,552 µm²</div>
          </div>
          <div className="p-3.5">
            <div className="text-[11px] text-[#757872]">Macro Channels</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1 tabular-nums">20 µm</div>
          </div>
          <div className="p-3.5">
            <div className="text-[11px] text-[#757872]">Partial Blockage</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1 tabular-nums">30% density</div>
          </div>
          <div className="p-3.5">
            <div className="text-[11px] text-[#757872]">Placement Util</div>
            <div className="text-sm font-bold text-[#536600] mt-1 tabular-nums">82.6%</div>
          </div>
          <div className="p-3.5">
            <div className="text-[11px] text-[#757872]">Placement Overflow</div>
            <div className="text-sm font-bold text-[#536600] mt-1 tabular-nums">0.20%</div>
          </div>
          <div className="p-3.5">
            <div className="text-[11px] text-[#757872]">Hotspot Score</div>
            <div className="text-sm font-bold text-[#536600] mt-1 tabular-nums">1.56</div>
          </div>
        </div>

        {/* Exact Stage-by-Stage Measured Data Table */}
        <div className="border border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] overflow-x-auto">
          <div className="px-4 py-3 border-b border-[#333833] flex flex-wrap items-center justify-between gap-2 font-technical text-xs">
            <span className="text-[#cef053] font-bold">
              Measured Implementation Progression (Exact Verified Values)
            </span>
            <span className="text-[#9ea099]">Placement Database Suitable for CTS: cva6_fp1.db</span>
          </div>
          <table className="w-full text-left font-technical text-xs">
            <thead>
              <tr className="border-b border-[#333833] text-[#9ea099]">
                <th className="py-2.5 px-4">Stage / Iteration</th>
                <th className="py-2.5 px-3">Database Ref</th>
                <th className="py-2.5 px-3 text-right">Core Util</th>
                <th className="py-2.5 px-3 text-right">Overflow</th>
                <th className="py-2.5 px-3 text-right">Horiz (H)</th>
                <th className="py-2.5 px-3 text-right">Vert (V)</th>
                <th className="py-2.5 px-3 text-right">Hotspot</th>
                <th className="py-2.5 px-4">Physical / DRC Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252a26] text-[#c5c7be]">
              {STAGE_METRICS_TABLE.map((row, idx) => (
                <tr
                  key={row.stage}
                  className={idx === STAGE_METRICS_TABLE.length - 1 ? 'bg-[#1e221f] text-[#ffffff]' : ''}
                >
                  <td className="py-3 px-4 font-bold text-[#ffffff] whitespace-nowrap">
                    {row.stage}
                  </td>
                  <td className="py-3 px-3 text-[#cef053] whitespace-nowrap">{row.database}</td>
                  <td className="py-3 px-3 text-right tabular-nums">{row.util}</td>
                  <td className="py-3 px-3 text-right tabular-nums font-semibold text-[#ffffff]">
                    {row.overflow}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums">{row.hOverflow}</td>
                  <td className="py-3 px-3 text-right tabular-nums">{row.vOverflow}</td>
                  <td className="py-3 px-3 text-right tabular-nums font-semibold text-[#ffffff]">
                    {row.hotspot}
                  </td>
                  <td
                    className={`py-3 px-4 ${
                      idx === STAGE_METRICS_TABLE.length - 1
                        ? 'text-[#cef053] font-bold'
                        : 'text-[#c5c7be]'
                    }`}
                  >
                    {row.drcAntenna}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 border-t border-[#333833] text-[11px] font-technical text-[#9ea099]">
            *Note on Utilization &amp; DRCs: The 100% core utilization reported in Routing and
            Post-Route runs reflects filler-populated route-stage reporting and must not be confused
            with placement utilization (82.6%). Similarly, the 10 DRCs recorded in Post-Route
            Iteration 1 were the initial post-route count prior to Route ECO (final verified DRC count:
            0).
          </div>
        </div>

        {/* Genuine Physical Visual Evidence Grid (3 captures) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            EVIDENCE_ARTIFACTS.floorplan,
            EVIDENCE_ARTIFACTS.placementCongestion,
            EVIDENCE_ARTIFACTS.routeCongestionRpt
          ].map((art) => (
            <div key={art.id} className="border border-[#d8d7ce] bg-[#fbf9f3] flex flex-col">
              <div
                onClick={() => openModal(art)}
                className="bg-[#0b0d0c] p-2.5 aspect-[16/10] flex items-center justify-center cursor-pointer group relative overflow-hidden border-b border-[#d8d7ce]"
              >
                <img
                  src={art.src}
                  alt={art.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[#000000]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-[11px] font-bold">
                    Inspect Full Resolution
                  </span>
                </div>
              </div>
              <div className="p-3.5 space-y-1 flex-1">
                <div className="font-technical text-[11px] text-[#536600] font-bold">
                  {art.stage}
                </div>
                <div className="font-serif text-base text-[#1b1c18] font-medium leading-snug">
                  {art.title}
                </div>
                <p className="text-xs text-[#454843] leading-relaxed">{art.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 — CLOCK TREE AND TIMING */}
      <section id="cva6-cs-04" className="p-6 md:p-8 bg-[#fbf9f3] space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
          <div>
            <div className="font-technical text-xs text-[#536600] font-bold">
              04. Clock Tree and Timing
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-0.5">
              CTS Analysis, Post-CTS Report Evaluation &amp; Transition Behavior
            </h3>
          </div>
          <span className="font-technical text-xs text-[#757872]">
            CTS Iter 1 &rarr; Post-CTS Iter 1 (cva6_cts.db)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CTS Iteration 1 */}
          <div className="border border-[#d8d7ce] bg-[#ffffff] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#d8d7ce] font-technical text-xs">
              <span className="font-bold text-[#1b1c18]">Clock Tree Synthesis — Iteration 1</span>
              <span className="text-[#536600] font-bold">CCOpt</span>
            </div>
            <div className="grid grid-cols-2 gap-3 font-technical text-xs">
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] text-[11px]">Core Utilization</div>
                <div className="text-base font-bold text-[#1b1c18] mt-0.5 tabular-nums">83.2%</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] text-[11px]">Congestion Overflow</div>
                <div className="text-base font-bold text-[#1b1c18] mt-0.5 tabular-nums">0.47%</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] text-[11px]">Directional Overflow</div>
                <div className="text-sm font-bold text-[#1b1c18] mt-0.5 tabular-nums">
                  0.11% H · 0.36% V
                </div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] text-[11px]">Hotspot Score</div>
                <div className="text-base font-bold text-[#1b1c18] mt-0.5 tabular-nums">14.83</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#454843] leading-relaxed">
              <strong className="text-[#1b1c18]">Technical Observation:</strong> Congestion improved
              relative to earlier placement runs, confirming that the 20 µm macro channels and 30%
              partial blockages absorbed clock tree buffer insertion cleanly. However,
              maximum-transition violations surfaced during CTS and required targeted attention in
              post-CTS analysis.
            </p>
          </div>

          {/* Post-CTS Analysis Iteration 1 */}
          <div className="border border-[#d8d7ce] bg-[#ffffff] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#d8d7ce] font-technical text-xs">
              <span className="font-bold text-[#1b1c18]">Post-CTS Analysis — Iteration 1</span>
              <span className="text-[#536600] font-bold">cva6_cts.db</span>
            </div>
            <div className="grid grid-cols-2 gap-3 font-technical text-xs">
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] text-[11px]">Core Utilization</div>
                <div className="text-base font-bold text-[#1b1c18] mt-0.5 tabular-nums">83.6%</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] text-[11px]">Congestion Overflow</div>
                <div className="text-base font-bold text-[#1b1c18] mt-0.5 tabular-nums">0.53%</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] text-[11px]">Directional Overflow</div>
                <div className="text-sm font-bold text-[#1b1c18] mt-0.5 tabular-nums">
                  0.11% H · 0.42% V
                </div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] text-[11px]">Hotspot Score</div>
                <div className="text-base font-bold text-[#1b1c18] mt-0.5 tabular-nums">16.39</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#454843] leading-relaxed">
              <strong className="text-[#1b1c18]">Reports Evaluated:</strong> Evaluated propagated
              setup timing, multi-corner hold timing, electrical transition violations, and global
              congestion distribution on <code className="font-technical text-[#1b1c18]">cva6_cts.db</code>{' '}
              before handing off to detailed routing, setting the baseline for later post-route LVT
              and useful-skew experiments.
            </p>
          </div>
        </div>

        {/* Genuine Post-CTS Setup & Hold Evidence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[EVIDENCE_ARTIFACTS.postCtsSetup, EVIDENCE_ARTIFACTS.postCtsHold].map((art) => (
            <div key={art.id} className="border border-[#d8d7ce] bg-[#ffffff] flex flex-col">
              <div
                onClick={() => openModal(art)}
                className="bg-[#0b0d0c] p-3 h-48 flex items-center justify-center cursor-pointer group relative overflow-hidden border-b border-[#d8d7ce]"
              >
                <img
                  src={art.src}
                  alt={art.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[#000000]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-[11px] font-bold">
                    Inspect Report
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="font-serif text-base text-[#1b1c18] font-medium">{art.title}</div>
                <p className="text-xs text-[#454843] leading-relaxed">{art.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — ROUTING AND DEBUGGING (Route ECO — Macro Pin Via Optimization) */}
      <section id="cva6-cs-05" className="p-6 md:p-8 bg-[#ffffff] space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
          <div>
            <div className="font-technical text-xs text-[#536600] font-bold">
              05. Routing and Debugging
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-0.5">
              Route ECO — Macro Pin Via Optimization
            </h3>
          </div>
          <span className="font-technical text-xs font-bold text-[#536600]">
            Initial Post-Route: 10 DRCs &rarr; Post-ECO Final: 0 DRC Violations
          </span>
        </div>

        {/* Context: Routing Iteration 1 -> Post-Route Iteration 1 -> Route ECO */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#d8d7ce] divide-y md:divide-y-0 md:divide-x divide-[#d8d7ce] bg-[#fbf9f3] font-technical text-xs">
          <div className="p-4 space-y-1">
            <div className="text-[#757872]">Routing — Iteration 1 (cva6_pcts.db)</div>
            <div className="text-xl font-bold text-[#1b1c18] tabular-nums">40 Initial DRCs</div>
            <div className="text-[#454843]">
              0.51% overflow (0.20% H / 0.31% V) · Hotspot 18.12 · 0 Antenna · 100% run util
            </div>
          </div>
          <div className="p-4 space-y-1">
            <div className="text-[#757872]">Post-Route — Iteration 1 (cva6_route.db)</div>
            <div className="text-xl font-bold text-[#1b1c18] tabular-nums">
              10 Initial Post-Route DRCs
            </div>
            <div className="text-[#454843]">
              0.51% overflow · Hotspot 18.12 · 100% run util (Initial count, NOT final)
            </div>
          </div>
          <div className="p-4 space-y-1 bg-[#171a18] text-[#fbf9f3]">
            <div className="text-[#9ea099]">After Route ECO &amp; Manual Corrections</div>
            <div className="text-xl font-bold text-[#cef053] tabular-nums">0 DRC Violations</div>
            <div className="text-[#c5c7be]">
              Verified via Cadence Innovus Verify DRC across full die sub-area
            </div>
          </div>
        </div>

        {/* Dedicated Debugging & Corrective Actions Procedure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 border border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#333833] font-technical text-xs">
              <span className="text-[#cef053] font-bold flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                Documented Debugging &amp; Corrective Actions
              </span>
            </div>

            <ol className="space-y-3 text-xs text-[#d8d7ce] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="font-technical text-[#cef053] font-bold shrink-0">01.</span>
                <span>
                  <strong className="text-[#ffffff]">Investigated WMJ violations:</strong> Inspected
                  the 10 remaining post-route DRCs and isolated wide-metal-jog (WMJ) violations on
                  upper metal routing above memory macros.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-technical text-[#cef053] font-bold shrink-0">02.</span>
                <span>
                  <strong className="text-[#ffffff]">Replaced problematic vias:</strong> Replaced
                  violating vias positioned directly over macro pin geometries.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-technical text-[#cef053] font-bold shrink-0">03.</span>
                <span>
                  <strong className="text-[#ffffff]">Rotated vias:</strong> Rotated macro-pin vias
                  to align cut/enclosure geometry and eliminate the identified WMJ spacing errors.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-technical text-[#cef053] font-bold shrink-0">04.</span>
                <span>
                  <strong className="text-[#ffffff]">Reran constrained Route ECO:</strong> Executed
                  route ECO with{' '}
                  <code className="font-technical text-[#cef053] bg-[#252a26] px-1.5 py-0.5">
                    route_via_with_block_pins_only true
                  </code>{' '}
                  to restrict via fixes cleanly around block pins.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-technical text-[#cef053] font-bold shrink-0">05.</span>
                <span>
                  <strong className="text-[#ffffff]">Verified DRC closure:</strong> Executed
                  subsequent DRC verification confirming{' '}
                  <strong className="text-[#cef053]">DRC violations: 0</strong>.
                </span>
              </li>
            </ol>

            <div className="pt-3 border-t border-[#333833] font-technical text-[11px] text-[#9ea099]">
              Command constraint applied:{' '}
              <span className="text-[#cef053]">route_via_with_block_pins_only true</span>
            </div>
          </div>

          {/* Genuine Before-and-After Screenshot Comparison (10 DRCs -> 0 DRCs) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* BEFORE: Initial Post-Route 10 DRCs */}
            <div className="border border-[#d8d7ce] bg-[#fbf9f3] flex flex-col justify-between">
              <div className="px-3.5 py-2.5 border-b border-[#d8d7ce] flex items-center justify-between font-technical text-[11px]">
                <span className="font-bold text-[#1b1c18]">BEFORE // INITIAL POST-ROUTE</span>
                <span className="text-[#b91c1c] font-bold tabular-nums">10 DRCs</span>
              </div>
              <div
                onClick={() => openModal(EVIDENCE_ARTIFACTS.postRouteDrc10)}
                className="bg-[#0b0d0c] p-3 h-48 flex items-center justify-center cursor-pointer group relative overflow-hidden"
              >
                <img
                  src={EVIDENCE_ARTIFACTS.postRouteDrc10.src}
                  alt={EVIDENCE_ARTIFACTS.postRouteDrc10.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[#000000]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-[11px] font-bold">
                    Inspect 10-DRC Table
                  </span>
                </div>
              </div>
              <div className="p-3.5 border-t border-[#d8d7ce] text-xs text-[#454843] leading-relaxed">
                Initial post-route summary (<code className="font-technical text-[#1b1c18]">cva6_route.db</code>)
                showing 7 WMJ violations on M4, 2 shorts, and 1 VIA3 enclosure violation prior to
                macro-pin via ECO.
              </div>
            </div>

            {/* AFTER: Route ECO Verified 0 DRCs (Artifact 1) */}
            <div className="border border-[#536600] bg-[#ffffff] flex flex-col justify-between">
              <div className="px-3.5 py-2.5 border-b border-[#d8d7ce] bg-[#171a18] flex items-center justify-between font-technical text-[11px]">
                <span className="font-bold text-[#cef053]">AFTER // ROUTE ECO VERIFIED</span>
                <span className="text-[#cef053] font-bold tabular-nums">0 Viols.</span>
              </div>
              <div
                onClick={() => openModal(EVIDENCE_ARTIFACTS.verifyDrcZero)}
                className="bg-[#0b0d0c] p-3 h-48 flex items-center justify-center cursor-pointer group relative overflow-hidden"
              >
                <img
                  src={EVIDENCE_ARTIFACTS.verifyDrcZero.src}
                  alt={EVIDENCE_ARTIFACTS.verifyDrcZero.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[#000000]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2.5 py-1 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-[11px] font-bold">
                    Inspect 0-DRC Output
                  </span>
                </div>
              </div>
              <div className="p-3.5 border-t border-[#d8d7ce] text-xs text-[#454843] leading-relaxed">
                Genuine Cadence Innovus <code className="font-technical text-[#1b1c18]">VERIFY DRC</code>{' '}
                output across full sub-area <code className="font-technical text-[#1b1c18]">{'{0.000 0.000 950.320 916.500}'}</code>:
                <strong className="text-[#536600]"> Verification Complete : 0 Viols.</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Route-Stage Artifacts Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#d8d7ce] font-technical text-xs">
          <span className="text-[#757872]">
            Supporting Routing Captures (Click to inspect genuine Innovus artifacts):
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { art: EVIDENCE_ARTIFACTS.routeDrc40, label: 'Initial Route DRCs (40)' },
              { art: EVIDENCE_ARTIFACTS.routeAntenna, label: 'Antenna Check (0 Violations)' },
              { art: EVIDENCE_ARTIFACTS.postRouteMap, label: 'Post-Route Physical Map' }
            ].map((item) => (
              <button
                key={item.art.id}
                onClick={() => openModal(item.art)}
                className="px-3 py-1.5 bg-[#fbf9f3] hover:bg-[#1b1c18] text-[#1b1c18] hover:text-[#cef053] border border-[#d8d7ce] hover:border-[#1b1c18] transition-colors cursor-pointer font-bold whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — TIMING OPTIMIZATION (Timing Closure — Post-Route Optimization) */}
      <section id="cva6-cs-06" className="p-6 md:p-8 bg-[#fbf9f3] space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
          <div>
            <div className="font-technical text-xs text-[#536600] font-bold">
              06. Timing Optimization
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-0.5">
              Timing Closure — Post-Route Optimization
            </h3>
          </div>
          <span className="font-technical text-xs text-[#757872]">
            LVT Exploration · Useful Skew · Group-Specific Constraint Fixes
          </span>
        </div>

        {/* Strict Technical Accuracy Guardrail for Timing Groups */}
        <div className="p-4 bg-[#ffffff] border border-[#1b1c18] flex items-start gap-3 text-xs">
          <ShieldCheck className="w-4 h-4 text-[#536600] shrink-0 mt-0.5" />
          <div className="text-[#454843] leading-relaxed">
            <strong className="font-technical text-[#1b1c18] uppercase">
              Timing Group Demarcation:{' '}
            </strong>
            The reported positive WNS values below—<strong>I2O (+0.028 ns)</strong> and{' '}
            <strong>Default (+0.186 ns)</strong>—belong strictly to separate timing path groups.
            Neither value represents overall design WNS, and complete timing closure across all
            timing groups is not claimed.
          </div>
        </div>

        {/* C & D: Targeted Timing Group Fixes (Prominent 2-Column Comparison) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* C. I2O Group Timing Fix */}
          <div className="border border-[#536600] bg-[#ffffff] flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#d8d7ce] font-technical text-xs">
                <span className="font-bold text-[#1b1c18]">C. I2O Group Timing Fix</span>
                <span className="text-[#536600] font-bold">Status: Fixed</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-2 border-b border-[#e6e4dc] font-technical">
                <span className="text-xs text-[#757872]">I2O Path Group WNS</span>
                <span className="text-2xl font-bold text-[#536600] tabular-nums">+0.028 ns</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-[#454843] leading-relaxed">
                <div>
                  <strong className="font-technical text-xs text-[#1b1c18] uppercase block">
                    Approach
                  </strong>
                  Inserted maximum-delay constraints for the input-to-output timing group.
                </div>
                <div>
                  <strong className="font-technical text-xs text-[#1b1c18] uppercase block">
                    Engineering Reason
                  </strong>
                  Input-to-output (I2O) paths lacked valid timing endpoints without an explicit
                  maximum-delay constraint.
                </div>
              </div>
            </div>
            <div className="px-5 py-2.5 bg-[#f5f3ed] border-t border-[#d8d7ce] font-technical text-[11px] text-[#757872]">
              Group Scope: I2O timing group only (separate from overall design WNS)
            </div>
          </div>

          {/* D. Default Group Timing Fix */}
          <div className="border border-[#536600] bg-[#ffffff] flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#d8d7ce] font-technical text-xs">
                <span className="font-bold text-[#1b1c18]">D. Default Group Timing Fix</span>
                <span className="text-[#536600] font-bold">Status: Fixed</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-2 border-b border-[#e6e4dc] font-technical">
                <span className="text-xs text-[#757872]">Default Path Group WNS</span>
                <span className="text-2xl font-bold text-[#536600] tabular-nums">+0.186 ns</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-[#454843] leading-relaxed">
                <div>
                  <strong className="font-technical text-xs text-[#1b1c18] uppercase block">
                    Approach
                  </strong>
                  Reduced IO delay budget from 60% to 40% of the clock period.
                </div>
                <div>
                  <strong className="font-technical text-xs text-[#1b1c18] uppercase block">
                    Engineering Reason
                  </strong>
                  Default timing paths involved reset-port-to-register-CDN paths, where recovery
                  and removal timing checks were relevant.
                </div>
              </div>
            </div>
            <div className="px-5 py-2.5 bg-[#f5f3ed] border-t border-[#d8d7ce] font-technical text-[11px] text-[#757872]">
              Group Scope: Default timing group only (separate from overall design WNS)
            </div>
          </div>
        </div>

        {/* A & B: LVT Cell Exploration & Useful Skew Analysis (Interactive Experiment Toggle) */}
        <div className="border border-[#d8d7ce] bg-[#ffffff]">
          <div className="px-5 py-3.5 bg-[#f5f3ed] border-b border-[#d8d7ce] flex flex-wrap items-center justify-between gap-3">
            <div className="font-technical text-xs font-bold text-[#1b1c18]">
              A &amp; B. Post-Route Timing Optimization Experiments
            </div>
            <div className="flex items-center gap-1 p-1 bg-[#ffffff] border border-[#d8d7ce] font-technical text-xs">
              <button
                onClick={() => setActiveTimingSubtab('lvt')}
                className={`px-3 py-1 font-bold cursor-pointer transition-colors whitespace-nowrap ${
                  activeTimingSubtab === 'lvt'
                    ? 'bg-[#1b1c18] text-[#cef053]'
                    : 'text-[#757872] hover:text-[#1b1c18]'
                }`}
              >
                A. LVT Cell Exploration
              </button>
              <button
                onClick={() => setActiveTimingSubtab('skew')}
                className={`px-3 py-1 font-bold cursor-pointer transition-colors whitespace-nowrap ${
                  activeTimingSubtab === 'skew'
                    ? 'bg-[#1b1c18] text-[#cef053]'
                    : 'text-[#757872] hover:text-[#1b1c18]'
                }`}
              >
                B. Useful Skew Analysis
              </button>
            </div>
          </div>

          {activeTimingSubtab === 'lvt' ? (
            <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-3">
                <h4 className="font-serif text-xl text-[#1b1c18] font-normal">
                  A. LVT Cell Exploration (Optimization Experiment)
                </h4>
                <p className="text-xs sm:text-sm text-[#454843] leading-relaxed">
                  Evaluated Cadence Innovus timing reports before and after enabling Low-Vt (LVT)
                  standard cells to compare both setup and hold timing behavior under post-route
                  parasitics.
                </p>
                <p className="text-xs text-[#757872] leading-relaxed">
                  Presented strictly as a controlled optimization experiment to observe setup-versus-hold
                  sensitivity rather than an unsupported claim of universal timing closure across
                  the entire chip.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[EVIDENCE_ARTIFACTS.beforeLvtSetup, EVIDENCE_ARTIFACTS.afterLvtSetup].map(
                  (art) => (
                    <div key={art.id} className="border border-[#d8d7ce] bg-[#fbf9f3]">
                      <div
                        onClick={() => openModal(art)}
                        className="bg-[#0b0d0c] p-2.5 h-40 flex items-center justify-center cursor-pointer group relative overflow-hidden border-b border-[#d8d7ce]"
                      >
                        <img
                          src={art.src}
                          alt={art.alt}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[#000000]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-2 py-1 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-[10px] font-bold">
                            Inspect Report
                          </span>
                        </div>
                      </div>
                      <div className="p-3 text-xs">
                        <div className="font-technical font-bold text-[#1b1c18]">{art.title}</div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-3">
                <h4 className="font-serif text-xl text-[#1b1c18] font-normal">
                  B. Useful Skew Analysis
                </h4>
                <p className="text-xs sm:text-sm text-[#454843] leading-relaxed">
                  Performed post-route useful-skew analysis and evaluated the resulting setup and
                  hold timing reports to inspect slack redistribution between launch and capture
                  clock endpoints.
                </p>
                <p className="text-xs text-[#757872] leading-relaxed">
                  Both setup and multi-corner hold reports were inspected side-by-side to ensure
                  clock-arrival borrowing did not silently introduce unmonitored hold regressions.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[EVIDENCE_ARTIFACTS.usefulSkewSetup, EVIDENCE_ARTIFACTS.usefulSkewHold].map(
                  (art) => (
                    <div key={art.id} className="border border-[#d8d7ce] bg-[#fbf9f3]">
                      <div
                        onClick={() => openModal(art)}
                        className="bg-[#0b0d0c] p-2.5 h-40 flex items-center justify-center cursor-pointer group relative overflow-hidden border-b border-[#d8d7ce]"
                      >
                        <img
                          src={art.src}
                          alt={art.alt}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-[#000000]/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-2 py-1 bg-[#1b1c18] text-[#cef053] border border-[#cef053] font-technical text-[10px] font-bold">
                            Inspect Report
                          </span>
                        </div>
                      </div>
                      <div className="p-3 text-xs">
                        <div className="font-technical font-bold text-[#1b1c18]">{art.title}</div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 07 — ENGINEERING LEARNINGS */}
      <section id="cva6-cs-07" className="p-6 md:p-8 bg-[#ffffff] space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
          <div>
            <div className="font-technical text-xs text-[#536600] font-bold">
              07. Engineering Learnings
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-0.5">
              Engineering Decisions, Trade-offs &amp; Debugging Methodology
            </h3>
          </div>
          <span className="font-technical text-xs text-[#757872]">
            Show the Engineering — Not Just the Result
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENGINEERING_LEARNINGS.map((item) => (
            <div
              key={item.index}
              className="p-5 border border-[#d8d7ce] bg-[#fbf9f3] flex flex-col justify-between space-y-2.5"
            >
              <div className="space-y-1.5">
                <div className="font-technical text-xs font-bold text-[#536600]">
                  {item.index}. {item.topic}
                </div>
                <p className="text-xs sm:text-sm text-[#454843] leading-relaxed">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Strict Factual Integrity Sign-Off Footer */}
        <div className="p-4 bg-[#171a18] text-[#c5c7be] border border-[#1b1c18] text-xs font-technical flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <span className="text-[#cef053] font-bold">FACTUAL BOUNDARY: </span>
            Verified through Route ECO DRC verification (0 DRC violations) and targeted I2O
            (+0.028 ns) / Default (+0.186 ns) timing group fixes. Complete full-chip timing closure,
            LVS signoff, GDSII stream-out, and silicon tape-out are not claimed.
          </div>
          <span className="text-[#cef053] font-bold shrink-0">GENUINE EDA DATA ONLY</span>
        </div>
      </section>

      {/* Lightbox Modal for High-Resolution Inspection */}
      <AnimatePresence>
        {modalArtifact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-[#171a18]/95 backdrop-blur-sm flex flex-col p-4 md:p-6"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#333833] text-xs font-technical text-[#fbf9f3] gap-3">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="text-[#cef053] font-bold shrink-0">{modalArtifact.stage}</span>
                <span aria-hidden="true" className="text-[#757872]">
                  ·
                </span>
                <span className="font-serif text-base text-[#ffffff] truncate">
                  {modalArtifact.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setZoomScale((z) => Math.max(0.75, z - 0.25))}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-1.5 tabular-nums text-[#cef053]">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={() => setZoomScale((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModalArtifact(null)}
                  className="px-3 py-1.5 bg-[#1b1c18] hover:bg-[#252a26] text-[#cef053] border border-[#cef053] font-bold cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div
              className="flex-1 overflow-auto flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setModalArtifact(null);
              }}
            >
              <img
                src={modalArtifact.src}
                alt={modalArtifact.alt}
                referrerPolicy="no-referrer"
                style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
                className="max-h-[80vh] max-w-full object-contain transition-transform duration-150 select-none"
              />
            </div>

            <div className="pt-3 border-t border-[#333833] text-xs font-technical text-[#c5c7be] text-center">
              {modalArtifact.caption}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
