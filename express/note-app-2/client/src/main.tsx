import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ComponentErrorPage from './routes/ComponentErrorPage'
import ErrorPage from './routes/ErrorPage'
import Home, { loader as homeLoader } from './routes/Home'
import DeleteNote, {
  action as deleteNoteAction,
} from './routes/notes/DeleteNote'
import EditNote, {
  loader as editNoteLoader,
  action as editNoteAction,
} from './routes/notes/EditNote'
import NewNote, {
  loader as tagsLoader,
  action as newNoteAction,
} from './routes/notes/NewNote'
import Note, { loader as noteLoader } from './routes/notes/Note'
import NotesList, { loader as notesLoader } from './routes/notes/NotesList'
import Dashboard from './routes/user/Dashboard'
import Login, { action as loginAction } from './routes/user/Login'
import Register, { action as registerAction } from './routes/user/Register'
import UserProfile from './routes/user/UserProfile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home />, loader: homeLoader }],
  },
  { path: '/login', element: <Login />, action: loginAction },
  { path: '/register', element: <Register />, action: registerAction },
  {
    path: '/user/dashboard',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ComponentErrorPage />,
        children: [
          {
            index: true,
            element: <NotesList />,
            loader: notesLoader,
          },
          {
            path: 'notes/new',
            element: <NewNote />,
            loader: tagsLoader,
            action: newNoteAction,
          },
          {
            path: 'notes/:noteId',
            element: <Note />,
            loader: noteLoader,
          },
          {
            path: 'notes/:noteId/edit',
            element: <EditNote />,
            loader: editNoteLoader,
            action: editNoteAction,
          },
          {
            path: 'notes/:noteId/delete',
            element: <DeleteNote />,
            action: deleteNoteAction,
          },
          { path: 'profile', element: <UserProfile /> },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
