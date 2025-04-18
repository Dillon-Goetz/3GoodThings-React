// SaveNextButton.tsx
import React from 'react';

export interface SaveNextButtonProps {
    onClick: () => void;
    disabled?: boolean; // added for UX touch to disable the button while saving. 
}

const SaveNextButton: React.FC<SaveNextButtonProps> = ({ onClick, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled}>
            Save & Next
        </button>
    );
};

export default SaveNextButton;
