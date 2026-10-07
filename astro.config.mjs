import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://visible-ads.com',
  // The gated pages are all noindex, so keep them out of the sitemap rather than asking Google
  // to crawl a page we then tell it to drop. The Golden Quarter landing page itself IS indexed:
  // it is the one doing the lead capture. Only its thank-you and download pages are excluded.
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(guide-sent|playbook)\//.test(page) &&
        !/\/tools\/golden-quarter-tactics\/(sent|downloads)\//.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
