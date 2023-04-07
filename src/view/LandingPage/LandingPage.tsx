import React, { useEffect } from 'react';

import { isEmpty } from '@utils/validator';

interface LandingPageProps {
  userDetails: Record<string, unknown>;
  apiError: any;
  loading: boolean;
  isLoggedIn: boolean | undefined;
  getUserData: () => any;
}

const LandingPage: React.FC<LandingPageProps> = (props: LandingPageProps) => {
  const { userDetails, isLoggedIn, getUserData } = props;

  useEffect(() => {
    const handleUserData = () => {
      getUserData()
        .then((response: any) => {
          console.log('response *****', response);
        })
        .catch((error: any) => {
          console.log('error xxxxxxx', error);
        });
    };
    if (isLoggedIn && isEmpty(userDetails)) {
      handleUserData();
    }
  }, [userDetails, isLoggedIn, getUserData]);

  return (
    <>
      <p>Welcome Back!</p>
      {userDetails?.firstName}
    </>
  );
};
export default LandingPage;
