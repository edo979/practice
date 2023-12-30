import React from 'react'
import ReactDOM from 'react-dom/client'
import './db/init.js'

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { loader as rootPageLoader } from './routes/root.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Product, { loader as productLoader } from './routes/Product.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import ProductList from './routes/Admin/ProductList.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Root />, loader: rootPageLoader },
      { path: 'product/:id', element: <Product />, loader: productLoader },
      {
        path: 'admin',
        element: <AdminRoute />,
        errorElement: <ErrorPage />,
        children: [{ path: 'productlist', element: <ProductList /> }],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
