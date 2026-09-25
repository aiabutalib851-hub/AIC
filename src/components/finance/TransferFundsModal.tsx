import React, { useState } from 'react';
import { X, ArrowRightLeft, Building2, Wallet, Calendar, AlertCircle } from 'lucide-react';
import { FinancialAccount, BusinessEntity } from '../../types';

interface TransferFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: FinancialAccount[];
  businesses: BusinessEntity[];
  onTransfer: (fromAccountId: string, toAccountId: string, amount: number, fee: number, note: string) => void;
}

export const TransferFundsModal: React.FC<TransferFundsModalProps> = ({
  isOpen,
  onClose,
  accounts,
  businesses,
  onTransfer
}) => {
  const [fromAccountId, setFromAccountId] = useState<string>(accounts[0]?.id || '');
  const [toAccountId, setToAccountId] = useState<string>(accounts[1]?.id || '');
  const [amount, setAmount] = useState<string>('');
  const [fee, setFee] = useState<string>('0');
  const [note, setNote] = useState<string>('Treasury & operational working capital rebalance');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  const sourceAccount = accounts.find(a => a.id === fromAccountId);
  const destAccount = accounts.find(a => a.id === toAccountId);

  const numAmount = parseFloat(amount) || 0;
  const numFee = parseFloat(fee) || 0;
  const isExceeding = sourceAccount ? (numAmount + numFee) > sourceAccount.balance : false;
  const isSameAccount = fromAccountId === toAccountId;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numAmount <= 0 || isSameAccount || isExceeding) return;

    onTransfer(fromAccountId, toAccountId, numAmount, numFee, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Transfer Between Accounts</h3>
              <p className="text-[11px] text-slate-400">Inter-account & cross-business liquidity sweep</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Source Account */}
          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
              <span>Source Account (From)</span>
              {sourceAccount && (
                <span className="text-slate-400 font-mono text-[11px]">
                  Available: ${sourceAccount.balance.toLocaleString()}
                </span>
              )}
            </label>
            <select
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} ({acc.accountNumberMasked}) • ${acc.balance.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Account */}
          <div>
            <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
              <span>Destination Account (To)</span>
              {destAccount && (
                <span className="text-slate-400 font-mono text-[11px]">
                  Current: ${destAccount.balance.toLocaleString()}
                </span>
              )}
            </label>
            <select
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id} disabled={acc.id === fromAccountId}>
                  {acc.name} ({acc.accountNumberMasked}) • ${acc.balance.toLocaleString()}
                </option>
              ))}
            </select>
            {isSameAccount && (
              <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Source and destination accounts cannot be identical.
              </p>
            )}
          </div>

          {/* Amount and Fee */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Transfer Amount ($ USD)</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Wire / Gateway Fee ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {isExceeding && (
            <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Insufficient funds in source account ({sourceAccount?.name}).</span>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-medium mb-1">Transfer Memo / Notes</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isExceeding || isSameAccount || numAmount <= 0}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold transition-all shadow-md shadow-indigo-950"
            >
              Execute Transfer
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
