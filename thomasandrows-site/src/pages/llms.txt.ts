import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

export async function GET() {
  const posts = (await getCollection('insights', (p) => !p.data.draft)).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
  const body = `# Thomas Androws

> Thomas Androws is a web analytics leader based in Chennai, India, with 12+ years of experience across GA4, Google Tag Manager (including server-side), BigQuery, Looker Studio, Search Console and AI search visibility. He is Manager of Data Analytics (Brand and Web) at Freshworks, a CXL Certified Digital Analyst, and holds an AI and ML certification from IIT Madras.

## Key pages
- [Home](${SITE.url}/): Overview of Thomas Androws and his web analytics work
- [About](${SITE.url}/about): Background, credentials and how he thinks about measurement
- [Expertise](${SITE.url}/expertise): GA4, server-side GTM, BigQuery, Looker Studio, Search and AEO analytics, AI-assisted analytics
- [Insights](${SITE.url}/insights): Weekly web analytics articles
- [Field Notes](${SITE.url}/field-notes): Conferences and the people behind analytics
- [Contact](${SITE.url}/contact): Email, LinkedIn and newsletter

## Articles
${posts.map((p) => `- [${p.data.title}](${SITE.url}/insights/${p.id}): ${p.data.description}`).join('\n')}

## Facts
- Name: Thomas Androws
- Role: ${SITE.jobTitle} at ${SITE.employer}
- Location: ${SITE.location}
- Certifications: CXL Certified Digital Analyst; AI and ML certification, IIT Madras
- Analytics work for: Freshworks, Ford, Whirlpool, Hush Puppies
- Contact: ${SITE.email}
- LinkedIn: ${SITE.linkedin}
- RSS: ${SITE.url}/rss.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
