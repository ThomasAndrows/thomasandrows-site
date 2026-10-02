export const FIELD_NOTES = [
  {
    id: 'brightonseo',
    img: '/images/brightonseo-2018.webp',
    pos: 'center',
    alt: 'Thomas Androws relaxing in a giant brightonSEO deckchair in front of the main stage at brightonSEO 2018',
    meta: 'Brighton, UK / 2018',
    title: 'brightonSEO',
    short: 'A day of technical SEO and search marketing talks at one of the biggest search conferences.',
    long: 'brightonSEO in Brighton, UK is one of the largest search marketing conferences in Europe. I attended in 2018 and came home with a long list of technical SEO and measurement ideas, and a lasting habit of treating search data and analytics data as one story.',
    width: 749, height: 999,
  },
  {
    id: 'krista-seiden',
    img: '/images/krista-seiden-2025.webp',
    pos: 'center top',
    alt: 'Thomas Androws with Krista Seiden, former Google Analytics evangelist, in California in 2025',
    meta: 'California, US / 2025',
    title: 'Krista Seiden',
    short: 'Meeting the former Google Analytics evangelist and founder of KS Digital, whose GA4 courses taught many of us the tool.',
    long: 'Krista Seiden was a Google Analytics evangelist for years and now runs KS Digital, where she teaches Google Analytics 4. Meeting her in California in 2025 was a highlight, because her teaching shaped how a lot of analysts, me included, think about GA4.',
    width: 801, height: 999,
  },
  {
    id: 'oscar-piastri',
    img: '/images/oscar-piastri-mclaren-freshworks-2025.webp',
    pos: 'center top',
    alt: 'Thomas Androws with McLaren F1 driver Oscar Piastri in front of a McLaren and Freshworks partner backdrop',
    meta: 'Freshworks x McLaren / 2025',
    title: 'Oscar Piastri',
    short: "Meeting McLaren's Oscar Piastri, who finished third in the 2025 Drivers' Championship.",
    long: "Freshworks partners with the McLaren Formula 1 team, and in 2025 I got to meet McLaren driver Oscar Piastri, who finished third in the 2025 Drivers' Championship. Motorsport is a measurement sport too: every decision is backed by data.",
    width: 1160, height: 1355,
  },
  {
    id: 'google-search-chennai',
    img: '/images/google-search-conference-chennai.webp',
    pos: '55% center',
    alt: 'Thomas Androws seated at a Google Search conference in Chennai',
    meta: 'Chennai, India / 2015',
    title: 'Google Search conference',
    short: "Learning straight from Google's Search team, close to home.",
    long: "A Google Search conference in my home city of Chennai in 2015, where I learned straight from Google's Search team. It was an early lesson in how search works under the hood, and it still shapes how I read Search Console data.",
    width: 1332, height: 999,
  },
];

export const COMING_SOON = [
  { chip: 'AEO', title: 'How to measure AI search visibility with GA4 and Search Console', blurb: 'What you can track today, and what you cannot yet.' },
];

export const EXPERTISE = [
  { id: 'ga4', title: 'GA4 implementation and audits', blurb: 'Event design, key events, consent-aware setup and audits that find what is quietly broken.', detail: 'I design the measurement plan first, then the events, parameters and key events that serve it. Audits cover data layer quality, consent behavior, duplicate and missing events, attribution settings and BigQuery export health.', points: ['Measurement plan and event taxonomy', 'Consent Mode v2 aware configuration', 'Custom dimensions, key events and audiences', 'Audit of existing GA4 properties'] },
  { id: 'gtm', title: 'Server-side GTM', blurb: 'First-party data collection with more control over what is sent, to whom, and when.', detail: 'Server-side tagging moves part of your measurement to infrastructure you control. It can improve data quality and governance, but it adds cost and complexity, so I help teams decide whether it is worth it before they build it.', points: ['Web and server container architecture', 'First-party collection and tag clean-up', 'Cost and benefit assessment', 'Migration without losing history'] },
  { id: 'bigquery', title: 'BigQuery and data modeling', blurb: 'GA4 exports shaped into clean, documented tables for analysts and dashboards.', detail: 'The raw GA4 export is powerful but awkward. I turn it into sessionized, documented tables that analysts and dashboards can trust, with definitions anyone can check.', points: ['GA4 export setup and monitoring', 'Sessions, events and user models in SQL', 'Joins with CRM and enrichment data', 'Cost-aware query design'] },
  { id: 'looker-studio', title: 'Looker Studio reporting', blurb: 'Dashboards that answer a question each, with definitions anyone can check.', detail: 'A dashboard should answer a decision, not display every metric. I build Looker Studio reports around the questions teams ask, with documented calculated fields and clean sources.', points: ['Decision-first dashboard design', 'Documented calculated fields', 'BigQuery-backed, fast reports', 'Stakeholder-ready layouts'] },
  { id: 'search-aeo', title: 'Search and AEO analytics', blurb: 'Search Console insight and AI visibility measurement for brand and web teams.', detail: 'Search is now split between classic results and answer engines. I measure both: Search Console for Google, and GA4 plus referral analysis for traffic from AI assistants.', points: ['Search Console analysis and reporting', 'AI referral traffic tracking in GA4', 'Structured data and answer-first content', 'Brand and web team reporting'] },
  { id: 'ai-analytics', title: 'AI-assisted analytics', blurb: 'Using Vertex AI and LLMs to speed up analysis without losing the audit trail.', detail: 'I use Vertex AI and large language models to speed up analysis, QA and documentation, while keeping every number traceable back to the data that produced it.', points: ['LLM-assisted QA and documentation', 'Vertex AI workflows on BigQuery data', 'Guardrails and audit trails', 'Practical use cases, not demos'] },
];
