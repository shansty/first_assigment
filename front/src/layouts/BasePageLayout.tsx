import React from 'react';
import NavigationMenu from '../utils_components/NavigationMenu';
import Search from '../pages/mainPage/components/Search';
import '../pages/mainPage/mainPage.css'

interface BasePageLayoutProps {
    children: React.ReactNode; 
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({ children }) => {
    return (
        <div className='main_page_container'>
            <div className='nav_menu'>
                <NavigationMenu />
            </div>
            <div className='main_content'>
                <Search />
                <div>
                    {children} 
                </div>
            </div>
        </div>
    );
}

export default BasePageLayout;
