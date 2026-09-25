import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  formatNumber: (num: number | string) => string;
  isBangla: boolean;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Top Navigation Tabs
    'nav.overview': 'Overview',
    'nav.overview.desc': 'Executive dashboard & real-time operational telemetry',
    'nav.services': 'Service Catalog',
    'nav.services.desc': '7-Stage client growth journey & consulting offerings',
    'nav.blueprint': 'Meta Ads Blueprint',
    'nav.blueprint.desc': '22-Phase Andromeda campaign launch & scaling system',
    'nav.cro': 'CRO & Growth Audit',
    'nav.cro.desc': 'Conversion rate optimization, funnels & unit economics',
    'nav.billing': 'Billing & Invoices',
    'nav.billing.desc': 'Accounts receivable, retainers & payment tracking',
    'nav.clients': 'Clients & Retainers',
    'nav.clients.desc': 'Client portfolio, account health & retainer stages',
    'nav.fleet': 'AI Agent Fleet',
    'nav.fleet.desc': 'Autonomous agents, webhook monitors & uptime',
    'nav.pipeline': 'Project Pipeline',
    'nav.pipeline.desc': 'Active sprint milestones, staging & deliverables',
    'nav.founder': 'Founder Portfolio',
    'nav.founder.desc': 'Abu Talib biography, credentials & WhatsApp hotline',
    'nav.copilot': 'AIC Copilot',
    'nav.copilot.desc': 'AI strategy assistant, proposal generator & audit synthesizer',

    // Header & Actions
    'header.search.placeholder': 'Search clients, agents, blueprints, invoices...',
    'header.recentSearches': 'Recent Searches',
    'header.clearRecent': 'Clear all',
    'header.contactUs': 'Contact Us',
    'header.newClient': '+ New Client',
    'header.deployAgent': 'Deploy Agent',
    'header.clientPortal': 'Client Portal View',
    'header.topicPermissions': 'Topic Permissions',
    'header.superAdmin': 'Super Admin',
    'header.topicsActive': 'Topics Active',
    'header.login': 'Sign In',
    'header.logout': 'Sign Out',
    'header.official': 'OFFICIAL',

    // Billing & Treasury
    'billing.title': 'Financial Management, Multi-Entity & Billing Customization',
    'billing.subtitle': 'Consolidated treasury across multiple operating businesses, bank accounts, custom income/expense categories & inventory',
    'billing.customize': 'Customize Billing & Businesses',
    'billing.recordIncome': '+ Record Income',
    'billing.recordExpense': '- Record Expense',
    'billing.addProduct': '+ Add Product',
    'billing.newInvoice': 'New Invoice',
    'billing.tab.invoices': 'Retainer Invoices',
    'billing.tab.incomeExpense': 'Income & Expense',
    'billing.tab.accounts': 'Multiple Accounts & Businesses',
    'billing.tab.inventory': 'Product Inventory',
    'billing.settledInvoices': 'Settled Invoices (This Cycle)',
    'billing.pendingReceivables': 'Pending Receivables',
    'billing.configuredBusinesses': 'Configured Businesses',
    'billing.categoriesDefaults': 'Categories & Defaults',
    'billing.manageBusinesses': 'Manage Business Names',
    'billing.manageCategories': 'Manage Custom Categories',
    'billing.allBusinesses': 'All Businesses',
    'billing.allServiceTiers': 'All Service Tiers',
    'billing.exportCsv': 'Export CSV',
    'billing.exportAdvanced': 'Export...',
    'billing.printInvoice': 'Print Invoice',
    'billing.markPaid': 'Mark Paid',
    'billing.issueInvoice': 'Issue Invoice',
    'billing.transferFunds': 'Transfer Funds',
    'billing.addBalance': 'Add Balance',
    'billing.totalLiquidCapital': 'Total Liquid Capital Across Accounts',
    'billing.connectedBusinesses': 'Connected Business Entities',
    'billing.fastInterAccount': 'Fast Inter-Account Treasury',

    // Statuses
    'status.all': 'All',
    'status.paid': 'Paid',
    'status.pending': 'Pending',
    'status.cleared': 'Cleared',
    'status.active': 'Active',
    'status.in_stock': 'In Stock',
    'status.low_stock': 'Low Stock',
    'status.out_of_stock': 'Out of Stock',

    // Footer
    'footer.official': 'OFFICIAL',
    'footer.directedBy': 'Directed by',
    'footer.scanToConnect': 'Scan to Connect',
    'footer.whatsAppDirect': 'WhatsApp Direct',
    'footer.copyLink': 'Copy Link',
    'footer.linkCopied': 'Copied!',
    'footer.hideContact': 'Hide contact channels',
    'footer.showContact': 'Show contact channels',
    'footer.location': 'Dhaka, Bangladesh',
    'footer.helpCenter': 'Help Center',
    'toast.whatsappCopied.title': 'WhatsApp Link Copied',
    'toast.whatsappCopied.desc': 'Connection link copied to clipboard. Ready to share!',
    'help.title': 'AIC Dashboard Help Center & User Guide',
    'help.subtitle': 'Comprehensive educational guide for navigating and utilizing the agency operations hub',

    // Language Toggle
    'lang.english': 'English',
    'lang.bangla': 'বাংলা',
    'lang.switch': 'Language'
  },
  bn: {
    // Top Navigation Tabs
    'nav.overview': 'ড্যাশবোর্ড',
    'nav.overview.desc': 'মূল নির্বাহী ড্যাশবোর্ড ও রিয়েল-টাইম অপারেশনাল তথ্য',
    'nav.services': 'সার্ভিস ক্যাটালগ',
    'nav.services.desc': '৭-ধাপের ক্লায়েন্ট গ্রোথ জার্নি ও কনসাল্টিং সার্ভিস',
    'nav.blueprint': 'মেটা অ্যাডস ব্লুপ্রিন্ট',
    'nav.blueprint.desc': '২২-পর্যায়ের অ্যান্ড্রোমিডা ক্যাম্পেইন লঞ্চ ও স্কেলিং সিস্টেম',
    'nav.cro': 'সিআরও ও গ্রোথ অডিট',
    'nav.cro.desc': 'কনভার্শন রেট অপ্টিমাইজেশন, ফানেল ও ইউনিট ইকোনমিক্স',
    'nav.billing': 'বিলিং ও ফাইন্যান্স',
    'nav.billing.desc': 'মাল্টি-বিজনেস ট্রেজারি, ইনভয়েস ও পেমেন্ট ট্র্যাকিং',
    'nav.clients': 'ক্লায়েন্ট ও রিটেইনার',
    'nav.clients.desc': 'ক্লায়েন্ট পোর্টফোলিও, হেলথ স্কোর ও রিটেইনার স্টেজ',
    'nav.fleet': 'এআই এজেন্ট বহর',
    'nav.fleet.desc': 'স্বয়ংক্রিয় এআই এজেন্টস, ওয়েবহুক মনিটর ও আপটাইম',
    'nav.pipeline': 'প্রজেক্ট পাইপলাইন',
    'nav.pipeline.desc': 'সক্রিয় স্প্রিন্ট মাইলস্টোন, স্টেজিং ও ডেলিভারেবলস',
    'nav.founder': 'প্রতিষ্ঠাতা প্রোফাইল',
    'nav.founder.desc': 'আবু তালিবের জীবনবৃত্তান্ত, সনদ ও সরাসরি যোগাযোগ',
    'nav.copilot': 'এআই কোপাইলট',
    'nav.copilot.desc': 'এআই স্ট্র্যাটেজি সহকারী, প্রপোজাল তৈরি ও অডিট বিশ্লেষক',

    // Header & Actions
    'header.search.placeholder': 'ক্লায়েন্ট, এজেন্ট, ব্লুপ্রিন্ট বা ইনভয়েস খুঁজুন...',
    'header.recentSearches': 'সাম্প্রতিক অনুসন্ধান',
    'header.clearRecent': 'সব মুছুন',
    'header.contactUs': 'যোগাযোগ করুন',
    'header.newClient': '+ নতুন ক্লায়েন্ট',
    'header.deployAgent': 'এজেন্ট তৈরি',
    'header.clientPortal': 'ক্লায়েন্ট পোর্টাল ভিউ',
    'header.topicPermissions': 'টপিক পারমিশন',
    'header.superAdmin': 'সুপার অ্যাডমিন',
    'header.topicsActive': 'টি টপিক সচল',
    'header.login': 'লগইন করুন',
    'header.logout': 'লগআউট',
    'header.official': 'অফিশিয়াল',

    // Billing & Treasury
    'billing.title': 'ফাইন্যান্সিয়াল ম্যানেজমেন্ট, মাল্টি-বিজনেস ও বিলিং কাস্টমাইজেশন',
    'billing.subtitle': 'একাধিক ব্যবসা প্রতিষ্ঠান, ব্যাংক একাউন্ট, কাস্টম আয়/ব্যয় ক্যাটাগরি এবং ইনভেন্টরি ট্রেজারি নিয়ন্ত্রণ',
    'billing.customize': 'বিলিং ও ব্যবসা কাস্টমাইজ',
    'billing.recordIncome': '+ আয় যোগ করুন',
    'billing.recordExpense': '- ব্যয় রেকর্ড করুন',
    'billing.addProduct': '+ পণ্য যোগ করুন',
    'billing.newInvoice': 'নতুন ইনভয়েস',
    'billing.tab.invoices': 'রিটেইনার ইনভয়েস',
    'billing.tab.incomeExpense': 'আয় ও ব্যয়',
    'billing.tab.accounts': 'একাধিক একাউন্ট ও ব্যবসা',
    'billing.tab.inventory': 'পণ্য ইনভেন্টরি',
    'billing.settledInvoices': 'পরিশোধিত ইনভয়েস (চলতি সাইকেল)',
    'billing.pendingReceivables': 'বকেয়া পাওনা',
    'billing.configuredBusinesses': 'নিবন্ধিত ব্যবসা প্রতিষ্ঠান',
    'billing.categoriesDefaults': 'ক্যাটাগরি ও ডিফল্টসমূহ',
    'billing.manageBusinesses': 'ব্যবসার নাম পরিচালনা',
    'billing.manageCategories': 'কাস্টম ক্যাটাগরি পরিচালনা',
    'billing.allBusinesses': 'সকল ব্যবসা প্রতিষ্ঠান',
    'billing.allServiceTiers': 'সকল সার্ভিস টিয়ার',
    'billing.exportCsv': 'সিএসভি এক্সপোর্ট',
    'billing.exportAdvanced': 'এক্সপোর্ট...',
    'billing.printInvoice': 'ইনভয়েস প্রিন্ট',
    'billing.markPaid': 'পরিশোধ চিহ্নিত করুন',
    'billing.issueInvoice': 'ইনভয়েস ইস্যু করুন',
    'billing.transferFunds': 'ফান্ড ট্রান্সফার',
    'billing.addBalance': 'ব্যালেন্স যোগ করুন',
    'billing.totalLiquidCapital': 'একাউন্টে মোট তরল মূলধন',
    'billing.connectedBusinesses': 'সংযুক্ত ব্যবসা প্রতিষ্ঠানসমূহ',
    'billing.fastInterAccount': 'আন্তঃএকাউন্ট দ্রুত ফান্ড ট্রান্সফার',

    // Statuses
    'status.all': 'সকল',
    'status.paid': 'পরিশোধিত',
    'status.pending': 'বকেয়া',
    'status.cleared': 'ক্লিয়ার্ড',
    'status.active': 'সক্রিয়',
    'status.in_stock': 'মজুদ আছে',
    'status.low_stock': 'সীমিত মজুদ',
    'status.out_of_stock': 'মজুদ শেষ',

    // Footer
    'footer.official': 'অফিশিয়াল',
    'footer.directedBy': 'পরিচালনায়',
    'footer.scanToConnect': 'স্ক্যান করে যুক্ত হন',
    'footer.whatsAppDirect': 'হোয়াটসঅ্যাপ সরাসরি',
    'footer.copyLink': 'লিংক কপি করুন',
    'footer.linkCopied': 'কপি সম্পন্ন!',
    'footer.hideContact': 'যোগাযোগের মাধ্যম লুকান',
    'footer.showContact': 'যোগাযোগের মাধ্যম প্রদর্শন করুন',
    'footer.location': 'ঢাকা, বাংলাদেশ',
    'footer.helpCenter': 'সহায়তা কেন্দ্র',
    'toast.whatsappCopied.title': 'হোয়াটসঅ্যাপ লিংক কপি হয়েছে',
    'toast.whatsappCopied.desc': 'ক্লিপবোর্ডে লিংক কপি সম্পন্ন হয়েছে। সরাসরি মেসেজ বা শেয়ার করুন!',
    'help.title': 'এআইসি ড্যাশবোর্ড সহায়তা কেন্দ্র ও ইউজার গাইড',
    'help.subtitle': 'এজেন্সি ড্যাশবোর্ড ব্যবহার ও পরিচালনা সংক্রান্ত বিস্তারিত শিক্ষণীয় নির্দেশিকা',

    // Language Toggle
    'lang.english': 'English',
    'lang.bangla': 'বাংলা',
    'lang.switch': 'ভাষা'
  }
};

const BENGALI_DIGITS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('aic_language') as Language;
      if (saved === 'en' || saved === 'bn') return saved;
    } catch (e) {
      console.error('Failed to load language', e);
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('aic_language', lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.error('Failed to save language', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const formatNumber = (val: number | string): string => {
    const str = String(val);
    if (language !== 'bn') return str;
    return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit] || digit);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        formatNumber,
        isBangla: language === 'bn'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
