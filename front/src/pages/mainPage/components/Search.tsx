import React, { useState, useEffect, useCallback } from 'react';
import { TypeProduct } from '../../../types';
import { getSearchedProductNames } from '../../../axios';
import { useThrottle, useDebounce } from '../../../hooks';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';


const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<TypeProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        getSearchedProductNames(query, setResults, setLoading)
    };

    const debounceValue = useDebounce(query, 2000);
    const throttledFetch = useThrottle(fetchData, 5000);

    useEffect(() => {
        console.log("Debounced:", query);
        fetchData();
    }, [debounceValue]);


    return (
        <div className="search_holder">
            <SearchBar throttledFetch={throttledFetch} query={query} setQuery={setQuery} />
            <div className='search_data'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {results?.map((result) => (
                            <li key={result.id}><Link to={`product_id/${result.id}`} className='product-link'><h3>{result.title}</h3></Link></li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;
