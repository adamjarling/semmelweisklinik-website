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

  it('should fall back to the default language translation if the key is missing in the current language', () => {
    // Temporarily modify ui.en to simulate a missing key
    const originalRooms = ui.en.nav.rooms;
    // @ts-ignore
    ui.en.nav.rooms = undefined; // Simulate missing translation in 'en'

    const t_en_with_fallback = useTranslations('en');
    expect(t_en_with_fallback('nav.rooms')).toBe(ui.de.nav.rooms); // Should fall back to German

    // Restore original
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
