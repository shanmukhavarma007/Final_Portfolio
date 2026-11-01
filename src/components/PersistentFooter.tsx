import React from 'react';
import { ENGINEER_PROFILE } from '../data/portfolioData';
import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { GitHubStatus } from './GitHubStatus';

interface PersistentFooterProps {
  onOpenSpecsModal: () => void;
  onNavigate: (view: string) => void;
}

export const PersistentFooter: React.FC<PersistentFooterProps> = ({
  onOpenSpecsModal,
  onNavigate
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#171a18] text-[#fbf9f3] border-t border-[#333833] mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#333833]">
          {/* Brand & Mission Ledger */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-[#cef053]" />
              <span className="font-serif text-xl md:text-2xl font-normal tracking-tight text-[#fbf9f3]">
                Silicon Observatory
              </span>
            </div>
            <p className="font-sans text-xs md:text-sm text-[#82857d] leading-relaxed max-w-md">
              ASIC Physical Design portfolio of Shanmukha Varma Penmetsa (B.Tech ECE, Vignan's Institute of Information Technology, 2022–2026), documenting hands-on training from Sumedha IT in Cadence Genus and Cadence Innovus.
            </p>
            <div className="pt-2 font-technical text-xs text-[#cef053]">
              EDA: CADENCE GENUS & CADENCE INNOVUS
            </div>
          </div>

          {/* Quick Navigation Coordinates */}
          <div className="md:col-span-3 space-y-2 font-technical text-xs">
            <div className="text-[#82857d] uppercase text-[11px] font-bold border-b border-[#333833] pb-1 mb-2">
              SECTIONS
            </div>
            <div>
              <button
                onClick={() => onNavigate('overview')}
                className="text-[#c5c7be] hover:text-[#cef053] transition-colors cursor-pointer block py-1"
              >
                01 / Overview
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('cva6-placement')}
                className="text-[#c5c7be] hover:text-[#cef053] transition-colors cursor-pointer block py-1"
              >
                02 / CVA6 Placement
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('cts-handoff')}
                className="text-[#c5c7be] hover:text-[#cef053] transition-colors cursor-pointer block py-1"
              >
                03 / CTS Handoff
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('projects')}
                className="text-[#c5c7be] hover:text-[#cef053] transition-colors cursor-pointer block py-1"
              >
                04 / Projects
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('journal')}
                className="text-[#c5c7be] hover:text-[#cef053] transition-colors cursor-pointer block py-1"
              >
                05 / Engineering
              </button>
            </div>
          </div>

          {/* Direct Communication & Dossier Download */}
          <div className="md:col-span-4 space-y-3.5 font-technical text-xs">
            <div className="text-[#82857d] uppercase text-[11px] font-bold border-b border-[#333833] pb-1 mb-2">
              06 // CONTACT & COMMUNICATION
            </div>
            <p className="text-[#82857d] text-[11px] leading-relaxed">
              Available for ASIC Physical Design, Floorplanning, and Timing Signoff engineering roles.
            </p>

            {/* Verified Contact Details with Hover Transitions */}
            <div className="space-y-2 pt-0.5">
              <div>
                <motion.a
                  whileHover={{ x: 2 }}
                  href="mailto:psvarma.e@gmail.com"
                  className="group inline-flex items-center gap-2 text-[#fbf9f3] hover:text-[#cef053] font-bold transition-colors break-all"
                  aria-label="Send email to psvarma.e@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5 text-[#cef053] shrink-0" />
                  <span className="underline underline-offset-2">psvarma.e@gmail.com</span>
                </motion.a>
              </div>

              {/* LinkedIn & GitHub Links */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <motion.a
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.linkedin.com/in/shanmukhavarma-penmetsa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1e221f] hover:bg-[#252a26] text-[#c5c7be] hover:text-[#cef053] border border-[#333833] hover:border-[#cef053] transition-colors text-[11px] font-semibold"
                  aria-label="Shanmukha Varma LinkedIn profile (opens in new tab)"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#cef053] shrink-0" />
                  <span>LINKEDIN</span>
                </motion.a>

                <motion.a
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://github.com/shanmukhavarma007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1e221f] hover:bg-[#252a26] text-[#c5c7be] hover:text-[#cef053] border border-[#333833] hover:border-[#cef053] transition-colors text-[11px] font-semibold"
                  aria-label="Shanmukha Varma GitHub profile (opens in new tab)"
                >
                  <Github className="w-3.5 h-3.5 text-[#cef053] shrink-0" />
                  <span>GITHUB</span>
                </motion.a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenSpecsModal}
                className="px-3 py-1.5 bg-[#252a26] hover:bg-[#333833] text-[#fbf9f3] hover:text-[#cef053] border border-[#454843] hover:border-[#cef053] font-technical text-xs uppercase cursor-pointer transition-colors"
              >
                [ VIEW CANDIDATE PROFILE ] &rarr;
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToTop}
                className="px-3 py-1.5 bg-[#171a18] hover:bg-[#252a26] text-[#82857d] hover:text-[#fbf9f3] border border-[#333833] font-technical text-xs uppercase flex items-center gap-1 cursor-pointer transition-colors"
                aria-label="Scroll to top of page"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>TOP</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Live GitHub Public Repository Telemetry */}
        <div className="pt-10 pb-4 border-b border-[#333833]">
          <GitHubStatus />
        </div>

        {/* Bottom Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-technical text-[#82857d]">
          <div>
            &copy; {new Date().getFullYear()} Shanmukha Varma Penmetsa · Strictly verified education, training, and project work.
          </div>
          <div className="text-[11px]">
            SILICON OBSERVATORY // ENTRY-LEVEL ASIC PHYSICAL DESIGN
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
