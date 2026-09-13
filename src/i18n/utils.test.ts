import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations } from './utils';
import { ui, defaultLang } from './ui'; // Import ui and defaultLang for testing

describe('getLangFromUrl', () => {
  it('should return the correct language from the URL', () => {
    const url = new URL('https://example.com/en/some-path');
    expect(getLangFromUrl(url)).toBe('en');
  });

  it('should return the default language if the language is not in ui', () => {
    const url = new URL('https://example.com/fr/some-path');
    expect(getLangFromUrl(url)).toBe(defaultLang);
  });

  it('should return the default language for a base URL', () => {
    const url = new URL('https://example.com/some-path');
    expect(getLangFromUrl(url)).toBe(defaultLang);
  });

  it('should return the default language for a root URL', () => {
    const url = new URL('https://example.com/');
    expect(getLangFromUrl(url)).toBe(defaultLang);
  });
});

describe('useTranslations', () => {
  const t_en = useTranslations('en');
  const t_de = useTranslations('de');

  it('should return the correct translation for a given key and language (en)', () => {
    expect(t_en('nav.rooms')).toBe(ui.en.nav.rooms);
  });

  it('should return the correct translation for a given key and language (de)', () => {
    expect(t_de('nav.rooms')).toBe(ui.de.nav.rooms);
  });

  // Fallback only ever resolves toward `defaultLang` ('en'), so a missing key
  // can be recovered in German but not the other way around.
  it('should fall back to the default language translation if the key is missing in the current language', () => {
    const originalRooms = ui.de.nav.rooms;
    // @ts-ignore
    ui.de.nav.rooms = undefined; // Simulate missing translation in 'de'

    const t_de_with_fallback = useTranslations('de');
    expect(t_de_with_fallback('nav.rooms')).toBe(ui.en.nav.rooms); // Falls back to English

    // Restore original
    // @ts-ignore
    ui.de.nav.rooms = originalRooms;
  });

  it('should return the key when a key is missing from the default language itself', () => {
    const originalRooms = ui.en.nav.rooms;
    // @ts-ignore
    ui.en.nav.rooms = undefined;

    // 'en' IS the default language, so there is nowhere left to fall back to.
    const t_en_missing = useTranslations('en');
    expect(t_en_missing('nav.rooms')).toBe('nav.rooms');

    // @ts-ignore
    ui.en.nav.rooms = originalRooms;
  });

  it('should return the key itself if the key is missing in both the current and default language', () => {
    // Temporarily modify ui.en and ui.de to simulate a missing key
    const originalRooms_en = ui.en.nav.rooms;
    const originalRooms_de = ui.de.nav.rooms;

    // @ts-ignore
    ui.en.nav.rooms = undefined;
    // @ts-ignore
    ui.de.nav.rooms = undefined;

    const t_en_missing_all = useTranslations('en');
    expect(t_en_missing_all('nav.rooms')).toBe('nav.rooms'); // Expecting the key itself

    // Restore originals
    // @ts-ignore
    ui.en.nav.rooms = originalRooms_en;
    // @ts-ignore
    ui.de.nav.rooms = originalRooms_de;
  });
});
