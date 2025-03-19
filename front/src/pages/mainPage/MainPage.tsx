
import React, { useState } from 'react';
import NavigationMenu from '../../utils_components/NavigationMenu';
import ProductSearch from '../../utils_components/product_search/ProductSearch';
import { TypeProduct } from '../../types';
import Search from './components/Search';
import React from 'react';
import BasePageLayout from '../../layouts/BasePageLayout';
import MainContent from './components/MainContent';
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
        <BasePageLayout>
            <MainContent />
        </BasePageLayout>
    );
};

export default MainPage;
