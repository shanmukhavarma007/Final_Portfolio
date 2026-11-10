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
    postCtsAnalysis: 'IN_PROGRESS' | 'NOT_STARTED';
    routingConcepts: 'THEORETICAL_STUDY_COMPLETED' | 'STUDIED';
    detailedRouting: 'NOT_STARTED';
    physicalSignoff: 'NOT_REACHED' | 'NOT_COMPLETED';
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
  tagline: '28 nm Physical Design — Synthesis, Floorplanning, Placement, CTS & Post-CTS Analysis (Cadence Genus & Innovus)',
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
    "Interested in the engineering that takes digital designs from RTL towards physical implementation, I’m an Electronics and Communication Engineering graduate building my career in ASIC Physical Design. Through hands-on training at Sumedha IT, I’ve worked across RTL synthesis and SDC-driven timing constraints using Cadence Genus, followed by floorplanning, macro placement, standard-cell placement, and Clock Tree Synthesis (CCOpt) using Cadence Innovus on the 28 nm node. My work is documented through practical CVA6 implementation, post-CTS timing and DRV analysis, and AES synthesis projects, supported by original EDA tool outputs and engineering evidence.",
  edaTools: [
    { name: 'Cadence Genus', role: 'RTL Synthesis, QoR Analysis, SDC constraint application' },
    { name: 'Cadence Innovus', role: 'Floorplanning, Macro Placement, Placement, CTS (CCOpt) & Post-CTS Analysis' },
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
    { area: 'Post-CTS Timing & DRV Analysis', tool: 'Cadence Innovus', status: 'IN_PROGRESS' as TechnicalStatus },
    { area: 'Static Timing Analysis (STA)', tool: 'Genus / Innovus / Theory', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Congestion & Hotspot Analysis', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Routing Concepts', tool: 'Theoretical Study', status: 'THEORETICAL_STUDY' as TechnicalStatus },
    { area: 'Detailed Routing', tool: 'Cadence Innovus', status: 'PLANNED_NOT_STARTED' as TechnicalStatus },
    { area: 'Physical Signoff (DRC/LVS)', tool: 'Physical Verification', status: 'PLANNED_NOT_STARTED' as TechnicalStatus }
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
        details: 'Core & die floorplanning, halo keepouts, SRAM macro placement, global & detailed standard-cell placement, Clock Tree Synthesis (CCOpt), and post-CTS timing/DRV analysis.'
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
    category: 'NETLIST-TO-CTS IMPLEMENTATION FLOW',
    description: 'Complete physical design flow spanning RTL synthesis through Clock Tree Synthesis and post-CTS analysis.',
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
        details: 'Target utilization setup (70%), core-to-die margins, aspect ratio optimization (950 × 916 µm), and core row establishment.'
      },
      {
        name: 'Macro Placement & Pin Access',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'SRAM memory macro placement along periphery, 15 µm halo channels between macros, and preserving routing corridors.'
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
        toolOrContext: 'Cadence Innovus',
        details: 'Timing-driven global & detailed standard-cell placement across core rows with checkPlace legalization checks.'
      },
      {
        name: 'Clock Tree Synthesis (CTS)',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus CCOpt',
        details: 'Synthesizing clock trees using Cadence Innovus CCOpt engine, clock buffer insertion, and latency balancing.'
      },
      {
        name: 'CCOpt Execution',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Concurrent clock and datapath optimization to achieve balanced clock insertion delay and target skew.'
      },
      {
        name: 'Post-CTS Analysis',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Evaluating post-CTS setup slack (WNS -0.318 ns), hold slack across path groups (WNS -0.224 ns), and electrical DRVs.'
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
        details: 'Inspecting horizontal & vertical routing overflow edges (1,529 overflow edges), GCell congestion distribution, and hotspot scores.'
      },
      {
        name: 'Design-Rule Violation Analysis',
        level: 'HANDS-ON FLOW',
        toolOrContext: 'Cadence Innovus',
        details: 'Evaluating max_transition (7 nets violating), max_fanout (902 nets violating), max_capacitance, and max_length electrical rules.'
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
    index: '01 / PROJECT',
    title: 'CVA6 RISC-V Processor — Synthesis, Placement, CTS & Post-CTS Analysis',
    subtitle: 'RTL Synthesis, Floorplanning, Placement, CTS (CCOpt) & Post-CTS Timing/DRV Analysis in Cadence Genus & Innovus (28 nm)',
    category: 'RISC-V_PROCESSOR',
    technologyNode: '28 nm',
    edaToolchain: ['Cadence Genus', 'Cadence Innovus'],
    languages: ['Verilog HDL', 'Tcl', 'Python', 'Linux Shell'],
    clockConstraint: 'Period: 1.5 ns (approx. 666.67 MHz, Synthesis & CTS Target)',
    completedStages: [
      'RTL logic synthesis in Cadence Genus (178,799 leaf instances, 28 nm)',
      'Floorplan planning & core boundary creation (Target util: 70%, 950 × 916 µm)',
      'Macro placement with 15 µm channels & halo keepouts for SRAM arrays',
      'Power planning & orthogonal power strap distribution',
      'Standard-cell placement in Cadence Innovus with congestion analysis',
      'Clock Tree Synthesis completed using Cadence Innovus CCOpt engine',
      'Post-CTS setup timing, hold timing, and design-rule violation (DRV) analysis'
    ],
    currentStatus: {
      synthesis: 'COMPLETED',
      floorplan: 'COMPLETED',
      placement: 'COMPLETED',
      cts: 'COMPLETED',
      postCtsAnalysis: 'IN_PROGRESS',
      routingConcepts: 'THEORETICAL_STUDY_COMPLETED',
      detailedRouting: 'NOT_STARTED',
      physicalSignoff: 'NOT_REACHED',
      tapeout: 'NOT_REACHED'
    },
    overview:
      'Comprehensive 28 nm physical design implementation of the 64-bit CVA6 (Ariane) RISC-V processor core. Completed RTL logic synthesis in Cadence Genus (178,799 leaf cells), established floorplan geometry with 15 µm macro channels, executed standard-cell placement, and completed Clock Tree Synthesis (CTS) using Cadence Innovus CCOpt. Currently conducting in-depth post-CTS timing and electrical DRV analysis while mastering routing concepts theoretically.',
    implementationScope: [
      'RTL Synthesis: Elaborated CVA6 RTL into 178,799 leaf cells (23,675 sequential, 155,124 combinational) in Cadence Genus',
      'Floorplanning: Target utilization 70%, 15 µm channels between SRAM macros to ensure routing accessibility and pin escape',
      'Placement & Congestion: Timing-driven placement resulting in WNS -0.483 ns, TNS -2035.472 ns, 1529 congestion overflow edges (76 H, 1453 V), hotspot ex_stage_i score 4.77',
      'CTS Completed: Invoked Cadence Innovus CCOpt engine, synthesized clock networks, and validated initial handoff timing compliance',
      'Post-CTS Analysis: Evaluated post-CTS setup slack (WNS -0.318 ns, TNS -243.042 ns), hold slack across path groups (WNS -0.224 ns, TNS -72.328 ns), and DRVs (7 max_tran violations, 902 max_fanout violations); recorded post-CTS core utilization of 82.7%',
      'Routing Concepts: Completed theoretical study of global and detailed routing algorithms, track assignments, and DRC signoff criteria'
    ],
    verifiedDeliverables: [
      'Cadence Innovus post-CTS setup mode timing & DRV summary report screenshot (WNS: -0.318 ns, TNS: -243.042 ns, 6,356 violating paths)',
      'Cadence Innovus post-CTS hold timing report screenshot across functional hold corners (WNS: -0.224 ns, TNS: -72.328 ns, 1,249 violating paths)',
      'Cadence Innovus placement congestion distribution & hotspot report screenshot (Overflow: 5452 = 516 H + 4936 V, max hotspot: 34.08)',
      'Cadence Innovus placement congestion map overlay screenshot displaying macro channels and execution datapath congestion',
      'Cadence Innovus placement density topography map screenshot',
      'Cadence Innovus 28 nm floorplan geometry screenshot with peripheral SRAM macro arrangement (950 × 916 µm)',
      'Cadence Innovus placement-stage setup timing report screenshot (WNS: -0.483 ns, TNS: -2035.472 ns)',
      'Cadence Genus synthesis Quality of Results (QoR) report screenshot (178,799 leaf cells, 23,675 sequential, 155,124 combinational)',
      'Cadence Innovus committed floorplan database (cva6_fp1.db)',
      'Tcl execution scripts for reproducible Genus synthesis and Innovus placement/CCOpt CTS flows'
    ],
    honestBoundaryNotes: [
      'Clock Tree Synthesis (CTS) is COMPLETED using Cadence Innovus CCOpt.',
      'Post-CTS timing and design-rule analysis is actively IN PROGRESS.',
      'Routing concepts have been studied THEORETICALLY; practical detailed routing has NOT yet been confirmed or run.',
      'Physical sign-off (DRC/LVS) and tape-out have NOT been performed.',
      'Synthesis metrics (178,799 leaf cells, 23,675 sequential, 155,124 combinational) represent gate-level netlist statistics.',
      'Placement metrics (WNS -0.483 ns, TNS -2035.472 ns, 1529 overflow edges) are strictly placement-stage results.',
      'Post-CTS metrics (WNS -0.318 ns, TNS -243.042 ns, hold WNS -0.224 ns, core util 82.7%) represent actual post-CTS observations.',
      'No fabricated DRC/LVS signoff, routing completion, or silicon tapeout claims are made.'
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
    index: '05 / IN PROGRESS',
    title: 'Post-CTS Timing Slack & Electrical DRV Analysis',
    category: 'POST-CTS ANALYSIS',
    status: 'IN_PROGRESS',
    statusLabel: 'IN PROGRESS (ACTIVE ANALYSIS)',
    description:
      'Active investigation of post-CTS timing reports: setup WNS (-0.318 ns, TNS -243.042 ns across 53,382 paths), hold timing slack across functional corners (func_hold_ff125c_rcb, func_hold_ffm40c_cb; WNS -0.224 ns), and electrical DRV evaluation (7 max_tran, 902 max_fanout). Recorded post-CTS core utilization of 82.7%.',
    scopeSummary:
      'In active progress in Cadence Innovus post-CTS database.'
  },
  {
    id: 'topic-06',
    index: '06 / THEORETICAL',
    title: 'Routing Concepts & Detailed Routing Algorithms',
    category: 'ROUTING THEORY',
    status: 'THEORETICAL_STUDY',
    statusLabel: 'THEORETICAL STUDY COMPLETED',
    description:
      'Theoretical mastery of global routing, track assignment, and detailed grid-based routing (maze routing, A* search). Studied antenna effect mitigation, cross-talk coupling, and design rule checking (DRC) fundamentals.',
    scopeSummary:
      'Studied theoretically in training coursework. Practical detailed routing has not yet been confirmed or run.'
  },
  {
    id: 'topic-07',
    index: '07 / THEORETICAL',
    title: 'Power Distribution Network & Dynamic IR Drop',
    category: 'POWER INTEGRITY',
    status: 'THEORETICAL_STUDY',
    statusLabel: 'THEORETICAL STUDY COMPLETED',
    description:
      'Theoretical concepts of on-chip power distribution networks: power rings, orthogonal power straps (VDD/VSS), static vs dynamic IR drop definitions, and decoupling capacitor (decap) placement theory.',
    scopeSummary:
      'Studied theoretically. No dynamic or static IR-drop signoff simulations have been performed.'
  },
  {
    id: 'topic-08',
    index: '08 / FUTURE ROADMAP',
    title: 'Practical Detailed Nano-Routing & DRC/LVS Verification',
    category: 'PHYSICAL VERIFICATION',
    status: 'PLANNED_NOT_STARTED',
    statusLabel: 'PLANNED / NOT STARTED (FUTURE ROADMAP)',
    description:
      'Future technical milestone: invoking the Innovus NanoRoute engine to perform detailed wire routing, resolving remaining electrical DRVs, and executing physical verification checks.',
    scopeSummary:
      'Planned future milestone following post-CTS timing optimization.'
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
    description: 'Instruction cache SRAM macro array placed along northwest core boundary with 15 µm halo channel.',
    status: 'Placed & Oriented'
  },
  {
    id: 'blk-sram-dcache',
    name: 'DCACHE_SRAM_MACRO',
    type: 'sram_macro' as const,
    x: 600,
    y: 720,
    width: 320,
    height: 240,
    description: 'Data cache SRAM macro array placed along northeast core boundary with 15 µm halo channel.',
    status: 'Placed & Oriented'
  },
  {
    id: 'blk-core-ex',
    name: 'EXECUTION_DATAPATH_AREA',
    type: 'core_logic' as const,
    x: 250,
    y: 280,
    width: 500,
    height: 380,
    description: 'Central execution datapath (ex_stage_i). Highest congestion hotspot area (score: 4.77) placed via Innovus.',
    status: 'Standard Cells Placed & CTS Clocked'
  },
  {
    id: 'blk-core-frontend',
    name: 'FRONTEND_CONTROL_AREA',
    type: 'core_logic' as const,
    x: 100,
    y: 100,
    width: 380,
    height: 150,
    description: 'Standard-cell logic area for instruction fetch and decode logic placed and clocked via Cadence Innovus CCOpt.',
    status: 'Standard Cells Placed & CTS Clocked'
  },
  {
    id: 'blk-core-lsu',
    name: 'LOAD_STORE_LOGIC_AREA',
    type: 'core_logic' as const,
    x: 520,
    y: 100,
    width: 380,
    height: 150,
    description: 'Standard-cell logic area for load/store unit and queue logic placed and clocked via Cadence Innovus.',
    status: 'Standard Cells Placed & CTS Clocked'
  }
];
