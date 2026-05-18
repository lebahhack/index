export const SITE = {
  title: 'AstroSEO',
  description: 'Production-ready Astro SEO template untuk Cloudflare Pages.',
  url: 'https://example.com',
  author: 'AstroSEO',
  keywords: 'astro seo, cloudflare pages, astro blog'
};

export const siteUrl = (path = '') => {
  return `${SITE.url}${path}`;
};