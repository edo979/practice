export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="col-span-2">{children}</div>
}
