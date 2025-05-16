import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import VibeCheck from './VibeCheck';
import CenteringBreath from './CenteringBreath';
import MindfulnessQOTD from './MindfulnessQOTD';
import ThreeGoodThings from './EntryForms/3GoodThings';
import OneThorn from './EntryForms/OneThorn';
import JournalEntry from './EntryForms/JournalEntry';
import AddPhoto from './AddPhoto';
import SubmitAll from './SubmitAll';
import useDailyReset from '../../Hooks/useDailyReset';

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

    // Redirect to the first form if on the base path
    useEffect(() => {
        if (window.location.pathname === "/journal") {
            navigate(firstFormPath);
        }
    }, [navigate]);

    // Reset journal data at midnight
        useDailyReset(() => {
            console.log('Resetting journal data...');
            localStorage.removeItem('journalEntries');
        });

        const navigateToForm = (index: number) => {
            setCurrentFormIndex(index);
            navigate(`/journal/${forms[index].path}`);
        };

    const handleNextForm = (vibe?: string) => {
        if (currentFormIndex < lastFormIndex) {
            const nextPath = `/journal/${forms[currentFormIndex + 1].path}`;
            const query = vibe ? `?vibe=${vibe}` : "";
            console.log(`Navigating to: ${nextPath}${query}`); // Log the next path and query
            navigate(`${nextPath}${query}`);
            setCurrentFormIndex(currentFormIndex + 1);
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
