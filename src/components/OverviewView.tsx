import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Cpu, 
  Clock, 
  Activity, 
  AlertCircle, 
  ArrowUpRight, 
  CheckCircle2, 
  DollarSign, 
  Sparkles, 
  Zap,
  ChevronRight,
  Target,
  Flame,
  ArrowRight,
  Compass,
  Megaphone,
  Phone,
  Mail,
  Globe,
  MessageSquare,
  Award,
  ExternalLink,
  Bot
} from 'lucide-react';
import { Client, AIAgentSolution, PipelineProject, Invoice, ActivityEvent, DashboardTab } from '../types';
import { FinancialAnalyticsChart } from './FinancialAnalyticsChart';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';

interface OverviewViewProps {
  clients: Client[];
  agents: AIAgentSolution[];
  projects: PipelineProject[];
  invoices: Invoice[];
  activities: ActivityEvent[];
  onNavigateTab: (tab: DashboardTab) => void;
  onSelectClientPortal: (clientId: string) => void;
  onOpenDeployAgent: () => void;
  onOpenCopilot: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  clients,
  agents,
  projects,
  invoices,
  activities,
  onNavigateTab,
  onSelectClientPortal,
  onOpenDeployAgent,
  onOpenCopilot,
}) => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '12m'>('30d');

  // Computed metrics
  const totalMRR = clients.reduce((acc, c) => acc + (c.status === 'active' ? c.monthlyFee : 0), 0);
  const activeClientsCount = clients.filter(c => c.status === 'active').length;
  const totalRuns = agents.reduce((acc, a) => acc + a.monthlyRuns, 0);
  const totalApiCost = agents.reduce((acc, a) => acc + a.monthlyCost, 0);
  const operationalAgentsCount = agents.filter(a => a.status === 'operational').length;
  const estimatedHoursSaved = Math.round(totalRuns * 0.021); // ~1.25 mins saved per automated turn

  const pendingInvoicesTotal = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((acc, inv) => acc + inv.total, 0);

  // Chart data for run trends
  const monthlyTrends = [
    { month: 'May', runs: 85000, revenue: 26500 },
    { month: 'Jun', runs: 112000, revenue: 29000 },
    { month: 'Jul', runs: 146000, revenue: 32500 },
    { month: 'Aug', runs: 178000, revenue: 35000 },
    { month: 'Sep (Now)', runs: 202830, revenue: totalMRR },
  ];

  const maxRuns = Math.max(...monthlyTrends.map(m => m.runs));

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Welcome & Status */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{AIC_AGENCY_INFO.name} • {AIC_AGENCY_INFO.director}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Agency Operations & Fleet Control
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Real-time monitoring across {clients.length} client accounts, {agents.length} autonomous AI agents, and active automation pipelines.
            </p>

            {/* Quick Contact Micro-Bar */}
            <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs">
              <a 
                href={AIC_AGENCY_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 hover:text-emerald-200 transition-colors font-bold shadow-sm"
              >
                <MessageSquare className="w-3 h-3 text-emerald-400 fill-current" />
                <span>WhatsApp: {AIC_AGENCY_INFO.whatsapp}</span>
              </a>
              <a 
                href={`tel:${AIC_AGENCY_INFO.phone}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors font-medium"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>Call: {AIC_AGENCY_INFO.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigateTab('founder')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white transition-colors text-[11px] font-semibold"
              >
                <Award className="w-3 h-3 text-cyan-400" />
                <span>Founder Portfolio ({AIC_AGENCY_INFO.director})</span>
              </button>
              <a 
                href={`mailto:${AIC_AGENCY_INFO.email}`}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                <Mail className="w-3 h-3 text-cyan-400" />
                <span>{AIC_AGENCY_INFO.email}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('founder')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 border border-emerald-400/30"
            >
              <Award className="w-4 h-4 text-emerald-200" />
              <span>Founder Spotlight & Bio</span>
            </button>
            <button
              onClick={() => onNavigateTab('blueprint')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-950/50 transition-all flex items-center gap-2 border border-cyan-400/40"
            >
              <Megaphone className="w-4 h-4 text-cyan-200 animate-bounce" />
              <span>Meta Ads Blueprint (22 Phases)</span>
            </button>
            <button
              onClick={() => onNavigateTab('services')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500/25 via-teal-500/25 to-cyan-500/25 hover:from-emerald-500/35 hover:to-cyan-500/35 text-emerald-300 border border-emerald-500/50 shadow-sm transition-all flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Major Service: Agentic AI</span>
            </button>
            <button
              onClick={() => onNavigateTab('cro')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-emerald-400" />
              <span>CRO Growth Audit</span>
            </button>
            <button
              onClick={onOpenCopilot}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>AIC Proposal AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Founder Spotlight & Verified Portfolios Showcase */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5 shadow-md">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Founder Spotlight & Leadership
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-sm">
                  <Bot className="w-3 h-3 fill-current" />
                  EXPERT IN AGENTIC AI
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {AIC_AGENCY_INFO.director}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  WhatsApp: {AIC_AGENCY_INFO.whatsapp}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Engineering Scalable, Ethical & Autonomous Agentic AI Systems
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Led by <strong>{AIC_AGENCY_INFO.director}</strong> (Expert in Agentic AI), AIC engineers proprietary autonomous multi-agent fleets, Meta Andromeda scaling blueprints, and conversion architectures to build predictable revenue engines for enterprises.
              </p>

              {/* Founder Portfolios Quick Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <a
                  href={AIC_AGENCY_INFO.founderPortfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-400/50 transition-colors font-semibold shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Portfolio: {AIC_AGENCY_INFO.founderPortfolioDisplay}</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>

                <a
                  href={AIC_AGENCY_INFO.founderAcademyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-indigo-300 border border-indigo-500/40 transition-colors font-medium"
                >
                  <Award className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Academy: {AIC_AGENCY_INFO.founderAcademyDisplay}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={AIC_AGENCY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 transition-colors font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current text-emerald-400" />
                  <span>Direct Chat: {AIC_AGENCY_INFO.whatsapp}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateTab('founder')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 border border-cyan-400/30"
            >
              <Globe className="w-4 h-4" />
              <span>Explore Founder Portfolio (Live)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Highlighted Spotlight: CRO & Business Growth Strategy Command */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/30 to-indigo-950/40 border border-cyan-500/40 rounded-2xl p-5 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Featured Digital Marketing Service
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  HIGH CLIENT CONVERSION
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Business & CRO Audit Suite: Prove Why Optimization Is Indispensable
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Show prospects how unoptimized funnels are burning ad spend, calculate exact monthly revenue leaks, and provide a 60-day scientific A/B testing roadmap based on uploaded audit files.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={() => onNavigateTab('cro')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
            >
              <span>Launch CRO Audit Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Monthly Recurring Revenue */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Monthly Retainers (MRR)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              ${totalMRR.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +18.4%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Pending Invoices:</span>
            <span className="font-semibold text-amber-400">${pendingInvoicesTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Card 2: Total Automation Runs */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Monthly AI Runs</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {totalRuns.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-cyan-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +24.1%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>API Pass-through Cost:</span>
            <span className="font-mono text-slate-300">${totalApiCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Card 3: Client Hours Saved */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Human Hours Reclaimed</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              {estimatedHoursSaved.toLocaleString()} hrs
            </span>
            <span className="text-xs font-medium text-indigo-400">
              Avg 1.25m / turn
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Client Value Delivered:</span>
            <span className="font-semibold text-emerald-400">~${(estimatedHoursSaved * 45).toLocaleString()}</span>
          </div>
        </div>

        {/* Card 4: Fleet Health & Active Agents */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Fleet Health & Uptime</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white tracking-tight">
              99.85%
            </span>
            <span className="text-xs font-medium text-emerald-400 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-0.5" /> All nominal
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Operational Agents:</span>
            <span className="font-semibold text-slate-300">{operationalAgentsCount} / {agents.length} active</span>
          </div>
        </div>

      </div>

      {/* Financial Analytics: MRR Trends & Invoicing Analytics using Recharts */}
      <FinancialAnalyticsChart invoices={invoices} currentMRR={totalMRR} />

      {/* Main Grid: Run Trend Visualizer & Client Health Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Automation Runs & MRR Growth */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Monthly Automation Volume & Revenue Velocity
              </h2>
              <p className="text-xs text-slate-400">
                Aggregated LLM agent executions and monthly retainers
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  timeRange === '30d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Recent
              </button>
              <button
                onClick={() => setTimeRange('90d')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  timeRange === '90d' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Quarter
              </button>
              <button
                onClick={() => setTimeRange('12m')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  timeRange === '12m' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                12M
              </button>
            </div>
          </div>

          {/* Bar / Column visualization */}
          <div className="pt-6">
            <div className="h-56 flex items-end gap-3 sm:gap-6 justify-between px-2">
              {monthlyTrends.map((item, idx) => {
                const heightPct = Math.round((item.runs / maxRuns) * 100);
                const isCurrent = idx === monthlyTrends.length - 1;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-950 border border-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] font-mono whitespace-nowrap pointer-events-none z-20 shadow-xl">
                      {item.runs.toLocaleString()} runs • ${item.revenue.toLocaleString()} MRR
                    </div>

                    {/* Bar visual */}
                    <div className="w-full bg-slate-800/60 rounded-t-lg relative flex items-end overflow-hidden h-44">
                      <div 
                        style={{ height: `${heightPct}%` }}
                        className={`w-full rounded-t-lg transition-all duration-700 ${
                          isCurrent
                            ? 'bg-gradient-to-t from-indigo-600 via-cyan-500 to-cyan-300'
                            : 'bg-gradient-to-t from-slate-700 to-indigo-600/70 hover:from-slate-600 hover:to-indigo-500'
                        }`}
                      ></div>
                    </div>

                    {/* Label */}
                    <span className={`text-xs font-medium ${isCurrent ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick Metrics Footer */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-500 block">Avg Response Latency</span>
                <span className="font-semibold text-white font-mono">485ms</span>
              </div>
              <div>
                <span className="text-slate-500 block">Error Rate</span>
                <span className="font-semibold text-emerald-400 font-mono">0.14%</span>
              </div>
              <div>
                <span className="text-slate-500 block">Client Net Retention</span>
                <span className="font-semibold text-cyan-400 font-mono">100%</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Live Activity Stream */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Agency Activity
            </h2>
            <span className="text-[11px] text-slate-500">Real-time</span>
          </div>

          <div className="space-y-3.5 mt-4 flex-1 overflow-y-auto max-h-[320px] pr-1">
            {activities.map((act) => (
              <div key={act.id} className="text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="font-semibold text-slate-200 truncate">{act.title}</span>
                  <span className="text-[10px] text-slate-500 shrink-0">{act.timestamp}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {act.description}
                </p>
                {act.clientName && (
                  <span className="inline-block mt-1 text-[10px] text-cyan-400 font-medium">
                    @{act.clientName}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 mt-auto">
            <button
              onClick={() => onNavigateTab('fleet')}
              className="w-full py-1.5 text-xs text-center text-indigo-400 hover:text-indigo-300 font-medium flex items-center justify-center gap-1"
            >
              <span>View Agent Fleet Logs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section: Active Client Accounts & Retainers Snapshot */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              Active Client Retainers & Usage Quotas
            </h2>
            <p className="text-xs text-slate-400">
              Direct access to client accounts and portal simulators
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('clients')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            <span>Manage All Clients</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {clients.map((client) => {
            const tokenPct = Math.min(100, Math.round((client.monthlyTokensUsed / client.monthlyTokensLimit) * 100));
            return (
              <div 
                key={client.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${client.avatarColor} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {client.name}
                        </h3>
                        <span className="text-[10px] text-slate-400">{client.industry}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      client.status === 'active' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{client.tier}</span>
                    <span className="font-bold text-white">${client.monthlyFee.toLocaleString()}/mo</span>
                  </div>

                  {/* Token usage progress bar */}
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span>Token Quota</span>
                      <span className="font-mono text-slate-300">{tokenPct}% ({Math.round(client.monthlyTokensUsed / 1000)}k / {Math.round(client.monthlyTokensLimit / 1000)}k)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${tokenPct}%` }}
                        className={`h-full rounded-full transition-all ${
                          tokenPct > 85 ? 'bg-rose-500' : tokenPct > 65 ? 'bg-amber-400' : 'bg-indigo-500'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Lead: <strong className="text-slate-300">{client.leadArchitect}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectClientPortal(client.id)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 group-hover:underline"
                  >
                    <span>Client Portal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
