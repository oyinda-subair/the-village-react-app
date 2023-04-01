import React, { useEffect } from 'react';
import { isEmpty } from '../../utils';
import { history } from '../../utils/history';

interface LandingPageProps {
  userDetails: Record<string, unknown>;
  apiError: any;
  loading: boolean;
  isLoggedIn: boolean | undefined;
  getUserData: () => any;
}

const LandingPage: React.FC<LandingPageProps> = (props: LandingPageProps) => {
  const { userDetails, apiError, loading, isLoggedIn, getUserData } = props;

  useEffect(() => {
    if (isLoggedIn && isEmpty(userDetails)) handleUserData();
  }, []);

  const handleUserData = () => {
    getUserData()
      .then((response: any) => {
        console.log('response *****', response);
      })
      .catch((error: any) => {
        console.log('error xxxxxxx', error);
      });
  };

  return (
    <>
      <p>Welcome Back!</p>
      {userDetails?.firstName}
    </>
  );
};
export default LandingPage;
