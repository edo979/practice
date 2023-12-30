import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <>
      <header className="container">
        <Navbar />
      </header>
      <main className="container py-5">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
