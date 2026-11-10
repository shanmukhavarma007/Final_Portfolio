import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle, Activity, BookOpen, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface NetlistLedgerProps {
  onOpenCandidateProfile?: () => void;
  onOpenEdaConsole?: () => void;
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const NetlistLedger: React.FC<NetlistLedgerProps> = ({
  onOpenCandidateProfile,
  onOpenEdaConsole
}) => {
  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff]">
      {/* Header Ledger */}
      <div className="px-5 py-3.5 bg-[#f5f3ed] border-b border-[#d8d7ce] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
            CVA6 VERIFIED IMPLEMENTATION & MILESTONE STATUS LEDGER
          </span>
          <span className="text-[#c5c7c1]">/</span>
          <span className="font-technical text-[11px] font-bold text-[#1b1c18] bg-[#ffffff] px-2 py-0.5 border border-[#d8d7ce]">
            PROCESS TECHNOLOGY // 28 nm
          </span>
          <span className="text-[#c5c7c1]">/</span>
          <span className="font-technical text-[11px] text-[#757872]">
            CADENCE GENUS & INNOVUS (CCOpt)
          </span>
        </div>

        {/* Status Indicators & Next Milestone Label */}
        <div className="flex flex-col items-start sm:items-end gap-1">
          <div className="flex items-center gap-2">
            <div className="border border-[#1b1c18] bg-[#1b1c18] text-[#cef053] px-2.5 py-1 font-technical text-xs uppercase font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#cef053]" />
              <span>[ CTS: COMPLETED ]</span>
            </div>
            <div className="border border-[#536600] bg-[#ffffff] text-[#536600] px-2.5 py-1 font-technical text-xs uppercase font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse text-[#536600]" />
              <span>[ POST-CTS: IN PROGRESS ]</span>
            </div>
          </div>
          <span className="text-[10px] font-technical text-[#757872] uppercase tracking-wider">
            Current Focus: Post-CTS Timing & Electrical DRV Evaluation (Util: 82.7%)
          </span>
        </div>
      </div>

      {/* Two-Column Verified Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#d8d7ce]">
        {/* Column 1: Completed Implementation Stages */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
              <span className="font-technical text-xs font-bold text-[#1b1c18] uppercase">
                A. Completed Implementation Stages
              </span>
              <span className="font-technical text-[10px] text-[#536600] font-bold">
                VERIFIED (GENUS & INNOVUS)
              </span>
            </div>

            <motion.div
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-3 divide-y divide-[#d8d7ce] text-xs font-technical"
            >
              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">RTL Logic Synthesis</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  178,799 LeafCells (Genus)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Sequential & Combinational</span>
                <span className="text-[#1b1c18] font-bold">
                  23,675 Seq / 155,124 Comb
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">SDC Timing Constraints</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  1.5 ns (~666.67 MHz)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Core Floorplanning</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  70% Target Util (950 × 916 µm)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Macro Placement</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  15 µm Halo Channels
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Standard-Cell Placement</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  Legalized (WNS -0.483 ns)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Clock Tree Synthesis (CTS)</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  COMPLETED (CCOpt)
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#d8d7ce] flex justify-between items-center text-[11px] font-technical text-[#757872]">
            <span>TOOL: Cadence Innovus CCOpt</span>
            <span className="text-[#536600] font-semibold">STAGE: CTS COMPLETED</span>
          </div>
        </div>

        {/* Column 2: Current Active Stage & Downstream Boundaries */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
              <span className="font-technical text-xs font-bold text-[#1b1c18] uppercase">
                B. Active Stage & Strict Downstream Boundaries
              </span>
              <span className="font-technical text-[10px] text-[#536600] font-bold">
                FACTUAL INTEGRITY
              </span>
            </div>

            <motion.div
              variants={listContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="mt-3 divide-y divide-[#d8d7ce] text-xs font-technical"
            >
              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center bg-[#fbf9f3] px-2 -mx-2">
                <span className="text-[#1b1c18] font-bold">Post-CTS Analysis</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#536600] animate-pulse" />
                  IN PROGRESS (Util: 82.7%)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Post-CTS Setup Slack</span>
                <span className="text-[#1b1c18] font-semibold">
                  WNS: -0.318 ns, TNS: -243.042 ns
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Post-CTS Hold Slack</span>
                <span className="text-[#1b1c18] font-semibold">
                  WNS: -0.224 ns, TNS: -72.328 ns
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Routing Concepts</span>
                <span className="text-[#757872] font-semibold flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#757872]" />
                  THEORETICAL STUDY COMPLETED
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Practical Detailed Routing</span>
                <span className="text-[#757872] font-semibold">
                  NOT YET DOCUMENTED / NOT RUN
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Physical Sign-off (DRC/LVS)</span>
                <span className="text-[#757872] font-semibold">
                  NOT REACHED
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#d8d7ce] flex items-center justify-between text-[11px] font-technical">
            <button
              onClick={onOpenCandidateProfile}
              className="text-[#1b1c18] hover:text-[#536600] underline font-semibold cursor-pointer transition-colors"
            >
              [ VIEW VERIFIED QUALIFICATIONS &rarr; ]
            </button>
            <button
              onClick={onOpenEdaConsole}
              className="text-[#757872] hover:text-[#1b1c18] underline cursor-pointer transition-colors"
            >
              [ VIEW CADENCE SCRIPT WORKFLOW ]
            </button>
          </div>
        </div>
      </div>

      {/* Concise Engineering Scope Description */}
      <div className="p-5 bg-[#fbf9f3] border-t border-[#d8d7ce]">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] mb-3">
          <span className="font-technical text-xs font-bold text-[#1b1c18] uppercase">
            CVA6 Implementation & Post-CTS Engineering Scope
          </span>
          <span className="font-technical text-[10px] text-[#536600] font-bold uppercase">
            CADENCE INNOVUS SCOPE
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#454843]">
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="font-technical font-bold text-xs text-[#1b1c18] uppercase block mb-1.5">
              Floorplanning & Macro Channels
            </span>
            <p className="leading-relaxed text-[#454843]">
              Allocated 70% target utilization with 15 µm channels between SRAM macros to reserve routing resources and maintain clean macro interface pin escape into higher metal layers.
            </p>
          </div>
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="font-technical font-bold text-xs text-[#1b1c18] uppercase block mb-1.5">
              Placement & Congestion Analysis
            </span>
            <p className="leading-relaxed text-[#454843]">
              Placed standard cells across core rows, identifying 1,529 overflow edges (76 H, 1,453 V) and localized congestion around execution stage ex_stage_i (hotspot score: 4.77).
            </p>
          </div>
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="font-technical font-bold text-xs text-[#1b1c18] uppercase block mb-1.5">
              CCOpt CTS & Post-CTS Analysis
            </span>
            <p className="leading-relaxed text-[#454843]">
              Synthesized balanced clock trees via Innovus CCOpt under 1.5 ns clock. Actively evaluating post-CTS setup (WNS -0.318 ns), hold slack across path groups, and electrical DRVs (post-CTS util: 82.7%).
            </p>
          </div>
        </div>
      </div>

      {/* Critical Demarcation Explanatory Substrate */}
      <div className="p-4 bg-[#e9e7df] border-t border-[#d8d7ce] text-xs font-technical text-[#1b1c18] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#536600] shrink-0" />
          <span className="font-bold">FACTUAL INTEGRITY COMMITMENT:</span>
          <span className="text-[#454843]">
            Synthesis, floorplanning, placement, and Clock Tree Synthesis (CTS) are completed in Cadence Innovus. Post-CTS analysis is active. Routing concepts have been studied theoretically; practical detailed routing and physical signoff (DRC/LVS) have not been run. No fabricated metrics or tapeouts are claimed.
          </span>
        </div>
        <div className="shrink-0 font-bold text-[#536600]">
          VERIFIED WORK ONLY
        </div>
      </div>
    </div>
  );
};
