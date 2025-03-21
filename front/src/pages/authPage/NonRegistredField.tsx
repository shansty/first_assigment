import React, { ChangeEvent } from 'react';
import FormField from '../../utils_components/FormField';
import { TypeUser } from '../../types';

interface NonRegisteredFieldProps {
    user: TypeUser;
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    register: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
    handleClick: () => void
}

const NonRegistredField: React.FC<NonRegisteredFieldProps> = ({ user, handleOnChange, register, handleClick }) => {

    return (
        <>
            <FormField
                value={user.first_name as string}
                id="first_name"
                handleOnChange={handleOnChange}
                type={"text"}
                minLength={1}
                maxLength={30}
                placeholder={"Please enter first name"}
                required={true}
            />
            <FormField
                value={user.last_name as string}
                id="last_name"
                handleOnChange={handleOnChange}
                type={"text"}
                minLength={1}
                maxLength={30}
                placeholder={"Please enter last name"}
            />
            <FormField
                value={user.address as string}
                id="address"
                handleOnChange={handleOnChange}
                type={"text"}
                minLength={1}
                maxLength={30}
                placeholder={"Please enter address"}
            />
            <button className='btn-auth' onClick={register}>Sign Up</button>
            <p className="form_text" onClick={handleClick}>Click for sign in.</p>
        </>
    );
}

export default NonRegistredField;
