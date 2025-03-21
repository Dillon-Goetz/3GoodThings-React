import React from 'react';

interface SkipButtonProps {
    onClick: () => void;
    text?: string; // Optional text prop if you want to say 'Next' or 'Advance' without saving anything. 
}

const SkipButton: React.FC<SkipButtonProps> = ({ onClick, text = "Skip" }) => {
    return <button onClick={onClick}>{text}</button>;
};

export default SkipButton;