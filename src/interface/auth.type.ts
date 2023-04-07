export interface TokenData {
  userId: string;
  exp: number;
}

export interface LoggedInData {
  accessToken: string;
  tokenType: string;
}

export interface RegisteredData {
  accessToken: string;
  tokenType: string;
  success: boolean;
  data: any;
}

export interface AuthData {
  userToken?: any;
  loading: boolean;
  error?: any;
  success?: boolean;
  isLoggedIn?: boolean;
}

export interface LoginData {
  username: string; // this is email useing the word "username" here because of Fastapi OAUTH
  password: string;
}

export interface UserCreationData {
  firstName: string;
  surname?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  isSuperuser?: boolean;
  role?: string;
}
