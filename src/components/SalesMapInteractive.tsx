import React, { useState } from 'react';
import { MapPin, Building, Users, ChevronRight, Store, PhoneCall, Shield } from 'lucide-react';
import { salesRegions } from '../data/onboardingData';
import { SalesRegion } from '../types';

export const SalesMapInteractive: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<SalesRegion>(salesRegions[0]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#003A53] to-[#0F73A3] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 text-xs font-semibold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5" />
            61 Filijala + 67 Pošta RS
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
            Prodajna Mreža 2026. Godine
          </h2>
          <p className="text-slate-200 text-sm mt-1 max-w-2xl">
            Prva mikrokreditna organizacija u Republici Srpskoj po broju filijala. Pokrivamo 7 ključnih regionalnih centara.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl border border-white/15 backdrop-blur-sm self-start md:self-auto">
          <div>
            <div className="text-2xl font-black text-brand-green">61</div>
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Filijala</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <div className="text-2xl font-black text-brand-cyan">7</div>
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Regija</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <div className="text-2xl font-black text-amber-400">67</div>
            <div className="text-[10px] text-slate-300 uppercase font-semibold">Pošta RS</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-t border-slate-200">
        
        {/* Left: Interactive Regions Selector */}
        <div className="lg:col-span-5 p-6 bg-slate-50 border-r border-slate-200 space-y-2.5 max-h-[560px] overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Odaberi prodajnu regiju
          </h3>
          
          {salesRegions.map((region) => {
            const isSelected = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'bg-white border-brand-cyan shadow-md ring-2 ring-brand-cyan/20 translate-x-1'
                    : 'bg-white/60 hover:bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: region.color }}
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900">{region.name}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Users className="w-3 h-3 text-slate-400" />
                      {region.manager}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    {region.branches} fil.
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-brand-cyan translate-x-0.5' : 'text-slate-300'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Region Detailed Card & Map Visual */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white relative">
          
          <div>
            {/* Region Title & Manager Card */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedRegion.color }}
                  />
                  <h3 className="text-2xl font-display font-black text-[#003A53]">
                    {selectedRegion.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  {selectedRegion.description}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-right flex-shrink-0">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Regionalni menadžer</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{selectedRegion.manager}</div>
              </div>
            </div>

            {/* Covered Cities & Locations */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                Gradovi i opštine u ovoj regiji ({selectedRegion.cities.length}):
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {selectedRegion.cities.map((city, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/80 hover:bg-brand-cyan/10 hover:border-brand-cyan/30 transition-colors"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
              <img
                src="/assets/illustrations/bih-map-pins.png"
                alt="Mapa BiH Prodajna Mreža"
                className="w-28 h-auto object-contain rounded-lg shadow-sm border border-slate-200 flex-shrink-0"
              />
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">
                  Strateški raspored filijala
                </p>
                <p className="text-slate-500 leading-relaxed">
                  Svaka regija ima posvećen tim terenskih savjetnika, menadžera kancelarija i direktnu vezu sa centralnim Kontakt centrom u Banja Luci.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Sinergija: <strong>Flex Credit</strong> + <strong>Pošte RS</strong></span>
            <span className="text-brand-green font-bold">Aktivno u 2026.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
