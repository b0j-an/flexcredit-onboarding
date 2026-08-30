import React from 'react';

interface Sector {
  id: string;
  label: string;
  name: string;
  role: string;
  color: string;
  glow: string;
  border: string;
}

const sectors: Sector[] = [
  { id: 'sales', label: 'Prodaja (61 fil.)', name: 'Nenad Marjanović', role: '7 Regija · Savjetnici', color: '#3DB3F0', glow: 'shadow-[0_0_18px_-4px_#3DB3F0]', border: 'border-blue-400/40' },
  { id: 'ops', label: 'Operativna Podrška', name: 'Nataša Majstorović', role: 'KC (40+) · Rizici · Naplata', color: '#22D3EE', glow: 'shadow-[0_0_18px_-4px_#22D3EE]', border: 'border-cyan-400/40' },
  { id: 'finance', label: 'Finansije & Admin', name: 'Nevena Ilić', role: 'Planiranje · Računovodstvo', color: '#A78BFA', glow: 'shadow-[0_0_18px_-4px_#A78BFA]', border: 'border-purple-400/40' },
  { id: 'hr', label: 'Ljudski Resursi (HR)', name: 'Sanja Knežević', role: 'Regrutacija · Radni odnosi', color: '#8DC63F', glow: 'shadow-[0_0_18px_-4px_#8DC63F]', border: 'border-brand-green/40' },
  { id: 'marketing', label: 'Marketing & PR', name: 'Mirna Đukić Švraka', role: 'Digital · Brendovi', color: '#FBBF24', glow: 'shadow-[0_0_18px_-4px_#FBBF24]', border: 'border-amber-400/40' },
  { id: 'it', label: 'IT Podrška & IS', name: 'Aljoša Trninić', role: 'Mreže · Admini', color: '#94A3B8', glow: 'shadow-[0_0_18px_-4px_#94A3B8]', border: 'border-slate-400/40' },
  { id: 'legal', label: 'Pravna Podrška', name: 'Andrea Mikić', role: 'Usklađenost · Sudska naplata', color: '#818CF8', glow: 'shadow-[0_0_18px_-4px_#818CF8]', border: 'border-indigo-400/40' },
  { id: 'insurance', label: 'Osiguranje', name: 'Miloš Runić', role: 'Zastupanje u osiguranju', color: '#F472B6', glow: 'shadow-[0_0_18px_-4px_#F472B6]', border: 'border-pink-400/40' },
];

const CX = 450;
const CY = 260;
const RX = 350;
const RY = 185;

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
  const bend = (seed % 2 === 0 ? 1 : -1) * dist * 0.14;
  const ctrlX = mx + perpX * bend;
  const ctrlY = my + perpY * bend;
  return `M ${CX} ${CY} Q ${ctrlX} ${ctrlY} ${nx} ${ny}`;
};

export const OrgChartOrbit: React.FC = () => {
  return (
    <>
      {/* Mobile fallback: the radial layout has no room to breathe below `sm`, so
          show a simple stacked list instead of clipping nodes off-screen. */}
      <div className="sm:hidden h-full overflow-y-auto pr-1 space-y-2">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-brand-green/15 border border-brand-green/40">
          <img
            src="/assets/team/radmila-bjeljac.png"
            alt="Radmila Bjeljac"
            className="w-12 h-12 rounded-full object-cover border-2 border-brand-green flex-shrink-0"
          />
          <div>
            <div className="text-[9px] font-black text-brand-green uppercase tracking-wider">Country Manager</div>
            <div className="text-sm font-display font-black text-white leading-tight">Radmila Bjeljac</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sectors.map((s) => (
            <div key={s.id} className={`p-2.5 rounded-xl bg-white/10 border ${s.border}`}>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-[8px] font-bold uppercase tracking-wide truncate" style={{ color: s.color }}>{s.label}</span>
              </div>
              <div className="text-xs font-display font-black text-white leading-tight mt-0.5">{s.name}</div>
              <div className="text-[8px] text-slate-300 leading-snug mt-0.5">{s.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop/tablet: animated orbit diagram */}
      <div className="hidden sm:block relative w-full h-full max-h-full mx-auto aspect-[45/26]">
      {/* Connector lines */}
      <svg
        viewBox={`0 0 ${CX * 2} ${CY * 2}`}
        className="absolute inset-0 w-full h-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="orbitGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {sectors.map((s, i) => {
          const { x, y } = nodePositions[i];
          return (
            <path
              key={s.id}
              d={buildConnectorPath(x, y, i)}
              fill="none"
              stroke={s.color}
              strokeWidth="1.5"
              strokeDasharray="5 5"
              opacity="0.55"
              className="animate-dash-flow motion-reduce:animate-none"
              style={{ animationDelay: `${i * 90}ms` }}
            />
          );
        })}
      </svg>

      {/* Hub: Country Manager */}
      <div
        className="absolute flex flex-col items-center gap-1.5 animate-scale-in motion-reduce:animate-none"
        style={{ left: `${(CX / (CX * 2)) * 100}%`, top: `${(CY / (CY * 2)) * 100}%`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute w-24 h-24 rounded-full bg-brand-green/40 animate-orbit-pulse motion-reduce:animate-none" />
          <span className="absolute w-24 h-24 rounded-full bg-brand-green/40 animate-orbit-pulse motion-reduce:animate-none" style={{ animationDelay: '1.2s' }} />
          <img
            src="/assets/team/radmila-bjeljac.png"
            alt="Radmila Bjeljac"
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-brand-green shadow-glow-green"
          />
        </div>
        <div className="text-center bg-[#001D2B]/90 border border-brand-green/40 rounded-xl px-3 py-1 backdrop-blur-sm">
          <div className="text-[8px] font-black text-brand-green uppercase tracking-wider">Country Manager</div>
          <div className="text-sm sm:text-base font-display font-black text-white leading-tight whitespace-nowrap">Radmila Bjeljac</div>
        </div>
      </div>

      {/* Sector nodes */}
      {sectors.map((s, i) => {
        const { x, y } = nodePositions[i];
        return (
          <div
            key={s.id}
            className={`absolute w-[150px] sm:w-[168px] p-2 sm:p-2.5 rounded-xl bg-white/10 border ${s.border} ${s.glow} backdrop-blur-sm animate-scale-in motion-reduce:animate-none`}
            style={{
              left: `${(x / (CX * 2)) * 100}%`,
              top: `${(y / (CY * 2)) * 100}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${150 + i * 90}ms`,
            }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wide truncate" style={{ color: s.color }}>{s.label}</span>
            </div>
            <div className="text-xs sm:text-sm font-display font-black text-white leading-tight mt-0.5">{s.name}</div>
            <div className="text-[8px] sm:text-[9px] text-slate-300 leading-snug mt-0.5">{s.role}</div>
          </div>
        );
      })}
      </div>
    </>
  );
};
