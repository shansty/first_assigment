import { ChangeEvent, useEffect, useState } from "react";
import SearchBar from './Searchbar'
import axios from "axios";

const Search = () => {
    const [contentData, setContentData] = useState<String[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        getSearchedProductNames();
    }, []);

    const getSearchedProductNames = async () => {
        try {
            const response = await axios.post('http://localhost:3000/search', { searchQuery },
                { headers: { 'Content-Type': 'application/json' } });
            const data = await response.data.products;
            console.dir({ data })
            if (!data) {
                setContentData([])
            } else {
                setContentData(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="search_holder">

            <SearchBar
                value={searchQuery}
                searchHandler={searchHandler}
                getSearchedProductNames={getSearchedProductNames}
            />

            <div className="searchData">
                <ul>
                    {contentData.length > 0 ? (
                        contentData.map((title, index) => (
                            <li key={index}>{title}</li>
                        ))
                    ) : (
                        <li>No results found</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Search;