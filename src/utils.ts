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
