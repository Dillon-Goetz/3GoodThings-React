
import React, { useState } from 'react';
import BackButton from '../../Shared/NavigationButtons/BackButton';
import SaveNextButton from '../../Shared/NavigationButtons/SaveNextButton';
import SkipButton from '../../Shared/NavigationButtons/SkipButton';
import { saveOneThorn } from '../../../services/journalService';

//one thorn is private and not shared. 
interface OneThornProps {
    onNext: () => void;
    onBack: () => void;
}

const OneThorn: React.FC<OneThornProps> = ({ onNext, onBack }) => {
    const [OneThorn, setOneThorn] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveAndNext = async () => {
        setIsSaving(true);
        const success = await saveOneThorn(oneThorn);
        setIsSaving(false);

        if (success) {
            SetOneThorn('');
            onNext();
        } else {
            alert('Error saving your entries. Please try again.');
        }
    };

    return (
      <section>
          <form onSubmit={(e) => e.preventDefault()}>
              <div>
                  <label>One Thorn:</label>
                  <textarea value={'one thorn..'} onChange={(e) => setOneThorn(e.target.value)} />
              </div>
          </form>
          <div>
              <BackButton onClick={onBack} />
              <SaveNextButton onClick={handleSaveAndNext} disabled={isSaving} />
              <SkipButton onClick={onNext} disabled={isSaving} /> {/* Skip button to go to next step */}
          </div>
      </section>
  );
};

export default OneThorn;
