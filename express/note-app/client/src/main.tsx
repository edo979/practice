import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'
import ErrorPage from './routes/ErrorPage'
import Home, { loader as homeLoader } from './routes/Home'
import NewNote, {
  action as newNoteAction,
  loader as newNoteLoader,
} from './routes/NewNote'
import Note, { loader as noteLoader } from './routes/Note'
import DeleteNote, { action as deleteNoteAction } from './routes/DeleteNote'
import Tags, { loader as tagLoader, action as tagAction } from './routes/Tags'
import EditNote, {
  loader as editNoteLoader,
  action as editNoteAction,
} from './routes/EditNote'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: 'notes/new',
        element: <NewNote />,
        action: newNoteAction,
        loader: newNoteLoader,
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
      {
        path: 'tags',
        element: <Tags />,
        loader: tagLoader,
        action: tagAction,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
