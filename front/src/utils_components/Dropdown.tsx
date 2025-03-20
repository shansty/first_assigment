import React from 'react';
import profile from '../assets/user_p.png';
import { useEffect, useState } from 'react';
import { getToken, getIDFromToken } from '../utils';

const HeaderDropdown: React.FC = () => {

    const [userId, setUserId] = useState('')

    useEffect(() => {
        const token = getToken();
        if(token) {
            setUserId(getIDFromToken(token))
        }
    }, [])
    
    return (
        <div className="dropdown">
            <button className="dropbtn">
                <img src={profile} alt="profile" className="profile_img"></img>
                <p className='profile_name'>Name LastName</p>
            </button>
            <div className="dropdown-content">
                {userId ?
                    <a href={`/profile/${userId}`}>Profile</a>
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
