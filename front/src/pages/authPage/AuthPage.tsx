import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TypeUser } from '../../types';
import { signIn, signUp } from '../../axios';
import { getUserIdAndNavigateToProfile } from '../../utils';
import './authPage.css'

const AuthPage: React.FC = () => {

    const empty_user_data: TypeUser = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        address: "",
    }

    const [user, setUser] = useState<TypeUser>(empty_user_data);
    const [isRegister, setIsRegister] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getUserIdAndNavigateToProfile(navigate);
    }, [])

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await signIn(e, user)
        getUserIdAndNavigateToProfile(navigate);
    }

    const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await signUp(e, user)
        getUserIdAndNavigateToProfile(navigate)
    }

    const handleClick = () => {
        setIsRegister(!isRegister)
    }

    return (
        <div className='formBlock'>
            <div className='form_conteiner'>
                <form className="auth_form">
                    <label htmlFor="email" /> Email
                    <input
                        required
                        value={user.email}
                        placeholder="Please enter email"
                        id="email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />

                    <label htmlFor="password" /> Password
                    <input
                        required
                        value={user.password}
                        placeholder="Please enter password"
                        id="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    {!isRegister && (
                        <>
                            <label htmlFor='firstName' /> First Name
                            <input
                                minLength={1}
                                maxLength={30}
                                required
                                value={user.first_name}
                                placeholder="Please enter first name"
                                id="firstName"
                                onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                            />
                        </>
                    )}

                    {!isRegister && (
                        <>
                            <label htmlFor='lastName' /> Last Name
                            <input
                                minLength={1}
                                maxLength={30}
                                value={user.last_name}
                                placeholder="Please enter last name"
                                id="lastName"
                                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                            />
                        </>
                    )}

                    {!isRegister && (
                        <>
                            <label htmlFor='addres' /> Addres
                            <input
                                required
                                value={user.address}
                                placeholder="Please enter addres"
                                id="addres"
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                            />
                        </>
                    )}

                    {isRegister && (
                        <>
                            <button className='btn-auth' onClick={login}>Sign In</button>
                            <p className="form_text" onClick={handleClick}>Don't have an account? Click to register.</p>
                        </>
                    )}

                    {!isRegister && (
                        <>
                            <button className='btn-auth' onClick={register}>Sign Up</button>
                            <p className="form_text" onClick={handleClick}>Click for sign in.</p>
                        </>
                    )}
                </form>
            </div>
        </div >
    );
}

export default AuthPage;