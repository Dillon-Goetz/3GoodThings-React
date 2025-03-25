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
    // State to track the current form index.
    const [currentFormIndex, setCurrentFormIndex] = useState(0);
    // Navigation hook.
    const navigate = useNavigate();

    // Array of form components and their associated data.
    const forms = [
        { component: (props: FormProps) => <VibeCheck {...props} />, title: "Vibe Check", path: "vibe-check" },
        { component: (props: FormProps) => <CenteringBreath {...props} />, title: "Centering Breath", path: "centering-breath" },
        { component: (props: FormProps) => <MindfulnessQOTD {...props} />, title: "Mindfulness QOTD", path: "mindfulness-qotd" },
        { component: (props: FormProps) => <ThreeGoodThings {...props} />, title: "3 Good Things", path: "3-good-things" },
        { component: (props: FormProps) => <OneThorn {...props} />, title: "One Thorn", path: "one-thorn" },
        { component: (props: FormProps) => <JournalEntry {...props} />, title: "Journal Entry", path: "journal-entry" },
        { component: (props: FormProps) => <AddPhoto {...props} />, title: "Add Photo (Optional)", path: "add-photo" },
        { component: (props: FormProps) => <SubmitAll {...props} />, title: "Submit All", path: "submit-all" },
    ];

    // Variables for last form index and first form path.
    const lastFormIndex = forms.length - 1;
    const firstFormPath = forms[0].path;

    // useEffect hook for initial navigation and daily reset logic.
    useEffect(() => {
        if (currentFormIndex === 0) {
            navigate(firstFormPath);
        }

        // Daily Reset Logic
        const getTimeUntilMidnight = () => {
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(24, 0, 0, 0);
            return midnight.getTime() - now.getTime();
        };

        // Function to reset journal data.
        const resetJournalData = () => {
            console.log('Resetting journal data...');
            localStorage.removeItem('journalEntries'); // Example: clearing localStorage
            // Add your reset logic here
        };
        // Schedule the reset.
        const timeoutId = setTimeout(resetJournalData, getTimeUntilMidnight());

        // Clean up the timeout on unmount
        return () => clearTimeout(timeoutId);
    }, [currentFormIndex, navigate, firstFormPath]);

    // Function to navigate to a specific form index.
    const navigateToForm = (index: number) => {
        setCurrentFormIndex(index);
        navigate(forms[index].path);
    };

    // Function to handle navigation to the next form.
    const handleNextForm = () => {
        if (currentFormIndex < lastFormIndex) {
            navigateToForm(currentFormIndex + 1);
        }
    };

    // Function to handle skipping to the submit all form or profile.
    const handleSkip = () => {
        if (currentFormIndex < lastFormIndex) {
            navigateToForm(lastFormIndex);
        } else {
            navigate('/profile');
        }
    };
    // Function to handle navigation to the previous form.
    const handleBack = () => {
        if (currentFormIndex > 0) {
            navigateToForm(currentFormIndex - 1);
        }
    };
    // Render component for when all forms are completed.
    if (currentFormIndex >= forms.length) {
        return (
            <div>
                <h2>All entries completed!</h2>
                <button onClick={() => navigate('/profile')}>Go to Profile</button>
            </div>
        );
    }
    // Render the form components using Routes.
    return (
        <div>
            <Routes>
                {forms.map((form, index) => (
                    <Route key={index} path={form.path} element={form.component({ onNext: handleNextForm, onBack: handleBack })} />
                ))}
            </Routes>
        </div>
    );
};

export default JournalHome;