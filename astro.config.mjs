// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: 'https://www.semmelweis-klinik.at', // Your domain
  base: process.env.DEPLOY_BASE || undefined,
  output: "static",
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: false, // 'de' stays at root, 'en' at /en
    },
  },
});
