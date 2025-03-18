import React, { useState } from 'react';
import NavigationMenu from './components/NavigationMenu';
import MainContent from './components/MainContent';
import './mainPage.css';

const MainPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return (
        <div className='main_page_container'>
            <NavigationMenu onToggle={setIsMenuOpen} />
            <div className={isMenuOpen ? "main_content expanded" : "main_content collapsed"}>
                <MainContent />
            </div>
        </div>
    );
};

export default MainPage;
