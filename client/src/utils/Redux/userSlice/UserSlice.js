import { createSlice } from "@reduxjs/toolkit";

// Get initial authentication state and user data from localStorage
const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};
const initialAuthenticate = localStorage.getItem("authenticate")
  ? JSON.parse(localStorage.getItem("authenticate"))
  : false;

const userSlice = createSlice({
  name: "user",
  initialState: {
    items: initialUser,
    authenticate: initialAuthenticate, // Initial authentication status
  },
  reducers: {
    storeUser: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user data
    },
    setAuthenticate: (state, action) => {
      state.authenticate = action.payload;
      localStorage.setItem("authenticate", JSON.stringify(action.payload)); // Persist authentication state
    },
    logout: (state) => {
      state.items = {};
      state.authenticate = false;
      localStorage.removeItem("user"); // Clear user data from localStorage
      localStorage.removeItem("authenticate"); // Clear authentication status from localStorage
    },
  },
});

export const { storeUser, setAuthenticate, logout } = userSlice.actions;
export default userSlice.reducer;
