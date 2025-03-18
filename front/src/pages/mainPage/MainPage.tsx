import React, { useEffect } from 'react';
import NavigationMenu from './components/NavigationMenu';
import MainContent from './components/MainContent';
import ProductSearch from '../../utils_components/product_search/ProductSearch';
import { useParams, Params } from 'react-router-dom';
import './mainPage.css'

const MainPage: React.FC = () => {
    const { category } = useParams() as Readonly<Params<string>>;

    return (
        <div className='main_page_container'>
            <div className='nav_menu'>
                <NavigationMenu />
            </div>
            <div className='main_content'>
                <ProductSearch category={category}/>
                <div >
                    <MainContent category={category}/>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
