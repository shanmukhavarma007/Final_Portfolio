import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const EdaTerminalConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'genus_synth' | 'genus_sdc' | 'innovus_fp' | 'innovus_place'>('genus_synth');
  const [copied, setCopied] = useState(false);

  const scripts = {
    genus_synth: `# ==============================================================================
# Cadence Genus RTL Synthesis Script
# Flow: Read HDL -> Elaborate -> Apply SDC -> syn_generic -> syn_map -> syn_opt
# ==============================================================================

# Set target technology standard cell library search paths
set_db init_lib_search_path { ./libraries/tech_lib }
set_db target_library       { stdcells.lib }
set_db link_library         { stdcells.lib }

# Read synthesizable Verilog HDL files
read_hdl -language v2001 {
  rtl/aes_cipher_top.v
  rtl/aes_key_expand.v
  rtl/aes_sbox.v
}

# Elaborate top-level module
elaborate aes_cipher_top

# Apply SDC timing constraints
read_sdc constraints/aes_clock.sdc

# Execute logic synthesis and technology mapping
syn_generic
syn_map
syn_opt

# Generate Quality of Results (QoR) summary
report_qor > reports/synthesis_qor.rpt
report_timing > reports/synthesis_timing.rpt
report_area   > reports/synthesis_area.rpt

# Write out synthesized gate-level netlist
write_hdl > outputs/aes_synthesized_netlist.v
puts "[INFO] Cadence Genus logic synthesis completed successfully."`,

    genus_sdc: `# ==============================================================================
# Synopsys Design Constraints (SDC) - AES Cryptographic Core
# Target: Single-clock domain with 1.0 ns target period (1.0 GHz)
# ==============================================================================

# Current unit definitions
set_time_unit 1.0ns
set_load_unit 1.0pF

# Define single primary clock
create_clock -name clk -period 1.0 -waveform {0.0 0.5} [get_ports clk]

# Clock uncertainty (jitter + margin)
set_clock_uncertainty 0.05 [get_clocks clk]

# Input delay constraints relative to clock edge
set_input_delay -clock clk 0.20 [all_inputs -no_clocks]

# Output delay constraints
set_output_delay -clock clk 0.20 [all_outputs]

# Slew and load constraints
set_max_fanout 30 [current_design]
puts "[INFO] SDC constraints loaded with 1.0 ns clock period."`,

    innovus_fp: `# ==============================================================================
# Cadence Innovus Floorplanning Script - CVA6 RISC-V Core
# Flow: Design Initialization -> Core Boundary Setup -> SRAM Macro Placement
# ==============================================================================

# Load synthesized gate-level netlist and LEF physical libraries
set init_gnd_net VSS
set init_pwr_net VDD
set init_verilog { outputs/cva6_synthesized.v }
set init_top_cell cva6_core
init_design

# Define core area aspect ratio and I/O spacing
setPreference -site CORE
floorPlan -site CORE -r 1.0 0.70 20.0 20.0 20.0 20.0

# Define macro placement halo keepouts around SRAM arrays
createPlaceHalo -halo 15.0 15.0 15.0 15.0 -allBlock

# Orient SRAM memory macros along periphery for core datapath accessibility
placeInstance cva6_core/icache/data_sram_0 100.0 700.0 R0 -fixed
placeInstance cva6_core/dcache/data_sram_0 600.0 700.0 MY -fixed

puts "[INFO] Cadence Innovus floorplanning and macro arrangement committed."`,

    innovus_place: `# ==============================================================================
# Cadence Innovus Standard-Cell Placement Script - CVA6 RISC-V Core
# Flow: Pre-placement checks -> place_opt_design -> Legalization
# ==============================================================================

# Enable placement mode
setPlaceMode -fp false
setPlaceMode -reorderScan true

# Execute standard-cell global and detailed placement with optimization
place_opt_design -place

# Verify placement legality and absence of overlaps
checkPlace

# Generate placement-stage QoR report before CTS handoff
report_qor -summary > reports/cva6_placement_qor.rpt

# Save placement database ready for CTS handoff
saveDesign dbs/cva6_placement_completed.enc
puts "[INFO] Standard-cell placement completed. Ready for future CTS handoff."`
  };

  const currentScript = scripts[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#1b1c18] bg-[#171a18] text-[#fbf9f3]">
      {/* Console Top Bar */}
      <div className="p-3 bg-[#1e221f] border-b border-[#333833] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#cef053]" />
          <span className="font-technical text-xs font-bold text-[#cef053] uppercase">
            CADENCE GENUS & INNOVUS TCL FLOW SCRIPTS
          </span>
          <span className="text-[#757872] text-xs">·</span>
          <span className="font-technical text-[10px] text-[#757872]">
            VERIFIED COURSEWORK & TRAINING SCRIPTS
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="px-2.5 py-1 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] hover:text-[#cef053] border border-[#454843] font-technical text-[11px] uppercase flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
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

      {/* EDA Command Tabs */}
      <div className="flex flex-wrap border-b border-[#333833] bg-[#141615] text-xs font-technical">
        <button
          onClick={() => setActiveTab('genus_synth')}
          className={`px-3 py-2 border-r border-[#333833] transition-colors cursor-pointer ${
            activeTab === 'genus_synth'
              ? 'bg-[#171a18] text-[#cef053] font-bold border-t-2 border-t-[#cef053]'
              : 'text-[#757872] hover:text-[#fbf9f3]'
          }`}
        >
          [ Genus: RTL Synthesis ]
        </button>
        <button
          onClick={() => setActiveTab('genus_sdc')}
          className={`px-3 py-2 border-r border-[#333833] transition-colors cursor-pointer ${
            activeTab === 'genus_sdc'
              ? 'bg-[#171a18] text-[#cef053] font-bold border-t-2 border-t-[#cef053]'
              : 'text-[#757872] hover:text-[#fbf9f3]'
          }`}
        >
          [ Genus: SDC Constraints ]
        </button>
        <button
          onClick={() => setActiveTab('innovus_fp')}
          className={`px-3 py-2 border-r border-[#333833] transition-colors cursor-pointer ${
            activeTab === 'innovus_fp'
              ? 'bg-[#171a18] text-[#cef053] font-bold border-t-2 border-t-[#cef053]'
              : 'text-[#757872] hover:text-[#fbf9f3]'
          }`}
        >
          [ Innovus: Floorplanning ]
        </button>
        <button
          onClick={() => setActiveTab('innovus_place')}
          className={`px-3 py-2 border-r border-[#333833] transition-colors cursor-pointer ${
            activeTab === 'innovus_place'
              ? 'bg-[#171a18] text-[#cef053] font-bold border-t-2 border-t-[#cef053]'
              : 'text-[#757872] hover:text-[#fbf9f3]'
          }`}
        >
          [ Innovus: Placement & checkPlace ]
        </button>
      </div>

      {/* Terminal Script Output Body */}
      <div className="p-4 overflow-x-auto max-h-[380px] dark-scroll font-technical text-xs leading-relaxed text-[#cef053]">
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="whitespace-pre font-technical"
          >
            {currentScript}
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="px-4 py-2 bg-[#121413] border-t border-[#333833] flex flex-wrap items-center justify-between text-[11px] font-technical text-[#757872]">
        <span>TOOLS: CADENCE GENUS & CADENCE INNOVUS</span>
        <span className="text-[#cef053]">AUTHENTIC TCL AUTOMATION</span>
      </div>
    </div>
  );
};
