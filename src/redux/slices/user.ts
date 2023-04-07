import { createSlice } from '@reduxjs/toolkit';

import { FetchUserData } from '@interface/user.type';

import UserService from '@services/user.service';

import { RootState } from '../store';

const initialState: FetchUserData = {
  loading: false,
  userDetails: null,
  error: null,
  success: false,
};

const createReducers = () => {
  return {};
};

const createExtraReducers = () => {
  const { fetchUserData } = UserService;
  return (builder: any) => {
    builder
      .addCase(fetchUserData.pending, (state: FetchUserData) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state: FetchUserData, action: { payload: any }) => {
        state.loading = false;
        state.success = true; // user data successful
        state.userDetails = action.payload;
      })
      .addCase(fetchUserData.rejected, (state: FetchUserData, action: any) => {
        state.loading = false;
        state.error = action;
      });
  };
};

const name = 'user';
const reducers = createReducers();
const extraReducers = createExtraReducers();
const userSlice = createSlice({ name, initialState, reducers, extraReducers });

export const selectUserData = (state: RootState) => state.user.userDetails;
export const getAuthData = (state: RootState) => state.auth;
const { reducer, actions } = userSlice;

export const userActions = { ...actions, ...UserService };
export default reducer;
