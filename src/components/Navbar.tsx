import React from 'react';
import { Presentation, LayoutDashboard, UserCheck, Volume2, VolumeX, Printer, Sparkles } from 'lucide-react';
import { EmployeeProfile } from '../types';

interface NavbarProps {
  currentView: 'presentation' | 'portal';
  onViewChange: (view: 'presentation' | 'portal') => void;
  profile: EmployeeProfile;
  onOpenCustomizer: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  profile,
  onOpenCustomizer,
  soundEnabled,
  onToggleSound,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#003A53]/95 backdrop-blur-md border-b border-cyan-500/20 text-white shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('portal')}>
          <div className="flex items-center gap-2">
            <img 
              src="/assets/branding/flexcredit-symbol.png" 
              alt="Flex Credit Symbol" 
              className="h-8 w-auto object-contain brightness-110 drop-shadow-sm" 
            />
            <div>
              <span className="font-display font-black text-xl tracking-tight text-white flex items-center gap-1">
                FLEX<span className="text-brand-green">CREDIT</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-brand-cyan block font-semibold -mt-1">
                Onboarding Hub
              </span>
            </div>
          </div>

          <span className="hidden sm:inline-block h-4 w-px bg-white/20 ml-2" />
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-green/15 text-brand-green border border-brand-green/30">
            <Sparkles className="w-3 h-3" />
            2026 Integracija
          </span>
        </div>

        {/* Center: View Mode Switcher */}
        <div className="flex items-center bg-[#00283A] p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => onViewChange('portal')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ${
              currentView === 'portal'
                ? 'bg-gradient-to-r from-brand-cyan to-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">Portal Hub</span>
            <span className="sm:hidden">Hub</span>
          </button>

          <button
            onClick={() => onViewChange('presentation')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 ${
              currentView === 'presentation'
                ? 'bg-gradient-to-r from-brand-green to-emerald-600 text-[#00283A] shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span className="hidden sm:inline">Slajd Prezentacija</span>
            <span className="sm:hidden">Slajdovi</span>
            <span className="hidden lg:inline-flex px-1.5 py-0.2 text-[10px] bg-black/20 rounded-full ml-1">
              18
            </span>
          </button>
        </div>

        {/* Right: Controls & Personalization */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Employee Active Badge / Customizer Trigger */}
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-white transition-all group hover:border-brand-green/50"
            title="Prilagodi zaposlenog i mentora"
          >
            <div className="w-6 h-6 rounded-full bg-brand-green/20 border border-brand-green flex items-center justify-center text-brand-green group-hover:scale-110 transition-transform">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-[10px] text-brand-cyan leading-none font-medium">Zaposleni</div>
              <div className="text-xs font-bold leading-tight truncate max-w-[120px]">{profile.name}</div>
            </div>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              soundEnabled
                ? 'bg-brand-cyan/20 border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/30'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
            title={soundEnabled ? 'Isključi zvučne efekte' : 'Uključi zvučne efekte'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Print / PDF Trigger */}
          <button
            onClick={onPrint}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white text-xs transition-colors"
            title="Štampaj / Snimi kao PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
