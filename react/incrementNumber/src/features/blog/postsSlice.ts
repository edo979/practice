import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (
      state,
      action: PayloadAction<{ id: string; title: string; content: string }>
    ) => {
      state.push(action.payload)
    },
  },
})

export const selectPosts = (state: RootState) => state.posts
export const { postAdded } = postSlice.actions

export default postSlice.reducer
