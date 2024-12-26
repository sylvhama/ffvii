import { z, defineCollection } from "astro:content";

const gamesCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      images: z.array(image()),
      imagesAlt: z.array(z.string()),
    }),
});

export const collections = {
  games: gamesCollection,
};
