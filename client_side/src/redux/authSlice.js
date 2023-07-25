import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload;
      state.email = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
