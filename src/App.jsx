import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Routes/Home';
import Detail from './Routes/Detail';
import RestrictedMobile from './Components/RestrictedPageResponsive/RestrictedMobile';
import RestrictedNotAdmin from './Components/RestrictedPageResponsive/RestrictedNotAdmin'
import LoginPage from './Components/LogIn/LoginPage';
import RegisterPage from './Components/LogIn/RegisterPage'
import Profile from './Components/Profile/Profile';
import FavoritesList from './Components/Favorites/FavoritesList';
import Admin from './Routes/Admin';
import Reservation from './Components/Reservation/Reservation';



function App() {
  const token = localStorage.getItem("token");
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  
  const usersDataString = localStorage.getItem('userData');
  const usersData = usersDataString ? JSON.parse(usersDataString) : null;
  const isAdmin = usersData?.role === 'ADMIN';

  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path='/' Component={Home} />
          {isMobile ? (
            <Route path="/administrador" element={<RestrictedMobile />} />
          ) : (
            isAdmin ? (
              <Route path="/administrador" element={<Admin />} />
            ) : <Route path="/administrador" element={<RestrictedNotAdmin />} />
          )}
          <Route path='/detail/:id' Component={Detail} />
          <Route path='/auth/register' Component={RegisterPage}/>
          <Route path='/perfil' Component={Profile}/>
          <Route path='/auth/login' Component={LoginPage}/>
          <Route path='/mostrarFav' Component={FavoritesList}/>
          <Route path='/reservation' Component={Reservation}/> 
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App


