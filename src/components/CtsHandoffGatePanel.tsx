import React, { useState } from 'react';
import { Check, Clock, ChevronDown, ChevronUp, Terminal, BookOpen, AlertCircle, ShieldCheck } from 'lucide-react';

interface CtsHandoffGatePanelProps {
  onOpenEdaConsole?: () => void;
}

export const CtsHandoffGatePanel: React.FC<CtsHandoffGatePanelProps> = ({
  onOpenEdaConsole
}) => {
  const [expandedSection, setExpandedSection] = useState<string>('handoff-status');

  const toggleSection = (id: string) => {
    setExpandedSection(prev => (prev === id ? '' : id));
  };

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff]">
      {/* Panel Top Header Bar */}
      <div className="p-5 bg-[#f5f3ed] border-b border-[#d8d7ce]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-technical text-xs text-[#757872]">
              <span>[MILESTONE REGISTER]</span>
              <span>·</span>
              <span>PHYSICAL IMPLEMENTATION BOUNDARY</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
              Clock Tree Synthesis (CTS) Status & Handoff Boundary
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#1b1c18] text-[#fbf9f3] font-technical text-xs uppercase font-medium">
              PLACEMENT: COMPLETED
            </span>
            <span className="px-3 py-1 bg-[#f0eee8] text-[#757872] font-technical text-xs uppercase font-bold border border-[#d8d7ce]">
              CTS: NOT STARTED / PENDING HANDOFF
            </span>
          </div>
        </div>

        <p className="mt-3 text-sm text-[#454843] max-w-4xl leading-relaxed">
          Standard-cell placement for the CVA6 64-bit core has been completed using Cadence Innovus. Clock Tree Synthesis (CTS) has <strong>not been started</strong>. In accordance with strict engineering integrity, this section defines the verified placement completion, the theoretical CTS concepts studied, and the planned future implementation roadmap.
        </p>
      </div>

      {/* 3-Category Architectural Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d8d7ce] border-b border-[#d8d7ce] bg-[#ffffff] text-xs font-technical">
        <div className="p-4 bg-[#fbf9f3]">
          <div className="text-[#536600] font-bold uppercase text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#b7d83d]" />
            COMPLETED (HANDS-ON)
          </div>
          <div className="text-sm font-bold text-[#1b1c18] mt-1.5">Standard-Cell Placement</div>
          <div className="text-[#454843] mt-1 leading-relaxed">
            Core floorplan, SRAM macro placement, and standard-cell placement finished in Cadence Innovus.
          </div>
        </div>

        <div className="p-4 bg-[#f5f3ed]">
          <div className="text-[#757872] font-bold uppercase text-[11px] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#757872]" />
            STUDIED (THEORY)
          </div>
          <div className="text-sm font-bold text-[#1b1c18] mt-1.5">CTS Concepts & Skew Theory</div>
          <div className="text-[#454843] mt-1 leading-relaxed">
            Clock tree topologies (H-tree, clock mesh), latency, and skew balancing studied in academic coursework.
          </div>
        </div>

        <div className="p-4 bg-[#ffffff]">
          <div className="text-[#1b1c18] font-bold uppercase text-[11px] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#1b1c18]" />
            PLANNED / NOT STARTED
          </div>
          <div className="text-sm font-bold text-[#1b1c18] mt-1.5">CTS Implementation & Routing</div>
          <div className="text-[#454843] mt-1 leading-relaxed">
            Running clock tree synthesis in Cadence Innovus, clock buffer insertion, and detailed routing are future milestones.
          </div>
        </div>
      </div>

      {/* Factual Information Cards */}
      <div className="divide-y divide-[#d8d7ce]">
        {/* Card 1: Placement Completion Details */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-technical">
            <span className="font-bold text-[#536600]">STAGE 01</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="px-1.5 py-0.5 bg-[#e9e7df] text-[#536600] font-bold border border-[#d8d7ce]">
              COMPLETED WORK
            </span>
          </div>
          <h3 className="font-serif text-xl font-medium text-[#1b1c18] mt-1">
            CVA6 Standard-Cell Placement in Cadence Innovus
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#454843] mt-2 leading-relaxed">
            Following logic synthesis in Cadence Genus, floorplanning was defined in Cadence Innovus. Instruction cache and data cache SRAM macros were arranged along the core periphery with appropriate spacing. Global and detailed placement of standard cells was executed, followed by placement legality checks.
          </p>
          <div className="mt-3 p-3 bg-[#f5f3ed] border border-[#d8d7ce] text-xs font-technical text-[#454843]">
            <span className="font-bold text-[#1b1c18]">Delivered Database: </span>
            Legalized placement database in Cadence Innovus ready for future CTS handoff.
          </div>
        </div>

        {/* Card 2: Studied CTS Concepts */}
        <div className="p-5 bg-[#fbf9f3]">
          <div className="flex items-center gap-2 text-xs font-technical">
            <span className="font-bold text-[#757872]">STAGE 02</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="px-1.5 py-0.5 bg-[#f5f3ed] text-[#757872] font-bold border border-[#d8d7ce]">
              STUDIED CONCEPTS (THEORETICAL)
            </span>
          </div>
          <h3 className="font-serif text-xl font-medium text-[#1b1c18] mt-1">
            Clock Tree Architecture Fundamentals (Coursework & Training)
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#454843] mt-2 leading-relaxed">
            In academic studies at Vignan's Institute of Information Technology and specialized physical design training at Sumedha IT, the following clock tree concepts were studied:
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-[#454843] list-disc list-inside">
            <li>Role of clock buffers and inverters in equalizing propagation latency to synchronous flip-flops.</li>
            <li>Minimizing clock skew (the arrival time difference between launch and capture clock pins).</li>
            <li>Clock tree routing constraints and shielding considerations to protect clock signals from crosstalk.</li>
          </ul>
          <div className="mt-3 p-3 bg-[#e9e7df] border border-[#d8d7ce] text-xs font-technical text-[#1b1c18]">
            <span className="font-bold text-[#536600]">Boundary Note: </span>
            Understanding these theoretical principles does not mean CTS has been implemented on this block. Implementation remains pending.
          </div>
        </div>

        {/* Card 3: Planned Future Roadmap */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs font-technical">
            <span className="font-bold text-[#1b1c18]">STAGE 03</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="px-1.5 py-0.5 bg-[#1b1c18] text-[#fbf9f3] font-bold">
              PLANNED / NOT STARTED
            </span>
          </div>
          <h3 className="font-serif text-xl font-medium text-[#1b1c18] mt-1">
            Future CTS Implementation & Routing Roadmap
          </h3>
          <p className="font-sans text-xs md:text-sm text-[#454843] mt-2 leading-relaxed">
            The next scheduled technical milestone is to perform hands-on Clock Tree Synthesis on the placed CVA6 core in Cadence Innovus, followed by post-CTS timing evaluation and nano-routing.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-technical">
            <span className="p-2 bg-[#f5f3ed] border border-[#d8d7ce] text-[#757872]">
              CTS Buffer Synthesis: Planned
            </span>
            <span className="p-2 bg-[#f5f3ed] border border-[#d8d7ce] text-[#757872]">
              Detailed Routing: Not Started
            </span>
            <span className="p-2 bg-[#f5f3ed] border border-[#d8d7ce] text-[#757872]">
              Physical Signoff: Not Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
