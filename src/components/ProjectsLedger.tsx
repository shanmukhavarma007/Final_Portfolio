import React from 'react';
import { VERIFIED_PROJECTS, VerifiedProject } from '../data/portfolioData';
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck, Activity } from 'lucide-react';
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
            Hands-on semiconductor implementation projects executed in Cadence Genus and Cadence Innovus on the 28 nm node. Features synthesis, floorplanning, placement, and Clock Tree Synthesis (CCOpt) with genuine EDA reports.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-[#eae8e2] border border-[#d8d7ce] text-xs font-technical shrink-0">
          <span className="font-bold text-[#1b1c18] uppercase px-2 py-1">
            VERIFIED PROJECTS ({VERIFIED_PROJECTS.length})
          </span>
        </div>
      </div>

      {/* Projects Grid (3 Verified Projects) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VERIFIED_PROJECTS.map((project: VerifiedProject) => {
          const isCva6 = project.id === 'cva6-riscv';
          const isAes = project.id === 'aes-core';
          const isHalfCycle = project.id === 'half-cycle-timing';

          return (
            <motion.div
              key={project.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="border border-[#d8d7ce] bg-[#ffffff] transition-all flex flex-col justify-between group hover:border-[#1b1c18] hover:shadow-sm"
            >
              {/* Card Header Ledger */}
              <div>
                <div className="px-4 py-2.5 bg-[#f5f3ed] border-b border-[#d8d7ce] flex flex-wrap items-center justify-between gap-2 text-xs font-technical">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#1b1c18]">{project.index}</span>
                    <span className="text-[#c5c7c1]">·</span>
                    <span className="text-[#757872]">{project.category}</span>
                  </div>

                  <span className="text-[#536600] font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    VERIFIED
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-1.5 font-technical text-[11px]">
                      <span className="text-[#757872] uppercase">
                        EDA: {project.edaToolchain.join(' & ')}
                      </span>
                    </div>

                    <span className="font-technical text-[11px] px-2 py-0.5 border bg-[#e9e7df] text-[#1b1c18] border-[#d8d7ce] font-bold">
                      {isCva6 
                        ? 'CTS: COMPLETED' 
                        : isAes 
                        ? 'SYNTHESIS: COMPLETED' 
                        : 'STA & SDC: COMPLETED'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#1b1c18] group-hover:text-black transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs text-[#757872] mt-1 line-clamp-2">
                    {project.subtitle}
                  </p>

                  {/* Prominent Project Specifications Pill Strip */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 font-technical text-xs">
                    <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold text-[11px]">
                      NODE: {project.technologyNode}
                    </span>
                    <span className="px-2 py-0.5 bg-[#f5f3ed] border border-[#d8d7ce] text-[#1b1c18] font-semibold text-[11px]">
                      {isCva6 
                        ? 'CLOCK: 1.5 ns' 
                        : isAes 
                        ? 'CLOCK: 1.0 ns' 
                        : '3 CLOCKS: 1.0/2.2/4.4 ns'}
                    </span>
                    <span className="px-2 py-0.5 bg-[#f5f3ed] border border-[#d8d7ce] text-[#536600] font-semibold text-[11px]">
                      {isCva6 
                        ? 'POST-CTS: IN PROGRESS' 
                        : isAes 
                        ? '0 VIOLATING PATHS' 
                        : 'MULTI-BUDGET STA'}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#454843] mt-3 leading-relaxed line-clamp-4">
                    {project.overview}
                  </p>

                  {/* Completed Stages Checklist */}
                  <div className="mt-4 p-3 bg-[#fbf9f3] border border-[#d8d7ce] text-xs font-technical">
                    <span className="font-bold text-[#1b1c18] block mb-2 uppercase text-[11px]">
                      Verified Scope Highlights:
                    </span>
                    <ul className="space-y-1 text-[#454843] text-[11px]">
                      {project.completedStages.slice(0, 4).map((stage, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#536600] font-bold">&bull;</span>
                          <span className="line-clamp-1">{stage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Factual Boundary Callout */}
                  <div className="mt-3 p-2.5 bg-[#f5f3ed] border border-[#d8d7ce] text-[11px] font-technical text-[#454843]">
                    {isCva6 && (
                      <div>
                        <span className="font-bold text-[#1b1c18]">CURRENT STATUS: </span>
                        Clock Tree Synthesis completed via Cadence Innovus CCOpt. Post-CTS analysis in progress (util: 82.7%). Detailed routing not started.
                      </div>
                    )}
                    {isAes && (
                      <div>
                        <span className="font-bold text-[#1b1c18]">CURRENT STATUS: </span>
                        RTL synthesis completed in Cadence Genus (9,474 leaf cells, 0.0 TNS, 0 violating paths). Physical layout not started.
                      </div>
                    )}
                    {isHalfCycle && (
                      <div>
                        <span className="font-bold text-[#1b1c18]">CURRENT STATUS: </span>
                        Static Timing Analysis & SDC constraints verified in Cadence Genus across 3 clocks (1 GHz, ~450 MHz, ~230 MHz).
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
                    {isCva6 
                      ? '★ VERIFIED CTS & PLACEMENT EVIDENCE' 
                      : isAes 
                      ? '★ VERIFIED SYNTHESIS QoR' 
                      : '★ VERIFIED STA & SDC REPORTS'}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectProject(project)}
                  className="group px-3 py-1.5 bg-[#1b1c18] hover:bg-[#2c3029] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase tracking-wider transition-all border border-[#1b1c18] cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>[ VIEW DETAILS ]</span>
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
