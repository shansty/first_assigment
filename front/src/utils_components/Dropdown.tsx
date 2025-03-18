import React from 'react';
import profile from '../assets/user_p.png';

const HeaderDropdown: React.FC = () => {
    return (
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
    );
}

export default HeaderDropdown;
