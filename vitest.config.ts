import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

export default getViteConfig({
  test: {
    /* for example, use 'happy-dom' to run tests in browser-like environment */
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, '**/.claude/**'],
  },
});
