# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Commands

```bash
pnpm dev       # dev server at localhost:4321
pnpm build     # production build → ./dist/
pnpm preview   # serve the production build locally
pnpm verify    # astro check + prettier --check + vitest  (what CI runs)
pnpm test      # vitest only
pnpm format    # prettier --write .
```

Run a single test file: `pnpm vitest run src/i18n/utils.test.ts`

Node version comes from `.nvmrc` (22); CI reads the same file. pnpm is pinned
via `packageManager` in package.json.

## Architecture

Astro 7 static site (SSG, zero client JS by default) for Semmelweisklinik, an
arts centre in Vienna. Pushing to `main` runs `pnpm verify`, builds, and rsyncs
`dist/` to a shared host over SSH. There is no server, no adapter, no runtime.

### Routing and i18n — the one rule that matters

The site is bilingual (English default, German). Pages live in **two places**,
and which one you use is a deliberate decision:

```
src/pages/[lang]/…   → shared page, built once per locale via getStaticPaths()
src/pages/en/…       → English-only file, paired with a German twin
src/pages/de/…       → the German twin
```

**Default to `src/pages/[lang]/`.** Use it whenever the two locales differ only
in short UI strings, which then live in `src/i18n/ui.ts` and are read with
`t('some.key')`. Add `export function getStaticPaths() { return getLocalePaths(); }`
and the page builds at both `/en/...` and `/de/...`.

**Only use the `en/` + `de/` pair when a page is mostly per-language prose** —
long editorial copy that would be unreadable as dictionary entries. Today that
is exactly five pairs: everything under `program/`, plus `participate` and
`intern`. Do not add to this list without a reason.

Supporting pieces:

- `src/i18n/ui.ts` — all UI strings, nested objects keyed `"en"` / `"de"`
- `src/i18n/utils.ts` — `getLangFromUrl`, `getLocalePaths`, `useTranslations`
- `t()` returns a `string` and **fails silently**: a missing key falls back to
  English, and if it is missing there too you get the key itself rendered on
  the page. The key-parity test in `ui.test.ts` is what catches that — when you
  add a key to one locale, add it to the other.

### Content collections

Schemas in `src/content.config.ts`, validated at build time.

- `artists/` — 28 markdown files → `/en/artists/<slug>` and `/de/artists/<slug>`
- `rooms/` — 5 markdown files → `/en/rooms/<slug>` and `/de/rooms/<slug>`

Bilingual fields are typed `{ en, de }` and **both are required** — you cannot
add a room with only a German description.

Room _names_ are deliberately German in both locales ("Hybridraum", "Küche"):
they are the proper names of the physical spaces, not translatable labels.

### Images — all through Sharp

Every image in the site — rooms, program, and artists — lives in
`src/assets/images/` and is imported, never referenced by URL. Room and
artist collection schemas both use Astro's `image()` helper, so frontmatter
paths are **relative to the markdown file**, not URLs. `<Image>` /
`getImage()` from `astro:assets` render them; a bare `<img src="...">`
pointing at one of these paths won't work, since `image()` resolves to an
`ImageMetadata` object at build time, not a string.

`public/images/artists/` still exists, but only holds unreferenced content
now — see "Do not delete artist content" below. Nothing in the build reads
from it any more.

Room images additionally carry a caption; artist images don't:

```yaml
images:
  - src: '../../assets/images/rooms/hybridraum/photo.jpg'
    caption:
      en: 'Main room — window front' # em dash splits title from description
      de: 'Hauptraum — Fensterfront'
```

Filenames must not contain spaces — they become ESM import specifiers.

### Feature flags

`src/config/reservation.ts` gates the room reservation form. Currently
disabled: the Microsoft Form accepts submissions but nobody has traced where
responses land in the `semmelweisklinik.at` M365 tenant, so room pages fall
back to a `mailto:`. Flip `RESERVATION_FORM_ENABLED` to re-enable — that is the
only edit needed. Astro evaluates it at build time, so the disabled branch
emits nothing and the form URL never reaches the HTML.

This file is the model for how to park a disabled feature in this repo.

### Layout and styling

`src/layouts/BaseLayout.astro` wraps every page with `<Header>` / `<Footer>`
and owns all SEO: canonical URL, hreflang alternates, Open Graph, Twitter card,
JSON-LD. Pass `title`, `description`, `ogImage` as props.

There is no CSS framework. Styling is three layers, in order of preference:

1. **Utility classes** in `src/styles/global.css` — spacing (`mt-50`, `mb-25`),
   layout (`container-wide`, `grid-2col`, `page-wrapper`), type (`text-26`,
   `hero-title`), visibility (`only-mobile`, `only-desktop`). Check here first.
2. **Scoped `<style>`** in a component, for rules that belong to it alone.
3. **Inline `style=""`** — legacy from the static-HTML migration. Header and
   Footer still carry a lot of it. Don't add more.

## Do not delete artist content

As of the artist image migration (see Known gaps), `public/images/artists/`
no longer holds any file the build actually reads — every profiled artist's
`profileImage`/`galleryImages` source now lives in
`src/assets/images/artists/<slug>/`. What's left under `public/` is two
groups of files that were already unreferenced before the migration, plus a
third, new one:

**Group 1 — the 28 artists with a profile. Never delete.**

Everything belonging to an artist who has a file in `src/content/artists/` is
protected, including unreferenced alternate shots — extra frames of current
members, not worth deleting to save a few MB.

**Group 2 — 11 artists with photos but no profile. On hold. (114 files, 88 MB)**

Do not delete these either, but for a different reason: nobody has checked yet
whether these eleven are still active members of the house. That check is
Adam's, and it has not happened. Until it does, treat the files as held — and
do not purge them from git history, which would decide the question by
accident.

If the answer comes back that some are no longer members, their files can go.
If it comes back that they are current, the work is the opposite of deletion:
writing the eleven missing profiles.

| Artist                     | Files | Legacy page to port                  |
| -------------------------- | ----- | ------------------------------------ |
| Ida Zahradnik              | 10    | `legacy/ida-zahradnik.html`          |
| Josephine Teresa Grafl     | 6     | —                                    |
| F3B5                       | 14    | `legacy/f3b5.html`                   |
| Robin Lütolf               | 12    | `legacy/robin-luetolf.html`          |
| Brenner / Havelka / Plessl | 20    | `legacy/brenner-havelka-plessl.html` |
| Davide Herrera             | 10    | —                                    |
| Jeremias Nikolaus Lindner  | 6     | —                                    |
| Janine Weger               | 6     | —                                    |
| Linsey Knibbeler           | 10    | —                                    |
| Ulla Unzeitig              | 12    | `legacy/ulla-unzeitig.html`          |
| Boris Contarin             | 8     | —                                    |

The old static site had 47 artist pages; this one has 28. For several of these
people the repo may hold the only copy of their photographs, which is why the
membership check has to come before any deletion rather than after.

Note that `legacy/` is gitignored, so it exists only in the original working
copy. If you need those five pages and cannot see the directory, ask.

**Group 3 — leftover duplicates from the image migration. Pending cleanup.**

For every profiled artist's image, the migration moved the better of its two
copies (`original/` if present, else `preview/`) into `src/assets/`. The
other copy — a hand-shrunk `preview/` file made obsolete by Sharp generating
its own thumbnails now — is still sitting in `public/images/artists/`,
unreferenced. Unlike Groups 1 and 2, these aren't unique photographs: the
image they duplicate already exists, at higher quality, in `src/assets/`. A
sandbox permission gate blocked their deletion mid-migration (bulk `git rm`
reads as irreversible destruction); removing them is safe and was left for a
human to explicitly confirm rather than retried around.

## Known gaps

- **`t()` keys are untyped.** Dot-path strings, not a union. A typo renders the
  key. Typed keys would be a real improvement.
