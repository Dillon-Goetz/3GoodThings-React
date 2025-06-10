// src/components/Layouts/JournalStepLayout.tsx
import React from 'react';

interface JournalStepLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerContent: React.ReactNode;
}

const JournalStepLayout: React.FC<JournalStepLayoutProps> = ({ title, description, children, footerContent }) => {
    return (
        // This className now has responsive logic:
        // - justify-start: Default for mobile (aligns to top).
        // - md:justify-center: On medium screens and up, it centers vertically.
        // - pt-16: Adds padding to the top on mobile.
        // - md:pt-4: Reduces top padding on desktop where centering handles the space.
        <div className="flex flex-col items-center justify-start md:justify-center min-h-[calc(100vh-8rem)] p-4 pt-16 md:pt-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
            <div className="w-full max-w-md mt-8">
                {children}
            </div>
            {footerContent && <div className="w-full max-w-md mt-8">{footerContent}</div>}
        </div>
    );
};

export default JournalStepLayout;