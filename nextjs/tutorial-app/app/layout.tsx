import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Navbar />

        <div className="container mx-auto p-4 sm:p-0">{children}</div>

        <Footer />
      </body>
    </html>
  )
}
