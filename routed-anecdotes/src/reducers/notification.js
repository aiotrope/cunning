import { createSlice, nanoid } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setNotification: {
      reducer: (state, action) => {
        //console.log('ACTION-- ', action)
        state.push({ id: action.payload.id, message: action.payload.message })
      },
      prepare: (message) => {
        //console.log(type)
        const id = nanoid()
        return { payload: { id, message } }
      },
    },

    setMessage: {
      reducer: (state, action) => {
        return action.payload
      },
    },
  },
})

export const selectNotification = (state) => state.notifications

export const { setNotification, setMessage } = notificationSlice.actions

export default notificationSlice.reducer