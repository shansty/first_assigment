import React, { RefObject } from "react";

interface SearchItemProps {
    value: string;
    searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getProductList: () => void;
    ref: RefObject<HTMLInputElement | null>;
    isFocus: () => void;
}

const SearchBar = (props: SearchItemProps) => {
    
    const handleButtonClick = () => {
        props.getProductList();  
        props.isFocus();
    };

    return (
        <div className="search_field">
            <input
                ref={props.ref}
                className="search_bar"
                type="search"
                placeholder="Search..."
                value={props.value}
                onChange={props.searchHandler}
                onClick={props.isFocus}  
            />
            <button onClick={handleButtonClick}>🔍</button>
        </div>
    );
};

export default SearchBar;
