import React from 'react'
import ReactDOM from 'react-dom/client'
import './db/init.js'

// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, { loader as productsLoader } from './routes/root.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Product, { loader as productLoader } from './routes/Product.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import ProductList from './routes/Admin/ProductList.jsx'
import AddProduct, {
  action as addProductAction,
} from './routes/Admin/AddProduct.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Root />, loader: productsLoader },
      { path: 'product/:id', element: <Product />, loader: productLoader },
      {
        path: '',
        element: <AdminRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'admin/productlist',
            element: <ProductList />,
            loader: productsLoader,
          },
          {
            path: 'admin/productlist/add',
            element: <AddProduct />,
            action: addProductAction,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
