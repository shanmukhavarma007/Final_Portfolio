import React, { useState } from 'react';
import { 
  Check, 
  Clock, 
  Terminal, 
  BookOpen, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Cpu, 
  ChevronRight,
  TrendingDown,
  Eye,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CtsHandoffGatePanelProps {
  onOpenEdaConsole?: () => void;
}

export const CtsHandoffGatePanel: React.FC<CtsHandoffGatePanelProps> = ({
  onOpenEdaConsole
}) => {
  const [selectedReportTab, setSelectedReportTab] = useState<'setup' | 'hold' | 'drvs'>('setup');
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  const timelineStages = [
    { num: '01', name: 'RTL Synthesis', tool: 'Cadence Genus', status: 'COMPLETED' },
    { num: '02', name: 'Floorplanning', tool: 'Cadence Innovus', status: 'COMPLETED' },
    { num: '03', name: 'Macro Placement', tool: 'Cadence Innovus', status: 'COMPLETED' },
    { num: '04', name: 'Power Planning', tool: 'Cadence Innovus', status: 'COMPLETED' },
    { num: '05', name: 'Standard-Cell Placement', tool: 'Cadence Innovus', status: 'COMPLETED' },
    { num: '06', name: 'Clock Tree Synthesis (CCOpt)', tool: 'Cadence Innovus', status: 'COMPLETED' },
    { num: '07', name: 'Post-CTS Timing & DRV Analysis', tool: 'Cadence Innovus', status: 'IN_PROGRESS' },
    { num: '08', name: 'Routing Concepts', tool: 'Theoretical Study', status: 'THEORETICAL' },
    { num: '09', name: 'Practical Detailed Routing', tool: 'Cadence Innovus', status: 'NOT_YET_COMPLETED' }
  ];

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff] space-y-0">
      {/* Panel Top Header Bar */}
      <div className="p-6 bg-[#f5f3ed] border-b border-[#d8d7ce]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-technical text-xs text-[#757872]">
              <span className="font-bold text-[#1b1c18]">03 // IMPLEMENTATION MILESTONE</span>
              <span>·</span>
              <span className="text-[#536600] font-bold">CADENCE INNOVUS CCOpt</span>
              <span>·</span>
              <span>28 nm PROCESS NODE</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
              Clock Tree Synthesis (CTS) & Post-CTS Analysis
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#1b1c18] text-[#cef053] font-technical text-xs uppercase font-bold border border-[#1b1c18] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#cef053]" />
              CTS: COMPLETED
            </span>
            <span className="px-3 py-1 bg-[#ffffff] text-[#536600] font-technical text-xs uppercase font-bold border border-[#536600] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              POST-CTS ANALYSIS: IN PROGRESS
            </span>
            <span className="px-3 py-1 bg-[#eae8e2] text-[#757872] font-technical text-xs uppercase font-bold border border-[#d8d7ce]">
              ROUTING: THEORETICAL STUDY COMPLETED
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#454843] max-w-4xl leading-relaxed">
          Clock Tree Synthesis for the CVA6 64-bit RISC-V core has been <strong>successfully completed</strong> using the Cadence Innovus Concurrent Clock and Datapath Optimization (CCOpt) engine. The clock network was synthesized, buffered, and latency-balanced under the 1.5 ns clock constraint. Initial post-CTS evaluation satisfied handoff timing criteria, and the project has progressed into comprehensive post-CTS setup, hold, and design-rule analysis.
        </p>
      </div>

      {/* 9-Stage Physical Implementation Progress Timeline */}
      <div className="p-6 border-b border-[#d8d7ce] bg-[#ffffff]">
        <div className="flex items-center justify-between pb-3 border-b border-[#d8d7ce] mb-4">
          <div className="font-technical text-xs font-bold text-[#1b1c18] uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#536600]" />
            <span>CVA6 IMPLEMENTATION PROGRESS TIMELINE (9 STAGES)</span>
          </div>
          <span className="font-technical text-[11px] text-[#757872]">
            VERIFIED FLOW STATUS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {timelineStages.map((stage) => {
            const isCompleted = stage.status === 'COMPLETED';
            const isInProgress = stage.status === 'IN_PROGRESS';
            const isTheoretical = stage.status === 'THEORETICAL';
            const isNotYet = stage.status === 'NOT_YET_COMPLETED';

            return (
              <div
                key={stage.num}
                className={`p-3 border text-xs font-technical flex items-start justify-between gap-2 transition-all ${
                  isCompleted
                    ? 'border-[#d8d7ce] bg-[#fbf9f3]'
                    : isInProgress
                    ? 'border-[#536600] bg-[#ffffff] ring-1 ring-[#536600]'
                    : isTheoretical
                    ? 'border-[#d8d7ce] bg-[#f5f3ed]'
                    : 'border-[#d8d7ce] bg-[#fafafa] opacity-75'
                }`}
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

                <div className="shrink-0 text-right">
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#1b1c18] text-[#cef053] text-[10px] font-bold">
                      <Check className="w-3 h-3 text-[#cef053]" />
                      COMPLETED
                    </span>
                  )}
                  {isInProgress && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#536600] text-[#ffffff] text-[10px] font-bold">
                      <Activity className="w-3 h-3 text-[#cef053] animate-pulse" />
                      IN PROGRESS
                    </span>
                  )}
                  {isTheoretical && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#e9e7df] text-[#757872] text-[10px] font-bold border border-[#d8d7ce]">
                      <BookOpen className="w-3 h-3" />
                      THEORY COMPLETED
                    </span>
                  )}
                  {isNotYet && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#f0eee8] text-[#757872] text-[10px] font-bold">
                      <Clock className="w-3 h-3" />
                      NOT YET COMPLETED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post-CTS Timing & Design-Rule Analysis Subsection */}
      <div className="p-6 md:p-8 bg-[#ffffff] border-b border-[#d8d7ce] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-technical text-xs text-[#536600] font-bold uppercase">
              <ShieldCheck className="w-4 h-4 text-[#536600]" />
              POST-CTS TIMING & DESIGN-RULE ANALYSIS
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
              Post-CTS Timing & Electrical DRV Evaluation
            </h3>
            <p className="font-sans text-sm text-[#454843] mt-1 max-w-3xl leading-relaxed">
              Following CCOpt clock tree synthesis, setup slack, multi-corner hold slack, and electrical design rule violations were evaluated across all 53,382 timing paths. Post-CTS core utilization was recorded at <strong className="text-[#1b1c18]">82.7%</strong> for the selected implementation database.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#f5f3ed] border border-[#d8d7ce] text-xs font-technical">
            <button
              onClick={() => setSelectedReportTab('setup')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'setup'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              SETUP TIMING & DRVs
            </button>
            <button
              onClick={() => setSelectedReportTab('hold')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'hold'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              HOLD SLACK ANALYSIS
            </button>
            <button
              onClick={() => setSelectedReportTab('drvs')}
              className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
                selectedReportTab === 'drvs'
                  ? 'bg-[#1b1c18] text-[#cef053]'
                  : 'text-[#757872] hover:text-[#1b1c18]'
              }`}
            >
              ELECTRICAL DRVs
            </button>
          </div>
        </div>

        {/* Tab 1: Post-CTS Setup Timing & DRVs */}
        {selectedReportTab === 'setup' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-technical">
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">ALL PATHS WNS</div>
                <div className="text-xl font-bold text-[#1b1c18] mt-1">-0.318 ns</div>
                <div className="text-[10px] text-[#536600] mt-0.5">Setup mode: all</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">ALL PATHS TNS</div>
                <div className="text-xl font-bold text-[#1b1c18] mt-1">-243.042 ns</div>
                <div className="text-[10px] text-[#757872] mt-0.5">Across violating endpoints</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">VIOLATING PATHS</div>
                <div className="text-xl font-bold text-[#1b1c18] mt-1">6,356 / 53,382</div>
                <div className="text-[10px] text-[#757872] mt-0.5">88.1% of paths passing</div>
              </div>
              <div className="p-3 bg-[#1b1c18] text-[#fbf9f3] border border-[#1b1c18]">
                <div className="text-[#82857d] uppercase text-[10px]">POST-CTS CORE UTILIZATION</div>
                <div className="text-xl font-bold text-[#cef053] mt-1">82.7%</div>
                <div className="text-[10px] text-[#c5c7be] mt-0.5">Selected database observation</div>
              </div>
            </div>

            {/* Path Group Breakdown Table */}
            <div className="border border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] p-4 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 border-b border-[#333833] text-xs font-technical">
                <span className="text-[#cef053] font-bold uppercase">
                  CADENCE INNOVUS POST-CTS SETUP REPORT (EXACT REPORT TABLE)
                </span>
                <span className="text-[#82857d]">Target Clock: 1.5 ns</span>
              </div>
              <table className="w-full text-xs font-technical mt-2 text-left">
                <thead>
                  <tr className="border-b border-[#333833] text-[#82857d]">
                    <th className="py-1 px-2">Setup Mode</th>
                    <th className="py-1 px-2 text-right">WNS (ns)</th>
                    <th className="py-1 px-2 text-right">TNS (ns)</th>
                    <th className="py-1 px-2 text-right">Violating Paths</th>
                    <th className="py-1 px-2 text-right">All Paths</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252a26] text-[#c5c7be]">
                  <tr className="font-bold text-[#ffffff] bg-[#202421]">
                    <td className="py-1.5 px-2">all</td>
                    <td className="py-1.5 px-2 text-right text-[#ffb4ab]">-0.318</td>
                    <td className="py-1.5 px-2 text-right text-[#ffb4ab]">-243.042</td>
                    <td className="py-1.5 px-2 text-right">6,356</td>
                    <td className="py-1.5 px-2 text-right">53,382</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-[#cef053]">default</td>
                    <td className="py-1 px-2 text-right">-0.318</td>
                    <td className="py-1 px-2 text-right">-76.588</td>
                    <td className="py-1 px-2 text-right">2,332</td>
                    <td className="py-1 px-2 text-right">23,202</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">i2o</td>
                    <td className="py-1 px-2 text-right">-0.139</td>
                    <td className="py-1 px-2 text-right">-24.311</td>
                    <td className="py-1 px-2 text-right">259</td>
                    <td className="py-1 px-2 text-right">647</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">i2r</td>
                    <td className="py-1 px-2 text-right">-0.152</td>
                    <td className="py-1 px-2 text-right">-50.575</td>
                    <td className="py-1 px-2 text-right">1,705</td>
                    <td className="py-1 px-2 text-right">8,862</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">m2r</td>
                    <td className="py-1 px-2 text-right">-0.063</td>
                    <td className="py-1 px-2 text-right">-3.190</td>
                    <td className="py-1 px-2 text-right">74</td>
                    <td className="py-1 px-2 text-right">770</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">r2cgate</td>
                    <td className="py-1 px-2 text-right">-0.139</td>
                    <td className="py-1 px-2 text-right">-4.170</td>
                    <td className="py-1 px-2 text-right">142</td>
                    <td className="py-1 px-2 text-right">444</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">r2m</td>
                    <td className="py-1 px-2 text-right">-0.110</td>
                    <td className="py-1 px-2 text-right">-9.712</td>
                    <td className="py-1 px-2 text-right">183</td>
                    <td className="py-1 px-2 text-right">2,316</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">r2o</td>
                    <td className="py-1 px-2 text-right">-0.166</td>
                    <td className="py-1 px-2 text-right">-35.442</td>
                    <td className="py-1 px-2 text-right">695</td>
                    <td className="py-1 px-2 text-right">3,228</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">r2r (reg-to-reg)</td>
                    <td className="py-1 px-2 text-right">-0.157</td>
                    <td className="py-1 px-2 text-right">-84.142</td>
                    <td className="py-1 px-2 text-right">2,322</td>
                    <td className="py-1 px-2 text-right">23,714</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-3 pt-3 border-t border-[#333833] flex items-center justify-between">
                <span className="text-[11px] text-[#82857d]">
                  Artifact: Cadence Innovus Post-CTS Setup & DRV Report
                </span>
                <button
                  onClick={() => setActiveModalImage({
                    src: '/assets/aistudio/image_3149f24a.png',
                    title: 'Cadence Innovus Post-CTS Setup Timing & DRVs',
                    desc: 'Original Innovus terminal report showing post-CTS setup mode slack across groups and electrical DRV checks.'
                  })}
                  className="px-2.5 py-1 bg-[#252a26] hover:bg-[#333833] text-[#cef053] border border-[#454843] text-[11px] font-bold uppercase flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  [ VIEW ORIGINAL SCREENSHOT ]
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Post-CTS Hold Slack Analysis */}
        {selectedReportTab === 'hold' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-technical">
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">ALL HOLD WNS</div>
                <div className="text-xl font-bold text-[#1b1c18] mt-1">-0.224 ns</div>
                <div className="text-[10px] text-[#536600] mt-0.5">Concentrated in r2m</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">ALL HOLD TNS</div>
                <div className="text-xl font-bold text-[#1b1c18] mt-1">-72.328 ns</div>
                <div className="text-[10px] text-[#757872] mt-0.5">Multi-corner hold analysis</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">HOLD CORNERS EVALUATED</div>
                <div className="text-sm font-bold text-[#1b1c18] mt-1">ff125c & ffm40c</div>
                <div className="text-[10px] text-[#757872] mt-0.5">Fast-fast multi-corner libraries</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">HOLD CLEAN GROUPS</div>
                <div className="text-sm font-bold text-[#536600] mt-1">6 of 8 Groups Passing</div>
                <div className="text-[10px] text-[#757872] mt-0.5">default, i2o, i2r, m2r, r2cg, r2o</div>
              </div>
            </div>

            {/* Hold Path Table */}
            <div className="border border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] p-4 overflow-x-auto">
              <div className="flex items-center justify-between pb-2 border-b border-[#333833] text-xs font-technical">
                <span className="text-[#cef053] font-bold uppercase">
                  HOLD VIEWS: func_hold_ff125c_rcb · func_hold_ffm40c_cb
                </span>
                <span className="text-[#82857d]">Total Paths: 53,382</span>
              </div>
              <table className="w-full text-xs font-technical mt-2 text-left">
                <thead>
                  <tr className="border-b border-[#333833] text-[#82857d]">
                    <th className="py-1 px-2">Hold Mode</th>
                    <th className="py-1 px-2 text-right">WNS (ns)</th>
                    <th className="py-1 px-2 text-right">TNS (ns)</th>
                    <th className="py-1 px-2 text-right">Violating Paths</th>
                    <th className="py-1 px-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#252a26] text-[#c5c7be]">
                  <tr className="font-bold text-[#ffffff] bg-[#202421]">
                    <td className="py-1.5 px-2">all</td>
                    <td className="py-1.5 px-2 text-right text-[#ffb4ab]">-0.224</td>
                    <td className="py-1.5 px-2 text-right text-[#ffb4ab]">-72.328</td>
                    <td className="py-1.5 px-2 text-right">1,249</td>
                    <td className="py-1.5 px-2 text-right text-[#ffb4ab]">Active Optimization</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-[#cef053]">default</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">+0.880</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0.000</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">PASSED</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">i2o</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">+1.887</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0.000</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">PASSED</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">i2r</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">+0.877</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0.000</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">PASSED</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">m2r</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">+0.122</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0.000</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">PASSED</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">r2cgate</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">+0.011</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0.000</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">PASSED</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2 text-[#ffb4ab]">r2m (reg-to-macro)</td>
                    <td className="py-1 px-2 text-right text-[#ffb4ab]">-0.224</td>
                    <td className="py-1 px-2 text-right text-[#ffb4ab]">-69.456</td>
                    <td className="py-1 px-2 text-right">1,045</td>
                    <td className="py-1 px-2 text-right text-[#ffb4ab]">Memory Interface Fixes</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">r2o</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">+0.934</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0.000</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">0</td>
                    <td className="py-1 px-2 text-right text-[#cef053]">PASSED</td>
                  </tr>
                  <tr>
                    <td className="py-1 px-2">r2r (reg-to-reg)</td>
                    <td className="py-1 px-2 text-right text-[#ffb4ab]">-0.078</td>
                    <td className="py-1 px-2 text-right text-[#ffb4ab]">-2.872</td>
                    <td className="py-1 px-2 text-right">204</td>
                    <td className="py-1 px-2 text-right text-[#ffb4ab]">Delay Buffer Targets</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-3 pt-3 border-t border-[#333833] flex items-center justify-between">
                <span className="text-[11px] text-[#82857d]">
                  Artifact: Cadence Innovus Post-CTS Hold Slack Report
                </span>
                <button
                  onClick={() => setActiveModalImage({
                    src: '/assets/aistudio/image_4f13f294.png',
                    title: 'Cadence Innovus Post-CTS Hold Slack Report',
                    desc: 'Original Innovus terminal report showing multi-corner hold slack across path groups.'
                  })}
                  className="px-2.5 py-1 bg-[#252a26] hover:bg-[#333833] text-[#cef053] border border-[#454843] text-[11px] font-bold uppercase flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  [ VIEW ORIGINAL SCREENSHOT ]
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Electrical DRVs */}
        {selectedReportTab === 'drvs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-technical">
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">MAX_CAPACITANCE</div>
                <div className="text-xl font-bold text-[#536600] mt-1">0 Violations</div>
                <div className="text-[10px] text-[#536600] mt-0.5">Clean electrical capacitance</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">MAX_TRANSITION</div>
                <div className="text-xl font-bold text-[#1b1c18] mt-1">7 Nets (59 terms)</div>
                <div className="text-[10px] text-[#757872] mt-0.5">Worst violation: -0.049 ns</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">MAX_FANOUT</div>
                <div className="text-xl font-bold text-[#1b1c18] mt-1">902 Nets (Real)</div>
                <div className="text-[10px] text-[#757872] mt-0.5">Worst fanout slack: -43</div>
              </div>
              <div className="p-3 bg-[#fbf9f3] border border-[#d8d7ce]">
                <div className="text-[#757872] uppercase text-[10px]">MAX_LENGTH</div>
                <div className="text-xl font-bold text-[#536600] mt-1">0 Violations</div>
                <div className="text-[10px] text-[#536600] mt-0.5">Zero wire length breaches</div>
              </div>
            </div>

            <div className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] text-xs font-sans text-[#454843] space-y-2">
              <div className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
                Electrical Design Rule Analysis (DRV Interpretation)
              </div>
              <p className="leading-relaxed">
                The post-CTS DRV audit revealed zero maximum capacitance and zero maximum wire length violations. Max transition violations were tightly bounded to just 7 nets (worst violation -0.049 ns). The 902 max fanout violations are primarily unbuffered global reset and test control nets that will be buffered prior to detailed route execution.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Theoretical Routing Knowledge Card */}
      <div className="p-6 bg-[#fbf9f3] text-xs font-sans space-y-2.5">
        <div className="flex items-center gap-2 font-technical font-bold uppercase text-[#757872]">
          <BookOpen className="w-4 h-4 text-[#757872]" />
          <span>ROUTING KNOWLEDGE & STRICT FACTUAL DEMARCATION</span>
        </div>
        <h4 className="font-serif text-lg text-[#1b1c18] font-normal">
          Routing Concepts: Theory Completed · Practical Routing: Not Yet Documented
        </h4>
        <p className="text-[#454843] leading-relaxed max-w-4xl">
          Theoretical study of global routing, track assignment, and detailed grid-based maze routing algorithms has been completed through coursework and Sumedha IT training. In strict compliance with factual portfolio integrity:
          <strong className="text-[#1b1c18]"> detailed routing has NOT been run on this core</strong>, no DRC/LVS physical signoff has been completed, and no tapeout is claimed. The practical verified implementation boundary stands at completed Clock Tree Synthesis and active post-CTS timing/DRV analysis.
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
            <div className="flex-1 overflow-auto flex items-center justify-center p-4">
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
