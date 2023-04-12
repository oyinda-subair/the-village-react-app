import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthData } from '@interface/auth.type';

import { useAppSelector } from '@redux/hook';
import { getAuthData } from '@redux/slices/auth';

import { history } from '@utils/history';

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const PrivateRoute = ({ children }: Props) => {
  const auth: AuthData = useAppSelector(getAuthData);

  if (!auth?.isLoggedIn) {
    // not logged in so redirect to login page with the return url
    return <Navigate to='/auth/login' state={{ from: history.location }} />;
  }

  // authorized so return child components
  return <>{children}</>;
};

export { PrivateRoute };
