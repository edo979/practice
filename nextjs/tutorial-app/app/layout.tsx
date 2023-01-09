import Link from 'next/link'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <nav className="w-full flex gap-4 p-4 bg-container">
          <Link href={'/'}>Home</Link>
          <Link href={'blog'}>Blog</Link>
        </nav>

        <div className="container grid grid-cols-3 gap-4 mx-auto">
          {children}
          <section className="bg-container">sidebar</section>
        </div>

        <footer className="w-full bg-container">Footer</footer>
      </body>
    </html>
  )
}
