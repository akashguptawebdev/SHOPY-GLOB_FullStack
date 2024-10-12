import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    items: {},
    authenticate: false, // Initial authentication status
  },
  reducers: {
    storeUser: (state, action) => {
      state.items = action.payload;
    },
    setAuthenticate: (state, action) => {
      state.authenticate = action.payload; // Update authentication state
    },
  },
});

export const { storeUser, setAuthenticate } = userSlice.actions;
export default userSlice.reducer;
