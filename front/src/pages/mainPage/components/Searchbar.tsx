import React, { RefObject } from "react";

interface SearchItemProps {
    value: string;
    searchHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getProductList: () => void;
    ref: RefObject<HTMLInputElement | null>;
    isRequestSended: () => void;
}

const SearchBar = (props: SearchItemProps) => {
    
    const handleButtonClick = () => {
        props.getProductList();  
        props.isRequestSended();
        if(props.ref) {
            props.ref?.current?.focus();
        }
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
            />
            <button onClick={handleButtonClick}>🔍</button>
        </div>
    );
};

export default SearchBar;
