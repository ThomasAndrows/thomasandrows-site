import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('insights', (p) => !p.data.draft)).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
  return rss({
    title: 'Thomas Androws Insights',
    description: 'Weekly web analytics articles: GA4, GTM, BigQuery, Consent Mode and AI search visibility.',
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.publishDate,
      link: `${SITE.url}/insights/${p.id}`,
      categories: [p.data.category],
      author: `${SITE.email} (${SITE.name})`,
    })),
    customData: '<language>en-us</language>',
  });
}
