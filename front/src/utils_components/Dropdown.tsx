import React from 'react';
import profile from '../assets/user_p.png';

const HeaderDropdown: React.FC = () => {
    const token = null;
    const user_id = null;
    //token will be getting from localStorage
    //if token exists than link to profile, if not, than login/register
    return (
        <div className="dropdown">
            <button className="dropbtn">
                <img src={profile} alt="profile" className="profile_img"></img>
                <p className='profile_name'>Name LastName</p>
            </button>
            <div className="dropdown-content">
                {token ?
                    <a href={`/profile/${user_id}`}>Profile</a>
                    :
                    <>
                        <a href="/login">Sign In</a>
                    </>
                }
            </div>
        </div>
    );
}

export default HeaderDropdown;
