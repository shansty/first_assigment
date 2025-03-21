import React from 'react';
import profile from '../assets/user_p.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken, getIDFromToken } from '../utils';
import { getUserData } from '../axios';

const HeaderDropdown: React.FC = () => {

    const [userId, setUserId] = useState<string>()
    const [userName, setUserName] = useState<string>()
    const token = getToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const id = getIDFromToken(token);
            setUserId(id);
        }
    }, []);


    useEffect(() => {
        if (userId) {
            getFullNameData();
        }
    }, [userId]);


    const getFullNameData = async () => {
        const userData = await getUserData(userId as string, token as string, navigate)
        if (userData) {
            let fullName = `${userData.first_name} ${userData.last_name}`
            setUserName(fullName)
        }
    }


    return (
        <div className="dropdown">
            <button className="dropbtn">
                <img src={profile} alt="profile" className="profile_img"></img>
                {userName && <p className='profile_name'>{userName}</p>}
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
