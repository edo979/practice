import { LoaderFunction } from 'react-router-dom'

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/user`, {
    method: 'GET',
    redirect: 'follow',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Must be loged in')
  return null
}

export default function Dashboard() {
  return <div>Dashboard</div>
}
