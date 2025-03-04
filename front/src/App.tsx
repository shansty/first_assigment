import React from 'react';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage';
import Header from './utils_components/Header';
import Footer from './utils_components/Footer';
import './App.css';

const App: React.FC = () => {

  return (
    <div className='app'>
      <Header />
      <BrowserRouter>
          <Routes>
          <Route path='/' element={<MainPage />}/>
          </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
