import React, { useState, useEffect, useCallback } from 'react';
import { TypeProduct } from '../../types';
import { getSearchedProductNames } from '../../axios';
import { useDebounce } from '../../hooks';
import SearchBar from './SearchBar';
import SearchData from './SearchData';

interface ProductSearchProps  {
    category: string | undefined;
    onResultsChange: (results: TypeProduct[]) => void;
}

const ProductSearch: React.FC<ProductSearchProps > = ({ category, onResultsChange }) => {
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

    useEffect(() => {
        onResultsChange(results);
    }, [results, onResultsChange]);


    return (
        <div className="search_holder">
            <SearchBar query={query} setQuery={setQuery} fetchData={fetchData}/>
            <SearchData results={results} loading={loading} />
        </div>
    );
};

export default ProductSearch;
