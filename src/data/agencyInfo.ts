export interface AgencyContactInfo {
  name: string;
  fullName: string;
  shortName: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  whatsappUrl: string;
  whatsappDisplay: string;
  email: string;
  portalUrl: string;
  portalDisplay: string;
  websiteUrl: string;
  websiteDisplay: string;
  facebookUrl: string;
  facebookDisplay: string;
  director: string;
  founderTitle: string;
  founderPortfolioUrl: string;
  founderPortfolioDisplay: string;
  founderGithubUrl: string;
  founderGithubDisplay: string;
  founderLocation: string;
  founderAcademyUrl: string;
  founderAcademyDisplay: string;
  founderBio: string;
  tagline: string;
  metaAdsTitle: string;
  agenticAiTitle: string;
  founderAgenticExpertise: {
    badge: string;
    statement: string;
    coreFrameworks: string[];
    portfolioUrl: string;
  };
  founderSpecialties: string[];
  founderAchievements: { metric: string; label: string }[];
  founderPortfolioProjects: {
    id: string;
    title: string;
    category: string;
    description: string;
    techStack: string[];
    metrics: string;
    url: string;
    urlLabel: string;
  }[];
}

export const AIC_AGENCY_INFO: AgencyContactInfo = {
  name: 'Abrar IT Care - AIC',
  fullName: 'Abrar IT Care',
  shortName: 'AIC',
  phone: '01321990066',
  phoneRaw: '+8801321990066',
  whatsapp: '01321990066',
  whatsappRaw: '+8801321990066',
  whatsappUrl: 'https://wa.me/8801321990066',
  whatsappDisplay: '01321990066 (WhatsApp)',
  email: 'abraritcare@gmail.com',
  portalUrl: 'https://www.abrar.academy/AbrarITCare-AIC',
  portalDisplay: 'www.abrar.academy/AbrarITCare-AIC',
  websiteUrl: 'https://www.abrar.academy',
  websiteDisplay: 'www.abrar.academy',
  facebookUrl: 'https://www.facebook.com/AbrarITCare/',
  facebookDisplay: 'facebook.com/AbrarITCare',
  director: 'Abu Talib',
  founderTitle: 'Founder, Principal Agentic AI Solutions Architect & Digital Growth Strategist',
  founderPortfolioUrl: 'https://abu-talib.netlify.app/',
  founderPortfolioDisplay: 'abu-talib.netlify.app',
  founderGithubUrl: 'https://github.com/HelloTalib',
  founderGithubDisplay: 'github.com/HelloTalib',
  founderLocation: 'Bogura, Bangladesh',
  founderAcademyUrl: 'https://www.abrar.academy/abu-talib',
  founderAcademyDisplay: 'abrar.academy/abu-talib',
  founderBio: 'Abu Talib is the visionary founder of Abrar IT Care (AIC) and Abrar Academy. An industry-recognized Expert in Agentic AI and autonomous multi-agent orchestration, he is a system-driven digital consultant, AI automation architect, and performance marketing growth strategist dedicated to engineering scalable, ethical, and highly profitable digital infrastructures for enterprises and growing businesses.',
  tagline: 'Agentic AI Consulting, Performance Marketing & Enterprise Automation',
  metaAdsTitle: 'New Product Meta Ads Success Blueprint',
  agenticAiTitle: 'Agentic AI & Autonomous Multi-Agent Systems',
  founderAgenticExpertise: {
    badge: 'Expert in Agentic AI',
    statement: 'Abu Talib specializes in cutting-edge Agentic AI: autonomous multi-agent orchestration, tool-calling pipelines, self-healing workflows, and enterprise RAG deployments.',
    coreFrameworks: ['CrewAI', 'LangGraph', 'AutoGen', 'Function Calling', 'RAG Pipelines', 'Vector Databases', 'Google GenAI SDK'],
    portfolioUrl: 'https://abu-talib.netlify.app/'
  },
  founderSpecialties: [
    'Agentic AI Architecture & Autonomous Multi-Agent Fleets (Expert)',
    'Enterprise Retrieval-Augmented Generation (RAG) & Vector Systems',
    'Meta Andromeda Performance Marketing & Ad Algorithms',
    'Conversion Rate Optimization (CRO) & Funnel Engineering',
    'Enterprise ERP/CRM Webhook Automations & Telemetry',
    'Ethical, System-Driven Digital Growth Consulting',
    'Full-Stack Modern Web & SaaS Architecture'
  ],
  founderAchievements: [
    { metric: '50+', label: 'Enterprise Growth Architectures' },
    { metric: '$2.4M+', label: 'Client Revenue Managed & Scaled' },
    { metric: '22-Phase', label: 'Proprietary Meta Ads Engine' },
    { metric: '99.9%', label: 'Automation Fleet Reliability' }
  ],
  founderPortfolioProjects: [
    {
      id: 'net-portfolio',
      title: 'Official Interactive Developer & Architect Portfolio',
      category: 'Flagship Web Portfolio',
      description: 'The personal web showcase of Abu Talib, detailing his software engineering career, client projects, design philosophies, and development expertise.',
      techStack: ['Netlify CI/CD', 'React', 'JavaScript/TypeScript', 'Modern CSS3', 'Responsive Design'],
      metrics: 'Live Production on Netlify',
      url: 'https://abu-talib.netlify.app/',
      urlLabel: 'abu-talib.netlify.app'
    },
    {
      id: 'meta-andromeda',
      title: 'Meta Andromeda 22-Phase Ad Scaling Engine',
      category: 'Performance Growth Architecture',
      description: 'Proprietary campaign launch framework tailored for Meta Andromeda AI ad delivery, automating budget shifts, creative testing, and ROAS stabilization.',
      techStack: ['Meta Graph API', 'Pixel Conversions API (CAPI)', 'Targeting Telemetry', 'Python Webhooks'],
      metrics: 'Managed $2.4M+ in ad spend with 3.8x+ ROAS',
      url: 'https://abu-talib.netlify.app/',
      urlLabel: 'View in Portfolio'
    },
    {
      id: 'agent-fleet',
      title: 'Autonomous Multi-Agent Enterprise Fleet',
      category: 'AI Infrastructure & RAG',
      description: 'Enterprise AI agent architecture equipped with RAG pipelines, webhook triggers, CRM lead enrichment, and zero-hallucination guardrails.',
      techStack: ['Google GenAI SDK', 'TypeScript', 'Vector Embeddings', 'Node.js Microservices'],
      metrics: '99.9% Uptime with sub-second response times',
      url: 'https://abu-talib.netlify.app/',
      urlLabel: 'View in Portfolio'
    },
    {
      id: 'cro-funnel',
      title: 'High-Ticket CRO & Funnel Architecture System',
      category: 'Conversion Optimization',
      description: 'Data-driven funnel engineering analyzing friction points, page load speeds, checkout micro-interactions, and conversion drop-offs.',
      techStack: ['Heatmap Telemetry', 'Google Tag Manager', 'GA4 Measurement Protocol', 'Performance Auditing'],
      metrics: '+34% Average Conversion Rate Lift',
      url: 'https://abu-talib.netlify.app/',
      urlLabel: 'View in Portfolio'
    },
    {
      id: 'abrar-academy',
      title: 'Abrar Academy Digital Educational Ecosystem',
      category: 'EdTech & Leadership',
      description: 'Comprehensive digital learning platform empowering students and professionals in AI strategy, digital skills, and ethical technology entrepreneurship.',
      techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Media CDN', 'Stripe/bKash Gateways'],
      metrics: 'Thousands of learners reached across Bangladesh',
      url: 'https://www.abrar.academy/abu-talib',
      urlLabel: 'abrar.academy/abu-talib'
    },
    {
      id: 'sigmative-collab',
      title: 'Enterprise Software & UI Engineering Systems',
      category: 'Software Engineering',
      description: 'Full-cycle enterprise software development, component design systems, and frontend architectural engineering at SigmaTive LLC.',
      techStack: ['React', 'TypeScript', 'UIkit', 'RESTful Microservices', 'Git Workflows'],
      metrics: 'Production software deployed to international clients',
      url: 'https://github.com/HelloTalib',
      urlLabel: 'github.com/HelloTalib'
    }
  ]
};
