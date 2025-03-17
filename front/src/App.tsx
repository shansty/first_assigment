import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import Header from './utils_components/Header';
import Footer from './utils_components/Footer';
import ProductPage from './pages/productPage/ProductPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';

const App: React.FC = () => {

  return (
    <HelmetProvider>
      <div className='app'>
        <Header />
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/:category' element={<MainPage />}/>
          <Route path='/product_id/:product_id' element={<ProductPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/404' element={<NotFoundPage />}/>
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
