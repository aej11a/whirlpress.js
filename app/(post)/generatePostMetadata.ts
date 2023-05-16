import type { Metadata } from "next/types";
import { WpSdk } from "@/utils/wp-sdk";

export async function generatePostMetadata(slug: string): Promise<Metadata> {
  const [post, siteData] = await Promise.all([
    WpSdk.getPostBySlug(slug),
    WpSdk.getSiteData(),
  ]);

  return {
    title: post.title + " | " + siteData.name,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: post.author.name || post.author.nice_name,
      section: Object.values(post.categories)[0]?.name,
      tags: Object.values(post.tags).map((tag) => tag.name),
      images: [post.featured_image],
    },
  };
}
