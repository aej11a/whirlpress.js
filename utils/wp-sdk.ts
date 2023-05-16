import { Category } from "./wp-types/category";
import { Post, PostsResponse, PostTag } from "./wp-types/posts";
import { SiteData } from "./wp-types/site-data";

const wpEndpoint =
  "https://public-api.wordpress.com/rest/v1.1/sites/myblog2700.wordpress.com/";

const getSiteData = async (args?: { cache?: RequestInit["cache"] }) => {
  const cache = args?.cache;
  // fetch site data
  const res = await fetch(wpEndpoint, {
    // cache most requests for 60 seconds
    next: { revalidate: cache === "no-cache" ? 0 : 60 },
  });
  const siteData = (await res.json()) as SiteData;
  return siteData;
};

const getPosts = async (args?: {
  category?: string;
  tag?: string;
  cache?: RequestInit["cache"];
}) => {
  const category = args?.category;
  const tag = args?.tag;
  let urlEnding = "";
  if (category) {
    urlEnding = `&category=${category}`;
  } else if (tag) {
    urlEnding = `&tag=${tag}`;
  }

  // fetch posts
  const res = await fetch(
    `${wpEndpoint}posts?_embed=true&per_page=5${urlEnding}`,
    {
      // cache most requests for 60 seconds
      next: { revalidate: args?.cache === "no-cache" ? 0 : 60 },
    }
  );
  const posts = (await res.json()) as PostsResponse;
  return posts;
};

const getPostBySlug = async (slug: string, cache?: RequestInit["cache"]) => {
  const res = await fetch(`${wpEndpoint}posts/slug:${slug}`, {
    // cache most requests for 60 seconds
    next: { revalidate: cache === "no-cache" ? 0 : 60 },
  });
  const post = (await res.json()) as Post;
  return post;
};

const getCategory = async (slug: string, cache?: RequestInit["cache"]) => {
  const res = await fetch(`${wpEndpoint}categories/slug:${slug}`, {
    // cache most requests for 60 seconds
    next: { revalidate: cache === "no-cache" ? 0 : 60 },
  });
  const category = (await res.json()) as Category;
  return category;
};

const getCategories = async (cache?: RequestInit["cache"]) => {
  const res = await fetch(`${wpEndpoint}categories`, {
    // cache most requests for 60 seconds
    next: { revalidate: cache === "no-cache" ? 0 : 60 },
  });
  const categoriesResult = (await res.json()) as {
    found: number;
    categories: Category[];
  };
  return categoriesResult;
};

const getTag = async (slug: string, cache?: RequestInit["cache"]) => {
  const res = await fetch(`${wpEndpoint}tags/slug:${slug}`, {
    // cache most requests for 60 seconds
    next: { revalidate: cache === "no-cache" ? 0 : 60 },
  });
  const tag = (await res.json()) as PostTag;
  return tag;
};

const getTags = async (cache?: RequestInit["cache"]) => {
  const res = await fetch(`${wpEndpoint}tags`, {
    // cache most requests for 60 seconds
    next: { revalidate: cache === "no-cache" ? 0 : 60 },
  });
  const tagsResponse = (await res.json()) as {
    found: number;
    tags: PostTag[];
  }
  return tagsResponse;
};

export const WpSdk = {
  getSiteData,
  getPosts,
  getPostBySlug,
  getCategory,
  getCategories,
  getTag,
  getTags,
};
