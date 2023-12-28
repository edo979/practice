import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <header>
        <h1>Shopping app</h1>
      </header>
      <main className="container py-3">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
