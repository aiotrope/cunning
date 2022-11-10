import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = {
  anecdotes: [],
  status: 'idle',
  error: '',
  anecdote: {},
}

export const retrieveAnecdotes = createAsyncThunk(
  'anecdotes/retrieve',
  async (_, { rejectWithValue }) => {
    try {
      const response = await anecdoteService.getAll()
      return response
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const retrieveAnecdoteById = createAsyncThunk(
  'anecdotes/retrieveById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await anecdoteService.getById(id)

      return response
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (data, { rejectWithValue }) => {
    const { content, author, info } = data
    try {
      const response = await anecdoteService.create({
        content,
        author,
        info,
        votes: 0,
        id: nanoid()
      })

      return response
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(retrieveAnecdotes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.anecdotes = action.payload
      })
      .addCase(retrieveAnecdotes.pending, (state) => {
        state.status = 'loading'
      })

      .addCase(retrieveAnecdotes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(retrieveAnecdoteById.fulfilled, (state, action) => {
        state.anecdote = action.payload
        //console.log(action.payload)
      })
      .addCase(createAnecdote.fulfilled, (state, action) => {
        state.anecdotes.push(action.payload)
      })
  },
})

export default anecdotesSlice.reducer

export const getAllAnecdotes = (state) => state.anecdotes.anecdotes
export const getAnecdote = (state) => state.anecdotes.anecdote
export const getAnecdotesStatus = (state) => state.anecdotes.status
export const getAnecdotesError = (state) => state.anecdotes.error
