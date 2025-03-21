import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { TypeUser } from '../../types';
import { signIn, signUp } from '../../axios';
import { getUserIdAndNavigateToProfile } from '../../utils';
import FormField from '../../utils_components/FormField';
import NonRegistredField from './NonRegistredField';
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

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { id, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [id]: value,
        }));
    }

    const handleClick = () => {
        setIsRegister(!isRegister)
    }

    return (
        <div className='formBlock'>
            <div className='form_conteiner'>
                <form className="auth_form">
                    <FormField
                        value={user.email as string}
                        required={true}
                        id="email"
                        handleOnChange={handleOnChange}
                        type={"text"}
                        placeholder={"Please enter email"}
                    />
                    <FormField
                        value={user.password as string}
                        required={true}
                        id="password"
                        handleOnChange={handleOnChange}
                        type={"text"}
                        placeholder={"Please enter password"}
                    />

                   {!isRegister && <NonRegistredField user={user} handleOnChange={handleOnChange} register={register} handleClick={handleClick}/>}

                    {isRegister && (
                        <>
                            <button className='btn-auth' onClick={login}>Sign In</button>
                            <p className="form_text" onClick={handleClick}>Don't have an account? Click to register.</p>
                        </>
                    )}
                </form>
            </div>
        </div >
    );
}

export default AuthPage;