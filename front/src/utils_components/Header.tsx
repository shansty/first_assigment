import React from 'react';
import logo from '../assets/logo.jpg';

import './utils.css'


const Header: React.FC = () => {
    return (
        <div className='header_container'>
            <div className='logo'>
                <i className="fa fa-qrcode"></i>
                <a href="http://google.com">QR_Connect</a>
            </div>
            <div className="dropdown">
                <button className="dropbtn">Dropdown
                    <i className="fa fa-caret-down"></i>
                </button>
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
