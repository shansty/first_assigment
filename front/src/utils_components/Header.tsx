import React from 'react';
import Logo from './Logo';
import Dropdown from './Dropdown';
import './utils.css'


const Header: React.FC = () => {
    return (
        <div className='header_container'>
            <Logo />
            <Dropdown />
        </div>
    );
}

export default Header;
