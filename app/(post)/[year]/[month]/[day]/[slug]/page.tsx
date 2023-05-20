import { generatePostMetadata } from "@/app/(post)/generatePostMetadata";
import { DisplayPost } from "@/app/(post)/post";
import { WpSdk } from "@/utils/wp-sdk";
import { redirect } from "next/navigation";
import type { Metadata } from "next/types";

type PageParams = { year: string; month: string; day: string; slug: string };

export async function generateMetadata(
  { params }: { params: PageParams }
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return generatePostMetadata(slug);
}

export async function generateStaticParams() {
  const postsList = await WpSdk.getPosts();

  return postsList.posts.map((post) => ({
    slug: post.slug,
    year: new Date(post.date).getFullYear().toString(),
    month: (new Date(post.date).getMonth() + 1).toString(),
    day: new Date(post.date).getDate().toString(),
  }));
}

export default async function Post({ params }: { params: PageParams }) {
  const { slug } = params;
  const post = await WpSdk.getPostBySlug(slug);
  const date = new Date(post.date);

  // check if the post date matches the url, if not redirect to the correct url
  if (
    date.getFullYear() !== Number(params.year) ||
    date.getMonth() + 1 !== Number(params.month) ||
    date.getDate() !== Number(params.day)
  ) {
    redirect(`/posts/${post.slug}`);
  }

  return <DisplayPost post={post} />;
}
