import ProfileForm from './ProfileForm';
import { getToken } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
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
    const { user_id } = useParams<{ user_id: string }>();
    let token = getToken() as string;

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        setUserDataFromServer();
    }, [])

    const setUserDataFromServer = async () => {
        const data = await getUserData(user_id as string, token);
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
