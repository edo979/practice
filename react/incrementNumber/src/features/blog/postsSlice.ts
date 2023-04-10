import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'

type PostT = {
  id: string
  title: string
  content: string
}

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action: PayloadAction<PostT>) => {
      state.push(action.payload)
    },
    postUpdated: (state, action: PayloadAction<PostT>) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        ;(existingPost.title = title), (existingPost.content = content)
      }
    },
  },
})

export const selectPosts = (state: RootState) => state.posts
export const selectPost = (postId: string) => (state: RootState) =>
  state.posts.find((post) => post.id === postId)
export const { postAdded, postUpdated } = postSlice.actions

export default postSlice.reducer
