import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import Root, { loader as rootLoader } from './routes/Root'
import SignIn, { action as signInAction } from './routes/SignIn'
import Register, { action as registerUserAction } from './routes/Register'
import Contacts, {
  loader as contactsLoader,
  action as contactsAction,
} from './routes/auth/Contacts'
import EditContact, { action as editAction } from './routes/auth/EditContact'
import Contact, {
  loader as contactLoader,
  action as favoriteAction,
} from './routes/auth/Contact'
import { action as destroyAction } from './routes/auth/DeleteContact'
import ContactsIndexRoute from './routes/auth/ContactsIndexRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
  },
  { path: '/register', element: <Register />, action: registerUserAction },
  {
    path: '/signin',
    element: <SignIn />,
    action: signInAction,
  },
  {
    //Protected route because loader below
    path: '/my_contacts',
    element: <Contacts />,
    loader: contactsLoader,
    action: contactsAction,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ContactsIndexRoute />,
      },
      {
        path: ':contactId',
        element: <Contact />,
        loader: contactLoader,
        action: favoriteAction,
      },
      {
        path: ':contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
        errorElement: <ErrorPage errorTitle="Contact edit error!" />,
      },
      {
        path: ':contactId/destroy',
        action: destroyAction,
        errorElement: <ErrorPage errorTitle="Contact delete error!" />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
