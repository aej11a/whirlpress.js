import { WpSdk } from "@/utils/wp-sdk";
import Link from "next/link"

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [posts, tag] = await Promise.all([
    WpSdk.getPosts({ tag: slug }),
    WpSdk.getTag(slug),
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 border-b border-b-black pb-4">
        Tag: {tag.name}
      </h1>
      <div className="flex flex-col">
        {posts.posts.map((post) => (
          <div key={post.ID} className="flex flex-col">
            <Link href={`/posts/${post.slug}`}>
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            </Link>
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

// render the date with styles, and the modified date if it's not the same
const PostDates = ({ date, modified }: { date: Date; modified: Date }) => (
  <div className="text-gray-500 mb-5">
    <span className="mr-2">
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
    {date.getTime() !== modified.getTime() && (
      <span className="mr-2 italic">
        (modified{" "}
        {modified.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        )
      </span>
    )}
  </div>
);
