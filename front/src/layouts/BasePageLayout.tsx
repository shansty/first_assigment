import React, { useState } from 'react';
import NavigationMenu from '../utils_components/NavigationMenu';
import ProductSearch from '../utils_components/product_search/ProductSearch';
import { useAppContext } from '../context/AppContext';
import { TypeProduct } from '../types';
import '../pages/mainPage/mainPage.css'

interface BasePageLayoutProps {
    children: React.ReactNode; 
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({ children }) => {
    const { category, setCategory, searchResults, setSearchResults } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const handleResultsUpdate = (newResults: TypeProduct[]) => {
            setSearchResults(newResults);
        };

    return (
        <div className='main_page_container'>
            <div className='nav_menu'>
                <NavigationMenu onToggle={setIsMenuOpen}/>
            </div>
            <div className='main_content'>
                <ProductSearch category={category} onResultsChange={handleResultsUpdate}/>
                <div className={isMenuOpen ? "main_content expanded" : "main_content collapsed"}>
                    {children} 
                </div>
            </div>
        </div>
    );
}

export default BasePageLayout;
