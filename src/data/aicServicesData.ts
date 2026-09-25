import { 
  GrowthStage, 
  GrowthStageMeta, 
  AicServiceCategory, 
  AicPackage 
} from '../types';

export const GROWTH_STAGES: GrowthStageMeta[] = [
  {
    id: 'diagnose',
    stepNumber: 1,
    label: 'Diagnose',
    labelBn: 'ডায়াগনোসিস ও অডিট',
    tagline: 'Identify Growth Bottlenecks & Leaks',
    color: 'from-amber-500 to-orange-500',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/30',
    badgeText: 'text-amber-400',
    description: 'Deep audit of existing marketing channels, tracking gaps, customer journeys, and conversion leakage points before spending capital.'
  },
  {
    id: 'strategize',
    stepNumber: 2,
    label: 'Strategize',
    labelBn: 'স্ট্র্যাটেজি ও রোডম্যাপ',
    tagline: 'Define High-Leverage Trajectory',
    color: 'from-cyan-500 to-blue-500',
    badgeBg: 'bg-cyan-500/10',
    badgeBorder: 'border-cyan-500/30',
    badgeText: 'text-cyan-400',
    description: 'Market positioning, competitor deconstruction, offer architecture, and 30/60/90-day growth blueprints tailored to client ICP.'
  },
  {
    id: 'build',
    stepNumber: 3,
    label: 'Build',
    labelBn: 'ব্র্যান্ড ও ডিজিটাল এসেট তৈরি',
    tagline: 'High-Converting Digital Foundation',
    color: 'from-indigo-500 to-purple-500',
    badgeBg: 'bg-indigo-500/10',
    badgeBorder: 'border-indigo-500/30',
    badgeText: 'text-indigo-400',
    description: 'World-class branding, high-speed corporate & e-commerce websites, sales funnels, CRM pipelines, and custom business portals.'
  },
  {
    id: 'attract',
    stepNumber: 4,
    label: 'Attract',
    labelBn: 'অডিয়েন্স ও ট্রাফিক আকর্ষণ',
    tagline: 'Multi-Channel Qualified Traffic',
    color: 'from-violet-500 to-fuchsia-500',
    badgeBg: 'bg-violet-500/10',
    badgeBorder: 'border-violet-500/30',
    badgeText: 'text-violet-400',
    description: 'Precision Meta & Google paid media, organic social content engines, viral reels, SEO, and cutting-edge AEO/GEO generative search.'
  },
  {
    id: 'convert',
    stepNumber: 5,
    label: 'Convert',
    labelBn: 'সেলস ও কনভার্সন অপ্টিমাইজেশন',
    tagline: 'Turn Clicks into High-Value Customers',
    color: 'from-emerald-500 to-teal-500',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-400',
    description: 'Conversion Rate Optimization (CRO), scientific A/B testing, friction-free checkouts, high-urgency offer sequences, and lead capture.'
  },
  {
    id: 'retain',
    stepNumber: 6,
    label: 'Retain',
    labelBn: 'কাস্টমার রিটেনশন ও রিপিট সেলস',
    tagline: 'Maximize Customer Lifetime Value',
    color: 'from-rose-500 to-pink-500',
    badgeBg: 'bg-rose-500/10',
    badgeBorder: 'border-rose-500/30',
    badgeText: 'text-rose-400',
    description: 'Automated email flows, WhatsApp & SMS nurturing sequences, loyalty tiers, upsell/cross-sell engines, and churn prevention.'
  },
  {
    id: 'scale',
    stepNumber: 7,
    label: 'Scale',
    labelBn: 'সিস্টেম ও বিজনেস স্কেলিং',
    tagline: 'Predictable Expansion with Systems & AI',
    color: 'from-sky-500 to-emerald-500',
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/30',
    badgeText: 'text-sky-400',
    description: 'AI-assisted workflow automation, multi-channel attribution, custom dashboards, executive fractional consulting, and enterprise scale.'
  }
];

export const AIC_SERVICE_CATEGORIES: AicServiceCategory[] = [
  {
    id: 'growth-strategy',
    number: 1,
    title: 'Growth Strategy & Intelligence',
    titleBn: 'গ্রোথ স্ট্র্যাটেজি ও বিজনেস ইন্টেলিজেন্স',
    growthStages: ['diagnose', 'strategize', 'scale'],
    description: 'Comprehensive data-driven discovery to uncover hidden revenue leaks, map competitor weaknesses, and formulate infallible 90-day growth directives.',
    iconName: 'Compass',
    accentColor: 'from-cyan-500 to-blue-600',
    services: [
      {
        id: 'strat-1',
        title: 'AIC Digital Growth Diagnosis',
        titleBn: 'ডিজিটাল গ্রোথ ডায়াগনোসিস ও হেলথ স্কোর',
        categoryNumber: 1,
        categoryTitle: 'Growth Strategy & Intelligence',
        categoryTitleBn: 'গ্রোথ স্ট্র্যাটেজি',
        growthStages: ['diagnose'],
        summary: 'Rigorous 360° examination of current marketing performance, traffic acquisition, funnel drop-offs, and technology stack health.',
        deliverables: [
          'Full-funnel leakage audit document',
          'Client Growth Readiness Score (0-100)',
          'High-priority bottleneck matrix',
          'Quick-win action list (< 14 days)'
        ],
        businessImpact: 'Pinpoints the exact operational leaks burning 30-50% of your marketing investment before more budget is allocated.',
        deliverableTimeline: '5 - 7 Business Days',
        highlight: true
      },
      {
        id: 'strat-2',
        title: 'Market, Customer & Competitor Research',
        titleBn: 'মার্কেট, কাস্টমার ও প্রতিযোগী অ্যানালাইসিস',
        categoryNumber: 1,
        categoryTitle: 'Growth Strategy & Intelligence',
        categoryTitleBn: 'গ্রোথ স্ট্র্যাটেজি',
        growthStages: ['diagnose', 'strategize'],
        summary: 'In-depth analysis of target customer avatars, willingness to pay, psychographic pain points, and competitor offer strategies.',
        deliverables: [
          'Ideal Customer Profile (ICP) breakdown',
          'Competitor teardown & feature-gap analysis',
          'Voice-of-Customer (VoC) sentiment report',
          'Market differentiation opportunity matrix'
        ],
        businessImpact: 'Eliminates guesswork by building marketing on validated customer motivations rather than assumptions.',
        deliverableTimeline: '7 - 10 Business Days'
      },
      {
        id: 'strat-3',
        title: 'Trend & Opportunity Intelligence',
        titleBn: 'মার্কেট ট্রেন্ড ও অপরচুনিটি ইন্টেলিজেন্স',
        categoryNumber: 1,
        categoryTitle: 'Growth Strategy & Intelligence',
        categoryTitleBn: 'গ্রোথ স্ট্র্যাটেজি',
        growthStages: ['strategize'],
        summary: 'Surfacing emerging industry trends, untapped search queries, viral creative angles, and AI market opportunities before competitors.',
        deliverables: [
          'Industry macro-trend briefing',
          'Untapped keyword and intent clusters',
          'First-mover category opportunities'
        ],
        businessImpact: 'Enables your business to capture high-margin early market demand at a fraction of standard acquisition costs.',
        deliverableTimeline: '5 Business Days'
      },
      {
        id: 'strat-4',
        title: 'Brand Positioning and Offer Strategy',
        titleBn: 'ব্র্যান্ড পজিশনিং ও ইররেজিস্টেবল অফার স্ট্র্যাটেজি',
        categoryNumber: 1,
        categoryTitle: 'Growth Strategy & Intelligence',
        categoryTitleBn: 'গ্রোথ স্ট্র্যাটেজি',
        growthStages: ['strategize'],
        summary: 'Architecting an irresistible value proposition and grandfathered offer guarantee that renders competitor pricing irrelevant.',
        deliverables: [
          'Unique Selling Proposition (USP) framework',
          'Core offer stacking & tier structuring',
          'Risk reversal and guarantee blueprint',
          'Category authority positioning statement'
        ],
        businessImpact: 'Drives 2x to 3x higher price tolerance and dramatically shortens sales cycles through clear market differentiation.',
        deliverableTimeline: '7 Business Days',
        highlight: true
      },
      {
        id: 'strat-5',
        title: 'Go-to-Market (GTM) Strategy',
        titleBn: 'গো-টু-মার্কেট (GTM) স্ট্র্যাটেজি',
        categoryNumber: 1,
        categoryTitle: 'Growth Strategy & Intelligence',
        categoryTitleBn: 'গ্রোথ স্ট্র্যাটেজি',
        growthStages: ['strategize', 'build'],
        summary: 'A step-by-step launch and market penetration playbook for new products, service lines, or geographic expansions.',
        deliverables: [
          'Channel mix & launch timeline',
          'Target acquisition unit economics (CAC / LTV targets)',
          'Phased campaign rollout schedule',
          'Launch messaging hierarchy'
        ],
        businessImpact: 'Ensures zero wasted capital upon product launch by synchronizing messaging, channels, and conversion touchpoints.',
        deliverableTimeline: '10 - 14 Business Days'
      },
      {
        id: 'strat-6',
        title: '30/60/90-Day Growth Roadmap',
        titleBn: '৩০/৬০/৯০ দিনের এক্সিকিউটিভ গ্রোথ রোডম্যাপ',
        categoryNumber: 1,
        categoryTitle: 'Growth Strategy & Intelligence',
        categoryTitleBn: 'গ্রোথ স্ট্র্যাটেজি',
        growthStages: ['strategize', 'scale'],
        summary: 'A sequenced, milestone-driven execution calendar outlining exact weekly initiatives for marketing, tech, and sales.',
        deliverables: [
          'Interactive sprint Gantt chart',
          'Resource & tool requirement breakdown',
          'KPI forecast milestones (leads, MRR, ROAS)',
          'Bi-weekly executive check-in schedule'
        ],
        businessImpact: 'Provides clear operational alignment and transparency across executive leadership and implementation teams.',
        deliverableTimeline: '5 Business Days',
        highlight: true
      },
      {
        id: 'strat-7',
        title: 'Fractional Growth Consulting',
        titleBn: 'ফ্র্যাকশনাল চিফ গ্রোথ অফিসার (CGO) কনসাল্টিং',
        categoryNumber: 1,
        categoryTitle: 'Growth Strategy & Intelligence',
        categoryTitleBn: 'গ্রোথ স্ট্র্যাটেজি',
        growthStages: ['strategize', 'scale'],
        summary: 'Senior growth executive leadership embedded in your company without the $250k+ overhead of a full-time Chief Growth Officer.',
        deliverables: [
          'Weekly strategic leadership alignment calls',
          'Campaign and budget sign-offs',
          'Team upskilling & hiring guidance',
          'Continuous growth telemetry review'
        ],
        businessImpact: 'Provides founder-level strategic direction to accelerate scaling while preventing costly agency mismanagement.',
        deliverableTimeline: 'Ongoing Monthly Retainer'
      }
    ]
  },
  {
    id: 'branding-creative',
    number: 2,
    title: 'Branding & Creative',
    titleBn: 'ব্র্যান্ডিং ও ক্রিয়েটিভ প্রোডাকশন',
    growthStages: ['build'],
    description: 'Transforming businesses into premium, memorable brand powerhouses that command premium pricing and outperform ad creative benchmarks.',
    iconName: 'Palette',
    accentColor: 'from-pink-500 to-rose-600',
    services: [
      {
        id: 'brand-1',
        title: 'Brand Strategy and Visual Identity',
        titleBn: 'ব্র্যান্ড স্ট্র্যাটেজি ও ভিজ্যুয়াল আইডেন্টিটি',
        categoryNumber: 2,
        categoryTitle: 'Branding & Creative',
        categoryTitleBn: 'ব্র্যান্ডিং ও ক্রিয়েটিভ',
        growthStages: ['build'],
        summary: 'Crafting the strategic foundation, emotional resonance, and visual signature that defines your brand in the mind of the buyer.',
        deliverables: [
          'Brand archetype and mission book',
          'Color palette & typographic system',
          'Visual moodboards and texture libraries',
          'Tone of voice guide'
        ],
        businessImpact: 'Instills instant enterprise credibility, commanding higher client trust and higher average order values.',
        deliverableTimeline: '10 - 14 Business Days'
      },
      {
        id: 'brand-2',
        title: 'Logo and Brand Guidelines',
        titleBn: 'লোগো ডিজাইন ও কমপ্লিট ব্র্যান্ড গাইডলাইন',
        categoryNumber: 2,
        categoryTitle: 'Branding & Creative',
        categoryTitleBn: 'ব্র্যান্ডিং ও ক্রিয়েটিভ',
        growthStages: ['build'],
        summary: 'Distinctive, versatile vector logo suite alongside a comprehensive rulebook for flawless execution across all media.',
        deliverables: [
          'Primary, secondary, and sub-mark vector logos',
          'Responsive favicon and social avatars',
          'Complete brand guidelines PDF book',
          'Full commercial licensing & source files'
        ],
        businessImpact: 'Protects brand equity and ensures visual consistency across all digital, print, and physical manifestations.',
        deliverableTimeline: '7 - 10 Business Days'
      },
      {
        id: 'brand-3',
        title: 'Marketing Collateral Design',
        titleBn: 'মার্কেটিং ও সেলস কোলাটেরাল ডিজাইন',
        categoryNumber: 2,
        categoryTitle: 'Branding & Creative',
        categoryTitleBn: 'ব্র্যান্ডিং ও ক্রিয়েটিভ',
        growthStages: ['build'],
        summary: 'High-polish sales pitch decks, digital brochures, business cards, invoice templates, and event banners.',
        deliverables: [
          'Investor & client pitch deck templates',
          'One-sheet capability statements',
          'Company letterheads & invoice styling',
          'Trade show / digital signage assets'
        ],
        businessImpact: 'Equips your sales team with high-impact collateral that closes deals faster during enterprise evaluations.',
        deliverableTimeline: '5 - 7 Business Days'
      },
      {
        id: 'brand-4',
        title: 'Campaign Concept and Ad Creative',
        titleBn: 'ক্যাম্পেইন কনসেপ্ট ও হাই-কনভার্টিং অ্যাড ক্রিয়েটিভ',
        categoryNumber: 2,
        categoryTitle: 'Branding & Creative',
        categoryTitleBn: 'ব্র্যান্ডিং ও ক্রিয়েটিভ',
        growthStages: ['build', 'attract'],
        summary: 'Psychologically engineered static, carousel, and animated ad creatives designed specifically to stop the social feed scroll.',
        deliverables: [
          'Thumb-stopping hook concept briefs',
          'High-converting static & carousel graphic ads',
          'Platform-optimized aspect ratios (9:16, 1:1, 16:9)',
          'A/B visual creative variants'
        ],
        businessImpact: 'Lowers Cost-Per-Click (CPC) by 25-45% by boosting creative relevance scores and ad engagement.',
        deliverableTimeline: 'Ongoing Sprints',
        highlight: true
      },
      {
        id: 'brand-5',
        title: 'Copywriting and Scriptwriting',
        titleBn: 'ডিরেক্ট-রেসপন্স কপিরাইটিং ও ভিডিও স্ক্রিপ্ট',
        categoryNumber: 2,
        categoryTitle: 'Branding & Creative',
        categoryTitleBn: 'ব্র্যান্ডিং ও ক্রিয়েটিভ',
        growthStages: ['build', 'convert'],
        summary: 'Direct-response sales copy, storytelling scripts, landing page copy, and video scripts crafted to trigger emotional purchase decisions.',
        deliverables: [
          'High-converting landing page copy',
          'Video sales letter (VSL) scripts',
          'Paid ad hooks, body copy, and CTAs',
          'Automated email sequence copy'
        ],
        businessImpact: 'Multiplies conversion rates across ads, pages, and emails by replacing generic corporate jargon with persuasive triggers.',
        deliverableTimeline: '3 - 5 Business Days'
      },
      {
        id: 'brand-6',
        title: 'Video Editing, Reels and Motion Graphics',
        titleBn: 'ভিডিও এডিটিং, ভাইরাল রিলস ও মোশন গ্রাফিক্স',
        categoryNumber: 2,
        categoryTitle: 'Branding & Creative',
        categoryTitleBn: 'ব্র্যান্ডিং ও ক্রিয়েটিভ',
        growthStages: ['build', 'attract'],
        summary: 'Fast-paced, high-retention short-form video editing for Reels, TikTok, and YouTube Shorts with motion graphics and dynamic captions.',
        deliverables: [
          'High-retention vertical short-form video batch',
          'Custom kinetic subtitles & sound design',
          'Motion graphic intros & product visualizers',
          'Format optimization for cross-channel distribution'
        ],
        businessImpact: 'Dominates organic algorithms and drives authentic viral reach with modern short-form video culture.',
        deliverableTimeline: 'Weekly Delivery Sprints'
      }
    ]
  },
  {
    id: 'website-conversion',
    number: 3,
    title: 'Website & Conversion Experience',
    titleBn: 'ওয়েবসাইট ও কনভার্সন এক্সপেরিয়েন্স',
    growthStages: ['build', 'convert'],
    description: 'Engineering blazing-fast, visually stunning digital flagships that turn passive traffic into committed buyers with sub-second speeds.',
    iconName: 'Globe',
    accentColor: 'from-emerald-500 to-teal-600',
    services: [
      {
        id: 'web-1',
        title: 'Business and Corporate Website',
        titleBn: 'কর্পোরেট ও বিজনেস ওয়েবসাইট ডেভেলপমেন্ট',
        categoryNumber: 3,
        categoryTitle: 'Website & Conversion Experience',
        categoryTitleBn: 'ওয়েবসাইট ও কনভার্সন',
        growthStages: ['build'],
        summary: 'Custom-developed, responsive, high-performance corporate websites with intuitive CMS and modern design standards.',
        deliverables: [
          'Fully responsive modern web architecture',
          'Content Management System (CMS) setup',
          'Lead generation forms & CRM sync',
          'On-page SEO and security hardening'
        ],
        businessImpact: 'Establishes unquestioned industry dominance and provides a trustworthy destination for high-value corporate deals.',
        deliverableTimeline: '14 - 21 Business Days'
      },
      {
        id: 'web-2',
        title: 'E-commerce Website',
        titleBn: 'হাই-কনভার্টিং ই-কমার্স প্ল্যাটফর্ম ডেভেলপমেন্ট',
        categoryNumber: 3,
        categoryTitle: 'Website & Conversion Experience',
        categoryTitleBn: 'ওয়েবসাইট ও কনভার্সন',
        growthStages: ['build', 'convert'],
        summary: 'Seamless, frictionless online storefronts engineered with 1-click checkouts, upsell modules, and inventory automation.',
        deliverables: [
          'Shopify / WooCommerce / Custom headless store',
          '1-Click express payment gateways (Cards, Apple Pay, bKash)',
          'Post-purchase upsell & order bump architecture',
          'Cart abandonment recovery triggers'
        ],
        businessImpact: 'Maximizes Average Order Value (AOV) and boosts checkout completion rates by up to 35%.',
        deliverableTimeline: '14 - 28 Business Days',
        highlight: true
      },
      {
        id: 'web-3',
        title: 'Landing Page and Sales Funnel',
        titleBn: 'হাই-ইমপ্যাক্ট ল্যান্ডিং পেজ ও সেলস ফানেল',
        categoryNumber: 3,
        categoryTitle: 'Website & Conversion Experience',
        categoryTitleBn: 'ওয়েবসাইট ও কনভার্সন',
        growthStages: ['build', 'convert'],
        summary: 'Single-minded, high-converting direct response landing pages specifically engineered to maximize paid campaign ROI.',
        deliverables: [
          'Dedicated paid traffic landing page design',
          'Mobile-first layout with instant load time (< 1.8s)',
          'Direct-response copy integration',
          'A/B testing baseline variant'
        ],
        businessImpact: 'Increases visitor-to-lead conversion rates by 2x-4x compared to sending traffic to a generic homepage.',
        deliverableTimeline: '5 - 7 Business Days',
        highlight: true
      },
      {
        id: 'web-4',
        title: 'UI/UX Design',
        titleBn: 'মডার্ন ইউজার ইন্টারফেস (UI) ও এক্সপেরিয়েন্স (UX)',
        categoryNumber: 3,
        categoryTitle: 'Website & Conversion Experience',
        categoryTitleBn: 'ওয়েবসাইট ও কনভার্সন',
        growthStages: ['build'],
        summary: 'Human-centered wireframing, interactive prototyping, and design systems crafted in Figma for intuitive user journeys.',
        deliverables: [
          'Interactive clickable Figma prototype',
          'Design tokens and component library',
          'User flow mapping & journey friction audit',
          'Developer-ready handoff specs'
        ],
        businessImpact: 'Eliminates user cognitive friction, reducing bounce rates and creating an effortless path to purchase.',
        deliverableTimeline: '7 - 12 Business Days'
      },
      {
        id: 'web-5',
        title: 'Conversion Rate Optimization (CRO)',
        titleBn: 'কনভার্সন রেট অপ্টিমাইজেশন (CRO) সার্ভিস',
        categoryNumber: 3,
        categoryTitle: 'Website & Conversion Experience',
        categoryTitleBn: 'ওয়েবসাইট ও কনভার্সন',
        growthStages: ['convert', 'scale'],
        summary: 'Scientific heuristic audits, heatmap analysis, user session recordings, and continuous A/B testing to unlock hidden revenue.',
        deliverables: [
          'Comprehensive CRO checklist audit',
          'Heatmap & scroll depth analysis',
          'ICE-prioritized testing backlog',
          'Bi-weekly A/B test experiments & statistical validation'
        ],
        businessImpact: 'Doubling conversion rate cuts CAC in half and doubles net revenue with zero additional advertising spend.',
        deliverableTimeline: 'Ongoing Optimization Sprints',
        highlight: true
      },
      {
        id: 'web-6',
        title: 'Website Speed, Security and Maintenance',
        titleBn: 'ওয়েবসাইট স্পিড অপ্টিমাইজেশন, সিকিউরিটি ও মেইনটেন্যান্স',
        categoryNumber: 3,
        categoryTitle: 'Website & Conversion Experience',
        categoryTitleBn: 'ওয়েবসাইট ও কনভার্সন',
        growthStages: ['build', 'convert'],
        summary: 'Core Web Vitals optimization achieving Google PageSpeed 90+, SSL hardening, CDN distribution, and 24/7 uptime monitoring.',
        deliverables: [
          'Sub-2 second load time optimization',
          'Image WebP compression & script deferment',
          'Security firewall & malware protection',
          'Weekly backups and software patching'
        ],
        businessImpact: 'Every 1-second delay in page load drops conversions by 7%. Blazing speed directly preserves ad spend.',
        deliverableTimeline: '3 - 5 Business Days + Ongoing'
      },
      {
        id: 'web-7',
        title: 'Analytics and Tracking Integration',
        titleBn: 'ট্র্যাকিং, অ্যানালিটিক্স ও পিক্সেল ইন্টিগ্রেশন',
        categoryNumber: 3,
        categoryTitle: 'Website & Conversion Experience',
        categoryTitleBn: 'ওয়েবসাইট ও কনভার্সন',
        growthStages: ['diagnose', 'build'],
        summary: 'Server-side Google Tag Manager, GA4 eCommerce event mapping, Meta Conversions API (CAPI), and custom event instrumentation.',
        deliverables: [
          'GA4 e-commerce full funnel telemetry',
          'Google Tag Manager (Web + Server container)',
          'Meta CAPI + TikTok Pixel + Google Ads Enhanced Conversions',
          'Cookie consent & GDPR compliance'
        ],
        businessImpact: 'Recovers 20-30% of lost signal caused by iOS privacy updates, allowing ad algorithms to target high-intent buyers accurately.',
        deliverableTimeline: '3 - 5 Business Days'
      }
    ]
  },
  {
    id: 'performance-marketing',
    number: 4,
    title: 'Performance Marketing',
    titleBn: 'পেইড পারফরম্যান্স মার্কেটিং',
    growthStages: ['attract', 'convert'],
    description: 'Disciplined, data-driven paid advertising across Meta, Google, and YouTube engineered to acquire customers at profitable scale.',
    iconName: 'TrendingUp',
    accentColor: 'from-blue-500 to-indigo-600',
    services: [
      {
        id: 'perf-1',
        title: 'Meta Ads Management',
        titleBn: 'মেটা (ফেসবুক ও ইনস্টাগ্রাম) অ্যাডস ম্যানেজমেন্ট',
        categoryNumber: 4,
        categoryTitle: 'Performance Marketing',
        categoryTitleBn: 'পেইড মার্কেটিং',
        growthStages: ['attract', 'convert'],
        summary: 'Advanced Advantage+ campaigns, broad targeting creative strategy, CBO scaling, and daily ad spend optimization.',
        deliverables: [
          'Account restructuring for modern machine learning',
          'Weekly creative iteration and testing cycles',
          'ROAS and CAC daily pacing management',
          'Audience exclusion and lookalike setup'
        ],
        businessImpact: 'Transforms unpredictable ad spend into a reliable, profitable revenue acquisition engine.',
        deliverableTimeline: 'Ongoing Monthly Retainer',
        highlight: true
      },
      {
        id: 'perf-2',
        title: 'Google Ads Management',
        titleBn: 'গুগল সার্চ ও পারফরম্যান্স ম্যাক্স (PMax) ক্যাম্পেইন',
        categoryNumber: 4,
        categoryTitle: 'Performance Marketing',
        categoryTitleBn: 'পেইড মার্কেটিং',
        growthStages: ['attract', 'convert'],
        summary: 'Capturing high-intent commercial search queries via precision Search campaigns and Performance Max machine-learning networks.',
        deliverables: [
          'Negative keyword curation & match-type optimization',
          'Performance Max asset group tuning',
          'Search impression share domination on brand terms',
          'Bid strategy calibration (Target CPA / Target ROAS)'
        ],
        businessImpact: 'Captures prospects actively searching to buy right now, yielding highest conversion rates among all digital channels.',
        deliverableTimeline: 'Ongoing Monthly Retainer',
        highlight: true
      },
      {
        id: 'perf-3',
        title: 'YouTube Advertising',
        titleBn: 'ইউটিউব ভিডিও অ্যাডস ও ডিমান্ড জেনারেশন',
        categoryNumber: 4,
        categoryTitle: 'Performance Marketing',
        categoryTitleBn: 'পেইড মার্কেটিং',
        growthStages: ['attract'],
        summary: 'In-stream and Demand Gen video ads that build deep authority and drive prospective buyers down the funnel with visual storytelling.',
        deliverables: [
          'High-intent audience segment targeting',
          'Video hook optimization & viewer drop-off analytics',
          'Companion banner & CTA overlay optimization'
        ],
        businessImpact: 'Expands market reach beyond search intent, creating brand affinity and massive inbound organic branded searches.',
        deliverableTimeline: 'Ongoing Monthly Retainer'
      },
      {
        id: 'perf-4',
        title: 'Lead Generation Campaigns',
        titleBn: 'হাই-কোয়ালিটি বিটুবি ও সার্ভিস লিড জেনারেশন',
        categoryNumber: 4,
        categoryTitle: 'Performance Marketing',
        categoryTitleBn: 'পেইড মার্কেটিং',
        growthStages: ['attract', 'convert'],
        summary: 'Targeted lead campaigns pairing qualifying instant forms with automated calendar booking and CRM pipeline routing.',
        deliverables: [
          'Pre-qualifying lead form questions',
          'Immediate automated WhatsApp / SMS lead alert to sales team',
          'Lead qualification rate optimization'
        ],
        businessImpact: 'Delivers warm, qualified prospect consultations directly into your sales team calendar every day.',
        deliverableTimeline: 'Ongoing Monthly Retainer'
      },
      {
        id: 'perf-5',
        title: 'Retargeting and Remarketing',
        titleBn: 'স্মার্ট রিটার্গেটিং ও রিমার্কেটিং ক্যাম্পেইন',
        categoryNumber: 4,
        categoryTitle: 'Performance Marketing',
        categoryTitleBn: 'পেইড মার্কেটিং',
        growthStages: ['convert'],
        summary: 'Multi-tiered retargeting sequences addressing specific customer objections, showing social proof, and recovering abandoned checkouts.',
        deliverables: [
          'Dynamic product catalog ads (DPA)',
          'Sequential 3-7-14-30 day objection-handling ads',
          'VIP customer exclusion lists'
        ],
        businessImpact: 'Recaptures the 97% of visitors who leave without purchasing on their first visit at the lowest possible acquisition cost.',
        deliverableTimeline: 'Ongoing Monthly Retainer'
      },
      {
        id: 'perf-6',
        title: 'Media Planning and Budget Optimization',
        titleBn: 'মিডিয়া প্ল্যানিং ও বাজেট অপ্টিমাইজেশন',
        categoryNumber: 4,
        categoryTitle: 'Performance Marketing',
        categoryTitleBn: 'পেইড মার্কেটিং',
        growthStages: ['strategize', 'scale'],
        summary: 'Scientific cross-platform budget allocation to maximize blended ROAS and maintain healthy profit margins as ad spend scales.',
        deliverables: [
          'Cross-channel budget distribution model',
          'Diminishing return threshold analysis',
          'Seasonal scaling schedule (holidays & promos)'
        ],
        businessImpact: 'Prevents budget burning by dynamically shifting spend to whichever channel generates the highest current net contribution margin.',
        deliverableTimeline: 'Monthly Strategy Review'
      },
      {
        id: 'perf-7',
        title: 'ROAS and Conversion Optimization',
        titleBn: 'ROAS বৃদ্ধি ও পেইড ফানেল অপ্টিমাইজেশন',
        categoryNumber: 4,
        categoryTitle: 'Performance Marketing',
        categoryTitleBn: 'পেইড মার্কেটিং',
        growthStages: ['convert', 'scale'],
        summary: 'Holistic feedback loops connecting post-click landing page metrics with ad platform algorithms to drive higher return on ad spend.',
        deliverables: [
          'Blended Marketing Efficiency Ratio (MER) tracking',
          'Landing page - ad creative congruence audit',
          'Conversion value rule adjustments'
        ],
        businessImpact: 'Breaks through ROAS plateaus, enabling client ad budgets to scale from $5k/mo to $50k+/mo profitably.',
        deliverableTimeline: 'Continuous Optimization'
      }
    ]
  },
  {
    id: 'social-content',
    number: 5,
    title: 'Social Media & Content Growth',
    titleBn: 'সোশ্যাল মিডিয়া ও কনটেন্ট গ্রোথ',
    growthStages: ['attract'],
    description: 'Transforming passive followers into brand evangelists through structured content systems, viral reels, and active community nurturing.',
    iconName: 'Share2',
    accentColor: 'from-purple-500 to-indigo-600',
    services: [
      {
        id: 'soc-1',
        title: 'Social Media Strategy',
        titleBn: 'সোশ্যাল মিডিয়া গ্রোথ স্ট্র্যাটেজি',
        categoryNumber: 5,
        categoryTitle: 'Social Media & Content Growth',
        categoryTitleBn: 'কনটেন্ট ও সোশ্যাল মিডিয়া',
        growthStages: ['strategize', 'attract'],
        summary: 'Defining pillar content themes, voice, platform distribution mix, and competitive audience capture mechanics.',
        deliverables: [
          'Brand voice & archetype guideline for social',
          'Content pillar matrix (Educate, Entertain, Convert)',
          'Platform-specific distribution cadence'
        ],
        businessImpact: 'Builds a consistent digital presence that reinforces brand authority and drives organic inbound leads.',
        deliverableTimeline: '7 Business Days'
      },
      {
        id: 'soc-2',
        title: 'Monthly Content Planning',
        titleBn: 'মান্থলি কনটেন্ট ক্যালেন্ডার প্ল্যানিং',
        categoryNumber: 5,
        categoryTitle: 'Social Media & Content Growth',
        categoryTitleBn: 'কনটেন্ট ও সোশ্যাল মিডিয়া',
        growthStages: ['attract'],
        summary: '30-day advance content calendars complete with hook ideas, visual references, copy, hashtags, and posting schedules.',
        deliverables: [
          'Collaborative Notion / Sheets editorial calendar',
          'Campaign promo event alignment',
          'Weekly approval workflows'
        ],
        businessImpact: 'Eliminates last-minute content panic and ensures regular, high-quality touchpoints with your audience.',
        deliverableTimeline: 'Delivered 7 Days Before New Month'
      },
      {
        id: 'soc-3',
        title: 'Social Media Management',
        titleBn: 'এন্ড-টু-এন্ড সোশ্যাল মিডিয়া ম্যানেজমেন্ট',
        categoryNumber: 5,
        categoryTitle: 'Social Media & Content Growth',
        categoryTitleBn: 'কনটেন্ট ও সোশ্যাল মিডিয়া',
        growthStages: ['attract'],
        summary: 'Flawless publishing, post scheduling, profile optimization, link-in-bio management, and hashtag strategy.',
        deliverables: [
          'Scheduled publishing across Facebook, Instagram, LinkedIn',
          'Bio, banner, and highlighted story revamp',
          'Monthly follower & reach progress reports'
        ],
        businessImpact: 'Keeps your channels active and professionally maintained without consuming your internal team bandwidth.',
        deliverableTimeline: 'Ongoing Monthly Retainer'
      },
      {
        id: 'soc-4',
        title: 'Graphics, Reels and Video Content',
        titleBn: 'হাই-এনগেজমেন্ট গ্রাফিক্স, রিলস ও ভিডিও কনটেন্ট',
        categoryNumber: 5,
        categoryTitle: 'Social Media & Content Growth',
        categoryTitleBn: 'কনটেন্ট ও সোশ্যাল মিডিয়া',
        growthStages: ['attract'],
        summary: 'Custom carousels, infographics, vertical reels, and thought leadership cards designed to generate saves, shares, and comments.',
        deliverables: [
          'Custom brand carousels & single images',
          'Edited short-form reels with captions',
          'Interactive story poll & quiz templates'
        ],
        businessImpact: 'Drastically increases organic reach and algorithms preference, resulting in viral distribution without ad costs.',
        deliverableTimeline: 'Weekly Delivery Batches',
        highlight: true
      },
      {
        id: 'soc-5',
        title: 'Content Copy and Captions',
        titleBn: 'এনগেজিং কনটেন্ট কপি ও ক্যাপশন রাইটিং',
        categoryNumber: 5,
        categoryTitle: 'Social Media & Content Growth',
        categoryTitleBn: 'কনটেন্ট ও সোশ্যাল মিডিয়া',
        growthStages: ['attract'],
        summary: 'Persuasive, conversational captions that spark community discussions and seamlessly guide readers to comment or DM.',
        deliverables: [
          'Curated caption library with call-to-actions',
          'Comment trigger keywords (e.g., "Comment GUIDE for link")',
          'Hashtag clusters researched by reach volume'
        ],
        businessImpact: 'Converts casual scrollers into engaged followers who actively respond to business propositions.',
        deliverableTimeline: 'Included with Content Calendar'
      },
      {
        id: 'soc-6',
        title: 'Community Management',
        titleBn: 'কমিউনিটি ম্যানেজমেন্ট ও কমেন্ট রেসপন্স',
        categoryNumber: 5,
        categoryTitle: 'Social Media & Content Growth',
        categoryTitleBn: 'কনটেন্ট ও সোশ্যাল মিডিয়া',
        growthStages: ['attract', 'convert'],
        summary: 'Active monitoring, replying to comments within 1 hour, moderating spam, and routing purchase inquiries to your sales reps.',
        deliverables: [
          'Custom Brand FAQ & objection answer script',
          'Fast response protocol during business hours',
          'Hot lead escalation to WhatsApp / phone'
        ],
        businessImpact: 'Builds goodwill and captures high-intent buyers in the comments section before interest cools down.',
        deliverableTimeline: 'Ongoing Monthly Service'
      },
      {
        id: 'soc-7',
        title: 'Campaign Content Production',
        titleBn: 'ক্যাম্পেইন ও প্রমোশনাল কনটেন্ট প্রোডাকশন',
        categoryNumber: 5,
        categoryTitle: 'Social Media & Content Growth',
        categoryTitleBn: 'কনটেন্ট ও সোশ্যাল মিডিয়া',
        growthStages: ['attract', 'convert'],
        summary: 'Dedicated content pushes for product drops, flash sales, seasonal events, and masterclasses.',
        deliverables: [
          'Countdown tease sequences',
          'Customer testimonial compilation videos',
          'Offer reveal carousels and announcement graphics'
        ],
        businessImpact: 'Generates anticipation and concentrated revenue spikes during major sales windows.',
        deliverableTimeline: 'Event-Based'
      }
    ]
  },
  {
    id: 'seo-search',
    number: 6,
    title: 'SEO & AI Search Visibility',
    titleBn: 'এসইও ও এআই সার্চ ভিজিবিলিটি (AEO / GEO)',
    growthStages: ['attract'],
    description: 'Securing durable organic search supremacy on Google while optimizing your brand for the new era of AI answer engines like ChatGPT and Perplexity.',
    iconName: 'Search',
    accentColor: 'from-amber-500 to-emerald-600',
    services: [
      {
        id: 'seo-1',
        title: 'SEO Audit and Strategy',
        titleBn: 'ফুল টেকনিক্যাল এসইও অডিট ও স্ট্র্যাটেজি',
        categoryNumber: 6,
        categoryTitle: 'SEO & AI Search Visibility',
        categoryTitleBn: 'সার্চ ভিজিবিলিটি',
        growthStages: ['diagnose', 'strategize'],
        summary: 'Complete diagnosis of crawling errors, indexing issues, keyword gaps, and backlink authority compared to top competitors.',
        deliverables: [
          'Technical crawl health report (Screaming Frog)',
          'Competitor keyword gap analysis',
          'Priority fix roadmap categorized by search impact'
        ],
        businessImpact: 'Identifies the technical blockers preventing your website from ranking on page 1 of Google.',
        deliverableTimeline: '5 - 7 Business Days'
      },
      {
        id: 'seo-2',
        title: 'Technical and On-Page SEO',
        titleBn: 'টেকনিক্যাল ও অন-পেজ এসইও অপ্টিমাইজেশন',
        categoryNumber: 6,
        categoryTitle: 'SEO & AI Search Visibility',
        categoryTitleBn: 'সার্চ ভিজিবিলিটি',
        growthStages: ['attract'],
        summary: 'Schema markup, semantic HTML headers, canonicalization, XML sitemaps, internal linking, and meta tags optimization.',
        deliverables: [
          'JSON-LD Structured Data (Organization, Product, FAQ)',
          'Title tag & meta description overhaul',
          'Internal link architecture optimization'
        ],
        businessImpact: 'Helps Google bots understand your content perfectly, resulting in higher CTR and rich search snippet displays.',
        deliverableTimeline: '7 - 10 Business Days'
      },
      {
        id: 'seo-3',
        title: 'Content SEO',
        titleBn: 'কনটেন্ট এসইও ও টপিকাল অথরিটি ক্লান্তি',
        categoryNumber: 6,
        categoryTitle: 'SEO & AI Search Visibility',
        categoryTitleBn: 'সার্চ ভিজিবিলিটি',
        growthStages: ['attract'],
        summary: 'High-intent blog articles, pillar guides, and topical topic clusters engineered to dominate search results for high-value buyer queries.',
        deliverables: [
          'Topical authority keyword cluster plan',
          'SEO-optimized long-form articles with NLP entities',
          'Search intent matching (Informational vs. Commercial)'
        ],
        businessImpact: 'Generates continuous organic qualified traffic that compounds in value over time with $0 ad spend.',
        deliverableTimeline: 'Monthly Article Batches'
      },
      {
        id: 'seo-4',
        title: 'Local SEO and Google Business Profile',
        titleBn: 'লোকাল এসইও ও গুগল বিজনেস প্রোফাইল অপ্টিমাইজেশন',
        categoryNumber: 6,
        categoryTitle: 'SEO & AI Search Visibility',
        categoryTitleBn: 'সার্চ ভিজিবিলিটি',
        growthStages: ['attract'],
        summary: 'Optimizing Google Business Profile (GBP) to dominate the local 3-pack for "near me" and city-specific commercial searches.',
        deliverables: [
          'GBP complete profile audit and verification',
          'Local citation building (NAP consistency)',
          'Automated review collection framework'
        ],
        businessImpact: 'Drives high-converting local phone calls, walk-ins, and service bookings from ready-to-buy nearby customers.',
        deliverableTimeline: '7 - 10 Business Days'
      },
      {
        id: 'seo-5',
        title: 'Keyword and Competitor Research',
        titleBn: 'কিওয়ার্ড ও কম্পিটিটর অর্গানিক রিসার্চ',
        categoryNumber: 6,
        categoryTitle: 'SEO & AI Search Visibility',
        categoryTitleBn: 'সার্চ ভিজিবিলিটি',
        growthStages: ['strategize', 'attract'],
        summary: 'Discovering low-competition, high-converting commercial intent keywords your competitors missed.',
        deliverables: [
          'Commercial intent keyword spreadsheet with search volume',
          'SERP feature opportunity matrix',
          'Keyword difficulty vs. revenue potential rating'
        ],
        businessImpact: 'Allows you to target search terms that actually convert into revenue rather than vanity traffic.',
        deliverableTimeline: '5 Business Days'
      },
      {
        id: 'seo-6',
        title: 'Answer Engine Optimization (AEO)',
        titleBn: 'অ্যানসার ইঞ্জিন অপ্টিমাইজেশন (AEO)',
        categoryNumber: 6,
        categoryTitle: 'SEO & AI Search Visibility',
        categoryTitleBn: 'সার্চ ভিজিবিলিটি',
        growthStages: ['attract'],
        summary: 'Structuring website answers specifically to win Google Featured Snippets and voice search answers (Google Assistant, Siri).',
        deliverables: [
          'Direct question-and-answer format restructuring',
          'FAQ schema injection for immediate snippet capture',
          'Zero-click search visibility tactics'
        ],
        businessImpact: 'Positions your brand at position #0 on Google, establishing instant domain authority above traditional listings.',
        deliverableTimeline: 'Ongoing Sprints'
      },
      {
        id: 'seo-7',
        title: 'Generative Engine Optimization (GEO)',
        titleBn: 'জেনারেটিভ ইঞ্জিন অপ্টিমাইজেশন — ChatGPT & Perplexity Citations',
        categoryNumber: 6,
        categoryTitle: 'SEO & AI Search Visibility',
        categoryTitleBn: 'সার্চ ভিজিবিলিটি',
        growthStages: ['attract', 'scale'],
        summary: 'The future of search: optimizing your brand data so LLMs (ChatGPT, Perplexity, Gemini, Claude) recommend your business when users prompt for solutions.',
        deliverables: [
          'AI knowledge graph entity alignment',
          'Digital PR citations on high-authority AI training sources',
          'LLM prompt audit testing your brand recommendations'
        ],
        businessImpact: 'Guarantees your business remains discoverable as consumer search behavior transitions from Google to generative AI.',
        deliverableTimeline: 'Quarterly Strategic Cycle',
        highlight: true
      },
      {
        id: 'seo-8',
        title: 'Online Reputation and Authority Building',
        titleBn: 'অনলাইন রেপুটেশন ও অথরিটি ব্যাকলিংক বিল্ডিং',
        categoryNumber: 6,
        categoryTitle: 'SEO & AI Search Visibility',
        categoryTitleBn: 'সার্চ ভিজিবিলিটি',
        growthStages: ['attract', 'retain'],
        summary: 'White-hat digital PR, guest articles on reputable publications, and negative sentiment mitigation.',
        deliverables: [
          'High Domain Authority (DA 50+) editorial backlinks',
          'Brand press release syndication',
          'Trustpilot and Google review management strategy'
        ],
        businessImpact: 'Strengthens your overall domain authority, making all your website pages rank faster on search engines.',
        deliverableTimeline: 'Ongoing Monthly Sprints'
      }
    ]
  },
  {
    id: 'funnel-crm',
    number: 7,
    title: 'Funnel, CRM & Automation',
    titleBn: 'ফানেল, সিআরএম ও সেলস অটোমেশন',
    growthStages: ['convert', 'retain'],
    description: 'Constructing automated sales machines that nurture prospects 24/7, follow up in seconds, and prevent deals from ever slipping through the cracks.',
    iconName: 'Workflow',
    accentColor: 'from-cyan-500 to-indigo-600',
    services: [
      {
        id: 'crm-1',
        title: 'Lead Capture Funnel',
        titleBn: 'স্মার্ট লিড ক্যাপচার ফানেল সিস্টেম',
        categoryNumber: 7,
        categoryTitle: 'Funnel, CRM & Automation',
        categoryTitleBn: 'সেলস অটোমেশন',
        growthStages: ['convert'],
        summary: 'Multi-step quizzes, lead magnets, interactive cost calculators, and appointment booking funnels with dynamic personalization.',
        deliverables: [
          'High-converting lead magnet delivery flow',
          'Conditional logic quiz funnel',
          'Friction-free calendar booking integration'
        ],
        businessImpact: 'Captures 3x more contact information by offering upfront value before pitching your primary service.',
        deliverableTimeline: '5 - 7 Business Days',
        highlight: true
      },
      {
        id: 'crm-2',
        title: 'CRM and Sales Pipeline Setup',
        titleBn: 'সিআরএম ও সেলস পাইপলাইন সেটআপ (HubSpot, GoHighLevel, ActiveCampaign)',
        categoryNumber: 7,
        categoryTitle: 'Funnel, CRM & Automation',
        categoryTitleBn: 'সেলস অটোমেশন',
        growthStages: ['convert', 'scale'],
        summary: 'Custom CRM stages, deal values, lead routing rules, and custom contact properties tailored to your sales cycle.',
        deliverables: [
          'Stage-by-stage visual deal pipeline',
          'Lead assignment automation (round-robin to reps)',
          'Data migration from spreadsheets/old systems'
        ],
        businessImpact: 'Gives management complete visibility over deal stages, forecast revenue, and sales representative accountability.',
        deliverableTimeline: '7 - 10 Business Days'
      },
      {
        id: 'crm-3',
        title: 'Email Marketing Automation',
        titleBn: 'ইমেইল মার্কেটিং অটোমেশন ও ড্রিপ ক্যাম্পেইন',
        categoryNumber: 7,
        categoryTitle: 'Funnel, CRM & Automation',
        categoryTitleBn: 'সেলস অটোমেশন',
        growthStages: ['convert', 'retain'],
        summary: 'Automated lifecycle email flows: Welcome series, abandoned cart recovery, post-purchase onboarding, and re-engagement campaigns.',
        deliverables: [
          '5-part high-converting welcome & nurture sequence',
          '3-part cart abandonment email flow',
          'Custom branded HTML/Plain-text email templates',
          'Deliverability check (SPF, DKIM, DMARC)'
        ],
        businessImpact: 'Email marketing generates an average of $36 ROI for every $1 spent when automated properly.',
        deliverableTimeline: '7 - 10 Business Days',
        highlight: true
      },
      {
        id: 'crm-4',
        title: 'WhatsApp and SMS Automation',
        titleBn: 'হোয়াটসঅ্যাপ ও এসএমএস অটোমেশন',
        categoryNumber: 7,
        categoryTitle: 'Funnel, CRM & Automation',
        categoryTitleBn: 'সেলস অটোমেশন',
        growthStages: ['convert', 'retain'],
        summary: 'Instant automated WhatsApp & SMS notifications upon form submission, appointment reminders, and promotional broadcasts with 98% open rates.',
        deliverables: [
          'Meta Cloud WhatsApp API integration',
          'Automated booking confirmation & reminder SMS (reduces no-shows by 60%)',
          'Two-way chat inbox setup for sales reps'
        ],
        businessImpact: 'Achieves 98% open rates and sub-5-minute customer engagement, dramatically boosting sales velocity.',
        deliverableTimeline: '5 - 7 Business Days',
        highlight: true
      },
      {
        id: 'crm-5',
        title: 'Lead Nurturing System',
        titleBn: 'অটোমেটেড লিড নার্চারিং ও স্কোরিং সিস্টেম',
        categoryNumber: 7,
        categoryTitle: 'Funnel, CRM & Automation',
        categoryTitleBn: 'সেলস অটোমেশন',
        growthStages: ['convert'],
        summary: 'Behavior-based email and messaging journeys that deliver case studies, testimonials, and answers to objections based on prospect actions.',
        deliverables: [
          'Lead scoring model (Hot, Warm, Cold)',
          'Behavioral trigger sequences (clicked link, visited pricing page)',
          'Sales alert notification when lead becomes sales-ready'
        ],
        businessImpact: 'Warms up skeptical prospects automatically so your sales team only spends time talking to buyers ready to purchase.',
        deliverableTimeline: '7 - 10 Business Days'
      },
      {
        id: 'crm-6',
        title: 'Sales Follow-up Automation',
        titleBn: 'সেলস ফলো-আপ অটোমেশন (Zero Lead Neglect)',
        categoryNumber: 7,
        categoryTitle: 'Funnel, CRM & Automation',
        categoryTitleBn: 'সেলস অটোমেশন',
        growthStages: ['convert'],
        summary: 'Automated task creation, reminder alerts, and multi-channel follow-up touches ensuring no lead is ever abandoned.',
        deliverables: [
          'Speed-to-lead automated call/text trigger (< 2 minutes)',
          'Automated 7-day follow-up cascade for unanswered leads',
          'Dead lead resurrection sequences'
        ],
        businessImpact: 'Contacting a lead within 5 minutes increases conversion odds by 21x compared to waiting 30 minutes.',
        deliverableTimeline: '5 Business Days'
      },
      {
        id: 'crm-7',
        title: 'Customer Onboarding Automation',
        titleBn: 'কাস্টমার অনবোর্ডিং অটোমেশন ও ওয়েলকাম ফ্লো',
        categoryNumber: 7,
        categoryTitle: 'Funnel, CRM & Automation',
        categoryTitleBn: 'সেলস অটোমেশন',
        growthStages: ['retain'],
        summary: 'Delightful automated client intake forms, welcome portals, access credential dispatch, and kickoff scheduling.',
        deliverables: [
          'Automated intake questionnaire and file collector',
          'Instant contract e-sign & invoice trigger',
          'Welcome guide and video walkthrough delivery'
        ],
        businessImpact: 'Eliminates buyer remorse, creates an unforgettable first impression, and saves dozens of manual onboarding hours.',
        deliverableTimeline: '5 Business Days'
      },
      {
        id: 'crm-8',
        title: 'Retention and Reactivation Campaigns',
        titleBn: 'কাস্টমার রিটেনশন ও রিঅ্যাক্টিভেশন ক্যাম্পেইন',
        categoryNumber: 7,
        categoryTitle: 'Funnel, CRM & Automation',
        categoryTitleBn: 'সেলস অটোমেশন',
        growthStages: ['retain', 'scale'],
        summary: 'Automated 60/90/180-day "We miss you" campaigns offering special incentives to resurrect inactive historical customers.',
        deliverables: [
          'Lapsed customer segmentation filter',
          'High-converting win-back offer sequences',
          'Feedback survey for churned clients'
        ],
        businessImpact: 'Recovers thousands in pure profit from dormant contacts without spending a single cent on fresh advertising.',
        deliverableTimeline: '5 Business Days'
      }
    ]
  },
  {
    id: 'analytics-growth',
    number: 8,
    title: 'Analytics & Growth Optimization',
    titleBn: 'ডেটা, অ্যানালিটিক্স ও অপ্টিমাইজেশন',
    growthStages: ['diagnose', 'scale'],
    description: 'Transforming murky numbers into transparent growth metrics with executive real-time dashboards and bulletproof attribution.',
    iconName: 'BarChart3',
    accentColor: 'from-teal-500 to-cyan-600',
    services: [
      {
        id: 'ana-1',
        title: 'GA4 and Google Tag Manager Setup',
        titleBn: 'জিএ৪ ও গুগল ট্যাগ ম্যানেজার অ্যাডভান্সড সেটআপ',
        categoryNumber: 8,
        categoryTitle: 'Analytics & Growth Optimization',
        categoryTitleBn: 'ডেটা ও অপ্টিমাইজেশন',
        growthStages: ['diagnose', 'build'],
        summary: 'Complete Google Analytics 4 configuration with custom dimensions, enhanced measurement, and server-side container orchestration.',
        deliverables: [
          'Complete GA4 property architecture',
          'GTM tag trigger variables documentation',
          'Cross-domain tracking configuration'
        ],
        businessImpact: 'Provides clean, unpolluted data so every business decision is backed by mathematical facts.',
        deliverableTimeline: '3 - 5 Business Days'
      },
      {
        id: 'ana-2',
        title: 'Meta Pixel and Conversion API (CAPI)',
        titleBn: 'মেটা পিক্সেল ও কনভার্সন এপিআই (CAPI) ফুল সার্ভার-সাইড সেটআপ',
        categoryNumber: 8,
        categoryTitle: 'Analytics & Growth Optimization',
        categoryTitleBn: 'ডেটা ও অপ্টিমাইজেশন',
        growthStages: ['build', 'attract'],
        summary: 'Server-to-server tracking pipeline with high Event Quality Match scores (8.5+) to feed Meta algorithms high-fidelity purchase data.',
        deliverables: [
          'Server-side CAPI integration via Cloud Gateway',
          'Event deduplication (browser vs. server)',
          'Event Match Quality (EMQ) optimization'
        ],
        businessImpact: 'Reduces Meta Cost-Per-Acquisition (CPA) by 15-25% by training the ad algorithm with 100% of purchase signals.',
        deliverableTimeline: '3 - 5 Business Days',
        highlight: true
      },
      {
        id: 'ana-3',
        title: 'Marketing Attribution',
        titleBn: 'মাল্টি-টাচ মার্কেটিং অ্যাট্রিবিউশন মডেলিং',
        categoryNumber: 8,
        categoryTitle: 'Analytics & Growth Optimization',
        categoryTitleBn: 'ডেটা ও অপ্টিমাইজেশন',
        growthStages: ['strategize', 'scale'],
        summary: 'First-click, last-click, and data-driven multi-touch attribution to accurately reveal which channels initiate, nurture, and close deals.',
        deliverables: [
          'Multi-touch customer journey mapping',
          'Attribution model comparison report',
          'Channel assisted conversion insights'
        ],
        businessImpact: 'Stops you from mistakenly turning off top-of-funnel campaigns that silently drive all your downstream sales.',
        deliverableTimeline: '5 - 7 Business Days'
      },
      {
        id: 'ana-4',
        title: 'Custom KPI Dashboard',
        titleBn: 'রিয়েল-টাইম এক্সিকিউটিভ কেপিআই ড্যাশবোর্ড',
        categoryNumber: 8,
        categoryTitle: 'Analytics & Growth Optimization',
        categoryTitleBn: 'ডেটা ও অপ্টিমাইজেশন',
        growthStages: ['diagnose', 'scale'],
        summary: 'A unified single-screen dashboard combining ad spend, web conversions, CRM pipeline deals, and net profit into real-time visual charts.',
        deliverables: [
          'Looker Studio / Custom Web Dashboard build',
          'Automated data connectors (Meta, Google, Shopify, CRM)',
          'Executive KPI summary card'
        ],
        businessImpact: 'Saves 10+ hours per week of manual spreadsheet reporting and gives stakeholders instant business clarity.',
        deliverableTimeline: '7 Business Days',
        highlight: true
      },
      {
        id: 'ana-5',
        title: 'Campaign Performance Analysis',
        titleBn: 'ক্যাম্পেইন পারফরম্যান্স অ্যানালাইসিস ও উইকলি ইনসাইটস',
        categoryNumber: 8,
        categoryTitle: 'Analytics & Growth Optimization',
        categoryTitleBn: 'ডেটা ও অপ্টিমাইজেশন',
        growthStages: ['scale'],
        summary: 'Granular weekly breakdown of click-through rates, creative fatigue, cost-per-lead trends, and ROAS trajectories.',
        deliverables: [
          'Weekly campaign performance scorecard',
          'Creative winner / loser breakdown',
          'Actionable next-step recommendations'
        ],
        businessImpact: 'Identifies ad fatigue early and scales winning creative angles before performance dips.',
        deliverableTimeline: 'Weekly Reporting Cycle'
      },
      {
        id: 'ana-6',
        title: 'Monthly Growth Reports',
        titleBn: 'মান্থলি এক্সিকিউটিভ গ্রোথ ও ROI রিপোর্ট',
        categoryNumber: 8,
        categoryTitle: 'Analytics & Growth Optimization',
        categoryTitleBn: 'ডেটা ও অপ্টিমাইজেশন',
        growthStages: ['scale'],
        summary: 'Board-level executive monthly reviews detailing net revenue growth, customer acquisition trends, and quarterly milestone progress.',
        deliverables: [
          'Executive PDF deliverable presentation',
          'Loom video walkthrough from Senior Strategist',
          'Next month strategic roadmap preview'
        ],
        businessImpact: 'Provides total accountability and clear ROI justification for every dollar invested with the agency.',
        deliverableTimeline: 'Delivered by 3rd of Each Month'
      },
      {
        id: 'ana-7',
        title: 'A/B Testing and Experimentation',
        titleBn: 'এ/বি টেস্টিং ও ডেটা-ড্রিভেন এক্সপেরিমেন্টেশন',
        categoryNumber: 8,
        categoryTitle: 'Analytics & Growth Optimization',
        categoryTitleBn: 'ডেটা ও অপ্টিমাইজেশন',
        growthStages: ['convert', 'scale'],
        summary: 'Disciplined statistical experimentation on headline variations, CTA colors, pricing presentation, and checkout steps.',
        deliverables: [
          'Hypothesis testing log (ICE framework)',
          'Statistically significant test outcome reports',
          'Winner implementation into production'
        ],
        businessImpact: 'Guarantees compounding conversion improvements month-over-month backed by mathematical confidence.',
        deliverableTimeline: 'Continuous Sprints'
      },
      {
        id: 'ana-8',
        title: 'Data-Driven Recommendations',
        titleBn: 'ডেটা-ড্রিভেন গ্রোথ অ্যাকশন প্ল্যান',
        categoryNumber: 8,
        categoryTitle: 'Analytics & Growth Optimization',
        categoryTitleBn: 'ডেটা ও অপ্টিমাইজেশন',
        growthStages: ['strategize', 'scale'],
        summary: 'Translating complex telemetry into clear, straightforward business actions your leadership can execute immediately.',
        deliverables: [
          'Actionable recommendation memo',
          'Budget reallocation guidance',
          'Product catalog optimization opportunities'
        ],
        businessImpact: 'Eliminates analysis paralysis and focuses executive energy solely on initiatives with the highest revenue yield.',
        deliverableTimeline: 'Bi-Weekly Strategy Brief'
      }
    ]
  },
  {
    id: 'retention-scale',
    number: 9,
    title: 'Customer Retention & Scale',
    titleBn: 'কাস্টমার রিটেনশন ও বিজনেস স্কেল',
    growthStages: ['retain', 'scale'],
    description: 'Multiplying customer lifetime value (LTV), turning one-time shoppers into lifelong brand ambassadors, and creating viral referral engines.',
    iconName: 'Repeat',
    accentColor: 'from-rose-500 to-orange-600',
    services: [
      {
        id: 'ret-1',
        title: 'Customer Lifecycle Strategy',
        titleBn: 'কাস্টমার লাইফসাইকেল স্ট্র্যাটেজি ও জার্নি ম্যাপিং',
        categoryNumber: 9,
        categoryTitle: 'Customer Retention & Scale',
        categoryTitleBn: 'রিটেনশন ও স্কেল',
        growthStages: ['retain'],
        summary: 'Mapping every post-purchase touchpoint from day 1 to day 365 to maximize product adoption, satisfaction, and repurchase velocity.',
        deliverables: [
          'Visual customer journey lifecycle blueprint',
          'Critical churn-risk touchpoint identification',
          'Milestone celebration trigger strategy'
        ],
        businessImpact: 'Extends customer lifespan and drastically reduces customer churn, elevating business enterprise valuation.',
        deliverableTimeline: '7 - 10 Business Days'
      },
      {
        id: 'ret-2',
        title: 'Retention and Loyalty Programs',
        titleBn: 'ভিআইপি লয়্যালটি ও রিওয়ার্ড প্রোগ্রাম সেটআপ',
        categoryNumber: 9,
        categoryTitle: 'Customer Retention & Scale',
        categoryTitleBn: 'রিটেনশন ও স্কেল',
        growthStages: ['retain'],
        summary: 'Tiered reward clubs, points systems, VIP perks, and exclusive access programs that make switching to competitors unthinkable.',
        deliverables: [
          'Loyalty points & tier gamification mechanics',
          'VIP customer portal integration',
          'Automated reward milestone redemption emails'
        ],
        businessImpact: 'Increases repeat purchase rates by 25-40% by incentivizing customer brand loyalty.',
        deliverableTimeline: '10 - 14 Business Days'
      },
      {
        id: 'ret-3',
        title: 'Upsell and Cross-sell Strategy',
        titleBn: 'আপসেল ও ক্রস-সেল স্ট্র্যাটেজি (AOV Multiplier)',
        categoryNumber: 9,
        categoryTitle: 'Customer Retention & Scale',
        categoryTitleBn: 'রিটেনশন ও স্কেল',
        growthStages: ['convert', 'retain', 'scale'],
        summary: 'In-cart order bumps, post-purchase 1-click upsells, bundled upgrades, and subscription replenishment offerings.',
        deliverables: [
          'Post-purchase 1-click upsell funnel logic',
          'Complementary product bundle packages',
          'Automated consumable refill reminder triggers'
        ],
        businessImpact: 'Instantly increases Average Order Value (AOV) by 15-30% with zero incremental ad spend.',
        deliverableTimeline: '5 - 7 Business Days',
        highlight: true
      },
      {
        id: 'ret-4',
        title: 'Referral Growth System',
        titleBn: 'অটোমেটেড রেফারাল ও এফিলিয়েট গ্রোথ সিস্টেম',
        categoryNumber: 9,
        categoryTitle: 'Customer Retention & Scale',
        categoryTitleBn: 'রিটেনশন ও স্কেল',
        growthStages: ['retain', 'scale'],
        summary: 'Turn your happy customers into an active unpaid sales force with "Give $20, Get $20" automated referral mechanics.',
        deliverables: [
          'Custom referral link generation for customers',
          'Automated reward payout & credit tracking',
          'Post-purchase referral prompt email/SMS trigger'
        ],
        businessImpact: 'Generates organic, zero-CAC customer acquisition through high-trust word-of-mouth recommendations.',
        deliverableTimeline: '7 Business Days'
      },
      {
        id: 'ret-5',
        title: 'Customer Health Analysis',
        titleBn: 'কাস্টমার হেলথ অ্যানালাইসিস ও চার্ন প্রিভেনশন',
        categoryNumber: 9,
        categoryTitle: 'Customer Retention & Scale',
        categoryTitleBn: 'রিটেনশন ও স্কেল',
        growthStages: ['diagnose', 'retain'],
        summary: 'Telemetry monitoring customer engagement, login frequency, ticket volume, and Net Promoter Score (NPS) to intervene before churn.',
        deliverables: [
          'Customer Health Index dashboard',
          'Automated at-risk account notification to account managers',
          'Proactive rescue call scripts'
        ],
        businessImpact: 'Rescues 30-50% of at-risk client accounts before cancellation occurs, protecting recurring monthly revenue (MRR).',
        deliverableTimeline: '7 Business Days'
      },
      {
        id: 'ret-6',
        title: 'Lifetime Value (LTV) Optimization',
        titleBn: 'কাস্টমার লাইফটাইম ভ্যালু (LTV) ম্যাক্সিমাইজেশন',
        categoryNumber: 9,
        categoryTitle: 'Customer Retention & Scale',
        categoryTitleBn: 'রিটেনশন ও স্কেল',
        growthStages: ['scale'],
        summary: 'Cohort analysis and retention cohort modeling to systematically expand the 60, 90, and 365-day cash generated per customer.',
        deliverables: [
          'Cohort LTV progression curves',
          'LTV-to-CAC ratio analysis (targeting 4:1+)',
          'High-value customer segment targeting strategies'
        ],
        businessImpact: 'High LTV unlocks massive ad spend scalability because you can afford to outspend every competitor on customer acquisition.',
        deliverableTimeline: 'Ongoing Strategic Focus'
      },
      {
        id: 'ret-7',
        title: 'Business Scaling Roadmap',
        titleBn: 'এন্টারপ্রাইজ বিজনেস স্কেলিং রোডম্যাপ',
        categoryNumber: 9,
        categoryTitle: 'Customer Retention & Scale',
        categoryTitleBn: 'রিটেনশন ও স্কেল',
        growthStages: ['scale'],
        summary: 'Strategic planning for new market entry, enterprise B2B transition, franchise expansion, or strategic acquisition positioning.',
        deliverables: [
          'Scale barrier analysis & mitigation blueprint',
          'Operational capacity & hiring forecast model',
          'Quarterly strategic board advisory sessions'
        ],
        businessImpact: 'Ensures operational systems and team infrastructure do not break when revenue doubles or triples.',
        deliverableTimeline: 'Quarterly Executive Retainer',
        highlight: true
      }
    ]
  },
  {
    id: 'business-systems',
    number: 10,
    title: 'Business Systems & Technology',
    titleBn: 'বিজনেস সিস্টেম, অটোমেশন ও সফটওয়্যার টেকনোলজি',
    growthStages: ['build', 'scale'],
    description: 'Custom software architectures, autonomous internal tools, AI worker bots, and Firebase applications that automate agency and enterprise operations.',
    iconName: 'Cpu',
    accentColor: 'from-indigo-600 to-cyan-500',
    services: [
      {
        id: 'sys-1',
        title: 'Custom CRM and Business Dashboard',
        titleBn: 'কাস্টম সিআরএম ও বিজনেস অপারেশন ড্যাশবোর্ড',
        categoryNumber: 10,
        categoryTitle: 'Business Systems & Technology',
        categoryTitleBn: 'বিজনেস সিস্টেম',
        growthStages: ['build', 'scale'],
        summary: 'Tailor-made web applications designed specifically around your unique business logic, billing models, and team roles.',
        deliverables: [
          'Role-based access control (Admin, Manager, Client)',
          'Custom relational database schemas & API endpoints',
          'Real-time operational charts and reporting'
        ],
        businessImpact: 'Eliminates thousands of dollars in off-the-shelf SaaS subscription fees with an asset you own 100%.',
        deliverableTimeline: '21 - 35 Business Days',
        highlight: true
      },
      {
        id: 'sys-2',
        title: 'Client Portal Development',
        titleBn: 'হোয়াইট-লেবেল ক্লায়েন্ট পোর্টাল ডেভেলপমেন্ট',
        categoryNumber: 10,
        categoryTitle: 'Business Systems & Technology',
        categoryTitleBn: 'বিজনেস সিস্টেম',
        growthStages: ['build', 'retain'],
        summary: 'Branded self-service client portals where customers can log in to view deliverables, invoices, support tickets, and live project status.',
        deliverables: [
          'Secure passwordless authentication',
          'Deliverable approval and revision interface',
          'Automated invoice viewing and online payment'
        ],
        businessImpact: 'Provides a world-class Fortune 500 client experience that commands 2x higher retainer pricing.',
        deliverableTimeline: '14 - 21 Business Days'
      },
      {
        id: 'sys-3',
        title: 'Workflow and Approval System',
        titleBn: 'অটোমেটেড ওয়ার্কফ্লো ও মাল্টি-স্টেপ অ্যাপ্রুভাল সিস্টেম',
        categoryNumber: 10,
        categoryTitle: 'Business Systems & Technology',
        categoryTitleBn: 'বিজনেস সিস্টেম',
        growthStages: ['build', 'scale'],
        summary: 'Automating internal sign-offs, purchase order authorizations, asset reviews, and cross-department handoffs.',
        deliverables: [
          'Multi-stage approval workflow builder',
          'Slack / Email / WhatsApp automated approval buttons',
          'Audit trail and timestamp logging'
        ],
        businessImpact: 'Slashes internal operational bottlenecks, reducing project delivery delays by up to 70%.',
        deliverableTimeline: '7 - 12 Business Days'
      },
      {
        id: 'sys-4',
        title: 'Project and Task Management System',
        titleBn: 'কাস্টম প্রজেক্ট ও টাস্ক ম্যানেজমেন্ট সেটআপ',
        categoryNumber: 10,
        categoryTitle: 'Business Systems & Technology',
        categoryTitleBn: 'বিজনেস সিস্টেম',
        growthStages: ['build', 'scale'],
        summary: 'Unified workspaces (ClickUp, Linear, or Custom) mapped to your service delivery SOPs with automated task handoffs.',
        deliverables: [
          'Client onboarding template automations',
          'SOP-linked task checklists',
          'Capacity planning and team workload views'
        ],
        businessImpact: 'Ensures high quality control and on-time project delivery as team headcount expands.',
        deliverableTimeline: '5 - 7 Business Days'
      },
      {
        id: 'sys-5',
        title: 'Reporting and Finance Automation',
        titleBn: 'ফাইন্যান্স, ইনভয়েসিং ও রিপোর্টিং অটোমেশন',
        categoryNumber: 10,
        categoryTitle: 'Business Systems & Technology',
        categoryTitleBn: 'বিজনেস সিস্টেম',
        growthStages: ['scale'],
        summary: 'Automated recurring invoice generation, overdue payment chasing via WhatsApp, revenue recognition, and profit/loss calculation.',
        deliverables: [
          'Stripe / Bank automated recurring billing sync',
          'Automated friendly payment reminder cadence',
          'Monthly financial snapshot generator'
        ],
        businessImpact: 'Eliminates bad debt and recovers overdue receivables automatically with zero uncomfortable manual phone calls.',
        deliverableTimeline: '7 Business Days'
      },
      {
        id: 'sys-6',
        title: 'AI-Assisted Business Workflows',
        titleBn: 'এআই-অ্যাসিস্টেড বিজনেস ওয়ার্কফ্লো ও অটোনোমাস এজেন্টস',
        categoryNumber: 10,
        categoryTitle: 'Business Systems & Technology',
        categoryTitleBn: 'বিজনেস সিস্টেম',
        growthStages: ['build', 'scale'],
        summary: 'Custom LLM micro-agents integrated into your database to draft proposals, audit prompts, summarize customer meetings, and triage tickets.',
        deliverables: [
          'Autonomous webhook-grounded AI worker bots',
          'Custom prompt library with anti-hallucination guardrails',
          'CRM and Slack conversational AI copilot'
        ],
        businessImpact: 'Saves 20-30 hours per employee every month, creating a hyper-leveraged, high-margin agency operation.',
        deliverableTimeline: '10 - 14 Business Days',
        highlight: true
      },
      {
        id: 'sys-7',
        title: 'Firebase-Based Web Applications',
        titleBn: 'ফায়ারবেস-বেসড স্কেলেবল ওয়েব অ্যাপ্লিকেশনস',
        categoryNumber: 10,
        categoryTitle: 'Business Systems & Technology',
        categoryTitleBn: 'বিজনেস সিস্টেম',
        growthStages: ['build', 'scale'],
        summary: 'Rapid, enterprise-grade cloud applications leveraging Firestore real-time database, Authentication, and Cloud Functions.',
        deliverables: [
          'Production Firestore schema & security rules',
          'Multi-tenant authentication and session management',
          'Sub-100ms real-time data sync'
        ],
        businessImpact: 'Launches resilient, zero-maintenance web platforms that scale effortlessly from 10 to 100,000 active users.',
        deliverableTimeline: '14 - 28 Business Days'
      },
      {
        id: 'sys-8',
        title: 'System Maintenance and Technical Support',
        titleBn: '২৪/৭ সিস্টেম মেইনটেন্যান্স ও টেকনিক্যাল সাপোর্ট',
        categoryNumber: 10,
        categoryTitle: 'Business Systems & Technology',
        categoryTitleBn: 'বিজনেস সিস্টেম',
        growthStages: ['scale'],
        summary: 'Dedicated engineering SLA ensuring zero downtime, continuous security patch updates, database backups, and bug resolution.',
        deliverables: [
          'Guaranteed response time SLA (< 2 hours for critical issues)',
          'Weekly automated security and vulnerability scans',
          'Monthly technical optimization sprints'
        ],
        businessImpact: 'Ensures business continuity and peace of mind so leadership can focus 100% on growth.',
        deliverableTimeline: 'Ongoing Monthly SLA'
      }
    ]
  },
  {
    id: 'agentic-ai',
    number: 11,
    title: 'AGENTIC AI & Autonomous Systems',
    titleBn: 'এজেন্টিক এআই ও অটোনোমাস মাল্টি-এজেন্ট সিস্টেম',
    growthStages: ['build', 'attract', 'convert', 'retain', 'scale'],
    description: 'Autonomous goal-seeking AI agents, multi-agent orchestration, self-correcting tool execution, and enterprise RAG pipelines architected by Abu Talib (Expert in Agentic AI).',
    iconName: 'Bot',
    accentColor: 'from-emerald-500 via-teal-500 to-cyan-500',
    isMajor: true,
    expertBadge: 'Founder Abu Talib • Expert in Agentic AI',
    services: [
      {
        id: 'agentic-1',
        title: 'Enterprise Agentic AI Multi-Agent Fleet Orchestration',
        titleBn: 'এন্টারপ্রাইজ এজেন্টিক এআই মাল্টি-এজেন্ট ফ্লিট অর্কেস্ট্রেশন',
        categoryNumber: 11,
        categoryTitle: 'AGENTIC AI & Autonomous Systems',
        categoryTitleBn: 'এজেন্টিক এআই',
        growthStages: ['build', 'scale'],
        summary: 'Architecture and deployment of collaborative autonomous multi-agent teams using LangGraph, CrewAI, and AutoGen. Agents decompose complex business objectives, distribute sub-tasks, execute tools, verify outputs, and operate 24/7 without human latency.',
        deliverables: [
          'Multi-agent role taxonomy & state-machine graph architecture',
          'Autonomous agent team orchestration (Supervisor, Worker, Verifier agents)',
          'Asynchronous task queuing & distributed agent worker fleet',
          'Self-correcting error recovery loops & human-in-the-loop (HITL) checkpoints',
          'Real-time agent fleet telemetry dashboard with sub-second logging'
        ],
        businessImpact: 'Replaces 40+ hours/week of manual human coordination with 99.9% uptime autonomous agents executing complex operational tasks instantly.',
        deliverableTimeline: '2 - 3 Weeks',
        highlight: true,
        isMajorService: true,
        expertLead: 'Abu Talib (Expert in Agentic AI)',
        externalUrl: 'https://abu-talib.netlify.app/',
        internalTab: 'fleet'
      },
      {
        id: 'agentic-2',
        title: 'Autonomous Tool-Calling & Action Execution Engine',
        titleBn: 'অটোনোমাস টুল-কলিং ও অ্যাকশন এক্সিকিউশন ইঞ্জিন',
        categoryNumber: 11,
        categoryTitle: 'AGENTIC AI & Autonomous Systems',
        categoryTitleBn: 'এজেন্টিক এআই',
        growthStages: ['build', 'scale'],
        summary: 'Connecting LLMs to real-world corporate actions: database querying, CRM updates, ERP manipulation, webhook triggers, API calls, and automated software workflows with mathematical validation and security sandboxing.',
        deliverables: [
          'Custom tool-calling schema (OpenAI / Gemini function calling specifications)',
          'Secure API gateway connector & sanitized credential execution proxy',
          'Database CRUD & automated data pipeline write-back modules',
          'Idempotency guardrails preventing accidental duplicate transactions',
          'Audit trail logging & roll-back mechanisms for mission-critical actions'
        ],
        businessImpact: 'Transforms passive chatbots into active autonomous workforce workers capable of executing enterprise business logic and closing loops end-to-end.',
        deliverableTimeline: '10 - 14 Business Days',
        highlight: true,
        isMajorService: true,
        expertLead: 'Abu Talib (Expert in Agentic AI)',
        internalTab: 'fleet'
      },
      {
        id: 'agentic-3',
        title: 'Enterprise RAG & Domain Vector Intelligence System',
        titleBn: 'এন্টারপ্রাইজ RAG ও হাইব্রিড ভেক্টর নলেজ ইন্টেলিজেন্স',
        categoryNumber: 11,
        categoryTitle: 'AGENTIC AI & Autonomous Systems',
        categoryTitleBn: 'এজেন্টিক এআই',
        growthStages: ['strategize', 'build'],
        summary: 'State-of-the-art hybrid semantic retrieval-augmented generation combining dense vector embeddings with sparse BM25 keyword search, reranking models, and contextual compression to eliminate hallucinations across proprietary enterprise documents.',
        deliverables: [
          'High-dimensional vector database setup (Pinecone, Qdrant, or pgvector)',
          'Intelligent recursive document chunking & contextual metadata enrichment',
          'Cross-encoder reranking layer for sub-millisecond precision retrieval',
          'Strict zero-hallucination factual grounding guardrails',
          'Continuous automated re-indexing pipeline syncing with company drives & knowledge bases'
        ],
        businessImpact: 'Gives your AI agents instant photographic recall over millions of internal corporate documents, policies, and products with 99.8% precision.',
        deliverableTimeline: '10 - 15 Business Days',
        highlight: true,
        isMajorService: true,
        expertLead: 'Abu Talib (Expert in Agentic AI)',
        externalUrl: 'https://abu-talib.netlify.app/'
      },
      {
        id: 'agentic-4',
        title: 'Autonomous Omnichannel Sales & Lead Conversion Agents',
        titleBn: 'অটোনোমাস অমনিচ্যানেল সেলস ও লিড কনভার্সন এজেন্ট',
        categoryNumber: 11,
        categoryTitle: 'AGENTIC AI & Autonomous Systems',
        categoryTitleBn: 'এজেন্টিক এআই',
        growthStages: ['attract', 'convert'],
        summary: 'Agentic conversational agents deployed across WhatsApp, Meta Messenger, web live chat, and email that autonomously qualify incoming leads, negotiate offers, resolve friction, calculate pricing, and book calendar appointments in real time.',
        deliverables: [
          'Psychology-informed conversational funnel scripting & qualification logic',
          'Native WhatsApp Business Cloud API & Messenger multi-channel webhook integration',
          'Direct calendar booking (Google Calendar / Cal.com) & CRM deal creation',
          'Multi-lingual language support (Bangla, English, Hinglish)',
          'Instant escalation routing to human sales executives for high-ticket deals'
        ],
        businessImpact: 'Eliminates lead response lag from hours to under 3 seconds, capturing 3x more qualified sales conversations 24 hours a day.',
        deliverableTimeline: '7 - 10 Business Days',
        highlight: true,
        isMajorService: true,
        expertLead: 'Abu Talib (Expert in Agentic AI)',
        internalTab: 'fleet'
      },
      {
        id: 'agentic-5',
        title: 'Autonomous AI Telemetry, Guardrails & Self-Healing Pipeline',
        titleBn: 'এআই টেলিমেট্রি, গার্ডরেইল ও সেলফ-হিলিং মনিটরিং',
        categoryNumber: 11,
        categoryTitle: 'AGENTIC AI & Autonomous Systems',
        categoryTitleBn: 'এজেন্টিক এআই',
        growthStages: ['scale'],
        summary: 'Production observability and automated resilience architecture for enterprise AI fleets: token consumption tracking, prompt injection shields, output schema validation, latency budgets, and automatic fallback model switching.',
        deliverables: [
          'Full-stack telemetry dashboard (latency, token costs, success rate, error traces)',
          'Pydantic / Zod schema enforcement preventing malformed model outputs',
          'Prompt injection, jailbreak, and sensitive PII redaction filters',
          'Dynamic multi-model fallback cascade (Claude 3.5 Sonnet -> Gemini 1.5 Pro -> GPT-4o)',
          'Automated daily health audits and error alert dispatching via WhatsApp'
        ],
        businessImpact: 'Guarantees enterprise SLA compliance, prevents runaway API costs, and protects brand reputation against rogue AI model behaviors.',
        deliverableTimeline: '7 - 10 Business Days',
        isMajorService: true,
        expertLead: 'Abu Talib (Expert in Agentic AI)'
      },
      {
        id: 'agentic-6',
        title: 'Executive Agentic Copilot & Decision Intelligence Cockpit',
        titleBn: 'এক্সিকিউটিভ ডিসিশন ইন্টেলিজেন্স ও স্ট্র্যাটেজিক এজেন্ট কোপাইলট',
        categoryNumber: 11,
        categoryTitle: 'AGENTIC AI & Autonomous Systems',
        categoryTitleBn: 'এজেন্টিক এআই',
        growthStages: ['diagnose', 'scale'],
        summary: 'Custom executive copilot that autonomously ingests real-time company revenue, marketing ROAS, client health scores, and pipeline velocity to synthesize instant strategic board briefs, scenario simulations, and growth proposals.',
        deliverables: [
          'Unified multi-source telemetry data ingestion pipeline',
          'Executive briefing synthesizer generating weekly actionable recommendations',
          'Custom scenario simulator (e.g. "What happens if we increase ad budget by $10k?")',
          'Instant client proposal and growth plan generation',
          'Natural language SQL/data querying for non-technical leadership'
        ],
        businessImpact: 'Equips leadership with instantaneous, data-validated strategic clarity, shrinking executive decision cycles from days to minutes.',
        deliverableTimeline: '14 Business Days',
        highlight: true,
        isMajorService: true,
        expertLead: 'Abu Talib (Expert in Agentic AI)',
        internalTab: 'copilot'
      }
    ]
  }
];

export const AIC_PACKAGES: AicPackage[] = [
  {
    id: 'agentic-ai-enterprise',
    name: 'AIC Agentic AI Enterprise Fleet',
    nameBn: 'এজেন্টিক এআই ও অটোনোমাস এন্টারপ্রাইজ ফ্লিট',
    tagline: 'Autonomous Multi-Agent Teams Engineered by Abu Talib',
    bestFor: 'High-growth businesses & enterprises wanting 24/7 autonomous operations without human bottlenecks',
    coreOutcome: 'Turnkey architecture and deployment of autonomous multi-agent workers integrated with your CRM, databases, and APIs.',
    investmentTier: '$4,500 - $8,500 / month',
    turnaroundTime: '2 - 3 Weeks Deployment',
    isPopular: true,
    keyDeliverables: [
      'Dedicated Autonomous Multi-Agent Fleet (Orchestration, Execution & Verification)',
      'Custom Tool-Calling & API Action Execution Connectors',
      'Enterprise Hybrid RAG Vector Database with Zero-Hallucination Guardrails',
      'Real-Time Omnichannel Lead Conversion Agents (WhatsApp, Web, CRM)',
      'Production AI Telemetry, Automated Fallbacks & 99.9% Uptime SLA',
      'Weekly Agentic AI Architecture Sprints with Founder Abu Talib (Expert in Agentic AI)'
    ],
    growthStages: ['build', 'attract', 'convert', 'scale'],
    highlightColor: 'from-emerald-500/25 via-teal-500/20 to-cyan-500/25'
  },
  {
    id: 'growth-diagnosis',
    name: 'AIC Growth Diagnosis',
    nameBn: 'গ্রোথ ডায়াগনোসিস ও অডিট প্যাকেজ',
    tagline: 'Audit, Growth Score & 90-Day Roadmap',
    bestFor: 'Businesses unsure where to start or experiencing plateaued growth',
    coreOutcome: 'Comprehensive multi-channel audit, client growth score (0-100), and a prioritized 90-day execution roadmap.',
    investmentTier: '$1,800 One-time',
    turnaroundTime: '7 - 10 Business Days',
    keyDeliverables: [
      'Digital Growth Diagnosis & Health Scorecard',
      'Funnel leakage & drop-off analytics teardown',
      'Competitor positioning & market opportunity research',
      'ICE-prioritized 30/60/90-Day Growth Roadmap',
      '60-Minute Executive Strategy Debrief Call'
    ],
    growthStages: ['diagnose', 'strategize'],
    highlightColor: 'from-amber-500/20 to-orange-500/20'
  },
  {
    id: 'digital-launch',
    name: 'AIC Digital Launch',
    nameBn: 'ডিজিটাল লঞ্চ ও ফাউন্ডেশন প্যাকেজ',
    tagline: 'Brand, Website, Funnel & Tracking Foundation',
    bestFor: 'New businesses, rebranding companies, or traditional businesses going digital',
    coreOutcome: 'Turnkey high-converting brand identity, fast corporate website/landing page, CRM pipeline, and server-side tracking.',
    investmentTier: '$3,800 - $5,500 One-time',
    turnaroundTime: '3 - 4 Weeks',
    keyDeliverables: [
      'Visual Identity, Logo Suite & Brand Guidelines',
      'High-Performance Corporate Website or Sales Funnel (Sub-2s load)',
      'Server-Side GA4, GTM & Meta Conversions API Setup',
      'CRM Pipeline Setup with Instant Lead Notification',
      'High-Converting Direct Response Copywriting'
    ],
    growthStages: ['build', 'convert'],
    highlightColor: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 'performance-engine',
    name: 'AIC Performance Engine',
    nameBn: 'পারফরম্যান্স ইঞ্জিন (পেইড অ্যাডস + কনভার্সন)',
    tagline: 'Advertising, Content, Funnel & Optimization',
    bestFor: 'Businesses needing consistent, qualified leads and scaling sales revenue',
    coreOutcome: 'Profitable paid customer acquisition on Meta & Google paired with high-converting creative and continuous CRO.',
    investmentTier: '$2,800 - $4,200 / month',
    turnaroundTime: 'Ongoing Growth Sprint',
    isPopular: true,
    keyDeliverables: [
      'Full Meta (FB/IG) & Google Ads Management',
      'Weekly high-converting ad creative & video hooks',
      'Dedicated landing page optimization & CRO testing',
      'Automated WhatsApp & Email lead follow-up sequences',
      'Weekly ROAS & CAC performance reports'
    ],
    growthStages: ['attract', 'convert'],
    highlightColor: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    id: 'growth-360',
    name: 'AIC Growth 360°',
    nameBn: 'গ্রোথ ৩৬০° ফুল-স্ট্যাক পার্টনারশিপ',
    tagline: 'Complete Monthly Marketing & Growth Management',
    bestFor: 'Established businesses demanding an elite full-stack marketing department without hiring in-house',
    coreOutcome: 'End-to-end management spanning strategy, performance ads, social content, SEO, automation, and continuous optimization.',
    investmentTier: '$5,500 - $8,500 / month',
    turnaroundTime: 'Dedicated Full-Stack Retainer',
    keyDeliverables: [
      'Everything in Performance Engine + Full Social Media Management',
      'Organic SEO & AI Search Visibility (AEO/GEO optimization)',
      'Advanced Multi-step CRM & Automated WhatsApp/Email Funnels',
      'Bi-weekly CRO A/B testing sprints on core checkout/funnel',
      'Dedicated Senior Growth Director & Priority Technical Support'
    ],
    growthStages: ['strategize', 'build', 'attract', 'convert', 'retain'],
    highlightColor: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    id: 'scale-intelligence',
    name: 'AIC Scale Intelligence',
    nameBn: 'স্কেল ইন্টেলিজেন্স ও এন্টারপ্রাইজ অটোমেশন',
    tagline: 'Analytics, Automation, Retention & Expansion',
    bestFor: 'High-growth businesses ready to scale to 7-8 figures and streamline operations',
    coreOutcome: 'Custom business tech dashboards, AI-assisted workflows, customer retention maximization, and enterprise scaling.',
    investmentTier: '$7,500+ / month or Custom',
    turnaroundTime: 'Enterprise Partnership',
    keyDeliverables: [
      'Custom Executive Real-Time BI Dashboard (Multi-touch attribution)',
      'AI-Powered Autonomous Agents & Workflow Automation',
      'VIP Customer Retention, Loyalty & LTV Maximization Systems',
      'Custom Client Portal or Internal Workflow Web Applications',
      'Weekly Fractional CGO (Chief Growth Officer) Advisory Sessions'
    ],
    growthStages: ['diagnose', 'strategize', 'retain', 'scale'],
    highlightColor: 'from-cyan-500/20 to-blue-500/20'
  }
];
