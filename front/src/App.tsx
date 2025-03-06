import React from 'react';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import Header from './utils_components/Header';
import Footer from './utils_components/Footer';
import ProductPage from './pages/productPage/ProductPage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import './App.css';

const App: React.FC = () => {

  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/:category' element={<MainPage />}/>
          <Route path='/product_id/:product_id' element={<ProductPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/404' element={<NotFoundPage />}/>
          <Route path='/:category/:product_id' element={<ProductPage />}/>
          </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
