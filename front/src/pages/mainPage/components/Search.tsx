import React, { useState, useEffect, useCallback } from 'react';
import { TypeProduct } from '../../../types';
import { getSearchedProductNames } from '../../../axios';
import { useThrottle, useDebounce } from '../../../hooks';

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
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        throttledFetch();
                    }
                }}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {results?.map((result) => (
                        <li key={result.id}>{result.title}</li>
                    ))}
                </ul>
            )}
            <button onClick={throttledFetch}>Search</button>
        </div>
    );
};

export default SearchComponent;
