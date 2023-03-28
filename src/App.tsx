import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footers/Footer';
import Navbar from './components/Navbars';
import Home from './view';
import Login from './view/Authentication/Login';
import { history } from './utils/history';
import Register from './view/Authentication/Register';
import LandingPage from './view/LandingPage';

export default function App() {
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <>
      <Navbar />
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
