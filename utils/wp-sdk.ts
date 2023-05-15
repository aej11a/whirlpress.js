import { Category } from "./wp-types/category";
import { Post, PostsResponse, PostTag, Tags } from "./wp-types/posts";
import { SiteData } from "./wp-types/site-data";

const wpEndpoint =
  "https://public-api.wordpress.com/rest/v1.1/sites/myblog2700.wordpress.com/";

const getSiteData = async (args?: { cache: RequestInit["cache"] }) => {
  const cache = args?.cache ?? "no-cache";
  // fetch site data
  const res = await fetch(wpEndpoint, { cache });
  const siteData = (await res.json()) as SiteData;
  return siteData;
};

const getPosts = async (args?: { category?: string; tag?: string }) => {
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
      cache: "no-cache",
    }
  );
  const posts = (await res.json()) as PostsResponse;
  return posts;
};

const getPostBySlug = async (slug: string) => {
  const res = await fetch(`${wpEndpoint}posts/slug:${slug}`, {
    cache: "no-cache",
  });
  const post = (await res.json()) as Post;
  return post;
};

const getCategory = async (slug: string) => {
  const res = await fetch(`${wpEndpoint}categories/slug:${slug}`, {
    cache: "no-cache",
  });
  const category = (await res.json()) as Category;
  return category;
};

const getTag = async (slug: string) => {
  const res = await fetch(`${wpEndpoint}tags/slug:${slug}`, {
    cache: "no-cache",
  });
  const tag = (await res.json()) as PostTag;
  return tag;
};

export const WpSdk = {
  getSiteData,
  getPosts,
  getPostBySlug,
  getCategory,
  getTag
};
