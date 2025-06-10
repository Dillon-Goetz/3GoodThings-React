import React from 'react';
import { Button } from '@/components/ui/button';

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
    return (
        <div className="flex items-center justify-between w-full mt-4">
            {/* BACK BUTTON: Use "outline" style */}
            {showBack && (
                <Button variant="outline" onClick={onBack}>Back</Button>
            )}

            {/* SPACER: This pushes the other buttons to the right */}
            <div className="flex-grow"></div>

            <div className="flex items-center gap-4">
                {/* SKIP BUTTON: Use "ghost" style */}
                {showSkip && currentFormIndex < formsLength - 1 && (
                    <Button variant="ghost" onClick={onSkip}>Skip</Button>
                )}
                
                {/* NEXT BUTTON: Use "secondary" style */}
                {currentFormIndex < formsLength - 1 && (
                    <Button variant="secondary" onClick={onNext}>Next</Button>
                )}

                {/* SUBMIT BUTTON: Use "secondary" style */}
                {showSubmit && currentFormIndex === formsLength - 1 && (
                    <Button variant="secondary" onClick={onNext}>Submit</Button>
                )}
            </div>
        </div>
    );
};

export default NavigationButtons;