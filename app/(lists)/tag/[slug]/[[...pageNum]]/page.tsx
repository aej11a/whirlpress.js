import { WpSdk } from "@/utils/wp-sdk";
import type { Metadata } from "next/types";
import { PostsList } from "@/app/(lists)/PostsList";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; pageNum: string };
}): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const pageNum = parseInt(params.pageNum);
  const [siteData, tag] = await Promise.all([
    WpSdk.getSiteData,
    WpSdk.getTag(slug),
  ]);
  return {
    title: `${tag.name} | ${pageNum} | ${siteData.name}`,
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
  const categoriesList = await WpSdk.getCategories();

  return categoriesList.categories.map((tag) => ({
    slug: tag.slug,
  }));
}

export default async function tag({
  params,
}: {
  params: { slug: string; pageNum?: string[] };
}) {
  let pageNumber = 1;
  if (params.pageNum) {
    if (params.pageNum.length > 1) notFound();
    else if (params.pageNum[0] === "1") redirect(`/category/${params.slug}`);
    else pageNumber = parseInt(params.pageNum[0]);
  }

  const { slug } = params;

  const [posts, tag] = await Promise.all([
    WpSdk.getPosts({ tag: slug, currentPage: pageNumber }),
    WpSdk.getTag(slug),
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 border-b border-b-black pb-4">
        Tag: <br className="md:hidden" />
        {tag.name}
      </h1>
      <PostsList
        slug={slug}
        posts={posts.posts}
        currentPage={pageNumber}
        pageSize={WpSdk.PAGE_SIZE}
        totalResults={posts.found}
        pageType="tag"
      />
    </div>
  );
}
