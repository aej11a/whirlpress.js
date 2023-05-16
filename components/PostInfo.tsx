import { Post } from "@/utils/wp-types/posts";
import { PostDates } from "./PostDates";

export const PostInfo = ({ post }: { post: Post }) => (
  <>
    <div className="hidden md:block mb-2">
      <p className="inline mr-1">
        By {post.author.name || post.author.nice_name} &#183;
      </p>
      <PostDates date={new Date(post.date)} inline />
    </div>
    <div className="block md:hidden">
      <p className="mb-[4px]">By {post.author.name || post.author.nice_name}</p>
      <div className="mb-2">
        <PostDates date={new Date(post.date)} inline />
      </div>
    </div>
  </>
);
