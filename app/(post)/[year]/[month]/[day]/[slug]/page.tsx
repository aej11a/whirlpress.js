import { ClassificationLinks } from "@/components/ClassificationLinks";
import { PostDates } from "@/components/PostDates";
import { WpSdk } from "@/utils/wp-sdk";
import { redirect } from "next/navigation";

export default async function Post({
  params,
}: {
  params: { year: string; month: string; day: string; slug: string };
}) {
  const { slug } = params;
  const post = await WpSdk.getPostBySlug(slug);
  const date = new Date(post.date);
  const modified = new Date(post.modified);

  // check if the post date matches the url, if not redirect to the correct url
  if (
    date.getFullYear() !== Number(params.year) ||
    date.getMonth() + 1 !== Number(params.month) ||
    date.getDate() !== Number(params.day)
  ) {
    redirect(`/posts/${post.slug}`);
  }

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
