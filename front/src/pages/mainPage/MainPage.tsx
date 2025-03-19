import React, { useState } from 'react';
import MainContent from './components/MainContent';
import { TypeProduct } from '../../types';
import BasePageLayout from '../../layouts/BasePageLayout';
import './mainPage.css'

const MainPage: React.FC = () => {
    const [searchResults, setSearchResults] = useState<TypeProduct[]>([]);
    const [category, setCategory] = useState<string>();
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const handleResultsUpdate = (newResults: TypeProduct[]) => {
        setSearchResults(newResults);
    };

    return (
        <BasePageLayout>
            <MainContent category={category} searchResults={searchResults}/>
        </BasePageLayout>
    );
};

export default MainPage;
