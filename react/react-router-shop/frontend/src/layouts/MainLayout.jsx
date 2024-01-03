import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <>
      <header className="container">
        <div className="row">
          <Navbar />
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
