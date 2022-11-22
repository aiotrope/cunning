/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersService from '../../services/users'

export const retrieveUsers = createAsyncThunk(
  'blogs/retrieve',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersService.getAll()
      console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)
const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  users: [],
}
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearState: {
      reducer: (state, action) => {
        state.isError = false
        state.isSuccess = false
        state.isFetching = false
        state.errorMessage = ''
        return state
      },
    },
    setUsers: {
      reducer: (state, action) => {
        console.log(action.payload)
        return action.payload
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(retrieveUsers.fulfilled, (state, action) => {
        console.log('Fetch All Users', action.payload)
        state.isError = false
        state.isFetching = false
        state.isLoggedIn = true
        state.users = action.payload
      })
      .addCase(retrieveUsers.pending, (state, action) => {
        state.isFetching = true
      })
      .addCase(retrieveUsers.rejected, (state, action) => {
        state.isFetching = false
        state.errorMessage = action.payload
      })
  },
})

export default usersSlice.reducer
export const { clearState, setUsers } = usersSlice.actions
export const usersSelector = (state) => state.users.users
