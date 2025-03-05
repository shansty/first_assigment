import React from 'react';
import logo from '../assets/logo.png';
import './utils.css'


const Header: React.FC = () => {
    return (
        <div className='header_container'>
            <div className='logo'>
                <img src={logo} alt="Logo" className="logo_img"></img>
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
