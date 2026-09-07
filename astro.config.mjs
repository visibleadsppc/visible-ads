import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://visible-ads.com',
  // /guide-sent is noindex (it is the gated playbook's thank-you page), so keep it out of
  // the sitemap rather than asking Google to crawl a page we then tell it to drop.
  integrations: [sitemap({ filter: (page) => !page.includes('/guide-sent') })],
  vite: {
    plugins: [tailwindcss()]
  }
});
