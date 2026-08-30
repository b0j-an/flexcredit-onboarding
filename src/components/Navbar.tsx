import React from 'react';
import { Volume2, VolumeX, Printer, Download, Sparkles } from 'lucide-react';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  onPrint,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#003A53]/95 backdrop-blur-md border-b border-cyan-500/20 text-white shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
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
                Onboarding Prezentacija
              </span>
            </div>
          </div>

          <span className="hidden sm:inline-block h-4 w-px bg-white/20 ml-2" />
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-green/15 text-brand-green border border-brand-green/30">
            <Sparkles className="w-3 h-3" />
            2026 Integracija
          </span>
        </div>

        {/* Right: Actions (Download PDF, Sound Toggle, Print) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Download PDF Button */}
          <a
            href="/FlexCredit-Dobrodoslica.pdf"
            download="FlexCredit-Dobrodoslica.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-green to-emerald-500 text-[#002B3D] font-black text-xs sm:text-sm shadow-md hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Preuzmi prezentaciju u PDF formatu"
          >
            <Download className="w-4 h-4 text-[#002B3D]" />
            <span className="font-display tracking-tight">Preuzmi PDF</span>
          </a>

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

          {/* Print / Save Trigger */}
          <button
            onClick={onPrint}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white text-xs transition-colors hidden sm:flex"
            title="Štampaj / Snimi kao PDF"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};

