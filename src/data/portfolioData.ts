/**
 * Silicon Observatory - Factual ASIC Physical Design Portfolio Data
 * Ground truth source: Shanmukha Varma Penmetsa
 * Education: B.Tech ECE (2022-2026), Vignan's Institute of Information Technology
 * Training: Hands-on ASIC Physical Design at Sumedha IT
 * Tools: Cadence Genus, Cadence Innovus | Languages: Verilog HDL, Tcl, Linux Shell
 */

export type TechnicalStatus = 'COMPLETED' | 'STUDIED' | 'PLANNED_NOT_STARTED';

export interface VerifiedProject {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'RISC-V_PROCESSOR' | 'CRYPTOGRAPHIC_HARDWARE';
  edaToolchain: string[];
  languages: string[];
  clockConstraint?: string;
  completedStages: string[];
  currentStatus: {
    placement: 'COMPLETED' | 'NOT_STARTED';
    cts: 'NOT_STARTED' | 'PENDING_HANDOFF';
    detailedRouting: 'NOT_STARTED';
    physicalSignoff: 'NOT_COMPLETED' | 'NOT_REACHED';
    tapeout?: 'NOT_COMPLETED' | 'NOT_REACHED';
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
  tagline: 'RTL Synthesis (Cadence Genus) & Physical Design Placement (Cadence Innovus)',
  education: {
    degree: 'B.Tech in Electronics and Communication Engineering',
    institution: "Vignan's Institute of Information Technology",
    duration: '2022 – 2026'
  },
  training: {
    program: 'Hands-on ASIC Physical Design Training',
    organization: 'Sumedha IT'
  },
  email: 'psvarma.e@gmail.com',
  github: 'https://github.com/shanmukhavarma007',
  linkedin: 'https://www.linkedin.com/in/shanmukhavarma-penmetsa/',
  statusBadge: 'ENTRY-LEVEL ASIC PHYSICAL DESIGN CANDIDATE',
  summary:
    "B.Tech Electronics and Communication Engineering student (2022–2026) at Vignan's Institute of Information Technology with hands-on ASIC Physical Design training from Sumedha IT. Experienced in RTL synthesis using Cadence Genus, SDC timing constraints, floorplanning, macro placement, and standard-cell placement using Cadence Innovus.",
  edaTools: [
    { name: 'Cadence Genus', role: 'RTL Synthesis, QoR Analysis, SDC constraint application' },
    { name: 'Cadence Innovus', role: 'Floorplanning, Macro Placement, Standard-Cell Placement' }
  ],
  scriptingAndLanguages: [
    { name: 'Verilog HDL', role: 'RTL design, functional modeling, and verification' },
    { name: 'Tcl', role: 'EDA tool automation in Cadence Genus & Innovus' },
    { name: 'Linux & Shell Scripting', role: 'CLI workflows, batch scripts, and EDA environment setup' }
  ],
  competencies: [
    { area: 'RTL Synthesis', tool: 'Cadence Genus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'SDC Constraints', tool: 'Genus / Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Floorplanning', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Macro Placement', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Standard-Cell Placement', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Placement QoR Analysis', tool: 'Cadence Innovus', status: 'COMPLETED' as TechnicalStatus },
    { area: 'Static Timing Analysis (STA)', tool: 'Theoretical Fundamentals', status: 'STUDIED' as TechnicalStatus },
    { area: 'Clock Tree Synthesis (CTS)', tool: 'Architecture & Skew Concepts', status: 'STUDIED' as TechnicalStatus },
    { area: 'Power Distribution Grid', tool: 'Power Mesh & IR Concepts', status: 'STUDIED' as TechnicalStatus },
    { area: 'Detailed Routing', tool: 'Cadence Innovus', status: 'PLANNED_NOT_STARTED' as TechnicalStatus },
    { area: 'Physical Signoff (DRC/LVS)', tool: 'Physical Verification', status: 'PLANNED_NOT_STARTED' as TechnicalStatus }
  ]
};

export const VERIFIED_PROJECTS: VerifiedProject[] = [
  {
    id: 'cva6-riscv',
    slug: 'cva6-riscv-processor',
    index: '01 / PROJECT',
    title: 'CVA6 64-Bit RISC-V Processor',
    subtitle: 'RTL Synthesis, Floorplanning & Standard-Cell Placement in Cadence Innovus',
    category: 'RISC-V_PROCESSOR',
    edaToolchain: ['Cadence Genus', 'Cadence Innovus'],
    languages: ['Verilog HDL', 'Tcl', 'Linux Shell'],
    clockConstraint: 'Period: 1.700 ns (Synthesis SDC Target)',
    completedStages: [
      'RTL design and verification evaluation',
      'Logic synthesis using Cadence Genus (Clock: 1.700 ns)',
      'Core and die floorplanning setup',
      'Macro placement and orientation',
      'Standard-cell placement using Cadence Innovus',
      'Placement-stage QoR analysis and optimization'
    ],
    currentStatus: {
      placement: 'COMPLETED',
      cts: 'PENDING_HANDOFF',
      detailedRouting: 'NOT_STARTED',
      physicalSignoff: 'NOT_REACHED'
    },
    overview:
      'Hands-on physical design implementation of the 64-bit CVA6 (Ariane) RISC-V core. Performed RTL logic synthesis in Cadence Genus, defined core boundaries and macro floorplan arrangements, and completed standard-cell placement in Cadence Innovus with placement-stage optimization.',
    implementationScope: [
      'Synthesized CVA6 processor RTL into gate-level primitives using Cadence Genus (178,799 LeafCells)',
      'Formulated SDC timing constraints defining clock period (1.700 ns target) and input/output delays',
      'Established core and I/O floorplan aspect ratios in Cadence Innovus',
      'Strategically placed instruction and data cache SRAM macros along core boundaries',
      'Executed standard-cell placement in Cadence Innovus with placement-stage QoR analysis'
    ],
    verifiedDeliverables: [
      'Original Cadence Innovus density map screenshot documenting macro & core topography',
      'Original Cadence Genus design visualization screenshot (178,799 LeafCells, 365 Modules)',
      'Original Cadence Genus synthesis QoR report screenshot (Period: 1.700 ns, Cell Area: 592,578.141)',
      'Synthesized gate-level netlist generated via Cadence Genus',
      'Floorplan database with committed macro locations in Cadence Innovus',
      'Legalized standard-cell placement database ready for CTS handoff',
      'Tcl execution scripts for reproducible Genus and Innovus flow execution'
    ],
    honestBoundaryNotes: [
      'Standard-cell placement is completed. Clock Tree Synthesis (CTS) has NOT been run.',
      'CTS handoff is currently pending.',
      'Detailed routing has NOT been started.',
      'Physical sign-off (DRC/LVS) and tape-out have NOT been performed.',
      'Report values (1.700 ns clock, 178,799 leaf cells, -10.188 TNS) are strictly synthesis-stage metrics.',
      'No fabricated post-CTS/routing timing closure numbers or silicon measurements are claimed.'
    ]
  },
  {
    id: 'aes-core',
    slug: 'aes-cryptographic-core',
    index: '02 / PROJECT',
    title: 'AES Cryptographic Core',
    subtitle: 'High-Frequency RTL Synthesis with 1000.0 ps (1 ns) Clock in Cadence Genus',
    category: 'CRYPTOGRAPHIC_HARDWARE',
    edaToolchain: ['Cadence Genus'],
    languages: ['Verilog HDL', 'Tcl', 'Linux Shell'],
    clockConstraint: 'Period: 1000.0 ps (1.0 ns target)',
    completedStages: [
      'RTL design analysis and synthesizable Verilog compilation',
      'Single-clock SDC constraint formulation (period: 1000.0 ps / 1.0 ns)',
      'RTL logic synthesis using Cadence Genus (Cell Area: 5,774.454, LeafCells: 9,474)',
      'Timing QoR evaluation in Genus (0 violating paths, 0.0 TNS, max fanout: 401)'
    ],
    currentStatus: {
      placement: 'NOT_STARTED',
      cts: 'NOT_STARTED',
      detailedRouting: 'NOT_STARTED',
      physicalSignoff: 'NOT_COMPLETED',
      tapeout: 'NOT_COMPLETED'
    },
    overview:
      'Completed RTL logic synthesis project of an Advanced Encryption Standard (AES) hardware core using Cadence Genus. Applied a 1000.0 ps (1.0 ns) clock period SDC constraint, mapped datapath and key-schedule logic to standard-cell gates, and verified synthesis timing with zero violating paths and zero TNS.',
    implementationScope: [
      'Compiled synthesizable Verilog HDL descriptions of the AES encryption round and key-expansion logic',
      'Defined single-clock SDC timing constraint with a 1000.0 ps (1.0 ns) target period',
      'Mapped datapath to target library standard cells using Cadence Genus (9,474 leaf instances)',
      'Analyzed synthesis QoR reports confirming 0 violating paths, 0.0 TNS, and max fanout of 401 on clock'
    ],
    verifiedDeliverables: [
      'Original Cadence Genus design visualization screenshot (module: rtl_halfcycle_crosspaths)',
      'Original Cadence Genus synthesis QoR report screenshot (Period: 1000.0 ps, Cell Area: 5,774.454)',
      'Synthesized gate-level netlist in Verilog from Cadence Genus',
      'SDC timing constraints file with single-clock definition (1000.0 ps)',
      'Cadence Genus synthesis log and QoR summary reports',
      'Tcl synthesis automation run script'
    ],
    honestBoundaryNotes: [
      'Conducted strictly as an RTL logic synthesis project in Cadence Genus.',
      'Physical implementation stages (floorplanning, placement, CTS, routing) have NOT been started for this core.',
      'Report metrics (1000.0 ps period, 9,474 leaf cells, 0 violating paths) are strictly synthesis-stage results.',
      'No post-placement, post-CTS, routing, or sign-off timing closure is claimed.',
      'No fabricated power consumption, encryption throughput, or silicon area measurements are claimed.'
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
      'Practical hands-on experience loading Verilog RTL, applying target technology libraries (.lib), defining SDC constraints, and running logic optimization in Cadence Genus for CVA6 and AES cores.',
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
      'Practical implementation of core aspect ratios, die boundary creation, and manual/guided placement of embedded SRAM memory macros for the CVA6 64-bit core in Cadence Innovus.',
    scopeSummary:
      'Completed in Cadence Innovus for the CVA6 core floorplan.'
  },
  {
    id: 'topic-03',
    index: '03 / IMPLEMENTED',
    title: 'Standard-Cell Placement & Pre-CTS QoR in Cadence Innovus',
    category: 'PHYSICAL DESIGN',
    status: 'COMPLETED',
    statusLabel: 'COMPLETED (HANDS-ON IMPLEMENTATION)',
    description:
      'Practical execution of global and detailed standard-cell placement in Cadence Innovus, checking cell legality, verifying absence of unplaced instances, and inspecting placement-stage timing QoR.',
    scopeSummary:
      'Completed in Cadence Innovus. Marks the boundary of completed physical design work.'
  },
  {
    id: 'topic-04',
    index: '04 / THEORETICAL',
    title: 'Static Timing Analysis (STA) Setup & Hold Fundamentals',
    category: 'TIMING ANALYSIS',
    status: 'STUDIED',
    statusLabel: 'STUDIED (THEORETICAL CONCEPTS)',
    description:
      'Academic understanding of static timing equations: setup constraint calculations (T_clk >= T_cq + T_comb + T_setup + T_skew), hold constraint requirements (T_cq + T_comb >= T_hold + T_skew), clock uncertainty, and PVT library derating concepts.',
    scopeSummary:
      'Studied theoretically in B.Tech ECE curriculum and Sumedha IT training lectures. Not claimed as tape-out signoff.'
  },
  {
    id: 'topic-05',
    index: '05 / THEORETICAL',
    title: 'Clock Tree Synthesis (CTS) Architectures & Skew Balancing',
    category: 'CLOCKING',
    status: 'STUDIED',
    statusLabel: 'STUDIED (THEORETICAL CONCEPTS)',
    description:
      'Theoretical understanding of clock tree structures (H-tree, clock mesh, balanced buffer trees), insertion delay management, global skew targets, and clock gating cell control prior to clock routing.',
    scopeSummary:
      'Studied theoretically. CTS implementation on CVA6 is NOT started and remains pending.'
  },
  {
    id: 'topic-06',
    index: '06 / THEORETICAL',
    title: 'Power Distribution Network & IR Drop Fundamentals',
    category: 'POWER INTEGRITY',
    status: 'STUDIED',
    statusLabel: 'STUDIED (THEORETICAL CONCEPTS)',
    description:
      'Theoretical concepts of on-chip power distribution networks: power rings, orthogonal power straps (VDD/VSS), static vs dynamic IR drop definitions, and decoupling capacitor placement theory.',
    scopeSummary:
      'Studied theoretically in training coursework. No dynamic or static IR-drop simulations have been performed.'
  },
  {
    id: 'topic-07',
    index: '07 / FUTURE ROADMAP',
    title: 'Clock Tree Synthesis Execution & Clock Routing',
    category: 'PHYSICAL DESIGN',
    status: 'PLANNED_NOT_STARTED',
    statusLabel: 'PLANNED / NOT STARTED (FUTURE ROADMAP)',
    description:
      'Future technical milestone: invoking the CTS engine in Cadence Innovus for the placed CVA6 block, synthesizing low-skew clock buffers, and routing clock trees.',
    scopeSummary:
      'Planned future hands-on learning activity following placement handoff.'
  },
  {
    id: 'topic-08',
    index: '08 / FUTURE ROADMAP',
    title: 'Detailed Routing & Physical Verification (DRC / LVS)',
    category: 'PHYSICAL DESIGN',
    status: 'PLANNED_NOT_STARTED',
    statusLabel: 'PLANNED / NOT STARTED (FUTURE ROADMAP)',
    description:
      'Future technical milestone: nano-routing signal interconnects, fixing design rule violations (DRC), and verifying layout versus schematic (LVS) consistency.',
    scopeSummary:
      'Planned future milestone. Detailed routing has not been started.'
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
    description: 'Instruction cache SRAM macro array placed along northwest core boundary in Cadence Innovus floorplan.',
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
    description: 'Data cache SRAM macro array placed along northeast core boundary in Cadence Innovus floorplan.',
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
    description: 'Central standard-cell area housing ALU, multiplier, and execution pipeline standard cells placed via Innovus.',
    status: 'Standard Cells Placed'
  },
  {
    id: 'blk-core-frontend',
    name: 'FRONTEND_CONTROL_AREA',
    type: 'core_logic' as const,
    x: 100,
    y: 100,
    width: 380,
    height: 150,
    description: 'Standard-cell logic area for instruction fetch and decode logic placed via Cadence Innovus.',
    status: 'Standard Cells Placed'
  },
  {
    id: 'blk-core-lsu',
    name: 'LOAD_STORE_LOGIC_AREA',
    type: 'core_logic' as const,
    x: 520,
    y: 100,
    width: 380,
    height: 150,
    description: 'Standard-cell logic area for load/store queue logic placed via Cadence Innovus.',
    status: 'Standard Cells Placed'
  }
];
