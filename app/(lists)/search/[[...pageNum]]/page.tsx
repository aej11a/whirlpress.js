import { WpSdk } from "@/utils/wp-sdk";
import { notFound, redirect } from "next/navigation";
import { PostsList } from "@/app/(lists)/PostsList";

export default async function SearchResults({
  params,
  searchParams,
}: {
  params: { pageNum?: string[] };
  searchParams: { s: string };
}) {
  const { s: searchTerm } = searchParams;

  let pageNumber = 1;
  if (params.pageNum) {
    if (params.pageNum.length > 1) notFound();
    else if (params.pageNum[0] === "1") redirect(`/search?s=${searchTerm}`);
    else pageNumber = parseInt(params.pageNum[0]);
  }

  const posts = await WpSdk.getPosts({
    search: searchTerm,
    currentPage: pageNumber,
  });

  return (
    <div className="inline">
      <h1 className="text-4xl font-bold mb-8 border-b border-b-black pb-4">
        Results for
        <br className="md:hidden" />
        &nbsp;&quot;{searchTerm}&quot;
      </h1>
      <PostsList
        searchTerm={searchTerm}
        posts={posts.posts}
        currentPage={pageNumber}
        pageSize={WpSdk.PAGE_SIZE}
        totalResults={posts.found}
        pageType="search"
      />
    </div>
  );
}
