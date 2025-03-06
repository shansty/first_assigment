import { ChangeEvent, useEffect, useState, useRef } from "react";
import { getSearchedProductNames } from "../../../axios";
import { Link } from "react-router-dom";
import { TypeProduct } from "../../../types";
import SearchBar from './Searchbar'

const Search = () => {

    const [contentData, setContentData] = useState<TypeProduct[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isRequestSended, setIsRequestSended] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (searchQuery) {
            getProductList();
        }
        if(!searchQuery) {
            setContentData([])
            setIsRequestSended(false)
        }
    }, [searchQuery]);

    const getProductList = async () => {
        await getSearchedProductNames(searchQuery, setContentData);
        console.dir({ contentData })
        console.log("Degug")
    }

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleIsRequestSended= () => {
        setIsRequestSended(!isRequestSended);
        console.dir({isRequestSended})
    };


    return (
        <div className="search_holder">

            <SearchBar
                ref={ref}
                value={searchQuery}
                searchHandler={searchHandler}
                getProductList={getProductList}
                isRequestSended={handleIsRequestSended}
            />

            <div className={isRequestSended ? "searchData" : ""}>
                <ul>
                    {contentData.length > 0 ? isRequestSended && (
                        contentData.map((product, index) => (
                            <li key={index}>
                                <Link className='product-link' to={`/product_id/${product.id}`}><h3>{product.title}</h3></Link>
                            </li>
                        ))
                    ) : (
                         isRequestSended && <li>No results found</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Search;