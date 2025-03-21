import ProfileForm from './ProfileForm';
import { getToken } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './profilePage.css'

const ProfilePage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/login')
        }
    }, []);

    return (
        <>
            <ProfileForm />
        </>
    );
}

export default ProfilePage;
