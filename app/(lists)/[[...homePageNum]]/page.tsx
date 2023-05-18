import { WpSdk } from "@/utils/wp-sdk";
import { notFound, redirect } from "next/navigation";
import { PostsList } from "../PostsList";

export default async function Home({
  params,
}: {
  params: { homePageNum?: string[] };
}) {
  let pageNumber = 1;
  if (params.homePageNum?.length) {
    if (
      params.homePageNum[0] !== "page" || // first param must be "page"
      isNaN(parseInt(params.homePageNum[1])) || // second param must be a number
      params.homePageNum.length > 2 // there can't be more than 2 params
    ) {
      notFound();
    } else if (params.homePageNum[1] === "1") {
      redirect("/");
    } else {
      pageNumber = parseInt(params.homePageNum[1]);
    }
  }
  const postsResponse = await WpSdk.getPosts({
    currentPage: pageNumber,
  });
  return (
    <main className="flex min-h-screen flex-col">
      <PostsList
        posts={postsResponse.posts}
        totalResults={postsResponse.found}
        currentPage={pageNumber}
        pageSize={WpSdk.PAGE_SIZE}
        pageType="home"
      />
    </main>
  );
}
