// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://www.semmelweisklinik.at',

  // Static site generation. There is no server, no adapter and no runtime —
  // `pnpm build` emits plain HTML into dist/, which CI rsyncs to the host.
  output: 'static',

  integrations: [sitemap()],

  markdown: {
    // Astro 7 moved remark/rehype plugins behind `markdown.processor`; the
    // old top-level `markdown.rehypePlugins` key still works but warns.
    processor: unified({
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
    }),
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      // Both locales are prefixed: English at /en, German at /de.
      // `/` is redirected to `/en` by src/pages/index.astro.
      prefixDefaultLocale: true,
    },
  },
});
