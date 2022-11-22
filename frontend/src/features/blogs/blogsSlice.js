/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setNotification } from '../notification/notificationSlice'
import blogsService from '../../services/blogs'

// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BASE_URL
const initialState = {
  blog: {},
  blogs: [],
  isError: false,
  errorMessage: '',
  isSuccess: false,
  isFetching: false,
  likes: 0,
}

export const blogsCreate = createAsyncThunk(
  'blogs/create',
  async ({ title, author, url }, thunkAPI) => {
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
      const response = await axios.post(
        `${baseUrl}/blogs`,
        { title, author, url },
        config
      )
      const data = response.data
      if (response.status === 201) {
        thunkAPI.dispatch(setNotification(data.message))
        return { ...data }
      }
    } catch (error) {
      thunkAPI.dispatch(setNotification(error.response.data.error))
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)

export const blogsFetchAll = createAsyncThunk(
  'blogs/fetchAll',
  async (thunkAPI) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = user.token
    //console.log(user.token);
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await axios.get(`${baseUrl}/blogs`, config)
      const data = response.data
      if (response.status === 200) {
        //console.log(data);
        return data
      }
    } catch (error) {
      //console.log(error);
      thunkAPI.dispatch(setNotification(`${error.response.data.error}`))
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)

export const blogFetchById = createAsyncThunk(
  'blogs/fetchById',
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
      const response = await axios.get(`${baseUrl}/blogs/${id}`, config)
      const data = response.data
      if (response.status === 200) {
        return data
      }
    } catch (error) {
      console.log(error.response)
      thunkAPI.dispatch(setNotification(`${error.response.data.error}`))
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
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
      const response = await axios.delete(`${baseUrl}/blogs/${id}`, config)
      const data = response.data
      if (response.status === 200) {
        thunkAPI.dispatch(setNotification(data.message))
      }
    } catch (error) {
      thunkAPI.dispatch(setNotification(`${error.response.data.error}`))
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearState: {
      reducer: (state, action) => {
        //console.log("STATE", state);
        state.isError = null
        state.isSuccess = null
        state.isFetching = null
        state.errorMessage = ''
        return state
      },
    },
    incrementLikes: {
      reducer: (state, action) => {
        console.log(action.id)
        const id = action.payload.id
        const blogToChange = state.blogs.find((b) => b.id === id)

        const changeBlog = {
          ...blogToChange,
          likes: blogToChange.likes + 1,
        }

        return state.blogs.map((b) => (b.id !== id ? b : changeBlog))
      },
      prepare: (id) => {
        return { payload: { id } }
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(blogsCreate.fulfilled, (state, action) => {
        //console.log("BLOG CREATE FULFILLED", action);
        state.blogs.push(action.payload)
        state.isFetching = false
        state.isError = false
        state.isSuccess = true
      })
      .addCase(blogsCreate.pending, (state, action) => {
        state.isFetching = true
        state.isSuccess = false
      })
      .addCase(blogsCreate.rejected, (state, action) => {
        state.isFetching = false
        state.isError = true
        state.errorMessage = action.payload
        state.isSuccess = false
      })
      .addCase(blogsFetchAll.fulfilled, (state, action) => {
        //console.log("BLOG CREATE FULFILLED", action.payload);
        state.blogs = action.payload
        state.isFetching = false
        state.isError = false
        state.isSuccess = true
        //return state
      })
      .addCase(blogsFetchAll.pending, (state, action) => {
        state.isFetching = true
        //state.isSuccess = false;
      })
      .addCase(blogsFetchAll.rejected, (state, action) => {
        //console.log("REJECTED FETCHALL", action);
        state.isFetching = false
        state.isError = true
        state.errorMessage = action.payload
        state.isSuccess = false
      })
      .addCase(blogFetchById.fulfilled, (state, action) => {
        //console.log("BLOG FULFILLED", action.payload);
        state.blog = action.payload
        state.isFetching = false
        state.isError = false
        state.isSuccess = true
        //return state
      })
      .addCase(blogFetchById.pending, (state, action) => {
        state.isFetching = true
      })
      .addCase(blogFetchById.rejected, (state, action) => {
        //console.log("REJECTED FETCHALL", action);
        state.isFetching = false
        state.isError = true
        state.errorMessage = action.payload
        state.isSuccess = false
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        //console.log("BLOG FULFILLED", action.payload);
        state.blog = action.payload
        state.isFetching = false
        state.isError = false
        state.isSuccess = true
        //return state
      })
      .addCase(deleteBlog.pending, (state, action) => {
        state.isFetching = true
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        //console.log("REJECTED FETCHALL", action);
        state.isFetching = false
        state.isError = true
        state.errorMessage = action.payload
        state.isSuccess = false
      })
  },
})

export const updateBlog = (id, likes) => {
  return async () => {
    const updatedBlog = await blogsService.update(id, {
      likes: likes,
    })
    return updatedBlog
  }
}
export default blogsSlice.reducer
export const { clearState, incrementLikes } = blogsSlice.actions
export const blogsSelector = (state) => state.blogs
export const getAllBlogsSelector = (state) => state.blogs.blogs
export const getBlogSelector = (state) => state.blogs.blog
export const getBlogsIsError = (state) => state.blogs.isError
export const getBlogsIsSuccess = (state) => state.blogs.isSuccess
export const getBlogsIsFetching = (state) => state.blogs.isFetching
export const getBlogsErrorMessage = (state) => state.blogs.errorMessage
