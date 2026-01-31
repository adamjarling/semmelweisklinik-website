import { describe, it, expect } from 'vitest';
import { ui } from './ui';

describe('ui translations', () => {
  it('should have en and de translation objects', () => {
    expect(ui).toHaveProperty('en');
    expect(ui.en).toBeTypeOf('object');
    expect(ui).toHaveProperty('de');
    expect(ui.de).toBeTypeOf('object');
  });

  describe('English translations (en)', () => {
    it('should have head, nav, and footer properties', () => {
      expect(ui.en).toHaveProperty('head');
      expect(ui.en.head).toBeTypeOf('object');
      expect(ui.en).toHaveProperty('nav');
      expect(ui.en.nav).toBeTypeOf('object');
      expect(ui.en).toHaveProperty('footer');
      expect(ui.en.footer).toBeTypeOf('object');
    });

    it('should have correct head properties as strings', () => {
      expect(ui.en.head).toHaveProperty('title');
      expect(ui.en.head.title).toBeTypeOf('string');
      expect(ui.en.head).toHaveProperty('description');
      expect(ui.en.head.description).toBeTypeOf('string');
    });

    it('should have correct nav properties as strings', () => {
      expect(ui.en.nav).toHaveProperty('rooms');
      expect(ui.en.nav.rooms).toBeTypeOf('string');
      expect(ui.en.nav).toHaveProperty('calendar');
      expect(ui.en.nav.calendar).toBeTypeOf('string');
      expect(ui.en.nav).toHaveProperty('people');
      expect(ui.en.nav.people).toBeTypeOf('string');
      expect(ui.en.nav).toHaveProperty('program');
      expect(ui.en.nav.program).toBeTypeOf('string');
      expect(ui.en.nav).toHaveProperty('participate');
      expect(ui.en.nav.participate).toBeTypeOf('string');
    });

    it('should have correct footer properties as strings', () => {
      expect(ui.en.footer).toHaveProperty('where_to_find_us');
      expect(ui.en.footer.where_to_find_us).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('address');
      expect(ui.en.footer.address).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('follow_us');
      expect(ui.en.footer.follow_us).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('instagram');
      expect(ui.en.footer.instagram).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('facebook');
      expect(ui.en.footer.facebook).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('telegram');
      expect(ui.en.footer.telegram).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('linkedin');
      expect(ui.en.footer.linkedin).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('newsletter');
      expect(ui.en.footer.newsletter).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('book_a_venue');
      expect(ui.en.footer.book_a_venue).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('email_program');
      expect(ui.en.footer.email_program).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('general_questions');
      expect(ui.en.footer.general_questions).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('email_info');
      expect(ui.en.footer.email_info).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('copyright_year');
      expect(ui.en.footer.copyright_year).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('copyright_text_1');
      expect(ui.en.footer.copyright_text_1).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('copyright_text_2');
      expect(ui.en.footer.copyright_text_2).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('web_design_code_by');
      expect(ui.en.footer.web_design_code_by).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('webzauber_names');
      expect(ui.en.footer.webzauber_names).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('photography_by');
      expect(ui.en.footer.photography_by).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('photographers');
      expect(ui.en.footer.photographers).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('legal_notice');
      expect(ui.en.footer.legal_notice).toBeTypeOf('string');
      expect(ui.en.footer).toHaveProperty('data_protection');
      expect(ui.en.footer.data_protection).toBeTypeOf('string');
    });
  });

  describe('German translations (de)', () => {
    it('should have head, nav, and footer properties', () => {
      expect(ui.de).toHaveProperty('head');
      expect(ui.de.head).toBeTypeOf('object');
      expect(ui.de).toHaveProperty('nav');
      expect(ui.de.nav).toBeTypeOf('object');
      expect(ui.de).toHaveProperty('footer');
      expect(ui.de.footer).toBeTypeOf('object');
    });

    it('should have correct head properties as strings', () => {
      expect(ui.de.head).toHaveProperty('title');
      expect(ui.de.head.title).toBeTypeOf('string');
      expect(ui.de.head).toHaveProperty('description');
      expect(ui.de.head.description).toBeTypeOf('string');
    });

    it('should have correct nav properties as strings', () => {
      expect(ui.de.nav).toHaveProperty('rooms');
      expect(ui.de.nav.rooms).toBeTypeOf('string');
      expect(ui.de.nav).toHaveProperty('calendar');
      expect(ui.de.nav.calendar).toBeTypeOf('string');
      expect(ui.de.nav).toHaveProperty('people');
      expect(ui.de.nav.people).toBeTypeOf('string');
      expect(ui.de.nav).toHaveProperty('program');
      expect(ui.de.nav.program).toBeTypeOf('string');
      expect(ui.de.nav).toHaveProperty('participate');
      expect(ui.de.nav.participate).toBeTypeOf('string');
    });

    it('should have correct footer properties as strings', () => {
      expect(ui.de.footer).toHaveProperty('where_to_find_us');
      expect(ui.de.footer.where_to_find_us).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('address');
      expect(ui.de.footer.address).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('follow_us');
      expect(ui.de.footer.follow_us).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('instagram');
      expect(ui.de.footer.instagram).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('facebook');
      expect(ui.de.footer.facebook).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('telegram');
      expect(ui.de.footer.telegram).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('linkedin');
      expect(ui.de.footer.linkedin).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('newsletter');
      expect(ui.de.footer.newsletter).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('book_a_venue');
      expect(ui.de.footer.book_a_venue).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('email_program');
      expect(ui.de.footer.email_program).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('general_questions');
      expect(ui.de.footer.general_questions).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('email_info');
      expect(ui.de.footer.email_info).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('copyright_year');
      expect(ui.de.footer.copyright_year).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('copyright_text_1');
      expect(ui.de.footer.copyright_text_1).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('copyright_text_2');
      expect(ui.de.footer.copyright_text_2).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('web_design_code_by');
      expect(ui.de.footer.web_design_code_by).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('webzauber_names');
      expect(ui.de.footer.webzauber_names).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('photography_by');
      expect(ui.de.footer.photography_by).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('photographers');
      expect(ui.de.footer.photographers).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('legal_notice');
      expect(ui.de.footer.legal_notice).toBeTypeOf('string');
      expect(ui.de.footer).toHaveProperty('data_protection');
      expect(ui.de.footer.data_protection).toBeTypeOf('string');
    });
  });
});