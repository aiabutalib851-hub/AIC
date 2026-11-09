import React from 'react';
import {
  Compass,
  Award,
  Megaphone,
  Layers,
  Users,
  Target,
  Bot,
  GitBranch,
  Receipt,
  Sparkles
} from 'lucide-react';
import { DashboardTab } from '../types';
import { AgencyFaqItem, FaqTopic } from '../data/agencyFaqs';

export type HelpCategory =
  | 'getting_started'
  | 'faq'
  | 'meta_ads_cro'
  | 'billing_finance'
  | 'ai_fleet'
  | 'security'
  | 'support';

export interface TabHelpContext {
  tab: DashboardTab;
  name: string;
  nameBn: string;
  icon: React.ElementType;
  primaryCategory: HelpCategory;
  faqTopic: FaqTopic;
  autoTags: string[];
  description: string;
  descriptionBn: string;
  quickActionLabel: string;
  quickActionLabelBn: string;
}

export const TAB_HELP_CONTEXTS: Record<DashboardTab, TabHelpContext> = {
  services: {
    tab: 'services',
    name: 'Strategic Services & Agentic AI',
    nameBn: 'স্ট্র্যাটেজিক সার্ভিস ও এজেন্টিক এআই',
    icon: Compass,
    primaryCategory: 'getting_started',
    faqTopic: 'all',
    autoTags: ['Services', 'Agentic AI', 'Autonomous', 'Growth Journey', 'Roadmap', 'Consulting'],
    description: 'Auto-detected context: Major Service: Agentic AI Autonomous Systems and 7-stage client growth journey.',
    descriptionBn: 'স্বয়ংক্রিয়ভাবে সনাক্তকৃত পেজ: প্রধান সার্ভিস: এজেন্টিক এআই স্বায়ত্তশাসিত সিস্টেম এবং ৭-ধাপের ক্লায়েন্ট গ্রোথ জার্নি।',
    quickActionLabel: 'Open Services & Agentic AI Guide',
    quickActionLabelBn: 'সার্ভিস ও এজেন্টিক এআই গাইড দেখুন'
  },
  blueprint: {
    tab: 'blueprint',
    name: 'Meta Ads Blueprint',
    nameBn: 'মেটা অ্যাডস ব্লুপ্রিন্ট',
    icon: Megaphone,
    primaryCategory: 'meta_ads_cro',
    faqTopic: 'campaigns',
    autoTags: ['Meta Ads', 'Andromeda', 'Media Buying', 'ROAS', 'CAPI', 'Tracking', 'Pixel', 'Server-Side'],
    description: 'Auto-detected context: 22-Phase Andromeda ad architecture, CAPI deduplication, and Dynamic Creative Testing.',
    descriptionBn: 'স্বয়ংক্রিয়ভাবে সনাক্তকৃত পেজ: ২২-ধাপের মেটা অ্যান্ড্রমিডা আর্কিটেকচার, সিএপিআই ট্র্যাকিং ও ক্রিয়েটিভ স্কেলিং।',
    quickActionLabel: 'Open Meta Ads Guide',
    quickActionLabelBn: 'মেটা অ্যাডস গাইড দেখুন'
  },
  cro: {
    tab: 'cro',
    name: 'CRO & Funnel Audits',
    nameBn: 'সিআরও ও ফানেল অডিট',
    icon: Target,
    primaryCategory: 'meta_ads_cro',
    faqTopic: 'cro',
    autoTags: ['CRO', 'Funnel Audits', 'Conversion Rate', 'Checkout', 'LTV', 'AOV', 'Heuristics'],
    description: 'Auto-detected context: Conversion rate optimization, funnel leak diagnostics, checkout friction, and revenue multipliers.',
    descriptionBn: 'স্বয়ংক্রিয়ভাবে সনাক্তকৃত পেজ: কনভার্সন রেট অপটিমাইজেশন, ফানেল ড্রপ সমাধান ও রেভিনিউ সিমুলেশন।',
    quickActionLabel: 'Open CRO & Funnel Guide',
    quickActionLabelBn: 'সিআরও ও ফানেল গাইড দেখুন'
  },
  fleet: {
    tab: 'fleet',
    name: 'AI Fleet Operations',
    nameBn: 'এআই বহর অপারেশন',
    icon: Bot,
    primaryCategory: 'ai_fleet',
    faqTopic: 'agents',
    autoTags: ['AI Agents', 'LLM', 'Gemini', 'Webhooks', 'Telemetry', 'Automation'],
    description: 'Auto-detected context: Autonomous agent deployment, token usage limits, latency monitoring, and client assignments.',
    descriptionBn: 'স্বয়ংক্রিয়ভাবে সনাক্তকৃত পেজ: স্বায়ত্তশাসিত এআই এজেন্ট ডিপ্লয়মেন্ট, টোকেন লিমিট ও ওয়েবহুক মনিটরিং।',
    quickActionLabel: 'Open AI Fleet Guide',
    quickActionLabelBn: 'এআই ফ্লিট গাইড দেখুন'
  },
  copilot: {
    tab: 'copilot',
    name: 'AI Strategy Copilot',
    nameBn: 'এআই কোপাইলট স্ট্র্যাটেজি',
    icon: Sparkles,
    primaryCategory: 'ai_fleet',
    faqTopic: 'copilot',
    autoTags: ['AI Copilot', 'Proposals', 'Roadmaps', 'Strategy', 'Audits', 'Budgeting'],
    description: 'Auto-detected context: Executive proposal generation, multichannel marketing roadmaps, and dynamic growth budgets.',
    descriptionBn: 'স্বয়ংক্রিয়ভাবে সনাক্তকৃত পেজ: এআই কোপাইলট প্রপোজাল তৈরি, গ্রোথ রোডম্যাপ ও বাজেট বণ্টন।',
    quickActionLabel: 'Open AI Copilot Guide',
    quickActionLabelBn: 'এআই কোপাইলট গাইড দেখুন'
  },
  clients: {
    tab: 'clients',
    name: 'Client Portals & CRM',
    nameBn: 'ক্লায়েন্ট পোর্টাল ও সিআরএম',
    icon: Users,
    primaryCategory: 'getting_started',
    faqTopic: 'clients',
    autoTags: ['Portals', 'Multi-Tenancy', 'SLA', 'Client CRM', 'Retainers', 'Tenant Isolation'],
    description: 'Auto-detected context: Multi-tenant client portals, SLA retainers, account switching, and preview isolation.',
    descriptionBn: 'স্বয়ংক্রিয়ভাবে সনাক্তকৃত পেজ: মাল্টি-টেন্যান্ট ক্লায়েন্ট পোর্টাল, এসএলএ রিটেইনার ও অ্যাকাউন্ট সুইচিং।',
    quickActionLabel: 'Open Client CRM Guide',
    quickActionLabelBn: 'ক্লায়েন্ট সিআরএম গাইড দেখুন'
  },
  pipeline: {
    tab: 'pipeline',
    name: 'Project Pipeline',
    nameBn: 'প্রজেক্ট পাইপলাইন',
    icon: GitBranch,
    primaryCategory: 'getting_started',
    faqTopic: 'clients',
    autoTags: ['Pipeline', 'Deliverables', 'Milestones', 'SLA', 'Client CRM', 'Sprint'],
    description: 'Auto-detected context: Kanban sprint deliverable workflows, due dates, assignee management, and SLA tracking.',
    descriptionBn: 'স্বয়ংক্রিয়ভাবে সনাক্তকৃত পেজ: কানবান স্প্রিন্ট, প্রজেক্ট ডেলিভারেবল অগ্রগতি ও এসএলএ ট্র্যাকিং।',
    quickActionLabel: 'Open Pipeline Guide',
    quickActionLabelBn: 'পাইপলাইন গাইড দেখুন'
  },
  founder: {
    tab: 'founder',
    name: 'Founder Profile & Desk',
    nameBn: 'ফাউন্ডার প্রোফাইল ও ডেস্ক',
    icon: Award,
    primaryCategory: 'support',
    faqTopic: 'shortcuts',
    autoTags: ['Founder', 'Abu Talib', 'Consultation', 'Portfolio', 'Abrar Academy', 'Director'],
    description: 'Auto-detected context: Director Abu Talib credentials, live portfolio links, masterclasses, and consultation bookings.',
    descriptionBn: 'স্বয়ংক্রিয়ভাবে সনাক্তকৃত পেজ: পরিচালক আবু তালেবের অভিজ্ঞতা, লাইভ পোর্টফোলিও ও কনসালটেশন বুকিং।',
    quickActionLabel: 'Open Founder & Support Guide',
    quickActionLabelBn: 'ফাউন্ডার ও সাপোর্ট গাইড দেখুন'
  }
};

export interface AutoTaggedFaqResult {
  faq: AgencyFaqItem;
  score: number;
  matchedTags: string[];
  isDirectTabMatch: boolean;
}

/**
 * Evaluates and ranks FAQs based on the active tab context.
 */
export function getSuggestedFaqsForTab(
  tab: DashboardTab = 'services',
  allFaqs: AgencyFaqItem[] = []
): {
  tabContext: TabHelpContext;
  suggestedResults: AutoTaggedFaqResult[];
  autoTags: string[];
} {
  const tabContext = TAB_HELP_CONTEXTS[tab] || TAB_HELP_CONTEXTS.services;
  const contextTagsLower = tabContext.autoTags.map((t) => t.toLowerCase());

  const scoredList: AutoTaggedFaqResult[] = allFaqs.map((faq) => {
    let score = 0;
    const matchedTags: string[] = [];

    // Direct tabTarget match is highest priority
    const isDirectTabMatch = faq.tabTarget === tab;
    if (isDirectTabMatch) {
      score += 120;
    }

    // Matching topic
    if (tabContext.faqTopic !== 'all' && faq.topic === tabContext.faqTopic) {
      score += 45;
    }

    // Tag intersection
    faq.tags.forEach((tag) => {
      const tagLower = tag.toLowerCase();
      if (contextTagsLower.some((ct) => ct === tagLower || ct.includes(tagLower) || tagLower.includes(ct))) {
        score += 30;
        if (!matchedTags.includes(tag)) {
          matchedTags.push(tag);
        }
      }
    });

    // Question or keypoints keyword match
    const qLower = faq.question.toLowerCase();
    const ansLower = faq.answer.toLowerCase();
    const tabNameWords = tabContext.name.toLowerCase().split(/[\s&]+/);
    
    tabNameWords.forEach((word) => {
      if (word.length > 2) {
        if (qLower.includes(word)) score += 20;
        if (ansLower.includes(word)) score += 10;
      }
    });

    return {
      faq,
      score,
      matchedTags,
      isDirectTabMatch
    };
  });

  // Filter items with relevant positive score, sort by score descending
  const relevantList = scoredList
    .filter((item) => item.score > 25)
    .sort((a, b) => b.score - a.score);

  return {
    tabContext,
    suggestedResults: relevantList,
    autoTags: tabContext.autoTags
  };
}
