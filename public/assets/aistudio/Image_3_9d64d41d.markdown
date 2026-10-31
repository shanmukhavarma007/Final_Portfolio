---
name: Silicon Observatory
colors:
  surface: '#fbf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fbf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#eae8e2'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c18'
  on-surface-variant: '#454843'
  inverse-surface: '#30312d'
  inverse-on-surface: '#f3f1eb'
  outline: '#757872'
  outline-variant: '#c5c7c1'
  surface-tint: '#5d5f5b'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1a1c19'
  on-primary-container: '#838480'
  inverse-primary: '#c6c7c2'
  secondary: '#536600'
  on-secondary: '#ffffff'
  secondary-container: '#cef053'
  on-secondary-container: '#586c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191d17'
  on-tertiary-container: '#82857d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3e3dd'
  primary-fixed-dim: '#c6c7c2'
  on-primary-fixed: '#1a1c19'
  on-primary-fixed-variant: '#464744'
  secondary-fixed: '#cef053'
  secondary-fixed-dim: '#b3d439'
  on-secondary-fixed: '#171e00'
  on-secondary-fixed-variant: '#3e4c00'
  tertiary-fixed: '#e1e3da'
  tertiary-fixed-dim: '#c5c7be'
  on-tertiary-fixed: '#191d17'
  on-tertiary-fixed-variant: '#454841'
  background: '#fbf9f3'
  on-background: '#1b1c18'
  surface-variant: '#e4e2dd'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 3.5rem
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: '1.15'
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 2.5rem
    fontWeight: '400'
    lineHeight: '1.15'
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 1.75rem
    fontWeight: '400'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.005em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.35'
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.06em
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an editorial engineering ledger and semiconductor laboratory journal. Tailored for specialized ASIC physical design literature, tape-out retrospectives, and EDA synthesis logs, the aesthetic merges the tactile pedigree of archival academic publishing with the microscopic precision of lithography masks.

### Core Philosophy
- **Micro-Architectural Rigor:** Form follows the floorplan. Layouts privilege deliberate rectangular planar units, strict orthogonal routing lines, and hairline demarcations that echo photolithography reticles and VLSI layout boundaries.
- **Academic Restraint:** Eschew generic cyberpunk tropes, faux-holographic glass, rounded consumer paradigms, and decorative novelty. Visual weight stems from typography, precise micro-typographic coordinates, structured metadata registers, and intentional white space.
- **Artifacts of Record:** The UI behaves like an archival paper-and-silicon compendium—surfaces evoke heavyweight uncoated stock, deep carbon inks, and clinical phosphor or test-bench trace accents.

## Colors

The palette is rooted in archival drafting stock and deep lithographic graphite, punctuated by a restrained signal marker.

### Palette Architecture
- **Canvas Base (`#F4F2EC`):** Warm unbleached ivory. Serves as the primary viewport surface, avoiding the synthetic clinical glare of pure `#FFFFFF` while retaining high legibility.
- **Primary Ink (`#171916`):** Deep carbon ink for headline displays, body composition, structural axes, and high-priority reads.
- **Technical Slate (`#777A72`):** Muted olive-gray for secondary telemetry, timing closure metrics, structural axis legends, and inactive status indicators.
- **Signal Lime (`#B7D83D`):** A high-visibility, technical phosphor accent. Used strictly for singular execution points, active nets, passing timing criteria, and cursor highlights. It must never coat expansive surfaces.
- **Dark Ground & Terminal Floor (`#171A18`):** Deep graphite utilized for inverted technical appendices, code execution segments, floorplan previews, and the persistent footer substrate.
- **Structural Dividing Hairline (`#D8D7CE`):** Architectural boundary line ensuring razor-sharp division across modules without high-contrast visual noise.
- **Metadata Substrate (`#E9E7DF`):** Low-contrast tinted neutral applied to technical chips, coordinate badges, register readouts, and callout surfaces.

## Typography

The typographic hierarchy orchestrates a clear dialogue between classic editorial prose and technical instrumentation.

- **Newsreader (Editorial Headline):** Provides academic pedigree, warmth, and scholarly pacing. Used in Roman and Italic variants for essay headers, journal entries, and publication titles.
- **Inter (Neutral Body):** Delivers clean structural legibility for long-form analysis, process evaluations, and physical design post-mortems without competing against editorial headings.
- **JetBrains Mono (Technical Notation):** Forms the data layer. Applied strictly to index numbering (`[SEC 01 // 04]`), coordinate registers (`LOC: X12.04 Y88.19`), clock frequencies, SDC constraints, and code snippets.
- **Typographic Rules:** All monospace labels use uppercase for taxonomy. Editorial section markers precede titles with a numeric index (e.g., `01 / SYNTHESIS & CTS`).

## Layout & Spacing

The layout is built upon a 12-column architectural grid inspired by semiconductor reticle layouts and multi-column research publications.

### Grid & Structural Framing
- **Desktop (1024px+):** 12-column system, 48px canvas margins, 24px column gutters. Maximum readable content column capped at 720px for prose blocks. Two-column and three-column operational splits for telemetry and schematics.
- **Tablet (768px - 1023px):** 8-column system, 32px margins, 20px gutters. Technical sidebars collapse into sticky top register banners.
- **Mobile (< 768px):** 4-column system, 20px margins, 16px gutters. Complex horizontal tables reflow into vertically stacked coordinate blocks.

### Section Partitioning
- Sections are bounded by 1px horizontal borders (`#D8D7CE`). 
- Margin spacing between macro chapters is deliberately generous (`space-xl` scaled 2x to 5rem on desktop) to evoke open research broadsheets.
- Micro-spacers within data chips and technical lists adhere strictly to the 4px baseline unit (`space-xs` through `space-md`).

## Elevation & Depth

This system rejects drop shadows, ambient blur diffusions, and multi-layered float elevation. Depth is achieved purely through orthogonal framing, tonal contrast, and planar containment.

### Principles of Flat Spatial Stacking
- **Planar Ground:** The default field is flat `#F4F2EC`. Floating drop shadows (`box-shadow`) are prohibited.
- **Hairline Bounding:** Surfaces, modules, and code blocks distinguish themselves via a continuous 1px border (`#D8D7CE`).
- **Recessed Fields:** Interactive inputs, code consoles, and metadata arrays use color recess (`#E9E7DF` in light mode, `#171A18` in dark segments) rather than physical z-index elevation.
- **Inverted Core Tiers:** Inverted sections (terminal viewports, wafer floorplan canvases, footer registers) provide macro depth through deep graphite (`#171A18`) backdrops bounded by hairline rules.
- **Active State Projection:** Hover and active focus states are indicated with an inner hairline highlight or an accent border tinted in Signal Lime (`#B7D83D`), preserving two-dimensional planar integrity.

## Shapes

The design system enforces complete geometric orthodoxy.

- **Corner Radius:** `0px` universally across all containers, cards, tags, buttons, modals, and input fields.
- **Silicon Analogy:** Physical semiconductor design operates on Manhattan routing grids (90-degree orthogonal interconnects). Curved radii, round badges, and pill shapes violate this mechanical fidelity and are strictly prohibited.
- **Notches & Chamfers:** Minor technical chamfers (2px–4px 45-degree corner crops) are permissible only on decorative metadata registers to emulate microchip index notches.

## Components

### Buttons & Interactive Triggers
- **Primary Action:** Solid `#171916` rectangle with uppercase `#F4F2EC` text in `label-md`. 0px radius. Hover state swaps text or right border highlight to `#B7D83D`.
- **Secondary / Tertiary Trigger:** Transparent background, 1px `#171916` or `#D8D7CE` outline, `#171916` text. Hover shifts background to `#E9E7DF`.
- **Icon / Action Affordances:** Always accompanied by monospace coordinates or bracketed indicators, e.g., `[ EXECUTE RUN ] ->`.

### Chips & Coordinate Annotations
- **Style:** Compact rectangles backed by `#E9E7DF`, bounded by a 1px `#D8D7CE` border.
- **Typography:** `label-sm` in `#777A72` or `#171916`.
- **Active Status Variant:** Prefixed by a 6px solid `#B7D83D` square indicator glyph denoting active runs or nominal slack.

### Cards & Modular Cells
- **Structure:** Crisp rectangular boxes bordered by 1px `#D8D7CE`. No shadows.
- **Header Element:** Includes an upper metadata ledger containing index numbers (`01 / 04`), date stamps, or physical design step tags (`DRC // LVS`), separated from card body by a 1px divider.
- **Background:** Flat `#F4F2EC` default, shifting to `#FFFFFF` on explicit contrast panels.

### Form Inputs & Text Areas
- **Form Factor:** Sharp rectangular field with `#E9E7DF` fill and 1px `#D8D7CE` border.
- **Text & Focus:** Deep ink (`#171916`) input text using `label-md` or `body-md`. Focus state switches the border to 1px `#171916` with a right-aligned vertical pip in `#B7D83D`.

### Checkboxes & Radios
- **Checkboxes:** 14px x 14px sharp square, 1px border `#171916`. Checked state fills the box with `#171916` containing a centered 6px solid square of `#B7D83D`.
- **Radios:** 14px x 14px sharp square (no circular geometry), bordered in `#171916`. Checked state displays a solid inner square marker.

### Specialized Semiconductor Additions
- **Floorplan Netlist Ledger:** Two-column tabular views listing cell instance counts, utilization rates, and setup/hold slack, delineated with hairline grid lines.
- **Run Status Indicator:** Monospace telemetry readout (`STATUS: ROUTED`, `WNS: +0.024ns`) enclosed in sharp structural bracket frames.