import React from 'react';
import { Link } from 'react-router-dom';
import { TypeProduct } from '../../types';

interface SearchDataProps {
    loading: boolean;
    results: TypeProduct[];
}

const SearchData: React.FC<SearchDataProps>  = (props: SearchDataProps) => {
    return (
        <div className='search_data'>
            {props.loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {props.results?.map((result) => (
                        <li key={result.id}>
                            <Link to={`/product_id/${result.id}`} className='product_link'>
                                <h3>{result.title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchData;
