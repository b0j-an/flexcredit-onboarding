import React, { useState } from 'react';
import { UserCheck, Sparkles, X, Check, RefreshCw, Sliders, Briefcase, User, ShieldCheck } from 'lucide-react';
import { EmployeeProfile, Gender } from '../types';
import { sampleProfiles } from '../data/onboardingData';
import { getVocative } from '../utils/grammar';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: EmployeeProfile;
  onSaveProfile: (profile: EmployeeProfile) => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<EmployeeProfile>(profile);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: EmployeeProfile) => {
    setFormData({ ...preset });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  const vocative = getVocative(formData.name.split(' ')[0] || '', formData.gender);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#003A53] via-[#004B6B] to-[#1696D4] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                HR Generator & Personalizacija
              </h3>
              <p className="text-xs text-slate-200">
                Prilagodi dobrodošlicu, gramatički rod, mentora i radno mjesto.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Quick Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Brzi šabloni (Primeri zaposlenih)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleProfiles.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    formData.name === preset.name
                      ? 'bg-brand-green/15 border-brand-green text-brand-petrol-dark font-bold ring-2 ring-brand-green/20'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="truncate font-semibold">{preset.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{preset.role}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Employee Basic Info */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-cyan" />
              Podaci o Novom Zaposlenom
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  placeholder="npr. Amar Hadžić"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gramatički rod
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'male' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      formData.gender === 'male'
                        ? 'bg-brand-petrol text-white border-brand-petrol'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    Muški (Dobrodošao)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'female' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      formData.gender === 'female'
                        ? 'bg-brand-petrol text-white border-brand-petrol'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    Ženski (Dobrodošla)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Radno mjesto (Pozicija)
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  placeholder="npr. Saradnik za radne odnose"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Povezana uloga / Tim
                </label>
                <input
                  type="text"
                  required
                  value={formData.connectedRole}
                  onChange={(e) => setFormData({ ...formData, connectedRole: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  placeholder="npr. Ljudski resursi"
                />
              </div>
            </div>
          </div>

          {/* Mentor Info */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-green" />
              Podaci o Mentoru
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ime i prezime mentora
                </label>
                <input
                  type="text"
                  required
                  value={formData.mentorName}
                  onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  placeholder="npr. Aleksandra Antešević"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pozicija mentora
                </label>
                <input
                  type="text"
                  value={formData.mentorTitle}
                  onChange={(e) => setFormData({ ...formData, mentorTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  placeholder="npr. Saradnik u ljudskim resursima"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kratak opis uloge mentora
              </label>
              <textarea
                rows={2}
                value={formData.mentorDescription}
                onChange={(e) => setFormData({ ...formData, mentorDescription: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                placeholder="Kratak, topao opis mentorske podrške..."
              />
            </div>
          </div>

          {/* Manager & Office */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Rukovodilac i Lokacija
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Neposredni rukovodilac
                </label>
                <input
                  type="text"
                  value={formData.managerName}
                  onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  placeholder="npr. Sanja Knežević"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lokacija kancelarije
                </label>
                <input
                  type="text"
                  value={formData.officeLocation || ''}
                  onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                  placeholder="npr. Sjedište, Banja Luka"
                />
              </div>
            </div>
          </div>

          {/* Live Preview Greeting Card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center flex-shrink-0 font-black">
              ✓
            </div>
            <div className="text-xs">
              <div className="text-brand-green font-bold uppercase tracking-wider text-[10px]">Pregled pozdrava</div>
              <div className="text-sm font-display font-bold text-white mt-0.5">
                {formData.gender === 'female' ? 'DOBRO NAM DOŠLA U TIM,' : 'DOBRO NAM DOŠAO U TIM,'} {vocative.toUpperCase()}!
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Odustani
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-brand-green hover:bg-brand-green-light text-[#002B3D] text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Primijeni Promjene
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
