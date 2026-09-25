import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRightLeft, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Tag, 
  Building2, 
  Wallet, 
  FileSpreadsheet, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Percent,
  Receipt
} from 'lucide-react';
import { 
  FinancialTransaction, 
  FinancialAccount, 
  BusinessEntity, 
  TransactionType 
} from '../../types';

interface IncomeExpenseViewProps {
  transactions: FinancialTransaction[];
  accounts: FinancialAccount[];
  businesses: BusinessEntity[];
  selectedBusinessId: string;
  onSelectBusinessId: (busId: string) => void;
  onOpenRecordIncome: () => void;
  onOpenRecordExpense: () => void;
  onOpenTransferModal: () => void;
  onDeleteTransaction: (id: string) => void;
  onOpenSettings?: () => void;
}

export const IncomeExpenseView: React.FC<IncomeExpenseViewProps> = ({
  transactions,
  accounts,
  businesses,
  selectedBusinessId,
  onSelectBusinessId,
  onOpenRecordIncome,
  onOpenRecordExpense,
  onOpenTransferModal,
  onDeleteTransaction,
  onOpenSettings
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    const matchesBus = selectedBusinessId === 'all' || tx.businessId === selectedBusinessId;
    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesCat = selectedCategory === 'all' || tx.category === selectedCategory;
    const matchesSearch = 
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.clientOrVendor && tx.clientOrVendor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.reference && tx.reference.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBus && matchesType && matchesCat && matchesSearch;
  });

  // Calculate totals for active business scope
  const activeScopeTransactions = transactions.filter(
    tx => selectedBusinessId === 'all' || tx.businessId === selectedBusinessId
  );

  const totalIncome = activeScopeTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = activeScopeTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netOperatingProfit = totalIncome - totalExpense;
  const marginPct = totalIncome > 0 ? Math.round((netOperatingProfit / totalIncome) * 100) : 0;

  // Categories list
  const uniqueCategories = Array.from(new Set(transactions.map(t => t.category)));

  // Download simple CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Type', 'Category', 'Amount', 'Currency', 'Business', 'Account', 'Client/Vendor', 'Reference', 'Description'];
    const rows = filteredTransactions.map(t => {
      const bus = businesses.find(b => b.id === t.businessId)?.name || t.businessId;
      const acc = accounts.find(a => a.id === t.accountId)?.name || t.accountId;
      return [
        t.id,
        t.date,
        t.type,
        t.category,
        t.amount,
        t.currency,
        `"${bus}"`,
        `"${acc}"`,
        `"${t.clientOrVendor || ''}"`,
        `"${t.reference || ''}"`,
        `"${t.description.replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Income_Expense_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      {/* KPI Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Income */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Gross Income</span>
            <div className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-2 block">
            +${totalIncome.toLocaleString()}
          </span>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Revenue Credits</span>
            <span className="text-emerald-400 font-medium">
              {activeScopeTransactions.filter(t => t.type === 'income').length} entries
            </span>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Operational Expenses</span>
            <div className="w-6 h-6 rounded-md bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ArrowDownRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-2xl font-bold font-mono text-rose-400 mt-2 block">
            -${totalExpense.toLocaleString()}
          </span>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Compute & Ad Spend</span>
            <span className="text-rose-400 font-medium">
              {activeScopeTransactions.filter(t => t.type === 'expense').length} entries
            </span>
          </div>
        </div>

        {/* Net Operating Profit */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Net Operating Profit</span>
            <div className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className={`text-2xl font-bold font-mono mt-2 block ${netOperatingProfit >= 0 ? 'text-white' : 'text-rose-400'}`}>
            ${netOperatingProfit.toLocaleString()}
          </span>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>Cash Flow Retention</span>
            <span className={netOperatingProfit >= 0 ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
              {netOperatingProfit >= 0 ? 'Positive Margin' : 'Deficit'}
            </span>
          </div>
        </div>

        {/* Profit Margin % */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Net Profit Margin</span>
            <div className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Percent className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-2xl font-bold font-mono text-cyan-400 mt-2 block">
            {marginPct}%
          </span>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span>High-Margin AI Model</span>
            <span className="text-cyan-300 font-mono text-[10px]">Benchmark: &gt;50%</span>
          </div>
        </div>

      </div>

      {/* Prominent Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300 hidden sm:inline-block mr-1">
            Fast Finance Actions:
          </span>
          
          {/* Record Income Button */}
          <button
            onClick={onOpenRecordIncome}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-950/60 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            id="billing-record-income-btn"
          >
            <ArrowUpRight className="w-4 h-4 text-emerald-200" />
            <span>+ Record Income</span>
          </button>

          {/* Record Expense Button */}
          <button
            onClick={onOpenRecordExpense}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md shadow-rose-950/60 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            id="billing-record-expense-btn"
          >
            <ArrowDownRight className="w-4 h-4 text-rose-200" />
            <span>- Record Expense</span>
          </button>

          {/* Transfer Funds */}
          <button
            onClick={onOpenTransferModal}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Transfer between multiple accounts"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Transfer</span>
          </button>

          {/* Manage Categories Shortcut */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Customize and add new ledger categories"
            >
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline">Categories</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Business Entity Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <select
              value={selectedBusinessId}
              onChange={(e) => onSelectBusinessId(e.target.value)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-slate-900">All Businesses</option>
              {businesses.map(b => (
                <option key={b.id} value={b.id} className="bg-slate-900">{b.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Export Income & Expense Ledger to CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Ledger Table & Filters */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
        
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search ledger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Type Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              {[
                { id: 'all', label: 'All Types' },
                { id: 'income', label: 'Income' },
                { id: 'expense', label: 'Expense' },
                { id: 'transfer', label: 'Transfers' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    selectedType === t.id
                      ? t.id === 'income' ? 'bg-emerald-600 text-white' : t.id === 'expense' ? 'bg-rose-600 text-white' : 'bg-cyan-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-400 self-end md:self-auto font-mono">
            {filteredTransactions.length} transactions
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Client / Vendor</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Account & Entity</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-slate-300">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No transactions matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(tx => {
                  const targetAcc = accounts.find(a => a.id === tx.accountId);
                  const targetBus = businesses.find(b => b.id === tx.businessId);

                  return (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                        {tx.date}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          tx.type === 'income'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : tx.type === 'expense'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}>
                          {tx.type === 'income' ? (
                            <><ArrowUpRight className="w-3 h-3" /> Income</>
                          ) : tx.type === 'expense' ? (
                            <><ArrowDownRight className="w-3 h-3" /> Expense</>
                          ) : (
                            <><ArrowRightLeft className="w-3 h-3" /> Transfer</>
                          )}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-100 max-w-[240px] truncate" title={tx.description}>
                          {tx.description}
                        </div>
                        {tx.reference && (
                          <span className="text-[10px] text-slate-500 font-mono block">
                            Ref: {tx.reference}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                        {tx.clientOrVendor || '—'}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {tx.category}
                        </span>
                        {tx.taxDeductible && (
                          <span className="ml-1 text-[9px] font-mono text-emerald-400" title="Tax Deductible Expense">
                            [TAX-DED]
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-[11px] font-medium text-slate-200">
                          {targetAcc?.name || 'Account'}
                        </div>
                        <span className="text-[10px] text-cyan-400/80 font-mono">
                          {targetBus?.code || 'AIC'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <span className={`font-mono font-bold text-sm ${
                          tx.type === 'income'
                            ? 'text-emerald-400'
                            : tx.type === 'expense'
                            ? 'text-rose-400'
                            : 'text-indigo-400'
                        }`}>
                          {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}${tx.amount.toLocaleString()}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => onDeleteTransaction(tx.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete transaction entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
