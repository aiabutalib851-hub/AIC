import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  X,
  Search,
  BookOpen,
  Compass,
  Megaphone,
  Target,
  Receipt,
  Users,
  Bot,
  GitBranch,
  Award,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Layers,
  MessageSquare,
  Phone,
  Sliders,
  Eye,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Building2,
  Tag,
  Globe,
  FileQuestion,
  Filter
} from 'lucide-react';
import { DashboardTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';
import { AGENCY_FAQS, FAQ_TOPICS, FaqTopic } from '../data/agencyFaqs';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: DashboardTab) => void;
}

type HelpCategory = 'getting_started' | 'faq' | 'meta_ads_cro' | 'billing_finance' | 'ai_fleet' | 'security' | 'support';

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const { t, isBangla } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<HelpCategory>('getting_started');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaqTopic, setSelectedFaqTopic] = useState<FaqTopic>('all');
  const [expandedFaqIds, setExpandedFaqIds] = useState<string[]>([
    'faq-portal-switch',
    'faq-multi-business'
  ]);

  // Toggle FAQ accordion expansion
  const toggleFaq = (id: string) => {
    setExpandedFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAllFaqs = () => {
    setExpandedFaqIds(filteredFaqs.map((f) => f.id));
  };

  const collapseAllFaqs = () => {
    setExpandedFaqIds([]);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter FAQs dynamically based on search query and selected topic
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return AGENCY_FAQS.filter((item) => {
      const matchesTopic = selectedFaqTopic === 'all' || item.topic === selectedFaqTopic;
      if (!matchesTopic) return false;

      if (!q) return true;

      const questionMatch =
        item.question.toLowerCase().includes(q) || item.questionBn.toLowerCase().includes(q);
      const answerMatch =
        item.answer.toLowerCase().includes(q) || item.answerBn.toLowerCase().includes(q);
      const tagMatch = item.tags.some((tag) => tag.toLowerCase().includes(q));
      const topicMatch =
        item.topicLabel.toLowerCase().includes(q) || item.topicLabelBn.toLowerCase().includes(q);
      const keyPointsMatch =
        item.keyPoints?.some((kp) => kp.toLowerCase().includes(q)) ||
        item.keyPointsBn?.some((kp) => kp.toLowerCase().includes(q));

      return questionMatch || answerMatch || tagMatch || topicMatch || Boolean(keyPointsMatch);
    });
  }, [searchQuery, selectedFaqTopic]);

  if (!isOpen) return null;

  const categories: {
    id: HelpCategory;
    label: string;
    labelBn: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    {
      id: 'getting_started',
      label: 'Getting Started',
      labelBn: 'শুরু করার নির্দেশিকা',
      icon: BookOpen
    },
    {
      id: 'faq',
      label: 'Agency FAQs',
      labelBn: 'প্রশ্নোত্তর (FAQ)',
      icon: HelpCircle,
      badge: searchQuery ? `${filteredFaqs.length}` : `${AGENCY_FAQS.length}`
    },
    {
      id: 'meta_ads_cro',
      label: 'Meta Ads & CRO Blueprint',
      labelBn: 'মেটা অ্যাডস ও সিআরও',
      icon: Megaphone
    },
    {
      id: 'billing_finance',
      label: 'Billing & Multi-Business',
      labelBn: 'বিলিং ও মাল্টি-বিজনেস',
      icon: Receipt
    },
    {
      id: 'ai_fleet',
      label: 'AI Fleet & Copilot',
      labelBn: 'এআই বহর ও কোপাইলট',
      icon: Bot
    },
    {
      id: 'security',
      label: 'Topic Permissions & Security',
      labelBn: 'পারমিশন ও নিরাপত্তা',
      icon: ShieldCheck
    },
    {
      id: 'support',
      label: 'Hotline & Direct Support',
      labelBn: 'সহায়তা হটলাইন ও যোগাযোগ',
      icon: Phone
    }
  ];

  const handleNavigate = (tab: DashboardTab) => {
    onNavigateTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-cyan-950/40 flex flex-col overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-center-title"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="help-center-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{isBangla ? 'এআইসি সহায়তা কেন্দ্র ও ইউজার গাইড' : 'AIC Dashboard Help Center & User Guide'}</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {isBangla ? 'শিক্ষা ও সহায়তা' : 'Documentation'}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBangla 
                  ? 'এআইসি এজেন্সি ড্যাশবোর্ড ও ক্লায়েন্ট সিস্টেম ব্যবহারের বিস্তারিত নির্দেশিকা' 
                  : 'Mastering the AI consulting, campaign engineering & multi-business management platform'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Help Center"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Quick Filter Bar */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-950/60 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBangla ? 'সহায়তা ও প্রশ্নোত্তর খুঁজুন (যেমন: পোর্টাল, ইনভয়েস, অ্যান্ড্রোমিডা, সিআরও, কোপাইলট)...' : 'Search FAQs, guides & topics (e.g., portals, invoices, Andromeda, CRO, agents)...'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-16 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Modal Body: Sidebar Categories + Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Category Navigation (Desktop Sidebar / Mobile Horizontal Scroller) */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/40 p-2 md:p-3 shrink-0 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap md:whitespace-normal shrink-0 ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="flex-1">{isBangla ? cat.labelBn : cat.label}</span>
                  {cat.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${
                        isActive
                          ? 'bg-cyan-400/20 text-cyan-200 border border-cyan-400/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 hidden md:block text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Educational Content Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm">
            
            {/* Cross-Section FAQ Search Discovery Banner */}
            {searchQuery && activeCategory !== 'faq' && filteredFaqs.length > 0 && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {isBangla
                        ? `প্রশ্নোত্তর সেকশনে ${filteredFaqs.length}টি প্রাসঙ্গিক উত্তর পাওয়া গেছে`
                        : `Found ${filteredFaqs.length} matching answer${filteredFaqs.length > 1 ? 's' : ''} in Agency FAQs`}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isBangla
                        ? `"${searchQuery}" অনুসন্ধানের জন্য সমাধানগুলো দেখতে ক্লিক করুন`
                        : `Dynamic troubleshooting and operational answers for "${searchQuery}"`}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveCategory('faq')}
                  className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shrink-0 flex items-center gap-1 transition-all shadow-sm"
                >
                  <span>{isBangla ? 'প্রশ্নোত্তর দেখুন' : 'Switch to FAQs'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* CATEGORY: FREQUENTLY ASKED QUESTIONS (FAQ) */}
            {activeCategory === 'faq' && (
              <div className="space-y-4 animate-fade-in">
                {/* Header & Quick Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <span>{isBangla ? 'এজেন্সি প্রশ্নোত্তর ও সমাধান গাইড (FAQs)' : 'Frequently Asked Questions (Agency FAQs)'}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isBangla
                        ? 'ক্লায়েন্ট অনবোর্ডিং, বিলিং ও ট্রেজারি, মেটা ব্লুপ্রিন্ট, সিআরও ও এআই বহর সম্পর্কিত সাধারণ জিজ্ঞাসা।'
                        : 'Dynamic search & real-time answers for client portals, treasury, Andromeda campaigns, CRO, and AI agents.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={expandAllFaqs}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700/80 transition-colors"
                    >
                      {isBangla ? 'সব খুলুন' : 'Expand All'}
                    </button>
                    <button
                      type="button"
                      onClick={collapseAllFaqs}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors"
                    >
                      {isBangla ? 'সব বন্ধ করুন' : 'Collapse All'}
                    </button>
                  </div>
                </div>

                {/* Topic Filter Pills */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold uppercase tracking-wider flex items-center gap-1 text-slate-400">
                      <Filter className="w-3 h-3 text-cyan-400" />
                      {isBangla ? 'টপিক অনুযায়ী ফিল্টার করুন' : 'Filter by Management Topic'}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-300">
                      {filteredFaqs.length} / {AGENCY_FAQS.length} {isBangla ? 'প্রশ্ন' : 'Questions'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    {FAQ_TOPICS.map((topic) => {
                      const isSelected = selectedFaqTopic === topic.id;
                      const count =
                        topic.id === 'all'
                          ? AGENCY_FAQS.length
                          : AGENCY_FAQS.filter((f) => f.topic === topic.id).length;

                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => setSelectedFaqTopic(topic.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span>{isBangla ? topic.labelBn : topic.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                              isSelected
                                ? 'bg-cyan-400/20 text-cyan-200 font-bold'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Search / Filter Active Indicator */}
                {(searchQuery || selectedFaqTopic !== 'all') && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-cyan-400" />
                      <span>
                        {isBangla ? 'সক্রিয় ফিল্টার:' : 'Active filter:'}{' '}
                        {searchQuery && (
                          <span className="text-cyan-300 font-medium">"{searchQuery}" </span>
                        )}
                        {selectedFaqTopic !== 'all' && (
                          <span className="text-indigo-300 font-medium">
                            [
                            {isBangla
                              ? FAQ_TOPICS.find((t) => t.id === selectedFaqTopic)?.labelBn
                              : FAQ_TOPICS.find((t) => t.id === selectedFaqTopic)?.label}
                            ]
                          </span>
                        )}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedFaqTopic('all');
                      }}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-semibold"
                    >
                      {isBangla ? 'রিসেট করুন' : 'Reset All'}
                    </button>
                  </div>
                )}

                {/* FAQ Questions Accordion List */}
                {filteredFaqs.length === 0 ? (
                  <div className="py-12 text-center bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                      <HelpCircle className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
                        {isBangla ? 'কোনো সংশ্লিষ্ট প্রশ্নোত্তর পাওয়া যায়নি' : 'No matching questions found'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        {isBangla
                          ? `"${searchQuery}" এর সাথে মিলে এমন কোনো উত্তর পাওয়া যায়নি। অন্য শব্দ লিখে চেষ্টা করুন বা ফিল্টার পরিবর্তন করুন।`
                          : `We couldn't find any questions matching "${searchQuery}". Try a different keyword or reset filters.`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedFaqTopic('all');
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 rounded-lg hover:bg-cyan-900/60 transition-colors"
                    >
                      {isBangla ? 'সকল প্রশ্ন দেখুন' : 'Show All Agency Questions'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredFaqs.map((faq) => {
                      const isExpanded = expandedFaqIds.includes(faq.id);
                      return (
                        <div
                          key={faq.id}
                          className={`rounded-xl border transition-all ${
                            isExpanded
                              ? 'bg-slate-950/90 border-cyan-500/40 shadow-sm shadow-cyan-950/30'
                              : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          {/* Question Bar */}
                          <button
                            type="button"
                            onClick={() => toggleFaq(faq.id)}
                            aria-expanded={isExpanded}
                            className="w-full text-left p-3.5 flex items-start sm:items-center justify-between gap-3 group"
                          >
                            <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                              <span className="p-1 rounded bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors mt-0.5 sm:mt-0 shrink-0">
                                <FileQuestion className="w-3.5 h-3.5" />
                              </span>
                              <div className="min-w-0">
                                <div className="font-semibold text-xs sm:text-sm text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug">
                                  {isBangla ? faq.questionBn : faq.question}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] font-medium text-slate-400 bg-slate-800/80 px-1.5 py-0.2 rounded border border-slate-700/60">
                                    {isBangla ? faq.topicLabelBn : faq.topicLabel}
                                  </span>
                                  {faq.tags.slice(0, 2).map((t) => (
                                    <span key={t} className="text-[9px] text-slate-500 hidden sm:inline font-mono">
                                      #{t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 p-1 text-slate-400 group-hover:text-white transition-colors">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-cyan-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </button>

                          {/* Answer Area */}
                          {isExpanded && (
                            <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-800/70 text-xs space-y-3 animate-fade-in">
                              <p className="text-slate-300 leading-relaxed pt-1">
                                {isBangla ? faq.answerBn : faq.answer}
                              </p>

                              {/* Key Takeaways */}
                              {((isBangla ? faq.keyPointsBn : faq.keyPoints) || []).length > 0 && (
                                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1.5">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                                    <span>{isBangla ? 'প্রধান নির্দেশিকা ও বৈশিষ্ট্য' : 'Key Operational Highlights'}</span>
                                  </span>
                                  <ul className="space-y-1 text-[11px] text-slate-300">
                                    {(isBangla ? faq.keyPointsBn : faq.keyPoints)?.map((point, idx) => (
                                      <li key={idx} className="flex items-start gap-1.5">
                                        <span className="text-cyan-400 mt-0.5">•</span>
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Footer Actions: Tags & Deep-link Tab Navigation */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-900">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <Tag className="w-3 h-3 text-slate-500" />
                                  {faq.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSearchQuery(tag);
                                      }}
                                      className="cursor-pointer text-[10px] font-mono text-slate-400 hover:text-cyan-300 bg-slate-900 hover:bg-slate-850 px-1.5 py-0.5 rounded border border-slate-800 transition-colors"
                                      title={`Filter by #${tag}`}
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>

                                {faq.tabTarget && (
                                  <button
                                    type="button"
                                    onClick={() => handleNavigate(faq.tabTarget!)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-all shadow-xs group/btn"
                                  >
                                    <span>{isBangla ? (faq.tabLabelBn || 'মডিউলে যান') : (faq.tabLabel || 'Open Module')}</span>
                                    <ArrowRight className="w-3 h-3 text-cyan-400 group-hover/btn:translate-x-0.5 transition-transform" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
            {/* CATEGORY 1: GETTING STARTED */}
            {activeCategory === 'getting_started' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/20">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm sm:text-base mb-1">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>{isBangla ? 'স্বাগতম: এআইসি এজেন্সি ড্যাশবোর্ড' : 'Welcome to AIC Agency Dashboard'}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isBangla
                      ? 'আবরার আইটি কেয়ার (AIC) হলো একটি উচ্চ-ক্ষমতাসম্পন্ন এআই কনসাল্টিং, মেটা অ্যাডস অপ্টিমাইজেশন ও পারফরম্যান্স মার্কেটিং প্ল্যাটফর্ম। নিচে ড্যাশবোর্ডের প্রধান ফিচারগুলো ব্যবহারের সহজ ধাপ দেওয়া হলো।'
                      : 'Abrar IT Care (AIC) provides cutting-edge enterprise AI consulting, autonomous agent fleets, 2026 Meta Andromeda ad scaling, and comprehensive treasury management. Below are the key navigation and operational principles.'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                    {isBangla ? 'প্রধান ১০টি মডিউল পরিচিতি' : 'The 10 Core Platform Modules'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div 
                      onClick={() => handleNavigate('overview')}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-cyan-300">
                        <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-cyan-400" /> 1. Overview</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-cyan-400 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {isBangla ? 'সার্বিক টেলিমেট্রি, ক্লায়েন্ট স্থিতি ও লাইভ অপারেশন মেট্রিক্স।' : 'Executive telemetry, live retainers & real-time operational status.'}
                      </p>
                    </div>

                    <div 
                      onClick={() => handleNavigate('services')}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-cyan-300">
                        <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-indigo-400" /> 2. Service Catalog</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-cyan-400 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {isBangla ? '৭-ধাপের ক্লায়েন্ট গ্রোথ জার্নি (Diagnose থেকে Scale পর্যন্ত)।' : 'The 7-stage client growth journey from Diagnose to Scale.'}
                      </p>
                    </div>

                    <div 
                      onClick={() => handleNavigate('blueprint')}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-cyan-300">
                        <span className="flex items-center gap-1.5"><Megaphone className="w-3.5 h-3.5 text-amber-400" /> 3. Meta Ads Blueprint</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-cyan-400 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {isBangla ? '২২-ধাপের মেটা অ্যান্ড্রমিডা ক্যাম্পেইন লঞ্চ ও স্কেলিং আর্কিটেকচার।' : '22-Phase Andromeda campaign execution & dynamic creative testing.'}
                      </p>
                    </div>

                    <div 
                      onClick={() => handleNavigate('cro')}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-cyan-300">
                        <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-rose-400" /> 4. CRO & Growth Audit</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-cyan-400 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {isBangla ? 'কনভার্সন রেট অপটিমাইজেশন, ফানেল লিক সমাধান ও ইউনিট ইকোনমিক্স।' : 'Funnel leak diagnostics, conversion rate modeling & ROI multipliers.'}
                      </p>
                    </div>

                    <div 
                      onClick={() => handleNavigate('billing')}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-cyan-300">
                        <span className="flex items-center gap-1.5"><Receipt className="w-3.5 h-3.5 text-emerald-400" /> 5. Billing & Treasury</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-cyan-400 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {isBangla ? 'মাল্টি-বিজনেস এন্টিটি, একাধিক ব্যাংক একাউন্ট, আয়-ব্যয় হিসাব ও ইনভেন্টরি।' : 'Multiple businesses, bank accounts, income/expense tracking & invoicing.'}
                      </p>
                    </div>

                    <div 
                      onClick={() => handleNavigate('copilot')}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-cyan-300">
                        <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> 10. AI Copilot</span>
                        <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-cyan-400 transition-all" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {isBangla ? 'বুদ্ধিমান এআই কোপাইলট দিয়ে তাৎক্ষণিক প্রপোজাল ও অডিট বিশ্লেষণ।' : 'AI-driven strategy generator, audit synthesizer & custom proposals.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    {isBangla ? 'ক্লায়েন্ট পোর্টাল প্রিভিউ মোড' : 'Client Portal View Switcher'}
                  </span>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {isBangla
                      ? 'টপ হেডার বারের ড্রপডাউন থেকে যেকোনো ক্লায়েন্ট সিলেক্ট করে দেখে নিতে পারেন তারা নিজস্ব পোর্টালে তাদের প্রজেক্ট ও ইনভয়েস কিভাবে দেখতে পান।'
                      : 'Use the dropdown in the top header to preview how specific clients experience their private dashboard view, active deliverables, and invoice history.'}
                  </p>
                </div>
              </div>
            )}

            {/* CATEGORY 2: META ADS & CRO */}
            {activeCategory === 'meta_ads_cro' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-amber-400" />
                      <span>{isBangla ? 'মেটা অ্যান্ড্রমিডা ২০২৬ ক্যাম্পেইন আর্কিটেকচার' : 'Meta Andromeda 2026 Blueprint'}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isBangla ? '২২-ধাপের বিজ্ঞানসম্মত স্কেলিং ও সিএপিআই সিঙ্ক্রোনাইজেশন' : '22-Phase systematic launch, creative iteration & CAPI integration'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('blueprint')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1"
                  >
                    <span>{isBangla ? 'ব্লুপ্রিন্ট দেখুন' : 'Open Blueprint'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="font-semibold text-amber-300 mb-1">
                      {isBangla ? '১. প্রি-লঞ্চ ভ্যালিডেশন ও পিক্সেল সিএপিআই' : '1. Pre-Launch Validation & Conversions API (CAPI)'}
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      {isBangla
                        ? 'সার্ভার-সাইড ট্র্যাকিং, ইভেন্ট ডিডুপ্লিকেশন এবং ফার্স্ট-পার্টি কুকি কনফিগারেশন নিশ্চিত করে ডাটা ড্রপ শূন্যে নামিয়ে আনা হয়।'
                        : 'Server-side tracking, event deduplication, and custom parameter tagging prevent signal degradation under aggressive ad-blockers.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="font-semibold text-rose-300 mb-1">
                      {isBangla ? '২. সিআরও অডিট ও ফানেল লিক অ্যানালাইসিস' : '2. CRO Audit & Funnel Leak Engineering'}
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      {isBangla
                        ? 'ভিজিটররা ল্যান্ডিং পেজে এসে ঠিক কোথায় ড্রপ-অফ করছে তা আইডেন্টিফাই করে চেকআউট ড্রপ, ফর্ম ফ্রিকশন ও স্পিড অপটিমাইজ করা হয়।'
                        : 'Identify exact drop-off stages across the customer journey to boost conversion rates and lower Customer Acquisition Cost (CAC).'}
                    </p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleNavigate('cro')}
                        className="text-rose-400 hover:text-rose-300 underline font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Target className="w-3 h-3" />
                        <span>{isBangla ? 'সিআরও ও গ্রোথ অডিট টুলে যান' : 'Jump to CRO & Growth Audit Tool'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 3: BILLING & MULTI-BUSINESS */}
            {activeCategory === 'billing_finance' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-emerald-400" />
                      <span>{isBangla ? 'মাল্টি-বিজনেস ও ট্রেজারি ব্যবস্থাপনা' : 'Multi-Business Treasury & Invoicing'}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isBangla ? 'একাধিক কোম্পানি, একাধিক ব্যাংক একাউন্ট ও কাস্টম ক্যাটাগরি' : 'Consolidate multiple operating legal entities, accounts, and inventory'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('billing')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all flex items-center gap-1"
                  >
                    <span>{isBangla ? 'বিলিংয়ে যান' : 'Open Billing'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-cyan-300 block mb-1">
                      {isBangla ? 'বিলিং কাস্টমাইজেশন ও বিজনেস নাম যুক্তকরণ:' : 'Customizing Businesses & Billing Parameters:'}
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isBangla
                        ? 'বিলিং পেজের "Customize Billing & Businesses" বাটনে ক্লিক করে নতুন বিজনেস নাম, অফিস ঠিকানা, ট্যাক্স আইডি (BIN/TIN), ইনভয়েস প্রিফিক্স ও পেমেন্ট টার্মস সেট করুন।'
                        : 'Click "Customize Billing & Businesses" in Billing to configure distinct business entities (AIC, Abrar Academy, etc.), official tax IDs, legal address, invoice numbering prefix, and default terms.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-emerald-300 block mb-1">
                      {isBangla ? 'আয় ও ব্যয়ের হিসাব (+ Record Income / - Record Expense):' : 'Income & Expense Recording:'}
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isBangla
                        ? 'ক্লায়েন্ট রিটেইনার বা অন্যান্য আয় রেকর্ড করুন এবং অ্যাড স্পেন্ড বা সার্ভার খরচ অপারেশনাল ব্যয় হিসেবে লিপিবদ্ধ করুন। সব ডাটা নির্দিষ্ট ব্যাংক একাউন্টে সমন্বিত হয়।'
                        : 'Record incoming revenues and track operational business expenses (software subscriptions, ad spend, operational overhead) mapped to specific bank or mobile money accounts.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-amber-300 block mb-1">
                      {isBangla ? 'প্রোডাক্ট ইনভেন্টরি ও স্টক সমন্বয়:' : 'Product Inventory & Physical/Digital Toolkits:'}
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isBangla
                        ? 'ডিজিটাল টুলকিট বা ট্রেনিং ম্যাটেরিয়ালের স্টক ট্র্যাক করুন। স্টক আউট হলে স্বয়ংক্রিয়ভাবে অর্থ একাউন্টে জমা করার অপশন রয়েছে।'
                        : 'Manage agency toolkits, digital courses, or equipment inventory with low-stock alerts and automatic sales-to-finance account synchronization.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 4: AI FLEET & COPILOT */}
            {activeCategory === 'ai_fleet' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span>{isBangla ? 'স্বয়ংক্রিয় এআই ফ্লিট ও কোপাইলট' : 'AI Agent Fleet & Copilot'}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isBangla ? '২৪/৭ অটোনোমাস এজেন্ট ও স্ট্র্যাটেজিক এআই অ্যাসিস্ট্যান্ট' : '24/7 autonomous agents, webhook monitors & proposal synthesizer'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNavigate('copilot')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1"
                  >
                    <span>{isBangla ? 'কোপাইলট লঞ্চ করুন' : 'Launch Copilot'}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-cyan-300 block mb-1">
                      {isBangla ? 'এআই কোপাইলট (AI Copilot):' : 'AIC Copilot Strategy Assistant:'}
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isBangla
                        ? 'ক্লায়েন্টের জন্য কাস্টম প্রপোজাল তৈরি, গ্রোথ জার্নি রোডম্যাপ সংশ্লেষণ ও মেটা অ্যাডস অডিট সামারি তৈরিতে সহায়তা করে।'
                        : 'Generate dynamic service agreements, client pitch proposals, audit summaries, and technical architecture specifications instantly.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-indigo-300 block mb-1">
                      {isBangla ? 'অটোনোমাস এজেন্ট ডিপ্লয়মেন্ট (AI Fleet):' : 'Deploying Autonomous Agents:'}
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isBangla
                        ? 'হেডারের "+ Deploy Agent" বাটনে ক্লিক করে নতুন এলএলএম মডেল, ওয়েবহুক ইউআরএল ও মনিটরিং ইন্টারভাল সেট করে এজেন্ট লঞ্চ করুন।'
                        : 'Deploy continuous webhook monitors, lead triage bots, and campaign telemetry observers tied to client retainers.'}
                    </p>
                    <div className="mt-2">
                      <button
                        onClick={() => handleNavigate('fleet')}
                        className="text-indigo-400 hover:text-indigo-300 underline font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Bot className="w-3 h-3" />
                        <span>{isBangla ? 'এআই ফ্লিট ম্যানেজমেন্টে যান' : 'Go to AI Agent Fleet'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 5: SECURITY & PERMISSIONS */}
            {activeCategory === 'security' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>{isBangla ? 'টপিক পারমিশন ও এক্সেস নিয়ন্ত্রণ' : 'Topic Permissions & Role Control'}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isBangla ? 'এডমিন বনাম ক্লায়েন্ট অ্যাক্সেস ও পাসওয়ার্ড প্রটেকশন' : 'Role-based access control, topic locking, and client credentials'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-purple-300 block mb-1">
                      {isBangla ? 'টপিক পারমিশন নিয়ন্ত্রণ (Master Topic Permissions):' : 'Master Topic Access Control:'}
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isBangla
                        ? 'এডমিন যেকোনো স্পর্শকাতর মডিউল (যেমন: বিলিং বা ফাউন্ডার প্রোফাইল) লক করতে পারেন। লক করা থাকলে সাধারণ ব্যবহারকারীরা এক্সেস রিকোয়েস্ট পাঠাতে পারবেন।'
                        : 'Agency Admins can restrict access to sensitive tabs (e.g., Billing, Founder Credentials) requiring explicit credentials or approval.'}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-bold text-cyan-300 block mb-1">
                      {isBangla ? 'দ্বি-ভাষিক সমর্থন (English & Bangla):' : 'Dual-Language Architecture (English & Bangla):'}
                    </span>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {isBangla
                        ? 'ড্যাশবোর্ডের হেডার এবং ফুটারে থাকা ভাষা টগল (EN / বাং) দিয়ে যেকোনো সময় এক ক্লিকে সম্পূর্ণ ইন্টারফেস বাংলায় বা ইংরেজিতে পরিবর্তন করা যায়।'
                        : 'Seamlessly toggle between English and Bengali using the Language Switcher located right after the Contact button in both the header and footer.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CATEGORY 6: SUPPORT & HOTLINE */}
            {activeCategory === 'support' && (
              <div className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>{isBangla ? 'সরাসরি সহায়তা ও জরুরি হটলাইন' : 'Direct Agency Support & Hotline'}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isBangla ? 'আবু তালেব ও এআইসি টেকনিক্যাল টিমের সাথে যোগাযোগ' : 'Connect with Director Abu Talib and the AIC Technical Team'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={AIC_AGENCY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                      <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-emerald-400" /> WhatsApp Hotline</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="text-xs text-white font-mono mt-1 font-semibold">{AIC_AGENCY_INFO.whatsapp}</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isBangla ? 'তাৎক্ষণিক চ্যাট ও দ্রুত সহায়তা' : 'Direct instant messaging & urgent consultation'}
                    </p>
                  </a>

                  <a
                    href={`tel:${AIC_AGENCY_INFO.phone}`}
                    className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/60 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                      <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-amber-400" /> Direct Phone Line</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="text-xs text-white font-mono mt-1 font-semibold">{AIC_AGENCY_INFO.phone}</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isBangla ? 'সরাসরি কল (অফিস সময়)' : 'Direct corporate desk & operations line'}
                    </p>
                  </a>

                  <a
                    href={AIC_AGENCY_INFO.founderPortfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-cyan-400/60 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                      <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-cyan-400" /> Founder Portfolio</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="text-xs text-slate-200 mt-1">{AIC_AGENCY_INFO.founderPortfolioDisplay}</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isBangla ? 'আবু তালেবের বায়োগ্রাফি ও ট্র্যাক রেকর্ড' : 'Biography, media appearances & credentials'}
                    </p>
                  </a>

                  <a
                    href={AIC_AGENCY_INFO.founderAcademyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-indigo-400/60 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
                      <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-indigo-400" /> Abrar Academy</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="text-xs text-slate-200 mt-1">{AIC_AGENCY_INFO.founderAcademyDisplay}</div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isBangla ? 'ডিজিটাল মার্কেটিং ও এআই মাস্টারক্লাস' : 'Advanced marketing & AI masterclasses'}
                    </p>
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isBangla ? 'এআইসি সহায়তা সংস্করণ ২.৫ • রিয়েল-টাইম অপারেশন' : 'AIC Help Version 2.5 • Continuous Operational Telemetry'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {isBangla ? 'বন্ধ করুন' : 'Close Guide'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
