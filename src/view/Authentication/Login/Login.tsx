import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '@components/Buttons/Button';
import TextBox from '@components/Inputs/TextBox';

import { LoginData } from '@interface/auth.type';

import github from '@assets/img/github.svg';
import google from '@assets/img/google.svg';

import { history } from '@utils/history';
import { isEmpty } from '@utils/validator';

interface LoginProps {
  apiError: any;
  loading: boolean;
  isLoggedIn: boolean | undefined;
  userLogin: (data: LoginData) => any;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { userLogin, apiError } = props;

  const defaultValues = { username: '', password: '', message: '' };
  const [error, setError] = useState(defaultValues);
  const [loginForm, setLoginForm] = useState<LoginData>(defaultValues);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  // const toastId = React.useRef(null);

  // useEffect(() => {
  //   toast.promise(userLogin, {
  //     pending: 'Promise is pending',
  //     success: 'Promise  Loaded',
  //     error: 'error',
  //   });
  // }, []);

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const value = input.checked;

    setRememberMe(value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(defaultValues);

    const { username, password } = loginForm;

    const formError: any = validatorChecker(username, password);

    if (!isEmpty(formError as typeof defaultValues)) {
      setLoading(false);
      return setError(formError);
    }

    userLogin(loginForm)
      .then(async (response: any) => {
        if (response.type === 'auth/login/rejected') {
          setLoading(false);
          const msg: any = { message: response.payload };
          toast.error('Incorrect username or password', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return setError({ ...msg });
        } else {
          toast.success('Successfully logged in!', {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.setItem('rememberMe', String(rememberMe));
          history.navigate('/');
        }
      })
      .catch(
        (err: React.SetStateAction<{ message: string; username: string; password: string }>) => {
          setLoading(false);
          const msg: any = { message: apiError || '' };
          setError({ ...err, ...msg });
        },
      );
  };

  /** helper */
  const validatorChecker = (email: string, password: string | any[]) => {
    const formError: any = {};

    if (!email) {
      formError.username = 'Please Enter Email Address';
    }
    if (!password) {
      formError.password = 'Please Enter Password';
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
                  <form onSubmit={(e) => handleLogin(e)}>
                    <div className='relative w-full mb-3'>
                      <TextBox
                        type={'email'}
                        name={'email'}
                        label={'Email'}
                        error={error.username}
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      />
                    </div>
                    <div className='relative w-full mb-3'>
                      <TextBox
                        type={'password'}
                        name={'password'}
                        label={'Password'}
                        error={error.password}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className='inline-flex items-center cursor-pointer'>
                        <input
                          id='customCheckLogin'
                          type='checkbox'
                          checked={rememberMe}
                          onChange={(e) => handleRememberMe(e)}
                          className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                        />
                        <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                          Remember me
                        </span>
                      </label>
                    </div>

                    <div className='text-center mt-6'>
                      <Button loading={loading} title='Sign In' id='login' />
                    </div>
                  </form>
                </div>
              </div>
              <div className='flex flex-wrap mt-6 relative'>
                <div className='w-1/2'>
                  <a
                    href='#pablo'
                    onClick={(e) => e.preventDefault()}
                    className='text-blueGray-800'
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className='w-1/2 text-right'>
                  <Link to='/auth/register' className='text-blueGray-800'>
                    <small>Create new account</small>
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

export default Login;
