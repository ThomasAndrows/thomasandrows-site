# www.thomasandrows.com

Astro static site for Cloudflare Pages. One shared Header and one shared Footer, so any edit shows on every page.

## Where to edit things

| What | File |
| --- | --- |
| Menu links | `src/data/site.ts` (NAV) |
| Header | `src/components/Header.astro` |
| Footer | `src/components/Footer.astro` |
| Tool logos and links | `src/data/site.ts` (TOOLS) |
| Email, LinkedIn, site title | `src/data/site.ts` (SITE) |
| Home, About, Expertise, Field Notes, Contact | `src/pages/*.astro` |
| Photos and Field Notes copy | `src/data/fieldnotes.ts` and `public/images/` |
| Colors and effects | `src/styles/design.css`, `src/styles/global.css` |
| Articles | `src/content/insights/` |

## Deploy to Cloudflare Pages (free)

1. Create a GitHub repo, for example `thomasandrows-site`, and push this folder:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/thomasandrows-site.git
   git push -u origin main
   ```
2. Cloudflare dashboard > Workers and Pages > Create > Pages > Connect to Git > pick the repo.
3. Build settings: Framework preset **Astro**, build command `npm run build`, output directory `dist`. Node version 22 (add env var `NODE_VERSION` = `22` if asked).
4. After the first deploy, Pages > your project > Custom domains > add `www.thomasandrows.com` (the domain is already in Cloudflare, so DNS is set up for you). Also add the bare `thomasandrows.com` as a custom domain, then create a Redirect Rule (Rules > Redirect Rules) that sends `thomasandrows.com/*` to `https://www.thomasandrows.com/${1}` with status 301, so everything lives on www.
5. Every push to `main` now redeploys the site automatically.

## Make the contact and newsletter forms work

The forms post to Cloudflare Pages Functions in `functions/api/` and send email with Resend (free tier).

1. Create a free account at resend.com and create an API key.
2. Cloudflare Pages > Settings > Variables and Secrets, add:
   - `RESEND_API_KEY` (secret)
   - `CONTACT_TO` = `thomasandrows@gmail.com` (optional, this is the default)
   - `CONTACT_FROM` = `Website <hello@thomasandrows.com>` (after you verify thomasandrows.com in Resend; until then the default `onboarding@resend.dev` only delivers to your own Resend account email)
3. Optional spam protection: create a Turnstile widget in Cloudflare, then add `PUBLIC_TURNSTILE_SITE_KEY` (variable, used at build time) and `TURNSTILE_SECRET` (secret).
4. Redeploy. Until step 1 and 2 are done the forms show a friendly message asking people to email you directly.

## Analytics

Set `PUBLIC_GTM_ID` (for example `GTM-XXXXXXX`) as a Pages build variable and the GTM snippet is added to every page. Configure your consent banner and the Consent Mode default inside GTM, the same way the first article describes. The forms already push `generate_lead` and `newsletter_signup` events to the data layer.

## Publish a new article every week

1. Write the article with Claude.
2. Save it as `src/content/insights/your-slug.md` (or `.mdx` if it uses diagram components). The file name becomes the URL: `/insights/your-slug`.
3. Start the file with this front matter:
   ```
   ---
   title: "Article title"
   description: "150 to 160 characters for Google and AI answers."
   category: "GA4"
   publishDate: 2026-10-09
   image: "/images/insights/your-slug.png"
   imageAlt: "What the image shows"
   answer: "The two or three sentence direct answer shown at the top."
   keywords: ["keyword one", "keyword two"]
   faqs:
     - q: "Question?"
       a: "Answer."
   ---
   ```
4. Put the featured image (1200 x 630, PNG or JPG) in `public/images/insights/`.
5. Commit and push. Cloudflare publishes it in about a minute. The article, the sitemap, RSS, `llms.txt` and the schema markup all update automatically.
6. Set `draft: true` in the front matter to keep an article unpublished.
7. When you publish the next article, delete the matching "Coming soon" entry in `COMING_SOON` in `src/data/fieldnotes.ts`.

Animated diagrams: copy `src/components/diagrams/VisitorFlow.astro` as a starting point and import it into an `.mdx` article.

## Local preview

```
npm install
npm run dev
```

## SEO and AEO built in

Canonical URLs, Open Graph and Twitter cards, JSON-LD (Person, WebSite, WebPage, ProfilePage, Article, FAQPage, BreadcrumbList, ItemList), sitemap (`/sitemap-index.xml`), `robots.txt` that welcomes AI crawlers, `llms.txt`, RSS (`/rss.xml`), answer-first article blocks, self-hosted Roboto, no client JavaScript framework, and lazy-loaded images with set dimensions.

After launch: submit `https://www.thomasandrows.com/sitemap-index.xml` in Google Search Console and Bing Webmaster Tools.
