import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const generateCollection = (name: string) =>
  defineCollection({
    loader: glob({ base: `./src/content/${name}`, pattern: "**/*.{md,mdx}" }),
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
  games: generateCollection("games"),
  movies: generateCollection("movies"),
  books: generateCollection("books"),
  music: generateCollection("music"),
  events: generateCollection("events"),
  merch: generateCollection("merch"),
};
