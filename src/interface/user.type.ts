export interface UserInfoData {
  id?: string;
  firstName?: string;
  surname?: string;
  email: string;
  isSuperuser: boolean;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchUserData {
  loading: boolean;
  userDetails?: any;
  error?: any;
  success?: boolean;
}
