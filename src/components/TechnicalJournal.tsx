import React, { useState } from 'react';
import { TECHNICAL_LEARNING_TOPICS, TechnicalTopic, TechnicalStatus } from '../data/portfolioData';
import { BookOpen, CheckCircle2, Clock, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const TechnicalJournal: React.FC = () => {
  const [filter, setFilter] = useState<TechnicalStatus | 'ALL'>('ALL');
  const [expandedTopicId, setExpandedTopicId] = useState<string>('topic-01');

  const toggleTopic = (id: string) => {
    setExpandedTopicId(prev => (prev === id ? '' : id));
  };

  const filteredTopics = TECHNICAL_LEARNING_TOPICS.filter(t => {
    if (filter === 'ALL') return true;
    return t.status === filter;
  });

  return (
    <div className="border border-[#d8d7ce] bg-[#ffffff]">
      {/* Header Ledger */}
      <div className="p-5 bg-[#f5f3ed] border-b border-[#d8d7ce]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-technical text-xs text-[#757872] uppercase tracking-wider">
              <span className="font-bold text-[#1b1c18] text-sm">05 // ENGINEERING</span>
              <span className="text-[#c5c7c1]">·</span>
              <span className="text-[#536600] font-bold">CURRICULUM & KNOWLEDGE LEDGER</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#1b1c18] font-normal mt-1">
              ASIC Physical Design Technical Insights
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#ffffff] border border-[#d8d7ce] text-xs font-technical">
            <ShieldCheck className="w-4 h-4 text-[#536600]" />
            <span className="font-bold text-[#1b1c18] uppercase">
              FACTUAL INTEGRITY VERIFIED
            </span>
          </div>
        </div>

        <p className="font-sans text-xs md:text-sm text-[#454843] mt-2 max-w-4xl leading-relaxed">
          In strict adherence to factual engineering authenticity, all fabricated articles and fictional post-mortems have been eliminated. This section categorizes knowledge into three uncompromised categories: completed hands-on implementation, theoretical concepts studied, and planned future milestones.
        </p>

        {/* 3-Category Filter Strip */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs font-technical">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 uppercase transition-colors cursor-pointer border ${
              filter === 'ALL'
                ? 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18] font-bold'
                : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce] hover:text-[#1b1c18]'
            }`}
          >
            All Topics ({TECHNICAL_LEARNING_TOPICS.length})
          </button>
          <button
            onClick={() => setFilter('COMPLETED')}
            className={`px-3 py-1.5 uppercase transition-colors cursor-pointer border ${
              filter === 'COMPLETED'
                ? 'bg-[#1b1c18] text-[#cef053] border-[#1b1c18] font-bold'
                : 'bg-[#ffffff] text-[#536600] border-[#d8d7ce] hover:bg-[#f5f3ed]'
            }`}
          >
            Completed (Hands-On)
          </button>
          <button
            onClick={() => setFilter('THEORETICAL_STUDY')}
            className={`px-3 py-1.5 uppercase transition-colors cursor-pointer border ${
              filter === 'THEORETICAL_STUDY'
                ? 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18] font-bold'
                : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce] hover:text-[#1b1c18]'
            }`}
          >
            Studied (Theory)
          </button>
          <button
            onClick={() => setFilter('PLANNED_NOT_STARTED')}
            className={`px-3 py-1.5 uppercase transition-colors cursor-pointer border ${
              filter === 'PLANNED_NOT_STARTED'
                ? 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18] font-bold'
                : 'bg-[#ffffff] text-[#757872] border-[#d8d7ce] hover:text-[#1b1c18]'
            }`}
          >
            Planned / Not Started
          </button>
        </div>
      </div>

      {/* Topics Stack */}
      <div className="divide-y divide-[#d8d7ce]">
        {filteredTopics.map((topic: TechnicalTopic) => {
          const isExpanded = expandedTopicId === topic.id;

          return (
            <div key={topic.id} className="transition-colors">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none ${
                  isExpanded ? 'bg-[#fbf9f3]' : 'hover:bg-[#f5f3ed]'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-technical text-xs">
                    <span className="text-[#757872]">{topic.index}</span>
                    <span className="text-[#c5c7c1]">·</span>
                    <span className="text-[#1b1c18] font-bold">{topic.category}</span>
                    <span className="text-[#c5c7c1]">·</span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold border ${
                        topic.status === 'COMPLETED'
                          ? 'bg-[#e9e7df] text-[#536600] border-[#d8d7ce]'
                          : topic.status === 'THEORETICAL_STUDY'
                          ? 'bg-[#f5f3ed] text-[#757872] border-[#d8d7ce]'
                          : 'bg-[#1b1c18] text-[#fbf9f3] border-[#1b1c18]'
                      }`}
                    >
                      {topic.statusLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg md:text-xl text-[#1b1c18] font-medium mt-1.5 leading-snug">
                    {topic.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-[#454843] mt-1.5 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div className="shrink-0 p-1.5 bg-[#ffffff] border border-[#d8d7ce] text-[#1b1c18] mt-1">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Expanded Topic Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 bg-[#fbf9f3] border-t border-[#d8d7ce]">
                  <div className="p-3 bg-[#ffffff] border border-[#d8d7ce] text-xs font-technical space-y-2">
                    <div className="flex justify-between items-center text-[#757872] border-b border-[#eae8e2] pb-1.5">
                      <span>SCOPE & VERIFICATION STATUS:</span>
                      <span className="text-[#1b1c18] font-bold">{topic.statusLabel}</span>
                    </div>
                    <p className="text-[#454843] leading-relaxed">
                      {topic.scopeSummary}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State Guard if Filter Has No Results */}
      {filteredTopics.length === 0 && (
        <div className="p-8 text-center text-xs font-technical text-[#757872]">
          No items found in this classification.
        </div>
      )}

      {/* Bottom Integrity Notice */}
      <div className="p-4 bg-[#f0eee8] border-t border-[#d8d7ce] text-xs font-technical text-[#454843]">
        <span className="font-bold text-[#1b1c18]">CURRICULUM SOURCE: </span>
        B.Tech ECE curriculum at Vignan's Institute of Information Technology & hands-on ASIC Physical Design training at Sumedha IT.
      </div>
    </div>
  );
};
