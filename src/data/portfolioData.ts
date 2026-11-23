/**
 * Silicon Observatory - Factual ASIC Physical Design Portfolio Data
 * Ground truth source: Shanmukha Varma Penmetsa
 * Education: B.Tech ECE (2022-2026), Vignan's Institute of Information Technology
 * Training: Hands-on ASIC Physical Design at Sumedha IT
 * Tools: Cadence Genus, Cadence Innovus, OpenLane | Languages: Verilog HDL, Tcl, Python, Linux Shell
 */

export type TechnicalStatus = 'COMPLETED' | 'IN_PROGRESS' | 'THEORETICAL_STUDY' | 'PLANNED_NOT_STARTED';

export interface VerifiedProject {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'RISC-V_PROCESSOR' | 'CRYPTOGRAPHIC_HARDWARE' | 'STA_TIMING_TESTCASE';
  technologyNode: string;
  edaToolchain: string[];
  languages: string[];
  clockConstraint?: string;
  completedStages: string[];
  currentStatus: {
    synthesis: 'COMPLETED' | 'NOT_STARTED';
    floorplan: 'COMPLETED' | 'NOT_STARTED';
    placement: 'COMPLETED' | 'NOT_STARTED';
    cts: 'COMPLETED' | 'NOT_STARTED';
    postCtsAnalysis: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
    routingConcepts: 'COMPLETED' | 'THEORETICAL_STUDY_COMPLETED' | 'STUDIED';
    detailedRouting: 'COMPLETED' | 'NOT_STARTED';
    postRouteOptimization?: 'COMPLETED' | 'NOT_STARTED';
    gdsiiGeneration?: 'PENDING' | 'NOT_STARTED';
    physicalSignoff: 'PENDING' | 'NOT_REACHED' | 'NOT_COMPLETED';
    tapeout?: 'NOT_REACHED' | 'NOT_COMPLETED';
  };
  overview: string;
  implementationScope: string[];
  verifiedDeliverables: string[];
  honestBoundaryNotes: string[];
}

export interface TechnicalTopic {
  id: string;
  index: string;
  title: string;
  category: string;
  status: TechnicalStatus;
  statusLabel: string;
  description: string;
  scopeSummary: string;
}

export const ENGINEER_PROFILE = {
  name: 'Shanmukha Varma Penmetsa',
  role: 'Entry-Level ASIC Physical Design Engineer',
  tagline: '28 nm Physical Design — RTL Synthesis through Routing & Post-Route Optimization (Cadence Genus & Innovus)',
  technologyNode: '28 nm',
  education: {
    degree: 'B.Tech in Electronics and Communication Engineering',
    institution: "Vignan's Institute of Information Technology",
    duration: '2022 – 2026'
  },
  training: {
    program: 'Hands-on ASIC Physical Design Training (28 nm Node)',
    organization: 'Sumedha IT'
  },
  email: 'psvarma.e@gmail.com',
  github: 'https://github.com/shanmukhavarma007',
  linkedin: 'https://www.linkedin.com/in/shanmukhavarma-penmetsa/',
  statusBadge: 'ENTRY-LEVEL ASIC PHYSICAL DESIGN CANDIDATE',
  summary:
    "Interested in the engineering that takes digital designs from RTL towards physical implementation, I’m an Electronics and Communication Engineering graduate building my career in ASIC Physical Design. Through hands-on training at Sumedha IT, I’ve worked across RTL synthesis and SDC-driven timing constraints using Cadence Genus, followed by floorplanning, macro placement, standard-cell placement, Clock Tree Synthesis (CCOpt), routing, and post-route timing/DRC analysis using Cadence Innovus on the 28 nm node. My work is documented through practical CVA6 implementation and AES synthesis projects, supported by original EDA tool outputs and engineering evidence.",
  edaTools: [
    { name: 'Cadence Genus', role: 'RTL Synthesis, QoR Analysis, SDC constraint application' },
    { name: 'Cadence Innovus', role: 'Floorplanning, Macro Placement, Placement, CTS (CCOpt), Routing & Post-Route Opt' },
    { name: 'OpenLane', role: 'Open-source RTL-to-GDSII flow exposure' }
  ],
  scriptingAndLanguages: [
    { name: 'Verilog HDL', role: 'RTL design, functional modeling, and verification' },
    { name: 'Tcl', role: 'EDA tool automation in Cadence Genus & Innovus' },
    { name: 'Python', role: 'Data parsing and scripting workflows' },
    { name: 'Linux & Shell Scripting', role: 'CLI workflows, batch scripts, and EDA environment setup' }
  ],
  competencies: [
    { area: 'RTL Synthesis', tool: 'Cadence Genus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'SDC Constraints', tool: 'Genus / Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Floorplanning & Macro Placement', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Power Planning', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Standard-Cell Placement', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Clock Tree Synthesis (CCOpt)', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Post-CTS Timing & DRV Analysis', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Signal Routing & Antenna Check', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Route ECO & Macro-Pin Via DRC Closure (0 DRCs)', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Post-Route Timing Opt (LVT, Useful Skew, I2O/Default)', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Static Timing Analysis (STA)', tool: 'Genus / Innovus / Theory', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Congestion & Hotspot Analysis', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'GDSII Generation & Final Signoff (LVS / Full STA)', tool: 'Physical Verification', status: 'PLANNED_NOT_STARTED' as TechnicalStatus }
  ]
};

export interface RecruiterSkillItem {
  name: string;
  level: 'HANDS-ON FLOW' | 'THEORETICAL STUDY' | 'TOOL AUTOMATION';
  toolOrContext: string;
  details: string;
}

export interface RecruiterSkillGroup {
  groupLetter: string;
  groupTitle: string;
  category: string;
  description: string;
  skills: RecruiterSkillItem[];
}

export const RECRUITER_SKILL_GROUPS: RecruiterSkillGroup[] = [
  {
    groupLetter: 'A',
    groupTitle: 'EDA Tools',
    category: 'PRIMARY ASIC EDA TOOLCHAINS',
    description: 'Hands-on flow execution in Cadence synthesis and physical implementation suites and open-source flows.',
    skills: [
      {
        name: 'Cadence Genus',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Synthesis Solution v25.1',
        details: 'RTL logic synthesis, technology library (.lib) compilation, generic mapping, SDC constraint application, and timing QoR analysis.'
      },
      {
        name: 'Cadence Innovus',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Physical Design System',
        details: 'Core & die floorplanning, halo keepouts, SRAM macro placement, global & detailed standard-cell placement, Clock Tree Synthesis (CCOpt), signal routing, and post-route timing/DRC optimization.'
      },
      {
        name: 'OpenLane',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Open-Source ASIC Flow',
        details: 'Exposure to automated RTL-to-GDSII flow steps, configuration variables, and flow orchestration.'
      }
    ]
  },
  {
    groupLetter: 'B',
    groupTitle: 'ASIC Implementation',
    category: 'NETLIST-TO-POST-ROUTE IMPLEMENTATION FLOW',
    description: 'Hands-on physical design flow spanning RTL synthesis through Clock Tree Synthesis, detailed routing, and post-route timing & DRC optimization.',
    skills: [
      {
        name: 'RTL Synthesis',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Genus',
        details: 'Elaborating Verilog HDL into optimized gate-level netlists with area, power, and timing trade-off optimization.'
      },
      {
        name: 'Technology Mapping',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Genus',
        details: 'Mapping generic Boolean gates to 28 nm standard-cell library primitives under target operational conditions.'
      },
      {
        name: 'SDC Constraints',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Genus & Innovus',
        details: 'Defining clock periods (1.5 ns / ~666.67 MHz for CVA6, 1.0 ns for AES), input/output delays, multicycle paths, and clock uncertainty.'
      },
      {
        name: 'Floorplanning & Die Boundary',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Target utilization setup (70%), core-to-die margins, aspect ratio optimization (950 × 916 µm), and 30% partial blockage between macros.'
      },
      {
        name: 'Macro Placement & Pin Access',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: '16 SRAM memory macros placed along periphery with 20 µm macro channel spacing, 30% partial placement blockages, and routing corridor preservation.'
      },
      {
        name: 'Power Planning',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Power ring creation, orthogonal VDD/VSS power strap definition, and power grid connectivity.'
      },
      {
        name: 'Standard-Cell Placement',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus (cva6_fp1.db)',
        details: 'Timing-driven global & detailed standard-cell placement (82.6% core util, 0.20% overflow, 1.56 hotspot) validated suitable for CTS.'
      },
      {
        name: 'Clock Tree Synthesis (CTS)',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus CCOpt',
        details: 'Synthesizing clock trees using Cadence Innovus CCOpt engine (83.2% util, 0.47% overflow, 14.83 hotspot) and post-CTS timing/DRV evaluation (83.6% util, 0.53% overflow).'
      },
      {
        name: 'Signal Routing, Route ECO & 0-DRC Verification',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus (cva6_pcts.db → cva6_route.db)',
        details: 'Routed with 0 antenna violations and 0.51% overflow; resolved 40 initial route DRCs → 10 initial post-route DRCs → 0 verified DRCs via macro-pin via rotation and route_via_with_block_pins_only true.'
      },
      {
        name: 'Post-Route Timing Optimization',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus (cva6_route.db)',
        details: 'Conducted LVT exploration and useful skew analysis, and fixed separate path groups: I2O WNS +0.028 ns (max-delay constraints) and Default WNS +0.186 ns (IO delay budget 60% → 40%).'
      }
    ]
  },
  {
    groupLetter: 'C',
    groupTitle: 'Timing and Physical Analysis',
    category: 'TIMING, CONGESTION & ELECTRICAL RIGOR',
    description: 'Analyzing static timing reports, electrical design rules, congestion distribution, and physical trade-offs.',
    skills: [
      {
        name: 'Static Timing Analysis (STA)',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Genus & Innovus',
        details: 'Setup & hold slack calculations across clock domains, path group decomposition (r2r, r2m, m2r, i2r, i2o, r2o, default).'
      },
      {
        name: 'Setup and Hold Analysis',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Analyzing setup WNS/TNS under nominal/slow corners and hold violations across multi-corner fast libraries (func_hold_ff125c_rcb, func_hold_ffm40c_cb).'
      },
      {
        name: 'Clock Skew Concepts',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Innovus CCOpt',
        details: 'Local skew vs global skew, useful skew exploitation, clock jitter, and clock tree insertion delay balancing.'
      },
      {
        name: 'QoR Analysis',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Genus & Innovus',
        details: 'Comprehensive Quality of Results inspection covering instance count, total cell area, leakage, and timing slack.'
      },
      {
        name: 'Congestion Analysis',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Tracking directional routing overflow across stages (Placement 0.2% → CTS 0.47% → Post-CTS 0.53% → Post-Route 0.51% [531 H, 827 V]) and hotspot evolution (1.56 → 18.12).'
      },
      {
        name: 'Design-Rule Violation Analysis & Route ECO',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Investigated wide-metal-jog (WMJ) violations over macro pins, rotated/replaced vias, reran Route ECO (route_via_with_block_pins_only true), and verified 0 DRC violations (40 route → 10 initial post-route → 0 final) with 0 antenna violations.'
      },
      {
        name: 'Timing-versus-Density Trade-offs',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Balancing critical-cell clustering for net delay reduction against local cell density hotspots and routing blockages.'
      }
    ]
  },
  {
    groupLetter: 'D',
    groupTitle: 'Hardware Description and Scripting',
    category: 'AUTOMATION & CODING',
    description: 'Hardware description modeling, EDA tool automation scripts, and workflow shell programming.',
    skills: [
      {
        name: 'Verilog HDL',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'RTL Design & Simulation',
        details: 'Synthesizable structural and behavioral digital logic design, testbench simulation, and register-transfer level evaluation.'
      },
      {
        name: 'Tcl (Tool Command Language)',
        level: 'TOOL AUTOMATION',
        toolOrContext: 'Genus & Innovus Batch Flows',
        details: 'Scripting batch synthesis runs, floorplan setup commands, design constraint scripts, and automated QoR extraction.'
      },
      {
        name: 'Python',
        level: 'TOOL AUTOMATION',
        toolOrContext: 'Data Processing & Parsing',
        details: 'Parsing timing logs, report formatting, tabular metric aggregation, and workflow utilities.'
      },
      {
        name: 'Linux & Shell/Bash Scripting',
        level: 'TOOL AUTOMATION',
        toolOrContext: 'EDA Workstation Environment',
        details: 'CLI environment management, batch job submission, process scripting, and directory organization on engineering workstations.'
      }
    ]
  }
];

export const VERIFIED_PROJECTS: VerifiedProject[] = [
  {
    id: 'cva6-riscv',
    slug: 'cva6-riscv-processor',
    index: '01 / FLAGSHIP PROJECT',
    title: 'CVA6 RISC-V Processor — 28 nm Physical Implementation, Route ECO & Post-Route Timing',
    subtitle: '11 Verified Implementation & Optimization Stages · 0 Verified DRCs (Post-ECO) · I2O & Default Groups Fixed · GDSII & Signoff Pending',
    category: 'RISC-V_PROCESSOR',
    technologyNode: '28 nm',
    edaToolchain: ['Cadence Genus', 'Cadence Innovus'],
    languages: ['Verilog HDL', 'Tcl', 'Python', 'Linux Shell'],
    clockConstraint: 'Period: 1.5 ns (~666 MHz Single-Clock)',
    completedStages: [
      '01–04: RTL Synthesis (Genus, 178,799 cells), Floorplanning (950 × 916, 850,552 µm²), Macro Placement (20 µm channels, 30% partial blockages) & Power Planning',
      '05–07: Standard-Cell Placement (cva6_fp1.db: 82.6% util, 0.20% overflow, 1.56 hotspot), CCOpt CTS (83.2% util, 0.47% overflow) & Post-CTS Analysis (cva6_cts.db: 83.6% util, 0.53% overflow)',
      '08–09: Signal Routing (cva6_pcts.db: 40 initial DRCs, 0.51% overflow, 18.12 hotspot, 0 antenna) & Initial Post-Route Analysis (cva6_route.db: 10 initial post-route DRCs)',
      '10: Route ECO & Macro-Pin Via Optimization (WMJ via rotation + route_via_with_block_pins_only true) → 0 Verified DRC Violations',
      '11: Post-Route Timing Optimization (LVT exploration, useful skew analysis, I2O group fixed at +0.028 ns WNS, Default group fixed at +0.186 ns WNS)'
    ],
    currentStatus: {
      synthesis: 'COMPLETED',
      floorplan: 'COMPLETED',
      placement: 'COMPLETED',
      cts: 'COMPLETED',
      postCtsAnalysis: 'COMPLETED',
      routingConcepts: 'COMPLETED',
      detailedRouting: 'COMPLETED',
      postRouteOptimization: 'COMPLETED',
      gdsiiGeneration: 'PENDING',
      physicalSignoff: 'PENDING',
      tapeout: 'NOT_REACHED'
    },
    overview:
      'Flagship 28 nm physical implementation of the 64-bit CVA6 RISC-V core spanning 11 verified stages across Cadence Genus and Cadence Innovus (cva6_fp1.db → cva6_cts.db → cva6_pcts.db → cva6_route.db). Core implementation progressed through floorplanning (950 × 916, 850,552 µm², 20 µm macro channels, 30% partial blockages), placement (82.6% util, 0.20% overflow, 1.56 hotspot), CCOpt CTS, routing (0 antenna violations), and post-route analysis (10 initial post-route DRCs). Subsequent Route ECO via rotation over macro pins (route_via_with_block_pins_only true) achieved 0 verified DRC violations, while post-route timing work explored LVT and useful skew and fixed the I2O (+0.028 ns WNS) and Default (+0.186 ns WNS) timing groups individually. Overall multi-group timing signoff, LVS, GDSII delivery, and tape-out remain pending.',
    implementationScope: [
      'Floorplanning & Placement (cva6_fp1.db, suitable for CTS): 950 × 916 die geometry (850,552 µm²), 20 µm macro channel spacing, 30% density partial placement blockages, 82.6% core utilization, 0.20% congestion overflow, and 1.56 hotspot score',
      'CTS — Iteration 1: 83.2% core utilization, 0.47% overflow (0.11% H, 0.36% V), 14.83 hotspot score; improved congestion relative to earlier placement trials while max-transition violations required post-CTS attention',
      'Post-CTS Analysis — Iteration 1 (cva6_cts.db): 83.6% core utilization, 0.53% overflow (0.11% H, 0.42% V), 16.39 hotspot score; evaluated setup, hold, transition, and congestion reports',
      'Routing — Iteration 1 (cva6_pcts.db): 100% reported run utilization (distinct from 82.6% placement utilization), 40 initial DRC violations, 0.51% overflow (0.20% H, 0.31% V), 18.12 hotspot score, and 0 antenna violations',
      'Post-Route Analysis — Iteration 1 (cva6_route.db): 100% reported run utilization, 10 initial post-route DRCs (not the final DRC count), 0.51% overflow, and 18.12 hotspot score',
      'Route ECO — Macro-Pin Via Optimization (Final Verified DRC): Investigated wide-metal-jog (WMJ) violations over macro pins, replaced and rotated problematic vias, reran Route ECO with route_via_with_block_pins_only true, and confirmed 0 DRC violations via Innovus VERIFY DRC',
      'Post-Route Timing Optimization Experiments & Path-Group Fixes: Evaluated LVT cell enabling and useful skew reports (setup & hold); fixed I2O timing group to +0.028 ns WNS via max-delay constraints and fixed Default timing group to +0.186 ns WNS by tightening IO delay budget from 60% to 40% of clock period (reset-to-CDN recovery/removal paths). Neither value is claimed as overall design WNS.'
    ],
    verifiedDeliverables: [
      'Cadence Innovus VERIFY DRC terminal capture confirming 0 DRC violations ("Verification Complete : 0 Viols.") across {0.000 0.000 950.320 916.500} after Route ECO',
      'Before-and-after DRC verification evidence: 40 initial route DRCs → 10 initial post-route DRCs → 0 final verified DRCs',
      'Cadence Innovus hierarchical Amoeba view (ex_stage_i regions, 16 SRAM macros, top I/O ring)',
      'Post-Route timing optimization screenshots: Before/After LVT enabling & Useful Skew setup and hold reports',
      'Routing congestion (0.51% overflow, 18.12 hotspot), spatial die map, and process antenna check (0 violations)',
      'Post-CTS setup/hold timing & DRV reports, placement congestion topography, floorplan geometry, and Cadence Genus synthesis QoR (178,799 leaf cells)'
    ],
    honestBoundaryNotes: [
      'CURRENT STAGE: 11 VERIFIED STAGES COMPLETED (CORE IMPLEMENTATION 01–09 + ROUTE ECO 0-DRC & POST-ROUTE TIMING OPT 10–11). GDSII & SIGNOFF PENDING.',
      'DRC PROGRESSION BOUNDARY: Initial route logged 40 DRCs; initial post-route logged 10 DRCs (NOT final); subsequent Route ECO with macro-pin via rotation achieved 0 verified DRC violations in Innovus VERIFY DRC.',
      'PER-GROUP TIMING BOUNDARY: I2O WNS (+0.028 ns) and Default WNS (+0.186 ns) apply strictly to their respective timing groups — NEVER overall design WNS. Complete timing closure across all timing groups is NOT claimed.',
      'UTILIZATION BOUNDARY: 82.6% placement core utilization (cva6_fp1.db) is strictly distinct from 100% reported run utilization (with fillers) in routing/post-route reports.',
      'SIGN-OFF BOUNDARY: LVS verification, full-chip STA signoff, GDSII stream-out, and silicon tape-out have NOT been completed or delivered.'
    ]
  },
  {
    id: 'aes-core',
    slug: 'aes-cryptographic-core',
    index: '02 / PROJECT',
    title: 'AES Core — RTL Synthesis & Timing Analysis',
    subtitle: 'High-Frequency RTL Synthesis with 1000.0 ps (1.0 ns) Clock in Cadence Genus',
    category: 'CRYPTOGRAPHIC_HARDWARE',
    technologyNode: '28 nm',
    edaToolchain: ['Cadence Genus'],
    languages: ['Verilog HDL', 'Tcl', 'Linux Shell'],
    clockConstraint: 'Period: 1000.0 ps (1.0 ns target, 1.0 GHz)',
    completedStages: [
      'RTL design analysis and synthesizable Verilog compilation',
      'Single-clock SDC constraint formulation (period: 1000.0 ps / 1.0 ns)',
      'RTL logic synthesis using Cadence Genus (Cell Area: 5,774, LeafCells: 9,474)',
      'Sequential instance count: 532, Combinational instance count: 8,942',
      'Timing QoR evaluation in Genus confirming 0 violating paths, 0.0 TNS, max fanout: 401'
    ],
    currentStatus: {
      synthesis: 'COMPLETED',
      floorplan: 'COMPLETED',
      placement: 'NOT_STARTED',
      cts: 'NOT_STARTED',
      postCtsAnalysis: 'NOT_STARTED',
      routingConcepts: 'STUDIED',
      detailedRouting: 'NOT_STARTED',
      physicalSignoff: 'NOT_COMPLETED',
      tapeout: 'NOT_COMPLETED'
    },
    overview:
      'Completed 28 nm RTL logic synthesis project of an Advanced Encryption Standard (AES) cryptographic core using Cadence Genus. Applied a 1000.0 ps (1.0 ns) target clock period SDC constraint, mapped datapath and key-expansion logic to 9,474 standard-cell leaf instances (532 sequential, 8,942 combinational) across 5,774 cell area, achieving zero violating paths, 0.0 TNS, and a maximum fanout of 401.',
    implementationScope: [
      'Compiled synthesizable Verilog HDL descriptions of the AES encryption round and key-expansion logic',
      'Defined single-clock SDC timing constraint with a 1000.0 ps (1.0 ns) target period (1.0 GHz frequency)',
      'Mapped datapath to target library standard cells using Cadence Genus (9,474 leaf instances, 5,774 cell area)',
      'Verified synthesis QoR reports confirming 0 violating paths, 0.0 TNS, and max fanout of 401 on clock network'
    ],
    verifiedDeliverables: [
      'Original Cadence Genus synthesis QoR report screenshot (Period: 1000.0 ps, Cell Area: 5,774.454, 0 violating paths, 0.0 TNS)',
      'Synthesized gate-level netlist in Verilog generated via Cadence Genus',
      'SDC timing constraints file with single-clock definition (1000.0 ps)',
      'Cadence Genus synthesis log and QoR summary reports',
      'Tcl synthesis automation run script'
    ],
    honestBoundaryNotes: [
      'Conducted strictly as an RTL logic synthesis project in Cadence Genus.',
      'Physical implementation stages (floorplanning, placement, CTS, routing) have NOT been started for this core.',
      'Report metrics (1000.0 ps period, 9,474 leaf cells, 532 sequential, 8,942 combinational, 5,774 cell area, 0 violating paths) are strictly synthesis-stage results.',
      'No post-placement, post-CTS, routing, or sign-off timing closure is claimed.',
      'No fabricated power consumption, encryption throughput, or silicon area measurements are claimed.'
    ]
  },
  {
    id: 'half-cycle-timing',
    slug: 'half-cycle-timing-constraint',
    index: '03 / PROJECT',
    title: 'Half-Cycle Timing Constraint Test Case',
    subtitle: 'Cadence Genus STA & SDC Analysis Across 1 ns, 2.2 ns & 4.4 ns Clock Domains',
    category: 'STA_TIMING_TESTCASE',
    technologyNode: '28 nm',
    edaToolchain: ['Cadence Genus'],
    languages: ['Verilog HDL', 'Tcl', 'SDC'],
    clockConstraint: 'Multi-clock: 1.0 ns (1 GHz), 2.2 ns (~450 MHz), 4.4 ns (~230 MHz)',
    completedStages: [
      'RTL modeling of cross-clock and half-cycle register transfers (rtl_halfcycle_crosspaths)',
      'Multi-clock SDC constraint authoring across 3 target periods: 1 ns, 2.2 ns, and 4.4 ns',
      'Static Timing Analysis in Cadence Genus evaluating half-cycle setup and hold windows',
      'Comparative evaluation of timing slack across multiple input/output delay budget variations'
    ],
    currentStatus: {
      synthesis: 'COMPLETED',
      floorplan: 'COMPLETED',
      placement: 'NOT_STARTED',
      cts: 'NOT_STARTED',
      postCtsAnalysis: 'NOT_STARTED',
      routingConcepts: 'STUDIED',
      detailedRouting: 'NOT_STARTED',
      physicalSignoff: 'NOT_COMPLETED',
      tapeout: 'NOT_COMPLETED'
    },
    overview:
      'Rigorous Static Timing Analysis (STA) and SDC constraint test case implemented in Cadence Genus using module rtl_halfcycle_crosspaths. Investigated half-cycle timing paths between positive-edge and negative-edge triggered registers under three clock period constraints: 1.0 ns (1 GHz), 2.2 ns (~450 MHz), and 4.4 ns (~230 MHz). Analyzed setup and hold requirements across diverse I/O delay budgets.',
    implementationScope: [
      'Authored Verilog HDL test circuit containing launch-on-rise, capture-on-fall half-cycle register transfers',
      'Formulated SDC timing constraints defining three distinct clock frequencies: 1 GHz (1.0 ns), ~450 MHz (2.2 ns), and ~230 MHz (4.4 ns)',
      'Analyzed half-cycle path timing reports in Cadence Genus, verifying half-period setup capture requirements (T_period / 2)',
      'Compared setup and hold margins across multiple input and output delay budgets to examine timing closure boundaries'
    ],
    verifiedDeliverables: [
      'Original Cadence Genus GUI design visualization screenshot displaying hierarchical module rtl_halfcycle_crosspaths',
      'Multi-clock SDC timing constraints script covering 1.0 ns, 2.2 ns, and 4.4 ns clock domains',
      'Cadence Genus STA timing slack reports for half-cycle setup and hold paths',
      'Tcl automation script for comparative timing report generation'
    ],
    honestBoundaryNotes: [
      'Conducted strictly as an STA and SDC constraint test case in Cadence Genus.',
      'Focuses on timing equations and constraint behavior across multi-frequency domains.',
      'No physical layout, floorplanning, CTS, or routing was performed for this specific testcase netlist.',
      'All metrics represent verified Cadence Genus STA report outputs.'
    ]
  }
];

export const TECHNICAL_LEARNING_TOPICS: TechnicalTopic[] = [
  {
    id: 'topic-01',
    index: '01 / IMPLEMENTED',
    title: 'RTL Logic Synthesis Flow in Cadence Genus',
    category: 'SYNTHESIS & SDC',
    status: 'COMPLETED',
    statusLabel: 'COMPLETED (HANDS-ON IMPLEMENTATION)',
    description:
      'Practical hands-on experience loading Verilog RTL, applying target technology libraries (.lib), defining SDC constraints, and running logic optimization in Cadence Genus for CVA6 (178,799 leaf cells) and AES cores (9,474 leaf cells).',
    scopeSummary:
      'Completed in Cadence Genus during Sumedha IT training and project coursework.'
  },
  {
    id: 'topic-02',
    index: '02 / IMPLEMENTED',
    title: 'Floorplanning & Macro Placement in Cadence Innovus',
    category: 'PHYSICAL DESIGN',
    status: 'COMPLETED',
    statusLabel: 'COMPLETED (HANDS-ON IMPLEMENTATION)',
    description:
      'Practical implementation of core aspect ratios (950 × 916 µm), 70% target utilization, and peripheral placement of embedded SRAM macros with 15 µm halo channels for the CVA6 core in Cadence Innovus.',
    scopeSummary:
      'Completed in Cadence Innovus for the CVA6 core floorplan.'
  },
  {
    id: 'topic-03',
    index: '03 / IMPLEMENTED',
    title: 'Standard-Cell Placement & Congestion Analysis in Cadence Innovus',
    category: 'PHYSICAL DESIGN',
    status: 'COMPLETED',
    statusLabel: 'COMPLETED (HANDS-ON IMPLEMENTATION)',
    description:
      'Practical execution of global and detailed standard-cell placement in Cadence Innovus, checking cell legality, evaluating placement WNS (-0.483 ns) / TNS (-2035.472 ns), and analyzing 1,529 congestion overflow edges (76 H, 1453 V) with ex_stage_i hotspot analysis (score 4.77).',
    scopeSummary:
      'Completed in Cadence Innovus with comprehensive congestion and density evaluation.'
  },
  {
    id: 'topic-04',
    index: '04 / IMPLEMENTED',
    title: 'Clock Tree Synthesis (CTS) Using Cadence Innovus CCOpt',
    category: 'CLOCKING & CTS',
    status: 'COMPLETED',
    statusLabel: 'COMPLETED (HANDS-ON IMPLEMENTATION)',
    description:
      'Hands-on execution of Clock Tree Synthesis using Cadence Innovus CCOpt engine. Synthesized low-skew balanced clock trees, implemented clock buffers and inverters, and satisfied CTS handoff criteria for the 64-bit CVA6 core under a 1.5 ns clock constraint.',
    scopeSummary:
      'Completed in Cadence Innovus using CCOpt engine.'
  },
  {
    id: 'topic-05',
    index: '05 / IMPLEMENTED',
    title: 'Post-CTS Timing Slack & Electrical DRV Evaluation',
    category: 'POST-CTS ANALYSIS',
    status: 'COMPLETED',
    statusLabel: 'COMPLETED (HANDS-ON IMPLEMENTATION)',
    description:
      'Completed post-CTS timing and DRV evaluation after the Clock Tree Synthesis Stage (83.6% core utilization): Setup WNS improved to -0.248 ns (TNS -185.141 ns, 4,600 violating paths), Hold WNS improved to -0.139 ns (170 paths), and max_tran violations were resolved to 0.',
    scopeSummary:
      'Completed in Cadence Innovus at the Clock Tree Synthesis Stage prior to signal routing.'
  },
  {
    id: 'topic-06',
    index: '06 / IMPLEMENTED',
    title: 'Detailed Signal Routing & Antenna Check in Cadence Innovus',
    category: 'ROUTING',
    status: 'COMPLETED',
    statusLabel: 'COMPLETED (HANDS-ON IMPLEMENTATION)',
    description:
      'Executed signal routing from the Post-CTS Stage under 0.51% total overflow (1,357 edges: 0.20% H, 0.31% V) and 18.12 hotspot score, verifying 0 antenna violations across the routed metal stack while logging 40 initial geometry DRCs for post-route repair.',
    scopeSummary:
      'Completed in Cadence Innovus with verified antenna cleanliness (0 Violations).'
  },
  {
    id: 'topic-07',
    index: '07 / IMPLEMENTED',
    title: 'Route ECO (0 Verified DRCs) & Post-Route Timing Optimization',
    category: 'POST-ROUTE ECO & TIMING',
    status: 'COMPLETED',
    statusLabel: 'COMPLETED (HANDS-ON IMPLEMENTATION)',
    description:
      'Resolved the 10 initial post-route DRCs down to 0 verified DRC violations via macro-pin WMJ via rotation and Route ECO (route_via_with_block_pins_only true). Conducted LVT and useful skew experiments, and fixed I2O (+0.028 ns WNS via max-delay) and Default (+0.186 ns WNS via 60%→40% IO delay budget) timing groups.',
    scopeSummary:
      'Completed in Cadence Innovus on cva6_route.db with verified 0 DRC violations.'
  },
  {
    id: 'topic-08',
    index: '08 / PENDING MILESTONE',
    title: 'GDSII Generation & Final Physical Signoff (LVS / Full-Chip STA)',
    category: 'GDSII & SIGNOFF PENDING',
    status: 'PLANNED_NOT_STARTED',
    statusLabel: 'PENDING (NEXT MILESTONE)',
    description:
      'Upcoming signoff phase following Route ECO 0-DRC verification: closing remaining multi-group timing endpoints across all path groups, executing LVS & final foundry signoff verification, and streaming out GDSII. Not represented as taped out or GDSII-delivered.',
    scopeSummary:
      'Pending final milestone following completed post-route ECO & timing optimization.'
  }
];

export const CVA6_FLOORPLAN_BLOCKS = [
  {
    id: 'blk-sram-icache',
    name: 'ICACHE_SRAM_MACRO',
    type: 'sram_macro' as const,
    x: 80,
    y: 720,
    width: 320,
    height: 240,
    description: 'Instruction cache SRAM macro array placed along northwest core boundary with 20 µm macro channels and 30% partial placement blockage.',
    status: '0 DRCs (Post-ECO)'
  },
  {
    id: 'blk-sram-dcache',
    name: 'DCACHE_SRAM_MACRO',
    type: 'sram_macro' as const,
    x: 600,
    y: 720,
    width: 320,
    height: 240,
    description: 'Data cache SRAM macro array placed along northeast core boundary with 20 µm macro channels; WMJ macro-pin vias resolved via Route ECO.',
    status: '0 DRCs (Post-ECO)'
  },
  {
    id: 'blk-core-ex',
    name: 'EXECUTION_DATAPATH_AREA',
    type: 'core_logic' as const,
    x: 250,
    y: 280,
    width: 500,
    height: 380,
    description: 'Central execution datapath (ex_stage_i). Progressed through placement, CCOpt CTS, routing, and LVT + useful skew optimization.',
    status: 'Post-Route Completed'
  },
  {
    id: 'blk-core-frontend',
    name: 'FRONTEND_CONTROL_AREA',
    type: 'core_logic' as const,
    x: 100,
    y: 100,
    width: 380,
    height: 150,
    description: 'Standard-cell logic area for instruction fetch and decode logic routed and optimized during the Post-Route Stage.',
    status: 'Post-Route Completed'
  },
  {
    id: 'blk-core-lsu',
    name: 'LOAD_STORE_LOGIC_AREA',
    type: 'core_logic' as const,
    x: 520,
    y: 100,
    width: 380,
    height: 150,
    description: 'Standard-cell logic area for load/store unit routed with 0 antenna violations and 0 glitch violations.',
    status: 'Post-Route Completed'
  }
];
