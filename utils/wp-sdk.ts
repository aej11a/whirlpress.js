import { Category } from "./wp-types/category";
import { Post, PostsResponse, PostTag } from "./wp-types/posts";
import { SiteData } from "./wp-types/site-data";

const PAGE_SIZE = 2;

const wpEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;

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
  search?: string;
  currentPage?: number;
  pageSize?: number;
  cache?: RequestInit["cache"];
}) => {
  const category = args?.category;
  const tag = args?.tag;
  let filter = "?";
  if (category) {
    filter += `category=${category}&`;
  } else if (tag) {
    filter += `tag=${tag}&`;
  } else if (args?.search) {
    filter += `search=${args.search}&`;
  }

  // fetch posts
  const res = await fetch(
    `${wpEndpoint}posts${filter}page=${
      args?.currentPage || 1
    }&number=${PAGE_SIZE}`,
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
  };
  return tagsResponse;
};

export const WpSdk = {
  PAGE_SIZE,
  getSiteData,
  getPosts,
  getPostBySlug,
  getCategory,
  getCategories,
  getTag,
  getTags,
};
