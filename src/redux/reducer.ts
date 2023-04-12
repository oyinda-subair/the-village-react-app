import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/auth';
import postSlice from './slices/post';
import userSlice from './slices/user';

export const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  post: postSlice,
});
