export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="col-span-2">
      <header>
        <h1 className="text-2xl">Welcome to Blog</h1>
      </header>
      <main>{children}</main>
    </section>
  )
}
