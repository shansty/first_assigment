import { ChangeEvent, useEffect, useState, useRef } from "react";
import { getSearchedProductNames } from "../../../axios";
import SearchBar from './Searchbar'

const Search = () => {
    const [contentData, setContentData] = useState<String[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (searchQuery) {
            getProductList();
        }
    }, [searchQuery]);

    const getProductList = async () => {
        getSearchedProductNames(searchQuery, setContentData);
    }


    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleFocus = () => {
        setIsFocused(!isFocused);
    };


    return (
        <div className="search_holder">

            <SearchBar
                ref={ref}
                value={searchQuery}
                searchHandler={searchHandler}
                getProductList={getProductList}
                isFocus={handleFocus}
            />

            <div className="searchData">
                <ul>
                    {contentData.length > 0 ? (
                        contentData.map((title, index) => (
                            <li key={index}>
                                {title}
                            </li>
                        ))
                    ) : (
                        isFocused && <li>No results found</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Search;