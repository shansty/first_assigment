import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
    const categories = ["Books", "Toys", "Food", "Beverages", "Electronics", "Fashion"]
    return (
        <div className='nav_menu_container'>
            {categories.map(category => (
                <div className="category">
                    <Link to={`/?category=${category}`}><h3>{category}</h3></Link>
                </div>
            ))}
        </div>
    );
}

export default NavigationMenu;
