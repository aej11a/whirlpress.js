import { Post } from "@/utils/wp-types/posts";
import { BlogPosting, WithContext } from "schema-dts";

export const PostJsonLd: React.FC<{ post: Post }> = ({ post }) => {
  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.URL,
    },
    headline: post.title,
    datePublished: post.date,
    dateModified: post.modified
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
