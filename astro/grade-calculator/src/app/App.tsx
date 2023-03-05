import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ClassNumberRoute from './routes/ClassNumberRoute'
import IndexRoute from './routes/IndexRoute'
import StudentsRoute from './routes/StudentsRoute'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <IndexRoute />,
      children: [
        { index: true, element: <ClassNumberRoute /> },
        { path: '/imenik', element: <h1>Students</h1> },
      ],
    },
  ],
  {
    basename: '/razred',
  }
)

export default function App() {
  return <RouterProvider router={router} />
}
