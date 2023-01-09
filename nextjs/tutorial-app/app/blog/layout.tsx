export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>
        <h1>Welcome to Blog</h1>
      </header>
      <main>{children}</main>
    </>
  )
}
