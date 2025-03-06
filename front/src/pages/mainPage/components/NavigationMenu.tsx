import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategoriesNames } from '../../../axios';

const NavigationMenu = ({ onToggle }: { onToggle: (isOpen: boolean) => void }) => {
    const [categories, setCategories] = useState<String[]>([]);
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        getCategoriesNames(setCategories);
    }, [])

    const handleToggle = () => {
        setIsOpen(prev => {
            const newState = !prev;
            onToggle(newState);  
            return newState;
        });
    };

    return  (
        <div className={isOpen ? "nav_menu open" : "nav_menu closed"}>
            <div className={isOpen ? "menu_button_open" : "menu_button_close"} onClick={handleToggle}>
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

