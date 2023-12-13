import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserContextProvider } from './context/userContext'
import ErrorPage from './error-page'
import Root from './routes/Root'
import SignIn from './routes/SignIn'
import Register from './routes/Register'
import Contacts, {
  loader as contactsLoader,
  action as contactsAction,
} from './routes/auth/Contacts'
import EditContact from './routes/auth/EditContact'

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
        path: ':contactId/edit',
        element: <EditContact />,
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
