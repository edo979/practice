import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import ComponentErrorPage from './routes/ComponentErrorPage'
import ErrorPage from './routes/ErrorPage'
import Home from './routes/Home'
import NewNote, {
  loader as tagsLoader,
  action as newNoteAction,
} from './routes/notes/NewNote'
import Note, { loader as noteLoader } from './routes/notes/Note'
import NotesList, { loader as notesLoader } from './routes/notes/NotesList'
import Dashboard from './routes/user/Dashboard'
import Login, { action as loginAction } from './routes/user/Login'
import Register from './routes/user/Register'
import UserProfile from './routes/user/UserProfile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: '/login', element: <Login />, action: loginAction },
  { path: '/register', element: <Register /> },
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
