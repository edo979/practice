import React from 'react'
import ReactDOM from 'react-dom/client'
import './db/init.js'
import App from './App.jsx'
// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
