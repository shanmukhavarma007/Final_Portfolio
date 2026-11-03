import React from 'react';
import { VERIFIED_PROJECTS, VerifiedProject } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { SiliconTraceReveal } from './SiliconTraceReveal';

interface ProjectsLedgerProps {
  onSelectProject: (project: VerifiedProject) => void;
}

export const ProjectsLedger: React.FC<ProjectsLedgerProps> = ({
  onSelectProject
}) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#d8d7ce]">
        <div>
          <div className="flex items-center gap-2 font-technical text-xs text-[#757872] uppercase tracking-wider">
            <span className="font-bold text-[#1b1c18] text-sm">04 // PROJECTS</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#536600] font-bold">VERIFIED PHYSICAL DESIGN & SYNTHESIS</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1b1c18] font-normal mt-1">
            Verified Physical Design & Synthesis Projects
          </h2>
          <p className="font-sans text-sm md:text-base text-[#454843] mt-1.5 max-w-3xl leading-relaxed">
            Record of actual, hands-on engineering projects completed using Cadence Genus and Cadence Innovus. Strictly represents verified implementation stages without fabricated tapeouts or fictional metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-[#eae8e2] border border-[#d8d7ce] text-xs font-technical shrink-0">
          <span className="font-bold text-[#1b1c18] uppercase px-2 py-1">
            VERIFIED PROJECTS ({VERIFIED_PROJECTS.length})
          </span>
        </div>
      </div>

      {/* Projects Grid (2 Verified Projects Only) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VERIFIED_PROJECTS.map((project: VerifiedProject) => {
          const isCva6 = project.id === 'cva6-riscv';

          return (
            <motion.div
              key={project.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="border border-[#d8d7ce] bg-[#ffffff] transition-all flex flex-col justify-between group hover:border-[#1b1c18] hover:shadow-sm"
            >
              {/* Card Header Ledger */}
              <div>
                {!isCva6 && (
                  <div className="bg-[#ffffff] border-b border-[#d8d7ce] px-3 pt-1">
                    <SiliconTraceReveal variant="evidence-to-aes" className="my-0" />
                  </div>
                )}
                <div className="px-4 py-2.5 bg-[#f5f3ed] border-b border-[#d8d7ce] flex flex-wrap items-center justify-between gap-2 text-xs font-technical">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#1b1c18]">{project.index}</span>
                    <span className="text-[#c5c7c1]">·</span>
                    <span className="text-[#757872]">{project.category}</span>
                    <span className="text-[#c5c7c1]">·</span>
                    <span className="font-bold text-[#1b1c18] bg-[#ffffff] px-1.5 py-0.2 border border-[#d8d7ce]">
                      PROCESS: {project.technologyNode}
                    </span>
                  </div>

                  <span className="text-[#536600] font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    VERIFIED PROJECT
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5 font-technical text-[11px]">
                      <span className="text-[#757872] uppercase">
                        EDA: {project.edaToolchain.join(' & ')}
                      </span>
                      <span className="text-[#c5c7c1]">·</span>
                      <span className="font-bold text-[#536600]">
                        PROCESS TECHNOLOGY // {project.technologyNode}
                      </span>
                    </div>

                    <span className="font-technical text-[11px] px-2 py-0.5 border bg-[#e9e7df] text-[#1b1c18] border-[#d8d7ce] font-bold">
                      {isCva6 ? 'PLACEMENT: COMPLETED' : 'SYNTHESIS: COMPLETED'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#1b1c18] group-hover:text-black transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#757872] mt-1 line-clamp-2">
                    {project.subtitle}
                  </p>

                  {/* Prominent Project Specifications Pill Strip */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-2 font-technical text-xs">
                    <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold">
                      TECHNOLOGY NODE: {project.technologyNode}
                    </span>
                    <span className="px-2 py-0.5 bg-[#f5f3ed] border border-[#d8d7ce] text-[#1b1c18] font-semibold">
                      {isCva6 ? 'CLOCK: 1.5 ns (~666.67 MHz)' : 'CLOCK: 1.000 ns'}
                    </span>
                    <span className="px-2 py-0.5 bg-[#f5f3ed] border border-[#d8d7ce] text-[#536600] font-semibold">
                      {isCva6 ? 'STAGE: PLACEMENT COMPLETED' : 'STAGE: SYNTHESIS COMPLETED'}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#454843] mt-3 leading-relaxed">
                    {project.overview}
                  </p>

                  {/* Completed Stages Checklist */}
                  <div className="mt-4 p-3 bg-[#fbf9f3] border border-[#d8d7ce] text-xs font-technical">
                    <span className="font-bold text-[#1b1c18] block mb-2 uppercase text-[11px]">
                      Completed Implementation Scope:
                    </span>
                    <ul className="space-y-1 text-[#454843]">
                      {project.completedStages.map((stage, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#536600] font-bold">&bull;</span>
                          <span>{stage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Factual Boundary Callout */}
                  <div className="mt-3 p-2.5 bg-[#f5f3ed] border border-[#d8d7ce] text-[11px] font-technical text-[#454843]">
                    {isCva6 ? (
                      <div>
                        <span className="font-bold text-[#1b1c18]">CURRENT STATUS: </span>
                        Standard-cell placement is completed. Clock Tree Synthesis (CTS) is not started (handoff pending). Detailed routing and tapeout are not completed.
                      </div>
                    ) : (
                      <div>
                        <span className="font-bold text-[#1b1c18]">CURRENT STATUS: </span>
                        RTL synthesis completed in Cadence Genus with single-clock 1.0 ns period SDC constraint. Physical floorplanning and placement not started.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Action Trigger */}
              <div className="p-4 bg-[#fbf9f3] border-t border-[#d8d7ce] flex items-center justify-between">
                <div className="flex flex-col text-[11px] font-technical">
                  <span className="text-[#757872]">LANGUAGES: {project.languages.join(', ')}</span>
                  <span className="text-[#536600] font-bold mt-0.5">
                    {isCva6 ? '★ 3 VERIFIED EDA SCREENSHOTS' : '★ 2 VERIFIED GENUS SCREENSHOTS'}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectProject(project)}
                  className="group px-3.5 py-1.5 bg-[#1b1c18] hover:bg-[#2c3029] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase tracking-wider transition-all border border-[#1b1c18] cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>[ VIEW CASE STUDY ]</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
