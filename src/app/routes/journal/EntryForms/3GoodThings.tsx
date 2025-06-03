import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import BackButton from '../../../../components/Shared/NavigationButtons/BackButton';
import SaveNextButton from '../../../../components/Shared/NavigationButtons/SaveNextButton';
import { saveThreeGoodThings } from '../../../../services/journalService';

interface OutletContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  lastIndex: number;
}

const ThreeGoodThings: React.FC = () => {
  const { goTo, currentIndex } = useOutletContext<OutletContextType>();

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
      setGoodThing1('');
      setGoodThing2('');
      setGoodThing3('');
      goTo(currentIndex + 1);
    } else {
      alert('Error saving your entries. Please try again.');
    }
  };

  return (
    <section>
      <p>Think back and share your three good things of the day</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Good Thing 1:</label>
          <textarea value={goodThing1} onChange={(e) => setGoodThing1(e.target.value)} />
        </div>
        <div>
          <label>Good Thing 2:</label>
          <textarea value={goodThing2} onChange={(e) => setGoodThing2(e.target.value)} />
        </div>
        <div>
          <label>Good Thing 3:</label>
          <textarea value={goodThing3} onChange={(e) => setGoodThing3(e.target.value)} />
        </div>
        <div>
          <label>Share to Feed:</label>
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        </div>
      </form>
      <div>
        <BackButton onClick={() => goTo(currentIndex - 1)} />
        <SaveNextButton onClick={handleSaveAndNext} disabled={isSaving} />
      </div>
    </section>
  );
};

export default ThreeGoodThings;
