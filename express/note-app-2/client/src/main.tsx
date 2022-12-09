import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './routes/Home'
import Dashboard, { loader as dashboardLoader } from './routes/user/Dashboard'
import Login, { action as loginAction } from './routes/user/Login'
import Register from './routes/user/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: '/login', element: <Login />, action: loginAction },
  { path: '/register', element: <Register /> },
  { path: '/user/notes', element: <Dashboard />, loader: dashboardLoader },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
