import { ClientTier, Client, Invoice } from '../types';

export type TierCategory = 'Enterprise' | 'Growth' | 'Starter' | 'Custom' | 'Standard';

export interface TierTagDefinition {
  category: TierCategory;
  primaryTag: string;
  defaultTags: string[];
  color: {
    bg: string;
    text: string;
    border: string;
  };
}

export const TIER_DEFINITIONS: Record<TierCategory, TierTagDefinition> = {
  Enterprise: {
    category: 'Enterprise',
    primaryTag: 'Enterprise',
    defaultTags: ['Enterprise', 'Priority SLA', 'Dedicated Architect'],
    color: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      border: 'border-indigo-500/20',
    },
  },
  Growth: {
    category: 'Growth',
    primaryTag: 'Growth',
    defaultTags: ['Growth', 'Standard SLA', 'Bi-Weekly Review'],
    color: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
    },
  },
  Starter: {
    category: 'Starter',
    primaryTag: 'Starter',
    defaultTags: ['Starter', 'Standard Support', 'Monthly Check-in'],
    color: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/20',
    },
  },
  Custom: {
    category: 'Custom',
    primaryTag: 'Enterprise',
    defaultTags: ['Enterprise', 'Custom Suite', 'Dedicated Architect', 'White Glove SLA'],
    color: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },
  },
  Standard: {
    category: 'Standard',
    primaryTag: 'Standard Retainer',
    defaultTags: ['Standard Retainer', 'Standard Support'],
    color: {
      bg: 'bg-slate-500/10',
      text: 'text-slate-400',
      border: 'border-slate-500/20',
    },
  },
};

/**
 * Normalizes any client service tier string into a standard tier category
 * (Enterprise, Growth, Starter, Custom, Standard).
 */
export function detectServiceTierCategory(clientTier?: string | null): TierCategory {
  if (!clientTier) return 'Standard';
  const lower = clientTier.toLowerCase().trim();

  if (lower.includes('enterprise')) {
    return 'Enterprise';
  }
  if (lower.includes('growth') || lower.includes('copilot')) {
    return 'Growth';
  }
  if (lower.includes('starter')) {
    return 'Starter';
  }
  if (lower.includes('custom')) {
    return 'Custom';
  }

  return 'Standard';
}

/**
 * Helper function to automatically assign invoice tags based on client service tiers
 * (e.g. Enterprise, Growth, Starter).
 * 
 * @param clientTier The service tier of the client (e.g., 'Enterprise Automation', 'Growth Copilot', 'Starter AI')
 * @param additionalTags Optional user-defined or contextual tags to merge
 * @returns Array of unique tags assigned to the invoice
 */
export function assignInvoiceTags(
  clientTier?: ClientTier | string | null,
  additionalTags: string[] = []
): string[] {
  const category = detectServiceTierCategory(clientTier);
  const tierDef = TIER_DEFINITIONS[category];

  const baseTags = [...tierDef.defaultTags];

  // Merge additional custom tags without duplicates
  const allTags = [...baseTags, ...additionalTags]
    .map(t => t.trim())
    .filter(Boolean);

  return Array.from(new Set(allTags));
}

/**
 * Enriches a new invoice payload with tags and serviceTier derived from client data.
 */
export function assignInvoiceTierMetadata(
  invoiceData: Partial<Invoice>,
  client?: Client | null
): { tags: string[]; serviceTier: ClientTier | undefined } {
  const tier = client?.tier || (invoiceData.serviceTier as ClientTier | undefined);
  const existingTags = invoiceData.tags || [];
  const assignedTags = assignInvoiceTags(tier, existingTags);

  return {
    tags: assignedTags,
    serviceTier: tier,
  };
}

/**
 * Returns color classes for rendering tag badges in UI tables and modals.
 */
export function getInvoiceTagStyle(tag: string): { bg: string; text: string; border: string } {
  const lower = tag.toLowerCase();

  if (lower.includes('enterprise') || lower.includes('architect') || lower.includes('white glove')) {
    return {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-400',
      border: 'border-indigo-500/25',
    };
  }
  if (lower.includes('growth') || lower.includes('copilot') || lower.includes('bi-weekly')) {
    return {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/25',
    };
  }
  if (lower.includes('starter') || lower.includes('check-in')) {
    return {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/25',
    };
  }
  if (lower.includes('custom') || lower.includes('suite')) {
    return {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/25',
    };
  }
  if (lower.includes('sla') || lower.includes('priority')) {
    return {
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/25',
    };
  }

  return {
    bg: 'bg-slate-800/60',
    text: 'text-slate-300',
    border: 'border-slate-700/60',
  };
}
