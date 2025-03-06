import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCategoriesNames } from '../../../axios';

interface NavigationMenuProps {
    onResultsChange: (category: string) => void;
    onToggle: (isOpen: boolean) => void
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ onResultsChange, onToggle }) => {
    const default_category = "all categories"
    const [categories, setCategories] = useState<string[]>([default_category]);
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {
        setAllCategories();
    }, [])


    const handleToggle = () => {
        setIsOpen(prev => {
            const newState = !prev;
            onToggle(newState);  
            return newState;
        });
    };

    const setAllCategories = async () => {
        const db_catedories = await getCategoriesNames();
        setCategories([default_category, ...db_catedories])
    }

    return (
        <div className={isOpen ? "nav_menu open" : "nav_menu closed"}>
            <div className={isOpen ? "menu_button_open" : "menu_button_close"} onClick={handleToggle}>
                {isOpen ? '✖' : '▶'}
            </div>
            <div className='nav_menu_container'>
                {isOpen && <h2 className='menu_title'>Categories: </h2>}
                {isOpen && categories.map((category, index) => (
                    <div className="category" key={index}>
                        <Link to={category === default_category ? `/` : `/${category}`}>
                            <h3 onClick={() => onResultsChange(category)}>{category}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NavigationMenu;

