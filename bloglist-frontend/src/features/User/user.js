import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/user";
import { setNotification } from "./notification";

export const userRegister = createAsyncThunk(
  "user/register",
  async ({ username, name, password }, thunkAPI) => {
    try {
      const response = await userService.register(username, name, password);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await userService.login(username, password);

      if (data) {
        localStorage.setItem("user", JSON.stringify(user));
        const current = JSON.parse(localStorage.getItem("user"));

        return { user: data };
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const user = JSON.parse(localStorage.getItem("user"));

const initialState =user
? { isLoggedIn: true, user }
: { isLoggedIn: false, user: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoggedIn = true;
        state.user = null;
      });
  },
});

export const getLogin = (state) => state.user;

export default userSlice.reducer;
