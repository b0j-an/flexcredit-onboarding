import React, { useState, useMemo } from 'react';
import { 
  Network, Search, ZoomIn, ZoomOut, RotateCcw, ChevronDown, ChevronRight, 
  User, Shield, Briefcase, Layers, Sparkles, Building, CheckCircle2,
  Users, Info, Eye, ArrowDown, CornerDownRight, Award, Compass
} from 'lucide-react';
import { completeOrgStructure, departmentStats, OrgChartNode } from '../data/orgChartData';
import { EmployeeProfile } from '../types';

interface OrgChartProps {
  profile: EmployeeProfile;
}

export const OrgChartInteractive: React.FC<OrgChartProps> = ({ profile }) => {
  const [viewMode, setViewMode] = useState<'flow' | 'departments' | 'ladder' | 'original'>('flow');
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [expandedNodeIds, setExpandedNodeIds] = useState<Record<string, boolean>>({
    'skupstina': true,
    'upravni-odbor': true,
    'odbor-reviziju': true,
    'direktor-drustva': true,
    'country-manager': true,
    'hr-root': true,
    'hr-menadzer': true,
    'prodaja-root': true,
    'operativna-root': true,
    'finansije-root': true,
    'marketing-root': true,
    'it-root': true,
    'pravna-root': true,
    'osiguranje-root': true,
  });
  const [selectedNode, setSelectedNode] = useState<OrgChartNode | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedNodeIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allIds: Record<string, boolean> = {};
    const traverse = (node: OrgChartNode) => {
      allIds[node.id] = true;
      node.children?.forEach(traverse);
    };
    traverse(completeOrgStructure);
    setExpandedNodeIds(allIds);
  };

  const collapseAll = () => {
    setExpandedNodeIds({
      'skupstina': true,
      'upravni-odbor': true,
      'direktor-drustva': true,
      'country-manager': true,
    });
  };

  // Node Renderer for Hierarchical Visual Tree
  const renderTreeNode = (node: OrgChartNode, level: number = 0) => {
    const isExpanded = !!expandedNodeIds[node.id];
    const hasChildren = node.children && node.children.length > 0;
    
    // Check if matches search
    const matchesSearch = searchTerm.trim() !== '' && (
      node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (node.holder && node.holder.toLowerCase().includes(searchTerm.toLowerCase())) ||
      node.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if matches active employee or mentor
    const isEmployeeRole = profile.role && node.title.toLowerCase().includes(profile.role.toLowerCase());
    const isMentor = profile.mentorName && node.holder && node.holder.toLowerCase().includes(profile.mentorName.toLowerCase());
    const isSpecialHighlight = isEmployeeRole || isMentor || matchesSearch;

    return (
      <div key={node.id} className="flex flex-col items-center relative">
        
        {/* Node Card */}
        <div
          onClick={() => setSelectedNode(node)}
          className={`group relative rounded-2xl p-3.5 transition-all duration-200 cursor-pointer border select-none text-left min-w-[210px] max-w-[260px] shadow-sm hover:shadow-xl hover:-translate-y-0.5 ${
            isSpecialHighlight
              ? 'bg-emerald-50 border-brand-green ring-4 ring-brand-green/30 shadow-glow-green scale-105 z-20'
              : node.category === 'governance'
              ? 'bg-[#002B3D] text-white border-cyan-500/40 hover:border-brand-green'
              : node.category === 'executive'
              ? 'bg-gradient-to-r from-[#003A53] to-[#004B6B] text-white border-brand-green/60 shadow-md'
              : node.category === 'management'
              ? 'bg-white text-slate-900 border-slate-200 hover:border-brand-cyan'
              : 'bg-slate-50/90 text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          {/* Top category / dept pill */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full truncate"
              style={{
                backgroundColor: `${node.color}20`,
                color: node.category === 'governance' || node.category === 'executive' ? '#90C226' : node.color,
                border: `1px solid ${node.color}40`
              }}
            >
              {node.department}
            </span>

            {isEmployeeRole && (
              <span className="bg-brand-green text-[#002B3D] text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> Ti
              </span>
            )}
            {isMentor && (
              <span className="bg-brand-cyan text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase flex items-center gap-0.5">
                <Award className="w-2.5 h-2.5" /> Mentor
              </span>
            )}
          </div>

          {/* Node Avatar & Title */}
          <div className="flex items-start gap-2.5">
            {node.avatar ? (
              <img
                src={node.avatar}
                alt={node.holder || node.title}
                className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-sm flex-shrink-0"
              />
            ) : (
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-inner"
                style={{
                  backgroundColor: `${node.color}25`,
                  color: node.category === 'governance' || node.category === 'executive' ? '#ffffff' : node.color
                }}
              >
                {node.holder ? node.holder.split(' ').map(n => n[0]).join('').slice(0, 2) : <Briefcase className="w-4 h-4" />}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h4 className={`font-display font-bold text-xs leading-snug line-clamp-2 ${
                node.category === 'governance' || node.category === 'executive' ? 'text-white' : 'text-slate-900'
              }`}>
                {node.title}
              </h4>
              {node.holder && (
                <p className={`text-[11px] font-semibold mt-0.5 truncate ${
                  node.category === 'governance' || node.category === 'executive' ? 'text-brand-green' : 'text-brand-cyan'
                }`}>
                  {node.holder}
                </p>
              )}
            </div>
          </div>

          {/* Expand / Collapse Button */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className={`mt-2.5 w-full py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-colors ${
                node.category === 'governance' || node.category === 'executive'
                  ? 'bg-white/10 hover:bg-white/20 text-slate-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {isExpanded ? (
                <>
                  <ChevronDown className="w-3 h-3" /> Sakrij grane ({node.children?.length})
                </>
              ) : (
                <>
                  <ChevronRight className="w-3 h-3 text-brand-green" /> Prikaži tim ({node.children?.length})
                </>
              )}
            </button>
          )}
        </div>

        {/* Children Branches & SVG Connectors */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col items-center">
            {/* Vertical stem down from parent */}
            <div className="w-0.5 h-6 bg-slate-300 dark:bg-cyan-500/40" />

            {/* Container for children */}
            <div className="flex items-start justify-center gap-4 relative pt-4">
              {/* Horizontal crossbar spanning across children */}
              {node.children && node.children.length > 1 && (
                <div className="absolute top-0 left-12 right-12 h-0.5 bg-slate-300 dark:bg-cyan-500/40" />
              )}

              {node.children?.map((child) => (
                <div key={child.id} className="flex flex-col items-center relative">
                  {/* Vertical connector down to child */}
                  <div className="w-0.5 h-4 bg-slate-300 dark:bg-cyan-500/40 -mt-4 mb-0" />
                  {renderTreeNode(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    );
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
              Interaktivno Stablo
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Pretraži poziciju, sektor ili kolegu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={expandAll}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-slate-200"
              >
                Otvori sve
              </button>
              <button
                onClick={collapseAll}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-slate-200"
              >
                Sklopi sve
              </button>

              <div className="h-4 w-px bg-white/20 mx-1" />

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

      {/* VIEW 1: INTERACTIVE HIERARCHICAL TREE CANVAS */}
      {viewMode === 'flow' && (
        <div className="p-6 sm:p-10 bg-slate-100/70 overflow-x-auto min-h-[620px] flex justify-center items-start transition-all">
          <div 
            className="transition-transform duration-200 origin-top flex flex-col items-center pb-12"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {renderTreeNode(completeOrgStructure)}
          </div>
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
