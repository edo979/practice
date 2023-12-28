import React from 'react'
import ReactDOM from 'react-dom/client'
import './db/init.js'

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { loader as rootPageLoader } from './routes/root.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Root />, loader: rootPageLoader }],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
