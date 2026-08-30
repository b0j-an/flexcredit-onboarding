import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Maximize2, Minimize2, Grid, Sparkles, 
  Layers, Volume2, VolumeX, HelpCircle, ArrowRight, UserCheck, Trophy, Store,
  Building2, Users, Target, ShieldCheck, HeartHandshake, Eye, CheckCircle2,
  Calendar, MapPin, Compass, Briefcase, Award, TrendingUp, Lightbulb, Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  managementTeam, companyMetrics, salesRegions, strategicGoals, 
  integrationSteps, companyValues, employeeBenefits, allColleagues 
} from '../data/onboardingData';
import { playSound } from '../utils/audio';
import { BihSalesMap } from './BihSalesMap';
import { OrgChartOrbit } from './OrgChartOrbit';

const goalIcons: Record<string, string> = {
  geo: '/assets/illustrations/goal-geographic-expansion.jpg',
  channels: '/assets/illustrations/goal-sales-channels.png',
  products: '/assets/illustrations/goal-product-development.jpg',
  marketing: '/assets/illustrations/goal-marketing-support.png',
  optimization: '/assets/illustrations/goal-process-optimization.jpg',
  performance: '/assets/illustrations/goal-performance-management.jpg',
};

const benefitIcons: string[] = [
  '/assets/illustrations/benefit-professional-growth.png',
  '/assets/illustrations/benefit-colleague-support.png',
  '/assets/illustrations/benefit-career-advancement.png',
  '/assets/illustrations/benefit-team-celebrations.png',
  '/assets/illustrations/benefit-recognition-reward.png',
];

interface SlideDeckProps {
  soundEnabled: boolean;
  onToggleSound?: () => void;
}

export const SlideDeck: React.FC<SlideDeckProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [activeMgmtIndex, setActiveMgmtIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalSlides = 18;

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(prev => prev + 1);
      playSound('slide', soundEnabled);
    }
  }, [currentSlide, totalSlides, soundEnabled]);

  const goToPrev = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide(prev => prev - 1);
      playSound('slide', soundEnabled);
    }
  }, [currentSlide, soundEnabled]);

  // Touch swipe support for mobile
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(totalSlides);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'g' || e.key === 'G') {
        setShowGrid(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, totalSlides]);

  // Confetti on last slide
  useEffect(() => {
    if (currentSlide === 18) {
      playSound('complete', soundEnabled);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8DC63F', '#1696D4', '#003A53', '#F79646']
      });
    }
  }, [currentSlide, soundEnabled]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const slideTitles = [
    'Dobrodošlica u tim',
    'Proces integracije u kompaniju',
    'Ko smo mi?',
    'Dio jake finansijske grupacije (MVF)',
    'Kompanija u brojevima',
    'Naše sjedište i ekspanzija',
    'Naši ljudi su naš brend (230 zaposlenih)',
    'Filozofija, misija i vrijednosti',
    'Prodajna mreža 2026. godine',
    'Strateški ciljevi za 2026.',
    'Organizaciona struktura',
    'Upoznaj kolege (47 saradnika)',
    'Menadžment Flex Credita',
    'Tvoji mentori i podrška',
    'Tvoja uloga u kompaniji',
    'Šta ti pruža Flex Credit?',
    'Po čemu smo jedinstveni?',
    'Radujemo se radu s tobom!'
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#002434] relative overflow-hidden select-none">
      
      {/* Slide Header Toolbar */}
      <div className="px-4 sm:px-6 py-2.5 bg-[#001D2B]/95 border-b border-white/10 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/branding/flexcredit-symbol.png" 
              alt="Logo" 
              className="h-6 w-auto object-contain brightness-110" 
            />
            <span className="font-display font-black text-sm tracking-tight text-white hidden sm:inline">
              FLEX<span className="text-brand-green">CREDIT</span>
            </span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Slajd {currentSlide} / {totalSlides} · <span className="text-brand-green">{slideTitles[currentSlide - 1]}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Navigation Arrows */}
          <div className="flex md:hidden items-center gap-1 border-r border-white/10 pr-1.5">
            <button
              onClick={goToPrev}
              disabled={currentSlide === 1}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                currentSlide === 1 ? 'opacity-30 text-slate-500' : 'bg-white/10 text-white active:bg-white/20'
              }`}
              title="Prethodni slajd"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentSlide === totalSlides}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                currentSlide === totalSlides ? 'opacity-30 text-slate-500' : 'bg-brand-green text-[#002B3D] font-bold active:brightness-110'
              }`}
              title="Sljedeći slajd"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download PDF Button */}
          <a
            href="/FlexCredit-Dobrodoslica.pdf"
            download="FlexCredit-Dobrodoslica.pdf"
            className="px-2.5 sm:px-3 py-1 rounded-lg bg-gradient-to-r from-brand-green to-emerald-500 hover:brightness-110 text-[#002B3D] text-xs font-black flex items-center gap-1.5 shadow-sm transition-all"
            title="Preuzmi prezentaciju kao PDF"
          >
            <Download className="w-3.5 h-3.5 text-[#002B3D]" />
            <span className="hidden sm:inline">Preuzmi PDF</span>
          </a>

          {/* Sound Toggle */}
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                soundEnabled
                  ? 'bg-white/10 text-brand-cyan hover:bg-white/20'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
              title={soundEnabled ? 'Isključi zvučne efekte' : 'Uključi zvučne efekte'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          )}

          {/* Grid Overview Button */}
          <button
            onClick={() => setShowGrid(prev => !prev)}
            className={`p-1.5 rounded-lg text-xs transition-colors ${
              showGrid ? 'bg-brand-green text-[#002B3D]' : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
            title="Pregled svih slajdova (G)"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 transition-colors"
            title="Cijeli ekran (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide Content Area with Floating Navigation Arrows */}
      <div
        className="flex-1 relative overflow-hidden flex items-center justify-center p-2 sm:p-6 text-white w-full max-w-6xl mx-auto min-h-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Large Floating Left Navigation Arrow (Desktop/Tablet) */}
        {currentSlide > 1 && (
          <button
            onClick={goToPrev}
            className="hidden md:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-2xl bg-[#001D2B]/90 hover:bg-brand-cyan text-slate-300 hover:text-[#002B3D] border border-white/15 backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-110 group items-center justify-center"
            title="Prethodni slajd (←)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Large Floating Right Navigation Arrow (Desktop/Tablet) */}
        {currentSlide < totalSlides && (
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-2xl bg-brand-green hover:bg-brand-green text-[#002B3D] border border-brand-green/40 backdrop-blur-md shadow-glow-green transition-all duration-200 hover:scale-110 group items-center justify-center"
            title="Sljedeći slajd (→ ili Space)"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Slide Stage */}
        <div className="w-full h-full flex flex-col justify-center animate-fade-in relative z-10 px-4 sm:px-16 md:px-24 lg:px-28 min-h-0 overflow-hidden">
              
              {/* SLIDE 1: Welcome Hero */}
              {currentSlide === 1 && (
                <div className="h-full flex flex-col justify-between py-4">
                  <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/40 text-xs font-bold uppercase tracking-widest">
                      <Sparkles className="w-4 h-4" />
                      Onboarding Prezentacija
                    </div>
                    
                    <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
                      DOBRODOŠLI U
                      <span className="text-brand-green block mt-1">FLEX CREDIT TIM!</span>
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed">
                      Pred vama je sveobuhvatni vodič kroz kompaniju, vrijednosti, organizacionu strukturu, prodajnu mrežu i ključne ciljeve za 2026. godinu.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="font-bold text-white">Dio MVF Finance grupacije</span>
                      <span>•</span>
                      <span>61 filijala</span>
                      <span>•</span>
                      <span>230 zaposlenih</span>
                    </div>

                    <button
                      onClick={goToNext}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-green to-emerald-500 hover:brightness-110 text-[#002B3D] text-sm font-black shadow-lg hover:shadow-glow-green transition-all flex items-center gap-2"
                    >
                      <span>Započni prezentaciju</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Integration Process */}
              {currentSlide === 2 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div>
                    <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Struktura programa</span>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mt-0.5">
                      PROCES INTEGRACIJE U KOMPANIJU
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto items-center">
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                      {integrationSteps.map((step) => (
                        <div
                          key={step.step}
                          className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:border-brand-green/50 group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-6 h-6 rounded-lg bg-brand-green text-[#002B3D] font-black text-xs flex items-center justify-center">
                              {step.step}
                            </span>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Korak {step.step}</span>
                          </div>
                          <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-green transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="hidden lg:flex lg:col-span-4 justify-center">
                      <img
                        src="/assets/illustrations/integration-process-shake.png"
                        alt="Dobrodošlica i rukovanje pri integraciji"
                        className="max-h-64 w-auto object-contain drop-shadow-glow-cyan"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green" />
                    <span>Svaki korak vodi te ka potpunoj samostalnosti i uspjehu u radu.</span>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Who We Are */}
              {currentSlide === 3 && (
                <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Tržišna pozicija</span>
                      <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mt-1">
                        KO SMO MI?
                      </h2>
                    </div>

                    <div className="space-y-3.5">
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4 hover:border-brand-green transition-all">
                        <div className="w-10 h-10 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center font-bold flex-shrink-0">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-base text-white">Najbrže rastuća kompanija u industriji</h4>
                          <p className="text-xs text-slate-300">Kontinuirana ekspanzija i inovativan pristup finansijskim uslugama.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4 hover:border-brand-cyan transition-all">
                        <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold flex-shrink-0">
                          <Store className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-base text-white">Prva mikrokreditna organizacija u RS po broju filijala</h4>
                          <p className="text-xs text-slate-300">Najveća fizička dostupnost klijentima širom svih regija.</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4 hover:border-amber-400 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-base text-white">Druga mikrokreditna organizacija u RS po broju zaposlenih</h4>
                          <p className="text-xs text-slate-300">Tim od 230+ stručnjaka koji pokreću uspjeh kompanije.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <img
                      src="/assets/illustrations/planning-clock-board.png"
                      alt="FlexCredit growth"
                      className="max-h-72 w-auto object-contain rounded-2xl shadow-xl drop-shadow-glow-cyan"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 4: Financial Group (MVF) */}
              {currentSlide === 4 && (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-6 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-brand-cyan">
                    <ShieldCheck className="w-4 h-4" />
                    Međunarodna Finansijska Stabilnost
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
                    Uz sve ovo, dio smo <span className="text-brand-green">jake finansijske grupacije!</span>
                  </h2>

                  <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center space-y-4">
                    <img
                      src="/assets/branding/mvf-finance-logo.png"
                      alt="MVF Finance"
                      className="h-16 w-auto object-contain brightness-125"
                    />
                    <div className="h-px w-24 bg-white/20" />
                    <p className="text-xs sm:text-sm text-slate-200 max-w-md">
                      Pripadnost renomiranoj grupaciji <strong>MVF Finance</strong> obezbjeđuje kompaniji stabilan kapital, najviše standarde upravljanja rizicima i međunarodno iskustvo.
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 5: Numbers / Metrics */}
              {currentSlide === 5 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div>
                    <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Rezultati i doseg</span>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mt-0.5">
                      AKO SE PREDSTAVLJAMO U BROJEVIMA...
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 my-auto">
                    {companyMetrics.map((metric) => (
                      <div
                        key={metric.id}
                        className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all hover:border-brand-green/60 flex flex-col justify-between"
                      >
                        <span className="text-[10px] text-slate-300 font-semibold uppercase">{metric.label}</span>
                        <div className="font-display font-black text-3xl sm:text-4xl text-brand-green my-1">
                          {metric.value}
                        </div>
                        <p className="text-xs text-slate-300">{metric.sub}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-300">
                    <span>Portfolio brendova: <strong className="text-brand-green">Flex Credit</strong> i <strong className="text-brand-cyan">Uzmi novac</strong></span>
                    <span className="text-brand-green font-bold">2026. Lider</span>
                  </div>
                </div>
              )}

              {/* SLIDE 6: Headquarters / New Office */}
              {currentSlide === 6 && (
                <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Ekspanzija</span>
                    <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
                      ... A NAŠE SJEDIŠTE?
                    </h2>
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-3">
                      <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                        Za godinu dana smo ga prerasli, te su se <strong className="text-brand-green">Kontakt centar</strong> i <strong className="text-brand-cyan">Kreditni odjel</strong> preselili u nove, prostrane kancelarije.
                      </p>
                      <p className="text-xs text-slate-400">
                        Moderno opremljen poslovni prostor pruža vrhunske uslove rada, tehnološku infrastrukturu i prostor za timski rast.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex justify-center">
                    <img
                      src="/assets/office/flexcredit-headquarters-building.png"
                      alt="Sjedište Flex Credit"
                      className="max-h-72 w-auto object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 7: Our People are Our Brand */}
              {currentSlide === 7 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Kompanijska kultura</span>
                      <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                        IPAK... NAŠI LJUDI SU NAŠ BREND!
                      </h2>
                    </div>
                    <div className="bg-brand-green/20 border border-brand-green/40 px-4 py-1.5 rounded-2xl text-right">
                      <div className="text-[10px] text-brand-green uppercase font-bold">Trenutno zaposlenih</div>
                      <div className="text-2xl font-black text-white">230</div>
                    </div>
                  </div>

                  <div className="my-auto relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 max-h-72">
                    <img
                      src="/assets/office/flexcredit-all-employees-team.jpg"
                      alt="Flex Credit tim 230 zaposlenih"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-xs text-slate-300 text-center">
                    Naša snaga leži u međusobnom povjerenju, podršci i pozitivnoj energiji tima.
                  </p>
                </div>
              )}

              {/* SLIDE 8: Philosophy, Mission & Values */}
              {currentSlide === 8 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div>
                    <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Naši principi</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                      FILOZOFIJA, CILJ, MISIJA I VRIJEDNOSTI
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-auto items-center">
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Mission & Purpose */}
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2.5">
                        <div className="text-xs font-bold text-brand-green uppercase">Misija i Filozofija</div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          Cijenimo svaki minut vremena naših klijenata, stoga im obezbjeđujemo potrebna sredstva za kratko vrijeme, bez komplikovanih procedura.
                        </p>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Nudeći inovativne finansijske usluge, cilj nam je obezbijediti finansijsku stabilnost svakom klijentu uz dostupnost proizvoda prilagođenih socijalnom statusu.
                        </p>
                      </div>

                      {/* 4 Values */}
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                        <div className="text-xs font-bold text-brand-cyan uppercase">Vrijednosti koje njegujemo</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {companyValues.map((val, idx) => (
                            <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/10">
                              <span className="font-bold text-white block">• {val.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:flex lg:col-span-4 justify-center">
                      <img
                        src="/assets/illustrations/philosophy-growth-stairs.png"
                        alt="Filozofija rasta i napretka"
                        className="max-h-64 xl:max-h-72 w-auto object-contain drop-shadow-glow-cyan"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 text-center">
                    Svaka odluka i usluga koju pružamo utemeljena je u ovim načelima.
                  </div>
                </div>
              )}

              {/* SLIDE 9: Sales Network 2026 */}
              {currentSlide === 9 && (
                <div className="h-full flex flex-col justify-between py-1 sm:py-2">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Regionalna pokrivenost</span>
                    <h2 className="text-xl sm:text-3xl font-display font-black text-white tracking-tight">
                      PRODAJNA MREŽA 2026. GODINE
                    </h2>
                  </div>

                  <div className="flex items-center justify-center gap-2 flex-shrink-0">
                    <span className="text-xs font-black text-brand-green bg-brand-green/20 border border-brand-green/40 px-3 py-1 rounded-full">
                      61 Filijala
                    </span>
                    <span className="text-xs font-bold text-brand-cyan bg-white/10 px-3 py-1 rounded-full">
                      7 Regija
                    </span>
                  </div>

                  {/* Interactive Vector Map with City Hub Circles */}
                  <div className="flex-1 my-auto w-full min-h-0 flex items-center justify-center">
                    <BihSalesMap />
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between flex-shrink-0">
                    <span>Sinergija: <strong>61 filijala</strong> + <strong>67 Pošta RS lokacija</strong></span>
                    <span className="text-brand-green font-bold">Lider u Republici Srpskoj</span>
                  </div>
                </div>
              )}

              {/* SLIDE 10: Goals for 2026 */}
              {currentSlide === 10 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div>
                    <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Strateški plan</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                      CILJEVI ZA 2026. GODINU
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-auto">
                    {strategicGoals.map((goal) => (
                      <div
                        key={goal.id}
                        className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-center flex flex-col items-center justify-between"
                      >
                        <img
                          src={goalIcons[goal.id]}
                          alt={goal.title}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-brand-green/50 shadow-md"
                        />
                        <h4 className="font-display font-bold text-xs text-white my-1.5">{goal.title}</h4>
                        <p className="text-[10px] text-slate-300 leading-snug">{goal.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="h-1.5 w-full bg-gradient-to-r from-brand-green via-brand-cyan to-brand-green rounded-full" />
                </div>
              )}

              {/* SLIDE 11: Org Structure */}
              {currentSlide === 11 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Hijerarhija i Upravljanje</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                        ORGANIZACIONA STRUKTURA
                      </h2>
                    </div>
                    <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-brand-cyan">
                      8 Ključnih Sektora
                    </span>
                  </div>

                  {/* Animated single-page orbit diagram: Country Manager hub + 8 sectors */}
                  <div className="my-auto flex-1 min-h-0">
                    <OrgChartOrbit />
                  </div>

                  <div className="text-xs text-slate-300 flex items-center justify-between border-t border-white/10 pt-2">
                    <span>Organizaciona struktura i hijerarhija kompanije</span>
                    <span className="text-brand-green font-bold">Jasna struktura i odgovornost</span>
                  </div>
                </div>
              )}

              {/* SLIDE 12: Meet Colleagues */}
              {currentSlide === 12 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Tim i Povezanost</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                        UPOZNAJ KOLEGE
                      </h2>
                    </div>
                    <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-brand-green">
                      47 ključnih saradnika
                    </span>
                  </div>

                  {/* Highlights Grid of Key Departments & Contacts */}
                  <div className="my-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-left">
                    {/* HR Team Highlight */}
                    <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-brand-green/40 shadow-lg flex items-center gap-3.5">
                      <img src="/assets/team/aleksandra-antesevic.png" alt="Aleksandra" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-brand-green flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[9px] font-black text-brand-green uppercase">Ljudski Resursi</span>
                        <h4 className="text-sm sm:text-base font-display font-black text-white leading-tight">Aleksandra Antešević</h4>
                        <p className="text-[10px] text-slate-300 truncate mt-0.5">HR & Radni odnosi</p>
                      </div>
                    </div>

                    {/* HR Management Highlight */}
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-brand-cyan/40 flex items-center gap-3.5">
                      <img src="/assets/team/sanja-knezevic.png" alt="Sanja" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-brand-cyan flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[9px] font-black text-brand-cyan uppercase">Ljudski Resursi</span>
                        <h4 className="text-sm sm:text-base font-display font-black text-white leading-tight">Sanja Knežević</h4>
                        <p className="text-[10px] text-slate-300 truncate mt-0.5">Regionalni HR menadžer</p>
                      </div>
                    </div>

                    {/* IT Lead */}
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3.5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">IT</div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-slate-300 uppercase">IT Podrška</span>
                        <h4 className="text-sm sm:text-base font-display font-black text-white leading-tight">Aljoša Trninić</h4>
                        <p className="text-[10px] text-slate-300 truncate mt-0.5">IT & Sigurnost IS</p>
                      </div>
                    </div>

                    {/* Marketing Lead */}
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3.5">
                      <img src="/assets/team/mirna-djukic-svraka.png" alt="Mirna" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-amber-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-amber-300 uppercase">Marketing</span>
                        <h4 className="text-sm sm:text-base font-display font-black text-white leading-tight">Mirna Đukić Švraka</h4>
                        <p className="text-[10px] text-slate-300 truncate mt-0.5">Regionalni direktor</p>
                      </div>
                    </div>

                    {/* Sales Lead */}
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3.5">
                      <img src="/assets/team/nenad-marjanovic.jpg" alt="Nenad" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-blue-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-blue-300 uppercase">Prodaja</span>
                        <h4 className="text-sm sm:text-base font-display font-black text-white leading-tight">Nenad Marjanović</h4>
                        <p className="text-[10px] text-slate-300 truncate mt-0.5">Menadžer prodaje</p>
                      </div>
                    </div>

                    {/* Operations Lead */}
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3.5">
                      <img src="/assets/team/natasa-majstorovic.png" alt="Nataša" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-cyan-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-cyan-300 uppercase">Operativa</span>
                        <h4 className="text-sm sm:text-base font-display font-black text-white leading-tight">Nataša Majstorović</h4>
                        <p className="text-[10px] text-slate-300 truncate mt-0.5">Operativni direktor</p>
                      </div>
                    </div>

                    {/* Finance Lead */}
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3.5">
                      <img src="/assets/team/nevena-ilic.png" alt="Nevena" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-purple-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-purple-300 uppercase">Finansije</span>
                        <h4 className="text-sm sm:text-base font-display font-black text-white leading-tight">Nevena Ilić</h4>
                        <p className="text-[10px] text-slate-300 truncate mt-0.5">Direktor finansija</p>
                      </div>
                    </div>

                    {/* Full Directory Card */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-display font-black text-white">I još 40+ kolega</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Svi sektori i podrška</div>
                      </div>
                      <span className="text-brand-green font-bold text-sm">✓</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 flex items-center justify-between border-t border-white/10 pt-2">
                    <span>Povezan i snažan tim u svim sektorima kompanije</span>
                    <span className="text-brand-green font-bold">230 zaposlenih</span>
                  </div>
                </div>
              )}

              {/* SLIDE 13: Management Team */}
              {currentSlide === 13 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Rukovodstvo</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                        MENADŽMENT FLEX CREDITA
                      </h2>
                    </div>
                    
                    {/* Management Switcher */}
                    <div className="flex gap-1 bg-white/10 p-1 rounded-xl">
                      {managementTeam.map((m, idx) => (
                        <button
                          key={m.id}
                          onClick={() => setActiveMgmtIndex(idx)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            activeMgmtIndex === idx
                              ? 'bg-brand-green text-[#002B3D]'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          {m.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Leader Spotlight */}
                  {managementTeam[activeMgmtIndex] && (
                    <div className="my-auto p-5 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 animate-fade-in">
                      <img
                        src={managementTeam[activeMgmtIndex].photo}
                        alt={managementTeam[activeMgmtIndex].name}
                        className="h-48 sm:h-[62vh] lg:h-[68vh] w-auto max-w-full sm:max-w-[42%] rounded-2xl object-cover object-top border-2 border-brand-green shadow-xl flex-shrink-0"
                      />
                      <div className="space-y-2.5 text-left">
                        <div className="inline-block px-2.5 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold uppercase">
                          {managementTeam[activeMgmtIndex].department}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                          {managementTeam[activeMgmtIndex].name}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-brand-green">
                          {managementTeam[activeMgmtIndex].role}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-6">
                          {managementTeam[activeMgmtIndex].bio}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-slate-400 text-center">
                    Klikni na ime iznad za pregled biografije ostalih članova menadžmenta.
                  </div>
                </div>
              )}

              {/* SLIDE 14: Mentorship and Support */}
              {currentSlide === 14 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Podrška u radu</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                        SISTEM MENTORSTVA I PODRŠKE
                      </h2>
                    </div>
                    <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-brand-green hidden sm:inline">
                      Kontinuirana integracija
                    </span>
                  </div>

                  <div className="my-auto grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto w-full">
                    <div className="p-4 rounded-2xl bg-white/10 border border-brand-green/40 shadow-lg space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center font-bold text-sm">01</div>
                      <h3 className="font-display font-bold text-sm text-white">Direktni mentor</h3>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Svakodnevno uvođenje u radne procese, alate, standarde komunikacije i konkretne zadatke.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 border border-brand-cyan/40 shadow-lg space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold text-sm">02</div>
                      <h3 className="font-display font-bold text-sm text-white">Rukovodilac sektora</h3>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Strateško vođenje, postavljanje jasnih ciljeva, praćenje razvoja i podrška u profesionalnom rastu.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 border border-purple-400/40 shadow-lg space-y-2">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm">03</div>
                      <h3 className="font-display font-bold text-sm text-white">Tim & HR podrška</h3>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Kolegijalna atmosfera, kontinuirane edukacije i otvorena vrata za sva pitanja u svakom trenutku.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 text-center">
                    Strukturisani mentorski program garantuje sigurnost, stabilnost i brz napredak novih kolega.
                  </div>
                </div>
              )}

              {/* SLIDE 15: Your Role */}
              {currentSlide === 15 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div>
                    <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Odgovornost i doprinos</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                      TVOJA ULOGA U KOMPANIJI
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                        <h4 className="text-xs font-bold text-brand-green uppercase mb-1">Svrha i odgovornost</h4>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          Profesionalno, zakonito i strateški usklađeno djelovanje uz visoke etičke standarde, štiteći interese kompanije i obezbjeđujući najbolje iskustvo za naše klijente.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                        <h4 className="text-xs font-bold text-brand-cyan uppercase mb-1">Ključ uspjeha</h4>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          Kontinuiran, posvećen rad, građenje povjerenja u timu i proaktivan pristup u rješavanju svih poslovnih izazova.
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                        Zajednički cilj: <strong>Stabilnost, efikasnost i liderska pozicija na tržištu</strong>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                      <img
                        src="/assets/illustrations/employee-role-dashboard.png"
                        alt="Tvoja uloga"
                        className="max-h-52 w-auto object-contain rounded-2xl shadow-xl"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 text-center">
                    Zajedno gradimo stabilan i transparentan sistem poslovanja.
                  </div>
                </div>
              )}

              {/* SLIDE 16: What Flex Credit Gives You */}
              {currentSlide === 16 && (
                <div className="h-full flex flex-col justify-between py-2">
                  <div>
                    <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Pogodnosti</span>
                    <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
                      ŠTA TI PRUŽA FLEX CREDIT?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-auto">
                    {employeeBenefits.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex flex-col items-center text-center justify-between transition-all hover:-translate-y-1 hover:border-brand-green/50"
                      >
                        <img
                          src={benefitIcons[idx]}
                          alt={b.title}
                          className="h-14 sm:h-16 w-auto object-contain drop-shadow-glow-cyan"
                        />
                        <h4 className="font-display font-bold text-sm text-white my-2">{b.title}</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{b.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-slate-400 text-center">
                    Ulaganje u ljude je temelj dugoročnog rasta Flex Credita.
                  </div>
                </div>
              )}

              {/* SLIDE 17: Why We Are Unique */}
              {currentSlide === 17 && (
                <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Diferencijacija</span>
                      <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
                        PO ČEMU SMO JEDINSTVENI?
                      </h2>
                    </div>

                    <div className="space-y-3.5">
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4 hover:border-brand-green transition-all">
                        <div className="w-10 h-10 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center font-bold flex-shrink-0">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Jasna strategija.</h4>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4 hover:border-brand-cyan transition-all">
                        <div className="w-10 h-10 rounded-xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center font-bold flex-shrink-0">
                          <Users className="w-5 h-5" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Snažan i posvećen tim.</h4>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-4 hover:border-amber-400 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <h4 className="font-display font-bold text-lg text-white">Kontinuiran razvoj.</h4>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <img
                      src="/assets/illustrations/values-rocket-target.png"
                      alt="Jedinstveni pristup"
                      className="max-h-72 w-auto object-contain rounded-2xl shadow-xl"
                    />
                  </div>
                </div>
              )}

              {/* SLIDE 18: Closing / Welcome Finale */}
              {currentSlide === 18 && (
                <div className="h-full flex flex-col justify-between py-4 text-center items-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/40 text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" />
                    Spremni za nove pobjede
                  </div>

                  <div className="space-y-4 max-w-2xl">
                    <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
                      RADUJEMO SE RADU SA VAMA,
                      <span className="text-brand-green block mt-1">DOBRODOŠLI U TIM!</span>
                    </h2>
                    <p className="text-slate-200 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                      Zajedno gradimo najbrže rastuću mikrokreditnu organizaciju, pružamo vrhunsku finansijsku uslugu i stvaramo dugoročne uspjehe.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setCurrentSlide(1);
                        playSound('click', soundEnabled);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
                    >
                      Pogledaj od početka
                    </button>
                    <a
                      href="/FlexCredit-Dobrodoslica.pdf"
                      download="FlexCredit-Dobrodoslica.pdf"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-green to-emerald-500 hover:brightness-110 text-[#002B3D] text-xs font-black shadow-lg hover:shadow-glow-green transition-all inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Preuzmi PDF prezentaciju
                    </a>
                  </div>
                </div>
              )}

            </div>
      </div>


      {/* Thumbnail Drawer Modal */}
      {showGrid && (
        <div className="absolute inset-0 z-50 bg-[#001420] p-6 overflow-y-auto animate-fade-in flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <h3 className="font-display font-bold text-lg text-white">Pregled svih slajdova (18)</h3>
            <button
              onClick={() => setShowGrid(false)}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
            >
              Zatvori pregled
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 flex-1">
            {Array.from({ length: totalSlides }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  setCurrentSlide(num);
                  setShowGrid(false);
                  playSound('slide', soundEnabled);
                }}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all aspect-video ${
                  currentSlide === num
                    ? 'bg-brand-green/20 border-brand-green text-white ring-2 ring-brand-green/40'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                }`}
              >
                <span className="text-[10px] font-black text-brand-cyan">Slajd {num}</span>
                <p className="text-[11px] font-bold text-white line-clamp-2 mt-1">
                  {slideTitles[num - 1]}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
