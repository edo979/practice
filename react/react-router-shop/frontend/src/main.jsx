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
import PrivateRoute, { loader as userLoader } from './layouts/PrivateRoute.jsx'
import UserProfile from './routes/User/UserProfile.jsx'
import Cart, {
  action as cartAction,
  loader as cartLoader,
} from './routes/User/Cart.jsx'
import { action as deleteCartItemAction } from './routes/User/CartDeleteItem.jsx'
import Orders, { loader as ordersLoader } from './routes/User/Orders.jsx'
import CheckoutForm, {
  action as createOrderAction,
} from './routes/User/CheckoutForm.jsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Order, { loader as orderLoader } from './routes/User/Order.jsx'
import OrdersList, {
  loader as adminOrdersList,
} from './routes/Admin/OrdersList.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Root />,
        loader: productsLoader,
      },
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
              // Orders:
              {
                path: 'orderlist',
                element: <OrdersList />,
                loader: adminOrdersList,
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
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <UserProfile />,
              },
              {
                path: 'cart',
                element: <Cart />,
                action: cartAction,
                loader: cartLoader,
                children: [
                  {
                    path: 'items/delete',
                    action: deleteCartItemAction,
                  },
                ],
              },
              {
                path: 'orders',
                children: [
                  { index: true, element: <Orders />, loader: ordersLoader },
                  {
                    path: 'new',
                    element: <CheckoutForm />,
                    loader: cartLoader,
                    action: createOrderAction,
                  },
                  {
                    path: ':orderId',
                    element: <Order />,
                    loader: orderLoader,
                  },
                ],
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
    <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </React.StrictMode>
)
