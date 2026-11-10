import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Activity,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FivePointRubric {
  what: string;
  tool: string;
  stage: string;
  technicalDetail: string;
  relevance: string;
}

interface EvidenceItem {
  id: string;
  category: 'ALL' | 'SYNTHESIS' | 'FLOORPLAN' | 'PLACEMENT_CONGESTION' | 'POST_CTS';
  index: string;
  tag: string;
  title: string;
  caption: string;
  description: string;
  src: string;
  alt: string;
  stageBadge: string;
  boundaryNote: string;
  rubric: FivePointRubric;
}

const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'post-cts-setup',
    category: 'POST_CTS',
    index: '01 / 08',
    tag: 'CADENCE INNOVUS CCOpt // POST-CTS',
    title: 'Post-CTS Setup Timing & Electrical DRVs',
    caption: 'CVA6 — Post-CTS Setup Mode & Design-Rule Violations Report',
    description: 'Post-CTS terminal report evaluating setup slack across path groups, along with max_tran and max_fanout design-rule checks.',
    src: '/assets/aistudio/image_3149f24a.png',
    alt: 'Cadence Innovus terminal report showing post-CTS setup WNS -0.318 ns, TNS -243.042 ns, and electrical DRVs',
    stageBadge: 'POST-CTS // TIMING & DRV REPORT',
    boundaryNote: 'Authentic Innovus post-CTS terminal capture. WNS -0.318 ns, TNS -243.042 ns, 6356 violating paths out of 53382 paths.',
    rubric: {
      what: 'Innovus terminal report displaying post-CTS setup mode timing metrics across 9 path groups and electrical DRVs.',
      tool: 'Cadence Innovus CCOpt Physical Design System.',
      stage: 'Clock Tree Synthesis & Post-CTS Timing Analysis.',
      technicalDetail: 'Setup WNS -0.318 ns, TNS -243.042 ns, 6,356 violating paths out of 53,382 total paths. DRVs: 7 max_tran nets (-0.049 ns), 902 max_fanout nets, 0 max_cap violations.',
      relevance: 'Verifies successful completion of CCOpt clock tree synthesis on the 28 nm node and establishes genuine post-CTS timing status.'
    }
  },
  {
    id: 'post-cts-hold',
    category: 'POST_CTS',
    index: '02 / 08',
    tag: 'CADENCE INNOVUS CCOpt // HOLD ANALYSIS',
    title: 'Post-CTS Multi-Corner Hold Slack Report',
    caption: 'CVA6 — Multi-Corner Hold Timing Analysis across Path Groups',
    description: 'Hold timing report evaluated under fast-fast functional corners (func_hold_ff125c_rcb, func_hold_ffm40c_cb).',
    src: '/assets/aistudio/image_4f13f294.png',
    alt: 'Cadence Innovus hold mode timing report showing hold slack across path groups',
    stageBadge: 'POST-CTS // MULTI-CORNER HOLD',
    boundaryNote: 'Hold views: func_hold_ff125c_rcb and func_hold_ffm40c_cb. All WNS -0.224 ns, TNS -72.328 ns.',
    rubric: {
      what: 'Cadence Innovus hold timing slack report across all path groups evaluated under two fast functional hold corners.',
      tool: 'Cadence Innovus CCOpt Physical Design System.',
      stage: 'Post-CTS Timing & Signal Integrity Analysis.',
      technicalDetail: 'All hold WNS -0.224 ns, TNS -72.328 ns across 1,249 violating paths. 6 of 8 path groups (default, i2o, i2r, m2r, r2cgate, r2o) met positive slack.',
      relevance: 'Proves thorough multi-corner timing evaluation following clock tree synthesis, identifying hold buffers required in reg-to-macro paths.'
    }
  },
  {
    id: 'congestion-distribution',
    category: 'PLACEMENT_CONGESTION',
    index: '03 / 08',
    tag: 'CADENCE INNOVUS CONGESTION ANALYSIS',
    title: 'Congestion Distribution & Hotspot Report',
    caption: 'CVA6 — Routing Track Overflow & Hotspot Distribution',
    description: 'Global routing overflow report capturing horizontal vs. vertical track demand and normalized hotspot calculations.',
    src: '/assets/aistudio/image_9b544273.png',
    alt: 'Cadence Innovus congestion distribution report showing horizontal and vertical overflow and hotspot scores',
    stageBadge: 'PLACEMENT // CONGESTION ANALYSIS',
    boundaryNote: 'Measured report numbers: Total Overflow 5452 = 516 (0.19% H) + 4936 (1.83% V). Max hotspot normalized: 34.08, total: 170.58.',
    rubric: {
      what: 'Cadence Innovus terminal table recording congestion overflow edges and GCell capacity distribution.',
      tool: 'Cadence Innovus Global Router.',
      stage: 'Standard-Cell Placement & Congestion Analysis.',
      technicalDetail: '516 horizontal overflow edges (0.19% H) versus 4,936 vertical overflow edges (1.83% V). Highest hotspot normalized score of 34.08.',
      relevance: 'Demonstrates deep understanding of directional routing track saturation and physical channel constraints.'
    }
  },
  {
    id: 'congestion-map',
    category: 'PLACEMENT_CONGESTION',
    index: '04 / 08',
    tag: 'CADENCE INNOVUS VISUALIZATION',
    title: 'Placement Congestion Map & Macro Topography',
    caption: 'CVA6 — Standard-Cell Placement Congestion Map with Macro Overlay',
    description: 'Spatial heat-map overlay showing localized routing channel congestion between SRAM macros and the central datapath.',
    src: '/assets/aistudio/image_1fd9e88f.png',
    alt: 'Cadence Innovus GUI screenshot showing macro floorplan and cyan/orange congestion markers',
    stageBadge: 'PLACEMENT // ROUTING TOPOGRAPHY',
    boundaryNote: 'Authentic Innovus GUI capture showing macro arrangements on left/bottom and central datapath routing density.',
    rubric: {
      what: 'Cadence Innovus placement canvas with congestion overlay displaying GCell congestion markers over macro channels.',
      tool: 'Cadence Innovus Physical Design System.',
      stage: 'Standard-Cell Placement & Macro Channel Optimization.',
      technicalDetail: 'Visible concentration of cyan/yellow/orange congestion markers concentrated above lower macro corridor where datapath logic interfaces with SRAM.',
      relevance: 'Provides spatial evidence of physical routing track demand, justifying macro channel spacing decisions.'
    }
  },
  {
    id: 'placement-density',
    category: 'PLACEMENT_CONGESTION',
    index: '05 / 08',
    tag: 'CADENCE INNOVUS DENSITY MAP',
    title: 'Standard-Cell Placement Density Map',
    caption: 'CVA6 — Placement Density Distribution Across Core Logic',
    description: 'Density topography map highlighting standard-cell clustering between macro arrays and the execution core.',
    src: '/assets/aistudio/image_0120688a.png',
    alt: 'Cadence Innovus standard-cell placement density map showing cell density gradient',
    stageBadge: 'PLACEMENT // CELL DENSITY GRADIENT',
    boundaryNote: 'Authentic Innovus placement density heatmap. Illustrates cell clustering in the execution stage.',
    rubric: {
      what: 'Innovus placement density heatmap displaying cell concentration gradient across core rows.',
      tool: 'Cadence Innovus Physical Design System.',
      stage: 'Standard-Cell Placement Stage.',
      technicalDetail: 'High density clustering in central execution datapath (ex_stage_i) surrounded by lower-density peripheral macro channels.',
      relevance: 'Connects timing-driven placement optimization directly to local cell density trade-offs.'
    }
  },
  {
    id: 'floorplan-geometry',
    category: 'FLOORPLAN',
    index: '06 / 08',
    tag: 'CADENCE INNOVUS FLOORPLAN',
    title: '28 nm Floorplan Geometry & Macro Channels',
    caption: 'CVA6 — Core & Die Boundary with 15 µm Macro Channels',
    description: 'Floorplan view establishing core aspect ratio (950 × 916 µm), peripheral SRAM macro placement, and 15 µm halo channels.',
    src: '/assets/aistudio/image_405b6f5e.png',
    alt: 'Cadence Innovus floorplan layout showing SRAM macros along periphery and central core boundary',
    stageBadge: 'FLOORPLAN // 28 nm GEOMETRY',
    boundaryNote: 'Core dimensions: 950 × 916 µm. Target core utilization: 70%. Macro channels: 15 µm.',
    rubric: {
      what: 'Cadence Innovus floorplan database visualization showing 16 SRAM macros placed along the core periphery.',
      tool: 'Cadence Innovus Physical Design System.',
      stage: 'Floorplanning & Macro Placement Stage.',
      technicalDetail: '15 µm halo channels between adjacent macros ensuring routing track availability; core boundary established at 950 × 916 µm.',
      relevance: 'Authenticates genuine physical design floorplan setup for the 64-bit CVA6 processor on the 28 nm process node.'
    }
  },
  {
    id: 'synthesis-qor',
    category: 'SYNTHESIS',
    index: '07 / 08',
    tag: 'CADENCE GENUS QoR',
    title: 'CVA6 RTL Logic Synthesis QoR Report',
    caption: 'CVA6 — Cadence Genus Gate-Level Synthesis QoR',
    description: 'Gate-level netlist QoR report confirming 178,799 leaf cells (23,675 sequential, 155,124 combinational) and cell area of 592,578.',
    src: '/assets/aistudio/image_497ae020.png',
    alt: 'Cadence Genus Synthesis QoR terminal report showing instance counts, cell area, and baseline timing',
    stageBadge: 'SYNTHESIS // GATE-LEVEL QoR',
    boundaryNote: 'Gate-level netlist statistics: 178,799 leaf cells (23,675 sequential, 155,124 combinational). Cell area: 592,578.141.',
    rubric: {
      what: 'Cadence Genus synthesis QoR terminal report displaying instance counts, cell area, and baseline timing slack.',
      tool: 'Cadence Genus Synthesis Solution.',
      stage: 'RTL Logic Synthesis & SDC Timing Optimization.',
      technicalDetail: 'Total Leaf Cells: 178,799; Sequential Cells: 23,675; Combinational Cells: 155,124; Cell Area: 592,578.141; Target Clock: 1.5 ns.',
      relevance: 'Documents upstream synthesis gate count baseline providing the physical netlist for downstream placement and CTS.'
    }
  },
  {
    id: 'halfcycle-design-browser',
    category: 'SYNTHESIS',
    index: '08 / 08',
    tag: 'CADENCE GENUS GUI',
    title: 'Half-Cycle Timing Structure & Design Browser',
    caption: 'Cadence Genus Design Browser — rtl_halfcycle_crosspaths',
    description: 'Cadence Genus hierarchical design browser displaying netlist module hierarchy and cross-clock timing path structures.',
    src: '/assets/aistudio/image_3d42a868.png',
    alt: 'Cadence Genus GUI displaying design browser hierarchy and module rtl_halfcycle_crosspaths',
    stageBadge: 'SYNTHESIS & STA // DESIGN BROWSER',
    boundaryNote: 'Hierarchy browser confirming module compilation and half-cycle STA cross-clock domain structures.',
    rubric: {
      what: 'Cadence Genus Synthesis Solution interactive Design Browser displaying hierarchical modules including rtl_halfcycle_crosspaths.',
      tool: 'Cadence Genus Synthesis Solution.',
      stage: 'RTL Synthesis & Static Timing Analysis.',
      technicalDetail: 'Design hierarchy confirming gate compilation, module leaf cell counts, and half-cycle cross-domain timing structures.',
      relevance: 'Demonstrates hands-on mastery of Cadence Genus GUI navigation, hierarchy inspection, and multi-clock timing analysis.'
    }
  }
];

interface Cva6EngineeringEvidenceGalleryProps {
  isExpanded?: boolean;
}

export const Cva6EngineeringEvidenceGallery: React.FC<Cva6EngineeringEvidenceGalleryProps> = ({
  isExpanded = true
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'SYNTHESIS' | 'FLOORPLAN' | 'PLACEMENT_CONGESTION' | 'POST_CTS'>('ALL');
  const [activeModalItem, setActiveModalItem] = useState<EvidenceItem | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  if (!isExpanded) return null;

  const filteredItems = activeCategory === 'ALL'
    ? EVIDENCE_ITEMS
    : EVIDENCE_ITEMS.filter(item => item.category === activeCategory);

  const openLightbox = (item: EvidenceItem) => {
    setActiveModalItem(item);
    setZoomScale(1);
  };

  const closeLightbox = () => {
    setActiveModalItem(null);
    setZoomScale(1);
  };

  return (
    <div id="engineering-evidence" className="border border-[#d8d7ce] bg-[#ffffff] p-6 md:p-8 space-y-6">
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#d8d7ce]">
        <div>
          <div className="flex items-center gap-2 font-technical text-xs text-[#757872] uppercase">
            <span className="font-bold text-[#1b1c18]">PROJECT EVIDENCE</span>
            <span className="text-[#c5c7c1]">·</span>
            <span className="text-[#536600] font-bold">CADENCE GENUS & INNOVUS ARTIFACTS</span>
            <span className="text-[#c5c7c1]">·</span>
            <span>28 nm PROCESS NODE</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
            Verified Engineering Evidence Gallery
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#454843] mt-1 max-w-3xl leading-relaxed">
            Original EDA tool captures from Cadence Genus synthesis, Innovus floorplanning, standard-cell placement, and post-CTS timing/DRV analysis. Every screenshot is supported by an objective 5-point recruiter technical rubric.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f5f3ed] border border-[#d8d7ce] text-xs font-technical">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'ALL'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            ALL ({EVIDENCE_ITEMS.length})
          </button>
          <button
            onClick={() => setActiveCategory('POST_CTS')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'POST_CTS'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            POST-CTS (2)
          </button>
          <button
            onClick={() => setActiveCategory('PLACEMENT_CONGESTION')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'PLACEMENT_CONGESTION'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            PLACEMENT & CONGESTION (3)
          </button>
          <button
            onClick={() => setActiveCategory('FLOORPLAN')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'FLOORPLAN'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            FLOORPLAN (1)
          </button>
          <button
            onClick={() => setActiveCategory('SYNTHESIS')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'SYNTHESIS'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            SYNTHESIS (2)
          </button>
        </div>
      </div>

      {/* Grid of Evidence Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border border-[#d8d7ce] bg-[#ffffff] flex flex-col justify-between transition-all hover:border-[#1b1c18]"
          >
            {/* Top Ledger Strip */}
            <div>
              <div className="p-3 bg-[#f5f3ed] border-b border-[#d8d7ce] flex items-center justify-between text-xs font-technical">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1b1c18]">{item.index}</span>
                  <span className="text-[#c5c7c1]">·</span>
                  <span className="text-[#757872]">{item.tag}</span>
                </div>
                <span className="px-1.5 py-0.2 bg-[#e9e7df] text-[#536600] font-bold border border-[#d8d7ce] text-[10px]">
                  {item.stageBadge}
                </span>
              </div>

              {/* Image Preview Box with Zoom Trigger */}
              <div
                onClick={() => openLightbox(item)}
                className="relative bg-[#171a18] p-3 border-b border-[#d8d7ce] group cursor-pointer overflow-hidden min-h-[220px] max-h-[260px] flex items-center justify-center"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="max-h-[240px] max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[#000000]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-[#fbf9f3] font-technical text-xs uppercase font-bold">
                  <Maximize2 className="w-4 h-4 text-[#cef053]" />
                  <span>[ CLICK TO INSPECT FULL RESOLUTION ]</span>
                </div>
              </div>

              {/* Title & Short Description */}
              <div className="p-4 border-b border-[#d8d7ce] bg-[#ffffff]">
                <h3 className="font-serif text-lg font-medium text-[#1b1c18]">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#454843] mt-1 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-2 text-[11px] font-technical text-[#757872]">
                  {item.boundaryNote}
                </div>
              </div>
            </div>

            {/* Recruiter 5-Point Inspection Rubric */}
            <div className="p-4 bg-[#fbf9f3] text-xs font-sans space-y-2">
              <div className="font-technical text-[11px] font-bold text-[#1b1c18] uppercase pb-1 border-b border-[#d8d7ce] flex items-center justify-between">
                <span>RECRUITER 5-POINT TECHNICAL RUBRIC</span>
                <span className="text-[#536600]">VERIFIED</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-[#454843]">
                <div>
                  <strong className="text-[#1b1c18]">What: </strong>
                  <span>{item.rubric.what}</span>
                </div>
                <div>
                  <strong className="text-[#1b1c18]">Tool & Stage: </strong>
                  <span className="font-technical text-[#536600] font-semibold">{item.rubric.tool} — {item.rubric.stage}</span>
                </div>
                <div>
                  <strong className="text-[#1b1c18]">Technical Detail: </strong>
                  <span className="font-technical text-[#1b1c18]">{item.rubric.technicalDetail}</span>
                </div>
                <div>
                  <strong className="text-[#1b1c18]">Engineering Relevance: </strong>
                  <span>{item.rubric.relevance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Zoom Controls */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#171a18]/95 flex flex-col p-4 md:p-8"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#333833] text-xs font-technical text-[#fbf9f3]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#cef053]">{activeModalItem.title}</span>
                <span className="text-[#82857d]">·</span>
                <span className="text-[#82857d]">{activeModalItem.stageBadge}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 2.5))}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.75))}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] border border-[#454843] cursor-pointer mr-2"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={closeLightbox}
                  className="px-3 py-1.5 bg-[#1b1c18] hover:bg-[#252a26] text-[#cef053] border border-[#cef053] font-bold uppercase cursor-pointer"
                >
                  [ CLOSE ]
                </button>
              </div>
            </div>

            {/* Modal Image Pan / Zoom Stage */}
            <div
              className="flex-1 overflow-auto flex items-center justify-center p-2 md:p-6 cursor-grab active:cursor-grabbing"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              <img
                src={activeModalItem.src}
                alt={activeModalItem.alt}
                style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
                className="max-h-[82vh] max-w-full object-contain transition-transform duration-150 select-none shadow-2xl"
              />
            </div>

            {/* Modal Bottom Metadata Bar */}
            <div className="pt-3 border-t border-[#333833] flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs font-technical text-[#82857d]">
              <div>
                <span className="text-[#fbf9f3] font-bold">{activeModalItem.caption}</span>
                <span className="text-[#82857d] ml-2">({activeModalItem.rubric.tool})</span>
              </div>
              <div className="text-[11px] text-[#cef053]">
                {activeModalItem.boundaryNote}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
