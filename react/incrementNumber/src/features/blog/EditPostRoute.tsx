import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postUpdated, selectPost } from './postsSlice'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'

export const loader: LoaderFunction = async ({ params }) => {
  const postId = params.postId
  return postId
}

export const EditPostForm = () => {
  const postId = useLoaderData() as string
  const post = useSelector(selectPost(postId))
  const navigate = useNavigate()

  if (!post) return <h2>Post not found</h2>

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      navigate('..')
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}
