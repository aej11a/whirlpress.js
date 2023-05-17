import type { Metadata } from "next/types";
import { WpSdk } from "@/utils/wp-sdk";

export async function generatePostMetadata(slug: string): Promise<Metadata> {
  const [post, siteData] = await Promise.all([
    WpSdk.getPostBySlug(slug),
    WpSdk.getSiteData(),
  ]);

  const postDate = new Date(post.date);

  return {
    title: post.title + " | " + siteData.name,
    openGraph: {
      type: "article",
      title: post.title + " | " + siteData.name,
      description: post.excerpt,
      // we're using the native WP url structure as canonical
      url: `${postDate.getFullYear()}/${
        postDate.getMonth() + 1
      }/${postDate.getDate()}/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: post.author.name || post.author.nice_name,
      section: Object.values(post.categories)[0]?.name,
      tags: Object.values(post.tags).map((tag) => tag.name),
      images: [post.featured_image],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      card: "summary_large_image",
      site: "@",
      creator: "@",
      images: [post.featured_image],
    },
  };
}
