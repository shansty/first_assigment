import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import MainContent from './components/MainContent';
import ProductSearch from '../../utils_components/product_search/ProductSearch';
import { useState } from 'react';
import { TypeProduct } from '../../types';
import './mainPage.css'

const MainPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<TypeProduct[]>([]);
    const [category, setCategory] = useState<string>();

    const handleResultsUpdate = (newResults: TypeProduct[]) => {
        setSearchResults(newResults);
    };

    const handleCategoryUpdate = (category: string) => {
        setCategory(category);
    };

    return (
        <div className='main_page_container'>
            <div className='nav_menu'>
                <NavigationMenu onResultsChange={handleCategoryUpdate} />
            </div>
            <div className='main_content'>
                <ProductSearch category={category} onResultsChange={handleResultsUpdate} />
                <div >
                    <MainContent category={category} searchResults={searchResults} />
                </div>
            </div>
        </div>
    );
}

export default MainPage;
