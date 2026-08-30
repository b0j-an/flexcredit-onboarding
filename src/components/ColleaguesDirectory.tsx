import React, { useState } from 'react';
import { Search, Users, Sparkles, Building, Briefcase, Mail, Phone, ShieldCheck } from 'lucide-react';
import { allColleagues, managementTeam } from '../data/onboardingData';
import { Colleague, EmployeeProfile } from '../types';

interface ColleaguesDirectoryProps {
  profile: EmployeeProfile;
}

export const ColleaguesDirectory: React.FC<ColleaguesDirectoryProps> = ({ profile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('Svi');
  const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);

  const departments = ['Svi', 'Uprava', 'Ljudski Resursi', 'Marketing', 'Operativna Podrška', 'Finansije i Računovodstvo', 'Prodaja', 'IT Podrška', 'Pravna Podrška', 'Revizija i Kontrola', 'Osiguranje'];

  const filtered = allColleagues.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.region && c.region.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = selectedDept === 'Svi' || c.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#003A53] via-[#004866] to-[#1696D4] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-green border border-brand-green/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            Tim od 230+ zaposlenih
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Upoznaj Svoje Kolege
          </h2>
          <p className="text-slate-200 text-sm sm:text-base mt-2 leading-relaxed">
            Istraži tim po sektorima, pronađi ključne kontakte, mentore i regionalne menadžere širom prodajne mreže Flex Credita.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 relative z-10">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Pretraži kolegu po imenu, poziciji ili regiji..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 hidden sm:inline whitespace-nowrap">Prikazano: <strong>{filtered.length}</strong> od <strong>{allColleagues.length}</strong></span>
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="mt-4 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedDept === dept
                  ? 'bg-brand-green text-[#00283A] font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Colleagues Grid */}
      <div className="p-6 sm:p-8 bg-slate-50/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((colleague) => {
            const isMentor = colleague.name.toLowerCase().includes(profile.mentorName.toLowerCase()) || 
                             profile.mentorName.toLowerCase().includes(colleague.name.toLowerCase());
            const isManager = colleague.name.toLowerCase().includes(profile.managerName.toLowerCase()) ||
                              profile.managerName.toLowerCase().includes(colleague.name.toLowerCase());

            return (
              <div
                key={colleague.id}
                onClick={() => setSelectedColleague(colleague)}
                className={`group bg-white rounded-xl p-4 border transition-all duration-200 cursor-pointer relative hover:-translate-y-1 hover:shadow-lg ${
                  isMentor
                    ? 'border-brand-green ring-2 ring-brand-green/30 bg-emerald-50/30'
                    : isManager
                    ? 'border-brand-cyan ring-2 ring-brand-cyan/30 bg-cyan-50/20'
                    : 'border-slate-200/80 hover:border-brand-cyan/50'
                }`}
              >
                {/* Badges */}
                {isMentor && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-green text-[#003A53] shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Tvoj Mentor
                  </span>
                )}
                {isManager && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-cyan text-white shadow-sm flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Tvoj Rukovodilac
                  </span>
                )}

                <div className="flex items-start gap-3.5">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {colleague.photoUrl ? (
                      <img
                        src={colleague.photoUrl}
                        alt={colleague.name}
                        className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl object-cover object-top border-2 border-slate-100 shadow-sm group-hover:border-brand-cyan transition-colors"
                      />
                    ) : (
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-brand-petrol to-brand-cyan text-white flex items-center justify-center font-display font-bold text-base shadow-sm">
                        {colleague.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-cyan transition-colors truncate">
                      {colleague.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-0.5">
                      {colleague.role}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-600">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold truncate max-w-[150px]">
                        {colleague.department}
                      </span>
                      {colleague.region && (
                        <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-medium text-[10px]">
                          {colleague.region}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">Nema rezultata za pretragu</h4>
            <p className="text-xs text-slate-500 mt-1">Pokušaj sa drugim imenom ili odaberi sektor „Svi“.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedColleague && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedColleague(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedColleague(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
            >
              &times;
            </button>

            <div className="flex items-center gap-4 mb-4">
              {selectedColleague.photoUrl ? (
                <img
                  src={selectedColleague.photoUrl}
                  alt={selectedColleague.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-cyan shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-brand-petrol text-white flex items-center justify-center font-display font-bold text-xl">
                  {selectedColleague.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              )}
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900">{selectedColleague.name}</h3>
                <p className="text-xs text-brand-cyan font-semibold">{selectedColleague.role}</p>
                <p className="text-xs text-slate-500 mt-0.5">{selectedColleague.department}</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 space-y-2 border border-slate-100">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" />
                <span>Sektor: <strong>{selectedColleague.department}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>Pozicija: <strong>{selectedColleague.role}</strong></span>
              </div>
              {selectedColleague.region && (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Regionalna nadležnost: <strong>Regija {selectedColleague.region}</strong></span>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedColleague(null)}
                className="px-4 py-2 bg-brand-petrol text-white rounded-xl text-xs font-semibold hover:bg-brand-petrol-dark transition-colors"
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
