// src/app/routes/journal/JournalLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; // Outlet is key
import useDailyReset from '../../../Hooks/useDailyReset';

const steps = [
  'vibe-check',
  'centering-breath',
  'mindfulness-qotd',
  '3-good-things',
  'one-thorn',
  'journal-entry',
  'add-photo',
  'submit-all',
];

const JournalLayout: React.FC = () => { // No 'children' prop needed
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const currentStepSlug = pathSegments[pathSegments.length - 1];
    const idx = steps.indexOf(currentStepSlug);

    if (idx !== -1) {
      setCurrentIndex(idx);
    } else if (pathname.endsWith('/journal') || pathname.endsWith('/journal/')) {
      navigate('vibe-check', { replace: true }); // Navigate relative to current /journal context
    }
  }, [pathname, navigate]);

  useDailyReset(() => {
    console.log('Resetting journal data at midnight (client-side)...');
  });

  const goTo = (targetIndex: number, queryParams = '') => {
    if (targetIndex >= 0 && targetIndex < steps.length) {
      // Navigate relative to the /journal path
      navigate(`${steps[targetIndex]}${queryParams}`);
    }
  };

  return (
    <div className="journal-flow-container">
      {/* This Outlet will render the matched child route from the <Routes> inside AppRoutes */}
      <Outlet context={{ goTo, currentIndex, lastIndex: steps.length - 1 }} />
    </div>
  );
};

export default JournalLayout;