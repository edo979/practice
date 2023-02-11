import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}
