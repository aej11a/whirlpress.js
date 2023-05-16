import { WpSdk } from "@/utils/wp-sdk";
import type { Metadata } from "next/types";
import { generatePostMetadata } from "@/app/(post)/generatePostMetadata";
import { DisplayPost } from "../../post";

type PageParams = { slug: string };

export async function generateMetadata(
  { params }: { params: PageParams }
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return generatePostMetadata(slug);
}

export async function generateStaticParams() {
  const tagsList = await WpSdk.getPosts();

  return tagsList.posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await WpSdk.getPostBySlug(slug);

  return <DisplayPost post={post} />;
}
