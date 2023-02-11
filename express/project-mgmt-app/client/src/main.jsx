import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Root from './pages/Root'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home1'
import { loader as homeLoader } from './pages/Home1'
import Project, { loader as projectLoader } from './pages/Project'
import { action as addClientAction } from './components/AddClient1'
import { action as clientDeleteAction } from './pages/Home1'
import './index.css'

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
        action: clientDeleteAction,
      },
      {
        path: 'projects/:projectId',
        element: <Project />,
        loader: projectLoader,
      },
      { path: 'addClient', action: addClientAction },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
