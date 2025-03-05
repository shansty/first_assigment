import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategoriesNames } from '../../../axios';

const NavigationMenu = () => {
    const [categories, setCategories] = useState<String[]>([]);
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        getCategoriesNames(setCategories);
    }, [])

    return  (
        <div className={isOpen ? "menu_open" : ""}>
            <div className={isOpen ? "menu_button_open" : "menu_button_close"} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✖' : '▶'}
            </div>
            {isOpen && <h2 className='menu_title'>Categories: </h2>}
            {isOpen && categories.map(category => (
                <div className="category">
                    <Link to={`/?category=${category}`}><h3>{category}</h3></Link>
                </div>
            ))}
        </div>
    );
}

export default NavigationMenu;
