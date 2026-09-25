import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building2, 
  Wallet, 
  Calendar, 
  Tag, 
  Check, 
  Receipt,
  FileText
} from 'lucide-react';
import { 
  FinancialTransaction, 
  FinancialAccount, 
  BusinessEntity, 
  TransactionType,
  IncomeCategory,
  ExpenseCategory
} from '../../types';

interface RecordTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: FinancialAccount[];
  businesses: BusinessEntity[];
  initialType?: 'income' | 'expense';
  incomeCategories?: string[];
  expenseCategories?: string[];
  onAddNewCategory?: (type: 'income' | 'expense', newCategory: string) => void;
  onSave: (tx: Omit<FinancialTransaction, 'id'>) => void;
}

const DEFAULT_INCOME_CATEGORIES: string[] = [
  'Client Retainer',
  'AI Agent Setup Fee',
  'Consulting & Strategy',
  'Course & Academy Sales',
  'Product / E-Commerce Sales',
  'Affiliate / Referral',
  'Other Revenue'
];

const DEFAULT_EXPENSE_CATEGORIES: string[] = [
  'Cloud & AI Token API',
  'Ad Spend (Meta/Google)',
  'Software & SaaS Tools',
  'Payroll & Contractor',
  'Hardware & Office',
  'Inventory Purchase',
  'Payment Gateway Fees',
  'Marketing & Production',
  'Legal & Compliance',
  'Miscellaneous'
];

export const RecordTransactionModal: React.FC<RecordTransactionModalProps> = ({
  isOpen,
  onClose,
  accounts,
  businesses,
  initialType = 'income',
  incomeCategories = DEFAULT_INCOME_CATEGORIES,
  expenseCategories = DEFAULT_EXPENSE_CATEGORIES,
  onAddNewCategory,
  onSave
}) => {
  const [type, setType] = useState<TransactionType>(initialType);
  const [businessId, setBusinessId] = useState<string>(businesses[0]?.id || 'bus-aic');
  const [accountId, setAccountId] = useState<string>(accounts[0]?.id || 'acc-svb');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>(
    initialType === 'income' ? incomeCategories[0] || 'Client Retainer' : expenseCategories[0] || 'Cloud & AI Token API'
  );
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState<string>('');
  const [clientOrVendor, setClientOrVendor] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [taxDeductible, setTaxDeductible] = useState<boolean>(type === 'expense');

  // Inline custom category creation state
  const [isAddingCustomCategory, setIsAddingCustomCategory] = useState<boolean>(false);
  const [customCategoryInput, setCustomCategoryInput] = useState<string>('');

  if (!isOpen) return null;

  const currentCategories = type === 'income' ? incomeCategories : expenseCategories;

  const handleTypeSwitch = (newType: TransactionType) => {
    setType(newType);
    setIsAddingCustomCategory(false);
    if (newType === 'income') {
      setCategory(incomeCategories[0] || 'Client Retainer');
      setTaxDeductible(false);
    } else {
      setCategory(expenseCategories[0] || 'Cloud & AI Token API');
      setTaxDeductible(true);
    }
  };

  const handleCreateCustomCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = customCategoryInput.trim();
    if (!trimmed) return;

    if (onAddNewCategory) {
      onAddNewCategory(type === 'income' ? 'income' : 'expense', trimmed);
    }
    setCategory(trimmed);
    setCustomCategoryInput('');
    setIsAddingCustomCategory(false);
  };

  const filteredAccounts = accounts.filter(
    a => businessId === 'all' || a.businessId === businessId || a.businessId === 'all'
  );
  const currentAccount = accounts.find(a => a.id === accountId) || accounts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    onSave({
      businessId,
      accountId,
      type,
      category: category as any,
      amount: numAmount,
      currency: 'USD',
      currencySymbol: '$',
      date,
      description: description.trim() || `${type === 'income' ? 'Received' : 'Paid'} ${category}`,
      reference: reference.trim() || undefined,
      clientOrVendor: clientOrVendor.trim() || undefined,
      status: 'cleared',
      taxDeductible: type === 'expense' ? taxDeductible : false,
      tags: [category, businesses.find(b => b.id === businessId)?.code || 'AIC']
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              type === 'income' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {type === 'income' ? 'Record New Income' : 'Record Business Expense'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Log cash movement into financial ledger & update account balances
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Toggle Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleTypeSwitch('income')}
            className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
              type === 'income'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>+ Income (Credit)</span>
          </button>
          <button
            type="button"
            onClick={() => handleTypeSwitch('expense')}
            className={`py-2 rounded-lg flex items-center justify-center gap-2 transition-all ${
              type === 'expense'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>- Expense (Debit)</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Amount and Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Amount ($ USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  step="0.01"
                  required
                  autoFocus
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-slate-100 font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Transaction Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Business & Account Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" /> Business Entity *
              </label>
              <select
                value={businessId}
                onChange={(e) => {
                  setBusinessId(e.target.value);
                  const relatedAcc = accounts.find(a => a.businessId === e.target.value);
                  if (relatedAcc) setAccountId(relatedAcc.id);
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {businesses.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-emerald-400" /> Target Account *
              </label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {filteredAccounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} ({acc.accountNumberMasked}) • ${acc.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category with Inline Add Capability */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-300 font-medium flex items-center gap-1.5 text-xs">
                <Tag className="w-3.5 h-3.5 text-indigo-400" /> Category *
              </label>
              <button
                type="button"
                onClick={() => setIsAddingCustomCategory(!isAddingCustomCategory)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                {isAddingCustomCategory ? 'Cancel' : '+ Add New Category'}
              </button>
            </div>

            {isAddingCustomCategory ? (
              <div className="flex items-center gap-2 p-2 bg-slate-950/80 border border-cyan-500/40 rounded-lg">
                <input
                  type="text"
                  autoFocus
                  placeholder={`New ${type} category name...`}
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCreateCustomCategory();
                    }
                  }}
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleCreateCustomCategory()}
                  disabled={!customCategoryInput.trim()}
                  className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded text-xs font-semibold transition-colors"
                >
                  Save & Select
                </button>
              </div>
            ) : (
              <select
                value={category}
                onChange={(e) => {
                  if (e.target.value === '__add_new__') {
                    setIsAddingCustomCategory(true);
                  } else {
                    setCategory(e.target.value);
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
              >
                {currentCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="__add_new__" className="text-cyan-400 font-semibold">
                  + Add New Custom Category...
                </option>
              </select>
            )}
          </div>

          {/* Description & Payer/Payee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                {type === 'income' ? 'Client / Payer' : 'Vendor / Payee'}
              </label>
              <input
                type="text"
                placeholder={type === 'income' ? 'e.g. Nexus Healthtech' : 'e.g. OpenAI / Meta Ads'}
                value={clientOrVendor}
                onChange={(e) => setClientOrVendor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Reference / Invoice #
              </label>
              <input
                type="text"
                placeholder="e.g. AIC-INV-2024-99, Stripe #441"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Description / Notes
            </label>
            <input
              type="text"
              placeholder="Brief summary of transaction..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Tax Deductible Toggle for Expense */}
          {type === 'expense' && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="taxDeductibleCheck"
                checked={taxDeductible}
                onChange={(e) => setTaxDeductible(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="taxDeductibleCheck" className="text-slate-300 text-[11px] cursor-pointer select-none">
                Mark as tax-deductible operational business expense
              </label>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end items-center gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-xl text-white font-semibold transition-all shadow-md ${
                type === 'income'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/50'
                  : 'bg-rose-600 hover:bg-rose-500 shadow-rose-950/50'
              }`}
            >
              {type === 'income' ? '+ Record Income' : '- Record Expense'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
