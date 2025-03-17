import React, { RefObject } from "react";

interface SearchItemProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    throttledFetch: () => void;
}


const SearchBar = (props: SearchItemProps) => {


    return (
        <div className="search_field">
            <input
                type="text"
                placeholder="Search..."
                value={props.query}
                onChange={(e) => {
                    props.setQuery(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        props.throttledFetch();
                    }
                }}
            />
            <button onClick={props.throttledFetch}>Search</button>
        </div>
    );
};

export default SearchBar;
