/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { OverviewView } from './components/OverviewView';
import { ClientsView } from './components/ClientsView';
import { AgentFleetView } from './components/AgentFleetView';
import { PipelineView } from './components/PipelineView';
import { BillingView } from './components/BillingView';
import { CroReportView } from './components/CroReportView';
import { AiCopilotView } from './components/AiCopilotView';
import { AicServicesCatalogView } from './components/AicServicesCatalogView';
import { MetaAdsBlueprintView } from './components/MetaAdsBlueprintView';
import { FounderProfileView } from './components/FounderProfileView';
import { WhatsAppFloatingWidget } from './components/WhatsAppFloatingWidget';
import { ClientPortalView } from './components/ClientPortalView';
import { NewClientModal } from './components/NewClientModal';
import { DeployAgentModal } from './components/DeployAgentModal';
import { EditClientModal } from './components/EditClientModal';
import { LockedTopicView } from './components/LockedTopicView';
import { AuthModal } from './components/AuthModal';
import { UserAccessManagerModal } from './components/UserAccessManagerModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AIC_AGENCY_INFO } from './data/agencyInfo';
import { Phone, ChevronDown, MessageSquare, Mail, Globe, ExternalLink, QrCode, HelpCircle, Copy, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { HelpCenterModal } from './components/HelpCenterModal';

import { 
  INITIAL_CLIENTS, 
  INITIAL_AGENTS, 
  INITIAL_PROJECTS, 
  INITIAL_INVOICES, 
  INITIAL_ACTIVITIES 
} from './data/initialData';

import {
  INITIAL_BUSINESSES,
  INITIAL_ACCOUNTS,
  INITIAL_TRANSACTIONS,
  INITIAL_PRODUCTS,
  INITIAL_MOVEMENTS,
  DEFAULT_BILLING_CUSTOMIZATION
} from './data/financeInventoryData';

import { 
  Client, 
  AIAgentSolution, 
  PipelineProject, 
  Invoice, 
  ActivityEvent, 
  DashboardTab, 
  ProjectStage, 
  InvoiceStatus,
  BusinessEntity,
  FinancialAccount,
  FinancialTransaction,
  InventoryProduct,
  InventoryMovement,
  BillingCustomizationConfig
} from './types';
import { assignInvoiceTags } from './utils/invoiceTagging';

import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';

function MainDashboardApp() {
  const { t, isBangla } = useLanguage();
  const { 
    currentUser, 
    hasAccess, 
    authModalOpen, 
    setAuthModalOpen, 
    userAccessModalOpen, 
    setUserAccessModalOpen 
  } = useAuth();

  // Navigation & View State
  const [currentTab, setCurrentTab] = useState<DashboardTab>('overview');
  const [activeClientPortalId, setActiveClientPortalId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copilotInitialService, setCopilotInitialService] = useState<string | undefined>();
  const [copilotInitialNotes, setCopilotInitialNotes] = useState<string | undefined>();

  // If user switches or logs in and currentTab is restricted, route them to their first allowed tab
  React.useEffect(() => {
    if (currentUser && !hasAccess(currentTab)) {
      if (currentUser.allowedTabs.length > 0) {
        setCurrentTab(currentUser.allowedTabs[0]);
      }
    }
  }, [currentUser]);

  // Primary Data State
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [agents, setAgents] = useState<AIAgentSolution[]>(INITIAL_AGENTS);
  const [projects, setProjects] = useState<PipelineProject[]>(INITIAL_PROJECTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [activities, setActivities] = useState<ActivityEvent[]>(INITIAL_ACTIVITIES);

  // Multi-Business, Multi-Account Finance & Multi-Product Inventory State
  const [businesses, setBusinesses] = useState<BusinessEntity[]>(() => {
    try {
      const saved = localStorage.getItem('aic_businesses');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved businesses', e);
    }
    return INITIAL_BUSINESSES;
  });
  const [accounts, setAccounts] = useState<FinancialAccount[]>(INITIAL_ACCOUNTS);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);
  const [products, setProducts] = useState<InventoryProduct[]>(INITIAL_PRODUCTS);
  const [movements, setMovements] = useState<InventoryMovement[]>(INITIAL_MOVEMENTS);

  // Billing Customization Configuration (Categories, Defaults, Prefixes, Taxes)
  const [billingConfig, setBillingConfig] = useState<BillingCustomizationConfig>(() => {
    try {
      const saved = localStorage.getItem('aic_billing_customization');
      if (saved) {
        return { ...DEFAULT_BILLING_CUSTOMIZATION, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load saved billing customization', e);
    }
    return DEFAULT_BILLING_CUSTOMIZATION;
  });

  const handleUpdateBillingConfig = (updated: BillingCustomizationConfig) => {
    setBillingConfig(updated);
    try {
      localStorage.setItem('aic_billing_customization', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist billing configuration', e);
    }
  };

  const handleAddNewCategory = (
    type: 'income' | 'expense' | 'inventory' | 'invoice_service', 
    categoryName: string
  ) => {
    const trimmed = categoryName.trim();
    if (!trimmed) return;
    setBillingConfig(prev => {
      let updated = { ...prev };
      if (type === 'income' && !prev.incomeCategories.includes(trimmed)) {
        updated.incomeCategories = [...prev.incomeCategories, trimmed];
      } else if (type === 'expense' && !prev.expenseCategories.includes(trimmed)) {
        updated.expenseCategories = [...prev.expenseCategories, trimmed];
      } else if (type === 'inventory' && !prev.inventoryCategories.includes(trimmed)) {
        updated.inventoryCategories = [...prev.inventoryCategories, trimmed];
      } else if (type === 'invoice_service' && !prev.invoiceServiceCategories.includes(trimmed)) {
        updated.invoiceServiceCategories = [...prev.invoiceServiceCategories, trimmed];
      }
      try {
        localStorage.setItem('aic_billing_customization', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleAddBusiness = (newBiz: Omit<BusinessEntity, 'id'>) => {
    const created: BusinessEntity = {
      ...newBiz,
      id: `bus-${Date.now()}`
    };
    setBusinesses(prev => {
      const next = [...prev, created];
      try {
        localStorage.setItem('aic_businesses', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    // Also provision an active operating account for this new business
    const initialAccount: FinancialAccount = {
      id: `acc-${Date.now()}`,
      businessId: created.id,
      name: `${created.name} Operating Treasury`,
      institution: 'Silicon Valley Bank / Stripe Merchant',
      accountNumberMasked: `...${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'bank',
      balance: 10000,
      currency: (created.currency as any) || 'USD',
      currencySymbol: created.currencySymbol || '$',
      status: 'active',
      lastReconciled: 'Just now',
      isDefault: true
    };
    setAccounts(prev => [...prev, initialAccount]);

    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        type: 'client_update',
        title: 'New Business Entity Configured',
        description: `Registered "${created.name}" (${created.code}) with dedicated treasury account.`,
      },
      ...prev,
    ]);
  };

  const handleEditBusiness = (updatedBiz: BusinessEntity) => {
    setBusinesses(prev => {
      const next = prev.map(b => (b.id === updatedBiz.id ? updatedBiz : b));
      try {
        localStorage.setItem('aic_businesses', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleDeleteBusiness = (bizId: string) => {
    setBusinesses(prev => {
      const next = prev.filter(b => b.id !== bizId);
      try {
        localStorage.setItem('aic_businesses', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Modal State
  const [isNewClientOpen, setIsNewClientOpen] = useState<boolean>(false);
  const [isDeployAgentOpen, setIsDeployAgentOpen] = useState<boolean>(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isFooterContactOpen, setIsFooterContactOpen] = useState<boolean>(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState<boolean>(false);
  const [showWhatsAppToast, setShowWhatsAppToast] = useState<boolean>(false);
  const toastTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Copy WhatsApp Connection Link Handler & Toast Notification Trigger
  const handleCopyWhatsAppLink = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(AIC_AGENCY_INFO.whatsappUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = AIC_AGENCY_INFO.whatsappUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      // Trigger subtle toast notification sliding in from bottom right
      setShowWhatsAppToast(true);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        setShowWhatsAppToast(false);
      }, 3500);
    } catch (err) {
      console.error('Failed to copy WhatsApp link', err);
    }
  };

  // Handlers
  const handleAddClient = (newClient: Client) => {
    setClients(prev => [newClient, ...prev]);
    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        type: 'client_update',
        title: 'New Client Onboarded',
        description: `${newClient.name} added to ${newClient.tier} ($${newClient.monthlyFee.toLocaleString()}/mo).`,
        clientName: newClient.name,
      },
      ...prev,
    ]);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
  };

  const handleEditClient = (updatedClient: Client) => {
    setClients(prev => prev.map(c => (c.id === updatedClient.id ? updatedClient : c)));
  };

  const handleDeployAgent = (newAgent: AIAgentSolution) => {
    setAgents(prev => [newAgent, ...prev]);
    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        type: 'deployment',
        title: 'AI Agent Deployed',
        description: `${newAgent.name} hot-deployed on ${newAgent.model}.`,
        clientName: newAgent.clientName,
      },
      ...prev,
    ]);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  };

  const handleUpdateProjectStage = (projectId: string, newStage: ProjectStage) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const progressMap: Record<ProjectStage, number> = {
            discovery: 20,
            prompt_eng: 40,
            integration: 65,
            testing_uat: 85,
            production: 100,
          };
          return { ...p, stage: newStage, progressPct: progressMap[newStage] };
        }
        return p;
      })
    );
  };

  const handleAddNewProject = (project: Omit<PipelineProject, 'id'>) => {
    const newProj: PipelineProject = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const handleAddNewInvoice = (inv: Omit<Invoice, 'id'>) => {
    const client = clients.find(c => c.id === inv.clientId);
    const tier = inv.serviceTier || client?.tier;
    const assignedTags = inv.tags && inv.tags.length > 0
      ? inv.tags
      : assignInvoiceTags(tier);

    const newInv: Invoice = {
      ...inv,
      id: `inv-${Date.now()}`,
      serviceTier: tier,
      tags: assignedTags,
    };
    setInvoices(prev => [newInv, ...prev]);
  };

  const handleUpdateInvoiceStatus = (invoiceId: string, status: InvoiceStatus) => {
    setInvoices(prev =>
      prev.map(inv => (inv.id === invoiceId ? { ...inv, status } : inv))
    );
    if (status === 'paid') {
      const targetInv = invoices.find(i => i.id === invoiceId);
      if (targetInv) {
        setActivities(prev => [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            type: 'payment_received',
            title: `Payment Cleared ($${targetInv.total.toLocaleString()})`,
            description: `${targetInv.clientName} settled invoice ${targetInv.invoiceNumber}.`,
            clientName: targetInv.clientName,
          },
          ...prev,
        ]);
      }
    }
  };

  // Finance & Treasury Handlers
  const handleAddTransaction = (newTxData: Omit<FinancialTransaction, 'id'>) => {
    const newTx: FinancialTransaction = {
      ...newTxData,
      id: `tx-${Date.now()}`
    };

    setTransactions(prev => [newTx, ...prev]);

    // Update account balance
    setAccounts(prev => prev.map(acc => {
      if (acc.id === newTx.accountId) {
        const delta = newTx.type === 'income' ? newTx.amount : -newTx.amount;
        return {
          ...acc,
          balance: acc.balance + delta
        };
      }
      return acc;
    }));

    // Log agency activity
    const business = businesses.find(b => b.id === newTx.businessId);
    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        type: newTx.type === 'income' ? 'payment_received' : 'client_update',
        title: `${newTx.type === 'income' ? 'Income' : 'Expense'} Logged: $${newTx.amount.toLocaleString()}`,
        description: `[${business?.name || 'Treasury'}] ${newTx.description} (${newTx.category})`,
        clientName: business?.name || 'AIC Treasury',
      },
      ...prev,
    ]);

    if (newTx.type === 'income') {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleDeleteTransaction = (txId: string) => {
    const tx = transactions.find(t => t.id === txId);
    if (!tx) return;

    // Reverse account balance effect
    setAccounts(prev => prev.map(acc => {
      if (acc.id === tx.accountId) {
        const delta = tx.type === 'income' ? -tx.amount : tx.amount;
        return {
          ...acc,
          balance: acc.balance + delta
        };
      }
      return acc;
    }));

    setTransactions(prev => prev.filter(t => t.id !== txId));
  };

  const handleTransferFunds = (
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    fee: number,
    note: string
  ) => {
    const fromAcc = accounts.find(a => a.id === fromAccountId);
    const toAcc = accounts.find(a => a.id === toAccountId);
    if (!fromAcc || !toAcc) return;

    const transferRef = `TRF-${Date.now().toString().slice(-6)}`;

    // Update source and target account balances
    setAccounts(prev => prev.map(acc => {
      if (acc.id === fromAccountId) {
        return { ...acc, balance: acc.balance - (amount + fee) };
      }
      if (acc.id === toAccountId) {
        return { ...acc, balance: acc.balance + amount };
      }
      return acc;
    }));

    // Create twin ledger transaction records
    const outTx: FinancialTransaction = {
      id: `tx-${Date.now()}-out`,
      businessId: fromAcc.businessId,
      accountId: fromAccountId,
      toAccountId: toAccountId,
      type: 'transfer',
      category: 'Account Transfer',
      amount: amount + fee,
      currency: fromAcc.currency,
      currencySymbol: fromAcc.currencySymbol,
      description: `Transfer to ${toAcc.name}: ${note || 'Liquidity reallocation'} (Fee: $${fee})`,
      date: new Date().toISOString().split('T')[0],
      reference: transferRef,
      status: 'cleared'
    };

    const inTx: FinancialTransaction = {
      id: `tx-${Date.now()}-in`,
      businessId: toAcc.businessId,
      accountId: toAccountId,
      type: 'income',
      category: 'Account Transfer',
      amount: amount,
      currency: toAcc.currency,
      currencySymbol: toAcc.currencySymbol,
      description: `Transfer from ${fromAcc.name}: ${note || 'Liquidity reallocation'}`,
      date: new Date().toISOString().split('T')[0],
      reference: transferRef,
      status: 'cleared'
    };

    setTransactions(prev => [outTx, inTx, ...prev]);

    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        type: 'client_update',
        title: `Inter-Account Transfer: $${amount.toLocaleString()}`,
        description: `Moved from ${fromAcc.name} to ${toAcc.name}. Ref: ${transferRef}`,
        clientName: 'Treasury Ops',
      },
      ...prev,
    ]);

    confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
  };

  // Inventory Management Handlers
  const handleAddProduct = (newProdData: Omit<InventoryProduct, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const newProd: InventoryProduct = {
      ...newProdData,
      id: newId
    };

    setProducts(prev => [newProd, ...prev]);

    if (newProd.stockQty > 0) {
      const initMovement: InventoryMovement = {
        id: `mov-${Date.now()}`,
        productId: newId,
        productName: newProd.name,
        type: 'stock_in',
        quantity: newProd.stockQty,
        unitCost: newProd.unitCost,
        date: new Date().toISOString().split('T')[0],
        reason: 'Initial inventory catalog setup',
        businessId: newProd.businessId
      };
      setMovements(prev => [initMovement, ...prev]);
    }
  };

  const handleUpdateProduct = (updatedProdData: Omit<InventoryProduct, 'id'>, prodId?: string) => {
    if (!prodId) return;
    setProducts(prev => prev.map(p => (p.id === prodId ? { ...updatedProdData, id: prodId } : p)));
  };

  const handleDeleteProduct = (prodId: string) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  const handleStockAdjustment = (
    productId: string,
    action: 'sale' | 'stock_in' | 'adjustment',
    quantity: number,
    notes: string,
    syncWithFinance: boolean,
    targetAccountId?: string
  ) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const prevStock = prod.stockQty;
    let newStock = prevStock;

    if (action === 'sale') {
      newStock = Math.max(0, prevStock - quantity);
    } else if (action === 'stock_in') {
      newStock = prevStock + quantity;
    } else {
      // Direct adjustment replaces stock count
      newStock = quantity;
    }

    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, stockQty: newStock } : p)));

    const refNum = action === 'sale' ? `ORD-${Date.now().toString().slice(-6)}` : undefined;

    // Record inventory ledger movement
    const newMov: InventoryMovement = {
      id: `mov-${Date.now()}`,
      productId: prod.id,
      productName: prod.name,
      type: action === 'sale' ? 'sale' : action === 'stock_in' ? 'stock_in' : 'adjustment',
      quantity: action === 'adjustment' ? Math.abs(newStock - prevStock) : quantity,
      unitCost: prod.unitCost,
      sellingPrice: prod.sellingPrice,
      date: new Date().toISOString().split('T')[0],
      reference: refNum,
      reason: notes || `Stock updated via ${action}`,
      businessId: prod.businessId
    };

    setMovements(prev => [newMov, ...prev]);

    // Financial synchronization with Treasury accounts
    if (syncWithFinance && targetAccountId) {
      const targetAcc = accounts.find(a => a.id === targetAccountId);
      if (targetAcc) {
        if (action === 'sale') {
          const revenueAmount = prod.sellingPrice * quantity;
          handleAddTransaction({
            businessId: prod.businessId,
            accountId: targetAccountId,
            type: 'income',
            category: 'Product / E-Commerce Sales',
            amount: revenueAmount,
            currency: targetAcc.currency,
            currencySymbol: targetAcc.currencySymbol,
            description: `Product Sale: ${quantity}x ${prod.name} (${notes || 'Direct checkout'})`,
            date: new Date().toISOString().split('T')[0],
            reference: refNum,
            status: 'cleared'
          });
        } else if (action === 'stock_in') {
          const costAmount = prod.unitCost * quantity;
          handleAddTransaction({
            businessId: prod.businessId,
            accountId: targetAccountId,
            type: 'expense',
            category: 'Inventory Purchase',
            amount: costAmount,
            currency: targetAcc.currency,
            currencySymbol: targetAcc.currencySymbol,
            description: `Inventory Restock: ${quantity}x ${prod.name}`,
            date: new Date().toISOString().split('T')[0],
            status: 'cleared'
          });
        }
      }
    }
  };

  const selectedPortalClient = clients.find(c => c.id === activeClientPortalId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Global Header */}
      <Header
        clients={clients}
        activeClientPortalId={activeClientPortalId}
        onSelectClientPortal={(cId) => setActiveClientPortalId(cId)}
        onOpenNewClient={() => setIsNewClientOpen(true)}
        onOpenDeployAgent={() => setIsDeployAgentOpen(true)}
        onOpenCopilot={() => {
          setActiveClientPortalId(null);
          setCurrentTab('copilot');
        }}
        onNavigateTab={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      {selectedPortalClient ? (
        /* Dedicated Client Portal Simulation Mode */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ClientPortalView
            client={selectedPortalClient}
            agents={agents}
            onExitPortal={() => setActiveClientPortalId(null)}
          />
        </main>
      ) : (
        /* Agency Executive Administration Hub */
        <>
          <Navigation
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            clientsCount={clients.length}
            agentsCount={agents.length}
            projectsCount={projects.length}
            pendingInvoicesCount={invoices.filter(i => i.status === 'pending').length}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {!hasAccess(currentTab) ? (
              <LockedTopicView
                targetTab={currentTab}
                onNavigateTab={setCurrentTab}
              />
            ) : (
              <>
                {currentTab === 'overview' && (
                  <OverviewView
                    clients={clients}
                    agents={agents}
                    projects={projects}
                    invoices={invoices}
                    activities={activities}
                    onNavigateTab={setCurrentTab}
                    onSelectClientPortal={(cId) => setActiveClientPortalId(cId)}
                    onOpenDeployAgent={() => setIsDeployAgentOpen(true)}
                    onOpenCopilot={() => setCurrentTab('copilot')}
                  />
                )}

            {currentTab === 'founder' && (
              <FounderProfileView
                onSelectTab={setCurrentTab}
                onOpenCopilotWithContext={(topic, details) => {
                  setCopilotInitialService(`Founder Strategy: ${topic}`);
                  setCopilotInitialNotes(`Founder Inquiry Context: ${topic}. ${details}`);
                  setCurrentTab('copilot');
                }}
              />
            )}

            {currentTab === 'blueprint' && (
              <MetaAdsBlueprintView
                onSelectTab={setCurrentTab}
                onOpenCopilotWithContext={(topic, details) => {
                  setCopilotInitialService(`Meta Ads Strategy: ${topic}`);
                  setCopilotInitialNotes(`Blueprint Implementation Context: ${topic}. ${details}`);
                  setCurrentTab('copilot');
                }}
              />
            )}

            {currentTab === 'services' && (
              <AicServicesCatalogView
                onSelectTab={setCurrentTab}
                onOpenCopilotWithService={(serviceTitle, category) => {
                  setCopilotInitialService(serviceTitle);
                  setCopilotInitialNotes(`Selected from AIC Strategic Service Catalog: ${category} - ${serviceTitle}. Prepare an executive scope of work with milestone timelines and deliverables.`);
                  setCurrentTab('copilot');
                }}
              />
            )}

            {currentTab === 'clients' && (
              <ClientsView
                clients={clients}
                onOpenNewClient={() => setIsNewClientOpen(true)}
                onSelectClientPortal={(cId) => setActiveClientPortalId(cId)}
                onEditClient={(client) => setEditingClient(client)}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'fleet' && (
              <AgentFleetView
                agents={agents}
                clients={clients}
                onOpenDeployAgent={() => setIsDeployAgentOpen(true)}
                searchQuery={searchQuery}
              />
            )}

            {currentTab === 'pipeline' && (
              <PipelineView
                projects={projects}
                clients={clients}
                onUpdateProjectStage={handleUpdateProjectStage}
                onAddNewProject={handleAddNewProject}
              />
            )}

            {currentTab === 'billing' && (
              <BillingView
                invoices={invoices}
                clients={clients}
                onAddNewInvoice={handleAddNewInvoice}
                onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
                searchQuery={searchQuery}
                accounts={accounts}
                businesses={businesses}
                transactions={transactions}
                products={products}
                movements={movements}
                billingConfig={billingConfig}
                onUpdateBillingConfig={handleUpdateBillingConfig}
                onAddNewCategory={handleAddNewCategory}
                onAddBusiness={handleAddBusiness}
                onEditBusiness={handleEditBusiness}
                onDeleteBusiness={handleDeleteBusiness}
                onAddTransaction={handleAddTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onTransferFunds={handleTransferFunds}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
                onStockAdjustment={handleStockAdjustment}
              />
            )}

            {currentTab === 'cro' && (
              <CroReportView clients={clients} />
            )}

            {currentTab === 'copilot' && (
              <AiCopilotView 
                clients={clients} 
                initialServiceType={copilotInitialService}
                initialNotes={copilotInitialNotes}
              />
            )}
              </>
            )}
          </main>
        </>
      )}

      {/* Modals */}
      <NewClientModal
        isOpen={isNewClientOpen}
        onClose={() => setIsNewClientOpen(false)}
        onAddClient={handleAddClient}
      />

      <DeployAgentModal
        isOpen={isDeployAgentOpen}
        onClose={() => setIsDeployAgentOpen(false)}
        clients={clients}
        onDeployAgent={handleDeployAgent}
      />

      <EditClientModal
        client={editingClient}
        isOpen={Boolean(editingClient)}
        onClose={() => setEditingClient(null)}
        onSaveClient={handleEditClient}
      />

      {/* Authentication & Topic Access Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessRoleSwitch={(targetTab) => {
          if (targetTab) {
            setCurrentTab(targetTab);
          }
        }}
      />

      <UserAccessManagerModal
        isOpen={userAccessModalOpen}
        onClose={() => setUserAccessModalOpen(false)}
      />

      {/* Educational Help Center & User Guide Modal */}
      <HelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        onNavigateTab={setCurrentTab}
      />

      {/* Official Abrar IT Care - AIC Agency Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="font-bold text-white text-sm flex items-center justify-center sm:justify-start gap-2">
                <span>{AIC_AGENCY_INFO.name}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {t('footer.official', 'OFFICIAL')}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                {AIC_AGENCY_INFO.tagline} • {t('footer.directedBy', 'Directed by')} <strong className="text-slate-300 font-medium">{AIC_AGENCY_INFO.director}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
              {/* Help Center Link / Trigger Button */}
              <button
                type="button"
                id="footer-help-center-trigger"
                onClick={() => setIsHelpCenterOpen(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)] transition-all duration-200 flex items-center gap-1.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={t('footer.helpCenter', 'Help Center')}
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('footer.helpCenter', 'Help Center')}</span>
              </button>

              {/* Clean 'Contact Us' Trigger Button with Keyboard Support */}
              <button
                type="button"
                id="footer-contact-us-trigger"
                onClick={() => setIsFooterContactOpen((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
                    e.preventDefault();
                    setIsFooterContactOpen((prev) => !prev);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 flex items-center gap-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  isFooterContactOpen
                    ? 'bg-slate-800 text-white border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                }`}
                aria-expanded={isFooterContactOpen}
                aria-controls="footer-contact-channels-panel"
                aria-label={isFooterContactOpen ? t('footer.hideContact', "Hide contact channels") : t('footer.showContact', "Show contact channels")}
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('header.contactUs', 'Contact Us')}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isFooterContactOpen ? 'rotate-180 text-cyan-300' : ''}`} />
              </button>

              {/* Language Switcher - Positioned directly after Contact */}
              <LanguageToggle compact={true} />
            </div>
          </div>

          {/* Collapsible Contact Channels Panel with Smooth Motion Animation */}
          <AnimatePresence>
            {isFooterContactOpen && (
              <motion.div 
                id="footer-contact-channels-panel"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5 font-medium">
                    <a 
                      href={AIC_AGENCY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-md bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 hover:border-emerald-400/80 hover:shadow-[0_0_12px_rgba(16,185,129,0.35)] text-emerald-300 hover:text-emerald-200 transition-all duration-200 flex items-center gap-1.5 font-bold hover:-translate-y-0.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp: {AIC_AGENCY_INFO.whatsapp}</span>
                    </a>

                    <a 
                      href={`tel:${AIC_AGENCY_INFO.phone}`}
                      className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-400/70 hover:shadow-[0_0_12px_rgba(251,191,36,0.25)] text-slate-300 hover:text-amber-200 transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400/80" />
                      <span>{AIC_AGENCY_INFO.phone}</span>
                    </a>

                    <a 
                      href={`mailto:${AIC_AGENCY_INFO.email}`}
                      className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-violet-400/70 hover:shadow-[0_0_12px_rgba(167,139,250,0.25)] text-slate-300 hover:text-violet-200 transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-violet-400/80" />
                      <span>{AIC_AGENCY_INFO.email}</span>
                    </a>

                    <a 
                      href={AIC_AGENCY_INFO.founderPortfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-400/80 hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] text-cyan-300 hover:text-cyan-100 transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                    >
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{AIC_AGENCY_INFO.founderPortfolioDisplay}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>

                    <a 
                      href={AIC_AGENCY_INFO.founderAcademyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-400/80 hover:shadow-[0_0_12px_rgba(129,140,248,0.3)] text-indigo-300 hover:text-indigo-100 transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                    >
                      <Globe className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{AIC_AGENCY_INFO.founderAcademyDisplay}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>

                    <a 
                      href={AIC_AGENCY_INFO.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-blue-400/80 hover:shadow-[0_0_12px_rgba(96,165,250,0.3)] text-blue-400 hover:text-blue-200 transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                    >
                      <span>{AIC_AGENCY_INFO.facebookDisplay}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  </div>

                  {/* QR Code Quick Scan Element & Alternative Copy Link */}
                  <div className="shrink-0 flex items-center gap-2">
                    <a
                      href={AIC_AGENCY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      id="footer-qr-code-link"
                      title="Scan with phone camera or click to message WhatsApp directly"
                      className="p-1.5 pr-3 rounded-lg bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-400/80 hover:shadow-[0_0_14px_rgba(16,185,129,0.3)] transition-all duration-200 flex items-center gap-2.5 group hover:-translate-y-0.5"
                    >
                      <div className="bg-white p-1 rounded-md shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <QRCodeSVG
                          value={AIC_AGENCY_INFO.whatsappUrl}
                          size={46}
                          bgColor="#ffffff"
                          fgColor="#090d16"
                          level="M"
                        />
                      </div>
                      <div className="text-left leading-tight">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1">
                          <QrCode className="w-3 h-3" />
                          <span>{t('footer.scanToConnect', 'Scan to Connect')}</span>
                        </div>
                        <div className="text-xs font-bold text-slate-200 group-hover:text-white mt-0.5">
                          {t('footer.whatsAppDirect', 'WhatsApp Direct')}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {AIC_AGENCY_INFO.whatsapp}
                        </div>
                      </div>
                    </a>

                    {/* Copy Link Button next to QR Code area */}
                    <button
                      type="button"
                      id="footer-copy-whatsapp-link-btn"
                      onClick={handleCopyWhatsAppLink}
                      title={t('footer.copyLink', 'Copy Link')}
                      className="relative self-stretch px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-850 hover:border-emerald-400/80 text-slate-300 hover:text-white transition-all duration-200 flex flex-col items-center justify-center gap-1 text-[11px] font-medium shadow-sm group hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-95"
                      aria-label={t('footer.copyLink', 'Copy Link')}
                    >
                      <Copy className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                      <span className="text-[10px] text-slate-300 group-hover:text-emerald-300 whitespace-nowrap">
                        {t('footer.copyLink', 'Copy Link')}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-3 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <span>
              Abrar Academy & Abrar IT Care – AIC Digital Growth Infrastructure • Founder: Abu Talib
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsHelpCenterOpen(true)}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1 font-medium text-slate-400 hover:underline"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('footer.helpCenter', 'Help Center')}</span>
              </button>
              <span className="text-slate-700">•</span>
              <span className="font-mono text-[11px] text-slate-600">
                v2.5.0 • Meta Andromeda & Enterprise AI
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Widget */}
      <WhatsAppFloatingWidget />

      {/* Subtle Toast Notification (Slides in from bottom right) */}
      <AnimatePresence>
        {showWhatsAppToast && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, y: 10, scale: 0.95 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] sm:w-auto bg-slate-900/95 border border-emerald-500/50 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-[0_12px_36px_-6px_rgba(0,0,0,0.7),0_0_24px_rgba(16,185,129,0.25)] flex items-center gap-3"
            role="status"
            aria-live="polite"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span>{t('toast.whatsappCopied.title', 'WhatsApp Link Copied')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                {t('toast.whatsappCopied.desc', 'Connection link copied to clipboard. Ready to share!')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowWhatsAppToast(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainDashboardApp />
      </AuthProvider>
    </LanguageProvider>
  );
}

