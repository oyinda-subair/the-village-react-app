import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserInfoData } from '@interface/user.type';

import http from './helper/axiosClient';
import PropertyNormalizer from './helper/propertyNormalizer';

const fetchUserData = createAsyncThunk(
  'user/details',
  // callback function
  async (_obj, { rejectWithValue }) => {
    try {
      const response = await http.get('/users/me');
      if (response.status !== 200) {
        return rejectWithValue(response.status);
      }
      const normalized = PropertyNormalizer.normalize(response.data);
      const data: UserInfoData = normalized;
      return data;
    } catch (error: any) {
      throw rejectWithValue(error.message);
    }
  },
);

const UserService = { fetchUserData };

export default UserService;
