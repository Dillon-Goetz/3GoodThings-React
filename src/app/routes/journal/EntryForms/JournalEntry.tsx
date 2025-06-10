import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { saveJournalEntry } from '../../../../services/journalService';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import JournalStepLayout from '@/components/Layouts/JournalStepLayout';

// Define the shape of the context we expect from JournalLayout
interface JournalContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  journalData: {
    journalText: string;
  };
  onDataChange: (field: string, value: any) => void;
}

const JournalEntry: React.FC = () => {
  const { goTo, currentIndex, journalData, onDataChange } = useOutletContext<JournalContextType>();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveAndNext = async () => {
    // This step is optional, so we only save if there is text.
    if (journalData.journalText.trim()) {
      setIsSaving(true);
      const success = await saveJournalEntry(journalData.journalText);
      setIsSaving(false);

      if (!success) {
        alert('Error saving your journal entry. Please try again.');
        return; // Stop if saving fails
      }
    }
    goTo(currentIndex + 1); // Navigate to the next step
  };

  const buttonText = journalData.journalText.trim() ? "Save & Next" : "Skip & Next";

  return (
    <JournalStepLayout
      title="Journal Entry"
      description="Optionally, write about anything else that is on your mind. Your journal entries are always private."
      footerContent={
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => goTo(currentIndex - 1)}>
            Back
          </Button>
          <Button variant="secondary" onClick={handleSaveAndNext} disabled={isSaving}>
            {buttonText}
          </Button>
        </div>
      }
    >
      <div className="grid w-full gap-1.5">
        <Textarea
          id="journal-entry-textarea"
          placeholder="Write as much or as little as you like..."
          // Bind the value and onChange to the shared state from the context
          value={journalData.journalText}
          onChange={(e) => onDataChange('journalText', e.target.value)}
          className="min-h-[200px]"
        />
      </div>
    </JournalStepLayout>
  );
};

export default JournalEntry;