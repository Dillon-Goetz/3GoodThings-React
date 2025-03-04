import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VibeCheck from './VibeCheck';
import CenteringBreath from './CenteringBreath';
import MindfulnessQOTD from './MindfulnessQOTD';
import ThreeGoodThings from './3GoodThings';
import OneThorn from './OneThorn';
import JournalEntry from './JournalEntry';
import AddPhoto from './AddPhoto';
import SubmitAll from './SubmitAll';

const JournalHome: React.FC = () => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const navigate = useNavigate();

  const forms = [
    { component: <VibeCheck />, title: "Vibe Check" },
    { component: <CenteringBreath />, title: "Centering Breath" },
    { component: <MindfulnessQOTD />, title: "Mindfulness QOTD" },
    { component: <ThreeGoodThings />, title: "3 Good Things" },
    { component: <OneThorn />, title: "One Thorn" },
    { component: <JournalEntry />, title: "Journal Entry" },
    { component: <AddPhoto />, title: "Add Photo (Optional)" },
    { component: <SubmitAll />, title: "Submit All" }, // The last "form"
  ];

  const handleNextForm = () => {
    setCurrentFormIndex(currentFormIndex + 1);
  };

  const handleSkip = () => {
    // Navigate to the next form or to the profile if all forms are skipped
    if (currentFormIndex < forms.length - 1) { // Check if not on the last form
      setCurrentFormIndex(currentFormIndex + 1);
    } else {
      navigate('/profile'); // Or wherever you want to navigate
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

  const currentForm = forms[currentFormIndex];

  return (
    <div>
      <h2>{currentForm.title}</h2>
      {currentForm.component}
      <button onClick={handleSkip}>Skip</button>
      {currentFormIndex < forms.length - 1 && ( // Conditionally render "Next" button
        <button onClick={handleNextForm}>Next</button>
      )}
      {/* Conditionally render "Submit" button only on the last form */}
      {currentFormIndex === forms.length - 1 && (
        <button onClick={handleNextForm}>Submit</button>
      )}
    </div>
  );
};

export default JournalHome;