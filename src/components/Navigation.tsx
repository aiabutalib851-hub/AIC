import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  GitBranch, 
  Receipt, 
  Sparkles, 
  Target, 
  Compass, 
  Megaphone, 
  Award, 
  ChevronDown, 
  Check, 
  Layers,
  Lock,
  ShieldCheck,
  KeyRound
} from 'lucide-react';
import { DashboardTab } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  currentTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  clientsCount: number;
  agentsCount: number;
  projectsCount: number;
  pendingInvoicesCount: number;
}

export interface NavItemConfig {
  id: DashboardTab; 
  label: string; 
  shortLabel?: string;
  description: string;
  icon: React.FC<{ className?: string }>; 
  badge?: number; 
  highlight?: boolean;
  featured?: boolean;
  pillTag?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  clientsCount,
  agentsCount,
  projectsCount,
  pendingInvoicesCount,
}) => {
  const { t, isBangla } = useLanguage();
  const { 
    currentUser, 
    hasAccess, 
    isCurrentAdmin, 
    setUserAccessModalOpen, 
    setAuthModalOpen 
  } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ordered strictly according to user request:
  // 1. Overview, 2. Service Catalog, 3. Meta Ads Blueprint, 4. CRO & Growth Audit, 5. Billing, followed by Clients, Fleet, Pipeline, Founder, Copilot
  const navItems: NavItemConfig[] = [
    { 
      id: 'overview', 
      label: t('nav.overview', 'Overview'), 
      shortLabel: isBangla ? 'ড্যাশবোর্ড' : 'Overview',
      description: t('nav.overview.desc', 'Executive dashboard & real-time operational telemetry'),
      icon: LayoutDashboard 
    },
    { 
      id: 'services', 
      label: t('nav.services', 'Service Catalog'), 
      shortLabel: isBangla ? 'সার্ভিস' : 'Services',
      description: t('nav.services.desc', '7-Stage client growth journey & consulting offerings'),
      icon: Compass, 
      featured: true, 
      pillTag: 'JOURNEY' 
    },
    { 
      id: 'blueprint', 
      label: t('nav.blueprint', 'Meta Ads Blueprint'), 
      shortLabel: isBangla ? 'মেটা ব্লুপ্রিন্ট' : 'Meta Blueprint',
      description: t('nav.blueprint.desc', '22-Phase Andromeda campaign launch & scaling system'),
      icon: Megaphone, 
      featured: true, 
      pillTag: 'AIC 2026' 
    },
    { 
      id: 'cro', 
      label: t('nav.cro', 'CRO & Growth Audit'), 
      shortLabel: isBangla ? 'সিআরও অডিট' : 'CRO Audit',
      description: t('nav.cro.desc', 'Conversion rate optimization, funnels & unit economics'),
      icon: Target, 
      featured: true, 
      pillTag: 'HIGH ROI' 
    },
    { 
      id: 'billing', 
      label: t('nav.billing', 'Billing & Invoices'), 
      shortLabel: isBangla ? 'বিলিং' : 'Billing',
      description: t('nav.billing.desc', 'Accounts receivable, retainers & payment tracking'),
      icon: Receipt, 
      badge: pendingInvoicesCount > 0 ? pendingInvoicesCount : undefined 
    },
    { 
      id: 'clients', 
      label: t('nav.clients', 'Clients & Retainers'), 
      shortLabel: isBangla ? 'ক্লায়েন্ট' : 'Clients',
      description: t('nav.clients.desc', 'Client portfolio, account health & retainer stages'),
      icon: Users, 
      badge: clientsCount 
    },
    { 
      id: 'fleet', 
      label: t('nav.fleet', 'AI Agent Fleet'), 
      shortLabel: isBangla ? 'এআই বহর' : 'AI Fleet',
      description: t('nav.fleet.desc', 'Autonomous agents, webhook monitors & uptime'),
      icon: Bot, 
      badge: agentsCount 
    },
    { 
      id: 'pipeline', 
      label: t('nav.pipeline', 'Project Pipeline'), 
      shortLabel: isBangla ? 'পাইপলাইন' : 'Pipeline',
      description: t('nav.pipeline.desc', 'Active sprint milestones, staging & deliverables'),
      icon: GitBranch, 
      badge: projectsCount 
    },
    { 
      id: 'founder', 
      label: t('nav.founder', 'Founder Portfolio'), 
      shortLabel: isBangla ? 'প্রতিষ্ঠাতা' : 'Founder',
      description: t('nav.founder.desc', 'Abu Talib portfolio (abu-talib.netlify.app), credentials & WhatsApp hotline'),
      icon: Award, 
      featured: true, 
      pillTag: 'PORTFOLIO' 
    },
    { 
      id: 'copilot', 
      label: t('nav.copilot', 'AIC Copilot'), 
      shortLabel: isBangla ? 'কোপাইলট' : 'Copilot',
      description: t('nav.copilot.desc', 'AI strategy assistant, proposal generator & audit synthesizer'),
      icon: Sparkles, 
      highlight: true 
    },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentItem = navItems.find(item => item.id === currentTab) || navItems[0];
  const CurrentIcon = currentItem.icon;
  const isCurrentPermitted = hasAccess(currentItem.id);

  const handleSelectTab = (tabId: DashboardTab) => {
    onTabChange(tabId);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 gap-3">
          
          {/* Main Dropdown Menu Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              id="navigation-dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all shadow-md ${
                isDropdownOpen
                  ? 'bg-indigo-600 text-white border-indigo-400/80 shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-100 border-indigo-500/40 hover:border-cyan-400/60 shadow-slate-950/50'
              }`}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                isCurrentPermitted 
                  ? 'bg-indigo-500/20 text-cyan-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}>
                {isCurrentPermitted ? (
                  <CurrentIcon className="w-3.5 h-3.5" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
              </div>
              
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider leading-none flex items-center gap-1">
                  <span>Active View</span>
                  {!isCurrentPermitted && (
                    <span className="text-red-400 font-normal">(Restricted)</span>
                  )}
                </span>
                <span className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                  {currentItem.label}
                  {currentItem.pillTag && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {currentItem.pillTag}
                    </span>
                  )}
                  {!isCurrentPermitted && (
                    <Lock className="w-3 h-3 text-red-400" />
                  )}
                </span>
              </div>

              <ChevronDown className={`w-4 h-4 text-slate-400 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-white' : ''}`} />
            </button>

            {/* Dropdown Menu Modal/Popover */}
            {isDropdownOpen && (
              <div 
                id="navigation-dropdown-menu"
                className="absolute left-0 mt-2 w-84 sm:w-96 rounded-2xl bg-slate-900/95 border border-indigo-500/40 shadow-2xl backdrop-blur-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-1 max-h-[82vh] overflow-y-auto no-scrollbar"
              >
                <div className="px-3 py-2 border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      AIC Platform Menus
                    </span>
                  </div>
                  
                  {/* Permissions count */}
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-slate-800 text-cyan-300">
                    {currentUser?.role === 'admin' ? 'All 10 Unlocked' : `${currentUser?.allowedTabs.length || 0}/10 Permitted`}
                  </span>
                </div>

                <div className="pt-1 space-y-1">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    const permitted = hasAccess(item.id);

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectTab(item.id)}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all group ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-600/30 via-cyan-500/20 to-slate-800 border border-cyan-400/50 text-white shadow-sm'
                            : permitted
                            ? 'hover:bg-slate-800/80 text-slate-300 hover:text-white border border-transparent'
                            : 'bg-slate-950/40 hover:bg-slate-900/80 text-slate-400 hover:text-slate-300 border border-slate-800/40'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                            : !permitted
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : item.featured
                            ? 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-950 group-hover:text-cyan-300'
                            : 'bg-slate-800/90 text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {!permitted ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-xs font-bold truncate flex items-center gap-1.5">
                              <span className="text-[10px] font-mono text-slate-500">
                                0{index + 1}.
                              </span>
                              <span className={isActive ? 'text-cyan-300' : permitted ? 'text-slate-200' : 'text-slate-400'}>
                                {item.label}
                              </span>
                            </span>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {!permitted ? (
                                <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-0.5">
                                  <Lock className="w-2.5 h-2.5" />
                                  <span>লকড</span>
                                </span>
                              ) : (
                                <>
                                  {item.pillTag && (
                                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                      {item.pillTag}
                                    </span>
                                  )}
                                  {item.badge !== undefined && (
                                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-800 text-indigo-300 border border-indigo-500/30 font-mono">
                                      {item.badge}
                                    </span>
                                  )}
                                  {isActive && (
                                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                                  )}
                                </>
                              )}
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 group-hover:text-slate-300 transition-colors">
                            {!permitted ? 'এক্সেস সংরক্ষিত • Permission required' : item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer link to manage / switch permissions */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] px-2">
                  <span className="text-slate-400 font-medium">
                    {currentUser?.name || 'Guest'}
                  </span>
                  {isCurrentAdmin ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setUserAccessModalOpen(true);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors"
                    >
                      টপিক পারমিশন পরিচালনা
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setAuthModalOpen(true);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                    >
                      রোল পরিবর্তন
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick-Access Scrollable Menu Bar */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-0.5 flex-1 justify-start lg:justify-end">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const permitted = hasAccess(item.id);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  title={permitted ? `${item.label}: ${item.description}` : `${item.label} (Access Restricted - ক্লিক করে বিস্তারিত দেখুন)`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? !permitted
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-bold'
                        : item.featured
                        ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/25 to-indigo-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm font-bold'
                        : item.highlight
                        ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'bg-slate-800 text-white font-bold border border-slate-700'
                      : !permitted
                      ? 'text-slate-500 hover:text-slate-400 bg-slate-950/40 border border-slate-800/60'
                      : item.featured
                      ? 'text-cyan-300 hover:text-white bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400/50'
                      : item.highlight
                      ? 'text-cyan-400 hover:text-cyan-300 hover:bg-slate-900'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {!permitted ? (
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 ${
                      isActive 
                        ? (item.featured ? 'text-cyan-300 animate-pulse' : item.highlight ? 'text-cyan-300' : 'text-indigo-400') 
                        : (item.featured ? 'text-cyan-400' : 'text-slate-400')
                    }`} />
                  )}
                  
                  <span>{item.shortLabel || item.label}</span>

                  {!permitted && (
                    <span className="text-[9px] px-1 py-0.1 rounded bg-slate-900 text-slate-500 font-mono">
                      🔒
                    </span>
                  )}

                  {permitted && item.badge !== undefined && (
                    <span className={`px-1.5 py-0.2 text-[10px] font-semibold rounded-full font-mono ${
                      isActive ? 'bg-indigo-500/40 text-indigo-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {permitted && item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
};



