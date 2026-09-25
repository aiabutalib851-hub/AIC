import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Check, 
  Lock, 
  Sparkles, 
  Building2, 
  Mail, 
  User, 
  KeyRound, 
  ChevronRight, 
  Info,
  Megaphone,
  Target,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardTab, UserRole } from '../types';
import { 
  TOPIC_PERMISSIONS_CATALOG, 
  ACCESS_PRESETS,
  ALL_DASHBOARD_TABS 
} from '../data/topicPermissions';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    currentUser, 
    login, 
    register, 
    switchUser, 
    users 
  } = useAuth();

  const [activeMode, setActiveMode] = useState<'signin' | 'signup' | 'demo'>('signin');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sign in fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('client');
  // Default new clients to Meta Blueprint & CRO Audit as per user's request!
  const [regAllowedTabs, setRegAllowedTabs] = useState<DashboardTab[]>(['blueprint', 'cro']);

  if (!authModalOpen) return null;

  const handleToggleTab = (tabId: DashboardTab) => {
    setRegAllowedTabs(prev => 
      prev.includes(tabId) ? prev.filter(t => t !== tabId) : [...prev, tabId]
    );
  };

  const handleApplyPreset = (presetTabs: DashboardTab[], role: UserRole) => {
    setRegAllowedTabs(presetTabs);
    setRegRole(role);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmail.trim()) {
      setErrorMessage('অনুগ্রহ করে ইমেইল অ্যাড্রেস লিখুন।');
      return;
    }

    const res = login(loginEmail);
    if (!res.success) {
      setErrorMessage(res.message || 'লগইন ব্যর্থ হয়েছে।');
    } else {
      setSuccessMessage('সফলভাবে লগইন হয়েছে!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1500);
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regName.trim() || !regEmail.trim()) {
      setErrorMessage('নাম এবং ইমেইল অ্যাড্রেস পূরণ করা আবশ্যক।');
      return;
    }

    if (regAllowedTabs.length === 0) {
      setErrorMessage('অন্তত একটি অনুমোদিত টপিক সিলেক্ট করুন (যেমন: Meta Blueprint বা CRO Audit)।');
      return;
    }

    const res = register({
      name: regName,
      email: regEmail,
      company: regCompany,
      role: regRole,
      allowedTabs: regAllowedTabs,
    });

    if (!res.success) {
      setErrorMessage(res.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।');
    } else {
      setSuccessMessage('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে এবং লগইন সম্পন্ন!');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 1500);
    }
  };

  const handleQuickSwitch = (userId: string) => {
    switchUser(userId);
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto no-scrollbar">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                AIC একাউন্ট ও টপিক পারমিশন সিকিউরিটি
              </h3>
              <p className="text-xs text-slate-400">
                নিরাপদ এক্সেসের জন্য লগইন বা রেজি: আবশ্যক • Role & Topic Clearance
              </p>
            </div>
          </div>

          {currentUser && (
            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveMode('signin');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeMode === 'signin'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>লগইন (Sign In)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('signup');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeMode === 'signup'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>রেজিস্ট্রেশন (Register)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMode('demo');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeMode === 'demo'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>১-ক্লিক রোল টেস্ট</span>
          </button>
        </div>

        {/* Error / Success feedback */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* MODE 1: Sign In */}
        {activeMode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>ইমেইল অ্যাড্রেস (Email Address)</span>
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="उदा. rahman.client@gmail.com বা ai.abutalib851@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  <span>পাসওয়ার্ড (Password)</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  (ডেমো মোডে যেকোনো পাসওয়ার্ড প্রযোজ্য)
                </span>
              </div>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>ড্যাশবোর্ডে লগইন করুন</span>
            </button>

            {/* Hint for existing accounts */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                অথবা তাৎক্ষণিক বিদ্যমান ইউজার সিলেক্ট করুন:
              </span>
              <div className="space-y-1.5">
                {users.slice(0, 3).map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setLoginEmail(u.email);
                      login(u.email);
                    }}
                    className="w-full p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 flex items-center justify-between text-left transition-colors"
                  >
                    <div>
                      <div className="text-white font-medium flex items-center gap-1.5">
                        <span>{u.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 font-mono uppercase">
                          {u.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{u.email}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {u.allowedTabs.length} টপিক
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* MODE 2: Sign Up / Register */}
        {activeMode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>পূর্ণ নাম (Full Name)</span>
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="उदा. Tanvir Ahmed"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>ইমেইল অ্যাড্রেস (Email)</span>
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="tanvir@clientbusiness.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>কোম্পানি / প্রতিষ্ঠান (Company)</span>
                </label>
                <input
                  type="text"
                  value={regCompany}
                  onChange={(e) => setRegCompany(e.target.value)}
                  placeholder="Apex Commerce Ltd"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">অ্যাকাউন্ট টাইপ / রোল</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as UserRole)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="client">ক্লায়েন্ট (Client Account)</option>
                  <option value="specialist">মার্কেটিং স্পেশালিস্ট (Specialist)</option>
                  <option value="manager">অপারেশন্স ম্যানেজার (Manager)</option>
                </select>
              </div>
            </div>

            {/* Quick Topic Presets */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>প্রয়োজনীয় টপিক এক্সেস পারমিশন সিলেক্ট করুন:</span>
                </label>
                <span className="text-[11px] font-mono text-cyan-400 font-bold">
                  {regAllowedTabs.length} Selected
                </span>
              </div>

              {/* Quick Presets Buttons */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleApplyPreset(['blueprint', 'cro'], 'client')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 transition-colors"
                >
                  🎯 Meta Blueprint + CRO Audit (রিকোয়েস্টেড)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(['blueprint'], 'client')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-950 text-blue-300 border border-blue-500/30 hover:bg-slate-800 transition-colors"
                >
                  শুধুমাত্র Meta Blueprint
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset(['cro'], 'client')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-950 text-emerald-300 border border-emerald-500/30 hover:bg-slate-800 transition-colors"
                >
                  শুধুমাত্র CRO Audit
                </button>
              </div>

              {/* Individual Topic Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 max-h-44 overflow-y-auto no-scrollbar border border-slate-800 rounded-xl p-2.5 bg-slate-950/60">
                {TOPIC_PERMISSIONS_CATALOG.map((topic) => {
                  const isChecked = regAllowedTabs.includes(topic.id);
                  return (
                    <label
                      key={topic.id}
                      className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer border transition-all ${
                        isChecked
                          ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                          : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleTab(topic.id)}
                        className="mt-0.5 rounded text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-slate-800 border-slate-700"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold block truncate text-[11px] text-white">
                          {topic.name}
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">
                          {topic.nameBn}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>রেজিস্ট্রেশন ও নির্ধারিত এক্সেস গ্রহণ করুন</span>
            </button>
          </form>
        )}

        {/* MODE 3: 1-Click Role Presets */}
        {activeMode === 'demo' && (
          <div className="space-y-3 text-xs">
            <p className="text-slate-400 text-[11px]">
              পরীক্ষা করার সুবিধার্থে নিচের যেকোনো রোল বা ক্লায়েন্ট প্রোফাইলে ১-ক্লিকে সুইচ করুন:
            </p>

            <div className="space-y-2.5">
              {ACCESS_PRESETS.map((preset) => {
                const userMatch = users.find(u => 
                  preset.id === 'preset_full_admin' ? u.role === 'admin' :
                  preset.id === 'preset_client_meta_cro' ? (u.role === 'client' && u.allowedTabs.includes('blueprint') && u.allowedTabs.includes('cro')) :
                  preset.id === 'preset_finance_officer' ? u.role === 'manager' : false
                );

                return (
                  <div
                    key={preset.id}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {preset.label}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${preset.badgeColor}`}>
                          {preset.tabs.length} টপিক
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {preset.description}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {preset.tabs.map(tab => (
                          <span key={tab} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                            {tab}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (userMatch) {
                          handleQuickSwitch(userMatch.id);
                        } else {
                          // Create on the fly
                          register({
                            name: preset.label,
                            email: `${preset.id}@aic-demo.com`,
                            role: preset.role,
                            allowedTabs: preset.tabs,
                          });
                        }
                      }}
                      className="px-3.5 py-2 rounded-lg font-bold bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
                    >
                      <span>সুইচ করুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
