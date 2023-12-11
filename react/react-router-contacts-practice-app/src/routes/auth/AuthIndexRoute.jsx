import { Outlet, redirect, useLoaderData } from 'react-router-dom'
import { auth } from '../../db/firebaseInit'

export async function loader() {
  await auth.authStateReady()
  const userId = auth.currentUser.uid

  if (!userId) return redirect('/signin')
}

const AuthIndexRoute = () => {
  return (
    <div>
      <p>Auth</p>
      <p>{userId}</p>
      <Outlet />
    </div>
  )
}

export default AuthIndexRoute
