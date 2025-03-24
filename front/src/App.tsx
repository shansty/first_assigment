import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import Header from './utils_components/Header';
import Footer from './utils_components/Footer';
import ProductPage from './pages/productPage/ProductPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import AuthPage from './pages/authPage/AuthPage';
import CartPage from './pages/cartPage/CartPage';
import OrderHistoryPage from './pages/orderPage/OrderHistoryPage';
import ConfirmOrderPage from './pages/orderPage/ConfirmOrderPage';
import './App.css';

const App: React.FC = () => {

  return (
    <HelmetProvider>
      <AppProvider>
        <div className='app'>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/:category' element={<MainPage />} />
              <Route path='/product_id/:product_id' element={<ProductPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/order_history' element={<OrderHistoryPage />} />
              <Route path='/confirm_order' element={<ConfirmOrderPage />} />
              <Route path='/login' element={<AuthPage />} />
              <Route path='/404' element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;
