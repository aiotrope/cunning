import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setNotification } from "../notification/notificationSlice";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const userRegister = createAsyncThunk(
  "user/register",
  async ({ username, name, password }, thunkAPI) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.post(
        `${baseUrl}/users/register`,
        {
          username,
          name,
          password,
        },
        config
      );

      let data = response.data;
      //console.log(response);
      if (response.status === 201) {
        thunkAPI.dispatch(
          setNotification(`${data.name} successfully ${response.statusText}`)
        );
        return { ...data, name: name };
      }
    } catch (error) {
      console.log(error.response.data.error);
      thunkAPI.dispatch(setNotification(`${error.response.data.error}`));
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }, thunkAPI) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.post(
        `${baseUrl}/login`,
        {
          username,
          password,
        },
        config
      );

      let data = response.data;
      console.log(response);
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        const currentUser = JSON.parse(localStorage.getItem("user"));
        thunkAPI.dispatch(setNotification(data.message));
        return { ...data };
      }
    } catch (error) {
      console.log(error.response.data.error);
      thunkAPI.dispatch(setNotification(`${error.response.data.error}`));
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

/* export const userLogout = createAsyncThunk("user/logout", async () => {
  return localStorage.clear();
});
 */
const initialState = {
  token: "",
  username: "",
  name: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: {
      reducer: (state, action) => {
        console.log("STATE", state);
        state.isError = false;
        state.isSuccess = false;
        state.isFetching = false;
        state.errorMessage = "";
        return state;
      },
    },
    logout: {
      reducer: (state, action) => {
        console.warn('ACTION-TYPE', action.type)
        state = undefined;
        localStorage.clear()
        return state;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        //console.log("Fulfilled", action);
        state.isFetching = false;
        state.isSuccess = true;
        //state.username = action.payload.username;
        state.name = action.payload.name;
        state.isLoggedIn = false;
      })
      .addCase(userRegister.pending, (state, action) => {
        //console.log("Pending", action);
        state.isFetching = true;
        state.isLoggedIn = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        //console.log("Rejected", action.payload);
        state.isError = true;
        state.isFetching = false;
        state.errorMessage = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        //console.log("Fulfilled", action.type);
        state.isFetching = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.name = action.payload.name;
        state.token = action.payload.token;
      })
      .addCase(userLogin.pending, (state, action) => {
        //console.log("Pending", action);
        state.isFetching = true;
        state.isLoggedIn = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        //console.log("Rejected", action);
        state.isError = true;
        state.isFetching = false;
        state.errorMessage = action.payload;
        state.isLoggedIn = false;
      });
    /* .addCase(userLogout.fulfilled, (state, action) => {
        console.log("LogoutFullFilled", action.type);
        state = undefined;
      }); */
  },
});

export default userSlice.reducer;

export const { clearState, logout } = userSlice.actions;

export const userSelector = (state) => state.user;
