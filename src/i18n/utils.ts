import { defaultLang, ui } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

// Helper to get nested property from object using dot notation
function getNestedProperty(obj: Record<string, any>, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) { // Changed key type to string for dot notation
    const currentLangTranslation = getNestedProperty(ui[lang], key);
    if (currentLangTranslation !== undefined) {
      return currentLangTranslation;
    }

    const defaultLangTranslation = getNestedProperty(ui[defaultLang], key);
    if (defaultLangTranslation !== undefined) {
      return defaultLangTranslation;
    }
    
    // If key not found in both current and default, return the key itself
    return key;
  };
}