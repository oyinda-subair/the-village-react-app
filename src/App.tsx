import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

import Footer from '@components/Footers/Footer';
import Navbar from '@components/Navbars/Navbar';

import Login from '@view/Authentication/Login';
import Register from '@view/Authentication/Register';
import LandingPage from '@view/LandingPage';

import { TokenData } from '@interface/auth.type';

import { history } from '@utils/history';

export default function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  // const { notifications, clear, markAllAsRead, markAsRead } = useNotificationCenter();

  useEffect(() => {
    // Update the document title using the browser API
    const tokenString = Cookies.get('token');
    if (tokenString) checkCookie();
  }, []);

  const checkCookie = () => {
    const tokenString = Cookies.get('token');
    if (tokenString) {
      const token = JSON.parse(tokenString);
      const decodedAccessToken = jwtDecode<TokenData>(token.accessToken);
      const isAccessTokenValid = moment.unix(decodedAccessToken.exp).toDate() > new Date();
      if (!isAccessTokenValid) {
        // alert('Your login session has expired');
        // setShowModal(true);
        Cookies.remove('token');
        history.navigate('/');
      }
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer autoClose={5000} limit={10} closeOnClick pauseOnHover />
      <main>
        <section className='relative w-full h-full py-40 min-h-screen bg-blueGray-100'>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </>
  );
}
