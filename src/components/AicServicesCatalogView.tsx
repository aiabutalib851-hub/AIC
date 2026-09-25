import React, { useState, useMemo } from 'react';
import { 
  GROWTH_STAGES, 
  AIC_SERVICE_CATEGORIES, 
  AIC_PACKAGES 
} from '../data/aicServicesData';
import { 
  GrowthStage, 
  AicServiceItem, 
  AicServiceCategory, 
  AicPackage, 
  DashboardTab 
} from '../types';
import { 
  Compass, 
  Palette, 
  Globe, 
  TrendingUp, 
  Share2, 
  Search, 
  Workflow, 
  BarChart3, 
  Repeat, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Filter, 
  Clock, 
  Target, 
  ChevronRight, 
  ChevronDown, 
  Copy, 
  Check, 
  Zap, 
  X,
  FileCheck,
  Bot,
  Crown,
  Award,
  ExternalLink
} from 'lucide-react';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';

interface AicServicesCatalogViewProps {
  onSelectTab?: (tab: DashboardTab) => void;
  onOpenCopilotWithService?: (serviceTitle: string, category: string) => void;
}

export const AicServicesCatalogView: React.FC<AicServicesCatalogViewProps> = ({
  onSelectTab,
  onOpenCopilotWithService
}) => {
  // Navigation / View states
  const [activeTab, setActiveTab] = useState<'journey' | 'categories' | 'packages'>('journey');
  const [selectedStage, setSelectedStage] = useState<GrowthStage | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<AicServiceItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'growth-strategy': true,
    'agentic-ai': true,
    'website-conversion': true,
    'performance-marketing': true
  });

  // Icon mapping helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-emerald-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-pink-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-emerald-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-purple-400" />;
      case 'Search': return <Search className="w-5 h-5 text-amber-400" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-indigo-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-teal-400" />;
      case 'Repeat': return <Repeat className="w-5 h-5 text-rose-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-sky-400" />;
      default: return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStageMeta = (stage: GrowthStage) => {
    return GROWTH_STAGES.find(s => s.id === stage) || GROWTH_STAGES[0];
  };

  // Flattened all services list
  const allServices = useMemo(() => {
    return AIC_SERVICE_CATEGORIES.flatMap(cat => cat.services);
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      // Stage filter
      if (selectedStage !== 'all' && !service.growthStages.includes(selectedStage)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = AIC_SERVICE_CATEGORIES.find(c => c.id === selectedCategory);
        if (cat && service.categoryNumber !== cat.number) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = service.title.toLowerCase().includes(q);
        const matchesTitleBn = service.titleBn ? service.titleBn.toLowerCase().includes(q) : false;
        const matchesCategory = service.categoryTitle.toLowerCase().includes(q) || service.categoryTitleBn.toLowerCase().includes(q);
        const matchesDeliverable = service.deliverables.some(d => d.toLowerCase().includes(q));
        const matchesSummary = service.summary.toLowerCase().includes(q);
        return matchesTitle || matchesTitleBn || matchesCategory || matchesDeliverable || matchesSummary;
      }
      return true;
    });
  }, [allServices, selectedStage, selectedCategory, searchQuery]);

  // Handle Copy Deliverable Summary
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Highlighted Banner & Strategic Mission Statement */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-5 sm:p-7 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                AIC Strategic Service Catalog
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                10 Domains • 60+ Deliverables
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Growth-Journey Architecture
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Client Growth Journey Framework
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              AIC-এর services-গুলো বিচ্ছিন্ন কোনো চ্যানেল নয়, বরং একটি সুশৃঙ্খল <strong className="text-white font-semibold">Client Growth Journey</strong> অনুযায়ী পরিচালিত: 
              <span className="inline-flex flex-wrap items-center gap-1.5 font-bold text-cyan-300 ml-1.5 bg-slate-800/80 px-2 py-0.5 rounded-lg border border-cyan-500/20">
                <span>Diagnose</span> <ArrowRight className="w-3 h-3 text-slate-400" />
                <span>Strategize</span> <ArrowRight className="w-3 h-3 text-slate-400" />
                <span>Build</span> <ArrowRight className="w-3 h-3 text-slate-400" />
                <span>Attract</span> <ArrowRight className="w-3 h-3 text-slate-400" />
                <span>Convert</span> <ArrowRight className="w-3 h-3 text-slate-400" />
                <span>Retain</span> <ArrowRight className="w-3 h-3 text-slate-400" />
                <span>Scale</span>
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onSelectTab && (
              <button
                onClick={() => onSelectTab('cro')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2 shadow-sm"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Open CRO Audit Hub</span>
              </button>
            )}

            {onSelectTab && (
              <button
                onClick={() => onSelectTab('copilot')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Draft Proposal with Copilot</span>
              </button>
            )}
          </div>
        </div>

        {/* 7-Step Horizontal Growth Journey Stepper (Interactive & Highly Highlighted) */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              Interactive Journey Pipeline (Click stage to filter services):
            </span>
            {selectedStage !== 'all' && (
              <button 
                onClick={() => setSelectedStage('all')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium underline flex items-center gap-1"
              >
                Reset stage filter (Show all)
              </button>
            )}
          </div>

          {/* Stepper buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {GROWTH_STAGES.map((stage) => {
              const isSelected = selectedStage === stage.id;
              const serviceCount = allServices.filter(s => s.growthStages.includes(stage.id)).length;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setSelectedStage(isSelected ? 'all' : stage.id);
                    if (activeTab === 'packages') setActiveTab('journey');
                  }}
                  className={`relative p-3 rounded-xl text-left transition-all border group ${
                    isSelected 
                      ? 'bg-slate-800 border-cyan-400 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/50' 
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${stage.badgeBg} ${stage.badgeText} border ${stage.badgeBorder}`}>
                      STEP 0{stage.stepNumber}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {serviceCount} SVCS
                    </span>
                  </div>
                  
                  <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{stage.label}</span>
                    <ChevronRight className={`w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : ''}`} />
                  </div>

                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {stage.labelBn}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAJOR SERVICE SPOTLIGHT: AGENTIC AI & AUTONOMOUS SYSTEMS */}
      <div 
        id="major-service-agentic-ai"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/50 p-5 sm:p-6 transition-all hover:border-emerald-400"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-sm">
                <Bot className="w-3.5 h-3.5 fill-current" />
                <span>MAJOR SERVICE</span>
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>Lead Architect: Abu Talib — Expert in Agentic AI</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                Domain #11 • 6 Deliverables
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <span>AGENTIC AI & Autonomous Multi-Agent Fleets</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Proprietary autonomous AI agent architectures engineered for multi-step task decomposition, zero-latency tool calling, enterprise RAG, and self-healing resilience. Directed personally by <strong className="text-emerald-300">Abu Talib</strong>, an industry-validated <strong className="text-white">Expert in Agentic AI</strong> and enterprise autonomous operations.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 text-emerald-300 font-medium">
                <Check className="w-3 h-3 text-emerald-400" /> CrewAI & LangGraph Fleet
              </span>
              <span className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 text-cyan-300 font-medium">
                <Check className="w-3 h-3 text-cyan-400" /> Zero-Hallucination RAG
              </span>
              <span className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 text-teal-300 font-medium">
                <Check className="w-3 h-3 text-teal-400" /> 99.9% Autonomous Uptime
              </span>
              <span className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-md border border-slate-800 text-amber-300 font-medium">
                <Check className="w-3 h-3 text-amber-400" /> Sub-Second Tool Execution
              </span>
            </div>
          </div>

          {/* Quick Linking Actions */}
          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('agentic-ai');
                setActiveTab('journey');
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Explore Agentic AI Services (6)</span>
            </button>

            {onSelectTab && (
              <button
                type="button"
                onClick={() => onSelectTab('fleet')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launch Live AI Fleet</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              {onSelectTab && (
                <button
                  type="button"
                  onClick={() => onSelectTab('founder')}
                  className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Abu Talib Bio</span>
                </button>
              )}

              <a
                href={AIC_AGENCY_INFO.founderPortfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-all flex items-center justify-center gap-1.5"
                title="Abu Talib Netlify Portfolio"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Portfolio</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Switcher & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/70 p-3 sm:p-4 rounded-xl border border-slate-800">
        
        {/* Navigation Mode Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'journey'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Growth Journey View</span>
            <span className="text-[10px] opacity-75 font-mono">({filteredServices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{AIC_SERVICE_CATEGORIES.length} Core Domains</span>
            <span className="text-[10px] opacity-75 font-mono">({AIC_SERVICE_CATEGORIES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'packages'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-amber-300" />
            <span>Recommended Packages</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-400 text-slate-950 font-bold">{AIC_PACKAGES.length} TIERS</span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search service, deliverable, SEO, CRO, Agentic..."
              className="w-full pl-9 pr-8 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {activeTab !== 'packages' && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="all">All {AIC_SERVICE_CATEGORIES.length} Domains (incl. Agentic AI)</option>
              {AIC_SERVICE_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.number}. {cat.title} {cat.isMajor ? '⭐ (Major Service)' : ''}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* VIEW 1: GROWTH JOURNEY VIEW */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          
          {/* Active Filter Summary Bar */}
          {(selectedStage !== 'all' || selectedCategory !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Showing {filteredServices.length} services matching:</span>
                {selectedStage !== 'all' && (
                  <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded font-semibold">
                    Stage: {getStageMeta(selectedStage).label} ({getStageMeta(selectedStage).labelBn})
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded font-semibold">
                    Domain #{AIC_SERVICE_CATEGORIES.find(c => c.id === selectedCategory)?.number}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 rounded font-semibold">
                    Keyword: "{searchQuery}"
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedStage('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Grid of Filtered Services */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
              <Search className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-base font-semibold text-slate-300">No matching services found</div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No services matched "{searchQuery}" in stage {selectedStage}. Try adjusting your search query or reset filters.
              </p>
              <button
                onClick={() => {
                  setSelectedStage('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-slate-800 text-xs font-semibold text-cyan-400 rounded-lg hover:bg-slate-700 border border-slate-700"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service) => {
                const isCopied = copiedId === service.id;
                const parentCat = AIC_SERVICE_CATEGORIES.find(c => c.number === service.categoryNumber);

                return (
                  <div
                    key={service.id}
                    className={`relative flex flex-col justify-between rounded-xl bg-slate-900/80 border p-5 transition-all hover:bg-slate-900 hover:border-slate-700 hover:shadow-lg ${
                      service.highlight 
                        ? 'border-cyan-500/40 shadow-sm shadow-cyan-500/5 ring-1 ring-cyan-500/20' 
                        : 'border-slate-800'
                    }`}
                  >
                    <div>
                      {/* Top Badges: Category & Growth Stages */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          #{service.categoryNumber} {service.categoryTitle}
                        </span>

                        <div className="flex flex-wrap gap-1">
                          {service.growthStages.map(st => {
                            const meta = getStageMeta(st);
                            return (
                              <span 
                                key={st} 
                                className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                              >
                                {meta.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Major Service Callout if applicable */}
                      {service.isMajorService && (
                        <div className="mb-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                          <Bot className="w-3 h-3 text-emerald-400" />
                          <span>MAJOR SERVICE • {service.expertLead || 'EXPERT: ABU TALIB'}</span>
                        </div>
                      )}

                      {/* Service Title (English & Bengali Highlighted) */}
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {service.title}
                      </h3>
                      {service.titleBn && (
                        <p className="text-xs font-medium text-cyan-400/90 mt-0.5">
                          {service.titleBn}
                        </p>
                      )}

                      {/* Short Description */}
                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-3">
                        {service.summary}
                      </p>

                      {/* Key Deliverables Highlight */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                          Core Scope & Deliverables:
                        </span>
                        {service.deliverables.slice(0, 3).map((deliv, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{deliv}</span>
                          </div>
                        ))}
                        {service.deliverables.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-mono block pl-5">
                            +{service.deliverables.length - 3} more deliverables
                          </span>
                        )}
                      </div>

                      {/* Business Impact Box */}
                      <div className="mt-3.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/90">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 mb-0.5">
                          <Target className="w-3 h-3" />
                          <span>BUSINESS REVENUE IMPACT</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          {service.businessImpact}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{service.deliverableTimeline}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {service.internalTab && onSelectTab && (
                          <button
                            type="button"
                            onClick={() => onSelectTab(service.internalTab!)}
                            title={`Open ${service.internalTab} view`}
                            className="px-2 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Zap className="w-3 h-3 text-emerald-400" />
                            <span>{service.internalTab === 'fleet' ? 'Fleet' : 'Copilot'}</span>
                          </button>
                        )}

                        {service.externalUrl && (
                          <a
                            href={service.externalUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Abu Talib Netlify Portfolio"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        <button
                          onClick={() => handleCopyText(`${service.title} (${service.categoryTitle})\nDeliverables:\n- ${service.deliverables.join('\n- ')}\nImpact: ${service.businessImpact}`, service.id)}
                          title="Copy service scope"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => setSelectedServiceForModal(service)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors flex items-center gap-1"
                        >
                          <span>Full Details</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: 11 CORE DOMAINS VIEW (EXPANDABLE HIERARCHICAL VIEW) */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-white block text-sm">
                {AIC_SERVICE_CATEGORIES.length} Comprehensive AIC Service Domains (Major Service: Agentic AI)
              </span>
              <span className="text-slate-400">
                Explore the complete agency capability breakdown with localized Bengali descriptions.
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const allExpanded: Record<string, boolean> = {};
                  AIC_SERVICE_CATEGORIES.forEach(c => { allExpanded[c.id] = true; });
                  setExpandedCategories(allExpanded);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700"
              >
                Expand All
              </button>
              <button
                onClick={() => setExpandedCategories({})}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {AIC_SERVICE_CATEGORIES.map((category) => {
              const isExpanded = !!expandedCategories[category.id];

              return (
                <div
                  key={category.id}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden transition-all"
                >
                  {/* Category Header */}
                  <div
                    onClick={() => toggleCategoryExpand(category.id)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shrink-0">
                        {getCategoryIcon(category.iconName)}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                            DOMAIN {category.number < 10 ? `0${category.number}` : category.number}
                          </span>
                          {category.isMajor && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-sm">
                              <Bot className="w-3 h-3 fill-current" />
                              <span>MAJOR SERVICE</span>
                            </span>
                          )}
                          {category.expertBadge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                              {category.expertBadge}
                            </span>
                          )}
                          <span className="text-xs font-semibold text-slate-400">
                            {category.services.length} Specialized Services
                          </span>
                        </div>

                        <h2 className="text-base sm:text-lg font-bold text-white flex flex-wrap items-baseline gap-2">
                          <span>{category.title}</span>
                          <span className="text-xs sm:text-sm font-medium text-cyan-400">
                            — {category.titleBn}
                          </span>
                        </h2>

                        <p className="text-xs text-slate-400 mt-1 max-w-2xl line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <div className="flex gap-1">
                        {category.growthStages.map(st => {
                          const meta = getStageMeta(st);
                          return (
                            <span 
                              key={st}
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                            >
                              {meta.label}
                            </span>
                          );
                        })}
                      </div>

                      <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Services List */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/80 bg-slate-950/40">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-4">
                        {category.services.map((service, idx) => (
                          <div
                            key={service.id}
                            className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="text-[10px] font-mono font-bold text-slate-400">
                                  #{category.number}.{idx + 1}
                                </span>
                                <div className="flex gap-1">
                                  {service.growthStages.map(st => (
                                    <span key={st} className="text-[9px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                                      {st.toUpperCase()}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <h3 className="text-sm font-bold text-white">
                                {service.title}
                              </h3>
                              {service.titleBn && (
                                <p className="text-xs text-cyan-400/90 font-medium">
                                  {service.titleBn}
                                </p>
                              )}

                              <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                                {service.summary}
                              </p>

                              <div className="mt-3 space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Key Deliverables</span>
                                {service.deliverables.slice(0, 2).map((d, i) => (
                                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                    <span className="truncate">{d}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 pt-2.5 border-t border-slate-800/90 flex items-center justify-between">
                              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {service.deliverableTimeline}
                              </span>

                              <button
                                onClick={() => setSelectedServiceForModal(service)}
                                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                              >
                                <span>Inspect Scope</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: RECOMMENDED AIC PACKAGES */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-slate-900 rounded-2xl border border-amber-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1 mb-2">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  Recommended Agency Growth Packages
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Turnkey Strategic Packages Engineered for High ROI
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Five structured tiers designed for clear customer alignment — from initial bottleneck diagnosis to full-stack growth management.
                </p>
              </div>

              {onSelectTab && (
                <button
                  onClick={() => onSelectTab('copilot')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-amber-950/30 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <FileCheck className="w-4 h-4 text-slate-950" />
                  <span>Generate Client Proposal</span>
                </button>
              )}
            </div>
          </div>

          {/* Package Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {AIC_PACKAGES.map((pkg) => {
              const isPopular = pkg.isPopular;

              return (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col justify-between rounded-2xl bg-slate-900/90 border p-6 transition-all hover:border-slate-700 ${
                    isPopular 
                      ? 'border-cyan-500/60 shadow-xl shadow-cyan-950/30 ring-1 ring-cyan-500/40' 
                      : 'border-slate-800'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
                      MOST POPULAR RETAINER
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-center gap-1.5 mb-1">
                        {pkg.growthStages.map(st => {
                          const meta = getStageMeta(st);
                          return (
                            <span 
                              key={st} 
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                            >
                              {meta.label}
                            </span>
                          );
                        })}
                      </div>

                      <h3 className="text-xl font-black text-white mt-1">
                        {pkg.name}
                      </h3>
                      <div className="text-xs font-semibold text-cyan-400">
                        {pkg.nameBn}
                      </div>

                      <p className="text-xs text-slate-300 font-medium mt-1">
                        "{pkg.tagline}"
                      </p>
                    </div>

                    {/* Investment & Timeline */}
                    <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 mb-4 space-y-1">
                      <div className="text-xs text-slate-400">Investment Tier:</div>
                      <div className="text-lg font-black text-white">
                        {pkg.investmentTier}
                      </div>
                      <div className="text-[11px] text-cyan-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Turnaround: {pkg.turnaroundTime}</span>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="mb-4 text-xs">
                      <span className="font-bold text-slate-300 block mb-0.5">Best For:</span>
                      <p className="text-slate-400 leading-relaxed">
                        {pkg.bestFor}
                      </p>
                    </div>

                    {/* Core Outcome */}
                    <div className="mb-4 p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs">
                      <span className="font-bold text-cyan-300 block mb-1">Core Outcome:</span>
                      <p className="text-slate-200 leading-snug">
                        {pkg.coreOutcome}
                      </p>
                    </div>

                    {/* Key Deliverables */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Included Deliverables
                      </span>
                      {pkg.keyDeliverables.map((deliv, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        if (onOpenCopilotWithService) {
                          onOpenCopilotWithService(pkg.name, 'Strategic Package');
                        } else if (onSelectTab) {
                          onSelectTab('copilot');
                        }
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isPopular
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-950/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span>Select & Draft Proposal</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Comparison Table */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>Executive Package Matrix Overview</span>
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <th className="p-3.5 font-bold">Package</th>
                    <th className="p-3.5 font-bold">Best For</th>
                    <th className="p-3.5 font-bold">Core Outcome</th>
                    <th className="p-3.5 font-bold">Investment</th>
                    <th className="p-3.5 font-bold">Journey Stages</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {AIC_PACKAGES.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5 font-bold text-white whitespace-nowrap">
                        <div>{pkg.name}</div>
                        <div className="text-[11px] text-cyan-400 font-normal">{pkg.nameBn}</div>
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-xs">
                        {pkg.bestFor}
                      </td>
                      <td className="p-3.5 text-slate-300 max-w-sm">
                        {pkg.coreOutcome}
                      </td>
                      <td className="p-3.5 font-semibold text-emerald-400 whitespace-nowrap">
                        {pkg.investmentTier}
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {pkg.growthStages.map(st => (
                            <span key={st} className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {st}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Full Service Deliverables & Scope Inspector */}
      {selectedServiceForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedServiceForModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  DOMAIN {selectedServiceForModal.categoryNumber < 10 ? `0${selectedServiceForModal.categoryNumber}` : selectedServiceForModal.categoryNumber}: {selectedServiceForModal.categoryTitle}
                </span>

                {selectedServiceForModal.isMajorService && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-sm">
                    <Bot className="w-3 h-3 fill-current" />
                    <span>MAJOR SERVICE</span>
                  </span>
                )}

                <div className="flex gap-1">
                  {selectedServiceForModal.growthStages.map(st => {
                    const meta = getStageMeta(st);
                    return (
                      <span 
                        key={st} 
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${meta.badgeBg} ${meta.badgeText} ${meta.badgeBorder}`}
                      >
                        {meta.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Major Service Callout with Direct Links */}
              {selectedServiceForModal.isMajorService && (
                <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-cyan-950/80 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-black uppercase text-emerald-300 block tracking-wide">
                        MAJOR SERVICE: AGENTIC AI
                      </span>
                      <span className="text-[11px] text-slate-300">
                        Architected by <strong>Abu Talib</strong> (Expert in Agentic AI)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {selectedServiceForModal.internalTab && onSelectTab && (
                      <button
                        type="button"
                        onClick={() => {
                          const tab = selectedServiceForModal.internalTab!;
                          setSelectedServiceForModal(null);
                          onSelectTab(tab);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-1.5 transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Go to {selectedServiceForModal.internalTab === 'fleet' ? 'Live AI Fleet' : 'Copilot'}</span>
                      </button>
                    )}
                    <a
                      href={AIC_AGENCY_INFO.founderPortfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1 transition-colors"
                    >
                      <span>Abu Talib Portfolio</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              <h2 className="text-xl font-black text-white">
                {selectedServiceForModal.title}
              </h2>
              {selectedServiceForModal.titleBn && (
                <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                  {selectedServiceForModal.titleBn}
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              {selectedServiceForModal.summary}
            </div>

            {/* Complete Deliverables Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Standard Agency Scope & Deliverables
              </span>
              <div className="space-y-1.5">
                {selectedServiceForModal.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Business Impact */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-slate-950 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Target className="w-3.5 h-3.5" />
                <span>DIRECT COMMERCIAL VALUE & ROI</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedServiceForModal.businessImpact}
              </p>
            </div>

            {/* Meta bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Typical Delivery: <strong className="text-white">{selectedServiceForModal.deliverableTimeline}</strong></span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleCopyText(`${selectedServiceForModal.title} (${selectedServiceForModal.categoryTitle})\n- ${selectedServiceForModal.deliverables.join('\n- ')}`, 'modal');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 flex items-center gap-1.5"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Scope</span>
                </button>

                <button
                  onClick={() => {
                    const serviceTitle = selectedServiceForModal.title;
                    const catTitle = selectedServiceForModal.categoryTitle;
                    setSelectedServiceForModal(null);
                    if (onOpenCopilotWithService) {
                      onOpenCopilotWithService(serviceTitle, catTitle);
                    } else if (onSelectTab) {
                      onSelectTab('copilot');
                    }
                  }}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950/40"
                >
                  <Zap className="w-3 h-3" />
                  <span>Use in Proposal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
