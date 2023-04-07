import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { AuthData } from '@interface/auth.type';

import AuthService from '@services/auth.service';

import { RootState } from '../store';

const initialState: AuthData = {
  loading: false,
  userToken: null,
  error: null,
  success: false,
  isLoggedIn: false,
};

const createReducers = () => {
  return {
    logout,
  };

  function logout(state: any) {
    Cookies.remove('token'); // deletes token from storage
    state.loading = false;
    state.userInfo = {};
    state.error = null;
    state.success = false;
    state.isLoggedIn = false;
  }
};

const createExtraReducers = () => {
  const { loginUser, registerUser } = AuthService;
  return (builder: any) => {
    builder
      .addCase(registerUser.pending, (state: AuthData) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state: AuthData, action: { payload: any }) => {
        // Login failed
        state.loading = false;
        state.success = true; // registration successful
        state.userToken = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state: AuthData, action: any) => {
        state.loading = false;
        state.error = action;
      })
      .addCase(loginUser.pending, (state: AuthData, action: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state: AuthData, action: { payload: any }) => {
        state.loading = false;
        state.success = true; // login successful
        state.isLoggedIn = true; // login successful
        state.userToken = action.payload;
      })
      .addCase(loginUser.rejected, (state: AuthData, action: { payload: any }) => {
        state.loading = false;
        state.error = action.payload;
      });
  };
};

const name = 'auth';
const reducers = createReducers();
const extraReducers = createExtraReducers();
const authSlice = createSlice({ name, initialState, reducers, extraReducers });

export const getAuthData = (state: RootState) => state.auth;
const { reducer, actions } = authSlice;

// export const authActions = { ...actions, authSlice. };
// export const authActions = { ...actions, loginUser, registerUser };

export const authActions = { ...actions, ...AuthService };
export default reducer;
