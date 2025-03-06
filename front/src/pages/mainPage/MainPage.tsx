import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import MainContent from './components/MainContent';
import Search from './components/Search';
import './mainPage.css'

const MainPage = () => {
    return (
        <div className='main_page_container'>
            <div className='nav_menu'>
                <NavigationMenu />
            </div>
            <div className='main_content'>
                <Search />
                <div >
                    <MainContent />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
