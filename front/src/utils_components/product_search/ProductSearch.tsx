import React, { useState, useEffect, useCallback } from 'react';
import { TypeProduct } from '../../types';
import { getSearchedProductNames } from '../../axios';
import { useDebounce } from '../../hooks';
import SearchBar from './SearchBar';
import SearchData from './SearchData';

interface CategoryProps {
    category: string | undefined;
}

const ProductSearch: React.FC<CategoryProps> = ({ category }) => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<TypeProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        getSearchedProductNames(query, setResults, setLoading)
    };

    const debounceValue = useDebounce(query);

    useEffect(() => {
        fetchData();
    }, [debounceValue, category]);


    return (
        <div className="search_holder">
            <SearchBar query={query} setQuery={setQuery} fetchData={fetchData}/>
            <SearchData results={results} loading={loading} />
        </div>
    );
};

export default ProductSearch;
