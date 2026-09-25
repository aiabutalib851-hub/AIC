import React, { useState } from 'react';
import { 
  X, 
  Settings2, 
  Tag, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Percent, 
  FileText, 
  CreditCard, 
  Check, 
  Sliders, 
  Coins, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Info,
  Building2,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Palette
} from 'lucide-react';
import { BillingCustomizationConfig, BusinessEntity } from '../../types';
import { DEFAULT_BILLING_CUSTOMIZATION } from '../../data/financeInventoryData';

interface BillingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  businesses: BusinessEntity[];
  onAddBusiness: (biz: Omit<BusinessEntity, 'id'>) => void;
  onEditBusiness: (biz: BusinessEntity) => void;
  onDeleteBusiness: (id: string) => void;
  config: BillingCustomizationConfig;
  onSaveConfig: (updated: BillingCustomizationConfig) => void;
  initialTab?: 'businesses' | 'categories' | 'invoice_defaults' | 'payment_methods';
}

type TabKey = 'businesses' | 'categories' | 'invoice_defaults' | 'payment_methods';
type CategoryGroupKey = 'income' | 'expense' | 'inventory' | 'invoice_service';

const COLOR_OPTIONS = [
  { label: 'Cyan & Blue', value: 'from-cyan-500 to-blue-600', ring: 'border-cyan-400' },
  { label: 'Indigo & Purple', value: 'from-indigo-500 to-purple-600', ring: 'border-indigo-400' },
  { label: 'Emerald & Teal', value: 'from-emerald-500 to-teal-600', ring: 'border-emerald-400' },
  { label: 'Amber & Orange', value: 'from-amber-500 to-orange-600', ring: 'border-amber-400' },
  { label: 'Rose & Crimson', value: 'from-rose-500 to-pink-600', ring: 'border-rose-400' },
  { label: 'Violet & Fuchsia', value: 'from-violet-500 to-fuchsia-600', ring: 'border-violet-400' }
];

export const BillingSettingsModal: React.FC<BillingSettingsModalProps> = ({
  isOpen,
  onClose,
  businesses,
  onAddBusiness,
  onEditBusiness,
  onDeleteBusiness,
  config,
  onSaveConfig,
  initialTab = 'businesses'
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<CategoryGroupKey>('income');
  
  // Business form state
  const [isAddingBiz, setIsAddingBiz] = useState<boolean>(false);
  const [editingBizId, setEditingBizId] = useState<string | null>(null);
  const [bizName, setBizName] = useState<string>('');
  const [bizLegalName, setBizLegalName] = useState<string>('');
  const [bizCode, setBizCode] = useState<string>('');
  const [bizCurrency, setBizCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'BDT'>('USD');
  const [bizTaxId, setBizTaxId] = useState<string>('');
  const [bizEmail, setBizEmail] = useState<string>('');
  const [bizPhone, setBizPhone] = useState<string>('');
  const [bizAddress, setBizAddress] = useState<string>('');
  const [bizWebsite, setBizWebsite] = useState<string>('');
  const [bizTagline, setBizTagline] = useState<string>('');
  const [bizColor, setBizColor] = useState<string>(COLOR_OPTIONS[0].value);

  // Category state
  const [incomeCats, setIncomeCats] = useState<string[]>(config.incomeCategories);
  const [expenseCats, setExpenseCats] = useState<string[]>(config.expenseCategories);
  const [inventoryCats, setInventoryCats] = useState<string[]>(config.inventoryCategories);
  const [invoiceServiceCats, setInvoiceServiceCats] = useState<string[]>(config.invoiceServiceCategories);

  // Defaults state
  const [defaultTaxRate, setDefaultTaxRate] = useState<string>(String(config.defaultTaxRatePct));
  const [defaultDiscount, setDefaultDiscount] = useState<string>(String(config.defaultDiscountPct));
  const [invoicePrefix, setInvoicePrefix] = useState<string>(config.invoicePrefix);
  const [defaultPaymentTerms, setDefaultPaymentTerms] = useState<string>(config.defaultPaymentTerms);
  const [defaultCurrency, setDefaultCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'BDT'>(config.defaultCurrency);
  const [defaultNotes, setDefaultNotes] = useState<string>(config.defaultNotes);

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState<string[]>(config.acceptedPaymentMethods);

  // New category / method inputs
  const [newCatName, setNewCatName] = useState<string>('');
  const [newPaymentMethod, setNewPaymentMethod] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCategoryList = 
    selectedCategoryGroup === 'income' ? incomeCats :
    selectedCategoryGroup === 'expense' ? expenseCats :
    selectedCategoryGroup === 'inventory' ? inventoryCats :
    invoiceServiceCats;

  const resetBizForm = () => {
    setBizName('');
    setBizLegalName('');
    setBizCode('');
    setBizCurrency('USD');
    setBizTaxId('');
    setBizEmail('');
    setBizPhone('');
    setBizAddress('');
    setBizWebsite('');
    setBizTagline('');
    setBizColor(COLOR_OPTIONS[0].value);
    setEditingBizId(null);
    setIsAddingBiz(false);
  };

  const handleStartEditBiz = (biz: BusinessEntity) => {
    setEditingBizId(biz.id);
    setBizName(biz.name);
    setBizLegalName(biz.legalName);
    setBizCode(biz.code);
    setBizCurrency((biz.currency as any) || 'USD');
    setBizTaxId(biz.taxId || '');
    setBizEmail(biz.email || '');
    setBizPhone(biz.phone || '');
    setBizAddress(biz.address || '');
    setBizWebsite(biz.website || '');
    setBizTagline(biz.tagline || '');
    setBizColor(biz.color || COLOR_OPTIONS[0].value);
    setIsAddingBiz(true);
  };

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizName.trim()) return;

    const currencySymbolMap: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      BDT: '৳'
    };

    const code = bizCode.trim().toUpperCase() || bizName.trim().slice(0, 3).toUpperCase();

    if (editingBizId) {
      const existing = businesses.find(b => b.id === editingBizId);
      if (existing) {
        onEditBusiness({
          ...existing,
          name: bizName.trim(),
          legalName: bizLegalName.trim() || bizName.trim(),
          code: code,
          currency: bizCurrency,
          currencySymbol: currencySymbolMap[bizCurrency] || '$',
          color: bizColor,
          tagline: bizTagline.trim() || `${bizName.trim()} Operations`,
          taxId: bizTaxId.trim() || undefined,
          email: bizEmail.trim() || undefined,
          phone: bizPhone.trim() || undefined,
          address: bizAddress.trim() || undefined,
          website: bizWebsite.trim() || undefined
        });
      }
      setSaveSuccess(`Business "${bizName.trim()}" updated successfully.`);
    } else {
      onAddBusiness({
        name: bizName.trim(),
        legalName: bizLegalName.trim() || bizName.trim(),
        code: code,
        currency: bizCurrency,
        currencySymbol: currencySymbolMap[bizCurrency] || '$',
        color: bizColor,
        tagline: bizTagline.trim() || `${bizName.trim()} Corporate Operations`,
        taxId: bizTaxId.trim() || undefined,
        email: bizEmail.trim() || undefined,
        phone: bizPhone.trim() || undefined,
        address: bizAddress.trim() || undefined,
        website: bizWebsite.trim() || undefined,
        activeAccountsCount: 1
      });
      setSaveSuccess(`Business "${bizName.trim()}" added to treasury.`);
    }

    resetBizForm();
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) return;

    if (selectedCategoryGroup === 'income') {
      if (!incomeCats.includes(trimmed)) setIncomeCats(prev => [...prev, trimmed]);
    } else if (selectedCategoryGroup === 'expense') {
      if (!expenseCats.includes(trimmed)) setExpenseCats(prev => [...prev, trimmed]);
    } else if (selectedCategoryGroup === 'inventory') {
      if (!inventoryCats.includes(trimmed)) setInventoryCats(prev => [...prev, trimmed]);
    } else {
      if (!invoiceServiceCats.includes(trimmed)) setInvoiceServiceCats(prev => [...prev, trimmed]);
    }

    setNewCatName('');
  };

  const handleRemoveCategory = (catToRemove: string) => {
    if (selectedCategoryGroup === 'income') {
      setIncomeCats(prev => prev.filter(c => c !== catToRemove));
    } else if (selectedCategoryGroup === 'expense') {
      setExpenseCats(prev => prev.filter(c => c !== catToRemove));
    } else if (selectedCategoryGroup === 'inventory') {
      setInventoryCats(prev => prev.filter(c => c !== catToRemove));
    } else {
      setInvoiceServiceCats(prev => prev.filter(c => c !== catToRemove));
    }
  };

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newPaymentMethod.trim();
    if (!trimmed) return;
    if (!paymentMethods.includes(trimmed)) {
      setPaymentMethods(prev => [...prev, trimmed]);
    }
    setNewPaymentMethod('');
  };

  const handleRemovePaymentMethod = (method: string) => {
    setPaymentMethods(prev => prev.filter(m => m !== method));
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all categories and billing defaults to system presets?')) {
      setIncomeCats(DEFAULT_BILLING_CUSTOMIZATION.incomeCategories);
      setExpenseCats(DEFAULT_BILLING_CUSTOMIZATION.expenseCategories);
      setInventoryCats(DEFAULT_BILLING_CUSTOMIZATION.inventoryCategories);
      setInvoiceServiceCats(DEFAULT_BILLING_CUSTOMIZATION.invoiceServiceCategories);
      setDefaultTaxRate(String(DEFAULT_BILLING_CUSTOMIZATION.defaultTaxRatePct));
      setDefaultDiscount(String(DEFAULT_BILLING_CUSTOMIZATION.defaultDiscountPct));
      setInvoicePrefix(DEFAULT_BILLING_CUSTOMIZATION.invoicePrefix);
      setDefaultPaymentTerms(DEFAULT_BILLING_CUSTOMIZATION.defaultPaymentTerms);
      setDefaultCurrency(DEFAULT_BILLING_CUSTOMIZATION.defaultCurrency);
      setDefaultNotes(DEFAULT_BILLING_CUSTOMIZATION.defaultNotes);
      setPaymentMethods(DEFAULT_BILLING_CUSTOMIZATION.acceptedPaymentMethods);
      setSaveSuccess('Billing defaults restored to system baseline.');
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  const handleSaveAllSettings = () => {
    const symbolMap: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      BDT: '৳'
    };

    const updatedConfig: BillingCustomizationConfig = {
      incomeCategories: incomeCats,
      expenseCategories: expenseCats,
      inventoryCategories: inventoryCats,
      invoiceServiceCategories: invoiceServiceCats,
      defaultTaxRatePct: Math.max(0, Math.min(100, parseFloat(defaultTaxRate) || 0)),
      defaultDiscountPct: Math.max(0, Math.min(100, parseFloat(defaultDiscount) || 0)),
      invoicePrefix: invoicePrefix.trim() || 'AIC-2024-',
      defaultPaymentTerms: defaultPaymentTerms.trim() || 'Net 15',
      defaultCurrency: defaultCurrency,
      defaultCurrencySymbol: symbolMap[defaultCurrency] || '$',
      acceptedPaymentMethods: paymentMethods,
      defaultNotes: defaultNotes.trim()
    };

    onSaveConfig(updatedConfig);
    setSaveSuccess('All billing customizations saved successfully!');
    setTimeout(() => {
      setSaveSuccess(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Billing & Treasury Customization</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Customization Center
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Configure business entities, custom ledger categories, tax rates, prefixes, and payment methods
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1">
            
            {/* Businesses Tab */}
            <button
              onClick={() => setActiveTab('businesses')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                activeTab === 'businesses'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
              id="tab-btn-businesses"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Business Entities</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-cyan-300 font-mono">
                {businesses.length}
              </span>
            </button>

            {/* Categories Tab */}
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                activeTab === 'categories'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
              id="tab-btn-categories"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Custom Categories</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                {incomeCats.length + expenseCats.length + inventoryCats.length}
              </span>
            </button>

            {/* Invoice Defaults Tab */}
            <button
              onClick={() => setActiveTab('invoice_defaults')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                activeTab === 'invoice_defaults'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
              id="tab-btn-defaults"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Invoice Defaults & Tax</span>
            </button>

            {/* Payment Methods Tab */}
            <button
              onClick={() => setActiveTab('payment_methods')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                activeTab === 'payment_methods'
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
              id="tab-btn-payment-methods"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment Methods</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                {paymentMethods.length}
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-800 mb-1 shrink-0"
            title="Reset categories and billing parameters to presets"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* TAB 1: BUSINESS ENTITIES */}
          {activeTab === 'businesses' && (
            <div className="space-y-4">
              
              {/* Top Banner & Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>Operating Businesses, Corporations & Divisions ({businesses.length})</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Add new business names or subsidiaries to issue invoices, segregate revenue, and manage accounts independently.
                  </p>
                </div>
                {!isAddingBiz && (
                  <button
                    onClick={() => {
                      resetBizForm();
                      setIsAddingBiz(true);
                    }}
                    className="px-3.5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-950/60 flex items-center gap-1.5 shrink-0"
                    id="add-business-name-btn"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add Business Name</span>
                  </button>
                )}
              </div>

              {/* Add / Edit Business Form */}
              {isAddingBiz && (
                <form onSubmit={handleSaveBusiness} className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-4 space-y-3.5 shadow-xl animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span>{editingBizId ? 'Edit Business Profile' : 'Register New Business Entity / Division'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={resetBizForm}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {/* Business Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Abrar Cloud Systems"
                        value={bizName}
                        onChange={(e) => setBizName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Legal Registered Name */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Legal Registered Entity Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Abrar Cloud Systems LLC"
                        value={bizLegalName}
                        onChange={(e) => setBizLegalName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Code & Currency */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Code (Prefix) *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={8}
                          placeholder="e.g. ACS"
                          value={bizCode}
                          onChange={(e) => setBizCode(e.target.value.toUpperCase())}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs font-mono font-bold text-cyan-300 uppercase focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Currency
                        </label>
                        <select
                          value={bizCurrency}
                          onChange={(e) => setBizCurrency(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="BDT">BDT (৳)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                    </div>

                    {/* Tax ID / VAT / EIN */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Tax ID / VAT / TIN / EIN
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. US-EIN-942180, BD-TIN-4892"
                        value={bizTaxId}
                        onChange={(e) => setBizTaxId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Billing Contact Email */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Billing & Invoice Email
                      </label>
                      <input
                        type="email"
                        placeholder="billing@company.com"
                        value={bizEmail}
                        onChange={(e) => setBizEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="text"
                        placeholder="+1 (555) 019-2831"
                        value={bizPhone}
                        onChange={(e) => setBizPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Address & Tagline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Registered Business Address (printed on invoices)
                      </label>
                      <input
                        type="text"
                        placeholder="Suite / Street, City, State/ZIP, Country"
                        value={bizAddress}
                        onChange={(e) => setBizAddress(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Tagline / Scope of Services
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Enterprise Cloud Deployments & GPU Clusters"
                        value={bizTagline}
                        onChange={(e) => setBizTagline(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Brand Color Theme Selection */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Corporate Brand Theme</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_OPTIONS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setBizColor(c.value)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                            bizColor === c.value
                              ? `${c.ring} bg-slate-800 text-white font-bold ring-1`
                              : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${c.value}`} />
                          <span>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={resetBizForm}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-950 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{editingBizId ? 'Update Business' : 'Save Business'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Configured Businesses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {businesses.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${b.color} flex items-center justify-center text-white font-bold text-xs shadow-md`}>
                            {b.code}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white leading-tight">
                              {b.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {b.currencySymbol} • {b.currency}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleStartEditBiz(b)}
                            className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                            title="Edit business details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {businesses.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove business "${b.name}" from billing?`)) {
                                  onDeleteBusiness(b.id);
                                }
                              }}
                              className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                              title="Delete business"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {b.tagline}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-slate-850 space-y-1 text-[10px] text-slate-400">
                        {b.legalName && (
                          <div className="truncate">
                            <span className="text-slate-500">Legal: </span>
                            <span className="text-slate-300">{b.legalName}</span>
                          </div>
                        )}
                        {b.taxId && (
                          <div className="truncate font-mono">
                            <span className="text-slate-500">Tax/EIN: </span>
                            <span className="text-cyan-300">{b.taxId}</span>
                          </div>
                        )}
                        {b.email && (
                          <div className="truncate flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="text-slate-300">{b.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-400">
                        Code: {b.code}
                      </span>
                      {b.isDefault ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Primary Entity
                        </span>
                      ) : (
                        <span>Division</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              {/* Category Group Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryGroup('income')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCategoryGroup === 'income'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-lg shadow-emerald-950/20'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
                      <ArrowUpRight className="w-3.5 h-3.5" /> Income
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                      {incomeCats.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Inflows & Revenue streams</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCategoryGroup('expense')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCategoryGroup === 'expense'
                      ? 'bg-rose-500/10 border-rose-500/40 text-white shadow-lg shadow-rose-950/20'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-rose-400">
                      <ArrowDownRight className="w-3.5 h-3.5" /> Expense
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                      {expenseCats.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">OpEx, Ads & API Costs</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCategoryGroup('inventory')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCategoryGroup === 'inventory'
                      ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-lg shadow-amber-950/20'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-amber-400">
                      <Package className="w-3.5 h-3.5" /> Inventory
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                      {inventoryCats.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Toolkits & Physical items</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCategoryGroup('invoice_service')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCategoryGroup === 'invoice_service'
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-white shadow-lg shadow-cyan-950/20'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold flex items-center gap-1.5 text-cyan-400">
                      <FileText className="w-3.5 h-3.5" /> Invoice Lines
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                      {invoiceServiceCats.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Consulting & Retainers</p>
                </button>
              </div>

              {/* Add Category Form */}
              <form onSubmit={handleAddCategory} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder={`Type new ${selectedCategoryGroup.replace('_', ' ')} category name (e.g. AI Prompt Presets)...`}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newCatName.trim()}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Category</span>
                </button>
              </form>

              {/* Category Pills List */}
              <div className="bg-slate-950/60 rounded-xl border border-slate-800/80 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Configured {selectedCategoryGroup.replace('_', ' ')} Categories ({currentCategoryList.length})
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Click trash to remove custom category
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentCategoryList.map((cat) => {
                    const colorStyles = 
                      selectedCategoryGroup === 'income' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:border-emerald-500/40'
                        : selectedCategoryGroup === 'expense'
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-300 hover:border-rose-500/40'
                        : selectedCategoryGroup === 'inventory'
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-300 hover:border-amber-500/40'
                        : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300 hover:border-cyan-500/40';

                    return (
                      <div
                        key={cat}
                        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${colorStyles}`}
                      >
                        <span>{cat}</span>
                        {currentCategoryList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(cat)}
                            className="text-slate-400 hover:text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity p-0.5 ml-1"
                            title={`Delete ${cat}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVOICE DEFAULTS & TAX */}
          {activeTab === 'invoice_defaults' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Prefix & Numbering */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Default Invoice Number Prefix</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Auto-generated invoices start with this identifier
                  </p>
                  <input
                    type="text"
                    value={invoicePrefix}
                    onChange={(e) => setInvoicePrefix(e.target.value)}
                    placeholder="e.g. AIC-2024- or INV-"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-[11px] text-slate-500 font-mono">
                    Example output: {invoicePrefix}482
                  </span>
                </div>

                {/* Tax Rate */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Default Tax / VAT Rate (%)</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Applied automatically to invoice subtotal (0% for international tech exports)
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={defaultTaxRate}
                      onChange={(e) => setDefaultTaxRate(e.target.value)}
                      className="w-full pl-3 pr-8 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <span className="absolute right-3 top-2 text-xs text-slate-400 font-bold">%</span>
                  </div>
                </div>

                {/* Payment Terms */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span>Default Payment Due Terms</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Maturity schedule printed on client statements
                  </p>
                  <select
                    value={defaultPaymentTerms}
                    onChange={(e) => setDefaultPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Due on Receipt">Due on Receipt (Immediate)</option>
                    <option value="Net 7">Net 7 Days</option>
                    <option value="Net 15">Net 15 Days</option>
                    <option value="Net 30">Net 30 Days (Standard Corporate)</option>
                    <option value="Net 60">Net 60 Days</option>
                  </select>
                </div>

                {/* Default Currency */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Default Invoice Currency</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Primary denominated currency for new invoices
                  </p>
                  <select
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value="USD">USD ($) - United States Dollar</option>
                    <option value="EUR">EUR (€) - Eurozone</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
                  </select>
                </div>
              </div>

              {/* Default Remittance Notes */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>Default Invoice Notes & Wire Remittance Instructions</span>
                </label>
                <textarea
                  rows={3}
                  value={defaultNotes}
                  onChange={(e) => setDefaultNotes(e.target.value)}
                  placeholder="Payment instructions, bank wire SWIFT codes, or late fee policy..."
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENT METHODS */}
          {activeTab === 'payment_methods' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Configure accepted settlement rails and merchant gateways available when issuing invoices and logging accounts.
              </p>

              {/* Add Payment Method */}
              <form onSubmit={handleAddPaymentMethod} className="flex gap-2">
                <div className="relative flex-1">
                  <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value)}
                    placeholder="Type payment method (e.g. USDC Crypto Settlement, Payoneer, Revolut)..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newPaymentMethod.trim()}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Method</span>
                </button>
              </form>

              {/* Payment Methods List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-white">{method}</span>
                    </div>
                    {paymentMethods.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePaymentMethod(method)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                        title="Delete method"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            {saveSuccess ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> {saveSuccess}
              </span>
            ) : (
              <span>Settings automatically apply to new invoices and transactions.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSaveAllSettings}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-900/30 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Apply Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
