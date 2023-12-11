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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  { path: '/register', element: <Register /> },
  { path: '/signin', element: <SignIn /> },
  {
    //Protected route because loader below
    path: '/my_contacts',
    element: <Contacts />,
    loader: contactsLoader,
    action: contactsAction,
    children: [
      {
        index: true,
        element: <p>Pick contact from left</p>,
      },
      {
        path: ':contactIs',
        element: <p>Single contacts</p>,
      },
      {
        path: ':contactIs/edit',
        element: <p>Updata single contac</p>,
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
