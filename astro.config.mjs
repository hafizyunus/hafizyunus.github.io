// @ts-check
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The URL lives in one place: content/site.yaml
const { site } = parse(readFileSync('./content/site.yaml', 'utf8'));

export default defineConfig({
  site: site.url,
  base: site.basePath || '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
