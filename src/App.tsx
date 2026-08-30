import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SlideDeck } from './components/SlideDeck';
import { defaultProfile } from './data/onboardingData';
import { Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F7F4F0] flex flex-col selection:bg-brand-green selection:text-brand-petrol">
      
      {/* Navigation */}
      <Navbar
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
        onPrint={handlePrint}
      />

      {/* Main Content Area — Pure Presentation */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 w-full flex flex-col justify-center">
        <SlideDeck
          profile={defaultProfile}
          soundEnabled={soundEnabled}
        />
      </main>

      {/* Footer */}
      <footer className="bg-[#002434] text-slate-400 text-xs py-8 border-t border-cyan-500/20 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/branding/flexcredit-symbol.png" 
              alt="Flex Credit" 
              className="h-7 w-auto object-contain brightness-110" 
            />
            <div>
              <span className="font-display font-bold text-white text-sm">
                FLEX<span className="text-brand-green">CREDIT</span>
              </span>
              <span className="text-[10px] block text-brand-cyan">
                Dio MVF Finance grupacije · Novac za sve
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400 text-xs">
            <span>61 filijala u RS</span>
            <span>•</span>
            <span>230 zaposlenih</span>
            <span>•</span>
            <span>Onboarding Prezentacija 2026</span>
          </div>

          <div className="text-slate-500 text-[11px] flex items-center gap-1">
            <span>Kreirano sa pažnjom za nove članove tima</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
          </div>
        </div>
      </footer>

    </div>
  );
};

