import { getImage } from "astro:assets";
import { getCollection, type CollectionKey } from "astro:content";

export function getEnglishStaticPaths(collection: CollectionKey) {
  return async () => {
    const posts = await getCollection(collection, ({ id }) => {
      return !id.startsWith("fr/");
    });

    return posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
        props: {
          post,
        },
      };
    });
  };
}

export function getFrenchStaticPaths(collection: CollectionKey) {
  return async () => {
    const posts = await getCollection(collection, ({ id }) => {
      return id.startsWith("fr/");
    });

    return posts.map((post) => {
      return {
        params: {
          slug: post.slug.replace("fr/", ""),
        },
        props: {
          post,
        },
      };
    });
  };
}

export async function getLocaleCollection(
  collection: CollectionKey,
  currentLocale: string = "en"
) {
  return await getCollection(collection, ({ id }) => {
    if (currentLocale === "en") return !id.startsWith("fr/");
    return id.startsWith("fr/");
  });
}

type Image = {
  src: string;
  width: number;
  height: number;
  format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
};

export async function getOptimizedImage({
  image,
  width = 500,
  height = 500,
  format = "webp",
  densities = [1.5, 2],
}: {
  image: Image;
  width?: number;
  height?: number;
  format?: string;
  densities?: number[];
}) {
  return await getImage({
    src: image,
    format,
    width,
    height,
    densities,
  });
}

export const focusRing = `
 rounded-md  
 outline-offset-4 dark:outline-offset-4 ff7:outline-offset-4 
 outline-black dark:outline-white ff7:outline-white 
 focus-visible:outline-2 focus-visible:dark:outline-2 
 focus-visible:ff7:outline-2`;
