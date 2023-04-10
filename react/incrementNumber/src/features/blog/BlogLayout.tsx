import { Outlet } from 'react-router-dom'

const BlogLayout = () => {
  return (
    <div>
      <h1>Blog</h1>
      <Outlet />
    </div>
  )
}
export default BlogLayout
