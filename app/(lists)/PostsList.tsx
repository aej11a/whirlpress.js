import { PostInfo } from "@/components/PostInfo";
import { Post } from "@/utils/wp-types/posts";
import Link from "next/link";

interface PostsListCommon {
  posts: Post[];
  totalResults: number;
  currentPage: number;
  pageSize: number;
}

interface PostsListHome extends PostsListCommon {
  pageType: "home";
  slug?: never;
  searchTerm?: never;
}
interface PostsListCategory extends PostsListCommon {
  pageType: "category";
  slug: string;
  searchTerm?: never;
}
interface PostsListTag extends PostsListCommon {
  pageType: "tag";
  slug: string;
  searchTerm?: never;
}
interface PostsListSearch extends PostsListCommon {
  pageType: "search";
  slug?: never;
  searchTerm: string;
}
type PostsListProps =
  | PostsListHome
  | PostsListCategory
  | PostsListTag
  | PostsListSearch;

export const PostsList = (props: PostsListProps) => {
  const {
    slug,
    searchTerm,
    posts,
    totalResults,
    currentPage,
    pageSize,
    pageType,
  } = props;
  const getPrevUrl = () => {
    if (pageType === "home") {
      return currentPage === 2 ? "/" : `/page/${currentPage - 1}`;
    }
    if (pageType === "search") {
      return `/search/${
        currentPage === 2 ? "" : currentPage - 1
      }?s=${searchTerm}`;
    }
    return `/${pageType}/${slug}/${currentPage === 2 ? "" : currentPage - 1}`;
  };
  const getNextUrl = () => {
    if (pageType === "home") {
      return `/page/${currentPage + 1}`;
    }
    if (pageType === "search") {
      return `/search/${currentPage + 1}?s=${searchTerm}`;
    }
    return `/${pageType}/${slug}/${currentPage + 1}`;
  };
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <div key={post.ID} className="flex flex-col">
          <Link href={`/posts/${post.slug}`}>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
          </Link>
          <PostInfo post={post} />
          <span
            className="text-gray-700 mb-5"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        </div>
      ))}
      {/** pagination based on .found and current page */}
      {totalResults > pageSize && (
        <div className="flex justify-end">
          <>
            {currentPage > 1 && (
              <Link
                href={getPrevUrl()}
                className="underline underline-offset-[2px] decoration-dotted mr-2"
              >
                &larr; Previous
              </Link>
            )}
            {currentPage > 1 && totalResults > pageSize * currentPage && " | "}
            {totalResults > pageSize * currentPage && (
              <Link
                href={getNextUrl()}
                className="underline underline-offset-[2px] decoration-dotted ml-2"
              >
                Next &rarr;
              </Link>
            )}
          </>
        </div>
      )}
    </div>
  );
};
