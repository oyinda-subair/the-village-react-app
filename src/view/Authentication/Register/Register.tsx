import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '@components/Buttons/Button';
import TextBox from '@components/Inputs/TextBox';

import { UserCreationData } from '@interface/auth.type';

import github from '@assets/img/github.svg';
import google from '@assets/img/google.svg';

import { history } from '@utils/history';
import { isEmpty } from '@utils/validator';

interface RegisterProps {
  userRegistration: (data: UserCreationData) => any;
}

const Register: React.FC<RegisterProps> = (props: RegisterProps) => {
  const defaultValues = {
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    isSuperuser: false,
    role: 'user',
  };

  const [error, setError] = useState<UserCreationData>(defaultValues);

  const [registerForm, setRegisterForm] = useState<UserCreationData>(defaultValues);

  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(defaultValues);

    const { firstName, email, password, confirmPassword } = registerForm;

    const formError: any = validateField({ firstName, email, password, confirmPassword });

    if (!isEmpty(formError as typeof defaultValues)) {
      setLoading(false);
      toast.error('Registration form not valid', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return setError(formError);
    }

    const { userRegistration } = props;
    userRegistration(registerForm)
      .then((response: any) => {
        if (response.type === 'auth/register/rejected') {
          setLoading(false);
          const msg: any = { message: response.payload };
          toast.error('Error registring user', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return setError({ ...msg });
        } else {
          toast.success('User Registration Successful!', {
            position: toast.POSITION.TOP_RIGHT,
          });
          history.navigate('/');
        }
      })
      .catch((err: any) => {
        setLoading(false);
        setError(err);
        alert(err);
      });
  };

  /** helper */

  const validateField = (values: any) => {
    const { firstName, email, password, confirmPassword } = values;
    const formError: any = {};

    if (!firstName) {
      formError.firstName = 'First name is required';
    }

    if (!email) {
      formError.email = 'Email is required';
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
      formError.email = 'Incorrect email format';
    }

    if (!password) {
      formError.password = 'Password is required';
    } else if (password.length < 8) {
      formError.password = 'Password must have a minimum 8 characters';
    }

    if (!confirmPassword) {
      formError.confirmPassword = 'Confirm password is required';
    } else if (confirmPassword.length < 8) {
      formError.confirmPassword = 'Confirm password must have a minimum 8 characters';
    } else if (confirmPassword !== password) {
      formError.confirmPassword = 'Passwords does not match';
    }

    return formError;
  };

  return (
    <>
      <div className='absolute top-0 w-full h-full'>
        <div className='container mx-auto px-4 h-full'>
          <div className='flex content-center items-center justify-center h-full'>
            <div className='w-full lg:w-4/12 px-4'>
              <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
                <div className='rounded-t mb-0 px-6 py-6'>
                  <div className='text-center mb-3'>
                    <h6 className='text-blueGray-500 text-sm font-bold'>Sign in with</h6>
                  </div>
                  <div className='btn-wrapper text-center'>
                    <button
                      className='bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150'
                      type='button'
                    >
                      <img alt='...' className='w-5 mr-1' src={github} />
                      Github
                    </button>
                    <button
                      className='bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150'
                      type='button'
                    >
                      <img alt='...' className='w-5 mr-1' src={google} />
                      Google
                    </button>
                  </div>
                  <hr className='mt-6 border-b-1 border-blueGray-300' />
                </div>
                <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                  <div className='text-blueGray-400 text-center mb-3 font-bold'>
                    <small>Or sign in with credentials</small>
                  </div>
                  <form onSubmit={(e) => handleRegister(e)}>
                    <div className='relative w-full mb-3'>
                      <TextBox
                        type={'text'}
                        name={'firstname'}
                        label={'First Name'}
                        error={error.firstName}
                        value={registerForm.firstName}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, firstName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className='relative w-full mb-3'>
                      <TextBox
                        type={'text'}
                        name={'surname'}
                        label={'Surname'}
                        value={registerForm.surname}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, surname: e.target.value })
                        }
                      />
                    </div>
                    <div className='relative w-full mb-3'>
                      <TextBox
                        type={'email'}
                        name={'email'}
                        label={'Email'}
                        error={error.email}
                        value={registerForm.email}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className='relative w-full mb-3'>
                      <TextBox
                        type={'password'}
                        name={'password'}
                        label={'Password'}
                        error={error.password}
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, password: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className='relative w-full mb-3'>
                      <TextBox
                        type={'password'}
                        name={'confirmPassword'}
                        label={'Confirm Password'}
                        error={error?.confirmPassword}
                        value={registerForm.confirmPassword}
                        onChange={(e) =>
                          setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className='text-center mt-6'>
                      <Button loading={loading} title='Register' id='register' />
                    </div>
                  </form>
                </div>
              </div>
              <div className='flex flex-wrap mt-6 relative'>
                <div className='w-1/2 text-right'>
                  <Link to='/auth/login' className='text-blueGray-800'>
                    <small>Already have an account? Login</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
