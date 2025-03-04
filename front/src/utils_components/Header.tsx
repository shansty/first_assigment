import React from 'react';
import logo from '../assets/logo.png';
import profile from '../assets/user_p.png';
import './utils.css'


const Header: React.FC = () => {
    return (
        <div className='header_container'>
            <div className='logo'>
                <a href='#' >
                    <img src={logo} alt="Logo" className="logo_img"></img>
                </a>
            </div>
            <div className="dropdown">
                <button className="dropbtn">
                    <img src={profile} alt="profile" className="profile_img"></img>
                    <p className='profile_name'>Name LastName</p>
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
