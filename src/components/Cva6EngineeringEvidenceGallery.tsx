import React, { useState } from 'react';
import { 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FivePointRubric {
  what: string;
  tool: string;
  stage: string;
  technicalDetail: string;
  relevance: string;
}

type EvidenceCategory = 'ALL' | 'POST_ROUTE' | 'POST_CTS' | 'PLACEMENT_CONGESTION' | 'FLOORPLAN' | 'SYNTHESIS';

interface EvidenceItem {
  id: string;
  category: Exclude<EvidenceCategory, 'ALL'>;
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
    id: 'postroute-drc-10',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // POST-ROUTE DRC',
    title: 'Post-Route DRC Summary Report (40 → 10 Reduction)',
    caption: 'CVA6 (Post-Route Stage) — Violation Summary By Layer and Type',
    description: 'Post-route DRC summary showing a 75% reduction in violations from 40 down to 10 (WMJ: 7 on M4, Short: 2 [M4/M5], EncEdg: 1 on VIA3).',
    src: '/assets/aistudio/cva6_postroute_drc_10.png',
    alt: 'Cadence Innovus post-route DRC summary totaling 10 violations across VIA3, M4, and M5',
    stageBadge: 'POST-ROUTE // 10 DRCs (-75%)',
    boundaryNote: 'Authentic Post-Route Stage capture. 10 DRCs remain pending final signoff resolution.',
    rubric: {
      what: 'Post-route DRC violation breakdown by metal/via layer and rule type.',
      tool: 'Cadence Innovus (Post-Route Stage).',
      stage: 'Post-Route Physical Optimization.',
      technicalDetail: 'Resolved all 29 M2 EOLSpc and VIA1 EncEdg errors; remaining: 7 WMJ (M4), 2 Short (M4/M5), 1 EncEdg (VIA3).',
      relevance: 'Demonstrates 75% DRC cleanup while transparently tracking remaining violations before GDSII stream-out.'
    }
  },
  {
    id: 'postroute-useful-skew-setup',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // USEFUL SKEW',
    title: 'Post-Route Setup Timing After Useful Skew Analysis',
    caption: 'CVA6 — Post-Route Setup Mode & DRVs After Useful Skew Optimization',
    description: 'Latest Post-Route Stage setup report showing WNS improved to -0.114 ns, TNS -28.249 ns (934 violating paths), and max_tran reduced to 1 net (-0.002 ns).',
    src: '/assets/aistudio/cva6_postroute_setup_useful_skew.png',
    alt: 'Cadence Innovus post-route setup timing report after useful skew analysis showing WNS -0.114 ns',
    stageBadge: 'POST-ROUTE // USEFUL SKEW',
    boundaryNote: 'Setup views: func_setup_ss125c_rcw & func_setup_ssm40c_cw. m2r cleared (+0.007 ns); 934 paths remain.',
    rubric: {
      what: 'Final post-route setup timing table and DRV check following LVT enabling and useful skew optimization.',
      tool: 'Cadence Innovus (Post-Route Stage).',
      stage: 'Post-Route Timing Optimization.',
      technicalDetail: 'All setup WNS: -0.114 ns, TNS: -28.249 ns, 934 / 53,382 violating paths; max_cap 0, max_tran 1 (-0.002 ns), max_length 0.',
      relevance: 'Proves methodical setup closure progression (-0.201 → -0.122 → -0.114 ns) without misrepresenting closure.'
    }
  },
  {
    id: 'postroute-useful-skew-hold',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // HOLD OPTIMIZATION',
    title: 'Post-Route Hold Timing After Useful Skew Analysis',
    caption: 'CVA6 — Post-Route Multi-Corner Hold Timing Report (-0.001 ns WNS)',
    description: 'Post-route multi-corner hold analysis after useful skew reducing hold violations from 823 paths at route down to 7 paths (WNS -0.001 ns).',
    src: '/assets/aistudio/cva6_postroute_hold_useful_skew.png',
    alt: 'Cadence Innovus post-route hold timing report showing WNS -0.001 ns and 7 violating paths',
    stageBadge: 'POST-ROUTE // HOLD -0.001 ns',
    boundaryNote: 'Hold views: func_hold_ff125c_rcb & func_hold_ffm40c_cb. Density: 64.049% (100.000% with Fillers).',
    rubric: {
      what: 'Multi-corner post-route hold slack report across all path groups after useful skew.',
      tool: 'Cadence Innovus (Post-Route Stage).',
      stage: 'Post-Route Hold Closure.',
      technicalDetail: 'Hold WNS: -0.001 ns, TNS: -0.002 ns across 7 violating paths (3 r2m, 4 r2r out of 53,382 total paths).',
      relevance: 'Shows hold violations effectively controlled down to 1 ps worst slack with 99.98% paths clean.'
    }
  },
  {
    id: 'postroute-before-lvt-setup',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // LVT BASELINE',
    title: 'Post-Route Setup Timing Before Enabling LVT',
    caption: 'CVA6 — Pre-LVT Post-Route Setup Timing & Glitch Check (0 Glitches)',
    description: 'Post-route timing baseline prior to enabling LVT standard cells: Setup WNS -0.201 ns, TNS -161.833 ns, 3,079 violating paths, 0 glitch violations.',
    src: '/assets/aistudio/cva6_postroute_setup_before_lvt.png',
    alt: 'Cadence Innovus post-route setup timing report before enabling LVT showing WNS -0.201 ns',
    stageBadge: 'POST-ROUTE // BEFORE LVT',
    boundaryNote: 'Density: 64.849% (100.000% with Fillers). Total number of glitch violations: 0.',
    rubric: {
      what: 'Baseline post-route setup report recorded immediately prior to allowing LVT cells in optimization.',
      tool: 'Cadence Innovus (Post-Route Stage).',
      stage: 'Post-Route Timing Optimization (Baseline).',
      technicalDetail: 'Setup WNS -0.201 ns, TNS -161.833 ns, 3,079 violating paths, 6 max_tran nets (-0.067 ns), 0 glitch violations.',
      relevance: 'Provides the controlled before-state needed to quantify LVT optimization gains objectively.'
    }
  },
  {
    id: 'postroute-after-lvt-setup',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // LVT ENABLED',
    title: 'Post-Route Setup Timing After Enabling LVT',
    caption: 'CVA6 — Post-LVT Setup Mode & DRV Improvement (-0.122 ns WNS)',
    description: 'Enabling LVT cells cut Setup WNS from -0.201 ns to -0.122 ns, TNS from -161.833 ns to -29.582 ns (-81.7%), and cleared m2r violations (+0.006 ns).',
    src: '/assets/aistudio/cva6_postroute_setup_after_lvt.png',
    alt: 'Cadence Innovus post-route setup timing report after enabling LVT showing WNS -0.122 ns',
    stageBadge: 'POST-ROUTE // AFTER LVT',
    boundaryNote: 'Violating setup paths dropped from 3,079 to 1,001; max_tran improved from 6 nets to 3 nets (-0.005 ns).',
    rubric: {
      what: 'Post-route setup and DRV table after selectively swapping critical-path cells to Low-Vt (LVT).',
      tool: 'Cadence Innovus (Post-Route Stage).',
      stage: 'Post-Route Timing Optimization (LVT Experiment).',
      technicalDetail: 'Setup WNS -0.122 ns, TNS -29.582 ns, 1,001 violating paths; max_tran halved to 3 nets; m2r slack positive (+0.006 ns).',
      relevance: 'Demonstrates targeted Vt-swapping trade-offs to recover datapath speed without hurting hold margins.'
    }
  },
  {
    id: 'postroute-congestion-map',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // DIE MAP',
    title: 'Post-Route Die Map & Remaining DRC Marker Distribution',
    caption: 'CVA6 (Post-Route Stage) — Spatial Map After DRC Cleanup (10 DRCs)',
    description: 'Physical die view after post-route cleanup showing sparse remaining DRC X-markers compared to the 40-DRC initial route snapshot.',
    src: '/assets/aistudio/cva6_postroute_congestion_map.png',
    alt: 'Cadence Innovus post-route physical layout view showing sparse remaining DRC X markers',
    stageBadge: 'POST-ROUTE // SPATIAL VIEW',
    boundaryNote: 'Overflow held at 0.51% and hotspot at 18.12; visible X-markers correspond to the 10 remaining DRCs.',
    rubric: {
      what: 'Cadence Innovus die canvas after post-route optimization and DRC cleanup.',
      tool: 'Cadence Innovus Physical Design System.',
      stage: 'Post-Route Physical Verification Preparation.',
      technicalDetail: 'Significantly fewer DRC violation markers over SRAM periphery and standard-cell rows (10 remaining vs. 40 at route).',
      relevance: 'Visually confirms localized concentration of the remaining 10 geometry violations.'
    }
  },
  {
    id: 'route-drc-40',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // ROUTE DRC',
    title: 'Initial Route Stage DRC Violation Summary (40 DRCs)',
    caption: 'CVA6 (Post-CTS Stage) — Initial Signal Routing DRC Baseline (40 Violations)',
    description: 'Initial routing DRC report capturing 40 geometry violations dominated by 29 M2 end-of-line spacing (EOLSpc) errors prior to post-route cleanup.',
    src: '/assets/aistudio/cva6_route_drc_40.png',
    alt: 'Cadence Innovus route stage DRC summary showing 40 violations',
    stageBadge: 'ROUTE // 40 DRCs BASELINE',
    boundaryNote: 'Post-CTS Stage routing: EOLSpc (29 M2), WMJ (7 M4), EncEdg (2 VIA1), Short (1 M5), CutEol (1 VIA3).',
    rubric: {
      what: 'Initial post-routing DRC summary table prior to ECO/post-route DRC repair.',
      tool: 'Cadence Innovus NanoRoute.',
      stage: 'Detailed Signal Routing (Implementation Analysis).',
      technicalDetail: '40 total violations across VIA1, M2, VIA3, M4, and M5; subsequently reduced by 75% to 10.',
      relevance: 'Establishes the verified baseline for post-route DRC reduction tracking.'
    }
  },
  {
    id: 'route-hold-antenna',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // ROUTE HOLD & ANTENNA',
    title: 'Route Stage Hold Timing & Antenna Verification (0 Violations)',
    caption: 'CVA6 — Route Hold Mode (-0.143 ns WNS) & Antenna Check (0 Violations)',
    description: 'Route-stage functional hold report alongside verified process antenna check confirming 0 Antenna Violations across the routed CVA6 netlist.',
    src: '/assets/aistudio/cva6_route_hold_antenna.png',
    alt: 'Cadence Innovus route stage hold timing and 0 antenna violations report',
    stageBadge: 'ROUTE // 0 ANTENNA',
    boundaryNote: 'Routing overflow 0.20% H and 0.31% V (Density 64.017%); No of Antenna Violations: 0 Violations.',
    rubric: {
      what: 'Route-stage hold report and process antenna rule check output.',
      tool: 'Cadence Innovus.',
      stage: 'Detailed Signal Routing.',
      technicalDetail: 'Hold WNS -0.143 ns (823 paths before post-route hold fixing), 0.20% H / 0.31% V overflow, and 0 Antenna Violations.',
      relevance: 'Confirms metal routing satisfies foundry process antenna rules with zero antenna breaches.'
    }
  },
  {
    id: 'route-congestion-rpt',
    category: 'POST_ROUTE',
    tag: 'CADENCE INNOVUS // ROUTE CONGESTION',
    title: 'Route Congestion Overflow (0.51%) & Hotspot (18.12)',
    caption: 'CVA6 — Route Overflow Distribution (1,357 Edges: 531 H + 827 V)',
    description: 'Routing congestion breakdown documenting 0.20% horizontal and 0.31% vertical overflow with max normalized hotspot 2.43 and total hotspot 18.12.',
    src: '/assets/aistudio/cva6_route_congestion_rpt.png',
    alt: 'Cadence Innovus route congestion distribution report showing 1357 overflow edges and 18.12 hotspot',
    stageBadge: 'ROUTE // 0.51% OVERFLOW',
    boundaryNote: 'Overflow: 1,357 = 531 (0.20% H) + 827 (0.31% V). Hotspot: 18.12 (max 2.43).',
    rubric: {
      what: 'Route-stage GCell congestion distribution and normalized hotspot summary table.',
      tool: 'Cadence Innovus.',
      stage: 'Signal Routing.',
      technicalDetail: '98.70% horizontal and 78.15% vertical GCells maintain >=5 tracks remaining after detailed routing.',
      relevance: 'Quantifies healthy track availability across both M-layers after CTS buffer insertion and signal routing.'
    }
  },
  {
    id: 'post-cts-setup',
    category: 'POST_CTS',
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
      relevance: 'Documents post-CTS baseline before signal routing and post-route optimization.'
    }
  },
  {
    id: 'post-cts-hold',
    category: 'POST_CTS',
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
      technicalDetail: 'All hold WNS -0.224 ns, TNS -72.328 ns across 1,249 violating paths. 6 of 8 path groups met positive slack.',
      relevance: 'Shows early post-CTS hold identification later reduced down to -0.001 ns post-route.'
    }
  },
  {
    id: 'congestion-distribution',
    category: 'PLACEMENT_CONGESTION',
    tag: 'CADENCE INNOVUS CONGESTION ANALYSIS',
    title: 'Placement Congestion Distribution & Hotspot Report',
    caption: 'CVA6 — Routing Track Overflow & Hotspot Distribution',
    description: 'Global routing overflow report capturing horizontal vs. vertical track demand and normalized hotspot calculations.',
    src: '/assets/aistudio/image_9b544273.png',
    alt: 'Cadence Innovus congestion distribution report showing horizontal and vertical overflow and hotspot scores',
    stageBadge: 'PLACEMENT // CONGESTION ANALYSIS',
    boundaryNote: 'Baseline placement overflow 5452 = 516 (0.19% H) + 4936 (1.83% V), later optimized via 30% macro partial blockage.',
    rubric: {
      what: 'Cadence Innovus terminal table recording congestion overflow edges and GCell capacity distribution.',
      tool: 'Cadence Innovus Global Router.',
      stage: 'Standard-Cell Placement & Congestion Analysis.',
      technicalDetail: '516 horizontal overflow edges (0.19% H) versus 4,936 vertical overflow edges (1.83% V). Highest hotspot normalized score of 34.08.',
      relevance: 'Demonstrates diagnostic root-cause analysis leading to 30% macro partial blockage mitigation.'
    }
  },
  {
    id: 'congestion-map',
    category: 'PLACEMENT_CONGESTION',
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
      technicalDetail: 'Visible concentration of cyan/yellow/orange congestion markers concentrated above lower macro corridor.',
      relevance: 'Provides spatial evidence of physical routing track demand, justifying macro channel spacing decisions.'
    }
  },
  {
    id: 'placement-density',
    category: 'PLACEMENT_CONGESTION',
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
      technicalDetail: 'High density clustering in central execution datapath (ex_stage_i) surrounded by peripheral macro channels.',
      relevance: 'Connects timing-driven placement optimization directly to local cell density trade-offs.'
    }
  },
  {
    id: 'floorplan-geometry',
    category: 'FLOORPLAN',
    tag: 'CADENCE INNOVUS FLOORPLAN',
    title: '28 nm Floorplan Geometry & Macro Channels',
    caption: 'CVA6 — Core & Die Boundary with 15 µm Macro Channels',
    description: 'Floorplan view establishing core aspect ratio (950 × 916 µm, 850,552 µm²), peripheral SRAM macros, and 15 µm halo channels.',
    src: '/assets/aistudio/image_405b6f5e.png',
    alt: 'Cadence Innovus floorplan layout showing SRAM macros along periphery and central core boundary',
    stageBadge: 'FLOORPLAN // 28 nm GEOMETRY',
    boundaryNote: 'Dimensions: 950 × 916 µm (850,552 µm²). Macro channels: 15 µm. 30% partial blockage between macros.',
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
      relevance: 'Documents upstream synthesis gate count baseline providing the physical netlist for physical implementation.'
    }
  }
];

interface Cva6EngineeringEvidenceGalleryProps {
  isExpanded?: boolean;
}

export const Cva6EngineeringEvidenceGallery: React.FC<Cva6EngineeringEvidenceGalleryProps> = ({
  isExpanded = true
}) => {
  const [activeCategory, setActiveCategory] = useState<EvidenceCategory>('POST_ROUTE');
  const [activeModalItem, setActiveModalItem] = useState<EvidenceItem | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  if (!isExpanded) return null;

  const filteredItems = activeCategory === 'ALL'
    ? EVIDENCE_ITEMS
    : EVIDENCE_ITEMS.filter(item => item.category === activeCategory);

  const countByCat = (cat: Exclude<EvidenceCategory, 'ALL'>) =>
    EVIDENCE_ITEMS.filter(i => i.category === cat).length;

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
            <span className="text-[#536600] font-bold">CADENCE GENUS &amp; INNOVUS ARTIFACTS</span>
            <span className="text-[#c5c7c1]">·</span>
            <span>28 nm PROCESS NODE</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
            Verified Engineering Evidence Gallery
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#454843] mt-1 max-w-3xl leading-relaxed">
            Original EDA tool captures from Cadence Genus synthesis through Innovus floorplanning, placement, post-CTS, routing, and Post-Route Stage optimization (DRC 40 &rarr; 10, Antenna 0, LVT &amp; Useful Skew). Every capture includes a 5-point recruiter technical rubric.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f5f3ed] border border-[#d8d7ce] text-xs font-technical">
          <button
            onClick={() => setActiveCategory('POST_ROUTE')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'POST_ROUTE'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            ROUTE &amp; POST-ROUTE ({countByCat('POST_ROUTE')})
          </button>
          <button
            onClick={() => setActiveCategory('POST_CTS')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'POST_CTS'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            POST-CTS ({countByCat('POST_CTS')})
          </button>
          <button
            onClick={() => setActiveCategory('PLACEMENT_CONGESTION')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'PLACEMENT_CONGESTION'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            PLACEMENT ({countByCat('PLACEMENT_CONGESTION')})
          </button>
          <button
            onClick={() => setActiveCategory('FLOORPLAN')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'FLOORPLAN'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            FLOORPLAN ({countByCat('FLOORPLAN')})
          </button>
          <button
            onClick={() => setActiveCategory('SYNTHESIS')}
            className={`px-2.5 py-1 font-bold cursor-pointer transition-colors ${
              activeCategory === 'SYNTHESIS'
                ? 'bg-[#1b1c18] text-[#cef053]'
                : 'text-[#757872] hover:text-[#1b1c18]'
            }`}
          >
            SYNTHESIS ({countByCat('SYNTHESIS')})
          </button>
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
        </div>
      </div>

      {/* Grid of Evidence Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="border border-[#d8d7ce] bg-[#ffffff] flex flex-col justify-between transition-all hover:border-[#1b1c18]"
          >
            {/* Top Ledger Strip */}
            <div>
              <div className="p-3 bg-[#f5f3ed] border-b border-[#d8d7ce] flex items-center justify-between text-xs font-technical">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1b1c18]">
                    {String(idx + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
                  </span>
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
                  <strong className="text-[#1b1c18]">Tool &amp; Stage: </strong>
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
            <div className="flex items-center justify-between pb-3 border-b border-[#333833] text-xs font-technical text-[#fbf9f3]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#cef053]">{activeModalItem.title}</span>
                <span className="text-[#82857d]">·</span>
                <span className="text-[#82857d]">{activeModalItem.stageBadge}</span>
              </div>

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
