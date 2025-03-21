import React from 'react';
import { useState, useEffect } from 'react';
import { getUserData } from '../../axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TypeUser } from '../../types';
import { editUserData } from '../../axios';
import FormField from '../../utils_components/FormField';

interface ProfileFormProps {
    user: TypeUser,
    setUser: React.Dispatch<React.SetStateAction<TypeUser>>,
    user_id: string | undefined,
    token: string
}

const ProfileForm:React.FC<ProfileFormProps> = ({ user, setUser, user_id, token }) => {

    const [allowEdit, setAllowEdit] = useState(false);
    const navigate = useNavigate();

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    }

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAllowEdit(true);
    };

    const handleSubmit = async () => {
        setAllowEdit(false);
        await editUserData(user, user_id as string, token, navigate)
        navigate(0)
    }

    return (
        <div className='profile_page'>
            <div className='profile_container'>
                <h2>Your profile</h2>

                <form className="profile_form">
                    <FormField
                        value={user.first_name as string}
                        required={true}
                        allowEdit={!allowEdit}
                        minLength={1}
                        maxLength={30}
                        id="first_name"
                        handleOnChange={handleOnChange}
                        type={"text"}
                    />
                    <FormField
                        value={user.last_name as string}
                        required={true}
                        allowEdit={!allowEdit}
                        minLength={1}
                        maxLength={30}
                        id="last_name"
                        handleOnChange={handleOnChange}
                        type={"text"}
                    />
                    <FormField
                        value={user.email as string}
                        required={true}
                        allowEdit={!allowEdit}
                        id="email"
                        handleOnChange={handleOnChange}
                        type={"text"}
                    />
                    <FormField
                        value={user.address as string}
                        required={false}
                        allowEdit={!allowEdit}
                        id="address"
                        handleOnChange={handleOnChange}
                        type={"text"}
                    />
                    <div className='profile_buttons'>
                        {!allowEdit && <button className="profile_button" onClick={handleEdit}> Edit profile </button>}
                        {allowEdit && <button className="profile_button" type="submit" onClick={handleSubmit}> Save profile changing</button>}
                    </div>
                </form>
            </div >
        </div>
    );
}

export default ProfileForm;
