import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import NewNote, {
  action as createNoteAction,
  loader as tagsLoader,
} from './NewNote'
import NoteList, { loadar as noteLoader } from './NoteList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <NoteList />,
        loader: noteLoader,
      },
      {
        path: 'new',
        element: <NewNote />,
        action: createNoteAction,
        loader: tagsLoader,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
