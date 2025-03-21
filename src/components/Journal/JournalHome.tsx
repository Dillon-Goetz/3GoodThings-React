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

export interface FormProps {
    onNext: () => void;
    onBack?: () => void;
  }

const JournalHome: React.FC = () => {
    const [currentFormIndex, setCurrentFormIndex] = useState(0);
    const navigate = useNavigate();

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
    

    const lastFormIndex = forms.length - 1;
    const firstFormPath = forms[0].path;

    useEffect(() => {
        if (currentFormIndex === 0) {
            navigate(firstFormPath);
        }
    }, [currentFormIndex, navigate, firstFormPath]);

    const navigateToForm = (index: number) => {
        setCurrentFormIndex(index);
        navigate(forms[index].path);
    };

    const handleNextForm = () => {
        if (currentFormIndex < lastFormIndex) {
            navigateToForm(currentFormIndex + 1);
        }
    };

    const handleSkip = () => {
        if (currentFormIndex < lastFormIndex) {
            navigateToForm(lastFormIndex);
        } else {
            navigate('/profile');
        }
    };

    const handleBack = () => {
        if (currentFormIndex > 0) {
            navigateToForm(currentFormIndex - 1);
        }
    };

    if (currentFormIndex >= forms.length) {
        return (
            <div>
                <h2>All entries completed!</h2>
                <button onClick={() => navigate('/profile')}>Go to Profile</button>
            </div>
        );
    }

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