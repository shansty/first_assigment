import React from 'react';
import MainContent from './components/MainContent';
import { useAppContext } from '../../context/AppContext';
import BasePageLayout from '../../layouts/BasePageLayout';
import './mainPage.css'

const MainPage: React.FC = () => {
    const {searchResults,  category} = useAppContext()
    

    return (
        <BasePageLayout>
            <MainContent category={category} searchResults={searchResults}/>
        </BasePageLayout>
    );
};

export default MainPage;
