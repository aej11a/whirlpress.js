import { PostInfo } from "@/components/PostInfo";
import { WpSdk } from "@/utils/wp-sdk";
import Link from "next/link";

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { s: string };
}) {
  const { s: searchTerm } = searchParams;
  const posts = await WpSdk.getPosts({ search: searchTerm });

  return (
    <div className="inline">
      <h1 className="text-4xl font-bold mb-8 border-b border-b-black pb-4">
        Results for
        <br className="md:hidden" />
        &nbsp;&quot;{searchTerm}&quot;
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
