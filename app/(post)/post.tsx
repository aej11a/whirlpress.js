import { ClassificationLinks } from "@/components/ClassificationLinks";
import { PostDates } from "@/components/PostDates";
import { PostJsonLd } from "@/components/PostJsonLd";
import { Post } from "@/utils/wp-types/posts";
import Head from "next/head";

export const DisplayPost = ({ post }: { post: Post }) => {
  const postDate = new Date(post.date);
  return (
    <article>
      <Head>
        <link
          key="canonical"
          rel="canonical"
          href={`${postDate.getFullYear()}/${
            postDate.getMonth() + 1
          }/${postDate.getDate()}/${post.slug}`}
        />
      </Head>
      <h1 className="text-4xl font-bold mb-4 border-b border-b-black pb-4">
        {post.title}
      </h1>
      <p className="author">By {post.author.name || post.author.nice_name}</p>
      <PostDates date={postDate} modified={new Date(post.modified)} />
      <div
        dangerouslySetInnerHTML={{
          __html: post.content.replaceAll("\n\n\n", "<br/>"),
        }}
      />
      <ClassificationLinks
        categories={Object.values(post.categories)}
        tags={Object.values(post.tags)}
      />
      <PostJsonLd post={post} />
    </article>
  );
};
