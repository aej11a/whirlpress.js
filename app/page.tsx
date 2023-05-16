import { PostInfo } from "@/components/PostInfo";
import { WpSdk } from "@/utils/wp-sdk";
import Link from "next/link";

export default async function Home() {
  const postsResponse = await WpSdk.getPosts();
  return (
    <main className="flex min-h-screen flex-col">
      {postsResponse.posts.map((post) => (
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
    </main>
  );
}
