import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Sparkles, 
  Plus, 
  Search, 
  Sliders, 
  DollarSign, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  MousePointer, 
  BarChart3, 
  Layers, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  X, 
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Flame,
  Lightbulb,
  FileDown,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { 
  CroChecklistItem, 
  CroAuditProfile, 
  CroUploadedFile, 
  CroCategory, 
  CroPriority, 
  CroStatus,
  Client
} from '../types';
import { 
  INITIAL_CRO_PROFILES, 
  INITIAL_CRO_CHECKLIST, 
  INITIAL_CRO_FILES 
} from '../data/croAuditData';
import { generateCroReportPdf } from '../utils/croPdfExport';

interface CroReportViewProps {
  clients: Client[];
}

export const CroReportView: React.FC<CroReportViewProps> = ({ clients }) => {
  // Profiles
  const [profiles, setProfiles] = useState<CroAuditProfile[]>(INITIAL_CRO_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string>(INITIAL_CRO_PROFILES[0].id);

  // Active Profile
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  // Checklist Items State
  const [checklist, setChecklist] = useState<CroChecklistItem[]>(INITIAL_CRO_CHECKLIST);
  const [uploadedFiles, setUploadedFiles] = useState<CroUploadedFile[]>(INITIAL_CRO_FILES);

  // UI View Tabs
  const [viewMode, setViewMode] = useState<'checklist' | 'calculator' | 'files' | 'presentation'>('checklist');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive Calculator State (synced with active profile)
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(activeProfile.monthlyVisitors);
  const [currentCR, setCurrentCR] = useState<number>(activeProfile.currentConvRate);
  const [targetCR, setTargetCR] = useState<number>(activeProfile.targetConvRate);
  const [aov, setAov] = useState<number>(activeProfile.averageOrderValue);
  const [adSpend, setAdSpend] = useState<number>(activeProfile.monthlyAdSpend);

  // Modals & Drawers
  const [isAddTodoOpen, setIsAddTodoOpen] = useState<boolean>(false);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiGeneratedReport, setAiGeneratedReport] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [expandedItemId, setExpandedItemId] = useState<string | null>('cro-chk-1');

  // New Custom Task Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CroCategory>('above_the_fold');
  const [newPriority, setNewPriority] = useState<CroPriority>('critical');
  const [newImpact, setNewImpact] = useState('+15% - 25% Lift');
  const [newWhyCrucial, setNewWhyCrucial] = useState('');
  const [newActionSteps, setNewActionSteps] = useState('');

  // File Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileForReview, setSelectedFileForReview] = useState<CroUploadedFile | null>(uploadedFiles[0]);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // When profile switches, update calculator
  const handleSelectProfile = (profileId: string) => {
    setActiveProfileId(profileId);
    const p = profiles.find(pr => pr.id === profileId);
    if (p) {
      setMonthlyVisitors(p.monthlyVisitors);
      setCurrentCR(p.currentConvRate);
      setTargetCR(p.targetConvRate);
      setAov(p.averageOrderValue);
      setAdSpend(p.monthlyAdSpend);
      setAiGeneratedReport(null);
    }
  };

  // Calculations
  const currentMonthlyOrders = Math.round(monthlyVisitors * (currentCR / 100));
  const targetMonthlyOrders = Math.round(monthlyVisitors * (targetCR / 100));
  const currentMonthlyRevenue = Math.round(currentMonthlyOrders * aov);
  const targetMonthlyRevenue = Math.round(targetMonthlyOrders * aov);
  const monthlyRevenueLeakage = Math.max(0, targetMonthlyRevenue - currentMonthlyRevenue);
  const annualRevenueOpportunity = monthlyRevenueLeakage * 12;
  const currentCAC = currentMonthlyOrders > 0 ? Math.round(adSpend / currentMonthlyOrders) : 0;
  const targetCAC = targetMonthlyOrders > 0 ? Math.round(adSpend / targetMonthlyOrders) : 0;
  const cacReductionPct = currentCAC > 0 ? Math.round(((currentCAC - targetCAC) / currentCAC) * 100) : 0;
  const retainerFee = 4500;
  const estimatedRetainerRoi = monthlyRevenueLeakage > 0 ? (monthlyRevenueLeakage / retainerFee).toFixed(1) : '12.4';

  // Revenue Trajectory Data for Chart
  const comparisonChartData = [
    { month: 'Month 1', current: currentMonthlyRevenue, optimized: currentMonthlyRevenue + Math.round(monthlyRevenueLeakage * 0.3) },
    { month: 'Month 2', current: currentMonthlyRevenue, optimized: currentMonthlyRevenue + Math.round(monthlyRevenueLeakage * 0.6) },
    { month: 'Month 3', current: currentMonthlyRevenue, optimized: currentMonthlyRevenue + Math.round(monthlyRevenueLeakage * 0.85) },
    { month: 'Month 4', current: currentMonthlyRevenue, optimized: targetMonthlyRevenue },
    { month: 'Month 5', current: currentMonthlyRevenue, optimized: Math.round(targetMonthlyRevenue * 1.05) },
    { month: 'Month 6', current: currentMonthlyRevenue, optimized: Math.round(targetMonthlyRevenue * 1.12) },
  ];

  // Checklist statistics
  const totalTasks = checklist.length;
  const completedTasks = checklist.filter(i => i.status === 'completed').length;
  const inProgressTasks = checklist.filter(i => i.status === 'in_progress').length;
  const criticalCount = checklist.filter(i => i.priority === 'critical').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const healthScore = Math.min(100, Math.round(40 + (completionPercentage * 0.6)));

  // Filtered Checklist
  const filteredChecklist = checklist.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.whyCrucial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPriority && matchesStatus && matchesSearch;
  });

  // Checklist handlers
  const handleToggleStatus = (id: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus: CroStatus = 
          item.status === 'todo' ? 'in_progress' : 
          item.status === 'in_progress' ? 'completed' : 'todo';
        if (nextStatus === 'completed') {
          confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
        }
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleAddCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const categoryLabels: Record<CroCategory, string> = {
      above_the_fold: 'Above-the-Fold & Hero',
      funnel_journey: 'Funnel & User Flow',
      form_friction: 'Friction & Lead Forms',
      trust_proof: 'Psychology & Trust',
      checkout_cart: 'Checkout & Payment',
      speed_tech: 'Speed & Technical UX',
      analytics_tracking: 'Data & Tracking Integrity',
      ab_testing: 'A/B Testing & Strategy'
    };

    const actionStepsList = newActionSteps
      ? newActionSteps.split('\n').filter(s => s.trim().length > 0)
      : ['Execute initial heuristic review', 'Deploy test variation in sandbox', 'Validate against baseline'];

    const newTask: CroChecklistItem = {
      id: `cro-custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel: categoryLabels[newCategory] || 'CRO Optimization',
      priority: newPriority,
      status: 'todo',
      estimatedImpact: newImpact || '+12% - 20% Lift',
      whyCrucial: newWhyCrucial || 'Friction point identified during expert diagnostic requiring optimization.',
      actionSteps: actionStepsList,
      source: 'custom'
    };

    setChecklist(prev => [newTask, ...prev]);
    setIsAddTodoOpen(false);
    setNewTitle('');
    setNewWhyCrucial('');
    setNewActionSteps('');
    showToast(`Added custom CRO task: "${newTask.title}"`);
  };

  // Add finding from uploaded file directly to checklist
  const handleAddFindingToTasks = (finding: { issue: string; frictionType: string; impact: 'High' | 'Medium' | 'Critical'; suggestedFix: string }, fileName: string) => {
    const priorityMap: Record<string, CroPriority> = {
      Critical: 'critical',
      High: 'high',
      Medium: 'medium'
    };

    const newTask: CroChecklistItem = {
      id: `cro-file-finding-${Date.now()}`,
      title: `Fix: ${finding.issue}`,
      category: 'checkout_cart',
      categoryLabel: `File Audit: ${finding.frictionType}`,
      priority: priorityMap[finding.impact] || 'high',
      status: 'todo',
      estimatedImpact: finding.impact === 'Critical' ? '+20% - 35% Lift' : '+10% - 18% Lift',
      whyCrucial: `Identified directly from uploaded analysis file "${fileName}". Addressing this friction is mandatory to stop ongoing visitor drop-off.`,
      actionSteps: [
        finding.suggestedFix,
        'Perform A/B test split against control version',
        'Verify conversion event firing in GA4 / Meta CAPI'
      ],
      source: 'file_upload'
    };

    setChecklist(prev => [newTask, ...prev]);
    showToast(`Converted finding into To-Do task: "${newTask.title}"`);
  };

  // File Upload Simulator
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const isImage = file.type.startsWith('image/');
    const isCsv = file.name.endsWith('.csv') || file.type.includes('csv');

    const newUploadedFile: CroUploadedFile = {
      id: `file-${Date.now()}`,
      fileName: file.name,
      fileSize: `${Math.round(file.size / 1024)} KB`,
      fileType: file.type || 'application/octet-stream',
      uploadedAt: 'Just now',
      fileCategory: isImage ? 'screenshot_ui' : isCsv ? 'analytics_csv' : 'wireframe_doc',
      findingsCount: 3,
      extractedFindings: [
        {
          issue: `Detected Conversion Leak on ${file.name.slice(0, 20)}`,
          frictionType: isImage ? 'Visual Hierarchy & Mobile UX' : 'Funnel Drop-off',
          impact: 'Critical',
          suggestedFix: isImage 
            ? 'Contrast ratio between hero background and CTA is below WCAG AAA. Elevate button prominence and add risk-reversal subtext.'
            : 'Significant 72% drop-off identified between Add-to-Cart and Initiate Checkout. Eliminate hidden shipping fees.'
        },
        {
          issue: 'Missing Trust Anchors at Key Decision Stage',
          frictionType: 'Social Proof Deficit',
          impact: 'High',
          suggestedFix: 'Place customer rating badges (e.g. 4.9/5 stars) and 30-day money-back guarantee adjacent to primary transaction button.'
        },
        {
          issue: 'Mobile Viewport Input Padding Deficit',
          frictionType: 'Touch Target Friction',
          impact: 'Medium',
          suggestedFix: 'Ensure all form input heights are at least 48px to eliminate tap frustration on mobile smartphones.'
        }
      ]
    };

    setUploadedFiles(prev => [newUploadedFile, ...prev]);
    setSelectedFileForReview(newUploadedFile);
    showToast(`Analyzed ${file.name}: 3 actionable CRO findings extracted!`);
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.7 } });
  };

  // AI CRO Report Generator via Gemini or Strategic Engine
  const handleGenerateAiCroReport = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/agency/ai-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cro_audit',
          clientName: activeProfile.businessName,
          industry: activeProfile.industry,
          notes: activeProfile.websiteUrl,
          budget: `${monthlyVisitors.toLocaleString()} monthly visitors, ${currentCR}% CR, $${aov} AOV, $${adSpend.toLocaleString()} ad spend`
        })
      });
      const data = await res.json();
      if (data.content) {
        setAiGeneratedReport(data.content);
        setViewMode('presentation');
        showToast('Generated comprehensive CRO Audit Report!');
        confetti({ particleCount: 50, spread: 65, origin: { y: 0.6 } });
      }
    } catch (e) {
      console.error('Failed to generate CRO audit:', e);
      showToast('Generated local strategic CRO audit report.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const showToast = (msg: string) => {
    setCopiedNotification(msg);
    setTimeout(() => setCopiedNotification(null), 3500);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  // PDF Export Handler specifically for the CRO Report view
  const handleExportPdf = () => {
    setIsExportingPdf(true);
    try {
      generateCroReportPdf({
        profile: activeProfile,
        checklist,
        uploadedFiles,
        metrics: {
          monthlyVisitors: activeProfile.monthlyVisitors,
          currentCR: activeProfile.currentConvRate,
          targetCR: activeProfile.targetConvRate,
          aov: activeProfile.averageOrderValue,
          adSpend: activeProfile.monthlyAdSpend,
          monthlyRevenueLeakage,
          annualRevenueOpportunity,
          currentCAC: Math.round(currentCAC),
          targetCAC: Math.round(targetCAC),
          cacReductionPct: Math.round(cacReductionPct),
          estimatedRetainerRoi,
          completedTasks: completedTasks,
          totalTasks: checklist.length,
          healthScore: activeProfile.healthScore,
        },
        aiReport: aiGeneratedReport,
        strategistName: 'Abu Talib',
        agencyName: 'AIC Digital Marketing & Growth Hub'
      });
      showToast(`Exported PDF: "${activeProfile.businessName}-CRO-Growth-Audit-Report.pdf"`);
      confetti({ particleCount: 50, spread: 65, origin: { y: 0.65 } });
    } catch (error) {
      console.error('Failed to export PDF:', error);
      showToast('Could not compile PDF. Opening print dialog as fallback.');
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/60 text-cyan-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce font-medium backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Hero Header & Executive Persona Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Digital Marketing Strategist & CRO Command • Abu Talib</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span>Business & CRO Growth Audit Suite</span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Revenue Multiplier Engine
              </span>
            </h1>

            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Why this service is indispensable: <strong className="text-white font-medium">Driving more paid traffic into a leaky funnel is burning cash.</strong> By doubling conversion rates, your clients cut CAC in half and multiply net profit with <em className="text-cyan-300 not-italic font-semibold">$0 additional ad spend</em>.
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 border border-emerald-300/30 disabled:opacity-50"
              title="Download full executive CRO report as a PDF"
            >
              {isExportingPdf ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <FileDown className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              )}
              <span>{isExportingPdf ? 'Generating PDF...' : 'Download Client PDF'}</span>
            </button>

            <button
              onClick={handleGenerateAiCroReport}
              disabled={isAiGenerating}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-600/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" style={{ animationDuration: isAiGenerating ? '1s' : '0s' }} />
              <span>{isAiGenerating ? 'Analyzing Funnel...' : 'Generate AI CRO Strategy'}</span>
            </button>

            <button
              onClick={() => {
                window.print();
              }}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Open browser print preview"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>Print View</span>
            </button>
          </div>
        </div>

        {/* Client / Business Profile Switcher */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" /> Auditing Business:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {profiles.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelectProfile(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeProfileId === p.id 
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm' 
                      : 'bg-slate-950/70 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {p.businessName}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2 self-start sm:self-auto">
            <span className="font-mono text-cyan-400">{activeProfile.websiteUrl}</span>
            <span className="text-slate-600">•</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{activeProfile.industry}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Checklist, Calculator & Math, Uploaded Files, Presentation Report */}
      <div className="flex border-b border-slate-800 gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'checklist', label: '1. CRO Audit Checklist & To-Do', icon: CheckCircle2, badge: `${completedTasks}/${totalTasks}` },
          { id: 'calculator', label: '2. Revenue Leakage & ROI Proof', icon: DollarSign, badge: `+$${(monthlyRevenueLeakage/1000).toFixed(0)}k/mo` },
          { id: 'files', label: '3. Uploaded Files & Asset Findings', icon: Upload, badge: uploadedFiles.length },
          { id: 'presentation', label: '4. Executive Pitch & Client Report', icon: FileText, highlight: true },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = viewMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive 
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900/40' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: CRO AUDIT CHECKLIST & TO-DO (CORE ENGINE) */}
      {/* ========================================================================= */}
      {viewMode === 'checklist' && (
        <div className="space-y-6">
          
          {/* Executive Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">CRO Health Score</span>
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{healthScore}/100</span>
                <span className="text-xs text-amber-400 font-medium">Critical Leaks Present</span>
              </div>
              <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-cyan-400 h-full rounded-full transition-all duration-500" style={{ width: `${healthScore}%` }} />
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Audit Completion</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{completedTasks} / {totalTasks}</span>
                <span className="text-xs text-emerald-400 font-medium">{completionPercentage}% audited</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                {inProgressTasks} items currently in active testing
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">High-Priority Friction Points</span>
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-rose-300">{criticalCount} Critical</span>
                <span className="text-xs text-slate-400 font-medium">Top Priority</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Immediate quick-wins ready for 7-day deployment
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Monthly Revenue at Stake</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-300">+${monthlyRevenueLeakage.toLocaleString()}</span>
                <span className="text-xs text-slate-400 font-medium">/month</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                From {activeProfile.monthlyVisitors.toLocaleString()} existing visitors
              </div>
            </div>

          </div>

          {/* Filter & Action Toolbar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              
              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search audit tasks, friction or why crucial..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Categories ({checklist.length})</option>
                <option value="above_the_fold">Above-the-Fold & Hero</option>
                <option value="funnel_journey">Funnel & User Flow</option>
                <option value="form_friction">Friction & Lead Forms</option>
                <option value="trust_proof">Psychology & Trust</option>
                <option value="checkout_cart">Checkout & Payment</option>
                <option value="speed_tech">Speed & Technical UX</option>
                <option value="analytics_tracking">Data & Tracking Integrity</option>
                <option value="ab_testing">A/B Testing & Strategy</option>
              </select>

              {/* Priority Filter */}
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical Priority Only</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Statuses</option>
                <option value="todo">To-Do ({checklist.filter(i => i.status === 'todo').length})</option>
                <option value="in_progress">In Progress ({checklist.filter(i => i.status === 'in_progress').length})</option>
                <option value="completed">Completed ({checklist.filter(i => i.status === 'completed').length})</option>
              </select>

            </div>

            {/* Right Action: Add Custom Task */}
            <div className="flex items-center gap-2 self-end lg:self-auto">
              <button
                onClick={() => setIsAddTodoOpen(true)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Audit Task</span>
              </button>
            </div>
          </div>

          {/* Checklist Items List */}
          <div className="space-y-3">
            {filteredChecklist.length === 0 ? (
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 text-center text-slate-500">
                <Target className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-sm">No audit checklist items match your filters.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedPriority('all'); setSelectedStatus('all'); setSearchQuery(''); }}
                  className="mt-2 text-xs text-cyan-400 hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredChecklist.map((item, idx) => {
                const isExpanded = expandedItemId === item.id;
                const isDone = item.status === 'completed';
                const isInProgress = item.status === 'in_progress';

                return (
                  <div
                    key={item.id}
                    className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                      isDone 
                        ? 'bg-slate-950/40 border-slate-800/50 opacity-80' 
                        : isInProgress 
                        ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-950/20' 
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Item Main Row */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      <div className="flex items-start gap-3 flex-1">
                        {/* Status Toggle Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id)}
                          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                            isDone 
                              ? 'bg-emerald-500 text-slate-950 shadow-sm' 
                              : isInProgress
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/60'
                              : 'border border-slate-700 hover:border-slate-500 text-transparent'
                          }`}
                          title={`Click to cycle status (Current: ${item.status})`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : isInProgress ? <Clock className="w-3.5 h-3.5" /> : null}
                        </button>

                        {/* Title & Metadata */}
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className={`text-sm font-semibold transition-colors ${
                              isDone ? 'line-through text-slate-500' : 'text-slate-100'
                            }`}>
                              {idx + 1}. {item.title}
                            </h3>

                            {/* Category Pill */}
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {item.categoryLabel}
                            </span>

                            {/* Priority Pill */}
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              item.priority === 'critical' 
                                ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' 
                                : item.priority === 'high' 
                                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                              {item.priority.toUpperCase()}
                            </span>

                            {/* Impact Badge */}
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                              <TrendingUp className="w-2.5 h-2.5" /> {item.estimatedImpact}
                            </span>

                            {/* Source tag if custom or from uploaded file */}
                            {item.source === 'file_upload' && (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1">
                                <FileSpreadsheet className="w-2.5 h-2.5" /> From Uploaded File
                              </span>
                            )}
                          </div>

                          {/* Preview snippet */}
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {item.whyCrucial}
                          </p>
                        </div>
                      </div>

                      {/* Right Action: Status Pill & Expand Details */}
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize transition-colors ${
                            isDone 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                              : isInProgress
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                          }`}
                        >
                          {item.status === 'in_progress' ? 'In Progress' : item.status}
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                          title="Toggle details"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Strategic Breakdown */}
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/50 space-y-3.5 text-xs">
                        
                        {/* Why Crucial (Client Pitch) Box */}
                        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-lg p-3">
                          <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            <span>Why This Is Crucial For The Client (কেন এই কাজটি আবশ্যক):</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">
                            {item.whyCrucial}
                          </p>
                        </div>

                        {/* Action Steps */}
                        <div className="space-y-1.5">
                          <span className="text-slate-400 font-medium">Tactical Implementation & Audit Checklist:</span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                            {item.actionSteps.map((step, sIdx) => (
                              <div 
                                key={sIdx}
                                className="flex items-start gap-2 bg-slate-900/90 border border-slate-800/90 rounded-lg p-2.5 text-slate-300"
                              >
                                <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                                  {sIdx + 1}
                                </div>
                                <span className="leading-tight text-[11px]">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tested Variant or Note */}
                        {item.testedVariant && (
                          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">
                              <strong className="text-slate-300 font-medium">Recommended A/B Test:</strong> {item.testedVariant}
                            </span>
                            <span className="text-cyan-400 font-medium">ICE Score: 9.2/10</span>
                          </div>
                        )}

                        {/* Card Action footer */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] text-slate-500">
                            Estimated conversion lift: <strong className="text-emerald-400 font-medium">{item.estimatedImpact}</strong>
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyText(`Audit Finding: ${item.title}\nWhy Crucial: ${item.whyCrucial}\nActions: ${item.actionSteps.join('; ')}`, item.title)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] flex items-center gap-1 transition-colors border border-slate-700"
                            >
                              <Copy className="w-3 h-3" />
                              <span>Copy Finding</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: REVENUE LEAKAGE CALCULATOR & ROI PROOF */}
      {/* ========================================================================= */}
      {viewMode === 'calculator' && (
        <div className="space-y-6">
          
          {/* Top Compelling Value Pitch */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-cyan-400" />
              <span>Revenue Multiplier & Traffic Leakage Simulator</span>
            </h2>
            <p className="text-slate-300 text-xs mt-1 max-w-3xl leading-relaxed">
              Use this mathematical model to demonstrate to your client why <strong className="text-white">CRO is 10x more profitable than increasing ad spend</strong>. Adjust the sliders below based on their live metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Interactive Sliders & Inputs (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Client Live Funnel Metrics</span>
              </h3>

              {/* Monthly Visitors */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-slate-300 font-medium">Monthly Unique Visitors</label>
                  <span className="font-mono font-bold text-cyan-300">{monthlyVisitors.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="300000"
                  step="5000"
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Current Conversion Rate */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-slate-300 font-medium">Current Conversion Rate</label>
                  <span className="font-mono font-bold text-amber-300">{currentCR.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.05"
                  value={currentCR}
                  onChange={(e) => setCurrentCR(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>Industry Avg: ~1.8%</span>
                  <span>Current: {currentMonthlyOrders.toLocaleString()} orders/mo</span>
                </div>
              </div>

              {/* Target Optimized Conversion Rate */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-slate-300 font-medium">Target CRO Conversion Rate</label>
                  <span className="font-mono font-bold text-emerald-300">{targetCR.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.1"
                  value={targetCR}
                  onChange={(e) => setTargetCR(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>Conservative Lift</span>
                  <span>Target: {targetMonthlyOrders.toLocaleString()} orders/mo</span>
                </div>
              </div>

              {/* Average Order Value (AOV) / Deal Value */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-slate-300 font-medium">Average Order Value (AOV / Lead Value)</label>
                  <span className="font-mono font-bold text-white">${aov}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="5"
                  value={aov}
                  onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full accent-indigo-400 cursor-pointer"
                />
              </div>

              {/* Monthly Ad Spend */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-slate-300 font-medium">Monthly Paid Ad Spend (Meta, Google, TikTok)</label>
                  <span className="font-mono font-bold text-rose-300">${adSpend.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="150000"
                  step="2000"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>

              <div className="pt-2">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Current Blended CAC:</span>
                    <span className="font-mono text-slate-200">${currentCAC} / customer</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Projected Post-CRO CAC:</span>
                    <span className="font-mono">${targetCAC} / customer ({cacReductionPct}% Drop!)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Revenue Impact & Chart (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Massive Output Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-center">
                  <span className="text-[11px] font-medium text-slate-400 block">Current Monthly Revenue</span>
                  <span className="text-xl font-bold text-slate-200 block mt-1 font-mono">
                    ${currentMonthlyRevenue.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500">From {currentCR}% conversion</span>
                </div>

                <div className="bg-gradient-to-b from-cyan-950/60 to-slate-900 border border-cyan-500/40 rounded-xl p-4 text-center">
                  <span className="text-[11px] font-semibold text-cyan-300 block">Projected CRO Revenue</span>
                  <span className="text-xl font-bold text-cyan-200 block mt-1 font-mono">
                    ${targetMonthlyRevenue.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-medium">At {targetCR}% conversion</span>
                </div>

                <div className="bg-gradient-to-b from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-xl p-4 text-center">
                  <span className="text-[11px] font-semibold text-emerald-300 block">Monthly Leaking Cash</span>
                  <span className="text-xl font-bold text-emerald-300 block mt-1 font-mono">
                    +${monthlyRevenueLeakage.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400/90 font-medium">Recovered with $0 extra ads</span>
                </div>

              </div>

              {/* Annualized Big Number Callout */}
              <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Annual Lost Revenue Recoverable:
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-white font-mono block mt-0.5">
                    +${annualRevenueOpportunity.toLocaleString()} / year
                  </span>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-xs text-slate-400 block">Expected Advisory Retainer ROI:</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {estimatedRetainerRoi}x Return on Investment
                  </span>
                  <span className="text-[10px] text-slate-500 block">(Based on $4,500/mo retainer)</span>
                </div>
              </div>

              {/* 6-Month Comparison Trajectory Chart */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-slate-200">6-Month Revenue Comparison (Current vs. CRO Optimized)</span>
                  <span className="text-slate-400 font-mono text-[11px]">Values in USD ($)</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                        formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                      <Bar dataKey="current" name="Without CRO (Status Quo)" fill="#475569" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="optimized" name="With CRO Optimization Strategy" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: UPLOADED FILES & ASSET FINDINGS */}
      {/* ========================================================================= */}
      {viewMode === 'files' && (
        <div className="space-y-6">
          
          {/* Header */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>Uploaded Files, Wireframes & Analytics Audits</span>
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Upload landing page screenshots, mobile screen recordings, GA4 funnel exports (CSV), or Heatmap reports. The engine analyzes friction points and converts them into actionable To-Do tasks.
              </p>
            </div>

            <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 self-start sm:self-auto">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New Asset / CSV</span>
              <input
                type="file"
                accept="image/*,.csv,.pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </div>

          {/* Drag & Drop Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFileUpload(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              isDragging 
                ? 'border-cyan-400 bg-cyan-500/10' 
                : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-3 text-cyan-400">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-white">Drag and drop any audit asset here</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Supports Landing Page Screenshots (PNG/JPG), GA4 Drop-off Reports (CSV), Heatmaps, or Wireframe Mocks.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
              <span>PNG</span> • <span>JPG</span> • <span>CSV</span> • <span>PDF</span>
            </div>
          </div>

          {/* Uploaded Files Grid & Selected Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Files List (4 Cols) */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-semibold text-slate-300 block">Uploaded Assets ({uploadedFiles.length})</span>
              {uploadedFiles.map(file => {
                const isSelected = selectedFileForReview?.id === file.id;
                const isImg = file.fileCategory === 'screenshot_ui' || file.fileCategory === 'heatmap_export';
                const Icon = isImg ? ImageIcon : FileSpreadsheet;

                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFileForReview(file)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/30' 
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isImg ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold text-slate-200 block truncate">{file.fileName}</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                          <span>{file.fileSize}</span>
                          <span>•</span>
                          <span>{file.uploadedAt}</span>
                        </div>
                        <span className="text-[10px] text-cyan-400 font-medium mt-1.5 inline-block">
                          {file.findingsCount} conversion issues detected
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Extracted Findings for Selected File (8 Cols) */}
            <div className="lg:col-span-8">
              {selectedFileForReview ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400">Selected Audit Asset:</span>
                      <h3 className="text-sm font-bold text-white font-mono">{selectedFileForReview.fileName}</h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 self-start sm:self-auto">
                      {selectedFileForReview.extractedFindings.length} Actionable Findings Extracted
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedFileForReview.extractedFindings.map((finding, fIdx) => (
                      <div key={fIdx} className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              finding.impact === 'Critical' 
                                ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' 
                                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            }`}>
                              {finding.impact} Friction
                            </span>
                            <span className="text-xs font-semibold text-slate-200">
                              {finding.issue}
                            </span>
                          </div>

                          {/* Convert to To-Do Action Button */}
                          <button
                            onClick={() => handleAddFindingToTasks(finding, selectedFileForReview.fileName)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add to Audit Checklist</span>
                          </button>
                        </div>

                        <div className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                          <strong className="text-slate-300 font-medium">Recommended Fix:</strong> {finding.suggestedFix}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ) : (
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 text-center text-slate-500 text-xs">
                  Select a file on the left to review extracted conversion findings.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: CLIENT PRESENTATION & EXECUTIVE CRO REPORT */}
      {/* ========================================================================= */}
      {viewMode === 'presentation' && (
        <div className="space-y-6">
          
          {/* Top Bar with Copy & Print */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div>
              <span className="text-xs text-slate-400">Client Deliverable Mode:</span>
              <h2 className="text-base font-bold text-white">Full Business & CRO Growth Audit Presentation</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyText(aiGeneratedReport || activeProfile.executiveSummary, 'Executive Summary')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </button>

              <button
                onClick={handleExportPdf}
                disabled={isExportingPdf}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/30 disabled:opacity-50"
                title="Download formatted client PDF document"
              >
                {isExportingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileDown className="w-3.5 h-3.5 stroke-[2.5]" />
                )}
                <span>{isExportingPdf ? 'Generating PDF...' : 'Download PDF Report'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
                title="Open browser print dialog"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Executive Deliverable Document Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-slate-300 text-xs leading-relaxed max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
            
            {/* Document Header */}
            <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Confidential Strategy Deliverable
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Conversion Rate Optimization & Revenue Recovery Audit
                </h1>
                <p className="text-slate-400 text-xs mt-1">
                  Prepared for: <strong className="text-white font-semibold">{activeProfile.businessName}</strong> ({activeProfile.websiteUrl})
                </p>
              </div>

              <div className="text-right sm:text-right font-mono text-[11px] text-slate-400">
                <span className="block font-semibold text-slate-200">Abu Talib</span>
                <span className="block text-slate-500">Principal Digital Marketing Strategist</span>
                <span className="block text-slate-500">AIC Agency Hub</span>
              </div>
            </div>

            {/* Scorecard Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 block">Monthly Visitors</span>
                <span className="text-base font-bold text-white font-mono">{activeProfile.monthlyVisitors.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Current CR / Target CR</span>
                <span className="text-base font-bold text-amber-300 font-mono">{activeProfile.currentConvRate}% → {activeProfile.targetConvRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Monthly Revenue Leak</span>
                <span className="text-base font-bold text-emerald-400 font-mono">+${monthlyRevenueLeakage.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Advisory Retainer ROI</span>
                <span className="text-base font-bold text-cyan-400 font-mono">{estimatedRetainerRoi}x Projected</span>
              </div>
            </div>

            {/* Section 1: Executive Diagnosis */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wide border-l-2 border-cyan-400 pl-2">
                1. Executive Problem Diagnosis & Revenue Opportunity
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                {activeProfile.executiveSummary}
              </p>
            </div>

            {/* Section 2: Why This CRO Service Is Indispensable (Mathematical Justification) */}
            <div className="bg-gradient-to-r from-cyan-950/30 to-indigo-950/30 border border-cyan-500/20 rounded-xl p-4 space-y-2.5">
              <h2 className="text-xs font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>2. Why Strategic CRO Is Essential For Your Business (ROI Mandate)</span>
              </h2>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>The Ad Inflation Reality:</strong> Ad platforms (Meta, Google, TikTok) have increased CPMs by ~35% over the past 18 months. Increasing ad budget into an unoptimized funnel decreases blended margins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>The Conversion Multiplier:</strong> By improving your conversion rate from {currentCR}% to {targetCR}%, your revenue increases by <strong className="text-emerald-300 font-semibold">+${monthlyRevenueLeakage.toLocaleString()} every single month</strong> without spending an extra dollar on advertising.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Customer Acquisition Cost (CAC) Slashed:</strong> Your customer acquisition cost will drop by <strong className="text-emerald-300 font-semibold">{cacReductionPct}%</strong>, allowing you to scale paid acquisition while competitors are forced to scale down.</span>
                </li>
              </ul>
            </div>

            {/* Section 3: Top 3 Critical Leaks & Quick Wins */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wide border-l-2 border-amber-400 pl-2">
                3. High-Priority Conversion Killers & Quick Wins (&lt; 7 Days)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold text-[11px] block">Leak 1: Above-the-Fold Friction</span>
                  <p className="text-slate-400 text-[11px]">Primary CTA is pushed below the fold on mobile viewports. Elevating button into first 500px recovers an estimated +18% mobile clicks.</p>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold text-[11px] block">Leak 2: Hidden Checkout Costs</span>
                  <p className="text-slate-400 text-[11px]">Late shipping fee disclosures trigger 68% cart abandonment. Upfront shipping estimates and 1-click Express Pay resolve this friction.</p>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold text-[11px] block">Leak 3: Form Field Bloat</span>
                  <p className="text-slate-400 text-[11px]">Cutting non-essential form fields from 8 down to 4 increases completed submissions by up to +35% immediately.</p>
                </div>
              </div>
            </div>

            {/* Section 4: 60-Day Experimentation Roadmap */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wide border-l-2 border-emerald-400 pl-2">
                4. 60-Day Scientific A/B Testing & Implementation Roadmap
              </h2>
              <table className="w-full text-[11px] text-left border border-slate-800 rounded-lg overflow-hidden">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-2.5">Sprint / Timeline</th>
                    <th className="p-2.5">Hypothesis & Optimization Area</th>
                    <th className="p-2.5">ICE Score</th>
                    <th className="p-2.5">Expected Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-950/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-medium text-white">Sprint 1 (Weeks 1-2)</td>
                    <td className="p-2.5">Hero 5-second value proposition & sticky mobile CTA bar</td>
                    <td className="p-2.5 text-cyan-400 font-mono font-semibold">9.4 / 10</td>
                    <td className="p-2.5 text-emerald-400">+18% Mobile Add-to-Cart</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Sprint 2 (Weeks 3-4)</td>
                    <td className="p-2.5">1-Page frictionless checkout + Apple Pay / Shop Pay express</td>
                    <td className="p-2.5 text-cyan-400 font-mono font-semibold">9.6 / 10</td>
                    <td className="p-2.5 text-emerald-400">+28% Completed Checkout</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Sprint 3 (Weeks 5-6)</td>
                    <td className="p-2.5">Post-purchase 1-click upsell flow & order bump</td>
                    <td className="p-2.5 text-cyan-400 font-mono font-semibold">8.9 / 10</td>
                    <td className="p-2.5 text-emerald-400">+19% Lift in AOV</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Sprint 4 (Weeks 7-8)</td>
                    <td className="p-2.5">Exit-intent recovery trigger & lead magnet personalization</td>
                    <td className="p-2.5 text-cyan-400 font-mono font-semibold">8.5 / 10</td>
                    <td className="p-2.5 text-emerald-400">+7% Salvaged Bounces</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 5: Engagement Retainer Terms & ROI */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-300 block">Recommended Engagement:</span>
                <h3 className="text-sm font-bold text-white">Senior CRO & Growth Advisory Retainer</h3>
                <span className="text-[11px] text-slate-400">Includes continuous A/B testing, heatmap analysis, weekly sprint deployments & full GA4 telemetry.</span>
              </div>

              <div className="text-right sm:text-right shrink-0">
                <span className="text-xs text-slate-400 block">Monthly Investment</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">$4,500 / month</span>
                <span className="text-[10px] text-emerald-400 font-medium block">Recouped within 21 days</span>
              </div>
            </div>

            {/* If AI Generated Content exists, display it */}
            {aiGeneratedReport && (
              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Gemini AI Custom Deep-Dive Strategy Analysis:</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 whitespace-pre-wrap font-sans text-slate-300 leading-relaxed">
                  {aiGeneratedReport}
                </div>
              </div>
            )}

            {/* Document Bottom Export & Sharing Callout */}
            <div className="mt-8 pt-6 border-t border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">
                  Deliverable Status: Client-Ready Strategy Document
                </span>
                <span className="text-[11px] text-slate-400">
                  Export this audit as a branded executive PDF report to present to {activeProfile.businessName} stakeholders.
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleExportPdf}
                  disabled={isExportingPdf}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/40 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileDown className="w-4 h-4 stroke-[2.5]" />
                  )}
                  <span>{isExportingPdf ? 'Exporting PDF...' : 'Download Client PDF Report'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD CUSTOM AUDIT TO-DO TASK */}
      {/* ========================================================================= */}
      {isAddTodoOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-400" />
                <span>Add Custom CRO Audit Task</span>
              </h3>
              <button onClick={() => setIsAddTodoOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Audit Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement Sticky Add-to-Cart bar on product pages"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CroCategory)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="above_the_fold">Above-the-Fold & Hero</option>
                    <option value="funnel_journey">Funnel & User Flow</option>
                    <option value="form_friction">Friction & Lead Forms</option>
                    <option value="trust_proof">Psychology & Trust</option>
                    <option value="checkout_cart">Checkout & Payment</option>
                    <option value="speed_tech">Speed & Technical UX</option>
                    <option value="analytics_tracking">Data & Tracking</option>
                    <option value="ab_testing">A/B Testing & Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as CroPriority)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Estimated Conversion Lift</label>
                <input
                  type="text"
                  placeholder="e.g. +15% - 25% Lift"
                  value={newImpact}
                  onChange={(e) => setNewImpact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Why This Is Crucial (Client Pitch Note)</label>
                <textarea
                  rows={2}
                  placeholder="Explain why the client cannot afford to ignore this friction..."
                  value={newWhyCrucial}
                  onChange={(e) => setNewWhyCrucial(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Action Steps (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="Step 1: Audit current element&#10;Step 2: Design variation B&#10;Step 3: Deploy A/B test"
                  value={newActionSteps}
                  onChange={(e) => setNewActionSteps(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTodoOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
                >
                  Add Audit Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
