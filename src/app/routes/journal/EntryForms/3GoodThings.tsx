// src/app/routes/journal/EntryForms/3GoodThings.tsx
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { saveThreeGoodThings } from '../../../../services/journalService';

// Import shadcn/ui components
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

// Import our new layout
import { JournalStepLayout } from '@/components/Layouts/JournalStepLayout';

interface OutletContextType {
  goTo: (i: number) => void;
  currentIndex: number;
}

const ThreeGoodThings: React.FC = () => {
  const { goTo, currentIndex } = useOutletContext<OutletContextType>();
  
  // Logic and state live directly inside the component
  const [goodThing1, setGoodThing1] = useState('');
  const [goodThing2, setGoodThing2] = useState('');
  const [goodThing3, setGoodThing3] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    const success = await saveThreeGoodThings(goodThing1, goodThing2, goodThing3, isPublic);
    setIsSaving(false);

    if (success) {
      goTo(currentIndex + 1);
    } else {
      alert('Error saving your entries. Please try again.');
    }
  };

  const areAllThingsFilled = goodThing1.trim() && goodThing2.trim() && goodThing3.trim();

  return (
    <JournalStepLayout
      title="Three Good Things"
      description="Reflect on your day and list three things that went well, no matter how small."
      footerContent={
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => goTo(currentIndex - 1)}>
            Back
          </Button>
          <Button onClick={handleSaveAndNext} disabled={isSaving || !areAllThingsFilled}>
            {isSaving ? 'Saving...' : 'Save & Next'}
          </Button>
        </div>
      }
    >
      {/* The form's JSX content */}
      <div className="grid w-full gap-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="good-thing-1">1.</Label>
          <Textarea
            id="good-thing-1"
            placeholder="e.g., I enjoyed my morning coffee."
            value={goodThing1}
            onChange={(e) => setGoodThing1(e.target.value)}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="good-thing-2">2.</Label>
          <Textarea
            id="good-thing-2"
            placeholder="e.g., A coworker gave me a nice compliment."
            value={goodThing2}
            onChange={(e) => setGoodThing2(e.target.value)}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="good-thing-3">3.</Label>
          <Textarea
            id="good-thing-3"
            placeholder="e.g., The weather was beautiful during my walk."
            value={goodThing3}
            onChange={(e) => setGoodThing3(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox 
            id="is-public" 
            checked={isPublic}
            onCheckedChange={(checked) => setIsPublic(Boolean(checked))}
          />
          <Label htmlFor="is-public" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Share with the community (optional)
          </Label>
        </div>
      </div>
    </JournalStepLayout>
  );
};

export default ThreeGoodThings;