import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
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
      staggerChildren: 0.07,
      delayChildren: 0.04
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
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
        <div className="flex items-center gap-3">
          <span className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
            CVA6 VERIFIED IMPLEMENTATION & HANDOFF STATUS LEDGER
          </span>
          <span className="text-[#c5c7c1]">/</span>
          <span className="font-technical text-[11px] text-[#757872]">
            CADENCE GENUS & INNOVUS FLOW
          </span>
        </div>

        {/* Status Indicators & Next Milestone Label */}
        <div className="flex flex-col items-start sm:items-end gap-1">
          <div className="flex items-center gap-2">
            <div className="border border-[#1b1c18] bg-[#1b1c18] text-[#fbf9f3] px-2.5 py-1 font-technical text-xs uppercase flex items-center gap-1.5">
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                className="w-2 h-2 bg-[#b7d83d] inline-block shrink-0"
              />
              <span>[ PLACEMENT: COMPLETED ]</span>
            </div>
            <div className="border border-[#536600] bg-[#e9e7df] text-[#536600] px-2.5 py-1 font-technical text-xs uppercase font-semibold">
              <span>[ CTS: NOT STARTED / PENDING ]</span>
            </div>
          </div>
          <span className="text-[10px] font-technical text-[#536600] font-semibold uppercase tracking-wider">
            Next Milestone: CTS Handoff Readiness
          </span>
        </div>
      </div>

      {/* Two-Column Verified Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#d8d7ce]">
        {/* Column 1: Completed Implementation Stages (All 6 Retained) */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
              <span className="font-technical text-xs font-bold text-[#1b1c18] uppercase">
                A. Completed Implementation Stages
              </span>
              <span className="font-technical text-[10px] text-[#536600] font-bold">
                VERIFIED COMPLETED
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
                  COMPLETED (Cadence Genus)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">SDC Timing Constraints</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  APPLIED & VERIFIED
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Core Floorplanning</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  COMPLETED (Cadence Innovus)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Macro Placement</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  COMPLETED (Cadence Innovus)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Standard-Cell Placement</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  COMPLETED (Cadence Innovus)
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Placement-Stage QoR Analysis</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#536600]" />
                  ANALYZED IN INNOVUS
                </span>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#d8d7ce] flex justify-between items-center text-[11px] font-technical text-[#757872]">
            <span>TOOL: Cadence Innovus Physical Design</span>
            <span className="text-[#1b1c18] font-semibold">STAGE: PLACEMENT COMPLETE</span>
          </div>
        </div>

        {/* Column 2: Pending Stages & Current Boundary */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
              <span className="font-technical text-xs font-bold text-[#1b1c18] uppercase">
                B. Current Boundary & Pending Downstream Stages
              </span>
              <span className="font-technical text-[10px] text-[#757872]">
                STATUS REPORT
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
                <span className="text-[#757872]">CTS Handoff Status</span>
                <span className="text-[#1b1c18] font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#536600]" />
                  PENDING
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Clock Tree Synthesis (CTS)</span>
                <span className="text-[#757872] font-semibold">
                  NOT STARTED
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Detailed Routing</span>
                <span className="text-[#757872] font-semibold">
                  NOT STARTED
                </span>
              </motion.div>

              <motion.div variants={rowVariants} className="py-2.5 flex justify-between items-center">
                <span className="text-[#757872]">Physical Sign-off</span>
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

      {/* Concise Placement Engineering Scope Description */}
      <div className="p-5 bg-[#fbf9f3] border-t border-[#d8d7ce]">
        <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] mb-3">
          <span className="font-technical text-xs font-bold text-[#1b1c18] uppercase">
            CVA6 Placement Engineering Scope
          </span>
          <span className="font-technical text-[10px] text-[#536600] font-bold uppercase">
            CADENCE INNOVUS SCOPE
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans text-[#454843]">
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="font-technical font-bold text-xs text-[#1b1c18] uppercase block mb-1.5">
              Macro Placement & Pin Access
            </span>
            <p className="leading-relaxed text-[#454843]">
              Positioned instruction and data cache SRAM macros along core boundaries with perimeter halo keepouts to reserve routing channels and maintain clear, unblocked pin access to macro interface pins.
            </p>
          </div>
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="font-technical font-bold text-xs text-[#1b1c18] uppercase block mb-1.5">
              Standard-Cell Placement & Legalization
            </span>
            <p className="leading-relaxed text-[#454843]">
              Placed standard cells across core site rows in Cadence Innovus, followed by placement legalization checks (checkPlace) to eliminate cell overlaps and ensure legal row alignment.
            </p>
          </div>
          <div className="p-3.5 bg-[#ffffff] border border-[#d8d7ce]">
            <span className="font-technical font-bold text-xs text-[#1b1c18] uppercase block mb-1.5">
              Placement-Stage QoR Analysis
            </span>
            <p className="leading-relaxed text-[#454843]">
              Evaluated placement Quality of Results (report_qor) in Cadence Innovus to inspect standard-cell density distribution and preliminary pre-CTS path delays prior to clock tree synthesis.
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
            Standard-cell placement has been completed in Cadence Innovus. Clock Tree Synthesis (CTS), detailed routing, and physical sign-off have not been performed. No fabricated metrics, WNS slack numbers, or fictitious closure results are claimed.
          </span>
        </div>
        <div className="shrink-0 font-bold text-[#536600]">
          VERIFIED WORK ONLY
        </div>
      </div>
    </div>
  );
};
