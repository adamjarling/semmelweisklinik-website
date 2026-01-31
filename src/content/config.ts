import { defineCollection, z } from 'astro:content';

const artistsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    location: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
    profileImage: z.string(),
    galleryImages: z.array(z.string()).optional(),
    sortOrder: z.number().optional(),
  }),
});

const bilingualString = z.object({
  en: z.string(),
  de: z.string(),
});

const roomsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: bilingualString,
    tagline: bilingualString.optional(),
    location: bilingualString.optional(),
    description: bilingualString.optional(),
    specs: z.object({
      size: bilingualString.optional(),
      capacity: bilingualString.optional(),
      features: z.object({
        en: z.array(z.string()),
        de: z.array(z.string()),
      }).optional(),
    }).optional(),
    images: z.array(z.string()).optional(),
    sortOrder: z.number().optional(),
  }),
});

export const collections = {
  artists: artistsCollection,
  rooms: roomsCollection,
};
