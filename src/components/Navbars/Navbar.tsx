import React from 'react';
import { NavLink } from 'react-router-dom';

import { AuthData } from '@interface/auth.type';

import { useAppDispatch, useAppSelector } from '@redux/hook';
import { authActions, getAuthData } from '@redux/slices/auth';
import { persistor } from '@redux/store';

import { history } from '@utils/history';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const auth: AuthData = useAppSelector(getAuthData);

  const activeClassName = 'underline underline-offset-8 decoration-mm-blue-400 decoration-4';
  const navLinkClassName =
    'px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75 hover:underline hover:underline-offset-8 ';

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
          <NavLink
            className={({ isActive }) =>
              isActive ? navLinkClassName + activeClassName : navLinkClassName
            }
            to={'/auth/register'}
          >
            Register
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink
            className={({ isActive }) =>
              isActive ? navLinkClassName + activeClassName : navLinkClassName
            }
            to={'/auth/login'}
          >
            Sign In
          </NavLink>
        </li>
      </>
    );
  };

  const renderSignOutCTA = () => {
    return (
      <>
        <li className='nav-item'>
          <NavLink
            className={({ isActive }) =>
              isActive ? navLinkClassName + activeClassName : navLinkClassName
            }
            to={'/'}
            onClick={(e) => handleLogout(e)}
          >
            Sign Out
          </NavLink>
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
      <nav className='top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-mountain-meadow-100'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <NavLink
              className='text-base font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-white'
              to={'/'}
            >
              the Village
            </NavLink>
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
            <ul className='flex flex-col lg:flex-row list-none mr-auto'>
              <li className='nav-item'>
                <NavLink
                  // className='px-3 py-2 flex items-center text-xs  font-bold leading-snug text-white hover:opacity-75'
                  to={'/posts/my_posts'}
                  className={({ isActive }) =>
                    isActive ? navLinkClassName + activeClassName : navLinkClassName
                  }
                >
                  My Posts
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? navLinkClassName + activeClassName : navLinkClassName
                  }
                  to={'/posts/new'}
                >
                  Create Post
                </NavLink>
              </li>
            </ul>
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>{renderAuthLinks()}</ul>
          </div>
        </div>
      </nav>
    </>
  );
}
