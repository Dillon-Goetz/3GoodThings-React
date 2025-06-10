import React from 'react';
import { Button } from '@/components/ui/button';

export interface SaveNextButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

const SaveNextButton: React.FC<SaveNextButtonProps> = ({ onClick, disabled }) => {
    // Style: "secondary"
    return (
        <Button variant="secondary" onClick={onClick} disabled={disabled}>
            Save & Next
        </Button>
    );
};

export default SaveNextButton;