import React from 'react';

interface SaveNextButtonProps {
    onClick: () => void;
}

const SaveNextButton: React.FC<SaveNextButtonProps> = ({ onClick }) => {
    return <button onClick={onClick}>Save & Next</button>;
};

export default SaveNextButton;