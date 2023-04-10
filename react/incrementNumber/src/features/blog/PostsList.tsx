import { selectPosts } from './postsSlice'
import { useAppSelector } from '../../store/hooks'
import { Link } from 'react-router-dom'

const PostsList = () => {
  const posts = useAppSelector(selectPosts)

  return (
    <section>
      <h2>Posts</h2>

      {posts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <Link to={`${post.id}`}>View post</Link>
        </article>
      ))}
    </section>
  )
}
export default PostsList
