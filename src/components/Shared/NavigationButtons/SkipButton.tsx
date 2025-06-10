import React from 'react';
import { Button } from '@/components/ui/button';

interface SkipButtonProps {
    onClick: () => void;
    text?: string;
}

const SkipButton: React.FC<SkipButtonProps> = ({ onClick, text = "Skip" }) => {
    // Style: "ghost"
    return <Button variant="outline" onClick={onClick}>{text}</Button>;
};

export default SkipButton;