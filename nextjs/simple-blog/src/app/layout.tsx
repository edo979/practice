import Footer from '@/Components/Footer'
import Navigation from '@/Components/Navigation'
import SessionProviderComponents from '@/Components/SessionProviderComponents'
import './globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="container">
          <SessionProviderComponents>
            <Navigation />

            {children}

            <Footer />
          </SessionProviderComponents>
        </div>
      </body>
    </html>
  )
}
