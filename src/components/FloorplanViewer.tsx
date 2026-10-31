import React, { useState } from 'react';
import { CVA6_FLOORPLAN_BLOCKS } from '../data/portfolioData';
import { Layers, Crosshair, ZoomIn, ZoomOut, RotateCcw, Info, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloorplanViewerProps {
  onSelectBlock?: (blockId: string) => void;
  isEvidenceExpanded?: boolean;
  onToggleEvidence?: () => void;
}

export const FloorplanViewer: React.FC<FloorplanViewerProps> = ({
  onSelectBlock,
  isEvidenceExpanded = true,
  onToggleEvidence
}) => {
  const [activeLayers, setActiveLayers] = useState({
    macros: true,
    logic: true,
    boundaries: true
  });
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState(CVA6_FLOORPLAN_BLOCKS[0]);

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff] flex flex-col">
      {/* Floorplan Viewer Header Ledger */}
      <div className="px-4 py-3 bg-[#f5f3ed] border-b border-[#d8d7ce] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-technical text-xs font-semibold uppercase text-[#1b1c18]">
            [CAD 01] CVA6 64-BIT CORE FLOORPLAN & PLACEMENT TOPOGRAPHY
          </span>
          <span className="text-[#757872] text-xs">·</span>
          <span className="font-technical text-[11px] text-[#536600] font-bold">
            CADENCE INNOVUS PHYSICAL DESIGN
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 font-technical text-xs text-[#757872]">
          <span>STATUS:</span>
          <span className="text-[#1b1c18] font-bold">
            STANDARD-CELL PLACEMENT COMPLETED
          </span>
        </div>
      </div>

      {/* Control Strip & Layer Selectors */}
      <div className="p-3 bg-[#f0eee8] border-b border-[#d8d7ce] flex flex-wrap items-center justify-between gap-2 text-xs font-technical">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[#757872] mr-1 uppercase text-[11px] flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> LAYERS:
          </span>

          <button
            onClick={() => toggleLayer('macros')}
            className={`px-2.5 py-1 text-[11px] border transition-colors cursor-pointer ${
              activeLayers.macros
                ? 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18]'
                : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce] hover:text-[#1b1c18]'
            }`}
          >
            SRAM Cache Macros ({activeLayers.macros ? 'VISIBLE' : 'HIDDEN'})
          </button>

          <button
            onClick={() => toggleLayer('logic')}
            className={`px-2.5 py-1 text-[11px] border transition-colors cursor-pointer ${
              activeLayers.logic
                ? 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18]'
                : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce] hover:text-[#1b1c18]'
            }`}
          >
            Core Standard-Cell Area ({activeLayers.logic ? 'VISIBLE' : 'HIDDEN'})
          </button>

          <button
            onClick={() => toggleLayer('boundaries')}
            className={`px-2.5 py-1 text-[11px] border transition-colors cursor-pointer ${
              activeLayers.boundaries
                ? 'bg-[#1b1c18] text-[#b7d83d] border-[#1b1c18]'
                : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce] hover:text-[#1b1c18]'
            }`}
          >
            Die & Core Boundaries ({activeLayers.boundaries ? 'VISIBLE' : 'HIDDEN'})
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
            className="p-1.5 bg-[#ffffff] border border-[#d8d7ce] hover:bg-[#e9e7df] text-[#1b1c18] cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 tabular-nums text-[11px] text-[#757872]">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(1.8, prev + 0.2))}
            className="p-1.5 bg-[#ffffff] border border-[#d8d7ce] hover:bg-[#e9e7df] text-[#1b1c18] cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 bg-[#ffffff] border border-[#d8d7ce] hover:bg-[#e9e7df] text-[#1b1c18] cursor-pointer ml-1"
            title="Reset Viewport"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Floorplan Canvas & Telemetry Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#d8d7ce]">
        {/* SVG Silicon Floorplan Viewport */}
        <div className="lg:col-span-8 p-4 md:p-6 bg-[#fbf9f3] flex flex-col items-center justify-center overflow-hidden min-h-[440px] md:min-h-[500px]">
          <div
            className="w-full max-w-[540px] aspect-square transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              viewBox="0 0 1000 1000"
              className="w-full h-full border border-[#1b1c18] shadow-sm select-none bg-[#f7f5ef]"
            >
              <defs>
                {/* Standard Cell Area Hatch Pattern */}
                <pattern id="stdcell-pattern" width="16" height="12" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="16" y2="0" stroke="#eae8e2" strokeWidth="1" />
                  <rect x="2" y="2" width="5" height="8" fill="#f0eee8" />
                  <rect x="9" y="2" width="5" height="8" fill="#e8e6e0" />
                </pattern>
              </defs>

              {/* Die Boundary */}
              {activeLayers.boundaries && (
                <rect x="0" y="0" width="1000" height="1000" fill="#fbf9f3" stroke="#1b1c18" strokeWidth="3" />
              )}

              {/* Core Boundary Box */}
              {activeLayers.boundaries && (
                <rect x="50" y="50" width="900" height="900" fill="#f5f3ed" stroke="#757872" strokeWidth="1.5" strokeDasharray="4 4" />
              )}

              {/* Core Standard Cell Sea */}
              {activeLayers.logic && (
                <rect x="60" y="60" width="880" height="880" fill="url(#stdcell-pattern)" />
              )}

              {/* Macro & Logic Blocks */}
              {CVA6_FLOORPLAN_BLOCKS.map(block => {
                const isSelected = selectedBlock.id === block.id;
                const isMacro = block.type === 'sram_macro';

                if (isMacro && !activeLayers.macros) return null;
                if (!isMacro && !activeLayers.logic) return null;

                return (
                  <g
                    key={block.id}
                    onClick={() => setSelectedBlock(block)}
                    onMouseEnter={() => setHoveredBlock(block.name)}
                    onMouseLeave={() => setHoveredBlock(null)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={block.x}
                      y={block.y}
                      width={block.width}
                      height={block.height}
                      fill={
                        isMacro
                          ? isSelected
                            ? '#1b1c18'
                            : '#2a2e2b'
                          : isSelected
                          ? '#eae8e2'
                          : '#ffffff'
                      }
                      stroke={
                        isSelected
                          ? '#cef053'
                          : isMacro
                          ? '#1b1c18'
                          : '#757872'
                      }
                      strokeWidth={isSelected ? 2.5 : 1}
                      strokeDasharray={!isMacro && !isSelected ? '3 3' : undefined}
                    />

                    {/* Block Name */}
                    <text
                      x={block.x + 12}
                      y={block.y + 28}
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="14"
                      fontWeight="bold"
                      fill={isMacro ? (isSelected ? '#cef053' : '#fbf9f3') : '#1b1c18'}
                    >
                      {block.name}
                    </text>
                    <text
                      x={block.x + 12}
                      y={block.y + 48}
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="10"
                      fill={isMacro ? '#c5c7c1' : '#757872'}
                    >
                      {block.status}
                    </text>
                  </g>
                );
              })}

              {/* Direction Indicator */}
              <text x="15" y="25" fontFamily="JetBrains Mono" fontSize="11" fill="#757872" fontWeight="bold">
                (0,0) CORE ORIGIN
              </text>
            </svg>
          </div>
          <div className="mt-3 text-center text-xs font-technical text-[#757872]">
            [CLICK ANY BLOCK TO INSPECT CADENCE INNOVUS IMPLEMENTATION SCOPE]
          </div>
        </div>

        {/* Selected Block Inspection Ledger */}
        <div className="lg:col-span-4 p-5 bg-[#ffffff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#d8d7ce]">
              <span className="font-technical text-xs font-bold uppercase text-[#1b1c18] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#1b1c18]" />
                INNOVUS BLOCK INSPECTOR
              </span>
              <span className="font-technical text-[10px] px-2 py-0.5 bg-[#e9e7df] text-[#1b1c18]">
                {selectedBlock.type === 'sram_macro' ? 'SRAM MACRO' : 'STD-CELL AREA'}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="font-serif text-xl font-medium text-[#1b1c18] leading-tight">
                {selectedBlock.name}
              </h3>
              <p className="mt-2 text-xs text-[#454843] leading-relaxed">
                {selectedBlock.description}
              </p>
            </div>

            {/* Block Inspection Details */}
            <div className="mt-4 border border-[#d8d7ce] divide-y divide-[#d8d7ce] text-xs font-technical">
              <div className="p-2.5 flex justify-between bg-[#f5f3ed]">
                <span className="text-[#757872]">EDA TOOL:</span>
                <span className="text-[#1b1c18] font-bold">Cadence Innovus</span>
              </div>
              <div className="p-2.5 flex justify-between">
                <span className="text-[#757872]">STATUS:</span>
                <span className="text-[#536600] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#b7d83d]" />
                  {selectedBlock.status}
                </span>
              </div>
              <div className="p-2.5 flex justify-between bg-[#f5f3ed]">
                <span className="text-[#757872]">UPSTREAM FLOW:</span>
                <span className="text-[#1b1c18] font-bold">RTL Synthesis (Cadence Genus)</span>
              </div>
              <div className="p-2.5 flex justify-between">
                <span className="text-[#757872]">DOWNSTREAM STAGE:</span>
                <span className="text-[#757872] font-semibold">CTS (Not Started)</span>
              </div>
            </div>

            {/* Boundary Clarification */}
            <div className="mt-4 p-3 bg-[#f5f3ed] border border-[#d8d7ce] text-xs font-technical text-[#454843]">
              <span className="font-bold text-[#1b1c18] block mb-1">
                AUTHENTICITY NOTICE:
              </span>
              This CAD viewport represents the physical floorplan arrangement completed in Cadence Innovus. No fabricated foundry tape-out coordinates or fictitious timing slacks are claimed.
            </div>
            {/* Existing Button Reused: Toggle Collapse & Expand of Evidence Section */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={onToggleEvidence}
              aria-expanded={isEvidenceExpanded}
              aria-controls="engineering-evidence"
              className="mt-3 w-full block text-center px-3 py-2 bg-[#1b1c18] hover:bg-[#2c3029] active:bg-[#1b1c18] text-[#fbf9f3] hover:text-[#cef053] text-xs font-technical uppercase font-bold tracking-wider transition-colors border border-[#1b1c18] cursor-pointer"
            >
              {isEvidenceExpanded
                ? '[ HIDE ORIGINAL DENSITY MAP & SCREENSHOTS ↑ ]'
                : '[ VIEW ORIGINAL DENSITY MAP & SCREENSHOTS ↓ ]'}
            </motion.button>
          </div>

          <div className="mt-4 pt-3 border-t border-[#d8d7ce] flex items-center justify-between text-[11px] font-technical text-[#757872]">
            <span>DESIGN: CVA6 64-BIT RISC-V</span>
            <span className="text-[#536600] font-semibold">PLACEMENT COMPLETED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
