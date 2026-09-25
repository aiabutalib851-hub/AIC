export type ClientTier = 'Starter AI' | 'Growth Copilot' | 'Enterprise Automation' | 'Custom Agent Suite';
export type ClientStatus = 'active' | 'onboarding' | 'proposal' | 'paused';

export interface Client {
  id: string;
  name: string;
  company: string;
  industry: string;
  avatarColor: string;
  status: ClientStatus;
  tier: ClientTier;
  monthlyFee: number;
  monthlyTokensLimit: number;
  monthlyTokensUsed: number;
  automationsCount: number;
  contactName: string;
  contactEmail: string;
  leadArchitect: string;
  joinedDate: string;
  healthScore: number; // 0-100
  activeSolutions: string[];
  website?: string;
  notes?: string;
}

export type AgentStatus = 'operational' | 'degraded' | 'paused' | 'deploying';
export type AgentCategory = 
  | 'Customer Support Copilot'
  | 'Inbound Lead Qualifier'
  | 'RAG Document Intelligence'
  | 'CRM & ERP Automation'
  | 'Voice & Omnichannel Agent'
  | 'Invoice & Financial Auditor';

export interface AIAgentSolution {
  id: string;
  name: string;
  category: AgentCategory;
  clientName: string;
  clientId: string;
  model: 'gemini-3.8-flash' | 'gemini-3.1-pro-preview' | 'gpt-4o' | 'claude-3.5-sonnet' | 'llama-3.3-70b';
  status: AgentStatus;
  uptimePct: number;
  avgLatencyMs: number;
  dailyRuns: number;
  monthlyRuns: number;
  errorRatePct: number;
  monthlyCost: number;
  systemPrompt: string;
  lastTuned: string;
  sampleInput: string;
  sampleOutput: string;
}

export type ProjectStage = 'discovery' | 'prompt_eng' | 'integration' | 'testing_uat' | 'production';
export type PriorityLevel = 'high' | 'medium' | 'low';

export interface PipelineProject {
  id: string;
  title: string;
  clientName: string;
  clientId: string;
  stage: ProjectStage;
  priority: PriorityLevel;
  progressPct: number;
  targetLaunchDate: string;
  budget: number;
  lead: string;
  deliverables: string[];
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft';

export interface InvoiceItem {
  description: string;
  category?: string;
  hoursOrQty: number;
  rate: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientId: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  subtotal: number;
  tax: number;
  taxRatePct?: number;
  discount?: number;
  total: number;
  items: InvoiceItem[];
  tags?: string[];
  serviceTier?: ClientTier;
  businessId?: string;
  accountId?: string;
  currency?: string;
  currencySymbol?: string;
  paymentTerms?: string;
  paymentMethod?: string;
  notes?: string;
}

// Multi-Business and Multi-Account Management
export interface BusinessEntity {
  id: string;
  name: string;
  legalName: string;
  code: string; // e.g. 'AIC', 'ACADEMY', 'ECOM'
  currency: 'USD' | 'BDT' | 'EUR';
  currencySymbol: string;
  color: string;
  tagline: string;
  taxId?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  activeAccountsCount?: number;
  isDefault?: boolean;
}

export type AccountType = 'bank' | 'wallet' | 'gateway' | 'card' | 'cash';

export interface FinancialAccount {
  id: string;
  businessId: string; // which business owns this, or 'all'
  name: string;
  institution: string; // e.g., 'Silicon Valley Bank', 'Wise Business', 'Standard Chartered BD', 'bKash Merchant'
  accountNumberMasked: string; // '...4892'
  type: AccountType;
  balance: number;
  currency: 'USD' | 'BDT' | 'EUR';
  currencySymbol: string;
  status: 'active' | 'frozen' | 'reconciling';
  lastReconciled: string;
  isDefault?: boolean;
}

export type TransactionType = 'income' | 'expense' | 'transfer';

export type IncomeCategory = 
  | 'Client Retainer'
  | 'AI Agent Setup Fee'
  | 'Consulting & Strategy'
  | 'Course & Academy Sales'
  | 'Product / E-Commerce Sales'
  | 'Affiliate / Referral'
  | 'Other Revenue'
  | string;

export type ExpenseCategory = 
  | 'Cloud & AI Token API'
  | 'Ad Spend (Meta/Google)'
  | 'Software & SaaS Tools'
  | 'Payroll & Contractor'
  | 'Hardware & Office'
  | 'Inventory Purchase'
  | 'Payment Gateway Fees'
  | 'Marketing & Production'
  | 'Legal & Compliance'
  | 'Miscellaneous'
  | string;

export interface FinancialTransaction {
  id: string;
  businessId: string;
  accountId: string;
  toAccountId?: string; // for transfer transactions
  type: TransactionType;
  category: IncomeCategory | ExpenseCategory | 'Account Transfer' | string;
  amount: number;
  currency: 'USD' | 'BDT' | 'EUR';
  currencySymbol: string;
  date: string;
  description: string;
  reference?: string; // invoice #, order #, or bank ref
  clientOrVendor?: string;
  status: 'cleared' | 'pending' | 'reconciled';
  tags?: string[];
  taxDeductible?: boolean;
}

// Multi-Product Inventory Management
export type InventoryCategory = 
  | 'AI Automation Toolkits'
  | 'Digital Courses & E-Books'
  | 'Meta Ads Template Packs'
  | 'Hardware / IoT Devices'
  | 'SaaS Licenses & Seat Passes'
  | 'Merchandise & Physical Goods'
  | string;

// Billing Customization Configuration
export interface BillingCustomizationConfig {
  incomeCategories: string[];
  expenseCategories: string[];
  inventoryCategories: string[];
  invoiceServiceCategories: string[];
  defaultTaxRatePct: number;
  defaultDiscountPct: number;
  invoicePrefix: string;
  defaultPaymentTerms: string;
  defaultCurrency: 'USD' | 'EUR' | 'GBP' | 'BDT';
  defaultCurrencySymbol: string;
  acceptedPaymentMethods: string[];
  defaultNotes: string;
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface InventoryProduct {
  id: string;
  businessId: string;
  sku: string;
  name: string;
  category: InventoryCategory;
  description: string;
  stockQty: number;
  reorderPoint: number;
  unitCost: number; // production or cost of goods
  sellingPrice: number; // retail/contract price
  currency: 'USD' | 'BDT' | 'EUR';
  currencySymbol: string;
  supplierOrPlatform: string;
  status: StockStatus;
  totalSold: number;
  lastRestocked: string;
  isDigital?: boolean;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'stock_in' | 'stock_out' | 'adjustment' | 'sale';
  quantity: number;
  unitCost?: number;
  sellingPrice?: number;
  date: string;
  reason: string;
  reference?: string;
  businessId: string;
}

export type BillingSubTab = 'invoices' | 'income_expense' | 'accounts' | 'inventory';


export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: 'agent_run' | 'client_update' | 'payment_received' | 'alert' | 'deployment';
  title: string;
  description: string;
  clientName?: string;
}

export type DashboardTab = 'overview' | 'founder' | 'blueprint' | 'services' | 'clients' | 'cro' | 'fleet' | 'pipeline' | 'billing' | 'copilot';

export type GrowthStage = 
  | 'diagnose' 
  | 'strategize' 
  | 'build' 
  | 'attract' 
  | 'convert' 
  | 'retain' 
  | 'scale';

export interface GrowthStageMeta {
  id: GrowthStage;
  stepNumber: number;
  label: string;
  labelBn: string;
  tagline: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export interface AicServiceItem {
  id: string;
  title: string;
  titleBn?: string;
  categoryNumber: number;
  categoryTitle: string;
  categoryTitleBn: string;
  growthStages: GrowthStage[];
  summary: string;
  deliverables: string[];
  businessImpact: string;
  deliverableTimeline: string;
  highlight?: boolean;
  isMajorService?: boolean;
  expertLead?: string;
  externalUrl?: string;
  internalTab?: DashboardTab;
}

export interface AicServiceCategory {
  id: string;
  number: number;
  title: string;
  titleBn: string;
  growthStages: GrowthStage[];
  description: string;
  iconName: string;
  accentColor: string;
  isMajor?: boolean;
  expertBadge?: string;
  services: AicServiceItem[];
}

export interface AicPackage {
  id: string;
  name: string;
  nameBn: string;
  tagline: string;
  bestFor: string;
  coreOutcome: string;
  investmentTier: string;
  turnaroundTime: string;
  keyDeliverables: string[];
  growthStages: GrowthStage[];
  isPopular?: boolean;
  highlightColor: string;
}

export type CroCategory = 
  | 'funnel_journey' 
  | 'above_the_fold' 
  | 'trust_proof' 
  | 'form_friction' 
  | 'speed_tech' 
  | 'analytics_tracking' 
  | 'checkout_cart' 
  | 'ab_testing';

export type CroPriority = 'critical' | 'high' | 'medium';
export type CroStatus = 'todo' | 'in_progress' | 'completed';

export interface CroChecklistItem {
  id: string;
  title: string;
  category: CroCategory;
  categoryLabel: string;
  priority: CroPriority;
  status: CroStatus;
  estimatedImpact: string;
  whyCrucial: string;
  actionSteps: string[];
  recommendationNotes?: string;
  testedVariant?: string;
  source: 'checklist' | 'file_upload' | 'custom';
}

export interface CroUploadedFile {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  fileCategory: 'analytics_csv' | 'screenshot_ui' | 'heatmap_export' | 'wireframe_doc';
  findingsCount: number;
  extractedFindings: Array<{
    issue: string;
    frictionType: string;
    impact: 'High' | 'Medium' | 'Critical';
    suggestedFix: string;
  }>;
}

export interface CroAuditProfile {
  id: string;
  businessName: string;
  websiteUrl: string;
  industry: string;
  monthlyVisitors: number;
  currentConvRate: number; // percentage e.g. 1.8
  targetConvRate: number;  // percentage e.g. 3.2
  averageOrderValue: number; // $ value
  monthlyAdSpend: number; // $ value
  healthScore: number; // 0-100
  auditStatus: 'in_progress' | 'audit_ready' | 'delivered';
  targetAudience: string;
  executiveSummary: string;
}

export type UserRole = 'admin' | 'client' | 'manager' | 'specialist';

export interface TopicPermissionMeta {
  id: DashboardTab;
  name: string;
  nameBn: string;
  description: string;
  category: 'Core' | 'Marketing' | 'Consulting' | 'Audits' | 'Financial';
  iconName: string;
  isSensitive?: boolean;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  company?: string;
  phone?: string;
  allowedTabs: DashboardTab[];
  createdAt: string;
  lastLoginAt?: string;
  notes?: string;
}
