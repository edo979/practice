import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserContextProvider } from './context/userContext'
import './db/firebaseInit'
import Root from './routes/Root'
import ErrorPage from './error-page'
import SignIn from './routes/auth/SignIn'
import Register from './routes/auth/Register'
import Contacts, {
  loader as contactsLoader,
  action as contactsAction,
} from './routes/auth/Contacts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  { path: '/auth/register', element: <Register /> },
  { path: '/auth/signin', element: <SignIn /> },
  {
    path: '/auth/my_contacts',
    element: <Contacts />,
    loader: contactsLoader,
    action: contactsAction,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
)
