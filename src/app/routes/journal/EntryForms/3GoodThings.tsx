import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import JournalStepLayout from '@/components/Layouts/JournalStepLayout';

// Define the shape of the context we expect from JournalLayout
interface JournalContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  journalData: {
    threeGoodThings: string[];
    isPublic: boolean;
  };
  onDataChange: (field: string, value: any) => void;
}

const ThreeGoodThings: React.FC = () => {
  const { goTo, currentIndex, journalData, onDataChange } = useOutletContext<JournalContextType>();

  // KEPT THE FULL ARRAY OF PLACEHOLDERS, AS REQUESTED
  const allPlaceholders = [
    "e.g., I enjoyed my morning coffee.",
    "e.g., A coworker gave me a nice compliment.",
    "e.g., The weather was beautiful during my walk.",
    "e.g., I listened to a song I love.",
    "e.g., I finished a task I was putting off.",
    "e.g., I had a nice chat with a friend.",
    "e.g., I learned something new today.",
    "e.g., I made a healthy meal.",
    "e.g., I spent some quality time with my pet.",
    "e.g., I read a chapter of a good book.",
    "e.g., The satisfying crunch of a good chip.",
    "e.g., Finding a parking spot right up front.",
    "e.g., The smell of rain on a hot day.",
    "e.g., A really good hair day.",
    "e.g., The feeling of fresh sheets.",
    "e.g., A perfectly ripe avocado.",
    "e.g., A meme that made me laugh out loud.",
    "e.g., The unique weirdness of my pet.",
    "e.g., That first sip of a cold drink.",
    "e.g., A stranger who held the door open.",
    "e.g., The joy of peeling off a protective film.",
    "e.g., A really satisfying sneeze.",
    "e.g., The fast-food worker who gave me extra fries.",
    "e.g., Hitting all green lights on my way home.",
    "e.g., A surprisingly good movie I stumbled upon.",
    "e.g., The comfort of my favorite sweatpants.",
    "e.g., A perfectly timed song on the radio.",
    "e.g., Finding money I forgot about in a pocket.",
    "e.g., A baby animal video.",
    "e.g., The smell of a bookstore.",
    "e.g., A funny typo in a text message.",
    "e.g., The satisfaction of unsubscribing from an email list.",
    "e.g., A cloud that looked like something funny.",
    "e.g., The cozy sound of a crackling fire.",
    "e.g., A delicious smell from a stranger's kitchen.",
    "e.g., Finally remembering that thing I was trying to remember.",
    "e.g., A really great pen.",
    "e.g., The feeling of taking off my shoes after a long day.",
    "e.g., A compliment from an unexpected person.",
    "e.g., The sheer genius of whoever invented pizza.",
    "e.g., I pet a dog",
    "e.g., My cat walked on my keyboard.",
    "e.g., I gave back to society",
  ];
  
  const randomPlaceholders = useMemo(() => {
    return allPlaceholders.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, []);

  const handleChange = (index: number, value: string) => {
    const newThings = [...journalData.threeGoodThings];
    newThings[index] = value;
    onDataChange('threeGoodThings', newThings);
  };

  const handleNext = () => {
    goTo(currentIndex + 1);
  };
  
  return (
    <JournalStepLayout
      title="Three Good Things"
      description="Reflect on your day and list three things that brought you joy, no matter how small."
      footerContent={
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => goTo(currentIndex - 1)}>
            Back
          </Button>
          <Button onClick={handleNext}>
            Next
          </Button>
        </div>
      }
    >
      <div className="grid w-full gap-4">
        {[0, 1, 2].map((index) => (
          <div className="grid w-full gap-1.5" key={index}>
            <Label htmlFor={`good-thing-${index + 1}`}>{index + 1}.</Label>
            <Textarea
              id={`good-thing-${index + 1}`}
              placeholder={randomPlaceholders[index]}
              value={journalData.threeGoodThings[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox 
            id="is-public" 
            checked={journalData.isPublic}
            onCheckedChange={(checked) => onDataChange('isPublic', Boolean(checked))}
          />
          <Label htmlFor="is-public" className="text-sm font-medium">
            Share with the community (optional)
          </Label>
        </div>
      </div>
    </JournalStepLayout>
  );
};

export default ThreeGoodThings;