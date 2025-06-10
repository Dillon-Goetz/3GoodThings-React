// src/app/routes/journal/EntryForms/JournalEntry.tsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import JournalStepLayout from '@/components/Layouts/JournalStepLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface JournalContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  journalData: {
    journalText: string;
  };
  onDataChange: (field: string, value: string) => void;
}

const JournalEntryForm: React.FC = () => {
  const { goTo, currentIndex, journalData, onDataChange } = useOutletContext<JournalContextType>();

  const handleNext = () => {
    goTo(currentIndex + 1);
  };

  return (
    <JournalStepLayout
      title="Add a Journal Entry"
      description="Feel free to write more about your day. This is always private."
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
        placeholder="Write as much as you like..."
        value={journalData.journalText}
        onChange={(e) => onDataChange('journalText', e.target.value)}
        className="w-full min-h-[150px]"
      />
    </JournalStepLayout>
  );
};

export default JournalEntryForm;