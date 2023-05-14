import { Post, PostsResponse } from "./wp-types/posts";
import { SiteData } from "./wp-types/site-data";

const wpEndpoint =
  "https://public-api.wordpress.com/rest/v1.1/sites/218966689/";

const getSiteData = async (args?: { cache: RequestInit["cache"] }) => {
  const cache = args?.cache ?? "no-cache";
  // fetch site data
  const res = await fetch(wpEndpoint, { cache });
  const siteData = (await res.json()) as SiteData;
  return siteData;
};

const getPosts = async () => {
  // fetch posts
  const res = await fetch(`${wpEndpoint}posts?_embed=true&per_page=5`, {
    cache: "no-cache",
  });
  const posts = (await res.json()) as PostsResponse;
  return posts;
};

const getPostBySlug = async (slug: string) => {
  const res = await fetch(`${wpEndpoint}posts/slug:${slug}?_embed=true`, {
    cache: "no-cache",
  });
  const post = (await res.json()) as Post;
  return post;
};


export const WpSdk = {
  getSiteData,
  getPosts,
  getPostBySlug,
};