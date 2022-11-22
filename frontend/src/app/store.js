import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/users/userSlice'
import usersReducer from '../features/users/usersSlice'
import blogsReducer from '../features/blogs/blogsSlice'
import notificationReducer from '../features/notification/notificationSlice'

const combinedReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  notification: notificationReducer,
  blogs: blogsReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state = undefined
  }
  return combinedReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
})
