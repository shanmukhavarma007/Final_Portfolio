import React, { useState } from 'react';
import { ENGINEER_PROFILE, VERIFIED_PROJECTS } from '../data/portfolioData';
import { X, Printer, Copy, Check, Mail, Linkedin, Github, GraduationCap, Award, Cpu, BookOpen, Clock } from 'lucide-react';

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `SHANMUKHA VARMA PENMETSA — Entry-Level ASIC Physical Design Engineer
Email: ${ENGINEER_PROFILE.email}
LinkedIn: ${ENGINEER_PROFILE.linkedin}
GitHub: ${ENGINEER_PROFILE.github}

EDUCATION:
- ${ENGINEER_PROFILE.education.degree} (${ENGINEER_PROFILE.education.duration})
  ${ENGINEER_PROFILE.education.institution}

SPECIALIZED TRAINING:
- ${ENGINEER_PROFILE.training.program} at ${ENGINEER_PROFILE.training.organization}

VERIFIED EDA TOOLCHAIN:
- Cadence Genus (RTL Synthesis, QoR Analysis, SDC Constraints)
- Cadence Innovus (Floorplanning, Macro Placement, Standard-Cell Placement)
- Verilog HDL, Tcl, Linux Shell Scripting

VERIFIED PROJECTS:
1. CVA6 64-Bit RISC-V Processor:
   - RTL Synthesis in Cadence Genus
   - Floorplanning & Macro Placement in Cadence Innovus
   - Standard-Cell Placement Completed in Cadence Innovus
   - CTS Status: Not Started (Handoff Pending)
2. AES Cryptographic Core:
   - RTL Synthesis in Cadence Genus with single-clock 1.0 ns period SDC constraint`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#171916]/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#fbf9f3] border border-[#1b1c18] shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 bg-[#f5f3ed] border-b border-[#d8d7ce] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#b7d83d]" />
            <span className="font-technical text-xs font-bold uppercase text-[#1b1c18]">
              [DOSSIER 01] VERIFIED CANDIDATE QUALIFICATION RECORD
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-[#e9e7df] text-[#1b1c18] border border-[#d8d7ce] cursor-pointer"
            title="Close [ESC]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Printable Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Header Info */}
          <div className="border-b border-[#d8d7ce] pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-technical text-[#757872] uppercase mb-1">
              <span>CANDIDATE: ENTRY-LEVEL ASIC PHYSICAL DESIGN</span>
              <span className="px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-bold">
                VERIFIED ACADEMIC & TRAINING RECORD
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1b1c18] font-normal">
              {ENGINEER_PROFILE.name}
            </h1>
            <p className="font-technical text-sm text-[#536600] font-semibold mt-1">
              {ENGINEER_PROFILE.role} — {ENGINEER_PROFILE.tagline}
            </p>
            <p className="font-sans text-xs md:text-sm text-[#454843] mt-2 leading-relaxed">
              {ENGINEER_PROFILE.summary}
            </p>

            {/* Contact Links */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-technical text-[#757872] mt-4 pt-3 border-t border-[#eae8e2]">
              <a
                href={`mailto:${ENGINEER_PROFILE.email}`}
                className="flex items-center gap-1.5 text-[#1b1c18] hover:text-[#536600] underline font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-[#536600]" />
                {ENGINEER_PROFILE.email}
              </a>
              <span>·</span>
              <a
                href={ENGINEER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#1b1c18] hover:text-[#536600] underline font-semibold"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#536600]" />
                LinkedIn Profile
              </a>
              <span>·</span>
              <a
                href={ENGINEER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#1b1c18] hover:text-[#536600] underline font-semibold"
              >
                <Github className="w-3.5 h-3.5 text-[#536600]" />
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Education & Hands-On Training */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#ffffff] border border-[#d8d7ce]">
              <div className="flex items-center gap-2 text-xs font-technical font-bold text-[#1b1c18] uppercase border-b border-[#d8d7ce] pb-2 mb-2">
                <GraduationCap className="w-4 h-4 text-[#536600]" />
                Academic Education
              </div>
              <div className="text-sm font-serif font-bold text-[#1b1c18]">
                {ENGINEER_PROFILE.education.degree}
              </div>
              <div className="text-xs text-[#454843] mt-1">
                {ENGINEER_PROFILE.education.institution}
              </div>
              <div className="text-[11px] font-technical text-[#757872] mt-2">
                Duration: {ENGINEER_PROFILE.education.duration}
              </div>
            </div>

            <div className="p-4 bg-[#ffffff] border border-[#d8d7ce]">
              <div className="flex items-center gap-2 text-xs font-technical font-bold text-[#1b1c18] uppercase border-b border-[#d8d7ce] pb-2 mb-2">
                <Award className="w-4 h-4 text-[#536600]" />
                ASIC Physical Design Training
              </div>
              <div className="text-sm font-serif font-bold text-[#1b1c18]">
                {ENGINEER_PROFILE.training.program}
              </div>
              <div className="text-xs text-[#454843] mt-1">
                Institution: {ENGINEER_PROFILE.training.organization}
              </div>
              <div className="text-[11px] font-technical text-[#757872] mt-2">
                Focus: RTL-to-GDSII flow fundamentals with Cadence tools
              </div>
            </div>
          </div>

          {/* Verified Toolchain */}
          <div>
            <h2 className="font-technical text-xs font-bold uppercase text-[#1b1c18] mb-3">
              Verified EDA Tools & Scripting Languages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-technical">
              {ENGINEER_PROFILE.edaTools.map((tool, i) => (
                <div key={i} className="p-3 bg-[#ffffff] border border-[#d8d7ce]">
                  <div className="font-bold text-[#1b1c18]">{tool.name}</div>
                  <div className="text-[11px] text-[#454843] mt-0.5">{tool.role}</div>
                </div>
              ))}
              {ENGINEER_PROFILE.scriptingAndLanguages.map((lang, i) => (
                <div key={i} className="p-3 bg-[#ffffff] border border-[#d8d7ce]">
                  <div className="font-bold text-[#1b1c18]">{lang.name}</div>
                  <div className="text-[11px] text-[#454843] mt-0.5">{lang.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Competencies Classification */}
          <div>
            <h2 className="font-technical text-xs font-bold uppercase text-[#1b1c18] mb-3">
              Technical Experience & Knowledge Classification
            </h2>
            <div className="border border-[#d8d7ce] divide-y divide-[#d8d7ce] bg-[#ffffff] text-xs font-technical">
              {ENGINEER_PROFILE.competencies.map((comp, i) => (
                <div key={i} className="p-3 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-[#1b1c18]">{comp.area}</span>
                    <span className="text-[#757872] ml-2 text-[11px]">({comp.tool})</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold border ${
                      comp.status === 'COMPLETED'
                        ? 'bg-[#e9e7df] text-[#536600] border-[#d8d7ce]'
                        : comp.status === 'STUDIED'
                        ? 'bg-[#f5f3ed] text-[#757872] border-[#d8d7ce]'
                        : 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18]'
                    }`}
                  >
                    {comp.status === 'COMPLETED'
                      ? 'COMPLETED (HANDS-ON)'
                      : comp.status === 'STUDIED'
                      ? 'STUDIED (THEORY)'
                      : 'PLANNED / NOT STARTED'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Projects Summary */}
          <div>
            <h2 className="font-technical text-xs font-bold uppercase text-[#1b1c18] mb-3">
              Verified Project Deliverables
            </h2>
            <div className="space-y-3 text-xs font-technical">
              {VERIFIED_PROJECTS.map(proj => (
                <div key={proj.id} className="p-4 bg-[#ffffff] border border-[#d8d7ce]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-serif text-sm font-bold text-[#1b1c18]">{proj.title}</span>
                    <span className="px-2 py-0.5 bg-[#f5f3ed] text-[10px] font-bold text-[#1b1c18]">
                      {proj.id === 'cva6-riscv'
                        ? 'PLACEMENT: COMPLETED | CTS: PENDING'
                        : 'SYNTHESIS: COMPLETED (1 ns CLOCK)'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#757872] mt-1">
                    Tools: {proj.edaToolchain.join(', ')} | Languages: {proj.languages.join(', ')}
                  </div>
                  <p className="font-sans text-xs text-[#454843] mt-2 leading-relaxed">
                    {proj.overview}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Factual Integrity Statement */}
          <div className="p-4 bg-[#f0eee8] border border-[#d8d7ce] text-xs font-technical text-[#454843] leading-relaxed">
            <span className="font-bold text-[#1b1c18] block mb-1">
              [FACTUAL ACCURACY & INTEGRITY COMMITMENT]
            </span>
            This profile documents only verified educational coursework at Vignan's Institute of Information Technology, hands-on training at Sumedha IT, and actual completed project stages in Cadence Genus and Cadence Innovus. No fabricated tapeouts, fictional metrics, or unperformed engineering activities are claimed.
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-[#f5f3ed] border-t border-[#d8d7ce] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#ffffff] hover:bg-[#e9e7df] text-[#1b1c18] border border-[#d8d7ce] font-technical text-xs uppercase flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT PROFILE</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-[#ffffff] hover:bg-[#e9e7df] text-[#1b1c18] border border-[#d8d7ce] font-technical text-xs uppercase flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#536600]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY DOSSIER</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1b1c18] text-[#fbf9f3] hover:text-[#cef053] font-technical text-xs uppercase cursor-pointer"
          >
            [ CLOSE ]
          </button>
        </div>
      </div>
    </div>
  );
};
