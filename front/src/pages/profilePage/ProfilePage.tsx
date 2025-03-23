import ProfileForm from './ProfileForm';
import { getIDFromToken, getToken } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TypeUser } from '../../types';
import { getUserData } from '../../axios';
import './profilePage.css'

const ProfilePage = () => {

    const empty_user_data: TypeUser = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        address: "",
    }

    const [user, setUser] = useState(empty_user_data);
    const navigate = useNavigate();
    let token = getToken();
    const user_id = token ? getIDFromToken(token) : undefined;

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } 
    }, []);

    useEffect(() => {
        setUserDataFromServer();
    }, [])

    const setUserDataFromServer = async () => {
        const data = await getUserData(user_id as string, token as string);
        if (data) {
            setUser(data)
        } 
    }

    return (
        <>
            <ProfileForm user={user} setUser={setUser} user_id={user_id} token={token} />
        </>
    );
}

export default ProfilePage;
