import { defaultLang, ui } from './ui';

export type Lang = keyof typeof ui;

/**
 * Derives the active locale from the URL path: `/de/rooms` → `"de"`.
 * Unknown or absent prefixes fall back to `defaultLang`.
 */
export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/**
 * The `getStaticPaths()` return value for every page under `src/pages/[lang]/`.
 *
 * Coming from Next: this is `generateStaticParams()`. One shared page file is
 * built once per locale, which is why `/en/rooms` and `/de/rooms` come from a
 * single source file instead of a duplicated pair.
 *
 * Pages that carry substantial per-language prose (everything under
 * `program/`, plus `participate` and `intern`) deliberately do NOT use this —
 * they live as separate files under `src/pages/en/` and `src/pages/de/`.
 */
export function getLocalePaths() {
  return (Object.keys(ui) as Lang[]).map((lang) => ({ params: { lang } }));
}

/** Reads a dot-separated path like `"rooms.detail_size"` out of a nested object. */
function getNestedProperty(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined,
      obj,
    );
}

/**
 * Returns a `t(key)` function for the given locale.
 *
 * Keys are dot-paths into `ui.ts` and are NOT type-checked, so a miss fails
 * quietly: it falls back to `defaultLang`, and if the key is missing there too
 * it returns the key string itself, which is what ends up rendered on the page.
 * The key-parity test in `ui.test.ts` is what guards against that.
 *
 * Always returns a `string`, so call sites need no casts. A key that resolves
 * to a nested object rather than a leaf (`t('nav')`) is treated as a miss.
 */
export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const currentLangTranslation = getNestedProperty(ui[lang], key);
    if (typeof currentLangTranslation === 'string') {
      return currentLangTranslation;
    }

    const defaultLangTranslation = getNestedProperty(ui[defaultLang], key);
    if (typeof defaultLangTranslation === 'string') {
      return defaultLangTranslation;
    }

    return key;
  };
}
