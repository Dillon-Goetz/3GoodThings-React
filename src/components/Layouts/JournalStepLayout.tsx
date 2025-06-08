// src/components/Layouts/JournalStepLayout.tsx
import React from 'react';

interface JournalStepLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerContent: React.ReactNode;
}

export const JournalStepLayout: React.FC<JournalStepLayoutProps> = ({
  title,
  description,
  children,
  footerContent,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        
        <div className="space-y-6">
          {children}
        </div>
        
        <div className="mt-8 pt-6 border-t">
          {footerContent}
        </div>
      </div>
    </div>
  );
};