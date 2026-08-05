# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Build for production to ./dist/
pnpm preview      # Preview production build locally
pnpm test         # Run unit tests with Vitest
```

Run a single test file:
```bash
pnpm vitest run src/i18n/utils.test.ts
```

## Architecture

**Astro 5 static site** (SSG, zero client-side JS by default) for Semmelweisklinik — an arts center in Vienna. Deployed via GitHub Actions → rsync to a custom server on push to `main`.

### i18n

The site is bilingual (English/German). Every page under `src/pages/` is duplicated under `src/pages/en/` and `src/pages/de/`. English is the default locale (`/` redirects to `/en`).

- `src/i18n/ui.ts` — all translation strings as nested objects keyed by `"en"` and `"de"`
- `src/i18n/utils.ts` — `getLangFromUrl(url)` and `useTranslations(lang)` for use in `.astro` files
- When adding new UI text, add both `en` and `de` entries to `ui.ts`, then use `t("key.path")` in components

### Content Collections

Structured content lives in `src/content/` with Zod schemas defined in `src/content/config.ts`:
- `artists/` — 30+ markdown files; each generates `/en/artists/[slug]` and `/de/artists/[slug]`
- `rooms/` — 4 markdown files; each generates `/en/rooms/[slug]` and `/de/rooms/[slug]`

Dynamic pages use `getStaticPaths()` to enumerate all collection entries and render both language variants.

### Feature Flags

`src/config/reservation.ts` holds a build-time toggle for the room reservation form:

- `RESERVATION_FORM_ENABLED` — when `true`, room detail pages show the Microsoft Forms "click here to reserve" link; when `false`, they fall back to a `mailto:programm@semmelweisklinik.at` prompt (`rooms.detail_email_prompt`)
- `RESERVATION_FORM_URL` — the Microsoft Forms URL, parked here so it can be restored unchanged

**Currently disabled** (since 2026-08-05): the form accepts submissions without error, but nobody has traced where responses land inside the `semmelweisklinik.at` Microsoft 365 tenant. To re-enable, flip `RESERVATION_FORM_ENABLED` to `true` — that is the only edit needed, since both `src/pages/en/rooms/[slug].astro` and `src/pages/de/rooms/[slug].astro` read it.

Astro evaluates the flag at build time, so the disabled branch emits nothing and the form URL never reaches the built HTML.

### Layout & Components

All pages use `src/layouts/BaseLayout.astro` which wraps content with `<Header>` and `<Footer>` and handles all SEO metadata (canonical URLs, hreflang alternates, Open Graph, JSON-LD structured data).

### Styling

Global styles in `src/styles/global.css`. No CSS framework — custom CSS with scoped `<style>` blocks in `.astro` files.

### Testing

Vitest with `happy-dom` environment. Tests cover i18n utilities and component logic (not full rendering). Test files co-located with source files as `*.test.ts`.
