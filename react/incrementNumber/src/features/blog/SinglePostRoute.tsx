import { Link, LoaderFunction, useLoaderData } from 'react-router-dom'
import { selectPost } from './postsSlice'
import { useSelector } from 'react-redux'
import { PostAuthor } from './PostAuthor'

export const loader: LoaderFunction = async ({ params }) => {
  const postId = params.postId
  return postId
}

const SinglePostRoute = () => {
  const postId = useLoaderData() as string
  const post = useSelector(selectPost(postId))

  if (!post)
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )

  return (
    <article>
      <PostAuthor userId="0" />
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`edit`}>Edit</Link>
    </article>
  )
}
export default SinglePostRoute
