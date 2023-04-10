import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'

const initialState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export const selectUsers = (state: RootState) => state.users
export const selectUser = (userId: string) => (state: RootState) =>
  state.users.find((user) => user.id === userId)

export default usersSlice.reducer
