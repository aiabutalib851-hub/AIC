import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  FileSpreadsheet, 
  Percent,
  RefreshCw,
  PackagePlus,
  PackageMinus,
  Sparkles,
  Building2
} from 'lucide-react';
import { 
  InventoryProduct, 
  InventoryCategory, 
  StockStatus, 
  BusinessEntity,
  InventoryMovement
} from '../../types';

interface InventoryManagementViewProps {
  products: InventoryProduct[];
  movements: InventoryMovement[];
  businesses: BusinessEntity[];
  selectedBusinessId: string;
  onSelectBusinessId: (busId: string) => void;
  onOpenAddProduct: () => void;
  onOpenEditProduct: (product: InventoryProduct) => void;
  onOpenStockAdjustment: (product: InventoryProduct) => void;
  onDeleteProduct: (id: string) => void;
  onOpenSettings?: () => void;
}

export const InventoryManagementView: React.FC<InventoryManagementViewProps> = ({
  products,
  movements,
  businesses,
  selectedBusinessId,
  onSelectBusinessId,
  onOpenAddProduct,
  onOpenEditProduct,
  onOpenStockAdjustment,
  onDeleteProduct,
  onOpenSettings
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesBus = selectedBusinessId === 'all' || p.businessId === selectedBusinessId;
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplierOrPlatform.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBus && matchesCat && matchesStatus && matchesSearch;
  });

  // Calculate metrics
  const activeProducts = products.filter(p => selectedBusinessId === 'all' || p.businessId === selectedBusinessId);
  const totalUnits = activeProducts.reduce((sum, p) => sum + p.stockQty, 0);
  const totalCostValue = activeProducts.reduce((sum, p) => sum + (p.stockQty * p.unitCost), 0);
  const totalRetailValue = activeProducts.reduce((sum, p) => sum + (p.stockQty * p.sellingPrice), 0);
  const lowStockCount = activeProducts.filter(p => p.status === 'low_stock' || p.status === 'out_of_stock').length;

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['SKU', 'Name', 'Category', 'Business', 'Stock Qty', 'Reorder Point', 'Unit Cost', 'Selling Price', 'Margin %', 'Status', 'Total Sold'];
    const rows = filteredProducts.map(p => {
      const bus = businesses.find(b => b.id === p.businessId)?.name || p.businessId;
      const margin = Math.round(((p.sellingPrice - p.unitCost) / p.sellingPrice) * 100);
      return [
        `"${p.sku}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.category}"`,
        `"${bus}"`,
        p.stockQty,
        p.reorderPoint,
        p.unitCost,
        p.sellingPrice,
        `${margin}%`,
        p.status,
        p.totalSold
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AIC_Inventory_Catalog_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total SKUs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-medium block">Active Product Catalog</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold font-mono text-white">
              {activeProducts.length} SKUs
            </span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {totalUnits.toLocaleString()} total units on hand
          </span>
        </div>

        {/* Inventory Cost Valuation */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-medium block">Total Inventory Asset Cost</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold font-mono text-cyan-400">
              ${totalCostValue.toLocaleString()}
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
            Acquisition & Production Basis
          </span>
        </div>

        {/* Potential Retail Revenue */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-medium block">Potential Retail Realization</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">
              ${totalRetailValue.toLocaleString()}
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] text-cyan-300 font-medium mt-1 block">
            +${(totalRetailValue - totalCostValue).toLocaleString()} Projected Margin
          </span>
        </div>

        {/* Stock Health Alerts */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 font-medium block">Inventory Health Status</span>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-2xl font-bold font-mono ${lowStockCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {lowStockCount} {lowStockCount === 1 ? 'Alert' : 'Alerts'}
            </span>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              lowStockCount > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {lowStockCount > 0 ? 'Items below reorder point' : 'All stock levels healthy'}
          </span>
        </div>

      </div>

      {/* Action and Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Add Product Button */}
          <button
            onClick={onOpenAddProduct}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md shadow-cyan-950/60 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            id="inventory-add-product-btn"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </button>

          {/* Manage Categories Button */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Customize product categories"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Categories</span>
            </button>
          )}

          {/* Search Box */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search SKU or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
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

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Stock Statuses</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
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

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Export Product Inventory Catalog"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>

      </div>

      {/* Products Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(prod => {
          const bus = businesses.find(b => b.id === prod.businessId);
          const marginPct = Math.round(((prod.sellingPrice - prod.unitCost) / prod.sellingPrice) * 100);
          const isLowStock = prod.stockQty <= prod.reorderPoint;
          const isOutOfStock = prod.stockQty <= 0;

          return (
            <div
              key={prod.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all space-y-4 group"
            >
              {/* Product Card Top */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                    {prod.sku}
                  </span>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isOutOfStock
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : isLowStock
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {isOutOfStock ? 'OUT OF STOCK' : isLowStock ? 'LOW STOCK' : 'IN STOCK'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mt-2.5 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {prod.name}
                </h3>

                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {prod.description}
                </p>

                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {prod.category}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {prod.isDigital ? 'Digital Asset' : 'Physical Hardware'}
                  </span>
                  {bus && (
                    <span className="text-[10px] font-mono text-cyan-400">
                      {bus.code}
                    </span>
                  )}
                </div>
              </div>

              {/* Pricing and Stock Level Progress */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Cost</span>
                    <span className="font-mono text-slate-300 font-bold">${prod.unitCost}</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Price</span>
                    <span className="font-mono text-emerald-400 font-bold">${prod.sellingPrice}</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Margin</span>
                    <span className="font-mono text-cyan-400 font-bold">{marginPct}%</span>
                  </div>
                </div>

                {/* Stock Gauge */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Available Stock:</span>
                    <span className="font-mono font-bold text-white">
                      {prod.stockQty} units <span className="text-slate-500 font-normal">({prod.totalSold} sold)</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOutOfStock ? 'bg-rose-500' : isLowStock ? 'bg-amber-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(5, (prod.stockQty / (prod.reorderPoint * 3)) * 100))}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>Reorder at: {prod.reorderPoint}</span>
                    <span>Valuation: ${(prod.stockQty * prod.unitCost).toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons for this product */}
                <div className="flex items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-1.5">
                    {/* Quick Sell / Stock Out */}
                    <button
                      onClick={() => onOpenStockAdjustment(prod)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 transition-colors"
                      title="Sell or decrement product units"
                    >
                      <PackageMinus className="w-3 h-3" />
                      <span>Sell</span>
                    </button>

                    {/* Quick Restock */}
                    <button
                      onClick={() => onOpenStockAdjustment(prod)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1 transition-colors"
                      title="Add inventory shipment units"
                    >
                      <PackagePlus className="w-3 h-3" />
                      <span>+ Restock</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenEditProduct(prod)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      title="Edit Product Details"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(prod.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete Product from Catalog"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Inventory Stock Movement Audit Ledger */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recent Inventory Stock Adjustments & Fulfillment Audit Log</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {movements.length} audit movements recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 border-b border-slate-800 text-[11px]">
              <tr>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Product Name</th>
                <th className="py-2 px-3">Movement Type</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Reason / Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {movements.map(mov => (
                <tr key={mov.id} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-mono text-slate-400 whitespace-nowrap">{mov.date}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-100">{mov.productName}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      mov.type === 'sale'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : mov.type === 'stock_in'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {mov.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold whitespace-nowrap">
                    {mov.type === 'stock_in' ? `+${mov.quantity}` : `-${mov.quantity}`} units
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">{mov.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
