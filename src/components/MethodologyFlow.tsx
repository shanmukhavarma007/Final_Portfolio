import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

interface MethodologyFlowProps {
  onInspectPlacement?: () => void;
  onInspectCts?: () => void;
}

export const MethodologyFlow: React.FC<MethodologyFlowProps> = ({
  onInspectPlacement,
  onInspectCts
}) => {
  const steps = [
    {
      step: '01',
      name: 'RTL Logic Synthesis & SDC Constraints',
      tool: 'Cadence Genus',
      status: 'COMPLETED',
      description: 'Compilation of synthesizable Verilog HDL into gate-level primitives using Cadence Genus, applying SDC timing constraints (e.g., 1.0 ns period target for AES cryptographic core).'
    },
    {
      step: '02',
      name: 'Floorplanning & Macro Placement',
      tool: 'Cadence Innovus',
      status: 'COMPLETED',
      description: 'Core and die boundary creation, halo keepout margins, and arrangement of embedded SRAM cache macros along core boundaries for CVA6 in Cadence Innovus.'
    },
    {
      step: '03',
      name: 'Standard-Cell Placement & QoR',
      tool: 'Cadence Innovus',
      status: 'COMPLETED',
      description: 'Global and detailed placement of standard cells in Cadence Innovus, checking placement legality and evaluating placement-stage Quality of Results (QoR).'
    },
    {
      step: '04',
      name: 'Clock Tree Synthesis (CTS)',
      tool: 'Future Cadence Innovus Milestone',
      status: 'PLANNED_NOT_STARTED',
      description: 'Synthesizing clock distribution networks and inserting clock buffer trees to balance clock skew and manage latency. (Current status: Not started / Pending handoff).'
    },
    {
      step: '05',
      name: 'Detailed Signal Routing',
      tool: 'Future Cadence Innovus Milestone',
      status: 'PLANNED_NOT_STARTED',
      description: 'Grid-based signal routing connecting placed standard cells while satisfying design rules. (Current status: Not started).'
    },
    {
      step: '06',
      name: 'Physical Signoff (DRC / LVS)',
      tool: 'Future Signoff Milestone',
      status: 'PLANNED_NOT_STARTED',
      description: 'Full-chip physical verification: Design Rule Checking (DRC) and Layout Versus Schematic (LVS) verification. (Current status: Not completed).'
    }
  ];

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff]">
      {/* Header Ledger */}
      <div className="p-5 bg-[#f5f3ed] border-b border-[#d8d7ce]">
        <div className="font-technical text-xs text-[#757872] uppercase tracking-wider">
          [FLOW ARCHITECTURE]
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
          ASIC Physical Implementation Flow & Candidate Scope
        </h2>
        <p className="font-sans text-xs md:text-sm text-[#454843] mt-1.5 max-w-3xl leading-relaxed">
          Standardized ASIC physical design pipeline delineating completed hands-on implementation in Cadence Genus & Innovus from downstream planned stages.
        </p>
      </div>

      {/* Row 1: Steps 1 - 3 (Completed Implementation) */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d8d7ce] border-b border-[#d8d7ce]">
        {steps.slice(0, 3).map(s => (
          <div key={s.step} className="p-5 flex flex-col justify-between bg-[#fbf9f3]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] font-technical text-xs">
                <span className="font-bold text-[#1b1c18]">STEP {s.step}</span>
                <span className="px-2 py-0.5 bg-[#e9e7df] text-[#536600] font-bold text-[10px] flex items-center gap-1 border border-[#d8d7ce]">
                  <CheckCircle2 className="w-3 h-3" />
                  COMPLETED WORK
                </span>
              </div>

              <h3 className="font-serif text-lg font-medium text-[#1b1c18] mt-3">
                {s.name}
              </h3>
              <div className="font-technical text-[11px] text-[#536600] mt-0.5 font-bold">
                {s.tool}
              </div>
              <p className="font-sans text-xs text-[#454843] mt-2 leading-relaxed">
                {s.description}
              </p>
            </div>

            {s.step === '03' && onInspectPlacement && (
              <div className="mt-4 pt-3 border-t border-[#d8d7ce]">
                <button
                  onClick={onInspectPlacement}
                  className="text-xs font-technical font-bold text-[#1b1c18] hover:text-[#536600] underline cursor-pointer"
                >
                  [ VIEW CVA6 PLACEMENT VIEWPORT &rarr; ]
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Row 2: Steps 4 - 6 (Planned / Not Started) */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#d8d7ce]">
        {steps.slice(3, 6).map(s => (
          <div key={s.step} className="p-5 flex flex-col justify-between bg-[#ffffff]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] font-technical text-xs">
                <span className="font-bold text-[#1b1c18]">STEP {s.step}</span>
                <span className="px-2 py-0.5 bg-[#f5f3ed] text-[#757872] font-semibold text-[10px] border border-[#d8d7ce]">
                  NOT STARTED
                </span>
              </div>

              <h3 className="font-serif text-lg font-medium text-[#1b1c18] mt-3">
                {s.name}
              </h3>
              <div className="font-technical text-[11px] text-[#757872] mt-0.5">
                {s.tool}
              </div>
              <p className="font-sans text-xs text-[#454843] mt-2 leading-relaxed">
                {s.description}
              </p>
            </div>

            {s.step === '04' && onInspectCts && (
              <div className="mt-4 pt-3 border-t border-[#d8d7ce]">
                <button
                  onClick={onInspectCts}
                  className="text-xs font-technical font-bold text-[#757872] hover:text-[#1b1c18] underline cursor-pointer"
                >
                  [ VIEW CTS HANDOFF STATUS &rarr; ]
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
