import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections — the two structured content types on the site.
 *
 * Coming from Next: this is the Contentlayer/MDX equivalent. Every markdown
 * file under the `base` directory is validated against its schema at build
 * time, so a typo in frontmatter fails the build instead of rendering blank.
 *
 * Translation is structural, not conventional: anything a visitor reads in
 * both languages is typed as `{ en, de }` and BOTH are required. You cannot
 * add a room with only a German description — Zod rejects it.
 */
const bilingualString = z.object({
  en: z.string(),
  de: z.string(),
});

/**
 * Artists — `src/content/artists/*.md` → `/en/artists/<slug>` + `/de/artists/<slug>`.
 *
 * Like rooms, images go through `image()` and Sharp: `profileImage` and each
 * entry in `galleryImages` are paths RELATIVE TO THE MARKDOWN FILE, not
 * URLs, pointing at `src/assets/images/artists/<slug>/`. This closed the gap
 * described in CLAUDE.md — the on-disk `preview/` + `original/` pair under
 * `public/` was a hand-maintained stand-in for what Sharp now generates
 * per-use (thumbnail crops, retina widths, a lightbox size), computed from a
 * single higher-quality source instead of a single guessed-at 480px preview.
 *
 * `bio` is the bilingual body copy. The markdown body is a single-language
 * fallback used only when `bio` is absent.
 */
const artistsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      location: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      website: z.string().url().optional(),
      instagram: z.string().url().optional(),
      facebook: z.string().url().optional(),
      github: z.string().url().optional(),
      profileImage: image(),
      // Rendered as a small caption under the profile photo, e.g. when it
      // wasn't the artist's own — a photographer credit, not a bio field.
      profileImageCredit: z.string().optional(),
      galleryImages: z.array(image()).optional(),
      bio: bilingualString.optional(),
    }),
});

/**
 * Rooms — `src/content/rooms/*.md` → `/en/rooms/<slug>` + `/de/rooms/<slug>`.
 *
 * `image()` takes a path RELATIVE TO THE MARKDOWN FILE (not a URL) and hands
 * the file to Sharp, which is why room images live in `src/assets/images/`
 * rather than `public/`. Astro returns an ImageMetadata object, so these
 * fields must be passed to `<Image>`, never to a bare `<img src>`.
 *
 * `sortOrder` controls the order of the rooms listing; rooms without one sort
 * last. Room *names* are deliberately German in both locales — they are the
 * proper names of the physical spaces ("Hybridraum", "Küche").
 */
const roomsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rooms' }),
  schema: ({ image }) =>
    z.object({
      name: bilingualString,
      tagline: bilingualString.optional(),
      location: bilingualString.optional(),
      description: bilingualString.optional(),
      specs: z
        .object({
          size: bilingualString.optional(),
          capacity: bilingualString.optional(),
          features: z
            .object({
              en: z.array(z.string()),
              de: z.array(z.string()),
            })
            .optional(),
        })
        .optional(),
      // At least one image is required: the rooms listing uses images[0] as the
      // card thumbnail. Without `.min(1)` an image-less room would fail deep
      // inside the build instead of here, pointing at the offending markdown.
      images: z
        .array(
          z.object({
            src: image(),
            sphere: z.boolean().optional(),
            // Rendered as "<strong>title</strong><br>description" — the em
            // dash is the separator the room page splits on.
            caption: bilingualString.optional(),
          }),
        )
        .min(1),
      sortOrder: z.number().optional(),
    }),
});

export const collections = {
  artists: artistsCollection,
  rooms: roomsCollection,
};
