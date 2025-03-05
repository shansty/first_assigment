import React from 'react';
import Logo from './Logo';
import HeaderDropdown from './Dropdown';
import './utils.css'


const Header: React.FC = () => {
    return (
        <div className='header_container'>
            <Logo />
            <HeaderDropdown />
        </div>
    );
}

export default Header;
