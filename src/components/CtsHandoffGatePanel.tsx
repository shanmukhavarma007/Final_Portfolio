import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  TrendingDown,
  Eye,
  AlertTriangle,
  ArrowRight,
  GitBranch
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CtsHandoffGatePanelProps {
  onOpenEdaConsole?: () => void;
}

export const CtsHandoffGatePanel: React.FC<CtsHandoffGatePanelProps> = () => {
  const [selectedReportTab, setSelectedReportTab] = useState<'optimization' | 'stages' | 'drc' | 'pending'>('optimization');
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  const completedCoreStages = [
    { num: '01', name: 'RTL Synthesis', tool: 'Cadence Genus (178,799 cells)', status: 'COMPLETED' },
    { num: '02', name: 'Floorplanning', tool: '950 × 916 · 850,552 µm²', status: 'COMPLETED' },
    { num: '03', name: 'Macro Placement', tool: '20 µm Channels · 30% Blockage', status: 'COMPLETED' },
    { num: '04', name: 'Power Planning', tool: 'Cadence Innovus Power Grid', status: 'COMPLETED' },
    { num: '05', name: 'Standard-Cell Placement', tool: 'cva6_fp1.db · 82.6% Util · 0.20% Ovf', status: 'COMPLETED' },
    { num: '06', name: 'Clock Tree Synthesis (CTS)', tool: 'CCOpt · 83.2% Util · 0.47% Ovf', status: 'COMPLETED' },
    { num: '07', name: 'Post-CTS Analysis', tool: 'cva6_cts.db · 83.6% Util · 0.53% Ovf', status: 'COMPLETED' },
    { num: '08', name: 'Routing', tool: 'cva6_pcts.db · 40 DRCs · 0 Antenna', status: 'COMPLETED' },
    { num: '09', name: 'Post-Route Analysis', tool: 'cva6_route.db · 10 Initial DRCs', status: 'COMPLETED' }
  ];

  const optimizationVerificationStages = [
    { num: '10', name: 'Route ECO & DRC Cleanup', tool: 'Macro-Pin Via Fix → 0 Verified DRCs', status: 'COMPLETED' },
    { num: '11', name: 'Post-Route Timing Optimization', tool: 'LVT · Useful Skew · I2O & Default Fixed', status: 'COMPLETED' }
  ];

  const upcomingStages = [
    { num: '12', name: 'GDSII Generation / Stream-Out', tool: 'Pending Final Layout Export', status: 'PENDING' },
    { num: '13', name: 'Final Signoff (LVS / Full-Chip STA / Tape-Out)', tool: 'Not Claimed Complete', status: 'PENDING' }
  ];

  const stageTelemetry = [
    {
      stage: 'Standard-Cell Placement',
      stageRef: 'cva6_fp1.db (CTS-Ready)',
      util: '82.6% (Core)',
      overflow: '0.20% (0.09% H / 0.11% V)',
      hotspot: '1.56 (max 0.35)',
      setupWns: '-0.507 ns',
      setupTns: 'Placement Baseline',
      holdWns: 'N/A (Pre-CTS)',
      notes: '950 × 916 (850,552 µm²), 20 µm macro channels, 30% partial blockage'
    },
    {
      stage: 'Clock Tree Synthesis (CTS)',
      stageRef: 'Iteration 1 (CCOpt)',
      util: '83.2% (Core)',
      overflow: '0.47% (0.11% H / 0.36% V)',
      hotspot: '14.83',
      setupWns: '-0.301 ns',
      setupTns: '5,191 paths',
      holdWns: '-0.209 ns',
      notes: 'Congestion improved vs. earlier placement runs; max_tran needed attention'
    },
    {
      stage: 'Post-CTS Analysis',
      stageRef: 'cva6_cts.db (Iter 1)',
      util: '83.6% (Core)',
      overflow: '0.53% (0.11% H / 0.42% V)',
      hotspot: '16.39',
      setupWns: '-0.248 ns',
      setupTns: '4,600 paths',
      holdWns: '-0.139 ns',
      notes: 'Setup, hold, transition, and congestion reports evaluated'
    },
    {
      stage: 'Routing',
      stageRef: 'cva6_pcts.db (Iter 1)',
      util: '100% (Reported Run Util)',
      overflow: '0.51% (0.20% H / 0.31% V)',
      hotspot: '18.12',
      setupWns: '-0.290 ns',
      setupTns: '10,107 paths',
      holdWns: '-0.143 ns',
      notes: '40 Initial DRCs · 0 Antenna Violations · Distinct from placement util'
    },
    {
      stage: 'Post-Route Analysis (Initial)',
      stageRef: 'cva6_route.db (Iter 1)',
      util: '100% (Reported Run Util)',
      overflow: '0.51%',
      hotspot: '18.12',
      setupWns: '-0.201 ns (Pre-LVT)',
      setupTns: '3,079 paths',
      holdWns: '-0.004 ns',
      notes: '10 Initial Post-Route DRCs (NOT final) · 0 Antenna · 0 Glitch'
    },
    {
      stage: 'Route ECO & Post-Route Opt',
      stageRef: 'cva6_route.db + ECO',
      util: '100% (w/ Fillers)',
      overflow: '0.51%',
      hotspot: '18.12',
      setupWns: 'I2O +0.028 ns · Def +0.186 ns',
      setupTns: 'Group-specific (not chip WNS)',
      holdWns: '-0.001 ns (Useful Skew)',
      notes: '0 Verified DRCs (WMJ via rotation + route_via_with_block_pins_only true)'
    }
  ];

  const pendingDeliverables = [
    { item: 'Full-Chip Multi-Group Timing Signoff', detail: 'I2O (+0.028 ns) and Default (+0.186 ns) are fixed individually; complete closure across all timing groups is not yet claimed' },
    { item: 'Foundry Signoff DRC Deck Run', detail: 'Innovus VERIFY DRC confirmed 0 violations after Route ECO; external signoff deck verification remains pending' },
    { item: 'LVS Verification', detail: 'Layout-versus-schematic netlist equivalence verification has not yet been executed' },
    { item: 'GDSII Generation / Stream-Out', detail: 'Final binary mask layout export has not been delivered' },
    { item: 'Final Signoff Reports & Archive Handoff', detail: 'Frozen signoff STA/LVS/DRC packages and tape-out readiness remain pending' }
  ];

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff] space-y-0">
      {/* Panel Top Header Bar */}
      <div className="p-6 bg-[#f5f3ed] border-b border-[#d8d7ce]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-technical text-xs text-[#757872]">
              <span className="font-bold text-[#1b1c18]">CVA6 11-STAGE IMPLEMENTATION PROGRESSION</span>
              <span>·</span>
              <span className="text-[#536600] font-bold">CADENCE GENUS &amp; INNOVUS (cva6_fp1.db &rarr; cva6_route.db + ECO)</span>
              <span>·</span>
              <span>28 nm PROCESS NODE · 1.5 ns (~666 MHz)</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
              Post-Route Implementation, Route ECO (0 DRCs) &amp; Timing Optimization
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#1b1c18] text-[#cef053] font-technical text-xs uppercase font-bold border border-[#1b1c18] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#cef053]" />
              11 VERIFIED STAGES · 0 VERIFIED DRCs (POST-ECO) · GDSII &amp; SIGNOFF PENDING
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#454843] max-w-4xl leading-relaxed">
          The 64-bit CVA6 RISC-V core progressed through 9 core implementation stages (RTL Synthesis through Post-Route Analysis) followed by 2 verification &amp; optimization stages: <strong className="text-[#1b1c18]">Route ECO macro-pin via optimization</strong> resolving initial post-route <strong className="text-[#1b1c18]">10 DRCs &rarr; 0 verified DRC violations</strong> (from 40 at initial route, with <strong className="text-[#536600]">0 antenna</strong> violations), and <strong className="text-[#1b1c18]">Post-Route Timing Optimization</strong> (LVT exploration, useful skew analysis, <strong className="text-[#536600]">I2O fixed at +0.028 ns WNS</strong>, and <strong className="text-[#536600]">Default fixed at +0.186 ns WNS</strong> — separate timing groups, not overall chip WNS). GDSII delivery and final signoff remain pending.
        </p>
      </div>

      {/* Visual Workflow Stage Matrix: Core Implementation (01-09) vs Optimization/Verification (10-11) vs Pending */}
      <div className="p-6 border-b border-[#d8d7ce] bg-[#ffffff] space-y-4">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#d8d7ce] gap-2">
          <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#536600]" />
            <span>CVA6 WORKFLOW MATRIX (9 CORE IMPLEMENTATION · 2 ECO &amp; OPT · 2 PENDING)</span>
          </div>
          <span className="font-technical text-[11px] text-[#536600] font-bold">
            FINAL VERIFIED DRC: 0 VIOLATIONS (POST-ECO)
          </span>
        </div>

        {/* Core Implementation Stages (01 - 09) */}
        <div className="space-y-2">
          <div className="font-technical text-[10px] font-bold text-[#757872] uppercase tracking-wider">
            PHASE A // CORE IMPLEMENTATION STAGES (01–09)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {completedCoreStages.map((stage) => (
              <div
                key={stage.num}
                className="p-3 border border-[#d8d7ce] bg-[#fbf9f3] text-xs font-technical flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#757872]">
                    <span className="font-bold text-[#1b1c18]">{stage.num}</span>
                    <span>·</span>
                    <span>{stage.tool}</span>
                  </div>
                  <div className="font-sans font-semibold text-sm text-[#1b1c18] mt-0.5">
                    {stage.name}
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#1b1c18] text-[#cef053] text-[10px] font-bold">
                  <Check className="w-3 h-3 text-[#cef053]" />
                  DONE
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subsequent Optimization & Verification Activities (10 - 11) */}
        <div className="space-y-2 pt-1">
          <div className="font-technical text-[10px] font-bold text-[#536600] uppercase tracking-wider">
            PHASE B // SUBSEQUENT OPTIMIZATION &amp; VERIFICATION ACTIVITIES (10–11)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {optimizationVerificationStages.map((stage) => (
              <div
                key={stage.num}
                className="p-3.5 border border-[#536600] bg-[#171a18] text-[#fbf9f3] text-xs font-technical flex items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#cef053]">
                    <span className="font-bold">{stage.num}</span>
                    <span>·</span>
                    <span>{stage.tool}</span>
                  </div>
                  <div className="font-sans font-semibold text-sm text-[#ffffff] mt-0.5">
                    {stage.name}
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 bg-[#cef053] text-[#1b1c18] text-[10px] font-bold uppercase">
                  <Check className="w-3 h-3" />
                  VERIFIED
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Clearly Distinguished Upcoming Pending Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {upcomingStages.map((stage) => (
            <div
              key={stage.num}
              className="p-3.5 border border-dashed border-[#757872] bg-[#f5f3ed] text-xs font-technical flex items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#757872]">
                  <span className="font-bold text-[#1b1c18]">{stage.num}</span>
                  <span>·</span>
                  <span>{stage.tool}</span>
                </div>
                <div className="font-sans font-semibold text-sm text-[#1b1c18] mt-0.5">
                  {stage.name}
                </div>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 bg-[#ffffff] text-[#757872] border border-[#d8d7ce] text-[10px] font-bold uppercase">
                <Clock className="w-3 h-3" />
                PENDING / NOT CLAIMED
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Route KPI Highlight Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#d8d7ce] border-b border-[#d8d7ce] bg-[#171a18] text-[#fbf9f3] text-xs font-technical">
        <div className="p-4">
          <div className="text-[#82857d] uppercase text-[10px]">FINAL VERIFIED DRCs (POST-ECO)</div>
          <div className="text-xl font-bold text-[#cef053] mt-1">0 Violations</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">40 route &rarr; 10 init PR &rarr; 0 ECO</div>
        </div>
        <div className="p-4">
          <div className="text-[#82857d] uppercase text-[10px]">I2O GROUP TIMING FIX</div>
          <div className="text-xl font-bold text-[#cef053] mt-1">+0.028 ns WNS</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">I2O group only · max-delay</div>
        </div>
        <div className="p-4">
          <div className="text-[#82857d] uppercase text-[10px]">DEFAULT GROUP TIMING FIX</div>
          <div className="text-xl font-bold text-[#cef053] mt-1">+0.186 ns WNS</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">Default group only · 60%&rarr;40% IO</div>
        </div>
        <div className="p-4">
          <div className="text-[#82857d] uppercase text-[10px]">ANTENNA &amp; CONGESTION</div>
          <div className="text-xl font-bold text-[#cef053] mt-1">0 Ant · 0.51%</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">Hotspot 18.12 · 0.20% H / 0.31% V</div>
        </div>
        <div className="p-4 bg-[#202421]">
          <div className="text-[#82857d] uppercase text-[10px]">GDSII &amp; FINAL SIGNOFF</div>
          <div className="text-base font-bold text-[#ffb4ab] mt-1">PENDING</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">LVS, full STA &amp; tape-out pending</div>
        </div>
      </div>

      {/* Main Interactive Engineering Explorer */}
      <div className="p-6 md:p-8 bg-[#ffffff] border-b border-[#d8d7ce] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-technical text-xs text-[#536600] font-bold uppercase">
              <ShieldCheck className="w-4 h-4 text-[#536600]" />
              POST-ROUTE ENGINEERING RESULTS &amp; OPTIMIZATION EXPERIMENTS
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
              {selectedReportTab === 'optimization' && 'Post-Route Timing Optimization: LVT Enabling & Useful Skew'}
              {selectedReportTab === 'stages' && 'Stage-by-Stage Progression (Placement → CTS → Post-CTS → Route → Post-Route)'}
              {selectedReportTab === 'drc' && 'Route ECO Macro-Pin Via Optimization: 40 Route → 10 Initial Post-Route → 0 Verified DRCs'}
              {selectedReportTab === 'pending' && 'Upcoming Milestone: GDSII Stream-Out & Final Physical Signoff'}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#f5f3ed] border border-[#d8d7ce] text-xs font-technical">
            <button
              onClick={() => setSelectedReportTab('optimization')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'optimization'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              TIMING OPT &amp; GROUPS
            </button>
            <button
              onClick={() => setSelectedReportTab('stages')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'stages'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              STAGE TELEMETRY
            </button>
            <button
              onClick={() => setSelectedReportTab('drc')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'drc'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              ROUTE ECO &amp; 0 DRCs
            </button>
            <button
              onClick={() => setSelectedReportTab('pending')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'pending'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              GDSII &amp; SIGNOFF (PENDING)
            </button>
          </div>
        </div>

        {/* TAB 1: Post-Route Timing Optimization (Before LVT -> After LVT -> After Useful Skew) */}
        {selectedReportTab === 'optimization' && (
          <div className="space-y-6">
            <p className="font-sans text-sm text-[#454843] max-w-4xl leading-relaxed">
              Starting from the post-route baseline (Post-Route Stage), two sequential timing optimization techniques were applied: enabling <strong className="text-[#1b1c18]">Low-Threshold Voltage (LVT)</strong> standard cells on critical setup paths, followed by <strong className="text-[#1b1c18]">Useful Skew Analysis</strong>. Together, they cut Setup TNS by <strong className="text-[#536600]">82.5%</strong> (-161.833 ns &rarr; -28.249 ns), reduced violating setup paths from 3,079 to 934, eliminated <code className="font-technical text-[#1b1c18]">m2r</code> setup violations (+0.007 ns), reduced <code className="font-technical text-[#1b1c18]">max_tran</code> to 1 net (-0.002 ns), and drove Hold WNS to -0.001 ns across just 7 remaining endpoints.
            </p>

            {/* 3-Step Optimization Progression Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs font-technical">
              {/* Step 1: Before LVT */}
              <div className="border border-[#d8d7ce] bg-[#fbf9f3] p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
                    <span className="font-bold text-[#1b1c18]">STEP 1 // BEFORE ENABLING LVT</span>
                    <span className="px-1.5 py-0.5 bg-[#e9e7df] text-[#757872] text-[10px] font-bold">BASELINE</span>
                  </div>
                  <div className="mt-3 space-y-2 text-[#454843]">
                    <div className="flex justify-between">
                      <span>Setup WNS / TNS:</span>
                      <strong className="text-[#1b1c18]">-0.201 ns / -161.833 ns</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Setup Violating Paths:</span>
                      <strong className="text-[#1b1c18]">3,079 / 53,382</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>max_tran / max_fanout:</span>
                      <strong className="text-[#1b1c18]">6 (-0.067 ns) / 908</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hold WNS / TNS:</span>
                      <strong className="text-[#1b1c18]">-0.004 ns / -0.017 ns</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hold Violating Paths:</span>
                      <strong className="text-[#1b1c18]">15 / 53,382</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Density / Glitches:</span>
                      <strong className="text-[#536600]">64.849% / 0 glitches</strong>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#d8d7ce] flex gap-2">
                  <button
                    onClick={() => setActiveModalImage({
                      src: '/assets/aistudio/cva6_postroute_setup_before_lvt.png',
                      title: 'Post-Route Timing (Before Enabling LVT) — Setup & DRVs',
                      desc: 'Setup WNS -0.201 ns, TNS -161.833 ns, 3,079 violating paths, 6 max_tran, 0 glitch violations.'
                    })}
                    className="flex-1 py-1.5 px-2 bg-[#1b1c18] text-[#cef053] hover:bg-[#2c3029] text-[10px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" /> SETUP RPT
                  </button>
                  <button
                    onClick={() => setActiveModalImage({
                      src: '/assets/aistudio/cva6_postroute_hold_before_lvt.png',
                      title: 'Post-Route Timing (Before Enabling LVT) — Hold',
                      desc: 'Hold WNS -0.004 ns, TNS -0.017 ns, 15 violating paths across functional hold views.'
                    })}
                    className="flex-1 py-1.5 px-2 bg-[#ffffff] text-[#1b1c18] border border-[#d8d7ce] hover:border-[#1b1c18] text-[10px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" /> HOLD RPT
                  </button>
                </div>
              </div>

              {/* Step 2: After Enabling LVT */}
              <div className="border border-[#536600] bg-[#ffffff] p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
                    <span className="font-bold text-[#536600]">STEP 2 // AFTER ENABLING LVT</span>
                    <span className="px-1.5 py-0.5 bg-[#e9e7df] text-[#536600] text-[10px] font-bold">-39% WNS</span>
                  </div>
                  <div className="mt-3 space-y-2 text-[#454843]">
                    <div className="flex justify-between">
                      <span>Setup WNS / TNS:</span>
                      <strong className="text-[#536600]">-0.122 ns / -29.582 ns</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Setup Violating Paths:</span>
                      <strong className="text-[#1b1c18]">1,001 / 53,382</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>max_tran / max_fanout:</span>
                      <strong className="text-[#1b1c18]">3 (-0.005 ns) / 901</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hold WNS / TNS:</span>
                      <strong className="text-[#1b1c18]">-0.003 ns / -0.015 ns</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hold Violating Paths:</span>
                      <strong className="text-[#1b1c18]">14 / 53,382</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Density / m2r Setup:</span>
                      <strong className="text-[#536600]">63.997% / +0.006 ns (MET)</strong>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#d8d7ce] flex gap-2">
                  <button
                    onClick={() => setActiveModalImage({
                      src: '/assets/aistudio/cva6_postroute_setup_after_lvt.png',
                      title: 'Post-Route Timing (After Enabling LVT) — Setup & DRVs',
                      desc: 'Setup WNS improved to -0.122 ns, TNS -29.582 ns, 1,001 violating paths, m2r cleared (+0.006 ns).'
                    })}
                    className="flex-1 py-1.5 px-2 bg-[#1b1c18] text-[#cef053] hover:bg-[#2c3029] text-[10px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" /> SETUP RPT
                  </button>
                  <button
                    onClick={() => setActiveModalImage({
                      src: '/assets/aistudio/cva6_postroute_hold_after_lvt.png',
                      title: 'Post-Route Timing (After Enabling LVT) — Hold',
                      desc: 'Hold WNS -0.003 ns, TNS -0.015 ns, 14 violating paths.'
                    })}
                    className="flex-1 py-1.5 px-2 bg-[#ffffff] text-[#1b1c18] border border-[#d8d7ce] hover:border-[#1b1c18] text-[10px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" /> HOLD RPT
                  </button>
                </div>
              </div>

              {/* Step 3: After Useful Skew Analysis */}
              <div className="border-2 border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#333833]">
                    <span className="font-bold text-[#cef053]">STEP 3 // AFTER USEFUL SKEW</span>
                    <span className="px-1.5 py-0.5 bg-[#cef053] text-[#1b1c18] text-[10px] font-bold">POST-ROUTE OPT</span>
                  </div>
                  <div className="mt-3 space-y-2 text-[#c5c7be]">
                    <div className="flex justify-between">
                      <span>Setup WNS / TNS:</span>
                      <strong className="text-[#cef053]">-0.114 ns / -28.249 ns</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Setup Violating Paths:</span>
                      <strong className="text-[#ffffff]">934 / 53,382 (98.3% pass)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>max_tran / max_fanout:</span>
                      <strong className="text-[#cef053]">1 (-0.002 ns) / 896</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hold WNS / TNS:</span>
                      <strong className="text-[#cef053]">-0.001 ns / -0.002 ns</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hold Violating Paths:</span>
                      <strong className="text-[#ffffff]">7 / 53,382 (99.98% pass)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>m2r / r2r Setup Slack:</span>
                      <strong className="text-[#cef053]">+0.007 ns / -0.034 ns</strong>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#333833] flex gap-2">
                  <button
                    onClick={() => setActiveModalImage({
                      src: '/assets/aistudio/cva6_postroute_setup_useful_skew.png',
                      title: 'Post-Route Timing (After Useful Skew Analysis) — Setup & DRVs',
                      desc: 'Setup WNS -0.114 ns, TNS -28.249 ns, 934 violating paths, max_tran reduced to 1 net (-0.002 ns).'
                    })}
                    className="flex-1 py-1.5 px-2 bg-[#cef053] text-[#1b1c18] hover:bg-[#b7d83d] text-[10px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" /> SETUP RPT
                  </button>
                  <button
                    onClick={() => setActiveModalImage({
                      src: '/assets/aistudio/cva6_postroute_hold_useful_skew.png',
                      title: 'Post-Route Timing (After Useful Skew Analysis) — Hold',
                      desc: 'Hold WNS -0.001 ns, TNS -0.002 ns, only 7 violating paths remaining out of 53,382.'
                    })}
                    className="flex-1 py-1.5 px-2 bg-[#252a26] text-[#cef053] border border-[#454843] hover:bg-[#333833] text-[10px] font-bold uppercase flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" /> HOLD RPT
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed Optimization Comparison Table */}
            <div className="border border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] p-4 overflow-x-auto">
              <div className="flex flex-wrap items-center justify-between pb-2 border-b border-[#333833] text-xs font-technical gap-2">
                <span className="text-[#cef053] font-bold uppercase">
                  POST-ROUTE TIMING OPTIMIZATION LEDGER (func_setup_ss125c_rcw/ssm40c_cw &amp; func_hold_ff125c_rcb/ffm40c_cb)
                </span>
                <span className="text-[#82857d]">Clock Period: 1.5 ns (~666.67 MHz)</span>
              </div>
              <table className="w-full text-xs font-technical mt-2 text-left">
                <thead>
                  <tr className="border-b border-[#333833] text-[#82857d]">
                    <th className="py-1.5 px-2">Optimization Step</th>
                    <th className="py-1.5 px-2 text-right">Setup WNS</th>
                    <th className="py-1.5 px-2 text-right">Setup TNS</th>
                    <th className="py-1.5 px-2 text-right">Setup Vio Paths</th>
                    <th className="py-1.5 px-2 text-right">Hold WNS / Paths</th>
                    <th className="py-1.5 px-2 text-right">max_tran</th>
                    <th className="py-1.5 px-2 text-right">Density</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252a26] text-[#c5c7be]">
                  <tr>
                    <td className="py-2 px-2">Before Enabling LVT</td>
                    <td className="py-2 px-2 text-right text-[#ffb4ab]">-0.201 ns</td>
                    <td className="py-2 px-2 text-right text-[#ffb4ab]">-161.833 ns</td>
                    <td className="py-2 px-2 text-right">3,079 / 53,382</td>
                    <td className="py-2 px-2 text-right">-0.004 ns (15)</td>
                    <td className="py-2 px-2 text-right">6 (-0.067 ns)</td>
                    <td className="py-2 px-2 text-right">64.849%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 text-[#ffffff]">After Enabling LVT</td>
                    <td className="py-2 px-2 text-right text-[#cef053]">-0.122 ns</td>
                    <td className="py-2 px-2 text-right text-[#cef053]">-29.582 ns</td>
                    <td className="py-2 px-2 text-right">1,001 / 53,382</td>
                    <td className="py-2 px-2 text-right">-0.003 ns (14)</td>
                    <td className="py-2 px-2 text-right">3 (-0.005 ns)</td>
                    <td className="py-2 px-2 text-right">63.997%</td>
                  </tr>
                  <tr className="font-bold text-[#ffffff] bg-[#202421]">
                    <td className="py-2 px-2 text-[#cef053]">After Useful Skew Analysis</td>
                    <td className="py-2 px-2 text-right text-[#cef053]">-0.114 ns</td>
                    <td className="py-2 px-2 text-right text-[#cef053]">-28.249 ns</td>
                    <td className="py-2 px-2 text-right text-[#cef053]">934 / 53,382</td>
                    <td className="py-2 px-2 text-right text-[#cef053]">-0.001 ns (7)</td>
                    <td className="py-2 px-2 text-right text-[#cef053]">1 (-0.002 ns)</td>
                    <td className="py-2 px-2 text-right">64.049%</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2.5 text-[11px] font-technical text-[#82857d]">
                Note: LVT exploration and useful skew analysis are framed as controlled optimization experiments comparing setup and hold behavior across post-route runs — not universal timing closure.
              </div>
            </div>

            {/* Separate Path-Group Fixes: I2O & Default */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="border border-[#536600] bg-[#fbf9f3] p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] font-technical">
                  <span className="font-bold text-[#1b1c18]">I2O TIMING GROUP FIX</span>
                  <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold text-[10px]">
                    FIXED · WNS +0.028 ns
                  </span>
                </div>
                <p className="font-sans text-[#454843] leading-relaxed">
                  Inserted <strong className="text-[#1b1c18]">maximum-delay constraints</strong> for input-to-output paths because I2O paths lacked valid timing endpoints without explicit max-delay bounding.
                </p>
                <div className="font-technical text-[10px] text-[#757872]">
                  Scope: I2O timing group only — NOT overall design WNS.
                </div>
              </div>

              <div className="border border-[#536600] bg-[#fbf9f3] p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] font-technical">
                  <span className="font-bold text-[#1b1c18]">DEFAULT TIMING GROUP FIX</span>
                  <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold text-[10px]">
                    FIXED · WNS +0.186 ns
                  </span>
                </div>
                <p className="font-sans text-[#454843] leading-relaxed">
                  Reduced the <strong className="text-[#1b1c18]">IO delay budget from 60% to 40%</strong> of the clock period because default paths involved reset-port-to-register-CDN recovery/removal checks.
                </p>
                <div className="font-technical text-[10px] text-[#757872]">
                  Scope: Default timing group only — NOT overall design WNS.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 5-Stage Progression Telemetry */}
        {selectedReportTab === 'stages' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] text-xs font-sans text-[#454843]">
              <strong className="font-technical uppercase text-[#1b1c18]">FLOORPLAN BASELINE: </strong>
              Die/Core area <strong className="text-[#1b1c18]">950 × 916 µm (850,552 µm²)</strong> with <strong className="text-[#1b1c18]">30% partial placement blockage</strong> between SRAM macros to preserve routing tracks across CTS and detailed routing.
            </div>
            <div className="border border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] p-4 overflow-x-auto">
              <table className="w-full text-xs font-technical text-left">
                <thead>
                  <tr className="border-b border-[#333833] text-[#82857d]">
                    <th className="py-2 px-2">Stage</th>
                    <th className="py-2 px-2">Flow Baseline</th>
                    <th className="py-2 px-2">Util / Density</th>
                    <th className="py-2 px-2">Overflow</th>
                    <th className="py-2 px-2">Hotspot</th>
                    <th className="py-2 px-2">Setup WNS / TNS</th>
                    <th className="py-2 px-2">Hold WNS</th>
                    <th className="py-2 px-2">Key DRVs / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252a26] text-[#c5c7be]">
                  {stageTelemetry.map((row, idx) => (
                    <tr key={idx} className={idx === stageTelemetry.length - 1 ? 'bg-[#202421] text-[#ffffff]' : ''}>
                      <td className="py-2.5 px-2 font-bold text-[#cef053] whitespace-nowrap">{row.stage}</td>
                      <td className="py-2.5 px-2 text-[#82857d]">{row.stageRef}</td>
                      <td className="py-2.5 px-2">{row.util}</td>
                      <td className="py-2.5 px-2">{row.overflow}</td>
                      <td className="py-2.5 px-2">{row.hotspot}</td>
                      <td className="py-2.5 px-2">
                        <div className="font-bold">{row.setupWns}</div>
                        <div className="text-[10px] text-[#82857d]">{row.setupTns}</div>
                      </td>
                      <td className="py-2.5 px-2">{row.holdWns}</td>
                      <td className="py-2.5 px-2 text-[11px]">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Route ECO & Before/After DRC Closure (40 -> 10 initial post-route -> 0 verified) */}
        {selectedReportTab === 'drc' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#fbf9f3] border border-[#1b1c18] text-xs font-sans text-[#454843] space-y-2">
              <div className="font-technical font-bold text-[#1b1c18] uppercase">
                ROUTE ECO — MACRO-PIN VIA OPTIMIZATION (CORRECTIVE ACTIONS)
              </div>
              <p className="leading-relaxed">
                Initial routing logged <strong className="text-[#1b1c18]">40 DRCs</strong> (with 0 antenna violations), and initial post-route (<code className="font-technical text-[#1b1c18]">cva6_route.db</code>) recorded <strong className="text-[#1b1c18]">10 initial post-route DRCs</strong> (dominated by 7 wide-metal-jog violations on M4 over macro pins). Engineers investigated the WMJ violations, replaced and rotated problematic vias over macro pins, reran Route ECO with <code className="font-technical bg-[#1b1c18] text-[#cef053] px-1.5 py-0.5">route_via_with_block_pins_only true</code>, and executed <code className="font-technical text-[#1b1c18]">VERIFY DRC</code> confirming <strong className="text-[#536600]">0 DRC violations</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* BEFORE ECO: Initial Post-Route DRCs (10) */}
              <div className="border border-[#d8d7ce] bg-[#fbf9f3] p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] font-technical text-xs">
                  <span className="font-bold text-[#1b1c18]">BEFORE ECO: INITIAL POST-ROUTE — 10 DRCs</span>
                  <span className="px-2 py-0.5 bg-[#e9e7df] text-[#1b1c18] font-bold">INITIAL (NOT FINAL)</span>
                </div>
                <div className="text-xs font-technical space-y-1 text-[#454843]">
                  <div>&bull; <strong>Initial Route Baseline (cva6_pcts.db):</strong> 40 DRCs · 0 Antenna</div>
                  <div>&bull; <strong>Initial Post-Route (cva6_route.db):</strong> 10 DRCs (7 WMJ M4, 2 Short, 1 EncEdg)</div>
                  <div>&bull; <strong>Overflow / Hotspot:</strong> 0.51% (0.20% H, 0.31% V) · 18.12</div>
                </div>
                <div className="border border-[#d8d7ce] bg-[#000000] p-2 cursor-pointer" onClick={() => setActiveModalImage({
                  src: '/assets/aistudio/cva6_postroute_drc_10.png',
                  title: 'BEFORE Route ECO — Initial Post-Route DRC Summary (10 Violations)',
                  desc: 'Initial post-route DRC count (10 violations) recorded prior to macro-pin via rotation and Route ECO.'
                })}>
                  <img src="/assets/aistudio/cva6_postroute_drc_10.png" alt="Initial post-route 10 DRC summary prior to Route ECO" className="w-full object-contain max-h-36" />
                </div>
              </div>

              {/* AFTER ECO: Final Verified DRCs (0 Violations) */}
              <div className="border-2 border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#333833] font-technical text-xs">
                  <span className="font-bold text-[#cef053]">AFTER ROUTE ECO — 0 VERIFIED DRCs</span>
                  <span className="px-2 py-0.5 bg-[#cef053] text-[#1b1c18] font-bold">VERIFICATION COMPLETE</span>
                </div>
                <div className="text-xs font-technical space-y-1 text-[#c5c7be]">
                  <div>&bull; <strong>Sub-Area Checked:</strong> {'{0.000 0.000 950.320 916.500}'}</div>
                  <div>&bull; <strong>Action:</strong> Replaced/rotated macro-pin vias + <span className="text-[#cef053]">route_via_with_block_pins_only true</span></div>
                  <div className="pt-1 text-[#cef053] font-bold">&bull; Result: Verification Complete : 0 Viols. (0 Antenna)</div>
                </div>
                <div className="border border-[#454843] bg-[#000000] p-2 cursor-pointer" onClick={() => setActiveModalImage({
                  src: '/assets/aistudio/image_fe25c52c.png',
                  title: 'AFTER Route ECO — Cadence Innovus VERIFY DRC (0 Viols.)',
                  desc: 'Verified zero DRC violations across full CVA6 die following macro-pin WMJ via fixes and Route ECO.'
                })}>
                  <img src="/assets/aistudio/image_fe25c52c.png" alt="Cadence Innovus Verify DRC confirming 0 violations after Route ECO" className="w-full object-contain max-h-36" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Upcoming Milestone (GDSII Generation & Final Signoff Pending) */}
        {selectedReportTab === 'pending' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#f5f3ed] border border-[#1b1c18] flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#536600] shrink-0 mt-0.5" />
              <div className="text-xs font-sans text-[#454843] leading-relaxed">
                <strong className="font-technical uppercase text-[#1b1c18] block mb-1">
                  STRICT MILESTONE BOUNDARY — SIGN-OFF, GDSII &amp; TAPE-OUT NOT CLAIMED
                </strong>
                Although Cadence Innovus VERIFY DRC confirmed <strong>0 DRC violations</strong> after Route ECO and individual path groups (I2O +0.028 ns, Default +0.186 ns) were fixed, full multi-group timing signoff, LVS, GDSII stream-out, and tape-out remain explicitly <strong>PENDING</strong>.
              </div>
            </div>

            <div className="border border-[#d8d7ce] divide-y divide-[#d8d7ce] bg-[#fbf9f3]">
              {pendingDeliverables.map((deliv, i) => (
                <div key={i} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-technical">
                  <div>
                    <div className="font-bold text-[#1b1c18]">{deliv.item}</div>
                    <div className="font-sans text-[#454843] mt-0.5">{deliv.detail}</div>
                  </div>
                  <span className="shrink-0 self-start sm:self-center px-2.5 py-1 bg-[#ffffff] border border-[#757872] text-[#757872] text-[10px] font-bold uppercase">
                    PENDING
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Factual Integrity Boundary */}
      <div className="p-6 bg-[#fbf9f3] text-xs font-sans space-y-2">
        <div className="flex items-center gap-2 font-technical font-bold uppercase text-[#536600]">
          <GitBranch className="w-4 h-4 text-[#536600]" />
          <span>STRICT FACTUAL DEMARCATION // 11 STAGES VERIFIED · 0 POST-ECO DRCs · SIGNOFF PENDING</span>
        </div>
        <p className="text-[#454843] leading-relaxed max-w-4xl">
          Every figure reported above originates directly from Cadence Innovus reports (<code className="font-technical">cva6_fp1.db</code>, <code className="font-technical">cva6_cts.db</code>, <code className="font-technical">cva6_pcts.db</code>, <code className="font-technical">cva6_route.db</code> + Route ECO). Complete multi-group timing closure, LVS completion, GDSII stream-out, or silicon tape-out are <strong className="text-[#1b1c18]">NOT</strong> claimed.
        </p>
      </div>

      {/* Modal Image Lightbox */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1b1c18]/90 flex flex-col p-4 md:p-8"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#333833] text-xs font-technical text-[#fbf9f3]">
              <span className="font-bold text-[#cef053]">{activeModalImage.title}</span>
              <button
                onClick={() => setActiveModalImage(null)}
                className="px-3 py-1 bg-[#252a26] hover:bg-[#333833] text-[#cef053] border border-[#454843] cursor-pointer"
              >
                [ CLOSE ]
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-4" onClick={() => setActiveModalImage(null)}>
              <img
                src={activeModalImage.src}
                alt={activeModalImage.title}
                className="max-h-[80vh] max-w-full object-contain"
              />
            </div>
            <div className="pt-2 text-center text-xs font-technical text-[#82857d]">
              {activeModalImage.desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
