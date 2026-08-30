import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SlideDeck } from './components/SlideDeck';
import { PortalView } from './components/PortalView';
import { PersonalizationModal } from './components/PersonalizationModal';
import { defaultProfile } from './data/onboardingData';
import { EmployeeProfile } from './types';
import { playSound } from './utils/audio';
import { LayoutDashboard, Presentation, Sparkles, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'portal' | 'presentation'>('portal');
  const [profile, setProfile] = useState<EmployeeProfile>(defaultProfile);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleViewChange = (view: 'portal' | 'presentation') => {
    setCurrentView(view);
    playSound('slide', soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProfile = (updated: EmployeeProfile) => {
    setProfile(updated);
    playSound('success', soundEnabled);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F7F4F0] flex flex-col selection:bg-brand-green selection:text-brand-petrol">
      
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={handleViewChange}
        profile={profile}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(prev => !prev)}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        {currentView === 'presentation' ? (
          <SlideDeck
            profile={profile}
            soundEnabled={soundEnabled}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
          />
        ) : (
          <PortalView
            profile={profile}
            onStartPresentation={() => handleViewChange('presentation')}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#002434] text-slate-400 text-xs py-10 border-t border-cyan-500/20 no-print mt-16">
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
            <span>Onboarding Platforma 2026</span>
          </div>

          <div className="text-slate-500 text-[11px] flex items-center gap-1">
            <span>Kreirano sa pažnjom za nove članove tima</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
          </div>
        </div>
      </footer>

      {/* HR Personalization Modal */}
      <PersonalizationModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

    </div>
  );
};
