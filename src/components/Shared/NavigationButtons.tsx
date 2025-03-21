import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonsProps {
    currentFormIndex: number;
    formsLength: number;
    onNext: () => void;
    onSkip: () => void;
    showSkip?: boolean;
    showSubmit?: boolean;
    showBack?: boolean;
    onBack?: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    currentFormIndex,
    formsLength,
    onNext,
    onSkip,
    showSkip = true,
    showSubmit = true,
    showBack = false,
    onBack,
}) => {
    const navigate = useNavigate();

    return (
        <div>
            {showBack && (
                <button onClick={onBack}>Back</button>
            )}
            {showSkip && currentFormIndex < formsLength - 1 && (
                <button onClick={onSkip}>Skip</button>
            )}
            {currentFormIndex < formsLength - 1 && (
                <button onClick={onNext}>Next</button>
            )}
            {showSubmit && currentFormIndex === formsLength - 1 && (
                <button onClick={onNext}>Submit</button>
            )}
        </div>
    );
};

export default NavigationButtons;