import React, { useState } from 'react';
import { 
  Sparkles, Users, Building, ShieldCheck, Target, Award, Store, 
  TrendingUp, Compass, HeartHandshake, Eye, CheckCircle2, ChevronRight,
  ArrowRight, PhoneCall, Mail, MapPin, Briefcase, UserCheck, Play, Download,
  Layers, Lightbulb, Zap, HelpCircle, Trophy
} from 'lucide-react';
import { EmployeeProfile, ManagementLeader } from '../types';
import { 
  managementTeam, companyMetrics, integrationSteps, companyValues, 
  employeeBenefits, strategicGoals 
} from '../data/onboardingData';
import { getVocative, getGrammarTerms } from '../utils/grammar';
import { ColleaguesDirectory } from './ColleaguesDirectory';
import { SalesMapInteractive } from './SalesMapInteractive';
import { OrgChartInteractive } from './OrgChartInteractive';
import { OnboardingChecklist } from './OnboardingChecklist';
import { KnowledgeQuiz } from './KnowledgeQuiz';
import { playSound } from '../utils/audio';

interface PortalViewProps {
  profile: EmployeeProfile;
  onStartPresentation: () => void;
  onOpenCustomizer: () => void;
  soundEnabled: boolean;
}

export const PortalView: React.FC<PortalViewProps> = ({
  profile,
  onStartPresentation,
  onOpenCustomizer,
  soundEnabled,
}) => {
  const [selectedLeader, setSelectedLeader] = useState<ManagementLeader | null>(null);

  const firstName = profile.name.split(' ')[0] || profile.name;
  const vocative = getVocative(firstName, profile.gender);
  const grammar = getGrammarTerms(profile.gender);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      
      {/* 1. HERO WELCOME SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#002B3D] via-[#003A53] to-[#001D2B] text-white p-6 sm:p-12 shadow-2xl border border-cyan-500/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Dobrodošlica u Flex Credit tim
            </div>

            <div>
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                <span className="text-brand-green block mb-1">{vocative.toUpperCase()},</span>
                {grammar.welcome.toUpperCase()} U TIM!
              </h1>
              <p className="text-slate-200 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed max-w-xl">
                Tvoja uloga na poziciji <strong>{profile.role}</strong> je ključni dio našeg uspjeha. Istraži interaktivni onboarding portal, upoznaj tim i savladaj procese poslovanja.
              </p>
            </div>

            {/* Quick Profile Summary Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Tvoj Mentor</span>
                <span className="font-bold text-brand-green text-sm mt-0.5 block truncate">
                  {profile.mentorName}
                </span>
                <span className="text-[11px] text-slate-300 truncate block">{profile.mentorTitle}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Rukovodilac</span>
                <span className="font-bold text-brand-cyan text-sm mt-0.5 block truncate">
                  {profile.managerName}
                </span>
                <span className="text-[11px] text-slate-300 truncate block">{profile.managerTitle}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Sektor / Tim</span>
                <span className="font-bold text-white text-sm mt-0.5 block truncate">
                  {profile.connectedRole}
                </span>
                <span className="text-[11px] text-slate-300 truncate block">{profile.officeLocation}</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  onStartPresentation();
                }}
                className="px-6 py-3 rounded-2xl bg-brand-green hover:bg-brand-green-light text-[#002B3D] font-black text-sm flex items-center gap-2.5 shadow-xl hover:shadow-glow-green transition-all transform hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current" />
                Pokreni Slajd Prezentaciju (18 slajdova)
              </button>

              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  onOpenCustomizer();
                }}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-all"
              >
                <UserCheck className="w-4 h-4 text-brand-cyan" />
                Prilagodi Podatke (HR)
              </button>
            </div>

          </div>

          {/* Right Hero Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <img 
                    src="/assets/branding/flexcredit-hero-logo.png" 
                    alt="Flex Credit" 
                    className="h-9 w-auto object-contain brightness-125"
                  />
                  <span className="px-2.5 py-1 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-bold uppercase tracking-wider">
                    2026 Ready
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-slate-300">Ukupan broj filijala</span>
                    <span className="font-bold text-brand-green text-sm">61 filijala</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-slate-300">Agentska mreža Pošte RS</span>
                    <span className="font-bold text-brand-cyan text-sm">67 mjesta</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5">
                    <span className="text-slate-300">Broj kolega u timu</span>
                    <span className="font-bold text-white text-sm">230 stručnjaka</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 text-[11px] text-cyan-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span>Dio međunarodne <strong>MVF Finance</strong> grupacije</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. ONBOARDING ROADMAP / 7 KORAKA INTEGRACIJE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan mb-1">
              <Compass className="w-4 h-4" />
              Tvoj Put Kroz Onboarding
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#003A53] tracking-tight">
              Proces Integracije u Kompaniju
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Sedam definisanih koraka koji te vode od prvog upoznavanja do potpune samostalnosti.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrationSteps.map((step, idx) => (
            <div
              key={step.step}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-green/60 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-brand-green/20 text-[#003A53] font-display font-black text-sm flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors">
                    0{step.step}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Korak {step.step}</span>
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-brand-cyan transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Faza {idx < 2 ? 'Dan 1' : idx < 5 ? 'Sedmica 1-4' : 'Mjesec 2-3'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 3. KEY COMPANY METRICS */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Snaga i doseg</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#003A53] tracking-tight mt-0.5">
              Flex Credit u Brojevima
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              2 Brenda: Flex Credit & Uzmi novac
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {companyMetrics.map((metric) => (
            <div
              key={metric.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-emerald-50/50 hover:border-brand-green/40 transition-all text-center flex flex-col justify-between"
            >
              <div className="text-[11px] text-slate-500 font-semibold leading-tight">{metric.label}</div>
              <div className="font-display font-black text-2xl sm:text-3xl text-[#003A53] my-2">
                {metric.value}
              </div>
              <div className="text-[10px] text-slate-400">{metric.sub}</div>
            </div>
          ))}
        </div>

        {/* Company Photo & HQ Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative group">
            <img
              src="/assets/office/flexcredit-all-employees-team.jpg"
              alt="Tim Flex Credit"
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
              <p className="text-white font-display font-bold text-base sm:text-lg">
                „Naši ljudi su naš brend!“ · 230 zaposlenih profesionalaca
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative group">
            <img
              src="/assets/office/flexcredit-headquarters-building.png"
              alt="Novo sjedište"
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
              <div>
                <p className="text-white font-display font-bold text-base">Novo sjedište kompanije</p>
                <p className="text-xs text-slate-300">Kontakt centar i Kreditni odjel u novim prostorijama</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. PHILOSOPHY, MISSION & VALUES */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Kultura i principi</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[#003A53] tracking-tight mt-0.5">
            Filozofija, Cilj, Misija i Vrijednosti
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {companyValues.map((v, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-cyan/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center mb-4 font-bold">
                  {idx === 0 && <HeartHandshake className="w-5 h-5" />}
                  {idx === 1 && <Sparkles className="w-5 h-5" />}
                  {idx === 2 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 3 && <Eye className="w-5 h-5" />}
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-brand-green font-bold uppercase">
                Temeljna Vrijednost
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 5. INTERACTIVE 2026 SALES MAP & STRATEGY */}
      <section className="space-y-6">
        <SalesMapInteractive />
      </section>


      {/* 6. STRATEGIC PILLARS 2026 */}
      <section className="bg-gradient-to-br from-[#003A53] to-[#002434] rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Vizija rasta</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mt-0.5">
            Strateški Ciljevi za 2026. Godinu
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Šest ključnih pravaca razvoja kojima osiguravamo dugoročnu stabilnost i lidersku poziciju na tržištu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {strategicGoals.map((goal, idx) => (
            <div
              key={goal.id}
              className="p-5 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-brand-green font-black text-sm">0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan text-[10px] font-bold">
                    {goal.impact}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-white mb-1.5">
                  {goal.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 7. MANAGEMENT LEADERSHIP SPOTLIGHT */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">Vođstvo kompanije</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#003A53] tracking-tight mt-0.5">
              Menadžment Flex Credita
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Iskusni lideri sa višedecenijskim iskustvom u bankarskom i mikrokreditnom sektoru.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {managementTeam.map((leader) => (
            <div
              key={leader.id}
              onClick={() => setSelectedLeader(leader)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-brand-green/60 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-4">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-44 sm:h-48 object-cover object-top rounded-xl border border-slate-100 shadow-sm group-hover:scale-102 transition-transform"
                  />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#003A53]/80 backdrop-blur-sm text-white text-[10px] font-bold">
                    {leader.department}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-brand-cyan transition-colors">
                  {leader.name}
                </h3>
                <p className="text-xs font-semibold text-brand-green mt-0.5">
                  {leader.role}
                </p>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {leader.bio}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-cyan font-bold">
                <span>Pročitaj biografiju</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 8. INTERACTIVE ORGANIZATIONAL STRUCTURE */}
      <section className="space-y-6">
        <OrgChartInteractive profile={profile} />
      </section>


      {/* 9. COLLEAGUES DIRECTORY (47+ STAFF) */}
      <section className="space-y-6">
        <ColleaguesDirectory profile={profile} />
      </section>


      {/* 10. YOUR MENTOR & ROLE STATION */}
      <section className="rounded-3xl bg-gradient-to-br from-[#003A53] via-[#004764] to-[#1696D4] p-6 sm:p-10 text-white shadow-2xl border border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Mentor Profile */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/40 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Tvoja Glavna Podrška
            </div>

            <div className="flex items-center gap-4">
              {profile.mentorPhoto ? (
                <img
                  src={profile.mentorPhoto}
                  alt={profile.mentorName}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-brand-green shadow-xl"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-brand-petrol-dark text-brand-green flex items-center justify-center font-black text-2xl border-2 border-brand-green">
                  {profile.mentorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              )}
              <div>
                <div className="text-xs text-brand-green font-bold uppercase">{grammar.mentorHeader}</div>
                <h3 className="text-2xl font-display font-black text-white">{profile.mentorName}</h3>
                <p className="text-xs text-slate-200 font-medium">{profile.mentorTitle}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/10 p-4 rounded-2xl border border-white/15">
              „{profile.mentorDescription}“
            </p>
          </div>

          {/* Role Responsibilities */}
          <div className="lg:col-span-7 bg-white/10 p-6 rounded-2xl border border-white/15 space-y-4">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div>
                <span className="text-[10px] text-slate-300 uppercase font-bold">Tvoja Uloga</span>
                <h4 className="text-lg font-display font-black text-brand-green">{profile.role}</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
                Sektor: {profile.connectedRole}
              </span>
            </div>

            <div className="text-xs sm:text-sm text-slate-200 space-y-2.5 leading-relaxed">
              <p>
                <strong>Svrha radnog mjesta:</strong> Obezbijediti zakonito, pravedno i strateški usklađeno upravljanje radnim odnosima i procesima, pri čemu štitiš interese kompanije, ali i prava zaposlenih.
              </p>
              <p>
                <strong>Kako do uspjeha:</strong> Kroz kontinuiran, istrajan i posvećen rad te uspostavljanje odnosa povjerenja s kolegama i klijentima.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-black/20 text-slate-300">
                Rukovodilac: <strong>{profile.managerName}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/20 text-slate-300">
                Lokacija: <strong>{profile.officeLocation}</strong>
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* 11. BENEFITS & WHAT FLEX CREDIT GIVES YOU */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Zašto Flex Credit?</span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[#003A53] tracking-tight mt-0.5">
            Šta Ti Pruža Naša Kompanija?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {employeeBenefits.map((b, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-green/60 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-brand-green font-black text-sm">0{idx + 1}</span>
                <h3 className="font-display font-bold text-base text-slate-900 my-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {b.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-brand-cyan font-bold uppercase">
                Pogodnost za tebe
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 12. INTERACTIVE ONBOARDING CHECKLIST */}
      <section className="space-y-6">
        <OnboardingChecklist profile={profile} soundEnabled={soundEnabled} />
      </section>


      {/* 13. KNOWLEDGE QUIZ & CERTIFICATE */}
      <section className="space-y-6">
        <KnowledgeQuiz profile={profile} soundEnabled={soundEnabled} />
      </section>


      {/* Management Bio Modal */}
      {selectedLeader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedLeader(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl font-bold p-1"
            >
              &times;
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedLeader.photo}
                alt={selectedLeader.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-green shadow-md"
              />
              <div>
                <span className="px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan text-[10px] font-bold uppercase">
                  {selectedLeader.department}
                </span>
                <h3 className="font-display font-bold text-xl text-slate-900 mt-1">{selectedLeader.name}</h3>
                <p className="text-xs font-semibold text-brand-green">{selectedLeader.role}</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 text-xs text-slate-700 space-y-3 border border-slate-100 leading-relaxed">
              <p>{selectedLeader.bio}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ključne kompetencije:</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedLeader.highlights.map((h, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200">
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLeader(null)}
                className="px-5 py-2.5 bg-[#003A53] text-white rounded-xl text-xs font-bold hover:bg-[#00283A] transition-colors"
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
