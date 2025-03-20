import React from 'react';
import { useState, useEffect } from 'react';
import { getUserData } from '../../axios';
import { useParams, Params } from 'react-router-dom';
import { TypeUser } from '../../types';
import { editUserData } from '../../axios';

const ProfileForm = () => {
    const empty_user_data: TypeUser = {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            address: "",
        }

    const [allowEdit, setAllowEdit] = useState(false);
    const [user, setUser] = useState(empty_user_data);
    const { user_id } = useParams<{ user_id: string }>();

    useEffect(() => {
        setUserDataFromServer();
    }, [])

    const setUserDataFromServer = async () => {
        const data = await getUserData(user_id as string);
        if (data) {
            setUser(data)
        }
    }

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAllowEdit(true);
    };

    const handleSubmit = async () => {
        setAllowEdit(false);
        editUserData(user, user_id as string)
    }

    return (
        <div className='profile_page'>
            <div className='profile_container'>
                <h2>Ваш профиль</h2>

                <form className="profile_form">
                    <div className="profile_form_field">
                        <label htmlFor="first_name">First name:</label>
                        <input
                            type="text"
                            id="first_name"
                            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                            value={user.first_name}
                            disabled={!allowEdit}
                        />
                    </div>
                    <div className="profile_form_field">
                        <label htmlFor="last_name">Last name:</label>
                        <input
                            type="text"
                            id="last_name"
                            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                            value={user.last_name}
                            disabled={!allowEdit}
                        />
                    </div>
                    <div className="profile_form_field">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            value={user.email}
                            disabled={!allowEdit}
                        />
                    </div>
                    <div className="profile_form_field">
                        <label htmlFor="addres">Addres: </label>
                        <input
                            type="text"
                            id="addres"
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                            value={user.address}
                            disabled={!allowEdit}
                        />
                    </div>
                    <div className='profile_buttons'>
                        {!allowEdit && <button className="profile_button" onClick={handleEdit}> Изменить профиль </button>}
                        {allowEdit && <button className="profile_button" type="submit" onClick={handleSubmit}> Сохранить изменения профиля </button>}
                    </div>
                </form>
            </div >
        </div>
    );
}

export default ProfileForm;
