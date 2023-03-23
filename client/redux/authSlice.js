import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutSuccess: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    }
  }
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
