import { WpSdk } from "@/utils/wp-sdk";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
  ];

  // get all posts, categories, tags, pages, etc.
  const [postsResponse, categoriesResponse, tagsResponse] = await Promise.all([
    WpSdk.getPosts(),
    WpSdk.getCategories(),
    WpSdk.getTags(),
  ]);

  const totalPostsPages = Math.ceil(postsResponse.found / WpSdk.PAGE_SIZE);
  for (let i = 2; i <= totalPostsPages; i++) {
    sitemapEntries.push({
      url: `${baseUrl}/page/${i}`,
      lastModified: new Date(),
    });
  }
  for (const post of postsResponse.posts) {
    const postDate = new Date(post.date);
    sitemapEntries.push({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.modified),
    });
    sitemapEntries.push({
      url: `${baseUrl}/${postDate.getFullYear()}/${
        postDate.getMonth() + 1
      }/${postDate.getDate()}/${post.slug}`,
      lastModified: new Date(post.modified),
    });
  }

  for (const category of categoriesResponse.categories) {
    sitemapEntries.push({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(),
    });
  }
  for (const tag of tagsResponse.tags) {
    sitemapEntries.push({
      url: `${baseUrl}/tag/${tag.slug}`,
      lastModified: new Date(),
    });
  }

  return sitemapEntries;
}
