import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import LanguagePicker from './LanguagePicker.astro';

describe('LanguagePicker', () => {
  it('should be a valid Astro component', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(LanguagePicker, {
      props: { currentPath: '/de/test-page', currentLang: 'de' },
    });
    expect(result).toBeDefined();
  });

  it('should render path-aware language switching link to target language', async () => {
    const container = await AstroContainer.create();

    // Test: When on German page, should link to English equivalent
    const resultFromDE = await container.renderToString(LanguagePicker, {
      props: { currentPath: '/de/rooms', currentLang: 'de' },
    });
    expect(resultFromDE).toContain('href="/en/rooms"');
    expect(resultFromDE).toContain('EN');
    expect(resultFromDE).not.toContain('DE'); // Should only show target language

    // Test: When on English page, should link to German equivalent
    const resultFromEN = await container.renderToString(LanguagePicker, {
      props: { currentPath: '/en/rooms', currentLang: 'en' },
    });
    expect(resultFromEN).toContain('href="/de/rooms"');
    expect(resultFromEN).toContain('DE');
    expect(resultFromEN).not.toContain('EN'); // Should only show target language
  });
});