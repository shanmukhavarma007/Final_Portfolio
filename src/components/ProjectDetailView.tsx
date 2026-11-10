import React, { useState } from 'react';
import { VerifiedProject } from '../data/portfolioData';
import { ArrowLeft, Copy, Check, Terminal, ShieldCheck, CheckCircle2, AlertCircle, Clock, BookOpen } from 'lucide-react';
import { Cva6EngineeringEvidenceGallery } from './Cva6EngineeringEvidenceGallery';
import { Cva6TimingVsDensityCaseStudy } from './Cva6TimingVsDensityCaseStudy';
import { Cva6PlacementOptimizationCaseStudy } from './Cva6PlacementOptimizationCaseStudy';
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
    'cva6-riscv': `# Cadence Innovus Physical Implementation Flow for CVA6 (28 nm)
# Step 1: Initialize design with synthesized netlist from Cadence Genus (178,799 LeafCells)
init_design

# Step 2: Define core and die boundaries (Target utilization: 70%, 950 x 916 um)
setPreference -site CORE
floorPlan -site CORE -d 950.0 916.0 20.0 20.0 20.0 20.0

# Step 3: Macro placement & halo keepouts for SRAM arrays (15 um channels)
createPlaceHalo -halo 15.0 15.0 15.0 15.0 -allBlock

# Step 4: Standard-Cell Placement & Congestion Optimization in Cadence Innovus
setPlaceMode -fp false
setPlaceMode -place_global_cong_effort high
place_opt_design -place
checkPlace
report_congestion

# Step 5: Clock Tree Synthesis (CCOpt)
create_ccopt_clock_tree_spec -file ccopt.spec
source ccopt.spec
ccopt_design -cts

# Step 6: Post-CTS Timing and Electrical DRV Analysis
timeDesign -postCTS
timeDesign -postCTS -hold
report_constraint -all_violators`,

    'aes-core': `# Cadence Genus RTL Synthesis Script for AES Cryptographic Core
# Step 1: Read technology libraries and HDL sources
set_db init_lib_search_path { ./lib }
read_hdl -language v2001 { aes_cipher_top.v aes_key_expand.v aes_sbox.v }
elaborate aes_cipher_top

# Step 2: SDC Timing Constraints (Single clock domain, 1.0 ns period / 1.0 GHz)
create_clock -name clk -period 1.0 [get_ports clk]
set_input_delay -clock clk 0.2 [all_inputs -no_clocks]
set_output_delay -clock clk 0.2 [all_outputs]

# Step 3: Synthesis & Generic Mapping
syn_generic
syn_map
syn_opt

# Step 4: Quality of Results (QoR) Summary
# 9,474 leaf instances, 5,774 cell area, max fanout 401, 0 violating paths, 0.0 TNS
report_qor > aes_synthesis_qor.rpt
write_hdl > aes_synthesized_netlist.v`,

    'half-cycle-timing': `# Cadence Genus SDC Timing Constraints for Half-Cycle Paths
# Step 1: Read technology library and RTL description
set_db init_lib_search_path { ./lib }
read_hdl -language v2001 { rtl_halfcycle_crosspaths.v }
elaborate rtl_halfcycle_crosspaths

# Step 2: Multi-Clock SDC Constraints
# Domain 1: Fast Clock (1.0 ns / 1.0 GHz)
create_clock -name clk_fast -period 1.0 [get_ports clk1]
# Domain 2: Medium Clock (2.2 ns / ~450 MHz)
create_clock -name clk_med  -period 2.2 [get_ports clk2]
# Domain 3: Slow Clock (4.4 ns / ~230 MHz)
create_clock -name clk_slow -period 4.4 [get_ports clk3]

# Step 3: Half-cycle path timing check
# Positive-edge launch to negative-edge capture requires T_period/2 capture check
set_multicycle_path 0 -setup -from [get_cells reg_pos*] -to [get_cells reg_neg*]

# Step 4: Report Timing under diverse I/O delay budgets
report_timing -from [get_cells reg_pos*] -to [get_cells reg_neg*] > halfcycle_timing.rpt`
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
          <span>[ RETURN TO 04 // PROJECTS ]</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 font-technical text-xs">
          <span className="text-[#1b1c18] font-bold">04 // PROJECTS</span>
          <span className="text-[#c5c7c1]">·</span>
          <span className="text-[#757872]">{project.index}</span>
          <span className="text-[#c5c7c1]">·</span>
          <span className="text-[#536600] font-bold">PROCESS TECHNOLOGY // {project.technologyNode}</span>
          <span className="text-[#c5c7c1]">·</span>
          <span className="text-[#1b1c18] font-bold">EDA: {project.edaToolchain.join(' & ')}</span>
        </div>
      </div>

      {/* Project Title Block & Status Banner */}
      <div className="border border-[#d8d7ce] bg-[#ffffff] p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-technical text-xs text-[#757872] uppercase tracking-wider">
            {project.category} // {project.languages.join(' · ')} // PROCESS TECHNOLOGY // {project.technologyNode}
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1b1c18] text-[#fbf9f3] font-technical text-xs uppercase font-bold border border-[#1b1c18]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#cef053]" />
            <span>
              {project.id === 'cva6-riscv'
                ? 'CTS: COMPLETED | POST-CTS: IN PROGRESS'
                : project.id === 'aes-core'
                ? 'SYNTHESIS: COMPLETED (1.0 ns CLOCK | 0 VIOLATIONS)'
                : 'STA & SDC: COMPLETED (3 CLOCKS)'}
            </span>
          </div>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl text-[#1b1c18] font-normal leading-tight">
          {project.title}
        </h1>
        <p className="font-sans text-base md:text-lg text-[#757872] mt-2 font-normal">
          {project.subtitle}
        </p>

        {/* CVA6 Placement & CTS Quick Action */}
        {project.id === 'cva6-riscv' && onNavigateToFloorplan && (
          <div className="mt-5 p-4 bg-[#f5f3ed] border border-[#d8d7ce] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-technical text-xs font-bold text-[#1b1c18] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#536600]" />
                VERIFIED STATUS: 28 nm SYNTHESIS, PLACEMENT & CTS (CCOpt) COMPLETED
              </div>
              <p className="text-xs text-[#454843] mt-1">
                Completed milestones: RTL synthesis in Cadence Genus (178,799 leaf cells), floorplanning with 15 µm channels, standard-cell placement, and Clock Tree Synthesis (CCOpt) in Cadence Innovus. Actively analyzing post-CTS timing (util: 82.7%).
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
                VERIFIED STATUS: 28 nm RTL SYNTHESIS COMPLETED IN CADENCE GENUS (1.0 ns CLOCK)
              </div>
              <p className="text-xs text-[#454843] mt-1">
                Completed milestone: 28 nm RTL logic synthesis in Cadence Genus under 1000.0 ps target clock period with 0 violating paths and 0.0 TNS across 9,474 leaf cells. Physical layout not started.
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

        {/* Half-Cycle Timing Testcase Quick Action */}
        {project.id === 'half-cycle-timing' && (
          <div className="mt-5 p-4 bg-[#f5f3ed] border border-[#d8d7ce] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="font-technical text-xs font-bold text-[#1b1c18] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#536600]" />
                VERIFIED STATUS: MULTI-CLOCK SDC & HALF-CYCLE STA IN CADENCE GENUS
              </div>
              <p className="text-xs text-[#454843] mt-1">
                Completed milestone: Evaluated half-cycle timing equation margins (T_period / 2) across 1.0 ns (1 GHz), 2.2 ns (~450 MHz), and 4.4 ns (~230 MHz) clock domains under diverse I/O delay budgets.
              </p>
            </div>
          </div>
        )}

        {/* Prominent Project Specifications Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-[#d8d7ce] border border-[#d8d7ce] bg-[#fbf9f3] text-xs font-technical">
          <div className="p-3 bg-[#ffffff]">
            <div className="text-[#757872] uppercase text-[10px] font-semibold">TECHNOLOGY NODE</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#b7d83d]" />
              {project.technologyNode}
            </div>
          </div>
          <div className="p-3">
            <div className="text-[#757872] uppercase text-[10px] font-semibold">EDA TOOLS</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1">
              {project.edaToolchain.join(' & ')}
            </div>
          </div>
          <div className="p-3">
            <div className="text-[#757872] uppercase text-[10px] font-semibold">CLOCK SPECIFICATION</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1">
              {project.id === 'cva6-riscv' 
                ? '1.5 ns (~666.67 MHz)' 
                : project.id === 'aes-core' 
                ? '1.000 ns (1.0 GHz)' 
                : '1.0 / 2.2 / 4.4 ns'}
            </div>
          </div>
          <div className="p-3">
            <div className="text-[#757872] uppercase text-[10px] font-semibold">IMPLEMENTATION STAGE</div>
            <div className="text-sm font-bold text-[#536600] mt-1">
              {project.id === 'cva6-riscv' 
                ? 'CTS Completed (CCOpt)' 
                : project.id === 'aes-core' 
                ? 'Synthesis Completed' 
                : 'STA Completed'}
            </div>
          </div>
          <div className="p-3">
            <div className="text-[#757872] uppercase text-[10px] font-semibold">NEXT STAGE / CURRENT FOCUS</div>
            <div className="text-sm font-bold text-[#1b1c18] mt-1">
              {project.id === 'cva6-riscv' 
                ? 'Post-CTS Analysis' 
                : project.id === 'aes-core' 
                ? 'Floorplanning (Planned)' 
                : 'SDC Budgeting'}
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
                  CADENCE AUTOMATION SCRIPT (TCL & SDC)
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
                    <span>COPY SCRIPT</span>
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
              ACADEMIC & TRAINING CONTEXT
            </span>
            <p className="text-[#454843] leading-relaxed">
              Implemented during hands-on training at Sumedha IT and undergraduate coursework at Vignan's Institute of Information Technology.
            </p>
          </div>
        </div>
      </div>

      {/* CVA6 Dedicated Technical Evidence Gallery: Original EDA Screenshots & Trade-Off Case Studies */}
      {project.id === 'cva6-riscv' && (
        <div className="pt-4 space-y-6">
          <SiliconTraceReveal variant="cva6-to-evidence" />
          <Cva6EngineeringEvidenceGallery />
          <Cva6TimingVsDensityCaseStudy />
          <Cva6PlacementOptimizationCaseStudy />
        </div>
      )}

      {/* AES Core Dedicated Technical Evidence Gallery: Original Cadence Genus Screenshots */}
      {project.id === 'aes-core' && (
        <div className="pt-4 space-y-3">
          <SiliconTraceReveal variant="evidence-to-aes" />
          <AesEngineeringEvidenceGallery />
        </div>
      )}

      {/* Half-Cycle Timing Testcase Dedicated Evidence Gallery */}
      {project.id === 'half-cycle-timing' && (
        <div className="pt-4 space-y-4 border border-[#d8d7ce] bg-[#ffffff] p-6">
          <div className="flex items-center gap-2 font-technical text-xs text-[#757872] uppercase pb-2 border-b border-[#d8d7ce]">
            <span className="font-bold text-[#1b1c18]">CADENCE GENUS STA EVIDENCE</span>
            <span>·</span>
            <span className="text-[#536600] font-bold">MODULE rtl_halfcycle_crosspaths</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="font-serif text-xl font-normal text-[#1b1c18]">
                Hierarchical Module Inspection in Cadence Genus
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#454843] mt-2 leading-relaxed">
                Design browser inspection confirming synthesizable elaboration of cross-clock domain registers. The circuit evaluates timing paths where launching registers trigger on the rising edge and capturing registers trigger on the falling edge, constraining the available datapath budget to half the clock period:
              </p>
              <div className="mt-3 p-3 bg-[#fbf9f3] border border-[#d8d7ce] font-technical text-xs space-y-1 text-[#1b1c18]">
                <div><strong>Setup Check:</strong> T_datapath &lt; (T_period / 2) - T_setup - T_skew</div>
                <div><strong>Hold Check:</strong> T_datapath &gt; T_hold + T_skew - (T_period / 2)</div>
              </div>
            </div>

            <div className="border border-[#d8d7ce] bg-[#171a18] p-2 flex items-center justify-center">
              <img
                src="/assets/aistudio/image_3d42a868.png"
                alt="Cadence Genus Design Browser showing rtl_halfcycle_crosspaths"
                className="max-h-64 object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
