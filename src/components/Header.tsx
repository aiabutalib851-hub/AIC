import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Bot, 
  Sparkles, 
  Plus, 
  Search, 
  Eye, 
  Building2, 
  Zap, 
  Phone, 
  Mail, 
  Globe, 
  Share2, 
  ExternalLink, 
  ChevronDown, 
  Megaphone,
  MessageSquare,
  Award,
  ShieldCheck,
  User,
  LogIn,
  LogOut,
  Sliders,
  CheckCircle2,
  Lock,
  Compass,
  Layers,
  Target,
  Receipt,
  Users,
  GitBranch,
  ArrowRight,
  CornerDownLeft,
  X,
  Command,
  HelpCircle,
  History,
  Trash2
} from 'lucide-react';
import { Client, DashboardTab } from '../types';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';
import { useAuth } from '../context/AuthContext';
import { TOPIC_PERMISSIONS_CATALOG } from '../data/topicPermissions';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface HeaderProps {
  clients: Client[];
  activeClientPortalId: string | null;
  onSelectClientPortal: (clientId: string | null) => void;
  onOpenNewClient: () => void;
  onOpenDeployAgent: () => void;
  onOpenCopilot: () => void;
  onNavigateTab?: (tab: DashboardTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenHelpCenter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  clients,
  activeClientPortalId,
  onSelectClientPortal,
  onOpenNewClient,
  onOpenDeployAgent,
  onOpenCopilot,
  onNavigateTab,
  searchQuery,
  onSearchChange,
  onOpenHelpCenter,
}) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Global search & keyboard shortcut states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  // Recent searches state (stores last 5 queries in localStorage)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aic_recent_searches');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(item => typeof item === 'string' && item.trim().length > 0).slice(0, 5);
        }
      }
    } catch (e) {
      console.error('Failed to load recent searches', e);
    }
    return ['Meta Andromeda', 'AI Fleet', 'Retainer Invoices', 'Founder Portfolio'];
  });

  const saveQueryToRecent = (rawQuery: string) => {
    const q = rawQuery.trim();
    if (!q || q.length < 2) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== q.toLowerCase());
      const updated = [q, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('aic_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save recent searches', e);
      }
      return updated;
    });
  };

  const removeRecentSearch = (queryToRemove: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setRecentSearches(prev => {
      const updated = prev.filter(item => item !== queryToRemove);
      try {
        localStorage.setItem('aic_recent_searches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const clearAllRecentSearches = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setRecentSearches([]);
    try {
      localStorage.removeItem('aic_recent_searches');
    } catch (e) {}
  };

  const handleSelectRecentSearch = (query: string) => {
    onSearchChange(query);
    saveQueryToRecent(query);
    setIsSearchOpen(true);
    if (window.innerWidth < 768) {
      mobileSearchInputRef.current?.focus();
    } else {
      searchInputRef.current?.focus();
    }
  };

  const { t, isBangla } = useLanguage();

  const { 
    currentUser, 
    logout, 
    setAuthModalOpen, 
    setUserAccessModalOpen, 
    isCurrentAdmin 
  } = useAuth();

  const selectedPortalClient = clients.find(c => c.id === activeClientPortalId);

  // Platform detection for Mac vs Windows/Linux shortcut badge
  useEffect(() => {
    setIsMac(typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  // Keyboard shortcut listener: Ctrl+K or Cmd+K, and '/' to quickly focus search
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Shortcut: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsSearchOpen(true);
        if (window.innerWidth < 768) {
          setIsMobileSearchOpen(true);
          setTimeout(() => {
            mobileSearchInputRef.current?.focus();
            mobileSearchInputRef.current?.select();
          }, 60);
        } else {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }
        return;
      }

      // Shortcut: '/' key when not already focusing an input/textarea
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName) &&
        !(e.target as HTMLElement)?.isContentEditable
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
        if (window.innerWidth < 768) {
          setIsMobileSearchOpen(true);
          setTimeout(() => {
            mobileSearchInputRef.current?.focus();
            mobileSearchInputRef.current?.select();
          }, 60);
        } else {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }
        return;
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Close user dropdown and search menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Reset selected highlight index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Dashboard sections catalog
  const DASHBOARD_SECTIONS: { id: DashboardTab; label: string; labelBn: string; desc: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Overview', labelBn: 'ওভারভিউ', desc: 'Agency telemetry, KPIs & active operations', icon: Compass },
    { id: 'services', label: 'Service Catalog (Major: Agentic AI)', labelBn: 'সার্ভিস ক্যাটালগ (এজেন্টিক এআই)', desc: '11 Domains & Major Service: Agentic AI Systems', icon: Layers },
    { id: 'blueprint', label: 'Meta Ads Blueprint', labelBn: 'মেটা অ্যাডস ব্লুপ্রিন্ট', desc: '22-Phase Andromeda Campaign Architecture', icon: Megaphone },
    { id: 'cro', label: 'CRO & Growth Audit', labelBn: 'সিআরও ও গ্রোথ অডিট', desc: 'Funnel Leak Diagnostics & Conversion Multipliers', icon: Target },
    { id: 'billing', label: 'Billing & Treasury', labelBn: 'বিলিং ও ট্রেজারি', desc: 'Multi-business treasury, accounts, invoices & ledger', icon: Receipt },
    { id: 'clients', label: 'Clients CRM', labelBn: 'ক্লায়েন্ট পোর্টাল', desc: 'Retainer accounts, SLAs & client directories', icon: Users },
    { id: 'fleet', label: 'Agentic AI Fleet', labelBn: 'এজেন্টিক এআই বহর', desc: 'Autonomous Multi-Agent Fleets & Tool-Executing AI Systems', icon: Bot },
    { id: 'pipeline', label: 'Pipeline Projects', labelBn: 'পাইপলাইন প্রজেক্ট', desc: 'Active execution stages & Kanban projects', icon: GitBranch },
    { id: 'founder', label: 'Founder Portfolio — Abu Talib (Expert in Agentic AI)', labelBn: 'ফাউন্ডার পোর্টফোলিও — আবু তালিব (এজেন্টিক এআই এক্সপার্ট)', desc: 'Abu Talib credentials, Agentic AI architecture & live Netlify portfolio', icon: Award },
    { id: 'copilot', label: 'AI Copilot', labelBn: 'এআই কোপাইলট', desc: 'Real-time proposal generator & strategy synthesizer', icon: Sparkles },
  ];

  // Filtering matching sections
  const filteredSections = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return DASHBOARD_SECTIONS;
    return DASHBOARD_SECTIONS.filter(s => 
      s.label.toLowerCase().includes(q) ||
      s.labelBn.includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Filtering matching client portals + Agency Admin
  const filteredClients = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const list = [
      {
        id: 'admin',
        name: isBangla ? 'এজেন্সি অ্যাডমিন (মূল ড্যাশবোর্ড)' : 'Agency Admin (Executive Hub)',
        tier: 'Master',
        monthlyFee: undefined,
        industry: isBangla ? 'মূল অপারেশনস' : 'Core Agency Operations',
        isAdmin: true
      },
      ...clients.map(c => ({
        id: c.id,
        name: c.name,
        tier: c.tier,
        monthlyFee: c.monthlyFee,
        industry: c.industry,
        isAdmin: false
      }))
    ];

    if (!q) return list;
    return list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.tier.toLowerCase().includes(q) ||
      (c.industry && c.industry.toLowerCase().includes(q))
    );
  }, [searchQuery, clients, isBangla]);

  interface SearchNavigationItem {
    type: 'section' | 'portal';
    id: string;
    title: string;
    subtitle: string;
    badge?: string;
    icon?: React.ElementType;
    isActive?: boolean;
    isAdmin?: boolean;
    fee?: number;
  }

  // Combined flat list for unified ArrowUp/ArrowDown selection
  const combinedResults = useMemo<SearchNavigationItem[]>(() => {
    const results: SearchNavigationItem[] = [];

    // Dashboard sections
    filteredSections.forEach(sec => {
      results.push({
        type: 'section',
        id: sec.id,
        title: isBangla ? sec.labelBn : sec.label,
        subtitle: sec.desc,
        badge: 'Section',
        icon: sec.icon
      });
    });

    // Client portals & Agency Admin
    filteredClients.forEach(cl => {
      results.push({
        type: 'portal',
        id: cl.id,
        title: cl.name,
        subtitle: cl.isAdmin 
          ? (isBangla ? 'সকল ক্লায়েন্ট ও অপারেশন নিয়ন্ত্রণ' : 'Full agency operations & controls')
          : `${cl.tier} • $${(cl.monthlyFee || 0).toLocaleString()}/mo`,
        badge: cl.isAdmin ? 'Admin' : cl.tier,
        isAdmin: cl.isAdmin,
        isActive: cl.isAdmin ? !activeClientPortalId : activeClientPortalId === cl.id,
        fee: cl.monthlyFee
      });
    });

    return results;
  }, [filteredSections, filteredClients, isBangla, activeClientPortalId]);

  const handleSelectNavigationItem = (item: SearchNavigationItem) => {
    if (searchQuery.trim()) {
      saveQueryToRecent(searchQuery);
    }
    if (item.type === 'section') {
      if (activeClientPortalId) {
        onSelectClientPortal(null);
      }
      if (onNavigateTab) {
        onNavigateTab(item.id as DashboardTab);
      }
    } else if (item.type === 'portal') {
      onSelectClientPortal(item.id === 'admin' ? null : item.id);
    }
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
    searchInputRef.current?.blur();
    mobileSearchInputRef.current?.blur();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
      searchInputRef.current?.blur();
      mobileSearchInputRef.current?.blur();
      return;
    }

    if (!isSearchOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      setIsSearchOpen(true);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        saveQueryToRecent(searchQuery);
      }
      if (combinedResults.length > 0) {
        const currentItem = combinedResults[selectedIndex];
        if (currentItem) {
          handleSelectNavigationItem(currentItem);
        }
      } else {
        setIsSearchOpen(false);
        searchInputRef.current?.blur();
        mobileSearchInputRef.current?.blur();
      }
      return;
    }

    if (combinedResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % combinedResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + combinedResults.length) % combinedResults.length);
    }
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Agency Identity */}
          <div className="flex items-center gap-3 min-w-max">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                  Abrar IT Care <span className="text-cyan-400 font-bold px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/30 text-xs">AIC</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isBangla ? 'অনলাইন' : 'Online'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI Consulting & Performance Marketing • <span className="text-slate-300 font-medium">{AIC_AGENCY_INFO.director}</span>
              </p>
            </div>
          </div>

          {/* Search bar & Quick Navigation Command Palette */}
          <div className="flex-1 max-w-md hidden md:block relative" ref={searchContainerRef}>
            <div className="relative group">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
              <input
                ref={searchInputRef}
                type="text"
                id="global-header-search-input"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onClick={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (!isSearchOpen) setIsSearchOpen(true);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder={t('header.search.placeholder', 'Search clients, sections, models, invoices...')}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-9 pr-24 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
                aria-label="Search clients, sections, models, invoices"
                aria-expanded={isSearchOpen}
                aria-controls="global-search-quicknav-dropdown"
                autoComplete="off"
                spellCheck={false}
              />
              
              {/* Keyboard Shortcut Visual Hint Badge & Clear Action */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-auto">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSearchChange('');
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Clear search query"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <kbd
                  onClick={() => {
                    setIsSearchOpen(true);
                    searchInputRef.current?.focus();
                  }}
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 hover:text-cyan-300 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 rounded shadow-xs group-focus-within:border-cyan-500/50 group-focus-within:text-cyan-400 transition-all cursor-pointer select-none"
                  title={isMac ? "Press ⌘K or / to search" : "Press Ctrl+K or / to search"}
                  aria-label={isMac ? "Global search shortcut: ⌘K" : "Global search shortcut: Ctrl+K"}
                >
                  <Command className="w-2.5 h-2.5 opacity-70" />
                  <span>{isMac ? '⌘K' : 'Ctrl+K'}</span>
                </kbd>
              </div>
            </div>

            {/* Quick Navigation Dropdown */}
            {isSearchOpen && (
              <div
                id="global-search-quicknav-dropdown"
                className="absolute top-full left-0 right-0 mt-2 bg-slate-900/98 border border-slate-800 rounded-xl shadow-2xl shadow-cyan-950/60 backdrop-blur-xl overflow-hidden z-50 animate-fade-in max-h-[390px] flex flex-col"
              >
                {/* Header bar of dropdown */}
                <div className="px-3 py-2 border-b border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400 font-medium shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider text-[10px]">
                      {searchQuery ? (isBangla ? 'অনুসন্ধান ফলাফল' : 'Quick Navigation') : (isBangla ? 'দ্রুত জাম্প মেনু' : 'Quick Jump Menu')}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span>
                      {filteredSections.length} {isBangla ? 'সেকশন' : 'sections'}, {filteredClients.length} {isBangla ? 'পোর্টাল' : 'portals'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">
                    {isBangla ? '↑↓ ব্রাউজ • ↵ জাম্প • ESC প্রস্থান' : '↑↓ Navigate • ↵ Jump • ESC Exit'}
                  </span>
                </div>

                {/* Recent Searches Section (Displays user's last 5 queries) */}
                {recentSearches.length > 0 && (
                  <div className="p-2 border-b border-slate-800/80 bg-slate-950/50 shrink-0">
                    <div className="px-1.5 pb-1.5 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <History className="w-3.5 h-3.5" />
                        <span>{t('header.recentSearches', 'Recent Searches')}</span>
                        <span className="text-slate-600 font-mono font-normal">
                          ({recentSearches.length}/5)
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={clearAllRecentSearches}
                        className="text-[10px] font-medium text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-900"
                        title="Clear all recent searches"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>{t('header.clearRecent', 'Clear all')}</span>
                      </button>
                    </div>

                    <div className="space-y-0.5">
                      {recentSearches.map((query) => (
                        <div
                          key={`recent-${query}`}
                          className="group/recent flex items-center justify-between px-2 py-1.5 rounded-lg text-xs hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => handleSelectRecentSearch(query)}
                            className="flex items-center gap-2 text-left flex-1 min-w-0"
                            title={`Search for "${query}"`}
                          >
                            <div className="p-1 rounded bg-slate-800 text-slate-400 group-hover/recent:text-cyan-400 group-hover/recent:bg-cyan-500/10 transition-colors">
                              <History className="w-3 h-3" />
                            </div>
                            <span className="text-slate-200 group-hover/recent:text-cyan-200 font-medium truncate">
                              {query}
                            </span>
                          </button>
                          
                          <div className="flex items-center gap-1 shrink-0 ml-2">
                            <button
                              type="button"
                              onClick={() => handleSelectRecentSearch(query)}
                              className="text-[10px] text-slate-500 group-hover/recent:text-cyan-400 opacity-0 group-hover/recent:opacity-100 transition-opacity px-1.5 py-0.5 rounded hover:bg-cyan-950/60 border border-transparent hover:border-cyan-500/30 flex items-center gap-0.5"
                              title="Search this query"
                            >
                              <span>Apply</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => removeRecentSearch(query, e)}
                              className="p-1 rounded text-slate-500 hover:text-red-400 hover:bg-slate-900 transition-colors"
                              title={`Remove "${query}"`}
                              aria-label={`Remove search query ${query}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results list */}
                <div className="overflow-y-auto p-1.5 space-y-1 divide-y divide-slate-800/40">
                  {combinedResults.length === 0 ? (
                    <div className="py-6 text-center text-slate-500 text-xs">
                      {isBangla ? 'কোনো সেকশন বা ক্লায়েন্ট পোর্টাল পাওয়া যায়নি' : 'No matching sections or client portals found'}
                    </div>
                  ) : (
                    <>
                      {/* Dashboard Sections Group */}
                      {filteredSections.length > 0 && (
                        <div className="pb-1">
                          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                            <span>{isBangla ? 'ড্যাশবোর্ড সেকশন' : 'Dashboard Sections'}</span>
                            <span className="text-[10px] text-slate-600 font-normal">
                              {filteredSections.length}
                            </span>
                          </div>
                          {filteredSections.map(sec => {
                            const indexInCombined = combinedResults.findIndex(r => r.type === 'section' && r.id === sec.id);
                            const isSelected = indexInCombined === selectedIndex;
                            const Icon = sec.icon;
                            return (
                              <button
                                key={`sec-${sec.id}`}
                                type="button"
                                onClick={() => handleSelectNavigationItem({
                                  type: 'section',
                                  id: sec.id,
                                  title: isBangla ? sec.labelBn : sec.label,
                                  subtitle: sec.desc
                                })}
                                onMouseEnter={() => setSelectedIndex(indexInCombined)}
                                className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between text-xs transition-colors ${
                                  isSelected 
                                    ? 'bg-cyan-500/15 text-white border border-cyan-500/30 shadow-xs' 
                                    : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={`p-1.5 rounded-md ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                                    <Icon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="truncate">
                                    <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                                      <span>{isBangla ? sec.labelBn : sec.label}</span>
                                    </div>
                                    <div className="text-[11px] text-slate-400 truncate">{sec.desc}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                  {isSelected && (
                                    <span className="text-[10px] font-mono text-cyan-300 flex items-center gap-0.5 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                                      <span>↵</span> <span className="hidden sm:inline">Jump</span>
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Client Portals Group */}
                      {filteredClients.length > 0 && (
                        <div className="pt-1.5">
                          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                            <span>{isBangla ? 'ক্লায়েন্ট পোর্টাল ও অ্যাডমিন ভিউ' : 'Client Portals & Admin Preview'}</span>
                            <span className="text-[10px] text-slate-600 font-normal">
                              {filteredClients.length}
                            </span>
                          </div>
                          {filteredClients.map(cl => {
                            const indexInCombined = combinedResults.findIndex(r => r.type === 'portal' && r.id === cl.id);
                            const isSelected = indexInCombined === selectedIndex;
                            const isCurrentActive = cl.isAdmin ? !activeClientPortalId : activeClientPortalId === cl.id;
                            return (
                              <button
                                key={`portal-${cl.id}`}
                                type="button"
                                onClick={() => handleSelectNavigationItem({
                                  type: 'portal',
                                  id: cl.id,
                                  title: cl.name,
                                  subtitle: cl.industry || ''
                                })}
                                onMouseEnter={() => setSelectedIndex(indexInCombined)}
                                className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between text-xs transition-colors ${
                                  isSelected 
                                    ? 'bg-indigo-500/15 text-white border border-indigo-500/30 shadow-xs' 
                                    : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className={`p-1.5 rounded-md ${
                                    cl.isAdmin 
                                      ? 'bg-amber-500/20 text-amber-300' 
                                      : isSelected 
                                      ? 'bg-indigo-500/20 text-indigo-300' 
                                      : 'bg-slate-800 text-slate-400'
                                  }`}>
                                    {cl.isAdmin ? <Zap className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                  </div>
                                  <div className="truncate">
                                    <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                                      <span>{cl.name}</span>
                                      {isCurrentActive && (
                                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                          {isBangla ? 'সক্রিয়' : 'Current'}
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-[11px] text-slate-400 truncate">
                                      {cl.isAdmin 
                                        ? (isBangla ? 'মূল এজেন্সি ওভারভিউ ও সার্বিক ক্লায়েন্ট কন্ট্রোল' : 'Full agency operations & controls')
                                        : `${cl.tier} • $${(cl.monthlyFee || 0).toLocaleString()}/mo ${cl.industry ? `• ${cl.industry}` : ''}`}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                  {cl.tier && !cl.isAdmin && (
                                    <span className="text-[10px] font-medium text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                                      {cl.tier}
                                    </span>
                                  )}
                                  {isSelected && (
                                    <span className="text-[10px] font-mono text-indigo-300 flex items-center gap-0.5 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-500/30">
                                      <span>↵</span> <span className="hidden sm:inline">Preview</span>
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Footer instructions */}
                <div className="px-3 py-1.5 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.2 bg-slate-800 rounded font-mono text-slate-400">↑↓</kbd>
                    <span>{isBangla ? 'নেভিগেট' : 'to navigate'}</span>
                    <kbd className="ml-1 px-1 py-0.2 bg-slate-800 rounded font-mono text-slate-400">↵</kbd>
                    <span>{isBangla ? 'জাম্প' : 'to select'}</span>
                    <kbd className="ml-1 px-1 py-0.2 bg-slate-800 rounded font-mono text-slate-400">ESC</kbd>
                    <span>{isBangla ? 'বন্ধ' : 'to close'}</span>
                  </span>
                  <span className="font-mono text-slate-400 flex items-center gap-1">
                    <kbd className="px-1 py-0.2 bg-slate-800/80 border border-slate-700/60 rounded text-[9px] text-cyan-300">
                      {isMac ? '⌘K' : 'Ctrl+K'}
                    </kbd>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions & View Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Search & Quick Nav Toggle */}
            <button
              type="button"
              onClick={() => {
                setIsMobileSearchOpen(prev => !prev);
                if (!isMobileSearchOpen) {
                  setIsSearchOpen(true);
                  setTimeout(() => mobileSearchInputRef.current?.focus(), 60);
                }
              }}
              className="md:hidden flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
              title={isMac ? "Search & Quick Navigation (⌘K)" : "Search & Quick Navigation (Ctrl+K)"}
              aria-label="Search and Navigate"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-mono font-medium text-slate-400">{isMac ? '⌘K' : 'Ctrl+K'}</span>
            </button>

            {/* Client Portal Mode Switcher */}
            <div className="relative flex items-center bg-slate-900/80 border border-slate-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => onSelectClientPortal(null)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                  !activeClientPortalId
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="View full agency operations"
              >
                <Zap className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{isBangla ? 'এজেন্সি অ্যাডমিন' : 'Agency Admin'}</span>
              </button>

              <div className="h-4 w-px bg-slate-800 mx-1"></div>

              <div className="relative flex items-center">
                <Eye className="w-3.5 h-3.5 text-cyan-400 absolute left-2 pointer-events-none" />
                <select
                  aria-label="Client Portal Preview"
                  value={activeClientPortalId || ''}
                  onChange={(e) => onSelectClientPortal(e.target.value ? e.target.value : null)}
                  className={`pl-7 pr-3 py-1 bg-transparent rounded-md text-xs font-medium cursor-pointer focus:outline-none ${
                    activeClientPortalId
                      ? 'text-cyan-300 font-semibold bg-cyan-950/40 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <option value="" className="bg-slate-900 text-slate-300">
                    {isBangla ? 'ক্লায়েন্ট পোর্টাল ভিউ...' : 'Client Portal View...'}
                  </option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                      Preview as {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Founder Portfolio Quick CTA */}
            {onNavigateTab && (
              <button
                type="button"
                onClick={() => onNavigateTab('founder')}
                className="hidden lg:flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 transition-all items-center gap-1.5 shadow-sm"
                title="View Abu Talib Founder Profile & Portfolios"
              >
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>Founder Portfolio</span>
              </button>
            )}

            {/* Quick Action buttons */}
            <button
              type="button"
              onClick={onOpenCopilot}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5 shadow-sm"
              title="Launch AI Proposal & Audit Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              <span className="hidden sm:inline">{t('nav.copilot', 'AI Copilot')}</span>
            </button>

            {/* Contact AIC Quick Info & Links */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 transition-all flex items-center gap-1.5 shadow-sm"
                title="Abrar IT Care - AIC Contact & Portal"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{t('header.contactUs', 'Contact AIC')}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} />
              </button>

              {isContactOpen && (
                <div 
                  className="absolute right-0 mt-2 w-84 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-4 z-50 space-y-3 text-xs"
                  onClick={() => setIsContactOpen(false)}
                >
                  <div className="border-b border-slate-800 pb-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        {AIC_AGENCY_INFO.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                        DIRECT CONTACT
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {AIC_AGENCY_INFO.tagline}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {/* WhatsApp Priority */}
                    <a
                      href={AIC_AGENCY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/70 border border-emerald-500/40 text-emerald-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-emerald-400 fill-current" />
                        <span>WhatsApp Direct Chat:</span>
                      </div>
                      <span className="font-bold text-emerald-300 font-mono">{AIC_AGENCY_INFO.whatsapp}</span>
                    </a>

                    {/* Phone */}
                    <a
                      href={`tel:${AIC_AGENCY_INFO.phone}`}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Phone / Hotline:</span>
                      </div>
                      <span className="font-bold text-emerald-400 font-mono">{AIC_AGENCY_INFO.phone}</span>
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:${AIC_AGENCY_INFO.email}`}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Official Email:</span>
                      </div>
                      <span className="font-mono text-cyan-300 truncate max-w-[140px]">{AIC_AGENCY_INFO.email}</span>
                    </a>

                    {/* Founder Portfolios Section */}
                    <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>Founder Portfolios (Abu Talib)</span>
                        {onNavigateTab && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsContactOpen(false);
                              onNavigateTab('founder');
                            }}
                            className="text-cyan-400 hover:underline cursor-pointer"
                          >
                            Open Profile →
                          </button>
                        )}
                      </div>
                      <div className="space-y-1 pt-1">
                        <a
                          href={AIC_AGENCY_INFO.founderPortfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between text-slate-300 hover:text-cyan-300 py-1 transition-colors text-[11px]"
                        >
                          <span className="flex items-center gap-1.5">
                            <Award className="w-3 h-3 text-cyan-400" />
                            <span>Netlify Portfolio:</span>
                          </span>
                          <span className="text-cyan-400 font-mono text-[10px] flex items-center gap-0.5">
                            {AIC_AGENCY_INFO.founderPortfolioDisplay}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </a>
                        <a
                          href={AIC_AGENCY_INFO.founderAcademyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between text-slate-300 hover:text-indigo-300 py-1 transition-colors text-[11px]"
                        >
                          <span className="flex items-center gap-1.5">
                            <Award className="w-3 h-3 text-indigo-400" />
                            <span>Academy Bio:</span>
                          </span>
                          <span className="text-indigo-400 font-mono text-[10px] flex items-center gap-0.5">
                            {AIC_AGENCY_INFO.founderAcademyDisplay}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </a>
                      </div>
                    </div>

                    <a
                      href={AIC_AGENCY_INFO.portalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Academy Portal:</span>
                      </div>
                      <span className="text-slate-300 truncate max-w-[140px] text-[11px] flex items-center gap-1">
                        {AIC_AGENCY_INFO.portalDisplay}
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </span>
                    </a>

                    <a
                      href={AIC_AGENCY_INFO.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Share2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>Official Facebook:</span>
                      </div>
                      <span className="text-blue-300 truncate max-w-[140px] text-[11px] flex items-center gap-1">
                        {AIC_AGENCY_INFO.facebookDisplay}
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </span>
                    </a>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Lead Director: {AIC_AGENCY_INFO.director}</span>
                    <span className="text-cyan-400">Dhaka, Bangladesh</span>
                  </div>
                </div>
              )}
            </div>

            {/* Help Center Button */}
            {onOpenHelpCenter && (
              <button
                type="button"
                onClick={onOpenHelpCenter}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center gap-1.5 shadow-sm"
                title={isBangla ? 'সহায়তা কেন্দ্র ও নির্দেশিকা' : 'Help Center & User Guide'}
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xl:inline">{isBangla ? 'সহায়তা' : 'Help'}</span>
              </button>
            )}

            {/* Language Switcher Toggle - Positioned immediately after Contact AIC */}
            <LanguageToggle />
            {isCurrentAdmin && (
              <button
                type="button"
                onClick={() => setUserAccessModalOpen(true)}
                className="hidden md:flex px-2.5 py-1.5 rounded-lg text-xs font-bold bg-purple-950/70 hover:bg-purple-900 text-purple-300 hover:text-purple-200 border border-purple-500/40 transition-all items-center gap-1.5 shadow-sm"
                title="Topic Permissions & Client Access Control"
              >
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden xl:inline">{t('header.topicPermissions', 'Topic Permissions')}</span>
              </button>
            )}

            {/* Authenticated User Account Menu */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl text-xs border transition-all ${
                    isUserMenuOpen
                      ? 'bg-slate-800 border-cyan-500/60 shadow-md'
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] uppercase ${
                    currentUser.role === 'admin'
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/40'
                      : currentUser.role === 'client'
                      ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-600/40'
                      : 'bg-emerald-600 text-white'
                  }`}>
                    {currentUser.name.slice(0, 2)}
                  </div>

                  <div className="flex flex-col text-left hidden sm:flex">
                    <span className="text-[11px] font-bold text-white leading-tight truncate max-w-[110px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400 leading-none mt-0.5">
                      {currentUser.role === 'admin' 
                        ? '👑 Super Admin' 
                        : `🎯 ${currentUser.allowedTabs.length} টপিক সচল`}
                    </span>
                  </div>

                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180 text-white' : ''}`} />
                </button>

                {/* User Profile Dropdown Popover */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3 text-xs">
                    {/* User Identity Header */}
                    <div className="border-b border-slate-800 pb-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm truncate">
                          {currentUser.name}
                        </span>
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.2 rounded font-bold ${
                          currentUser.role === 'admin'
                            ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                            : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {currentUser.email}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {currentUser.company || 'Direct Agency User'}
                      </p>
                    </div>

                    {/* Allowed Topics Snapshot */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>অনুমোদিত টপিকসমূহ:</span>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">
                          {currentUser.role === 'admin' ? '10/10 All' : `${currentUser.allowedTabs.length} Modules`}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto no-scrollbar pt-1">
                        {currentUser.role === 'admin' ? (
                          <span className="px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                            সম্পূর্ণ ড্যাশবোর্ড আনলকড (Full Access)
                          </span>
                        ) : (
                          currentUser.allowedTabs.map(tab => {
                            const match = TOPIC_PERMISSIONS_CATALOG.find(t => t.id === tab);
                            return (
                              <span 
                                key={tab} 
                                className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-cyan-500/20 text-[10px] font-medium"
                              >
                                {match?.name || tab}
                              </span>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Actions Links */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      {isCurrentAdmin && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            setUserAccessModalOpen(true);
                          }}
                          className="w-full px-2.5 py-2 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-500/30 transition-colors flex items-center gap-2 font-bold"
                        >
                          <Sliders className="w-3.5 h-3.5 text-purple-400" />
                          <span>টপিক পারমিশন ও এক্সেস কন্ট্রোল</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setAuthModalOpen(true);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 transition-colors flex items-center gap-2 font-medium"
                      >
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        <span>ব্যবহারকারী / রোল পরিবর্তন করুন</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-colors flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-400" />
                        <span>লগআউট (Sign Out)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="px-3 py-1.5 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/30 transition-all flex items-center gap-1.5 text-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>লগইন / রেজি:</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenNewClient}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-600/30"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t('header.newClient', '+ New Client')}</span>
            </button>


          </div>

        </div>

        {/* Mobile search bar expandable drawer */}
        {isMobileSearchOpen && (
          <div className="md:hidden pb-3 pt-2 border-t border-slate-800/80 animate-fade-in">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (!isSearchOpen) setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                onClick={() => setIsSearchOpen(true)}
                onKeyDown={handleSearchKeyDown}
                placeholder={t('header.search.placeholder', 'Search clients, sections, models, invoices...')}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-24 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-inner"
                aria-label="Search and navigate"
                autoComplete="off"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchChange('');
                      mobileSearchInputRef.current?.focus();
                    }}
                    className="p-1 text-slate-400 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileSearchOpen(false);
                      setIsSearchOpen(false);
                    }}
                    className="p-1 text-slate-400 hover:text-white"
                    aria-label="Close mobile search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold text-slate-400 bg-slate-800 border border-slate-700/80 rounded shadow-xs">
                  <span>{isMac ? '⌘K' : 'Ctrl+K'}</span>
                </kbd>
              </div>
            </div>

            {/* Mobile Recent Searches Section */}
            {isSearchOpen && recentSearches.length > 0 && (
              <div className="mt-2 bg-slate-900/98 border border-slate-800 rounded-xl p-2 shrink-0">
                <div className="px-1 pb-1 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <History className="w-3.5 h-3.5" />
                    <span>{t('header.recentSearches', 'Recent Searches')}</span>
                    <span className="text-slate-600 font-mono font-normal">({recentSearches.length}/5)</span>
                  </span>
                  <button
                    type="button"
                    onClick={clearAllRecentSearches}
                    className="text-[10px] text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    <span>{t('header.clearRecent', 'Clear all')}</span>
                  </button>
                </div>
                <div className="space-y-1 mt-1">
                  {recentSearches.map((query) => (
                    <div
                      key={`mob-recent-${query}`}
                      className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs bg-slate-850/60 border border-slate-800"
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectRecentSearch(query)}
                        className="flex items-center gap-2 text-left flex-1 min-w-0"
                      >
                        <History className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="text-slate-200 font-medium truncate">{query}</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => removeRecentSearch(query, e)}
                        className="p-1 text-slate-500 hover:text-red-400"
                        aria-label={`Remove ${query}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile quick results list */}
            {isSearchOpen && combinedResults.length > 0 && (
              <div className="mt-2 bg-slate-900/98 border border-slate-800 rounded-xl shadow-xl max-h-[260px] overflow-y-auto p-1 divide-y divide-slate-800/40">
                {combinedResults.slice(0, 10).map((item, idx) => {
                  const Icon = item.icon || (item.isAdmin ? Zap : Eye);
                  const isCurrentActive = item.type === 'portal' && (item.isAdmin ? !activeClientPortalId : activeClientPortalId === item.id);
                  return (
                    <button
                      key={`mob-${item.type}-${item.id}`}
                      type="button"
                      onClick={() => handleSelectNavigationItem(item)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between text-xs transition-colors ${
                        idx === selectedIndex
                          ? 'bg-cyan-500/15 text-white'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="p-1 rounded bg-slate-800 text-slate-400">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <div className="font-semibold text-slate-100 flex items-center gap-1">
                            <span>{item.title}</span>
                            {isCurrentActive && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                                {isBangla ? 'সক্রিয়' : 'Current'}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">{item.subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0 ml-1">
                        {item.type === 'section' ? 'Tab' : 'Portal'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notice if in Client Portal View Mode */}
      {selectedPortalClient && (
        <div className="bg-cyan-950/60 border-t border-b border-cyan-800/40 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-cyan-200">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>
                <strong>Client Portal Simulation:</strong> Viewing as <strong>{selectedPortalClient.company}</strong> ({selectedPortalClient.tier} • ${selectedPortalClient.monthlyFee.toLocaleString()}/mo)
              </span>
            </div>
            <button
              onClick={() => onSelectClientPortal(null)}
              className="px-2 py-0.5 rounded bg-cyan-900/80 hover:bg-cyan-800 text-cyan-100 text-xs transition-colors"
            >
              Exit to Agency View ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
