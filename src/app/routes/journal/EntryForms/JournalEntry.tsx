import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import BackButton from '../../../../components/Shared/NavigationButtons/BackButton';
import SaveNextButton from '../../../../components/Shared/NavigationButtons/SaveNextButton';
import SkipButton from '../../../../components/Shared/NavigationButtons/SkipButton';
import { saveJournalEntry } from '../../../../services/journalService';

interface OutletContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  lastIndex: number;
}

const JournalTextEntry: React.FC = () => {
  const { goTo, currentIndex } = useOutletContext<OutletContextType>();

  const [journalEntry, setJournalEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    const success = await saveJournalEntry(journalEntry);
    setIsSaving(false);

    if (success) {
      setJournalEntry('');
      goTo(currentIndex + 1);
    } else {
      alert('Error saving your entries. Please try again.');
    }
  };

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="journal-entry-textarea">Journal Entry:</label>
          <textarea
            id="journal-entry-textarea"
            value={journalEntry}
            placeholder="Write your journal entry here..."
            onChange={(e) => setJournalEntry(e.target.value)}
            rows={6}
          />
        </div>
      </form>
      <div>
        <BackButton onClick={() => goTo(currentIndex - 1)} />
        <SaveNextButton onClick={handleSaveAndNext} disabled={isSaving || !journalEntry.trim()} />
        <SkipButton onClick={() => goTo(currentIndex + 1)} />
      </div>
    </section>
  );
};

export default JournalTextEntry;
