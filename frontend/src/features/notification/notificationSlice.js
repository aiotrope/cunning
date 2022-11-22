/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return state = action.payload
    },
    clearNotification: (state, action) => {
      return state = ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export const notificationSelector = (state) => state.notification
export default notificationSlice.reducer
