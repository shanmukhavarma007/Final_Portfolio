import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onOpenSpecsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onOpenSpecsModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: '01 / Overview' },
    { id: 'cva6-placement', label: '02 / CVA6 Placement' },
    { id: 'case-studies', label: '03 / Case Studies' },
    { id: 'projects', label: '04 / Projects' },
    { id: 'journal', label: '05 / Engineering' }
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f3]/95 backdrop-blur-sm border-b border-[#d8d7ce] w-full transition-colors">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-10 2xl:px-12 h-16 flex items-center justify-between gap-2 lg:gap-4 xl:gap-6 min-w-0">
        {/* Zone 1: Brand Wordmark (Aligned to the left, no shrink) */}
        <button
          onClick={() => handleNavClick('overview')}
          className="text-left group flex items-center gap-2 sm:gap-2.5 shrink-0 cursor-pointer focus:outline-none min-w-0"
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="w-2.5 h-2.5 bg-[#1b1c18] group-hover:bg-[#b7d83d] transition-colors shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-base sm:text-lg xl:text-xl font-medium tracking-tight text-[#1b1c18] group-hover:text-black whitespace-nowrap">
              Silicon Observatory
            </span>
            <span className="font-technical text-[9px] sm:text-[10px] text-[#757872] tracking-wider uppercase -mt-0.5 hidden xl:inline">
              ASIC Physical Design Journal
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Desktop: >=1024px, centered, flexible intelligent gaps, no overlap) */}
        <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-4 2xl:gap-7 text-[11px] xl:text-xs font-technical uppercase text-[#757872] min-w-0 flex-1 px-1 xl:px-2">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative whitespace-nowrap py-2 px-2 cursor-pointer focus:outline-none shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#1b1c18] font-bold'
                    : 'hover:text-[#1b1c18]'
                }`}
              >
                <span>
                  {item.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="header-active-nav-line"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1b1c18]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: CTA Button (Aligned to the right, fully visible, never overlapping) + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenSpecsModal}
            className="group px-2.5 sm:px-3 lg:px-3.5 xl:px-4 py-1.5 sm:py-2 bg-[#1b1c18] hover:bg-[#2c3029] active:bg-[#1b1c18] text-[#fbf9f3] hover:text-[#cef053] font-technical text-[10px] sm:text-[11px] xl:text-xs uppercase tracking-wider transition-all border border-[#1b1c18] hover:border-[#b7d83d] whitespace-nowrap cursor-pointer shadow-none shrink-0 flex items-center gap-1.5"
          >
            <span>[ PROJECT EVIDENCE ]</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Compact Hamburger Toggle for Tablet & Mobile (<1024px) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-1.5 sm:p-2 border border-[#1b1c18] bg-[#ffffff] hover:bg-[#eae8e2] text-[#1b1c18] cursor-pointer flex items-center justify-center transition-colors shrink-0"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Menu className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Dropdown Navigation Menu with smooth AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-[#d8d7ce] bg-[#fbf9f3] shadow-md overflow-hidden"
          >
            <div className="max-w-[1440px] mx-auto px-4 py-3 divide-y divide-[#d8d7ce] text-xs font-technical uppercase">
              {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-2.5 text-left flex items-center justify-between cursor-pointer transition-colors ${
                      isActive
                        ? 'text-[#1b1c18] font-bold bg-[#f5f3ed] px-2'
                        : 'text-[#757872] hover:text-[#1b1c18] px-2'
                    }`}
                  >
                    <span>
                      {item.label}
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-[#536600] font-bold">[ACTIVE]</span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 pb-1 px-2 flex justify-between items-center text-[11px] text-[#757872]">
                <span>SILICON OBSERVATORY // EVIDENCE ARCHIVE</span>
                <button
                  onClick={() => {
                    onOpenSpecsModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[#1b1c18] font-bold underline cursor-pointer"
                >
                  [ VIEW PROJECT EVIDENCE ]
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
