import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ClassNumberRoute from './routes/ClassNumberRoute'
import IndexRoute from './routes/IndexRoute'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <IndexRoute />,
      children: [{ index: true, element: <ClassNumberRoute /> }],
    },
  ],
  {
    basename: '/razred',
  }
)

export default function App() {
  return <RouterProvider router={router} />
}
