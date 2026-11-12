import React, { useState } from 'react';
import { RECRUITER_SKILL_GROUPS, RecruiterSkillGroup, RecruiterSkillItem } from '../data/portfolioData';
import { Cpu, Layers, Activity, Terminal, ShieldCheck, CheckCircle2, BookOpen, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

type SkillFilter = 'ALL' | 'HANDS-ON FLOW' | 'TOOL AUTOMATION' | 'THEORETICAL STUDY';

const CATEGORY_HEADERS: Record<number, string> = {
  0: '01 — EDA TOOLS',
  1: '02 — ASIC PHYSICAL DESIGN',
  2: '03 — SYNTHESIS AND TIMING',
  3: '04 — HARDWARE DESCRIPTION AND SCRIPTING'
};

export const TechnicalSkillsMatrix: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<SkillFilter>('ALL');

  const getGroupIcon = (groupLetter: string) => {
    switch (groupLetter) {
      case 'A':
        return <Cpu className="w-4 h-4 text-[#536600]" />;
      case 'B':
        return <Layers className="w-4 h-4 text-[#536600]" />;
      case 'C':
        return <Activity className="w-4 h-4 text-[#536600]" />;
      case 'D':
        return <Terminal className="w-4 h-4 text-[#536600]" />;
      default:
        return <Wrench className="w-4 h-4 text-[#536600]" />;
    }
  };

  const getLevelBadge = (level: RecruiterSkillItem['level']) => {
    switch (level) {
      case 'HANDS-ON FLOW':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#e9e7df] text-[#536600] font-technical text-[10px] font-bold border border-[#d8d7ce] shrink-0">
            <CheckCircle2 className="w-3 h-3 text-[#536600]" />
            HANDS-ON FLOW
          </span>
        );
      case 'TOOL AUTOMATION':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1b1c18] text-[#cef053] font-technical text-[10px] font-bold border border-[#1b1c18] shrink-0">
            <Terminal className="w-3 h-3 text-[#cef053]" />
            TOOL AUTOMATION
          </span>
        );
      case 'THEORETICAL STUDY':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#f5f3ed] text-[#757872] font-technical text-[10px] font-semibold border border-[#d8d7ce] shrink-0">
            <BookOpen className="w-3 h-3 text-[#757872]" />
            THEORETICAL STUDY
          </span>
        );
      default:
        return null;
    }
  };

  const filteredGroups = RECRUITER_SKILL_GROUPS.map((group, groupIdx) => {
    const visibleSkills = group.skills.filter(s =>
      activeFilter === 'ALL' ? true : s.level === activeFilter
    );
    return {
      group,
      groupIdx,
      categoryTitle: CATEGORY_HEADERS[groupIdx] || `${String(groupIdx + 1).padStart(2, '0')} — ${group.groupTitle.toUpperCase()}`,
      visibleSkills
    };
  }).filter(item => item.visibleSkills.length > 0);

  const totalVisibleCount = filteredGroups.reduce((acc, item) => acc + item.visibleSkills.length, 0);

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff] w-full">
      {/* Header Ledger */}
      <div className="p-5 md:p-6 bg-[#f5f3ed] border-b border-[#d8d7ce]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-technical text-xs text-[#757872] uppercase tracking-wider">
              <span className="w-2 h-2 bg-[#b7d83d] inline-block" />
              <span className="font-bold text-[#1b1c18]">RECRUITER-FIRST SKILLS MATRIX</span>
              <span className="text-[#c5c7c1]">·</span>
              <span className="text-[#536600] font-bold">4-PILLAR ASIC COMPETENCIES</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
              Technical Skills & Implementation Competencies
            </h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ffffff] border border-[#d8d7ce] text-xs font-technical">
            <ShieldCheck className="w-4 h-4 text-[#536600]" />
            <span className="text-[#1b1c18] font-bold">STRICT FACTUAL DEMARCATION</span>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-technical">
          <span className="text-[#757872] text-[11px] uppercase mr-1">FILTER BY COMPETENCY:</span>
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1 transition-colors cursor-pointer border ${
              activeFilter === 'ALL'
                ? 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18] font-bold'
                : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce] hover:text-[#1b1c18]'
            }`}
          >
            All Competencies ({RECRUITER_SKILL_GROUPS.flatMap(g => g.skills).length})
          </button>
          <button
            onClick={() => setActiveFilter('HANDS-ON FLOW')}
            className={`px-3 py-1 transition-colors cursor-pointer border ${
              activeFilter === 'HANDS-ON FLOW'
                ? 'bg-[#1b1c18] text-[#cef053] border-[#1b1c18] font-bold'
                : 'bg-[#ffffff] text-[#536600] border-[#d8d7ce] hover:bg-[#f5f3ed]'
            }`}
          >
            Hands-on Flow ({RECRUITER_SKILL_GROUPS.flatMap(g => g.skills).filter(s => s.level === 'HANDS-ON FLOW').length})
          </button>
          <button
            onClick={() => setActiveFilter('TOOL AUTOMATION')}
            className={`px-3 py-1 transition-colors cursor-pointer border ${
              activeFilter === 'TOOL AUTOMATION'
                ? 'bg-[#1b1c18] text-[#cef053] border-[#1b1c18] font-bold'
                : 'bg-[#ffffff] text-[#1b1c18] border-[#d8d7ce] hover:bg-[#f5f3ed]'
            }`}
          >
            Tool Automation ({RECRUITER_SKILL_GROUPS.flatMap(g => g.skills).filter(s => s.level === 'TOOL AUTOMATION').length})
          </button>
          <button
            onClick={() => setActiveFilter('THEORETICAL STUDY')}
            className={`px-3 py-1 transition-colors cursor-pointer border ${
              activeFilter === 'THEORETICAL STUDY'
                ? 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18] font-bold'
                : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce] hover:text-[#1b1c18]'
            }`}
          >
            Theoretical Study ({RECRUITER_SKILL_GROUPS.flatMap(g => g.skills).filter(s => s.level === 'THEORETICAL STUDY').length})
          </button>
        </div>
      </div>

      {/* Full-Width Vertically Organized Categories Stack */}
      <div className="divide-y divide-[#d8d7ce] w-full">
        {filteredGroups.map(({ group, groupIdx, categoryTitle, visibleSkills }) => (
          <section
            key={group.groupLetter}
            className="p-5 md:p-6 lg:p-7 space-y-4 md:space-y-5 transition-colors"
          >
            {/* Category Header Banner with Clear Hierarchy */}
            <div className="pb-3 border-b border-[#d8d7ce] space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1 bg-[#f5f3ed] border border-[#d8d7ce]">
                    {getGroupIcon(group.groupLetter)}
                  </div>
                  <h3 className="font-technical text-sm md:text-base font-bold text-[#1b1c18] uppercase tracking-wider">
                    {categoryTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2 font-technical text-[11px]">
                  <span className="text-[#757872] uppercase font-semibold hidden sm:inline">
                    {group.category}
                  </span>
                  <span className="text-[#c5c7c1] hidden sm:inline">·</span>
                  <span className="px-2 py-0.5 bg-[#f5f3ed] border border-[#d8d7ce] text-[#536600] font-bold">
                    {visibleSkills.length} {visibleSkills.length === 1 ? 'COMPETENCY' : 'COMPETENCIES'}
                  </span>
                </div>
              </div>

              {/* Explanatory Subtitle */}
              <p className="text-xs md:text-sm text-[#555850] font-sans leading-relaxed">
                {group.description}
              </p>
            </div>

            {/* Responsive 2-Column Card Grid (Desktop: 2 columns, Mobile: 1 column) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4 w-full">
              {visibleSkills.map((skill: RecruiterSkillItem, sIdx: number) => (
                <div
                  key={sIdx}
                  className="p-4 bg-[#fbf9f3] border border-[#d8d7ce] hover:border-[#1b1c18] transition-colors flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#eae8e2]">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-serif font-bold text-sm md:text-base text-[#1b1c18] truncate">
                          {skill.name}
                        </span>
                        <span className="text-[#c5c7c1] text-xs">·</span>
                        <span className="font-technical text-[11px] text-[#757872] truncate">
                          {skill.toolOrContext}
                        </span>
                      </div>
                      {getLevelBadge(skill.level)}
                    </div>

                    {/* Technical Description with Natural Height */}
                    <p className="text-xs md:text-sm font-sans text-[#454843] mt-2.5 leading-relaxed">
                      {skill.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredGroups.length === 0 && (
          <div className="p-8 text-center text-xs font-technical text-[#757872]">
            No competencies match the selected filter. Click &ldquo;All Competencies&rdquo; to reset.
          </div>
        )}
      </div>

      {/* Recruiter Guarantee Banner */}
      <div className="p-4 bg-[#fbf9f3] border-t border-[#d8d7ce] flex flex-wrap items-center justify-between gap-3 text-xs font-technical">
        <div className="flex items-center gap-2 text-[#454843]">
          <ShieldCheck className="w-4 h-4 text-[#536600] shrink-0" />
          <span>
            <strong>Authenticity Note:</strong> Every listed skill was executed on official Cadence licenses at Sumedha IT or verified through B.Tech ECE coursework.
          </span>
        </div>
        <div className="text-[11px] text-[#536600] font-bold uppercase">
          READY FOR TECHNICAL INTERVIEW INQUIRY
        </div>
      </div>
    </div>
  );
};
