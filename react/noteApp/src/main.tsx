import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import NewNote, {
  action as createNoteAction,
  loader as tagsLoader,
} from './NewNote'
import Note from './Note'
import NoteList, { loadar as noteLoader } from './NoteList'
import DeleteNote, { action as deleteNoteAction } from './DeleteNote'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <NoteList />,
        id: 'root',
        loader: noteLoader,
      },
      {
        path: 'new',
        element: <NewNote />,
        action: createNoteAction,
        loader: tagsLoader,
      },
      {
        path: ':noteId',
        element: <Note />,
      },
      {
        path: ':noteId/delete',
        action: deleteNoteAction,
        element: <DeleteNote />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
