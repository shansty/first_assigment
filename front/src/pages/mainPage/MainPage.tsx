
import React, { useState } from 'react';
import NavigationMenu from '../../utils_components/NavigationMenu';
import MainContent from './components/MainContent';
import ProductSearch from '../../utils_components/product_search/ProductSearch';
import { TypeProduct } from '../../types';
import Search from './components/Search';
import './mainPage.css'

const MainPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<TypeProduct[]>([]);
    const [category, setCategory] = useState<string>();
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const handleResultsUpdate = (newResults: TypeProduct[]) => {
        setSearchResults(newResults);
    };

    const handleCategoryUpdate = (category: string) => {
        setCategory(category);
    };

    return (
        <div className='main_page_container'>
            <div className='nav_menu'>
                <NavigationMenu onResultsChange={handleCategoryUpdate} onToggle={setIsMenuOpen} />
            </div>
            <div className='main_content'>
                <ProductSearch category={category} onResultsChange={handleResultsUpdate} />
                <div className={isMenuOpen ? "main_content expanded" : "main_content collapsed"}>
                    <MainContent category={category} searchResults={searchResults} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
