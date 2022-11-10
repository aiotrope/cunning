import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdotes'
import notificationReducer from './reducers/notification'

const reducer = {
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
})
