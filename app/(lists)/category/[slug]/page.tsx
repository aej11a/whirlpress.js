import { WpSdk } from "@/utils/wp-sdk";
import type { Metadata } from "next/types";
import Link from "next/link";
import { PostInfo } from "@/components/PostInfo";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const [siteData, category] = await Promise.all([
    WpSdk.getSiteData,
    WpSdk.getCategory(slug),
  ]);
  return {
    title: `${category.name} | ${siteData.name}`,
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | ${siteData.name}`,
      description: category.description,
    },
    openGraph: {
      title: `${category.name} | ${siteData.name}`,
      description: category.description,
    },
  };
}

export async function generateStaticParams() {
  const categoriesList = await WpSdk.getCategories();

  return categoriesList.categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [posts, category] = await Promise.all([
    WpSdk.getPosts({ category: slug }),
    WpSdk.getCategory(slug),
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 border-b border-b-black pb-4">
        Category: <br className="md:hidden" />
        {category.name}
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
