// src/app/routes/journal/JournalLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

interface OutletContext {
  goTo: (index: number, query?: string) => void;
  currentIndex: number;
  lastIndex: number;
}

const JournalLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the journal steps in order
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

  // Update currentIndex based on current location
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentPath = pathSegments[pathSegments.length - 1] || 'vibe-check';
    const index = journalSteps.indexOf(currentPath);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [location.pathname]);

  const goTo = (index: number, query?: string) => {
    if (index >= 0 && index < journalSteps.length) {
      const path = `/journal/${journalSteps[index]}`;
      navigate(path + (query || ''));
      setCurrentIndex(index);
    }
  };

  const outletContext: OutletContext = {
    goTo,
    currentIndex,
    lastIndex: journalSteps.length - 1
  };

  return (
    <div className="journal-layout">
      {/* Optional: Add progress indicator */}
      <div className="progress-indicator">
        Step {currentIndex + 1} of {journalSteps.length}
      </div>
      
      {/* This is where the child routes render */}
      <Outlet context={outletContext} />
    </div>
  );
};

export default JournalLayout;