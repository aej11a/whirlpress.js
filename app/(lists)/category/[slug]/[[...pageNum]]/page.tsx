import { WpSdk } from "@/utils/wp-sdk";
import type { Metadata } from "next/types";
import Link from "next/link";
import { PostInfo } from "@/components/PostInfo";
import { PostsList } from "@/app/(lists)/PostsList";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; pageNum?: string };
}): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const pageNum = params.pageNum ? parseInt(params.pageNum) : 1;
  const [siteData, category] = await Promise.all([
    WpSdk.getSiteData,
    WpSdk.getCategory(slug),
  ]);
  return {
    title: `${category.name} | ${pageNum} | ${siteData.name}`,
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
  params: { slug: string; pageNum?: string[] };
}) {
  const slug = params.slug;

  let pageNumber = 1;
  if (params.pageNum) {
    if (params.pageNum.length > 1) notFound();
    else if (params.pageNum[0] === "1") redirect(`/category/${slug}`);
    else pageNumber = parseInt(params.pageNum[0]);
  }

  const [posts, category] = await Promise.all([
    WpSdk.getPosts({ category: slug, currentPage: pageNumber }),
    WpSdk.getCategory(slug),
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 border-b border-b-black pb-4">
        Category: <br className="md:hidden" />
        {category.name}
      </h1>
      <PostsList
        slug={slug}
        posts={posts.posts}
        currentPage={pageNumber}
        pageSize={WpSdk.PAGE_SIZE}
        totalResults={posts.found}
        pageType="category"
      />
    </div>
  );
}
