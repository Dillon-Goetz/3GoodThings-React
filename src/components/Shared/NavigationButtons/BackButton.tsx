import React from 'react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
    onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    // Style: "outline"
    return <Button variant="ghost" onClick={onClick}>Back</Button>;
};

export default BackButton;