import { WpSdk } from "@/utils/wp-sdk";
import type { Metadata } from "next/types";
import { PostDates } from "@/components/PostDates";
import Link from "next/link";
import { PostInfo } from "@/components/PostInfo";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const [siteData, tag] = await Promise.all([
    WpSdk.getSiteData(),
    WpSdk.getTag(slug),
  ]);
  return {
    title: `${tag.name} | ${siteData.name}`,
    twitter: {
      card: "summary_large_image",
      title: `${tag.name} | ${siteData.name}`,
      description: tag.description,
    },
    openGraph: {
      title: `${tag.name} | ${siteData.name}`,
      description: tag.description,
    },
  };
}

export async function generateStaticParams() {
  const tagsList = await WpSdk.getCategories();

  return tagsList.categories.map((tag) => ({
    slug: tag.slug,
  }));
}

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [posts, tag] = await Promise.all([
    WpSdk.getPosts({ tag: slug }),
    WpSdk.getTag(slug),
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 border-b border-b-black pb-4">
        Tag: <br className="md:hidden" />
        {tag.name}
      </h1>
      <div className="flex flex-col">
        {posts.posts.map((post) => (
          <div key={post.ID} className="flex flex-col">
            <Link href={`/posts/${post.slug}`}>
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            </Link>
            <PostInfo post={post} />
            <span
              className="text-gray-500 mb-5"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
