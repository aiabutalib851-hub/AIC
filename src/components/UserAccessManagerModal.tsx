import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  Lock, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  Edit3, 
  Building2, 
  Mail, 
  Eye, 
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DashboardTab, UserRole, AppUser } from '../types';
import { 
  TOPIC_PERMISSIONS_CATALOG, 
  ACCESS_PRESETS, 
  ALL_DASHBOARD_TABS 
} from '../data/topicPermissions';

export const UserAccessManagerModal: React.FC = () => {
  const { 
    userAccessModalOpen, 
    setUserAccessModalOpen, 
    users, 
    currentUser, 
    updateUserPermissions, 
    addNewUser, 
    deleteUser, 
    switchUser 
  } = useAuth();

  const [selectedUser, setSelectedUser] = useState<AppUser | null>(() => users[0] || null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserCompany, setNewUserCompany] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('client');
  const [newUserTabs, setNewUserTabs] = useState<DashboardTab[]>(['blueprint', 'cro']);
  const [formError, setFormError] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  if (!userAccessModalOpen) return null;

  const currentEditingUser = selectedUser || users[0];

  const handleToggleTopicForSelected = (tabId: DashboardTab) => {
    if (!currentEditingUser) return;
    const currentTabs = currentEditingUser.allowedTabs;
    const nextTabs = currentTabs.includes(tabId)
      ? currentTabs.filter(t => t !== tabId)
      : [...currentTabs, tabId];

    updateUserPermissions(currentEditingUser.id, nextTabs);
    setSelectedUser(prev => prev ? { ...prev, allowedTabs: nextTabs } : null);

    setSavedNotice(`টপিক পারমিশন আপডেট হয়েছে (${currentEditingUser.name})`);
    setTimeout(() => setSavedNotice(null), 2000);
  };

  const handleApplyPresetToSelected = (tabs: DashboardTab[], role?: UserRole) => {
    if (!currentEditingUser) return;
    updateUserPermissions(currentEditingUser.id, tabs, role);
    setSelectedUser(prev => prev ? { ...prev, allowedTabs: tabs, role: role || prev.role } : null);

    setSavedNotice(`প্রিসেট পারমিশন সফলভাবে কার্যকর করা হয়েছে!`);
    setTimeout(() => setSavedNotice(null), 2000);
  };

  const handleCreateNewUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newUserName.trim() || !newUserEmail.trim()) {
      setFormError('নাম এবং ইমেইল অ্যাড্রেস দেওয়া আবশ্যক।');
      return;
    }

    if (newUserTabs.length === 0) {
      setFormError('কমপক্ষে একটি টপিকের এক্সেস সিলেক্ট করুন।');
      return;
    }

    addNewUser({
      name: newUserName.trim(),
      email: newUserEmail.trim().toLowerCase(),
      company: newUserCompany.trim() || 'Client Business',
      role: newUserRole,
      allowedTabs: newUserTabs,
      notes: 'Admin-provisioned account with custom topic authorization.',
    });

    setShowAddUserForm(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserCompany('');
    setSavedNotice('নতুন ক্লায়েন্ট / ইউজার সফলভাবে তৈরি হয়েছে!');
    setTimeout(() => setSavedNotice(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                AIC টপিক সিকিউরিটি ও এক্সেস কন্ট্রোল ম্যানেজার
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 uppercase">
                  Admin Master
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                নির্দিষ্ট ক্লায়েন্টকে নির্দিষ্ট টপিকের (যেমন: Meta Blueprint বা CRO Audit) এক্সেস প্রদান ও নিয়ন্ত্রণ করুন
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setUserAccessModalOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback notice */}
        {savedNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">নিবন্ধিত ইউজার:</span>
            <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-cyan-400">
              {users.length} টি অ্যাকাউন্ট
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowAddUserForm(!showAddUserForm)}
            className="px-3 py-1.5 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddUserForm ? 'ফর্ম বন্ধ করুন' : 'নতুন ক্লায়েন্ট / ইউজার যুক্ত করুন'}</span>
          </button>
        </div>

        {/* Add User Form Drawer */}
        {showAddUserForm && (
          <form onSubmit={handleCreateNewUserSubmit} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs animate-in fade-in duration-150">
            <div className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800/80 pb-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>নতুন ক্লায়েন্ট / ইউজার তৈরি ও টপিক অনুমোদন</span>
            </div>

            {formError && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">পূর্ণ নাম</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="उदा. Hasan E-Com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">ইমেইল অ্যাড্রেস</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="hasan@ecombd.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">প্রতিষ্ঠান / ব্র্যান্ড</label>
                <input
                  type="text"
                  value={newUserCompany}
                  onChange={(e) => setNewUserCompany(e.target.value)}
                  placeholder="Hasan Fashion"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            {/* Quick preset for new user */}
            <div>
              <label className="text-slate-300 block mb-1.5 font-semibold">অনুমোদিত টপিক নির্বাচন:</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <button
                  type="button"
                  onClick={() => setNewUserTabs(['blueprint', 'cro'])}
                  className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold"
                >
                  🎯 Meta Blueprint + CRO Audit (ডিফল্ট)
                </button>
                <button
                  type="button"
                  onClick={() => setNewUserTabs(['blueprint'])}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-blue-300 text-[11px]"
                >
                  শুধুমাত্র Meta Blueprint
                </button>
                <button
                  type="button"
                  onClick={() => setNewUserTabs(['cro'])}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-300 text-[11px]"
                >
                  শুধুমাত্র CRO Audit
                </button>
                <button
                  type="button"
                  onClick={() => setNewUserTabs(ALL_DASHBOARD_TABS)}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-purple-300 text-[11px]"
                >
                  সব ১০টি টপিক
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TOPIC_PERMISSIONS_CATALOG.map((t) => (
                  <label
                    key={t.id}
                    className={`p-2 rounded-lg border text-[11px] cursor-pointer flex items-center gap-2 ${
                      newUserTabs.includes(t.id)
                        ? 'bg-cyan-950/40 border-cyan-500 text-white font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={newUserTabs.includes(t.id)}
                      onChange={() => {
                        setNewUserTabs(prev => 
                          prev.includes(t.id) ? prev.filter(x => x !== t.id) : [...prev, t.id]
                        );
                      }}
                      className="rounded text-cyan-500"
                    />
                    <span className="truncate">{t.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={() => setShowAddUserForm(false)}
                className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
              >
                ব্যবহারকারী সেভ করুন
              </button>
            </div>
          </form>
        )}

        {/* Main 2-Column Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          {/* Left: Users Directory */}
          <div className="space-y-2 border-r border-slate-800/80 pr-0 md:pr-4">
            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
              ব্যবহারকারী তালিকা (Select User)
            </span>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto no-scrollbar">
              {users.map((u) => {
                const isSelected = currentEditingUser?.id === u.id;
                const isSelf = currentUser?.id === u.id;

                return (
                  <div
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500/80 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{u.name}</span>
                        {isSelf && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded font-bold ${
                        u.role === 'admin' ? 'bg-purple-500/20 text-purple-300' :
                        u.role === 'client' ? 'bg-cyan-500/20 text-cyan-300' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {u.role}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {u.email}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px]">
                      <span className="text-slate-500 truncate">{u.company || 'Direct'}</span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        {u.allowedTabs.length} টপিক আনলক
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Permission Configurator for Selected User */}
          <div className="md:col-span-2 space-y-4">
            {currentEditingUser ? (
              <div className="space-y-4">
                {/* Active User Header */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{currentEditingUser.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-mono uppercase">
                        {currentEditingUser.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {currentEditingUser.email} • {currentEditingUser.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => switchUser(currentEditingUser.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors"
                      title="এই ইউজারের দৃষ্টিতে ড্যাশবোর্ড কেমন দেখায় তা পরীক্ষা করুন"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ভিউ টেস্ট করুন</span>
                    </button>

                    {currentEditingUser.role !== 'admin' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`আপনি কি সত্যিই ${currentEditingUser.name} অ্যাকাউন্ট মুছে ফেলতে চান?`)) {
                            deleteUser(currentEditingUser.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                        title="ইউজার ডিলিট করুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Presets row */}
                <div className="space-y-1.5">
                  <span className="font-semibold text-slate-300 block text-[11px]">
                    ১-ক্লিক পারমিশন প্রিসেট (Quick Presets):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleApplyPresetToSelected(['blueprint', 'cro'], 'client')}
                      className="px-3 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/50 hover:bg-cyan-900 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>🎯 Meta Blueprint + CRO Audit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetToSelected(['blueprint'], 'client')}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-blue-500/40 hover:bg-slate-800 text-blue-300 font-medium text-xs transition-colors"
                    >
                      <span>শুধুমাত্র Meta Blueprint</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetToSelected(['cro'], 'client')}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/40 hover:bg-slate-800 text-emerald-300 font-medium text-xs transition-colors"
                    >
                      <span>শুধুমাত্র CRO Audit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPresetToSelected(ALL_DASHBOARD_TABS, 'admin')}
                      className="px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/50 hover:bg-purple-900 text-purple-300 font-bold text-xs transition-colors"
                    >
                      <span>👑 Full Admin (All 10 Topics)</span>
                    </button>
                  </div>
                </div>

                {/* Topic Permissions Interactive Grid */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300 text-[11px] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>টপিক এক্সেস পারমিশন চেকলিস্ট:</span>
                    </span>
                    <span className="font-mono text-cyan-400 text-[11px] font-bold">
                      {currentEditingUser.allowedTabs.length} / 10 Active Topics
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto no-scrollbar">
                    {TOPIC_PERMISSIONS_CATALOG.map((topic) => {
                      const isPermitted = currentEditingUser.allowedTabs.includes(topic.id);

                      return (
                        <div
                          key={topic.id}
                          onClick={() => handleToggleTopicForSelected(topic.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                            isPermitted
                              ? 'bg-slate-950 border-emerald-500/70 shadow-sm'
                              : 'bg-slate-950/40 border-slate-800 text-slate-500 hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            isPermitted
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'border-slate-700 bg-slate-900'
                          }`}>
                            {isPermitted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className={`font-bold text-xs ${isPermitted ? 'text-white' : 'text-slate-400'}`}>
                                {topic.name}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                                {topic.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                              {topic.nameBn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center text-slate-500">
                বাম পাশের তালিকা থেকে ইউজার নির্বাচন করুন
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
