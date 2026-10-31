import React, { useState } from 'react';
import { VerifiedProject } from '../data/portfolioData';
import { ArrowLeft, Copy, Check, Terminal, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Cva6EngineeringEvidenceGallery } from './Cva6EngineeringEvidenceGallery';
import { AesEngineeringEvidenceGallery } from './AesEngineeringEvidenceGallery';
import { SiliconTraceReveal } from './SiliconTraceReveal';

interface ProjectDetailViewProps {
  project: VerifiedProject;
  onBack: () => void;
  onNavigateToFloorplan?: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onNavigateToFloorplan
}) => {
  const [copiedScript, setCopiedScript] = useState(false);

  const tclScripts: Record<string, string> = {
    'cva6-riscv': `# Cadence Innovus Floorplanning & Placement Flow for CVA6
# Step 1: Initialize design with synthesized netlist from Cadence Genus
init_design

# Step 2: Define core and die boundaries
setPreference -site CORE
floorPlan -site CORE -r 1.0 0.70 20 20 20 20

# Step 3: Macro placement & halo keepouts for SRAM arrays
# Place instruction cache and data cache SRAM macros along core periphery
createPlaceHalo -halo 15 15 15 15 -allBlock

# Step 4: Standard-Cell Placement in Cadence Innovus
setPlaceMode -fp false
place_opt_design -place

# Step 5: Check Placement Legality
checkPlace
report_qor -summary`,

    'aes-core': `# Cadence Genus RTL Synthesis Script for AES Cryptographic Core
# Step 1: Read technology libraries and HDL sources
set_db init_lib_search_path { ./lib }
read_hdl -language v2001 { aes_cipher_top.v aes_key_expand.v aes_sbox.v }
elaborate aes_cipher_top

# Step 2: SDC Timing Constraints (Single clock domain, 1.0 ns period)
create_clock -name clk -period 1.0 [get_ports clk]
set_input_delay -clock clk 0.2 [all_inputs -no_clocks]
set_output_delay -clock clk 0.2 [all_outputs]

# Step 3: Synthesis & Generic Mapping
syn_generic
syn_map
syn_opt

# Step 4: Quality of Results (QoR) Summary
report_qor > aes_synthesis_qor.rpt
write_hdl > aes_synthesized_netlist.v`
  };

  const scriptText = tclScripts[project.id] || '# Cadence EDA Execution Flow';

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Top Ledger Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#d8d7ce]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-technical text-xs uppercase font-bold text-[#1b1c18] hover:text-[#536600] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          [ RETURN TO PROJECTS LEDGER ]
        </button>

        <div className="flex items-center gap-2 font-technical text-xs">
          <span className="text-[#757872]">{project.index}</span>
          <span className="text-[#c5c7c1]">·</span>
          <span className="text-[#1b1c18] font-bold">EDA: {project.edaToolchain.join(' & ')}</span>
        </div>
      </div>

      {/* Project Title Block & Status Banner */}
      <div className="border border-[#d8d7ce] bg-[#ffffff] p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-technical text-xs text-[#757872] uppercase tracking-wider">
            {project.category} // {project.languages.join(' · ')}
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1b1c18] text-[#fbf9f3] font-technical text-xs uppercase font-bold border border-[#1b1c18]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#cef053]" />
            <span>
              {project.id === 'cva6-riscv'
                ? 'PLACEMENT: COMPLETED | CTS: PENDING'
                : 'SYNTHESIS: COMPLETED (1 ns CLOCK)'}
            </span>
          </div>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-[#1b1c18] font-normal leading-tight">
          {project.title}
        </h1>
        <p className="font-sans text-base md:text-lg text-[#757872] mt-2 font-normal">
          {project.subtitle}
        </p>

        {/* CVA6 Placement Quick Action */}
        {project.id === 'cva6-riscv' && onNavigateToFloorplan && (
          <div className="mt-5 p-4 bg-[#f5f3ed] border border-[#d8d7ce] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-technical text-xs font-bold text-[#1b1c18] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#536600]" />
                VERIFIED STATUS: PLACEMENT COMPLETED IN CADENCE INNOVUS
              </div>
              <p className="text-xs text-[#454843] mt-1">
                Completed milestone: RTL synthesis in Cadence Genus, floorplanning, and standard-cell placement in Cadence Innovus. CTS has not been started.
              </p>
            </div>
            <button
              onClick={onNavigateToFloorplan}
              className="px-4 py-2 bg-[#1b1c18] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
            >
              [ VIEW CVA6 FLOORPLAN CAD ] &rarr;
            </button>
          </div>
        )}

        {/* AES Core Synthesis Quick Action */}
        {project.id === 'aes-core' && (
          <div className="mt-5 p-4 bg-[#f5f3ed] border border-[#d8d7ce] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-technical text-xs font-bold text-[#1b1c18] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#536600]" />
                VERIFIED STATUS: RTL SYNTHESIS COMPLETED IN CADENCE GENUS (1.0 ns CLOCK)
              </div>
              <p className="text-xs text-[#454843] mt-1">
                Completed milestone: RTL logic synthesis in Cadence Genus under 1000.0 ps target clock period with 0 violating paths. Physical design stages have not been started.
              </p>
            </div>
            <a
              href="#aes-evidence"
              className="px-4 py-2 bg-[#1b1c18] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer border border-[#1b1c18]"
            >
              [ VIEW CADENCE GENUS QoR ] &darr;
            </a>
          </div>
        )}

        {/* Tools and Languages Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#d8d7ce] border border-[#d8d7ce] bg-[#fbf9f3] text-xs font-technical">
          <div className="p-3">
            <div className="text-[#757872]">EDA TOOLCHAIN</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1">
              {project.edaToolchain.join(', ')}
            </div>
          </div>
          <div className="p-3">
            <div className="text-[#757872]">LANGUAGES</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1">
              {project.languages.join(', ')}
            </div>
          </div>
          <div className="p-3">
            <div className="text-[#757872]">CURRENT STAGE</div>
            <div className="text-sm font-bold text-[#536600] mt-1">
              {project.id === 'cva6-riscv' ? 'Placement Complete' : 'Synthesis Complete'}
            </div>
          </div>
          <div className="p-3">
            <div className="text-[#757872]">NEXT STAGE</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1">
              {project.id === 'cva6-riscv' ? 'CTS (Pending)' : 'Floorplanning (Planned)'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scope and Deliverables */}
        <div className="lg:col-span-8 space-y-6">
          {/* Executive Overview */}
          <div className="border border-[#d8d7ce] bg-[#ffffff] p-6">
            <h2 className="font-serif text-2xl text-[#1b1c18] font-normal mb-3">
              Project Overview & Implementation Scope
            </h2>
            <p className="text-sm md:text-base text-[#454843] leading-relaxed">
              {project.overview}
            </p>

            <div className="mt-5">
              <h3 className="font-technical text-xs font-bold uppercase text-[#1b1c18] mb-2.5">
                Completed Implementation Activities
              </h3>
              <ul className="space-y-2 text-xs md:text-sm text-[#454843]">
                {project.implementationScope.map((scope, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-technical text-[#536600] font-bold select-none">&bull;</span>
                    <span>{scope}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Deliverables */}
          <div className="border border-[#d8d7ce] bg-[#ffffff] p-6">
            <h2 className="font-serif text-2xl text-[#1b1c18] font-normal mb-3">
              Verified Project Deliverables
            </h2>
            <ul className="space-y-2 text-xs md:text-sm text-[#454843]">
              {project.verifiedDeliverables.map((deliv, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-technical text-[#1b1c18] font-bold select-none">[{i + 1}]</span>
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cadence EDA Tcl Script */}
          <div className="border border-[#1b1c18] bg-[#171a18] text-[#fbf9f3] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#333833]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#cef053]" />
                <span className="font-technical text-xs font-bold text-[#cef053] uppercase">
                  CADENCE AUTOMATION SCRIPT (TCL)
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] hover:text-[#cef053] border border-[#454843] font-technical text-[11px] uppercase flex items-center gap-1.5 cursor-pointer"
              >
                {copiedScript ? (
                  <>
                    <Check className="w-3 h-3 text-[#cef053]" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY TCL</span>
                  </>
                )}
              </button>
            </div>
            <pre className="mt-3 text-xs font-technical text-[#cef053] overflow-x-auto whitespace-pre leading-relaxed p-2 bg-[#121413]">
              {scriptText}
            </pre>
          </div>
        </div>

        {/* Right Column: Strict Boundaries & Authenticity Notes */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-[#d8d7ce] bg-[#ffffff] p-5">
            <div className="pb-3 border-b border-[#d8d7ce] flex items-center justify-between">
              <span className="font-technical text-xs font-bold uppercase text-[#1b1c18] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#536600]" />
                FACTUAL BOUNDARIES
              </span>
              <span className="font-technical text-[10px] text-[#536600] font-bold">
                STRICT INTEGRITY
              </span>
            </div>

            <div className="mt-3 space-y-2.5 text-xs text-[#454843]">
              {project.honestBoundaryNotes.map((note, i) => (
                <div key={i} className="p-2.5 bg-[#fbf9f3] border border-[#d8d7ce] flex items-start gap-2">
                  <span className="text-[#1b1c18] font-bold">&bull;</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#d8d7ce] bg-[#f5f3ed] p-5 text-xs font-technical">
            <span className="font-bold uppercase text-[#1b1c18] block mb-2">
              ACADEMIC CONTEXT
            </span>
            <p className="text-[#454843] leading-relaxed">
              Implemented during hands-on training at Sumedha IT and undergraduate coursework at Vignan's Institute of Information Technology.
            </p>
          </div>
        </div>
      </div>

      {/* CVA6 Dedicated Technical Evidence Gallery: 3 Original EDA Screenshots */}
      {project.id === 'cva6-riscv' && (
        <div className="pt-4 space-y-3">
          <SiliconTraceReveal variant="cva6-to-evidence" />
          <Cva6EngineeringEvidenceGallery />
        </div>
      )}

      {/* AES Core Dedicated Technical Evidence Gallery: 2 Original Cadence Genus Screenshots */}
      {project.id === 'aes-core' && (
        <div className="pt-4 space-y-3">
          <SiliconTraceReveal variant="evidence-to-aes" />
          <AesEngineeringEvidenceGallery />
        </div>
      )}
    </div>
  );
};
