export default function SingleBlogLayoutRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="mx-auto prose">{children}</main>
}
