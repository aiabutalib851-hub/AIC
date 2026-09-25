import { CroChecklistItem, CroAuditProfile, CroUploadedFile } from '../types';

export const INITIAL_CRO_PROFILES: CroAuditProfile[] = [
  {
    id: 'cro-prof-1',
    businessName: 'Apex Health Labs',
    websiteUrl: 'https://apexhealthlabs.io',
    industry: 'Healthcare & Biotech Supplements',
    monthlyVisitors: 85000,
    currentConvRate: 1.65,
    targetConvRate: 3.20,
    averageOrderValue: 88,
    monthlyAdSpend: 42000,
    healthScore: 58,
    auditStatus: 'in_progress',
    targetAudience: 'Health-conscious professionals & wellness consumers (aged 28-54)',
    executiveSummary: 'Apex Health Labs is generating strong top-of-funnel paid traffic ($42K/mo ad spend), but severe mobile checkout friction and absent trust signals in the first 3 seconds are leaking 82% of potential transactions. Solving 4 key friction points will unlock an estimated $116,000/month in net revenue without spending an additional dollar on ads.',
  },
  {
    id: 'cro-prof-2',
    businessName: 'Nexus Legal Tech',
    websiteUrl: 'https://nexuslegal.ai',
    industry: 'B2B SaaS / Enterprise Legal',
    monthlyVisitors: 34000,
    currentConvRate: 2.10,
    targetConvRate: 4.50,
    averageOrderValue: 420,
    monthlyAdSpend: 28000,
    healthScore: 64,
    auditStatus: 'audit_ready',
    targetAudience: 'Corporate General Counsels, Law Firm Partners, Compliance Officers',
    executiveSummary: 'Demonstration booking form contains 9 mandatory input fields causing a 61% exit rate on step 2. Removing non-essential qualification fields and deploying a 2-step micro-commitment calendar flow will increase qualified demo velocity by +45%.',
  },
  {
    id: 'cro-prof-3',
    businessName: 'Aura Luxe Living',
    websiteUrl: 'https://auraluxeliving.com',
    industry: 'E-Commerce & High-End Decor',
    monthlyVisitors: 120000,
    currentConvRate: 1.20,
    targetConvRate: 2.40,
    averageOrderValue: 145,
    monthlyAdSpend: 55000,
    healthScore: 52,
    auditStatus: 'in_progress',
    targetAudience: 'Affluent homeowners, interior decorators, luxury lifestyle buyers',
    executiveSummary: 'Mobile traffic constitutes 74% of visitors but converts at only 0.8% versus 2.3% on desktop. Hidden shipping fees revealed late in checkout and lack of 1-click Express Pay (Apple Pay/Shop Pay) is the primary driver of cart abandonment (79.2%).',
  }
];

export const INITIAL_CRO_CHECKLIST: CroChecklistItem[] = [
  {
    id: 'cro-chk-1',
    title: '5-Second Value Proposition & Hero Clarity Test',
    category: 'above_the_fold',
    categoryLabel: 'Above-the-Fold & Hero',
    priority: 'critical',
    status: 'in_progress',
    estimatedImpact: '+18% - 32% Lift',
    whyCrucial: 'Visitors form an opinion about your website in 0.05 seconds. If the hero section does not instantly answer "What is this?", "Why is it better?", and "What should I do next?", over 50% of paid ad clicks bounce before scrolling.',
    actionSteps: [
      'Replace vague taglines with benefit-driven, outcome-focused H1 headline',
      'Add a secondary sub-headline stating the specific problem solved in under 15 words',
      'Display product in-action visual / UI preview rather than abstract stock imagery',
      'Ensure primary CTA button is prominently styled with maximum color contrast'
    ],
    testedVariant: 'Variant B: Direct Outcome Headline vs Variant A: Brand Slogan',
    source: 'checklist'
  },
  {
    id: 'cro-chk-2',
    title: 'Mobile vs. Desktop Conversion Parity Diagnostic',
    category: 'funnel_journey',
    categoryLabel: 'Funnel & User Flow',
    priority: 'critical',
    status: 'todo',
    estimatedImpact: '+25% - 40% Mobile Lift',
    whyCrucial: 'Over 70% of digital traffic is mobile, yet most sites convert mobile visitors at less than half their desktop rate due to fat-finger friction, tiny tap targets, and unoptimized layout shifts.',
    actionSteps: [
      'Segment GA4 conversion rate by device category (Mobile vs Desktop vs Tablet)',
      'Inspect mobile viewport scaling and font sizes (minimum 16px to prevent iOS auto-zoom)',
      'Ensure all interactive tap targets are at least 44x44px with generous touch margins',
      'Eliminate intrusive full-screen popups that penalize mobile usability and SEO'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-3',
    title: 'Form Field Reduction & Inline Validation Optimization',
    category: 'form_friction',
    categoryLabel: 'Friction & Lead Forms',
    priority: 'critical',
    status: 'todo',
    estimatedImpact: '+35% Form Submissions',
    whyCrucial: 'Every additional form field reduces conversion rate by up to 8%. Unclear error messages upon form submission cause immediate prospect frustration and permanent abandonment.',
    actionSteps: [
      'Audit form fields: Cut non-essential questions (e.g. Fax, Job Title, Company Size)',
      'Convert long forms into a multi-step progressive disclosure wizard with progress bar',
      'Implement real-time green/red inline validation instead of on-submit error dumps',
      'Enable browser autofill (autocomplete tags for name, email, tel, address)'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-4',
    title: 'Trust Signal Placement Near Points of High Anxiety',
    category: 'trust_proof',
    categoryLabel: 'Psychology & Trust',
    priority: 'critical',
    status: 'in_progress',
    estimatedImpact: '+14% - 22% Checkout Lift',
    whyCrucial: 'When visitors reach the CTA or checkout button, their anxiety spikes: "Is this secure?", "What if it doesn’t work?", "Can I get a refund?". Placing trust badges here diffuses hesitation.',
    actionSteps: [
      'Place 3 micro-trust icons right beneath the primary CTA (Money-Back Guarantee, 256-bit SSL, Free Returns)',
      'Embed verified review snippet (e.g. Trustpilot 4.9/5 stars based on 1,400+ clients) adjacent to price',
      'Feature client security compliance logos (SOC2, HIPAA, PCI-DSS, Visa/Mastercard Verified)',
      'Add a dedicated "Zero-Risk 30-Day Money Back Policy" callout box'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-5',
    title: 'Cart & Checkout Abandonment Friction Elimination',
    category: 'checkout_cart',
    categoryLabel: 'Checkout & Payment',
    priority: 'critical',
    status: 'todo',
    estimatedImpact: '+20% - 35% Completed Orders',
    whyCrucial: 'The average e-commerce cart abandonment rate is 70.19%. The #1 reason is unexpected costs (shipping/tax) revealed at step 3, followed by mandatory account creation.',
    actionSteps: [
      'Enable Guest Checkout by default with zero forced account registration',
      'Integrate 1-Click Express Pay (Apple Pay, Google Pay, Shop Pay, PayPal)',
      'Display estimated total including shipping upfront on product page or slide-out cart',
      'Deploy intelligent exit-intent modal offering limited-time free shipping or 10% coupon'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-6',
    title: 'Core Web Vitals & Page Load Speed Acceleration (LCP < 2.5s)',
    category: 'speed_tech',
    categoryLabel: 'Speed & Technical UX',
    priority: 'high',
    status: 'completed',
    estimatedImpact: '+12% - 20% Sitewide Lift',
    whyCrucial: 'A 1-second delay in mobile load times can decrease conversion rates by up to 20%. Fast sites retain attention, lower bounce rates, and improve Google Ads Quality Score.',
    actionSteps: [
      'Compress and convert all banner hero images to next-gen WebP/AVIF format',
      'Defer non-critical third-party analytics scripts (Hotjar, TikTok pixel, Facebook pixel)',
      'Eliminate Cumulative Layout Shift (CLS) by hardcoding image aspect ratios and dimensions',
      'Achieve Largest Contentful Paint (LCP) under 2.2 seconds on mobile 4G'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-7',
    title: 'GA4 Enhanced E-commerce & Meta CAPI Event Audit',
    category: 'analytics_tracking',
    categoryLabel: 'Data & Tracking Integrity',
    priority: 'critical',
    status: 'completed',
    estimatedImpact: 'Reliable Attribution & +15% ROAS',
    whyCrucial: 'You cannot optimize what you do not accurately measure. Missing purchase events or broken CAPI deduplication causes ad algorithms to bid blind, inflating CAC by 30-60%.',
    actionSteps: [
      'Verify GA4 funnel events: view_item, add_to_cart, begin_checkout, purchase',
      'Audit Meta Conversions API (CAPI) server-side tracking and event match quality score (>8.0)',
      'Validate UTM parameter consistency across all paid advertising campaigns',
      'Set up custom funnel exploration reports to pinpoint exact stage drop-offs'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-8',
    title: 'Sticky Mobile Call-to-Action Bar Implementation',
    category: 'above_the_fold',
    categoryLabel: 'Above-the-Fold & Hero',
    priority: 'high',
    status: 'todo',
    estimatedImpact: '+9% - 16% Mobile Clicks',
    whyCrucial: 'As users scroll through lengthy product descriptions or case studies on mobile devices, the buy/book button disappears off-screen. A persistent sticky bottom bar ensures the conversion step is always 1 tap away.',
    actionSteps: [
      'Implement sticky bottom bar that slides in once user scrolls past the hero CTA',
      'Include clear price, thumbnail, and contrasting "Buy Now" / "Book Call" action button',
      'Ensure bottom bar does not obstruct accessibility elements or chat widgets',
      'Test on iOS Safari and Android Chrome across varying bottom navigation heights'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-9',
    title: 'Heatmap & Scroll Depth Behavior Analysis (Rage & Dead Clicks)',
    category: 'analytics_tracking',
    categoryLabel: 'Data & Tracking Integrity',
    priority: 'high',
    status: 'in_progress',
    estimatedImpact: '+15% Friction Elimination',
    whyCrucial: 'Session recordings reveal where users get confused, click non-clickable elements (dead clicks), or rapidly tap out of frustration (rage clicks). This exposes silent conversion killers.',
    actionSteps: [
      'Deploy Hotjar or Microsoft Clarity session recording script',
      'Analyze 500+ mobile sessions specifically focusing on drop-offs before checkout',
      'Identify non-clickable images or text blocks that users repeatedly attempt to tap',
      'Check scroll depth: Determine what percentage of visitors reach primary social proof sections'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-10',
    title: 'A/B Testing Hypothesis Backlog & ICE Prioritization',
    category: 'ab_testing',
    categoryLabel: 'A/B Testing & Strategy',
    priority: 'high',
    status: 'in_progress',
    estimatedImpact: 'Consistent +20-50% Annual Compounding',
    whyCrucial: 'Random changes without structured scientific hypotheses lead to noisy results and wasted effort. Using the ICE framework (Impact, Confidence, Ease) guarantees testing the highest ROI ideas first.',
    actionSteps: [
      'Build structured hypothesis log: "If we [change], then [metric] will increase because [psychological reason]"',
      'Calculate statistical sample size requirements to achieve 95% confidence level',
      'Score each test 1-10 on Impact, Confidence, and Ease of execution',
      'Schedule bi-weekly test rollout cadence with zero overlapping test pollution'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-11',
    title: 'Risk Reversal & Iron-Clad Guarantee Architecture',
    category: 'trust_proof',
    categoryLabel: 'Psychology & Trust',
    priority: 'medium',
    status: 'todo',
    estimatedImpact: '+11% - 19% Lift',
    whyCrucial: 'The fear of making a bad purchase decision is the primary psychological barrier to checkout. An explicit, frictionless guarantee transfers the risk from the buyer to the seller.',
    actionSteps: [
      'Replace vague "Satisfaction Guaranteed" with specific "30-Day 100% Money-Back, No Questions Asked"',
      'Outline exact 3-step refund process so the customer knows there are no hidden hurdles',
      'Include guarantee seal directly adjacent to the order summary pricing block'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-12',
    title: 'Exit-Intent Lead & Order Recovery Trigger',
    category: 'checkout_cart',
    categoryLabel: 'Checkout & Payment',
    priority: 'medium',
    status: 'todo',
    estimatedImpact: '+5% - 8% Abandonment Salvage',
    whyCrucial: '97% of visitors leave without buying. An exit-intent modal triggered when the cursor breaks the top browser window provides one final opportunity to capture the lead or offer a timed incentive.',
    actionSteps: [
      'Configure mouse velocity exit-intent trigger for desktop and back-button trigger for mobile',
      'Offer genuine value: 10% instant discount code, free downloadable blueprint, or cart reservation',
      'Keep modal single-field (Email only) with instant 1-click coupon application'
    ],
    source: 'checklist'
  },
  {
    id: 'cro-chk-13',
    title: 'Post-Purchase 1-Click Upsell & Thank You Page Monetization',
    category: 'funnel_journey',
    categoryLabel: 'Funnel & User Flow',
    priority: 'medium',
    status: 'todo',
    estimatedImpact: '+18% - 25% Increase in AOV',
    whyCrucial: 'A customer is in their highest state of trust immediately after completing an order. Presenting a complementary 1-click upsell before the confirmation page increases Average Order Value with zero ad cost.',
    actionSteps: [
      'Identify top cross-sell product or service add-on with 60%+ gross margin',
      'Implement true 1-click post-purchase checkout (no re-entering credit card details)',
      'Add a countdown timer (e.g. "Exclusive offer valid for next 5 minutes only")'
    ],
    source: 'checklist'
  }
];

export const INITIAL_CRO_FILES: CroUploadedFile[] = [
  {
    id: 'file-1',
    fileName: 'ga4-funnel-dropoff-report-august.csv',
    fileSize: '412 KB',
    fileType: 'text/csv',
    uploadedAt: 'Today, 09:15 AM',
    fileCategory: 'analytics_csv',
    findingsCount: 4,
    extractedFindings: [
      {
        issue: 'Severe Mobile Cart Abandonment (82.4%)',
        frictionType: 'Checkout Drop-off',
        impact: 'Critical',
        suggestedFix: 'Implement 1-click Express Checkout (Apple Pay/Shop Pay) and remove mandatory address fields before payment.'
      },
      {
        issue: 'Product Page to Cart Transition Failure (only 3.1% add-to-cart)',
        frictionType: 'Above-the-Fold UX',
        impact: 'High',
        suggestedFix: 'Make Add-to-Cart button persistent via sticky bottom bar on mobile and display shipping estimate upfront.'
      },
      {
        issue: 'Desktop vs Mobile Conversion Gap (2.8% Desktop vs 0.9% Mobile)',
        frictionType: 'Device Parity',
        impact: 'High',
        suggestedFix: 'Re-architect mobile tap targets, reduce hero text density, and eliminate popup overlays.'
      },
      {
        issue: 'Lead Generation Form Abandonment at Step 2',
        frictionType: 'Form Bloat',
        impact: 'Medium',
        suggestedFix: 'Split 8-field form into a 2-step micro-commitment quiz format.'
      }
    ]
  },
  {
    id: 'file-2',
    fileName: 'mobile-landing-page-heatmap.png',
    fileSize: '2.4 MB',
    fileType: 'image/png',
    uploadedAt: 'Yesterday, 04:30 PM',
    fileCategory: 'heatmap_export',
    findingsCount: 3,
    extractedFindings: [
      {
        issue: 'Primary Call-to-Action Pushed Below 700px Viewport',
        frictionType: 'Visual Hierarchy',
        impact: 'Critical',
        suggestedFix: 'Elevate CTA into the initial 500px mobile viewport so users see the action button without scrolling.'
      },
      {
        issue: 'Dead Clicks on Non-Clickable Guarantee Badges',
        frictionType: 'User Expectation Mismatch',
        impact: 'Medium',
        suggestedFix: 'Convert security and guarantee icons into clickable tooltips that reassure skeptical buyers.'
      },
      {
        issue: 'Users Bouncing at Review Carousel Due to Auto-Rotate',
        frictionType: 'Interaction Friction',
        impact: 'Medium',
        suggestedFix: 'Disable carousel auto-rotation and replace with high-contrast static quote grid.'
      }
    ]
  }
];
