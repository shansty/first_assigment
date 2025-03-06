import React from 'react';
import { ChangeEventHandler } from "react";

interface searchItem {
    value: string,
    searchHandler: ChangeEventHandler,
    getSearchedProductNames: React.MouseEventHandler<HTMLButtonElement>;
};


const SearchBar = (props: searchItem) => {
    return (
        <div className='search_field'>
            <input
                className="search_bar"
                type="search"
                placeholder="Search..."
                value={props.value}
                onChange={props.searchHandler}
            />
            <button onClick={props.getSearchedProductNames}>🔍</button>
        </div>
    );
}

export default SearchBar;
