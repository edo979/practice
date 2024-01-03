import React from 'react'
import ReactDOM from 'react-dom/client'
import './db/init.js'
import './index.css'

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
import EditProduct, {
  action as editProductAction,
} from './routes/Admin/EditProduct.jsx'
import { action as deleteAction } from './routes/Admin/DeleteProduct'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Root />, loader: productsLoader },
      { path: 'product/:id', element: <Product />, loader: productLoader },
      {
        path: 'admin',
        element: <AdminRoute />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <h1>Welcome Admin</h1>,
          },
          // Products:
          {
            path: 'productlist',
            children: [
              {
                index: true,
                element: <ProductList />,
                loader: productsLoader,
              },
              {
                path: 'add',
                element: <AddProduct />,
                action: addProductAction,
              },
              {
                path: ':id/edit',
                element: <EditProduct />,
                loader: productLoader,
                action: editProductAction,
              },
              {
                path: ':id/delete',
                action: deleteAction,
              },
            ],
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
