import { PostCategory, PostTag } from "@/utils/wp-types/posts";
import Link from "next/link";

export const ClassificationLinks = ({
  categories,
  tags,
}: {
  categories: PostCategory[];
  tags: PostTag[];
}) => (
  <div className="my-8">
    <span className="mr-8">
      {categories.map((postCategory, idx) => (
        <Link
          key={postCategory.ID}
          href={`/category/${postCategory.slug}`}
          className="mr-1 underline decoration-dotted font-light italic underline-offset-2"
        >
          {postCategory.name}
          {idx !== categories.length - 1 && ","}
        </Link>
      ))}
    </span>
    <span>
      {tags.map((postTag, idx) => (
        <Link
          key={postTag.ID}
          href={`/tag/${postTag.slug}`}
          className="mr-1 underline decoration-dotted font-light italic underline-offset-2"
        >
          {postTag.name}
          {idx !== tags.length - 1 && ","}
        </Link>
      ))}
    </span>
  </div>
);
