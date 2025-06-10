// src/app/routes/journal/EntryForms/OneThorn.tsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import JournalStepLayout from '@/components/Layouts/JournalStepLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface JournalContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  journalData: {
    oneThorn: string;
  };
  onDataChange: (field: string, value: string) => void;
}

const OneThornForm: React.FC = () => {
  const { goTo, currentIndex, journalData, onDataChange } = useOutletContext<JournalContextType>();

  const handleNext = () => {
    goTo(currentIndex + 1);
  };

  return (
    <JournalStepLayout
      title="What was one 'thorn' or challenge from your day?"
      description="Acknowledging challenges helps build resilience. This is always private."
      footerContent={
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={() => goTo(currentIndex - 1)}>
            Back
          </Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      }
    >
      <Textarea
        placeholder="Describe a challenge or something that didn't go as planned..."
        value={journalData.oneThorn}
        onChange={(e) => onDataChange('oneThorn', e.target.value)}
        className="w-full min-h-[120px]"
      />
    </JournalStepLayout>
  );
};

export default OneThornForm;