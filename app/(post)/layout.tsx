export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block lg:flex">
      <div className="lg:w-3/4">{children}</div>
      <div className="lg:w-1/4"></div>
    </div>
  );
}
