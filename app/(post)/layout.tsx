export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div style={{ flex: 2 }}>{children}</div>
      <div style={{ flex: 1 }}></div>
    </div>
  );
}
