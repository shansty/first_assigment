import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './authPage.css'
// import { signIn, signUp } from '../../axios';
// import axios from 'axios';


const AuthPage: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addres, setAddres] = useState("");
    const [isRegister, setIsRegister] = useState(true);

    const navigate = useNavigate();

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // signIn(e, username, password, setUsername, setPassword, navigate)
    }

    const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // signUp(e, setIsRegister, isRegister, email, password, username, setEmail, setUsername, setPassword)
    }

    const handleClick = () => {
        setIsRegister(!isRegister)
    }

    return (
        <div className='block formBlock'>
            <div className='container-fluid'>
                <form className="auth_form">
                    <label htmlFor="email" /> Email
                    <input
                        value={email}
                        placeholder="Please enter email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password" /> Password
                    <input
                        value={password}
                        placeholder="Please enter password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isRegister && (
                        <>
                            <label htmlFor='firstName' /> First Name
                            <input
                                value={firstName}
                                placeholder="Please enter first name"
                                id="firstName"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </>
                    )}

                    {!isRegister && (
                        <>
                            <label htmlFor='lastName' /> Last Name
                            <input
                                value={lastName}
                                placeholder="Please enter last name"
                                id="lastName"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </>
                    )}

                    {!isRegister && (
                        <>
                            <label htmlFor='addres' /> Addres
                            <input
                                value={addres}
                                placeholder="Please enter addres"
                                id="addres"
                                onChange={(e) => setAddres(e.target.value)}
                            />
                        </>
                    )}

                    {isRegister && (
                        <>
                            <button className='sign_in_btns btn-auth' onClick={login}>Sign In</button>
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