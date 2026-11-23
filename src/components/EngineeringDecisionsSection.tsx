import React, { useState } from 'react';
import { 
  Scale, 
  Layers, 
  Cpu, 
  GitCommit, 
  Clock, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  Maximize2,
  FileText,
  Split,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EngineeringDecision {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  badge: string;
  observation: string;
  engineeringConsideration: string;
  decisionInvestigation: string;
  supportingEvidence: {
    reportType: string;
    edaTool: string;
    metrics: string[];
    evidenceAsset?: string;
    evidenceNote: string;
  };
}

const ENGINEERING_DECISIONS: EngineeringDecision[] = [
  {
    id: 'timing-vs-density',
    index: 'DECISION 01',
    title: 'Timing Slack Optimization vs. Local Cell Density',
    subtitle: 'Balancing critical-path clustering against routing congestion in the execution core',
    badge: 'TIMING VS. DENSITY',
    observation:
      'Aggressive timing-driven placement in Cadence Innovus pulled cells on critical setup paths closely together to reduce net interconnect delay, pulling placement WNS to -0.483 ns and TNS to -2035.472 ns across 24,869 setup endpoints.',
    engineeringConsideration:
      'Critical-cell clustering can improve timing by reducing wire length on high-fanout timing paths. However, concentrating standard cells into local micro-regions drastically spikes local cell density and exhausts available horizontal and vertical routing tracks. Conversely, forcing cell spreading relieves congestion but increases wire parasitics and degrades setup slack.',
    decisionInvestigation:
      'Investigated placement density constraints by balancing timing-effort weightings against local density limits. Evaluated how local cell spreading affected WNS, establishing that moderate density relaxation preserved critical datapath timing while preventing severe localized routing blockages in the central logic corridor.',
    supportingEvidence: {
      reportType: 'Placement Timing & Density Topography',
      edaTool: 'Cadence Innovus',
      metrics: [
        'Placement WNS: -0.483 ns',
        'Placement TNS: -2035.472 ns',
        'Setup Endpoints Evaluated: 53,382',
        'Stage: Standard-Cell Placement (Pre-CTS)'
      ],
      evidenceAsset: '/assets/aistudio/image_23509f50.png',
      evidenceNote: 'Original Cadence Innovus terminal report showing setup WNS (-0.483 ns) and path groups.'
    }
  },
  {
    id: 'macro-channel-planning',
    index: 'DECISION 02',
    title: 'Macro-Channel Spacing vs. Pin Accessibility',
    subtitle: 'Allocating dedicated routing channels between peripheral SRAM arrays and core logic',
    badge: 'FLOORPLANNING & PIN ESCAPE',
    observation:
      'Dense peripheral placement of instruction and data cache SRAM macros along the die boundaries created tight corridors where standard cells competed with macro address/data bus routing for metal layer tracks.',
    engineeringConsideration:
      'SRAM macro pins require unobstructed escape paths into higher metal routing layers. Tight macro spacing causes routing starvation near macro corners, while excessive spacing inflates die area and stretches global interconnect lengths, increasing wire RC delays between the cache and CPU pipeline.',
    decisionInvestigation:
      'Established a standardized 15 µm channel spacing between adjacent SRAM blocks with dedicated halo keepout margins. Oriented macro pin interfaces inward toward the central standard-cell core, ensuring clean pin escape corridors without blocking peripheral routing tracks.',
    supportingEvidence: {
      reportType: 'Cadence Innovus Floorplan Database',
      edaTool: 'Cadence Innovus',
      metrics: [
        'Target Core Utilization: 70%',
        'Macro-to-Macro Channel: 15 µm',
        'Macro Halo Keepouts: 15 µm around all blocks',
        'Core Dimensions: 950 × 916 µm'
      ],
      evidenceAsset: '/assets/aistudio/image_405b6f5e.png',
      evidenceNote: 'Cadence Innovus floorplan layout showing peripheral macro arrangement and 15 µm channels.'
    }
  },
  {
    id: 'clustering-vs-congestion',
    index: 'DECISION 03',
    title: 'Placement Clustering vs. Routing Congestion',
    subtitle: 'Managing global overflow edges and directional channel congestion',
    badge: 'CONGESTION ANALYSIS',
    observation:
      'Preliminary global placement exhibited 1,529 total congestion overflow edges, characterized by a heavy directional imbalance: 76 horizontal overflow edges (0.19% H) versus 1,453 vertical overflow edges (1.83% V).',
    engineeringConsideration:
      'High vertical overflow indicates that dataflow tracks running vertically between upper cache macros and lower execution units were over-subscribed. High placement optimization effort clustered cells tightly into vertical channels, forcing detailed routers to detour signals into higher, more resistive metal layers.',
    decisionInvestigation:
      'Investigated global congestion effort controls and detail wire-length optimization settings in Innovus. Tuned placement effort parameters to spread non-critical logic cells out of vertical macro alleys, successfully reducing channel track contention while preventing timing degradation.',
    supportingEvidence: {
      reportType: 'Global Congestion Overflow Report',
      edaTool: 'Cadence Innovus',
      metrics: [
        'Total Overflow Edges: 1,529',
        'Horizontal Overflow: 76 edges',
        'Vertical Overflow: 1,453 edges',
        'Hotspot Score: 4.77'
      ],
      evidenceAsset: '/assets/aistudio/image_9b544273.png',
      evidenceNote: 'Authentic Cadence Innovus congestion distribution report documenting horizontal and vertical track overflow.'
    }
  },
  {
    id: 'clock-buffering-implications',
    index: 'DECISION 04',
    title: 'Clock-Network Buffering & Physical Implementation',
    subtitle: 'Assessing cell spacing, decap integrity, and CCOpt clock tree synthesis in 28 nm',
    badge: 'CLOCK TREE SYNTHESIS',
    observation:
      'Clock Tree Synthesis completed using Cadence Innovus CCOpt engine. Clock buffer and inverter insertion increased core utilization from 70% floorplan baseline to a post-CTS observation of 82.7%.',
    engineeringConsideration:
      'Inserting clock buffers (e.g. low-voltage threshold repeaters such as CKBD20*LVT) into dense standard-cell rows can cause mechanical cell abutment stress and disrupt placed decoupling capacitors (decaps), leading to localized dynamic IR drop and skew degradation.',
    decisionInvestigation:
      'Investigated clock-path buffering protocols by enforcing a 4-site padding (0.56 µm in 28 nm LEF) around high-drive clock buffers. Verified that CCOpt balanced clock insertion delay and global skew across functional corners while maintaining clean spacing from neighboring macro boundaries.',
    supportingEvidence: {
      reportType: 'CCOpt Post-CTS Timing & DRV Summary',
      edaTool: 'Cadence Innovus CCOpt',
      metrics: [
        'CTS Status: COMPLETED',
        'Post-CTS Core Utilization: 82.7%',
        'Post-CTS Setup WNS: -0.318 ns',
        'Post-CTS Hold WNS: -0.224 ns'
      ],
      evidenceAsset: '/assets/aistudio/image_3149f24a.png',
      evidenceNote: 'Post-CTS setup timing and DRV report showing successful CCOpt execution under 1.5 ns clock.'
    }
  },
  {
    id: 'ex-stage-hotspot',
    index: 'DECISION 05',
    title: 'Congestion Investigation Around ex_stage_i',
    subtitle: 'Mitigating localized pin density and routing bottlenecks in the execution datapath',
    badge: 'MODULE PADDING & HOTSPOTS',
    observation:
      'The execution stage module (ex_stage_i) housing ALU, multiplier, and branch units was identified as the highest congestion hotspot across the entire core, registering a normalized hotspot score of 4.77.',
    engineeringConsideration:
      'The execution datapath contains high-density multi-bit operand buses and high-fanout control signals converging on compact arithmetic operators. Concentrating these pins in a tight region without spacing constraints exhausts pin access tracks on metal layers M1 through M3.',
    decisionInvestigation:
      'Investigated selective module padding constraints around the ex_stage_i hierarchical boundary. By reserving localized cell spacing around the module perimeter, routing channels were preserved for operand bus escape, directly mitigating the 4.77 hotspot score without perturbing upstream logic synthesis.',
    supportingEvidence: {
      reportType: 'Hotspot Analysis & Congestion Topography',
      edaTool: 'Cadence Innovus',
      metrics: [
        'Highest Hotspot Module: ex_stage_i',
        'Normalized Hotspot Score: 4.77',
        'Stage: Standard-Cell Placement',
        'Congestion Map: Cyan/Orange channel overlay'
      ],
      evidenceAsset: '/assets/aistudio/image_1fd9e88f.png',
      evidenceNote: 'Cadence Innovus congestion map showing localized track density in the central datapath corridor.'
    }
  },
  {
    id: 'post-route-drc-reduction',
    index: 'DECISION 06',
    title: 'Route ECO — Macro-Pin Via Optimization (40 → 10 Initial PR → 0 Verified DRCs)',
    subtitle: 'Investigating wide-metal-jog (WMJ) violations over macro pins and achieving 0 verified DRCs via Route ECO',
    badge: 'ROUTE ECO // 0 DRCs',
    observation:
      'Initial routing (cva6_pcts.db) logged 40 geometry DRCs with 0 antenna violations, and initial post-route (cva6_route.db) recorded 10 initial post-route DRCs dominated by 7 wide-metal-jog (WMJ) violations on M4 over SRAM macro pins alongside 2 Shorts and 1 VIA3 EncEdg.',
    engineeringConsideration:
      'Macro pin geometries create strict wide-metal-jog and via-enclosure rules where default automated routing vias frequently violate spacing along block pin edges. Blindly rerouting whole channels risks perturbing congestion (0.51% overflow, 18.12 hotspot) and antenna compliance.',
    decisionInvestigation:
      'Investigated the WMJ violations over macro pins, manually replaced and rotated problematic vias to resolve the WMJ geometry conflicts, reran Route ECO with route_via_with_block_pins_only true, and executed Cadence Innovus VERIFY DRC across {0.000 0.000 950.320 916.500}, confirming 0 DRC violations while maintaining 0 antenna violations.',
    supportingEvidence: {
      reportType: 'Cadence Innovus VERIFY DRC Output (Post-Route ECO)',
      edaTool: 'Cadence Innovus (cva6_route.db + ECO)',
      metrics: [
        'Initial Route DRCs: 40 (0 Antenna)',
        'Initial Post-Route DRCs: 10 (Before ECO)',
        'Final Verified DRCs: 0 Violations',
        'ECO Flag: route_via_with_block_pins_only true'
      ],
      evidenceAsset: '/assets/aistudio/image_fe25c52c.png',
      evidenceNote: 'Genuine Cadence Innovus VERIFY DRC terminal log confirming "Verification Complete : 0 Viols." after macro-pin via Route ECO.'
    }
  },
  {
    id: 'lvt-cell-enabling',
    index: 'DECISION 07',
    title: 'Post-Route LVT Cell Enabling vs. Leakage Budget',
    subtitle: 'Swapping critical setup cells to Low-Vt to recover 79 ps WNS and clear m2r violations',
    badge: 'VT SWAPPING // LVT OPT',
    observation:
      'Prior to enabling LVT standard cells at the Post-Route Stage, setup WNS stood at -0.201 ns (TNS -161.833 ns across 3,079 violating paths) with 6 max_tran nets (-0.067 ns). Hold WNS was -0.004 ns (15 paths).',
    engineeringConsideration:
      'Low-Threshold Voltage (LVT) cells reduce switching delay on critical paths without requiring wide buffer upsizing that disturbs routed metal tracks. However, unconstrained LVT usage dramatically escalates static leakage power and can accelerate short-path hold violations.',
    decisionInvestigation:
      'Selectively enabled LVT cells during post-route optimization strictly along violating setup endpoints. Setup WNS improved 39.3% (-0.201 → -0.122 ns), TNS dropped 81.7% (-161.833 → -29.582 ns), violating paths fell from 3,079 to 1,001, max_tran halved (6 → 3 nets), and m2r paths turned positive (+0.006 ns) while hold WNS remained steady (-0.003 ns).',
    supportingEvidence: {
      reportType: 'Post-Route Timing Report (After Enabling LVT)',
      edaTool: 'Cadence Innovus (Post-Route Stage)',
      metrics: [
        'Setup WNS: -0.201 → -0.122 ns',
        'Setup TNS: -161.833 → -29.582 ns',
        'Violating Paths: 3,079 → 1,001',
        'm2r Path Group: +0.006 ns (MET)'
      ],
      evidenceAsset: '/assets/aistudio/cva6_postroute_setup_after_lvt.png',
      evidenceNote: 'Cadence Innovus post-route setup timing report immediately following LVT cell enabling.'
    }
  },
  {
    id: 'useful-skew-analysis',
    index: 'DECISION 08',
    title: 'Post-Route Useful Skew Analysis vs. Hold Margin',
    subtitle: 'Borrowing clock skew slack to refine Setup WNS to -0.114 ns and Hold WNS to -0.001 ns',
    badge: 'USEFUL SKEW OPT',
    observation:
      'After LVT optimization, 1,001 setup paths (-0.122 ns WNS) and 3 max_tran violations remained due to unbalanced stage-to-stage combinational logic depth in default and r2o groups.',
    engineeringConsideration:
      'Useful skew intentionally shifts capture/launch clock arrival times to lend timing budget from slack-rich adjacent stages to critical stages. Pushing useful skew too far steals margin from downstream paths or creates hold failures.',
    decisionInvestigation:
      'Applied bounded useful skew optimization during the Post-Route Stage, tightening Setup WNS to -0.114 ns (TNS -28.249 ns, 934 violating paths), clearing max_tran down to 1 net (-0.002 ns), improving m2r to +0.007 ns, and simultaneously converging Hold WNS to -0.001 ns (TNS -0.002 ns, 7 violating paths). Remaining endpoints are queued for final signoff closure.',
    supportingEvidence: {
      reportType: 'Post-Route Timing Report (After Useful Skew Analysis)',
      edaTool: 'Cadence Innovus (Post-Route Stage)',
      metrics: [
        'Setup WNS: -0.122 → -0.114 ns',
        'Violating Setup Paths: 1,001 → 934',
        'Hold WNS: -0.001 ns (7 Paths)',
        'max_tran: 3 → 1 net (-0.002 ns)'
      ],
      evidenceAsset: '/assets/aistudio/cva6_postroute_setup_useful_skew.png',
      evidenceNote: 'Post-route setup & DRV report from useful skew analysis experiment.'
    }
  },
  {
    id: 'path-group-sdc-fixes',
    index: 'DECISION 09',
    title: 'Separate Timing-Group Constraint Fixes: I2O (+0.028 ns) & Default (+0.186 ns)',
    subtitle: 'Resolving missing I2O endpoints with max-delay constraints and tightening reset-to-CDN IO delay budgets (60% → 40%)',
    badge: 'PATH-GROUP SDC FIXES',
    observation:
      'Post-route timing analysis revealed distinct root causes in two separate path groups: input-to-output (I2O) paths lacked valid timing endpoints without explicit maximum-delay bounding, while Default group violations originated on reset-port-to-register-CDN paths governed by recovery/removal checks under an overly conservative 60% IO delay budget.',
    engineeringConsideration:
      'Fixing constraint-driven path-group violations through blind cell upsizing or LVT swapping wastes area and leakage without correcting the underlying SDC modeling issue. Each path group must be audited and reported independently without conflating a single group WNS with overall chip WNS.',
    decisionInvestigation:
      'Applied two targeted constraint corrections: (1) inserted maximum-delay constraints for the I2O group, fixing I2O timing to WNS +0.028 ns; (2) reduced the IO delay budget from 60% to 40% of the clock period for the Default group, fixing Default timing to WNS +0.186 ns. Neither figure is claimed as overall design WNS, and complete multi-group signoff remains pending.',
    supportingEvidence: {
      reportType: 'Post-Route Path-Group Timing Verification (I2O & Default)',
      edaTool: 'Cadence Innovus (cva6_route.db)',
      metrics: [
        'I2O Group Status: Fixed (+0.028 ns WNS)',
        'I2O Fix: Inserted max-delay constraints',
        'Default Group Status: Fixed (+0.186 ns WNS)',
        'Default Fix: IO delay budget 60% → 40%'
      ],
      evidenceNote: 'Per-group verified results (+0.028 ns I2O and +0.186 ns Default belong to separate timing groups; neither represents overall design WNS).'
    }
  }
];

export const EngineeringDecisionsSection: React.FC = () => {
  const [activeDecisionId, setActiveDecisionId] = useState<string>('timing-vs-density');

  const selectedDecision = ENGINEERING_DECISIONS.find(d => d.id === activeDecisionId) || ENGINEERING_DECISIONS[0];

  return (
    <section id="engineering-decisions" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#b7d83d] inline-block" />
          <h2 className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
            ENGINEERING TRADE-OFFS & IMPLEMENTATION DECISIONS
          </h2>
          <span className="text-[#c5c7c1]">·</span>
          <span className="font-technical text-xs text-[#536600] font-bold">
            [CVA6 28 nm CADENCE INNOVUS & GENUS]
          </span>
        </div>
        <div className="flex items-center gap-2 font-technical text-xs text-[#757872]">
          <span className="bg-[#1b1c18] text-[#cef053] px-2 py-0.5 font-bold">
            METHODOLOGY: OBSERVATION &rarr; DECISION &rarr; EVIDENCE
          </span>
        </div>
      </div>

      {/* Overview Intro Banner */}
      <div className="border border-[#d8d7ce] bg-[#ffffff] p-6">
        <div className="max-w-4xl space-y-2">
          <div className="flex items-center gap-1.5 font-technical text-xs text-[#536600] font-bold uppercase">
            <Scale className="w-4 h-4 text-[#536600]" />
            RIGOROUS PHYSICAL DESIGN RATIONALE // NO HYPOTHETICAL CLAIMS
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal leading-snug">
            Actual Implementation Trade-offs Encountered in 28 nm CVA6 Flow
          </h3>
          <p className="font-sans text-sm text-[#454843] leading-relaxed">
            In physical design, optimizing one objective frequently strains another. This section documents genuine implementation trade-offs encountered while progressing CVA6 through floorplanning, standard-cell placement, and Clock Tree Synthesis in Cadence Innovus. Every decision is framed through four rigorous steps:
            <strong className="text-[#1b1c18]"> Observation &rarr; Engineering Consideration &rarr; Decision / Investigation &rarr; Supporting Evidence</strong>.
          </p>
        </div>
      </div>

      {/* Two-Column Interactive Decision Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Decision Selector List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-technical uppercase text-[#757872] pb-1 border-b border-[#d8d7ce] font-bold">
            SELECT INVESTIGATION TOPIC ({ENGINEERING_DECISIONS.length})
          </div>

          {ENGINEERING_DECISIONS.map((decision) => {
            const isSelected = decision.id === activeDecisionId;

            return (
              <button
                key={decision.id}
                onClick={() => setActiveDecisionId(decision.id)}
                className={`w-full text-left p-4 border transition-all cursor-pointer block ${
                  isSelected
                    ? 'border-[#1b1c18] bg-[#ffffff] shadow-sm'
                    : 'border-[#d8d7ce] bg-[#fbf9f3] hover:bg-[#ffffff] hover:border-[#757872]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 font-technical text-xs">
                    <span className={`font-bold ${isSelected ? 'text-[#1b1c18]' : 'text-[#757872]'}`}>
                      {decision.index}
                    </span>
                    <span className="text-[#c5c7c1]">·</span>
                    <span className="px-1.5 py-0.2 bg-[#f0eee8] text-[#536600] text-[10px] font-bold border border-[#d8d7ce]">
                      {decision.badge}
                    </span>
                  </div>
                  {isSelected && <span className="w-2 h-2 bg-[#b7d83d]" />}
                </div>

                <div className="font-serif text-base text-[#1b1c18] font-medium leading-snug">
                  {decision.title}
                </div>
                <p className="font-sans text-xs text-[#757872] mt-1 line-clamp-2">
                  {decision.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: 4-Tier Breakdown of Selected Decision */}
        <div className="lg:col-span-7 border border-[#1b1c18] bg-[#ffffff] divide-y divide-[#d8d7ce]">
          {/* Header of Active Decision */}
          <div className="p-6 bg-[#fbf9f3]">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-technical mb-2">
              <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold">
                {selectedDecision.index}
              </span>
              <span className="text-[#536600] font-bold uppercase">
                {selectedDecision.badge}
              </span>
            </div>
            <h4 className="font-serif text-2xl text-[#1b1c18] font-normal leading-tight">
              {selectedDecision.title}
            </h4>
            <p className="font-sans text-xs md:text-sm text-[#757872] mt-1">
              {selectedDecision.subtitle}
            </p>
          </div>

          {/* 1. Observation */}
          <div className="p-5 space-y-1.5">
            <div className="flex items-center gap-2 font-technical text-xs font-bold text-[#1b1c18] uppercase">
              <span className="px-1.5 py-0.2 bg-[#1b1c18] text-[#fbf9f3] text-[10px]">STEP 1</span>
              <span>OBSERVATION FROM EDA RUN</span>
            </div>
            <p className="font-sans text-xs md:text-sm text-[#454843] leading-relaxed">
              {selectedDecision.observation}
            </p>
          </div>

          {/* 2. Engineering Consideration */}
          <div className="p-5 space-y-1.5 bg-[#fbf9f3]">
            <div className="flex items-center gap-2 font-technical text-xs font-bold text-[#536600] uppercase">
              <span className="px-1.5 py-0.2 bg-[#536600] text-[#ffffff] text-[10px]">STEP 2</span>
              <span>ENGINEERING CONSIDERATION & TRADE-OFF</span>
            </div>
            <p className="font-sans text-xs md:text-sm text-[#454843] leading-relaxed">
              {selectedDecision.engineeringConsideration}
            </p>
          </div>

          {/* 3. Decision / Investigation */}
          <div className="p-5 space-y-1.5">
            <div className="flex items-center gap-2 font-technical text-xs font-bold text-[#1b1c18] uppercase">
              <span className="px-1.5 py-0.2 bg-[#1b1c18] text-[#fbf9f3] text-[10px]">STEP 3</span>
              <span>PHYSICAL DESIGN DECISION & INVESTIGATION</span>
            </div>
            <p className="font-sans text-xs md:text-sm text-[#454843] leading-relaxed">
              {selectedDecision.decisionInvestigation}
            </p>
          </div>

          {/* 4. Supporting Evidence */}
          <div className="p-5 bg-[#171a18] text-[#fbf9f3] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#333833]">
              <div className="flex items-center gap-2 font-technical text-xs font-bold text-[#cef053] uppercase">
                <ShieldCheck className="w-4 h-4 text-[#cef053]" />
                <span>STEP 4: SUPPORTING EVIDENCE & MEASURED EDA DATA</span>
              </div>
              <span className="font-technical text-[10px] text-[#82857d]">
                {selectedDecision.supportingEvidence.edaTool}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-technical">
              {selectedDecision.supportingEvidence.metrics.map((metric, i) => (
                <div key={i} className="p-2 bg-[#252a26] border border-[#333833] text-[#cef053]">
                  {metric}
                </div>
              ))}
            </div>

            {selectedDecision.supportingEvidence.evidenceAsset && (
              <div className="pt-2 border-t border-[#333833]">
                <div className="flex items-center gap-2 text-xs font-technical text-[#82857d] mb-2">
                  <Eye className="w-3.5 h-3.5 text-[#cef053]" />
                  <span>SUPPORTING ARTIFACT: {selectedDecision.supportingEvidence.reportType}</span>
                </div>
                <div className="border border-[#454843] bg-[#000000] overflow-hidden max-h-56 flex items-center justify-center p-2">
                  <img
                    src={selectedDecision.supportingEvidence.evidenceAsset}
                    alt={selectedDecision.title}
                    className="max-h-52 object-contain"
                  />
                </div>
                <div className="text-[11px] font-technical text-[#82857d] mt-2">
                  {selectedDecision.supportingEvidence.evidenceNote}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
