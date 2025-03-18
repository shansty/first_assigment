import React from "react";
import { useThrottle } from '../../hooks';

interface SearchItemProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    fetchData: () => Promise<void>;
}


const SearchBar: React.FC<SearchItemProps> = (props: SearchItemProps) => {

    const throttledFetch = useThrottle(props.fetchData);

    const cleanSearchQuery = () => {
        throttledFetch()
        props.setQuery('')
    }


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
                        cleanSearchQuery();
                    }
                }}
            />
            <button onClick={() => {
                cleanSearchQuery();
            }}>Search</button>
        </div>
    );
};

export default SearchBar;
