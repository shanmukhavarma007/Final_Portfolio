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

  const completedStages = [
    { num: '01', name: 'RTL Synthesis', tool: 'Cadence Genus (178,799 cells)', status: 'COMPLETED' },
    { num: '02', name: 'Floorplanning', tool: '950 × 916 µm · 30% Blockage', status: 'COMPLETED' },
    { num: '03', name: 'Macro Placement', tool: 'Cadence Innovus (15 µm Halo)', status: 'COMPLETED' },
    { num: '04', name: 'Standard-Cell Placement', tool: 'Floorplanning Stage · 82.6% Util', status: 'COMPLETED' },
    { num: '05', name: 'Clock Tree Synthesis (CCOpt)', tool: 'Placement Stage · 83.2% Util', status: 'COMPLETED' },
    { num: '06', name: 'Post-CTS Timing & DRV Opt', tool: 'Clock Tree Synthesis Stage · 0 max_tran', status: 'COMPLETED' },
    { num: '07', name: 'Detailed Routing', tool: 'Post-CTS Stage · 0 Antenna', status: 'COMPLETED' },
    { num: '08', name: 'Post-Route Timing & Analysis', tool: 'Post-Route Stage · 10 DRCs', status: 'COMPLETED' }
  ];

  const upcomingStages = [
    { num: '09', name: 'GDSII Generation / Stream-Out', tool: 'Final Layout Export', status: 'PENDING' },
    { num: '10', name: 'Final Physical Signoff (DRC / LVS / STA)', tool: 'Signoff Verification Gate', status: 'PENDING' }
  ];

  const stageTelemetry = [
    {
      stage: 'Standard-Cell Placement',
      stageRef: 'Floorplanning Stage',
      util: '82.6%',
      overflow: '0.2% (545: 250 H + 295 V)',
      hotspot: '1.56 (max 0.35)',
      setupWns: '-0.507 ns',
      setupTns: '-1903.6 ns (29,204 paths)',
      holdWns: 'N/A (Pre-CTS)',
      notes: 'max_cap: 0, max_tran: 1 (-0.002 ns), max_fanout: 850'
    },
    {
      stage: 'Clock Tree Synthesis (CTS)',
      stageRef: 'Placement Stage',
      util: '83.2%',
      overflow: '0.47% (1,260: 303 H + 957 V)',
      hotspot: '14.83 (max 3.56)',
      setupWns: '-0.301 ns',
      setupTns: '-244.211 ns (5,191 paths)',
      holdWns: '-0.209 ns (TNS -162.887 ns, 2,468 paths)',
      notes: 'max_tran jumped to -0.160 ns (2 nets / 42 terms)'
    },
    {
      stage: 'Post-CTS Optimization',
      stageRef: 'Clock Tree Synthesis Stage',
      util: '83.6%',
      overflow: '0.53% (1,418: 290 H + 1,128 V)',
      hotspot: '16.39 (max 2.17)',
      setupWns: '-0.248 ns',
      setupTns: '-185.141 ns (4,600 paths)',
      holdWns: '-0.139 ns (TNS -6.827 ns, 170 paths)',
      notes: 'max_tran resolved to 0 violations'
    },
    {
      stage: 'Detailed Routing',
      stageRef: 'Post-CTS Stage',
      util: '64.017% density (100% w/ fillers)',
      overflow: '0.51% (1,357: 531 H + 827 V)',
      hotspot: '18.12 (max 2.43)',
      setupWns: '-0.290 ns',
      setupTns: '-439.841 ns (10,107 paths)',
      holdWns: '-0.143 ns (TNS -12.721 ns, 823 paths)',
      notes: '40 DRCs logged · 0 Antenna Violations · max_tran 202 (-0.378 ns)'
    },
    {
      stage: 'Post-Route Optimization',
      stageRef: 'Post-Route Stage',
      util: '64.049% density (100% w/ fillers)',
      overflow: '0.51%',
      hotspot: '18.12',
      setupWns: '-0.114 ns (Final Opt)',
      setupTns: '-28.249 ns (934 paths)',
      holdWns: '-0.001 ns (TNS -0.002 ns, 7 paths)',
      notes: '10 DRCs (-75%) · 0 Antenna · 0 Glitch · max_tran 1 (-0.002 ns)'
    }
  ];

  const pendingDeliverables = [
    { item: 'GDSII Generation / Stream-Out', detail: 'Final binary mask layout export after remaining DRC closure' },
    { item: 'Final DRC Verification', detail: 'Closing remaining 10 DRCs (WMJ: 7 on M4, Short: 2 [M4/M5], EncEdg: 1 on VIA3)' },
    { item: 'LVS Verification', detail: 'Layout-versus-schematic netlist equivalence verification' },
    { item: 'Final Antenna Verification', detail: 'Signoff deck antenna signoff re-check (currently 0 violations at route)' },
    { item: 'Final Timing Signoff', detail: 'Closing remaining 934 setup (-0.114 ns WNS) & 7 hold (-0.001 ns WNS) endpoints' },
    { item: 'Final Physical Implementation Reports', detail: 'Frozen signoff QoR, power, utilization, and DRV packages' },
    { item: 'Final Design Database & Deliverable Handoff', detail: 'Complete signed-off CVA6 28 nm physical design archive' }
  ];

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff] space-y-0">
      {/* Panel Top Header Bar */}
      <div className="p-6 bg-[#f5f3ed] border-b border-[#d8d7ce]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-technical text-xs text-[#757872]">
              <span className="font-bold text-[#1b1c18]">CVA6 PHYSICAL IMPLEMENTATION PROGRESSION</span>
              <span>·</span>
              <span className="text-[#536600] font-bold">CADENCE GENUS &amp; INNOVUS (FLOORPLANNING STAGE &rarr; POST-ROUTE STAGE)</span>
              <span>·</span>
              <span>28 nm PROCESS NODE · 1.5 ns (~666.67 MHz)</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
              Post-Route Implementation, Timing Optimization & DRC Analysis
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#1b1c18] text-[#cef053] font-technical text-xs uppercase font-bold border border-[#1b1c18] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#cef053]" />
              POST-ROUTE IMPLEMENTATION COMPLETED – GDSII GENERATION AND SIGNOFF PENDING
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#454843] max-w-4xl leading-relaxed">
          The 64-bit CVA6 RISC-V core has progressed through RTL Synthesis, Floorplanning (950 × 916 µm, 850,552 µm² area, 30% partial blockage between macros), Standard-Cell Placement, Clock Tree Synthesis (CCOpt), Routing, and Post-Route timing & physical optimization. Geometry DRCs dropped by <strong className="text-[#1b1c18]">75% (40 &rarr; 10)</strong> with <strong className="text-[#536600]">0 antenna</strong> and <strong className="text-[#536600]">0 glitch</strong> violations, while LVT enabling and useful skew tightened setup WNS from <strong className="text-[#1b1c18]">-0.201 ns to -0.114 ns</strong> and hold WNS to <strong className="text-[#1b1c18]">-0.001 ns</strong>. Final DRC closure, GDSII generation, and signoff remain pending.
        </p>
      </div>

      {/* Visual Workflow Stage Matrix: Completed vs Upcoming Pending */}
      <div className="p-6 border-b border-[#d8d7ce] bg-[#ffffff] space-y-4">
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#d8d7ce] gap-2">
          <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#536600]" />
            <span>CVA6 IMPLEMENTATION WORKFLOW STATUS (8 COMPLETED · 2 UPCOMING PENDING)</span>
          </div>
          <span className="font-technical text-[11px] text-[#536600] font-bold">
            VERIFIED STAGE: POST-ROUTE STAGE
          </span>
        </div>

        {/* Completed Stages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {completedStages.map((stage) => (
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

        {/* Clearly Distinguished Upcoming Stages */}
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
                PENDING / NOT STARTED
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Post-Route KPI Highlight Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-[#d8d7ce] border-b border-[#d8d7ce] bg-[#171a18] text-[#fbf9f3] text-xs font-technical">
        <div className="p-4">
          <div className="text-[#82857d] uppercase text-[10px]">POST-ROUTE DRC REDUCTION</div>
          <div className="text-xl font-bold text-[#cef053] mt-1">40 &rarr; 10 (-75%)</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">WMJ 7 · Short 2 · EncEdg 1</div>
        </div>
        <div className="p-4">
          <div className="text-[#82857d] uppercase text-[10px]">SETUP WNS PROGRESSION</div>
          <div className="text-xl font-bold text-[#cef053] mt-1">-0.507 &rarr; -0.114 ns</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">Violating paths: 29,204 &rarr; 934</div>
        </div>
        <div className="p-4">
          <div className="text-[#82857d] uppercase text-[10px]">HOLD WNS PROGRESSION</div>
          <div className="text-xl font-bold text-[#cef053] mt-1">-0.209 &rarr; -0.001 ns</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">Violating paths: 2,468 &rarr; 7</div>
        </div>
        <div className="p-4">
          <div className="text-[#82857d] uppercase text-[10px]">ANTENNA &amp; GLITCH</div>
          <div className="text-xl font-bold text-[#cef053] mt-1">0 / 0</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">Verified 0 antenna &amp; 0 glitch</div>
        </div>
        <div className="p-4 bg-[#202421]">
          <div className="text-[#82857d] uppercase text-[10px]">GDSII &amp; FINAL SIGNOFF</div>
          <div className="text-base font-bold text-[#ffb4ab] mt-1">PENDING</div>
          <div className="text-[10px] text-[#c5c7be] mt-0.5">10 DRCs + 934/7 paths left</div>
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
              {selectedReportTab === 'drc' && 'Routing & Post-Route DRC Breakdown, Overflow & Antenna Integrity'}
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
              LVT &amp; USEFUL SKEW OPT
            </button>
            <button
              onClick={() => setSelectedReportTab('stages')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'stages'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              5-STAGE TELEMETRY
            </button>
            <button
              onClick={() => setSelectedReportTab('drc')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'drc'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              DRC &amp; ANTENNA (40 &rarr; 10)
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
                Note: Significant WNS/TNS reduction achieved without fabricating complete closure; 934 setup paths, 7 hold paths, and 1 max_tran net remain for final signoff closure.
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

        {/* TAB 3: DRC & Antenna Analysis (40 -> 10) */}
        {selectedReportTab === 'drc' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Route DRCs (40) */}
              <div className="border border-[#d8d7ce] bg-[#fbf9f3] p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] font-technical text-xs">
                  <span className="font-bold text-[#1b1c18]">ROUTE (FROM POST-CTS STAGE) — 40 DRCs</span>
                  <span className="px-2 py-0.5 bg-[#e9e7df] text-[#1b1c18] font-bold">INITIAL ROUTE</span>
                </div>
                <div className="text-xs font-technical space-y-1 text-[#454843]">
                  <div>&bull; <strong>EOLSpc (M2):</strong> 29 violations</div>
                  <div>&bull; <strong>WMJ (M4):</strong> 7 violations</div>
                  <div>&bull; <strong>EncEdg (VIA1):</strong> 2 violations</div>
                  <div>&bull; <strong>Short (M5):</strong> 1 violation</div>
                  <div>&bull; <strong>CutEol (VIA3):</strong> 1 violation</div>
                  <div className="pt-1 text-[#536600] font-bold">&bull; Antenna Violations: 0 Violations</div>
                </div>
                <div className="border border-[#d8d7ce] bg-[#000000] p-2 cursor-pointer" onClick={() => setActiveModalImage({
                  src: '/assets/aistudio/cva6_route_drc_40.png',
                  title: 'Route Stage DRC Summary (40 Violations)',
                  desc: 'Violation Summary By Layer and Type at initial routing totaling 40 DRCs before post-route cleanup.'
                })}>
                  <img src="/assets/aistudio/cva6_route_drc_40.png" alt="Route stage 40 DRC summary" className="w-full object-contain max-h-36" />
                </div>
              </div>

              {/* Post-Route DRCs (10) */}
              <div className="border border-[#1b1c18] bg-[#ffffff] p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] font-technical text-xs">
                  <span className="font-bold text-[#1b1c18]">POST-ROUTE STAGE — 10 DRCs</span>
                  <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold">75% REDUCTION</span>
                </div>
                <div className="text-xs font-technical space-y-1 text-[#454843]">
                  <div>&bull; <strong>EOLSpc (M2):</strong> 29 &rarr; <strong className="text-[#536600]">0 (RESOLVED)</strong></div>
                  <div>&bull; <strong>EncEdg (VIA1) &amp; CutEol (VIA3):</strong> <strong className="text-[#536600]">RESOLVED</strong></div>
                  <div>&bull; <strong>Remaining WMJ (M4):</strong> 7 violations</div>
                  <div>&bull; <strong>Remaining Short:</strong> 2 violations (1 on M4, 1 on M5)</div>
                  <div>&bull; <strong>Remaining EncEdg (VIA3):</strong> 1 violation</div>
                  <div className="pt-1 text-[#536600] font-bold">&bull; Overflow: 0.51% · Hotspot: 18.12 · 0 Antenna · 0 Glitch</div>
                </div>
                <div className="border border-[#1b1c18] bg-[#000000] p-2 cursor-pointer" onClick={() => setActiveModalImage({
                  src: '/assets/aistudio/cva6_postroute_drc_10.png',
                  title: 'Post-Route DRC Summary (10 Remaining Violations)',
                  desc: 'Post-route DRC reduction from 40 to 10 (-75%) leaving WMJ (7), Short (2), and EncEdg (1).'
                })}>
                  <img src="/assets/aistudio/cva6_postroute_drc_10.png" alt="Post-route 10 DRC summary" className="w-full object-contain max-h-36" />
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
                  STRICT MILESTONE BOUNDARY — SIGN-OFF &amp; GDSII NOT COMPLETED
                </strong>
                All 7 final deliverables below remain <strong>PENDING</strong> following the Post-Route Stage. Remaining geometry DRCs (10) and timing paths (934 setup, 7 hold) must be closed prior to streaming out GDSII.
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
          <span>STRICT FACTUAL DEMARCATION // POST-ROUTE VERIFIED · SIGNOFF PENDING</span>
        </div>
        <p className="text-[#454843] leading-relaxed max-w-4xl">
          Every figure reported above originates directly from Cadence Innovus implementation reports across the Floorplanning Stage through the Post-Route Stage. Zero-DRC signoff, LVS completion, GDSII stream-out, or silicon tapeout are <strong className="text-[#1b1c18]">NOT</strong> claimed.
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
