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
import AdminRoot from './routes/Admin/AdminRoot.jsx'
import ProductsList from './routes/Admin/ProductsList.jsx'
import AddProduct, {
  action as addProductAction,
} from './routes/Admin/AddProduct.jsx'
import EditProduct, {
  action as editProductAction,
} from './routes/Admin/EditProduct.jsx'
import { action as deleteAction } from './routes/Admin/DeleteProduct'
import SignUp, { action as signupAction } from './routes/SignUp.jsx'
import SignIn, { action as signinAction } from './routes/SignIn.jsx'
import AdminRoute, { loader as adminLoader } from './components/AdminRoute.jsx'
import PrivateRoute, {
  loader as userLoader,
} from './components/PrivateRoute.jsx'
import UserProfile from './routes/User/UserProfile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Root />, loader: productsLoader },
      { path: 'signin', element: <SignIn />, action: signinAction },
      { path: 'signup', element: <SignUp />, action: signupAction },
      { path: 'product/:id', element: <Product />, loader: productLoader },
      // Admin
      {
        path: 'admin',
        element: <AdminRoute />,
        loader: adminLoader,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AdminRoot />,
          },
          {
            path: '',
            errorElement: <ErrorPage />,
            children: [
              // Products:
              {
                path: 'productslist',
                children: [
                  {
                    index: true,
                    element: <ProductsList />,
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
      // User
      {
        path: 'me',
        element: <PrivateRoute />,
        loader: userLoader,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },
          //{errorElement: <ErrorPage />, children [{}]}
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
