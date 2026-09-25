import React, { useState } from 'react';
import { X, PackagePlus, PackageMinus, RefreshCw, DollarSign, Wallet, CheckCircle2, AlertCircle } from 'lucide-react';
import { InventoryProduct, FinancialAccount } from '../../types';

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: InventoryProduct | null;
  accounts: FinancialAccount[];
  onApplyAdjustment: (
    productId: string,
    action: 'sale' | 'stock_in' | 'adjustment',
    quantity: number,
    notes: string,
    syncWithFinance: boolean,
    targetAccountId?: string
  ) => void;
}

export const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({
  isOpen,
  onClose,
  product,
  accounts,
  onApplyAdjustment
}) => {
  const [action, setAction] = useState<'sale' | 'stock_in' | 'adjustment'>('sale');
  const [quantity, setQuantity] = useState<string>('1');
  const [notes, setNotes] = useState<string>('');
  const [syncWithFinance, setSyncWithFinance] = useState<boolean>(true);
  const [targetAccountId, setTargetAccountId] = useState<string>(accounts[0]?.id || '');

  if (!isOpen || !product) return null;

  const numQty = parseInt(quantity) || 0;
  const targetAcc = accounts.find(a => a.id === targetAccountId) || accounts[0];

  const resultingStock = action === 'sale' 
    ? product.stockQty - numQty 
    : action === 'stock_in' 
    ? product.stockQty + numQty 
    : numQty;

  const financialImpact = action === 'sale'
    ? numQty * product.sellingPrice
    : action === 'stock_in'
    ? numQty * product.unitCost
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numQty <= 0) return;
    if (action === 'sale' && numQty > product.stockQty) return;

    onApplyAdjustment(
      product.id,
      action,
      numQty,
      notes.trim() || `${action === 'sale' ? 'Sale fulfilled' : action === 'stock_in' ? 'Shipment received' : 'Manual audit'} (${product.sku})`,
      syncWithFinance,
      targetAccountId
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Adjust Inventory Stock</span>
            </h3>
            <p className="text-[11px] text-cyan-400 font-mono mt-0.5">
              {product.sku} • {product.name}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Stock Banner */}
        <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Current On-Hand</span>
            <span className="text-lg font-bold font-mono text-white">{product.stockQty} units</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Unit Retail Price</span>
            <span className="text-emerald-400 font-mono font-bold">${product.sellingPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Toggle */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAction('sale')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              action === 'sale' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PackageMinus className="w-3.5 h-3.5" />
            <span>Record Sale</span>
          </button>

          <button
            type="button"
            onClick={() => setAction('stock_in')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              action === 'stock_in' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PackagePlus className="w-3.5 h-3.5" />
            <span>+ Restock</span>
          </button>

          <button
            type="button"
            onClick={() => setAction('adjustment')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              action === 'adjustment' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Audit Set</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              {action === 'adjustment' ? 'Set New Absolute Quantity' : 'Quantity of Units *'}
            </label>
            <input
              type="number"
              min="1"
              required
              autoFocus
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
            />
            {action === 'sale' && numQty > product.stockQty && (
              <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Cannot sell more than currently available stock ({product.stockQty}).
              </p>
            )}
          </div>

          {/* Resulting Stock Preview */}
          <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
            <span>New Stock After Action:</span>
            <span className={`font-mono font-bold ${resultingStock <= product.reorderPoint ? 'text-amber-400' : 'text-emerald-400'}`}>
              {resultingStock} units
            </span>
          </div>

          {/* Sync With Accounts Box */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="syncFinanceCheck"
                checked={syncWithFinance}
                onChange={(e) => setSyncWithFinance(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-cyan-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="syncFinanceCheck" className="text-slate-200 text-xs font-semibold cursor-pointer select-none">
                {action === 'sale' ? 'Auto-deposit sale revenue into Accounts' : action === 'stock_in' ? 'Auto-debit inventory cost from Accounts' : 'Sync ledger transaction'}
              </label>
            </div>

            {syncWithFinance && (
              <div className="pt-2 border-t border-slate-800/70 space-y-2 animate-in fade-in duration-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Financial Impact:</span>
                  <span className={`font-mono font-bold ${action === 'sale' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {action === 'sale' ? `+$${financialImpact.toLocaleString()} (Income)` : `-$${financialImpact.toLocaleString()} (Expense)`}
                  </span>
                </div>

                <div>
                  <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Target Account</label>
                  <select
                    value={targetAccountId}
                    onChange={(e) => setTargetAccountId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-[11px] focus:outline-none focus:border-cyan-500"
                  >
                    {accounts.map(acc => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name} ({acc.accountNumberMasked}) • ${acc.balance.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Reason / Order Reference</label>
            <input
              type="text"
              placeholder="e.g. Order #4481, Client Lab rollout, Warehouse delivery"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
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
              disabled={action === 'sale' && numQty > product.stockQty}
              className={`px-4 py-1.5 rounded-xl text-white font-semibold transition-all shadow-md ${
                action === 'sale'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950'
                  : action === 'stock_in'
                  ? 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-950'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-950'
              }`}
            >
              Confirm Adjustment
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
