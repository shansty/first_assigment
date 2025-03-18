import React from 'react';
import NavigationMenu from './components/NavigationMenu';
import MainContent from './components/MainContent';
import ProductSearch from '../../utils_components/product_search/ProductSearch';
import { useParams, Params } from 'react-router-dom';
import { useState } from 'react';
import { TypeProduct } from '../../types';
import './mainPage.css'

const MainPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<TypeProduct[]>([]);
    const { category } = useParams() as Readonly<Params<string>>;

    const handleResultsUpdate = (newResults: TypeProduct[]) => {
        setSearchResults(newResults);
    };

    return (
        <div className='main_page_container'>
            <div className='nav_menu'>
                <NavigationMenu />
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
