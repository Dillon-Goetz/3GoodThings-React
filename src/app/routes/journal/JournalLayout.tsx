// src/app/routes/journal/JournalLayout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useDailyReset from '../../../Hooks/useDailyReset';

// Using your original 'steps' array structure
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

const JournalLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // { pathname: "/journal/vibe-check", ... }

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    const pathSegments = location.pathname.split('/'); // ["", "journal", "vibe-check"]
    const currentPathSlug = pathSegments[pathSegments.length - 1]; // "vibe-check"

    const foundIndex = steps.indexOf(currentPathSlug);

    if (foundIndex !== -1) {
      setCurrentStepIndex(foundIndex);
    } else if (location.pathname === '/journal' || location.pathname === '/journal/') {
      // If at base /journal, navigate to the first step (relative to /journal)
      navigate(steps[0], { replace: true });
    }
    // If currentPathSlug is not in 'steps' and not at '/journal', it's an invalid journal step.
    // The routing in App.tsx (specifically the "journal/*" part) should ideally handle this.
    // For example, the nested <Route path="*" element={<Navigate to="vibe-check" replace />} />
    // within the journal routes in App.tsx (as per my earlier suggestion) would catch this.
  }, [location.pathname, navigate]);

  useDailyReset(() => {
    console.log('Resetting journal data (client-side)...');
  });

  const goToStep = (targetIndex: number, queryParams: string = '') => {
    if (targetIndex >= 0 && targetIndex < steps.length) {
      // Navigate to the path slug from the 'steps' array.
      // This navigation is relative within the /journal/* context.
      navigate(`${steps[targetIndex]}${queryParams}`);
    }
  };

  return (
    <div className="journal-flow-container">
      <Outlet
        context={{
          goTo: goToStep,
          currentIndex: currentStepIndex,
          lastIndex: steps.length - 1,
        }}
      />
    </div>
  );
};

export default JournalLayout;