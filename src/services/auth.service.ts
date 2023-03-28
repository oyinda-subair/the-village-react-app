import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { LoggedInData, LoginData } from '../interfaces/auth.type';
import { UserRegistration } from '../interfaces/user.type';
import http from './helper/axiosClient';
import PropertyNormalizer from './helper/propertyNormalizer';

/* eslint-disable  camelcase */
const registerUser = createAsyncThunk(
  'auth/register',
  async (data: UserRegistration, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await http.post('/auth/register', data, config);
      return response;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

const loginUser = createAsyncThunk('auth/login', async (data: LoginData, { rejectWithValue }) => {
  delete http.defaults.headers['Authorization'];

  const form_data = new FormData();
  const grant_type = 'password';
  const item: Record<string, any> = { grant_type, ...data };

  for (const key in item) {
    form_data.append(key, item[key]);
  }

  return http
    .post('/auth/login', form_data)
    .then((response) => {
      if (response.status === 401) {
        return rejectWithValue(response.data.message);
      }
      if (response.status !== 200) {
        return rejectWithValue(response.status);
      }
      const normalized = PropertyNormalizer.normalize(response.data);
      const data: LoggedInData = normalized;
      Cookies.set('token', JSON.stringify(data));
      return data;
    })
    .catch((error) => {
      const message = error.response.data.message;
      throw rejectWithValue(message);
    });
});

const AuthService = {
  registerUser,
  loginUser,
};

export default AuthService;
