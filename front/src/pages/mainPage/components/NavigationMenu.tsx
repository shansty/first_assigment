import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategoriesNames } from '../../../axios';

const NavigationMenu = () => {
    const default_category = "all categories"
    const [categories, setCategories] = useState<String[]>([default_category]);
    
    useEffect(() => {
        setAllCategories();
    }, [])

    const setAllCategories = async () => {
        const db_catedories = await getCategoriesNames();
        setCategories([default_category, ...db_catedories])
    }

    return (
        <div className='nav_menu_container'>
            <h2>Categories: </h2>
            {categories.map(category => (
                <div className="category">
                   <Link to={`/${category}`}><h3>{category}</h3></Link>
                </div>
            ))}
        </div>
    );
}

export default NavigationMenu;

