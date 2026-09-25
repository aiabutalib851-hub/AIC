import React, { useState, useMemo } from 'react';
import { 
  BLUEPRINT_22_PHASES, 
  BLUEPRINT_FOUR_ENGINES, 
  BLUEPRINT_DIAGNOSTIC_ISSUES, 
  BLUEPRINT_WEEKLY_OS, 
  BLUEPRINT_CORE_FORMULA,
  BlueprintPhase,
  DiagnosticIssue
} from '../data/metaAdsBlueprintData';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';
import { DashboardTab } from '../types';
import { 
  Cpu, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  Search, 
  Phone, 
  Mail, 
  Globe, 
  Share2, 
  Sparkles, 
  Workflow, 
  Calculator, 
  AlertTriangle, 
  Layers, 
  CheckSquare, 
  Calendar, 
  DollarSign, 
  ArrowRight, 
  ChevronRight, 
  Copy, 
  Check, 
  Zap, 
  ExternalLink,
  ShieldAlert,
  Flame,
  Clock
} from 'lucide-react';

interface MetaAdsBlueprintViewProps {
  onSelectTab?: (tab: DashboardTab) => void;
  onOpenCopilotWithContext?: (topic: string, details: string) => void;
}

export const MetaAdsBlueprintView: React.FC<MetaAdsBlueprintViewProps> = ({
  onSelectTab,
  onOpenCopilotWithContext
}) => {
  // Navigation tabs inside Blueprint
  const [activeSection, setActiveSection] = useState<'calculator' | 'phases' | 'engines' | 'diagnostic' | 'weekly_os'>('calculator');
  
  // Phase filtering & search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePhaseDetail, setActivePhaseDetail] = useState<BlueprintPhase | null>(BLUEPRINT_22_PHASES[0]);
  
  // Checkbox state for action items so user can interactively check items off
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({});

  // Diagnostic tree active problem
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticIssue>(BLUEPRINT_DIAGNOSTIC_ISSUES[0]);

  // Unit Economics Calculator State (defaults to BDT ৳2,000 example from PDF)
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const currencySymbol = currency === 'BDT' ? '৳' : '$';
  
  const [sellingPrice, setSellingPrice] = useState<number>(2000);
  const [cogs, setCogs] = useState<number>(700);
  const [packaging, setPackaging] = useState<number>(100);
  const [delivery, setDelivery] = useState<number>(150);
  const [paymentCod, setPaymentCod] = useState<number>(50);
  const [variableCost, setVariableCost] = useState<number>(200);
  const [monthlyOrdersTarget, setMonthlyOrdersTarget] = useState<number>(300);

  // Copied state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Calculated economics
  const economics = useMemo(() => {
    const totalCostPerUnit = cogs + packaging + delivery + paymentCod + variableCost;
    const contributionMargin = Math.max(0, sellingPrice - totalCostPerUnit);
    const breakEvenCpa = contributionMargin;
    const breakEvenRoas = contributionMargin > 0 ? (sellingPrice / breakEvenCpa) : 0;
    
    // Realistic targets
    const targetCpa50pct = Math.round(breakEvenCpa * 0.5);
    const targetRoas50pct = targetCpa50pct > 0 ? Number((sellingPrice / targetCpa50pct).toFixed(2)) : 0;
    
    const targetCpa25pct = Math.round(breakEvenCpa * 0.75);
    const targetRoas25pct = targetCpa25pct > 0 ? Number((sellingPrice / targetCpa25pct).toFixed(2)) : 0;

    const projectedRevenue = sellingPrice * monthlyOrdersTarget;
    const projectedGrossProfit = contributionMargin * monthlyOrdersTarget;
    const projectedAdBudgetAtTarget = targetCpa50pct * monthlyOrdersTarget;
    const projectedNetProfit = projectedGrossProfit - projectedAdBudgetAtTarget;

    return {
      totalCostPerUnit,
      contributionMargin,
      breakEvenCpa,
      breakEvenRoas: Number(breakEvenRoas.toFixed(2)),
      targetCpa50pct,
      targetRoas50pct,
      targetCpa25pct,
      targetRoas25pct,
      projectedRevenue,
      projectedGrossProfit,
      projectedAdBudgetAtTarget,
      projectedNetProfit
    };
  }, [sellingPrice, cogs, packaging, delivery, paymentCod, variableCost, monthlyOrdersTarget]);

  // Filtered 22 phases
  const filteredPhases = useMemo(() => {
    return BLUEPRINT_22_PHASES.filter(phase => {
      if (selectedCategory !== 'all' && phase.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mTitle = phase.title.toLowerCase().includes(q);
        const mTitleBn = phase.titleBn.toLowerCase().includes(q);
        const mSumm = phase.summary.toLowerCase().includes(q);
        const mSummBn = phase.summaryBn.toLowerCase().includes(q);
        const mActions = phase.actionItems.some(a => a.toLowerCase().includes(q));
        return mTitle || mTitleBn || mSumm || mSummBn || mActions;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const toggleActionCheck = (key: string) => {
    setCheckedActions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Hero: Official Blueprint Branding & Direct Contact */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800 p-5 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Abrar IT Care - AIC Official Release
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                22 Strategic Phases • 4 Core Engines
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Meta Andromeda AI Architecture
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                New Product Meta Ads Success Blueprint
              </h1>
              <p className="text-cyan-300/90 text-sm font-semibold mt-1">
                Research → Creative Signals → Campaign Signal → Conversion Signal → Meta Learning → Performance Data → Optimization → Scaling → LTV
              </p>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              একটি নতুন Product বা Business-এর Meta Ads চালানোর সময় সবচেয়ে বড় ভুল হলো—প্রথমেই Ads Manager খুলে Campaign তৈরি করা। সঠিক কাজ হলো আগে একটি <strong className="text-white font-bold">Business + Marketing + Data System</strong> তৈরি করা, তারপর advertising শুরু করা।
            </p>

            {/* Agency Contact Card Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300 border-t border-slate-800/80">
              <span className="font-bold text-white flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                {AIC_AGENCY_INFO.name}:
              </span>

              <a 
                href={`tel:${AIC_AGENCY_INFO.phone}`}
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold px-2.5 py-1 bg-emerald-950/40 border border-emerald-800/50 rounded-lg transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call: {AIC_AGENCY_INFO.phone}</span>
              </a>

              <a 
                href={`mailto:${AIC_AGENCY_INFO.email}`}
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold px-2.5 py-1 bg-cyan-950/40 border border-cyan-800/50 rounded-lg transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>{AIC_AGENCY_INFO.email}</span>
              </a>

              <a 
                href={AIC_AGENCY_INFO.portalUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white px-2.5 py-1 bg-slate-800/80 border border-slate-700 rounded-lg transition-colors"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>{AIC_AGENCY_INFO.portalDisplay}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>

              <a 
                href={AIC_AGENCY_INFO.facebookUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 px-2.5 py-1 bg-blue-950/40 border border-blue-800/50 rounded-lg transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>{AIC_AGENCY_INFO.facebookDisplay}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setActiveSection('calculator')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Unit Economics Lab</span>
            </button>

            {onSelectTab && (
              <button
                onClick={() => onSelectTab('cro')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>CRO Growth Audit Hub</span>
              </button>
            )}

            {onSelectTab && (
              <button
                onClick={() => onSelectTab('copilot')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-950/40 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Generate Client Strategy</span>
              </button>
            )}
          </div>
        </div>

        {/* Andromeda Principle Callout Strip */}
        <div className="mt-5 pt-4 border-t border-slate-800/90 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/20">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Meta Andromeda AI Retrieval Engine:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Meta-এর Andromeda হলো personalized ads retrieval engine—এটি বিশাল candidate pool থেকে relevant ads নির্বাচন করে পরবর্তী ranking stages-এ পাঠায়। আধুনিক Meta Ads স্ট্র্যাটেজি: <strong>"Perfect Targeting খোঁজা নয় → Better Signals তৈরি করা।"</strong>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-amber-500/20">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              AIC Growth Formula:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed font-mono">
              <strong className="text-white font-mono">{BLUEPRINT_CORE_FORMULA.equation}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveSection('calculator')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSection === 'calculator'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Unit Economics Calculator (Phase 01)</span>
        </button>

        <button
          onClick={() => setActiveSection('phases')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSection === 'phases'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>22-Phase Execution Roadmap</span>
          <span className="text-[10px] opacity-75 font-mono">(22)</span>
        </button>

        <button
          onClick={() => setActiveSection('engines')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSection === 'engines'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>4 Core Engines Architecture</span>
        </button>

        <button
          onClick={() => setActiveSection('diagnostic')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSection === 'diagnostic'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Diagnostic Ladder (Phase 13 & 14)</span>
        </button>

        <button
          onClick={() => setActiveSection('weekly_os')}
          className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeSection === 'weekly_os'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-amber-300" />
          <span>Weekly Operating System (Phase 19)</span>
        </button>
      </div>

      {/* SECTION 1: UNIT ECONOMICS CALCULATOR (PHASE 01) */}
      {activeSection === 'calculator' && (
        <div className="space-y-6">
          
          {/* Header Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  PHASE 01 IN BLUEPRINT
                </span>
                <h2 className="text-xl font-black text-white">
                  Business Economics আগে ঠিক করুন
                </h2>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setCurrency('BDT')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${currency === 'BDT' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  ৳ BDT (Taka)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${currency === 'USD' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  $ USD (Dollars)
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Ads চালানোর আগেই জানতে হবে একটি sale আপনার কাছে কতটা valuable। 
              <span className="font-semibold text-emerald-400 ml-1">
                "CPA ৳২০০-এর বেশি হলে Ad বন্ধ করুন"
              </span>—এই ধরনের universal rule ক্ষতিকর। আসল হিসাব: <strong>Decision আগে Economics, পরে Ads Metric।</strong>
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Inputs (7 Columns) */}
            <div className="lg:col-span-7 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Product Unit Economics Parameters</span>
                </h3>
                <button
                  onClick={() => {
                    setSellingPrice(2000);
                    setCogs(700);
                    setPackaging(100);
                    setDelivery(150);
                    setPaymentCod(50);
                    setVariableCost(200);
                    setMonthlyOrdersTarget(300);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline"
                >
                  Reset to PDF Example (৳2,000)
                </button>
              </div>

              {/* Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Selling Price */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-bold flex justify-between">
                    <span>Product Selling Price / AOV:</span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">{currencySymbol}{sellingPrice.toLocaleString()}</span>
                  </label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Product Cost / COGS */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex justify-between">
                    <span>Product Cost (COGS):</span>
                    <span className="text-slate-400 font-mono">{currencySymbol}{cogs.toLocaleString()}</span>
                  </label>
                  <input
                    type="number"
                    value={cogs}
                    onChange={(e) => setCogs(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Packaging */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex justify-between">
                    <span>Packaging & Box Cost:</span>
                    <span className="text-slate-400 font-mono">{currencySymbol}{packaging.toLocaleString()}</span>
                  </label>
                  <input
                    type="number"
                    value={packaging}
                    onChange={(e) => setPackaging(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Delivery */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex justify-between">
                    <span>Shipping / Delivery Cost:</span>
                    <span className="text-slate-400 font-mono">{currencySymbol}{delivery.toLocaleString()}</span>
                  </label>
                  <input
                    type="number"
                    value={delivery}
                    onChange={(e) => setDelivery(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Payment Gateway / COD fee */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold flex justify-between">
                    <span>Payment / COD Gateway Cost:</span>
                    <span className="text-slate-400 font-mono">{currencySymbol}{paymentCod.toLocaleString()}</span>
                  </label>
                  <input
                    type="number"
                    value={paymentCod}
                    onChange={(e) => setPaymentCod(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Expected return / cancellation / variable */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-slate-300 font-semibold flex justify-between">
                    <span>Return Risk & Operational Variable Cost:</span>
                    <span className="text-slate-400 font-mono">{currencySymbol}{variableCost.toLocaleString()}</span>
                  </label>
                  <input
                    type="number"
                    value={variableCost}
                    onChange={(e) => setVariableCost(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Monthly Volume Target */}
                <div className="space-y-1 sm:col-span-2 pt-2 border-t border-slate-800">
                  <label className="text-slate-300 font-semibold flex justify-between">
                    <span>Target Monthly Orders Volume:</span>
                    <span className="text-cyan-400 font-mono font-bold">{monthlyOrdersTarget} orders/mo</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={monthlyOrdersTarget}
                    onChange={(e) => setMonthlyOrdersTarget(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

              </div>
            </div>

            {/* Right Output Dashboard (5 Columns) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    REAL-TIME MARGIN & ROAS THRESHOLDS
                  </span>
                  <div className="text-lg font-black text-white mt-0.5">
                    Break-even & Target Metrics
                  </div>
                </div>

                {/* Break-even CPA & ROAS Highlight */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                      BREAK-EVEN CPA
                    </span>
                    <div className="text-2xl font-black text-white font-mono">
                      {currencySymbol}{economics.breakEvenCpa.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Max ad spend per sale to not lose money
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                      BREAK-EVEN ROAS
                    </span>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {economics.breakEvenRoas}x
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      Minimum revenue multiplier required
                    </span>
                  </div>
                </div>

                {/* Target Tiers */}
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span>Healthy Target (50% Profit):</span>
                    <span className="font-mono">CPA {currencySymbol}{economics.targetCpa50pct.toLocaleString()} • ROAS {economics.targetRoas50pct}x</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                    <span>Aggressive Scale (25% Profit):</span>
                    <span className="font-mono">CPA {currencySymbol}{economics.targetCpa25pct.toLocaleString()} • ROAS {economics.targetRoas25pct}x</span>
                  </div>
                </div>

                {/* Monthly Financial Projection */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Monthly Forecast @ {monthlyOrdersTarget} Orders:
                  </span>
                  <div className="flex justify-between text-slate-300">
                    <span>Gross Revenue:</span>
                    <span className="font-mono font-bold text-white">{currencySymbol}{economics.projectedRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Ad Budget (Target CPA):</span>
                    <span className="font-mono text-cyan-300">-{currencySymbol}{economics.projectedAdBudgetAtTarget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Product & Delivery Costs:</span>
                    <span className="font-mono text-slate-400">-{currencySymbol}{(economics.totalCostPerUnit * monthlyOrdersTarget).toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-emerald-400 text-sm">
                    <span>Net Contribution Profit:</span>
                    <span className="font-mono">+{currencySymbol}{economics.projectedNetProfit.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => handleCopyText(
                    `Unit Economics Analysis (${AIC_AGENCY_INFO.name}):\nSelling Price: ${currencySymbol}${sellingPrice}\nTotal Unit Cost: ${currencySymbol}${economics.totalCostPerUnit}\nBreak-Even CPA: ${currencySymbol}${economics.breakEvenCpa}\nBreak-Even ROAS: ${economics.breakEvenRoas}x\nTarget CPA: ${currencySymbol}${economics.targetCpa50pct} (ROAS: ${economics.targetRoas50pct}x)`,
                    'economics'
                  )}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedId === 'economics' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'economics' ? 'Copied Economics Summary!' : 'Copy Economics Breakdown'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 2: 22-PHASE EXECUTION ROADMAP */}
      {activeSection === 'phases' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 bg-slate-900/80 rounded-xl border border-slate-800">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {['all', 'Economics', 'Validation', 'Creative', 'Tracking', 'Campaign', 'Diagnostic', 'Scaling', 'Retention'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All 22 Phases' : cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search phase, checklist, Andromeda..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Phases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhases.map((phase) => {
              const isSelected = activePhaseDetail?.number === phase.number;

              return (
                <div
                  key={phase.number}
                  onClick={() => setActivePhaseDetail(phase)}
                  className={`cursor-pointer rounded-xl bg-slate-900/80 border p-4 transition-all hover:bg-slate-900 hover:border-slate-700 flex flex-col justify-between ${
                    isSelected
                      ? 'border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-950/30'
                      : 'border-slate-800'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                        PHASE {phase.number < 10 ? `0${phase.number}` : phase.number}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {phase.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white">
                      {phase.title}
                    </h3>
                    <div className="text-xs text-cyan-300 font-medium mt-0.5">
                      {phase.titleBn}
                    </div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {phase.summary}
                    </p>

                    {/* Key Action items snippet */}
                    <div className="mt-3 pt-3 border-t border-slate-800 space-y-1">
                      {phase.actionItems.slice(0, 2).map((action, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 truncate">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-400">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {phase.actionItems.length} Checklist Items
                    </span>
                    <span className="font-semibold flex items-center gap-1 hover:text-cyan-300">
                      <span>Inspect Details</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Phase Detail Modal / Flyout */}
          {activePhaseDetail && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded text-xs font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      PHASE {activePhaseDetail.number < 10 ? `0${activePhaseDetail.number}` : activePhaseDetail.number} DETAILS
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Category: {activePhaseDetail.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white">
                    {activePhaseDetail.title} — <span className="text-cyan-400">{activePhaseDetail.titleBn}</span>
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyText(
                      `Phase ${activePhaseDetail.number}: ${activePhaseDetail.title}\n${activePhaseDetail.summary}\nChecklist:\n- ${activePhaseDetail.actionItems.join('\n- ')}`,
                      'phase_detail'
                    )}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 flex items-center gap-1.5"
                  >
                    {copiedId === 'phase_detail' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copy Checklist</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenCopilotWithContext) {
                        onOpenCopilotWithContext(activePhaseDetail.title, activePhaseDetail.summary);
                      } else if (onSelectTab) {
                        onSelectTab('copilot');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Generate in Copilot</span>
                  </button>
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-bold text-slate-300 block mb-1">Executive Summary:</span>
                  <p className="text-slate-400 leading-relaxed">{activePhaseDetail.summary}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                  <span className="font-bold text-cyan-300 block mb-1">বাংলা নির্দেশিকা:</span>
                  <p className="text-slate-200 leading-relaxed">{activePhaseDetail.summaryBn}</p>
                </div>
              </div>

              {/* Key Rules if any */}
              {activePhaseDetail.keyRules && (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Golden Principle:</span>
                    {activePhaseDetail.keyRules.map((rule, idx) => (
                      <p key={idx} className="mt-0.5 text-slate-200">{rule}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Items Interactive Checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Interactive Execution Checklist (Click to check off):
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activePhaseDetail.actionItems.map((action, idx) => {
                    const checkKey = `phase-${activePhaseDetail.number}-${idx}`;
                    const isChecked = Boolean(checkedActions[checkKey]);

                    return (
                      <div
                        key={idx}
                        onClick={() => toggleActionCheck(checkKey)}
                        className={`cursor-pointer p-3 rounded-xl border transition-all flex items-start gap-2.5 text-xs ${
                          isChecked 
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                          isChecked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-slate-900'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={isChecked ? 'line-through opacity-80' : ''}>
                          {action}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* SECTION 3: 4 CORE ENGINES */}
      {activeSection === 'engines' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/30 via-slate-900 to-slate-950 border border-indigo-500/30">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 inline-block mb-1">
              THE 4 FOUNDATIONAL ENGINES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              The 4 Core Engines of Meta Ads Profitability
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              An ad is not an isolated creative; it is the visible tip of an integrated 4-engine growth machine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BLUEPRINT_FOUR_ENGINES.map((engine, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-slate-900/90 border ${engine.borderColor} shadow-xl flex flex-col justify-between space-y-4`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {engine.engine}
                    </span>
                    <span className={`text-xs font-bold ${engine.textColor}`}>
                      {engine.nameBn}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {engine.name}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {engine.description}
                  </p>

                  {/* Core Elements */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Core Pipeline Elements:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {engine.elements.map((el, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-950 text-slate-200 border border-slate-800 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          <span>{el}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Engineered by {AIC_AGENCY_INFO.shortName}
                  </span>
                  <button
                    onClick={() => {
                      setActiveSection('phases');
                      setSelectedCategory(
                        idx === 0 ? 'Validation' : idx === 1 ? 'Creative' : idx === 2 ? 'Tracking' : 'Economics'
                      );
                    }}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>View Engine Phases</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Formula Callout */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              The Master Operating Formula
            </span>
            <div className="text-lg sm:text-xl font-black text-white font-mono">
              {BLUEPRINT_CORE_FORMULA.equation}
            </div>
            <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {BLUEPRINT_CORE_FORMULA.statementBn}
            </p>
          </div>
        </div>
      )}

      {/* SECTION 4: DIAGNOSTIC LADDER & TROUBLESHOOTING (PHASE 13 & 14) */}
      {activeSection === 'diagnostic' && (
        <div className="space-y-6">
          
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-950 border border-rose-500/30">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 inline-block mb-1">
              PHASES 13 & 14: TEST WITHOUT PANIC
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Root-Cause Problem Diagnostic Ladder
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Launch করার কয়েক ঘন্টা পরেই "Sale নেই—সব বন্ধ!" এভাবে সিদ্ধান্ত নেওয়া যাবে না। 
              Diagnostic Ladder অনুযায়ী সমস্যা ঠিক কোথায় তা নিখুঁতভাবে বের করুন।
            </p>
            
            {/* The Ladder Visualization */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs font-bold text-cyan-300">
              <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">1. Delivery</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">2. Attention</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">3. Traffic</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">4. Intent</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">5. Conversion</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">6. Economics</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Issue Selector List (5 Cols) */}
            <div className="lg:col-span-5 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
                Select Observed Ad Problem:
              </span>

              {BLUEPRINT_DIAGNOSTIC_ISSUES.map((issue) => {
                const isSelected = selectedDiagnostic.id === issue.id;

                return (
                  <button
                    key={issue.id}
                    onClick={() => setSelectedDiagnostic(issue)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-500/80 text-white shadow-lg shadow-rose-950/30'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <ShieldAlert className={`w-4 h-4 ${isSelected ? 'text-rose-400' : 'text-slate-500'}`} />
                        {issue.symptom}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-400' : 'text-slate-600'}`} />
                    </div>
                    <div className="text-[11px] text-cyan-400/90 font-medium mt-1">
                      {issue.symptomBn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Resolution Panel (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-5">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  ROOT CAUSE ANALYSIS
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  {selectedDiagnostic.symptom}
                </h3>
                <p className="text-xs text-cyan-300 font-semibold mt-0.5">
                  {selectedDiagnostic.symptomBn}
                </p>
              </div>

              {/* Probable Cause */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-bold text-rose-400 block mb-1">
                  Primary Root Cause:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedDiagnostic.rootCause}
                </p>
              </div>

              {/* Diagnostic Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Diagnostic Verification Checklist:
                </span>
                <div className="space-y-1.5">
                  {selectedDiagnostic.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proven Solution */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>AIC Recommended Fix / অ্যাকশন প্ল্যান:</span>
                </div>
                <p className="text-slate-200 leading-relaxed pt-1">
                  {selectedDiagnostic.solution}
                </p>
                <p className="text-emerald-300/90 font-medium pt-1">
                  {selectedDiagnostic.solutionBn}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Need direct consultation? Call {AIC_AGENCY_INFO.phone}
                </span>
                <button
                  onClick={() => handleCopyText(
                    `Diagnostic: ${selectedDiagnostic.symptom}\nCause: ${selectedDiagnostic.rootCause}\nSolution: ${selectedDiagnostic.solution}`,
                    'diag'
                  )}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1"
                >
                  {copiedId === 'diag' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Solution</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 5: WEEKLY META ADS OPERATING SYSTEM (PHASE 19) */}
      {activeSection === 'weekly_os' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/30">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-block mb-1">
              PHASE 19: STRUCTURED WORKFLOW
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Weekly Meta Ads Operating System
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              প্রতি সপ্তাহে একটি structured review করুন যাতে ক্যাম্পেইন স্কেলিং অনুমানযোগ্য ও সিস্টেমেটিক হয়।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLUEPRINT_WEEKLY_OS.map((day, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-xs font-black uppercase bg-slate-950 text-amber-400 border border-slate-800">
                      {day.day}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {day.dayBn}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {day.focus}
                  </h3>
                  <div className="text-xs text-amber-300 font-medium mt-0.5">
                    {day.focusBn}
                  </div>

                  {/* Tasks */}
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                    {day.tasks.map((task, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Weekly Cadence
                  </span>
                  <span className="text-cyan-400 font-mono">Day 0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM AGENCY FOOTER & DIRECT CONTACT CALLOUT */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-white">
              Ready to Implement This Meta Ads Blueprint for Your Brand?
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Prepared by <strong className="text-white">{AIC_AGENCY_INFO.name}</strong> • Direct Client Advisory & Retainers
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`tel:${AIC_AGENCY_INFO.phone}`}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {AIC_AGENCY_INFO.phone}</span>
          </a>

          <a
            href={`mailto:${AIC_AGENCY_INFO.email}`}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Agency</span>
          </a>

          <a
            href={AIC_AGENCY_INFO.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Visit Academy Portal</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

    </div>
  );
};
