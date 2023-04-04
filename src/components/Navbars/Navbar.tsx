import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AuthData } from '../../interfaces/auth.type';
import { authActions, getAuthData } from '../../redux/slices/auth';
import { persistor } from '../../redux/store';
import { useAppDispatch, useAppSelector } from '../../redux/store/hook';
import { history } from '../../utils/history';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const auth: AuthData = useAppSelector(getAuthData);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(authActions.logout());
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    history.navigate('/');
  };

  const renderRegisterAndSignInCTA = () => {
    return (
      <>
        <li className='nav-item'>
          <Link
            className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
            to={'/auth/register'}
          >
            Register
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
            to={'/auth/login'}
          >
            Sign In
          </Link>
        </li>
      </>
    );
  };

  const renderSignOutCTA = () => {
    return (
      <>
        <li className='nav-item'>
          <Link
            className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
            to={'/'}
            onClick={(e) => handleLogout(e)}
          >
            Sign Out
          </Link>
        </li>
      </>
    );
  };

  const renderAuthLinks = () => {
    if (auth.isLoggedIn) {
      return renderSignOutCTA();
    } else {
      return renderRegisterAndSignInCTA();
    }
  };

  return (
    <>
      <nav className='top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-indigo-500 mb-3'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link
              className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white'
              to={'/'}
            >
              indigo Notus
            </Link>
            <button
              className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className='fas fa-bars'></i>
            </button>
          </div>
          <div
            className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
            id='example-navbar-danger'
          >
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              <li className='nav-item'>
                <a
                  className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  href='#pablo'
                >
                  <i className='fab fa-facebook-square text-lg leading-lg text-white opacity-75'></i>
                  <span className='ml-2'>Share</span>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  href='#pablo'
                >
                  <i className='fab fa-twitter text-lg leading-lg text-white opacity-75'></i>
                  <span className='ml-2'>Tweet</span>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  href='#pablo'
                >
                  <i className='fab fa-pinterest text-lg leading-lg text-white opacity-75'></i>
                  <span className='ml-2'>Pin</span>
                </a>
              </li>
              {renderAuthLinks()}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
