/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setNotification } from '../notification/notificationSlice'

const baseUrl = process.env.REACT_APP_BASE_URL

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ username, name, password }, thunkAPI) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await axios.post(
        `${baseUrl}/users/register`,
        {
          username,
          name,
          password,
        },
        config
      )
      let data = response.data
      if (response.status === 201) {
        thunkAPI.dispatch(
          setNotification(`${data.name} successfully ${response.statusText}`)
        )
        return { ...data, name: name }
      }
    } catch (error) {
      console.log(error.response.data.error)
      thunkAPI.dispatch(setNotification(`${error.response.data.error}`))
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)
export const userLogin = createAsyncThunk(
  'user/login',
  async ({ username, password }, thunkAPI) => {
    const config = { headers: { 'Content-Type': 'application/json' } }
    try {
      const response = await axios.post(
        `${baseUrl}/login`,
        {
          username,
          password,
        },
        config
      )
      let data = response.data
      console.log(response)
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('user', JSON.stringify(data))
        thunkAPI.dispatch(setNotification(data.message))
        return { ...data }
      }
    } catch (error) {
      thunkAPI.dispatch(setNotification(`${error.response.data.error}`))
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)
export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }
    try {
      const response = await axios.get(`${baseUrl}/users/${id}`, config)
      const data = response.data
      if (response.status === 200) {
        return data
      }
    } catch (error) {
      thunkAPI.dispatch(setNotification(error.response.data.error))
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)

const initialState = {
  token: '',
  username: '',
  name: '',
  id: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  isLoggedIn: false,
  user: {},
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: {
      reducer: (state, action) => {
        //console.log("STATE", state);
        state.isError = false
        state.isSuccess = false
        state.isFetching = false
        state.errorMessage = ''
        return state
      },
    },
    logout: {
      reducer: (state, action) => {
        //console.warn("ACTION-TYPE", action.type);
        state = undefined
        localStorage.clear()
        return state
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        //console.log("Fulfilled", action);
        state.isFetching = false
        state.isSuccess = true
        //state.username = action.payload.username;
        state.name = action.payload.name
        state.isLoggedIn = false
      })
      .addCase(userRegister.pending, (state, action) => {
        //console.log("Pending", action);
        state.isFetching = true
        state.isLoggedIn = false
      })
      .addCase(userRegister.rejected, (state, action) => {
        //console.log("Rejected", action.payload);
        state.isError = true
        state.isFetching = false
        state.errorMessage = action.payload
        state.isLoggedIn = false
        state.name = ''
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isFetching = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.username = action.payload.username
        state.name = action.payload.name
        state.id = action.payload.id
        state.token = action.payload.token
      })
      .addCase(userLogin.pending, (state, action) => {
        state.isFetching = true
        state.isLoggedIn = false
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isError = true
        state.isFetching = false
        state.errorMessage = action.payload
        state.isLoggedIn = false
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload
        state.isFetching = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(getUserById.pending, (state, action) => {
        state.isFetching = true
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.errorMessage = action.payload
        state.isSuccess = false
      })
  },
})
export default userSlice.reducer
export const { clearState, logout } = userSlice.actions
export const userSelector = (state) => state.user
export const userIdSelector = (state) => state.user.id
