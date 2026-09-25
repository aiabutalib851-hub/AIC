import React, { useState } from 'react';
import { X, Package, Tag, Building2, Layers, DollarSign, Sparkles, Percent } from 'lucide-react';
import { InventoryProduct, InventoryCategory, BusinessEntity } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  businesses: BusinessEntity[];
  initialProduct?: InventoryProduct | null;
  categories?: string[];
  onAddNewCategory?: (category: string) => void;
  onSave: (product: Omit<InventoryProduct, 'id'>, id?: string) => void;
}

const DEFAULT_PRODUCT_CATEGORIES: string[] = [
  'AI Automation Toolkits',
  'Digital Courses & E-Books',
  'Meta Ads Template Packs',
  'Hardware / IoT Devices',
  'SaaS Licenses & Seat Passes',
  'Merchandise & Physical Goods'
];

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  businesses,
  initialProduct,
  categories = DEFAULT_PRODUCT_CATEGORIES,
  onAddNewCategory,
  onSave
}) => {
  const [name, setName] = useState(initialProduct?.name || '');
  const [sku, setSku] = useState(initialProduct?.sku || `AIC-SKU-${Math.floor(Math.random() * 8999) + 1000}`);
  const [businessId, setBusinessId] = useState(initialProduct?.businessId || businesses[0]?.id || 'bus-ecom');
  const [category, setCategory] = useState<string>(initialProduct?.category || categories[0] || DEFAULT_PRODUCT_CATEGORIES[0]);
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [stockQty, setStockQty] = useState(initialProduct ? String(initialProduct.stockQty) : '50');
  const [reorderPoint, setReorderPoint] = useState(initialProduct ? String(initialProduct.reorderPoint) : '10');
  const [unitCost, setUnitCost] = useState(initialProduct ? String(initialProduct.unitCost) : '25');
  const [sellingPrice, setSellingPrice] = useState(initialProduct ? String(initialProduct.sellingPrice) : '149');
  const [supplierOrPlatform, setSupplierOrPlatform] = useState(initialProduct?.supplierOrPlatform || 'AIC Labs Engineering');
  const [isDigital, setIsDigital] = useState(initialProduct ? initialProduct.isDigital ?? true : true);

  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [newCatInput, setNewCatInput] = useState<string>('');

  if (!isOpen) return null;

  const cost = parseFloat(unitCost) || 0;
  const price = parseFloat(sellingPrice) || 0;
  const marginPct = price > 0 ? Math.round(((price - cost) / price) * 100) : 0;
  const profitPerUnit = Math.max(0, price - cost);

  const handleGenerateSku = () => {
    const prefix = category.includes('AI') ? 'AIC-AI' : category.includes('Meta') ? 'AIC-MKT' : category.includes('Course') ? 'AIC-ACAD' : 'AIC-PROD';
    setSku(`${prefix}-${Math.floor(Math.random() * 899) + 100}`);
  };

  const handleCreateCustomCategory = () => {
    const trimmed = newCatInput.trim();
    if (!trimmed) return;
    if (onAddNewCategory) {
      onAddNewCategory(trimmed);
    }
    setCategory(trimmed);
    setNewCatInput('');
    setIsAddingCategory(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const qty = parseInt(stockQty) || 0;
    const reorder = parseInt(reorderPoint) || 5;

    let status: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
    if (qty <= 0) status = 'out_of_stock';
    else if (qty <= reorder) status = 'low_stock';

    onSave({
      businessId,
      sku: sku.trim().toUpperCase(),
      name: name.trim(),
      category,
      description: description.trim() || `${name} package for AI & growth deployment`,
      stockQty: qty,
      reorderPoint: reorder,
      unitCost: cost,
      sellingPrice: price,
      currency: 'USD',
      currencySymbol: '$',
      supplierOrPlatform: supplierOrPlatform.trim() || 'Internal AIC Team',
      status,
      totalSold: initialProduct ? initialProduct.totalSold : 0,
      lastRestocked: new Date().toISOString().split('T')[0],
      isDigital
    }, initialProduct?.id);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {initialProduct ? 'Edit Inventory Product' : 'Add New Inventory Product'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Track unit quantities, costs, retail prices & profit margins
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Product Name */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">Product Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Enterprise Customer Copilot Blueprint & Source Code"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* SKU and Business */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                <span>SKU Code *</span>
                <button
                  type="button"
                  onClick={handleGenerateSku}
                  className="text-cyan-400 hover:text-cyan-300 text-[10px] font-mono"
                >
                  Generate
                </button>
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Business Entity *</label>
              <select
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {businesses.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium text-xs">Category *</label>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(!isAddingCategory)}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {isAddingCategory ? 'Cancel' : '+ Add Category'}
                </button>
              </div>

              {isAddingCategory ? (
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-950 border border-cyan-500/40 rounded-lg">
                  <input
                    type="text"
                    autoFocus
                    placeholder="New category name..."
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCreateCustomCategory();
                      }
                    }}
                    className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none px-1"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCustomCategory}
                    disabled={!newCatInput.trim()}
                    className="px-2 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded text-[11px] font-semibold transition-colors"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <select
                  value={category}
                  onChange={(e) => {
                    if (e.target.value === '__new__') {
                      setIsAddingCategory(true);
                    } else {
                      setCategory(e.target.value);
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 text-xs"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="__new__" className="text-cyan-400 font-semibold">
                    + Add New Category...
                  </option>
                </select>
              )}
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Product Format</label>
              <div className="flex items-center gap-4 py-2">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                  <input
                    type="radio"
                    name="productFormat"
                    checked={isDigital}
                    onChange={() => setIsDigital(true)}
                    className="text-cyan-500"
                  />
                  <span>Digital Asset / License</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                  <input
                    type="radio"
                    name="productFormat"
                    checked={!isDigital}
                    onChange={() => setIsDigital(false)}
                    className="text-cyan-500"
                  />
                  <span>Physical Stock / IoT</span>
                </label>
              </div>
            </div>
          </div>

          {/* Pricing & Margin Box */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Unit Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={unitCost}
                  onChange={(e) => setUnitCost(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Selling Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-emerald-300 font-mono font-bold text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Stock Qty</label>
                <input
                  type="number"
                  required
                  value={stockQty}
                  onChange={(e) => setStockQty(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Reorder Point</label>
                <input
                  type="number"
                  required
                  value={reorderPoint}
                  onChange={(e) => setReorderPoint(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-amber-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Calculated Profit Margin Bar */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Percent className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gross Profit Margin:</span>
                <strong className={`font-mono ${marginPct >= 60 ? 'text-emerald-400' : marginPct >= 30 ? 'text-cyan-400' : 'text-amber-400'}`}>
                  {marginPct}% (${profitPerUnit.toFixed(2)}/unit profit)
                </strong>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Asset value: ${(cost * (parseInt(stockQty) || 0)).toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Supplier / Fulfillment Source</label>
            <input
              type="text"
              placeholder="e.g. AIC Internal Engineering / Shenzhen Assembly"
              value={supplierOrPlatform}
              onChange={(e) => setSupplierOrPlatform(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Technical specs, target buyers, deliverables included..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-950"
            >
              {initialProduct ? 'Save Product Changes' : 'Add to Catalog'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
