import React, { useState, useMemo } from 'react';
import {
  Network, Search, ZoomIn, ZoomOut, RotateCcw, ChevronRight,
  Shield, Briefcase, Layers, Sparkles, Building,
  Users, Eye, ArrowDown, Award, Compass
} from 'lucide-react';
import { completeOrgStructure, departmentStats, OrgChartNode } from '../data/orgChartData';
import { EmployeeProfile } from '../types';

interface OrgChartProps {
  profile: EmployeeProfile;
}

const CX = 480;
const CY = 480;
const VIEW_SIZE = 960;

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2);

const isDarkCategory = (category: OrgChartNode['category']) => category === 'governance' || category === 'executive';

const radiusForCount = (count: number) => {
  if (count <= 1) return 240;
  if (count <= 4) return 250;
  if (count <= 6) return 280;
  return 310;
};

const anglesForCount = (count: number): number[] => {
  if (count <= 0) return [];
  if (count === 1) return [0];
  return Array.from({ length: count }, (_, i) => -90 + (360 / count) * i);
};

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

export const OrgChartInteractive: React.FC<OrgChartProps> = ({ profile }) => {
  const [viewMode, setViewMode] = useState<'flow' | 'departments' | 'ladder' | 'original'>('flow');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [focusId, setFocusId] = useState('country-manager');
  const [selectedNode, setSelectedNode] = useState<OrgChartNode | null>(null);

  // Flatten the tree once into id -> node and id -> parentId lookups, powering
  // the "drill into a live sector" ecosystem navigation below.
  const { nodeMap, parentMap } = useMemo(() => {
    const nodes: Record<string, OrgChartNode> = {};
    const parents: Record<string, string | undefined> = {};
    const walk = (node: OrgChartNode, parentId?: string) => {
      nodes[node.id] = node;
      parents[node.id] = parentId;
      node.children?.forEach(child => walk(child, node.id));
    };
    walk(completeOrgStructure);
    return { nodeMap: nodes, parentMap: parents };
  }, []);

  const focusNode = nodeMap[focusId] ?? completeOrgStructure;
  const ringNodes = focusNode.children ?? [];
  const ringAngles = useMemo(() => anglesForCount(ringNodes.length), [ringNodes.length]);
  const ringRadius = radiusForCount(ringNodes.length);
  const ringPositions = useMemo(
    () => ringAngles.map(angle => {
      const rad = (angle * Math.PI) / 180;
      return { x: CX + ringRadius * Math.cos(rad), y: CY + ringRadius * Math.sin(rad) };
    }),
    [ringAngles, ringRadius]
  );

  const breadcrumbNodes = useMemo(() => {
    const ids: string[] = [];
    let cur: string | undefined = focusId;
    while (cur) {
      ids.unshift(cur);
      cur = parentMap[cur];
    }
    return ids.map(id => nodeMap[id]).filter(Boolean);
  }, [focusId, parentMap, nodeMap]);

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length < 2) return [];
    return Object.values(nodeMap).filter(n =>
      n.title.toLowerCase().includes(term) ||
      (n.holder && n.holder.toLowerCase().includes(term)) ||
      n.department.toLowerCase().includes(term)
    ).slice(0, 7);
  }, [searchTerm, nodeMap]);

  const jumpToSearchResult = (node: OrgChartNode) => {
    setFocusId(parentMap[node.id] ?? node.id);
    setSelectedNode(node);
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#00283A] via-[#003A53] to-[#0F73A3] text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/40 text-xs font-bold uppercase tracking-wider mb-2">
              <Network className="w-3.5 h-3.5" />
              Kompletna Hijerarhija Društva
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Organizaciona Struktura Flex Credita
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl">
              Interaktivni dijagram upravljanja, sektora, reporting linija i radnih mjesta.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setViewMode('flow')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'flow'
                  ? 'bg-brand-green text-[#002B3D] shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Živi Ekosistem
            </button>

            <button
              onClick={() => setViewMode('departments')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'departments'
                  ? 'bg-brand-green text-[#002B3D] shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Pregled po Sektorima
            </button>

            <button
              onClick={() => setViewMode('ladder')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'ladder'
                  ? 'bg-brand-green text-[#002B3D] shadow-md font-black'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Tvoja Linija Izvještavanja
            </button>

            <button
              onClick={() => setViewMode('original')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'original'
                  ? 'bg-brand-cyan text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Originalni Sken
            </button>
          </div>
        </div>

        {/* Quick Search & Controls Bar */}
        {viewMode === 'flow' && (
          <div className="mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
              <input
                type="text"
                placeholder="Pretraži poziciju, sektor ili kolegu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="relative w-full pl-9 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              {searchResults.length > 0 && (
                <div className="absolute z-30 top-full left-0 right-0 mt-1.5 bg-[#00202D] border border-white/15 rounded-xl shadow-2xl overflow-hidden">
                  {searchResults.map(node => (
                    <button
                      key={node.id}
                      onClick={() => jumpToSearchResult(node)}
                      className="w-full text-left px-3 py-2 hover:bg-white/10 transition-colors flex items-center justify-between gap-2 border-b border-white/5 last:border-0"
                    >
                      <span className="min-w-0">
                        <span className="block text-xs font-bold text-white truncate">{node.title}</span>
                        {node.holder && <span className="block text-[10px] text-brand-cyan truncate">{node.holder}</span>}
                      </span>
                      <span
                        className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${node.color}25`, color: node.color }}
                      >
                        {node.department}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 1.4))}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title="Povećaj (Zoom In)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-slate-300">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 0.6))}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title="Smanji (Zoom Out)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title="Resetuj prikaz"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sector Quick Stats Pills */}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex gap-2 overflow-x-auto scrollbar-none">
        {departmentStats.map((dept) => (
          <div
            key={dept.id}
            className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs shadow-2xs whitespace-nowrap flex-shrink-0"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: dept.color }}
            />
            <span className="font-semibold text-slate-800">{dept.name}</span>
            <span className="text-[10px] text-slate-500 font-medium">({dept.count})</span>
          </div>
        ))}
      </div>

      {/* VIEW 1: LIVE SVG ECOSYSTEM — drill-down orbit diagram with animated flow lines */}
      {viewMode === 'flow' && (
        <div className="bg-gradient-to-b from-[#00151F] via-[#00202D] to-[#00151F] p-6 sm:p-10 min-h-[680px]">
          {/* Breadcrumb trail */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none mb-4 pb-1">
            <Building className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mr-1" />
            {breadcrumbNodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0" />}
                <button
                  onClick={() => setFocusId(node.id)}
                  disabled={idx === breadcrumbNodes.length - 1}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                    idx === breadcrumbNodes.length - 1
                      ? 'bg-brand-green text-[#002B3D] cursor-default'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {node.title}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Orbit canvas */}
          <div className="overflow-x-auto overflow-y-hidden">
            <div
              className="mx-auto transition-transform duration-300 origin-top"
              style={{ transform: `scale(${zoomLevel})`, width: 'fit-content' }}
            >
              <svg
                key={focusId}
                width={620}
                height={620}
                viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
                className="animate-fade-in"
              >
                <defs>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8DC63F" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#8DC63F" stopOpacity="0" />
                  </radialGradient>
                  <filter id="nodeShadow" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#000914" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Faint orbit guide rings */}
                {[170, 230, 280, 320].map(r => (
                  <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 9" />
                ))}

                {/* Animated connector paths + flowing energy dots */}
                {ringNodes.map((node, i) => {
                  const pos = ringPositions[i];
                  const pathId = `flow-path-${focusId}-${node.id}`;
                  return (
                    <g key={`path-${node.id}`}>
                      <path
                        id={pathId}
                        d={buildConnectorPath(pos.x, pos.y, i)}
                        fill="none"
                        stroke={node.color}
                        strokeOpacity={0.5}
                        strokeWidth={2}
                        strokeDasharray="6 10"
                        className="animate-dash-flow"
                      />
                      <circle r={3.5} fill={node.color}>
                        <animateMotion
                          dur={`${2.6 + (i % 3) * 0.5}s`}
                          repeatCount="indefinite"
                          begin={`${i * 0.2}s`}
                        >
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                    </g>
                  );
                })}

                {/* Hub node — current focus of the ecosystem */}
                <circle cx={CX} cy={CY} r={130} fill="url(#hubGlow)" />
                <circle
                  cx={CX}
                  cy={CY}
                  r={80}
                  fill={isDarkCategory(focusNode.category) ? '#003A53' : '#ffffff'}
                  stroke="#8DC63F"
                  strokeWidth={3}
                  filter="url(#nodeShadow)"
                  className="animate-pulse-subtle cursor-pointer"
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                  onClick={() => setSelectedNode(focusNode)}
                />
                <foreignObject x={CX - 60} y={CY - 60} width={120} height={120} className="pointer-events-none">
                  <div className="w-full h-full flex items-center justify-center">
                    {focusNode.avatar ? (
                      <img
                        src={focusNode.avatar}
                        alt={focusNode.holder || focusNode.title}
                        className="w-16 h-16 rounded-full object-cover border-2 border-brand-green"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-brand-green/20 flex items-center justify-center text-white font-black text-base border-2 border-brand-green">
                        {focusNode.holder ? getInitials(focusNode.holder) : <Users className="w-7 h-7 text-brand-green" />}
                      </div>
                    )}
                  </div>
                </foreignObject>
                <foreignObject x={CX - 130} y={CY + 88} width={260} height={100} className="cursor-pointer" onClick={() => setSelectedNode(focusNode)}>
                  <div className="text-center px-2">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 bg-brand-green/20 text-brand-green border border-brand-green/40">
                      {focusNode.department}
                    </span>
                    <div className="text-sm font-display font-black text-white leading-snug line-clamp-2">{focusNode.title}</div>
                    {focusNode.holder && <div className="text-xs font-semibold text-brand-cyan mt-0.5">{focusNode.holder}</div>}
                  </div>
                </foreignObject>

                {/* Ring nodes — direct reports of the current focus, click to drill in */}
                {ringNodes.map((node, i) => {
                  const pos = ringPositions[i];
                  const isEmployeeRole = !!profile.role && node.title.toLowerCase().includes(profile.role.toLowerCase());
                  const isMentor = !!profile.mentorName && !!node.holder && node.holder.toLowerCase().includes(profile.mentorName.toLowerCase());
                  const isSpecial = isEmployeeRole || isMentor;
                  const nodeHasChildren = !!(node.children && node.children.length);

                  return (
                    <g key={node.id}>
                      {isSpecial && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={54}
                          fill="none"
                          stroke="#8DC63F"
                          strokeWidth={2}
                          className="animate-orbit-pulse"
                          style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                        />
                      )}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={54}
                        fill={isDarkCategory(node.category) ? '#00283A' : '#ffffff'}
                        stroke={isSpecial ? '#8DC63F' : node.color}
                        strokeWidth={isSpecial ? 4 : 2.5}
                        filter="url(#nodeShadow)"
                        className="cursor-pointer transition-transform hover:scale-105"
                        style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                        onClick={() => nodeHasChildren ? setFocusId(node.id) : setSelectedNode(node)}
                      />
                      <foreignObject x={pos.x - 40} y={pos.y - 40} width={80} height={80} className="pointer-events-none">
                        <div className="w-full h-full flex items-center justify-center">
                          {node.avatar ? (
                            <img src={node.avatar} alt={node.holder || node.title} className="w-11 h-11 rounded-full object-cover" />
                          ) : (
                            <div
                              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[11px]"
                              style={{
                                backgroundColor: `${node.color}30`,
                                color: isDarkCategory(node.category) ? '#ffffff' : node.color
                              }}
                            >
                              {node.holder ? getInitials(node.holder) : nodeHasChildren ? <Users className="w-5 h-5" /> : <Briefcase className="w-4 h-4" />}
                            </div>
                          )}
                        </div>
                      </foreignObject>

                      <foreignObject x={pos.x - 90} y={pos.y + 60} width={180} height={100} className="cursor-pointer" onClick={() => setSelectedNode(node)}>
                        <div className="text-center px-1">
                          <span
                            className="inline-block text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full mb-0.5"
                            style={{ backgroundColor: `${node.color}22`, color: node.color, border: `1px solid ${node.color}55` }}
                          >
                            {node.department}
                          </span>
                          <div className="text-[11px] font-display font-bold text-white leading-tight line-clamp-2">{node.title}</div>
                          {node.holder && <div className="text-[10px] font-semibold text-brand-cyan truncate">{node.holder}</div>}
                          <div className="flex items-center justify-center gap-1 mt-0.5">
                            {isEmployeeRole && (
                              <span className="bg-brand-green text-[#002B3D] text-[8px] font-black px-1 py-0.2 rounded-full uppercase flex items-center gap-0.5">
                                <Sparkles className="w-2 h-2" /> Ti
                              </span>
                            )}
                            {isMentor && (
                              <span className="bg-brand-cyan text-white text-[8px] font-black px-1 py-0.2 rounded-full uppercase flex items-center gap-0.5">
                                <Award className="w-2 h-2" /> Mentor
                              </span>
                            )}
                            {nodeHasChildren && !isEmployeeRole && !isMentor && (
                              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-brand-green">
                                <ChevronRight className="w-2.5 h-2.5" /> {node.children!.length} u timu
                              </span>
                            )}
                          </div>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {ringNodes.length === 0 && (
            <p className="text-center text-xs text-slate-400 mt-4">
              Ova pozicija nema podređenih članova tima u organizacionoj šemi — klikni na krug za detalje ili se vrati korak nazad.
            </p>
          )}
          {ringNodes.length > 0 && (
            <p className="text-center text-xs text-slate-500 mt-4">
              Klikni na čvor da uđeš u taj tim, ili na naziv ispod čvora za detalje pozicije.
            </p>
          )}
        </div>
      )}

      {/* VIEW 2: DEPARTMENT TIERS & CARDS */}
      {viewMode === 'departments' && (
        <div className="p-6 sm:p-8 bg-slate-50/50 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Governance Card */}
            <div className="bg-white rounded-2xl p-5 border-2 border-[#003A53] shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#003A53]" />
                  <h3 className="font-display font-bold text-base text-[#003A53]">Vrhovno Upravljanje & Nadzor</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">Nivo 1</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between font-bold text-slate-800">
                  <span>Skupština Društva</span>
                  <span className="text-[10px] text-brand-green font-bold">Osnivači</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-slate-700">
                  <span>Upravni Odbor & Direktor Društva</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-slate-700">
                  <span>Odbor za Reviziju & Interna Revizija</span>
                  <span className="text-[10px] text-slate-500">Vesna M. & Marko P.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-brand-green/40 flex items-center justify-between font-bold text-brand-petrol">
                  <span>Country Manager (BiH i CG)</span>
                  <span className="text-xs text-brand-green font-black">Radmila Bjeljac</span>
                </div>
              </div>
            </div>

            {/* Prodaja Card */}
            <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-sm space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <h3 className="font-display font-bold text-base text-slate-900">Sektor Prodaje</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">61 Filijala</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded-lg bg-blue-50/50 font-semibold flex justify-between">
                  <span>Menadžer Prodaje:</span>
                  <strong className="text-blue-900">Nenad Marjanović</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Koordinator Promocija:</span>
                  <span>Dragan Ostić</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Regionalni Menadžeri:</span>
                  <span className="font-bold">7 Regija</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Menadžeri Kancelarija:</span>
                  <span>Lokalne Poslovnice</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Savjetnici za Klijente:</span>
                  <span>Direktan rad s građanima</span>
                </div>
              </div>
            </div>

            {/* Operativna Podrška Card */}
            <div className="bg-white rounded-2xl p-5 border border-cyan-200 shadow-sm space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <h3 className="font-display font-bold text-base text-slate-900">Operativna Podrška</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-bold">50+ zaposlenih</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded-lg bg-cyan-50/50 font-semibold flex justify-between">
                  <span>Operativni Direktor:</span>
                  <strong className="text-cyan-900">Nataša Majstorović</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Kontakt Centar (40+ op.):</span>
                  <span>Dejana Tominčić</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Kreditni Odjel & Rizici:</span>
                  <span>Marina Lipovčić</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Služba Naplate:</span>
                  <span>Nebojša Ćulum</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Sistemska Unapređenja:</span>
                  <span>Suzana Dimitrovski</span>
                </div>
              </div>
            </div>

            {/* Finansije & Računovodstvo Card */}
            <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <h3 className="font-display font-bold text-base text-slate-900">Finansije & Računovodstvo</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold">12 stručnjaka</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded-lg bg-purple-50/50 font-semibold flex justify-between">
                  <span>Direktor Finansija:</span>
                  <strong className="text-purple-900">Nevena Ilić</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Fin. Planiranje & Izvještavanje:</span>
                  <span>Mira Cvijan, Bojan Š.</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Služba Računovodstva:</span>
                  <span>Jovana Jokić</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Obračun Zarada:</span>
                  <span>Gorana Janjetović</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Nabavke, Vozni Park & Arhiva:</span>
                  <span>Jelena P., Aleksandar B.</span>
                </div>
              </div>
            </div>

            {/* Ljudski Resursi (HR) Card */}
            <div className="bg-white rounded-2xl p-5 border-2 border-brand-green shadow-md space-y-3 ring-2 ring-brand-green/20">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-green" />
                  <h3 className="font-display font-bold text-base text-slate-900">Ljudski Resursi (HR)</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Tvoj Sektor</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded-lg bg-emerald-50 font-semibold flex justify-between items-center">
                  <span>Regionalni Menadžer:</span>
                  <strong className="text-emerald-900">{profile.managerName}</strong>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 flex justify-between items-center">
                  <span>Saradnik u HR (Mentor):</span>
                  <strong className="text-brand-green font-bold">{profile.mentorName}</strong>
                </div>
                <div className="p-2 rounded-lg bg-brand-green/15 border border-brand-green flex justify-between items-center font-bold text-brand-petrol">
                  <span>Saradnik za Radne Odnose:</span>
                  <span className="text-brand-green-dark">{profile.name}</span>
                </div>
              </div>
            </div>

            {/* Marketing, IT, Pravna & Osiguranje */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <h3 className="font-display font-bold text-base text-slate-900">Marketing, IT & Pravo</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">Stručne službe</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded-lg bg-amber-50/50 flex justify-between">
                  <span>Direktor Marketinga:</span>
                  <strong>Mirna Đukić Švraka</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>IT Menadžer:</span>
                  <strong>Aljoša Trninić</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Rukovodilac Pravne Službe:</span>
                  <strong>Andrea Mikić</strong>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 flex justify-between">
                  <span>Prodaja Osiguranja:</span>
                  <strong>Miloš Runić</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 3: REPORTING CHAIN OF COMMAND LADDER */}
      {viewMode === 'ladder' && (
        <div className="p-6 sm:p-8 bg-slate-50/50 space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-1">
            <h3 className="font-display font-bold text-xl text-slate-900">
              Direktna Hijerarhijska Linija za Poziciju: <span className="text-brand-green">{profile.role}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Od vrha kompanije do tvog radnog mjesta — jasan lanac odgovornosti i donošenja odluka.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            
            {/* Step 1 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-petrol text-white flex items-center justify-center font-bold text-xs">
                01
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Nivo 1 · Vrhovno tijelo</span>
                <h4 className="font-display font-bold text-sm text-slate-900">Skupština & Upravni Odbor</h4>
                <p className="text-xs text-slate-500">Strateško upravljanje i donošenje ključnih odluka.</p>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <ArrowDown className="w-5 h-5 text-slate-400" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#003A53] text-white shadow-md">
              <img
                src="/assets/team/radmila-bjeljac.png"
                alt="Radmila Bjeljac"
                className="w-12 h-12 rounded-xl object-cover border border-brand-green"
              />
              <div className="flex-1">
                <span className="text-[10px] text-brand-green font-bold uppercase">Nivo 2 · Country Menadžment</span>
                <h4 className="font-display font-bold text-base text-white">Radmila Bjeljac</h4>
                <p className="text-xs text-slate-200">Country Manager (BiH i CG)</p>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <ArrowDown className="w-5 h-5 text-slate-400" />
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-brand-cyan shadow-sm">
              <img
                src="/assets/team/sanja-knezevic.png"
                alt="Sanja Knežević"
                className="w-12 h-12 rounded-xl object-cover border border-brand-cyan"
              />
              <div className="flex-1">
                <span className="text-[10px] text-brand-cyan font-bold uppercase">Nivo 3 · Rukovodilac Sektora</span>
                <h4 className="font-display font-bold text-base text-slate-900">{profile.managerName}</h4>
                <p className="text-xs text-slate-600">{profile.managerTitle}</p>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <ArrowDown className="w-5 h-5 text-slate-400" />
            </div>

            {/* Step 4: Mentor Support */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border-2 border-brand-green shadow-sm">
              <img
                src="/assets/team/aleksandra-antesevic.png"
                alt="Aleksandra Antešević"
                className="w-12 h-12 rounded-xl object-cover border border-brand-green"
              />
              <div className="flex-1">
                <span className="text-[10px] text-emerald-800 font-bold uppercase">Mentorska Podrška</span>
                <h4 className="font-display font-bold text-base text-slate-900">{profile.mentorName}</h4>
                <p className="text-xs text-slate-600">{profile.mentorTitle}</p>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <ArrowDown className="w-5 h-5 text-brand-green" />
            </div>

            {/* Step 5: Employee */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-brand-green to-emerald-500 text-[#002B3D] shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#002B3D] text-brand-green flex items-center justify-center font-black text-lg">
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-[#002B3D] font-black uppercase tracking-wider">Tvoja Pozicija</span>
                <h4 className="font-display font-black text-lg">{profile.name}</h4>
                <p className="text-xs font-bold text-[#002B3D]/80">{profile.role}</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 4: ORIGINAL SCAN COMPARISON */}
      {viewMode === 'original' && (
        <div className="p-6 sm:p-8 bg-slate-900 flex flex-col items-center justify-center">
          <div className="max-w-6xl w-full bg-white rounded-2xl p-4 shadow-2xl overflow-auto">
            <img
              src="/assets/office/organizaciona-struktura-full.png"
              alt="Originalna organizaciona struktura"
              className="w-full h-auto min-w-[750px] object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            Prikaz originalne šeme iz PowerPoint prezentacije za poređenje.
          </p>
        </div>
      )}

      {/* Node Detail Inspection Modal */}
      {selectedNode && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedNode(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
            >
              &times;
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              {selectedNode.avatar ? (
                <img
                  src={selectedNode.avatar}
                  alt={selectedNode.holder || selectedNode.title}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-green shadow-md"
                />
              ) : (
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-xl shadow-inner text-white"
                  style={{ backgroundColor: selectedNode.color }}
                >
                  {selectedNode.holder ? selectedNode.holder.split(' ').map(n => n[0]).join('').slice(0, 2) : <Briefcase className="w-8 h-8" />}
                </div>
              )}

              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ backgroundColor: `${selectedNode.color}20`, color: selectedNode.color }}>
                  {selectedNode.department}
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mt-1">{selectedNode.title}</h3>
                {selectedNode.holder && (
                  <p className="text-xs font-semibold text-brand-green">{selectedNode.holder}</p>
                )}
              </div>
            </div>

            {selectedNode.description && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed mb-4">
                {selectedNode.description}
              </div>
            )}

            <div className="text-xs text-slate-500 space-y-1.5 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Nivo kategorije:</span>
                <strong className="uppercase text-slate-800">{selectedNode.category}</strong>
              </div>
              <div className="flex justify-between">
                <span>Broj podređenih grana:</span>
                <strong className="text-slate-800">{selectedNode.children ? selectedNode.children.length : 0}</strong>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedNode(null)}
                className="px-5 py-2 rounded-xl bg-[#003A53] hover:bg-[#00283A] text-white text-xs font-bold transition-colors"
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
