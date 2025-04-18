import React, { useState } from 'react';
import BackButton from '../Shared/NavigationButtons/BackButton';
import SaveNextButton from '../Shared/NavigationButtons/SaveNextButton';
import { saveThreeGoodThings } from '../../services/journalService';

interface ThreeGoodThingsProps {
    onNext: () => void;
    onBack: () => void;
}

const ThreeGoodThings: React.FC<ThreeGoodThingsProps> = ({ onNext, onBack }) => {
    const [goodThing1, setGoodThing1] = useState('');
    const [goodThing2, setGoodThing2] = useState('');
    const [goodThing3, setGoodThing3] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveAndNext = async () => {
        setIsSaving(true);
        const success = await saveThreeGoodThings(goodThing1, goodThing2, goodThing3, isPublic);
        setIsSaving(false);

        if (success) {
            setGoodThing1('');
            setGoodThing2('');
            setGoodThing3('');
            onNext();
        } else {
            alert('Error saving your entries. Please try again.');
        }
    };

    return (
        <section>
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
                <BackButton onClick={onBack} />
                <SaveNextButton onClick={handleSaveAndNext} disabled={isSaving} />
            </div>
        </section>
    );
};

export default ThreeGoodThings;
