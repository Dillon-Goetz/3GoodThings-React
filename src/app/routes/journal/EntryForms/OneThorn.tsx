import React from 'react'; // No longer need useState
import { useOutletContext } from 'react-router-dom';
import { saveOneThorn } from '../../../../services/journalService';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import JournalStepLayout from '@/components/Layouts/JournalStepLayout';

// Define the shape of the context we expect from JournalLayout
interface JournalContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  journalData: {
    oneThorn: string;
  };
  onDataChange: (field: string, value: any) => void;
}

const OneThorn: React.FC = () => {
  // 1. Get the shared state and update function from the context
  const { goTo, currentIndex, journalData, onDataChange } = useOutletContext<JournalContextType>();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    // This saves the data from the shared state
    const success = await saveOneThorn(journalData.oneThorn);
    setIsSaving(false);

    if (success) {
      goTo(currentIndex + 1);
    } else {
      alert('Error saving your entry. Please try again.');
    }
  };
 return (
        // Add a negative top margin here to pull the whole component up
        <div className="-mt-16"> 
            <JournalStepLayout
                title="One Thorn"
                description="Acknowledge one challenge or difficulty from your day. What was the 'thorn' on your rose?"
                footerContent={
                    <div className="flex justify-between items-center">
                        <Button variant="outline" onClick={() => goTo(currentIndex - 1)}>
                            Back
                        </Button>
                        <Button variant="secondary" onClick={handleSaveAndNext} disabled={isSaving || !journalData.oneThorn.trim()}>
                            {journalData.oneThorn.trim() ? "Save & Next" : "Skip & Next"}
                        </Button>
                    </div>
                }
            >
                <div className="grid w-full gap-1.5">
                    <Textarea
                        id="one-thorn"
                        placeholder="e.g., I felt overwhelmed by my to-do list."
                        value={journalData.oneThorn}
                        onChange={(e) => onDataChange('oneThorn', e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>
            </JournalStepLayout>
        </div>
    );
};

export default OneThorn;