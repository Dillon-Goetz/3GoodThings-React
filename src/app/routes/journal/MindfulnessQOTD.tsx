import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { allQuotes } from '../../../lib/quotes'; // 1. Import your new master quotes array
import JournalStepLayout from '@/components/Layouts/JournalStepLayout';
import { Button } from '@/components/ui/button';

// Define the shape of the context we expect from JournalLayout
interface JournalContextType {
  goTo: (i: number) => void;
  currentIndex: number;
}

const MindfulnessQOTD: React.FC = () => {
  const { goTo, currentIndex } = useOutletContext<JournalContextType>();

  // 2. Logic to select a new quote each day sequentially
  const epochMilliseconds = new Date().getTime();
  const epochDays = Math.floor(epochMilliseconds / (1000 * 60 * 60 * 24));
  
  // Use the number of days since epoch to get a consistent index for the day
  // This will cycle through all 90 quotes before repeating.
  const quoteIndex = epochDays % allQuotes.length;
  const dailyQuote = allQuotes[quoteIndex];

  return (
    <JournalStepLayout
      title="Today's Quotation"
      description={`"${dailyQuote.quote}"`}
      footerContent={
        <div className="flex justify-between items-center w-full">
          <Button variant="secondary" onClick={() => goTo(currentIndex - 1)}>
            Back
          </Button>
          <Button variant="outline" onClick={() => goTo(currentIndex + 1)}>
            Next
          </Button>
        </div>
      }
    >
        <p className="w-full max-w-md text-right text-muted-foreground">
            — {dailyQuote.author}
        </p>
    </JournalStepLayout>
  );
};

export default MindfulnessQOTD;