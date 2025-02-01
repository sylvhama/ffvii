import { getImage } from "astro:assets";
import { getCollection, type CollectionKey } from "astro:content";
import { getRelativeLocaleUrl as astroGetRelativeLocaleUrl } from "astro:i18n";

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

export function getRelativeLocaleUrl(locale: string, path: string) {
  const relativeUrl = astroGetRelativeLocaleUrl(locale, path);
  return relativeUrl.length > 1 && relativeUrl.endsWith("/")
    ? relativeUrl.slice(0, -1)
    : relativeUrl;
}
