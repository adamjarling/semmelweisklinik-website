// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  i18n: {
    defaultLocale: "de",
    locales: ["de", "en"],
    routing: {
      prefixDefaultLocale: false, // 'de' stays at root, 'en' at /en
    },
  },
});
