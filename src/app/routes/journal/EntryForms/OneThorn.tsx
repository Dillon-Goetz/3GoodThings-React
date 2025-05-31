import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import BackButton from '../../../../components/Shared/NavigationButtons/BackButton';
import SaveNextButton from '../../../../components/Shared/NavigationButtons/SaveNextButton';
import SkipButton from '../../../../components/Shared/NavigationButtons/SkipButton';
import { saveOneThorn } from '../../../../services/journalService';

interface OutletContextType {
  goTo: (i: number) => void;
  currentIndex: number;
  lastIndex: number;
}

const OneThorn: React.FC = () => {
  const { goTo, currentIndex } = useOutletContext<OutletContextType>();
  const [oneThorn, setOneThorn] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAndNext = async () => {
    setIsSaving(true);
    const success = await saveOneThorn(oneThorn);
    setIsSaving(false);

    if (success) {
      setOneThorn('');
      goTo(currentIndex + 1);
    } else {
      alert('Error saving your entries. Please try again.');
    }
  };

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <p>Not all days are created equal, want to share one thorn?</p>
          <label htmlFor="one-thorn-textarea">One Thorn:</label>
          <textarea
            id="one-thorn-textarea"
            value={oneThorn}
            placeholder="Optional: one thorn.."
            onChange={(e) => setOneThorn(e.target.value)}
            rows={5}
          />
        </div>
      </form>
      <div>
        <BackButton onClick={() => goTo(currentIndex - 1)} />
        <SaveNextButton onClick={handleSaveAndNext} disabled={isSaving || !oneThorn.trim()} />
        <SkipButton onClick={() => goTo(currentIndex + 1)} />
      </div>
    </section>
  );
};

export default OneThorn;
