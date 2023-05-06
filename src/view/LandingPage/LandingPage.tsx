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

  const firstname: any = userDetails?.firstName;

  return (
    <>
      <section className='relative py-16'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap'>
            <div className='w-full px-4'>
              <p>Welcome Back {firstname}!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default LandingPage;
