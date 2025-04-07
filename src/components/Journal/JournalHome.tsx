import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import VibeCheck from './VibeCheck';
import CenteringBreath from './CenteringBreath';
import MindfulnessQOTD from './MindfulnessQOTD';
import ThreeGoodThings from './3GoodThings';
import OneThorn from './OneThorn';
import JournalEntry from './JournalEntry';
import AddPhoto from './AddPhoto';
import SubmitAll from './SubmitAll';

// Defines the props interface for the form components
export interface FormProps {
    onNext: () => void;
    onBack?: () => void;
}

const JournalHome: React.FC = () => {
    const [currentFormIndex, setCurrentFormIndex] = useState(0);
    const navigate = useNavigate();

    const forms = [
        { component: VibeCheck, title: "Vibe Check", path: "vibe-check" },
        { component: CenteringBreath, title: "Centering Breath", path: "centering-breath" },
        { component: MindfulnessQOTD, title: "Mindfulness QOTD", path: "mindfulness-qotd" },
        { component: ThreeGoodThings, title: "3 Good Things", path: "3-good-things" },
        { component: OneThorn, title: "One Thorn", path: "one-thorn" },
        { component: JournalEntry, title: "Journal Entry", path: "journal-entry" },
        { component: AddPhoto, title: "Add Photo (Optional)", path: "add-photo" },
        { component: SubmitAll, title: "Submit All", path: "submit-all" },
    ];

    const lastFormIndex = forms.length - 1;
    const firstFormPath = "/journal/vibe-check"; // Path to the first form

    useEffect(() => {
            navigate(firstFormPath);
        

    // Daily Reset Logic
    const getTimeUntilMidnight = () => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        return midnight.getTime() - now.getTime();
    };

    const resetJournalData = () => {
        console.log('Resetting journal data...');
        localStorage.removeItem('journalEntries'); 
    };

    const timeoutId = setTimeout(resetJournalData, getTimeUntilMidnight());
    return () => clearTimeout(timeoutId);
}, [navigate]); // Removed currentFormIndex and firstFormPath to avoid loop

const navigateToForm = (index: number) => {
    setCurrentFormIndex(index);
    navigate(`/journal/${forms[index].path}`);
};

const handleNextForm = () => {
    if (currentFormIndex < lastFormIndex) {
        navigateToForm(currentFormIndex + 1);
    }
};

const handleBack = () => {
    if (currentFormIndex > 0) {
        navigateToForm(currentFormIndex - 1);
    }
};
    return (
        <div>
            <Routes>
                {/* Default Route (VibeCheck) when visiting /journal */}
                <Route index element={<VibeCheck onNext={handleNextForm} />} />

                {forms.map((form, index) => (
                    <Route 
                        key={index} 
                        path={form.path} 
                        element={<form.component onNext={handleNextForm} onBack={handleBack} />} 
                    />
                ))}
            </Routes>
        </div>
    );
};

export default JournalHome;
