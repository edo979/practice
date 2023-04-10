import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import postsReducer from '../features/blog/postsSlice'

const store = configureStore({
  reducer: {
    counter: counterSlice,
    posts: postsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
