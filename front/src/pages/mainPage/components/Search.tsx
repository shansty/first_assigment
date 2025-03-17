import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TypeProduct } from '../../../types';
import { getSearchedProductNames } from '../../../axios';

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<TypeProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const debounceValue = useDebounce(query, 2000);

    function useDebounce(cb: any, delay: number) {
        const [debounceValue, setDebounceValue] = useState(cb);
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebounceValue(cb);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [cb, delay]);
        return debounceValue;
    }


    useEffect(() => {
        console.log("Debounced:", query);
        fetchData();
    }, [debounceValue]);


    const fetchData = async () => {
        getSearchedProductNames(query, setResults, setLoading)
    };


    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
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
            <button>Search</button>
        </div>
    );
};

export default SearchComponent;
