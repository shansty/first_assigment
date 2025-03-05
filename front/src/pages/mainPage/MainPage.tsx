import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import MainContent from './components/MainContent';
import './mainPage.css'

const MainPage = () => {
    return (
        <div className='main_page_container'>
            <div className='nav_menu'>
                <NavigationMenu />
            </div>
            <div className='main_content'>
                <MainContent />
            </div>
        </div>
    );
}

export default MainPage;
