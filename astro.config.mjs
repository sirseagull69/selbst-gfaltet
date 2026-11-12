import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.selbstgfaltet.de',
  integrations: [mdx(), sitemap()],
  trailingSlash: 'ignore',
});
