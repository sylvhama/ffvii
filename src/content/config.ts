import { z, defineCollection } from "astro:content";

const collection = defineCollection({
  schema: ({ image }) =>
    z.object({
      sortOrder: z.number(),
      title: z.string(),
      description: z.string(),
      images: z.array(image()),
      imagesAlt: z.array(z.string()),
    }),
});

export const collections = {
  games: collection,
  movies: collection,
  books: collection,
  music: collection,
  events: collection,
  merch: collection,
};
