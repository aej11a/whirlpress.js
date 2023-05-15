import { ClassificationLinks } from "@/components/ClassificationLinks";
import { PostDates } from "@/components/PostDates";
import { WpSdk } from "@/utils/wp-sdk";

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await WpSdk.getPostBySlug(slug);
  const date = new Date(post.date);
  const modified = new Date(post.modified);
  return (
    <article>
      <h1 className="text-4xl font-bold mb-4 border-b border-b-black pb-4">
        {post.title}
      </h1>
      <p className="author">By {post.author.name || post.author.nice_name}</p>
      <PostDates date={date} modified={modified} />
      <div
        dangerouslySetInnerHTML={{
          __html: post.content.replaceAll("\n\n\n", "<br/>"),
        }}
      />
      <ClassificationLinks
        categories={Object.values(post.categories)}
        tags={Object.values(post.tags)}
      />
    </article>
  );
}
