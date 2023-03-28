import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../slices/auth';
import userSlice from '../slices/user';

export const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
});
