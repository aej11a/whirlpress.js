import { WpSdk } from "@/utils/wp-sdk";

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await WpSdk.getPostBySlug(slug);
  return <div>{JSON.stringify(slug)}</div>;
}
