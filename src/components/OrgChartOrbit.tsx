import React, { useState, useEffect } from 'react';

interface Sector {
  id: string;
  label: string;
  name: string;
  role: string;
  color: string;
  border: string;
}

const sectors: Sector[] = [
  { id: 'sales', label: 'PRODAJA (61 FIL.)', name: 'Nenad Marjanović', role: '7 Regija · Savjetnici', color: '#3DB3F0', border: 'border-blue-400/30' },
  { id: 'ops', label: 'OPERATIVNA PODRŠKA', name: 'Nataša Majstorović', role: 'KC (40+) · Rizici · Naplata', color: '#22D3EE', border: 'border-cyan-400/30' },
  { id: 'finance', label: 'FINANSIJE & ADMIN', name: 'Nevena Ilić', role: 'Planiranje · Računovodstvo', color: '#A78BFA', border: 'border-purple-400/30' },
  { id: 'hr', label: 'LJUDSKI RESURSI (HR)', name: 'Sanja Knežević', role: 'Regrutacija · Radni odnosi', color: '#8DC63F', border: 'border-brand-green/30' },
  { id: 'marketing', label: 'MARKETING & PR', name: 'Mirna Đukić Švraka', role: 'Digital · Brendovi', color: '#FBBF24', border: 'border-amber-400/30' },
  { id: 'it', label: 'IT PODRŠKA & IS', name: 'Aljoša Trninić', role: 'Mreže · Admini', color: '#94A3B8', border: 'border-slate-400/30' },
  { id: 'legal', label: 'PRAVNA PODRŠKA', name: 'Andrea Mikić', role: 'Usklađenost · Sudska naplata', color: '#818CF8', border: 'border-indigo-400/30' },
  { id: 'insurance', label: 'OSIGURANJE', name: 'Miloš Runić', role: 'Zastupanje u osiguranju', color: '#F472B6', border: 'border-pink-400/30' },
];

const CX = 450;
const CY = 260;
const RX = 270;
const RY = 175;

const nodePositions = sectors.map((_, i) => {
  const angle = (-90 + (360 / sectors.length) * i) * (Math.PI / 180);
  return {
    x: CX + RX * Math.cos(angle),
    y: CY + RY * Math.sin(angle),
  };
});

const buildConnectorPath = (nx: number, ny: number, seed: number) => {
  const mx = (CX + nx) / 2;
  const my = (CY + ny) / 2;
  const dx = nx - CX;
  const dy = ny - CY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const perpX = -dy / dist;
  const perpY = dx / dist;
  const bend = (seed % 2 === 0 ? 1 : -1) * dist * 0.12;
  const ctrlX = mx + perpX * bend;
  const ctrlY = my + perpY * bend;
  return `M ${CX} ${CY} Q ${ctrlX} ${ctrlY} ${nx} ${ny}`;
};

export const OrgChartOrbit: React.FC = () => {
  const [isMoved, setIsMoved] = useState(false);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  useEffect(() => {
    // Clean, elegant transition exactly 1 second after load
    const timer = setTimeout(() => {
      setIsMoved(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mobile fallback: Clean stacked layout with 1-second delay entrance */}
      <div className="sm:hidden h-full overflow-y-auto pr-1 space-y-2">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-green/15 border border-brand-green/40">
          <img
            src="/assets/team/radmila-bjeljac.png"
            alt="Radmila Bjeljac"
            className="w-12 h-12 rounded-full object-cover border-2 border-brand-green flex-shrink-0"
          />
          <div>
            <div className="text-[11px] font-black text-brand-green uppercase tracking-wider">Country Manager</div>
            <div className="text-sm font-display font-black text-white leading-tight">Radmila Bjeljac</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sectors.map((s, i) => (
            <div
              key={s.id}
              className={`p-3 rounded-xl bg-white/10 border ${s.border} transition-all duration-500 ease-out`}
              style={{
                opacity: isMoved ? 1 : 0,
                transform: isMoved ? 'translateY(0)' : 'translateY(12px)',
                transitionDelay: isMoved ? `${i * 60}ms` : '0ms',
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] font-bold uppercase tracking-wide truncate" style={{ color: s.color }}>{s.label}</span>
              </div>
              <div className="text-xs font-display font-black text-white leading-tight mt-1">{s.name}</div>
              <div className="text-[11px] text-slate-300 leading-snug mt-0.5">{s.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop/tablet: Smooth 1-second load movement */}
      <div className="hidden sm:block relative w-full aspect-[45/26] mx-auto">
        {/* Connector lines */}
        <svg
          viewBox={`0 0 ${CX * 2} ${CY * 2}`}
          className="absolute inset-0 w-full h-full select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {sectors.map((s, i) => {
            const { x, y } = nodePositions[i];
            const isHovered = hoveredSector === s.id;
            return (
              <path
                key={s.id}
                d={buildConnectorPath(x, y, i)}
                fill="none"
                stroke={s.color}
                strokeWidth={isHovered ? '2' : '1.25'}
                strokeDasharray="4 4"
                className="transition-opacity duration-700 ease-out"
                style={{
                  opacity: isMoved ? (isHovered ? 0.9 : 0.35) : 0,
                  transitionDelay: isMoved ? `${150 + i * 40}ms` : '0ms',
                }}
              />
            );
          })}
        </svg>

        {/* Hub: Country Manager (Static, clean, professional) */}
        <div
          className="absolute flex flex-col items-center gap-1.5 z-20"
          style={{
            left: `${(CX / (CX * 2)) * 100}%`,
            top: `${(CY / (CY * 2)) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative flex items-center justify-center">
            <img
              src="/assets/team/radmila-bjeljac.png"
              alt="Radmila Bjeljac"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-brand-green shadow-lg"
            />
          </div>
          <div className="text-center bg-[#001D2B]/95 border border-brand-green/40 rounded-xl px-3 py-1 backdrop-blur-sm">
            <div className="text-[11px] font-black text-brand-green uppercase tracking-wider">Country Manager</div>
            <div className="text-sm sm:text-base font-display font-black text-white leading-tight whitespace-nowrap">Radmila Bjeljac</div>
          </div>
        </div>

        {/* Sector Cards: Smooth glide from center after 1 second */}
        {sectors.map((s, i) => {
          const { x, y } = nodePositions[i];
          const isHovered = hoveredSector === s.id;
          const targetLeft = (x / (CX * 2)) * 100;
          const targetTop = (y / (CY * 2)) * 100;

          return (
            <div
              key={s.id}
              onMouseEnter={() => setHoveredSector(s.id)}
              onMouseLeave={() => setHoveredSector(null)}
              className={`absolute w-[170px] sm:w-[188px] p-2.5 sm:p-3 rounded-xl bg-white/10 border backdrop-blur-sm transition-all duration-700 ease-out cursor-pointer ${
                isHovered
                  ? 'border-white/40 bg-white/15 scale-105 z-30 shadow-lg'
                  : `${s.border} z-10 hover:border-white/30`
              }`}
              style={{
                left: isMoved ? `${targetLeft}%` : '50%',
                top: isMoved ? `${targetTop}%` : '50%',
                transform: `translate(-50%, -50%) ${isMoved ? (isHovered ? 'scale(1.05)' : 'scale(1)') : 'scale(0.65)'}`,
                opacity: isMoved ? 1 : 0,
                pointerEvents: isMoved ? 'auto' : 'none',
                transitionDelay: isMoved ? `${i * 50}ms` : '0ms',
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] font-bold uppercase tracking-wide truncate" style={{ color: s.color }}>{s.label}</span>
              </div>
              <div className="text-sm sm:text-base font-display font-black text-white leading-tight mt-1">{s.name}</div>
              <div className="text-[11px] text-slate-300 leading-snug mt-0.5">{s.role}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
