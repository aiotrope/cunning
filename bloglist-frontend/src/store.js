import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import notificationReducer from "./reducers/notification";

export const store = configureStore({
  reducer: { 
    user: userReducer, 
    notification: notificationReducer
  },
});
