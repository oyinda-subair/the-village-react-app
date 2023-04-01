import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import { TokenData } from '../../interfaces/auth.type';

const config = {
  apiBasePath: import.meta.env.VITE_REACT_APP_API_BASE_PATH || 'http://localhost:8001',
  reactAppMode: import.meta.env.VITE_REACT_APP_MODE || 'development',
};
/* eslint-disable  @typescript-eslint/no-explicit-any */
const cookiesTokenInterceptor = (config: any) => {
  const headers: any = {};
  const tokenString = Cookies.get('token');

  if (tokenString) {
    const token = JSON.parse(tokenString);
    const decodedAccessToken = jwtDecode<TokenData>(token.accessToken);
    const isAccessTokenValid = moment.unix(decodedAccessToken.exp).toDate() > new Date();
    if (isAccessTokenValid) {
      headers['Authorization'] = `Bearer ${token.accessToken}`;
    } else {
      alert('Your login session has expired');
    }
  }
  config['headers'] = headers;
  return config;
};

const initialConfig = {
  baseURL: `${config.apiBasePath}/api/v1`,
};

const http = axios.create(initialConfig);

http.interceptors.request.use(cookiesTokenInterceptor);

export default http;
