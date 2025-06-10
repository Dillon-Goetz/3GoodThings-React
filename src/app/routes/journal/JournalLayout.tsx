// src/app/routes/journal/JournalLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { Models } from 'appwrite';

// 1. DEFINE THE SHAPE OF THE CONTEXT COMING FROM THE PARENT (LoggedInLayout)
interface ParentOutletContext {
  user: Models.User<Models.Preferences> | null;
  journalData: any; // Keep it simple for now
  onDataChange: (field: string, value: any) => void;
}

const JournalLayout: React.FC = () => {
  // 2. GET EVERYTHING FROM THE PARENT'S CONTEXT
  const { user, journalData, onDataChange } = useOutletContext<ParentOutletContext>();
  const navigate = useNavigate();
  const location = useLocation();

  const journalSteps = [
    'vibe-check',
    'centering-breath',
    'mindfulness-qotd',
    '3-good-things',
    'one-thorn',
    'journal-entry',
    'add-photo',
    'submit-all'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. REMOVE THE LOCAL journalData STATE AND handleDataChange FUNCTION
  //    They are now managed by App.tsx

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
  
  // 4. PASS THE CENTRALIZED STATE DOWN TO THE JOURNAL STEP COMPONENTS
  const outletContext = {
    goTo,
    currentIndex,
    lastIndex: journalSteps.length - 1,
    user,
    journalData,
    onDataChange,
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