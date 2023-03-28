import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: state => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: state => {
      state.user = null;
      state.error = null;
    }
  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout
} = authSlice.actions;

export const signIn = (username, password) => async dispatch => {
  try {
    dispatch(loginRequest());
    const response = await axios.post('/api/auth/sign-in', { username, password });
    localStorage.setItem('token', response.data.token);
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    dispatch(loginFailure(error.response.data));
  }
};

export const signOut = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch(logout());
};

export default authSlice.reducer;
