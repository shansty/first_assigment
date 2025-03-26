import React from 'react';

interface ConfirmationModalProps {
    onClose: () => void;
    message: string;
    title: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose, message, title }) => {

    return (
        <div className="modal">
            <div className="modal_content">
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
}

export default ConfirmationModal;
