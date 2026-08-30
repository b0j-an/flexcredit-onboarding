import React, { useState } from 'react';
import { salesRegions } from '../data/onboardingData';
import { SalesRegion } from '../types';
import { MapPin, Users, Store, Building2, CheckCircle2 } from 'lucide-react';

interface CityHub {
  id: string;
  name: string;
  shortName: string;
  regionId: string;
  branches: number;
  x: number;
  y: number;
  color: string;
  manager: string;
  cities: string[];
}

const cityHubs: CityHub[] = [
  {
    id: 'banja-luka',
    name: 'Banja Luka',
    shortName: 'Banja Luka (HQ)',
    regionId: 'banja-luka',
    branches: 14,
    x: 285,
    y: 155,
    color: '#3DB3F0',
    manager: 'Željko Šinik',
    cities: ['Banja Luka', 'Gradiška', 'Nova Topola', 'Laktaši', 'Trn', 'Čelinac', 'Kotor Varoš', 'Kneževo', 'Mrkonjić Grad', 'Šipovo', 'Srbac', 'Prnjavor'],
  },
  {
    id: 'prijedor',
    name: 'Prijedor',
    shortName: 'Prijedor',
    regionId: 'prijedor',
    branches: 7,
    x: 205,
    y: 120,
    color: '#0F73A3',
    manager: 'Goran Srdić',
    cities: ['Prijedor', 'Novi Grad', 'Kozarska Dubica', 'Kostajnica'],
  },
  {
    id: 'doboj',
    name: 'Doboj',
    shortName: 'Doboj',
    regionId: 'doboj',
    branches: 9,
    x: 410,
    y: 160,
    color: '#8DC63F',
    manager: 'Goran Petrović',
    cities: ['Doboj', 'Derventa', 'Brod', 'Modriča', 'Teslić', 'Stanari', 'Petrovo'],
  },
  {
    id: 'brcko',
    name: 'Brčko',
    shortName: 'Brčko Distrikt',
    regionId: 'brcko',
    branches: 8,
    x: 515,
    y: 135,
    color: '#EAB308',
    manager: 'Edisa Dervišagić',
    cities: ['Brčko', 'Šamac', 'Pelagićevo', 'Gradačac', 'Srebrenik', 'Gračanica'],
  },
  {
    id: 'bijeljina',
    name: 'Bijeljina',
    shortName: 'Bijeljina',
    regionId: 'bijeljina',
    branches: 10,
    x: 580,
    y: 160,
    color: '#F97316',
    manager: 'Danijel Mijić',
    cities: ['Bijeljina', 'Janja', 'Ugljevik', 'Lopare', 'Zvornik', 'Bratunac', 'Vlasenica', 'Milići'],
  },
  {
    id: 'sarajevo',
    name: 'Istočno Sarajevo',
    shortName: 'Istočno Sarajevo',
    regionId: 'sarajevo',
    branches: 8,
    x: 460,
    y: 310,
    color: '#A855F7',
    manager: 'Sanja Lučić',
    cities: ['Istočno Sarajevo', 'Istočna Ilidža', 'Pale', 'Sokolac', 'Rogatica', 'Rudo', 'Čajniče', 'Foča'],
  },
  {
    id: 'trebinje',
    name: 'Trebinje',
    shortName: 'Trebinje',
    regionId: 'trebinje',
    branches: 5,
    x: 450,
    y: 505,
    color: '#EF4444',
    manager: 'Nikola Bjelović',
    cities: ['Trebinje', 'Bileća', 'Gacko', 'Nevesinje'],
  },
];

// Stylized smooth outline path for Bosnia & Herzegovina
const bihOutlinePath = `
  M 85,75
  C 140,65 210,68 280,72
  C 340,75 410,75 470,82
  C 520,88 560,95 595,120
  C 605,145 590,175 565,210
  C 555,245 575,280 595,320
  C 570,360 530,390 490,410
  C 480,450 475,490 470,535
  C 455,545 440,530 425,505
  C 385,490 355,480 340,475
  C 355,445 365,420 370,395
  C 335,370 290,345 250,310
  C 210,280 180,250 160,215
  C 135,175 105,140 85,120
  Z
`;

export const BihSalesMap: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<CityHub>(cityHubs[0]);

  // Radius calculation: larger circle = more branches
  const getRadius = (branches: number) => {
    // 14 branches -> 28px, 10 -> 24px, 9 -> 22px, 8 -> 20px, 7 -> 18px, 5 -> 15px
    return 11 + branches * 1.25;
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center gap-3 sm:gap-6 justify-between min-h-0">
      
      {/* Left / Center: Interactive SVG Map of BiH */}
      <div className="relative flex-1 w-full flex items-center justify-center max-h-[340px] sm:max-h-[420px] lg:max-h-[480px] min-h-0">
        <svg
          viewBox="0 0 680 570"
          className="w-full h-full max-h-[340px] sm:max-h-[420px] lg:max-h-[480px] drop-shadow-2xl select-none"
        >
          <defs>
            {/* Map gradient fill */}
            <linearGradient id="bihMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00354C" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#002434" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#001B28" stopOpacity="0.9" />
            </linearGradient>

            {/* Glowing filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="hubShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Grid pattern background */}
          <g opacity="0.12">
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="40"
                y1={60 + i * 55}
                x2="640"
                y2={60 + i * 55}
                stroke="#1696D4"
                strokeDasharray="4,4"
              />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={60 + i * 55}
                y1="40"
                x2={60 + i * 55}
                y2="540"
                stroke="#1696D4"
                strokeDasharray="4,4"
              />
            ))}
          </g>

          {/* BiH Boundary Outer Stroke & Glow */}
          <path
            d={bihOutlinePath}
            fill="none"
            stroke="#1696D4"
            strokeWidth="3"
            opacity="0.3"
            filter="url(#glow)"
          />

          {/* BiH Landmass Polygon */}
          <path
            d={bihOutlinePath}
            fill="url(#bihMapGrad)"
            stroke="#3DB3F0"
            strokeWidth="2"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Network Connection Lines from Banja Luka HQ to Other Hubs */}
          <g opacity="0.4" strokeDasharray="3,3">
            {cityHubs.filter(h => h.id !== 'banja-luka').map((hub) => (
              <line
                key={`line-${hub.id}`}
                x1={cityHubs[0].x}
                y1={cityHubs[0].y}
                x2={hub.x}
                y2={hub.y}
                stroke="#8DC63F"
                strokeWidth={selectedHub.id === hub.id ? '2' : '1'}
                opacity={selectedHub.id === hub.id ? '0.9' : '0.4'}
              />
            ))}
          </g>

          {/* City Hub Nodes (Circles with Branch Count Inside) */}
          {cityHubs.map((hub) => {
            const isSelected = selectedHub.id === hub.id;
            const r = getRadius(hub.branches);

            return (
              <g
                key={hub.id}
                className="cursor-pointer group transition-transform duration-200"
                onClick={() => setSelectedHub(hub)}
                filter="url(#hubShadow)"
              >
                {/* Active Pulse Animation Ring */}
                {isSelected && (
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r={r + 8}
                    fill="none"
                    stroke={hub.color}
                    strokeWidth="2"
                    opacity="0.75"
                    className="animate-ping"
                    style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
                  />
                )}

                {/* Outer halo */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={r + (isSelected ? 4 : 2)}
                  fill={hub.color}
                  opacity={isSelected ? 0.35 : 0.2}
                />

                {/* Main Circle — Size proportional to branches */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={r}
                  fill={hub.color}
                  stroke="#FFFFFF"
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  className="transition-all duration-200 group-hover:brightness-125"
                />

                {/* Number of Branches INSIDE the Circle */}
                <text
                  x={hub.x}
                  y={hub.y + (r > 22 ? 5 : 4)}
                  textAnchor="middle"
                  fill="#002B3D"
                  fontSize={r > 24 ? '14' : r > 20 ? '12' : '11'}
                  fontWeight="900"
                  fontFamily="system-ui, sans-serif"
                  className="select-none pointer-events-none"
                >
                  {hub.branches}
                </text>

                {/* City Name Label below the circle */}
                <g transform={`translate(${hub.x}, ${hub.y + r + 13})`}>
                  {/* Label Background Pill */}
                  <rect
                    x={-((hub.name.length * 3.8) + 12)}
                    y="-9"
                    width={(hub.name.length * 7.6) + 24}
                    height="18"
                    rx="9"
                    fill={isSelected ? '#001D2B' : '#002B3D'}
                    stroke={isSelected ? hub.color : 'rgba(255,255,255,0.2)'}
                    strokeWidth={isSelected ? '1.5' : '0.8'}
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isSelected ? '#8DC63F' : '#FFFFFF'}
                    fontSize="10"
                    fontWeight={isSelected ? '800' : '600'}
                    fontFamily="system-ui, sans-serif"
                    className="select-none pointer-events-none"
                  >
                    {hub.name}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Right Side: Selected Region Spotlight & Stats */}
      <div className="w-full md:w-72 lg:w-80 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-3.5 sm:p-4 flex flex-col justify-between flex-shrink-0 animate-fade-in">
        
        {/* Hub Header */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: selectedHub.color }}
              />
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-cyan">
                Regija {selectedHub.name}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-brand-green text-[#002B3D]">
              {selectedHub.branches} filijala
            </span>
          </div>

          <h3 className="font-display font-black text-lg text-white mt-1">
            {selectedHub.shortName}
          </h3>

          <div className="mt-2 p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-slate-200">
            <Users className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
            <div>
              <div className="text-[9px] text-slate-400">Regionalni menadžer</div>
              <div className="font-bold text-white text-xs">{selectedHub.manager}</div>
            </div>
          </div>

          {/* Cities / Municipalities Chips */}
          <div className="mt-2.5">
            <div className="text-[9px] font-bold uppercase text-slate-300 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-brand-cyan" />
              Lokacije ({selectedHub.cities.length}):
            </div>
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1 scrollbar-thin">
              {selectedHub.cities.map((city, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-white/10 text-white border border-white/10"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Total Network Summary Footer */}
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
          <div>
            <div className="text-[9px] text-slate-400 uppercase">Ukupno RS</div>
            <div className="font-black text-brand-green text-xs">61 Filijala</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-slate-400 uppercase">Partnerstvo</div>
            <div className="font-black text-brand-cyan text-xs">67 Pošta RS</div>
          </div>
        </div>

      </div>

    </div>
  );
};
