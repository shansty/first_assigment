import React from 'react';

import './utils.css'


const Header: React.FC = () => {
    return (
        <div className='header_container'>
            <div className='logo'>
                <i className="fa fa-qrcode"></i>
                <a href="http://google.com">Logo_for_shop</a>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Dropdown </button>
                <div className="dropdown-content">
                    <a href="#">Profile</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
        </div>
    );
}

export default Header;
