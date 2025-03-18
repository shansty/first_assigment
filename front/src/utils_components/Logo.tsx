import React from 'react';
import logo from '../assets/logo.png';

const Logo: React.FC = () => {
    return (
        <div className='logo'>
            <a href='#' >
                <img src={logo} alt="Logo" className="logo_img"></img>
            </a>
        </div>
    );
}

export default Logo;
