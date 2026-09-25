import React, { useState } from 'react';
import { 
  Building2, 
  Wallet, 
  CreditCard, 
  Landmark, 
  ArrowRightLeft, 
  Plus, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { FinancialAccount, BusinessEntity, FinancialTransaction } from '../../types';

interface AccountsManagementViewProps {
  accounts: FinancialAccount[];
  businesses: BusinessEntity[];
  transactions: FinancialTransaction[];
  selectedBusinessId: string;
  onSelectBusinessId: (busId: string) => void;
  onOpenTransferModal: () => void;
  onOpenRecordIncome: () => void;
  onOpenRecordExpense: () => void;
  onOpenSettings?: (tab?: 'businesses' | 'categories' | 'invoice_defaults' | 'payment_methods') => void;
}

export const AccountsManagementView: React.FC<AccountsManagementViewProps> = ({
  accounts,
  businesses,
  transactions,
  selectedBusinessId,
  onSelectBusinessId,
  onOpenTransferModal,
  onOpenRecordIncome,
  onOpenRecordExpense,
  onOpenSettings
}) => {
  const [activeAccountFilter, setActiveAccountFilter] = useState<'all' | 'bank' | 'wallet' | 'gateway' | 'card'>('all');

  const filteredAccounts = accounts.filter(acc => {
    const matchesBus = selectedBusinessId === 'all' || acc.businessId === selectedBusinessId;
    const matchesType = activeAccountFilter === 'all' || acc.type === activeAccountFilter;
    return matchesBus && matchesType;
  });

  const totalLiquidity = accounts
    .filter(a => selectedBusinessId === 'all' || a.businessId === selectedBusinessId)
    .reduce((sum, a) => sum + (a.type === 'card' ? 0 : a.balance), 0);

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'bank': return <Landmark className="w-5 h-5 text-cyan-400" />;
      case 'wallet': return <Wallet className="w-5 h-5 text-emerald-400" />;
      case 'gateway': return <ExternalLink className="w-5 h-5 text-indigo-400" />;
      case 'card': return <CreditCard className="w-5 h-5 text-amber-400" />;
      default: return <Wallet className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">

      {/* Top Banner & Treasury Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-slate-400 font-medium block">Total Liquid Capital Across Accounts</span>
          <span className="text-2xl font-bold font-mono text-white mt-1.5 block">
            ${totalLiquidity.toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Multi-Account Real-Time Reconciliation</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <span className="text-xs text-slate-400 font-medium block">Connected Business Entities</span>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-bold text-cyan-400 font-mono">
              {businesses.length}
            </span>
            <div className="flex -space-x-1.5 overflow-hidden">
              {businesses.map((b, i) => (
                <div 
                  key={b.id} 
                  title={b.name}
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${b.color} border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
                >
                  {b.code[0]}
                </div>
              ))}
            </div>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            AIC Enterprise • Abrar Academy • Digital Commerce
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Fast Inter-Account Treasury</span>
            <p className="text-xs text-slate-300 mt-1">
              Transfer funds between SVB, Wise, Stripe & bKash wallets instantly.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={onOpenTransferModal}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-950"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Transfer Funds</span>
            </button>
            <button
              onClick={onOpenRecordIncome}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-medium text-xs flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Balance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Business Entities Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Multiple Business Profiles & Entities ({businesses.length})</span>
            </h2>
            <span className="text-xs text-slate-400">
              Click entity to filter all accounts & transactions
            </span>
          </div>

          {onOpenSettings && (
            <button
              onClick={() => onOpenSettings('businesses')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              title="Add business name, legal entity, tax ID, or customize existing businesses"
              id="manage-businesses-btn"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>+ Add / Manage Business Names</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* All Businesses Card */}
          <button
            type="button"
            onClick={() => onSelectBusinessId('all')}
            className={`text-left p-4 rounded-xl border transition-all ${
              selectedBusinessId === 'all'
                ? 'bg-slate-850 border-cyan-500 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Consolidated View</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                ALL ENTITIES
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Unified treasury view across all operating companies & merchant accounts
            </p>
            <div className="mt-3 text-xs font-mono text-cyan-400 font-bold">
              ${totalLiquidity.toLocaleString()} Global Net
            </div>
          </button>

          {businesses.map(b => {
            const busAccounts = accounts.filter(a => a.businessId === b.id);
            const busTotal = busAccounts.reduce((sum, a) => sum + (a.type === 'card' ? 0 : a.balance), 0);
            const isSelected = selectedBusinessId === b.id;

            return (
              <button
                key={b.id}
                type="button"
                onClick={() => onSelectBusinessId(b.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-850 border-cyan-500 shadow-md shadow-cyan-950/40'
                    : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${b.color} flex items-center justify-center text-[10px] font-bold text-white`}>
                      {b.code}
                    </div>
                    <span className="text-xs font-bold text-white truncate max-w-[130px]">{b.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {b.currency}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {b.tagline}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-bold">
                    ${busTotal.toLocaleString()}
                  </span>
                  <span className="text-slate-500 text-[10px]">
                    {busAccounts.length} accounts
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Multiple Accounts Grid */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Landmark className="w-4 h-4 text-cyan-400" />
              <span>Multi-Account Ledger & Balance Vault</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Operating checking accounts, multi-currency wire channels & payment gateways
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              {(['all', 'bank', 'wallet', 'gateway', 'card'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setActiveAccountFilter(f)}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                    activeAccountFilter === f ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={onOpenTransferModal}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span>Transfer</span>
            </button>
          </div>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAccounts.map(acc => {
            const ownerBus = businesses.find(b => b.id === acc.businessId);
            return (
              <div
                key={acc.id}
                className="bg-slate-950/70 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      {getAccountIcon(acc.type)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {acc.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 block font-mono">
                        {acc.institution} • {acc.accountNumberMasked}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    acc.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {acc.status.toUpperCase()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      {acc.type === 'card' ? 'Credit Balance' : 'Settled Balance'}
                    </span>
                    <span className="text-xl font-bold font-mono text-white">
                      ${acc.balance.toLocaleString()}
                    </span>
                  </div>
                  {ownerBus && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700">
                      {ownerBus.code}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Reconciled: {acc.lastReconciled}</span>
                  <button
                    onClick={onOpenTransferModal}
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                  >
                    <span>Send / Transfer</span>
                    <ArrowRightLeft className="w-2.5 h-2.5" />
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
