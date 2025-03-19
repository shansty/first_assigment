import React from 'react';
import { useState, useEffect } from 'react';

const ProfileForm = () => {
    const [allowEdit, setAllowEdit] = useState(false);
    const [user, setUser] = useState({});

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAllowEdit(true);
    };

    const handleSubmit = async () => {
        setAllowEdit(false);
        // try {
        //     await axios.patch(PROFILE_URL, user,  
        //         {headers: {
        //             'Access-Control-Allow-Origin': '*', 
        //             'Content-Type': 'application/json'}});
        // } catch (err) {
        //     window.alert(`Error: ${err}`);
        // }
    }

    return (
        <div className='profile_page'>
            <h2>Ваш профиль</h2>
            <form className="profile_form">
                <div className="profile_form_field">
                    <label htmlFor="first_name">First name:</label>
                    <input
                        type="text"
                        id="first_name"
                        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                        // value={user.first_name}
                        disabled={!allowEdit}
                    />
                </div>
                <div className="profile_form_field">
                    <label htmlFor="last_name">Last name:</label>
                    <input
                        type="text"
                        id="last_name"
                        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                        // value={user.last_name}
                        disabled={!allowEdit}
                    />
                </div>
                <div className="profile_form_field">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        // value={user.email}
                        disabled={!allowEdit}
                    />
                </div>
                <div className="profile_form_field">
                    <label htmlFor="addres">Addres: </label>
                    <input
                        type="text"
                        id="addres"
                        onChange={(e) => setUser({ ...user, addres: e.target.value })}
                        // value={user.addres}
                        disabled={!allowEdit}
                    />
                </div>
                <div className="profile_form_field">
                    <button className="profile_button" onClick={handleEdit}> Изменить профиль </button>
                    <button className="profile_button" type="submit" onClick={handleSubmit}> Сохранить изменения профиля </button>
                </div>
            </form>
        </div >
    );
}

export default ProfileForm;
