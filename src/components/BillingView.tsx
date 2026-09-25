import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Printer, 
  Download,
  Building2,
  Calendar,
  Sparkles,
  FileSpreadsheet,
  FileCode,
  Check,
  Tag,
  Layers,
  X,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
  Wallet,
  Landmark,
  Package,
  TrendingUp,
  Sliders,
  Percent,
  Trash2,
  Coins,
  Settings2,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  Invoice, 
  Client, 
  InvoiceStatus,
  FinancialAccount,
  BusinessEntity,
  FinancialTransaction,
  InventoryProduct,
  InventoryMovement,
  BillingSubTab,
  BillingCustomizationConfig,
  InvoiceItem
} from '../types';
import { ExportCSVModal } from './ExportCSVModal';
import { downloadInvoicesCSV, downloadInvoicesJSON } from '../utils/csvExport';
import { generateSingleInvoicePdf, generateInvoicesBatchPdf } from '../utils/invoicePdfExport';
import { 
  assignInvoiceTags, 
  getInvoiceTagStyle, 
  detectServiceTierCategory 
} from '../utils/invoiceTagging';
import { AIC_AGENCY_INFO } from '../data/agencyInfo';
import { useLanguage } from '../context/LanguageContext';
import { IncomeExpenseView } from './finance/IncomeExpenseView';
import { AccountsManagementView } from './finance/AccountsManagementView';
import { InventoryManagementView } from './finance/InventoryManagementView';
import { RecordTransactionModal } from './finance/RecordTransactionModal';
import { TransferFundsModal } from './finance/TransferFundsModal';
import { ProductModal } from './finance/ProductModal';
import { StockAdjustmentModal } from './finance/StockAdjustmentModal';
import { BillingSettingsModal } from './finance/BillingSettingsModal';

interface BillingViewProps {
  invoices: Invoice[];
  clients: Client[];
  onAddNewInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  onUpdateInvoiceStatus: (invoiceId: string, status: InvoiceStatus) => void;
  searchQuery: string;
  accounts: FinancialAccount[];
  businesses: BusinessEntity[];
  transactions: FinancialTransaction[];
  products: InventoryProduct[];
  movements: InventoryMovement[];
  billingConfig: BillingCustomizationConfig;
  onUpdateBillingConfig: (config: BillingCustomizationConfig) => void;
  onAddNewCategory: (type: 'income' | 'expense' | 'inventory' | 'invoice_service', name: string) => void;
  onAddBusiness: (biz: Omit<BusinessEntity, 'id'>) => void;
  onEditBusiness: (biz: BusinessEntity) => void;
  onDeleteBusiness: (id: string) => void;
  onAddTransaction: (tx: Omit<FinancialTransaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
  onTransferFunds: (fromAccountId: string, toAccountId: string, amount: number, fee: number, note: string) => void;
  onAddProduct: (product: Omit<InventoryProduct, 'id'>) => void;
  onUpdateProduct: (product: Omit<InventoryProduct, 'id'>, id?: string) => void;
  onDeleteProduct: (id: string) => void;
  onStockAdjustment: (
    productId: string, 
    action: 'sale' | 'stock_in' | 'adjustment', 
    quantity: number, 
    notes: string, 
    syncWithFinance: boolean, 
    targetAccountId?: string
  ) => void;
}

interface NewInvoiceLineItem {
  id: string;
  description: string;
  category: string;
  hoursOrQty: number;
  rate: number;
  total: number;
}

export const BillingView: React.FC<BillingViewProps> = ({
  invoices,
  clients,
  onAddNewInvoice,
  onUpdateInvoiceStatus,
  searchQuery,
  accounts,
  businesses,
  transactions,
  products,
  movements,
  billingConfig,
  onUpdateBillingConfig,
  onAddNewCategory,
  onAddBusiness,
  onEditBusiness,
  onDeleteBusiness,
  onAddTransaction,
  onDeleteTransaction,
  onTransferFunds,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onStockAdjustment
}) => {
  const { t, isBangla, formatNumber } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<BillingSubTab>('invoices');
  const [selectedBusinessScope, setSelectedBusinessScope] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<Invoice | null>(null);
  
  // Modals state
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [exportDefaultType, setExportDefaultType] = useState<'csv' | 'json' | 'pdf'>('pdf');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Customization & Settings Modal state
  const [showBillingSettingsModal, setShowBillingSettingsModal] = useState<boolean>(false);
  const [billingSettingsTab, setBillingSettingsTab] = useState<'businesses' | 'categories' | 'invoice_defaults' | 'payment_methods'>('businesses');

  // Finance & Inventory modals state
  const [showRecordModal, setShowRecordModal] = useState<boolean>(false);
  const [recordInitialType, setRecordInitialType] = useState<'income' | 'expense'>('income');
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<InventoryProduct | null>(null);
  const [adjustingProduct, setAdjustingProduct] = useState<InventoryProduct | null>(null);

  // New customizable invoice state
  const initialClient = clients[0];
  const [newInvoiceBusinessId, setNewInvoiceBusinessId] = useState<string>(businesses[0]?.id || 'bus-aic');
  const [newInvoiceNumber, setNewInvoiceNumber] = useState<string>(
    `${billingConfig.invoicePrefix}${Math.floor(Math.random() * 800) + 100}`
  );
  const [newClientId, setNewClientId] = useState(initialClient?.id || '');
  const [newDueDate, setNewDueDate] = useState<string>('2024-09-30');
  const [newIssueDate, setNewIssueDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newPaymentTerms, setNewPaymentTerms] = useState<string>(billingConfig.defaultPaymentTerms || 'Net 15');
  const [newPaymentMethod, setNewPaymentMethod] = useState<string>(billingConfig.acceptedPaymentMethods[0] || 'Bank Wire');
  const [newTaxRate, setNewTaxRate] = useState<string>(String(billingConfig.defaultTaxRatePct || 0));
  const [newDiscount, setNewDiscount] = useState<string>('0');
  const [newInvoiceNotes, setNewInvoiceNotes] = useState<string>(billingConfig.defaultNotes || '');
  const [extraTags, setExtraTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState<string>('');
  
  // Multi-line items for new invoice
  const [lineItems, setLineItems] = useState<NewInvoiceLineItem[]>([
    {
      id: 'item-1',
      description: initialClient ? `${initialClient.tier} - Monthly Retainer & AI Agent Operations` : 'Enterprise Automation Retainer',
      category: billingConfig.invoiceServiceCategories[0] || 'Monthly AI Retainer',
      hoursOrQty: 1,
      rate: initialClient?.monthlyFee || 4500,
      total: initialClient?.monthlyFee || 4500
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenRecord = (type: 'income' | 'expense') => {
    setRecordInitialType(type);
    setShowRecordModal(true);
  };

  const handleOpenSettingsTab = (tab: 'businesses' | 'categories' | 'invoice_defaults' | 'payment_methods' = 'businesses') => {
    setBillingSettingsTab(tab);
    setShowBillingSettingsModal(true);
  };

  const handleQuickExportFilteredPDF = () => {
    if (filteredInvoices.length === 0) {
      showToast('No matching invoices to export as PDF.');
      return;
    }
    if (filteredInvoices.length === 1) {
      const inv = filteredInvoices[0];
      const invBusiness = businesses.find(b => b.id === inv.businessId) || businesses[0];
      const filename = generateSingleInvoicePdf(inv, invBusiness);
      showToast(`Exported official PDF invoice #${inv.invoiceNumber} (${filename})`);
      return;
    }
    const currentScopeName = selectedBusinessScope === 'all'
      ? 'Consolidated Multi-Business Portfolio'
      : (businesses.find(b => b.id === selectedBusinessScope)?.name || 'Filtered Business Entity');
    const res = generateInvoicesBatchPdf(filteredInvoices, businesses, {
      scopeLabel: currentScopeName,
    });
    showToast(`Exported ${res.count} invoices ($${res.totalAmount.toLocaleString()}) to PDF statement: ${res.filename}`);
  };

  const handleQuickExportFilteredCSV = () => {
    const res = downloadInvoicesCSV(filteredInvoices, { format: 'detailed' });
    showToast(`Exported ${res.rowCount} invoices ($${res.totalAmount.toLocaleString()}) to ${res.filename}`);
  };

  const handleQuickExportFilteredJSON = () => {
    const res = downloadInvoicesJSON(filteredInvoices, { format: 'ledger' });
    showToast(`Exported ${res.rowCount} invoices ($${res.totalAmount.toLocaleString()}) to ${res.filename}`);
  };

  const handleExportSingleInvoice = (inv: Invoice, type: 'csv' | 'json' | 'pdf' = 'pdf') => {
    if (type === 'pdf') {
      const invBusiness = businesses.find(b => b.id === inv.businessId) || businesses[0];
      const filename = generateSingleInvoicePdf(inv, invBusiness);
      showToast(`Exported official PDF invoice #${inv.invoiceNumber} (${filename})`);
    } else if (type === 'csv') {
      const res = downloadInvoicesCSV([inv], { 
        format: 'detailed',
        filename: `${inv.invoiceNumber}_Invoice.csv`
      });
      showToast(`Exported invoice ${inv.invoiceNumber} as CSV (${res.filename})`);
    } else {
      const res = downloadInvoicesJSON([inv], { 
        format: 'ledger',
        filename: `${inv.invoiceNumber}_Invoice.json`
      });
      showToast(`Exported invoice ${inv.invoiceNumber} as JSON (${res.filename})`);
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.tags && inv.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (inv.serviceTier && inv.serviceTier.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || inv.status === selectedStatus;

    const matchesTier = selectedTier === 'all' || (() => {
      const invCategory = detectServiceTierCategory(inv.serviceTier);
      return invCategory === selectedTier;
    })();

    const matchesBusiness = selectedBusinessScope === 'all' || inv.businessId === selectedBusinessScope;

    return matchesSearch && matchesStatus && matchesTier && matchesBusiness;
  });

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((a, b) => a + b.total, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((a, b) => a + b.total, 0);

  const handleMarkAsPaid = (inv: Invoice) => {
    onUpdateInvoiceStatus(inv.id, 'paid');
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast(`Invoice ${inv.invoiceNumber} marked as settled.`);
  };

  const handleClientChange = (cId: string) => {
    setNewClientId(cId);
    const client = clients.find(c => c.id === cId);
    if (client) {
      setLineItems([
        {
          id: 'item-1',
          description: `${client.tier} - Monthly Retainer & AI Agent Operations`,
          category: billingConfig.invoiceServiceCategories[0] || 'Monthly AI Retainer',
          hoursOrQty: 1,
          rate: client.monthlyFee,
          total: client.monthlyFee
        }
      ]);
    }
  };

  const handleUpdateLineItem = (index: number, field: keyof NewInvoiceLineItem, value: any) => {
    setLineItems(prev => {
      const copy = [...prev];
      const target = { ...copy[index], [field]: value };
      if (field === 'hoursOrQty' || field === 'rate') {
        const qty = field === 'hoursOrQty' ? Number(value) || 0 : target.hoursOrQty;
        const r = field === 'rate' ? Number(value) || 0 : target.rate;
        target.total = qty * r;
      }
      copy[index] = target;
      return copy;
    });
  };

  const handleAddLineItem = () => {
    setLineItems(prev => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        description: 'Custom AI Solution Deliverable',
        category: billingConfig.invoiceServiceCategories[0] || 'AI Consulting',
        hoursOrQty: 1,
        rate: 1500,
        total: 1500
      }
    ]);
  };

  const handleRemoveLineItem = (idx: number) => {
    if (lineItems.length <= 1) return;
    setLineItems(prev => prev.filter((_, i) => i !== idx));
  };

  // Calculations for new invoice
  const computedSubtotal = lineItems.reduce((acc, it) => acc + (it.total || 0), 0);
  const taxRateNum = parseFloat(newTaxRate) || 0;
  const computedTaxAmount = (computedSubtotal * taxRateNum) / 100;
  const discountNum = parseFloat(newDiscount) || 0;
  const computedTotal = Math.max(0, computedSubtotal + computedTaxAmount - discountNum);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === newClientId);
    if (!client) return;

    const assignedBusiness = businesses.find(b => b.id === newInvoiceBusinessId) || businesses[0];
    const assignedTags = assignInvoiceTags(client.tier, extraTags);

    const itemsFormatted: InvoiceItem[] = lineItems.map(it => ({
      description: it.category ? `[${it.category}] ${it.description}` : it.description,
      hoursOrQty: it.hoursOrQty,
      rate: it.rate,
      total: it.total
    }));

    onAddNewInvoice({
      invoiceNumber: newInvoiceNumber.trim() || `AIC-2024-${Math.floor(Math.random() * 800) + 100}`,
      clientName: client.name,
      clientId: client.id,
      serviceTier: client.tier,
      tags: assignedTags,
      issueDate: newIssueDate,
      dueDate: newDueDate,
      status: 'pending',
      subtotal: computedSubtotal,
      tax: computedTaxAmount,
      total: computedTotal,
      businessId: assignedBusiness?.id,
      currency: assignedBusiness?.currency || 'USD',
      currencySymbol: assignedBusiness?.currencySymbol || '$',
      paymentTerms: newPaymentTerms,
      paymentMethod: newPaymentMethod,
      notes: newInvoiceNotes,
      items: itemsFormatted
    });

    setExtraTags([]);
    setCustomTagInput('');
    setShowCreateModal(false);
    showToast(`Invoice ${newInvoiceNumber} issued under ${assignedBusiness?.name}.`);
    
    // Refresh invoice number for next time
    setNewInvoiceNumber(`${billingConfig.invoicePrefix}${Math.floor(Math.random() * 800) + 100}`);
  };

  return (
    <div className="space-y-6">
      
      {/* Global Billing Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan-400" />
            <span>{t('billing.title', 'Financial Management, Multi-Entity & Billing Customization')}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {t('billing.subtitle', 'Consolidated treasury across multiple operating businesses, bank accounts, custom income/expense categories & inventory')}
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          
          {/* Customize Billing & Business Name Button */}
          <button
            onClick={() => handleOpenSettingsTab('businesses')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-950/40 hover:scale-[1.02] active:scale-[0.98]"
            title="Add business name, legal entity, tax ID, custom categories & invoice parameters"
            id="customize-billing-btn"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('billing.customize', 'Customize Billing & Businesses')}</span>
          </button>

          {/* Income & Expense Buttons directly in the header */}
          <button
            onClick={() => handleOpenRecord('income')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-950/60 flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            title="Record an incoming payment or revenue item"
            id="global-record-income-btn"
          >
            <ArrowUpRight className="w-4 h-4 text-emerald-200" />
            <span>{t('billing.recordIncome', '+ Record Income')}</span>
          </button>

          <button
            onClick={() => handleOpenRecord('expense')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md shadow-rose-950/60 flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            title="Record an operational business expense"
            id="global-record-expense-btn"
          >
            <ArrowDownRight className="w-4 h-4 text-rose-200" />
            <span>{t('billing.recordExpense', '- Record Expense')}</span>
          </button>

          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductModal(true);
            }}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1.5 shadow-sm shadow-cyan-950/50"
            title="Add a new product, blueprint or toolkit to inventory"
            id="global-add-product-btn"
          >
            <Package className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('billing.addProduct', '+ Add Product')}</span>
          </button>

          <button
            onClick={() => {
              setNewInvoiceNumber(`${billingConfig.invoicePrefix}${Math.floor(Math.random() * 800) + 100}`);
              setShowCreateModal(true);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
            id="global-new-invoice-btn"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('billing.newInvoice', 'New Invoice')}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('invoices')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'invoices'
              ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-md shadow-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          id="billing-tab-invoices"
        >
          <Receipt className="w-4 h-4 text-cyan-400" />
          <span>{t('billing.tab.invoices', 'Retainer Invoices')}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
            {formatNumber(invoices.length)}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('income_expense')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'income_expense'
              ? 'bg-slate-800 text-emerald-300 border border-slate-700 shadow-md shadow-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          id="billing-tab-income-expense"
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>{t('billing.tab.incomeExpense', 'Income & Expense')}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 border border-slate-700">
            {formatNumber(transactions.length)}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('accounts')}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'accounts'
              ? 'bg-slate-800 text-indigo-300 border border-slate-700 shadow-md shadow-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          id="billing-tab-accounts"
        >
          <Landmark className="w-4 h-4 text-indigo-400" />
          <span>{t('billing.tab.accounts', 'Multiple Accounts & Businesses')}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-indigo-300 border border-slate-700">
            {formatNumber(businesses.length)} B / {formatNumber(accounts.length)} A
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'inventory'
              ? 'bg-slate-800 text-amber-300 border border-slate-700 shadow-md shadow-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          id="billing-tab-inventory"
        >
          <Package className="w-4 h-4 text-amber-400" />
          <span>{t('billing.tab.inventory', 'Product Inventory')}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-700">
            {formatNumber(products.length)}
          </span>
        </button>
      </div>

      {/* SUB-VIEW 1: INCOME & EXPENSE MANAGEMENT */}
      {activeSubTab === 'income_expense' && (
        <IncomeExpenseView
          transactions={transactions}
          accounts={accounts}
          businesses={businesses}
          selectedBusinessId={selectedBusinessScope}
          onSelectBusinessId={setSelectedBusinessScope}
          onOpenRecordIncome={() => handleOpenRecord('income')}
          onOpenRecordExpense={() => handleOpenRecord('expense')}
          onOpenTransferModal={() => setShowTransferModal(true)}
          onDeleteTransaction={onDeleteTransaction}
          onOpenSettings={() => handleOpenSettingsTab('categories')}
        />
      )}

      {/* SUB-VIEW 2: MULTI-ACCOUNTS & BUSINESS MANAGEMENT */}
      {activeSubTab === 'accounts' && (
        <AccountsManagementView
          accounts={accounts}
          businesses={businesses}
          transactions={transactions}
          selectedBusinessId={selectedBusinessScope}
          onSelectBusinessId={setSelectedBusinessScope}
          onOpenTransferModal={() => setShowTransferModal(true)}
          onOpenRecordIncome={() => handleOpenRecord('income')}
          onOpenRecordExpense={() => handleOpenRecord('expense')}
          onOpenSettings={(tab) => handleOpenSettingsTab(tab || 'businesses')}
        />
      )}

      {/* SUB-VIEW 3: PRODUCT INVENTORY MANAGEMENT */}
      {activeSubTab === 'inventory' && (
        <InventoryManagementView
          products={products}
          movements={movements}
          businesses={businesses}
          selectedBusinessId={selectedBusinessScope}
          onSelectBusinessId={setSelectedBusinessScope}
          onOpenAddProduct={() => {
            setEditingProduct(null);
            setShowProductModal(true);
          }}
          onOpenEditProduct={(prod) => {
            setEditingProduct(prod);
            setShowProductModal(true);
          }}
          onOpenStockAdjustment={(prod) => {
            setAdjustingProduct(prod);
          }}
          onDeleteProduct={onDeleteProduct}
          onOpenSettings={() => handleOpenSettingsTab('categories')}
        />
      )}

      {/* SUB-VIEW 4: RETAINER INVOICES VIEW */}
      {activeSubTab === 'invoices' && (
        <>
          {/* Revenue Snapshot Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block font-medium">{t('billing.settledInvoices', 'Settled Invoices (This Cycle)')}</span>
              <span className="text-2xl font-bold text-white mt-2 block font-mono">
                ${totalPaid.toLocaleString()}
              </span>
              <span className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> {isBangla ? '১০০% সফল সেটলমেন্ট' : '100% On-time wire clearance'}
              </span>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block font-medium">{t('billing.pendingReceivables', 'Pending Receivables')}</span>
              <span className="text-2xl font-bold text-amber-400 mt-2 block font-mono">
                ${totalPending.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {formatNumber(invoices.filter(i => i.status === 'pending').length)} {isBangla ? 'টি বকেয়া ইনভয়েস' : 'outstanding invoices'}
              </span>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block font-medium">{t('billing.configuredBusinesses', 'Configured Businesses')}</span>
              <span className="text-2xl font-bold text-cyan-400 mt-2 block font-mono">
                {formatNumber(businesses.length)}
              </span>
              <button 
                onClick={() => handleOpenSettingsTab('businesses')}
                className="text-xs text-cyan-400 hover:text-cyan-300 mt-1 flex items-center gap-1 underline underline-offset-2"
              >
                <Building2 className="w-3.5 h-3.5" /> {t('billing.manageBusinesses', 'Manage Business Names')}
              </button>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block font-medium">{t('billing.categoriesDefaults', 'Categories & Defaults')}</span>
              <span className="text-2xl font-bold text-indigo-400 mt-2 block font-mono">
                {formatNumber(billingConfig.incomeCategories.length + billingConfig.expenseCategories.length + billingConfig.inventoryCategories.length)}
              </span>
              <button 
                onClick={() => handleOpenSettingsTab('categories')}
                className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 flex items-center gap-1 underline underline-offset-2"
              >
                <Tag className="w-3.5 h-3.5" /> {t('billing.manageCategories', 'Manage Custom Categories')}
              </button>
            </div>
          </div>

          {/* Filtering and Actions Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                {['all', 'paid', 'pending'].map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3 py-1.5 rounded font-medium capitalize transition-colors ${
                      selectedStatus === st
                        ? 'bg-cyan-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Service Tier Category Filter */}
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
                <Tag className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="bg-transparent text-slate-300 text-xs font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">All Service Tiers</option>
                  <option value="Enterprise" className="bg-slate-900">Enterprise AI Operations</option>
                  <option value="Growth" className="bg-slate-900">Growth Agent Automation</option>
                  <option value="Starter" className="bg-slate-900">Starter / Pilot Retainers</option>
                </select>
              </div>

              {/* Business Entity Filter */}
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
                <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <select
                  value={selectedBusinessScope}
                  onChange={(e) => setSelectedBusinessScope(e.target.value)}
                  className="bg-transparent text-slate-300 text-xs font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-slate-900">All Businesses</option>
                  {businesses.map(b => (
                    <option key={b.id} value={b.id} className="bg-slate-900">{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              {/* Quick Export PDF button */}
              <button
                onClick={handleQuickExportFilteredPDF}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
                title="Quick export matching invoices to PDF statement"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>

              {/* Quick Export CSV button */}
              <button
                onClick={handleQuickExportFilteredCSV}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                title="Quick export matching invoices to CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              {/* Advanced Export Modal */}
              <button
                onClick={() => {
                  setExportDefaultType('pdf');
                  setShowExportModal(true);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
                title="Open Advanced Export Dialog (PDF, CSV, JSON)"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export...</span>
              </button>
            </div>
          </div>

          {/* Invoices Table */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4 font-semibold">Invoice #</th>
                    <th className="py-3.5 px-4 font-semibold">Issuing Business</th>
                    <th className="py-3.5 px-4 font-semibold">Client & Tier</th>
                    <th className="py-3.5 px-4 font-semibold">Tags</th>
                    <th className="py-3.5 px-4 font-semibold">Due Date</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Amount</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {filteredInvoices.map((inv) => {
                    const invBusiness = businesses.find(b => b.id === inv.businessId) || businesses[0];
                    return (
                      <tr 
                        key={inv.id} 
                        className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                        onClick={() => setSelectedInvoiceForModal(inv)}
                      >
                        <td className="py-3.5 px-4 font-mono font-medium text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>{inv.invoiceNumber}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-medium">
                            <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${invBusiness?.color || 'from-cyan-400 to-blue-500'}`} />
                            <span className="truncate max-w-[120px]">{invBusiness?.name || 'Abrar IT Care'}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{inv.clientName}</div>
                          <div className="text-[10px] text-slate-400">{inv.serviceTier || 'Enterprise Client'}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {inv.tags && inv.tags.length > 0 ? (
                              inv.tags.map((t, i) => {
                                const style = getInvoiceTagStyle(t);
                                return (
                                  <span
                                    key={i}
                                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${style.bg} ${style.text} ${style.border}`}
                                  >
                                    {t}
                                  </span>
                                );
                              })
                            ) : (
                              <span className="text-slate-500 text-[10px] italic">No tags</span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-slate-400">
                          {inv.dueDate}
                        </td>

                        <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                          ${inv.total.toLocaleString()}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide capitalize ${
                            inv.status === 'paid'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${inv.status === 'paid' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {inv.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {inv.status === 'pending' && (
                              <button
                                onClick={() => handleMarkAsPaid(inv)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] transition-colors"
                              >
                                Mark Paid
                              </button>
                            )}

                            <button
                              onClick={() => handleExportSingleInvoice(inv, 'pdf')}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 hover:text-rose-300 transition-colors"
                              title="Export Invoice as Official PDF"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setSelectedInvoiceForModal(inv)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="View & Print Invoice"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleExportSingleInvoice(inv, 'csv')}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                              title="Download single CSV"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredInvoices.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                <Receipt className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs">No invoices found matching current filters.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Invoice Details / Print Modal with Issuing Business Branding */}
      {selectedInvoiceForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150 my-auto">
            
            {/* Modal Header with Issuing Business Details */}
            {(() => {
              const invBusiness = businesses.find(b => b.id === selectedInvoiceForModal.businessId) || businesses[0];
              return (
                <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${invBusiness?.color || 'from-cyan-500 to-blue-600'} flex items-center justify-center text-white font-bold text-xs`}>
                        {invBusiness?.code || 'AIC'}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {invBusiness?.name || AIC_AGENCY_INFO.name}
                        </h3>
                        <p className="text-[11px] text-slate-400">{invBusiness?.legalName || AIC_AGENCY_INFO.tagline}</p>
                      </div>
                    </div>

                    <div className="pt-1 text-[11px] text-slate-400 flex flex-wrap gap-x-3 gap-y-0.5">
                      {invBusiness?.taxId && (
                        <span className="font-mono text-cyan-300">Tax ID: {invBusiness.taxId}</span>
                      )}
                      {invBusiness?.email && (
                        <span>Email: {invBusiness.email}</span>
                      )}
                      {invBusiness?.phone && (
                        <span>Tel: {invBusiness.phone}</span>
                      )}
                    </div>
                    {invBusiness?.address && (
                      <p className="text-[10px] text-slate-500">{invBusiness.address}</p>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Official Statement</span>
                    <p className="text-sm font-bold text-white font-mono mt-0.5">#{selectedInvoiceForModal.invoiceNumber}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold capitalize ${
                      selectedInvoiceForModal.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {selectedInvoiceForModal.status}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Billed To and Payment Terms */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Billed To (Client):</span>
                <p className="font-bold text-white text-sm mt-0.5">{selectedInvoiceForModal.clientName}</p>
                <span className="text-slate-400 block mt-0.5">Tier: {selectedInvoiceForModal.serviceTier || 'Enterprise Client'}</span>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-slate-400 block font-semibold">Payment Details:</span>
                <p className="text-slate-300">Issue Date: {selectedInvoiceForModal.issueDate}</p>
                <p className="text-slate-300">Due Date: {selectedInvoiceForModal.dueDate}</p>
                {selectedInvoiceForModal.paymentTerms && (
                  <p className="text-cyan-300 font-medium">Terms: {selectedInvoiceForModal.paymentTerms}</p>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-950 text-slate-400">
                  <tr>
                    <th className="py-2.5 px-3">Description & Scope</th>
                    <th className="py-2.5 px-3 text-center">Qty / Hrs</th>
                    <th className="py-2.5 px-3 text-right">Rate</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {selectedInvoiceForModal.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3">{it.description}</td>
                      <td className="py-2.5 px-3 text-center font-mono">{it.hoursOrQty || 1}</td>
                      <td className="py-2.5 px-3 text-right font-mono">${(it.rate || it.total).toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-mono">${it.total.toLocaleString()}</td>
                    </tr>
                  ))}
                  
                  {/* Financial Breakdown */}
                  {selectedInvoiceForModal.subtotal !== undefined && selectedInvoiceForModal.subtotal !== selectedInvoiceForModal.total && (
                    <tr className="bg-slate-950/40 text-slate-400">
                      <td colSpan={3} className="py-2 px-3 text-right font-semibold">Subtotal:</td>
                      <td className="py-2 px-3 text-right font-mono">${selectedInvoiceForModal.subtotal.toLocaleString()}</td>
                    </tr>
                  )}
                  {selectedInvoiceForModal.tax !== undefined && selectedInvoiceForModal.tax > 0 && (
                    <tr className="bg-slate-950/40 text-slate-400">
                      <td colSpan={3} className="py-1.5 px-3 text-right font-semibold">Tax / VAT:</td>
                      <td className="py-1.5 px-3 text-right font-mono">${selectedInvoiceForModal.tax.toLocaleString()}</td>
                    </tr>
                  )}
                  <tr className="bg-slate-950/80 font-bold text-white border-t border-slate-700">
                    <td colSpan={3} className="py-3 px-3 text-right">Total Payable Amount</td>
                    <td className="py-3 px-3 text-right font-mono text-cyan-400 text-sm">
                      ${selectedInvoiceForModal.total.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Remittance & Payment Methods */}
            {(selectedInvoiceForModal.notes || selectedInvoiceForModal.paymentMethod) && (
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block">Settlement Instructions & Rails:</span>
                {selectedInvoiceForModal.paymentMethod && (
                  <p className="text-cyan-300">Accepted Method: {selectedInvoiceForModal.paymentMethod}</p>
                )}
                {selectedInvoiceForModal.notes && (
                  <p className="whitespace-pre-line text-slate-400 leading-relaxed">{selectedInvoiceForModal.notes}</p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Window
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleExportSingleInvoice(selectedInvoiceForModal, 'pdf')}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm shadow-rose-950/40"
                  title="Export official branded PDF invoice"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-400" />
                  <span>Export PDF</span>
                </button>
                <button
                  onClick={() => handleExportSingleInvoice(selectedInvoiceForModal, 'csv')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-cyan-950 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customizable Create New Invoice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 my-auto">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-cyan-400" />
                <span>Issue Customizable Retainer Invoice</span>
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              
              {/* Row 1: Issuing Business Entity & Invoice Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-semibold flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Issuing Business Name *</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleOpenSettingsTab('businesses')}
                      className="text-[10px] text-cyan-400 hover:underline"
                    >
                      + Add New Business
                    </button>
                  </div>
                  <select
                    value={newInvoiceBusinessId}
                    onChange={(e) => setNewInvoiceBusinessId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-cyan-500"
                  >
                    {businesses.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.code}) - {b.currency}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Invoice Number *</label>
                  <input
                    type="text"
                    required
                    value={newInvoiceNumber}
                    onChange={(e) => setNewInvoiceNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Row 2: Client & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Client *</label>
                  <select
                    value={newClientId}
                    onChange={(e) => handleClientChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.tier})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Issue Date</label>
                  <input
                    type="date"
                    required
                    value={newIssueDate}
                    onChange={(e) => setNewIssueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Line Items Section */}
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Line Items & Deliverables ({lineItems.length})</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleAddLineItem}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Line Item</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {lineItems.map((item, idx) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      
                      {/* Description */}
                      <div className="col-span-5">
                        <input
                          type="text"
                          required
                          placeholder="Item Description..."
                          value={item.description}
                          onChange={(e) => handleUpdateLineItem(idx, 'description', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>

                      {/* Service Category */}
                      <div className="col-span-3">
                        <select
                          value={item.category}
                          onChange={(e) => handleUpdateLineItem(idx, 'category', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                        >
                          {billingConfig.invoiceServiceCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      {/* Qty / Hours */}
                      <div className="col-span-1">
                        <input
                          type="number"
                          min="1"
                          value={item.hoursOrQty}
                          onChange={(e) => handleUpdateLineItem(idx, 'hoursOrQty', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1.5 text-xs text-center font-mono text-white focus:outline-none focus:border-cyan-500"
                          title="Quantity / Hours"
                        />
                      </div>

                      {/* Rate */}
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => handleUpdateLineItem(idx, 'rate', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-right font-mono text-white focus:outline-none focus:border-cyan-500"
                          placeholder="Rate"
                        />
                      </div>

                      {/* Delete */}
                      <div className="col-span-1 text-right">
                        {lineItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLineItem(idx)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculations Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-slate-400 w-24">Tax Rate (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={newTaxRate}
                      onChange={(e) => setNewTaxRate(e.target.value)}
                      className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-[11px] text-slate-400 w-24">Discount ($):</label>
                    <input
                      type="number"
                      min="0"
                      value={newDiscount}
                      onChange={(e) => setNewDiscount(e.target.value)}
                      className="w-24 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-right sm:border-l sm:border-slate-800 sm:pl-4">
                  <div className="text-slate-400 text-[11px]">
                    Subtotal: <span className="font-mono text-white font-semibold">${computedSubtotal.toLocaleString()}</span>
                  </div>
                  {computedTaxAmount > 0 && (
                    <div className="text-slate-400 text-[11px]">
                      Tax ({newTaxRate}%): <span className="font-mono text-slate-200">+${computedTaxAmount.toLocaleString()}</span>
                    </div>
                  )}
                  {discountNum > 0 && (
                    <div className="text-slate-400 text-[11px]">
                      Discount: <span className="font-mono text-emerald-400">-${discountNum.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="text-sm font-bold text-white pt-1 border-t border-slate-800">
                    Total Payable: <span className="font-mono text-cyan-400">${computedTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Terms, Payment Method & Remittance Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Payment Due Terms</label>
                  <select
                    value={newPaymentTerms}
                    onChange={(e) => setNewPaymentTerms(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Due on Receipt">Due on Receipt (Immediate)</option>
                    <option value="Net 7">Net 7 Days</option>
                    <option value="Net 15">Net 15 Days</option>
                    <option value="Net 30">Net 30 Days</option>
                    <option value="Net 60">Net 60 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Accepted Payment Method</label>
                  <select
                    value={newPaymentMethod}
                    onChange={(e) => setNewPaymentMethod(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    {billingConfig.acceptedPaymentMethods.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Wire Instructions & Invoice Notes
                </label>
                <textarea
                  rows={2}
                  value={newInvoiceNotes}
                  onChange={(e) => setNewInvoiceNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-950 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Issue Invoice (${computedTotal.toLocaleString()})</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Income / Expense Modal */}
      <RecordTransactionModal
        isOpen={showRecordModal}
        onClose={() => setShowRecordModal(false)}
        accounts={accounts}
        businesses={businesses}
        initialType={recordInitialType}
        incomeCategories={billingConfig.incomeCategories}
        expenseCategories={billingConfig.expenseCategories}
        onAddNewCategory={(type, name) => onAddNewCategory(type, name)}
        onSave={(tx) => {
          onAddTransaction(tx);
          showToast(`${tx.type === 'income' ? 'Income' : 'Expense'} of $${tx.amount.toLocaleString()} recorded.`);
        }}
      />

      {/* Transfer Funds Between Accounts Modal */}
      <TransferFundsModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        accounts={accounts}
        businesses={businesses}
        onTransfer={(fromId, toId, amt, fee, note) => {
          onTransferFunds(fromId, toId, amt, fee, note);
          showToast(`Transferred $${amt.toLocaleString()} between accounts.`);
        }}
      />

      {/* Add / Edit Inventory Product Modal */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        businesses={businesses}
        categories={billingConfig.inventoryCategories}
        onAddNewCategory={(name) => onAddNewCategory('inventory', name)}
        initialProduct={editingProduct}
        onSave={(prod, id) => {
          if (id) {
            onUpdateProduct(prod, id);
            showToast(`Product "${prod.name}" updated in inventory catalog.`);
          } else {
            onAddProduct(prod);
            showToast(`New product "${prod.name}" added to inventory catalog.`);
          }
        }}
      />

      {/* Stock In / Out / Sale Adjustment Modal */}
      <StockAdjustmentModal
        isOpen={!!adjustingProduct}
        onClose={() => setAdjustingProduct(null)}
        product={adjustingProduct}
        accounts={accounts}
        onApplyAdjustment={(prodId, action, qty, notes, sync, targetAccId) => {
          onStockAdjustment(prodId, action, qty, notes, sync, targetAccId);
          showToast(`Stock updated: ${qty} units processed (${action}).`);
        }}
      />

      {/* Billing & Business Settings Customization Modal */}
      <BillingSettingsModal
        isOpen={showBillingSettingsModal}
        onClose={() => setShowBillingSettingsModal(false)}
        businesses={businesses}
        onAddBusiness={onAddBusiness}
        onEditBusiness={onEditBusiness}
        onDeleteBusiness={onDeleteBusiness}
        config={billingConfig}
        onSaveConfig={(updated) => {
          onUpdateBillingConfig(updated);
          showToast('Billing and treasury customizations saved.');
        }}
        initialTab={billingSettingsTab}
      />

      {/* Export to PDF/CSV/JSON Modal */}
      <ExportCSVModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        invoices={invoices}
        filteredInvoices={filteredInvoices}
        hasActiveFilters={selectedStatus !== 'all' || searchQuery.trim().length > 0}
        businesses={businesses}
        defaultFileType={exportDefaultType}
        onExportSuccess={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-cyan-500/50 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-md">
          <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium text-slate-200 flex-1">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
};
