export interface BlueprintPhase {
  number: number;
  title: string;
  titleBn: string;
  category: 'Economics' | 'Validation' | 'Creative' | 'Tracking' | 'Campaign' | 'Diagnostic' | 'Scaling' | 'Retention';
  summary: string;
  summaryBn: string;
  actionItems: string[];
  keyRules?: string[];
  diagnosticTip?: string;
  iconName: string;
}

export interface DiagnosticIssue {
  id: string;
  symptom: string;
  symptomBn: string;
  rootCause: string;
  checklist: string[];
  solution: string;
  solutionBn: string;
}

export interface CreativeConceptType {
  id: number;
  name: string;
  nameBn: string;
  description: string;
  exampleHook: string;
  bestFor: string;
}

export interface OperatingDay {
  day: string;
  dayBn: string;
  focus: string;
  focusBn: string;
  tasks: string[];
}

export const BLUEPRINT_CORE_FORMULA = {
  equation: 'RESEARCH × OFFER × CREATIVE × DATA × DECISION × RETENTION = GROWTH SYSTEM',
  statementBn: 'Meta Ads business success guarantee করতে পারে না। Product-market fit, pricing, margin, operations, sales, fulfillment এবং customer experience-ও ফলাফলে বড় ভূমিকা রাখে। কিন্তু এই system অনুসরণ করলে random boosting-এর বদলে আপনি measurable, testable এবং repeatable growth process তৈরি করতে পারবেন।',
};

export const BLUEPRINT_FOUR_ENGINES = [
  {
    engine: 'ENGINE 1',
    name: 'MARKET',
    nameBn: 'মার্কেট ইঞ্জিন',
    elements: ['Research', 'Avatar Intelligence', 'Positioning'],
    description: 'Deep customer psychology, competitor mapping, and irresistible angle positioning before spending a single cent on ads.',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400'
  },
  {
    engine: 'ENGINE 2',
    name: 'MESSAGE',
    nameBn: 'মেসেজ ইঞ্জিন',
    elements: ['Irresistible Offer', 'Creative Signals', '8 Core Concepts'],
    description: 'Translating research into 8 distinct creative concepts that do the targeting work naturally inside Meta Andromeda.',
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400'
  },
  {
    engine: 'ENGINE 3',
    name: 'MACHINE',
    nameBn: 'মেশিন ইঞ্জিন',
    elements: ['Tracking & CAPI', 'Campaign Architecture', 'Conversion Signals', 'Meta Learning'],
    description: 'Feeding clean, trustworthy server-side signals to Meta Andromeda retrieval and ranking algorithms.',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400'
  },
  {
    engine: 'ENGINE 4',
    name: 'MONEY',
    nameBn: 'মানি ইঞ্জিন',
    elements: ['CPA', 'ROAS', 'Contribution Margin', 'AOV', 'LTV & Backend'],
    description: 'Rigorous unit economics, break-even math, and backend profit retention via CRM, SMS, WhatsApp & Email.',
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400'
  }
];

export const BLUEPRINT_22_PHASES: BlueprintPhase[] = [
  {
    number: 1,
    title: 'Business Economics',
    titleBn: 'বিজনেস ইকোনমিক্স আগে ঠিক করুন',
    category: 'Economics',
    summary: 'Calculate exact unit economics and break-even limits before launching ads. Decision first in economics, then ads metrics.',
    summaryBn: 'Ads চালানোর আগেই জানতে হবে একটি sale আপনার কাছে কতটা valuable। "CPA ৳২০০-এর বেশি হলে Ad বন্ধ করুন" জাতীয় অন্ধ নিয়ম বর্জন করুন।',
    actionItems: [
      'Product Selling Price নির্ধারণ',
      'Product Cost / COGS হিসাব',
      'Packaging & Warehousing Cost',
      'Delivery / Shipping Cost & Courier Return Ratio',
      'Payment Gateway / Cash-on-Delivery (COD) charge',
      'Calculate Break-even CPA (Contribution Margin)',
      'Calculate Target ROAS & Contribution Profit'
    ],
    keyRules: ['Decision আগে Economics, পরে Ads Metric। ৳৩০০ CPA এবং ৳৬০০ CPA—দুটোই profitable হতে পারে, কিন্তু profitability আলাদা।'],
    iconName: 'DollarSign'
  },
  {
    number: 2,
    title: 'Product & Market Validation',
    titleBn: 'প্রোডাক্ট ও মার্কেট ভ্যালিডেশন',
    category: 'Validation',
    summary: 'Evaluate product pain points, differentiators, and systematically study competitors reviews, complaints, and hooks.',
    summaryBn: 'নিজেকে ৭টি প্রশ্ন করুন: কোন specific problem solve করে? Customer কেন এটা কিনবে? Competitor-এর বদলে কেন আপনারটা নেবে?',
    actionItems: [
      '৭টি ভ্যালিডেশন প্রশ্নের উত্তর যাচাই',
      'Competitor Research Sheet পূরণ (Product → Price → Offer → Hook → Creative → Reviews → Complaints → USP → Funnel → CTA)',
      'Customer reviews ও comments থেকে Pain + Desire + Objection + Customer Language সংগ্রহ',
      'Customer Language-কে Creative Signal হিসেবে ড্রাফট করা'
    ],
    keyRules: ['Customer reviews ও comments থেকে পাওয়া ভাষাই আপনার পরবর্তী সবচেয়ে শক্তিশালী Creative Signal।'],
    iconName: 'CheckSquare'
  },
  {
    number: 3,
    title: 'Customer Research / Avatar Intelligence',
    titleBn: 'কাস্টমার রিসার্চ ও অবতার ইন্টেলিজেন্স',
    category: 'Validation',
    summary: 'Go beyond shallow demographics. Map demographic, psychographic, behavioral, and buying psychology layers.',
    summaryBn: 'শুধু "Male, 25–45, Dhaka" ডিফাইন করা যথেষ্ট নয়। গভীর সাইকোগ্রাফিক এবং ক্রয় অনুপ্রেরণা ম্যাপ করুন।',
    actionItems: [
      'Layer A: Demographic (Age, Location, Income context, Life stage)',
      'Layer B: Psychographic (Dream, Desire, Fear, Frustration, Identity)',
      'Layer C: Behavioral (কী কেনে? কী সার্চ করে? কী অবজেকশনে পারচেজ ডিলে করে?)',
      'Layer D: Buying Psychology (Problem → Pain → Desire → Fear → Objection → Trigger)',
      'আউটপুট: ১–৩টি Customer Avatars + Customer Journey + Pain/Desire/Objection Database'
    ],
    iconName: 'Users'
  },
  {
    number: 4,
    title: 'Positioning & Offer Engineering',
    titleBn: 'পজিশনিং ও অফার ইঞ্জিনিয়ারিং',
    category: 'Economics',
    summary: 'Good ads cannot save a weak offer. Engineer an irresistible Core Offer and build a scalable Value Ladder.',
    summaryBn: 'Core Offer = Product + Main Benefit + Differentiator + Proof + Risk Reversal + CTA। ভুয়া স্ক্যারসিটি ছাড়া জেনুইন অফার দিন।',
    actionItems: [
      'Core Offer নির্মাণ (বেনিফিট, ডিফারেনশিয়েটর, প্রুফ, রিস্ক রিভার্সাল)',
      'Value Ladder তৈরি: Lead Magnet → Entry Offer → Core Product → Upsell → Cross-sell → Repeat Purchase → Premium Offer',
      'Genuine Offer Boosters: Bundle, Bonus, Free Delivery, Guarantee, Limited stock/time',
      'কঠোর নিয়ম: Fake scarcity বা fake timer পরিহার করুন'
    ],
    iconName: 'Gift'
  },
  {
    number: 5,
    title: 'Funnel Architecture & QA',
    titleBn: 'ফানেল তৈরি ও কোয়ালিটি অডিট',
    category: 'Campaign',
    summary: 'Traffic পাঠানো broken funnel-এ মানে টাকা নষ্ট করা। Ensure message continuity between ad hook and landing page.',
    summaryBn: 'Ad-এর প্রমিজের সাথে ল্যান্ডিং পেজের হেডলাইনের মিল আছে কি না নিশ্চিত করুন। চেকআউট ফ্রিকশন দূর করুন।',
    actionItems: [
      'Mobile load speed অডিট (২ সেকেন্ডের নিচে)',
      'Headline ও Ad Promise মেসেজ ম্যাচিং',
      'ক্লিয়ার প্রোডাক্ট বেনিফিট ও ট্রান্সপারেন্ট প্রাইসিং',
      'সোশ্যাল প্রুফ ও অবজেকশন হ্যান্ডলিং সেকশন',
      'স্মুথ ১-ক্লিক বা মিনিমাল স্টেপ চেকআউট / লিড ফর্ম',
      'WhatsApp / Phone কল বাটন ও অটোমেটেড অর্ডার কনফার্মেশন টেস্ট'
    ],
    iconName: 'Layers'
  },
  {
    number: 6,
    title: 'Tracking & Conversion Signals',
    titleBn: 'ট্র্যাকিং ও কনভার্সন সিগন্যাল',
    category: 'Tracking',
    summary: 'Feed Meta clean, trustworthy data. Implement Meta Pixel + Conversions API (CAPI) with full event currency and value.',
    summaryBn: 'Garbage Signal In → Weak Learning Out। ট্র্যাকিং ভুল হলে Meta অ্যালগরিদমের অপ্টিমাইজেশন ভুল হবে।',
    actionItems: [
      'Meta Business Portfolio ও ডোমেইন ভেরিফিকেশন',
      'Meta Pixel + Conversions API (CAPI) ফুল সার্ভার-সাইড সেটআপ',
      'E-commerce Standard Events: ViewContent → AddToCart → InitiateCheckout → Purchase',
      'Purchase ইভেন্টে Value এবং Currency (BDT/USD) সঠিকভাবে পাস করা টেস্ট করা',
      'UTM tracking ও CRM ডাটাবেজ ইন্টিগ্রেশন'
    ],
    keyRules: ['Garbage Signal In → Weak Learning Out। ট্র্যাকিং ভুল হলে optimization decision-ও ভুল হতে পারে।'],
    iconName: 'Cpu'
  },
  {
    number: 7,
    title: 'Creative Signal Matrix',
    titleBn: 'ক্রিয়েটিভ সিগন্যাল ম্যাট্রিক্স',
    category: 'Creative',
    summary: 'Translate customer research into specific creative signals: Persona, Problem, Desire, Mechanism, Benefit, Proof, Objection, CTA.',
    summaryBn: 'আধুনিক মেটা বিজ্ঞাপনের মূল চালিকাশক্তি "targeting hack" নয়, বরং একটি সুশৃঙ্খল "creative operating system"।',
    actionItems: [
      'Persona: কার জন্য এই সমাধান?',
      'Problem: মূল সমস্যা কী?',
      'Desire: কাস্টমার অবচেতনভাবে কী রূপান্তর চায়?',
      'Mechanism: কেন এবং কীভাবে এই প্রোডাক্ট কাজ করে?',
      'Proof: গ্রাহক কেন বিশ্বাস করবে?',
      'Objection: কী কারণে এখন পর্যন্ত কিনছে না?',
      'Offer: এখনই কেনার উপযুক্ত কারণ কী?',
      'CTA: এরপর গ্রাহকের করণীয় কী?'
    ],
    iconName: 'Grid'
  },
  {
    number: 8,
    title: 'Creative Concepts Development',
    titleBn: '৮টি মিনিংফুল ক্রিয়েটিভ কনসেপ্ট তৈরি',
    category: 'Creative',
    summary: 'Do not just change background colors. Build 5-8 fundamentally different conceptual creative angles.',
    summaryBn: 'একই ছবি ১০ বার কালার চেঞ্জ করা ১০টি কনসেপ্ট নয়। ৮টি ভিন্ন মনস্তাত্ত্বিক কোণ থেকে বিজ্ঞাপন তৈরি করুন।',
    actionItems: [
      'Concept 1: Problem-Focused (Customer-এর মূল পেইন)',
      'Concept 2: Desire-Focused (Desired Transformation)',
      'Concept 3: Product Demo (প্রোডাক্ট কীভাবে লাইভ কাজ করে)',
      'Concept 4: Mechanism / Education (কেন এই সলিউশন কাজ করে)',
      'Concept 5: Social Proof (রিভিউ, টেস্টমোনিয়াল, কেস স্টাডি)',
      'Concept 6: Objection Handling (দাম, কোয়ালিটি, ডেলিভারি ভয়)',
      'Concept 7: Old Way vs New Way Comparison',
      'Concept 8: Irresistible Offer / Bundle'
    ],
    iconName: 'Sparkles'
  },
  {
    number: 9,
    title: 'Placement-Ready Creative Production',
    titleBn: 'প্লেসমেন্ট-রেডি ক্রিয়েটিভ প্রোডাকশন',
    category: 'Creative',
    summary: 'Produce vertical 9:16 Reels with audio & safe zones, static comparison graphics, and UGC-style structured videos.',
    summaryBn: 'Reels-এর ক্ষেত্রে 9:16 vertical video, অডিও এবং গুরুত্বপূর্ণ মেসেজ সেফ-জোনে রাখা বাধ্যতামূলক।',
    actionItems: [
      'Reels ও স্টোরির জন্য 9:16 রেশিও এবং সেফ-জোন রুলস মানা',
      'হাই-রিটেনশন ভিডিও স্ট্রাকচার: Hook → Problem → Mechanism/Solution → Demo/Proof → Offer → CTA',
      'হাই-কনট্রাস্ট স্ট্যাটিক ইনফোগ্রাফিক ও ক্যারোসেল ডিজাইন',
      'ইউজার জেনারেটেড কনটেন্ট (UGC) এবং ফাউন্ডার এক্সপ্লেইনার ভিডিও'
    ],
    iconName: 'Video'
  },
  {
    number: 10,
    title: 'Simplified Campaign Architecture',
    titleBn: 'সিম্প্লিফাইড ক্যাম্পেইন আর্কিটেকচার',
    category: 'Campaign',
    summary: 'Consolidate budget to allow Meta machine learning to exit learning phase fast. Avoid 10 campaigns × 20 ad sets trap.',
    summaryBn: 'শুরুতেই অযথা জটিল ক্যাম্পেইন নয়। লার্নিং কেন্দ্রীভূত করতে ক্লিন এবং সিম্পল আর্কিটেকচার ব্যবহার করুন।',
    actionItems: [
      'Sales বিজনেসের জন্য সরাসরি "Sales" অবজেক্টিভ নির্বাচন',
      'Lead বিজনেসের জন্য কোয়ালিফাইড Lead অবজেক্টিভ নির্বাচন',
      'অযথা ২০টি অ্যাডসেটে বাজেট না ছড়িয়ে ৩-৫টি স্ট্রং অ্যাডসেটে বাজেট কনসেন্ট্রেট করা',
      'CBO / Advantage+ Campaign Budget স্ট্র্যাটেজি বিবেচনা'
    ],
    iconName: 'Workflow'
  },
  {
    number: 11,
    title: 'Audience Strategy & Andromeda Perspective',
    titleBn: 'অডিয়েন্স স্ট্র্যাটেজি ও অ্যান্ড্রোমিডা ইঞ্জিন',
    category: 'Campaign',
    summary: 'Meta Andromeda personalized retrieval engine selects relevant ads from huge candidate pools using semantic signals.',
    summaryBn: 'অডিয়েন্স রিসার্চ বাদ দেবেন না, বরং রিসার্চের ইনপুট Creative + Offer + Message + Landing Page-এ প্রয়োগ করুন।',
    actionItems: [
      'Broad / Advantage+ Audience টেস্টিং',
      'প্রমাণিত Interest / Lookalike / Custom Audience ব্যাকআপ',
      'Retargeting পুল তৈরি (Website Visitors, ATC, Video Viewers, IG Engagers, Customer Database)',
      'অ্যান্ড্রোমিডা ইঞ্জিনের জন্য ক্রিয়েটিভের কনটেন্ট ও কপি অপ্টিমাইজেশন'
    ],
    iconName: 'Compass'
  },
  {
    number: 12,
    title: 'Pre-Launch QA Checklist',
    titleBn: 'প্রি-লঞ্চ কোয়ালিটি চেকলিস্ট',
    category: 'Campaign',
    summary: 'Comprehensive 18-point verification before publishing any campaign to prevent budget leakage and pixel mismatch.',
    summaryBn: 'পাবলিশ করার আগেই ট্র্যাকিং, লিংক, মোবাইল প্রিভিউ ও বাজেট ভেরিফাই করে নিন।',
    actionItems: [
      'Correct Campaign Objective & Conversion Event (Purchase/Lead)',
      'Pixel / Dataset & Active CAPI connection verified',
      'Target Page & Instagram account properly linked',
      'Destination URLs with proper UTM tags verified',
      'Daily Budget, Schedule & Location targeting checked',
      'Mobile preview & Reels safe-zone text cut-off verified',
      'Policy compliance & ad claim risk check'
    ],
    iconName: 'CheckCircle2'
  },
  {
    number: 13,
    title: 'Test Without Panic',
    titleBn: 'প্যানিক ছাড়া টেস্ট করুন',
    category: 'Diagnostic',
    summary: 'Do not panic-pause ads after 3 hours. Follow the 6-step Diagnostic Ladder systematically.',
    summaryBn: 'Launch করার কয়েক ঘন্টা পরেই "Sale নেই—সব বন্ধ!" এভাবে সিদ্ধান্ত নেওয়া যাবে না। ডাটা সংগ্রহ করুন।',
    actionItems: [
      'Diagnostic Ladder: Delivery → Attention → Click → Landing Page → Conversion → Economics',
      'পর্যাপ্ত ইমপ্রেশন ও ক্লিকের আগে বিজ্ঞাপন বন্ধ না করা',
      'ধাপ ১: Delivery (Spend + Reach + Impressions + CPM যাচাই)',
      'ধাপ ২: Attention (CTR + Video Retention + 3s Hook Rate যাচাই)',
      'ধাপ ৩: Traffic (Link Click → CPC → Landing Page View যাচাই)'
    ],
    iconName: 'AlertCircle'
  },
  {
    number: 14,
    title: 'Root-Cause Problem Diagnosis',
    titleBn: 'সমস্যা কোথায় তা নিখুঁত বের করুন',
    category: 'Diagnostic',
    summary: 'Identify the exact bottleneck: CPM spike, low CTR, link click to LP drop, LP to checkout drop, or checkout to sale drop.',
    summaryBn: 'এই diagnostic mindset-টাই expert media buying-এর মূল ভিত্তি।',
    actionItems: [
      'CPM সমস্যা → Market/Auction + Audience + Creative Relevance সমাধান',
      'CTR খারাপ → Hook + Message + Visual + Relevance ইম্প্রুভমেন্ট',
      'Click ভালো কিন্তু Landing Page View কম → Page Speed ও টেকনিক্যাল সমস্যা ফিক্স',
      'Traffic ভালো কিন্তু Conversion খারাপ → Offer + Trust + Price + Message Match ফিক্স',
      'Add to Cart ভালো কিন্তু Purchase কম → Checkout friction, Delivery Charge, বা পেমেন্ট জটিলতা দূর',
      'Leads সস্তা কিন্তু Sales নেই → Lead Qualification ও সেলস টিমের কল রেসপন্স টাইম বৃদ্ধি'
    ],
    iconName: 'Search'
  },
  {
    number: 15,
    title: 'Identify Full-Stack Winners',
    titleBn: 'প্রকৃত উইনার চিহ্নিত করুন',
    category: 'Scaling',
    summary: 'Look for more than just "Best Ad". Identify Winning Persona, Problem, Angle, Hook, Format, Offer, and Landing Page.',
    summaryBn: 'শুধু সেরা বিজ্ঞাপন নয়, কেন এটি কাজ করল তার কারণ (Why did this work?) বিশ্লেষণ করে ডকুমেন্ট করুন।',
    actionItems: [
      'Winning Persona ও Winning Problem আইডেন্টিফাই করা',
      'Winning Angle ও Winning Hook ম্যাপিং',
      'Winning Format (Video vs Carousel vs Static) চিহ্নিত করা',
      'Winning Offer ও Winning Landing Page ডকুমেন্টেশন',
      'Agency Creative Intelligence Database-এ সংরক্ষণ'
    ],
    iconName: 'Award'
  },
  {
    number: 16,
    title: 'Iterate from Winners',
    titleBn: 'উইনার থেকে নতুন ইটারেশন তৈরি',
    category: 'Creative',
    summary: 'Do not start from scratch every time. Spin winning concepts into 5 new hooks, 3 visual openings, 2 creators, and 2 CTAs.',
    summaryBn: 'উইনিং অ্যাড বন্ধ করে প্রতিবার শূন্য থেকে শুরু করবেন না। একটি উইনার থেকে একাধিক শক্তিশালী ভেরিয়েশন বানান।',
    actionItems: [
      '৫টি নতুন হুক (5 New Hooks)',
      '৩টি ভিন্ন ভিজ্যুয়াল ওপেনিং (3 Visual Openings)',
      '২জন ভিন্ন ক্রিয়েটর / ভয়েসওভার (2 Creators)',
      '২টি ভিন্ন সোশ্যাল প্রুফ প্রেজেন্টেশন (2 Proof Types)',
      '২টি বিকল্প CTA ও অফার প্রেজেন্টেশন',
      'Hypothesis-based ব্যাচে সুশৃঙ্খল টেস্টিং'
    ],
    iconName: 'Repeat'
  },
  {
    number: 17,
    title: 'Strategic Scaling',
    titleBn: 'ক্যালকুলেটেড স্কেলিং ফ্রেমওয়ার্ক',
    category: 'Scaling',
    summary: 'Scale profitably across 3 vectors: Vertical budget scaling, Horizontal creative scaling, and Audience/Market expansion.',
    summaryBn: 'Profitable system পাওয়ার পরেই স্কেলিং। অন্ধভাবে বাজেট বাড়ালে ROAS ক্র্যাশ করবে।',
    actionItems: [
      'Vertical Scaling: প্রমাণিত উইনিং ক্যাম্পেইনে ১৫–২০% হারে বাজেট বৃদ্ধি',
      'Horizontal Creative Scaling: নতুন কনসেপ্ট, হুক, ফরম্যাট এবং ইউসক্যাস যোগ করা',
      'Audience / Market Scaling: নতুন জিওগ্রাফি, নতুন কাস্টমার সেগমেন্ট এবং ব্রড সুযোগ অন্বেষণ',
      'Unit Economics সীমার মধ্যে রেখে স্কেলিং নিশ্চিত করা'
    ],
    iconName: 'TrendingUp'
  },
  {
    number: 18,
    title: 'Retargeting & Backend Profit Engine',
    titleBn: 'রিটার্গেটিং ও ব্যাকএন্ড প্রফিট সিস্টেম',
    category: 'Retention',
    summary: 'Front-end ROAS is not the whole business. Retarget with stage-specific messages and capture backend profit via CRM.',
    summaryBn: 'কারণ Front-end ROAS-ই পুরো বিজনেস নয়। দ্বিতীয় পারচেজেই মূল ব্যবসায়িক প্রফিট তৈরি হয়।',
    actionItems: [
      'Visitor Retargeting: এডুকেশন + বেনিফিট ফোকাসড মেসেজ',
      'Product Viewer Retargeting: সোশ্যাল প্রুফ + ম্যাকানিজম এক্সপ্লেইনার',
      'Cart/Checkout Drop Retargeting: অবজেকশন হ্যান্ডলিং + ট্রাস্ট + জেনুইন ইনসেন্টিভ',
      'Existing Customer Retargeting: Cross-sell + Upsell + Repeat Purchase',
      'Email + WhatsApp + SMS + CRM মাল্টি-চ্যানেল কন্টিনিউয়েশন সিস্টেম'
    ],
    iconName: 'RefreshCw'
  },
  {
    number: 19,
    title: 'Weekly Meta Ads Operating System',
    titleBn: 'সাপ্তাহিক মেটা অ্যাডস অপারেটিং সিস্টেম',
    category: 'Campaign',
    summary: 'Structured weekly execution rhythm: Monday Data Review, Tuesday Creative, Wed Research, Thu Production, Fri Testing, Weekend Review.',
    summaryBn: 'প্রতি সপ্তাহে একটি সুশৃঙ্খল রুটিন মেনে চলুন যাতে অ্যাড পারফরম্যান্স অনুমানযোগ্য ও নিয়ন্ত্রিত থাকে।',
    actionItems: [
      'Monday: Data Review (গত সপ্তাহের বিজনেস ও ফানেল পারফরম্যান্স পর্যালোচনা)',
      'Tuesday: Creative Analysis (উইনিং/লুজিং কনসেপ্ট এবং হুক বিশ্লেষণ)',
      'Wednesday: New Research (রিভিউ, কমেন্টস, কম্পিটিটর স্পাই ও সেলস কল ফিডব্যাক)',
      'Thursday: Creative Production (নতুন কনসেপ্ট ও উইনার ইটারেশন প্রোডাকশন)',
      'Friday: Controlled Testing (নিয়ন্ত্রিত ক্রিয়েটিভ টেস্ট লঞ্চ)',
      'Weekend: Business Review (Revenue, CPA, ROAS, AOV, LTV এবং পরবর্তী সপ্তাহের হাইপোথিসিস ড্রাফট)'
    ],
    iconName: 'Calendar'
  },
  {
    number: 20,
    title: 'Systemic Scaling & Budget Allocation',
    titleBn: 'সিস্টেমেটিক স্কেলিং ও বাজেট বন্টন',
    category: 'Scaling',
    summary: 'Maintain 70% budget on winning campaigns, 20% on testing iterations, and 10% on bold new concepts.',
    summaryBn: 'বাজেট বণ্টন সবসময় লার্নিং ও স্কেলিংয়ের ভারসাম্য রক্ষা করে পরিচালিত হওয়া উচিত।',
    actionItems: [
      '৭০% বাজেট মূল স্কেলিং ও রেভিনিউ জেনারেটিং ক্যাম্পেইনে রাখা',
      '২০% বাজেট উইনারদের নতুন ভ্যারিয়েশন ও ইটারেশন টেস্টে নিয়োজিত করা',
      '১০% বাজেট সম্পূর্ণ নতুন হাইপোথিসিস ও ক্রিয়েটিভ অ্যাঙ্গেলে ব্যয় করা'
    ],
    iconName: 'PieChart'
  },
  {
    number: 21,
    title: 'Omnichannel Conversion Continuation',
    titleBn: 'অমনিচ্যানেল কনভার্সন কন্টিনিউয়েশন',
    category: 'Retention',
    summary: 'Connect Meta ads with WhatsApp automated flows, SMS reminders, and Tele-sales closing teams.',
    summaryBn: 'সোশ্যাল মিডিয়া ট্রাফিককে নিজস্ব ডাটাবেজ এবং ডিরেক্ট কমিউনিকেশন চ্যানেলে রূপান্তর করুন।',
    actionItems: [
      'WhatsApp Business API অটোমেশন ও ইনস্ট্যান্ট ওয়েলকাম ফ্লো',
      'অর্ডার কনফার্মেশন ও শিপিং আপডেট SMS নোটিফিকেশন',
      'ইনকমপ্লিট চেকআউট রিকভারি কন্টিনিউয়েশন ক্যাম্পেইন',
      'হাই-টিকেট পণ্যের জন্য টেলি-সেলস টিমের ৫ মিনিটের মধ্যে কল কল ব্যাক'
    ],
    iconName: 'MessageSquare'
  },
  {
    number: 22,
    title: 'Repeat Purchase & Lifetime Value (LTV)',
    titleBn: 'রিপিট পারচেজ ও লাইফটাইম ভ্যালু (LTV) ইঞ্জিন',
    category: 'Retention',
    summary: 'The ultimate moat: Turning a one-time buyer into a high-LTV brand advocate through exceptional post-purchase experience.',
    summaryBn: 'First Sale → Second Sale → Repeat Customer → Loyal Advocate। এটিই একটি টেকসই ব্র্যান্ডের গোপন শক্তি।',
    actionItems: [
      'আনবক্সিং এক্সপেরিয়েন্স ও ভিআইপি ডিসকাউন্ট ইনসার্ট',
      '৩০ ও ৬০ দিনের রি-অর্ডার রিমাইন্ডার সিকোয়েন্স',
      'এক্সক্লুসিভ VIP ক্লাব বা লয়্যালটি রিওয়ার্ড প্রোগ্রাম',
      'কাস্টমার স্যাটিসফ্যাকশন সার্ভে ও রেফারেল বোনাস সিস্টেম'
    ],
    iconName: 'HeartHandshake'
  }
];

export const BLUEPRINT_DIAGNOSTIC_ISSUES: DiagnosticIssue[] = [
  {
    id: 'cpm_high',
    symptom: 'Extremely High CPM ($5+ or ৳500+)',
    symptomBn: 'অস্বাভাবিক বেশি CPM (৳৫০০+ বা $৫+)',
    rootCause: 'High auction competition, saturated or overly narrowed audience, poor ad relevance, or negative user feedback reports.',
    checklist: [
      'অডিয়েন্স সাইজ কি খুব ছোট (<৫০,০০০)?',
      'ক্রিয়েটিভে কি কোনো ক্লিকবেট বা পলিসি সেনসিটিভ শব্দ আছে?',
      'অ্যাকাউন্ট ফিডব্যাক স্কোর কি কমে গেছে?'
    ],
    solution: 'Widen audience to Broad / Advantage+, refresh creative hooks with high-engagement native formats, and remove policy borderline claims.',
    solutionBn: 'অডিয়েন্স ব্রড করুন, অ্যাড কপি থেকে হাইপ বা বিতর্কিত শব্দ বাদ দিন এবং ফ্রেশ হুক টেস্ট করুন।'
  },
  {
    id: 'ctr_low',
    symptom: 'Low Outbound CTR (<1.0%)',
    symptomBn: 'আউটবাউন্ড CTR খুব খারাপ (<১.০%)',
    rootCause: 'Weak hook in first 3 seconds, unreadable typography, boring visual opening, or irrelevant message mismatch with target audience.',
    checklist: [
      'ভিডিওর প্রথম ৩ সেকেন্ডে কি থাম্ব-স্টপিং কোনো অ্যাকশন বা কথা আছে?',
      'থাম্বনেইল বা স্ট্যাটিক ইমেজের টেক্সট কি মোবাইলে পরিষ্কার পড়া যায়?',
      'কাস্টমারের মূল পেইন কি সরাসরি তুলে ধরা হয়েছে?'
    ],
    solution: 'Test 5 aggressive new hooks (curiosity, controversy, direct pain callout), use larger high-contrast captions, and show product in use within first 2 seconds.',
    solutionBn: 'প্রথম ২ সেকেন্ডেই প্রোডাক্ট ডেমো বা মূল পেইন কলআউট করুন, সাবটাইটেল আরও স্পষ্ট করুন।'
  },
  {
    id: 'click_to_lp_drop',
    symptom: 'High Clicks, Low Landing Page Views (>30% drop)',
    symptomBn: 'ক্লিক অনেক কিন্তু ল্যান্ডিং পেজ ভিউ কম (৩০%+ ড্রপ)',
    rootCause: 'Slow mobile landing page load speed (>3s), broken URL redirects, unoptimized heavy imagery, or server latency.',
    checklist: [
      'মোবাইলে ৪G নেটওয়ার্কে পেজ লোড হতে কি ৩ সেকেন্ডের বেশি সময় নিচ্ছে?',
      'হেভি আনকম্প্রেসড ইমেজ বা অপ্রয়োজনীয় থার্ড-পার্টি স্ক্রিপ্ট আছে কি?',
      'মোবাইল ব্রাউজারে কি রিডাইরেক্ট ইরর হচ্ছে?'
    ],
    solution: 'Compress images with WebP, enable CDN caching, remove heavy tracking scripts, and ensure mobile loading completes under 2.0 seconds.',
    solutionBn: 'ইমেজ অপ্টিমাইজ করুন, লাইটওয়েট ল্যান্ডিং পেজ ব্যবহার করুন এবং মোবাইল পেজ স্পিড ২ সেকেন্ডের নিচে আনুন।'
  },
  {
    id: 'traffic_to_conv_drop',
    symptom: 'Great Traffic, Zero or Poor Conversion Rate (<1%)',
    symptomBn: 'ট্র্যাফিক প্রচুর কিন্তু পারচেজ বা সেলস খুবই কম (<১%)',
    rootCause: 'Message mismatch between ad hook and landing page, confusing pricing, lack of customer reviews, or weak value proposition.',
    checklist: [
      'অ্যাডে যে অফার বা প্রমিজ করা হয়েছে ল্যান্ডিং পেজের হেডিংয়ে কি ঠিক সেটাই লেখা আছে?',
      'প্রোডাক্টের আসল ছবি ও কাস্টমার ভিডিও রিভিউ আছে কি?',
      'দাম বা শিপিং চার্জ কি স্পষ্ট নাকি কোনো লুকানো ফি আছে?'
    ],
    solution: 'Align the exact headline from your winning ad into your landing page hero, add verified photo reviews, clarify delivery charges, and add a risk-free guarantee.',
    solutionBn: 'অ্যাডের হেডলাইনের সাথে ল্যান্ডিং পেজের শীর্ষ হেডলাইন মিলিয়ে নিন, জেনুইন কাস্টমার রিভিউ ও গ্যারান্টি যোগ করুন।'
  },
  {
    id: 'atc_to_purchase_drop',
    symptom: 'High Add-To-Cart, Low Checkout/Purchase (<30% completion)',
    symptomBn: 'অ্যাড টু কার্ট অনেক কিন্তু পারচেজ হচ্ছে না',
    rootCause: 'High surprise delivery fee at checkout, mandatory account registration friction, lack of Cash-On-Delivery, or untrusted payment gateway.',
    checklist: [
      'চেকআউট পেজে গিয়ে অতিরিক্ত ডেলিভারি ফি দেখে কি গ্রাহক ড্রপ করছে?',
      'অর্ডার করতে কি লম্বা পাসওয়ার্ড দিয়ে অ্যাকাউন্ট খোলা বাধ্যতামূলক করা হয়েছে?',
      'ক্যাশ-অন-ডেলিভারি (COD) বা বিকাশ/কার্ড পেমেন্ট অপশন ঠিকঠাক কাজ করছে?'
    ],
    solution: 'Offer free delivery or transparent flat delivery fee, enable 1-step guest checkout (Name + Phone + Address), and provide WhatsApp direct order fallback.',
    solutionBn: 'চেকআউট ফর্ম ১-স্টেপে নিয়ে আসুন (শুধু নাম, ঠিকানা, ফোন নম্বর), অতিরিক্ত ফি লুকাবেন না।'
  },
  {
    id: 'leads_cheap_no_sales',
    symptom: 'Leads are Cheap (৳20-50), but Sales/Closing is Zero',
    symptomBn: 'লিড খুব সস্তা হলেও বিক্রি বা কনভার্সন হচ্ছে না',
    rootCause: 'Weak qualification questions on lead form, generic lead magnet attracting freebie seekers, or slow sales call response time (>15 mins).',
    checklist: [
      'ফর্মের ভেতর কি কোনো কোয়ালিফিকেশন প্রশ্ন (বাজেট/জরুরি প্রয়োজন) আছে?',
      'লিড সাবমিটের কত মিনিট পর আপনার সেলস টিম কল দিচ্ছে? (১৫ মিনিটের বেশি হলে কনভার্সন ৮০% কমে যায়)',
      'কাস্টমার কি জানত যে তারা একটি পেইড সার্ভিসের জন্য সাইনআপ করেছে?'
    ],
    solution: 'Add 2-3 qualifying questions (intent & budget), set up instant WhatsApp automation within 60 seconds, and mandate sales calling within 10 minutes of lead submission.',
    solutionBn: 'ফর্মে বাজেট সংক্রান্ত ফিল্টারিং প্রশ্ন রাখুন এবং লিড আসার ৫-১০ মিনিটের মধ্যে দ্রুত কল ব্যাক নিশ্চিত করুন।'
  }
];

export const BLUEPRINT_WEEKLY_OS: OperatingDay[] = [
  {
    day: 'Monday',
    dayBn: 'সোমবার',
    focus: 'Data & Funnel Performance Review',
    focusBn: 'ডাটা ও ফানেল অডিট',
    tasks: [
      'গত সপ্তাহের spend, reach, CPM, frequency, link clicks, CPC এবং landing page views অডিট',
      'Break-even CPA বনাম Actual CPA তুলনা',
      'যেসব অ্যাডসেট বা ক্রিয়েটিভ টার্গেট CPA-এর বাইরে ৩ দিন ধরে পারফর্ম করছে সেগুলো পজ বা বাজেট কমানো',
      'সপ্তাহের মূল ফোকাস ও টার্গেট বাজেট নির্ধারণ'
    ]
  },
  {
    day: 'Tuesday',
    dayBn: 'মঙ্গলবার',
    focus: 'Creative Analysis & Hook Retention Audit',
    focusBn: 'ক্রিয়েটিভ ও হুক বিশ্লেষণ',
    tasks: [
      'কোন ক্রিয়েটিভ কনসেপ্ট বেশি কনভার্সন আনল তা চিহ্নিত করা',
      'ভিডিও অ্যাডগুলোর ৩-সেকেন্ড হুক রেট ও অ্যাভারেজ ওয়াচ টাইম যাচাই',
      'Winning Angle এবং losing angle চিহ্নিত করে টিম মিটিংয়ে উপস্থাপন',
      'পরবর্তী ব্যাচ ক্রিয়েটিভের জন্য হাইপোথিসিস অনুমোদন'
    ]
  },
  {
    day: 'Wednesday',
    dayBn: 'বুধবার',
    focus: 'New Customer Research & Objection Mining',
    focusBn: 'নতুন কাস্টমার রিসার্চ ও অবজেকশন মাইনিং',
    tasks: [
      'রিসেন্ট কাস্টমার কমেন্টস, ফেসবুক মেসেজ ও রিভিউ স্টাডি করা',
      'সেলস টিম বা কাস্টমার সাপোর্টের সাথে কথা বলে প্রধান ৩টি অবজেকশন সংগ্রহ',
      'প্রতিযোগীদের নতুন রান হওয়া অ্যাড ও অফার বিশ্লেষণ',
      'Creative Signal Matrix আপডেট করা'
    ]
  },
  {
    day: 'Thursday',
    dayBn: 'বৃহস্পতিবার',
    focus: 'Creative Production & Iterations',
    focusBn: 'ক্রিয়েটিভ প্রোডাকশন ও ইটারেশন',
    tasks: [
      'উইনিং অ্যাডের জন্য ৫টি নতুন হুক ও ৩টি নতুন ভিজ্যুয়াল ওপেনিং শুট/ডিজাইন',
      '১-২টি সম্পূর্ণ নতুন বোল্ড কনসেপ্ট তৈরি',
      'Reels ফরম্যাট 9:16 সেফ-জোন ও সাবটাইটেল কোয়ালিটি চেক',
      'অ্যাড কপি ও কল-টু-অ্যাকশন ফাইনাল করা'
    ]
  },
  {
    day: 'Friday',
    dayBn: 'শুক্রবার',
    focus: 'Controlled Testing & Campaign Launch',
    focusBn: 'কন্ট্রোল্ড টেস্টিং ও লঞ্চ',
    tasks: [
      'Pre-Launch QA চেকলিস্টের ১৮টি পয়েন্ট ভেরিফাই করা',
      'নিয়ন্ত্রিত বাজেটে নতুন টেস্ট অ্যাডসেট চালু করা (Testing Sandbox)',
      'পিক্সেল ইভেন্ট ও UTM প্যারামিটার ফায়ারিং লাইভ টেস্ট করা',
      'উইনিং ক্যাম্পেইনে স্কেলিং বাজেট অ্যাডজাস্টমেন্ট (১৫-২০% বৃদ্ধি)'
    ]
  },
  {
    day: 'Saturday & Sunday',
    dayBn: 'শনিবার ও রবিবার',
    focus: 'Weekend Economics & Next-Week Hypothesis',
    focusBn: 'উইকেন্ড ইকোনমিক্স ও পরবর্তী হাইপোথিসিস',
    tasks: [
      'মোট রেভিনিউ, গ্রস মার্জিন, ডেলিভারি রিটার্ন রেশিও এবং নেট কন্ট্রিবিউশন হিসাব',
      'AOV ও ব্লেন্ডেড ROAS ক্যালকুলেশন',
      'ব্যাকএন্ড রিটার্গেটিং ও CRM কনভার্সন রিকভারি স্ট্যাটাস',
      'পরবর্তী সপ্তাহের জন্য সুনির্দিষ্ট হাইপোথিসিস ড্রাফট প্রস্তুত'
    ]
  }
];

export const BLUEPRINT_UNIT_ECONOMICS_EXAMPLE = {
  currency: '৳ (BDT)',
  sellingPrice: 2000,
  cogs: 700,
  packaging: 100,
  delivery: 150,
  paymentCodFee: 50,
  variableOps: 200,
  totalVariableCost: 1200,
  contributionMargin: 800,
  breakEvenCpa: 800,
  breakEvenRoas: 2.50, // 2000 / 800
  targetCpaConservative: 400, // 50% profit
  targetRoasConservative: 5.0, // 2000 / 400
  targetCpaAggressive: 600, // 25% profit
  targetRoasAggressive: 3.33,
  insightBn: 'Selling Price ৳2,000 হলে এবং Product + Packaging + Delivery + Variable Cost ৳1,200 হলে Contribution Margin ৳800। অর্থাৎ ৳800 CPA-তে আপনি Break-even এ থাকবেন। তাই ৳300 CPA এবং ৳600 CPA দুটোতেই প্রফিট হয়, কিন্তু মার্জিনের গভীরতা আলাদা।'
};
