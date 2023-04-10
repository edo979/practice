import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store/store'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Counter from './features/incrementNumber/components/Counter'
import Root from './routes/Root'
import BlogLayout from './features/blog/BlogLayout'
import PostsList from './features/blog/PostsList'
import AddPostForm, {
  action as AddPostAction,
} from './features/blog/AddPostForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <h1>This is redux app!</h1>,
      },
      {
        path: 'increment',
        element: <Counter />,
      },
      {
        path: 'blog',
        element: <BlogLayout />,
        children: [
          {
            index: true,
            element: <PostsList />,
          },
          {
            path: 'add_post',
            element: <AddPostForm />,
            action: AddPostAction,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
