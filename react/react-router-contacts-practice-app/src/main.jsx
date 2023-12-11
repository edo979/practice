import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserContextProvider } from './context/userContext'
import Root from './routes/Root'
import ErrorPage from './error-page'
import SignIn from './routes/auth/SignIn'
import Register from './routes/auth/Register'
import Contacts, {
  loader as contactsLoader,
  action as contactsAction,
} from './routes/auth/Contacts'
import AuthIndexRoute from './routes/auth/AuthIndexRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  { path: '/register', element: <Register /> },
  { path: '/signin', element: <SignIn /> },
  {
    path: '/auth',
    children: [
      {
        index: true,
        element: <AuthIndexRoute />,
      },
      {
        path: 'my_contacts',
        element: <Contacts />,
        loader: contactsLoader,
        action: contactsAction,
        children: [
          {
            path: ':contactId',
            element: <p>single contact</p>,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
)
