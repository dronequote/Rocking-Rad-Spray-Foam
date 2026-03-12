// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://rockingradsprayfoam.com',
  integrations: [react(), sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});
