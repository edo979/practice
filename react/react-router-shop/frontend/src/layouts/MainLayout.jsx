import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <>
      <header className="container">
        <Navbar />
      </header>
      <main className="container py-5">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
