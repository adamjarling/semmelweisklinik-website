# Semmelweisklinik Website

Official website for the **Semmelweisklinik** arts and culture center in Vienna, Austria.

🌐 **Live site**: [semmelweisklinik.at](https://www.semmelweisklinik.at/)

---

## Quick start

```sh
nvm use            # Node 22, from .nvmrc
pnpm install
pnpm dev           # http://localhost:4321
```

| Command        | What it does                                                     |
| :------------- | :--------------------------------------------------------------- |
| `pnpm dev`     | Dev server at `localhost:4321`                                   |
| `pnpm build`   | Production build → `./dist/` (~2s, 89 pages)                     |
| `pnpm preview` | Serve the production build locally                               |
| `pnpm verify`  | `astro check` + `prettier --check` + `vitest` — **what CI runs** |
| `pnpm test`    | Tests only                                                       |
| `pnpm format`  | Reformat everything with Prettier                                |

Run `pnpm verify` before opening a pull request. It is the same command the
deploy workflow runs, and a failure there blocks production.

---

## If you're coming from Next.js

Astro's concepts map closely onto Next's; almost none of the names match.

| In Next.js               | Here                                                                                  |
| :----------------------- | :------------------------------------------------------------------------------------ |
| `app/layout.tsx`         | `src/layouts/BaseLayout.astro` — also owns all SEO (canonical, hreflang, OG, JSON-LD) |
| `app/page.tsx`           | `src/pages/[lang]/index.astro`                                                        |
| `generateStaticParams()` | `getStaticPaths()`, exported from the route file itself                               |
| Server Components        | The `---` frontmatter block. Runs at **build time only** — no request, no runtime     |
| `'use client'`           | A plain `<script>` in the component. No framework, no hydration                       |
| `next/image`             | `<Image>` from `astro:assets`                                                         |
| Contentlayer / MDX       | Content collections, Zod schemas in `src/content.config.ts`                           |
| `next-intl`              | `src/i18n/ui.ts` + `useTranslations(lang)`                                            |
| `middleware.ts`          | Nothing. `src/pages/index.astro` is a static page redirecting `/` → `/en`             |
| Vercel                   | GitHub Actions → `rsync` over SSH on push to `main`. No preview deploys               |

The biggest adjustment: **there is no server and no client framework.** The
build emits plain HTML files. Interactivity is hand-written DOM code in
`<script>` tags (see `ImageCarousel.astro`), and it must be idempotent because
Astro re-runs it after view transitions.

---

## Project structure

```text
src/
├── pages/
│   ├── [lang]/              # shared pages — built once per locale
│   │   ├── index.astro
│   │   ├── calendar.astro
│   │   ├── newsletter.astro
│   │   ├── impressum.astro
│   │   ├── datenschutz.astro
│   │   ├── artists/{index,[slug]}.astro
│   │   └── rooms/{index,[slug]}.astro
│   ├── en/                  # English-only, prose-heavy pages…
│   ├── de/                  # …and their German twins
│   │   ├── participate.astro
│   │   ├── intern.astro
│   │   └── program/*.astro
│   └── index.astro          # / → /en
├── layouts/BaseLayout.astro # page shell + all SEO metadata
├── components/              # Astro components
├── content/
│   ├── artists/             # 27 markdown profiles
│   └── rooms/               # 5 markdown room descriptions
├── content.config.ts        # Zod schemas for both collections
├── i18n/{ui,utils}.ts       # translation strings + helpers
├── config/reservation.ts    # build-time feature flag
├── assets/images/           # optimised by Sharp at build time
└── styles/global.css        # the whole stylesheet (no framework)

public/                      # served as-is, NOT optimised
├── images/artists/          # see "Known gaps" in CLAUDE.md
├── svg/                     # logos, icons, partner marks
└── pdf/                     # downloadable booklets
```

**Why two page directories?** A page goes in `[lang]/` when the locales differ
only in short UI strings — those live in `src/i18n/ui.ts` and are read with
`t('key')`. It goes in `en/` + `de/` only when it is mostly per-language prose.
See CLAUDE.md for the full rule.

---

## Common tasks

### Add an artist

1. Create `src/content/artists/<slug>.md`. The slug becomes the URL.
2. Put the portrait in `public/images/artists/preview/` and any gallery shots
   in `public/images/artists/original/`.
3. Reference them as absolute URL strings:

```yaml
---
name: 'Firstname Lastname'
location: 'Westtrakt, 1. Stock' # optional
email: 'hello@example.org' # optional
website: 'https://example.org' # optional — must be a full URL
instagram: 'https://instagram.com/…' # optional
profileImage: '/images/artists/preview/Name_01.jpg'
galleryImages: # optional
  - '/images/artists/original/Name_02.jpg'
bio: # optional; falls back to the markdown body
  en: 'English bio…'
  de: 'Deutsche Biografie…'
---
```

Both `bio.en` and `bio.de` are required if `bio` is present. The listing sorts
alphabetically by `name`.

### Add a room

Same idea, but under `src/content/rooms/`, and **nearly every field is
bilingual**. Images go in `src/assets/images/rooms/<room>/` and are referenced
by a path **relative to the markdown file** (they run through Sharp):

```yaml
---
name: { en: 'Hybrid Room', de: 'Hybridraum' } # name.de is shown in BOTH locales
tagline: { en: 'Bright and airy', de: 'Hell und luftig' }
location: { en: 'Middle tract', de: 'Mitteltrakt' }
description: { en: '…', de: '…' }
specs:
  size: { en: '75m²', de: '75m²' }
  features:
    en: ['South-facing windows']
    de: ['Südseitige Fensterfront']
images: # at least one is required — images[0] is the listing thumbnail
  - src: '../../assets/images/rooms/hybridraum/photo.jpg'
    caption:
      en: 'Main room — window front' # em dash splits title from description
      de: 'Hauptraum — Fensterfront'
sortOrder: 1 # controls order in the rooms listing
---
```

Filenames must not contain spaces.

### Add a program event

Program pages are **not** a collection — they are hand-built pages, because
each has bespoke layout, portraits and PDF links. You need three edits:

1. `src/pages/en/program/<slug>.astro`
2. `src/pages/de/program/<slug>.astro`
3. A card added to both `program/index.astro` files

Images go in `src/assets/images/program/<slug>/`, imported at the top of the
page and rendered with `<Image>`.

### Turn the room reservation form back on

Set `RESERVATION_FORM_ENABLED = true` in `src/config/reservation.ts`. That is
the only edit — both room pages read the flag. See the comment in that file for
why it is currently off.

---

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which runs
`pnpm verify`, builds, and rsyncs `dist/` to the production server over SSH.
A verify failure stops the deploy.

Pull requests and non-`main` branches run `.github/workflows/ci.yml`, which
runs the same checks plus a build.

There are no preview deployments. Use `pnpm preview` locally.

---

## About Semmelweisklinik

A decentralized arts and culture center on the site of the former Ignaz
Semmelweis Women's Clinic (House 4), opened June 2022. A self-managed creative
interim use of **3,800 m²**, running until the end of 2026.

- **40 studios** hosting ~110 artists and cultural operators
- **7 public event spaces** for performances, exhibitions and gatherings
- **Rentable rooms** — performance spaces, seminar rooms, a large-scale
  kitchen, and specialised workshops

The center addresses socio-political questions through artistic and
regenerative approaches: gender equality, diversity-oriented openness,
climate-friendly methods, participatory decision-making, and local and
international networking.

---

## Contact

- **General**: info@semmelweisklinik.at
- **Program / venue bookings**: programm@semmelweisklinik.at
- **This website**: adam.arling@semmelweisklinik.at
- **Location**: Hockegasse 37, Haus 4, 1180 Vienna, Austria

---

## License

©2022-2026 Kunst- und Kulturzentrum Semmelweisklinik. All Rights Reserved.

**Original web design & development**: Webzauber, Sören Herschel & Maryann Alexy
