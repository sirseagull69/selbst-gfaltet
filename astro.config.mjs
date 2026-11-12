import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://selbst-gfaltet.vercel.app',
  integrations: [mdx()],
  trailingSlash: 'ignore',
});
