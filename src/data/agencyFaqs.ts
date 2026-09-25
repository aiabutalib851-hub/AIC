import { DashboardTab } from '../types';

export type FaqTopic = 
  | 'all' 
  | 'clients' 
  | 'treasury' 
  | 'campaigns' 
  | 'cro' 
  | 'agents' 
  | 'copilot' 
  | 'shortcuts' 
  | 'security';

export interface AgencyFaqItem {
  id: string;
  topic: FaqTopic;
  topicLabel: string;
  topicLabelBn: string;
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
  keyPoints?: string[];
  keyPointsBn?: string[];
  tags: string[];
  tabTarget?: DashboardTab;
  tabLabel?: string;
  tabLabelBn?: string;
}

export const FAQ_TOPICS: { id: FaqTopic; label: string; labelBn: string }[] = [
  { id: 'all', label: 'All Topics', labelBn: 'সকল টপিক' },
  { id: 'clients', label: 'Client Portals & CRM', labelBn: 'ক্লায়েন্ট পোর্টাল ও সিআরএম' },
  { id: 'treasury', label: 'Billing & Multi-Business', labelBn: 'বিলিং ও ট্রেজারি' },
  { id: 'campaigns', label: 'Meta Andromeda Ads', labelBn: 'মেটা অ্যান্ড্রমিডা অ্যাডস' },
  { id: 'cro', label: 'CRO & Growth Audits', labelBn: 'সিআরও ও ফানেল অডিট' },
  { id: 'agents', label: 'AI Fleet Operations', labelBn: 'এআই বহর অপারেশন' },
  { id: 'copilot', label: 'AI Strategy Copilot', labelBn: 'এআই কোপাইলট স্ট্র্যাটেজি' },
  { id: 'shortcuts', label: 'Navigation & Shortcuts', labelBn: 'ন্যাভিগেশন ও শর্টকাট' },
  { id: 'security', label: 'Security & Permissions', labelBn: 'নিরাপত্তা ও পারমিশন' },
];

export const AGENCY_FAQS: AgencyFaqItem[] = [
  {
    id: 'faq-portal-switch',
    topic: 'clients',
    topicLabel: 'Client Portals & CRM',
    topicLabelBn: 'ক্লায়েন্ট পোর্টাল ও সিআরএম',
    question: 'How do I switch between the master Agency Admin view and individual Client Portals?',
    questionBn: 'মূল এজেন্সি এডমিন ভিউ এবং স্বতন্ত্র ক্লায়েন্ট পোর্টালের মধ্যে কীভাবে সুইচ করবেন?',
    answer: 'Use the Client Portal switcher in the top navigation bar or press Ctrl+K / ⌘K and type the client name. Selecting a client isolates active retainers, deliverables, and performance KPIs specifically to that account. To view all accounts simultaneously, select "Agency Admin".',
    answerBn: 'হেডারের ড্রপডাউন মেনু অথবা Ctrl+K / ⌘K চেপে যেকোনো ক্লায়েন্টের নাম সার্চ করে সিলেক্ট করুন। এটি ওই ক্লায়েন্টের রিটেইনার, প্রজেক্ট এবং কেপিআই আলাদাভাবে প্রদর্শন করে। সব ক্লায়েন্ট একসাথে দেখতে "এজেন্সি অ্যাডমিন" বেছে নিন।',
    keyPoints: [
      'Allows agency directors to preview client dashboard experiences',
      'Isolates metrics, invoices, and AI agent fleets per tenant',
      'Supports one-click return to full agency operational overview'
    ],
    keyPointsBn: [
      'ক্লায়েন্টদের নিজস্ব ড্যাশবোর্ড অভিজ্ঞতা কেমন তা সরাসরি দেখা যায়',
      'প্রতিটি অ্যাকাউন্টের মেট্রিক্স, ইনভয়েস ও এআই বহর আলাদা ফিল্টার হয়',
      'এক ক্লিকে মূল এজেন্সি ওভারভিউতে ফিরে যাওয়া যায়'
    ],
    tags: ['Portals', 'Multi-Tenancy', 'SLA', 'Client CRM'],
    tabTarget: 'clients',
    tabLabel: 'Open Clients CRM',
    tabLabelBn: 'ক্লায়েন্ট পোর্টাল খুলুন'
  },
  {
    id: 'faq-multi-business',
    topic: 'treasury',
    topicLabel: 'Billing & Multi-Business',
    topicLabelBn: 'বিলিং ও ট্রেজারি',
    question: 'How do I manage finances for multiple businesses or legal entities under one agency?',
    questionBn: 'একই এজেন্সির অধীনে একাধিক ব্যবসা বা অঙ্গপ্রতিষ্ঠানের আয়-ব্যয় কীভাবে পৃথকভাবে পরিচালনা করব?',
    answer: 'In the Billing & Treasury module, select "Manage Business Entities" or use the Business Entity filter. You can configure distinct companies (e.g., Abrar IT Care, Abrar Academy, E-Commerce Ventures), link independent bank accounts, track ledger cash flows, and generate entity-branded invoices.',
    answerBn: 'বিলিং ও ট্রেজারি মডিউলে "Manage Business Entities" অপশন থেকে বা ফিল্টার ব্যবহার করে আলাদা প্রতিষ্ঠান (যেমন এআইসি, আবরার একাডেমি ইত্যাদি) পরিচালনা করতে পারবেন। প্রতিটি প্রতিষ্ঠানের নিজস্ব ব্যাংক হিসাব, ক্যাশফ্লো এবং ব্র্যান্ডেড ইনভয়েস থাকে।',
    keyPoints: [
      'Multi-entity ledger prevents co-mingling of company funds',
      'Entity-specific bank accounts, VAT numbers, and currencies (USD / BDT / EUR)',
      'Real-time cash flow analytics filtered by legal entity'
    ],
    keyPointsBn: [
      'আলাদা লেজারের কারণে এক কোম্পানির তহবিল অন্যটির সাথে মেশে না',
      'প্রতিটি প্রতিষ্ঠানের নিজস্ব ব্যাংক অ্যাকাউন্ট, ভ্যাট ও মুদ্রা সমর্থন',
      'প্রতিটি বিজনেস ইউনিটের জন্য রিয়েল-টাইম ক্যাশফ্লো রিপোর্ট'
    ],
    tags: ['Treasury', 'Multi-Entity', 'Banking', 'Ledger'],
    tabTarget: 'billing',
    tabLabel: 'Open Billing & Treasury',
    tabLabelBn: 'বিলিং ও ট্রেজারি খুলুন'
  },
  {
    id: 'faq-retainer-invoicing',
    topic: 'treasury',
    topicLabel: 'Billing & Multi-Business',
    topicLabelBn: 'বিলিং ও ট্রেজারি',
    question: 'How do recurring retainer fees and automated invoice statuses work?',
    questionBn: 'ক্লায়েন্টদের মাসিক রিটেইনার ইনভয়েস তৈরি ও পেমেন্ট স্ট্যাটাস ট্র্যাকিং কীভাবে কাজ করে?',
    answer: 'Navigate to Billing & Treasury > Invoices tab. You can generate itemized bills with custom tax/VAT rates, apply service-level agreements (SLAs), and log payments. Marking an invoice as Paid instantly updates your treasury ledger and bank account balances.',
    answerBn: 'বিলিং ও ট্রেজারি > ইনভয়েস ট্যাবে যান। সেখানে কাস্টম ভ্যাট/ট্যাক্স সহ রিটেইনার বিল তৈরি করতে পারবেন। কোনো ইনভয়েস "পেইড" মার্ক করার সাথে সাথে তা ট্রেজারি লেজার ও সংশ্লিষ্ট ব্যাংক হিসাবে রেকর্ড হয়ে যায়।',
    keyPoints: [
      'Statuses: Paid, Pending, Overdue with quick filter pills',
      'Automated tax calculations, discounts, and itemized line items',
      'Instant printable PDF generator for corporate disbursements'
    ],
    keyPointsBn: [
      'স্ট্যাটাস: পেইড, পেন্ডিং, ওভারডিউ দ্রুত ফিল্টার সুবিধা',
      'স্বয়ংক্রিয় ট্যাক্স ক্যালকুলেশন এবং আইটেমাইজড রসিদ তৈরি',
      'এক ক্লিকে কর্পোরেট প্রিন্ট ও পিডিএফ ডাউনলোড সুবিধা'
    ],
    tags: ['Invoices', 'Retainers', 'Taxes', 'Payments'],
    tabTarget: 'billing',
    tabLabel: 'View Invoices',
    tabLabelBn: 'ইনভয়েস তালিকা দেখুন'
  },
  {
    id: 'faq-andromeda-blueprint',
    topic: 'campaigns',
    topicLabel: 'Meta Andromeda Ads',
    topicLabelBn: 'মেটা অ্যান্ড্রমিডা অ্যাডস',
    question: 'What is the 22-Phase Andromeda Campaign Architecture and how do I execute it?',
    questionBn: '২২-ধাপের মেটা অ্যান্ড্রমিডা ব্লুপ্রিন্ট কী এবং এটি কীভাবে বাস্তবায়ন করবেন?',
    answer: 'The Meta Ads Blueprint is AIC’s proprietary 22-phase media buying system engineered for 2026 algorithmic scale. It covers technical CAPI setup, pixel deduplication, Dynamic Creative Testing (DCT), Advantage+ scaling, and retention retargeting. Each phase provides an actionable execution playbook and verification checklist.',
    answerBn: 'মেটা অ্যাডস ব্লুপ্রিন্ট হলো ২০২৬ সালের অ্যাড অ্যালগরিদমের জন্য এআইসি-র ২২টি ধারাবাহিক ধাপের মিডিয়া বায়িং সিস্টেম। এতে সিএপিআই সেটআপ, পিক্সেল ডিডুপ্লিকেশন, ডায়নামিক ক্রিয়েটিভ টেস্টিং ও অ্যাডভান্টেজ+ স্কেলিং এর বিস্তারিত চেকলিস্ট ও গাইড রয়েছে।',
    keyPoints: [
      'Interactive phase status trackers (Completed, In Progress, Pending)',
      'Systematic creative iteration preventing ad exhaustion and high CPMs',
      'Granular metrics benchmarks for ROAS, CTR, and Hook Rate'
    ],
    keyPointsBn: [
      'ইন্টারেক্টিভ ফেজ ট্র্যাকার (সম্পন্ন, চলমান, অপেক্ষমাণ)',
      'নিয়মতান্ত্রিক ক্রিয়েটিভ টেস্টের মাধ্যমে অ্যাড ক্লান্তি ও উচ্চ সিপিএম রোধ',
      'আরওএএস, সিটিআর এবং হুক রেটের নির্দিষ্ট বেঞ্চমার্ক নির্দেশনা'
    ],
    tags: ['Meta Ads', 'Andromeda', 'Media Buying', 'ROAS'],
    tabTarget: 'blueprint',
    tabLabel: 'Launch Meta Blueprint',
    tabLabelBn: 'মেটা ব্লুপ্রিন্ট দেখুন'
  },
  {
    id: 'faq-capi-dedup',
    topic: 'campaigns',
    topicLabel: 'Meta Andromeda Ads',
    topicLabelBn: 'মেটা অ্যান্ড্রমিডা অ্যাডস',
    question: 'How does server-side Conversions API (CAPI) deduplication ensure 0% data signal loss?',
    questionBn: 'সার্ভার-সাইড সিএপিআই (CAPI) ডিডুপ্লিকেশন কীভাবে ১০০% ডাটা সিগন্যাল নিশ্চিত করে?',
    answer: 'Phase 2 of the Meta Ads Blueprint implements dual-stream event tracking. Browser pixel events and server-side Graph API payloads share a matching event_id and timestamp. Meta’s engine recognizes the duplicate and retains 100% of conversion signals even when users employ aggressive browser ad-blockers or Safari ITP.',
    answerBn: 'মেটা ব্লুপ্রিন্টের ফেজ ২ ব্রাউজার পিক্সেল এবং সার্ভার-সাইড মেটা গ্রাফ এপিআই-কে একই event_id দিয়ে যুক্ত করে। ফলে ব্রাউজারে অ্যাড-ব্লকার বা সাফারি আইটিপি থাকা সত্ত্বেও কোনো কনভার্সন বাদ পড়ে না এবং ডাবল কাউন্ট রোধ হয়।',
    keyPoints: [
      'Bypasses iOS 14.5+ and third-party cookie restrictions',
      'Matches external_id, hashed email, and fbp/fbc click parameters',
      'Improves Meta Event Quality Match Score above 8.5/10'
    ],
    keyPointsBn: [
      'আইওএস ও থার্ড-পার্টি কুকি ব্লক এড়িয়ে সঠিক কনভার্সন ট্র্যাক করে',
      'হ্যাশড ইমেইল, ফোন ও মেটা ক্লিক আইডির মাধ্যমে নিখুঁত ম্যাচিং',
      'ইভেন্ট কোয়ালিটি ম্যাচ স্কোর ৮.৫ এর ওপরে তুলে আনে'
    ],
    tags: ['CAPI', 'Tracking', 'Pixel', 'Server-Side'],
    tabTarget: 'blueprint',
    tabLabel: 'Inspect CAPI Guidelines',
    tabLabelBn: 'সিএপিআই গাইডলাইন দেখুন'
  },
  {
    id: 'faq-cro-audit',
    topic: 'cro',
    topicLabel: 'CRO & Growth Audits',
    topicLabelBn: 'সিআরও ও ফানেল অডিট',
    question: 'How do I perform a Conversion Rate Optimization (CRO) audit and calculate revenue lifts?',
    questionBn: 'সিআরও ও ফানেল অডিট সম্পন্ন করে সম্ভাব্য অতিরিক্ত রেভিনিউ কীভাবে হিসাব করবেন?',
    answer: 'Navigate to the CRO & Growth Audit module. Run diagnostics across 8 crucial funnel checkpoints: landing page value props, visual hierarchy, mobile speed, trust badges, cart friction, and 1-click checkout. The embedded calculator models the exact dollar impact of improving conversion rates from 1.5% to 3.5%.',
    answerBn: 'সিআরও ও গ্রোথ অডিট মডিউলে যান। ল্যান্ডিং পেজের ভ্যালু প্রপোজিশন, মোবাইল স্পিড, ট্রাস্ট ব্যাজ, কার্ট ড্রপ এবং চেকআউট ফ্রিকশনসহ ৮টি পয়েন্টে অডিট করুন। বিল্ট-ইন ক্যালকুলেটর কনভার্সন রেট বাড়লে অতিরিক্ত কত রেভিনিউ আসবে তা সরাসরি হিসাব করে দেয়।',
    keyPoints: [
      'Pinpoints the highest-impact drop-off bottleneck in client funnels',
      'Dynamic revenue simulator showing compounding ROI on existing traffic',
      'Exportable client-facing executive CRO scorecard'
    ],
    keyPointsBn: [
      'ক্লায়েন্ট ফানেলের সবচেয়ে বড় ড্রপ-অফ পয়েন্ট তাৎক্ষণিক চিহ্নিত করে',
      'বিদ্যমান ট্রাফিকের ওপর কনভার্সন বৃদ্ধিতে আয়ের সিমুলেশন মডেল',
      'ক্লায়েন্টদের দেখানোর মতো বিস্তারিত স্কোরকার্ড তৈরি করা যায়'
    ],
    tags: ['CRO', 'Funnel Audits', 'Conversion Rate', 'Checkout'],
    tabTarget: 'cro',
    tabLabel: 'Open CRO Audit Tool',
    tabLabelBn: 'সিআরও অডিট টুল খুলুন'
  },
  {
    id: 'faq-ai-fleet',
    topic: 'agents',
    topicLabel: 'AI Fleet Operations',
    topicLabelBn: 'এআই বহর অপারেশন',
    question: 'How do I deploy, configure, and assign AI agents to specific clients?',
    questionBn: 'স্বায়ত্তশাসিত এআই এজেন্ট তৈরি, কনফিগার এবং নির্দিষ্ট ক্লায়েন্টদের সাথে যুক্ত করবেন কীভাবে?',
    answer: 'In the AI Fleet module, click "Deploy Agent". Choose from state-of-the-art LLMs (Gemini 1.5 Pro, Flash, Claude 3.5 Sonnet, GPT-4o), customize system instructions, set temperature and token constraints, and assign the agent to a client account. Webhook payloads can be bound to external CRMs.',
    answerBn: 'এআই বহর (AI Fleet) ট্যাবে "Deploy Agent"-এ ক্লিক করুন। পছন্দের মডেল (যেমন Gemini 1.5, Claude 3.5, GPT-4o) বেছে নিয়ে সিস্টেম প্রম্পট ও টোকেন সীমা নির্ধারণ করুন এবং ক্লায়েন্টের সাথে যুক্ত করুন। ওয়েবহুকের মাধ্যমে সিআরএম-এর সাথেও সংযুক্ত করা যায়।',
    keyPoints: [
      'Live operational telemetry: latency ms, uptime percentage, and error rates',
      'Category specialization: Support Copilots, Lead Qualifiers, and Audit Bots',
      'Per-client token allocation controls to prevent API budget overruns'
    ],
    keyPointsBn: [
      'রিয়েল-টাইম অপারেশনাল স্ট্যাটাস: লেটেন্সি, আপটাইম ও এরর রেট ট্র্যাকিং',
      'ক্যাটাগরি ভিত্তিক এজেন্ট: কাস্টমার সাপোর্ট, লিড কোয়ালিফায়ার ও অডিট বট',
      'ক্লায়েন্ট প্রতি টোকেন লিমিট নির্ধারণ করে খরচ নিয়ন্ত্রণ'
    ],
    tags: ['AI Agents', 'LLM', 'Gemini', 'Webhooks'],
    tabTarget: 'fleet',
    tabLabel: 'Manage AI Fleet',
    tabLabelBn: 'এআই বহর পরিচালনা করুন'
  },
  {
    id: 'faq-copilot-proposals',
    topic: 'copilot',
    topicLabel: 'AI Strategy Copilot',
    topicLabelBn: 'এআই কোপাইলট স্ট্র্যাটেজি',
    question: 'How does the AI Copilot synthesize custom marketing proposals and growth roadmaps?',
    questionBn: 'এআই কোপাইলট কীভাবে কাস্টম মার্কেটিং প্রপোজাল ও গ্রোথ রোডম্যাপ তৈরি করে?',
    answer: 'The AI Copilot evaluates your client’s current revenue stage, industry vertical, and marketing bottlenecks to generate comprehensive, tailored growth proposals. It structures budget allocations, media channel mixes, creative testing cadences, and ROI forecasts in seconds.',
    answerBn: 'এআই স্ট্র্যাটেজি কোপাইলট ক্লায়েন্টের বর্তমান আয়, ইন্ডাস্ট্রি এবং সমস্যাগুলো বিশ্লেষণ করে সম্পূর্ণ কাস্টমাইজড প্রপোজাল তৈরি করে। এটি বাজেট বণ্টন, মিডিয়া মিক্স, ক্রিয়েটিভ টেস্টিং শিডিউল ও সম্ভাব্য আরওআই প্রজেক্ট করে দেয়।',
    keyPoints: [
      'Instant proposal generation calibrated for enterprise pitches',
      'Custom budget splits between Testing (DCT), Scaling, and Retention',
      'Direct one-click export for pitch presentations'
    ],
    keyPointsBn: [
      'এন্টারপ্রাইজ ক্লায়েন্টদের পিচ করার উপযোগী পূর্ণাঙ্গ প্রপোজাল',
      'টেস্টিং, স্কেলিং ও রিটেনশনের মধ্যে নিখুঁত বাজেট বিন্যাস',
      'উপস্থাপনার জন্য তাৎক্ষণিক এক্সপোর্ট সুবিধা'
    ],
    tags: ['AI Copilot', 'Proposals', 'Roadmaps', 'Strategy'],
    tabTarget: 'copilot',
    tabLabel: 'Launch AI Copilot',
    tabLabelBn: 'এআই কোপাইলট চালু করুন'
  },
  {
    id: 'faq-shortcuts-nav',
    topic: 'shortcuts',
    topicLabel: 'Navigation & Shortcuts',
    topicLabelBn: 'ন্যাভিগেশন ও শর্টকাট',
    question: 'What keyboard shortcuts are available for high-speed agency navigation?',
    questionBn: 'এজেন্সি ড্যাশবোর্ডে দ্রুত কাজ করার জন্য কী কী কীবোর্ড শর্টকাট রয়েছে?',
    answer: 'Press Ctrl+K (Windows/Linux) or ⌘K (macOS) from anywhere to summon the Command Palette. You can also press "/" when not typing in an input field. Use ↑ and ↓ arrow keys to cycle between modules or client portals, and press Enter to jump immediately. Press Escape to close.',
    answerBn: 'যেকোনো স্ক্রিন থেকে Ctrl+K (Windows) বা ⌘K (Mac) চেপে কমান্ড প্যালেট খুলুন। খালি অবস্থায় "/" চাপলেও সার্চ চালু হবে। অ্যারো কি (↑/↓) দিয়ে যেকোনো মডিউল বা ক্লায়েন্ট পোর্টালে হাইলাইট করুন এবং এন্টার (↵) চেপে সাথে সাথে চলে যান। বন্ধ করতে ESC চাপুন।',
    keyPoints: [
      'Universal shortcut badge (Ctrl+K / ⌘K) visible directly in the header search',
      'Arrow-key navigation with instant preview and jump triggers',
      'Quick escape dismiss handling with automatic focus management'
    ],
    keyPointsBn: [
      'হেডার সার্চ বারের ডানদিকে স্পষ্ট শর্টকাট ব্যাজ রয়েছে',
      'অ্যারো কি দিয়ে দ্রুত ব্রাউজ এবং এন্টার দিয়ে তাৎক্ষণিক জাম্প',
      'ESC দিয়ে যেকোনো সময় মেনু বন্ধ করার সুবিধা'
    ],
    tags: ['Shortcuts', 'Ctrl+K', 'Command Palette', 'Navigation'],
    tabTarget: 'overview',
    tabLabel: 'Go to Overview',
    tabLabelBn: 'ওভারভিউতে যান'
  },
  {
    id: 'faq-security-permissions',
    topic: 'security',
    topicLabel: 'Security & Permissions',
    topicLabelBn: 'নিরাপত্তা ও পারমিশন',
    question: 'Can I restrict sensitive sections like Treasury, Invoices, or Founder Credentials from team members?',
    questionBn: 'ট্রেজারি, ইনভয়েস বা ফাউন্ডার ক্রেডেনশিয়ালস এর মতো সংবেদনশীল অংশগুলো কি অন্যদের থেকে লক করা যায়?',
    answer: 'Yes. Through Master Topic Permissions (accessible via the Admin profile dropdown menu), Agency Directors can lock sensitive modules. Unauthorized team members or viewers encounter an access-restricted screen with an automated permission request workflow.',
    answerBn: 'হ্যাঁ। অ্যাডমিন প্রোফাইল মেনু থেকে "Master Topic Permissions" ওপেন করে যেকোনো সংবেদনশীল মডিউল লক করতে পারবেন। অননুমোদিত ব্যবহারকারীরা সেখানে সিকিউর লক স্ক্রিন এবং রিকোয়েস্ট অ্যাক্সেস সুবিধা দেখতে পাবেন।',
    keyPoints: [
      'Granular tab-level permissions for Admin, Media Buyer, and Client roles',
      'Audit logging of permission grant and override events',
      'Protection for high-stakes banking, API secrets, and founder credentials'
    ],
    keyPointsBn: [
      'অ্যাডমিন, মিডিয়া বায়ার এবং ক্লায়েন্ট রোলের জন্য আলাদা পারমিশন',
      'অনুমোদন ও পরিবর্তন ট্র্যাকিং এর অডিট হিস্টোরি',
      'ব্যাংকিং, এপিআই কি এবং অভ্যন্তরীণ তথ্যের সর্বোচ্চ নিরাপত্তা'
    ],
    tags: ['Security', 'RBAC', 'Permissions', 'Topic Locking'],
    tabTarget: 'overview',
    tabLabel: 'View Master Security',
    tabLabelBn: 'সিকিউরিটি সেটিংস দেখুন'
  },
  {
    id: 'faq-dual-language',
    topic: 'shortcuts',
    topicLabel: 'Navigation & Shortcuts',
    topicLabelBn: 'ন্যাভিগেশন ও শর্টকাট',
    question: 'How do I toggle the dashboard between English and Bengali (Bangla)?',
    questionBn: 'সম্পূর্ণ ড্যাশবোর্ড কীভাবে ইংরেজি ও বাংলার মধ্যে অদলবদল করব?',
    answer: 'Click the Language Switcher badge (EN / বাং) located next to the Help button in the top navigation header or in the agency footer. The entire interface, financial summaries, Andromeda playbooks, and service catalogs re-render immediately.',
    answerBn: 'টপ হেডারে বা ফুটারে থাকা ভাষা সুইচ বোতামে (EN / বাং) ক্লিক করুন। সাথে সাথে সম্পূর্ণ ড্যাশবোর্ড, আর্থিক হিসাব, ক্যাম্পেইন গাইডলাইন এবং সার্ভিস ক্যাটালগ বাংলায় বা ইংরেজিতে রূপান্তরিত হবে।',
    keyPoints: [
      'One-click instantaneous language switching without page reload',
      'Culturally adapted terminology for agency operations and marketing metrics',
      'Persistent language preference stored across your working session'
    ],
    keyPointsBn: [
      'কোনো পেজ রিলোড ছাড়াই তাৎক্ষণিক ভাষা পরিবর্তন',
      'এজেন্সি ও মার্কেটিং পরিভাষার নিখুঁত বাংলা রূপান্তর',
      'আপনার পছন্দ সেশন জুড়ে স্বয়ংক্রিয়ভাবে মনে রাখে'
    ],
    tags: ['Language', 'Bangla', 'English', 'Localization'],
    tabTarget: 'overview',
    tabLabel: 'Go to Overview',
    tabLabelBn: 'ওভারভিউতে যান'
  },
  {
    id: 'faq-service-catalog-sla',
    topic: 'clients',
    topicLabel: 'Client Portals & CRM',
    topicLabelBn: 'ক্লায়েন্ট পোর্টাল ও সিআরএম',
    question: 'How does the 7-Stage Client Growth Journey structure service deliverables and SLAs?',
    questionBn: 'সার্ভিস ক্যাটালগে ৭-ধাপের ক্লায়েন্ট গ্রোথ জার্নি এবং এসএলএ কীভাবে পরিচালিত হয়?',
    answer: 'The Service Catalog standardizes agency deliverables across 7 consecutive stages: Diagnose, Foundation (Tracking & CAPI), Creative Testing, Scale, Retention & CRO, Autonomous AI Fleets, and Ecosystem Domination. Each tier includes strict delivery timeframes, SLA guarantees, and pricing frameworks.',
    answerBn: 'সার্ভিস ক্যাটালগে ক্লায়েন্টদের সেবা ৭টি নির্দিষ্ট ধাপে বিন্যস্ত: ডায়াগনস্টিক, ট্র্যাকিং ও সিএপিআই, ক্রিয়েটিভ টেস্টিং, স্কেলিং, রিটেনশন, এআই অটোমেশন এবং ইকোসিস্টেম গ্রোথ। প্রতিটি সেবায় নির্ধারিত সময়সীমা ও এসএলএ গ্যারান্টি অন্তর্ভুক্ত।',
    keyPoints: [
      'Eliminates scope creep by providing clear, contractual stage milestones',
      'Transparent deliverables with turn-key onboarding checklists',
      'Dynamic upsell pathways from Starter AI to Custom Enterprise Suites'
    ],
    keyPointsBn: [
      'সুনির্দিষ্ট মাইলস্টোন থাকার কারণে কাজের স্কোপ বৃদ্ধিজনিত ঝামেলা দূর হয়',
      'স্বচ্ছ ডেলিভারেবল এবং সহজে অনবোর্ডিং চেকলিস্ট সুবিধা',
      'স্টার্টার প্যাকেজ থেকে এন্টারপ্রাইজ স্যুইটে ধাপে ধাপে আপগ্রেড করার সুযোগ'
    ],
    tags: ['Services', 'SLA', '7-Stage Journey', 'Deliverables'],
    tabTarget: 'services',
    tabLabel: 'Explore Service Catalog',
    tabLabelBn: 'সার্ভিস ক্যাটালগ দেখুন'
  },
  {
    id: 'faq-billing-exports',
    topic: 'treasury',
    topicLabel: 'Billing & Multi-Business',
    topicLabelBn: 'বিলিং ও ট্রেজারি',
    question: 'How do I export invoice statements and treasury ledgers to PDF, CSV, and JSON?',
    questionBn: 'ইনভয়েস স্টেটমেন্ট ও ট্রেজারি লেজার কীভাবে PDF, CSV এবং JSON ফরম্যাটে এক্সপোর্ট করবেন?',
    answer: 'In the Billing & Treasury module, click "Quick Export PDF" in the toolbar to generate an aggregated executive ledger statement, or click "Export CSV / PDF" to customize data filters. Each individual invoice in the table also features a dedicated PDF document button for instant download of branded client remittance receipts.',
    answerBn: 'বিলিং ও ট্রেজারি মডিউলে টুলবারের "Quick Export PDF" বাটনে ক্লিক করে সামগ্রিক আর্থিক লেজার স্টেটমেন্ট তৈরি করুন অথবা "Export CSV / PDF" বাটনে ক্লিক করে নির্দিষ্ট ফিল্টার অনুযায়ী ডাউনলোড করুন। প্রতিটি ইনভয়েসের ডানদিকের পিডিএফ আইকন দিয়ে মুহূর্তের মধ্যে ক্লায়েন্ট রসিদ প্রিন্ট বা সেভ করা যায়।',
    keyPoints: [
      'Single-click PDF invoice generation with corporate branding and wire remittance info',
      'Consolidated Accounts Receivable statement with payment status charts and schedules',
      'CSV spreadsheet and JSON exports formatted for QuickBooks, Xero, and local tax filing'
    ],
    keyPointsBn: [
      'কর্পোরেট ব্র্যান্ডিং এবং ব্যাংক পেমেন্ট তথ্যসহ তাৎক্ষণিক একক পিডিএফ ইনভয়েস তৈরি',
      'পেমেন্ট স্ট্যাটাস চার্ট ও শিডিউলসহ সমন্বিত একাউন্টস রিসিভেবল স্টেটমেন্ট',
      'ট্যাক্স ফাইলিং ও অ্যাকাউন্টিং সফটওয়্যারে ব্যবহারের উপযোগী CSV ও JSON ডাটা'
    ],
    tags: ['Invoices', 'PDF Export', 'CSV', 'Financial Ledger', 'Treasury', 'Banking'],
    tabTarget: 'billing',
    tabLabel: 'Open Billing & Treasury',
    tabLabelBn: 'বিলিং ও ট্রেজারি খুলুন'
  },
  {
    id: 'faq-pipeline-deliverables',
    topic: 'clients',
    topicLabel: 'Client Portals & CRM',
    topicLabelBn: 'ক্লায়েন্ট পোর্টাল ও সিআরএম',
    question: 'How do I track client project deliverables, SLA milestones, and sprint progress in the Pipeline?',
    questionBn: 'প্রজেক্ট পাইপলাইনে ক্লায়েন্টদের কাজের অগ্রগতি, এসএলএ মাইলস্টোন এবং স্প্রিন্ট কীভাবে পরিচালনা করবেন?',
    answer: 'The Project Pipeline organizes ongoing deliverables into Kanban sprint columns (Backlog, In Progress, Review, Completed). Each project card tracks client tags, assigned specialists, due dates, and SLA health indicators. Dragging cards or clicking to update statuses dynamically synchronizes telemetry in the client’s private portal.',
    answerBn: 'প্রজেক্ট পাইপলাইন মডিউলে সকল ক্লায়েন্ট প্রজেক্ট কানবান বোর্ডে সাজানো থাকে (ব্যাকলগ, চলমান, রিভিউ ও সম্পন্ন)। প্রতিটি কার্ডে ক্লায়েন্টের নাম, দায়িত্বপ্রাপ্ত ব্যক্তি, ডেডলাইন ও এসএলএ স্থিতি দেখা যায়। স্ট্যাটাস আপডেট করলে তা স্বয়ংক্রিয়ভাবে ক্লায়েন্টের পোর্টালেও আপডেট হয়।',
    keyPoints: [
      'Kanban sprint visualizer for active client engagements and media buying milestones',
      'SLA risk telemetry highlights projects nearing contractual delivery dates',
      'Multi-tenant synchronization keeps clients informed in real time'
    ],
    keyPointsBn: [
      'ক্লায়েন্ট প্রজেক্ট ও মিডিয়া বায়িং মাইলস্টোনের জন্য ভিজ্যুয়াল কানবান স্প্রিন্ট',
      'চুক্তির মেয়াদ শেষ হওয়ার উপক্রম হলে সতর্ককারী এসএলএ রিক্স টেলিমেট্রি',
      'রিয়েল-টাইমে ক্লায়েন্ট পোর্টালে অগ্রগতি লাইভ আপডেট রাখার সুবিধা'
    ],
    tags: ['Pipeline', 'Deliverables', 'Milestones', 'SLA', 'Client CRM', 'Sprint'],
    tabTarget: 'pipeline',
    tabLabel: 'View Project Pipeline',
    tabLabelBn: 'প্রজেক্ট পাইপলাইন দেখুন'
  },
  {
    id: 'faq-major-service-agentic-ai',
    topic: 'clients',
    topicLabel: 'Major Services & AI',
    topicLabelBn: 'মেজর সার্ভিস ও এআই',
    question: 'What is the "AGENTIC AI" Major Service and why is Founder Abu Talib recognized as an Expert in Agentic AI?',
    questionBn: 'মেজর সার্ভিস "এজেন্টিক এআই" কী এবং প্রতিষ্ঠাতা আবু তালিব কেন এজেন্টিক এআই এক্সপার্ট হিসেবে স্বীকৃত?',
    answer: 'AGENTIC AI is AIC’s flagship Major Service, directed personally by Founder Abu Talib—an acknowledged Expert in Agentic AI. Unlike passive chatbots, our autonomous multi-agent fleets use LangGraph, CrewAI, and AutoGen to decompose complex business objectives, execute external tools and APIs, manage state, and resolve enterprise operations 24/7 with 99.9% uptime SLA.',
    answerBn: 'এজেন্টিক এআই হলো এআইসি-এর প্রধানতম মেজর সার্ভিস, যা প্রতিষ্ঠাতা আবু তালিবের সরাসরি পরিচালনায় বাস্তবায়িত হয়। সাধারণ চ্যাটবটের মতো প্যাসিভ না হয়ে আমাদের অটোনোমাস মাল্টি-এজেন্ট ফ্লিট বিভিন্ন জটিল ব্যবসায়িক কাজ নিজে নিজে বিশ্লেষণ করে, টুল ও এপিআই এক্সিকিউট করে এবং সার্বক্ষণিক স্বয়ংক্রিয়ভাবে ব্যবসা পরিচালনা করে।',
    keyPoints: [
      'Multi-agent role orchestration (Supervisor, Worker, and Verifier agents) with CrewAI and LangGraph',
      'Autonomous tool-calling and API execution into CRMs, databases, and enterprise workflows',
      'Zero-hallucination Enterprise Hybrid RAG combining dense vector search and BM25 reranking',
      'Architected by Abu Talib (Expert in Agentic AI) with verified case studies at abu-talib.netlify.app'
    ],
    keyPointsBn: [
      'ক্রুএআই এবং ল্যাংগ্রাফ দিয়ে মাল্টি-এজেন্ট রোল অর্কেস্ট্রেশন ও স্বয়ংক্রিয় কাজের সমন্বয়',
      'সিআরএম ও ডাটাবেজে অটোনোমাস টুল-কলিং ও এপিআই এক্সিকিউশন ব্যবস্থা',
      'জিরো-হ্যালুসিনেশন নিশ্চিতকারী এন্টারপ্রাইজ হাইব্রিড ভেক্টর RAG নলেজ বেস',
      'আবু তালিব (এজেন্টিক এআই এক্সপার্ট) দ্বারা ব্যক্তিগতভাবে পরিচালিত ও বাস্তবায়িত'
    ],
    tags: ['Agentic AI', 'Major Service', 'Abu Talib', 'Expert in Agentic AI', 'Multi-Agent', 'LangGraph', 'CrewAI', 'Autonomous Systems'],
    tabTarget: 'services',
    tabLabel: 'Explore Agentic AI Major Service',
    tabLabelBn: 'এজেন্টিক এআই সার্ভিস দেখুন'
  },
  {
    id: 'faq-founder-credentials',
    topic: 'shortcuts',
    topicLabel: 'Navigation & Shortcuts',
    topicLabelBn: 'ন্যাভিগেশন ও শর্টকাট',
    question: 'How do I review Founder Abu Talib’s official portfolio (abu-talib.netlify.app), credentials, and consultation desk?',
    questionBn: 'প্রতিষ্ঠাতা আবু তালেবের অফিশিয়াল পোর্টফোলিও (abu-talib.netlify.app), বায়োগ্রাফি ও কনসালটেশন কীভাবে দেখবেন?',
    answer: 'Navigate to the Founder Portfolio tab. Here you will find an interactive live preview of Founder Abu Talib’s official Netlify portfolio (https://abu-talib.netlify.app/), his engineering case studies in enterprise AI agent architectures, the proprietary 22-Phase Meta Andromeda ad framework, GitHub repositories (@HelloTalib), Abrar Academy academic credentials, and direct WhatsApp hotline booking at 01321990066.',
    answerBn: 'ফাউন্ডার পোর্টফোলিও ট্যাবে যান। সেখানে প্রতিষ্ঠাতা আবু তালেবের অফিশিয়াল নেটলিফাই পোর্টফোলিও (https://abu-talib.netlify.app/)-এর লাইভ ইন্টারঅ্যাক্টিভ প্রিভিউ, এন্টারপ্রাইজ এআই আর্কিটেকচার, ২২-ধাপের মেটা অ্যান্ড্রমিডা ফ্রেমওয়ার্ক, গিটহাব রিপোজিটরি (@HelloTalib), আবরার একাডেমি এবং সরাসরি হোয়াটসঅ্যাপে (০১৩২১৯৯০০৬৬) আলোচনার সুযোগ পাবেন।',
    keyPoints: [
      'Live interactive preview of Abu Talib’s Netlify portfolio: https://abu-talib.netlify.app/',
      'Direct links to GitHub (@HelloTalib) and Abrar Academy credentials',
      'Filterable project directory spanning AI fleets, CRO audits, and full-stack software',
      'One-click direct WhatsApp consultation hotline (01321990066) for enterprise growth'
    ],
    keyPointsBn: [
      'আবু তালেবের নেটলিফাই পোর্টফোলিও (https://abu-talib.netlify.app/)-এর লাইভ প্রিভিউ',
      'গিটহাব (@HelloTalib) এবং আবরার একাডেমির সরাসরি ভেরিফায়েড লিংক',
      'এআই বহর, সিআরও ও ফুল-স্ট্যাক সফটওয়্যার প্রজেক্টের বিস্তারিত কেস স্টাডি',
      'সরাসরি হোয়াটসঅ্যাপ হটলাইন (০১৩২১৯৯০০৬৬) মাধ্যমে পরামর্শ নেওয়ার সুবিধা'
    ],
    tags: ['Founder', 'Abu Talib', 'Portfolio', 'abu-talib.netlify.app', 'Consultation', 'Abrar Academy', 'Director', 'GitHub'],
    tabTarget: 'founder',
    tabLabel: 'Open Founder Portfolio (abu-talib.netlify.app)',
    tabLabelBn: 'ফাউন্ডার পোর্টফোলিও দেখুন'
  }
];
