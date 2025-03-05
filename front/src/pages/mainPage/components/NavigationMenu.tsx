import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategoriesNames } from '../../../axios';

const NavigationMenu = () => {
    const[categories, setCategories] = useState<String[]>([]);
    useEffect(() => {
        getCategoriesNames(setCategories);
    }, [])
    return (
        <div className='nav_menu_container'>
            <h2>Categories: </h2>
            {categories.map(category => (
                <div className="category">
                    <Link to={`/?category=${category}`}><h3>{category}</h3></Link>
                </div>
            ))}
        </div>
    );
}

export default NavigationMenu;
