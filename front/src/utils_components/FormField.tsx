import React from 'react';

interface FormFieldProps {
    value: string;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    allowEdit?: boolean;
    id: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    type?: string;
    placeholder?:string;
}

const FormField = React.memo<FormFieldProps>(({
    value,
    handleOnChange,
    allowEdit,
    id,
    minLength,
    maxLength,
    required,
    type,
    placeholder
}) => {

    const formatFieldName = (str: string): string => {
        return str
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/^./, (char) => char.toUpperCase());
    };

    return (
        <div className="profile_form_field">
            <label htmlFor={id}>{formatFieldName(id)}:</label>
            <input
                minLength={minLength}
                maxLength={maxLength}
                type={type}
                id={id}
                onChange={handleOnChange}
                value={value}
                disabled={allowEdit}
                required={required}
                placeholder={placeholder}
            />
        </div>
    );
});

export default FormField;
