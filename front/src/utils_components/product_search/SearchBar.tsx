import React from "react";
import { useThrottle } from '../../hooks';

interface SearchItemProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    fetchData: () => Promise<void>;
}


const SearchBar: React.FC<SearchItemProps> = (props: SearchItemProps) => {

    const throttledFetch = useThrottle(props.fetchData);

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
                        throttledFetch();
                    }
                }}
            />
            <button onClick={throttledFetch}>Search</button>
        </div>
    );
};

export default SearchBar;
