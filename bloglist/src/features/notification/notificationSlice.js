import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      //console.log("Notify", action);
      return { notification: action.payload };
    },
    clearNotification: (state, action) => {
      return { notification: "" };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const notificationSelector = (state) => state.notification;

export default notificationSlice.reducer;
