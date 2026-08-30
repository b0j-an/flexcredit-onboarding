import React, { useState } from 'react';
import { CheckSquare, Square, ListChecks, Sparkles, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { defaultChecklist } from '../data/onboardingData';
import { ChecklistItem, EmployeeProfile } from '../types';
import { playSound } from '../utils/audio';

interface OnboardingChecklistProps {
  profile: EmployeeProfile;
  soundEnabled: boolean;
}

export const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({ profile, soundEnabled }) => {
  const [items, setItems] = useState<ChecklistItem[]>(defaultChecklist);
  const [activePhase, setActivePhase] = useState<string>('Sve');

  const phases = ['Sve', 'Dan 1', 'Sedmica 1', 'Mjesec 1', 'Mjesec 3'];

  const handleToggle = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.completed;
        playSound(nextState ? 'success' : 'click', soundEnabled);
        return { ...item, completed: nextState };
      }
      return item;
    }));
  };

  const completedCount = items.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  const filtered = activePhase === 'Sve' ? items : items.filter(i => i.phase === activePhase);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#003A53] via-[#004B6B] to-[#1696D4] text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <ListChecks className="w-3.5 h-3.5" />
              Tvoj Akcioni Plan
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Onboarding Kontrolna Lista
            </h2>
            <p className="text-slate-200 text-sm mt-1">
              Prati svoj napredak od prvog radnog dana do kraja probnog perioda od 3 mjeseca.
            </p>
          </div>

          <div className="bg-white/10 px-5 py-3 rounded-2xl border border-white/15 backdrop-blur-sm self-start sm:self-auto text-right">
            <div className="text-xs text-slate-300">Završeno zadataka</div>
            <div className="text-2xl font-display font-black text-brand-green mt-0.5">
              {completedCount} <span className="text-white/50 text-base font-normal">/ {items.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-slate-300 font-medium mb-2">
            <span>Ukupan napredak integracije</span>
            <span className="font-bold text-brand-green">{progressPercent}%</span>
          </div>
          <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-green to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activePhase === phase
                  ? 'bg-brand-green text-[#002B3D] shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="p-6 sm:p-8 bg-slate-50/50 space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
              item.completed
                ? 'bg-emerald-50/50 border-emerald-300/80 shadow-sm'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'
            }`}
          >
            <button className="mt-0.5 text-brand-green flex-shrink-0">
              {item.completed ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
              ) : (
                <div className="w-6 h-6 rounded-md border-2 border-slate-300 hover:border-brand-cyan transition-colors" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  item.phase === 'Dan 1' ? 'bg-blue-100 text-blue-800' :
                  item.phase === 'Sedmica 1' ? 'bg-amber-100 text-amber-800' :
                  item.phase === 'Mjesec 1' ? 'bg-purple-100 text-purple-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {item.phase}
                </span>
              </div>

              <h4 className={`font-display font-bold text-sm sm:text-base ${item.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                {item.title}
              </h4>
              <p className={`text-xs mt-0.5 ${item.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
