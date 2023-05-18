import { WpSdk } from "@/utils/wp-sdk";
import type { Metadata } from "next/types";
import { PostsList } from "@/app/(lists)/PostsList";
import { notFound, redirect } from "next/navigation";

type TagPagesParams = { slug: string; pageNum?: string[] };

export async function generateMetadata({
  params,
}: {
  params: TagPagesParams;
}): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const pageNum = params.pageNum ? parseInt(params.pageNum[0]) : 1;
  const [siteData, tag] = await Promise.all([
    WpSdk.getSiteData(),
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
  const tagPagesParams: TagPagesParams[] = [];
  const firstListOfTags = await WpSdk.getTags();
  const tagPromises = firstListOfTags.tags.map(
    async (tag) => {
      console.log("TAGGGGGG", tag)
      // get the posts for this tag and use .found to calculate the number of pages
      const tagPosts = await WpSdk.getPosts({ tag: tag.slug });
      const numberOfPages = Math.ceil(tagPosts.found / WpSdk.PAGE_SIZE);
      // add a page for each page of posts
      for (let i = 1; i <= numberOfPages; i++) {
        tagPagesParams.push({
          slug: tag.slug,
          pageNum: i === 1 ? undefined : [i.toString()],
        });
      }
    }
  );

  await Promise.all(tagPromises);
  console.log(tagPagesParams)
  return tagPagesParams;
}

export default async function tag({ params }: { params: TagPagesParams }) {
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
