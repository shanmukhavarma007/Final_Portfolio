/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { FloorplanViewer } from './components/FloorplanViewer';
import { NetlistLedger } from './components/NetlistLedger';
import { CtsHandoffGatePanel } from './components/CtsHandoffGatePanel';
import { CandidateProfileModal } from './components/CandidateProfileModal';
import { ProjectsLedger } from './components/ProjectsLedger';
import { ProjectDetailView } from './components/ProjectDetailView';
import { MethodologyFlow } from './components/MethodologyFlow';
import { TechnicalJournal } from './components/TechnicalJournal';
import { EdaTerminalConsole } from './components/EdaTerminalConsole';
import { PersistentFooter } from './components/PersistentFooter';
import { Cva6EngineeringEvidenceGallery } from './components/Cva6EngineeringEvidenceGallery';
import { Cva6TimingVsDensityCaseStudy } from './components/Cva6TimingVsDensityCaseStudy';
import { GitHubStatus } from './components/GitHubStatus';
import { SiliconTraceReveal } from './components/SiliconTraceReveal';
import { TechnicalSkillsMatrix } from './components/TechnicalSkillsMatrix';
import { VERIFIED_PROJECTS, VerifiedProject, ENGINEER_PROFILE } from './data/portfolioData';
import { ArrowRight, ShieldCheck, CheckCircle2, Clock, GraduationCap, Award, Cpu, Mail, Linkedin, Github, FileText, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('overview');
  const [selectedProject, setSelectedProject] = useState<VerifiedProject | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isCva6EvidenceExpanded, setIsCva6EvidenceExpanded] = useState<boolean>(true);
  const shouldReduceMotion = useReducedMotion();

  const handleToggleCva6Evidence = () => {
    setIsCva6EvidenceExpanded(prev => !prev);
  };

  // URL hash routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setActiveView('overview');
        setSelectedProject(null);
        return;
      }

      if (hash.startsWith('project/')) {
        const slug = hash.replace('project/', '');
        const found = VERIFIED_PROJECTS.find(p => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProject(found);
          setActiveView('projects');
          return;
        }
      }

      if (['overview', 'cva6-placement', 'cts-handoff', 'projects', 'journal'].includes(hash)) {
        setActiveView(hash);
        setSelectedProject(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Active section observer when exploring the main overview page
  useEffect(() => {
    if (activeView !== 'overview' || selectedProject) return;

    const sections = [
      { id: 'hero-section', view: 'overview' },
      { id: 'cva6-viewport', view: 'cva6-placement' },
      { id: 'cts-section', view: 'cts-handoff' },
      { id: 'projects-section', view: 'projects' },
      { id: 'journal-section', view: 'journal' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const matched = sections.find(s => s.id === entry.target.id);
            if (matched && window.location.hash.replace('#', '') !== matched.view) {
              window.history.replaceState(null, '', `#${matched.view}`);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.25, 0.5]
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeView, selectedProject]);

  const handleNavigate = (view: string) => {
    setSelectedProject(null);

    // If already on overview or navigating to sections present in overview, smooth scroll
    if (activeView === 'overview') {
      const sectionTargets: Record<string, string> = {
        'overview': 'hero-section',
        'cva6-placement': 'cva6-viewport',
        'cts-handoff': 'cts-section',
        'projects': 'projects-section',
        'journal': 'journal-section'
      };

      const targetId = sectionTargets[view];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.location.hash = view;
          return;
        }
      }
    }

    setActiveView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: VerifiedProject) => {
    setSelectedProject(project);
    window.location.hash = `project/${project.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    window.location.hash = 'projects';
    setActiveView('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f3] text-[#1b1c18] flex flex-col font-sans selection:bg-[#cef053] selection:text-[#1b1c18]">
      {/* 3-Zone Fixed Header with animated active navigation */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        onOpenSpecsModal={() => {
          if (activeView !== 'overview') {
            setActiveView('overview');
            setSelectedProject(null);
            window.location.hash = 'overview';
          }
          setIsCva6EvidenceExpanded(true);
          setTimeout(() => {
            const el = document.getElementById('engineering-evidence');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 80);
        }}
      />

      {/* Main Viewport Container (1440px max width baseline) */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* If viewing a single project detail */}
        {selectedProject ? (
          <motion.div
            key={`detail-${selectedProject.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectDetailView
              project={selectedProject}
              onBack={handleBackToProjects}
              onNavigateToFloorplan={() => handleNavigate('cva6-placement')}
            />
          </motion.div>
        ) : (
          <>
            {/* View 1: Complete Overview Mode */}
            {activeView === 'overview' && (
              <>
                {/* Hero Section: Factual Academic & Training Authenticity with Silicon Reticle Grid */}
                <section
                  id="hero-section"
                  className="border border-[#d8d7ce] bg-[#ffffff] p-6 md:p-10 relative overflow-hidden"
                >
                  {/* Subtle Silicon Wafer & Chip Reticle Grid Pattern */}
                  <div
                    className="absolute inset-0 silicon-grid-pattern opacity-50 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Top Status Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs font-technical text-[#757872] uppercase pb-4 border-b border-[#d8d7ce]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#b7d83d] inline-block" />
                      <span className="font-bold text-[#1b1c18]">
                        01 // OVERVIEW
                      </span>
                      <span className="text-[#c5c7c1]">·</span>
                      <span className="font-bold text-[#1b1c18]">
                        [ENGINEERING PORTFOLIO // ASIC PHYSICAL DESIGN // IMPLEMENTATION JOURNAL]
                      </span>
                    </div>
                    <span className="text-[#536600] font-bold">STRICT FACTUAL INTEGRITY</span>
                  </motion.div>

                  <div className="relative z-10 mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8">
                      {/* Immediate Recruiter Identification */}
                      <div className="flex flex-wrap items-center gap-2 mb-2 font-technical text-xs">
                        <span className="font-bold text-[#1b1c18] uppercase tracking-wider">
                          SHANMUKHA VARMA PENMETSA
                        </span>
                        <span className="text-[#c5c7c1]">/</span>
                        <span className="text-[#536600] font-semibold uppercase">
                          ENTRY-LEVEL ASIC PHYSICAL DESIGN ENGINEER
                        </span>
                      </div>

                      {/* Line-by-Line / Staggered Headline Reveal */}
                      <motion.h1
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1b1c18] font-normal tracking-tight leading-[1.15] text-balance"
                      >
                        ASIC Physical Design Portfolio & Implementation Ledger
                      </motion.h1>

                      {/* Fade-in Introductory Paragraph */}
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-4 text-base sm:text-lg text-[#454843] leading-relaxed max-w-3xl"
                      >
                        Interested in the engineering that takes digital designs from RTL towards physical implementation, I’m an Electronics and Communication Engineering graduate building my career in ASIC Physical Design. Through hands-on training at Sumedha IT, I’ve worked across RTL synthesis and SDC-driven timing constraints using Cadence Genus, followed by floorplanning, macro placement and standard-cell placement using Cadence Innovus. My work is documented through practical CVA6 implementation and AES synthesis projects, supported by original EDA tool outputs and engineering evidence.
                      </motion.p>

                      {/* Recruiter-First Action Triggers with Hover & Tap Animations */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 flex flex-wrap items-center gap-2.5 font-technical text-xs"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const el = document.getElementById('projects-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                            else handleNavigate('projects');
                          }}
                          className="group px-3.5 py-2.5 bg-[#1b1c18] text-[#fbf9f3] hover:text-[#cef053] font-bold uppercase tracking-wider transition-colors border border-[#1b1c18] cursor-pointer flex items-center gap-1.5"
                        >
                          <span>[ VIEW FEATURED PROJECTS ↓ ]</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleNavigate('cva6-placement')}
                          className="px-3.5 py-2.5 bg-[#ffffff] hover:bg-[#e9e7df] text-[#1b1c18] font-bold uppercase tracking-wider transition-colors border border-[#d8d7ce] hover:border-[#1b1c18] cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="w-2 h-2 bg-[#b7d83d]" />
                          <span>[ INSPECT CVA6 CAD ]</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsProfileModalOpen(true)}
                          className="px-3.5 py-2.5 bg-[#f5f3ed] hover:bg-[#e9e7df] text-[#1b1c18] font-bold uppercase tracking-wider transition-colors border border-[#d8d7ce] hover:border-[#1b1c18] cursor-pointer flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#536600]" />
                          <span>[ CANDIDATE DOSSIER ]</span>
                        </motion.button>

                        <div className="flex items-center gap-2">
                          <motion.a
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2.5 bg-[#ffffff] hover:bg-[#f5f3ed] text-[#1b1c18] border border-[#d8d7ce] hover:border-[#1b1c18] flex items-center gap-1.5 transition-colors font-technical text-xs font-semibold"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-3.5 h-3.5 text-[#536600]" />
                            <span className="hidden sm:inline">LINKEDIN</span>
                          </motion.a>

                          <motion.a
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            href="https://github.com/shanmukhavarma007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2.5 bg-[#ffffff] hover:bg-[#f5f3ed] text-[#1b1c18] border border-[#d8d7ce] hover:border-[#1b1c18] flex items-center gap-1.5 transition-colors font-technical text-xs font-semibold"
                            title="GitHub Profile"
                          >
                            <Github className="w-3.5 h-3.5 text-[#536600]" />
                            <span className="hidden sm:inline">GITHUB</span>
                          </motion.a>

                          <motion.a
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            href="mailto:psvarma.e@gmail.com"
                            className="px-3 py-2.5 bg-[#ffffff] hover:bg-[#f5f3ed] text-[#1b1c18] border border-[#d8d7ce] hover:border-[#1b1c18] flex items-center gap-1.5 transition-colors font-technical text-xs font-semibold"
                            title="Email Shanmukha Varma"
                          >
                            <Mail className="w-3.5 h-3.5 text-[#536600]" />
                            <span className="hidden sm:inline">EMAIL</span>
                          </motion.a>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right-Hand Quick Status Telemetry Register with Sequential Reveal */}
                    <div className="lg:col-span-4 flex flex-col">
                      {/* Boundary 01: Hero → Candidate Background (Silicon Trace Reveal STR-01) */}
                      <SiliconTraceReveal
                        variant="hero-to-cand"
                        className="mb-2"
                      />

                      <motion.div
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="border border-[#d8d7ce] bg-[#f5f3ed] p-5 text-xs font-technical space-y-3"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce] text-[#757872]">
                          <span className="font-bold text-[#1b1c18]">CANDIDATE BACKGROUND</span>
                          <span className="text-[#536600] font-bold">VERIFIED</span>
                        </div>

                        <div className="space-y-2 text-[#454843]">
                          <div className="flex justify-between">
                            <span className="text-[#757872]">Candidate:</span>
                            <span className="font-bold text-[#1b1c18]">Shanmukha Varma</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757872]">Education:</span>
                            <span className="font-bold text-[#1b1c18]">B.Tech ECE (2022–2026)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757872]">Institution:</span>
                            <span className="font-bold text-[#1b1c18]">Vignan's IIT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757872]">ASIC Training:</span>
                            <span className="font-bold text-[#536600]">Sumedha IT</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757872]">Technology Node:</span>
                            <span className="font-bold text-[#1b1c18] bg-[#e9e7df] px-1.5 py-0.2 border border-[#d8d7ce]">
                              28 nm
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757872]">EDA Toolchain:</span>
                            <span className="font-bold text-[#1b1c18]">Cadence Genus / Innovus</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757872]">CVA6 Status:</span>
                            <span className="font-bold text-[#536600] flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-[#b7d83d]" />
                              Placement Completed
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757872]">CTS Status:</span>
                            <span className="font-bold text-[#757872]">
                              Not Started (Pending)
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#d8d7ce] text-[11px] text-[#757872]">
                          Languages: Verilog HDL, Tcl, Linux Shell
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Boundary 02: Candidate Background → Technical Skills (Silicon Trace Reveal STR-01) */}
                  <div className="relative z-10 mt-8">
                    <SiliconTraceReveal
                      variant="cand-to-skills"
                      className="mb-3"
                    />

                    {/* 4-Column KPI Strip with Staggered Entrance */}
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#d8d7ce] border border-[#d8d7ce] bg-[#fbf9f3] text-xs font-technical"
                    >
                      <div className="p-4 transition-colors hover:bg-[#ffffff]">
                        <div className="text-[#757872] uppercase text-[11px] flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-[#536600]" />
                          DEGREE
                        </div>
                        <div className="text-base font-bold text-[#1b1c18] mt-1">
                          B.Tech ECE (2022–2026)
                        </div>
                        <div className="text-[10px] text-[#757872] mt-0.5">Vignan's IIT</div>
                      </div>

                      <div className="p-4 transition-colors hover:bg-[#ffffff]">
                        <div className="text-[#757872] uppercase text-[11px] flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#536600]" />
                          TRAINING
                        </div>
                        <div className="text-base font-bold text-[#1b1c18] mt-1">
                          ASIC Physical Design
                        </div>
                        <div className="text-[10px] text-[#757872] mt-0.5">Sumedha IT</div>
                      </div>

                      <div className="p-4 transition-colors hover:bg-[#ffffff]">
                        <div className="text-[#757872] uppercase text-[11px] flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-[#536600]" />
                          EDA TOOLS
                        </div>
                        <div className="text-base font-bold text-[#1b1c18] mt-1">
                          Cadence Genus & Innovus
                        </div>
                        <div className="text-[10px] text-[#757872] mt-0.5">Synthesis & Placement</div>
                      </div>

                      <div className="p-4 transition-colors hover:bg-[#ffffff]">
                        <div className="text-[#757872] uppercase text-[11px]">PROJECTS</div>
                        <div className="text-base font-bold text-[#1b1c18] mt-1">
                          CVA6 & AES Core
                        </div>
                        <div className="text-[10px] text-[#757872] mt-0.5">2 Verified Projects</div>
                      </div>
                    </motion.div>

                    {/* Recruiter-First 4-Pillar Technical Skills Matrix */}
                    <div className="mt-6">
                      <TechnicalSkillsMatrix />
                    </div>
                  </div>
                </section>

                {/* Boundary 03: Technical Skills → CVA6 Project (Signature Motion System: Silicon Trace Reveal STR-01) */}
                <SiliconTraceReveal
                  variant="skills-to-cva6"
                  className="my-4"
                />

                {/* Section 02: CVA6 Silicon Die Viewport & Interactive CAD Inspector */}
                <motion.section
                  id="cva6-viewport"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#d8d7ce]">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
                        02 // CVA6 64-BIT CORE FLOORPLAN & MACRO PLACEMENT
                      </span>
                      <span className="text-[#c5c7c1]">·</span>
                      <span className="font-technical text-xs text-[#536600] font-bold">
                        [COMPLETED IN CADENCE INNOVUS]
                      </span>
                      <span className="text-[#c5c7c1]">·</span>
                      <span className="font-technical text-xs font-bold text-[#1b1c18] bg-[#e9e7df] px-2 py-0.5 border border-[#d8d7ce]">
                        PROCESS TECHNOLOGY // 28 nm
                      </span>
                    </div>
                    <span className="font-technical text-xs text-[#757872]">
                      INNOVUS PLACEMENT TOPOGRAPHY
                    </span>
                  </div>

                  {/* Prominent CVA6 Project Specifications Strip */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#d8d7ce] border border-[#d8d7ce] bg-[#ffffff] text-xs font-technical">
                    <div className="p-3 bg-[#fbf9f3]">
                      <div className="text-[#757872] uppercase text-[10px] font-semibold">TECHNOLOGY NODE</div>
                      <div className="text-base font-bold text-[#1b1c18] mt-0.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[#b7d83d]" />
                        28 nm
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-[#757872] uppercase text-[10px] font-semibold">EDA TOOLS</div>
                      <div className="text-sm font-bold text-[#1b1c18] mt-0.5">Cadence Genus & Innovus</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[#757872] uppercase text-[10px] font-semibold">CLOCK PERIOD</div>
                      <div className="text-sm font-bold text-[#1b1c18] mt-0.5">1.5 ns (~666.67 MHz)</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[#757872] uppercase text-[10px] font-semibold">IMPLEMENTATION STAGE</div>
                      <div className="text-sm font-bold text-[#536600] mt-0.5">Standard-cell placement completed</div>
                    </div>
                  </div>

                  <FloorplanViewer
                    isEvidenceExpanded={isCva6EvidenceExpanded}
                    onToggleEvidence={handleToggleCva6Evidence}
                  />

                  {/* Boundary 04: CVA6 Floorplan Viewport → Engineering Evidence Gallery (Silicon Trace Reveal STR-01) */}
                  <SiliconTraceReveal
                    variant="cva6-to-evidence"
                    className="my-3"
                  />

                  {/* 3 Original Engineering Screenshots Gallery (Collapsible via button) */}
                  <Cva6EngineeringEvidenceGallery isExpanded={isCva6EvidenceExpanded} />

                  {/* Case Study: Timing vs. Cell Density (Engineering Decisions // CVA6-01) */}
                  <div className="pt-2">
                    <Cva6TimingVsDensityCaseStudy />
                  </div>
                </motion.section>

                {/* Subordinate: CVA6 Netlist & Handoff Status Ledger */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <NetlistLedger
                    onOpenCandidateProfile={() => setIsProfileModalOpen(true)}
                    onOpenEdaConsole={() => {
                      const el = document.getElementById('eda-console');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                </motion.section>

                {/* Section 03: CTS Status & Handoff Boundary (Critical Distinction) */}
                <motion.section
                  id="cts-section"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
                    <div className="flex items-center gap-2">
                      <span className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
                        03 // CLOCK TREE SYNTHESIS (CTS) HANDOFF
                      </span>
                      <span className="text-[#c5c7c1]">·</span>
                      <span className="font-technical text-xs text-[#757872] font-bold">
                        [CTS STATUS: NOT STARTED / PENDING HANDOFF]
                      </span>
                    </div>
                    <span className="font-technical text-xs text-[#757872]">
                      FACTUAL MILESTONE BOUNDARY
                    </span>
                  </div>

                  <CtsHandoffGatePanel />
                </motion.section>

                {/* Subordinate: Cadence Genus & Innovus Tcl Script Console */}
                <motion.section
                  id="eda-console"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#d8d7ce]">
                    <div className="flex items-center gap-2">
                      <span className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
                        EDA AUTOMATION // CADENCE GENUS & INNOVUS TCL FLOW SCRIPTS
                      </span>
                      <span className="text-[#c5c7c1]">·</span>
                      <span className="font-technical text-xs text-[#536600] font-bold">
                        [SYNTHESIS & PLACEMENT COMMANDS]
                      </span>
                    </div>
                    <span className="font-technical text-xs text-[#757872]">
                      VERIFIED TOOL WORKFLOW
                    </span>
                  </div>

                  <EdaTerminalConsole />
                </motion.section>

                {/* Subordinate: ASIC Physical Implementation Flow */}
                <motion.section
                  id="methodology-section"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <MethodologyFlow
                    onInspectPlacement={() => handleNavigate('cva6-placement')}
                    onInspectCts={() => handleNavigate('cts-handoff')}
                  />
                </motion.section>

                {/* Boundary 05: Engineering Evidence Gallery → AES Project (Silicon Trace Reveal STR-01) */}
                <SiliconTraceReveal
                  variant="evidence-to-aes"
                  className="my-4"
                />

                {/* Section 04: Verified Projects Ledger (2 Projects Only) */}
                <motion.section
                  id="projects-section"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <ProjectsLedger onSelectProject={handleSelectProject} />
                </motion.section>

                {/* Section 05: Technical Insights & Learning Ledger */}
                <motion.section
                  id="journal-section"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <TechnicalJournal />
                </motion.section>
              </>
            )}

            {/* View 2: CVA6 Placement CAD Deep-Dive View */}
            {activeView === 'cva6-placement' && (
              <motion.div
                key="view-cva6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="border border-[#d8d7ce] bg-[#ffffff] p-6">
                  <div className="flex flex-wrap items-center gap-2 font-technical text-xs text-[#757872] uppercase mb-2">
                    <span className="font-bold text-[#1b1c18]">02 // CVA6 PLACEMENT</span>
                    <span>·</span>
                    <span>[MODULE 02] // CVA6 RISC-V CORE</span>
                    <span>·</span>
                    <span className="text-[#536600] font-bold">PLACEMENT COMPLETED IN CADENCE INNOVUS</span>
                    <span>·</span>
                    <span className="font-bold text-[#1b1c18] bg-[#e9e7df] px-2 py-0.5 border border-[#d8d7ce]">
                      PROCESS TECHNOLOGY // 28 nm
                    </span>
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-[#1b1c18] font-normal">
                    CVA6 Core Floorplanning & Standard-Cell Placement
                  </h1>
                  <p className="font-sans text-sm md:text-base text-[#454843] mt-2 max-w-3xl leading-relaxed">
                    Interactive CAD inspection viewport for the 64-bit CVA6 core implemented in Cadence Innovus on the 28 nm technology node. Review macro arrangements, core boundaries, and standard-cell placement completed prior to CTS.
                  </p>

                  {/* Prominent CVA6 Project Specifications Strip */}
                  <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#d8d7ce] border border-[#d8d7ce] bg-[#fbf9f3] text-xs font-technical">
                    <div className="p-3 bg-[#ffffff]">
                      <div className="text-[#757872] uppercase text-[10px] font-semibold">TECHNOLOGY NODE</div>
                      <div className="text-base font-bold text-[#1b1c18] mt-0.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-[#b7d83d]" />
                        28 nm
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-[#757872] uppercase text-[10px] font-semibold">EDA TOOLS</div>
                      <div className="text-sm font-bold text-[#1b1c18] mt-0.5">Cadence Genus & Innovus</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[#757872] uppercase text-[10px] font-semibold">CLOCK PERIOD</div>
                      <div className="text-sm font-bold text-[#1b1c18] mt-0.5">1.5 ns (~666.67 MHz)</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[#757872] uppercase text-[10px] font-semibold">IMPLEMENTATION STAGE</div>
                      <div className="text-sm font-bold text-[#536600] mt-0.5">Standard-cell placement completed</div>
                    </div>
                  </div>
                </div>

                <FloorplanViewer
                  isEvidenceExpanded={isCva6EvidenceExpanded}
                  onToggleEvidence={handleToggleCva6Evidence}
                />

                {/* Boundary 04: CVA6 Floorplan Viewport → Engineering Evidence Gallery (Silicon Trace Reveal STR-01) */}
                <SiliconTraceReveal
                  variant="cva6-to-evidence"
                  className="my-3"
                />

                {/* Dedicated CVA6 Actual Engineering Screenshots & QoR Gallery (Collapsible via button) */}
                <Cva6EngineeringEvidenceGallery isExpanded={isCva6EvidenceExpanded} />

                {/* Case Study: Timing vs. Cell Density (Engineering Decisions // CVA6-01) */}
                <Cva6TimingVsDensityCaseStudy />

                <NetlistLedger
                  onOpenCandidateProfile={() => setIsProfileModalOpen(true)}
                  onOpenEdaConsole={() => handleNavigate('overview')}
                />
              </motion.div>
            )}

            {/* View 3: CTS Handoff Boundary View */}
            {activeView === 'cts-handoff' && (
              <motion.div
                key="view-cts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div className="border border-[#d8d7ce] bg-[#ffffff] p-6">
                  <div className="flex items-center gap-2 font-technical text-xs text-[#757872] uppercase mb-2">
                    <span className="font-bold text-[#1b1c18]">03 // CTS HANDOFF</span>
                    <span>·</span>
                    <span>[MODULE 03] // CLOCK TREE SYNTHESIS</span>
                    <span>·</span>
                    <span className="text-[#757872] font-bold">
                      STATUS: NOT STARTED / PENDING HANDOFF
                    </span>
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-[#1b1c18] font-normal">
                    Clock Tree Synthesis (CTS) Implementation Boundary
                  </h1>
                  <p className="font-sans text-sm md:text-base text-[#454843] mt-2 max-w-3xl leading-relaxed">
                    Clear demarcation: CVA6 standard-cell placement is completed in Cadence Innovus, while Clock Tree Synthesis has not been started. Review verified placement scope and theoretical CTS concepts.
                  </p>
                </div>

                <CtsHandoffGatePanel />

                <EdaTerminalConsole />
              </motion.div>
            )}

            {/* View 4: Projects View */}
            {activeView === 'projects' && (
              <motion.div
                key="view-projects"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <ProjectsLedger onSelectProject={handleSelectProject} />
              </motion.div>
            )}

            {/* View 5: Technical Insights & Live Engineering Activity View */}
            {activeView === 'journal' && (
              <motion.div
                key="view-journal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <TechnicalJournal />
                <GitHubStatus />
              </motion.div>
            )}
          </>
        )}
      </main>

      {/* Boundary 06: AES Project / Journal → Contact Footer (Silicon Trace Reveal STR-01) */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12">
        <SiliconTraceReveal
          variant="aes-to-contact"
          className="my-1"
        />
      </div>

      {/* Persistent Terminal Footer */}
      <PersistentFooter
        onOpenSpecsModal={() => setIsProfileModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Candidate Profile Dossier Modal */}
      <CandidateProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}
