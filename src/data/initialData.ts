import { Client, AIAgentSolution, PipelineProject, Invoice, ActivityEvent } from '../types';
import { assignInvoiceTags } from '../utils/invoiceTagging';

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'client-1',
    name: 'Nexus Healthtech',
    company: 'Nexus Healthtech Inc.',
    industry: 'Healthcare & Clinical Software',
    avatarColor: 'from-blue-500 to-indigo-600',
    status: 'active',
    tier: 'Enterprise Automation',
    monthlyFee: 8500,
    monthlyTokensLimit: 1200000,
    monthlyTokensUsed: 840500,
    automationsCount: 4,
    contactName: 'Dr. Sarah Lin',
    contactEmail: 's.lin@nexushealth.io',
    leadArchitect: 'Abu Talib',
    joinedDate: '2024-01-15',
    healthScore: 98,
    activeSolutions: ['agent-1', 'agent-6'],
    website: 'https://nexushealth.io',
    notes: 'HIPAA compliant RAG agent + Patient Triage Voice Copilot deployed.'
  },
  {
    id: 'client-2',
    name: 'Aura Commerce',
    company: 'Aura Luxury Retail Group',
    industry: 'E-Commerce & DTC Retail',
    avatarColor: 'from-amber-500 to-rose-600',
    status: 'active',
    tier: 'Growth Copilot',
    monthlyFee: 4500,
    monthlyTokensLimit: 600000,
    monthlyTokensUsed: 420000,
    automationsCount: 3,
    contactName: 'Marcus Vance',
    contactEmail: 'marcus@auracommerce.co',
    leadArchitect: 'Abu Talib',
    joinedDate: '2024-03-20',
    healthScore: 94,
    activeSolutions: ['agent-2'],
    website: 'https://auracommerce.co',
    notes: 'Shopify order status copilot + dynamic VIP returns concierge.'
  },
  {
    id: 'client-3',
    name: 'Veritas Financial',
    company: 'Veritas Wealth & Asset Mgmt',
    industry: 'FinTech & Capital Advisory',
    avatarColor: 'from-emerald-500 to-teal-700',
    status: 'active',
    tier: 'Custom Agent Suite',
    monthlyFee: 12000,
    monthlyTokensLimit: 2500000,
    monthlyTokensUsed: 1980000,
    automationsCount: 5,
    contactName: 'Eleanor Sterling',
    contactEmail: 'eleanor@veritasasset.com',
    leadArchitect: 'Abu Talib',
    joinedDate: '2023-11-04',
    healthScore: 99,
    activeSolutions: ['agent-3'],
    website: 'https://veritasasset.com',
    notes: 'SEC filing parser, automated KYC checks and Portfolio commentary generator.'
  },
  {
    id: 'client-4',
    name: 'Elevate Talent',
    company: 'Elevate Tech Recruiting Ltd',
    industry: 'Human Resources & Staffing',
    avatarColor: 'from-violet-500 to-purple-700',
    status: 'active',
    tier: 'Starter AI',
    monthlyFee: 2500,
    monthlyTokensLimit: 300000,
    monthlyTokensUsed: 190400,
    automationsCount: 2,
    contactName: 'Julian Hayes',
    contactEmail: 'julian@elevatetalent.ai',
    leadArchitect: 'Abu Talib',
    joinedDate: '2024-05-10',
    healthScore: 91,
    activeSolutions: ['agent-4'],
    website: 'https://elevatetalent.ai',
    notes: 'Resume parsing and personalized LinkedIn outreach agent.'
  },
  {
    id: 'client-5',
    name: 'Horizon Real Estate',
    company: 'Horizon Global Properties',
    industry: 'Commercial & Residential RE',
    avatarColor: 'from-cyan-500 to-blue-700',
    status: 'active',
    tier: 'Growth Copilot',
    monthlyFee: 4500,
    monthlyTokensLimit: 600000,
    monthlyTokensUsed: 310500,
    automationsCount: 2,
    contactName: 'Tariq Mansour',
    contactEmail: 'tariq@horizonproperties.com',
    leadArchitect: 'Abu Talib',
    joinedDate: '2024-06-01',
    healthScore: 88,
    activeSolutions: ['agent-5'],
    website: 'https://horizonproperties.com',
    notes: 'Inbound lead qualification WhatsApp agent and property tour scheduler.'
  },
  {
    id: 'client-6',
    name: 'Synthetix Media',
    company: 'Synthetix Creative Studio',
    industry: 'Digital Media & Production',
    avatarColor: 'from-pink-500 to-fuchsia-700',
    status: 'onboarding',
    tier: 'Growth Copilot',
    monthlyFee: 5000,
    monthlyTokensLimit: 750000,
    monthlyTokensUsed: 42000,
    automationsCount: 1,
    contactName: 'Chloe Bennett',
    contactEmail: 'chloe@synthetix.design',
    leadArchitect: 'Abu Talib',
    joinedDate: '2024-09-01',
    healthScore: 100,
    activeSolutions: [],
    website: 'https://synthetix.design',
    notes: 'Onboarding phase: Building automated multi-platform social dispatch bot.'
  }
];

export const INITIAL_AGENTS: AIAgentSolution[] = [
  {
    id: 'agent-1',
    name: 'CareTriage Clinical Voice & Chat Copilot',
    category: 'Customer Support Copilot',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    model: 'gemini-3.8-flash',
    status: 'operational',
    uptimePct: 99.94,
    avgLatencyMs: 380,
    dailyRuns: 1650,
    monthlyRuns: 48290,
    errorRatePct: 0.04,
    monthlyCost: 96.50,
    lastTuned: '2 hours ago',
    systemPrompt: `You are the CareTriage AI Assistant for verified healthcare providers and patients at Nexus Health.
Your primary role is evaluating non-emergency inquiries, triaging patient intake forms, and routing urgent cases to the on-call physician.
Always maintain medical empathy, strict HIPAA compliance, and never prescribe dosage changes autonomously.`,
    sampleInput: 'Patient reports mild postoperative swelling 48 hours after arthroscopic knee surgery. No fever.',
    sampleOutput: 'Swelling within 48 hours post-arthroscopy is common. Apply ice for 20-min intervals and keep elevated. Alert the surgeon immediately if calf pain, redness, or fever above 101°F develops.'
  },
  {
    id: 'agent-2',
    name: 'Aura VIP Concierge & Returns Dispatcher',
    category: 'Inbound Lead Qualifier',
    clientName: 'Aura Commerce',
    clientId: 'client-2',
    model: 'gemini-3.8-flash',
    status: 'operational',
    uptimePct: 99.88,
    avgLatencyMs: 440,
    dailyRuns: 3120,
    monthlyRuns: 92140,
    errorRatePct: 0.12,
    monthlyCost: 142.30,
    lastTuned: 'Yesterday',
    systemPrompt: `You are Aura Concierge, the premier luxury assistant for Aura Commerce shoppers.
Verify order IDs, generate return labels instantly via Shopify API webhook, and suggest curated alternatives based on purchase history.`,
    sampleInput: 'I received the cashmere overcoat in size M, but the sleeves are slightly snug. Can I exchange for Large?',
    sampleOutput: 'Certainly! I have reserved the Size L Cashmere Overcoat for you. I have emailed a prepaid return QR code for your Size M. Once scanned at UPS, the new size will ship out same day.'
  },
  {
    id: 'agent-3',
    name: 'FinAudit SEC & AML RAG Analyst',
    category: 'RAG Document Intelligence',
    clientName: 'Veritas Financial',
    clientId: 'client-3',
    model: 'gemini-3.1-pro-preview',
    status: 'operational',
    uptimePct: 100.0,
    avgLatencyMs: 820,
    dailyRuns: 620,
    monthlyRuns: 18400,
    errorRatePct: 0.01,
    monthlyCost: 285.00,
    lastTuned: '3 days ago',
    systemPrompt: `You are FinAudit Intelligence, an institutional-grade financial document parser and AML cross-referencing agent.
Cross-examine provided 10-K, 10-Q filings, wire transaction logs, and SWIFT metadata against OFAC and FinCEN watchlists. Output all citations with paragraph and footnote references.`,
    sampleInput: 'Analyze sudden $240,000 wire transaction from offshore entity Apex Holdings Ltd for counterparty risk.',
    sampleOutput: 'FLAGGED [Medium-High Risk]: Apex Holdings Ltd has beneficial ownership in a non-FATF compliant jurisdiction. No prior transaction history in Q1-Q3 ledger. Recommendation: Request secondary UBO affidavit before clearing.'
  },
  {
    id: 'agent-4',
    name: 'TalentScout Resume & Outreach Bot',
    category: 'CRM & ERP Automation',
    clientName: 'Elevate Talent',
    clientId: 'client-4',
    model: 'gemini-3.8-flash',
    status: 'operational',
    uptimePct: 99.72,
    avgLatencyMs: 510,
    dailyRuns: 420,
    monthlyRuns: 12300,
    errorRatePct: 0.28,
    monthlyCost: 48.90,
    lastTuned: '5 days ago',
    systemPrompt: `You are TalentScout AI for Elevate Staffing. Parse candidate technical resumes against job specifications.
Generate customized, non-spammy outreach messages highlighting specific GitHub/portfolio projects.`,
    sampleInput: 'Candidate: Senior Distributed Systems Engineer with 6 yrs Go/Rust experience and Raft consensus implementation.',
    sampleOutput: 'Crafted customized note: "Hi Alex, noticed your Raft consensus library on GitHub—impressive work on leader election recovery. Our Series B fintech client is scaling high-throughput settlement engines in Rust..."'
  },
  {
    id: 'agent-5',
    name: 'Horizon Lead Concierge & Tour Booker',
    category: 'Voice & Omnichannel Agent',
    clientName: 'Horizon Real Estate',
    clientId: 'client-5',
    model: 'gemini-3.8-flash',
    status: 'operational',
    uptimePct: 99.65,
    avgLatencyMs: 460,
    dailyRuns: 850,
    monthlyRuns: 24900,
    errorRatePct: 0.15,
    monthlyCost: 62.40,
    lastTuned: '1 week ago',
    systemPrompt: `You are the Horizon Estates WhatsApp AI Agent. Greet prospects looking at luxury listings.
Qualify budget, preferred neighborhood, timeline, and immediately schedule a private in-person or 3D Matterport walkthrough into agent calendar.`,
    sampleInput: 'Looking for a 3-bedroom penthouse in Downtown or Marina with balcony, budget around $1.8M.',
    sampleOutput: 'Great choice! We have 2 residences matching this profile at The Lumina and One Harbor. Would Thursday at 3:00 PM or Saturday at 11:00 AM work best for your private showing?'
  },
  {
    id: 'agent-6',
    name: 'Nexus Billing & Insurance Form Reconciler',
    category: 'Invoice & Financial Auditor',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    model: 'gemini-3.8-flash',
    status: 'deploying',
    uptimePct: 99.1,
    avgLatencyMs: 640,
    dailyRuns: 210,
    monthlyRuns: 6700,
    errorRatePct: 0.45,
    monthlyCost: 24.10,
    lastTuned: 'Just now',
    systemPrompt: `Extract diagnostic codes (ICD-10 / CPT) from doctor clinical notes and compare against insurance claim forms to identify denial risks prior to submission.`,
    sampleInput: 'Clinical note contains CPT 99214 with ICD-10 M25.561. Claim submitted with CPT 99213.',
    sampleOutput: 'Discrepancy detected: Clinical documentation complexity supports level 4 evaluation (99214), but claim was coded as level 3 (99213). Under-billing risk of ~$42. Correct before transmission.'
  }
];

export const INITIAL_PROJECTS: PipelineProject[] = [
  {
    id: 'proj-1',
    title: 'HIPAA Voice Agent Deployment & EHR Sync',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    stage: 'production',
    priority: 'high',
    progressPct: 100,
    targetLaunchDate: '2024-09-10',
    budget: 18500,
    lead: 'Abu Talib',
    deliverables: ['Voice Webhook Gateway', 'Epic EHR Read-write API', 'Audit Logs Pipeline']
  },
  {
    id: 'proj-2',
    title: 'Multi-lingual WhatsApp Commerce Bot',
    clientName: 'Aura Commerce',
    clientId: 'client-2',
    stage: 'testing_uat',
    priority: 'high',
    progressPct: 85,
    targetLaunchDate: '2024-09-22',
    budget: 9500,
    lead: 'Abu Talib',
    deliverables: ['Shopify Cart Injection', 'Arabic & Spanish Locale Grounding', 'VIP Escalation Matrix']
  },
  {
    id: 'proj-3',
    title: 'SEC 10-K RAG Vector Store & Real-time Alerts',
    clientName: 'Veritas Financial',
    clientId: 'client-3',
    stage: 'integration',
    priority: 'medium',
    progressPct: 60,
    targetLaunchDate: '2024-10-05',
    budget: 24000,
    lead: 'Abu Talib',
    deliverables: ['Pinecone Vector DB Index', 'Chunking Heuristics for Financial Tables', 'Slack Command Bot']
  },
  {
    id: 'proj-4',
    title: 'Autonomous Social Dispatch & Content Generator',
    clientName: 'Synthetix Media',
    clientId: 'client-6',
    stage: 'prompt_eng',
    priority: 'medium',
    progressPct: 35,
    targetLaunchDate: '2024-10-18',
    budget: 8000,
    lead: 'Abu Talib',
    deliverables: ['Brand Tone Vector Alignment', 'Image Asset Resizer API', 'Notion Approval Workflow']
  },
  {
    id: 'proj-5',
    title: 'Candidate Screening Bot & Calendar Booking',
    clientName: 'Elevate Talent',
    clientId: 'client-4',
    stage: 'discovery',
    priority: 'low',
    progressPct: 15,
    targetLaunchDate: '2024-11-01',
    budget: 5500,
    lead: 'Abu Talib',
    deliverables: ['ATS Greenhouse Integration', 'Custom Screening Scoring Matrix']
  }
];

const RAW_INITIAL_INVOICES: Invoice[] = [
  // September 2024 (Current Cycle)
  {
    id: 'inv-101',
    invoiceNumber: 'AIC-2024-089',
    clientName: 'Veritas Financial',
    clientId: 'client-3',
    issueDate: '2024-09-01',
    dueDate: '2024-09-15',
    status: 'paid',
    subtotal: 12000,
    tax: 0,
    total: 12000,
    items: [
      { description: 'Custom Agent Suite - Monthly Retainer (Sep 2024)', hoursOrQty: 1, rate: 12000, total: 12000 }
    ]
  },
  {
    id: 'inv-102',
    invoiceNumber: 'AIC-2024-090',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    issueDate: '2024-09-01',
    dueDate: '2024-09-15',
    status: 'paid',
    subtotal: 8500,
    tax: 0,
    total: 8500,
    items: [
      { description: 'Enterprise Automation Retainer (Sep 2024)', hoursOrQty: 1, rate: 8500, total: 8500 }
    ]
  },
  {
    id: 'inv-103',
    invoiceNumber: 'AIC-2024-091',
    clientName: 'Aura Commerce',
    clientId: 'client-2',
    issueDate: '2024-09-01',
    dueDate: '2024-09-15',
    status: 'paid',
    subtotal: 4500,
    tax: 0,
    total: 4500,
    items: [
      { description: 'Growth Copilot Retainer & Shopify Sync (Sep 2024)', hoursOrQty: 1, rate: 4500, total: 4500 }
    ]
  },
  {
    id: 'inv-104',
    invoiceNumber: 'AIC-2024-092',
    clientName: 'Horizon Real Estate',
    clientId: 'client-5',
    issueDate: '2024-09-05',
    dueDate: '2024-09-20',
    status: 'pending',
    subtotal: 4500,
    tax: 0,
    total: 4500,
    items: [
      { description: 'Growth Copilot Retainer & WhatsApp Agent SLA (Sep 2024)', hoursOrQty: 1, rate: 4500, total: 4500 }
    ]
  },
  {
    id: 'inv-105',
    invoiceNumber: 'AIC-2024-093',
    clientName: 'Synthetix Media',
    clientId: 'client-6',
    issueDate: '2024-09-08',
    dueDate: '2024-09-22',
    status: 'pending',
    subtotal: 5000,
    tax: 0,
    total: 5000,
    items: [
      { description: 'Onboarding Sprint & Custom Agent Architecture Deposit', hoursOrQty: 1, rate: 5000, total: 5000 }
    ]
  },
  {
    id: 'inv-106',
    invoiceNumber: 'AIC-2024-094',
    clientName: 'Elevate Talent',
    clientId: 'client-4',
    issueDate: '2024-09-02',
    dueDate: '2024-09-16',
    status: 'paid',
    subtotal: 2500,
    tax: 0,
    total: 2500,
    items: [
      { description: 'Starter AI Retainer & Candidate Bot (Sep 2024)', hoursOrQty: 1, rate: 2500, total: 2500 }
    ]
  },

  // August 2024
  {
    id: 'inv-095',
    invoiceNumber: 'AIC-2024-080',
    clientName: 'Veritas Financial',
    clientId: 'client-3',
    issueDate: '2024-08-01',
    dueDate: '2024-08-15',
    status: 'paid',
    subtotal: 12000,
    tax: 0,
    total: 12000,
    items: [
      { description: 'Custom Agent Suite - Monthly Retainer (Aug 2024)', hoursOrQty: 1, rate: 12000, total: 12000 }
    ]
  },
  {
    id: 'inv-096',
    invoiceNumber: 'AIC-2024-081',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    issueDate: '2024-08-01',
    dueDate: '2024-08-15',
    status: 'paid',
    subtotal: 8500,
    tax: 0,
    total: 8500,
    items: [
      { description: 'Enterprise Automation Retainer (Aug 2024)', hoursOrQty: 1, rate: 8500, total: 8500 }
    ]
  },
  {
    id: 'inv-097',
    invoiceNumber: 'AIC-2024-082',
    clientName: 'Aura Commerce',
    clientId: 'client-2',
    issueDate: '2024-08-01',
    dueDate: '2024-08-15',
    status: 'paid',
    subtotal: 4500,
    tax: 0,
    total: 4500,
    items: [
      { description: 'Growth Copilot Retainer & Returns AI (Aug 2024)', hoursOrQty: 1, rate: 4500, total: 4500 }
    ]
  },
  {
    id: 'inv-098',
    invoiceNumber: 'AIC-2024-083',
    clientName: 'Horizon Real Estate',
    clientId: 'client-5',
    issueDate: '2024-08-01',
    dueDate: '2024-08-15',
    status: 'paid',
    subtotal: 4500,
    tax: 0,
    total: 4500,
    items: [
      { description: 'Growth Copilot Retainer (Aug 2024)', hoursOrQty: 1, rate: 4500, total: 4500 }
    ]
  },
  {
    id: 'inv-099',
    invoiceNumber: 'AIC-2024-084',
    clientName: 'Elevate Talent',
    clientId: 'client-4',
    issueDate: '2024-08-01',
    dueDate: '2024-08-15',
    status: 'paid',
    subtotal: 2500,
    tax: 0,
    total: 2500,
    items: [
      { description: 'Starter AI Retainer (Aug 2024)', hoursOrQty: 1, rate: 2500, total: 2500 }
    ]
  },

  // July 2024
  {
    id: 'inv-085',
    invoiceNumber: 'AIC-2024-071',
    clientName: 'Veritas Financial',
    clientId: 'client-3',
    issueDate: '2024-07-01',
    dueDate: '2024-07-15',
    status: 'paid',
    subtotal: 12000,
    tax: 0,
    total: 12000,
    items: [
      { description: 'Custom Agent Suite - Monthly Retainer (Jul 2024)', hoursOrQty: 1, rate: 12000, total: 12000 }
    ]
  },
  {
    id: 'inv-086',
    invoiceNumber: 'AIC-2024-072',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    issueDate: '2024-07-01',
    dueDate: '2024-07-15',
    status: 'paid',
    subtotal: 8500,
    tax: 0,
    total: 8500,
    items: [
      { description: 'Enterprise Automation Retainer (Jul 2024)', hoursOrQty: 1, rate: 8500, total: 8500 }
    ]
  },
  {
    id: 'inv-087',
    invoiceNumber: 'AIC-2024-073',
    clientName: 'Aura Commerce',
    clientId: 'client-2',
    issueDate: '2024-07-01',
    dueDate: '2024-07-15',
    status: 'paid',
    subtotal: 4500,
    tax: 0,
    total: 4500,
    items: [
      { description: 'Growth Copilot Retainer (Jul 2024)', hoursOrQty: 1, rate: 4500, total: 4500 }
    ]
  },
  {
    id: 'inv-088',
    invoiceNumber: 'AIC-2024-074',
    clientName: 'Horizon Real Estate',
    clientId: 'client-5',
    issueDate: '2024-07-01',
    dueDate: '2024-07-15',
    status: 'paid',
    subtotal: 4500,
    tax: 0,
    total: 4500,
    items: [
      { description: 'Growth Copilot Retainer (Jul 2024)', hoursOrQty: 1, rate: 4500, total: 4500 }
    ]
  },
  {
    id: 'inv-089',
    invoiceNumber: 'AIC-2024-075',
    clientName: 'Elevate Talent',
    clientId: 'client-4',
    issueDate: '2024-07-01',
    dueDate: '2024-07-15',
    status: 'paid',
    subtotal: 2500,
    tax: 0,
    total: 2500,
    items: [
      { description: 'Starter AI Retainer (Jul 2024)', hoursOrQty: 1, rate: 2500, total: 2500 }
    ]
  },

  // June 2024
  {
    id: 'inv-075',
    invoiceNumber: 'AIC-2024-061',
    clientName: 'Veritas Financial',
    clientId: 'client-3',
    issueDate: '2024-06-01',
    dueDate: '2024-06-15',
    status: 'paid',
    subtotal: 12000,
    tax: 0,
    total: 12000,
    items: [
      { description: 'Custom Agent Suite - Monthly Retainer (Jun 2024)', hoursOrQty: 1, rate: 12000, total: 12000 }
    ]
  },
  {
    id: 'inv-076',
    invoiceNumber: 'AIC-2024-062',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    issueDate: '2024-06-01',
    dueDate: '2024-06-15',
    status: 'paid',
    subtotal: 8500,
    tax: 0,
    total: 8500,
    items: [
      { description: 'Enterprise Automation Retainer (Jun 2024)', hoursOrQty: 1, rate: 8500, total: 8500 }
    ]
  },
  {
    id: 'inv-077',
    invoiceNumber: 'AIC-2024-063',
    clientName: 'Aura Commerce',
    clientId: 'client-2',
    issueDate: '2024-06-01',
    dueDate: '2024-06-15',
    status: 'paid',
    subtotal: 4500,
    tax: 0,
    total: 4500,
    items: [
      { description: 'Growth Copilot Retainer (Jun 2024)', hoursOrQty: 1, rate: 4500, total: 4500 }
    ]
  },
  {
    id: 'inv-078',
    invoiceNumber: 'AIC-2024-064',
    clientName: 'Elevate Talent',
    clientId: 'client-4',
    issueDate: '2024-06-01',
    dueDate: '2024-06-15',
    status: 'paid',
    subtotal: 2500,
    tax: 0,
    total: 2500,
    items: [
      { description: 'Starter AI Retainer (Jun 2024)', hoursOrQty: 1, rate: 2500, total: 2500 }
    ]
  },

  // May 2024
  {
    id: 'inv-065',
    invoiceNumber: 'AIC-2024-051',
    clientName: 'Veritas Financial',
    clientId: 'client-3',
    issueDate: '2024-05-01',
    dueDate: '2024-05-15',
    status: 'paid',
    subtotal: 12000,
    tax: 0,
    total: 12000,
    items: [
      { description: 'Custom Agent Suite - Monthly Retainer (May 2024)', hoursOrQty: 1, rate: 12000, total: 12000 }
    ]
  },
  {
    id: 'inv-066',
    invoiceNumber: 'AIC-2024-052',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    issueDate: '2024-05-01',
    dueDate: '2024-05-15',
    status: 'paid',
    subtotal: 8500,
    tax: 0,
    total: 8500,
    items: [
      { description: 'Enterprise Automation Retainer (May 2024)', hoursOrQty: 1, rate: 8500, total: 8500 }
    ]
  },
  {
    id: 'inv-067',
    invoiceNumber: 'AIC-2024-053',
    clientName: 'Aura Commerce',
    clientId: 'client-2',
    issueDate: '2024-05-01',
    dueDate: '2024-05-15',
    status: 'paid',
    subtotal: 4500,
    tax: 0,
    total: 4500,
    items: [
      { description: 'Growth Copilot Retainer (May 2024)', hoursOrQty: 1, rate: 4500, total: 4500 }
    ]
  },

  // April 2024
  {
    id: 'inv-055',
    invoiceNumber: 'AIC-2024-041',
    clientName: 'Veritas Financial',
    clientId: 'client-3',
    issueDate: '2024-04-01',
    dueDate: '2024-04-15',
    status: 'paid',
    subtotal: 12000,
    tax: 0,
    total: 12000,
    items: [
      { description: 'Custom Agent Suite - Monthly Retainer (Apr 2024)', hoursOrQty: 1, rate: 12000, total: 12000 }
    ]
  },
  {
    id: 'inv-056',
    invoiceNumber: 'AIC-2024-042',
    clientName: 'Nexus Healthtech',
    clientId: 'client-1',
    issueDate: '2024-04-01',
    dueDate: '2024-04-15',
    status: 'paid',
    subtotal: 8500,
    tax: 0,
    total: 8500,
    items: [
      { description: 'Enterprise Automation Retainer (Apr 2024)', hoursOrQty: 1, rate: 8500, total: 8500 }
    ]
  }
];

export const INITIAL_INVOICES: Invoice[] = RAW_INITIAL_INVOICES.map(inv => {
  const client = INITIAL_CLIENTS.find(c => c.id === inv.clientId);
  const tier = client?.tier;
  return {
    ...inv,
    serviceTier: tier,
    tags: assignInvoiceTags(tier),
  };
});

export const INITIAL_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act-1',
    timestamp: '10 mins ago',
    type: 'agent_run',
    title: 'High-Volume Run Burst Resolved',
    description: 'Aura VIP Concierge handled 420 customer queries in 30 mins with zero dropped packets.',
    clientName: 'Aura Commerce'
  },
  {
    id: 'act-2',
    timestamp: '45 mins ago',
    type: 'payment_received',
    title: 'Invoice Payment Cleared ($12,000)',
    description: 'Veritas Financial processed wire transfer for Custom Agent Suite Retainer.',
    clientName: 'Veritas Financial'
  },
  {
    id: 'act-3',
    timestamp: '2 hours ago',
    type: 'deployment',
    title: 'Model Prompt v2.4 Hot-Reloaded',
    description: 'CareTriage Clinical Voice latency reduced from 490ms to 380ms after tuning.',
    clientName: 'Nexus Healthtech'
  },
  {
    id: 'act-4',
    timestamp: '5 hours ago',
    type: 'alert',
    title: 'Token Quota Warning Handled',
    description: 'Nexus Health reached 70% of monthly token limit. Automatic tier burst authorized.',
    clientName: 'Nexus Healthtech'
  },
  {
    id: 'act-5',
    timestamp: 'Yesterday',
    type: 'client_update',
    title: 'Client Onboarding Sprint Initiated',
    description: 'Synthetix Media workspace connected to Slack bot & Figma webhook.',
    clientName: 'Synthetix Media'
  }
];
