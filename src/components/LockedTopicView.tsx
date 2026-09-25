import React from 'react';
import { 
  ShieldAlert, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare, 
  LogIn, 
  Compass, 
  Megaphone, 
  Target, 
  Receipt, 
  Users, 
  Bot, 
  GitBranch, 
  Sparkles, 
  Award,
  KeyRound
} from 'lucide-react';
import { DashboardTab } from '../types';
import { useAuth } from '../context/AuthContext';
import { TOPIC_PERMISSIONS_CATALOG } from '../data/topicPermissions';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';

interface LockedTopicViewProps {
  targetTab: DashboardTab;
  onNavigateTab: (tab: DashboardTab) => void;
}

export const LockedTopicView: React.FC<LockedTopicViewProps> = ({
  targetTab,
  onNavigateTab,
}) => {
  const { currentUser, setAuthModalOpen, switchUser, users } = useAuth();

  const targetTopic = TOPIC_PERMISSIONS_CATALOG.find(t => t.id === targetTab);
  const topicName = targetTopic?.name || targetTab;
  const topicNameBn = targetTopic?.nameBn || '';

  // Allowed topics for this user
  const allowedTopics = TOPIC_PERMISSIONS_CATALOG.filter(t => 
    currentUser?.allowedTabs.includes(t.id)
  );

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Primary Security Alert Box */}
      <div className="bg-slate-900/90 border border-red-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-red-950/50">
            <Lock className="w-7 h-7 text-red-400" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/15 text-red-300 border border-red-500/30 uppercase tracking-wide">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>এক্সেস সংরক্ষিত • Protected Topic</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {topicName}
            </h2>
            {topicNameBn && (
              <p className="text-xs text-slate-400 font-medium">
                {topicNameBn}
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed">
              আপনার বর্তমান ইউজার অ্যাকাউন্ট (<strong className="text-white">{currentUser?.name || 'Guest'}</strong>) এই টপিকটি দেখার অনুমতিপ্রাপ্ত নয়। প্রতিটি মডিউলের নিরাপত্তা বজায় রাখতে শুধুমাত্র অনুমোদিত টপিক প্রদর্শিত হয়।
            </p>
          </div>
        </div>

        {/* User Account Info Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-500 text-[11px] block">ইউজার নেম ও রোল</span>
            <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
              <span>{currentUser?.name || 'Not logged in'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 uppercase font-mono">
                {currentUser?.role || 'Guest'}
              </span>
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-500 text-[11px] block">কোম্পানি / ক্লায়েন্ট</span>
            <span className="text-white font-semibold block mt-0.5 truncate">
              {currentUser?.company || 'AIC Client'}
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-500 text-[11px] block">অনুমোদিত টপিক সংখ্যা</span>
            <span className="text-emerald-400 font-mono font-bold block mt-0.5">
              {currentUser?.allowedTabs.length || 0} টি টপিক সচল
            </span>
          </div>
        </div>
      </div>

      {/* Accessible Topics for this User */}
      {allowedTopics.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>আপনার অ্যাকাউন্টের জন্য অনুমোদিত টপিকসমূহ</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                নিচের যেকোনো টপিকে ক্লিক করে সরাসরি এক্সেস করুন:
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {allowedTopics.length} Accessible
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allowedTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => onNavigateTab(topic.id)}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/40 text-left transition-all group flex items-center justify-between shadow-sm"
              >
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <span>{topic.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                      {topic.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {topic.nameBn}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Permission Request & Contact Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-bold text-white text-sm block">
            এই টপিকের এক্সেস প্রয়োজন?
          </span>
          <p className="text-slate-400 max-w-md">
            আপনার ক্লায়েন্ট অ্যাকাউন্টে <strong className="text-slate-200">{topicName}</strong> অন্তর্ভুক্ত করতে সরাসরি ডিরেক্টর আবু তালিবের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={AIC_AGENCY_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp এক্সেস রিকোয়েস্ট</span>
          </a>

          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="px-4 py-2 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-all flex items-center gap-2"
          >
            <KeyRound className="w-4 h-4 text-cyan-400" />
            <span>অন্য অ্যাকাউন্টে লগইন</span>
          </button>
        </div>
      </div>

    </div>
  );
};
