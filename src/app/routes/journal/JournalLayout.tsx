import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { Models } from 'appwrite';

// Define the shape of the context from the parent layout (LoggedInLayout)
interface ParentOutletContext {
  user: Models.User<Models.Preferences> | null;
}

const JournalLayout: React.FC = () => {
  const { user } = useOutletContext<ParentOutletContext>(); // Get user from parent
  const navigate = useNavigate();
  const location = useLocation();

  const journalSteps = [
    'vibe-check',
    'centering-breath',
    'mindfulness-qotd',
    '3-good-things',
    'add-photo',
    'one-thorn',
    'journal-entry',
    'submit-all'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Create a state object to hold all the data for the journal entry
  const [journalData, setJournalData] = useState({
    threeGoodThings: ['', '', ''],
    isPublic: true,
    oneThorn: '',
    vibe: '',
    photoFileId: null,
    isPhotoPublic: true,
    selectedFile: null as File | null,
    journalText: '', // Add this line
  });
  // 2. Create a single handler to update any field in the journalData state
  const handleDataChange = (field: keyof typeof journalData, value: any) => {
    setJournalData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentPath = pathSegments[pathSegments.length - 1] || 'vibe-check';
    const index = journalSteps.indexOf(currentPath);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [location.pathname]);

  const goTo = (index: number) => {
    if (index >= 0 && index < journalSteps.length) {
      navigate(`/journal/${journalSteps[index]}`);
    }
  };
  
  // 3. Pass the user, data state, and update function down to the child routes
  const outletContext = {
    goTo,
    currentIndex,
    lastIndex: journalSteps.length - 1,
    user,
    journalData,
    onDataChange: handleDataChange,
  };

  return (
    <div className="journal-layout flex flex-col items-center min-h-screen">
      <div className="progress-indicator my-4 text-sm text-muted-foreground">
        Step {currentIndex + 1} of {journalSteps.length}
      </div>
      <Outlet context={outletContext} />
    </div>
  );
};

export default JournalLayout;