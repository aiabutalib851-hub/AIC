import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Phone, 
  Mail, 
  Globe, 
  Share2, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Cpu, 
  Target, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Compass,
  Megaphone,
  Github,
  Laptop,
  Tablet,
  Smartphone,
  RotateCw,
  Copy,
  Check,
  MapPin,
  Code,
  Terminal,
  Lock,
  Maximize2,
  Bot
} from 'lucide-react';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';
import { DashboardTab } from '../types';

interface FounderProfileViewProps {
  onSelectTab: (tab: DashboardTab) => void;
  onOpenCopilotWithContext: (topic: string, details: string) => void;
}

export const FounderProfileView: React.FC<FounderProfileViewProps> = ({
  onSelectTab,
  onOpenCopilotWithContext
}) => {
  const [activeSection, setActiveSection] = useState<'portfolio' | 'overview' | 'frameworks' | 'consultation'>('portfolio');
  const [deviceViewport, setDeviceViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [projectCategory, setProjectCategory] = useState<string>('all');
  const [selectedInquiryTopic, setSelectedInquiryTopic] = useState('Digital Growth & AI Strategy Consultation');
  const [inquiryNotes, setInquiryNotes] = useState('');

  const handleCopyPortfolioUrl = async () => {
    try {
      await navigator.clipboard.writeText(AIC_AGENCY_INFO.founderPortfolioUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // Fallback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

  const handleRefreshIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Abu Talib,\n\nI am contacting you from the AIC Agency Operations Platform regarding: ${selectedInquiryTopic}.\n\nDetails: ${inquiryNotes.trim() || 'I would like to schedule a growth diagnosis and explore high-ROI AI automation systems for our business.'}`
    );
    return `https://wa.me/8801321990066?text=${text}`;
  };

  const filteredProjects = AIC_AGENCY_INFO.founderPortfolioProjects.filter((p) => {
    if (projectCategory === 'all') return true;
    if (projectCategory === 'ai') return p.category.toLowerCase().includes('ai') || p.id.includes('agent');
    if (projectCategory === 'marketing') return p.category.toLowerCase().includes('growth') || p.category.toLowerCase().includes('conversion') || p.id.includes('meta') || p.id.includes('cro');
    if (projectCategory === 'software') return p.category.toLowerCase().includes('software') || p.id.includes('sigmative') || p.id.includes('net');
    if (projectCategory === 'edtech') return p.category.toLowerCase().includes('edtech') || p.id.includes('academy');
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Founder Spotlight Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 border border-indigo-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 bottom-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 shadow-md">
                <Bot className="w-3.5 h-3.5 fill-current" />
                EXPERT IN AGENTIC AI
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                FOUNDER & PRINCIPAL ARCHITECT
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {AIC_AGENCY_INFO.founderLocation}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Executive Consulting
              </span>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {AIC_AGENCY_INFO.director}
                </h1>
                <a
                  href={AIC_AGENCY_INFO.founderPortfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Open abu-talib.netlify.app in new window"
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-bold flex items-center gap-1 transition-all"
                >
                  <span>abu-talib.netlify.app</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-sm sm:text-base text-cyan-300 font-medium mt-1">
                {AIC_AGENCY_INFO.founderTitle}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {AIC_AGENCY_INFO.founderBio}
            </p>

            {/* Quick Action Badges & Portfolio Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* Major Service Agentic AI Button */}
              <button
                type="button"
                onClick={() => onSelectTab('services')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-2 border border-emerald-400/40"
              >
                <Bot className="w-4 h-4" />
                <span>Major Service: Agentic AI</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </button>

              {/* Primary Netlify Portfolio Action */}
              <a
                href={AIC_AGENCY_INFO.founderPortfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 via-indigo-600 to-cyan-500 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-900/40 transition-all flex items-center gap-2 border border-cyan-400/40"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Netlify Portfolio: {AIC_AGENCY_INFO.founderPortfolioDisplay}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* GitHub Profile */}
              <a
                href={AIC_AGENCY_INFO.founderGithubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 transition-all flex items-center gap-2 shadow-sm"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>{AIC_AGENCY_INFO.founderGithubDisplay}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              {/* WhatsApp Direct Booking */}
              <a
                href={AIC_AGENCY_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/40 transition-all flex items-center gap-2 border border-emerald-400/30"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp: {AIC_AGENCY_INFO.whatsapp}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Academy Profile */}
              <a
                href={AIC_AGENCY_INFO.founderAcademyUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-indigo-500/40 transition-all flex items-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Academy: {AIC_AGENCY_INFO.founderAcademyDisplay}</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Bento Card */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-80 shrink-0">
            {AIC_AGENCY_INFO.founderAchievements.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-center text-center backdrop-blur-sm hover:border-indigo-500/40 transition-colors"
              >
                <span className="text-2xl sm:text-3xl font-black text-white font-mono bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  {item.metric}
                </span>
                <span className="text-[11px] font-medium text-slate-400 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSection('portfolio')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'portfolio'
              ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-900/30 border border-cyan-400/40'
              : 'text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 hover:text-white hover:bg-cyan-900/30'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Netlify Portfolio (Live & Projects)</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-white/20 text-white uppercase">
            Live
          </span>
        </button>

        <button
          onClick={() => setActiveSection('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'overview'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Biography & Verified Hubs</span>
        </button>

        <button
          onClick={() => setActiveSection('frameworks')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'frameworks'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Specialties & Architectures</span>
        </button>

        <button
          onClick={() => setActiveSection('consultation')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeSection === 'consultation'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-emerald-400 hover:text-emerald-300 hover:bg-slate-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Book Direct via WhatsApp</span>
        </button>
      </div>

      {/* SECTION 1: LIVE NETLIFY PORTFOLIO & PROJECTS SHOWCASE */}
      {activeSection === 'portfolio' && (
        <div className="space-y-6">
          
          {/* Live Netlify Interactive Viewport Container */}
          <div className="rounded-3xl border border-cyan-500/40 bg-slate-950 shadow-2xl overflow-hidden">
            
            {/* Top Browser Chrome Bar */}
            <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              
              {/* Traffic Light Buttons & Branding */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/60" />
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-white pl-2 border-l border-slate-700">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Abu Talib Portfolio Browser</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    Netlify Production
                  </span>
                </div>
              </div>

              {/* Center Address Bar */}
              <div className="flex-1 max-w-lg min-w-[260px]">
                <div className="flex items-center justify-between bg-slate-950/90 border border-slate-800 focus-within:border-cyan-500/60 rounded-xl px-3 py-1.5 text-xs transition-colors">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-mono text-slate-300 truncate">
                      {AIC_AGENCY_INFO.founderPortfolioUrl}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <button
                      type="button"
                      onClick={handleCopyPortfolioUrl}
                      title="Copy URL"
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleRefreshIframe}
                      title="Reload Portfolio View"
                      className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Viewport Width Controls & External Link */}
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeviceViewport('desktop')}
                    className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                      deviceViewport === 'desktop'
                        ? 'bg-cyan-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Desktop Preview (100%)"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeviceViewport('tablet')}
                    className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                      deviceViewport === 'tablet'
                        ? 'bg-cyan-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Tablet Preview (768px)"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Tablet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeviceViewport('mobile')}
                    className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                      deviceViewport === 'mobile'
                        ? 'bg-cyan-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Mobile Preview (390px)"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Mobile</span>
                  </button>
                </div>

                <a
                  href={AIC_AGENCY_INFO.founderPortfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-900/30"
                  title="Open live portfolio in a new window"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Live Iframe Viewport Area */}
            <div className="bg-slate-900/40 p-2 sm:p-4 flex justify-center items-center overflow-x-auto min-h-[580px]">
              <div 
                className={`transition-all duration-300 w-full ${
                  deviceViewport === 'desktop' 
                    ? 'max-w-full' 
                    : deviceViewport === 'tablet' 
                    ? 'max-w-[768px] border-x-4 border-slate-800 shadow-2xl rounded-2xl overflow-hidden' 
                    : 'max-w-[390px] border-x-4 border-slate-800 shadow-2xl rounded-2xl overflow-hidden'
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950">
                  <iframe
                    key={iframeKey}
                    src={AIC_AGENCY_INFO.founderPortfolioUrl}
                    title="Abu Talib Founder Portfolio - abu-talib.netlify.app"
                    className="w-full h-[620px] sm:h-[680px] bg-slate-950 border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                  
                  {/* Floating Direct Visit Banner */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>Verified Production URL:</span>
                          <span className="font-mono text-cyan-400">abu-talib.netlify.app</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Interactive portfolio with live project case studies, client testimonials, and source code.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyPortfolioUrl}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Link Copied!' : 'Copy URL'}</span>
                      </button>

                      <a
                        href={AIC_AGENCY_INFO.founderPortfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-950/50"
                      >
                        <span>Visit Site Directly</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Detailed Projects & Engineering Highlights from Abu Talib's Portfolio */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">
                    Featured Architecture & Engineering Projects
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Engineered and directed by Abu Talib across AI systems, high-ticket performance funnels, and enterprise full-stack software.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: 'all', label: 'All Works' },
                  { id: 'ai', label: 'AI & Autonomous' },
                  { id: 'marketing', label: 'Performance & CRO' },
                  { id: 'software', label: 'Software & SaaS' },
                  { id: 'edtech', label: 'EdTech' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setProjectCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      projectCategory === cat.id
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900/90 border border-slate-800 hover:border-cyan-500/40 p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl hover:shadow-cyan-950/20 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        {project.metrics}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Architect: Abu Talib
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>{project.urlLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Technical Mastery & Engineering Competencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Frontend Architecture</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                React 19, TypeScript, Next.js, Tailwind CSS, UIkit, responsive design systems, high-performance DOM reconciliation.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 font-semibold pt-1">
                99.8% Client Satisfaction
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">AI Agents & RAG</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Google GenAI SDK, autonomous agent swarms, vector retrieval (RAG), strict verification guardrails, webhook orchestration.
              </p>
              <div className="text-[11px] font-mono text-indigo-400 font-semibold pt-1">
                Enterprise Uptime Guaranteed
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Performance Marketing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Meta Andromeda ad delivery algorithms, Conversions API (CAPI), blended ROAS, break-even CAC calculation, funnel scaling.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 font-semibold pt-1">
                $2.4M+ Ad Spend Managed
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Cloud & Microservices</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Node.js, Express, REST APIs, Git workflows, Netlify CI/CD, Cloudflare, PostgreSQL, secure payment webhooks.
              </p>
              <div className="text-[11px] font-mono text-amber-400 font-semibold pt-1">
                Robust Production Stacks
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: BIO, OFFICIAL HUBS & PHILOSOPHY */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Detailed Portfolio Card & Narrative */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Portfolios Spotlight Card */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Verified Digital Portfolios & Presence
                  </h3>
                </div>
                <span className="text-[11px] text-cyan-400 font-mono">3 Verified Platforms</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Netlify Portfolio Card */}
                <a
                  href={AIC_AGENCY_INFO.founderPortfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group block p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 uppercase">
                      Primary Portfolio
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h4 className="text-sm font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors">
                    abu-talib.netlify.app
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Interactive engineering showcase, client project case studies, and full-stack software architecture credentials.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                    <span>Visit Netlify Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>

                {/* GitHub Card */}
                <a
                  href={AIC_AGENCY_INFO.founderGithubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group block p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700 hover:border-slate-500 transition-all shadow-lg hover:shadow-slate-700/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                      Code Repositories
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h4 className="text-sm font-bold text-white mt-3 group-hover:text-slate-200 transition-colors">
                    github.com/HelloTalib
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Open-source software, UIkit templates, React applications, and full-stack web architectures.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                    <span>Explore GitHub Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>

                {/* Abrar Academy Profile */}
                <a
                  href={AIC_AGENCY_INFO.founderAcademyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group block p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-indigo-500/30 hover:border-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase">
                      Academy & Agency Bio
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <h4 className="text-sm font-bold text-white mt-3 group-hover:text-indigo-300 transition-colors">
                    abrar.academy/abu-talib
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Educational courses, digital growth mentorship, and Islamic ethical leadership in high-tech consulting.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-indigo-400 font-semibold">
                    <span>Explore Academy Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </a>

              </div>
            </div>

            {/* Philosophy & Approach */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                The AIC Engineering Philosophy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Abrar IT Care (AIC), Abu Talib believes in moving beyond fragmented digital marketing tactics. Rather than chasing ephemeral trends, AIC builds <strong>System-Driven Digital Architectures</strong>—integrating data pipelines, conversion-engineered landing funnels, and autonomous AI agents that operate 24/7 with deterministic reliability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-white">Ethical Leadership</h5>
                  <p className="text-[11px] text-slate-400">Proof-based transparency, transparent retainers, and zero artificial bloat.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-white">Data-Driven Growth</h5>
                  <p className="text-[11px] text-slate-400">Unit economics, blended ROAS, break-even math, and predictable scaling.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h5 className="text-xs font-bold text-white">AI Automation</h5>
                  <p className="text-[11px] text-slate-400">Autonomous webhook workers, CRM triage, and rapid customer escalation.</p>
                </div>
              </div>
            </div>

            {/* Quick Link to Meta Ads Blueprint and Service Catalog */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Megaphone className="w-4 h-4 text-cyan-400" />
                  Proprietary Meta Ads Success Blueprint (22 Phases)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Engineered by Abu Talib for high-ticket client launches and ROAS stabilization under Andromeda algorithm updates.
                </p>
              </div>
              <button
                onClick={() => onSelectTab('blueprint')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-cyan-900/30"
              >
                <span>Explore 22 Phases</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Col: Official Direct Contact Card */}
          <div className="space-y-6">
            
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Direct Founder Contacts
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  FAST RESPONSE
                </span>
              </div>

              <div className="space-y-3 text-xs">
                
                {/* Netlify Portfolio Direct */}
                <a
                  href={AIC_AGENCY_INFO.founderPortfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-500/30 text-cyan-200 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-cyan-400 block font-bold">NETLIFY PORTFOLIO</span>
                      <strong className="font-mono text-white text-xs">{AIC_AGENCY_INFO.founderPortfolioDisplay}</strong>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* WhatsApp */}
                <a
                  href={AIC_AGENCY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 block font-bold">WHATSAPP DIRECT</span>
                      <strong className="font-mono text-white text-xs">{AIC_AGENCY_INFO.whatsapp}</strong>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Direct Phone */}
                <a
                  href={`tel:${AIC_AGENCY_INFO.phone}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">PHONE HOTLINE</span>
                      <strong className="font-mono text-slate-200 text-xs">{AIC_AGENCY_INFO.phone}</strong>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${AIC_AGENCY_INFO.email}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-500 block font-medium">OFFICIAL EMAIL</span>
                      <span className="font-mono text-slate-200 text-xs truncate block max-w-[140px]">{AIC_AGENCY_INFO.email}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                {/* GitHub */}
                <a
                  href={AIC_AGENCY_INFO.founderGithubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-500 block font-medium">GITHUB PROFILE</span>
                      <span className="text-slate-200 text-xs truncate block max-w-[140px]">{AIC_AGENCY_INFO.founderGithubDisplay}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                {/* Facebook */}
                <a
                  href={AIC_AGENCY_INFO.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-500 block font-medium">OFFICIAL FACEBOOK</span>
                      <span className="text-slate-200 text-xs truncate block max-w-[140px]">{AIC_AGENCY_INFO.facebookDisplay}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                {/* Portal */}
                <a
                  href={AIC_AGENCY_INFO.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-500 block font-medium">AGENCY PORTAL</span>
                      <span className="text-slate-200 text-xs truncate block max-w-[140px]">{AIC_AGENCY_INFO.portalDisplay}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

              </div>
            </div>

            {/* Quick Copilot Integration */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Growth Copilot</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Generate an executive client proposal or performance audit based on Abu Talib's growth strategy methodology.
              </p>
              <button
                onClick={() => onOpenCopilotWithContext('Executive Growth Strategy & AI Fleet Architecture', 'Consultation proposal aligned with Abu Talib AIC methodology')}
                className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Launch AIC Copilot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 3: CORE COMPETENCIES & ARCHITECTURE FRAMEWORKS */}
      {activeSection === 'frameworks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AIC_AGENCY_INFO.founderSpecialties.map((spec, index) => (
              <div 
                key={index}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold font-mono">
                  0{index + 1}
                </div>
                <h4 className="text-sm font-bold text-white">
                  {spec}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered with strict zero-hallucination validation, high-throughput microservices, and end-to-end telemetry monitoring.
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                  <span>Production Ready</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">
                Review the 7-Stage Client Growth Journey
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Diagnose → Strategize → Build → Attract → Convert → Retain → Scale. Tailored by Abu Talib for predictable agency revenue expansion.
              </p>
            </div>
            <button
              onClick={() => onSelectTab('services')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shrink-0 flex items-center gap-2 shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Open Service Catalog</span>
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: DIRECT WHATSAPP CONSULTATION BOOKING */}
      {activeSection === 'consultation' && (
        <div className="max-w-2xl mx-auto bg-slate-900/80 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <MessageSquare className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Direct Consultation with Abu Talib
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Initiate an instant WhatsApp inquiry directly with Abu Talib at <strong className="text-emerald-400 font-mono">01321990066</strong>.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-300 mb-1.5">
                Select Consultation Focus
              </label>
              <select
                value={selectedInquiryTopic}
                onChange={(e) => setSelectedInquiryTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="Digital Growth & AI Strategy Consultation">
                  Digital Growth & AI Strategy Consultation
                </option>
                <option value="Meta Ads Blueprint (22 Phases) Implementation">
                  Meta Ads Blueprint (22 Phases) Implementation
                </option>
                <option value="Autonomous AI Agent Fleet Deployment">
                  Autonomous AI Agent Fleet Deployment
                </option>
                <option value="Conversion Rate Optimization (CRO) Audit">
                  Conversion Rate Optimization (CRO) Audit
                </option>
                <option value="Fractional Growth Consulting Retainer">
                  Fractional Growth Consulting Retainer
                </option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1.5">
                Your Business Context or Project Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={inquiryNotes}
                onChange={(e) => setInquiryNotes(e.target.value)}
                placeholder="Share your current monthly ad spend, business category, or primary growth bottleneck..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Direct Contact Channels:
              </span>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300">Netlify Portfolio:</span>
                <a 
                  href={AIC_AGENCY_INFO.founderPortfolioUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <span>abu-talib.netlify.app</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300">Hotline:</span>
                <span className="text-emerald-400 font-bold">{AIC_AGENCY_INFO.phone}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300">WhatsApp URL:</span>
                <span className="text-cyan-400">wa.me/8801321990066</span>
              </div>
            </div>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send Message to WhatsApp (01321990066)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
};
