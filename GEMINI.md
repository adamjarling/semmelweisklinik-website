# Project Mission: Static to Astro i18n Migration

## 1. Project Context
- **Framework:** Astro 5.x+
- **Source Material:** Located in `/legacy` (Static HTML/CSS/JS)
- **Primary Goal:** Convert to a clean, component-based Astro app with DE/EN support.
- **Output:** Static site (SSG) hosted on Netlify.

## 2. Technical Architecture
- **Routing:** Built-in Astro i18n (`src/pages/[lang]/...`)
- **Styling:** - Extract inline styles to scoped `<style>` tags in Astro components.
  - Shared styles go to `src/styles/global.css`.
- **Logic:** - Use TypeScript for all components and utilities.
  - Use `astro:assets` for image processing.

## 3. Deployment Environment
- **Adapter:** Netlify
- **Base URL:** [To be determined]

## 4. Current Migration Status
- [x] Initialize Astro Project
- [x] Move old site to `/legacy`
- [ ] Configure `astro.config.mjs` for i18n [NEXT STEP]
- [ ] Build `src/i18n/ui.ts` dictionary
- [ ] Migrate Header/Footer components
- [ ] Refactor `/legacy` pages into `src/pages/[lang]/[slug].astro`

## 5. Instructions for Gemini CLI
- **Component Creation:** When creating a component, scan `/legacy` for repeated HTML patterns.
- **CSS Refactoring:** If an element has more than 2 inline style properties, convert it to a CSS class.
- **i18n:** Every text string found in HTML must be extracted to `src/i18n/ui.ts` and replaced with a reference (e.g., `{t('nav.home')}`).
- **Confirmation:** After every major file creation, update the checklist in this file.